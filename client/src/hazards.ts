import * as CANNON from "cannon-es";
import type { Ragdoll } from "./ragdoll";
import type { World } from "./world";

/**
 * 낙하 장애물 — 코스 위로 떨어지는 큰 공.
 *
 * [플레이어를 쫓지 않는다]
 * 떨어지는 위치는 코스에 고정된 "낙하 지점(station)"과 시드 난수로만 정해진다.
 * 플레이어 좌표는 어디에도 들어가지 않는다. 그래서 잘 보고 피하면 반드시
 * 피할 수 있고, 가만히 서 있어도 무조건 맞지는 않는다.
 *
 * [왜 미리 만들어 두는가 - 멀티 동기화]
 * 장애물은 맵을 만들 때 station마다 하나씩 미리 만들어 놓고 재활용한다.
 * 그러면 장애물이 그냥 "동적 소품"이라서 host가 보내는 기존 objects 스냅샷에
 * 그대로 실려 간다. 필요할 때마다 새로 만들면 클라이언트에는 그 바디가 없어서
 * 스냅샷이 통째로 버려지고, 프로토콜에 생성/삭제 메시지를 새로 만들어야 한다.
 * 개수가 고정이라 "동시에 너무 많이 생성"되는 일도 구조적으로 없다.
 *
 * [경고]
 * 대기 중인 장애물은 코스 위 HOVER_Y에 떠 있고, 그 아래 바닥에 그림자 링이
 * 그려진다. 링은 각 클라이언트가 장애물의 "현재 위치"만 보고 로컬에서 그리므로
 * (main.ts 참고) 별도 동기화가 필요 없다.
 */

export const HZ = {
  /** 장애물 반지름 */
  radius: 1.1,
  /** 질량. 사람(약 20kg)보다 확실히 무거워야 얻어맞고 날아간다 */
  mass: 40,

  /** 대기/경고 중에 떠 있는 높이 */
  hoverY: 13,
  /** 떨어질 준비를 마치고 이 시간 동안 경고만 한다 (초) */
  warnTime: 1.3,
  /** 땅에 닿은 뒤 이만큼 더 남아 있다가 회수된다 (초) */
  linger: 1.9,
  /** 한 station이 한 번 떨어뜨리고 다음까지 쉬는 시간 (초) */
  period: 6.2,

  /** 맞은 판정 반경 여유 (장애물 반지름에 더한다) */
  hitPad: 0.75,
  /** 세로로 이만큼 안에 있어야 맞은 것으로 본다 */
  hitVertical: 1.6,
  /** 넉백 충격량 (수평) */
  knockSide: 78,
  /** 넉백 충격량 (수직) */
  knockUp: 34,
  /** 쓰러져 있는 시간 (초) */
  knockdownTime: 1.5,
  /** 같은 사람이 연속으로 맞지 않게 두는 간격 (초) */
  hitCooldown: 1.2,

  /** 이 높이 아래로 내려가면 떨어진 것으로 본다 */
  voidY: -8,
};

/** 맵이 선언하는 낙하 지점 */
export interface HazardSpec {
  /** 이 장애물의 소품 id */
  id: number;
  /** 코스 상의 z 위치 */
  z: number;
  /** 시작 위상 (초). station마다 다르게 줘서 한꺼번에 안 떨어지게 한다 */
  phase: number;
}

type Phase = "wait" | "warn" | "fall" | "linger";

interface Station {
  spec: HazardSpec;
  body: CANNON.Body;
  phase: Phase;
  timer: number;
  /** 이번 사이클에 떨어질 x (경고가 시작될 때 정해진다) */
  x: number;
  /** 몇 번째 사이클인지 - 시드 난수 진행용 */
  cycle: number;
}

/** 결정론적 난수. 같은 station/사이클이면 어디서 계산해도 같은 x가 나온다 */
function hash01(a: number, b: number): number {
  let x = Math.imul(a + 1, 0x9e3779b1) ^ Math.imul(b + 1, 0x85ebca6b);
  x = Math.imul(x ^ (x >>> 16), 0x7feb352d);
  x = Math.imul(x ^ (x >>> 15), 0x846ca68b);
  return ((x ^ (x >>> 16)) >>> 0) / 4294967296;
}

export interface HazardHit {
  rag: Ragdoll;
  /** 밀려난 방향 (수평, 정규화) */
  dirX: number;
  dirZ: number;
}

