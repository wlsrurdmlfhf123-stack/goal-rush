import * as CANNON from "cannon-es";
import { P, type Ragdoll } from "./ragdoll";

/**
 * 플레이어끼리 장난치기 — 밀치기(E) / 잡기·끌기(Q) / 발차기(F).
 *
 * [전투가 아니라 물리 개그다] HP도 데미지도 없다. 하는 일은 셋뿐이다.
 *  1) 앞에 있는 사람을 찾는다
 *  2) 기존 물리 바디에 충격량을 준다
 *  3) 필요하면 기존 knockdown() / 이동 입력 덮어쓰기로 잠깐 제어를 끊는다
 * 새 캐릭터 물리를 만들지 않는다. ragdoll.ts 는 한 줄도 안 건드린다.
 *
 * [왜 충격량만으로는 안 되는가 - 이 파일의 존재 이유]
 * ragdoll.ts control() 의 속도 서보는 **월드 기준** 목표 속도(입력이 없으면 0)로
 * 최대 49 m/s^2 의 제동을 건다. 그래서 아무리 세게 밀어도 그 자리에서 지워진다
 * (HANDOFF 5절 "전속력 몸통박치기: 밀린 거리 0.00m"). 실제로 밀리게 하는 길은
 * 둘뿐이고, 여기서는 둘 다 쓴다:
 *   · 밀치기(E) - `shoveDir()` 로 **이동 입력을 덮어쓴다**. 제어는 살아 있어서
 *                 비틀거리며 밀려날 뿐 넘어지지는 않는다.
 *   · 발차기(F) - `knockdown()` 으로 제어를 아예 끊는다. 그래서 크게 날아간다.
 * 둘의 체감 차이가 이 구조에서 저절로 나온다.
 *
 * [멀티] 전부 host 에서만 돈다 (main.ts 의 host 분기에서 호출). 결과는 기존
 * 스냅샷(래그돌 15바디 + 소품)에 그대로 실려 나가므로 새 네트워크 메시지가
 * 없다. 클라이언트가 남의 위치를 건드리는 곳은 어디에도 없다.
 */

