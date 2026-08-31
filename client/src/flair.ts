import * as CANNON from "cannon-es";
import { P, type Ragdoll } from "./ragdoll";

/**
 * 몸짓 — 달리기/급정지/방향전환/착지의 과장된 자세.
 *
 * [무엇을 고치려는 것인가] 캐릭터는 물리적으로는 잘 움직이는데 **자세가 항상
 * 같다**. 전속력으로 달릴 때나 서 있을 때나 상체 각도가 거의 같고, 급정지해도
 * 몸이 그 자리에서 멎으며, 방향을 홱 틀어도 몸은 조용히 따라 돈다. 그래서
 * "잘 만든 인형"으로 보이지 사람으로 안 보인다.
 *
 * [ragdoll.ts 를 안 건드리는 방법] scuffle.ts 와 같은 길을 쓴다 - control() 은
 * 그대로 두고 **밖에서 토크만 얹는다**. 애니메이션도, 새 상태 기계도, 뼈대도
 * 없다. 이미 관절로 묶인 몸에 상체 토크를 조금 주면 나머지는 물리가 만든다.
 *
 * [왜 이 크기로 멈추는가 - 평형각으로 계산한다] control() 의 몸을 세우는 토크는
 * P.uprightTorque(70 N·m)에 **기울어진 각의 sin** 을 곱한 값이다. 그래서 여기서
 * T N·m 를 계속 걸면 몸은 무한정 넘어가지 않고 sin(θ) = T/70 인 각에서 멈춘다.
 *   · 달리기 젖힘 10 N·m -> 약 8도
 *   · 급정지 쏠림 26 N·m -> 약 22도
 *   · 착지     30 N·m -> 약 25도
 * 넘어짐 판정(P.fallTiltDot = 0.42, 약 65도)과는 한참 떨어져 있다. 즉 이 파일은
 * **넘어뜨릴 수 없다** - 세기를 눈으로 고르지 않고 이 식으로 고른다.
 *
 * [조작 반응성] 이동 입력에는 손대지 않는다. 상체 각도만 바뀌므로 가고 서고
 * 도는 타이밍은 한 프레임도 안 달라진다. (밀치기/끌리기처럼 입력을 덮어쓰는
 * 것과 다른 점이다.)
 *
 * [멀티] host 에서만 돌고, 결과는 기존 래그돌 스냅샷에 그대로 실려 나간다.
 * 자세는 물리 결과라서 친구 화면에서도 똑같이 보인다 (새 메시지가 없다).
 */

