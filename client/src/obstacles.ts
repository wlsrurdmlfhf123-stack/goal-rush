import * as CANNON from "cannon-es";
import type { Ragdoll } from "./ragdoll";
import type { World } from "./world";

/**
 * 코스 장애물 — 회전봉 / 좌우 피스톤 / 굴러오는 거대 공.
 *
 * hazards.ts(위에서 떨어지는 공)는 그대로 두고, 그 옆에 "코스에 박혀서
 * 계속 움직이는" 장애물을 더한다. 낙하물은 피하는 것 말고 할 게 없지만
 * 이쪽은 공을 어떻게 통과시킬지가 매번 달라진다.
 *
 *   회전봉  - 몸은 봉 아래로 못 지나가지만 공은 굴려서 통과시킬 수 있다.
 *             봉에 맞은 공은 옆으로 날아간다. 킥으로 타이밍 맞춰 넘기거나,
 *             E로 안고 봉이 지나간 직후에 뛰어드는 선택이 생긴다.
 *   피스톤  - 좌우에서 번갈아 튀어나온다. 길이 좁아지는 타이밍이 생겨서
 *             드리블로는 통과가 어렵고 킥/캐리가 유리하다.
 *   거대 공 - 코스를 거슬러 굴러온다. 맞으면 넘어진다. 몸으로는 피하고
 *             공은 옆 레인으로 빼놔야 한다.
 *
 * [플레이어를 쫓지 않는다]
 * 낙하 장애물과 같은 원칙이다. 어느 것도 플레이어 좌표나 입력을 읽지 않는다.
 * 회전봉/피스톤은 위상만으로 움직이고, 거대 공이 굴러 내려오는 x는 station
 * 번호와 사이클로 정해지는 시드 난수다. 그래서 보고 피할 수 있다.
 *
 * [멀티 동기화]
 * 전부 맵을 만들 때 미리 만들어 두고 재활용한다. 그러면 host가 보내는 기존
 * objects 스냅샷에 위치/회전이 그대로 실려 간다 (hazards.ts와 같은 이유).
 */

