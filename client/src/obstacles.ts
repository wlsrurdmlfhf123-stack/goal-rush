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

  // ---- 움직이는 플랫폼 (platform)
  //
  // sweeper 와 같은 KINEMATIC + velocity 방식이다 (위치를 직접 대입하면 접촉이
  // 파고들었다 튄다).
  //
  // [실측: 공은 온전히 실려 가고, 사람은 미끄러진다]
  // 브라우저에서 스테이지 3 발판에 직접 올라타 재보니, 2.6초 동안 발판은
  // 6.32m 갔는데 사람은 2.39m 밖에 못 갔다 (상대 미끄러짐 약 3.9m). 공은
  // 헤드리스에서 발판을 따라 그대로 간다. 차이는 ragdoll.ts control() 의
  // 속도 서보다 - 입력이 없으면 **월드 기준 속도 0** 을 목표로 최대 49 m/s^2
  // 제동을 걸어서, 마찰로 얻은 발판 속도를 그 자리에서 지운다. 컨베이어의
  // convGrip 주석과 같은 원인이고, 힘을 키우는 방식으로는 해결되지 않는다.
  // 제대로 태우려면 "발판 속도를 이동 입력에 더해 주는" 처리가 필요하다
  // (dashDir/rushDir 과 같은 입력 경로). 지금은 그렇게 하지 않았다 -
  // 발판 위에 서서 잠깐 건너는 용도로는 되지만, 끝까지 실려 가지는 않는다.
  // 크기/축/왕복폭/속도는 맵이 params 로 준다 - 여기 값은 기본값이다.
  platH: 0.4,
  platW: 3.2,
  platD: 3.0,
  /**
   * 발판 중심 높이의 기본값.
   *
   * [코스 바닥 윗면이 y=0 이다] course.ts 의 deck 은 두께 DECK_H(1.2)를
   * 중심 -0.6 에 두므로 **걷는 면이 정확히 y=0** 이다. 발판 윗면도 거기
   * 맞춰야 낭떠러지를 건널 때 턱 없이 올라탈 수 있다 - 중심을 platH/2 만큼
   * 내려 윗면을 0 에 맞춘다. 띄운 발판이 필요하면 params.y 로 올린다.
   */
  platY: -0.2,
  platSpeed: 2.4,
  /** 양 끝에서 멈춰 서 있는 시간 (초) */
  platHold: 0.6,
  /**
   * 발을 뗀 뒤에도 승객으로 볼 시간 (초).
   *
   * [왜 필요한가] 서 있는 래그돌은 두 발이 번갈아 닿았다 떨어진다. 접촉이
   * 있는 프레임에만 태우면 중간중간 빠져서 실측 77% 밖에 못 따라갔다.
   * 발이 잠깐 뜬 것은 "내렸다"가 아니므로 짧게 붙잡아 둔다. 실제로 발판을
   * 벗어나면 접촉이 계속 없으므로 이 시간 뒤에 자연히 풀린다.
   */
  platRiderGrace: 0.25,

  // ---- 컨베이어 (conveyor)
  //
  // [왜 마찰이 아니라 직접 미는가] 벨트는 제자리에 있는 몸체다. cannon 의
  // 마찰은 두 바디의 상대 속도로 계산되므로, 안 움직이는 벨트는 마찰만으로는
  // 위에 있는 것을 못 민다. 목표 속도까지만 당기므로 반대로 달리면 이긴다.
  convW: 8.0,
  convH: 0.3,
  convD: 8.0,
  convY: 0.15,
  convSpeed: 3.4,
  /**
   * 목표 속도까지 끌어당기는 가속 (m/s^2).
   *
   * [실측] 9 -> 30 으로 3.3배 올려도 **서 있는 사람**은 2초에 0.49 -> 0.71m
   * 밖에 안 밀렸다. control() 의 속도 서보가 최대 49 m/s^2 로 제동을 걸기
   * 때문이다(HANDOFF 5절과 같은 현상). 힘을 키우는 건 답이 아니므로 9 로 둔다.
   * 벨트는 **공을 실어 나르는 장치**이고 사람에게는 "발밑이 흐르는" 정도다.
   */
  convGrip: 9.0,
  /** 벨트 윗면에서 이 높이 안에 있어야 올라탄 것으로 본다 */
  convRideH: 1.5,

  // ---- 바람 영역 (wind)
  //
  // 충돌하지 않는 구역이다 (collisionResponse=false). 사람은 control() 의
  // 속도 서보가 상당 부분 먹어서 걸을 수 있고, 공은 서보가 없어 훨씬 잘
  // 밀린다 = "공만 날아간다"가 된다.
  windW: 14.0,
  windH: 4.0,
  windD: 10.0,
  /** 사람에게 거는 가속 (m/s^2). params.force 가 있으면 그걸 쓴다 */
  windAccel: 6.5,
  /** 공에는 몇 배로 거는가 */
  windBallMul: 2.6,

  // ---- 공을 넣으면 켜지는 장치 (ballsocket)
  //
  // 공이 링 안에 "머물러 있어야" 켜진다. 스쳐 지나가는 것으로는 안 켜지게
  // 속도 상한을 두고, 튕겨 나갔다 들어오는 깜빡임은 유예로 흡수한다.
  sockR: 1.35,
  sockY: 0.35,
  sockHold: 0.35,
  sockMaxSpeed: 3.2,
  sockGrace: 0.5,

  // ---- 레버 (lever)
  //
  // 문에서 **떨어뜨려 놓을 수 있는** 스위치다. buttongate 는 발판과 문이
  // 한 몸이라 "코스 양 끝의 레버"를 표현할 수 없어서 따로 둔다.
  // 막지 않는다 (collisionResponse=false) - 밟고 지나가는 바닥 판이다.
  leverW: 2.2,
  leverD: 2.2,
  leverY: 0.06,
  /** 발판 위로 이 높이까지를 "밟고 있다"로 본다 */
  leverMaxY: 1.5,
  /** 발에서 떨어져도 이 시간 동안은 켜져 있다 (깜빡임 방지) */
  leverGrace: 0.35,

  // ---- 2인 동시 압력판을 만드는 두 파라미터 (lever.latch / holdgate.openTime)
  //
  // [왜 새 kind를 안 만들었나] "둘이 동시에 밟아야 열리는 문"은 이미 있는
  // lever + holdgate(signalAll = 전부 켜져야 열림)로 정확히 표현된다. 없던 것은
  // 두 가지뿐이었다.
  //
  //   1. **동시성**. hold=1(밟는 동안만)이면 사람이 딱 둘일 때 둘 다 발판에
  //      묶여 아무도 문을 못 지난다. hold=0(한 번 밟으면 유지)으로 두면 이번엔
  //      한 명이 두 발판을 차례로 밟고 혼자 지나간다 - 협동이 사라진다.
  //      그래서 "밟고 나서 latch 초 동안만 켜져 있다"를 넣는다. 발판 사이가
  //      9.2m(±4.6)이고 사람 최고 속도가 4.6 m/s 남짓이라, latch를 2초 아래로
  //      두면 혼자서는 물리적으로 두 번째 발판에 닿기 전에 첫 신호가 꺼진다.
  //      = 규칙이 아니라 **거리와 시간**이 혼자 하는 걸 막는다.
  //   2. **지나갈 시간**. 조건이 만족된 순간부터 openTime 초 동안 열어 두고
  //      다시 닫는다. 그동안 둘 다 뛰어 들어가야 한다 ("빨리 와!").
  //      openTime이 없으면(0) 예전 그대로 "신호가 켜져 있는 동안만" 열린다.
  /** lever.latch 기본값 (초). 0이면 latch 없이 예전 동작 */
  leverLatch: 0,
  /** holdgate.openTime 기본값 (초). 0이면 신호가 곧 개폐 */
  gateOpenTime: 0,

  // ---- 프레스 (press)
  //
  // 위에서 내려와 찍고 올라간다. 회전봉/스위퍼가 "옆으로 쓸고 지나가는" 위협인
  // 반면 이건 **자리를 통째로 잠그는** 위협이다. 아래에 있으면 넘어진다.
  // popup 과 반대로 위에서 내려오므로 공도 같이 찍혀 튕겨 나간다.
  pressW: 5.0,
  pressD: 3.0,
  /** 판 두께 */
  pressH: 0.9,
  /** 다 올라갔을 때 판 밑면의 높이 (사람 키 위) */
  pressTopY: 4.2,
  /** 다 내려왔을 때 판 밑면의 높이 (바닥에 거의 붙는다) */
  pressBottomY: 0.25,
  /** 한 주기 (초) */
  pressPeriod: 3.6,
  /** 그중 내려와 있는 비율 */
  pressDownFrac: 0.3,
  /** 오르내리는 속도 (m/s). 내려올 때는 이 값의 pressSlamMul 배 */
  pressSpeed: 6,
  /**
   * 내려올 때의 속도 배수.
   *
   * 같은 속도로 오르내리면 "천천히 다가오는 벽"이라 위협이 안 된다. 올라갈
   * 때는 느긋하게, 내려올 때는 쾅. 대신 내려오는 시간이 짧아지므로 아래에
   * 있어도 맞고 튕겨 나갈 뿐 갇히지 않는다.
   */
  pressSlamMul: 2.2,
  /**
   * 프레스에 맞았을 때 튕겨나가는 충격량 / 넘어져 있는 시간.
   *
   * [위(Up)가 거리를 정한다 — 실측] 앞으로 미는 힘을 키워도 몸이 땅에
   * 처박혀 마찰로 에너지를 잃을 뿐이다(HANDOFF 14-4의 발차기 실측과 같은
   * 현상). 프레스에서도 그대로였다:
   * ```
   *   side/up      튕겨 나간 거리
   *    54 / 20      0.65m   <- 판(반폭 2.6, 반길이 1.5) 밑을 못 벗어난다
   *    54 / 30      1.32m
   *    70 / 34      1.93m   <- 채택
   * ```
   * 판 밑을 못 벗어나면 다음 주기에 또 맞는다. 쿨다운(2.4초)이 주기(3.6초)보다
   * 짧아서 실제로 무한 루프가 된다 — `OB.spinY` 주석이 경고한 그 상황이다.
   * **가장 가까운 가장자리 쪽으로** 밀어내는 것과 같이 써야 성립한다.
   */
  pressKnockSide: 70,
  pressKnockUp: 34,
  pressKnockdownTime: 1.1,
  /**
   * 같은 사람을 다시 찍기까지 (초).
   *
   * [범용 쿨다운(2.4)으로는 모자란다] 판이 5.2 x 3.0이고 판정 여유까지 하면
   * 한가운데서 나가는 데 1.9m가 필요한데, 넉백으로 실제로 가는 거리는
   * 1.5m 남짓이다(위 표). 즉 **한 번 맞으면 판정 범위 안에 남는다.**
   * 주기(3.6초)보다 쿨다운이 길어야 다음 주기를 한 번 거른다 —
   * 넘어져 있는 1.1초 + 일어나는 시간을 빼고도 걸어 나갈 여유가 2초쯤 생긴다.
   * 이걸 주기보다 짧게 되돌리면 `OB.spinY` 주석의 무한 루프가 그대로 재현된다.
   */
  pressHitCooldown: 4.2,

  // ---- 둘이 밀어야 움직이는 문 (pushblock)
  //
  // [왜 DYNAMIC 이 아닌가] 무거운 DYNAMIC 상자를 15바디 래그돌 둘이 동시에
  // 밀면 접촉 방정식이 30개 넘게 한 물체에 걸린다. platform 주석이 적어 둔
  // 것과 같은 부류의 불안정이고, 실제로 solver iterations 22 로도 상자가
  // 파고들었다 튀는 그림이 나온다. 그래서 KINEMATIC 으로 두되
  //
  //   · **실제 접촉이 있어야** 미는 사람으로 센다 (proximity 가 아니다.
  //     physics.contacts 를 읽는다 - platform 의 ridersOf 와 같은 방식)
  //   · 그 사람이 **상자 쪽으로 걸어가고 있어야** 한다 (rag.intentX/intentZ)
  //   · 미는 힘의 합이 정지 마찰(pushBreak)을 넘어야 비로소 움직인다
  //
  // 로 한다. 혼자면 힘의 합이 문턱 아래라 **정말로 안 움직이고**, 둘이 붙으면
  // 넘어서 밀린다. 손을 떼는 순간 선다. 상자는 KINEMATIC 이라 무한질량이므로
  // 사람은 그대로 막히고 밀려난다 = 몸으로 미는 감각은 그대로다.
  /** 상자 크기 기본값 */
  pushW: 4.4,
  pushH: 2.2,
  pushD: 1.4,
  /** 사람 하나가 내는 밀기 힘 (임의 단위 - pushBreak 와 같은 저울) */
  pushForcePer: 100,
  /**
   * 정지 마찰. 이 값을 넘는 힘이 걸려야 움직이기 시작한다.
   *
   * 150 이면 한 사람(100)으로는 절대 못 넘고 둘(200)이면 넘는다. 셋이 붙으면
   * 더 빨라진다 - "많이 붙을수록 빠르다"가 자연스럽게 나온다.
   */
  pushBreak: 150,
  /** (합력 - 정지마찰) 을 속도로 바꾸는 계수 (m/s per force) */
  pushGain: 0.012,
  /** 최대 이동 속도 (m/s) */
  pushMaxSpeed: 1.4,
  /** 접촉으로 잡은 미는 사람을 이 시간 동안은 계속 미는 것으로 본다 (초) */
  pushGrace: 0.2,
  /** 이동 입력이 상자 쪽을 향하는 정도가 이 값을 넘어야 미는 것으로 친다 */
  pushAimDot: 0.35,

  // ---- 빙판 (ice)
  //
  // [왜 마찰 계수를 못 바꾸나] cannon 의 마찰은 재질 쌍(ContactMaterial)에
  // 붙어 있어서 "이 구역만" 바꿀 수 없고, 게다가 사람은 control() 의 속도
  // 서보가 마찰과 무관하게 최대 49 m/s^2 로 제동을 건다(HANDOFF 5절).
  // 그래서 마찰을 만지는 길은 사람에게 아무 효과가 없다.
  //
  // 대신 **직전 속도를 되돌려 준다**. 이번 스텝에 서보가 지운 속도의 일부를
  // 충격량으로 다시 넣으면 "브레이크가 안 듣는다"가 된다. 이동 입력은 한 줄도
  // 안 건드리므로 control() 은 그대로다.
  /** 직전 스텝 속도를 얼마나 되돌리는가 (0 = 없음, 1 = 완전히 미끄러움) */
  iceSlip: 0.82,
  /** 한 스텝에 되돌릴 수 있는 속도 변화의 상한 (m/s). 관절이 놀라지 않게 */
  iceMaxDv: 0.9,
  /** 빙판 구역 기본 크기 */
  iceW: 12,
  iceD: 12,
  /** 공이 빙판 위에 있는 동안 쓸 감쇠 (평소보다 훨씬 작다 = 계속 굴러간다) */
  iceBallDamp: 0.002,
  iceBallAngDamp: 0.02,

  // ---- 범퍼 (bumper)
  //
  // 닿으면 반사한다. 공은 예상 못 한 쪽으로 튀고, 사람도 밀려난다.
  // 파티클/소리는 main.ts 가 기존 배관으로 붙인다.
  bumperR: 1.1,
  bumperH: 1.3,
  /** 공에 주는 반사 속도 (m/s) */
  bumperBall: 11,
  /** 사람에게 주는 반사 충격량 / 위로 */
  bumperPush: 46,
  bumperUp: 12,
  /** 같은 대상을 다시 튕기기까지 (초) */
  bumperCooldown: 0.45,
  /**
   * 이 속도 이상으로 들이받았을 때만 사람이 넘어진다 (m/s).
   *
   * 걸어가다 스치는 것까지 넘어뜨리면 범퍼가 그냥 함정이 된다. 달려와서
   * 박았을 때(사람 최고 속도 4.6)만 날아가게 잡는다.
   */
  bumperKnockAt: 3.4,
  bumperKnockdownTime: 0.8,

  // ---- 점프 패드 (jumppad)
  //
  // 밟으면 위로 쏘아 올린다. 공도 같이 뜬다.
  jumppadR: 1.5,
  /** 사람이 얻는 위쪽 속도 (m/s) */
  jumppadUp: 9.5,
  /** 공이 얻는 위쪽 속도 */
  jumppadBallUp: 11,
  /** 이 높이 안에 있어야 밟은 것으로 본다 */
  jumppadMaxY: 1.6,
  jumppadCooldown: 0.6,
};

