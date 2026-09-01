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

  // ---- 역할 (bot id로 정해진다. 치팅 아님 - 행동 방식만 다르다)
  //
  //  chaser  : 공을 쫓아 걷어낸다 (기본).
  //  blocker : 공과 골 사이 길목에 자리를 잡고 몸으로 막는다. 공이 오면 걷어낸다.
  //  bruiser : 공을 가진 사람(없으면 가장 가까운 사람)에게 달려가 밀어낸다.
  //            공은 차지 않는다 - 흩뜨리는 게 아니라 사람을 넘어뜨려 시간을 뺏는다.
  /** blocker가 공보다 골 쪽으로 이만큼 앞서 자리잡는다 (m) */
  blockAhead: 4.5,
  /** bruiser가 사람을 이 거리 안에서 밀어낸다 */
  shoveDist: 1.5,
  /**
   * bruiser의 밀어내는 충격량 (N·s).
   *
   * 골반(약 5kg)에 걸리므로 Δv ≈ 충격량/5. 15면 3 m/s 옆으로 - 코스에서
   * 밀려나 진로가 흐트러지는 정도다. 사람-사람 범프(34, knockdown 포함)보다
   * 훨씬 약하고 knockdown도 안 건다. 세게 밀리면 스스로 균형을 잃고 넘어질
   * "수도" 있지만(ragdoll.ts) 그건 덤이다.
   */
  shoveImpulse: 15,
  shoveUp: 3,
  shoveCooldown: 2.4,
  /** carrier(공 든 사람)를 노릴 때 예측해서 앞질러 가는 정도 (초) */
  carrierLead: 0.4,

  // ---- 태클: chaser가 공 근처의 사람에게 몸으로 부딪혀 "둘 다" 넘어진다
  //
  // [왜] 봇이 공을 깨끗하게 걷어내기만 하면 "짜증"이다. 가끔은 봇이 사람에게
  // 엉겨 붙어 둘 다 자빠지고, 그 사이 공이 굴러가고, 친구가 쫓아가는 -
  // 그 아수라장이 이 게임의 핵심 재미다. 자주 하면 안 되므로 쿨다운이 길다.
  /** 공에서 이 거리 안에 있는 사람에게만 태클한다 (m) */
  tackleBallDist: 2.4,
  /** 태클 성립 거리 (봇 <-> 사람) */
  tackleDist: 1.3,
  /** 태클로 사람을 넘어뜨리는 시간 (초) - 짧게 (락 아님) */
  tackleKnockTime: 1.0,
  /** 태클 충격량 (봇과 사람이 서로 반대로) */
  tackleImpulse: 26,
  /** 태클 재사용 간격 (초) - 길게 잡아 "가끔" (넘어뜨리기 락 방지) */
  tackleCooldown: 6.5,

  // ---- 공 도둑 (thief)
  //
  // [chaser 와 무엇이 다른가] chaser 는 공을 **걷어낸다** - 한 방 차고 끝이다.
  // thief 는 공을 **가져간다**. 뺏은 뒤 일정 시간 자기 발 앞에 붙여 놓고
  // 출발선 쪽으로 도망가므로, 둘이 쫓아가서 되찾아야 진행이 된다.
  // 이게 「야 저 새끼 공 가져갔어!」가 실제로 일어나는 자리다.
  //
  // [혼자서는 못 잡는다 — 규칙이 아니라 속도로]
  // 도둑은 사람과 같은 최고 속도를 쓴다. 뒤에서 쫓아가기만 해서는 영영 못
  // 따라잡고, 한 명이 앞을 막아 도둑이 방향을 틀 때 다른 한 명이 붙어야
  // 잡힌다. 봇을 빠르게 만들어서가 아니라 **같은 속도라서** 그렇다.
  /** 이 거리 안에 공이 들어오면 빼앗는다 */
  thiefStealDist: 1.5,
  /** 뺏은 공을 붙들고 있는 시간 (초). 지나면 스스로 놓는다 */
  thiefFleeTime: 7.0,
  /**
   * 뺏은 직후 **도망치지 않고 공을 챙기는** 시간 (초).
   *
   * [없으면 뺏자마자 놓친다 — 실측] 도둑은 공을 향해 달려오다 뺏으므로, 뺏은
   * 순간 진행 방향은 골 쪽(-Z)이고 도망갈 방향은 그 반대(+Z)다. 몸을 반 바퀴
   * 도는 데 turnRate(3.2 rad/s)로 1초가 걸리는데, 그동안 공은 제자리에 남고
   * 도둑만 멀어져서 **0.9초 만에 간격이 5.1m**가 됐다(thiefKeepMax 2.6 밖).
   *
   * [왜 당기는 힘을 키워 해결하지 않았나] 그러면 사람이 9 m/s로 차낸 공까지
   * 되잡는 자석이 된다(thiefPull 주석의 표). 그리고 급회전에서 공을 흘리는
   * 것은 이 게임의 드리블이 원래 그렇다 — 사람도 똑같이 놓친다(ball.ts D2).
   * 봇에게만 예외를 주는 대신, **회전하는 동안에는 도망가지 않게** 한다.
   * 이 시간 동안 도둑은 공 쪽을 목표로 삼아 제자리에서 몸을 돌린다.
   */
  thiefSettle: 0.9,
  /** 한 번 놓친 뒤 다시 뺏기까지 (초). 없으면 놓자마자 도로 가져간다 */
  thiefRegrab: 3.2,
  /** 공을 발 앞 이 거리에 붙여 놓는다 (m) */
  thiefKeepAhead: 0.95,
  /**
   * 공이 이 거리를 벗어나면 소유권이 끊긴다 (m).
   *
   * [자석이 되지 않게 하는 값] 공을 붙드는 것은 아래 thiefPull 의 **가속
   * 상한**이 전부다. 사람이 킥으로 공을 이 밖으로 보내면 도둑은 그대로
   * 놓친다 - "뺏긴 공은 되찾을 수 있다"가 성립하는 근거다.
   */
  thiefKeepMax: 2.6,
  /**
   * 공을 발 앞에 붙들어 두는 가속 상한 (m/s^2).
   *
   * [이 값이 「자석이냐 아니냐」를 혼자 결정한다 — 실측]
   * 소유가 끊기는 조건은 거리(thiefKeepMax = 2.6m)뿐이므로, 도둑이 차인 공을
   * 2.6m 안에서 되잡을 수 있으면 사람이 아무리 세게 차도 소용이 없다.
   * 등가속으로 v 를 죽이는 거리가 v^2 / 2a 이므로 **a < v^2 / 5.2** 여야
   * v m/s 로 찬 공이 달아난다.
   * ```
   *   pull   9 m/s 로 찬 공      13 m/s 로 찬 공
   *    26    되잡힌다 (자석)     달아난다
   *    14    달아난다            달아난다
   * ```
   * 9 m/s 는 반쯤 차징한 킥이다. 그것조차 못 뺏어오면 「되찾을 수 있다」가
   * 거짓말이 된다. 반대로 너무 낮추면 도둑이 자기 발 앞에 공을 못 붙인다 —
   * 목표 속도를 도둑 속도(최고 4.6 m/s)에 맞추는 데는 14로도 0.33초면 된다.
   */
  thiefPull: 14,
  /** 위치 오차를 목표 속도로 바꾸는 계수 (1/s). 클수록 공이 발 앞에 딱 붙는다 */
  thiefKp: 6,
  /** 도망갈 때 코스 가장자리에서 남기는 여유 (m) */
  thiefFleeMargin: 2.0,
  /** 사람이 이 거리 안에서 이 속도 이상으로 부딪히면 공을 떨어뜨린다 */
  thiefBumpDist: 1.25,
  thiefBumpSpeed: 2.4,
  /** 부딪혀 뺏겼을 때 도둑이 넘어져 있는 시간 (초) */
  thiefBumpKnock: 0.9,
};