/** 몸짓 상수 - 전부 N·m (토크) 또는 초 */
export const FL = {
  /** 이 속도부터 "달리는 중"으로 본다 (m/s) */
  RUN_SPEED: 2.2,
  /** 달릴 때 상체를 뒤로 젖히는 토크 (N·m). 평형각 약 8도 */
  RUN_LEAN: 10,

  /**
   * 급정지 판정 (m/s^2).
   *
   * control() 의 제동 가속은 최대 49 m/s^2 지만 실제로는 목표속도 오차에
   * 비례하므로, 전속력(4.6)에서 키를 뗀 직후가 가장 크다. 6 m/s^2 면 "확실히
   * 멈추려고 했다"만 걸리고, 방향 전환 중의 감속에는 안 걸린다.
   */
  STOP_DECEL: 6.0,
  /** 급정지할 때 상체가 앞으로 쏠리는 토크 (N·m). 평형각 약 22도 */
  STOP_PITCH: 26,
  /** 그 자세가 유지되는 시간 (초). 길면 정지할 때마다 절하는 것처럼 보인다 */
  STOP_TIME: 0.22,

  /** 진행 방향이 이 각속도 이상으로 꺾이면 "홱 틀었다" (rad/s) */
  TURN_RATE: 3.0,
  /** 그때 몸이 바깥쪽으로 기우는 토크 (N·m). 평형각 약 16도 */
  TURN_ROLL: 20,
  /** 흔들림이 남아 있는 시간 (초) */
  TURN_TIME: 0.2,
  /** 이 속도 아래에서는 방향 전환을 안 본다 (제자리에서 도는 건 흔들 일이 아니다) */
  TURN_MIN_SPEED: 1.4,

  /** 이 속도 이상으로 내려앉으면 과장된 착지 (m/s, 아래로) */
  LAND_SPEED: 5.0,
  /** 착지 순간 상체가 앞으로 접히는 토크 (N·m). 평형각 약 25도 */
  LAND_PITCH: 30,
  /** 그 자세가 유지되는 시간 (초) */
  LAND_TIME: 0.26,
  /**
   * 착지 순간 두 손이 위로 번쩍 (m/s). 팔이 따로 놀아야 "털썩"으로 읽힌다.
   *
   * 충격량이 아니라 속도다 - 손은 0.3kg 이라 충격량으로 적으면 값이 조금만
   * 커져도 손이 20 m/s 를 넘어가고, 그 손이 남의 몸에 스치면 ragdoll.ts 의
   * 충격 감지(13 m/s)에 걸려 애먼 사람이 넘어진다 (scuffle.ts 연출 항목 주석).
   */
  LAND_ARM: 5,

  /** 떠 있는 동안 무릎을 끌어올리는 토크 (N·m). 낙하 자세 */
  AIR_TUCK: 2.5,
  /**
   * 그 토크를 멈추는 각속도 (rad/s).
   *
   * [왜 상한이 필요한가] 위다리는 관성모멘트가 0.02 정도라 2.5 N·m 만으로도
   * 각가속도가 120 rad/s^2 다. 공중에서는 걸음걸이(swingDamp)가 돌지 않으므로
   * 아무것도 이 회전을 빼내지 않고, 0.4초만 떠 있어도 각속도가 50 rad/s 까지
   * 올라가 고관절 한계각을 두들기며 덜덜거린다. "이미 충분히 접혔으면 그만
   * 민다"는 한 줄이 감쇠 항을 새로 만드는 것보다 싸고 안전하다.
   */
  AIR_TUCK_MAX_SPIN: 5,
  /** 이 시간 이상 떠 있어야 낙하 자세를 잡는다 (초). 계단 한 칸에 웅크리면 이상하다 */
  AIR_TUCK_DELAY: 0.18,

  /**
   * 상체에 건 토크를 골반에도 함께 거는 비율 (0..1).
   *
   * 상체만 돌리면 허리에서 꺾여서 상반신만 까딱거린다 - 다리는 그대로 서 있는데
   * 윗몸만 흔들리는 그림이라 자세가 아니라 고장으로 보인다. 골반까지 같이
   * 기울여야 몸 전체가 한 덩어리로 젖혀진다. control() 의 골반 세우기 토크는
   * 상체의 0.6배(42 N·m)라, 절반을 주면 평형각이 상체와 비슷하게 맞는다.
   */
  HIP_SHARE: 0.5,
};

/** 이번 스텝에 볼 만한 일이 있었으면 알려준다 (연출용 - main.ts) */
export interface FlairEvent {
  kind: "land" | "stop" | "turn";
  x: number; y: number; z: number;
  /**
   * 그때 가고 있던 쪽 (수평 단위벡터).
   *
   * 연출이 이걸 쓴다 - 급정지 먼지는 "가던 쪽으로" 밀려야 급정지로 보인다.
   * 이 순간 이동 입력은 이미 0이라(그래서 급정지다) 부르는 쪽에서는 알 수 없다.
   */
  dirX: number; dirZ: number;
  /** 0..1 */
  power: number;
}

interface Track {
  /** 직전 스텝의 수평 속도 (m/s) */
  spd: number;
  /** 직전 스텝의 진행 방향 (수평 단위벡터). 속도가 거의 0이면 유지한다 */
  hx: number;
  hz: number;
  /** 직전 스텝의 수직 속도 - 착지 세기는 닿기 **전** 속도로 재야 한다 */
  vy: number;
  /** 떠 있었는가 */
  air: boolean;
  /** 떠 있는 시간 (초) */
  airT: number;
  /** 남은 급정지 자세 시간 (초) */
  stopT: number;
  /** 급정지 직전에 가던 쪽 (몸이 그쪽으로 쏠려야 한다) */
  stopX: number;
  stopZ: number;
  /** 남은 방향전환 흔들림 시간 (초) */
  turnT: number;
  /** 흔들리는 쪽 (+1 / -1) */
  turnSign: number;
  /** 남은 착지 자세 시간 (초) */
  landT: number;
}