/** 세 기능의 밸런스 상수 - 조절은 전부 여기서 한다 */
export const SC = {
  // ---------------------------------------------------------------- 공통
  /**
   * 맞은 사람이 잠시 다시 안 맞는 시간 (초).
   *
   * 쿨다운은 때리는 쪽만 막는다. 둘이 번갈아 때리거나 셋이 둘러싸면 그것만으로는
   * 계속 누워 있게 되므로, **맞는 쪽에도** 무적을 둔다. 이게 "무한 경직" 방지의
   * 핵심이다 (obstacles.ts hitCooldownTime 과 같은 이유).
   */
  hitImmunity: 0.65,

  /** 앞쪽 판정. 조준 방향과 상대 방향의 내적이 이 값보다 커야 한다 (약 64도) */
  frontDot: 0.44,

  // ---------------------------------------------------------------- E 밀치기
  /** 사거리 (m). 팔이 닿을 만한 거리만 */
  PUSH_RANGE: 2.0,
  /** 제대로 맞았을 때의 충격량 (N·s). 골반에 건다 */
  PUSH_FORCE: 46,
  /** 살짝 띄워서 "붕 뜨는" 맛을 낸다 */
  PUSH_UP: 7,
  /**
   * 스치듯 맞았을 때 남는 세기의 비율 (0..1).
   *
   * [왜 필요한가 - 실측] 이게 없을 때는 코앞(0.7m)에서 밀든 사거리 끝(1.95m)
   * 에서 밀든 **밀린 거리가 1.46~1.48m로 똑같았고**, 정면(0도)이나 판정 경계
   * (63도)나 차이가 없었다. 어디를 어떻게 밀어도 결과가 같으면 "제대로
   * 맞혔다"가 없다. 거리와 각도로 세기를 나눠서 툭 스친 것과 정통으로 박은
   * 것이 다르게 보이게 한다.
   */
  PUSH_MIN: 0.4,
  /**
   * 맞은 사람의 상체를 젖히는 충격량 (N·s).
   *
   * 가슴 위쪽(PUSH_TWIST_AT)에 걸어서 몸이 뒤로 넘어가듯 돌게 한다. 각속도를
   * 직접 써넣지 않는 이유는, 이미 관절로 묶인 몸에 회전을 강제로 대입하면
   * 그 프레임에 관절이 튀기 때문이다. 충격량을 중심에서 벗어난 곳에 걸면
   * 회전은 물리가 알아서 만든다.
   */
  PUSH_TWIST: 20,
  /** 그 충격량을 거는 높이 (골반/상체 중심 기준 m) */
  PUSH_TWIST_AT: 0.3,
  /** 때리는 쪽 쿨다운 (초). 툭툭 밀 수 있을 만큼 짧게 */
  PUSH_COOLDOWN: 0.42,
  /**
   * 밀린 사람의 이동 입력을 뒤로 덮어쓰는 시간 (초).
   *
   * 짧아야 한다. 길면 조작을 빼앗긴 느낌이 나고, 연속으로 맞으면 영영 못 움직인다.
   * 0.3초면 "어어" 하고 두어 걸음 밀리는 정도다.
   */
  PUSH_STUN: 0.32,

  // ------------------------------------------------- E: 어느 쪽에서 맞았는가
  //
  // [왜 방향을 보는가] 예전에는 앞에서 밀든 뒤에서 밀든 결과가 **완전히 같았다**.
  // 그런데 실제로 웃긴 건 "뒤에서 몰래 밀어서 앞으로 고꾸라뜨리기"이고, 그게
  // 정면으로 부딪히는 것과 그림이 같으면 굳이 뒤로 돌아갈 이유가 없다. 맞은
  // 사람이 **어느 쪽을 보고 있었는지**만 보면 세 상황이 공짜로 갈린다.
  //
  // 기준은 맞은 사람의 몸통이 보는 방향(torso forward)이다. 이동 입력이 아니라
  // 실제 자세를 쓰는 이유는, 가만히 선 사람(입력 0)에게도 등이 있기 때문이다.
  /** |내적|이 값보다 크면 정면/등, 작으면 옆이다 (약 63도) */
  SIDE_DOT: 0.45,

  // 정면 - 밀린 거리는 짧고 대신 상체가 크게 뒤로 젖혀진다 (휘청).
  //
  // [젖힘은 정면 몫, 거리는 등 몫 - 실측으로 이렇게 갈렸다]
  // 처음엔 둘 다 상체를 크게 젖히게 뒀는데(FRONT 1.55 / BACK 1.4), 그러면
  //  · 정면: 뒤로 밀리면서 뒤로 젖혀지므로 그대로 넘어간다 (기울기 0.99 = 자빠짐)
  //  · 등  : 앞으로 밀리면서 앞으로 젖혀지므로 오히려 안정적이다
  // 가 되어, 넘어지지 말아야 할 E가 정면에서만 넘어뜨렸다.
  // 그래서 젖히는 몫을 정면에 몰아주고 등에서는 뺐다. 등은 "밀려 나간 거리"로,
  // 정면은 "휘청인 각도"로 서로 다르게 읽힌다.
  FRONT_FORCE: 0.82, FRONT_UP: 1.3, FRONT_TWIST: 1.4, FRONT_STUN: 0.82,
  // 등 - 무게중심이 앞으로 그대로 쏟아진다. 제일 크게 밀린다.
  BACK_FORCE: 1.12, BACK_UP: 0.85, BACK_TWIST: 1.0, BACK_STUN: 1.25,
  // 옆 - 미는 힘 자체는 보통이지만 몸이 돌아가고 비스듬히 미끄러진다.
  SIDE_FORCE: 1.0, SIDE_UP: 1.05, SIDE_TWIST: 1.0, SIDE_STUN: 0.95,
  /**
   * 정면으로 맞았을 때 상체 충격량을 거는 높이 (m).
   *
   * PUSH_TWIST_AT(0.3)보다 위다. 같은 충격량이라도 위에 걸수록 회전 팔이 길어져서
   * 앞으로 나아가는 대신 뒤로 젖혀진다 - "밀렸다"가 아니라 "휘청였다"가 된다.
   */
  PUSH_TWIST_HIGH: 0.42,
  /** 옆에서 맞으면 몸이 이만큼 돌아간다 (rad/s, y축) */
  SIDE_SPIN: 5.2,
  /**
   * 옆에서 맞았을 때 밀리는 방향을 트는 각 (rad).
   *
   * 옆구리를 맞으면 밀린 쪽으로 곧게 가는 게 아니라 발이 꼬이면서 비스듬히
   * 나간다. shoveDir 을 트는 것뿐이라 control() 은 그대로다.
   */
  SIDE_VEER: 0.7,

  // ---------------------------------------------------------------- Q 잡기/끌기
  /** 잡을 수 있는 거리 (m) */
  GRAB_RANGE: 1.9,
  /** 이보다 멀어지면 저절로 놓는다 (m) */
  GRAB_DISTANCE: 3.4,
  /** 잡은 사람을 끌어당기는 가속 (m/s^2) */
  GRAB_PULL: 30,
  /** 끌 때 붙잡아 두고 싶은 앞쪽 거리 (m) */
  GRAB_AHEAD: 1.15,
  /** 상대속도 감쇠 - 없으면 고무줄처럼 앞뒤로 튄다 */
  GRAB_DAMP: 5.0,
  /** 잡기/놓기 토글 쿨다운 (초) */
  GRAB_COOLDOWN: 0.3,
  /** 잡는 데 쓸 수 있는 최대 힘 (N). 이걸로 "완전 고정"이 아니라 끌리는 느낌이 난다 */
  GRAB_MAX_FORCE: 900,
  /**
   * 잡힌 사람의 이동 입력을 잡은 쪽으로 섞는 비율 (0..1). main.ts 가 쓴다.
   *
   * [힘만으로는 못 끌고 온다 - 실측] 위의 당기는 힘은 이 파일 머리말이 말한 그
   * 문제에 똑같이 걸린다. 잡힌 사람의 control() 속도 서보가 그 힘을 매 스텝
   * 지워 버린다. 실제로 힘만 줬을 때는 잡은 사람이 뒤로 걸어가는 동안 상대가
   * 따라온 거리가 0.87m뿐이었고, 0.78초 만에 GRAB_DISTANCE 밖으로 밀려나
   * 저절로 풀렸다 (= 잡기가 성립하지 않았다).
   *
   * 그래서 밀치기(shoveDir)와 같은 길을 쓴다 - 이동 입력을 덮어쓴다. 다만
   * 통째로 뺏지 않고 섞는다. 그래야 잡힌 사람이 반대로 걸어 저항할 수 있고,
   * 그게 원래 이 기능의 설계였다 ("완전 고정이 아니라 끌리는 느낌").
   * 0.7이면 간격이 GRAB_AHEAD 에 딱 붙어서 따라온다 (실측 1.15~1.18m).
   */
  GRAB_DRAG: 0.7,
  /**
   * 잡힌 사람이 정면으로 버틸 때 끌리는 방향을 비스듬히 트는 최대 각 (rad).
   * main.ts 가 쓴다.
   *
   * [왜 필요한가 - 실측] 이게 없을 때, 상대가 온 힘으로 반대로 걸어도 4초에
   * 16.61m 끌려왔다. 가만히 있을 때(16.63m)와 **사실상 같다** = 저항이 아무
   * 의미가 없었다. 잡힌 쪽에서 보면 조작을 통째로 빼앗긴 것이다.
   *
   * [왜 각도인가 - control() 때문이다] 끌리는 방향과 자기 입력을 섞는 방법은
   * 쓸 수 없다. control()이 이동 입력의 **크기를 무시하고 정규화**하므로,
   * 섞은 결과는 어느 쪽이든 항상 전속력이 되어 버린다. 실제로 섞기로 했을 때
   * 값이 0.28을 넘는 순간 "전속력으로 끌려감"에서 "전속력으로 도망감"으로
   * 그냥 뒤집혔다 (실측: 0.24 = 16.61m 끌림, 0.34 = 0.37초 만에 풀림).
   *
   * 그래서 방향을 **옆으로 튼다.** 속도는 그대로지만 잡은 사람 쪽으로 가는
   * 성분이 cos만큼 줄어서, 버티는 동안 옆으로 미끄러지며 천천히 끌려간다.
   * 그림으로도 "발을 버티며 딸려간다"가 된다.
   */
  GRAB_RESIST: 0.8,
  /**
   * 서로 잡았을 때 당기는 힘 배율 (줄다리기).
   *
   * 둘이 마주 잡고 반대로 걸으면 양쪽 당기는 힘이 정면으로 부딪힌다. 그대로 두면
   * 합이 커져서 둘 다 부들부들 떨다 물리가 튄다. 절반으로 낮추면 그 자리에서
   * 팽팽하게 버티는 그림이 되고, 먼저 방향을 바꾸는 쪽이 이긴다.
   */
  GRAB_TUG: 0.5,

  // ------------------------------------------------- Q: 잡고 급회전 = 후려치기
  //
  // 잡은 채로 몸을 홱 돌리면 잡힌 사람이 원심력으로 딸려 나온다. 이게 없으면 Q는
  // "천천히 끌고 가기" 하나뿐이라 금방 질린다. 있으면 잡기 자체가 기술이 된다.
  //
  // 판정은 **잡은 사람 기준 상대 방향이 도는 각속도**로 한다. 카메라(조준)가
  // 아니라 실제 위치 관계를 쓰는 이유는, 마우스만 홱 돌려도 사람이 날아가면
  // 그건 물리가 아니라 마술이기 때문이다.
  /**
   * 이 각속도 이상으로 방향이 돌면 후려친다 (rad/s).
   *
   * [실측으로 고른 값] 끌고 가는 동안의 회전은 아주 느리다 - 곧게 끌면 0.4,
   * 상대가 버티며 발버둥쳐도 1.2 를 안 넘었다. 반면 잡은 채로 90도를 홱 트는
   * 동작은 2.7 까지 올라간다. 그 사이인 2.2 여야 "일부러 돌렸을 때만" 나간다.
   * (3.4 로 뒀을 때는 사람이 낼 수 있는 회전으로는 한 번도 안 나갔다.)
   */
  WHIP_RATE: 2.2,
  /** 이보다 붙어 있으면 원심력이 안 산다 (m) */
  WHIP_MIN_DIST: 0.9,
  /** 접선 방향 충격량 (N·s) */
  WHIP_FORCE: 44,
  /** 후려칠 때 위로 (N·s) */
  WHIP_UP: 10,
  /** 연속으로 안 나가게 (초) */
  WHIP_COOLDOWN: 0.55,
  /** 이보다 더 급하게 돌리면 아예 넘어지고 손에서 놓친다 (rad/s) */
  WHIP_DOWN_RATE: 4.6,
  /** 그때 넘어져 있는 시간 (초) */
  WHIP_KNOCKDOWN: 0.95,

  // ------------------------------------------------- 달리다 부딪히기 (약한 충돌)
  //
  // main.ts 의 기존 장치(updatePlayerBumps)는 **둘 다 넘어뜨린다**. 그건 정면으로
  // 세게 박았을 때의 그림이고, 스치듯 부딪힌 것까지 넘어뜨리면 같이 못 달린다.
  // 그래서 그 문턱 아래에 한 칸을 더 만든다 - 넘어지지는 않고 서로 휘청인다.
  // 기존 장치는 한 줄도 안 바뀐다 (문턱 위는 예전 그대로 넘어진다).
  /** 부딪힌 뒤 비틀거리는 시간 (초) */
  BUMP_STAGGER: 0.3,
  /** 서로 튕겨나가는 충격량 (N·s) */
  BUMP_FORCE: 26,
  /** 살짝 뜬다 (N·s) */
  BUMP_UP: 5,
  /** 상체가 서로 반대로 젖혀진다 (N·s) */
  BUMP_TWIST: 12,
  /** 같은 둘이 계속 부딪히지 않게 (초) */
  BUMP_COOLDOWN: 0.55,

  // ---------------------------------------------------------------- F 발차기
  /** 사거리 (m). E보다 살짝 짧다 */
  KICK_RANGE: 1.8,
  /**
   * 충격량 (N·s). E의 세 배가 넘는다.
   *
   * [더 세게 찬다고 더 날아가지 않는다 - 실측] 이 값을 165까지 올려 봤더니
   * 평지 이동이 오히려 5.50m -> 4.79m로 **줄고** 뒤집힘도 -0.99 -> -0.55로
   * 약해졌다. 앞으로 세게 밀수록 몸이 땅에 처박히면서 마찰로 에너지를
   * 잃기 때문이다. 날아가는 거리를 정하는 건 힘이 아니라 KICK_UP 쪽이다.
   */
  KICK_FORCE: 135,
  /**
   * 위로 띄우는 양 - 이게 있어야 "붕 날아간다"가 된다.
   *
   * 실제로 거리와 뒤집힘을 정하는 값이다 (KICK_FORCE 주석의 스윕 참고).
   * 힘 135 기준 26 -> 3.36m / 30 -> 3.71m / 34 -> 5.50m 였고, 34에서만
   * 기울기가 -0.99까지 내려갔다(= 완전히 뒤집혀 굴러간다).
   */
  KICK_UP: 34,
  /**
   * 맞은 사람이 굴러가는 회전 (rad/s).
   *
   * [왜 필요한가 - 실측] 회전을 안 주면 몸이 **뒤집히지 않는다**. 기울기
   * (상체 위쪽 벡터의 y)가 최소 0.27까지밖에 안 내려갔다 = 옆으로 조금 기운
   * 채 미끄러져 갈 뿐이다. 날아가기는 하는데 "자빠졌다"로 안 읽힌다.
   *
   * 축은 진행 방향에 수직으로 잡는다(dirZ, 0, -dirX). 그래야 옆으로 도는 게
   * 아니라 **날아가는 쪽으로 앞구르기**를 한다.
   */
  KICK_SPIN: 11,
  /** 때리는 쪽 쿨다운 (초). E보다 길다 */
  KICK_COOLDOWN: 1.1,
  /** 맞은 사람이 넘어져 있는 시간 (초) */
  KICK_KNOCKDOWN: 1.15,
  /** 맞은 사람 팔이 허우적거린다 (m/s). 구르는 몸에 팔만 따로 놀아야 인형처럼 보인다 */
  KICK_FLAIL: 7,
  /** 앞구르기에 살짝 섞는 옆회전 (rad/s). 정확히 앞으로만 구르면 기계처럼 보인다 */
  KICK_YAW: 1.5,

  // ------------------------------------------------- F: 벽에 박으면 되튕긴다
  //
  // [왜 이게 웃긴가] 차인 친구가 그냥 미끄러져 멈추면 웃음이 한 번이다. 날아가다
  // 기둥에 정면으로 박아서 되튕겨 나오면 그게 두 번째 웃음이고, 차는 쪽이
  // **어디로 차느냐**를 고민하게 된다 (= 지형이 놀잇감이 된다).
  //
  // [벽을 어떻게 아는가 - 두 가지를 같이 본다]
  //  1) 한 스텝에 수평 속도가 얼마나 죽었는가. 바닥 마찰의 감속은
  //     μ·g ≈ 0.55·18 = 9.9 m/s², 한 스텝(1/60초)이면 0.17 m/s다. 한 스텝에
  //     2.6 m/s가 사라졌다면 마찰로는 불가능하다.
  //  2) 그 순간 **실제로 벽에 닿아 있는가** (physics.contacts 를 본다).
  //
  // 1)만으로는 안 된다 - 실측으로 차인 사람이 땅에 처박히는 순간에도 한 스텝에
  // 2.97~4.04 m/s가 사라졌다. 몸이 지면에 부딪히는 것 자체가 큰 충돌이기
  // 때문이다. 그래서 평지에서 그냥 굴러가다 되튕기는 거짓 양성이 났다.
  //
  // 2)만으로도 안 된다 - 벽을 스치듯 지나가기만 해도 닿아 있다.
  //
  // 접촉의 **법선 방향**으로 바닥과 벽을 가른다. 바닥은 법선이 위(|n.y|≈1),
  // 벽은 옆(|n.y|≈0)이다. 그리고 움직이는 물건(공/소품)은 벽이 아니다.
  /** 차인 뒤 이 시간 안에 박아야 튕긴다 (초). 한참 굴러가다 걸리면 안 웃긴다 */
  REBOUND_WINDOW: 1.2,
  /**
   * 찬 직후 이 시간 동안은 감시하지 않는다 (초).
   *
   * [왜 필요한가 - 실측] 발차기 충격량은 골반 하나에 걸린다. 그래서 찬 순간
   * 골반만 16.4 m/s로 튀어나가고, 다음 스텝에 관절이 나머지 12kg을 끌면서
   * 10.1 m/s로 떨어진다 - **한 스텝에 6.3 m/s 손실**이다. 벽에 등을 대고 선
   * 사람을 벽과 나란한 쪽으로 차면 그 손실이 벽 접촉과 겹쳐서 헛되튕김이 된다.
   *
   * 손실은 스텝마다 6.28 -> 2.11 -> 0.85 -> 0.11 로 네 스텝이면 잦아든다.
   * 0.1초(6스텝)면 충분하고, 바로 옆 벽에 처박는 장면은 그대로 살아 있다.
   */
  REBOUND_ARM: 0.1,
  /** 박기 직전 수평 속도가 이 이상이어야 한다 (m/s) */
  REBOUND_MIN_SPEED: 4.0,
  /** 한 스텝에 수평 속도가 이만큼 사라지면 "박았다" (m/s) */
  REBOUND_DROP: 2.6,
  /**
   * 접촉 법선의 |y| 가 이보다 작아야 "벽"이다 (0..1).
   *
   * 0.6 이면 지면에서 37도 이상 서 있는 면만 벽으로 본다. 평평한 바닥(1.0)과
   * 완만한 비탈은 빠지고, 기둥·담·셔터처럼 서 있는 면만 남는다.
   */
  REBOUND_WALL_DOT: 0.6,
  /**
   * 잃은 속도의 이 비율로 되튕겨 나온다 (0..1).
   *
   * 골반과 상체 **양쪽에** 걸어서 몸통 전체를 돌려보낸다. 골반에만 걸었을 때는
   * 나머지 12kg이 그대로 벽에 밀려 있어서 관절이 골반을 도로 앞으로 끌어당겼고,
   * 결과적으로 벽에서 물러난 거리가 0.01m였다 (= 아무 일도 안 일어난 것과 같다).
   *
   * 0.62 에서는 되돌아가는 속도가 -0.73 m/s 뿐이라 "벽에 붙어서 멎었다"로
   * 보였다. 값을 더 올려도 이득이 빠르게 준다 - 박는 순간에는 몸이 벽에 눌려
   * 있어서 접촉 솔버가 되미는 힘의 상당 부분을 그 자리에서 먹기 때문이다
   * (실측: 0.9 -> 0.17m, 1.2 -> 0.22m, 2.0 -> 0.45m 물러남). 1.2 면 진행
   * 방향이 확실히 뒤집히면서도 로켓처럼 날아가지는 않는다.
   */
  REBOUND_FORCE: 1.2,
  /** 튕길 때 위로 (N·s). 이게 있어야 미끄러지는 게 아니라 튀어오른다 */
  REBOUND_UP: 24,
  /** 튕기면서 더 구른다 (rad/s) */
  REBOUND_SPIN: 9,

  // ---------------------------------------------------------------- 연출
  //
  // 애니메이션 시스템을 만들지 않는다. 이미 물리로 움직이는 팔다리를 한 번
  // 밀어 주면 그 자체가 동작이 된다 (그리고 스냅샷으로 동기화된다).
  //
  // [팔다리는 충격량이 아니라 **속도**로 적는다 - 실제로 났던 사고]
  // 예전엔 손에 16 N·s 를 그대로 걸었다. 손은 0.3kg 이라 그 한 방에 **53 m/s**
  // 가 된다. 그 손이 다음 스텝에 상대 골반을 스치면 ragdoll.ts 의 충격 감지
  // (P.impactSpeed = 13 m/s, 접촉점 속도로 잰다)에 걸려서 **미는 시늉만으로
  // 상대가 넘어졌다.** E는 넘어뜨리는 기술이 아닌데도 그랬다.
  // (실측: 밀며 쫓아가는 10초 동안 넉다운 1회 - rel=14.1 m/s)
  //
  // 그래서 아래 팔다리 값은 전부 m/s 다. flick() 이 질량을 곱해 준다. 팔이나
  // 다리가 통째로 같은 속도로 나가므로 손만 총알처럼 튀지 않고, 그림으로도
  // "팔을 뻗었다"가 된다. 몸통(leanPush/hitShake)은 5kg 이라 원래 문제가 없어서
  // 예전처럼 충격량 그대로다.
  /** 미는 순간 두 팔을 앞으로 (E). m/s */
  armThrust: 9,
  /** 미는 순간 상체를 앞으로 살짝 (E). N·s */
  leanPush: 7,
  /** 잡는 순간 팔을 상대 쪽으로 (Q). m/s */
  grabReach: 8,
  /** 차는 순간 차는 다리를 앞으로 (F). m/s */
  footThrust: 10,
  /** 맞은 사람의 상체를 흔든다 (F). N·s */
  hitShake: 26,
};