export const OB = {
  // ---- 회전봉
  /** 봉이 도는 속도 (rad/s) */
  spinRate: 1.5,
  /**
   * 봉 높이 (바닥에서 봉 중심까지).
   *
   * [넘어진 사람 위로 지나가야 한다] 0.75로 뒀더니 봉이 y 0.58~0.92를
   * 쓸고 지나갔는데, 이건 서 있는 골반 높이(0.86)이면서 동시에 넘어져
   * 누워 있는 몸에도 닿는 높이다. 그래서 한 번 맞아 쓰러지면 일어나는
   * 도중에 다음 봉에 또 맞아 영원히 못 일어났다
   * (실측: 60초 동안 z가 -8에서 그대로였다).
   * 1.05로 올리면 봉 아랫면이 0.88이라 누운 몸(대부분 0.5 이하) 위로
   * 지나가고, 서 있으면 몸통을 쳐서 쓰러뜨린다.
   */
  spinY: 1.05,
  /** 봉 두께 */
  spinThick: 0.34,

  // ---- 좌우 피스톤
  /** 왕복 한 번에 걸리는 시간 (초) */
  pistonPeriod: 4.4,
  /** 밀려나온 상태로 머무는 비율 */
  pistonOutFrac: 0.32,
  /** 피스톤 속도 (m/s) */
  pistonSpeed: 5.5,
  /** 피스톤 몸통 크기 */
  pistonW: 1.5,
  pistonH: 1.5,
  pistonD: 2.6,

  // ---- 굴러오는 거대 공
  /** 반지름 */
  rollR: 1.9,
  /** 질량. 사람(약 20kg)보다 훨씬 무거워야 튕겨낸다 */
  rollMass: 120,
  /** 굴러오는 속도 (+Z 방향 = 플레이어 쪽) */
  rollSpeed: 7.5,
  /** 한 번 굴리고 다음까지 쉬는 시간 (초) */
  rollPeriod: 7.0,
  /**
   * 출발 지점에서 이만큼 굴러가면 회수한다 (m).
   *
   * 거대 공이 자기 구간을 넘어 좁은 다리까지 굴러가면 다리 위에서 떨어져
   * 버린다. 구간 안에서만 왕복하도록 짧게 잡는다.
   */
  rollRun: 18,
  /** 대기 중에 숨겨두는 높이 */
  rollParkY: -40,

  // ---- 좌우 왕복 (sweeper)
  //
  // 피스톤이 "옆에서 잠깐 튀어나왔다 들어가는" 것이라면, 이건 레인 전체를
  // 가로질러 계속 오간다. 그래서 "지나갈 틈"이 항상 한쪽에만 있고, 그 틈이
  // 좌우로 움직인다. 공을 끌고 그 틈을 따라가야 해서 드리블 방향 전환을 쓴다.
  /** 봉 크기 */
  sweepW: 2.2,
  sweepH: 1.3,
  sweepD: 0.7,
  /** 한쪽 끝에서 반대 끝까지 가는 속도 (m/s) */
  sweepSpeed: 3.6,
  /**
   * 봉 바깥면과 난간 사이에 남기는 여유 (m).
   *
   * 0이면 가장자리에 선 사람이 난간과 봉 사이에 끼여 빠져나갈 수 없다.
   * 사람 몸 폭이 0.4 남짓이므로 0.6이면 붙어 서서 버틸 수 있다.
   */
  sweepEdgeGap: 0.6,

  // ---- 솟았다 내려가는 벽 (popup)
  //
  // 바닥에서 올라와 길을 막았다가 다시 내려간다. 내려가 있는 동안 지나가면
  // 되는데, 올라올 때 공만 걸리면 공이 튕겨 나간다. 그래서 "공을 먼저 굴려
  // 보내고 몸이 따라가는" 판단이 생긴다.
  popW: 5.4,
  popH: 1.5,
  popD: 0.6,
  /** 한 주기 (초) */
  popPeriod: 3.4,
  /** 그중 올라와 있는 비율 */
  popUpFrac: 0.42,
  /** 오르내리는 속도 (m/s) */
  popSpeed: 4.5,
  /** 내려갔을 때 윗면이 바닥 아래로 잠기는 깊이 */
  popSink: 0.15,

  // ---- 열렸다 닫히는 통로 (shutter)
  //
  // 좌우 셔터가 가운데로 모였다(닫힘) 레인 밖으로 물러난다(열림).
  // 닫혔을 때 가운데에 shutterGapHalf 만큼의 좁은 틈만 남는다 - 공은 넉넉히
  // 지나가지만 사람은 아슬아슬하다. 그래서 선택지가 셋이 된다:
  //   1) 열릴 때까지 기다린다 (Q 스톱턴으로 공을 세워두고)
  //   2) 좁은 틈으로 공만 차 넣고 몸은 열릴 때 따라간다
  //   3) 닫히기 전에 그냥 뚫는다
  // 셔터는 kinematic이라 닫힐 때 걸리면 실제로 밀려난다.
  shutterH: 1.6,
  shutterD: 0.6,
  /** 한 주기 (초) */
  shutterPeriod: 4.0,
  /** 셔터가 움직이는 속도 (m/s) */
  shutterSpeed: 3.2,
  /**
   * 닫혔을 때 가운데에 남기는 틈의 반폭.
   *
   * [0.35 -> 0.55] 0.35면 틈이 0.7m다. 캐릭터 몸 폭을 생각하면 뚫고 지나가는
   * 게 실력이 아니라 운이 됐다(어깨가 걸리면 그냥 튕긴다). 1.1m면 조준해서
   * 들어가면 통과하고, 대충 달려들면 걸린다 = 판단이 의미를 갖는다.
   */
  shutterGapHalf: 0.55,

  // ---- 협동 게이트 (coopgate)
  //
  // 멀티에서만 닫혀 있다. 한 명이 찬 공을 다른 사람이 받으면 열린다.
  // 혼자 플레이할 때는 처음부터 열어둔다 - 싱글이 막히면 안 되기 때문이다.
  //
  // 움직임은 다른 장애물처럼 위상으로 정해지지 않고 바깥(main.ts의 패스 판정)이
  // open()을 불러야 열린다. 그래서 station에 opened 플래그를 따로 둔다.
  gateW: 5.6,
  gateH: 2.6,
  gateD: 0.5,
  /** 열릴 때 바닥 아래로 잠기는 깊이 */
  gateSink: 3.2,
  /** 열리는 속도 (m/s) */
  gateSpeed: 4.0,
  /** 셔터 한 장의 폭. 레인 반폭(7) - 가운데 틈(0.55) */
  shutterW: 6.45,

  // ---- 버튼 문 (buttongate)
  //
  // 좌우 발판을 "동시에" 밟고 있는 동안만 열린다. 손을 떼면 다시 닫힌다.
  // coopgate가 한 번 열면 끝나는 일회성 관문이라면, 이건 유지해야 하는
  // 장치다. 그래서 둘이 역할을 나눌 수밖에 없다 - 한 명은 발판을 밟고
  // 서 있고, 다른 한 명이 공을 몰고 문을 지난다. 그 다음 밟고 있던 쪽이
  // 뛰어와야 하니 "빨리 지나가고 기다려 줘"가 자연스럽게 나온다.
  //
  // 발판이 둘 다 필요하므로 혼자서는 물리적으로 불가능하다 - 싱글에서는
  // coopgate와 똑같이 rebuild 직후 열어둔다(main.ts의 syncCoopGates).
  /** 발판 중심의 좌우 위치 */
  btnPadX: 4.6,
  /** 발판이 문보다 얼마나 앞(+Z)에 있는가 */
  btnPadAhead: 3.6,
  /** 발판 반폭 / 반길이 */
  btnPadHalf: 1.15,
  /** 발판 판정 높이 - 이 아래에 골반이 있어야 밟은 것으로 친다 */
  btnPadMaxY: 1.5,

  /** 거대 공에 맞은 판정 여유 */
  rollHitPad: 0.6,
  /** 넉백 충격량 */
  rollKnockSide: 90,
  rollKnockUp: 30,
  rollKnockdownTime: 1.4,
  rollHitCooldown: 1.3,

  // ---- 움직이는 장애물 피격 (거대 공 외 나머지)
  //
  // [왜 필요한가] roller만 rag.knockdown()을 직접 불렀고 나머지 장애물은
  // ragdoll.ts의 범용 충격 임계값(P.impactSpeed = 13 m/s)에 기대고 있었다.
  // 그런데 피스톤이 5.5, 스위퍼가 3.6, 셔터가 3.2 m/s다. 코어(머리/몸통/
  // 골반)의 상대 충돌 속도가 13에 닿을 일이 없으니 사실상 아무도 안
  // 넘어졌다 - 실측으로 스테이지 1·2를 완주하는 동안 넘어짐이 0회였다.
  // 회전봉 옆을 스쳐도, 셔터에 끼어도 그냥 밀리기만 했다.
  //
  // 그래서 kind별로 명시적인 피격 판정을 둔다. 판정은 바디의 실제 shape
  // 크기를 로컬 좌표로 가져다 쓰므로(회전봉의 회전까지 포함) 여기서 치수를
  // 다시 적지 않는다 - 장애물 크기를 바꿔도 판정이 따라온다.
  /** 가로 판정 여유 (사람 몸 반지름 몫) */
  hitPad: 0.42,
  /**
   * 세로 판정 여유.
   *
   * 가로와 같은 0.42를 주면 회전봉 판정이 y 0.46까지 내려온다. 일어나는
   * 중인(state는 이미 ACTIVE인) 사람의 골반이 그 높이라서 회복하자마자
   * 다시 맞고 쓰러지는 무한 루프가 된다. 세로는 좁게 잡는다.
   */
  hitPadY: 0.12,
  /**
   * 이 속도 이상으로 움직이는 장애물만 사람을 넘어뜨린다 (m/s).
   *
   * 멈춰 서 있는 피스톤이나 다 열린 셔터는 그냥 벽이어야 한다. 벽에
   * 걸어가 부딪혔다고 넘어지면 짜증만 난다.
   */
  hitMinSpeed: 1.2,
  /**
   * 같은 사람을 다시 때리기까지 (초).
   *
   * [1.1 -> 2.4] knockdownTime(1.15)에 맞춰 뒀더니 넘어졌다 일어나는 그
   * 순간에 쿨다운이 풀려서 곧바로 다시 맞았다. spinY 주석이 경고한 무한
   * 루프가 그대로 재현됐다 - 실측으로 스테이지 1에서 회전봉 앞 z=-36에
   * 갇혀 공까지 뒤로 밀려 진행이 완전히 멈췄다. 넘어져 있는 시간(1.15)에
   * 일어나는 시간까지 더한 뒤에야 다시 맞도록 넉넉히 잡는다.
   */
  hitCooldownTime: 2.4,
  /**
   * 이 높이 위에 골반이 있어야 맞는다 (m).
   *
   * 쿨다운만으로는 부족하다. 일어나는 중인 사람은 state가 이미 ACTIVE라
   * 골반이 0.2에서 0.86으로 올라오는 동안 판정 높이를 스쳐 지나간다.
   * 서 있을 때(0.86)만 맞고 기어오르는 중에는 안 맞게 바닥을 둔다.
   */
  hitMinY: 0.62,
  /** 넉백 충격량 - 장애물 진행 방향 / 위로 */
  knockPush: 62,
  knockUp: 26,
  /** 넘어져 있는 시간 (초). 거대 공보다 짧게 - 빈도가 훨씬 높기 때문이다 */
  knockdownTime: 1.15,
};