const _v = new CANNON.Vec3();

export function createFlair() {
  const tracks = new Map<Ragdoll, Track>();

  const fresh = (): Track => ({
    spd: 0, hx: 0, hz: 1, vy: 0, air: false, airT: 0,
    stopT: 0, stopX: 0, stopZ: 1, turnT: 0, turnSign: 1, landT: 0,
  });

  /**
   * 상체(+골반)에 수평축 토크를 건다.
   *
   * 축 규칙은 scuffle.ts 의 KICK_SPIN 과 같다: 진행 방향 (fx,fz) 에 대해
   * 축 (fz, 0, -fx) 는 **앞으로 넘어가는** 회전이고, 부호를 뒤집으면 뒤로
   * 젖혀진다. 골반에도 절반을 주는 이유는, 상체만 돌리면 허리에서 꺾여
   * 상반신만 까딱거리기 때문이다.
   */
  function pitch(rag: Ragdoll, fx: number, fz: number, t: number) {
    _v.set(fz * t, 0, -fx * t);
    rag.torso.applyTorque(_v);
    const h = t * FL.HIP_SHARE;
    _v.set(fz * h, 0, -fx * h);
    rag.pelvis.applyTorque(_v);
  }

  /** 진행 방향을 축으로 굴린다 (좌우로 기우뚱) */
  function roll(rag: Ragdoll, fx: number, fz: number, t: number) {
    _v.set(fx * t, 0, fz * t);
    rag.torso.applyTorque(_v);
    const h = t * FL.HIP_SHARE;
    _v.set(fx * h, 0, fz * h);
    rag.pelvis.applyTorque(_v);
  }

  /**
   * 한 사람의 한 스텝. main.ts 의 host 분기에서 control() **뒤에** 부른다.
   *
   * control() 뒤인 이유: 이 파일은 control() 이 이번 스텝에 계산한 결과(속도,
   * 접지)를 읽고 그 위에 토크를 더한다. 토크는 physics.step() 전까지 누적되므로
   * 순서상 뒤에 얹어도 같은 스텝에 반영된다.
   */
  function update(rag: Ragdoll, dt: number): FlairEvent | null {
    let tr = tracks.get(rag);
    if (!tr) { tr = fresh(); tracks.set(rag, tr); }

    const v = rag.pelvis.velocity;
    const spd = Math.hypot(v.x, v.z);
    const hx = spd > 0.05 ? v.x / spd : tr.hx;
    const hz = spd > 0.05 ? v.z / spd : tr.hz;
    const grounded = rag.grounded;

    // 넘어져 있는 동안에는 아무것도 하지 않는다. 널브러진 몸에 자세를 주면
    // 그건 "축 늘어짐"이 아니라 발작이 된다.
    if (rag.state !== "ACTIVE") {
      const keep = fresh();
      keep.hx = hx; keep.hz = hz; keep.spd = spd; keep.vy = v.y;
      keep.air = !grounded;
      tracks.set(rag, keep);
      return null;
    }

    let ev: FlairEvent | null = null;
    const p = rag.pelvis.position;

    // ---- 착지: 떠 있다가 땅에 닿은 순간
    const air = !grounded;
    if (tr.air && !air) {
      // 닿는 순간 vy 는 이미 접촉으로 지워져 있다. 직전 스텝 값으로 재야 한다.
      const fall = -tr.vy;
      if (fall > FL.LAND_SPEED) {
        const k = Math.min(1, (fall - FL.LAND_SPEED) / 8);
        tr.landT = FL.LAND_TIME;
        // 팔을 위로 던진다 (몸은 내려앉는데 팔만 위에 남는 그림 = 털썩)
        for (const h of [rag.handL, rag.handR]) {
          h.wakeUp();
          h.applyImpulse(new CANNON.Vec3(0, FL.LAND_ARM * (0.5 + k) * h.mass, 0));
        }
        ev = { kind: "land", x: p.x, y: p.y, z: p.z, dirX: hx, dirZ: hz, power: 0.35 + k * 0.65 };
      }
      tr.airT = 0;
    }
    if (air) tr.airT += dt;

    // ---- 급정지: 달리다가 확 줄었다
    const decel = (tr.spd - spd) / Math.max(1e-4, dt);
    if (grounded && tr.spd > FL.RUN_SPEED && decel > FL.STOP_DECEL && tr.stopT <= 0) {
      tr.stopT = FL.STOP_TIME;
      tr.stopX = tr.hx; tr.stopZ = tr.hz;
      if (!ev) {
        ev = {
          kind: "stop", x: p.x, y: p.y, z: p.z,
          dirX: tr.stopX, dirZ: tr.stopZ, power: Math.min(1, decel / 30),
        };
      }
    }

    // ---- 방향 전환: 진행 방향이 홱 꺾였다
    if (grounded && spd > FL.TURN_MIN_SPEED && tr.spd > FL.TURN_MIN_SPEED) {
      const cross = tr.hx * hz - tr.hz * hx;
      const dot = tr.hx * hx + tr.hz * hz;
      const rate = Math.abs(Math.atan2(cross, dot)) / Math.max(1e-4, dt);
      if (rate > FL.TURN_RATE && tr.turnT <= 0) {
        tr.turnT = FL.TURN_TIME;
        // 도는 쪽의 바깥으로 기운다 (오토바이가 코너에서 눕는 것의 반대 -
        //  발이 미끄러지듯 상체가 바깥으로 밀리는 그림이라 더 우스꽝스럽다)
        tr.turnSign = cross >= 0 ? 1 : -1;
        if (!ev) {
          ev = { kind: "turn", x: p.x, y: p.y, z: p.z, dirX: hx, dirZ: hz, power: Math.min(1, rate / 9) };
        }
      }
    }

    // ---- 자세 적용 (센 것부터 - 한 프레임에 여러 개가 겹치면 각도가 더해진다)
    if (tr.landT > 0) {
      // 착지: 앞으로 접힌다
      pitch(rag, hx, hz, FL.LAND_PITCH * (tr.landT / FL.LAND_TIME));
      tr.landT -= dt;
    } else if (tr.stopT > 0) {
      // 급정지: 가던 쪽으로 상체가 쏠린다
      pitch(rag, tr.stopX, tr.stopZ, FL.STOP_PITCH * (tr.stopT / FL.STOP_TIME));
      tr.stopT -= dt;
    } else if (grounded && spd > FL.RUN_SPEED) {
      // 달리기: 뒤로 살짝 젖힌다. 속도에 비례하므로 걷다가 뛰면 저절로 커진다.
      const k = Math.min(1, (spd - FL.RUN_SPEED) / Math.max(0.5, P.maxSpeed - FL.RUN_SPEED));
      pitch(rag, -hx, -hz, FL.RUN_LEAN * k);
    }

    if (tr.turnT > 0) {
      roll(rag, hx, hz, FL.TURN_ROLL * tr.turnSign * (tr.turnT / FL.TURN_TIME));
      tr.turnT -= dt;
    }

    // ---- 낙하 자세: 무릎을 끌어올린다 (떨어지는 동안 다리가 축 늘어지지 않게)
    if (air && tr.airT > FL.AIR_TUCK_DELAY) {
      for (const name of ["upperLegL", "upperLegR"]) {
        const part = rag.parts.get(name);
        if (!part) continue;
        // 충분히 접혔으면 그만 민다 (FL.AIR_TUCK_MAX_SPIN 주석)
        if (part.body.angularVelocity.length() > FL.AIR_TUCK_MAX_SPIN) continue;
        _v.set(hz * FL.AIR_TUCK, 0, -hx * FL.AIR_TUCK);
        part.body.applyTorque(_v);
      }
    }

    tr.spd = spd; tr.hx = hx; tr.hz = hz; tr.vy = v.y; tr.air = air;
    return ev;
  }

  /** 캐릭터가 사라질 때 */
  const forget = (rag: Ragdoll) => { tracks.delete(rag); };
  /** 맵을 새로 로드할 때 */
  const reset = () => tracks.clear();

  return { update, forget, reset };
}
