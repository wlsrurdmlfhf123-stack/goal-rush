import * as CANNON from "cannon-es";
import type { Ragdoll, RagdollInput } from "./ragdoll";

/**
 * 공을 노리는 방해꾼 AI.
 *
 * [사람과 같은 방식으로 움직인다]
 * 봇도 그냥 래그돌이고, 이 파일이 만드는 건 사람이 키보드로 만드는 것과 똑같은
 * RagdollInput(moveX/moveZ) 하나뿐이다. 그래서 ragdoll.ts의 control()이
 * 그대로 쓰이고, 걷기/넘어짐/일어남/충돌이 전부 사람과 동일하게 동작한다.
 * 봇을 순간이동시키거나 속도를 직접 대입하는 코드는 없다.
 *
 * [치팅하지 않는다]
 * 입력으로 쓰는 값은 "공의 위치"와 "자기 위치"뿐이다. 플레이어의 키 입력이나
 * 의도(intent)는 읽지 않는다. 게다가 공 위치도 실시간이 아니라 reactionTime
 * 만큼 지난 값을 쓰고(사람의 반응 속도), 방향도 즉시 꺾지 못한다(turnRate).
 * 그래서 Shift 개인기처럼 갑자기 옆으로 빠지는 움직임은 봇이 따라오지 못한다.
 */

export const BOT = {
  /** 공 위치를 이만큼 늦게 인식한다 (초) - 사람의 반응 지연 */
  reactionTime: 0.3,
  /** 진행 방향을 꺾을 수 있는 최대 각속도 (rad/s) */
  turnRate: 3.2,
  /**
   * 공이 갈 자리를 앞질러 가는 정도 (초).
   *
   * [왜 필요한가] 봇도 사람과 같은 maxSpeed를 쓴다. 공 자리로만 달려가면
   * 드리블 중인 공을 영원히 못 따라잡는다 - 실측으로 봇이 계속 뒤를 따라만
   * 다니고 간격이 1.1m로 고정된 채 아무 일도 안 일어났다.
   * 공의 "속도"를 보고 길목을 막는다. 이건 월드 상태이지 플레이어의 입력이
   * 아니므로 치팅이 아니고, 예측에 쓰는 공 상태 자체가 reactionTime 만큼
   * 낡은 값이라 급격한 방향 전환(Shift 개인기)은 그대로 흘린다.
   */
  leadTime: 0.85,

  /** 이 거리 안에 공이 들어오면 걷어차기를 시도한다 */
  stealDist: 1.45,
  /** 걷어차는 충격량 (N·s) */
  stealImpulse: 4.6,
  /**
   * 연속으로 차지 못하게 두는 간격 (초).
   *
   * [0.75 -> 2.6] 0.75초면 사람이 공에 다가가는 속도보다 봇이 걷어내는
   * 속도가 빨라서, 소유권을 되찾을 창이 아예 안 생긴다. 실측으로 스테이지
   * 3의 봇 구간(z≈-30)에서 50초 동안 공 놓침 41회에 진행이 0이었다.
   * 봇에게 공을 뺏기고 쫓아가는 건 이 게임에서 제일 웃긴 장면이라 살려야
   * 하지만, 그건 "한 번 뺏기고 따라잡는" 것이지 "영원히 못 잡는" 게 아니다.
   * 2.6초면 한 번 걷어차인 공까지 달려가 다시 몰 수 있는 시간이 된다.
   */
  stealCooldown: 2.6,

  /**
   * 공을 안고 있는 사람을 이 거리 안에서 들이받으면 캐리가 풀린다.
   * 봇 몸과 사람 몸은 어차피 물리적으로 부딪히지만, "안고 있던 걸 놓친다"는
   * 판정 자체는 접촉만으로는 안 생기므로 여기서 따로 본다.
   */
  bumpDist: 1.35,
  /** 들이받았을 때 공에 주는 충격량 */
  bumpImpulse: 3.4,
  bumpCooldown: 1.1,

  /** 코스 가장자리에서 이만큼 안쪽까지만 쫓아간다 (스스로 떨어지지 않게) */
  laneMargin: 1.3,
  /** 공이 이보다 가까우면 더 붙지 않고 옆으로 돈다 (몸으로 미는 그림) */
  hugDist: 0.55,

  /**
   * 등장 직후 이 시간 동안은 공을 걷어차거나 들이받지 않는다 (초).
   *
   * [왜] 봇은 플레이어 진행 방향 앞에 튀어나온다. 그 자리에 공이 이미 있으면
   * 등장하자마자 stealDist 안이라 즉시 걷어차 버렸다. 플레이어는 봇이
   * 나타난 걸 인지하기도 전에 공을 잃는 셈이라, 개인기로 대응할 기회조차
   * 없이 억울하기만 하다. 등장 연출(배너 1.1초)이 끝나고 반응할 시간을 준
   * 뒤부터 위협이 되게 한다.
   *
   * 움직임 자체는 처음부터 한다 - 다가오는 게 보여야 긴장이 생긴다.
   * 치팅이 아니다: 봇을 약하게 만드는 쪽이지 플레이어 정보를 주는 게 아니다.
   */
  spawnGrace: 1.1,
};

interface BotState {
  /** 지연 인식을 위한 공 상태 기록 (오래된 것이 앞) */
  memory: { t: number; x: number; z: number; vx: number; vz: number }[];
  /** 지금 향하고 있는 방향 (정규화). 여기서 목표 방향으로 서서히 돈다 */
  dirX: number;
  dirZ: number;
  stealTimer: number;
  bumpTimer: number;
  clock: number;
}