export type ObstacleKind =
  | "spinner"   // 회전봉 - 몸은 못 지나가고 공은 굴려 통과
  | "piston"    // 좌우에서 튀어나오는 벽 - 길이 좁아지는 타이밍
  | "roller"    // 굴러오는 거대 공 - 몸은 피하고 공은 옆으로
  | "sweeper"   // 좌우로 끝까지 왕복하는 봉 - 지나갈 틈이 한쪽에만 생긴다
  | "popup"     // 바닥에서 솟았다 내려가는 벽 - 내려간 사이에 통과
  | "shutter"   // 가운데 통로가 열렸다 닫힌다 - 가운데냐 옆이냐를 고른다
  | "coopgate"    // 협동 게이트 - 패스를 성공해야 열린다 (멀티 전용)
  | "buttongate"; // 버튼 문 - 양쪽 발판을 둘이 동시에 밟고 있어야 열린다 (멀티 전용)

/** 맵이 선언하는 장애물 */
export interface ObstacleSpec {
  id: number;
  kind: ObstacleKind;
  /** 코스 상의 z 위치 */
  z: number;
  /** spinner: 봉 길이(반) / piston: 어느 쪽에서 나오는가(-1 왼쪽, +1 오른쪽) / roller: 안 씀 */
  arg: number;
  /** 시작 위상 (초). 서로 다르게 줘야 한꺼번에 안 움직인다 */
  phase: number;
}