/**
 * 맞은 사람 기준으로 어디를 맞았는가.
 *  · front - 마주 보고 있었다 (휘청이며 뒤로 밀린다)
 *  · back  - 등을 보이고 있었다 (앞으로 크게 고꾸라진다)
 *  · side  - 옆구리 (몸이 돌아가며 비스듬히 미끄러진다)
 */
export type HitSide = "front" | "back" | "side";

/** 앞에서 찾아낸 상대 */
export interface ScuffleHit {
  target: Ragdoll;
  /** 민 방향 (수평 단위벡터) */
  dirX: number;
  dirZ: number;
  /** 둘 사이 수평 거리 (m) */
  dist: number;
  /**
   * 얼마나 제대로 맞았는가 (0..1). 거리와 각도로 정한다.
   *
   * 연출도 이 값을 쓴다 - 세게 맞았을 때 소리와 화면 흔들림이 같이 커져야
   * "정통으로 박았다"가 눈과 귀로 읽힌다 (main.ts).
   */
  power: number;
  /** 맞은 사람 기준 어느 쪽을 맞았는가 (SC.SIDE_DOT 주석) */
  side: HitSide;
  /**
   * 옆으로 맞았을 때 몸이 도는 쪽 (+1 / -1). front·back 이면 의미 없다.
   *
   * 왼 옆구리를 맞았는지 오른 옆구리를 맞았는지에 따라 도는 쪽이 반대여야
   * "맞은 쪽으로 팽그르르 돈다"가 된다. 양쪽 다 같은 쪽으로 돌면 회전이
   * 물리가 아니라 그냥 애니메이션으로 보인다.
   */
  sideSign: number;
}