export interface BotBumpResult {
  /** 캐리를 풀어야 하는 래그돌들 */
  brokeCarry: Ragdoll[];
}

export function createBots(laneHalf: number) {
  const states = new Map<Ragdoll, BotState>();

  function stateOf(rag: Ragdoll): BotState {
    let s = states.get(rag);
    if (!s) {
      s = { memory: [], dirX: 0, dirZ: -1, stealTimer: 0, bumpTimer: 0, clock: 0 };
      states.set(rag, s);
    }
    return s;
  }

  function forget(rag: Ragdoll) { states.delete(rag); }

  /**
   * 봇 하나의 이번 스텝 이동 입력을 만든다.
   *
   * @param carriers 지금 공을 안고 있는 사람들 (들이받아 놓치게 만들 대상)
   * @returns 이 봇이 이번 스텝에 캐리를 깨뜨린 사람들
   */
  function update(
    rag: Ragdoll,
    ball: CANNON.Body,
    dt: number,
    carriers: Ragdoll[],
  ): { input: RagdollInput; brokeCarry: Ragdoll[] } {
    const s = stateOf(rag);
    s.clock += dt;
    s.stealTimer = Math.max(0, s.stealTimer - dt);
    s.bumpTimer = Math.max(0, s.bumpTimer - dt);

    const brokeCarry: Ragdoll[] = [];

    // ---- 공 위치를 "조금 전 것"으로 기억한다
    s.memory.push({ t: s.clock, x: ball.position.x, z: ball.position.z, vx: ball.velocity.x, vz: ball.velocity.z });
    while (s.memory.length > 2 && s.memory[1].t <= s.clock - BOT.reactionTime) s.memory.shift();
    const seen = s.memory[0];

    // 넘어져 있으면 아무것도 못 한다 (사람과 같다)
    if (rag.state !== "ACTIVE") {
      return { input: { moveX: 0, moveZ: 0, jump: false }, brokeCarry };
    }

    const p = rag.pelvis.position;

    // ---- 목표 방향: 기억하고 있는 공이 "갈 자리".
    // 멀수록 더 앞질러 간다 (가까우면 그냥 공을 향한다).
    const rawDist = Math.hypot(seen.x - p.x, seen.z - p.z);
    const lead = Math.min(BOT.leadTime, rawDist / 6);
    // 코스 밖으로 스스로 걸어 나가지 않도록 x를 레인 안으로 접어둔다.
    const limit = laneHalf - BOT.laneMargin;
    const tx = Math.max(-limit, Math.min(limit, seen.x + seen.vx * lead));
    const tz = seen.z + seen.vz * lead;
    let wx = tx - p.x;
    let wz = tz - p.z;
    const dist = Math.hypot(wx, wz);

    if (dist > 1e-3) { wx /= dist; wz /= dist; }
    else { wx = s.dirX; wz = s.dirZ; }

    // 너무 바짝 붙으면 정면으로 밀지 말고 살짝 옆으로 돌아 들어간다.
    // (정확히 공 중심으로만 달려들면 공을 타고 넘어가서 우스워진다)
    if (dist < BOT.hugDist) {
      const sx = -wz, sz = wx;
      wx = wx * 0.35 + sx * 0.94;
      wz = wz * 0.35 + sz * 0.94;
      const l = Math.hypot(wx, wz) || 1;
      wx /= l; wz /= l;
    }

    // ---- 방향 전환 지연: 목표 방향으로 turnRate 이상 빨리 못 꺾는다
    const cur = Math.atan2(s.dirX, s.dirZ);
    const want = Math.atan2(wx, wz);
    let d = want - cur;
    while (d > Math.PI) d -= Math.PI * 2;
    while (d < -Math.PI) d += Math.PI * 2;
    const maxTurn = BOT.turnRate * dt;
    const next = cur + Math.max(-maxTurn, Math.min(maxTurn, d));
    s.dirX = Math.sin(next);
    s.dirZ = Math.cos(next);

    // ---- 공을 걷어찬다
    // 자기가 가는 방향으로 찬다. 누가 몰고 있는지는 보지 않는다.
    const bdx = ball.position.x - p.x;
    const bdz = ball.position.z - p.z;
    if (Math.hypot(bdx, bdz) < BOT.stealDist && s.stealTimer <= 0 && s.clock >= BOT.spawnGrace) {
      ball.applyImpulse(new CANNON.Vec3(s.dirX * BOT.stealImpulse, 0.8, s.dirZ * BOT.stealImpulse));
      ball.wakeUp();
      s.stealTimer = BOT.stealCooldown;
    }

    // ---- 공을 안고 있는 사람을 들이받으면 놓치게 한다
    if (s.bumpTimer <= 0 && s.clock >= BOT.spawnGrace) {
      for (const c of carriers) {
        const cp = c.pelvis.position;
        if (Math.hypot(cp.x - p.x, cp.z - p.z) > BOT.bumpDist) continue;
        brokeCarry.push(c);
        s.bumpTimer = BOT.bumpCooldown;
        break;
      }
    }

    return { input: { moveX: s.dirX, moveZ: s.dirZ, jump: false }, brokeCarry };
  }

  return { update, forget, stateOf };
}