export function createHazards(world: World, laneHalf: number) {
  let stations: Station[] = [];
  /** 사람별 피격 쿨다운 */
  const hitCooldown = new Map<Ragdoll, number>();

  /** 맵이 바뀌면 다시 만든다 */
  function rebuild() {
    stations = [];
    hitCooldown.clear();
    for (const spec of world.hazardSpecs) {
      const obj = world.objectById.get(spec.id);
      if (!obj) continue;
      stations.push({
        spec, body: obj.body,
        phase: "wait",
        timer: spec.phase,
        x: 0,
        cycle: 0,
      });
    }
    park();
  }

  /** 전부 대기 위치로 올려둔다 */
  function park() {
    for (const s of stations) {
      s.phase = "wait";
      s.timer = s.spec.phase;
      s.cycle = 0;
      hold(s, 0);
    }
  }

  function hold(s: Station, x: number) {
    s.body.position.set(x, HZ.hoverY, s.spec.z);
    s.body.velocity.setZero();
    s.body.angularVelocity.setZero();
    s.body.force.setZero();
    s.body.torque.setZero();
    s.body.wakeUp();
  }

  /**
   * host 전용. 장애물 상태를 한 스텝 진행한다.
   * @returns 이번 스텝에 맞은 사람들
   */
  function update(dt: number, players: Ragdoll[]): HazardHit[] {
    const hits: HazardHit[] = [];

    for (const [rag, t] of hitCooldown) {
      const nt = t - dt;
      if (nt <= 0) hitCooldown.delete(rag);
      else hitCooldown.set(rag, nt);
    }

    for (const s of stations) {
      s.timer -= dt;

      switch (s.phase) {
        case "wait":
          if (s.timer <= 0) {
            // 떨어질 자리를 정한다. 플레이어 위치는 쓰지 않는다 -
            // station 번호와 사이클만으로 정해지는 시드 난수다.
            const r = hash01(s.spec.id, s.cycle);
            s.x = (r * 2 - 1) * (laneHalf - HZ.radius - 0.6);
            s.phase = "warn";
            s.timer = HZ.warnTime;
            hold(s, s.x);
          } else {
            hold(s, s.x);
          }
          break;

        case "warn":
          // 경고 중에는 제자리에 떠 있는다. 힘으로 띄우는 대신 위치를 고정하는
          // 이유는, 40kg짜리 물체에 반중력을 걸면 접촉이 생겼을 때 튀기 때문이다.
          hold(s, s.x);
          if (s.timer <= 0) {
            s.phase = "fall";
            s.timer = 6;   // 안전장치: 어딘가 걸려도 이 시간 뒤엔 회수한다
          }
          break;

        case "fall":
          // 여기서는 아무것도 하지 않는다. 순수하게 중력에 맡긴다.
          if (s.body.position.y <= HZ.radius + 0.35 || s.timer <= 0) {
            s.phase = "linger";
            s.timer = HZ.linger;
          }
          break;

        case "linger":
          if (s.timer <= 0) {
            s.cycle++;
            s.phase = "wait";
            s.timer = HZ.period;
            hold(s, 0);
          }
          break;
      }

      // ---- 피격 판정 (떨어지는 중 / 착지 직후에만)
      if (s.phase !== "fall" && s.phase !== "linger") continue;
      for (const rag of players) {
        if (rag.state !== "ACTIVE") continue;
        if (hitCooldown.has(rag)) continue;

        const p = rag.pelvis.position;
        const dx = p.x - s.body.position.x;
        const dz = p.z - s.body.position.z;
        const dist = Math.hypot(dx, dz);
        if (dist > HZ.radius + HZ.hitPad) continue;
        if (Math.abs(p.y - s.body.position.y) > HZ.radius + HZ.hitVertical) continue;

        // 밀려나는 방향: 장애물 반대쪽. 정확히 겹쳤으면 코스 바깥쪽으로.
        let nx = dx, nz = dz;
        const l = Math.hypot(nx, nz);
        if (l < 1e-3) { nx = p.x >= 0 ? 1 : -1; nz = 0; }
        else { nx /= l; nz /= l; }

        rag.knockdown(HZ.knockdownTime);
        rag.pelvis.applyImpulse(new CANNON.Vec3(nx * HZ.knockSide, HZ.knockUp, nz * HZ.knockSide));
        rag.torso.applyImpulse(new CANNON.Vec3(nx * HZ.knockSide * 0.35, 0, nz * HZ.knockSide * 0.35));
        hitCooldown.set(rag, HZ.hitCooldown);
        hits.push({ rag, dirX: nx, dirZ: nz });
      }
    }

    return hits;
  }

  /** 지금 경고/낙하 중인 장애물들 - 바닥 링을 그리는 데 쓴다 (모든 클라이언트) */
  function activeMarkers(): { x: number; z: number; y: number; r: number }[] {
    const out: { x: number; z: number; y: number; r: number }[] = [];
    for (const s of stations) {
      const y = s.body.position.y;
      // 위치만 보고 판단하므로 host든 client든 같은 결과가 나온다.
      // (클라이언트는 스냅샷으로 위치만 받는다)
      if (y < HZ.radius + 0.6) continue;
      out.push({ x: s.body.position.x, z: s.body.position.z, y, r: HZ.radius });
    }
    return out;
  }

  function forget(rag: Ragdoll) { hitCooldown.delete(rag); }

  return { rebuild, park, update, activeMarkers, forget, get stations() { return stations; } };
}