/** F로 날아간 사람이 무언가에 박아 되튕긴 순간 (SC.REBOUND_* 주석) */
export interface ReboundEvent {
  rag: Ragdoll;
  x: number; y: number; z: number;
  /** 얼마나 세게 박았나 (0..1) - 소리·흔들림에 실린다 */
  power: number;
}

/**
 * 잡고 있는 동안 일어난 일.
 *  · dropped - 저절로 풀렸다 (멀어졌거나 잡은 쪽이 넘어졌다)
 *  · whip    - 잡은 채로 급회전해서 상대를 후려쳤다
 *  · tug     - 서로 잡았다 (줄다리기 시작)
 */
export type HoldEvent =
  | { kind: "dropped"; holder: Ragdoll; target: Ragdoll }
  | { kind: "whip"; holder: Ragdoll; target: Ragdoll; power: number; down: boolean }
  | { kind: "tug"; holder: Ragdoll; target: Ragdoll };

/** 잡기 토글 결과 */
export type GrabResult = "grabbed" | "released" | null;

/** facingOf 가 쓰는 재사용 벡터 - 판정은 매 프레임 도는 코드라 새로 만들지 않는다 */
const _fwd = new CANNON.Vec3(0, 0, 1);
const _out = new CANNON.Vec3();

export function createScuffle() {
  /** 때리는 쪽 쿨다운 (초) - 동작마다 따로 */
  const pushCd = new Map<Ragdoll, number>();
  const kickCd = new Map<Ragdoll, number>();
  const grabCd = new Map<Ragdoll, number>();
  /** 맞은 쪽 무적 (초) */
  const immune = new Map<Ragdoll, number>();
  /** 밀려서 이동 입력이 덮어써진 사람 */
  const shove = new Map<Ragdoll, { t: number; x: number; z: number }>();
  /** 잡은 사람 -> 잡힌 사람 */
  const holds = new Map<Ragdoll, Ragdoll>();
  /** 발차기로 날아가는 중 - 벽에 박으면 되튕긴다 (SC.REBOUND_* 주석) */
  const launched = new Map<Ragdoll, { t: number; spd: number; dx: number; dz: number }>();
  /** 잡은 사람 -> 직전 스텝의 "상대가 있는 쪽". 급회전(후려치기) 판정에 쓴다 */
  const lastDir = new Map<Ragdoll, { x: number; z: number }>();
  /** 후려치기 쿨다운 (초) */
  const whipCd = new Map<Ragdoll, number>();
  /** 지금 서로 잡고 있는 사람들 - 줄다리기 시작을 한 번만 알리려고 둔다 */
  const tugging = new Set<Ragdoll>();
  /** 달리다 부딪힌 뒤 쿨다운 (초) */
  const bumpCd = new Map<Ragdoll, number>();
  /** 발차기 횟수 - 옆회전 방향을 번갈아 준다 (난수를 쓰면 host/테스트가 갈린다) */
  let kickCount = 0;

  const tickMap = (m: Map<Ragdoll, number>, dt: number) => {
    for (const [k, v] of m) {
      const n = v - dt;
      if (n <= 0) m.delete(k); else m.set(k, n);
    }
  };

  /**
   * 한 스텝. main.ts 의 host 분기에서 물리 전에 한 번 부른다.
   *
   * physics 를 받는 건 되튕김 판정 때문이다 - 직전 스텝의 접촉 목록
   * (physics.contacts)을 읽어서 "지금 벽에 닿아 있는가"를 본다. 물리를 돌리기
   * 전에 부르므로 그 목록은 방금 끝난 스텝의 것이고, 여기서 비교하는 속도도
   * 같은 스텝의 결과다 (= 짝이 맞는다).
   *
   * @returns 이번 스텝에 무언가에 박아 되튕긴 사람들 (F로 날아가는 중이던 사람만)
   */
  function tick(dt: number, physics: CANNON.World): ReboundEvent[] {
    tickMap(pushCd, dt);
    tickMap(kickCd, dt);
    tickMap(grabCd, dt);
    tickMap(immune, dt);
    tickMap(whipCd, dt);
    tickMap(bumpCd, dt);
    for (const [k, v] of shove) {
      const n = v.t - dt;
      if (n <= 0) shove.delete(k); else shove.set(k, { ...v, t: n });
    }

    // ---- 날아가던 사람이 벽에 박았는가.
    // 충돌 이벤트가 아니라 "한 스텝에 사라진 수평 속도"로 본다 (SC.REBOUND_DROP 주석).
    const out: ReboundEvent[] = [];
    for (const [rag, s] of launched) {
      const v = rag.pelvis.velocity;
      const spd = Math.hypot(v.x, v.z);
      const lost = s.spd - spd;
      // 찬 직후 몇 프레임은 관절이 골반을 붙잡느라 속도가 크게 준다 - 감시 전이다
      // (SC.REBOUND_ARM 주석)
      const armed = s.t <= SC.REBOUND_WINDOW - SC.REBOUND_ARM;
      if (armed && s.spd >= SC.REBOUND_MIN_SPEED && lost >= SC.REBOUND_DROP
          && touchingWall(rag, physics)) {
        launched.delete(rag);
        out.push(bounce(rag, s.dx, s.dz, lost));
        continue;
      }
      const nt = s.t - dt;
      if (nt <= 0) { launched.delete(rag); continue; }
      // 진행 방향은 매 스텝 갱신한다 - 포물선을 그리며 휘어 날아가므로
      // 찬 순간의 방향으로 되튕기면 벽에서 엉뚱한 쪽으로 나간다.
      launched.set(rag, {
        t: nt, spd,
        dx: spd > 1e-3 ? v.x / spd : s.dx,
        dz: spd > 1e-3 ? v.z / spd : s.dz,
      });
    }
    return out;
  }

  /**
   * 지금 이 사람이 **서 있는 면**에 닿아 있는가 (= 벽/기둥에 박았는가).
   *
   * 자기 팔다리끼리의 접촉, 바닥, 굴러다니는 공은 전부 뺀다 (SC.REBOUND_WALL_DOT
   * 주석). 접촉 목록은 한 스텝에 수백 개가 될 수 있지만, 이 검사는 **속도가 크게
   * 깎인 스텝에** 그것도 **차여서 날아가는 중인 사람에게만** 돌기 때문에 사실상
   * 한 판에 몇 번뿐이다.
   */
  function touchingWall(rag: Ragdoll, physics: CANNON.World): boolean {
    const mine = new Set(rag.bodies);
    for (const c of physics.contacts) {
      const aMine = mine.has(c.bi), bMine = mine.has(c.bj);
      if (aMine === bMine) continue;                 // 둘 다 내 몸 / 둘 다 남
      const other = aMine ? c.bj : c.bi;
      if (other.type === CANNON.Body.DYNAMIC) continue;  // 공·소품은 벽이 아니다
      if (Math.abs(c.ni.y) > SC.REBOUND_WALL_DOT) continue;   // 바닥/천장
      return true;
    }
    return false;
  }

  /** 박은 자리에서 온 길로 되튕겨 나온다 */
  function bounce(rag: Ragdoll, dx: number, dz: number, lost: number): ReboundEvent {
    // 되튕기는 세기는 **실제로 잃은 속도**에서 가져온다. 살살 부딪히면 살짝,
    // 전속력으로 박으면 크게 - 고정값을 쓰면 어디에 박아도 똑같이 튄다.
    // 골반과 상체 양쪽에 (REBOUND_FORCE 주석 - 골반만으로는 관절이 도로 끌어당긴다)
    const jp = lost * SC.REBOUND_FORCE * rag.pelvis.mass;
    const jt = lost * SC.REBOUND_FORCE * rag.torso.mass;
    rag.pelvis.wakeUp();
    rag.pelvis.applyImpulse(new CANNON.Vec3(-dx * jp, SC.REBOUND_UP, -dz * jp));
    rag.torso.wakeUp();
    rag.torso.applyImpulse(
      new CANNON.Vec3(-dx * jt, SC.REBOUND_UP * 0.3, -dz * jt),
      new CANNON.Vec3(0, SC.PUSH_TWIST_AT, 0),
    );
    // 되튕기는 쪽으로 앞구르기 (tryKick 의 KICK_SPIN 과 같은 축 규칙)
    const sx = -dz * SC.REBOUND_SPIN, sz = dx * SC.REBOUND_SPIN;
    for (const b of [rag.pelvis, rag.torso]) {
      b.wakeUp();
      b.angularVelocity.x += sx;
      b.angularVelocity.z += sz;
    }
    const p = rag.pelvis.position;
    return { rag, x: p.x, y: p.y, z: p.z, power: Math.max(0.25, Math.min(1, lost / 9)) };
  }

  /**
   * 팔이나 다리를 한 방향으로 휙 뻗게 한다 (연출 전용).
   *
   * 속도로 받아서 질량을 곱한다 - 이유는 SC 의 연출 항목 주석에 적어 뒀다
   * (손 하나에 충격량을 걸면 53 m/s 가 되어 상대를 넘어뜨렸다).
   */
  function flick(bodies: CANNON.Body[], vx: number, vy: number, vz: number) {
    for (const b of bodies) {
      b.wakeUp();
      b.applyImpulse(new CANNON.Vec3(vx * b.mass, vy * b.mass, vz * b.mass));
    }
  }

  /** 한쪽 팔 전체 (위팔/아래팔/손). 없는 파츠는 조용히 건너뛴다 */
  function armOf(rag: Ragdoll, side: "L" | "R"): CANNON.Body[] {
    const out: CANNON.Body[] = [];
    for (const n of ["upperArm" + side, "lowerArm" + side, "hand" + side]) {
      const p = rag.parts.get(n);
      if (p) out.push(p.body);
    }
    return out;
  }

  /** 한쪽 다리의 아래쪽 (아래다리/발) - 차는 동작에 쓴다 */
  function shinOf(rag: Ragdoll, side: "L" | "R"): CANNON.Body[] {
    const out: CANNON.Body[] = [];
    for (const n of ["lowerLeg" + side, "foot" + side]) {
      const p = rag.parts.get(n);
      if (p) out.push(p.body);
    }
    return out;
  }

  /**
   * 맞은 사람이 보고 있던 쪽 (수평 단위벡터).
   *
   * 몸통 자세를 쓴다. control() 의 yaw 스프링이 이동 방향으로 몸을 돌려 두므로
   * 보이는 그림과 판정이 일치한다. 누워 있어서 몸통이 하늘/땅을 보고 있으면
   * 수평 성분이 0에 가까워지므로, 그때만 직전 이동 의도로 대신한다.
   */
  function facingOf(rag: Ragdoll): { x: number; z: number } {
    rag.torso.quaternion.vmult(_fwd, _out);
    let fx = _out.x, fz = _out.z;
    let l = Math.hypot(fx, fz);
    if (l < 0.2) { fx = rag.intentX; fz = rag.intentZ; l = Math.hypot(fx, fz); }
    if (l < 1e-3) return { x: 0, z: 1 };
    return { x: fx / l, z: fz / l };
  }

  /**
   * 앞쪽에서 가장 가까운 상대를 고른다.
   *
   * 조준(카메라 정면)을 기준축으로 쓴다 - 이동 방향으로 재면 "옆으로 걸으면서
   * 앞을 민다"가 표현되지 않는다 (ball.ts 트릭이 같은 이유로 조준을 쓴다).
   */
  function findFront(
    me: Ragdoll, aimX: number, aimZ: number, others: Ragdoll[], range: number,
  ): ScuffleHit | null {
    const len = Math.hypot(aimX, aimZ);
    if (len < 1e-3) return null;
    const ax = aimX / len, az = aimZ / len;
    const p = me.pelvis.position;

    let best: ScuffleHit | null = null;
    let bestD = Infinity;
    for (const t of others) {
      if (t === me) continue;
      const q = t.pelvis.position;
      const dx = q.x - p.x, dz = q.z - p.z;
      const d = Math.hypot(dx, dz);
      if (d > range || d < 1e-3) continue;
      // 위아래로 너무 떨어져 있으면 (다른 층/낭떠러지) 안 닿는다
      if (Math.abs(q.y - p.y) > 1.8) continue;
      const dot = (dx / d) * ax + (dz / d) * az;
      if (dot < SC.frontDot) continue;
      if (d < bestD) {
        bestD = d;
        const ux = dx / d, uz = dz / d;
        // 맞은 사람이 보던 쪽과 미는 방향을 비교하면 정면/등/옆이 갈린다.
        const f = facingOf(t);
        const face = f.x * ux + f.z * uz;
        const cross = f.x * uz - f.z * ux;
        const side: HitSide = face > SC.SIDE_DOT ? "back" : face < -SC.SIDE_DOT ? "front" : "side";
        best = {
          target: t, dirX: ux, dirZ: uz, dist: d, power: hitPower(d, dot, range),
          side, sideSign: cross >= 0 ? 1 : -1,
        };
      }
    }
    return best;
  }

  /**
   * 얼마나 제대로 맞았는가 (0..1).
   *
   * 코앞에서 정면으로 박으면 1, 사거리 끝에서 비스듬히 스치면 PUSH_MIN 근처.
   * 거리를 각도보다 조금 더 크게 본다(0.6:0.4) - 실제로 몸이 부딪히는 느낌은
   * "얼마나 붙어서 밀었나"가 먼저다.
   */
  function hitPower(d: number, dot: number, range: number): number {
    const near = 1 - Math.min(1, d / range);
    const face = (dot - SC.frontDot) / (1 - SC.frontDot);
    const q = 0.6 * near + 0.4 * Math.max(0, Math.min(1, face));
    return SC.PUSH_MIN + (1 - SC.PUSH_MIN) * q;
  }

  /** 맞을 수 있는 상태인가 (무적 중이면 안 맞는다) */
  const canHit = (t: Ragdoll) => !immune.has(t);

  /**
   * 지금 피격 무적인가 (읽기 전용).
   *
   * main.ts 의 `updatePlayerBumps`(사람끼리 부딪히면 같이 자빠지는 기존 장치)가
   * 이 값을 본다. 밀치기/발차기로 날아간 사람이 그 속도 그대로 제3자에게 꽂히면
   * bump 가 다시 양쪽을 넘어뜨려서 한 번의 E/F 가 연쇄 경직이 된다. 무적인 동안
   * bump 를 걸러 주면 **기존 장치를 지우지 않고도** 그 연쇄만 끊긴다.
   */
  const isImmune = (t: Ragdoll) => immune.has(t);

  /**
   * E - 밀치기.
   *
   * 넘어뜨리지 않는다. 대신 이동 입력을 잠깐 뒤로 덮어써서 **비틀거리며 밀려나게**
   * 한다. control() 은 그대로 살아 있으므로 상대는 계속 서 있고, 밀린 뒤 바로
   * 다시 움직일 수 있다. 이게 "치고 빠지는 장난"의 감각이다.
   *
   * @returns 실제로 민 상대. 앞에 아무도 없거나 쿨다운이면 null (그러면 호출한
   *          쪽이 원래의 E 동작 = 공 줍기/놓기를 그대로 한다)
   */
  function tryPush(me: Ragdoll, aimX: number, aimZ: number, others: Ragdoll[]): ScuffleHit | null {
    if (pushCd.has(me)) return null;
    if (me.state !== "ACTIVE") return null;
    const hit = findFront(me, aimX, aimZ, others, SC.PUSH_RANGE);
    if (!hit || !canHit(hit.target)) return null;

    pushCd.set(me, SC.PUSH_COOLDOWN);
    immune.set(hit.target, SC.hitImmunity);

    const t = hit.target;
    const k = hit.power;   // 얼마나 제대로 맞았나 (0..1)
    // 어느 쪽에서 맞았는지에 따라 같은 세기를 다르게 나눠 쓴다 (SC.SIDE_DOT 주석).
    // 총량을 키우는 게 아니라 **배분**을 바꾸는 것이라, 세 상황이 서로 다른
    // 그림이 되면서도 밸런스(무한 경직 방지)는 그대로다.
    const M = hit.side === "front"
      ? { f: SC.FRONT_FORCE, up: SC.FRONT_UP, tw: SC.FRONT_TWIST, st: SC.FRONT_STUN, at: SC.PUSH_TWIST_HIGH }
      : hit.side === "back"
        ? { f: SC.BACK_FORCE, up: SC.BACK_UP, tw: SC.BACK_TWIST, st: SC.BACK_STUN, at: SC.PUSH_TWIST_AT }
        : { f: SC.SIDE_FORCE, up: SC.SIDE_UP, tw: SC.SIDE_TWIST, st: SC.SIDE_STUN, at: SC.PUSH_TWIST_AT };
    t.pelvis.wakeUp();
    t.pelvis.applyImpulse(new CANNON.Vec3(
      hit.dirX * SC.PUSH_FORCE * k * M.f, SC.PUSH_UP * k * M.up, hit.dirZ * SC.PUSH_FORCE * k * M.f,
    ));
    // 상체는 **가슴 위쪽**에 건다. 중심에서 벗어난 자리에 충격량을 걸면 회전이
    // 저절로 생겨서, 몸이 뒤로 젖혀지며 휘청이는 그림이 나온다 (PUSH_TWIST 주석).
    // 정면으로 맞았을 때만 더 위(PUSH_TWIST_HIGH)에 건다 = 덜 밀리고 더 젖혀진다.
    t.torso.wakeUp();
    t.torso.applyImpulse(
      new CANNON.Vec3(hit.dirX * SC.PUSH_TWIST * k * M.tw, 0, hit.dirZ * SC.PUSH_TWIST * k * M.tw),
      new CANNON.Vec3(0, M.at, 0),
    );
    // 옆구리를 맞으면 몸이 팽그르르 돈다. 각속도를 **더한다** - 대입하면 이미
    // 관절로 묶인 몸의 회전을 지우게 되어 그 프레임에 자세가 튄다 (KICK_SPIN 주석).
    if (hit.side === "side") {
      const spin = SC.SIDE_SPIN * k * hit.sideSign;
      t.pelvis.wakeUp(); t.torso.wakeUp();
      t.pelvis.angularVelocity.y += spin;
      t.torso.angularVelocity.y += spin;
    }

    // 서 있는 상대만 이동 입력을 뺏는다 (이미 누워 있으면 충격량만 간다).
    // 비틀거리는 시간도 세기를 따라간다 - 스친 것에 0.28초를 다 주면 툭 건드린
    // 것만으로도 조작이 오래 끊긴다.
    // (k 는 PUSH_MIN..1 이므로 그대로 곱하면 폭이 좁다. 0..1로 펴서 쓴다 -
    //  control()이 이동 입력의 크기를 무시하고 정규화하기 때문에, 밀린 세기를
    //  표현할 수 있는 손잡이가 사실상 이 시간뿐이다.)
    const q = (k - SC.PUSH_MIN) / (1 - SC.PUSH_MIN);
    // 옆으로 맞으면 밀리는 방향도 비스듬히 튼다 - 발이 꼬여 옆으로 미끄러지는
    // 그림이 된다 (SC.SIDE_VEER 주석). 미는 방향 자체는 안 바꾼다.
    let sx = hit.dirX, sz = hit.dirZ;
    if (hit.side === "side") {
      const th = SC.SIDE_VEER * hit.sideSign;
      const c = Math.cos(th), sn = Math.sin(th);
      sx = hit.dirX * c - hit.dirZ * sn;
      sz = hit.dirX * sn + hit.dirZ * c;
    }
    if (t.state === "ACTIVE") {
      shove.set(t, { t: SC.PUSH_STUN * M.st * (0.35 + 0.65 * q), x: sx, z: sz });
    }

    // ---- 연출: 미는 쪽 두 팔을 앞으로, 상체를 살짝 앞으로
    for (const side of ["L", "R"] as const) {
      flick(armOf(me, side), hit.dirX * SC.armThrust, 1.5, hit.dirZ * SC.armThrust);
    }
    me.torso.applyImpulse(new CANNON.Vec3(hit.dirX * SC.leanPush, 0, hit.dirZ * SC.leanPush));
    return hit;
  }

  /**
   * F - 발차기.
   *
   * E와 달리 `knockdown()` 으로 제어를 끊는다. 서보가 멈춰 있는 동안에만 충격량이
   * 살아남기 때문에, 크게 날아가는 그림은 이 방법으로만 나온다.
   */
  function tryKick(me: Ragdoll, aimX: number, aimZ: number, others: Ragdoll[]): ScuffleHit | null {
    if (kickCd.has(me)) return null;
    if (me.state !== "ACTIVE") return null;
    const hit = findFront(me, aimX, aimZ, others, SC.KICK_RANGE);
    if (!hit || !canHit(hit.target)) return null;

    kickCd.set(me, SC.KICK_COOLDOWN);
    immune.set(hit.target, SC.hitImmunity);

    const t = hit.target;
    // 먼저 제어를 끊는다. 순서가 중요하다 - 충격량을 먼저 주면 그 프레임의
    // 서보가 이미 절반을 지운다.
    t.knockdown(SC.KICK_KNOCKDOWN);
    t.pelvis.wakeUp();
    t.pelvis.applyImpulse(new CANNON.Vec3(hit.dirX * SC.KICK_FORCE, SC.KICK_UP, hit.dirZ * SC.KICK_FORCE));
    // 상체는 위쪽에 걸어 크게 젖힌다 (맞은 티가 나게)
    t.torso.wakeUp();
    t.torso.applyImpulse(
      new CANNON.Vec3(hit.dirX * SC.hitShake, SC.hitShake * 0.4, hit.dirZ * SC.hitShake),
      new CANNON.Vec3(0, SC.PUSH_TWIST_AT, 0),
    );

    // ---- 굴러가게 만든다.
    // 제어가 끊긴 뒤(knockdown)라 서보가 회전을 지우지 않는다. 축은 진행
    // 방향에 수직 - 옆으로 도는 게 아니라 날아가는 쪽으로 앞구르기를 한다.
    // 각속도를 대입하지 않고 더하는 이유는, 이미 돌고 있던 몸의 회전을 지우면
    // 오히려 뻣뻣해 보이기 때문이다.
    const sx = hit.dirZ * SC.KICK_SPIN, sz = -hit.dirX * SC.KICK_SPIN;
    // 앞구르기에 옆회전을 조금 섞는다. 정확히 앞으로만 구르면 체조 선수처럼
    // 보이는데, 우리가 원하는 건 통제를 잃고 굴러가는 인형이다.
    // 방향은 찰 때마다 번갈아 준다 - 난수를 쓰면 host 와 테스트가 갈린다.
    const yaw = (kickCount++ % 2 === 0 ? 1 : -1) * SC.KICK_YAW;
    for (const b of [t.pelvis, t.torso]) {
      b.wakeUp();
      b.angularVelocity.x += sx;
      b.angularVelocity.z += sz;
      b.angularVelocity.y += yaw;
    }
    // 팔을 양옆으로 벌린다 (통제를 잃고 날아가는 인형 그림).
    //
    // [뒤로 밀지 않는 이유] 처음엔 "팔만 뒤에 남는다"로 뒤로 밀었는데, 어깨가
    // 몸 중심보다 위에 있어서 그 충격량이 **앞구르기와 정반대 방향의 토크**가
    // 된다. 실측으로 뒤집힘(상체 up.y 최소)이 -0.23 에서 0.03 으로 죽어서,
    // 애써 넣은 KICK_SPIN 을 팔이 도로 지우고 있었다. 옆으로 벌리면 구르기를
    // 방해하지 않으면서 "팔다리가 제멋대로"는 그대로 산다.
    const px = -hit.dirZ, pz = hit.dirX;
    flick(armOf(t, "L"), -px * SC.KICK_FLAIL, SC.KICK_FLAIL * 0.6, -pz * SC.KICK_FLAIL);
    flick(armOf(t, "R"), px * SC.KICK_FLAIL, SC.KICK_FLAIL * 0.6, pz * SC.KICK_FLAIL);
    // 되튕김 감시 시작. spd=0 으로 두면 첫 스텝은 실제 속도를 채우기만 하고
    // 판정에 걸리지 않는다 (REBOUND_MIN_SPEED 미만).
    launched.set(t, { t: SC.REBOUND_WINDOW, spd: 0, dx: hit.dirX, dz: hit.dirZ });

    // ---- 연출: 차는 쪽 정강이와 발을 앞으로 (발만 밀면 발목에서만 꺾인다)
    for (const side of ["L", "R"] as const) {
      flick(shinOf(me, side), hit.dirX * SC.footThrust, 3, hit.dirZ * SC.footThrust);
    }
    return hit;
  }

  /**
   * Q - 잡기 / 놓기 토글.
   *
   * 제약(Constraint)을 걸지 않는다. 래그돌은 관절 15개가 이미 솔버를 꽉 채우고
   * 있어서, 사람 둘을 강체로 묶으면 그 프레임에 자세가 터진다 (HANDOFF 7-2/7-3).
   * 대신 매 스텝 **당기는 힘**만 준다 - 그래서 "완전히 고정"이 아니라 질질 끌려
   * 오는 느낌이 나고, 상대는 반대로 걸어서 저항할 수 있다.
   */
  function toggleGrab(me: Ragdoll, aimX: number, aimZ: number, others: Ragdoll[]): GrabResult {
    if (grabCd.has(me)) return null;
    if (holds.has(me)) {
      holds.delete(me);
      grabCd.set(me, SC.GRAB_COOLDOWN);
      return "released";
    }
    if (me.state !== "ACTIVE") return null;
    const hit = findFront(me, aimX, aimZ, others, SC.GRAB_RANGE);
    if (!hit) return null;
    // 이미 남에게 잡혀 있는 사람은 못 잡는다 (둘이 서로 당기면 튄다)
    for (const t of holds.values()) if (t === hit.target) return null;

    holds.set(me, hit.target);
    grabCd.set(me, SC.GRAB_COOLDOWN);
    // ---- 연출: 팔을 상대 쪽으로 뻗는다
    for (const side of ["L", "R"] as const) {
      flick(armOf(me, side), hit.dirX * SC.grabReach, 2, hit.dirZ * SC.grabReach);
    }
    return "grabbed";
  }

  /**
   * 잡고 있는 동안 매 스텝. 잡은 사람 앞쪽으로 끌어당기고, 멀어지면 놓는다.
   *
   * 여기서 두 가지가 더 일어난다 (둘 다 새 시스템이 아니라 이미 있는 당기기
   * 루프에 판정 한 줄씩을 얹은 것이다):
   *  · 잡은 채로 몸을 홱 돌리면 상대가 원심력으로 딸려 나온다 (SC.WHIP_RATE)
   *  · 서로 잡으면 당기는 힘이 반씩 줄어 줄다리기가 된다 (SC.GRAB_TUG)
   *
   * @returns 이번 스텝에 일어난 일들 (풀림 / 후려치기 / 줄다리기 시작)
   */
  function updateHolds(dt: number): HoldEvent[] {
    const events: HoldEvent[] = [];
    // 지금 성립한 줄다리기. 매 스텝 다시 만들어서, 풀린 쌍은 저절로 빠진다.
    const nowTug = new Set<Ragdoll>();
    for (const [holder, target] of holds) {
      // 둘 중 하나가 넘어지면 놓는다 - 누운 사람이 남을 끌고 다니면 이상하다
      if (holder.state !== "ACTIVE") {
        holds.delete(holder);
        lastDir.delete(holder);
        events.push({ kind: "dropped", holder, target });
        continue;
      }
      const hp = holder.pelvis.position;
      const tp = target.pelvis.position;
      const d = Math.hypot(tp.x - hp.x, tp.z - hp.z);
      if (d > SC.GRAB_DISTANCE) {
        holds.delete(holder);
        lastDir.delete(holder);
        events.push({ kind: "dropped", holder, target });
        continue;
      }

      // 잡은 사람이 보는 쪽 앞 GRAB_AHEAD 지점으로 당긴다.
      // 방향은 "지금 상대가 있는 쪽"을 쓴다 - 조준을 쓰면 잡은 채로 카메라를
      // 돌릴 때 상대가 홱 돌아가서 물리가 튄다.
      const ux = d > 1e-3 ? (tp.x - hp.x) / d : 1;
      const uz = d > 1e-3 ? (tp.z - hp.z) / d : 0;
      const gx = hp.x + ux * SC.GRAB_AHEAD;
      const gz = hp.z + uz * SC.GRAB_AHEAD;

      // "상대가 있는 쪽"이 얼마나 빨리 도는가만 본다. 잡은 사람이 몸을 홱
      // 돌리거나 상대를 축 삼아 옆으로 뛰면 이 각이 빠르게 변한다. 그 순간
      // 접선 방향으로 한 번 밀어 주면 원심력으로 딸려 나가는 그림이 된다.
      // 서로 잡았는가 (줄다리기). 후려치기 판정보다 먼저 알아야 한다 - 아래 참고.
      const mutual = holds.get(target) === holder;

      // ---- 급회전 = 후려치기 (SC.WHIP_RATE 주석)
      //
      // [줄다리기는 제외한다] 서로 잡고 버티면 두 사람이 서로를 축으로 계속
      // 돌기 때문에 상대 방향이 저절로 빠르게 흔들린다(실측 4.96 rad/s). 그걸
      // 후려치기로 세면 아무도 돌리지 않았는데 사람이 날아간다. 줄다리기는
      // 줄다리기고, 후려치기는 **한쪽이 일부러 돌렸을 때**의 기술이다.
      const prev = lastDir.get(holder);
      if (prev && !mutual && d > SC.WHIP_MIN_DIST && !whipCd.has(holder) && target.state === "ACTIVE") {
        const cross = prev.x * uz - prev.z * ux;
        const dot = prev.x * ux + prev.z * uz;
        const rate = Math.abs(Math.atan2(cross, dot)) / Math.max(1e-4, dt);
        if (rate > SC.WHIP_RATE) {
          whipCd.set(holder, SC.WHIP_COOLDOWN);
          const sign = cross >= 0 ? 1 : -1;
          // 돌던 쪽으로 계속 돌려보낸다 (u 를 90도 돌린 방향)
          const tx = -uz * sign, tz = ux * sign;
          const kw = Math.min(1, rate / SC.WHIP_DOWN_RATE);
          target.pelvis.wakeUp();
          target.pelvis.applyImpulse(new CANNON.Vec3(
            tx * SC.WHIP_FORCE * kw, SC.WHIP_UP * kw, tz * SC.WHIP_FORCE * kw));
          target.torso.wakeUp();
          target.torso.applyImpulse(
            new CANNON.Vec3(tx * SC.WHIP_FORCE * 0.35 * kw, 0, tz * SC.WHIP_FORCE * 0.35 * kw),
            new CANNON.Vec3(0, SC.PUSH_TWIST_AT, 0));
          // 아주 급하게 돌리면 손에서 놓치고 상대는 넘어진다.
          // (knockdown 은 제어를 끊으므로 여기서만 크게 날아간다 - 머리말 참고)
          const down = rate > SC.WHIP_DOWN_RATE;
          if (down) {
            target.knockdown(SC.WHIP_KNOCKDOWN);
            holds.delete(holder);
            lastDir.delete(holder);
          } else if (target.state === "ACTIVE") {
            // 안 넘어져도 잠깐 휘청인다 - 안 그러면 control() 이 그 자리에서
            // 충격량을 지워 버려서 "후려쳤다"가 화면에 안 남는다.
            shove.set(target, { t: SC.PUSH_STUN * 0.8, x: tx, z: tz });
          }
          events.push({ kind: "whip", holder, target, power: kw, down });
          if (down) continue;
        }
      }
      lastDir.set(holder, { x: ux, z: uz });

      // ---- 줄다리기 알림
      if (mutual) {
        // 시작할 때 한 번만 알린다. 매 스텝 알리면 소리가 뭉갠다.
        //
        // nowTug 도 같이 본다: 줄다리기는 (A->C) 와 (C->A) 두 쌍이 **같은 스텝에**
        // 성립하므로, 이번 스텝에 이미 알린 쪽인지 확인하지 않으면 한 번의
        // 줄다리기에 알림이 두 번 나간다.
        if (!tugging.has(holder) && !tugging.has(target) && !nowTug.has(target)) {
          events.push({ kind: "tug", holder, target });
        }
        nowTug.add(holder);
      }

      // 목표점으로 가는 스프링 + 상대속도 감쇠 (고무줄 진동 방지)
      const m = target.pelvis.mass;
      const pull = mutual ? SC.GRAB_TUG : 1;
      const rvx = target.pelvis.velocity.x - holder.pelvis.velocity.x;
      const rvz = target.pelvis.velocity.z - holder.pelvis.velocity.z;
      let fx = ((gx - tp.x) * SC.GRAB_PULL - rvx * SC.GRAB_DAMP) * m * pull;
      let fz = ((gz - tp.z) * SC.GRAB_PULL - rvz * SC.GRAB_DAMP) * m * pull;
      const fm = Math.hypot(fx, fz);
      const cap = SC.GRAB_MAX_FORCE * pull;
      if (fm > cap) { fx = (fx / fm) * cap; fz = (fz / fm) * cap; }
      target.pelvis.wakeUp();
      target.pelvis.applyForce(new CANNON.Vec3(fx, 0, fz));

      // 잡은 손을 상대 쪽에 붙여 둔다 (연출 - 팔이 뻗어 있는 그림)
      for (const h of [holder.handL, holder.handR]) {
        h.applyForce(new CANNON.Vec3(ux * 40, 0, uz * 40));
      }
    }
    // 줄다리기 상태 갱신 (풀린 쌍은 여기서 빠진다)
    tugging.clear();
    for (const r of nowTug) tugging.add(r);
    return events;
  }

  /**
   * 달리다 서로 부딪혔다 - 둘 다 휘청인다 (넘어뜨리지는 않는다).
   *
   * main.ts 의 기존 장치(updatePlayerBumps)는 문턱을 넘으면 둘 다 넘어뜨린다.
   * 이건 그 문턱 **아래**를 위한 것이다. 스치듯 부딪힌 것까지 넘어뜨리면 둘이
   * 같이 못 달리는데, 그렇다고 아무 일도 안 일어나면 서로 통과한 것처럼 보인다.
   *
   * @param dirX a -> b 방향 (수평 단위벡터)
   * @param dirZ a -> b 방향 (수평 단위벡터)
   * @param power 얼마나 세게 부딪혔나 (0..1)
   * @returns 실제로 휘청이게 했으면 true
   */
  function tryBump(a: Ragdoll, b: Ragdoll, dirX: number, dirZ: number, power: number): boolean {
    if (a.state !== "ACTIVE" || b.state !== "ACTIVE") return false;
    if (bumpCd.has(a) || bumpCd.has(b)) return false;
    // 방금 E/F 로 맞아 날아가는 중인 사람은 건너뛴다 (한 방이 연쇄가 되지 않게)
    if (immune.has(a) || immune.has(b)) return false;
    const k = Math.max(0.35, Math.min(1, power));
    bumpCd.set(a, SC.BUMP_COOLDOWN);
    bumpCd.set(b, SC.BUMP_COOLDOWN);
    const stagger = (r: Ragdoll, sx: number, sz: number) => {
      r.pelvis.wakeUp();
      r.pelvis.applyImpulse(new CANNON.Vec3(
        sx * SC.BUMP_FORCE * k, SC.BUMP_UP * k, sz * SC.BUMP_FORCE * k));
      r.torso.wakeUp();
      r.torso.applyImpulse(
        new CANNON.Vec3(sx * SC.BUMP_TWIST * k, 0, sz * SC.BUMP_TWIST * k),
        new CANNON.Vec3(0, SC.PUSH_TWIST_AT, 0));
      // 밀치기와 같은 길 - 이동 입력을 잠깐 덮어쓴다 (머리말 참고)
      shove.set(r, { t: SC.BUMP_STAGGER * k, x: sx, z: sz });
    };
    stagger(a, -dirX, -dirZ);
    stagger(b, dirX, dirZ);
    return true;
  }

  /**
   * 밀려서 이동 입력이 덮어써진 방향. main.ts 가 e.input 에 그대로 넣는다.
   * (ball.ts dashDir/rushDir 과 같은 방식 - control() 은 안 건드린다)
   */
  function shoveDir(rag: Ragdoll): { x: number; z: number } | null {
    const s = shove.get(rag);
    return s ? { x: s.x, z: s.z } : null;
  }

  /** 이 사람이 지금 누구를 잡고 있는가 */
  const holding = (rag: Ragdoll) => holds.get(rag) ?? null;
  /** 이 사람이 지금 누군가에게 잡혀 있는가 */
  function heldBy(rag: Ragdoll): Ragdoll | null {
    for (const [h, t] of holds) if (t === rag) return h;
    return null;
  }
  /** 지금 성립한 잡기 전부 (검증/HUD용) */
  const pairs = () => [...holds].map(([holder, target]) => ({ holder, target }));

  /** 캐릭터가 사라질 때 (맵 전환/퇴장) 흔적을 지운다 */
  function forget(rag: Ragdoll) {
    holds.delete(rag);
    for (const [h, t] of holds) if (t === rag) { holds.delete(h); lastDir.delete(h); }
    pushCd.delete(rag); kickCd.delete(rag); grabCd.delete(rag);
    immune.delete(rag); shove.delete(rag);
    launched.delete(rag); lastDir.delete(rag); whipCd.delete(rag);
    tugging.delete(rag); bumpCd.delete(rag);
  }

  /** 맵을 새로 로드할 때 전부 초기화 */
  function reset() {
    holds.clear(); pushCd.clear(); kickCd.clear(); grabCd.clear();
    immune.clear(); shove.clear();
    launched.clear(); lastDir.clear(); whipCd.clear(); tugging.clear(); bumpCd.clear();
  }

  void P;
  /** 지금 서로 잡고 있는 사람들 (줄다리기 - HUD/검증용) */
  const tugPairs = () => [...tugging];

  return {
    tick, tryPush, tryKick, toggleGrab, updateHolds, tryBump,
    shoveDir, holding, heldBy, isImmune, pairs, tugPairs, forget, reset,
  };
}