interface Station {
  spec: ObstacleSpec;
  body: CANNON.Body;
  clock: number;
  /** roller 전용 - 지금 굴러가는 중인가 */
  rolling: boolean;
  /** roller 전용 - 이번 사이클의 x */
  x: number;
  cycle: number;
  /** piston 전용 - 안으로 들어갔을 때의 x */
  homeX: number;
  /**
   * buttongate 전용 - 싱글이라 발판 판정을 아예 건너뛰는가.
   *
   * 발판이 둘이라 혼자서는 열 수 없으므로, 싱글에서는 openGate()가 이 플래그를
   * 세워 계속 열린 채로 둔다. opened만 켜두면 다음 스텝의 발판 판정이 곧바로
   * 다시 false로 덮어써서 문이 닫혀 버린다.
   */
  forceOpen: boolean;
  /** coopgate 전용 - 열렸는가 (바깥에서 openGate()로 연다) */
  opened: boolean;
}

/** 결정론적 난수 (hazards.ts와 같은 방식) */
function hash01(a: number, b: number): number {
  let x = Math.imul(a + 1, 0x9e3779b1) ^ Math.imul(b + 1, 0x85ebca6b);
  x = Math.imul(x ^ (x >>> 16), 0x7feb352d);
  x = Math.imul(x ^ (x >>> 15), 0x846ca68b);
  return ((x ^ (x >>> 16)) >>> 0) / 4294967296;
}

export interface ObstacleHit {
  rag: Ragdoll;
  dirX: number;
  dirZ: number;
}

/**
 * 어떤 kind가 사람을 넘어뜨리는가. 거대 공은 자기 판정을 따로 갖는다.
 *
 * [popup은 뺐다] 솟아오르는 벽은 미는 방향이 위/뒤밖에 없어서 맞을 때마다
 * 플레이어를 코스 반대쪽으로 돌려보낸다. 실측으로 z=-20 팝업 앞에서 5번
 * 연달아 뒤로 넘어져 50초 동안 진행이 -25에서 멈췄다. 옆으로 쓸고 지나가는
 * 장애물(회전봉/피스톤/스위퍼/셔터)은 맞아도 옆으로 날아가니 진행이 사라지지
 * 않지만, 팝업은 "웃긴 실패"가 아니라 그냥 벽이 된다. 팝업은 원래 역할대로
 * 길을 막고 공을 튕겨내는 것까지만 한다.
 */
const KNOCKS: ReadonlySet<ObstacleKind> = new Set<ObstacleKind>([
  "spinner", "piston", "sweeper", "shutter",
]);

const _d = new CANNON.Vec3();
const _l = new CANNON.Vec3();

/**
 * 점이 바디(박스)의 안쪽에 있는가. 바디의 로컬 좌표로 옮겨서 검사하므로
 * 회전하는 회전봉도 같은 코드로 처리된다.
 *
 * shape이 박스가 아니면(거대 공 등) false - 그쪽은 자기 판정을 쓴다.
 */
function insideBody(b: CANNON.Body, p: CANNON.Vec3): boolean {
  const s = b.shapes[0];
  if (!(s instanceof CANNON.Box)) return false;
  const he = s.halfExtents;
  p.vsub(b.position, _d);
  b.quaternion.conjugate().vmult(_d, _l);
  return (
    Math.abs(_l.x) <= he.x + OB.hitPad &&
    Math.abs(_l.y) <= he.y + OB.hitPadY &&
    Math.abs(_l.z) <= he.z + OB.hitPad
  );
}

