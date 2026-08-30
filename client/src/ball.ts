import * as CANNON from "cannon-es";
import { P, type Ragdoll } from "./ragdoll";

/**
 * 축구공 조작 — 드리블 / 안고 뛰기 / 개인기.
 *
 * ragdoll.ts의 control()은 건드리지 않는다. 여기서 하는 일은 전부 "공과 골반에
 * 힘·충격량을 더하는 것"뿐이라, 검증된 서기/걷기/넘어짐 물리 위에 얹히기만 한다.
 *
 * [설계 원칙] 애니메이션 재생이 아니라 실제 물리로 만든다.
 *  - 드리블은 공을 자석처럼 붙이는 게 아니라, 발 앞 한 지점을 향한 약한 PD다.
 *    상한이 낮아서 방향을 급히 꺾으면 공이 실제로 흘러 나간다 = 드리블 실수.
 *  - 개인기도 마찬가지로 충격량이다. 공은 진짜로 떠서 날아가고 캐릭터는 진짜로
 *    옆으로 뛴다. 그래서 장애물/상대를 실제로 "재낄" 수 있다.
 */

export const B = {
  radius: 0.3,
  mass: 1.1,

  // ---- 드리블 (터치 방식)
  //
  // [예전 방식이 왜 자석처럼 느껴졌나]
  // 전에는 "발 앞 1.15m 지점"을 향한 PD(kp 30, 가속 상한 12)를 매 스텝 걸었다.
  // 즉 공과 발 사이에 보이지 않는 용수철이 상시로 매여 있었다. 그래서 무슨 짓을
  // 해도 공이 알아서 발 앞에 돌아왔고, 잃어버릴 위험이 없으니 되찾는 재미도 없었다.
  //
  // [지금 방식]
  // 상시로 끌어당기는 힘을 없앤다. 발이 닿는 거리에 들어왔을 때만 touchInterval
  // 간격으로 "충격량 한 방"을 준다. 터치와 터치 사이에 공은 순수하게 굴러가므로
  //  - 직진: 툭툭 차면서 앞으로 굴려 간다
  //  - 급회전: 공은 관성으로 원래 가던 쪽으로 흘러간다. 다음 터치가 닿아야
  //            방향이 꺾인다 (안 닿으면 놓친다)
  //  - 급정지: 공만 굴러 나간다. 아주 가깝고 느릴 때만 발로 세울 수 있다
  // 가 전부 다르게 나온다.

  /** 드리블이 조금이라도 관여하는 최대 거리 (이 밖은 완전히 놓친 상태) */
  range: 2.6,
  /** 마지막 이 비율 구간에서는 유도가 서서히 죽는다 */
  fade: 0.25,

  /**
   * 발이 닿는 범위 — 앞뒤와 좌우를 따로 본다.
   *
   * [왜 직선거리로 재면 안 되는가] 처음엔 "골반에서 1.35m 안"이라는 원으로
   * 쟀는데, 브라우저 실측에서 공이 옆으로 1.6m 벗어나 있으면 원 밖이라
   * 터치가 한 번도 안 나갔다. 그대로 옆을 스쳐 지나가면서 공을 영영 놓쳤다
   * (앞거리 +0.24 -> -16.3m). 사람 발이 닿는 범위는 원이 아니라
   * "앞쪽으로 길고 옆으로 좁은" 모양이므로 그대로 나눠서 쓴다.
   */
  /** 진행 방향으로 이 거리까지 앞에 있는 공을 찰 수 있다 */
  touchAhead: 1.7,
  /**
   * 진행선에서 옆으로 이만큼 벗어나기 전까지 찰 수 있다.
   *
   * 이 값이 급회전의 난이도를 정한다. 좁으면 방향을 꺾는 순간 공이 바로
   * 발 범위를 벗어나 그대로 흘러간다(실측: 0.8에서 90도 회전 시 11m 이탈).
   * 조금 넓혀서 "잘 꺾으면 데리고 갈 수 있고, 급하게 꺾으면 놓친다"로 만든다.
   *
   * [1.0 -> 1.6] W+A 에서 W+D 로 바꾸면 진행 방향이 90도 꺾인다. 그 순간
   * 공은 새 진행선에서 1.4m쯤 옆에 있게 되는데, 1.0이면 그게 발 범위 밖이라
   * 터치가 아예 한 번도 안 나가고 그대로 놓쳤다(실측 놓친 프레임 28~55%).
   * 발이 닿는 범위를 넓히는 건 보이지 않는 유도력을 키우는 것보다 정직하다.
   *
   * [주의 - 이 값은 정밀하게 못 맞춘다] 지그재그 유지율은 같은 설정으로
   * 세 번 재도 0.09 / 0.26 / 0.65 처럼 크게 흔들린다. 꺾는 순간에 터치가
   * 마침 들어오느냐로 갈리기 때문이다(그게 이 드리블의 의도된 실수 여지다).
   * 그래서 소수점을 붙잡고 최적화하지 말 것 - 대략적인 영역만 맞추면 된다.
   */
  touchSide: 1.6,
  /**
   * 연속으로 찰 수 있는 간격 (초) — 걸을 때(slow) / 전력질주할 때(fast).
   *
   * [왜 속도에 따라 다른가] 0.1초 고정이면 초당 10번을 툭툭 건드린다. 그건
   * 걷기에도 너무 잦아서 공이 발에 "붙어서 끌려가는" 그림이 되고, 달릴 때는
   * 매 터치가 짧아 큰 터치로 치고 나가는 맛이 없다. 실제 드리블도 느릴 땐
   * 잔터치, 빠를 땐 크게 한 번 밀어놓고 따라간다. 간격이 길어지면 그 사이에
   * 공이 순수하게 굴러가므로 "찼다 -> 따라간다"가 눈에 보인다.
   */
  touchIntervalSlow: 0.13,
  touchIntervalFast: 0.22,
  /**
   * 찬 뒤 공이 가졌으면 하는 속도 (사람 속도 대비 배수).
   *
   * 1.1로 두면 터치할 때마다 공이 사람보다 빨라져서, 직진만 해도 간격이
   * 계속 벌어지다 영영 놓쳤다(실측 maxGap 3.76m). 직진에서 공을 놓치는 건
   * 재미가 아니라 그냥 조작 불능이다. 1보다 살짝 아래로 두면 공이 사람
   * 속도에 수렴하면서 발 앞 일정 거리를 유지한다.
   * 공을 놓치는 위험은 "급회전/충돌"에서 나와야 한다 (turnBoost 참고).
   */
  touchSpeed: 1.0,
  /**
   * 발 앞 이 거리에 공을 두려고 한다.
   *
   * [왜 필요한가] 처음엔 "터치가 공 속도를 사람 속도에 맞춘다"로만 만들었는데,
   * 그러면 공을 앞으로 내보내는 힘이 어디에도 없다. 실측으로 공이 발밑
   * (간격 0.03m)까지 빨려들었다가 다리에 채여 뒤로 처지고, 그 뒤로는
   * touchRange 밖이라 영영 못 건드렸다 (간격이 0.03 -> 6.19m로 벌어졌다).
   * 진짜 드리블도 "앞에 놓고 따라가는" 동작이므로, 가까울수록 세게 차서
   * 공을 앞으로 내보낸다. 상시로 끌어당기는 게 아니라 찰 때만 세지므로
   * 자석은 아니다.
   */
  ahead: 1.2,
  /**
   * 발 앞 목표 거리는 "고정 + 속도 비례"다.
   *
   * [왜] ahead를 1.2로 고정해두면 서 있든 전력질주하든 공이 항상 같은 자리에
   * 있다. 그게 기계적으로 보이는 가장 큰 이유였다 - 속도가 변해도 그림이 안
   * 변하니까. 실제로는 빨리 달릴수록 공을 멀리 밀어놓고 쫓아간다.
   *   lead = leadBase + 속도 * leadPerSpeed
   * 정지 0.62m -> 전력질주(4.6 m/s) 1.63m. 같은 조작인데 속도만 올려도
   * 공이 점점 앞으로 나가면서 보폭이 커지는 게 보인다.
   */
  leadBase: 0.62,
  leadPerSpeed: 0.22,
  /** 공이 발 앞 lead보다 가까울 때, 모자란 거리 1m당 더해서 차는 속도 (1/s) */
  pushOut: 1.8,
  /**
   * 이보다 발밑에 가까이 들어온 공은 "밟힌" 것으로 보고 세게 밀어낸다.
   *
   * 없으면 공이 다리 사이에 껴서 발에 계속 채이며 제자리에 머문다.
   * (pushOut만으로는 lead에 가까워질수록 밀어내는 힘이 0으로 수렴한다)
   */
  minAhead: 0.34,
  /** 발밑에 낀 공을 밀어낼 때 최소로 실어주는 속도 (m/s) */
  unstickSpeed: 2.1,
  /** 공이 이보다 뒤에 있으면 못 찬다 (발이 안 닿는다 = 놓친 것) */
  behindLimit: -0.4,
  /**
   * 한 번의 터치가 줄 수 있는 최대 충격량 (N·s).
   *
   * 3.0으로 뒀더니 공 속도가 2.7 m/s를 못 넘겼다. 사람이 4.4로 달리는데
   * 공이 그보다 느리면 결국 사람이 공을 앞질러 버리고, 등 뒤로 넘어간
   * 공은 못 차므로 그대로 놓친다(실측: 앞거리 +1.2 -> -13.4m).
   * 한 번의 터치로 목표 속도까지 도달할 수 있어야 공이 앞에 남는다.
   */
  touchMax: 6.0,
  /**
   * 공이 발 앞 ahead보다 더 나가 있을 때 "죽이는" 터치의 충격량 상한.
   *
   * [왜 필요한가] 미는 터치만 있으면 한 번 세게 나간 공을 되돌릴 방법이
   * 없어서, 같은 설정으로도 어떤 판에서는 공이 발 앞에 남고 어떤 판에서는
   * 그대로 달아났다(실측: pushOut 1.8이면 평균 +1.8m, 2.4면 -4.9m).
   * 실제 드리블도 너무 나간 공은 발바닥으로 눌러 죽인다. 미는 힘보다
   * 약하게 둬서 "너무 세게 찬 공은 못 살린다"가 남게 한다.
   */
  touchBrake: 2.0,

  /**
   * 방향 전환 터치.
   *
   * 공이 가는 방향과 내가 가려는 방향이 어긋나 있으면, 앞으로 미는 대신
   * 옆으로 채서 방향을 꺾는다. 그러려면 원래 가던 운동량을 일부 죽여야 하는데
   * (실제 축구의 인사이드 터치가 하는 일이다), 전부 죽이면 다시 자석이 되므로
   * 이 비율만 죽인다. 나머지는 흘러나가서 "덜 꺾였다"가 된다.
   */
  turnBite: 0.45,
  /**
   * 방향 전환 터치는 충격량 상한을 이 배수까지 쓴다.
   *
   * 1보다 작다. 즉 방향을 꺾는 터치는 직진 터치보다 약하다 - 실제로도
   * 굴러가는 공의 방향을 바꾸는 게 밀어주는 것보다 어렵다.
   * 1.6으로 뒀더니 급회전에서도 공이 발 앞 간격을 그대로 유지했다
   * (실측: 직진 1.32m -> 급회전 1.29m = 안 부풀었다 = 여전히 자석).
   */
  turnBoost: 0.8,
  /** 이 정도보다 많이 어긋나 있으면 방향 전환 터치로 본다 (내적 기준) */
  turnAlign: 0.72,
  /**
   * 진행 방향이 이 내적보다 많이 꺾이면 터치 간격을 무시하고 즉시 찬다.
   * 0.93 = 약 21도. 살짝 조향하는 정도로는 안 열리고, 실제로 꺾을 때만 열린다.
   */
  turnResetDot: 0.93,
  /**
   * 꺾는 순간에는 발이 닿는 범위를 이만큼 넓힌다 (앞 배수 / 옆 배수).
   *
   * [왜] 즉시 터치를 열어줘도, 90도로 꺾는 순간 공은 새 진행선 기준으로
   * 옆 1.3~1.6m에 있다. touchSide(1.6)의 경계라 속도에 따라 아슬아슬하게
   * 걸리거나 빠졌다. 사람은 꺾을 때 발을 뻗어서 공을 건드리므로, 그 순간에만
   * 범위를 넓혀준다. 상시로 넓히는 게 아니라서 직진 드리블의 간격 감각은
   * 그대로 남는다.
   */
  turnReachAhead: 1.25,
  turnReachSide: 1.55,

  /**
   * 몸을 돌리는 속도를 0..1로 환산할 때의 상한 (rad/s).
   *
   * [90도 회전이 동전던지기였던 진짜 이유 — 프레임 단위 추적으로 찾음]
   * 회전 직후의 발앞거리(alongDist)를 성공/실패로 나눠 보니 경계가 정확히
   * behindLimit(-0.4)이었다.
   *   실패: ahead -0.84 / -0.78 / -0.49  → 첫 10프레임 터치 **1회**
   *   성공: ahead -0.34 / -0.01 / +0.09  → 첫 10프레임 터치 2~3회
   * 90도를 도는 순간 공은 새 진행선 기준으로 살짝 앞이거나 살짝 뒤인데,
   * 뒤로 몇 센티만 넘어가면 `alongDist < behindLimit` 에 걸려 **그 뒤로는
   * 매 프레임 즉시 return** 한다. 터치가 영영 안 나가고, 옆으로 미는 유도만으로는
   * 4.5 m/s로 달아나는 사람을 못 따라가서 공이 7~9m까지 벌어진다.
   * 즉 "0.66m 차이로 잡거나 완전히 잃거나"인 절벽이었다 (실측 n=20에서 40%가 실패).
   *
   * [고치는 방향] 절벽을 경사로 바꾼다. 사람이 몸을 트는 동안에는 발이 옆·뒤로도
   * 닿는다 - 그 "닿는 범위"를 **회전 속도에 비례해 연속적으로** 넓힌다.
   * 공을 끌어오는 힘을 더하는 게 아니라 **찰 수 있는 자격**만 넓히는 것이라
   * 자석이 되지 않는다: 터치의 충격량 상한(touchMax*turnBoost)도, 운동량을
   * 일부만 무는 turnBite도, 터치 간격(pokeTimer)도 그대로다.
   *
   * 직진 드리블은 회전 속도가 0이라 이 값들이 전부 1배 = 예전과 완전히 같다.
   */
  turnRateFull: 6.0,
  /**
   * 회전 속도를 부드럽게 만드는 시간상수 (초).
   *
   * [왜 스무딩이 필요한가] 마우스를 홱 돌리면 한 프레임에 90도가 들어오고
   * 다음 프레임엔 0이다. 그 한 프레임만 범위를 넓히면 예전과 똑같은
   * 동전던지기가 된다. 반대로 "창"을 켜두는 방식은 예전에 실패했다 -
   * 창이 열려 있는 동안 박자를 무시하게 했더니 매 프레임 터치가 나가
   * 공이 로켓처럼 날아갔다(2.56m -> 4.79m). 그래서 **터치 박자(pokeTimer)는
   * 손대지 않고**, 범위만 이 시간에 걸쳐 서서히 닫는다.
   * = 회전 시작에서 열리고, 회전이 끝나면 저절로 닫힌다.
   */
  turnSmooth: 0.13,
  /**
   * 최대 회전 중에 허용하는 뒤쪽 사거리 (m, 음수).
   *
   * behindLimit(-0.4)에서 여기까지 회전 속도에 비례해 늘어난다. 몸을 트는
   * 동안에는 옆·뒤의 공에도 발이 닿는다는 뜻이다. 그래도 무한은 아니라서
   * 135도 이상으로 확 꺾으면 여전히 놓친다 (= 급회전은 위험하다가 남는다).
   */
  turnBehind: -1.35,

  /**
   * 터치 사이의 약한 유도 — 옆 방향 위치 오차(guideAccel)와 옆 방향
   * 상대속도(guideDamp).
   *
   * [이 값들을 줄이는 게 답이 아니었다]
   * "자석 같다"의 원인을 이 유도라고 보고 guideAccel 4.5 -> 1.6, guideDamp
   * 1.5 -> 0 으로 줄여봤다. 결과는 개선이 아니라 조작 불능이었다. 좌우로
   * 지그재그 하면 꺾을 때 생긴 옆 속도를 아무것도 지우지 못해서 공이 그대로
   * 날아갔다 (실측: 0.6초 간격 지그재그 5초에 발 앞 1.37 -> 5.32m, 전체
   * 프레임의 55%가 사거리 밖). 0.5나 0.8로 낮춰도 35~43%를 놓쳤다.
   *
   * 진짜 원인은 유도가 아니라 "발 앞 목표거리가 고정(ahead 1.2)이고 터치가
   * 0.1초마다 일정하게 나가는 것"이었다. 그쪽을 속도 연동으로 바꾸고
   * (leadBase/leadPerSpeed, touchIntervalSlow/Fast) 유도는 원래 값으로
   * 되돌리니, 급회전에서 발 앞 간격이 직진 대비 2.15배로 부풀면서도
   * (예전 모델은 1.02배 = 안 부풀었다) 놓치는 프레임은 2%까지 내려갔다.
   * = 늦게 따라오지만 결국 따라온다.
   */
  guideAccel: 5.5,
  guideDamp: 2.0,

  /**
   * 급정지 트래핑: 이 거리 안이어야 발로 세울 수 있다.
   *
   * 0.95로 뒀더니 드리블 중인 공(발 앞 1.1m)이 항상 범위 밖이라 트래핑이
   * 한 번도 안 걸렸고, 멈추면 공이 11m를 굴러가 버렸다. 멈춰서 공을
   * 세우는 것까지가 조작이므로 드리블 간격보다는 넓어야 한다.
   */
  trapRange: 1.8,
  /** 공이 이보다 빠르면 못 세운다 (그냥 지나쳐 굴러간다) */
  trapMaxSpeed: 6.5,
  /** 세울 때 한 번에 줄 수 있는 최대 충격량 */
  trapMax: 2.5,

  // ---- 킥 (F / 좌클릭, 누르는 동안 차징)
  //
  // 드리블 터치와 달리 "지금 당장 강하게" 한 방 찬다. 실제 충격량이라
  // 장애물을 맞춰 굴리거나, 달려드는 AI에게 차서 튕겨낼 수 있다.
  //
  // [짧게 / 길게] 버튼을 누른 시간이 chargeTime에 가까울수록 세진다.
  // 짧게 톡 치면 앞으로 살짝 밀어놓고 치고 나가는 용도(드리블의 연장)이고,
  // 꽉 채우면 장애물 너머로 넘기거나 봇에게서 멀리 떼어놓는 용도다.
  /** 이 거리 안에 공이 있어야 킥이 나간다 */
  kickRange: 1.85,
  /** 꽉 채우기까지 걸리는 시간 (초) */
  chargeTime: 0.55,
  /** 앞으로 미는 충격량 (N·s) - 짧게 누름 / 꽉 채움 */
  kickForwardMin: 6.5,
  kickForwardMax: 15.5,
  /** 살짝 띄우는 충격량. 완전히 평평하게 차면 바닥 마찰에 금방 죽는다 */
  kickUpMin: 1.6,
  kickUpMax: 4.4,
  /** 재사용 대기 시간 (초) */
  kickCooldown: 0.55,

  // ---- 러시 (F를 공이 사거리 밖일 때 눌렀을 때)
  //
  // [왜 필요한가 — 실측] 공을 놓치면 할 수 있는 게 "달려가기" 하나뿐이었다.
  // 풀차지 킥 뒤에는 3.5초, 봇에게 걷어차인 공(10m, 굴러가는 중)은 2.75초
  // 동안 입력이 아무 의미가 없다. 그 동안 F도 Q도 Shift도 전부 사거리 밖이라
  // 눌러도 조용히 무시된다 - 게임이 잠깐 꺼져 있는 셈이다.
  //
  // [왜 F인가] 새 키를 만들지 않는다. F는 이미 "공에 대한 적극적인 행동"이고,
  // 사거리 밖에서는 아무 일도 안 하던 죽은 입력이었다. 그 자리를 채운다.
  //
  // [자석이 아니다] 방향은 공이 아니라 **지금 향하고 있는 쪽**이다. 잘못
  // 겨누면 공에서 더 멀어진다. 순간이동도, 공을 끌어오는 힘도 없다.
  // 단지 0.45초 동안 평소보다 빨리 달릴 뿐이고, 쿨다운이 있어서 이걸로
  // 계속 달릴 수는 없다.
  /** 공이 킥 사거리 밖이고 이 거리 안일 때만 러시가 나간다 */
  rushRange: 14,
  /** 러시가 지속되는 시간 (초) */
  rushTime: 0.45,
  /** 시작 순간의 충격량 (N·s) - "탁 치고 나간다"가 보이는 몫 */
  rushImpulse: 26,
  /**
   * 러시 동안 유지되는 가속 (m/s²).
   *
   * [실측] 처음엔 골반 하나에만 힘을 줬다. 그러면 0.7초 동안 더 간 거리가
   * accel 14에서 0.25m, 70까지 올려도 0.86m뿐이었고 회수 시간의 편차만
   * 커졌다(1.57~3.38초). ragdoll의 control()이 maxSpeed로 되돌리는 속도
   * 서보라서 그런 줄 알았는데, **원인은 힘의 크기가 아니라 미는 대상이었다** -
   * 골반만 밀면 몸이 앞으로 기울고 나머지 14개 파츠가 끌려오며 걸음이 무너진다.
   * 몸 전체를 질량 비례로 밀자 같은 0.7초에 1.45m를 더 갔고 편차도 ±0.05m로
   * 줄었다 (tick의 주석 참고).
   */
  rushAccel: 45,
  /**
   * 러시 중에는 발이 닿는 범위가 이만큼 넓어진다.
   *
   * 이게 러시의 본체다. 평소 발이 닿는 앞거리는 1.7m인데, 러시 중에는
   * 3.7m까지 발을 뻗는다 = 굴러 달아나는 공을 2m 먼저 건드릴 수 있다.
   */
  rushReach: 2.2,
  /**
   * 러시 터치가 공에 남기는 속도 (사람 속도 대비).
   *
   * [왜 미는 게 아니라 죽이는가 — 실측] 놓친 공이 가만히 있으면 10m를
   * 1.3초에 따라잡는데, 굴러 달아나는 공(3 m/s)은 2.75초가 걸렸다. 즉
   * 진짜 문제는 거리가 아니라 **공이 도망간다**는 것이다. 그런데 러시로
   * 사거리만 넓히고 평소 터치 공식을 그대로 쓰면 want = 사람 속도라서
   * 멀리 있는 공을 오히려 앞으로 더 차낸다 - 영영 못 잡는다.
   * 러시 중의 터치는 "발을 뻗어 공을 죽이는" 동작이어야 한다.
   */
  rushTouchKeep: 0.25,
  /** 재사용 대기 시간 (초). 계속 눌러 달리기가 되지 않게 한다 */
  rushCooldown: 1.2,
  /**
   * 러시 중에 남는 조향 권한 (0 = 완전히 직선, 1 = 평소처럼 자유).
   *
   * [러시에 위험을 하나 준다] 러시는 "빠르게 접근하는 버튼"이라 누르면
   * 무조건 이득이었다. 선택이 아니라 그냥 항상 눌러야 하는 키였다.
   * 이제 러시하는 동안에는 몸을 거의 못 튼다 - 0.45초 동안 2.5m를 **겨눈
   * 방향 그대로** 나아간다. 그래서 공이 굴러가는 쪽을 잘못 읽으면 그대로
   * 지나쳐 버리고, 다음 러시까지 1.2초를 기다려야 한다.
   * = F는 "직선 돌파/회수", 방향을 바꾸며 몰고 싶으면 W나 Shift다.
   */
  rushSteer: 0.22,
  /** 찬 뒤 드리블이 쉬는 시간 (초). 없으면 다음 터치가 공을 도로 잡아챈다 */
  kickLockout: 0.5,
  /** 찰 때 몸이 살짝 뒤로 밀리는 반동 (N·s) - 실제로 반작용이 보이게 */
  kickRecoil: 6,

  // ---- 줍기 (scoop)
  //
  // [왜 필요한가] 드리블은 공을 발 앞 1.15m에 두고 계속 툭툭 차낸다. 그래서
  // 손↔공 거리가 항상 1m 안팎이고, 걸어서 따라가면 갈수록 공이 더 멀어진다
  // (실측: E를 누를 시점의 간격이 2.2m). 즉 "드리블 중인 공은 영영 못 줍는다".
  // E를 누르면 잠깐 드리블을 멈추고 공을 품 쪽으로 당겨 안는 동작을 넣는다.
  /** 이 거리 안에서 E를 누르면 줍기가 시작된다 */
  scoopRange: 2.8,
  /** 줍는 동작이 지속되는 시간 (초). 이 안에 손에 닿으면 잡힌다 */
  scoopTime: 0.55,
  /** 공을 품으로 당기는 가속 상한 (m/s²) */
  scoopAccel: 30,
  /** 가슴 앞 이 지점으로 당긴다 (몸통 기준 앞/위) */
  scoopAhead: 0.45,
  scoopHeight: 0.05,

  // ---- 안고 뛰기
  /**
   * 공을 안고 있을 때 골반에 거는 항력 계수.
   *
   * ragdoll.ts control()의 목표 속도를 건드리지 않고 느리게 만드는 방법이다.
   * (control()은 입력을 정규화해서 항상 maxSpeed를 목표로 잡기 때문에, 입력
   *  크기를 줄이는 방식으로는 속도가 안 줄어든다)
   * 속도에 비례하는 힘이라 최고속만 깎이고 반응성은 그대로다.
   */
  // moveAccel을 3.4 -> 8.0으로 올리면서 같이 올렸다. 컨트롤러가 내는 힘이
  // moveAccel에 비례하므로, 항력이 그대로면 페널티가 상대적으로 사라진다
  // (실측: 26 그대로 두면 안고 뛸 때가 오히려 더 빨랐다 - 3.46 vs 3.69 m/s).
  carryDrag: 150,

  // ---- 개인기: 띄워 재끼기
  /** 재사용 대기 시간 (초) */
  trickCooldown: 0.8,
  /**
   * 공을 띄우는 위쪽 충격량 (N·s).
   *
   * 확실히 떠야 "공을 넘겼다"가 보인다. 4.4에서는 반 뼘쯤 떠서 굴러가는
   * 것과 구분이 안 됐다. 5.8이면 사람 무릎 높이까지 뜬다.
   */
  trickBallUp: 4.2,
  /**
   * 공을 옆으로 보내는 충격량.
   *
   * [4.6 -> 3.6] 4.6이면 공이 옆으로 4.2 m/s로 튀어나가고, 착지한 뒤에도
   * 굴림 마찰만으로 줄어서 10m 가까이 굴러갔다. 재끼기는 성공하는데 그
   * 다음에 공을 못 찾으니 기술을 쓸 이유가 없어진다. 상대(봇) 폭이 1m
   * 남짓이라 2~3m만 갈라져도 충분히 지나간다.
   */
  /** 옆으로 갈라놓는 속도 (m/s). 충격량이 아니라 목표 속도다 */
  trickBallSide: 3.2,
  /**
   * 공을 앞으로도 같이 보내는 비율.
   *
   * [왜 앞으로도 보내는가] 옆으로만 튕기면 공이 제자리에서 옆으로 빠지고
   * 사람만 앞으로 가버려서, 재낀 뒤에 공을 못 만난다. 공과 사람이 각각
   * 다른 쪽으로 갈라졌다가 앞에서 다시 만나야 "상대를 사이에 두고 지나쳤다"가
   * 성립한다. 그래서 공에도 진행 방향 성분을 실어준다.
   */
  /**
   * 재낀 뒤 공이 유지할 전진 속도 (사람 속도 대비).
   * 1이면 나란히 가고, 1보다 조금 크면 살짝 앞서 나간다.
   *
   * [0.5 -> 1.0] 0.5는 사람 속도의 절반만 남긴다는 뜻인데, 거기에 제동까지
   * 겹치면서 공이 사실상 제자리에 섰다. 주석이 말하는 "나란히 간다"는 1이다.
   */
  trickBallKeep: 1.0,
  /**
   * 트릭 직후 드리블이 쉬는 시간 (초).
   *
   * 이게 없으면 트릭으로 옆으로 튕겨낸 공을 바로 다음 스텝의 드리블이
   * 도로 발 앞으로 끌어와서, 옆으로 간 거리가 0.07m밖에 안 남는다(실측).
   * 공을 재낀 뒤 잠깐은 손을 떼야 "재꼈다"가 성립한다.
   */
  trickLockout: 0.45,
  /**
   * 재낀 직후 공에 거는 추가 제동 (지속 시간 / 감속 계수).
   *
   * [왜 필요한가 — 값 튜닝으로는 안 됐다]
   * 재끼기의 결과가 시행마다 크게 흔들렸다. 같은 설정으로 세 번 재도 공이
   * 사람에게서 1.7m에 멈추기도 하고 8.2m까지 달아나기도 했다. 재끼는 시점의
   * 공 속도와 위치가 매번 다르고, 굴림 저항만으로는 5 m/s짜리 공이 12m를
   * 굴러가기 때문이다. 옆으로 보내는 속도를 줄여서 잡아보려 했더니 이번엔
   * 기술 자체가 눈에 안 보였다 (갈라짐 0.7m).
   *
   * 그래서 "얼마나 세게 보내는가" 대신 "얼마나 빨리 멈추는가"를 정한다.
   * 살짝 띄워 옆으로 보낸 공이 착지하면서 죽는 건 실제에도 가깝다. 이 창
   * 동안 강하게 감속시키면 시작 조건이 어떻든 공이 2m 안팎에 선다 =
   * 재끼고 나서 항상 다시 잡을 수 있다.
   */
  trickSettleTime: 0.85,
  trickSettleDamp: 3.4,
  /**
   * 재낀 방향(전진 성분)에 거는 제동. 옆 성분(trickSettleDamp)보다 훨씬 약하다.
   *
   * [왜 방향을 나누는가] 제동을 등방성으로 걸었더니 옆으로 튀는 것뿐 아니라
   * "사람과 같이 앞으로 나아가야 할" 성분까지 같이 죽였다. 그래서 재낀 뒤
   * 공은 거의 제자리에 서고 사람만 계속 달려나갔다 - 실측으로 공은 1.9m
   * 움직이는 동안 사람이 10.5m를 가서 7.8m가 갈라졌다. 재끼면 공을 잃는
   * 기술이 되니 Shift를 쓸 이유가 없다.
   *
   * 위 trickBallKeep 주석의 의도("전진 성분은 사람 속도에 맞춰 같이 나아간다")를
   * 제동이 되돌리고 있던 셈이다. 옆 성분만 강하게 죽이면 예측 가능성(공이
   * 옆으로 달아나지 않는다)은 그대로 두면서 공이 사람을 따라온다.
   */
  trickSettleFwdDamp: 0.7,
  /** 캐릭터가 옆으로 뛰는 충격량 (툭 튀는 느낌용 - 실제 거리는 아래 dash가 만든다) */
  trickBodySide: 30,
  /**
   * 트릭 직후 이 시간 동안 이동 입력이 옆 방향으로 바뀐다 (초).
   *
   * [왜 충격량만으로는 안 되는가] ragdoll의 control()은 "입력 방향으로 maxSpeed"
   * 를 목표로 하는 속도 추종이다. 그래서 옆으로 충격량을 줘도 다음 몇 스텝 안에
   * 컨트롤러가 원래 진행 방향으로 도로 끌어온다. 실측으로 충격량을 30에서
   * 110으로 3.7배 올려도 옆이동이 0.36 -> 0.39m로 거의 그대로였다.
   * control()은 검증된 코드라 손대지 않기로 했으므로, 대신 "그 동안 무엇을
   * 입력으로 줄 것인가"를 바꾼다 (main.ts). 컨트롤러가 제 힘으로 옆으로
   * 달려주므로 결과도 물리적이다.
   */
  trickDash: 0.42,
  /**
   * 대시 입력에 섞는 전진 성분 (0 = 순수하게 옆으로, 1 = 앞으로만).
   *
   * 순수하게 옆으로만 빠지면 앞으로 나아가던 흐름이 끊겨서 "달리다가 멈칫하고
   * 옆으로 게걸음"처럼 보인다. 옆 + 앞을 섞으면 대각선으로 치고 나가는 그림이
   * 되고, 공도 앞으로 같이 보내므로(trickBallForward) 둘이 앞에서 다시 만난다.
   */
  trickDashForward: 0.85,
  /** 캐릭터가 살짝 뜨는 충격량 (발이 땅에서 떨어져야 "재끼는" 그림이 난다) */
  trickBodyUp: 16,
  /** 트릭 방향으로 몸을 트는 토크 */
  trickTorque: 34,
  /** 이 거리 안에 공이 있어야 트릭이 나간다 */
  trickRange: 2.1,

  // ---- 개인기 2: 스톱턴 (급정지 + 방향 바꾸기)
  //
  // 1번(옆으로 재끼기)이 "옆으로 지나쳐 가는" 기술이라면, 이건 "멈춰서
  // 상대를 흘려보내는" 기술이다. 달려오던 봇은 관성 때문에 못 멈추고
  // 지나쳐 버리므로, 좁은 다리나 벽 앞처럼 옆으로 뺄 공간이 없을 때 쓴다.
  //
  // 공을 멀리 보내지 않는 게 핵심이다 - 발밑에 딱 세워두고 몸만 튼다.
  /** 재사용 대기 시간 (초) */
  stopCooldown: 1.0,
  /** 이 거리 안에 공이 있어야 나간다 */
  stopRange: 2.2,
  /** 공을 세울 때 남기는 속도 비율 (0이면 완전 정지) */
  stopBallKeep: 0.12,
  /** 공을 몸쪽으로 당겨오는 충격량 */
  stopBallPull: 2.2,
  /** 캐릭터를 멈추는 감속 비율 (속도의 이만큼을 지운다) */
  stopBrake: 1.35,
  /** 멈춘 뒤 뒤로 빠지는 대시 시간 (초) */
  stopDash: 0.38,
  /** 그 동안 드리블을 쉬는 시간 */
  stopLockout: 0.22,
};