export type ObstacleKind =
  | "spinner"   // 회전봉 - 몸은 못 지나가고 공은 굴려 통과
  | "piston"    // 좌우에서 튀어나오는 벽 - 길이 좁아지는 타이밍
  | "roller"    // 굴러오는 거대 공 - 몸은 피하고 공은 옆으로
  | "sweeper"   // 좌우로 끝까지 왕복하는 봉 - 지나갈 틈이 한쪽에만 생긴다
  | "popup"     // 바닥에서 솟았다 내려가는 벽 - 내려간 사이에 통과
  | "shutter"   // 가운데 통로가 열렸다 닫힌다 - 가운데냐 옆이냐를 고른다
  | "coopgate"    // 협동 게이트 - 패스를 성공해야 열린다 (멀티 전용)
  | "buttongate" // 버튼 문 - 양쪽 발판을 둘이 동시에 밟고 있어야 열린다 (멀티 전용)
  | "platform"   // 움직이는 플랫폼 - 위에 탄 것을 싣고 축을 따라 왕복
  | "conveyor"   // 컨베이어 - 위에 올라간 것을 한쪽으로 실어 나른다
  | "wind"       // 바람 영역 - 안에 있는 동안 한 방향으로 민다 (충돌 없음)
  | "ballsocket" // 공 넣는 장치 - 공이 링 안에 머물면 link 신호를 켠다
  | "lever"      // 레버 - 밟고 있는 동안(또는 한 번 밟으면) link 신호를 켠다
  | "holdgate"   // 신호 문 - 같은 link 의 스위치가 **전부** 켜져 있어야 열린다
  | "press"      // 프레스 - 위에서 내려와 찍고 올라간다. 아래 있으면 넘어진다
  | "pushblock"  // 둘이 붙어서 밀어야 움직이는 무거운 문
  | "ice"        // 빙판 - 구역 안에서 브레이크가 안 듣는다 (충돌 없음)
  | "bumper"     // 범퍼 - 닿은 공과 사람을 반사한다
  | "jumppad";   // 점프 패드 - 밟으면 위로 쏘아 올린다 (충돌 없음)

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
  /**
   * 신호 채널 (선택). 트리거와 문을 잇는 유일한 배선이다.
   *
   *   lever / ballsocket / buttongate ... 조건을 만족하는 동안 이 채널을 켠다
   *   coopgate                        ... 채널이 **하나라도** 켜지면 열린다
   *   holdgate                        ... 채널의 트리거가 **전부** 켜져야 열린다
   *
   * link 가 없으면 예전 그대로다 - z 위치로 여는 openGate() 경로.
   * (맵은 문자열 이름으로 묶고, maps/course.ts 가 번호로 바꿔 준다)
   */
  link?: number;
  /** 좌우 위치 (기본 0 = 레인 중앙). 두 갈래 길에 놓는 기믹이 쓴다 */
  x?: number;
  /**
   * 값이 둘 이상 필요한 기믹의 파라미터 (maps/gimmicks.ts 의 어휘).
   *   platform : axis(0=x,1=z) span speed w len
   *   conveyor : dirZ speed w len
   *   wind     : dirX dirZ force w len period onFrac
   *   lever    : hold(1=밟는 동안만, 0=한 번 켜면 유지) latch w len
   *   holdgate : w h openTime
   *   press    : w len period downFrac speed
   *   pushblock: axis(0=x,1=z) span w h len
   *   ice      : w len
   *   bumper   : r
   *   jumppad  : r up
   */
  params?: Record<string, number>;
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
  /** 이 station 이 지금 link 채널을 켜고 있는가 (트리거 전용) */
  signalOn: boolean;
  /** ballsocket - 공이 머문 시간 / 나간 뒤 남은 유예 (초) */
  sockT: number;
  sockGraceT: number;
  /** lever - 발에서 떨어진 뒤 남은 유예 (초) / 한 번 켜면 유지되는가 */
  leverGraceT: number;
  leverLatched: boolean;
  /**
   * lever - 밟은 뒤 신호가 남아 있는 시간 (초). params.latch 가 있을 때만 쓴다.
   * 이게 "둘이 **동시에**"를 만든다 (OB.leverLatch 주석 참고).
   */
  latchT: number;
  /** holdgate - openTime 방식에서 남은 개방 시간 (초) */
  openT: number;
  /**
   * holdgate - 다시 열릴 준비가 됐는가.
   *
   * openTime 이 끝나 문이 닫힌 뒤, 발판에서 발을 한 번 뗐다가 다시 밟아야
   * 다음이 열린다. 안 그러면 발판 위에 계속 서 있는 동안 문이 무한히 여닫힌다.
   */
  gateArmed: boolean;
  /** pushblock - 지금 밀고 있는 사람과 남은 유예 (초) / 지금까지 밀려난 거리 */
  pushers: Map<Ragdoll, number>;
  pushOff: number;
  /** bumper / jumppad - 대상별 쿨다운 (초) */
  bounceCool: Map<CANNON.Body, number>;
  /** ice - 대상별 직전 스텝의 수평 속도 */
  iceLast: Map<CANNON.Body, { x: number; z: number }>;
  /** ice - 공의 원래 감쇠 (구역을 벗어날 때 되돌린다) */
  iceBallHome: { ld: number; ad: number } | null;
  /** platform - 진행 방향(+1/-1), 양 끝 정지 잔여시간, 축/왕복반폭/속도/중심x */
  dir: number;
  holdT: number;
  axis: number;
  half: number;
  speed: number;
  px: number;
  /** 직전 스텝의 발판 위치. 이번 스텝 이동량(= 태워 옮길 거리)을 재는 데 쓴다 */
  prevX: number;
  prevZ: number;
  /** 이 발판의 승객과 남은 유예 시간 (초). 발이 잠깐 떠도 계속 태운다 */
  riders: Map<Ragdoll, number>;
  py: number;
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
 * 넉백이 아닌 접촉 사건 — 범퍼에 튕겼다 / 점프 패드를 밟았다.
 *
 * [왜 ObstacleHit 에 안 섞었나] main.ts 의 hits 루프는 "장애물에 맞았다"를
 * 처리한다 — 화면을 크게 흔들고, 안고 있던 공을 놓게 하고, 골 앞이면
 * "아까비!"를 띄운다. 점프 패드를 밟았다고 공을 떨어뜨리면 안 되고, 공이
 * 범퍼에 튕긴 것은 **사람에게 일어난 일이 아니다**(rag 가 없다). 그래서
 * 성격이 다른 이 둘은 따로 내보내고, 연출은 main.ts 가 고른다.
 */