export type BotRole = "chaser" | "blocker" | "bruiser" | "thief";

/** 이름이 맞는 역할인가 (맵이 문자열로 적으므로 한 번 걸러 받는다) */
const ROLES: ReadonlySet<string> = new Set<BotRole>(["chaser", "blocker", "bruiser", "thief"]);
export function isBotRole(s: string): s is BotRole { return ROLES.has(s); }

/** bot id(-1, -2, ...) -> 역할. 뒤 번호일수록 방해가 다양해진다 */
const ROLE_BY_INDEX: BotRole[] = ["chaser", "chaser", "blocker", "bruiser", "chaser", "blocker"];
export function roleForBot(botId: number): BotRole {
  return ROLE_BY_INDEX[(-botId - 1) % ROLE_BY_INDEX.length] ?? "chaser";
}

export interface BotUpdateCtx {
  /** 지금 공을 안고 있는 사람들 (들이받아 놓치게 만들 대상) */
  carriers: Ragdoll[];
  /** 살아있는 사람 플레이어들 (blocker/bruiser가 위치 판단에 쓴다) */
  humans: Ragdoll[];
  /** 골 z (blocker가 "공과 골 사이"를 계산하는 데 쓴다) */
  goalZ: number;
  /** 이 봇의 역할 (id로 정해진다) */
  role: BotRole;
}