export interface BallHandle {
  id: number;
  body: CANNON.Body;
}

/** 한 플레이어의 공 관련 상태 (쿨다운 등) */
interface PlayerBallState {
  trickTimer: number;
  /** 스톱턴 쿨다운 */
  stopTimer: number;
  /** 재낀 순간의 전진 방향 (정규화). 제동을 앞/옆으로 나눠 걸 때 쓴다 */
  settleRefX: number;
  settleRefZ: number;
  /** 재낀 직후 공을 추가로 감속시키는 남은 시간 */
  settleTimer: number;
  /** 트릭 직후 드리블을 쉬는 남은 시간 */
  lockout: number;
  /** 다음 터치까지 남은 시간 */
  pokeTimer: number;
  /** 직전 스텝의 진행 방향 (방향 전환을 감지해 즉시 터치를 허용한다) */
  lastDirX: number;
  lastDirZ: number;
  /** 부드럽게 만든 회전 속도 (rad/s). B.turnRateFull 주석 참고 */
  turnRate: number;
  /** 러시가 남은 시간 (초) + 그 방향 (B.rushTime 주석 참고) */
  rushTimer: number;
  rushX: number;
  rushZ: number;
  /** 러시 재사용 대기 (초) */
  rushCd: number;
  /** 킥 쿨다운 남은 시간 */
  kickTimer: number;
  /** 줍는 동작이 남은 시간 */
  scoopTimer: number;
  /** 트릭 대시가 남은 시간 + 그 방향 */
  dashTimer: number;
  dashX: number;
  dashZ: number;
  /** 마지막으로 트릭이 실제로 나갔는지 (HUD/디버그용) */
  lastTrick: number;
  /**
   * 이번 스텝에 발이 공에 닿은 지점과 세기. 렌더 쪽이 한 번 읽어가면 지운다.
   *
   * [왜 물리 쪽에서 남기는가] "툭 찬 순간"은 물리 스텝 안에서만 알 수 있다.
   * 렌더 프레임에서 공 속도를 보고 역추적하면 프레임이 밀릴 때 놓치거나
   * 두 번 그린다. 여기서 도장만 찍어두고 그리는 일은 main.ts가 한다.
   */
  touch: { x: number; y: number; z: number; strength: number } | null;
  /** 방금 나간 개인기의 방향들 (연출용). 한 번 읽어가면 지운다 */
  lastTrickInfo: TrickInfo | null;
}