export interface ObstacleFx {
  kind: "bumper" | "jumppad";
  /** 사람에게 일어난 일이면 그 래그돌, 공이면 null */
  rag: Ragdoll | null;
  x: number;
  y: number;
  z: number;
  /** 0..1. 소리 크기와 흔들림에 그대로 쓴다 */
  power: number;
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
  /** 범퍼/점프패드 사건 대기열. update() 가 채우고 takeFx() 가 비운다 */
  const fxQueue: ObstacleFx[] = [];

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
        signalOn: false, sockT: 0, sockGraceT: 0,
        leverGraceT: 0, leverLatched: false,
        latchT: 0, openT: 0, gateArmed: true,
        pushers: new Map<Ragdoll, number>(), pushOff: 0,
        bounceCool: new Map<CANNON.Body, number>(),
        iceLast: new Map<CANNON.Body, { x: number; z: number }>(),
        iceBallHome: null,
        // platform 파라미터는 맵이 준 params 에서 한 번만 읽어 둔다
        dir: 1, holdT: 0,
        axis: (spec.params?.axis ?? 0) >= 0.5 ? 1 : 0,
        half: spec.params?.span !== undefined
          ? Math.max(0.5, spec.params.span * 0.5)
          : Math.max(0.5, spec.arg),
        speed: spec.params?.speed ?? OB.platSpeed,
        px: spec.x ?? 0,
        py: spec.params?.y ?? OB.platY,
        prevX: 0, prevZ: 0,
        riders: new Map<Ragdoll, number>(),
      });
    }
    park();
  }

  /** 전부 초기 상태로 되돌린다 */
  function park() {
    fxQueue.length = 0;
    for (const s of stations) {
      s.clock = s.spec.phase;
      s.cycle = 0;
      s.rolling = false;
      s.opened = false;
      s.forceOpen = false;
      s.signalOn = false;
      s.sockT = 0;
      s.sockGraceT = 0;
      s.leverGraceT = 0;
      s.leverLatched = false;
      s.latchT = 0;
      s.openT = 0;
      s.gateArmed = true;
      s.pushOff = 0;
      s.pushers.clear();
      s.bounceCool.clear();
      s.iceLast.clear();
      s.iceBallHome = null;
      s.holdT = 0;
      s.riders.clear();
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
        case "platform": {
          // 왕복 구간의 한쪽 끝에서 출발한다. phase 로 시작 위치를 어긋나게 둔다.
          const st = platformPhase(s, s.spec.phase);
          s.dir = st.dir; s.holdT = st.holdT;
          if (s.axis === 0) b.position.set(s.px + st.off, s.py, s.spec.z);
          else b.position.set(s.px, s.py, s.spec.z + st.off);
          // 첫 스텝의 이동량이 0이 되도록 놓인 자리를 그대로 기억해 둔다
          s.prevX = b.position.x;
          s.prevZ = b.position.z;
          break;
        }
        case "conveyor":
          b.position.set(s.px, OB.convY, s.spec.z);
          break;
        case "wind":
          b.position.set(s.px, OB.windH * 0.5, s.spec.z);
          break;
        case "ballsocket":
          b.position.set(s.px, OB.sockY, s.spec.z);
          break;
        case "lever":
          b.position.set(s.px, OB.leverY, s.spec.z);
          break;
        case "holdgate":
          // 신호 문도 닫힌 자리에서 시작한다 (coopgate 와 같은 몸체)
          b.position.set(s.px, OB.gateH * 0.5, s.spec.z);
          break;
        case "coopgate":
        case "buttongate":
          // 닫힌 자리에서 시작한다. 싱글이면 rebuild 직후 openGate로 열린다.
          b.position.set(0, OB.gateH * 0.5, s.spec.z);
          break;
        case "press":
          // 다 올라간 자리에서 시작한다 (phase 만큼 지나면 처음 내려온다)
          b.position.set(s.px, pressTopCenter(s), s.spec.z);
          break;
        case "pushblock": {
          // 밀리기 전 자리. 축(axis)을 따라 pushOff 만큼 옮겨 놓는다.
          const ph = (s.spec.params?.h ?? OB.pushH) * 0.5;
          if (s.axis === 0) b.position.set(s.px, ph, s.spec.z);
          else b.position.set(s.px, ph, s.spec.z);
          break;
        }
        case "ice":
          b.position.set(s.px, 0.02, s.spec.z);
          break;
        case "bumper":
          b.position.set(s.px, OB.bumperH * 0.5, s.spec.z);
          break;
        case "jumppad":
          b.position.set(s.px, 0.06, s.spec.z);
          break;
      }
      b.wakeUp();
    }
  }

  /**
   * host 전용. 한 스텝 진행한다.
   * @param ball 있으면 컨베이어/바람/공 소켓이 공을 함께 다룬다 (없으면 사람만)
   * @returns 이번 스텝에 거대 공에 맞은 사람들
   */
  /**
   * 왕복 발판이 위상 t 초 시점에 어디에 있는가.
   *
   * 한 바퀴 = (끝에서 끝으로 이동) + (정지) + (되돌아오기) + (정지).
   * 스테이지 3처럼 발판 둘을 반대 위상으로 둘 때 이게 있어야 "항상 한쪽만
   * 붙어 있다"가 성립한다.
   */
  /**
   * 발판 위에 실제로 올라타 있는 사람들.
   *
   * [왜 좌표 범위가 아니라 접촉으로 보는가] 발판 윗면은 코스 바닥과 같은
   * 높이(y=0)라, 좌표만으로는 "발판 위"와 "발판 옆 바닥 위"를 구분할 수 없다.
   * 특히 발판이 다리 입구에 물려 있는 동안에는 두 영역이 겹친다. 물리 엔진이
   * 이미 계산해 둔 접촉을 그대로 읽으면 실제로 발을 딛고 있는 경우만 잡힌다.
   *
   * physics.contacts 는 직전 step 의 결과다. 이동량도 같은 직전 step 에서
   * 재므로 둘의 시점이 어긋나지 않는다.
   */
  function ridersOf(plat: CANNON.Body, players: Ragdoll[]): Ragdoll[] {
    const touching = new Set<CANNON.Body>();
    for (const c of world.physics.contacts) {
      if (c.bi === plat) touching.add(c.bj);
      else if (c.bj === plat) touching.add(c.bi);
    }
    if (touching.size === 0) return [];
    const out: Ragdoll[] = [];
    for (const rag of players) {
      // 옆에서 부딪힌 것과 위에 올라선 것을 가른다 - 위에 있어야 태운다.
      if (rag.pelvis.position.y < plat.position.y + 0.2) continue;
      for (const bd of rag.bodies) {
        if (touching.has(bd)) { out.push(rag); break; }
      }
    }
    return out;
  }
  function platformPhase(s: Station, t: number): { off: number; dir: number; holdT: number } {
    const travel = (2 * s.half) / Math.max(0.01, s.speed);   // 편도 시간
    const hold = OB.platHold;
    const period = 2 * travel + 2 * hold;
    let u = period > 0 ? t % period : 0;
    if (u < 0) u += period;
    if (u < travel) return { off: -s.half + s.speed * u, dir: 1, holdT: 0 };
    u -= travel;
    if (u < hold) return { off: s.half, dir: -1, holdT: hold - u };
    u -= hold;
    if (u < travel) return { off: s.half - s.speed * u, dir: -1, holdT: 0 };
    u -= travel;
    return { off: -s.half, dir: 1, holdT: hold - u };
  }

  /**
   * 프레스 판의 중심 높이 (다 올라갔을 때 / 다 내려왔을 때).
   *
   * 맵이 적는 것은 **판 밑면**의 높이다 ("이 아래로 지나갈 수 있나"가 눈에
   * 보이는 값이라서). 물리 바디는 중심으로 놓이므로 여기서 한 번 변환한다.
   */
  const pressH = (s: Station) => s.spec.params?.h ?? OB.pressH;
  const pressTopCenter = (s: Station) => (s.spec.params?.topY ?? OB.pressTopY) + pressH(s) * 0.5;
  const pressBottomCenter = (s: Station) => (s.spec.params?.bottomY ?? OB.pressBottomY) + pressH(s) * 0.5;

  /**
   * 이 바디에 실제로 닿아 있는 래그돌들.
   *
   * platform 의 ridersOf 와 같은 방식(physics.contacts)이지만 "위에 올라탔는가"를
   * 보지 않는다 - pushblock 은 옆에서 미는 것이 정상이기 때문이다.
   */
  function touchersOf(body: CANNON.Body, players: Ragdoll[]): Ragdoll[] {
    const touching = new Set<CANNON.Body>();
    for (const c of world.physics.contacts) {
      if (c.bi === body) touching.add(c.bj);
      else if (c.bj === body) touching.add(c.bi);
    }
    if (touching.size === 0) return [];
    const out: Ragdoll[] = [];
    for (const rag of players) {
      for (const bd of rag.bodies) {
        if (touching.has(bd)) { out.push(rag); break; }
      }
    }
    return out;
  }

  /** link 채널을 켜고 있는 트리거가 하나라도 있는가 */
  function signalActive(ch: number): boolean {
    for (const s of stations) if (s.signalOn && s.spec.link === ch) return true;
    return false;
  }

  /**
   * 그 채널의 트리거가 **전부** 켜져 있는가 (holdgate 용).
   * 트리거가 하나도 없으면 false - 아무도 안 누른 문이 열려 있으면 안 된다.
   */
  function signalAll(ch: number): boolean {
    let n = 0;
    for (const s of stations) {
      if (s.spec.link !== ch || !isTrigger(s)) continue;
      n++;
      if (!s.signalOn) return false;
    }
    return n > 0;
  }

  /** 신호를 낼 수 있는 kind 인가 (문은 신호를 읽기만 한다) */
  const isTrigger = (s: Station) =>
    s.spec.kind === "lever" || s.spec.kind === "ballsocket" || s.spec.kind === "buttongate";

  /** 지금 켜져 있는 신호 채널들 (HUD/검증용) */
  function signals(): number[] {
    const out = new Set<number>();
    for (const s of stations) if (s.signalOn && s.spec.link !== undefined) out.add(s.spec.link);
    return [...out].sort((a, b) => a - b);
  }
  function update(dt: number, players: Ragdoll[], ball?: CANNON.Body): ObstacleHit[] {
    const hits: ObstacleHit[] = [];
    // 이번 스텝의 범퍼/점프패드 사건. main.ts 가 takeFx() 로 가져간다.
    const fxOut = fxQueue;

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
          // 버튼 문도 신호원이다 - link 를 주면 멀리 있는 문을 함께 연다.
          s.signalOn = s.opened;
          const targetY = s.opened ? -OB.gateH * 0.5 - OB.gateSink : OB.gateH * 0.5;
          const dy = targetY - b.position.y;
          b.velocity.set(0, Math.abs(dy) < 0.05 ? 0 : Math.sign(dy) * OB.gateSpeed, 0);
          b.position.x = 0;
          b.position.z = s.spec.z;
          break;
        }

        case "coopgate": {
          // 위상이 아니라 opened 플래그로만 움직인다.
          // link 가 걸려 있으면 신호가 곧 개폐다 (레버/공소켓이 연 문).
          // link 가 없으면 예전 그대로 openGate() 가 세운 opened 를 쓴다.
          if (s.spec.link !== undefined) {
            s.opened = s.forceOpen || signalActive(s.spec.link);
            // [지나가면 걸어 잠근다] buttongate 와 같은 이유다. 레버를 눌러주는
            // 쪽도 결국 건너야 하는데, 레버에서 발을 떼면 문이 닫혀 버린다.
            // 누군가 문을 넘어간 뒤에는 계속 열어 둔다.
            if (s.opened) {
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

        case "holdgate": {
          // 같은 link 의 스위치가 **전부** 켜져 있는 동안만 열린다.
          // coopgate(하나라도 켜지면 열림)와 다른 점이 이 한 줄이다.
          // [2인 플레이 주의] 레버가 둘이고 둘 다 "밟고 있는 동안만"(hold:1)이면,
          // 사람이 딱 둘일 때 둘 다 레버에 묶여 아무도 문을 못 지난다. buttongate 가
          // "발판 하나만 밟혀도 열림"으로 바뀐 것과 같은 이유다. 2인 코스에서는
          //   · 레버를 hold:0(한 번 밟으면 유지)으로 두거나
          //   · 문을 coopgate(link) 로 바꿔 "하나만 켜져도 열림"으로 쓴다.
          // 레버가 둘 이상이면 싱글에서는 openGate() 가 자동으로 열어 준다.
          const allOn = s.spec.link !== undefined && signalAll(s.spec.link);

          // openTime 방식: 조건이 만족된 **순간** 타이머를 걸고, 그 시간 동안은
          // 발판에서 내려와도 열려 있다. 그래야 둘 다 뛰어 들어갈 수 있다.
          // 다 쓰면 닫히고, 발판을 한 번 비웠다 다시 밟아야 재무장된다
          // (gateArmed - 안 그러면 서 있는 동안 무한히 여닫힌다).
          const openTime = s.spec.params?.openTime ?? OB.gateOpenTime;
          if (openTime > 0) {
            if (allOn && s.gateArmed) { s.openT = openTime; s.gateArmed = false; }
            if (!allOn) s.gateArmed = true;
            s.openT = Math.max(0, s.openT - dt);
            s.opened = s.forceOpen || s.openT > 0;
          } else {
            s.opened = s.forceOpen || allOn;
          }
          if (s.opened) {
            for (const rag of players) {
              if (rag.pelvis.position.z < s.spec.z - OB.gateD) { s.forceOpen = true; break; }
            }
          }
          const targetY = s.opened ? -OB.gateH * 0.5 - OB.gateSink : OB.gateH * 0.5;
          const dy = targetY - b.position.y;
          b.velocity.set(0, Math.abs(dy) < 0.05 ? 0 : Math.sign(dy) * OB.gateSpeed, 0);
          b.position.x = s.px;
          b.position.z = s.spec.z;
          break;
        }

        case "lever": {
          // 밟고 있는 사람이 있으면 켜진다. 막지 않는 바닥 판이라 판정만 한다.
          b.position.set(s.px, OB.leverY, s.spec.z);
          b.velocity.setZero();
          const pw = (s.spec.params?.w ?? OB.leverW) * 0.5;
          const pl = (s.spec.params?.len ?? OB.leverD) * 0.5;
          let stepped = false;
          for (const rag of players) {
            const q = rag.pelvis.position;
            if (q.y > OB.leverMaxY) continue;
            if (Math.abs(q.x - s.px) > pw) continue;
            if (Math.abs(q.z - s.spec.z) > pl) continue;
            stepped = true;
            break;
          }
          // hold=0 이면 한 번 밟으면 계속 켜져 있다 (park 에서만 풀린다).
          const momentary = (s.spec.params?.hold ?? 1) >= 0.5;
          if (stepped) { s.leverLatched = true; s.leverGraceT = OB.leverGrace; }
          else s.leverGraceT = Math.max(0, s.leverGraceT - dt);

          // latch > 0 이면 "밟고 나서 latch 초 동안" 켜져 있다.
          //
          // 이것이 2인 동시 압력판을 만드는 장치다 (OB.leverLatch 주석).
          // hold=1 은 발을 떼는 순간 꺼져서 둘 다 발판에 묶이고, hold=0 은
          // 혼자 두 발판을 차례로 밟게 해준다. 그 사이가 이 값이다 - 발판
          // 사이 거리를 사람이 latch 초 안에 못 건너면 혼자서는 못 연다.
          const latch = s.spec.params?.latch ?? OB.leverLatch;
          if (latch > 0) {
            if (stepped) s.latchT = latch;
            else s.latchT = Math.max(0, s.latchT - dt);
            s.signalOn = s.latchT > 0;
            break;
          }
          s.signalOn = momentary ? (stepped || s.leverGraceT > 0) : s.leverLatched;
          break;
        }

        case "platform": {
          // ---- 승객 태우기
          //
          // [왜 힘/속도가 아니라 위치로 옮기는가] ragdoll.ts control() 의 속도
          // 서보는 **월드 기준** 목표 속도(입력이 없으면 0)로 최대 49 m/s^2 의
          // 제동을 건다. 그래서 마찰이든 충격량이든 발판이 준 속도는 그 자리에서
          // 지워진다 (실측: 발판 6.32m 가는 동안 사람은 2.39m). 속도를 건드리는
          // 방법은 전부 같은 벽에 막히므로, 서보가 보지 않는 **위치**를 옮긴다.
          //
          // 15개 바디를 **같은 양**만큼 통째로 옮기므로 관절의 상대 자세가
          // 전혀 변하지 않는다 = 제약이 늘어나지 않는다. 속도는 손대지 않아서
          // 발판에서 내려도 관성이 갑자기 붙지 않고, 그 위에서 걷는 것도 그대로다
          // (control() 은 평소처럼 자기 일을 한다).
          //
          // host 전용 경로다 (update 자체가 host 에서만 돈다). 비-host 는 늘
          // 그랬듯 스냅샷으로 결과만 받는다 - 클라이언트 보정이 아니다.
          {
            const mx = b.position.x - s.prevX;
            const mz = b.position.z - s.prevZ;
            // 접촉이 있는 사람은 유예를 채우고, 없는 사람은 깎는다.
            for (const rag of ridersOf(b, players)) s.riders.set(rag, OB.platRiderGrace);
            for (const [rag, t] of s.riders) {
              const nt = t - dt;
              if (nt <= 0) s.riders.delete(rag);
              else s.riders.set(rag, nt);
            }
            if (mx !== 0 || mz !== 0) {
              // [모자란 만큼만 채운다] 발판과 사람 사이에는 마찰도 살아 있어서,
              // 발판 이동량을 통째로 더하면 마찰이 이미 옮겨 준 만큼이 겹쳐
              // 사람이 발판보다 빨리 나간다 (실측 130% - 앞으로 미끄러져 떨어진다).
              // 그래서 직전 스텝에 마찰로 따라간 양(v*dt)을 빼고 **부족분만** 옮긴다.
              // 마찰이 다 해줬으면 0, 하나도 못 했으면 전부 = 항상 발판과 같은 양.
              //
              // 0..이동량으로 자르는 것이 핵심이다. 사람이 발판 위에서 스스로
              // 걸으면 v*dt 가 이동량을 넘는데, 그때 음수를 그대로 쓰면 걸음을
              // 뒤로 잡아당겨 취소해 버린다. 잘라내면 "발판 속도까지는 보장하고,
              // 그 위에서 걷는 건 사람 몫"이 된다.
              const clamp = (v: number, lim: number) =>
                lim >= 0 ? Math.max(0, Math.min(v, lim)) : Math.min(0, Math.max(v, lim));
              for (const rag of s.riders.keys()) {
                const cx = clamp(mx - rag.pelvis.velocity.x * dt, mx);
                const cz = clamp(mz - rag.pelvis.velocity.z * dt, mz);
                if (cx === 0 && cz === 0) continue;
                for (const bd of rag.bodies) {
                  bd.position.x += cx;
                  bd.position.z += cz;
                }
              }
            }
            s.prevX = b.position.x;
            s.prevZ = b.position.z;
          }
          // 좌우/앞뒤 왕복. KINEMATIC + velocity 라서 위에 탄 사람과 공이
          // 마찰로 같이 실려 간다.
          const sp = s.speed;
          if (s.holdT > 0) {
            s.holdT = Math.max(0, s.holdT - dt);
            b.velocity.setZero();
          } else if (s.axis === 0) {
            b.velocity.set(s.dir * sp, 0, 0);
            if (s.dir > 0 && b.position.x >= s.px + s.half) { b.position.x = s.px + s.half; s.dir = -1; s.holdT = OB.platHold; }
            else if (s.dir < 0 && b.position.x <= s.px - s.half) { b.position.x = s.px - s.half; s.dir = 1; s.holdT = OB.platHold; }
          } else {
            b.velocity.set(0, 0, s.dir * sp);
            if (s.dir > 0 && b.position.z >= s.spec.z + s.half) { b.position.z = s.spec.z + s.half; s.dir = -1; s.holdT = OB.platHold; }
            else if (s.dir < 0 && b.position.z <= s.spec.z - s.half) { b.position.z = s.spec.z - s.half; s.dir = 1; s.holdT = OB.platHold; }
          }
          // 진행 축이 아닌 쪽은 고정한다 (부딪혀 밀려나지 않게)
          if (s.axis === 0) b.position.z = s.spec.z; else b.position.x = s.px;
          b.position.y = s.py;
          break;
        }

        case "conveyor": {
          // 벨트는 제자리에 있다. 위에 올라온 것을 목표 속도까지만 당긴다.
          b.position.set(s.px, OB.convY, s.spec.z);
          b.velocity.setZero();
          const cp = s.spec.params ?? {};
          const cHalfW = (cp.w ?? OB.convW) * 0.5;
          const cHalfL = (cp.len ?? OB.convD) * 0.5;
          const cSpeed = cp.speed ?? OB.convSpeed;
          const target = (cp.dirZ ?? 1) >= 0 ? cSpeed : -cSpeed;
          const topY = OB.convY + OB.convH * 0.5;
          const onBelt = (x: number, y: number, z: number) =>
            Math.abs(x - s.px) <= cHalfW && Math.abs(z - s.spec.z) <= cHalfL &&
            y >= topY - 0.35 && y <= topY + OB.convRideH;
          const pull = (vz: number) => {
            const dv = target - vz;
            return Math.sign(dv) * Math.min(Math.abs(dv), OB.convGrip * dt);
          };
          for (const rag of players) {
            const q = rag.pelvis.position;
            if (!onBelt(q.x, q.y, q.z)) continue;
            rag.pelvis.applyImpulse(new CANNON.Vec3(0, 0, pull(rag.pelvis.velocity.z) * rag.pelvis.mass));
          }
          if (ball && onBelt(ball.position.x, ball.position.y, ball.position.z)) {
            ball.wakeUp();
            ball.applyImpulse(new CANNON.Vec3(0, 0, pull(ball.velocity.z) * ball.mass));
          }
          break;
        }

        case "wind": {
          // 막지 않는다. 안에 있는 동안 dir 방향으로 계속 민다.
          b.position.set(s.px, OB.windH * 0.5, s.spec.z);
          b.velocity.setZero();
          const wp = s.spec.params ?? {};
          const wHalfW = (wp.w ?? OB.windW) * 0.5;
          const wHalfL = (wp.len ?? OB.windD) * 0.5;

          // ---- 돌풍: period 초마다 onFrac 만큼만 분다
          //
          // [왜 켜졌다 꺼지는가] 계속 부는 바람은 결국 "코스가 이만큼 기울어져
          // 있다"와 같아서, 한 번 요령을 익히면 아무 일도 안 일어난다. 주기가
          // 있으면 **언제 건너느냐**가 판단이 되고, 둘이 타이밍을 맞추게 된다.
          // period 가 없으면(0) 예전 그대로 항상 분다.
          const wPeriod = wp.period ?? 0;
          if (wPeriod > 0) {
            const on = ((s.clock % wPeriod) + wPeriod) % wPeriod < wPeriod * (wp.onFrac ?? 0.5);
            s.signalOn = on;       // 디버그/연출이 "지금 부는가"를 읽을 수 있게
            if (!on) break;
          }
          // force 는 사람에게 거는 가속이다. dirX 가 없으면 arg 를 X 방향으로 쓴다.
          const acc = wp.force ?? OB.windAccel;
          const wdx = (wp.dirX ?? s.spec.arg) * acc;
          const wdz = (wp.dirZ ?? 0) * acc;
          const inZone = (x: number, y: number, z: number) =>
            Math.abs(x - s.px) <= wHalfW && Math.abs(z - s.spec.z) <= wHalfL &&
            y >= -0.2 && y <= OB.windH;
          for (const rag of players) {
            const q = rag.pelvis.position;
            if (!inZone(q.x, q.y, q.z)) continue;
            rag.pelvis.applyImpulse(new CANNON.Vec3(wdx * dt * rag.pelvis.mass, 0, wdz * dt * rag.pelvis.mass));
          }
          if (ball && inZone(ball.position.x, ball.position.y, ball.position.z)) {
            ball.wakeUp();
            const wm = ball.mass * OB.windBallMul * dt;
            ball.applyImpulse(new CANNON.Vec3(wdx * wm, 0, wdz * wm));
          }
          break;
        }

        case "ballsocket": {
          // 공이 링 안에 머물러 있어야 켜진다.
          b.position.set(s.px, OB.sockY, s.spec.z);
          b.velocity.setZero();
          let resting = false;
          if (ball) {
            const sdx = ball.position.x - s.px;
            const sdz = ball.position.z - s.spec.z;
            const sspeed = Math.hypot(ball.velocity.x, ball.velocity.z);
            resting = Math.hypot(sdx, sdz) <= OB.sockR
              && Math.abs(ball.position.y - OB.sockY) < 1.2
              && sspeed <= OB.sockMaxSpeed;
          }
          if (resting) { s.sockT += dt; s.sockGraceT = OB.sockGrace; }
          else { s.sockT = 0; s.sockGraceT = Math.max(0, s.sockGraceT - dt); }
          s.signalOn = s.sockT >= OB.sockHold || (s.signalOn && s.sockGraceT > 0);
          break;
        }

        case "press": {
          // 사각파로 내려왔다 올라간다. 내려올 때만 빠르다(pressSlamMul).
          const pp = s.spec.params ?? {};
          const period = pp.period ?? OB.pressPeriod;
          const t = ((s.clock % period) + period) % period;
          const down = t < period * (pp.downFrac ?? OB.pressDownFrac);
          const targetY = down ? pressBottomCenter(s) : pressTopCenter(s);
          const speed = (pp.speed ?? OB.pressSpeed) * (down ? OB.pressSlamMul : 1);
          const dy = targetY - b.position.y;
          b.velocity.set(0, Math.abs(dy) < 0.05 ? 0 : Math.sign(dy) * speed, 0);
          b.position.x = s.px;
          b.position.z = s.spec.z;

          // ---- 피격 판정
          //
          // 범용 KNOCKS 판정을 쓰지 않는 이유: 그쪽은 hitMinY(0.62) 위에 골반이
          // 있어야 맞는데, 프레스는 **바닥까지 내려오는** 물건이라 일어나는
          // 중인 사람도 짓눌러야 그림이 맞다. 대신 옆으로 크게 튕겨내서
          // 그 자리에 갇히지 않게 한다 (popup 이 KNOCKS 에서 빠진 것과 같은 걱정).
          if (b.velocity.y < -0.5) {
            const halfW = (pp.w ?? OB.pressW) * 0.5;
            const halfL = (pp.len ?? OB.pressD) * 0.5;
            for (const rag of players) {
              if (hitCooldown.has(rag)) continue;
              const q = rag.pelvis.position;
              if (Math.abs(q.x - s.px) > halfW + OB.hitPad) continue;
              if (Math.abs(q.z - s.spec.z) > halfL + OB.hitPad) continue;
              if (q.y > b.position.y) continue;                 // 판 위는 안 맞는다
              if (q.y < b.position.y - pressH(s) * 0.5 - 1.4) continue;

              // ---- **가장 가까운 가장자리 쪽으로** 밀어낸다.
              //
              // 늘 옆(x)으로만 밀면, 판이 넓고 얕을 때(5.2 x 3.0) 판 밑을 못
              // 벗어나 다음 주기에 또 맞는다 — 쿨다운(2.4s)이 주기(3.6s)보다
              // 짧아서 실제로 무한 루프가 됐다. 나가는 데 제일 짧은 축을 고른다.
              const outX = halfW - Math.abs(q.x - s.px);
              const outZ = halfL - Math.abs(q.z - s.spec.z);
              let dirX = 0, dirZ = 0;
              if (outX <= outZ) dirX = q.x >= s.px ? 1 : -1;
              else dirZ = q.z >= s.spec.z ? 1 : -1;
              rag.knockdown(OB.pressKnockdownTime);
              rag.pelvis.applyImpulse(new CANNON.Vec3(
                dirX * OB.pressKnockSide, OB.pressKnockUp, dirZ * OB.pressKnockSide,
              ));
              rag.pelvis.wakeUp();
              hitCooldown.set(rag, OB.pressHitCooldown);
              hits.push({ rag, dirX, dirZ });
            }
          }
          break;
        }

        case "pushblock": {
          // ---- 지금 이 상자를 밀고 있는 사람이 몇인가
          //
          // 조건 둘을 **동시에** 만족해야 한다.
          //   1. 실제로 닿아 있다 (physics.contacts - 가까이 있는 것으론 안 된다)
          //   2. 이동 입력이 상자 쪽을 향한다 (rag.intentX/intentZ)
          // 2가 없으면 상자에 등을 대고 서 있기만 해도 밀린다.
          const bp = s.spec.params ?? {};
          const axis = s.axis;                       // 0 = x축, 1 = z축으로 밀린다
          const span = bp.span ?? (s.spec.arg || 5);
          const pushHalfH = (bp.h ?? OB.pushH) * 0.5;
          if (s.forceOpen) {
            // 싱글 플레이 처리 (openGate). 혼자서는 원리적으로 못 미는 물건이라
            // 사람이 한 명이면 끝까지 밀린 자리에 고정해 둔다.
            s.pushOff = span;
            s.signalOn = true;
            b.velocity.setZero();
            if (axis === 0) b.position.set(s.px + span, pushHalfH, s.spec.z);
            else b.position.set(s.px, pushHalfH, s.spec.z + span);
            break;
          }
          for (const [rag, t] of s.pushers) {
            const nt = t - dt;
            if (nt <= 0) s.pushers.delete(rag);
            else s.pushers.set(rag, nt);
          }
          let sum = 0;   // 밀리는 방향 성분의 합 (+/-)
          for (const rag of touchersOf(b, players)) {
            if (rag.state !== "ACTIVE") continue;
            const want = axis === 0 ? rag.intentX : rag.intentZ;
            // 상자 쪽으로 향하고 있는가 (사람 -> 상자 방향과 입력의 부호가 같은가)
            const toBox = axis === 0
              ? b.position.x - rag.pelvis.position.x
              : b.position.z - rag.pelvis.position.z;
            if (Math.abs(want) < OB.pushAimDot) continue;
            if (Math.sign(want) !== Math.sign(toBox)) continue;
            s.pushers.set(rag, OB.pushGrace);
          }
          for (const rag of s.pushers.keys()) {
            sum += Math.sign(axis === 0 ? rag.intentX : rag.intentZ) || 0;
          }
          const drive = Math.abs(sum) * OB.pushForcePer;
          // 정지 마찰을 넘어야 비로소 움직인다. 혼자(100)는 못 넘고 둘(200)이면 넘는다.
          const net = drive - OB.pushBreak;
          const v = net > 0
            ? Math.min(OB.pushMaxSpeed, net * OB.pushGain) * Math.sign(sum)
            : 0;
          // 왕복 한계 안에서만 움직인다 (밀어서 코스 밖으로 보내지 못하게)
          let nv = v;
          if (s.pushOff >= span && v > 0) nv = 0;
          if (s.pushOff <= -span && v < 0) nv = 0;
          s.pushOff = Math.max(-span, Math.min(span, s.pushOff + nv * dt));
          if (axis === 0) {
            b.velocity.set(nv, 0, 0);
            b.position.set(s.px + s.pushOff, pushHalfH, s.spec.z);
          } else {
            b.velocity.set(0, 0, nv);
            b.position.set(s.px, pushHalfH, s.spec.z + s.pushOff);
          }
          // 얼마나 밀렸는지를 바깥이 읽을 수 있게 해 둔다 (HUD 안내 / 테스트)
          s.signalOn = Math.abs(s.pushOff) >= span - 0.05;
          break;
        }

        case "ice": {
          // 막지 않는다. 구역 안에 있는 동안 **직전 속도를 되돌려 준다**
          // = 브레이크와 방향 전환이 안 듣는다 (OB.iceSlip 주석).
          b.position.set(s.px, 0.02, s.spec.z);
          b.velocity.setZero();
          const ip = s.spec.params ?? {};
          const iHalfW = (ip.w ?? OB.iceW) * 0.5;
          const iHalfL = (ip.len ?? OB.iceD) * 0.5;
          const slip = ip.slip ?? OB.iceSlip;
          const onIce = (x: number, y: number, z: number) =>
            Math.abs(x - s.px) <= iHalfW && Math.abs(z - s.spec.z) <= iHalfL
            && y >= -0.5 && y <= 2.4;

          const slide = (body: CANNON.Body) => {
            const last = s.iceLast.get(body);
            s.iceLast.set(body, { x: body.velocity.x, z: body.velocity.z });
            if (!last) return;
            // 이번 스텝에 줄어든 속도의 slip 만큼을 되돌린다 (늘어난 건 그대로 둔다 -
            // 빙판이 사람을 가속시키면 안 된다).
            const back = (cur: number, prev: number) => {
              if (Math.abs(prev) <= Math.abs(cur) || Math.sign(prev) !== Math.sign(cur || prev)) return 0;
              const d = (prev - cur) * slip;
              return Math.max(-OB.iceMaxDv, Math.min(OB.iceMaxDv, d));
            };
            const dvx = back(body.velocity.x, last.x);
            const dvz = back(body.velocity.z, last.z);
            if (dvx === 0 && dvz === 0) return;
            body.velocity.x += dvx;
            body.velocity.z += dvz;
            body.wakeUp();
          };

          for (const rag of players) {
            const q = rag.pelvis.position;
            if (!onIce(q.x, q.y, q.z)) { for (const bd of rag.bodies) s.iceLast.delete(bd); continue; }
            // 골반만 미끄러뜨리면 몸이 뒤로 남는다. 러시(ball.ts)와 같은 이유로
            // 몸 전체에 같은 처리를 한다.
            for (const bd of rag.bodies) slide(bd);
          }
          if (ball) {
            if (onIce(ball.position.x, ball.position.y, ball.position.z)) {
              // [이미 빙판 값인 것을 원래 값으로 기억하면 안 된다] 빙판 구역이
              // 둘 이상 겹치거나 이어져 있으면, 두 번째 구역이 첫 번째가 이미
              // 낮춰 놓은 감쇠를 "원래 값"으로 저장한다. 그러면 구역을 다
              // 벗어난 뒤에도 공이 영영 미끄러운 채로 남는다.
              if (!s.iceBallHome && ball.linearDamping !== OB.iceBallDamp) {
                s.iceBallHome = { ld: ball.linearDamping, ad: ball.angularDamping };
              }
              ball.linearDamping = OB.iceBallDamp;
              ball.angularDamping = OB.iceBallAngDamp;
              ball.wakeUp();
            } else if (s.iceBallHome) {
              ball.linearDamping = s.iceBallHome.ld;
              ball.angularDamping = s.iceBallHome.ad;
              s.iceBallHome = null;
            }
          }
          break;
        }

        case "bumper": {
          // 제자리에 선 기둥. 닿은 것을 바깥으로 반사한다.
          b.position.set(s.px, OB.bumperH * 0.5, s.spec.z);
          b.velocity.setZero();
          for (const [bd, t] of s.bounceCool) {
            const nt = t - dt;
            if (nt <= 0) s.bounceCool.delete(bd);
            else s.bounceCool.set(bd, nt);
          }
          const r = (s.spec.params?.r ?? OB.bumperR);
          const fire = (body: CANNON.Body, pad: number): { x: number; z: number } | null => {
            if (s.bounceCool.has(body)) return null;
            let dx = body.position.x - s.px;
            let dz = body.position.z - s.spec.z;
            const d = Math.hypot(dx, dz);
            if (d > r + pad || Math.abs(body.position.y - OB.bumperH * 0.5) > OB.bumperH) return null;
            if (d < 1e-3) { dx = 1; dz = 0; }
            else { dx /= d; dz /= d; }
            s.bounceCool.set(body, OB.bumperCooldown);
            return { x: dx, z: dz };
          };
          if (ball) {
            const n = fire(ball, ball.shapes[0] instanceof CANNON.Sphere
              ? (ball.shapes[0] as CANNON.Sphere).radius : 0.3);
            if (n) {
              ball.velocity.set(n.x * OB.bumperBall, Math.max(2.5, ball.velocity.y), n.z * OB.bumperBall);
              ball.wakeUp();
              fxOut.push({ kind: "bumper", rag: null, power: 1,
                x: ball.position.x, y: ball.position.y, z: ball.position.z });
            }
          }
          for (const rag of players) {
            const q = rag.pelvis;
            const n = fire(q, 0.55);
            if (!n) continue;
            // [넉다운이 있어야 보인다] 충격량만 주면 control() 의 속도 서보가
            // 그 자리에서 지운다 (HANDOFF 5절의 「핵심 발견 2」). 그래서 세게
            // 들이받았을 때만 제어를 잠깐 끊는다 - 그때만 실제로 날아간다.
            const closing = -(q.velocity.x * n.x + q.velocity.z * n.z);
            if (closing >= OB.bumperKnockAt) rag.knockdown(OB.bumperKnockdownTime);
            q.applyImpulse(new CANNON.Vec3(n.x * OB.bumperPush, OB.bumperUp, n.z * OB.bumperPush));
            q.wakeUp();
            fxOut.push({ kind: "bumper", rag, power: Math.max(0.2, Math.min(1, closing / 6)),
              x: q.position.x, y: q.position.y, z: q.position.z });
          }
          break;
        }

        case "jumppad": {
          // 밟으면 위로. 막지 않는다 (밟고 지나가는 바닥 판이다).
          b.position.set(s.px, 0.06, s.spec.z);
          b.velocity.setZero();
          for (const [bd, t] of s.bounceCool) {
            const nt = t - dt;
            if (nt <= 0) s.bounceCool.delete(bd);
            else s.bounceCool.set(bd, nt);
          }
          const jr = s.spec.params?.r ?? OB.jumppadR;
          const up = s.spec.params?.up ?? OB.jumppadUp;
          const inPad = (body: CANNON.Body, maxY: number) =>
            !s.bounceCool.has(body)
            && Math.hypot(body.position.x - s.px, body.position.z - s.spec.z) <= jr
            && body.position.y <= maxY;
          for (const rag of players) {
            if (!inPad(rag.pelvis, OB.jumppadMaxY)) continue;
            s.bounceCool.set(rag.pelvis, OB.jumppadCooldown);
            // 몸 전체를 같이 띄운다. 골반만 쏘면 몸이 뒤로 남아 그대로 자빠진다.
            for (const bd of rag.bodies) { bd.velocity.y = Math.max(bd.velocity.y, up); bd.wakeUp(); }
            fxOut.push({ kind: "jumppad", rag, power: 1,
              x: rag.pelvis.position.x, y: 0.1, z: rag.pelvis.position.z });
          }
          if (ball && inPad(ball, 1.2)) {
            s.bounceCool.set(ball, OB.jumppadCooldown);
            ball.velocity.y = Math.max(ball.velocity.y, s.spec.params?.up ?? OB.jumppadBallUp);
            ball.wakeUp();
            fxOut.push({ kind: "jumppad", rag: null, power: 1,
              x: ball.position.x, y: ball.position.y, z: ball.position.z });
          }
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

  function forget(rag: Ragdoll) {
    hitCooldown.delete(rag);
    for (const s of stations) { s.pushers.delete(rag); s.riders.delete(rag); }
  }

  /** 이번에 쌓인 범퍼/점프패드 사건을 가져가고 비운다 (host 전용) */
  function takeFx(): ObstacleFx[] {
    if (fxQueue.length === 0) return [];
    const out = fxQueue.slice();
    fxQueue.length = 0;
    return out;
  }

  /**
   * 밀어야 하는 문의 현황 (모든 클라이언트에서 읽기 전용).
   *
   * done 은 끝까지 밀렸는가다. 상황 안내와 테스트가 이 값을 읽는다.
   *
   * [바디 위치에서 다시 계산한다 — 실측으로 찾은 문제]
   * 처음엔 `s.pushOff`(누적 카운터)와 `s.signalOn`을 그대로 돌려줬다. 그런데
   * 그 둘은 `update()`가 채우는 값이고 **update()는 host에서만 돈다.** 비-host는
   * 물리를 안 돌리고 스냅샷으로 바디 위치만 받으므로, 브라우저 2인 검증에서
   * host는 -2.8m 밀렸다고 하는데 친구 화면은 0으로 나왔다 (문은 실제로 같은
   * 자리에 그려져 있었다 — 숫자만 틀렸다). 바디 위치는 양쪽에 다 있으므로
   * 거기서 되계산하면 두 화면이 같은 값을 본다.
   */
  function pushBlocks(): { z: number; x: number; off: number; done: boolean }[] {
    return stations
      .filter((s) => s.spec.kind === "pushblock")
      .map((s) => {
        const span = s.spec.params?.span ?? (s.spec.arg || 5);
        const off = s.axis === 0 ? s.body.position.x - s.px : s.body.position.z - s.spec.z;
        return { z: s.spec.z, x: s.px, off, done: Math.abs(off) >= span - 0.05 };
      });
  }

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
  // link 가 걸린 문은 자기 트리거(레버/공 소켓)로 열 수 있으므로 싱글
  // 자동 개방 대상이 아니다. 순수 패스 게이트만 자동으로 열어 준다.
  const isPassGate = (s: Station) => s.spec.kind === "coopgate" && s.spec.link === undefined;
  /** 그 채널에 신호를 낼 수 있는 트리거가 몇 개인가 */
  function triggerCount(ch?: number): number {
    if (ch === undefined) return 0;
    let n = 0;
    for (const s of stations) if (s.spec.link === ch && isTrigger(s)) n++;
    return n;
  }

  /**
   * 사람이 둘 이상 있어야 열 수 있는 관문인가 (싱글에서 자동으로 열어 줄 대상).
   *
   * [혼자서 풀 수 있는 문은 열어 주지 않는다] 공 소켓 하나로 열리는 문은
   * 싱글에서도 공만 굴려 넣으면 되므로 공짜로 열면 퍼즐이 사라진다.
   * 반대로 레버가 둘 이상 달린 holdgate 는 혼자서는 절대 못 여니 열어 준다
   * (안 그러면 싱글에서 그 자리에서 진행이 막힌다).
   */
  const isCoopGate = (s: Station) => {
    if (s.spec.kind === "buttongate") return true;
    if (s.spec.kind === "coopgate") return s.spec.link === undefined;   // 패스 게이트
    if (s.spec.kind === "holdgate") return triggerCount(s.spec.link) >= 2;
    // 밀어야 하는 문은 한 사람 몫의 힘으로는 정지 마찰을 못 넘는다 = 혼자면
    // 원리적으로 불가능하다. 싱글에서는 끝까지 밀린 자리에 세워 둔다.
    if (s.spec.kind === "pushblock") return true;
    return false;
  };

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

  return { rebuild, park, update, rollers, signals, signalActive, signalAll, forget, openGate, closedGates, needsSoloOpen,
    buttonGates, onPad, takeFx, pushBlocks,
    get stations() { return stations; } };
}