export function createObstacles(world: World, laneHalf: number) {
  let stations: Station[] = [];
  const hitCooldown = new Map<Ragdoll, number>();

  function rebuild() {
    stations = [];
    hitCooldown.clear();
    for (const spec of world.obstacleSpecs) {
      const obj = world.objectById.get(spec.id);
      if (!obj) continue;
      stations.push({
        spec, body: obj.body, clock: spec.phase,
        rolling: false, x: 0, cycle: 0,
        homeX: spec.arg * (laneHalf + OB.pistonW * 0.5),
        opened: false, forceOpen: false,
      });
    }
    park();
  }

  /** 전부 초기 상태로 되돌린다 */
  function park() {
    for (const s of stations) {
      s.clock = s.spec.phase;
      s.cycle = 0;
      s.rolling = false;
      s.opened = false;
      s.forceOpen = false;
      const b = s.body;
      b.velocity.setZero();
      b.angularVelocity.setZero();
      b.force.setZero();
      b.torque.setZero();
      switch (s.spec.kind) {
        case "spinner":
          b.position.set(0, OB.spinY, s.spec.z);
          // 회전은 여기서 한 번만 걸어두면 kinematic 적분이 계속 돌려준다
          b.angularVelocity.set(0, OB.spinRate, 0);
          break;
        case "piston":
          b.position.set(s.homeX, OB.pistonH * 0.5, s.spec.z);
          break;
        case "roller":
          b.position.set(0, OB.rollParkY, s.spec.z);
          break;
        case "sweeper":
          // 한쪽 끝에서 시작해 반대 끝까지 왕복한다
          b.position.set(-(laneHalf - OB.sweepW * 0.5 - OB.sweepEdgeGap), OB.sweepH * 0.5, s.spec.z);
          break;
        case "popup":
          // 내려간 상태에서 시작 (spec.phase 만큼 지나면 처음 솟는다)
          b.position.set(s.spec.arg * 2.4, -OB.popH * 0.5 - OB.popSink, s.spec.z);
          break;
        case "shutter":
          // 좌우 셔터는 바디 하나로 만든다 (arg가 -1이면 왼쪽, +1이면 오른쪽)
          b.position.set(s.spec.arg * (laneHalf + 1), OB.shutterH * 0.5, s.spec.z);
          break;
        case "coopgate":
        case "buttongate":
          // 닫힌 자리에서 시작한다. 싱글이면 rebuild 직후 openGate로 열린다.
          b.position.set(0, OB.gateH * 0.5, s.spec.z);
          break;
      }
      b.wakeUp();
    }
  }

  /**
   * host 전용. 한 스텝 진행한다.
   * @returns 이번 스텝에 거대 공에 맞은 사람들
   */
  function update(dt: number, players: Ragdoll[]): ObstacleHit[] {
    const hits: ObstacleHit[] = [];

    for (const [rag, t] of hitCooldown) {
      const nt = t - dt;
      if (nt <= 0) hitCooldown.delete(rag);
      else hitCooldown.set(rag, nt);
    }

    for (const s of stations) {
      s.clock += dt;
      const b = s.body;

      switch (s.spec.kind) {
        case "spinner":
          // kinematic이라 각속도만 유지되면 알아서 돈다. 다만 다른 물체와
          // 부딪히면서 위치가 밀릴 수 있으므로 축은 매 스텝 고정한다.
          b.position.set(0, OB.spinY, s.spec.z);
          b.velocity.setZero();
          b.angularVelocity.set(0, OB.spinRate, 0);
          break;

        case "piston": {
          // 사각파: 나와 있는 구간 / 들어가 있는 구간을 왕복한다.
          // 위치를 직접 넣지 않고 속도를 넣어야 부딪힌 물체를 실제로 밀어낸다.
          const t = s.clock % OB.pistonPeriod;
          const out = t < OB.pistonPeriod * OB.pistonOutFrac;
          const outX = s.spec.arg * (laneHalf - OB.pistonW * 0.9);
          const targetX = out ? outX : s.homeX;
          const dx = targetX - b.position.x;
          const v = Math.abs(dx) < 0.05 ? 0 : Math.sign(dx) * OB.pistonSpeed;
          b.velocity.set(v, 0, 0);
          b.position.y = OB.pistonH * 0.5;
          b.position.z = s.spec.z;
          break;
        }

        case "sweeper": {
          // 레인 끝에서 끝까지 등속 왕복. 위치가 아니라 속도를 넣어야
          // 부딪힌 공/사람이 실제로 밀려난다 (피스톤과 같은 이유).
          //
          // [끝에 여유를 남긴다] 예전 한계는 laneHalf - sweepW/2 였다. 그러면
          // 봉의 바깥면이 정확히 난간(±7)에 닿아서, 가장자리에 있던 사람은
          // 피할 틈이 0이 되어 난간과 봉 사이에 끼인다. 실측으로 스테이지 2를
          // 직접 몰고 갔을 때 z=-27 부근에서 반복해 쓰러지며 진행이 멈췄다.
          // "틈이 좌우로 움직인다"는 기믹은 그대로 두고, 가장자리에 사람 한
          // 명이 붙어 설 만큼만 남긴다.
          const half = laneHalf - OB.sweepW * 0.5 - OB.sweepEdgeGap;
          // 삼각파: 주기 T 동안 -half -> +half -> -half
          const span = half * 2;
          const T = (span * 2) / OB.sweepSpeed;
          const t = ((s.clock % T) + T) % T;
          const targetX = t < T / 2
            ? -half + (t / (T / 2)) * span
            : half - ((t - T / 2) / (T / 2)) * span;
          // [속도를 반드시 상한으로 묶는다] 원래 dx/dt를 그대로 넣었는데,
          // 봉이 공이나 사람에 밀려 목표에서 벗어나 있으면 dx가 커지고
          // dx/dt는 그대로 폭발한다. 한 스텝에 0.5m만 밀려 있어도
          // 0.5/0.0167 = 30 m/s짜리 봉이 되어 공을 코스 밖으로 날려버린다
          // (실측: 스테이지 3에서 공이 z=-89에서 -52로 37m 뒤로 날아가
          //  공 전용 틈 반대편까지 되돌아갔다).
          // 다른 장애물은 전부 sign(dx)*속도로 묶여 있다 - 여기만 빠져 있었다.
          const dx = targetX - b.position.x;
          const raw = dx / Math.max(1e-3, dt);
          b.velocity.set(Math.max(-OB.sweepSpeed, Math.min(OB.sweepSpeed, raw)), 0, 0);
          b.position.y = OB.sweepH * 0.5;
          b.position.z = s.spec.z;
          break;
        }

        case "popup": {
          // 사각파로 올라왔다 내려간다. 올라올 때 밑에 있던 공은 튕겨 나간다.
          const t = s.clock % OB.popPeriod;
          const up = t < OB.popPeriod * OB.popUpFrac;
          const upY = OB.popH * 0.5;
          const downY = -OB.popH * 0.5 - OB.popSink;
          const targetY = up ? upY : downY;
          const dy = targetY - b.position.y;
          b.velocity.set(0, Math.abs(dy) < 0.05 ? 0 : Math.sign(dy) * OB.popSpeed, 0);
          b.position.x = s.spec.arg * 2.4;
          b.position.z = s.spec.z;
          break;
        }

        case "shutter": {
          // 가운데로 모였다(닫힘) 레인 밖으로 물러난다(열림).
          const t = s.clock % OB.shutterPeriod;
          const closed = t < OB.shutterPeriod * 0.5;
          const width = OB.shutterW;
          const closedX = s.spec.arg * (OB.shutterGapHalf + width * 0.5);
          const openX = s.spec.arg * (laneHalf + width * 0.5);
          const targetX = closed ? closedX : openX;
          const dx = targetX - b.position.x;
          const v = Math.abs(dx) < 0.05 ? 0 : Math.sign(dx) * OB.shutterSpeed;
          b.velocity.set(v, 0, 0);
          b.position.y = OB.shutterH * 0.5;
          b.position.z = s.spec.z;
          break;
        }

        case "buttongate": {
          // 발판 점유를 매 스텝 다시 센다 - "유지해야 열려 있다"가 핵심이라
          // coopgate처럼 한 번 켜고 끝내면 안 된다.
          //
          // 싱글에서 forceOpen이 걸려 있으면(main.ts) 판정을 건너뛴다.
          // 발판이 둘이므로 혼자서는 애초에 열 수 없기 때문이다.
          if (!s.forceOpen) {
            // [양쪽 동시 -> 한 명이면 충분] 처음엔 좌우 발판을 서로 다른 두
            // 사람이 동시에 밟아야 열리게 했다. 그런데 사람이 딱 둘이면 둘
            // 다 발판에 묶여서 아무도 문을 지날 수 없다 - 실측으로 한 명이
            // 발판을 벗어나는 순간 문이 1.2초 만에 도로 닫혔다. 원하던
            // "한 명이 눌러주고 다른 한 명이 공을 몰고 지나간다"가 아예
            // 성립하지 않는 장치였다.
            //
            // 그래서 발판 하나만 밟혀 있으면 열린 것으로 본다. 발판이 둘인
            // 건 "아무 쪽이나 서면 된다"는 뜻이 된다.
            let held = false;
            for (const rag of players) {
              if (rag.state !== "ACTIVE") continue;
              const p = rag.pelvis.position;
              if (p.y > OB.btnPadMaxY) continue;
              if (Math.abs(p.z - (s.spec.z + OB.btnPadAhead)) > OB.btnPadHalf) continue;
              if (Math.abs(Math.abs(p.x) - OB.btnPadX) > OB.btnPadHalf) continue;
              held = true;
              break;
            }
            s.opened = held;

            // [지나가면 걸어 잠근다] 눌러주는 쪽도 결국 건너야 한다. 열려
            // 있는 동안 누가 문을 넘어갔으면 그 뒤로는 계속 열어 둔다 -
            // 안 그러면 눌러준 사람이 반대편에 영영 남는다.
            if (held) {
              for (const rag of players) {
                if (rag.pelvis.position.z < s.spec.z - OB.gateD) { s.forceOpen = true; break; }
              }
            }
          }
          const targetY = s.opened ? -OB.gateH * 0.5 - OB.gateSink : OB.gateH * 0.5;
          const dy = targetY - b.position.y;
          b.velocity.set(0, Math.abs(dy) < 0.05 ? 0 : Math.sign(dy) * OB.gateSpeed, 0);
          b.position.x = 0;
          b.position.z = s.spec.z;
          break;
        }

        case "coopgate": {
          // 위상이 아니라 opened 플래그로만 움직인다.
          const targetY = s.opened ? -OB.gateH * 0.5 - OB.gateSink : OB.gateH * 0.5;
          const dy = targetY - b.position.y;
          b.velocity.set(0, Math.abs(dy) < 0.05 ? 0 : Math.sign(dy) * OB.gateSpeed, 0);
          b.position.x = 0;
          b.position.z = s.spec.z;
          break;
        }

        case "roller": {
          if (!s.rolling) {
            if (s.clock >= OB.rollPeriod) {
              // 굴러 내려올 레인을 정한다. 플레이어 위치는 안 본다 -
              // station 번호와 사이클만으로 정해지는 시드 난수다.
              const r = hash01(s.spec.id, s.cycle);
              s.x = (r * 2 - 1) * (laneHalf - OB.rollR - 0.4);
              b.position.set(s.x, OB.rollR + 0.05, s.spec.z);
              // +Z = 플레이어가 오는 쪽. 구름 회전도 같이 걸어준다.
              //
              // [부호 주의] +Z로 굴러가는 구의 미끄러지지 않는 회전은
              // ωx = +v/R 이다 (접점 속도 = v - ωx·R = 0). 부호를 반대로
              // 주면 공이 진행 방향과 반대로 돌아서 바닥 마찰이 곧바로
              // 속도를 깎아먹는다 (실측: 7.5 m/s가 2초 만에 1.3까지 죽었다).
              b.velocity.set(0, 0, OB.rollSpeed);
              b.angularVelocity.set(OB.rollSpeed / OB.rollR, 0, 0);
              b.wakeUp();
              s.rolling = true;
              s.clock = 0;
            }
          } else {
            // 다 굴렀으면 회수한다
            if (b.position.z > s.spec.z + OB.rollRun || b.position.y < -5) {
              b.position.set(0, OB.rollParkY, s.spec.z);
              b.velocity.setZero();
              b.angularVelocity.setZero();
              s.rolling = false;
              s.cycle++;
              s.clock = 0;
            }
          }
          break;
        }
      }

      // ---- 움직이는 장애물 피격 판정
      //
      // 위 switch가 이번 스텝의 b.velocity를 이미 정해놨다. 그 속도를 그대로
      // 넉백 방향으로 쓰면 "밀려난 쪽으로 날아간다"가 자연스럽게 나온다.
      // 회전봉만 예외 - 축이 고정이라 선속도가 0이므로 접선속도를 만든다.
      if (KNOCKS.has(s.spec.kind)) {
        let px = b.velocity.x, pz = b.velocity.z;
        let speed = Math.hypot(px, pz, b.velocity.y);

        if (s.spec.kind === "spinner") {
          // ω × r 의 수평 성분. ω = (0, spinRate, 0)
          speed = Infinity;   // 봉은 항상 돌고 있다
        }

        if (speed >= OB.hitMinSpeed) {
          for (const rag of players) {
            if (rag.state !== "ACTIVE") continue;
            if (hitCooldown.has(rag)) continue;
            if (rag.pelvis.position.y < OB.hitMinY) continue;
            if (!insideBody(b, rag.pelvis.position)) continue;

            let dx = px, dz = pz;
            if (s.spec.kind === "spinner") {
              const rx = rag.pelvis.position.x - b.position.x;
              const rz = rag.pelvis.position.z - b.position.z;
              dx = OB.spinRate * rz;
              dz = -OB.spinRate * rx;
            }
            const l = Math.hypot(dx, dz);
            if (l < 1e-3) {
              // popup처럼 수직으로만 움직이는 장애물은 밀 방향이 없다.
              // 왔던 쪽(+Z)으로 튕겨낸다.
              dx = 0; dz = 1;
            } else {
              dx /= l; dz /= l;
            }

            rag.knockdown(OB.knockdownTime);
            rag.pelvis.applyImpulse(new CANNON.Vec3(
              dx * OB.knockPush, OB.knockUp, dz * OB.knockPush,
            ));
            hitCooldown.set(rag, OB.hitCooldownTime);
            hits.push({ rag, dirX: dx, dirZ: dz });
          }
        }
      }

      // ---- 거대 공 피격 판정 (구르는 중에만)
      if (s.spec.kind !== "roller" || !s.rolling) continue;
      for (const rag of players) {
        if (rag.state !== "ACTIVE") continue;
        if (hitCooldown.has(rag)) continue;
        const p = rag.pelvis.position;
        const dx = p.x - b.position.x;
        const dz = p.z - b.position.z;
        if (Math.hypot(dx, dz) > OB.rollR + OB.rollHitPad) continue;
        if (Math.abs(p.y - b.position.y) > OB.rollR + 1.2) continue;

        // 굴러오는 방향(+Z)으로 튕겨나간다. 옆으로도 조금 밀어서
        // 정확히 겹쳤을 때 제자리에서 눌리지 않게 한다.
        let nx = dx;
        if (Math.abs(nx) < 0.2) nx = p.x >= 0 ? 1 : -1;
        const l = Math.hypot(nx, 1) || 1;
        rag.knockdown(OB.rollKnockdownTime);
        rag.pelvis.applyImpulse(new CANNON.Vec3(
          (nx / l) * OB.rollKnockSide * 0.5, OB.rollKnockUp, OB.rollKnockSide,
        ));
        hitCooldown.set(rag, OB.rollHitCooldown);
        hits.push({ rag, dirX: nx / l, dirZ: 1 });
      }
    }

    return hits;
  }

  /** 지금 굴러오는 거대 공들 - 경고 표시에 쓴다 (모든 클라이언트) */
  function rollers(): { x: number; z: number; r: number }[] {
    const out: { x: number; z: number; r: number }[] = [];
    for (const s of stations) {
      if (s.spec.kind !== "roller") continue;
      if (s.body.position.y < 0) continue;   // 대기 중(숨겨둠)
      out.push({ x: s.body.position.x, z: s.body.position.z, r: OB.rollR });
    }
    return out;
  }

  function forget(rag: Ragdoll) { hitCooldown.delete(rag); }

  /**
   * 협동 게이트를 연다 (host 전용).
   *
   * z를 주면 그 앞쪽에서 가장 가까운 닫힌 게이트 하나를, 안 주면 전부 연다.
   * 열린 뒤에는 park()/rebuild() 전까지 계속 열려 있다 - 한 번 뚫은 문을
   * 다시 닫으면 왔던 길로 돌아갈 수 없어 갇힌다.
   *
   * @returns 실제로 연 게이트의 z (없으면 null)
   */
  /** 패스로 열리는 관문인가 (버튼 문은 패스가 아니라 발판으로 연다) */
  const isPassGate = (s: Station) => s.spec.kind === "coopgate";
  /** 사람이 둘 이상 있어야 열 수 있는 관문 전부 */
  const isCoopGate = (s: Station) =>
    s.spec.kind === "coopgate" || s.spec.kind === "buttongate";

  /**
   * 관문을 연다.
   *
   * z를 주면 그 앞의 가장 가까운 "패스 게이트" 하나만 연다 (패스 성공 보상).
   * z를 생략하면 협동 관문 전부를 영구히 연다 - 싱글 플레이 처리다.
   * 버튼 문은 발판 판정이 매 스텝 opened를 덮어쓰므로 forceOpen까지 세운다.
   */
  function openGate(z?: number): number | null {
    if (z === undefined) {
      const all = stations.filter((s) => isCoopGate(s) && !s.opened);
      for (const g of all) { g.opened = true; g.forceOpen = true; }
      return all.length ? all[0].spec.z : null;
    }
    const gates = stations.filter((s) => isPassGate(s) && !s.opened);
    if (gates.length === 0) return null;
    // 코스는 -Z로 간다. 내 앞(작은 z)에 있는 것 중 가장 가까운 것.
    const ahead = gates.filter((g) => g.spec.z < z).sort((a, b) => b.spec.z - a.spec.z);
    const pick = ahead[0] ?? gates[0];
    pick.opened = true;
    return pick.spec.z;
  }

  /** 지금 닫혀 있는 패스 게이트들의 z (HUD 안내용) */
  function closedGates(): number[] {
    return stations.filter((s) => isPassGate(s) && !s.opened).map((s) => s.spec.z);
  }

  /**
   * 버튼 문 현황 - 상황 힌트를 띄울 때 쓴다 (모든 클라이언트에서 읽기 전용).
   *
   * 발판 판정 좌표를 main.ts가 다시 적으면 두 곳이 어긋나므로 여기서 준다.
   * onPad는 "그 위치가 어느 쪽 발판 위인가"다 - 내가 밟고 있는지, 아니면
   * 친구가 잡아준 문을 내가 지나가는 참인지를 구분하는 데 쓴다.
   */
  function buttonGates(): { z: number; open: boolean }[] {
    return stations
      .filter((s) => s.spec.kind === "buttongate")
      .map((s) => ({ z: s.spec.z, open: s.body.position.y < 0 }));
  }
  /** 이 위치가 z에 있는 버튼 문의 발판 위인가 */
  function onPad(z: number, x: number, py: number, pz: number): boolean {
    if (py > OB.btnPadMaxY) return false;
    if (Math.abs(pz - (z + OB.btnPadAhead)) > OB.btnPadHalf) return false;
    return Math.abs(Math.abs(x) - OB.btnPadX) <= OB.btnPadHalf;
  }

  /**
   * 싱글 플레이용으로 아직 열어줘야 할 협동 관문이 남았는가.
   *
   * closedGates()는 HUD 안내용이라 패스 게이트만 센다. 버튼 문까지 포함해서
   * 봐야 싱글에서 버튼 문이 안 열린 채 남는 일이 없다.
   */
  function needsSoloOpen(): boolean {
    for (const s of stations) if (isCoopGate(s) && !s.forceOpen) return true;
    return false;
  }

  return { rebuild, park, update, rollers, forget, openGate, closedGates, needsSoloOpen,
    buttonGates, onPad,
    get stations() { return stations; } };
}