/** 발이 공에 닿은 순간 (fx용) */
export interface TouchEvent {
  x: number; y: number; z: number;
  /** 0..1 - 살짝 굴린 터치인지 세게 밀어낸 터치인지 */
  strength: number;
}

/** 개인기가 나간 순간 - 사람이 빠진 쪽과 공이 간 쪽 (fx용) */
export interface TrickInfo {
  x: number; z: number;
  dodgeX: number; dodgeZ: number;
  ballX: number; ballZ: number;
}

export interface BallInput {
  /** 개인기 버튼이 이 프레임에 눌렸는가 (엣지) */
  trick: boolean;
}

export function createBallPlay() {
  const states = new Map<Ragdoll, PlayerBallState>();

  function stateOf(rag: Ragdoll): PlayerBallState {
    let s = states.get(rag);
    if (!s) { s = { trickTimer: 0, lockout: 0, pokeTimer: 0, kickTimer: 0, scoopTimer: 0, dashTimer: 0, dashX: 0, dashZ: 0, lastTrick: 0, stopTimer: 0, settleTimer: 0, settleRefX: 0, settleRefZ: 0, lastDirX: 0, lastDirZ: 0, turnRate: 0, rushTimer: 0, rushX: 0, rushZ: 0, rushCd: 0, touch: null, lastTrickInfo: null }; states.set(rag, s); }
    return s;
  }

  /**
   * 캐릭터가 지금 향하는 수평 방향.
   *
   * 이동 입력 > 조준 방향 > 몸통 정면 순으로 고른다. 몸통 정면이 마지막인
   * 이유는 그게 가장 못 믿을 값이기 때문이다 - 서 있는 동안 몸통은 자세 유지
   * 토크만 받으며 조금씩 표류해서, 마지막으로 걷던 방향에서 얼마든지 어긋난다.
   */
  function facing(rag: Ragdoll): { x: number; z: number } {
    const ix = rag.intentX, iz = rag.intentZ;
    if (Math.hypot(ix, iz) > 0.01) return { x: ix, z: iz };
    return aiming(rag);
  }

  /** 조준 방향 (없으면 몸통 정면으로 떨어진다 - 봇이 이 경로를 쓴다) */
  function aiming(rag: Ragdoll): { x: number; z: number } {
    const ax = rag.aimX, az = rag.aimZ;
    if (Math.hypot(ax, az) > 0.01) return { x: ax, z: az };
    const fwd = new CANNON.Vec3(0, 0, 1);
    rag.torso.quaternion.vmult(fwd, fwd);
    const l = Math.hypot(fwd.x, fwd.z) || 1;
    return { x: fwd.x / l, z: fwd.z / l };
  }

  const moving = (rag: Ragdoll) => Math.hypot(rag.intentX, rag.intentZ) > 0.01;

  /**
   * 드리블 한 스텝 — 상시로 끌어당기지 않고, 발이 닿을 때 "찬다".
   *
   * 공이 잡혀 있으면(E로 안고 있으면) 아무것도 하지 않는다 - 그건 carry.ts가
   * 이미 가슴 앞으로 붙들고 있고, 여기서 또 밀면 둘이 싸운다.
   */
  function dribble(rag: Ragdoll, ball: CANNON.Body, dt: number, carrying: boolean) {
    if (carrying) return;
    if (rag.state !== "ACTIVE") return;   // 넘어져 있으면 공을 못 몬다

    const st = stateOf(rag);
    // 재낀 직후에는 공을 빠르게 세운다 (trickSettleTime 주석 참고).
    // 드리블이 쉬는 구간에도 걸려야 하므로 lockout 검사보다 앞이다.
    if (st.settleTimer > 0) {
      // 앞/옆으로 나눠서 건다. 옆(달아나는 성분)은 세게, 앞(사람을 따라가는
      // 성분)은 약하게 - 안 그러면 공이 제자리에 서고 사람만 달려나간다.
      const v = ball.velocity;
      const rx = st.settleRefX, rz = st.settleRefZ;
      const fwd = v.x * rx + v.z * rz;             // 전진 성분의 크기
      const fx = rx * fwd, fz = rz * fwd;          // 전진 성분 벡터
      const lx = v.x - fx, lz = v.z - fz;          // 나머지 = 옆 성분
      const m = ball.mass;
      ball.applyForce(new CANNON.Vec3(
        -(fx * B.trickSettleFwdDamp + lx * B.trickSettleDamp) * m, 0,
        -(fz * B.trickSettleFwdDamp + lz * B.trickSettleDamp) * m,
      ));
      ball.wakeUp();
    }
    // 트릭으로 재낀 공 / 방금 강하게 찬 공은 잠시 그대로 둔다
    if (st.lockout > 0) return;
    // 줍는 중에는 차내면 안 된다
    if (st.scoopTimer > 0) return;
    // 떠 있는 공은 발이 안 닿는다
    if (ball.position.y > B.radius * 2.2) return;

    const p = rag.pelvis.position;
    const dx = ball.position.x - p.x;
    const dz = ball.position.z - p.z;
    const dist = Math.hypot(dx, dz);
    if (dist > B.range) return;

    const pv = rag.pelvis.velocity;
    const bvx = ball.velocity.x, bvz = ball.velocity.z;
    const bs = Math.hypot(bvx, bvz);

    // ---- 급정지: 입력이 없다
    //
    // 예전엔 여기서 그냥 return 이었다(= 서 있으면 공과 무관). 이제는 발로
    // 세우는 것까지가 조작이다. 단 아주 가깝고 느린 공만 세울 수 있어서,
    // 빠르게 몰던 중에 손을 놓으면 공은 그대로 굴러 나간다.
    if (!moving(rag)) {
      if (dist < B.trapRange && bs > 0.15 && bs < B.trapMaxSpeed && st.pokeTimer <= 0) {
        // 공의 진행 방향 반대로 충격량 = 발로 받아 죽이는 동작.
        // 상한이 있어서 빠른 공은 한 번에 다 못 죽인다 (= 튕겨나간다).
        //
        // [공 "위"에 거는 이유] 무게중심에 걸면 선속도만 줄고 회전은 그대로
        // 남는다. 그러면 굴러가던 공이 속도에 비해 과하게 회전하는 상태가
        // 되어, 바닥 마찰이 그 회전을 다시 선속도로 되돌린다.
        // 실측으로 한 번 밟을 때마다 예상(2.27 m/s)의 65%인 1.48 m/s밖에
        // 안 줄었고, 공은 1.7 m/s로 계속 굴러가 버렸다.
        // 실제로 공을 세울 때도 발바닥으로 공 윗면을 누른다. 접점을 위로
        // 옮기면 같은 충격량이 회전까지 같이 죽인다.
        const j = Math.min(B.trapMax, bs * ball.mass);
        ball.applyImpulse(
          new CANNON.Vec3((-bvx / bs) * j, 0, (-bvz / bs) * j),
          new CANNON.Vec3(0, B.radius, 0),
        );
        st.pokeTimer = B.touchIntervalSlow;
        // 멈춰서 공을 받는 것도 "발로 하는 일"이라 눈에 보여야 한다
        st.touch = {
          x: ball.position.x, y: B.radius * 0.5, z: ball.position.z,
          strength: Math.min(1, j / B.trapMax) * 0.6,
        };
        ball.wakeUp();
      }
      return;
    }

    const dir = facing(rag);
    const pspd = Math.hypot(pv.x, pv.z);
    /** 지금 속도에서 공을 두고 싶은 발 앞 거리 */
    const lead = B.leadBase + pspd * B.leadPerSpeed;

    // ---- 터치 사이의 약한 유도 (옆 방향 위치 오차만)
    //
    // 진행 방향 성분에는 절대 걸지 않는다. 그래서 "앞으로 얼마나 가는가"는
    // 오직 찬 충격량으로만 정해진다 = 용수철에 매달린 느낌이 나지 않는다.
    // 옆 방향 상대속도 감쇠도 걸지 않는다 - 그게 방향 전환의 지연을 지워서
    // 자석처럼 보이게 만들던 범인이다 (guideAccel 주석 참고).
    const fadeStart = B.range * (1 - B.fade);
    const fade = dist <= fadeStart ? 1 : Math.max(0, (B.range - dist) / (B.range - fadeStart));
    {
      // 공이 내 진행선에서 옆으로 얼마나 벗어나 있는가 (외적의 y성분)
      const side = dx * dir.z - dz * dir.x;
      let ax = -dir.z * side * B.guideAccel;
      let az = dir.x * side * B.guideAccel;
      // 옆 방향 상대속도를 "조금만" 죽인다 (guideDamp 주석 참고).
      // 0이면 꺾을 때 생긴 옆 속도가 굴림 마찰로만 줄어서 공이 그대로
      // 날아가 버리고, 크면 즉시 죽어서 자석이 된다.
      const relSide = (ball.velocity.x - pv.x) * dir.z - (ball.velocity.z - pv.z) * dir.x;
      ax += -dir.z * relSide * B.guideDamp;
      az += dir.x * relSide * B.guideDamp;
      const am = Math.hypot(ax, az);
      const cap = B.guideAccel * fade;
      if (am > cap && am > 0) { ax = (ax / am) * cap; az = (az / am) * cap; }
      ball.applyForce(new CANNON.Vec3(ax * ball.mass, 0, az * ball.mass));
    }

    // ---- 터치 (실제로 차는 부분)
    //
    // 발이 닿는 범위인가 - 앞뒤/좌우를 따로 본다 (touchAhead 주석 참고).
    // 진행 방향으로 공이 얼마나 앞에 있는가 (음수면 이미 지나쳤다)
    const alongDist = dx * dir.x + dz * dir.z;
    // 방향을 방금 꺾었는가. 범위 검사보다 먼저 구해야 한다 - 꺾는 순간에는
    // 닿는 범위 자체가 넓어지기 때문이다 (turnReachSide 주석 참고).
    const hadDir = st.lastDirX !== 0 || st.lastDirZ !== 0;
    const dot = hadDir ? Math.max(-1, Math.min(1, dir.x * st.lastDirX + dir.z * st.lastDirZ)) : 1;
    const turned = hadDir ? dot < B.turnResetDot : false;

    // ---- 지금 얼마나 빠르게 몸을 틀고 있는가 (0..1, 연속값)
    //
    // 한 스텝에 돈 각도를 dt로 나눠 각속도를 구하고, turnSmooth에 걸쳐
    // 부드럽게 만든다. 그래서 "회전 시작 -> 진행 -> 종료"가 하나의 연속된
    // 상태가 된다 (B.turnRateFull / turnSmooth 주석 참고).
    // 직진이면 0이라 아래 배수가 전부 1 = 예전 동작과 완전히 같다.
    const rate = Math.acos(dot) / Math.max(1e-4, dt);
    const k = 1 - Math.exp(-dt / B.turnSmooth);
    st.turnRate += (rate - st.turnRate) * k;
    const turning = Math.min(1, st.turnRate / B.turnRateFull);
    st.lastDirX = dir.x; st.lastDirZ = dir.z;

    // 러시 중에는 발이 조금 더 멀리 닿는다 - 달려와서 그대로 다시 몰기
    // 시작하는 게 러시의 목적이고, 그냥 스쳐 지나가면 아무 의미가 없다.
    const rushBoost = st.rushTimer > 0 ? B.rushReach : 1;
    const reachAhead = B.touchAhead * (1 + (B.turnReachAhead - 1) * turning) * rushBoost;
    const reachSide = B.touchSide * (1 + (B.turnReachSide - 1) * turning) * rushBoost;
    // 몸을 트는 동안에는 옆/뒤의 공에도 발이 닿는다 (B.turnBehind 주석 참고).
    const behind = B.behindLimit + (B.turnBehind - B.behindLimit) * turning;
    // 등 뒤로 넘어간 공은 못 찬다. 멈추거나(트래핑) 돌아서야 한다.
    if (alongDist < behind || alongDist > reachAhead) { ball.wakeUp(); return; }
    if (Math.abs(dx * dir.z - dz * dir.x) > reachSide) { ball.wakeUp(); return; }

    /**
     * 공이 발밑에 들어와 버렸는가.
     *
     * [터치 간격보다 우선한다] 터치 간격을 속도에 따라 0.15~0.27초로 늘렸더니,
     * 출발 가속이 빨라서(moveAccel 8) 다음 터치가 오기 전에 사람이 공을 타고
     * 넘어가는 일이 생겼다. 실측으로 골반이 1.50m까지 올라갔다 - 공 위에
     * 올라선 것이다. 그 상태에서는 개인기도 "공중"으로 판정돼 안 나갔다.
     * 밟힌 공을 밀어내는 건 박자를 기다릴 일이 아니라 즉시 해야 한다.
     */
    const stuck = alongDist < B.minAhead;

    /**
     * 방향을 방금 꺾었는가.
     *
     * [지그재그가 운에 갈리던 진짜 이유]
     * 터치는 pokeTimer(0.13~0.22초) 간격에 묶여 있었다. 그래서 방향을 꺾는
     * 순간이 터치 "직후"면, 다음 터치가 열릴 때까지 공은 옛 방향으로 계속
     * 굴러가 발 범위를 벗어난다. 꺾는 순간이 터치 "직전"이면 바로 잡힌다.
     * 즉 같은 조작인데 박자 위상만으로 결과가 갈렸다 - 실측으로 똑같은
     * 지그재그 5회에서 놓친 프레임 비율이 0.51 / 0 / 0 / 0 / 0.16 이었다.
     *
     * 실제로 사람은 방향을 바꿀 때 "박자를 기다렸다가" 차지 않는다. 꺾는
     * 그 순간에 발을 넣는다. 그래서 진행 방향이 크게 바뀌면 간격을 무시하고
     * 한 번 찰 수 있게 한다. 자석이 되지는 않는다 - 찰 수 있는 범위(발 반경)도
     * 충격량 상한도 그대로이고, 방향 전환 터치는 여전히 turnBite 만큼만
     * 운동량을 물어서 나머지는 흘러나간다.
     */
    if (st.pokeTimer > 0 && !stuck && !turned) { ball.wakeUp(); return; }

    // 목표 속도 = 사람 속도 + "발 앞 lead까지 밀어내는 몫".
    // 가까울수록 세게 차서 앞으로 내보낸다.
    let want = pspd * B.touchSpeed + Math.max(0, lead - alongDist) * B.pushOut;
    // 러시 중이고 공이 발 앞 거리보다 멀면, 미는 게 아니라 죽인다
    // (B.rushTouchKeep 주석 참고). 이미 발 앞에 들어온 공은 평소대로 민다.
    const rushTouch = st.rushTimer > 0 && alongDist > lead;
    if (rushTouch) want = pspd * B.rushTouchKeep;
    // 발밑에 낀 공은 무조건 최소 속도로 밀어낸다. 안 그러면 다리 사이에서
    // 계속 채이며 제자리에 머문다 (minAhead 주석 참고).
    if (stuck) want = Math.max(want, pspd + B.unstickSpeed);

    // 공이 지금 가는 방향과 내가 가려는 방향이 얼마나 맞는가
    const align = bs > 0.5 ? (bvx * dir.x + bvz * dir.z) / bs : 1;

    let jx: number, jz: number, cap: number;
    if (align < B.turnAlign) {
      // 방향 전환 터치: 원래 운동량을 일부 죽이고 새 방향으로 찬다.
      // turnBite가 1이 아니라서 항상 조금씩 흘러나간다 = 급회전은 위험하다.
      jx = (dir.x * want - bvx * B.turnBite) * ball.mass;
      jz = (dir.z * want - bvz * B.turnBite) * ball.mass;
      cap = B.touchMax * B.turnBoost;
    } else {
      // 직진 터치: 진행 방향 속도를 목표에 맞춘다.
      // 모자라면 밀고(미는 터치), 너무 빠르면 죽인다(발바닥 터치).
      const along = bvx * dir.x + bvz * dir.z;
      const need = (want - along) * ball.mass;
      jx = dir.x * need; jz = dir.z * need;
      // 러시로 뻗은 발은 평소 발바닥 터치(touchBrake)보다 세게 죽일 수 있다.
      // 그래야 굴러 달아나던 공이 실제로 선다.
      cap = need >= 0 ? B.touchMax : (rushTouch ? B.touchMax : B.touchBrake);
    }
    const jm = Math.hypot(jx, jz);
    if (jm > cap && jm > 0) { jx = (jx / jm) * cap; jz = (jz / jm) * cap; }

    ball.applyImpulse(new CANNON.Vec3(jx, 0, jz));

    // 다음 터치까지의 간격도 속도를 따라간다 - 빠를수록 크게 한 번 밀고
    // 오래 쫓아간다 (touchIntervalSlow/Fast 주석 참고).
    const sf = Math.min(1, pspd / P.maxSpeed);
    st.pokeTimer = B.touchIntervalSlow + (B.touchIntervalFast - B.touchIntervalSlow) * sf;

    // "툭 찼다"를 밖에서 그릴 수 있게 접촉 지점과 세기를 남긴다 (main.ts -> fx.ts)
    st.touch = {
      x: ball.position.x - dir.x * B.radius,
      y: B.radius * 0.5,
      z: ball.position.z - dir.z * B.radius,
      strength: Math.min(1, Math.hypot(jx, jz) / B.touchMax),
    };
    ball.wakeUp();
    void dt;
  }

  /**
   * 킥 — 지금 당장 강하게 한 방 찬다 (마우스 좌클릭).
   *
   * 드리블 터치가 "속도를 맞추는 약한 접촉"이라면 이건 고정 충격량이다.
   * 실제 rigid body impulse라서 공이 장애물을 굴리거나, 달려드는 AI를
   * 맞고 튕겨나가게 만들 수 있다.
   *
   * [방향은 이동이 아니라 조준을 따른다] 킥만 facing()이 아니라 aiming()을
   * 쓴다. 차는 건 "지금 보고 있는 쪽으로 보내는" 동작이라, 옆으로 빠지면서
   * 앞으로 차거나 멈춰 서서 각도를 재는 조작이 성립해야 하기 때문이다.
   * 드리블 터치와 개인기는 그대로 이동 방향을 따른다 (발 앞에 두고 가는
   * 동작과 몸을 빼는 동작이라 진행 방향이 맞다).
   *
   * @returns 실제로 찼으면 true
   */
  function tryKick(
    rag: Ragdoll, ball: CANNON.Body, carrying: boolean, power = 0,
  ): { x: number; y: number; z: number; power: number } | null {
    if (rag.state !== "ACTIVE") return null;
    const st = stateOf(rag);
    if (st.kickTimer > 0) return null;
    // 안고 있을 때는 킥이 아니라 E로 놓는 게 맞다 (조작이 겹치면 헷갈린다)
    if (carrying) return null;

    const p = rag.pelvis.position;
    const dx = ball.position.x - p.x;
    const dz = ball.position.z - p.z;
    if (Math.hypot(dx, dz) > B.kickRange) return null;

    const k = Math.max(0, Math.min(1, power));
    const fwd = B.kickForwardMin + (B.kickForwardMax - B.kickForwardMin) * k;
    const up = B.kickUpMin + (B.kickUpMax - B.kickUpMin) * k;

    const dir = aiming(rag);
    ball.applyImpulse(new CANNON.Vec3(dir.x * fwd, up, dir.z * fwd));
    // 반작용 - 찬 사람도 살짝 뒤로 밀린다 (세게 찰수록 크게)
    const recoil = B.kickRecoil * (0.5 + k * 0.5);
    rag.pelvis.applyImpulse(new CANNON.Vec3(-dir.x * recoil, 0, -dir.z * recoil));
    ball.wakeUp();

    st.kickTimer = B.kickCooldown;
    // 찬 직후 드리블 터치가 공을 도로 잡아채지 않게 잠깐 손을 뗀다
    st.lockout = Math.max(st.lockout, B.kickLockout);
    return { x: ball.position.x, y: 0.02, z: ball.position.z, power: k };
  }

  /** 킥 쿨다운 남은 비율 (HUD용) */
  function kickCooldownOf(rag: Ragdoll): number {
    return Math.max(0, stateOf(rag).kickTimer / B.kickCooldown);
  }

  /** 방금 나간 개인기 정보를 돌려주고 지운다 (fx용) */
  function takeTrick(rag: Ragdoll): TrickInfo | null {
    const st = stateOf(rag);
    const t = st.lastTrickInfo;
    st.lastTrickInfo = null;
    return t;
  }

  /** 이번 프레임에 발이 공에 닿았으면 그 지점을 돌려주고 지운다 (fx용) */
  function takeTouch(rag: Ragdoll): TouchEvent | null {
    const st = stateOf(rag);
    const t = st.touch;
    st.touch = null;
    return t;
  }

  /**
   * E를 눌렀는데 아직 손이 안 닿았을 때 - 줍는 동작을 시작한다.
   * @returns 줍기를 시작했으면 true
   */
  function requestPickup(rag: Ragdoll, ball: CANNON.Body): boolean {
    if (rag.state !== "ACTIVE") return false;
    const p = rag.pelvis.position;
    if (Math.hypot(ball.position.x - p.x, ball.position.z - p.z) > B.scoopRange) return false;
    stateOf(rag).scoopTimer = B.scoopTime;
    return true;
  }

  function scooping(rag: Ragdoll): boolean { return stateOf(rag).scoopTimer > 0; }

  /** 줍는 중: 공을 가슴 앞으로 당긴다. 손에 닿으면 main.ts의 grab이 물어간다. */
  function scoopStep(rag: Ragdoll, ball: CANNON.Body) {
    const fwd = new CANNON.Vec3(0, 0, 1);
    rag.torso.quaternion.vmult(fwd, fwd);
    const fl = Math.hypot(fwd.x, fwd.z) || 1;
    const tx = rag.torso.position.x + (fwd.x / fl) * B.scoopAhead;
    const ty = rag.torso.position.y + B.scoopHeight;
    const tz = rag.torso.position.z + (fwd.z / fl) * B.scoopAhead;

    const g = Math.abs(-18);
    let ax = (tx - ball.position.x) * 34 - ball.velocity.x * 6;
    let ay = (ty - ball.position.y) * 34 - ball.velocity.y * 6 + g;   // 중력 상쇄
    let az = (tz - ball.position.z) * 34 - ball.velocity.z * 6;
    const am = Math.hypot(ax, ay, az);
    if (am > B.scoopAccel) { const k = B.scoopAccel / am; ax *= k; ay *= k; az *= k; }
    ball.applyForce(new CANNON.Vec3(ax * ball.mass, ay * ball.mass, az * ball.mass));
    ball.wakeUp();
  }

  /** 안고 뛰면 굼뜨다 */
  function carryPenalty(rag: Ragdoll) {
    const v = rag.pelvis.velocity;
    rag.pelvis.applyForce(new CANNON.Vec3(-v.x * B.carryDrag, 0, -v.z * B.carryDrag));
  }

  /**
   * 개인기: 공을 살짝 띄우면서 옆으로 재낀다.
   *
   * 공에는 위 + 진행 방향 충격량, 캐릭터에는 옆으로 뛰는 충격량을 준다.
   * 둘 다 실제 충격량이라 결과가 정해져 있지 않다 - 벽이 있으면 못 가고,
   * 공이 장애물에 맞으면 튕긴다.
   *
   * @returns 실제로 나갔으면 true
   */
  function tryTrick(rag: Ragdoll, ball: CANNON.Body, carrying: boolean): boolean {
    const s = stateOf(rag);
    if (s.trickTimer > 0) return false;
    if (carrying) return false;                 // 안고 있으면 재낄 게 없다
    if (rag.state !== "ACTIVE") return false;
    // 점프로 높이 떠 있을 때만 막는다.
    //
    // 처음엔 rag.grounded를 요구했는데, 달리는 중에는 보행 주기 때문에 이 값이
    // 계속 깜빡여서 트릭이 눌러도 안 나가는 일이 절반쯤 됐다(실측: 같은 코드가
    // 실행 타이밍에 따라 되기도 하고 안 되기도 했다). 발이 잠깐 뜬 건 달리기의
    // 일부지 "공중"이 아니므로, 실제로 높이 뛴 경우만 걸러낸다.
    if (rag.pelvis.position.y > P.rideHeight + 0.35) return false;

    const p = rag.pelvis.position;
    const dist = Math.hypot(ball.position.x - p.x, ball.position.z - p.z);
    if (dist > B.trickRange) return false;

    // ---- 기준 방향은 "보고 있는 쪽"(조준)이다.
    //
    // [진행 방향을 기준으로 삼으면 안 된다] 처음엔 facing(=이동 입력 방향)을
    // 기준으로 좌우를 쟀는데, 그러면 좌우 성분이 항상 0이다. 기준축 자체가
    // 이동 방향이라 그 수직 성분은 정의상 0이기 때문이다. 그래서 A를 누르든
    // D를 누르든 판정이 늘 "공이 있는 쪽" 폴백으로 떨어졌고, 실측에서 A를
    // 누른 채 쓰면 공과 사람이 둘 다 왼쪽으로 가버렸다(갈라진 폭 2.23m,
    // 방향 같음). 사람이 느끼는 좌우는 "카메라 정면 기준 좌우"이므로
    // 조준을 기준축으로 쓴다.
    const ref = aiming(rag);
    // (dir은 아래 공 위치 판정에만 쓴다)
    const dir = facing(rag);
    void dir;
    // 조준 기준 오른쪽 단위벡터
    const sx = -ref.z, sz = ref.x;

    // ---- 어느 쪽으로 피할 것인가
    //
    // [플레이어가 정한다] 좌우 입력이 있으면 그쪽으로 피한다. A를 누른 채
    // Shift면 왼쪽으로 빠지고 공은 오른쪽으로 넘어간다 - 눌러본 대로 나오니까
    // 무엇을 하는 기술인지 한 번에 이해된다. 좌우 입력이 없으면 공이 있는
    // 반대쪽으로 피한다(공을 몸 반대편으로 흘리는 기본 동작).
    const inSide = rag.intentX * sx + rag.intentZ * sz;
    let dodge: number;
    if (Math.abs(inSide) > 0.25) {
      dodge = Math.sign(inSide);
    } else {
      const ballSide = (ball.position.x - p.x) * sx + (ball.position.z - p.z) * sz;
      dodge = ballSide >= 0 ? -1 : 1;
    }
    // 공은 사람이 피하는 반대쪽으로 간다. 이게 이 기술의 전부다 -
    // 사이에 있는 상대는 공과 사람 중 하나만 따라갈 수 있다.
    const ballSide = -dodge;

    // ---- 공: 확실히 떠서, 옆으로 넘긴다
    //
    // [충격량을 "더하지" 않고 목표 속도로 "맞춘다"]
    // 예전에는 지금 굴러가던 속도 위에 옆/앞 충격량을 그대로 더했다. 그래서
    // 이미 4.6 m/s로 몰고 있던 공에 더해지면 절대 속도가 7~8 m/s까지 뛰었고,
    // 실측으로 재낀 뒤 공이 3.0m, 심하면 6.6m까지 날아가 회수가 안 됐다
    // (같은 조작인데 그때 공 속도가 얼마였냐에 따라 결과가 달라졌다).
    //
    // 이 기술이 원하는 건 "공을 멀리 보내는 것"이 아니라 "사람과 공을 좌우로
    // 갈라놓는 것"이다. 그러면 목표는 절대 속도가 아니라 사람 대비 상대
    // 속도여야 한다. 전진 성분은 사람 속도에 맞춰두고(= 같이 나아간다),
    // 옆 성분만 실어준다. 그래서 갈라졌다가 앞에서 다시 만난다.
    {
      const pv = rag.pelvis.velocity;
      const fwdSpeed = pv.x * ref.x + pv.z * ref.z;      // 사람의 전진 속도
      const tvx = ref.x * fwdSpeed * B.trickBallKeep + sx * ballSide * B.trickBallSide;
      const tvz = ref.z * fwdSpeed * B.trickBallKeep + sz * ballSide * B.trickBallSide;
      ball.applyImpulse(new CANNON.Vec3(
        (tvx - ball.velocity.x) * ball.mass,
        B.trickBallUp,
        (tvz - ball.velocity.z) * ball.mass,
      ));
    }
    ball.wakeUp();

    // ---- 캐릭터: 반대쪽으로 옆스텝
    // point 인자를 생략해 무게중심을 통과하는 순수 충격량으로 준다 -
    // 월드 좌표를 넘기면 원점에서 먼 곳일수록 커지는 가짜 토크가 생긴다.
    rag.pelvis.applyImpulse(new CANNON.Vec3(
      sx * dodge * B.trickBodySide,
      B.trickBodyUp,
      sz * dodge * B.trickBodySide
    ));
    // 몸을 트는 토크. 관성모멘트가 작은 몸통이라 값이 크면 튀므로 적당히.
    rag.torso.torque.y += dodge * B.trickTorque;

    s.trickTimer = B.trickCooldown;
    s.lockout = B.trickLockout;
    s.settleTimer = B.trickSettleTime;
    s.settleRefX = ref.x; s.settleRefZ = ref.z;
    // 대시 방향 = 옆 + 앞. main.ts가 이 동안 이 값을 이동 입력으로 넣어준다.
    // (control()은 손대지 않고 "무엇을 입력으로 줄지"만 바꾼다 - trickDash 주석)
    const dxRaw = sx * dodge + ref.x * B.trickDashForward;
    const dzRaw = sz * dodge + ref.z * B.trickDashForward;
    const dl = Math.hypot(dxRaw, dzRaw) || 1;
    s.dashTimer = B.trickDash;
    s.dashX = dxRaw / dl;
    s.dashZ = dzRaw / dl;
    s.lastTrick = performance.now();
    // 연출용: 공이 간 쪽 / 사람이 빠진 쪽
    s.lastTrickInfo = {
      x: p.x, z: p.z,
      dodgeX: sx * dodge, dodgeZ: sz * dodge,
      ballX: sx * ballSide, ballZ: sz * ballSide,
    };
    return true;
  }

  /**
   * 개인기 2 — 스톱턴. 급정지하면서 공을 발밑에 세우고 몸을 뒤로 뺀다.
   *
   * [1번과 무엇이 다른가] 옆으로 재끼기는 지나갈 공간이 필요하다. 좁은 다리나
   * 벽 앞에서는 쓸 수가 없다. 스톱턴은 반대로 "그 자리에 선다" - 달려오던
   * 봇은 관성(그리고 reactionTime 0.3초) 때문에 못 멈추고 지나쳐 버린다.
   * 공은 멀리 안 보내고 발밑에 붙여두므로, 상대가 지나간 뒤 바로 다시 몰 수 있다.
   *
   * 순수하게 충격량과 이동 입력만 쓴다 - control()은 건드리지 않는다.
   *
   * @returns 실제로 나갔으면 true
   */
  function tryStopTurn(rag: Ragdoll, ball: CANNON.Body, carrying: boolean): boolean {
    const s = stateOf(rag);
    if (s.stopTimer > 0) return false;
    if (carrying) return false;
    if (rag.state !== "ACTIVE") return false;
    if (rag.pelvis.position.y > P.rideHeight + 0.35) return false;

    const p = rag.pelvis.position;
    const dist = Math.hypot(ball.position.x - p.x, ball.position.z - p.z);
    if (dist > B.stopRange) return false;

    // ---- 공: 거의 세우고, 몸쪽으로 조금 당긴다 (발밑에 붙인다)
    const bv = ball.velocity;
    ball.applyImpulse(new CANNON.Vec3(
      -bv.x * (1 - B.stopBallKeep) * ball.mass, 0, -bv.z * (1 - B.stopBallKeep) * ball.mass,
    ), new CANNON.Vec3(0, B.radius, 0));   // 위쪽에 걸어야 회전까지 죽는다 (트래핑 주석 참고)
    const toMeX = p.x - ball.position.x, toMeZ = p.z - ball.position.z;
    const l = Math.hypot(toMeX, toMeZ) || 1;
    ball.applyImpulse(new CANNON.Vec3((toMeX / l) * B.stopBallPull, 0, (toMeZ / l) * B.stopBallPull));
    ball.wakeUp();

    // ---- 캐릭터: 급정지
    const pv = rag.pelvis.velocity;
    const spd = Math.hypot(pv.x, pv.z);
    // [골반만 세우면 안 된다] 골반은 5kg인데 몸 전체는 20kg이다. 골반에만
    // 제동을 걸면 나머지 15kg이 관성으로 계속 밀고 나가서, 실측으로 4.62 ->
    // 3.67 m/s 밖에 안 줄었다(= 거의 안 멈춘다). 몸통에도 같이 걸어준다.
    for (const b of [rag.pelvis, rag.torso]) {
      const v = b.velocity;
      b.applyImpulse(new CANNON.Vec3(-v.x * B.stopBrake * b.mass, 0, -v.z * B.stopBrake * b.mass));
    }
    void pv;

    // 그 뒤 잠깐 뒤로 빠진다 (달려오던 상대와 거리를 벌린다).
    // 진행 방향의 반대 = 지금 가던 쪽의 반대.
    const back = spd > 0.3 ? { x: -pv.x / spd, z: -pv.z / spd } : facing(rag);
    s.dashTimer = B.stopDash;
    s.dashX = spd > 0.3 ? back.x : -back.x;
    s.dashZ = spd > 0.3 ? back.z : -back.z;

    s.stopTimer = B.stopCooldown;
    s.lockout = Math.max(s.lockout, B.stopLockout);
    s.lastTrickInfo = {
      x: p.x, z: p.z,
      dodgeX: s.dashX, dodgeZ: s.dashZ,
      ballX: 0, ballZ: 0,
    };
    return true;
  }

  /** 스톱턴 쿨다운 남은 비율 (HUD용) */
  function stopCooldownOf(rag: Ragdoll): number {
    return Math.max(0, stateOf(rag).stopTimer / B.stopCooldown);
  }

  function tick(rag: Ragdoll, dt: number) {
    const s = stateOf(rag);
    s.trickTimer = Math.max(0, s.trickTimer - dt);
    s.stopTimer = Math.max(0, s.stopTimer - dt);
    s.settleTimer = Math.max(0, s.settleTimer - dt);
    s.lockout = Math.max(0, s.lockout - dt);
    s.pokeTimer = Math.max(0, s.pokeTimer - dt);
    s.kickTimer = Math.max(0, s.kickTimer - dt);
    s.scoopTimer = Math.max(0, s.scoopTimer - dt);
    s.dashTimer = Math.max(0, s.dashTimer - dt);
    s.rushCd = Math.max(0, s.rushCd - dt);

    // ---- 러시 유지 (B.rushAccel 주석 참고)
    //
    // control()이 maxSpeed로 되돌리려 거는 제동을 이기는 만큼만 계속 민다.
    // 넘어지면 즉시 끝난다 - 구르는 몸을 밀어봐야 이상하기만 하다.
    if (s.rushTimer > 0) {
      s.rushTimer = Math.max(0, s.rushTimer - dt);
      if (rag.state !== "ACTIVE") { s.rushTimer = 0; }
      else {
        // [골반만 밀면 안 된다] 골반 하나에만 힘을 주면 몸이 앞으로 기울고
        // 나머지 14개 파츠가 뒤에 끌려오면서 걸음이 무너진다. 실측으로
        // 0.7초 동안 더 간 거리가 accel 14에서 0.25m, 70에서도 0.86m였고
        // 회수 시간의 편차만 커졌다(1.57~3.38초). 질량에 비례해 몸 전체를
        // 같이 밀면 자세가 그대로인 채 통째로 나아간다.
        for (const b of rag.bodies) {
          b.applyForce(new CANNON.Vec3(s.rushX * B.rushAccel * b.mass, 0, s.rushZ * B.rushAccel * b.mass));
        }
      }
    }
  }

  /**
   * 러시 — F를 공이 킥 사거리 밖일 때 눌렀을 때.
   *
   * 공이 아니라 **지금 향하고 있는 쪽**으로 튀어나간다 (자석 방지).
   * 성공하면 그 방향을 돌려준다 (연출용).
   */
  function tryRush(rag: Ragdoll, ball: CANNON.Body, carrying: boolean): { x: number; z: number } | null {
    if (carrying) return null;
    if (rag.state !== "ACTIVE") return null;
    const s = stateOf(rag);
    if (s.rushCd > 0 || s.rushTimer > 0) return null;

    const p = rag.pelvis.position;
    const d = Math.hypot(ball.position.x - p.x, ball.position.z - p.z);
    // 찰 수 있는 거리면 그건 킥이 할 일이다. 너무 멀면 러시로 될 일도 아니다.
    if (d <= B.kickRange || d > B.rushRange) return null;

    const dir = facing(rag);
    s.rushTimer = B.rushTime;
    s.rushX = dir.x; s.rushZ = dir.z;
    s.rushCd = B.rushCooldown;
    // 출발 충격량도 몸 전체에 질량 비례로 나눠 준다 (tick의 주석과 같은 이유)
    const total = rag.bodies.reduce((a, b) => a + b.mass, 0) || 1;
    for (const b of rag.bodies) {
      const k = (B.rushImpulse * b.mass) / total;
      b.applyImpulse(new CANNON.Vec3(dir.x * k, 0, dir.z * k));
    }
    return { x: dir.x, z: dir.z };
  }

  /** 지금 러시 중인가 (연출/사거리 보정용) */
  function rushing(rag: Ragdoll): boolean { return stateOf(rag).rushTimer > 0; }

  /**
   * 러시 중이면 그 방향, 아니면 null.
   * main.ts가 이동 입력을 이 방향 쪽으로 눌러서 "러시 중엔 잘 못 꺾는다"를 만든다
   * (B.rushSteer 주석 참고).
   */
  function rushDir(rag: Ragdoll): { x: number; z: number } | null {
    const s = stateOf(rag);
    if (s.rushTimer <= 0) return null;
    return { x: s.rushX, z: s.rushZ };
  }
  /** 러시 재사용까지 남은 시간 (HUD용) */
  function rushCooldownOf(rag: Ragdoll): number { return stateOf(rag).rushCd; }

  /** 트릭 대시 중이면 그 방향, 아니면 null (main.ts가 이동 입력으로 쓴다) */
  function dashDir(rag: Ragdoll): { x: number; z: number } | null {
    const s = stateOf(rag);
    if (s.dashTimer <= 0) return null;
    return { x: s.dashX, z: s.dashZ };
  }

  function forget(rag: Ragdoll) { states.delete(rag); }

  function cooldownOf(rag: Ragdoll) { return stateOf(rag).trickTimer; }

  return { dribble, tryKick, kickCooldownOf, carryPenalty, tryTrick, tick, forget, cooldownOf, requestPickup, scooping, scoopStep, dashDir, takeTouch, takeTrick, tryStopTurn, stopCooldownOf, tryRush, rushing, rushCooldownOf, rushDir };
}

/** 공을 안고 있을 때 살짝 느려지는 정도를 대략적인 최고속으로 환산 (HUD용) */
export function carriedTopSpeed(totalMass: number): number {
  // 이동 컨트롤러의 가속력과 항력이 같아지는 지점
  return (P.moveAccel * totalMass * P.maxSpeed) / (P.moveAccel * totalMass + B.carryDrag);
}