interface BotState {
  /** 지연 인식을 위한 공 상태 기록 (오래된 것이 앞) */
  memory: { t: number; x: number; z: number; vx: number; vz: number }[];
  /** 지금 향하고 있는 방향 (정규화). 여기서 목표 방향으로 서서히 돈다 */
  dirX: number;
  dirZ: number;
  stealTimer: number;
  bumpTimer: number;
  /** bruiser의 밀어내기 쿨다운 */
  shoveTimer: number;
  /** chaser의 태클 쿨다운 */
  tackleTimer: number;
  clock: number;
  /** thief - 지금 공을 끌고 가는 중인가 / 남은 도주 시간 / 다시 뺏기까지 */
  owning: boolean;
  fleeT: number;
  regrabT: number;
}

/** 공 도둑이 이번 스텝에 일으킨 사건 (연출·안내를 main.ts 가 붙인다) */
export type ThiefEvent =
  | { kind: "stole" }                       // 방금 공을 빼앗았다
  | { kind: "lost"; by: Ragdoll | null };   // 공을 놓쳤다 (by = 부딪힌 사람)

export interface BotBumpResult {
  /** 캐리를 풀어야 하는 래그돌들 */
  brokeCarry: Ragdoll[];
}

export function createBots(laneHalf: number) {
  const states = new Map<Ragdoll, BotState>();

  function stateOf(rag: Ragdoll): BotState {
    let s = states.get(rag);
    if (!s) {
      s = {
        memory: [], dirX: 0, dirZ: -1,
        stealTimer: 0, bumpTimer: 0, shoveTimer: 0, tackleTimer: 0, clock: 0,
        owning: false, fleeT: 0, regrabT: 0,
      };
      states.set(rag, s);
    }
    return s;
  }

  function forget(rag: Ragdoll) { states.delete(rag); }

  /**
   * 봇 하나의 이번 스텝 이동 입력을 만든다.
   *
   * @returns 이 봇이 이번 스텝에 캐리를 깨뜨린 사람들
   */
  function update(
    rag: Ragdoll,
    ball: CANNON.Body,
    dt: number,
    ctx: BotUpdateCtx,
  ): { input: RagdollInput; brokeCarry: Ragdoll[]; tackled: Ragdoll[]; thief?: ThiefEvent } {
    const { carriers, humans, goalZ, role } = ctx;
    const s = stateOf(rag);
    s.clock += dt;
    s.stealTimer = Math.max(0, s.stealTimer - dt);
    s.bumpTimer = Math.max(0, s.bumpTimer - dt);
    s.shoveTimer = Math.max(0, s.shoveTimer - dt);
    s.tackleTimer = Math.max(0, s.tackleTimer - dt);
    s.regrabT = Math.max(0, s.regrabT - dt);

    const brokeCarry: Ragdoll[] = [];
    const tackled: Ragdoll[] = [];
    let thief: ThiefEvent | undefined;

    // ---- 공 위치를 "조금 전 것"으로 기억한다
    s.memory.push({ t: s.clock, x: ball.position.x, z: ball.position.z, vx: ball.velocity.x, vz: ball.velocity.z });
    while (s.memory.length > 2 && s.memory[1].t <= s.clock - BOT.reactionTime) s.memory.shift();
    const seen = s.memory[0];

    // 넘어져 있으면 아무것도 못 한다 (사람과 같다).
    // 도둑이라면 그 순간 공을 놓는다 - **넘어뜨리는 것이 공을 되찾는 방법**이다.
    if (rag.state !== "ACTIVE") {
      if (s.owning) { s.owning = false; s.fleeT = 0; s.regrabT = BOT.thiefRegrab; thief = { kind: "lost", by: null }; }
      return { input: { moveX: 0, moveZ: 0, jump: false }, brokeCarry, tackled, thief };
    }

    const p = rag.pelvis.position;
    const limit = laneHalf - BOT.laneMargin;

    // 가장 가까운 살아있는 사람 (blocker/bruiser가 쓴다)
    let nearHuman: Ragdoll | null = null, nearHumanD = Infinity;
    for (const h of humans) {
      if (h.state !== "ACTIVE") continue;
      const d = Math.hypot(h.pelvis.position.x - p.x, h.pelvis.position.z - p.z);
      if (d < nearHumanD) { nearHumanD = d; nearHuman = h; }
    }
    const carrier = carriers.find((c) => c.state === "ACTIVE") ?? null;

    // ---- 공 도둑: 뺏기 / 붙들기 / 놓치기
    //
    // 이 블록은 목표 지점을 정하기 **전에** 돌아야 한다. 지금 공을 끌고 가는
    // 중인지에 따라 어디로 갈지가 통째로 달라지기 때문이다.
    if (role === "thief" && s.clock >= BOT.spawnGrace) {
      const bx = ball.position.x - p.x;
      const bz = ball.position.z - p.z;
      const bd = Math.hypot(bx, bz);

      if (!s.owning) {
        // 안고 있는 사람에게서는 못 뺏는다 (그건 bumpDist 쪽 일이다).
        const heldByHuman = carriers.some((c) => c.state === "ACTIVE");
        if (!heldByHuman && s.regrabT <= 0 && bd < BOT.thiefStealDist) {
          s.owning = true;
          s.fleeT = BOT.thiefFleeTime;
          thief = { kind: "stole" };
        }
      } else {
        s.fleeT -= dt;
        // 놓치는 세 가지 경우: 시간이 다 됐다 / 공이 멀리 달아났다 /
        // 사람이 달려와 부딪혔다.
        let lostBy: Ragdoll | null | undefined;
        if (s.fleeT <= 0 || bd > BOT.thiefKeepMax) lostBy = null;
        if (lostBy === undefined) {
          for (const h of humans) {
            if (h.state !== "ACTIVE") continue;
            const hp = h.pelvis.position;
            const dx = hp.x - p.x, dz = hp.z - p.z;
            const d = Math.hypot(dx, dz);
            if (d > BOT.thiefBumpDist || d < 1e-3) continue;
            // 서로 다가오는 속도. 그냥 옆에 서 있는 것으로는 안 뺏긴다.
            const rvx = h.pelvis.velocity.x - rag.pelvis.velocity.x;
            const rvz = h.pelvis.velocity.z - rag.pelvis.velocity.z;
            if (-(rvx * (dx / d) + rvz * (dz / d)) < BOT.thiefBumpSpeed) continue;
            // [상대속도만으로는 부족했다 — 실측] 가만히 선 사람에게 도둑이
            // 달려와 부딪히기만 해도 상대속도가 문턱을 넘는다. 그러면 길목에
            // **서 있기만** 해도 공이 돌아오는 셈이라, 「달려가 부딪혀 뺏는다」가
            // 아니라 「막고 서 있으면 알아서 뺏긴다」가 된다.
            // 사람 자신도 움직이고 있어야 한다.
            if (Math.hypot(h.pelvis.velocity.x, h.pelvis.velocity.z) < BOT.thiefBumpSpeed) continue;
            lostBy = h;
            break;
          }
        }
        if (lostBy !== undefined) {
          s.owning = false;
          s.fleeT = 0;
          s.regrabT = BOT.thiefRegrab;
          if (lostBy) {
            // 부딪혀 뺏겼으면 도둑이 자빠진다 - 그래야 되찾은 게 눈에 보인다
            rag.knockdown(BOT.thiefBumpKnock);
            const l = Math.hypot(p.x - lostBy.pelvis.position.x, p.z - lostBy.pelvis.position.z) || 1;
            rag.pelvis.applyImpulse(new CANNON.Vec3(
              ((p.x - lostBy.pelvis.position.x) / l) * BOT.tackleImpulse, 10,
              ((p.z - lostBy.pelvis.position.z) / l) * BOT.tackleImpulse,
            ));
            rag.pelvis.wakeUp();
          }
          thief = { kind: "lost", by: lostBy };
        } else {
          // ---- 공을 발 앞에 붙들어 둔다.
          //
          // [위치만 당기면 안 된다 — 실측] 처음엔 목표 지점으로 끌어당기기만
          // 했다. 그랬더니 도둑이 **뺏자마자 놓쳤다**: 뺏은 자리에서 몸을 돌려
          // (turnRate 3.2 rad/s = 반 바퀴에 1초) 반대쪽으로 달아나는 동안 공은
          // 제자리에 남고, 도둑만 4.6 m/s로 멀어져서 0.9초 만에 간격이 6m가
          // 됐다(thiefKeepMax 2.6 밖). 위치 오차만 보는 힘은 **도둑이 이미
          // 내고 있는 속도를 모른다.**
          //
          // 그래서 속도까지 맞춘다: 목표 속도 = 도둑의 속도 + 위치 오차 보정.
          // 공이 도둑과 같은 속도로 움직이는 것이 기본이고, 어긋난 만큼만
          // 더 당긴다.
          //
          // [자석이 아니다] 가속에는 상한(thiefPull)이 있고, 사람이 킥으로 공을
          // thiefKeepMax 밖으로 보내면 위에서 소유권이 끊긴다. 풀차지 킥이
          // 13 m/s인데 이 상한으로는 그걸 따라잡을 수 없다 — 힘이 아니라
          // 거리로 결판난다.
          const tX = p.x + s.dirX * BOT.thiefKeepAhead;
          const tZ = p.z + s.dirZ * BOT.thiefKeepAhead;
          const wantVx = rag.pelvis.velocity.x + (tX - ball.position.x) * BOT.thiefKp;
          const wantVz = rag.pelvis.velocity.z + (tZ - ball.position.z) * BOT.thiefKp;
          let ax = wantVx - ball.velocity.x;
          let az = wantVz - ball.velocity.z;
          const ad = Math.hypot(ax, az);
          if (ad > 1e-3) {
            // 가속 상한 안에서만 당긴다 (a = min(pull, ad/dt))
            const acc = Math.min(BOT.thiefPull, ad / dt);
            ball.applyImpulse(new CANNON.Vec3(
              (ax / ad) * acc * ball.mass * dt, 0, (az / ad) * acc * ball.mass * dt,
            ));
            ball.wakeUp();
          }
        }
      }
    }

    // ---- 목표 지점을 역할별로 정한다.
    let tx: number, tz: number;
    if (role === "thief" && s.owning && s.fleeT > BOT.thiefFleeTime - BOT.thiefSettle) {
      // 뺏은 직후: 아직 도망가지 않는다. 공 쪽을 보며 몸을 돌린다
      // (BOT.thiefSettle 주석 — 여기서 달아나면 공을 두고 간다).
      tx = ball.position.x;
      tz = ball.position.z;
    } else if (role === "thief" && s.owning) {
      // 공을 가진 도둑은 **골 반대쪽으로** 도망간다. 가장 가까운 사람에게서도
      // 멀어지는 쪽으로 옆으로 빠지므로, 한 명이 앞을 막아야 방향이 꺾인다.
      const away = goalZ < 0 ? 1 : -1;                 // 골이 -Z면 +Z로 도망
      tz = p.z + away * 14;
      tx = p.x;
      if (nearHuman) {
        const hx = nearHuman.pelvis.position.x;
        tx = p.x + (p.x - hx >= 0 ? 1 : -1) * 5;
      }
      const edge = laneHalf - BOT.thiefFleeMargin;
      tx = Math.max(-edge, Math.min(edge, tx));
    } else if (role === "bruiser") {
      // 공을 든 사람(없으면 가장 가까운 사람)에게 달려가 밀어낸다. 공은 안 쫓는다.
      const mark = carrier ?? nearHuman;
      if (mark) {
        tx = mark.pelvis.position.x + mark.pelvis.velocity.x * BOT.carrierLead;
        tz = mark.pelvis.position.z + mark.pelvis.velocity.z * BOT.carrierLead;
      } else {
        tx = seen.x; tz = seen.z;
      }
    } else if (role === "blocker") {
      // 공과 골 사이 길목에 선다 (공보다 골 쪽으로 blockAhead 만큼 앞).
      // x는 레인 중앙 쪽으로 당겨 실제로 길을 막게 한다.
      const gdir = goalZ < seen.z ? -1 : 1;   // 공에서 골로 가는 방향 (보통 -1)
      tx = seen.x * 0.45;
      tz = seen.z + gdir * BOT.blockAhead;
      if (gdir < 0) tz = Math.max(tz, goalZ + 3);   // 골을 지나쳐 서지 않는다
      // 이미 길목을 잡았고 공이 멀면 자리를 지킨다 (뒤로 안 쫓아간다).
      const ballFar = Math.hypot(seen.x - p.x, seen.z - p.z) > 7;
      if (ballFar && (p.z - seen.z) * gdir >= BOT.blockAhead * 0.5) { tx = p.x * 0.9; tz = p.z; }
    } else {
      // chaser: 공을 든 사람이 있으면 그 사람을, 없으면 공이 "갈 자리"를 노린다.
      if (carrier) {
        tx = carrier.pelvis.position.x + carrier.pelvis.velocity.x * BOT.carrierLead;
        tz = carrier.pelvis.position.z + carrier.pelvis.velocity.z * BOT.carrierLead;
      } else {
        const rawDist = Math.hypot(seen.x - p.x, seen.z - p.z);
        const lead = Math.min(BOT.leadTime, rawDist / 6);
        tx = seen.x + seen.vx * lead;
        tz = seen.z + seen.vz * lead;
      }
    }
    tx = Math.max(-limit, Math.min(limit, tx));

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

    // ---- 공을 걷어찬다 (bruiser는 공을 안 건드린다 - 사람만 노린다)
    const bdx = ball.position.x - p.x;
    const bdz = ball.position.z - p.z;
    // (도둑은 공을 걷어차지 않는다 - 가져가는 게 일이라 차 버리면 자기 공을 잃는다)
    if (role !== "bruiser" && role !== "thief"
        && Math.hypot(bdx, bdz) < BOT.stealDist && s.stealTimer <= 0 && s.clock >= BOT.spawnGrace) {
      ball.applyImpulse(new CANNON.Vec3(s.dirX * BOT.stealImpulse, 0.8, s.dirZ * BOT.stealImpulse));
      ball.wakeUp();
      s.stealTimer = BOT.stealCooldown;
    }

    // ---- 공을 안고 있는 사람을 들이받으면 놓치게 한다 (모든 역할)
    if (s.bumpTimer <= 0 && s.clock >= BOT.spawnGrace) {
      for (const c of carriers) {
        const cp = c.pelvis.position;
        if (Math.hypot(cp.x - p.x, cp.z - p.z) > BOT.bumpDist) continue;
        brokeCarry.push(c);
        s.bumpTimer = BOT.bumpCooldown;
        break;
      }
    }

    // ---- bruiser: 가까운 사람을 코스 밖으로 밀어낸다 (넘어뜨리지 않는다).
    //
    // 임펄스만 준다 - 물리 충돌이라 세게 밀리면 스스로 균형을 잃고 넘어질
    // "수도" 있지만(ragdoll.ts 자체 판정), 매번 knockdown을 걸지는 않는다.
    // 그래야 "웃긴 상황"이지 "짜증"이 아니다.
    if (role === "bruiser" && s.shoveTimer <= 0 && s.clock >= BOT.spawnGrace) {
      for (const h of humans) {
        if (h.state !== "ACTIVE") continue;
        const hp = h.pelvis.position;
        let dx = hp.x - p.x, dz = hp.z - p.z;
        const d = Math.hypot(dx, dz);
        if (d > BOT.shoveDist || d < 1e-3) continue;
        dx /= d; dz /= d;
        // 옆(코스 밖)으로 더 실어준다 - 앞으로만 밀면 오히려 골 쪽으로 보내준다.
        const sideX = hp.x >= 0 ? 1 : -1;
        h.pelvis.applyImpulse(new CANNON.Vec3(
          (dx * 0.4 + sideX * 0.9) * BOT.shoveImpulse, BOT.shoveUp, dz * 0.4 * BOT.shoveImpulse,
        ));
        h.pelvis.wakeUp();
        s.shoveTimer = BOT.shoveCooldown;
        break;
      }
    }

    // ---- chaser: 가끔 공 근처의 사람에게 엉겨 태클 -> 둘 다 넘어진다
    //
    // 봇도 스스로 knockdown 되므로 "봇이 이득만 보는" 게 아니라 진짜 사고다.
    // chaser 만, 공 다툼 중일 때만, 6.5s 쿨다운 - 넘어뜨리기 락이 아니라 "가끔".
    if (role === "chaser" && s.tackleTimer <= 0 && s.clock >= BOT.spawnGrace) {
      const nearBall = (h: Ragdoll) =>
        Math.hypot(h.pelvis.position.x - ball.position.x, h.pelvis.position.z - ball.position.z) < BOT.tackleBallDist;
      for (const h of humans) {
        if (h.state !== "ACTIVE") continue;
        const hp = h.pelvis.position;
        let dx = hp.x - p.x, dz = hp.z - p.z;
        const d = Math.hypot(dx, dz);
        if (d > BOT.tackleDist || d < 1e-3 || !nearBall(h)) continue;
        dx /= d; dz /= d;
        // 사람은 봇 반대쪽으로, 봇은 자기 쪽으로 - 서로 엉켜 자빠진다
        h.pelvis.applyImpulse(new CANNON.Vec3(dx * BOT.tackleImpulse, 12, dz * BOT.tackleImpulse));
        rag.pelvis.applyImpulse(new CANNON.Vec3(-dx * BOT.tackleImpulse * 0.7, 10, -dz * BOT.tackleImpulse * 0.7));
        rag.knockdown(BOT.tackleKnockTime);
        rag.pelvis.wakeUp(); h.pelvis.wakeUp();
        tackled.push(h);
        s.tackleTimer = BOT.tackleCooldown;
        break;
      }
    }

    return { input: { moveX: s.dirX, moveZ: s.dirZ, jump: false }, brokeCarry, tackled, thief };
  }

  /** 이 봇이 지금 공을 끌고 가는 중인가 (HUD 안내 / 테스트에서 읽는다) */
  function owningBall(rag: Ragdoll): boolean {
    return states.get(rag)?.owning ?? false;
  }

  return { update, forget, stateOf, owningBall };
}
