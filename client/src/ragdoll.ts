import * as THREE from "three";
import * as CANNON from "cannon-es";

/**
 * 인간형 Active Ragdoll
 *
 * 15 bodies:
 *   head, torso, pelvis
 *   upperArm L/R, lowerArm L/R, hand L/R
 *   upperLeg L/R, lowerLeg L/R, foot L/R
 *
 * 핵심 설계:
 *  - pelvis는 fixedRotation이 아니다. 자유 회전해야 실제로 넘어질 수 있다.
 *  - 평상시엔 upright torque + ride-height spring으로 "서 있으려고 애쓰는" 상태.
 *  - 강한 충격/기울기가 임계치를 넘으면 제어를 끊고 완전 RAGDOLL로 전환.
 *  - 일정 시간 후 gain을 서서히 올리며 스스로 일어나려 시도 (실패해도 됨).
 */

export const GROUP_WORLD = 1;

export type RagdollState = "ACTIVE" | "RAGDOLL" | "RECOVERING";

export interface RagdollInput {
  /** 월드 기준 이동 방향 (정규화됨, 없으면 0벡터) */
  moveX: number;
  moveZ: number;
  jump: boolean;
  /**
   * 월드 기준 조준 방향 (= 조종하는 사람의 카메라 정면). 없으면 0.
   *
   * 이동 입력과 별개인 이유는 두 가지다.
   *  - 서 있을 때도 방향이 있다. moveX/moveZ만으로는 "가만히 서서 오른쪽을
   *    본다"를 표현할 방법이 없어서, 정지 중에는 몸이 마지막으로 걷던 쪽을
   *    보고 있다가 그쪽으로 공을 차 버렸다.
   *  - 옆으로 빠지면서 앞으로 차는 것 같은, 이동과 조준이 어긋나는 조작이 된다.
   * 봇은 이 값을 주지 않는다 (자기 진행 방향이 곧 조준이다).
   */
  aimX?: number;
  aimZ?: number;
}

/** 손 하나가 붙잡고 있는 지점 (월드 좌표). 물체가 움직이면 매 프레임 갱신된다. */
export interface HandGrip {
  hand: CANNON.Body;
  target: CANNON.Vec3;
  /**
   * 그 지점이 움직이는 속도 (물체의 선속도 + 회전 기여).
   *
   * 손 스프링의 감쇠를 "월드 속도"로 걸면 안 된다. 걸어가는 동안에는 손도
   * 물체도 같이 3 m/s로 움직이는데, 그 속도에 Kd를 곱하면 40*3.1*0.3 = 37N이
   * 뒤로 걸려서 앞으로 당기는 힘(30N)을 통째로 상쇄한다. 실측으로 서 있을 땐
   * 간격이 0.085(닿음)인데 걷기 시작하면 0.25로 벌어졌다.
   * 상대속도로 감쇠해야 "같이 움직이는 동안에는 붙어 있는" 그림이 된다.
   */
  targetVel?: CANNON.Vec3;
}

export interface RagdollPart {
  name: string;
  body: CANNON.Body;
  mesh: THREE.Mesh;
}

export interface Ragdoll {
  parts: Map<string, RagdollPart>;
  bodies: CANNON.Body[];
  constraints: CANNON.Constraint[];
  group: THREE.Group;
  pelvis: CANNON.Body;
  torso: CANNON.Body;
  handL: CANNON.Body;
  handR: CANNON.Body;
  state: RagdollState;
  grounded: boolean;
  /** 보행 주기 위상 (rad). 발소리 타이밍용 (읽기 전용) */
  swingPhase: number;
  /** 직전 프레임의 이동 입력 방향 (정규화). 무거운 물체를 밀 때 사용 */
  intentX: number;
  intentZ: number;
  /**
   * 직전 프레임의 조준 방향 (정규화). 없으면 0.
   * 킥처럼 "보고 있는 쪽"이 필요한 동작이 읽는다 (ball.ts).
   */
  aimX: number;
  aimZ: number;
  /** 물리 제어 (매 프레임, physics.step 전에 호출) */
  control(dt: number, input: RagdollInput, physics: CANNON.World): void;
  /** 렌더 동기화 (physics.step 후) */
  sync(): void;
  /** 강제 래그돌 전환 */
  knockdown(seconds?: number): void;
  /**
   * 비-host 전용. host가 보낸 래그돌 상태를 그대로 비춰 놓는다.
   *
   * [왜 필요한가] 스냅샷(RagdollSnapshot)에는 st가 실려 오는데 받는 쪽이
   * 그걸 버리고 있었다. 비-host는 physics.step()도 control()도 돌리지 않고
   * 파츠 transform만 보간하므로 자세는 맞게 보이지만, state는 계속 ACTIVE로
   * 남는다. 그래서 상태를 보고 판단하는 연출이 어긋난다 - 실측으로 host가
   * RAGDOLL인 캐릭터가 상대 화면에서는 ACTIVE라, 쓰러져 미끄러지는 동안
   * 발소리가 계속 났다(updateFootsteps가 state !== "ACTIVE"로 거른다).
   *
   * 상태 변수만 대입한다. 타이머(ragdollTimer/recoverTimer)나 충격량은
   * 건드리지 않는다 - 비-host에서는 어차피 아무것도 시뮬레이션하지 않으므로
   * 표시용으로 충분하고, host의 검증된 상태 전이에는 영향이 없다.
   */
  setNetState(st: RagdollState): void;
  /**
   * 지금 잡고 있는 물체들을 알려준다.
   * - 0개보다 많으면 팔이 캐리 포즈로 구동된다.
   * - 들고 있는 물체는 접지 판정 레이에서 제외된다 (자기가 든 물건 위에
   *   올라서려는 현상 방지).
   * - grips를 같이 주면 각 손이 "실제로 붙잡은 지점"으로 뻗는다. 주지 않으면
   *   예전처럼 몸통 앞을 향한 일반 캐리 포즈만 쓴다 (테스트 호환).
   */
  setHeld(bodies: CANNON.Body[], grips?: HandGrip[]): void;
  /** 안전 복구 */
  reset(pos: CANNON.Vec3): void;
  dispose(physics: CANNON.World, scene: THREE.Scene): void;
  /** 유한값 검사 + 복구. 복구했으면 true */
  guard(): boolean;
}

// ---------------------------------------------------------------- 튜닝 파라미터
export const P = {
  // 서 있기
  rideHeight: 0.86,       // 골반이 지면에서 유지하려는 높이
  rideSpring: 2600,      // 지면 스프링 강도 (PD 보정분)
  rideDamp: 220,         // 지면 스프링 감쇠
  rideRayExtra: 0.5,      // 레이 길이 여유

  // 자세 유지
  uprightTorque: 70,    // 몸통을 세우려는 토크
  // 각속도 감쇠. 28에서는 몸통이 좌우로 계속 흔들려("휘적휘적") 방향 전환이
  // 어디로 가는 건지 눈으로 안 읽혔다. 올리면 흔들림만 죽고 세우는 힘
  // (uprightTorque)은 그대로라 넘어짐/일어남 거동은 변하지 않는다.
  uprightDamp: 46,
  // 이동 방향으로 몸을 돌리는 토크. 방향 전환이 "몸이 먼저 도는" 것으로
  // 보여야 조작이 먹은 게 느껴진다.
  yawTorque: 42,
  /** yaw 스프링이 한 스텝에 실을 수 있는 최대 각속도 (rad/s). driveCap 주석 참고 */
  yawMaxRate: 9,

  // 이동 (목표 속도 추종)
  // 속도 오차 -> 가속 게인 (1/s). 클수록 반응이 빠릿.
  //
  // [WASD가 씹히는/늦는 느낌의 정체]
  // 입력 경로에는 문제가 없다(키는 e.code로 읽고, 엣지는 물리 스텝 안에서만
  // 소비한다). 늦게 느껴지는 건 이 컨트롤러가 1차 지연이기 때문이다.
  // 가속도 = moveAccel * (목표속도 - 현재속도) 이므로 시간상수 τ = 1/moveAccel.
  //   3.4 -> τ=0.29s: 최고속의 63%까지 0.29초, 95%까지 0.88초.
  //                   좌우 반전은 오차가 2배라 방향이 실제로 바뀌기까지 0.6초.
  //   8.0 -> τ=0.125s: 63%까지 0.13초, 반전도 0.26초.
  // 키를 누른 순간 몸이 움직이기 시작하는 게 눈에 보이려면 τ가 0.15초 아래여야
  // 한다. control() 자체는 그대로 두고 이 게인만 올린다.
  moveAccel: 8.0,
  // 가속력 상한 (N). 출발 순간 킥을 막는 안전장치.
  // moveAccel을 올리면 정지->최고속 순간의 요구 힘이 (8.0 * 약20kg * 4.6) =
  // 736N이라 620에서 잘려 버린다. 잘리면 게인을 올린 의미가 없으므로 같이 올린다.
  // (상한 자체는 남겨둔다 - 없으면 부활 직후 큰 오차에서 몸이 튄다)
  moveForce: 980,
  maxSpeed: 4.6,          // 목표 최고 속도
  airForceRatio: 0.22,
  // 입력 없을 때 감속 게인 배율. 0.75는 손을 떼도 한참 미끄러져서 급정지가
  // 안 됐다. 1.0이면 가속과 같은 세기로 선다 = 멈추려고 할 때 바로 멈춘다.
  // (공은 관성을 그대로 갖고 굴러가므로 "급정지하면 공만 굴러나간다"가 성립)
  brakeRatio: 1.0,
  leanAmount: 0.26,       // 가속 방향으로 몸을 기울이는 정도 (목표 up 벡터 tilt)

  // 점프
  jumpImpulse: 88,
  jumpCooldown: 0.45,

  // 팔다리 흔들림 (procedural) - 케이던스/진폭은 실제 속도에 비례한다
  legSwing: 17,          // 다리 스윙 토크
  kneeSwing: 6,          // 무릎 접힘 토크
  armSwing: 6,           // 팔 스윙 토크
  swingSpeed: 8.5,        // 최고 속도일 때의 스윙 주기
  /**
   * 팔다리 스윙 감쇠.
   *
   * 스윙은 목표 자세가 없는 열린 루프 구동이라, 감쇠가 없으면 넣은 각운동량이
   * 빠져나갈 데가 없다. dampTorque가 어차피 I/dt로 상한을 거므로 이 값은
   * 사실상 "상한까지 쓴다"는 뜻이고, 실효 감쇠 세기는 파츠 관성이 정한다.
   * 그래서 스윙 진폭(legSwing 등)은 건드리지 않은 채 폭주만 사라진다.
   */
  swingDamp: 1.2,
  /**
   * 손/발 회전 감쇠 계수. dampTorque 상한(I/dt)이 항상 걸리도록 크게 준다.
   * 실제 세기는 파츠 관성이 정하므로 이 숫자 자체는 "최대로"라는 뜻이다.
   */
  endSpinDamp: 40,
  /**
   * 손/발(직접 토크를 안 받는 말단)의 자체 각감쇠. mkBody 주석 참고.
   *
   * [범위 주의] cannon의 angularDamping은 pow(1 - d, dt) 로 적용된다.
   * 1 이상을 넣으면 음수의 분수 거듭제곱이라 그 자리에서 NaN이 된다
   * (3.0을 넣었다가 첫 스텝부터 NaN 복구가 쏟아졌다). 반드시 0 <= d < 1.
   */
  endDamp: 0.85,

  // 물건 들기
  // carryTorque를 세게 주고 carryLift를 1에 가깝게 두면 "거의 무중력인 물체를
  // 뻣뻣한 스프링으로 밀어올리는" 꼴이 되어 팔이 위아래로 펄럭인다
  // (실측: 큐브가 0.53 <-> 1.57 사이를 1.5초 주기로 진동).
  // 토크는 낮추고 감쇠는 크게, 무게는 적당히 남기는 쪽이 안정적이다.
  // [주의] 팔은 매우 가볍다(위팔 0.55kg, 관성모멘트 ~0.005 kg·m²).
  // 여기에 15 N·m를 걸면 각가속도가 3000 rad/s²가 되어 한 스텝에 각속도가
  // 50 rad/s씩 붙고, 어깨 관절을 통해 몸통까지 통째로 튕겨 올린다
  // (실측: 캐리 포즈만 켜도 pelvisY가 0.86 -> 1.77로 발사됐다).
  // 위팔을 수평으로 드는 데 물리적으로 필요한 토크는
  //   위팔 0.55*18*0.09 + (아래팔+손) 0.75*18*0.25 ≈ 4 N·m 수준이다.
  carryTorque: 3.5,       // 팔을 캐리 포즈로 올리는 토크 (보조 - 그림용)
  carryDamp: 0.5,         // 캐리 포즈 각속도 감쇠 (ω*이 값이 토크 단위임을 유의)
  carryObjDamp: 0.45,     // 든 물체에 걸어두는 linearDamping (펄럭임 억제)
  carryObjAngDamp: 0.7,   // 든 물체에 걸어두는 angularDamping
  // 든 물체를 가슴 앞으로 끌어오는 위치 PD (main.ts에서 사용)
  carryDist: 0.55,        // 몸통 앞으로 얼마나 떨어진 곳에 들 것인가
  carryHeight: 0.12,      // 몸통 중심 기준 높이
  carryKp: 62,            // 위치 게인
  carryKd: 15,            // 속도 감쇠 (2*sqrt(Kp) ≈ 15.7 = 임계감쇠 근처)
  // 캐리 힘 상한은 "물체 무게의 배수"가 아니라 "캐릭터의 완력(N)" 절대값이다.
  // 무게 비례로 두면 무거울수록 힘이 세져서 28kg 냉장고를 잡는 순간
  // 캐릭터가 통째로 하늘로 발사됐다(실측 pelvisY 0.86 -> 2.29 후 넘어짐).
  //
  // [중요] 들기(수직)와 밀기(수평) 예산은 반드시 분리한다.
  // 예전엔 중력 보상(mass*g)까지 포함한 힘 벡터 하나를 300N으로 clamp했는데,
  // 무게만 504N인 냉장고는 그 예산을 이미 넘겨서 clamp가 벡터 전체를 0.6배로
  // 줄여버렸다. 남은 힘의 대부분이 수직 성분이라 수평 밀기 힘은 100N 남짓,
  // 바닥 마찰(약 200N)조차 못 이겨 "잡히는데 전혀 안 밀림" 상태가 됐다.
  //
  // 예산은 잡은 사람 수만큼 더해진다 -> "혼자면 겨우, 둘이면 제대로".
  //   냉장고 28kg(무게 504N, 마찰계수 0.4) 기준
  //     못 드는 무게이므로 수직 힘은 0, 바닥 마찰 0.4*504 = 202N을 이겨야 한다
  //     1명: 밀기 400N > 마찰 72N => 낑낑대며 밀림 (5초에 약 2.4m)
  //     2명: 들기 520N > 무게 504N => 아예 들어올려서 제대로 옮김
  carryLiftStrength: 260, // 한 명이 낼 수 있는 수직(들기) 힘 (N)
  carryPushStrength: 400, // 한 명이 낼 수 있는 수평(밀기) 힘 (N)
  // 잡고 있는 물체를 세워서 잡아주는 토크 (사람이 균형을 잡아주는 몫).
  // 없으면 키 큰 냉장고가 미는 힘과 바닥 마찰의 짝힘으로 그냥 자빠진다.
  // 관성모멘트에 곱해지는 "각가속도" 단위(rad/s^2, 1/s)라 물체 크기와 무관하다
  // 못 드는 물체를 밀 때 힘을 거는 높이 (반높이 대비 아래쪽 비율).
  // 바닥 마찰과 같은 높이에서 밀어야 물체가 안 기운다.
  pushLowRatio: 0.85,
  // 밀기 모드 속도 추종 (carry.ts). 물체가 사람 걸음의 이 비율까지 밀린다.
  pushSpeedFactor: 1.0,   // 물체가 사람 걸음과 같은 속도까지 밀린다.
                          // 0.55로 두면 사람이 물체보다 빨리 걸어 계속 들이받는다.
  pushVelGain: 10,
  // 밀기 모드에서 물체가 "팔이 닿는 거리" 안으로 따라오게 하는 보정 (1/s).
  // 속도 추종만 하면 물체가 가속하는 동안 뒤처진 간격(실측 0.24m, 뒤로 끌 땐
  // 0.6m)이 그대로 남아 손이 표면에서 떨어진다 = 다시 "허공에서 미는" 그림.
  // 위치 PD로 바꾸면 목표에 닿는 순간 힘이 죽어 교착이 생기므로(위 주석 참고),
  // 목표 "속도"에 더하는 형태로만 보정한다. 닿을 거리 안에 있으면 0이라
  // 평상시 거동은 그대로다.
  pushCatchGain: 6,
  pushCatchMax: 3.0,      // 보정으로 더할 수 있는 최대 속도 (m/s)
  // 밀기 모드에서 물체 표면을 몸통 중심에서 이만큼 떨어진 곳에 붙들어 둔다.
  // carryDist(0.55)를 그대로 쓰면 물체 중심이 1.05m 밖이라 팔(어깨에서 약
  // 0.62m)이 간신히 닿아서, 미는 동안 손이 0.24m씩 떠 있었다.
  // 몸통 반지름이 0.20이므로 0.42면 몸과 부딪히지 않으면서 손은 넉넉히 닿는다.
  pushHoldDist: 0.42,
  // 무거운 물체에 매달리는 것 방지 (carry.ts anti-hang 참고)
  antiHangK: 2600,
  antiHangMax: 900,
  antiHangDamp: 260,
  carryUprightAccel: 45,
  carryUprightDampRate: 9,
  // 무거운 걸 끌 때 다리로 버티며 내는 추가 추진력.
  // 이게 없으면 캐릭터가 물체에 매달려 끌려다니기만 한다.
  carryDragAssist: 0.75,  // 든 물체 질량을 이동 컨트롤러 질량에 더하는 비율
  carryRamp: 0.55,        // 잡은 직후 캐리 힘/제약 힘을 0->1로 올리는 시간 (스냅 방지)
  // 손이 물체 "표면"에서 이만큼 안쪽에 있어야 잡힌다. grabRadius는 물체
  // 중심까지의 거리라서 큰 물체(냉장고 2.4)는 2m 밖에서도 잡혔고, 그만큼
  // 제약 초기 오차가 커져서 잡는 순간 팔이 끌려가며 몸이 튀어올랐다.
  grabReach: 0.5,
  // 제약 maxForce 상한. 물체 무게의 6배로 두면 냉장고에서 3024N이 되어
  // 0.3kg짜리 손을 순간적으로 끌어당겨 캐릭터를 발사시킨다.
  // 상한은 "손 하나가 낼 수 있는 악력"이다. 무게 비례로 크게 두면 무거운
  // 물체를 잡는 순간 0.3kg짜리 손이 수백~수천 N으로 끌려가며 몸 전체가
  // 튀어오른다. 상한을 두면 무거운 건 그냥 손에서 미끄러진다(= 자연스러움).
  holdForceMin: 300,
  holdForceScale: 2.5,
  holdForceMax: 500,
  carryUprightBoost: 1.5, // 물건을 들었을 때 몸 세우는 토크 배율

  // ---- 잡은 지점으로 팔 뻗기 (grab reach)
  //
  // 예전엔 잡아도 팔이 "몸통 앞 고정 방향"만 바라봤고, 무거워서 못 드는 물체
  // (냉장고)에는 그 포즈조차 안 썼다. 그래서 냉장고는 제약도 없고(밀기 모드)
  // 팔도 안 뻗어서, 손이 몸 옆에 늘어진 채 물체만 밀려가는 "허공에서 원격으로
  // 잡은" 그림이 나왔다. 이제는 실제 붙잡은 지점을 향해 팔을 뻗는다.
  //
  // [주의] 팔은 매우 가볍다(위팔 0.55kg, 관성모멘트 ~0.005). 토크를 15 N·m씩
  // 주면 각가속도가 3000 rad/s²라 어깨를 통해 몸통까지 튕겨 올린다.
  // 위팔을 수평으로 드는 데 물리적으로 필요한 건 약 4 N·m이므로, 그보다
  // 조금만 세게 주고 감쇠를 크게 걸어 각속도를 묶어둔다.
  reachTorque: 6.5,       // 위팔을 잡은 지점 방향으로 돌리는 토크
  reachElbowRatio: 0.6,   // 아래팔은 그보다 약하게 (팔꿈치가 자연스럽게 따라옴)
  reachDamp: 0.9,         // 각속도 감쇠 (ω * 이 값이 토크 단위)
  // 손을 붙잡은 지점에 실제로 갖다 붙이는 스프링.
  // 밀기 모드에는 제약이 없으므로 이게 없으면 손이 절대 표면에 닿지 않는다.
  // [중요] 솔버 제약이 아니라 "힘"이다. 강체 제약으로 붙이면 무거운 물체에서
  // 물체-손-팔-몸통-지면-물체 닫힌 고리가 생겨 Gauss-Seidel이 전체를 굳혀
  // 버리지만(updateGripMode 주석 참고), 힘은 그런 교착을 만들지 않는다.
  handReachKp: 400,       // 위치 게인 (1/s²)
  handReachKd: 40,        // 속도 감쇠 (2*sqrt(400) = 임계감쇠)
  handReachMax: 60,       // 손에 걸 수 있는 힘 상한 (N)
  handReachRamp: 0.35,    // 잡은 직후 0 -> 1로 올리는 시간 (스냅 방지)

  // 넘어짐
  fallTiltDot: 0.42,      // 몸통 up벡터가 이만큼 기울면 넘어진 것으로 판단
  fallTiltTime: 0.55,     // 그 상태가 이 시간 지속되면 RAGDOLL
  impactSpeed: 13,        // 이 속도 이상 충격이면 즉시 RAGDOLL
  ragdollTime: 1.7,       // RAGDOLL 유지 시간
  recoverTime: 1.3,       // 일어나는 데 걸리는 시간 (gain 램프)
};

// ---------------------------------------------------------------- 치수
const DIM = {
  pelvis:   { rx: 0.17, mass: 5.0,  y: 0.0 },
  torso:    { r: 0.20, sep: 0.28, mass: 5.0, y: 0.42 },
  head:     { r: 0.19, mass: 1.2,  y: 0.44 },   // torso 기준
  upperArm: { r: 0.085, sep: 0.18, mass: 0.55 },
  lowerArm: { r: 0.075, sep: 0.17, mass: 0.45 },
  hand:     { r: 0.085, mass: 0.3 },
  upperLeg: { r: 0.105, sep: 0.20, mass: 1.5 },
  lowerLeg: { r: 0.09, sep: 0.20, mass: 1.1 },
  foot:     { r: 0.10, mass: 0.6 },
  shoulderX: 0.29,
  hipX: 0.14,
};

function mkBody(
  r: number, sep: number, mass: number, pos: CANNON.Vec3,
  material: CANNON.Material, group: number, mask: number,
  /**
   * 손/발처럼 직접 토크를 받지 않는 말단은 더 크게 준다.
   *
   * 이 둘은 control()이 토크를 걸지 않는데도 걷는 내내 각속도 클램프에
   * 붙어 있었다(실측: 300스텝에 손 102회, 발 144회). 부모 관절이 휘두르는
   * 것을 관성 0.0014짜리 몸이 그대로 받기 때문이다. cannon의 angularDamping은
   * pow(1-d, dt) 꼴이라 어떤 dt에서도 발산하지 않으므로, 여기에 쓰기 안전하다.
   */
  angDamp = 0.35,
): CANNON.Body {
  const b = new CANNON.Body({
    mass, position: pos.clone(), material,
    linearDamping: 0.02, angularDamping: angDamp,
    collisionFilterGroup: group, collisionFilterMask: mask,
  });
  if (sep > 0) {
    b.addShape(new CANNON.Sphere(r), new CANNON.Vec3(0, -sep / 2, 0));
    b.addShape(new CANNON.Sphere(r), new CANNON.Vec3(0,  sep / 2, 0));
  } else {
    b.addShape(new CANNON.Sphere(r));
  }
  b.updateMassProperties();
  b.allowSleep = false;
  return b;
}

/**
 * 파츠별 "겉보기 두께" 배수.
 *
 * [왜 물리 치수(DIM)를 안 건드리는가]
 * rideHeight 0.86, 관절 pivot, 총질량, 관성모멘트가 전부 DIM에서 나오고 그
 * 위에서 서기/걷기 게인이 실측으로 맞춰져 있다. 반지름을 건드리면 접지 판정도
 * 관절 여유도 같이 흔들려서 튜닝을 처음부터 다시 해야 한다.
 * 그래서 충돌체는 그대로 두고 렌더 메시만 살찌운다. 어차피 캡슐 충돌체는
 * 실루엣보다 작아도 부딪히는 느낌에 차이가 없고, 손발이 조금 파묻히는 편이
 * 오히려 "물건에 손을 얹은" 그림에 도움이 된다.
 */
interface VisScale {
  /** 반지름 배수 (굵기) */
  r: number;
  /** 캡슐 몸통 길이(sep) 배수. 구(sep=0)에는 영향 없다 */
  len: number;
  /**
   * 렌더 메시를 로컬 +Y로 이만큼 올린다 (m). 지오메트리에 구워넣으므로
   * 바디가 기울면 같이 기운다 = 머리가 목 위에 계속 얹혀 있다.
   * 물리 바디 위치는 그대로다.
   */
  up?: number;
}

/**
 * SD/치비 비율: 큰 머리 + 짧고 통통한 팔다리.
 *
 * [왜 렌더 길이를 줄여도 관절 사이가 안 벌어지는가]
 * 캡슐이 축방향으로 덮는 길이는 `sep + 2r` 이다. len으로 sep을 줄여도 r을 그
 * 이상으로 키우면 총길이가 물리 캡슐보다 길어져서, 바디 사이가 오히려 더
 * 겹친다. 실측(계산)으로 9개 파츠 전부 물리 총길이보다 렌더 총길이가 길다.
 *   예) 위팔 물리 0.18+2*0.085 = 0.35  ->  렌더 0.099+2*0.174 = 0.448
 * sep이 줄어든 만큼 원통 비중이 줄고 구 비중이 늘어서, 길쭉한 막대가 아니라
 * "짧고 뭉툭한 소시지"로 읽힌다. 이게 짧은 팔다리 인상을 만든다.
 *
 * [왜 DIM은 그대로인가]
 * rideHeight(0.86)·관절 pivot·총질량·관성모멘트가 전부 DIM에서 나오고 그 위에
 * 서기/걷기 게인이 실측으로 맞춰져 있다. 특히 다리 길이를 줄이면 골반이
 * rideHeight에 있을 때 발이 바닥에 안 닿아 캐릭터가 공중에 뜬다.
 * 그래서 골격은 건드리지 않고 렌더만 바꾼다.
 *
 * [굵기 상한 - 여기서 한 번 실패했다]
 * 처음엔 몸통 1.45 / 골반 1.80 / 팔다리 2.0배로 잡았더니 캐릭터가 갈색 기둥
 * 하나로 뭉쳐서 팔다리가 아예 안 보였다. 뼈대 위치가 고정이라 굵기에는
 * 기하학적 상한이 있다.
 *   - 다리는 hipX = ±0.14 에 있다. 반지름이 0.14를 넘으면 두 다리가 하나로
 *     합쳐진다. (upperLeg 1.24배 -> 0.130, 사이 0.020m 남음)
 *   - 팔은 shoulderX = ±0.29. 몸통 반지름이 커질수록 팔이 몸에 파묻힌다.
 *     지금은 팔 바깥면이 몸통보다 0.178m 튀어나온다.
 *   - 골반이 몸통보다 굵으면 기저귀를 찬 것처럼 보인다. 골반 ≤ 몸통으로 둔다.
 * 짧은 팔다리 인상은 굵기가 아니라 "큰 머리 + 큰 손발"이 만든다.
 */
const VIS: Record<string, VisScale> = {
  // 머리를 0.16m 올리는 이유: 물리 머리 중심이 어깨보다 0.31m밖에 안 위라,
  // 반지름 0.37짜리 머리를 그대로 두면 어깨와 상의를 통째로 덮어버린다
  // (실측: 셔츠가 0.27m짜리 띠로만 보였다). 올리면 목 없이 머리가 어깨에
  // 얹힌 치비 실루엣이 되면서 상의도 제대로 보인다.
  head:     { r: 1.95, len: 1.00, up: 0.16 },   // 머리지름 0.74m
  torso:    { r: 1.22, len: 0.85 },
  pelvis:   { r: 1.28, len: 1.00 },
  upperArm: { r: 1.55, len: 0.55 },   // 짧고 뭉툭
  lowerArm: { r: 1.62, len: 0.55 },
  hand:     { r: 2.05, len: 1.00 },   // 손은 크게 - 장난감 인형 실루엣의 핵심
  upperLeg: { r: 1.15, len: 0.86 },   // ±0.14 간격이라 이보다 굵으면 두 다리가 붙는다
  lowerLeg: { r: 1.30, len: 0.76 },
  foot:     { r: 1.62, len: 1.00 },   // 발도 크게 (신발처럼 보이게)
};

function toyMaterial(color: number): THREE.MeshStandardMaterial {
  // 플라스틱 장난감 질감: 거칠기를 낮춰 넓고 부드러운 하이라이트를 만든다.
  // metalness는 0이 아니라 아주 조금 줘야 환경맵의 반사가 살짝 얹힌다.
  return new THREE.MeshStandardMaterial({ color, roughness: 0.42, metalness: 0.05 });
}

const NO_SCALE: VisScale = { r: 1, len: 1 };

function mkMesh(r: number, sep: number, color: number, vis: VisScale = NO_SCALE): THREE.Mesh {
  // 세그먼트를 늘려 실루엣의 각을 없앤다 - 인형은 곡면이 생명이다.
  const vr = r * vis.r;
  const vsep = sep > 0 ? sep * vis.len : sep;
  const geo = sep > 0
    ? new THREE.CapsuleGeometry(vr, vsep, 8, 20)
    : new THREE.SphereGeometry(vr, 24, 16);
  if (vis.up) geo.translate(0, vis.up, 0);
  const mesh = new THREE.Mesh(geo, toyMaterial(color));
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  return mesh;
}

/**
 * 머리에 눈을 붙인다.
 *
 * 텍스처를 쓰지 않고 작은 구 두 개로만 만든다. 머리 바디가 회전하면 눈도 같이
 * 도니까 "어디를 보고 있는지"가 읽히고, 넘어지면 같이 뒤집혀서 더 웃기다.
 * 캐릭터 정면은 +Z다 (carry.ts가 몸통 forward를 (0,0,1)로 쓴다).
 */
function addFace(head: THREE.Mesh, r: number, eyeColor: number, up = 0) {
  const eyeGeo = new THREE.SphereGeometry(r * 0.19, 12, 10);
  const eyeMat = new THREE.MeshStandardMaterial({ color: eyeColor, roughness: 0.25, metalness: 0.1 });
  for (const sx of [-1, 1]) {
    const eye = new THREE.Mesh(eyeGeo, eyeMat);
    // 살짝 파묻어야(0.9배) 구 표면에 붙은 것처럼 보이고 가장자리가 안 뜬다
    eye.position.set(sx * r * 0.34, up + r * 0.10, r * 0.90);
    head.add(eye);

    // 눈동자에 얹는 하이라이트 하나. 이것만 있어도 인형 눈처럼 촉촉해 보인다.
    const dot = new THREE.Mesh(
      new THREE.SphereGeometry(r * 0.07, 8, 6),
      new THREE.MeshBasicMaterial({ color: 0xffffff })
    );
    dot.position.set(sx * r * 0.30, up + r * 0.16, r * 1.02);
    head.add(dot);
  }
}

function coneTwist(
  a: CANNON.Body, b: CANNON.Body,
  pivotA: CANNON.Vec3, pivotB: CANNON.Vec3,
  angle: number, twist: number, maxForce = 4000
) {
  return new CANNON.ConeTwistConstraint(a, b, {
    pivotA, pivotB,
    axisA: new CANNON.Vec3(0, -1, 0),
    axisB: new CANNON.Vec3(0, -1, 0),
    angle, twistAngle: twist, maxForce,
  });
}

export interface RagdollColors {
  skin: number;
  shirt: number;
  pants: number;
  /** 신발 색. 없으면 하의보다 어둡게 자동으로 만든다 */
  shoes?: number;
  /** 눈 색. 없으면 진한 갈색 */
  eye?: number;
}

/** 색을 배수만큼 어둡게/밝게 (신발 기본색 만들 때 쓴다) */
function shade(color: number, k: number): number {
  const r = Math.min(255, Math.round(((color >> 16) & 0xff) * k));
  const g = Math.min(255, Math.round(((color >> 8) & 0xff) * k));
  const b = Math.min(255, Math.round((color & 0xff) * k));
  return (r << 16) | (g << 8) | b;
}

export function createRagdoll(
  physics: CANNON.World,
  scene: THREE.Scene,
  origin: CANNON.Vec3,
  material: CANNON.Material,
  colors: RagdollColors,
  group: number,          // 이 래그돌 고유 그룹 (2, 4, 8 …)
  otherMask: number       // 충돌할 대상 마스크 (보통 GROUP_WORLD | 다른 래그돌 그룹들)
): Ragdoll {
  const parts = new Map<string, RagdollPart>();
  const bodies: CANNON.Body[] = [];
  const constraints: CANNON.Constraint[] = [];
  const g = new THREE.Group();
  scene.add(g);

  const mask = otherMask;

  function add(name: string, body: CANNON.Body, mesh: THREE.Mesh) {
    physics.addBody(body);
    g.add(mesh);
    parts.set(name, { name, body, mesh });
    bodies.push(body);
    return body;
  }

  const O = origin;

  // ---- 몸통
  const pelvis = mkBody(DIM.pelvis.rx, 0, DIM.pelvis.mass,
    new CANNON.Vec3(O.x, O.y, O.z), material, group, mask);
  add("pelvis", pelvis, mkMesh(DIM.pelvis.rx, 0, colors.pants, VIS.pelvis));

  const torsoY = O.y + DIM.torso.y;
  const torso = mkBody(DIM.torso.r, DIM.torso.sep, DIM.torso.mass,
    new CANNON.Vec3(O.x, torsoY, O.z), material, group, mask);
  add("torso", torso, mkMesh(DIM.torso.r, DIM.torso.sep, colors.shirt, VIS.torso));

  const headY = torsoY + DIM.head.y;
  const head = mkBody(DIM.head.r, 0, DIM.head.mass,
    new CANNON.Vec3(O.x, headY, O.z), material, group, mask, P.endDamp);
  const headMesh = mkMesh(DIM.head.r, 0, colors.skin, VIS.head);
  // 눈도 머리 메시와 같은 만큼 올려야 얼굴에 붙어 있는다
  addFace(headMesh, DIM.head.r * VIS.head.r, colors.eye ?? 0x3a2a22, VIS.head.up ?? 0);
  add("head", head, headMesh);

  // ---- 팔
  function arm(side: -1 | 1, L: string) {
    const sx = O.x + side * DIM.shoulderX;
    const shoulderY = torsoY + 0.13;

    const uaY = shoulderY - DIM.upperArm.sep / 2 - 0.08;
    const ua = mkBody(DIM.upperArm.r, DIM.upperArm.sep, DIM.upperArm.mass,
      new CANNON.Vec3(sx, uaY, O.z), material, group, mask);
    add("upperArm" + L, ua, mkMesh(DIM.upperArm.r, DIM.upperArm.sep, colors.shirt, VIS.upperArm));

    const laY = uaY - DIM.upperArm.sep / 2 - DIM.lowerArm.sep / 2 - 0.05;
    const la = mkBody(DIM.lowerArm.r, DIM.lowerArm.sep, DIM.lowerArm.mass,
      new CANNON.Vec3(sx, laY, O.z), material, group, mask, P.endDamp);
    add("lowerArm" + L, la, mkMesh(DIM.lowerArm.r, DIM.lowerArm.sep, colors.skin, VIS.lowerArm));

    const hY = laY - DIM.lowerArm.sep / 2 - DIM.hand.r - 0.02;
    const hand = mkBody(DIM.hand.r, 0, DIM.hand.mass,
      new CANNON.Vec3(sx, hY, O.z), material, group, mask, P.endDamp);
    add("hand" + L, hand, mkMesh(DIM.hand.r, 0, colors.skin, VIS.hand));

    // 어깨: 넓은 범위
    const sh = coneTwist(torso, ua,
      new CANNON.Vec3(side * DIM.shoulderX, 0.13, 0),
      new CANNON.Vec3(0, DIM.upperArm.sep / 2 + 0.08, 0),
      Math.PI * 0.55, Math.PI / 4, 5000);
    physics.addConstraint(sh); constraints.push(sh);

    // 팔꿈치: 좁은 범위
    const el = coneTwist(ua, la,
      new CANNON.Vec3(0, -DIM.upperArm.sep / 2 - 0.025, 0),
      new CANNON.Vec3(0,  DIM.lowerArm.sep / 2 + 0.025, 0),
      Math.PI * 0.30, Math.PI / 8, 2200);
    physics.addConstraint(el); constraints.push(el);

    // 손목
    const wr = coneTwist(la, hand,
      new CANNON.Vec3(0, -DIM.lowerArm.sep / 2 - 0.01, 0),
      new CANNON.Vec3(0,  DIM.hand.r + 0.01, 0),
      Math.PI * 0.22, Math.PI / 8, 900);
    physics.addConstraint(wr); constraints.push(wr);

    return { ua, la, hand };
  }
  const armL = arm(-1, "L");
  const armR = arm(1, "R");

  // ---- 다리
  function leg(side: -1 | 1, L: string) {
    const hx = O.x + side * DIM.hipX;
    const hipY = O.y - 0.10;

    const ulY = hipY - DIM.upperLeg.sep / 2 - 0.06;
    const ul = mkBody(DIM.upperLeg.r, DIM.upperLeg.sep, DIM.upperLeg.mass,
      new CANNON.Vec3(hx, ulY, O.z), material, group, mask);
    add("upperLeg" + L, ul, mkMesh(DIM.upperLeg.r, DIM.upperLeg.sep, colors.pants, VIS.upperLeg));

    const llY = ulY - DIM.upperLeg.sep / 2 - DIM.lowerLeg.sep / 2 - 0.05;
    const ll = mkBody(DIM.lowerLeg.r, DIM.lowerLeg.sep, DIM.lowerLeg.mass,
      new CANNON.Vec3(hx, llY, O.z), material, group, mask);
    add("lowerLeg" + L, ll, mkMesh(DIM.lowerLeg.r, DIM.lowerLeg.sep, colors.pants, VIS.lowerLeg));

    const fY = llY - DIM.lowerLeg.sep / 2 - DIM.foot.r;
    const foot = mkBody(DIM.foot.r, 0, DIM.foot.mass,
      new CANNON.Vec3(hx, fY, O.z + 0.03), material, group, mask, P.endDamp);
    // 발은 맨발(skin)이 아니라 신발. 하의보다 어두워서 실루엣 아래가 눌린다.
    add("foot" + L, foot, mkMesh(DIM.foot.r, 0, colors.shoes ?? shade(colors.pants, 0.55), VIS.foot));

    // 고관절: 넓은 범위
    const hip = coneTwist(pelvis, ul,
      new CANNON.Vec3(side * DIM.hipX, -0.10, 0),
      new CANNON.Vec3(0, DIM.upperLeg.sep / 2 + 0.06, 0),
      Math.PI * 0.42, Math.PI / 6, 9000);
    physics.addConstraint(hip); constraints.push(hip);

    // 무릎: 좁은 범위
    const knee = coneTwist(ul, ll,
      new CANNON.Vec3(0, -DIM.upperLeg.sep / 2 - 0.025, 0),
      new CANNON.Vec3(0,  DIM.lowerLeg.sep / 2 + 0.025, 0),
      Math.PI * 0.26, Math.PI / 10, 4000);
    physics.addConstraint(knee); constraints.push(knee);

    // 발목
    const ankle = coneTwist(ll, foot,
      new CANNON.Vec3(0, -DIM.lowerLeg.sep / 2 - 0.01, 0),
      new CANNON.Vec3(0,  DIM.foot.r + 0.01, 0),
      Math.PI * 0.20, Math.PI / 10, 1500);
    physics.addConstraint(ankle); constraints.push(ankle);

    return { ul, ll, foot };
  }
  const legL = leg(-1, "L");
  const legR = leg(1, "R");

  // ---- 척추 / 목
  const spine = coneTwist(pelvis, torso,
    new CANNON.Vec3(0,  DIM.torso.y / 2, 0),
    new CANNON.Vec3(0, -DIM.torso.y / 2, 0),
    Math.PI * 0.18, Math.PI / 7, 26000);
  physics.addConstraint(spine); constraints.push(spine);

  const neck = coneTwist(torso, head,
    new CANNON.Vec3(0,  DIM.head.y / 2, 0),
    new CANNON.Vec3(0, -DIM.head.y / 2, 0),
    Math.PI * 0.16, Math.PI / 6, 3000);
  physics.addConstraint(neck); constraints.push(neck);

  // ---- 초기 상대 위치 저장 (리셋용)
  const initOffsets = bodies.map((b) => b.position.vsub(pelvis.position));
  const totalMass = bodies.reduce((sum, b) => sum + b.mass, 0);

  // ---- 내부 상태
  let state: RagdollState = "ACTIVE";
  let tiltTimer = 0;
  let ragdollTimer = 0;
  let recoverTimer = 0;
  let jumpTimer = 0;
  let swingPhase = 0;
  let grounded = false;
  let guardCount = 0;
  let recoverGrace = 0; // 방금 일어난 직후 예방 안전장치를 잠깐 쉬게 함
  let carrying = 0;     // 지금 잡고 있는 물체 수 (0이면 캐리 포즈 안 씀)
  const heldBodies = new Set<CANNON.Body>();  // 접지 레이에서 제외할 물체
  let carriedMass = 0;  // 들고 있는 물체들의 총 질량 (다리 추진력 보정용)
  let handGrips: HandGrip[] = [];   // 손별로 붙잡은 지점 (팔 뻗기용)
  let reachRamp = 0;    // 잡은 뒤 경과 시간. 손 스프링을 0에서 올린다
  let leanX = 0, leanZ = 0; // 직전 프레임의 가속 요구 (몸 기울이기용)
  let intentX = 0, intentZ = 0; // 직전 프레임의 이동 입력 방향 (밀기 힘 계산용)
  let aimX = 0, aimZ = 0;       // 직전 프레임의 조준 방향 (킥이 읽는다)

  // 강한 충격 감지
  // 발/손/다리처럼 지면과 자주 접촉하는 파츠까지 검사에 포함했더니
  // 정상적인 착지·회복 동작의 충격도 "부딪힘"으로 오판해서 knockdown이
  // 반복 발동하는 문제가 실사용 중 확인됨(회복 직후 다리가 땅을 짚는
  // 순간 즉시 재차 넘어짐). 그래서 몸통·머리·골반(코어)만 검사한다.
  let spawnGrace = 1.0;
  for (const name of ["head", "torso", "pelvis"]) {
    const part = parts.get(name)!;
    part.body.addEventListener("collide", (e: { contact: CANNON.ContactEquation }) => {
      if (state !== "ACTIVE" || spawnGrace > 0 || recoverGrace > 0) return;
      const rel = Math.abs(e.contact.getImpactVelocityAlongNormal());
      if (rel > P.impactSpeed) knockdown(P.ragdollTime, `충격(${name}) rel=${rel.toFixed(1)}`);
    });
  }

  function knockdown(seconds = P.ragdollTime, reason = "unknown") {
    if (state === "RAGDOLL") return;
    console.warn(`[ragdoll] knockdown 발동! reason=${reason} state=${state}->RAGDOLL seconds=${seconds.toFixed(2)}`);
    state = "RAGDOLL";
    ragdollTimer = seconds;
    recoverTimer = 0;
    tiltTimer = 0;

    // 넘어지는 순간 몸이 이미 빠르게 움직이고 있었다면(강한 충격, 선제 안전장치 등)
    // 그 속도를 그대로 RAGDOLL에 넘기면 제어가 다 꺼진 채로 사방에 튕겨나가
    // "폭발"처럼 보인다. HFF처럼 흐물흐물 주저앉게, 과도한 속도만 깎아준다.
    const VCAP = 9, WCAP = 7;
    for (const b of bodies) {
      const s = b.velocity.length();
      if (s > VCAP) b.velocity.scale(VCAP / s, b.velocity);
      const w = b.angularVelocity.length();
      if (w > WCAP) b.angularVelocity.scale(WCAP / w, b.angularVelocity);
    }
  }

  const _up = new CANNON.Vec3(0, 1, 0);
  const _tmp = new CANNON.Vec3();
  const ray = new CANNON.Ray();
  const rayResult = new CANNON.RaycastResult();

  /** 몸통의 로컬 up이 월드 up과 얼마나 정렬됐는지 (-1 ~ 1) */
  function uprightDot(): number {
    torso.quaternion.vmult(_up, _tmp);
    return _tmp.y;
  }

  function checkGrounded(physics: CANNON.World): number {
    // 골반에서 아래로 레이 -> 지면까지 거리 (없으면 -1)
    ray.from.set(pelvis.position.x, pelvis.position.y, pelvis.position.z);
    ray.to.set(pelvis.position.x, pelvis.position.y - (P.rideHeight + P.rideRayExtra), pelvis.position.z);
    let best = -1;
    for (const b of physics.bodies) {
      if (b.collisionFilterGroup === group) continue; // 자기 몸 제외
      // 지금 손에 든 물체도 제외한다. 안 그러면 무거워서 바닥에 놓인 채로
      // 끌려오는 물체(냉장고 등)를 "지면"으로 인식해서 그 위 rideHeight만큼
      // 몸을 띄우려 든다 = 자기가 든 물건 위에 올라선 것처럼 공중부양
      // (실측: 28kg 냉장고를 잡으면 pelvisY가 0.86 -> 1.9로 떠올랐다).
      if (heldBodies.has(b)) continue;
      rayResult.reset();
      ray.intersectBody(b, rayResult);
      if (rayResult.hasHit) {
        const d = pelvis.position.y - rayResult.hitPointWorld.y;
        if (best < 0 || d < best) best = d;
      }
    }
    return best;
  }

  function applyTorque(b: CANNON.Body, t: CANNON.Vec3) {
    b.torque.x += t.x; b.torque.y += t.y; b.torque.z += t.z;
  }

  /**
   * 각속도 감쇠 토크 (-c·ω) 를 "한 스텝에 부호를 뒤집지 않는" 크기로 제한한다.
   *
   * [왜 필요한가 - 감쇠를 키웠더니 오히려 떨린 이유]
   * 여기 감쇠는 전방 오일러로 적분된다. 즉 한 스텝 뒤 각속도는
   *     ω' = ω (1 - c·dt/I)
   * 이고, r = c·dt/I 가 2를 넘으면 매 스텝 부호가 뒤집히면서 |r-1| 배씩
   * 커진다. "더 세게 잡을수록 더 심하게 떠는" 전형적인 발산이다.
   *
   * 실측한 r (dt=1/60):
   *     torso      2.96 / 2.30 / 2.96   (uprightDamp 46)
   *     pelvis     3.98 / 1.99 / 3.98
   *     upperArm   2.16 / 5.66 / 2.16   (reachDamp 0.9, 관성이 0.0026뿐)
   *     lowerArm   3.20 / 8.89 / 3.20
   * torso는 매 스텝 -1.96배라 네 스텝이면 각속도 클램프(20 rad/s)에 닿는다.
   * 그 결과가 "제자리에서 부르르 떨림 + 관절이 0.18m 벌어짐"이었다.
   * (관절 solver가 매 프레임 방향이 뒤집히는 바디들을 붙잡느라 진다)
   *
   * [고치는 방법] 감쇠 계수를 낮추면 튜닝된 느낌이 바뀐다. 대신 "이번 스텝에
   * 없앨 수 있는 각운동량"을 넘지 않도록 토크에 상한만 건다. 그러면 r은 최대
   * 1(= 한 스텝에 정확히 ω를 0으로)이 되어 절대 넘어가지 않는다. 감쇠가
   * 약해지는 게 아니라 "과하게 밀어서 반대로 튕기는 것"만 사라진다.
   *
   * 상한에 쓰는 관성은 주축 중 가장 작은 값이다. 월드 축 기준 실효 관성은
   * 어떤 방향이든 최소 주관성보다 크므로, 이 값을 쓰면 자세와 무관하게
   * 안전하다 (관성 텐서의 이차형식이 고윳값 사이에 들어간다).
   */
  function dampTorque(b: CANNON.Body, w: number, coeff: number, dt: number): number {
    const iMin = Math.min(b.inertia.x, b.inertia.y, b.inertia.z);
    const cap = (Math.abs(w) * iMin) / dt;
    const raw = -w * coeff;
    return Math.max(-cap, Math.min(cap, raw));
  }

  /**
   * "구동" 토크(감쇠가 아니라 목표를 향해 미는 쪽)의 상한.
   *
   * 한 스텝에 각속도를 maxRate 이상 밀어넣지 못하게 한다.
   *
   * [왜 감쇠를 더 넣지 않고 구동을 자르는가] dampTorque는 축마다 I/dt 만큼의
   * 예산을 쓴다. 같은 바디의 같은 축에 dampTorque를 두 번 부르면 예산이 2배가
   * 되어 r=2, 즉 다시 불안정 경계로 돌아간다. 몸통 y축은 이미 upright 블록이
   * 감쇠를 쓰고 있으므로, yaw 스프링 쪽은 감쇠를 더하는 대신 미는 힘을 자른다.
   *
   * 실측: 180도로 뒤도는 순간 yaw 스프링이 dYaw=π에서 132 N·m를 넣었고,
   * 몸통 I_y가 0.133이라 한 스텝에 16.5 rad/s가 붙어 코어가 클램프(20)에
   * 닿았다(급회전 300스텝 중 4회). maxRate로 자르면 회전은 여전히 빠르되
   * 솔버가 따라올 수 있는 범위에 머문다.
   */
  function driveCap(b: CANNON.Body, torque: number, maxRate: number, dt: number): number {
    const iMin = Math.min(b.inertia.x, b.inertia.y, b.inertia.z);
    const cap = (iMin * maxRate) / dt;
    return Math.max(-cap, Math.min(cap, torque));
  }

  /**
   * 팔다리 캡슐의 로컬 축(-Y)이 from -> to 방향을 보도록 토크를 건다.
   *
   * 캡슐은 관절 axis와 같은 -Y가 "끝" 방향이다. 목표 방향과의 cross product가
   * 회전축이 되고, 각속도 감쇠를 빼서 진동을 막는다.
   */
  const _aimCur = new CANNON.Vec3();
  function aimLimb(limb: CANNON.Body, from: CANNON.Vec3, to: CANNON.Vec3, torque: number, dt: number) {
    const dx = to.x - from.x, dy = to.y - from.y, dz = to.z - from.z;
    const len = Math.hypot(dx, dy, dz);
    if (!(len > 1e-4)) return;
    const nx = dx / len, ny = dy / len, nz = dz / len;

    _aimCur.set(0, -1, 0);
    limb.quaternion.vmult(_aimCur, _aimCur);
    const c = _aimCur;
    // 팔은 관성모멘트가 0.002 수준이라 감쇠 계수가 작아도 r이 8을 넘는다.
    // dampTorque로 상한을 걸지 않으면 여기가 가장 먼저 발산한다.
    applyTorque(limb, new CANNON.Vec3(
      (c.y * nz - c.z * ny) * torque + dampTorque(limb, limb.angularVelocity.x, P.reachDamp, dt),
      (c.z * nx - c.x * nz) * torque + dampTorque(limb, limb.angularVelocity.y, P.reachDamp, dt),
      (c.x * ny - c.y * nx) * torque + dampTorque(limb, limb.angularVelocity.z, P.reachDamp, dt)
    ));
  }

  function control(dt: number, input: RagdollInput, physics: CANNON.World) {
    jumpTimer = Math.max(0, jumpTimer - dt);
    spawnGrace = Math.max(0, spawnGrace - dt);
    recoverGrace = Math.max(0, recoverGrace - dt);

    // 선제 안전장치: 몸통/골반/머리(=코어)가 비정상적으로 빠르게 돌거나 움직이면
    // (팔다리 스윙은 정상적으로 빨라질 수 있으므로 코어만 검사) NaN이 되기 전에
    // 먼저 RAGDOLL로 전환해 부드럽게 무너지게 한다. guard()의 NaN 감지는
    // 최후 방어선이고, 이건 그 앞의 예방선이다.
    // 단, 방금 RECOVERING에서 막 일어난 직후(recoverGrace)에는 반동 속도가
    // 자연스럽게 남아있으므로 이 검사를 건너뛴다 - 안 그러면 "일어나자마자
    // 다시 넘어짐"이 무한 반복된다.
    if (state === "ACTIVE" && spawnGrace <= 0 && recoverGrace <= 0) {
      for (const name of ["torso", "pelvis", "head"]) {
        const b = parts.get(name)!.body;
        if (b.angularVelocity.length() > 34 || b.velocity.length() > 34) {
          knockdown(0.9, `선제안전장치(${name}) angVel=${b.angularVelocity.length().toFixed(1)} vel=${b.velocity.length().toFixed(1)}`);
          break;
        }
      }
    }

    const dist = checkGrounded(physics);
    grounded = dist >= 0 && dist <= P.rideHeight + 0.18;

    // ---- 상태 전이
    const up = uprightDot();
    void up;
    if (state === "ACTIVE") {
      // [recoverGrace를 함께 본다] 위의 예방 안전장치(831행)는 recoverGrace를
      // 확인하는데 이 기울어짐 검사만 빠져 있었다. 그런데 막 일어선 순간의
      // 몸통은 아직 누운 각도에 가깝다 - 실측 로그가 up=0.01/0.07/0.14/0.15로
      // 전부 fallTiltDot(0.42) 아래였다. recoverGrace(0.5초)가 끝나기 전에
      // 몸이 다 서지 못하면 fallTiltTime(0.55초)이 먼저 차서 곧바로 다시
      // 넘어졌고, 그게 반복돼 6번 연속 쓰러진 채 앞으로 못 나갔다.
      // 일어나는 중에는 "기울어져 있는 게 정상"이므로 검사를 쉰다.
      if (up < P.fallTiltDot && spawnGrace <= 0 && recoverGrace <= 0) {
        tiltTimer += dt;
        if (tiltTimer > P.fallTiltTime) knockdown(P.ragdollTime, `기울어짐 up=${up.toFixed(2)}`);
      } else {
        tiltTimer = 0;
      }
    } else if (state === "RAGDOLL") {
      ragdollTimer -= dt;
      if (ragdollTimer <= 0) {
        console.warn(`[ragdoll] RAGDOLL -> RECOVERING`);
        state = "RECOVERING";
        recoverTimer = P.recoverTime;
      }
    } else if (state === "RECOVERING") {
      recoverTimer -= dt;
      if (recoverTimer <= 0) {
        console.warn(`[ragdoll] RECOVERING -> ACTIVE`);
        state = "ACTIVE";
        tiltTimer = 0;
        // [0.5 -> 0.9] 기울어짐 검사가 이 유예를 함께 보게 되었으니, 유예는
        // fallTiltTime(0.55)보다 길어야 의미가 있다. 0.5로 두면 유예가 풀린
        // 직후 타이머가 차서 결국 같은 루프가 남는다.
        recoverGrace = 0.9;
        // 일어나는 순간의 반동 속도가 그대로 남아있으면 방금 서자마자
        // "너무 빠르다"고 오판해서 예방 안전장치가 즉시 재발동 -> 무한 루프에 빠진다.
        for (const b of bodies) {
          b.velocity.scale(0.35, b.velocity);
          b.angularVelocity.scale(0.35, b.angularVelocity);
        }
      }
    }

    // RAGDOLL이면 아무 제어도 하지 않는다 (완전히 축 늘어짐)
    if (state === "RAGDOLL") return;

    // RECOVERING이면 gain을 0 -> 1로 램프 (버둥거리며 일어남)
    const gain = state === "RECOVERING"
      ? 1 - Math.max(0, recoverTimer) / P.recoverTime
      : 1;

    // ---- 1. ride-height spring (서 있기)
    // 스프링은 골반뿐 아니라 몸 전체(constraint로 매달린 파츠 포함)를 들어야 한다.
    // 따라서 중력 보상 feedforward를 먼저 넣고, 그 위에 PD 보정을 얹는다.
    //
    // 주의: 오차를 제한하지 않으면 쓰러졌을 때 err가 커져서 몸을 하늘로 쏘아올린다.
    // 이건 "다리"지 "로켓"이 아니므로 서스펜션처럼 좁은 범위에서만 작동해야 한다.
    // 또 누워 있을 때는 다리가 지면을 못 짚으므로 스프링을 끈다.
    // (일어나는 건 upright torque의 몫)
    //
    // [중요] 예전엔 이 게이트가 `pelvis.velocity.y < 2.0`(순수 속도 기준)이었다.
    // 그런데 스프링 자체가 err를 최대로 밀어붙이면(최대 563N, 5kg 골반 기준
    // ~113 m/s^2) 한 스텝만에 vy가 2를 넘겨버리고, 그 순간 이 조건이 꺼지면서
    // 감쇠항(vy*rideDamp)까지 통째로 사라진다. 그러면 아무것도 과슈트를 붙잡지
    // 못한 채 관성으로 계속 솟구치다가 vy가 다시 2 밑으로 떨어지는 순간 또
    // 최대출력 킥이 들어간다 - 스프링이 아니라 "퐁퐁 망치"가 되어 착지 순간
    // 다리 관절을 통해 채찍처럼 튕겨나가는 원인이었다(실측: footY가 순간
    // 1.5m까지 튀고 torso 각속도가 안전상한 20rad/s에 반복적으로 부딪힘).
    // 실제로 위로 솟구쳐야 하는 유일한 정상 상황은 "점프 직후"뿐이므로,
    // 순수 속도 대신 jumpTimer(점프 쿨다운 중)로만 게이트한다. 이러면
    // 감쇠항은 착지/과슈트 상황에서도 계속 살아있어 스프링이 실제로 감쇠하며
    // 정착한다.
    const upDot = up;
    if (dist >= 0 && dist < P.rideHeight + 0.12 && upDot > 0.35 && jumpTimer <= 0) {
      const gMag = Math.abs(physics.gravity.y);
      const weight = totalMass * gMag;
      const rawErr = P.rideHeight - dist;
      const err = Math.max(-0.15, Math.min(0.22, rawErr));
      const vy = pelvis.velocity.y;
      // 다리가 얼마나 똑바로 섰는지에 비례해서 지지력을 낸다
      const support = Math.min(1, (upDot - 0.35) / 0.4);
      const f = (weight + err * P.rideSpring - vy * P.rideDamp) * gain * support;
      if (Number.isFinite(f)) {
        const clamped = Math.max(-weight * 0.4, Math.min(weight * 1.55, f));
        // [중요] cannon-es의 applyForce(force, point)에서 point는 "무게중심
        // 기준 상대 오프셋"이지 월드 좌표가 아니다. 예전엔 여기 pelvis.position
        // (월드 절대좌표)을 그대로 넘겼는데, 그러면 내부에서 point×force로
        // 가짜 토크가 생기고 그 크기가 캐릭터의 원점으로부터의 거리에
        // 비례해버린다. 그래서 원점(0,0,0) 근처 스폰/헤드리스 테스트에서는
        // 우연히 토크가 0에 가까워 멀쩡했지만, 실제 스폰 위치((-2,*,5) 등
        // 원점에서 떨어진 곳)에서는 골반에 순간 수백~수천 N·m의 가짜 토크가
        // 걸려 다리가 채찍처럼 튕겨나가고 착지 직후 서지 못하는 근본 원인이었다
        // (실측: pelvis force 최대 563N에서 x=-2,z=5 스폰 시 가짜 토크
        // (-2818, 0, -1127) N·m 발생 - 5kg 골반 기준 폭발적 회전).
        // 무게중심을 통과하는 순수 힘이므로 상대 오프셋은 항상 0이어야
        // 한다 - 인자를 생략하면 cannon-es가 기본값 (0,0,0)을 쓴다.
        pelvis.applyForce(new CANNON.Vec3(0, clamped, 0));
      }
    }

    // ---- 2. upright torque (몸통 세우기)
    // 현재 up 벡터를 목표 up으로 되돌리는 회전축 = cross(currentUp, targetUp).
    //
    // 예전엔 목표가 항상 월드 up(0,1,0)으로 고정이라 달리든 멈추든 몸이
    // 꼿꼿하게 서 있었다 - 이게 "뻣뻣하다"는 인상의 큰 부분이었다.
    // 이제 직전 프레임의 가속 요구(leanX/leanZ)만큼 목표 up을 진행 방향으로
    // 기울인다. 출발할 땐 앞으로 기울고, 멈출 땐 뒤로 젖혀지며 버틴다.
    // (기울기는 P.leanAmount로 제한 - 넘어질 정도로 기울면 안 된다)
    // 물건을 들고 있으면 그 무게가 이미 몸을 앞으로 당기므로 기울임을 줄인다.
    // (안 줄이면 캐리 하중 + 기울임이 겹쳐서 걷다가 앞으로 고꾸라진다 -
    //  실측: 4kg을 들고 걸을 때 up이 0.46까지 떨어져 넘어지기 직전이었다)
    const leanScale = carrying > 0 ? 0.35 : 1;
    const leanMag = Math.hypot(leanX, leanZ);
    let tux = 0, tuz = 0;
    if (leanMag > 0.001 && grounded) {
      const l = Math.min(1, leanMag) * P.leanAmount * leanScale;
      tux = (leanX / leanMag) * l;
      tuz = (leanZ / leanMag) * l;
    }
    // 목표 up 벡터 정규화
    const tuLen = Math.hypot(tux, 1, tuz);
    const tUx = tux / tuLen, tUy = 1 / tuLen, tUz = tuz / tuLen;

    // cross(a, t) = (a.y*t.z - a.z*t.y, a.z*t.x - a.x*t.z, a.x*t.y - a.y*t.x)
    torso.quaternion.vmult(_up, _tmp);
    // 물건을 들면 앞쪽 하중 때문에 몸이 계속 앞으로 당겨지므로 세우는 힘을 키운다
    const tq = P.uprightTorque * gain * (carrying > 0 ? P.carryUprightBoost : 1);
    applyTorque(torso, new CANNON.Vec3(
      (_tmp.y * tUz - _tmp.z * tUy) * tq + dampTorque(torso, torso.angularVelocity.x, P.uprightDamp, dt),
      dampTorque(torso, torso.angularVelocity.y, P.uprightDamp * 0.4, dt),
      (_tmp.x * tUy - _tmp.y * tUx) * tq + dampTorque(torso, torso.angularVelocity.z, P.uprightDamp, dt)
    ));
    // 골반도 약하게 같은 방식으로
    pelvis.quaternion.vmult(_up, _tmp);
    applyTorque(pelvis, new CANNON.Vec3(
      (_tmp.y * tUz - _tmp.z * tUy) * tq * 0.6 + dampTorque(pelvis, pelvis.angularVelocity.x, P.uprightDamp * 0.5, dt),
      dampTorque(pelvis, pelvis.angularVelocity.y, P.uprightDamp * 0.25, dt),
      (_tmp.x * tUy - _tmp.y * tUx) * tq * 0.6 + dampTorque(pelvis, pelvis.angularVelocity.z, P.uprightDamp * 0.5, dt)
    ));

    // ---- 3. 이동 (목표 속도 추종 방식)
    //
    // 예전 방식은 "입력이 있으면 moveForce(900N)를 그대로 때려넣고, 속도가
    // maxSpeed에 가까워지면 speedScale로 줄인다"였다. 이건 두 가지 이유로
    // 뻣뻣하게 느껴졌다:
    //  1) 정지 상태에서 오차가 최대라 첫 프레임부터 최대 힘이 들어간다.
    //     실측: W를 누른 순간 0.08초 만에 0 -> 3.7 m/s. 가속감 없이 순간이동.
    //  2) speedScale(감속)과 아래 하드 속도 클램프가 서로 싸우면서 속도가
    //     5.0~6.2 사이를 계속 오르내렸다(±0.5m/s 헌팅) = 덜덜거림.
    //
    // 대신 "목표 속도와의 오차에 비례하는 힘"(속도 P제어)로 바꾼다.
    // 오차가 클 때만 힘이 크고 목표에 가까워지면 저절로 0으로 수렴하므로
    // 가속/감속이 자연스럽게 ease-in/ease-out 되고 헌팅도 사라진다.
    // 입력이 없을 때는 목표속도 0 = 제동이므로 별도 브레이크 코드도 필요 없다.
    const vx = pelvis.velocity.x, vz = pelvis.velocity.z;
    const spd = Math.hypot(vx, vz);
    const mLen = Math.hypot(input.moveX, input.moveZ);
    const moving = mLen > 0.01;
    const dx = moving ? input.moveX / mLen : 0;
    const dz = moving ? input.moveZ / mLen : 0;
    intentX = dx; intentZ = dz;

    // 조준 방향 기억. 이동과 달리 "입력이 없으면 0"이 아니라 마지막 값을
    // 유지한다 - 마우스를 안 움직이는 동안에도 보고 있는 쪽은 그대로다.
    {
      const ax = input.aimX ?? 0, az = input.aimZ ?? 0;
      const aLen = Math.hypot(ax, az);
      if (aLen > 0.01) { aimX = ax / aLen; aimZ = az / aLen; }
    }

    if (grounded || moving) {
      // 목표 속도 (입력 없으면 0 = 제자리 정지)
      const tvx = dx * P.maxSpeed;
      const tvz = dz * P.maxSpeed;
      const evx = tvx - vx, evz = tvz - vz;

      // 몸 전체(totalMass)를 끌고 가야 하므로 pelvis.mass가 아니라 totalMass 기준.
      // 무거운 걸 들고/끌고 있으면 그 질량까지 움직여야 하므로 다리로 더 버틴다.
      // (이게 없으면 캐릭터가 물체에 매달려 끌려다니기만 한다)
      const dragMass = totalMass + carriedMass * P.carryDragAssist;
      const massK = dragMass / totalMass;
      const airK = grounded ? 1 : P.airForceRatio;
      const k = P.moveAccel * dragMass * airK * gain * (moving ? 1 : P.brakeRatio);
      let fx = evx * k, fz = evz * k;
      const fm = Math.hypot(fx, fz);
      const fCap = P.moveForce * massK * airK * gain;
      if (fm > fCap) { fx = (fx / fm) * fCap; fz = (fz / fm) * fCap; }

      // (point 인자는 무게중심 기준 상대 오프셋이라 생략 = 순수 병진력.
      //  ride-height spring 주석 참고)
      pelvis.applyForce(new CANNON.Vec3(fx, 0, fz));
      // 상체도 살짝 밀어서 몸이 먼저 기울며 나가게
      torso.applyForce(new CANNON.Vec3(fx * 0.22, 0, fz * 0.22));
      // 가속 방향으로 몸을 기울이려고 이 프레임의 가속 요구를 기억해 둔다
      leanX = fx / Math.max(1, fCap);
      leanZ = fz / Math.max(1, fCap);
    } else {
      leanX = 0; leanZ = 0;
    }

    // ---- 이동 방향으로 몸 돌리기 (yaw 스프링)
    //
    // [서 있을 때는 돌리지 않는다] 한때 정지 중에도 조준 방향(카메라 정면)으로
    // 몸을 돌리게 해봤는데, 이 스프링에는 자체 감쇠항이 없고 몸통 y축 감쇠는
    // dampTorque 상한(= I/dt)에 걸려 있어서 둘이 균형을 이루지 못했다.
    // 실측: 가만히 선 채로 정상상태 각속도가 0.18 -> 4.37 rad/s 로 올라가는
    // 리밋 사이클이 남았다(몸이 계속 좌우로 돌았다). 조준이 필요한 동작은
    // 몸통 방향이 아니라 rag.aimX/aimZ 를 직접 읽으므로(ball.ts aiming())
    // 여기서 몸을 돌리지 않아도 킥은 정확히 보는 쪽으로 나간다.
    if (moving) {
      const targetYaw = Math.atan2(dx, dz);
      const fwd = new CANNON.Vec3(0, 0, 1);
      torso.quaternion.vmult(fwd, fwd);
      const curYaw = Math.atan2(fwd.x, fwd.z);
      let dYaw = targetYaw - curYaw;
      while (dYaw > Math.PI) dYaw -= Math.PI * 2;
      while (dYaw < -Math.PI) dYaw += Math.PI * 2;
      applyTorque(torso, new CANNON.Vec3(
        0, driveCap(torso, dYaw * P.yawTorque * gain, P.yawMaxRate, dt), 0));
    }

    // ---- 4. 걸음걸이 (procedural)
    // 예전엔 위상이 dt * swingSpeed로 "속도와 무관하게 항상 같은 박자"로
    // 돌았고 진폭도 고정이었다. 그래서 실제 이동 속도와 보폭이 안 맞아
    // 발이 땅에서 미끄러지는(스케이팅) 어색한 그림이 나왔다.
    // 이제 케이던스와 진폭 모두 실제 수평 속도에 비례시킨다 - 느리면 살살,
    // 빠르면 크고 빠르게 젓는다. 멈추면 저절로 0이 되어 다리가 가만히 선다.
    if (grounded && spd > 0.15) {
      const speedFrac = Math.min(1, spd / (P.maxSpeed * 0.75));
      swingPhase += dt * P.swingSpeed * (0.35 + 0.65 * speedFrac);
      const s = Math.sin(swingPhase);
      // 스윙 축은 "실제 진행 방향" 기준 (입력이 끊겨 미끄러지는 중에도 자연스럽게)
      const hx = spd > 0.01 ? vx / spd : dx;
      const hz = spd > 0.01 ? vz / spd : dz;
      // [감쇠가 빠져 있었다] 이 스윙은 "열린 루프 구동"이다 - 목표 자세가 없고
      // sin 위상에 맞춰 토크만 넣는다. 그런데 aimLimb(reachDamp)이나 캐리
      // 포즈(carryDamp)와 달리 여기에는 감쇠항이 없어서, 넣은 각운동량을
      // 아무것도 빼내지 않았다. 팔다리 관성은 0.002~0.026 수준이라 legSwing
      // 17 N·m 한 스텝이면 각속도가 25 rad/s씩 붙는다. 그 결과 걷는 내내
      // 아래팔/아래다리/손/발이 안전 클램프(20 rad/s)에 붙어 있었고
      // (실측: 300스텝 동안 말단 포화 550회), 관절이 최대 0.107m 벌어졌다.
      // dampTorque는 "이번 스텝에 없앨 수 있는 각운동량"을 넘지 않으므로
      // 스윙 진폭을 죽이지 않으면서 폭주만 막는다.
      const swingDamp = (b: CANNON.Body, ax: number, az: number, t: number) =>
        applyTorque(b, new CANNON.Vec3(
          ax * t + dampTorque(b, b.angularVelocity.x, P.swingDamp, dt),
          dampTorque(b, b.angularVelocity.y, P.swingDamp, dt),
          az * t + dampTorque(b, b.angularVelocity.z, P.swingDamp, dt),
        ));

      const swing = P.legSwing * gain * speedFrac;
      // 다리: 좌우 반대 위상
      swingDamp(legL.ul, hz * s, -hx * s, swing);
      swingDamp(legR.ul, -hz * s, hx * s, swing);
      // 무릎도 약하게 접었다 폈다 (한쪽만 접히도록 위상 90도 차이)
      const kneeSwing = P.kneeSwing * gain * speedFrac;
      const sk = Math.sin(swingPhase - Math.PI / 2);
      swingDamp(legL.ll, hz * sk, -hx * sk, kneeSwing);
      swingDamp(legR.ll, -hz * sk, hx * sk, kneeSwing);
      // 팔: 다리와 반대 (물건 들고 있을 땐 팔은 캐리 포즈가 우선이므로 생략)
      if (carrying === 0) {
        const aswing = P.armSwing * gain * speedFrac;
        swingDamp(armL.ua, -hz * s, hx * s, aswing);
        swingDamp(armR.ua, hz * s, -hx * s, aswing);
      }
    }

    // ---- 4a. 말단(손/발) 회전 안정화
    //
    // [왜 body.angularDamping으로는 안 됐나]
    // 손/발에 angularDamping 0.85를 걸어뒀는데도 달릴 때 각속도 클램프(20 rad/s)에
    // 계속 닿았다(실측: 직진 600스텝에 발 78회, 손 38회). cannon의 angularDamping은
    // 스텝당이 아니라 "초당" 계수라서, pow(1-0.85, 1/60) = 0.969 즉 한 스텝에
    // 3%밖에 안 줄인다. 관절이 매 스텝 채워 넣는 각운동량을 따라잡지 못한다.
    //
    // 손과 발은 control()이 토크를 전혀 주지 않는 순수 말단이다. 부모(아래팔/
    // 아래다리)가 스윙할 때 관절을 통해 휘둘리는 것이 전부다. 그래서 여기서
    // 명시적으로 감쇠 토크를 걸어준다. dampTorque가 "이번 스텝에 없앨 수 있는
    // 각운동량"을 넘지 않으므로 과하게 걸어도 발산하지 않고, 계수를 크게 줘서
    // 상한(= I/dt)이 항상 걸리게 한다 = 안정 범위에서 낼 수 있는 최대 감쇠.
    //
    // 넘어져 있을 때는 이 코드가 아예 안 돈다(control()이 RAGDOLL에서 먼저
    // 빠져나간다). 그래서 코믹한 널브러짐은 그대로 남는다.
    for (const end of [armL.hand, armR.hand, legL.foot, legR.foot]) {
      applyTorque(end, new CANNON.Vec3(
        dampTorque(end, end.angularVelocity.x, P.endSpinDamp, dt),
        dampTorque(end, end.angularVelocity.y, P.endSpinDamp, dt),
        dampTorque(end, end.angularVelocity.z, P.endSpinDamp, dt),
      ));
    }

    // ---- 4b. 캐리 포즈 (물건을 들고 있을 때 팔을 들어올린다)
    //
    // grab은 손과 물체를 PointToPointConstraint로 묶기만 할 뿐, 팔을 드는
    // 힘은 어디에도 없었다. 손(0.3kg) + 아래팔(0.45) + 위팔(0.55) = 1.3kg짜리
    // 팔에 4kg(냉장고는 28kg)짜리 물체를 매달아 놓으면 당연히 축 늘어진다.
    // 실측: 잡아도 큐브가 y=0.53(바닥 0.4)에서 끌려다니고 팔이 골반보다
    // 아래로 처졌다 = "무거워서 안 들림".
    //
    // 그래서 들고 있는 동안엔 팔을 "앞으로 든" 목표 자세로 능동 구동한다.
    // (실제 무게 상쇄는 main.ts에서 물체에 반중력을 걸어 처리 - 여기서는
    //  자세만 만든다)
    // 들 수 없는(무거운) 물체에는 캐리 포즈를 쓰지 않는다.
    // 팔을 들어올리려는 토크가 걸리는데 물체가 꿈쩍도 안 하면, 대신 몸이 딸려
    // 올라가서 캐릭터가 냉장고에 턱걸이를 해버린다(실측: pelvisY 0.86 -> 1.04
    // 고착, 접지를 잃어 다리 힘을 못 쓰고 결국 아무것도 못 밈).
    // 무거운 건 그냥 붙잡고 버티는 게 맞다.
    const liftableHeld = carriedMass * Math.abs(physics.gravity.y) <= P.carryLiftStrength;

    // ---- 4b-1. 잡은 지점으로 팔 뻗기
    //
    // 실제로 붙잡은 점(main.ts가 물체 로컬 좌표로 들고 있다가 매 프레임 월드로
    // 변환해서 넘겨준다)을 향해 어깨-팔꿈치를 겨눈다. 무게와 무관하게 항상
    // 쓴다 - 무거워서 못 드는 물체일수록 오히려 "붙잡고 버티는" 그림이 중요하다.
    // 위쪽으로 매달리는 문제는 carry.ts의 anti-hang이 따로 누르고 있고, 잡는
    // 지점은 대개 어깨보다 아래라 여기서 위로 뜰 일도 거의 없다.
    if (handGrips.length > 0 && state === "ACTIVE") {
      reachRamp += dt;
      const k = Math.min(1, reachRamp / P.handReachRamp) * gain;

      const gy = Math.abs(physics.gravity.y);

      for (const grip of handGrips) {
        const side = grip.hand === armL.hand ? -1 : 1;
        const limb = side < 0 ? armL : armR;

        // 팔의 무게를 상쇄한다 (feed-forward).
        //
        // 이게 없으면 뻗기 토크가 팔 무게와 싸워야 한다. 팔 1.3kg이 어깨에서
        // 약 0.3m 떨어져 매달리면 중력 토크만 7 N·m라, 안전한 범위의 뻗기
        // 토크(6.5)로는 팔이 아예 안 올라간다. 그렇다고 토크를 15까지 올리면
        // 관성모멘트가 0.005뿐인 위팔에 각가속도 3000 rad/s²가 걸려 어깨를
        // 통해 몸이 튄다(P.carryTorque 주석 참고). 무게를 지워주면 작은
        // 토크로도 자세가 잡힌다.
        // 반작용은 몸통에 되돌려서 캐릭터가 자기 팔로 떠오르지 않게 한다.
        let comp = 0;
        for (const b of [limb.ua, limb.la, grip.hand]) {
          const f = b.mass * gy * k;
          b.applyForce(new CANNON.Vec3(0, f, 0));
          comp += f;
        }
        torso.applyForce(new CANNON.Vec3(0, -comp, 0));

        // 어깨 월드 위치 (관절 pivotA와 같은 지점)
        const sh = new CANNON.Vec3(side * DIM.shoulderX, 0.13, 0);
        torso.quaternion.vmult(sh, sh);
        sh.vadd(torso.position, sh);

        // 위팔: 어깨 -> 목표 방향
        aimLimb(limb.ua, sh, grip.target, P.reachTorque * k, dt);

        // 아래팔: 팔꿈치 -> 목표 방향 (팔꿈치가 자연스럽게 펴진다)
        const el = new CANNON.Vec3(0, -DIM.upperArm.sep / 2 - 0.025, 0);
        limb.ua.quaternion.vmult(el, el);
        el.vadd(limb.ua.position, el);
        aimLimb(limb.la, el, grip.target, P.reachTorque * P.reachElbowRatio * k, dt);

        // 손을 목표 지점에 붙여둔다 (위치 PD, 상한 있음).
        // 반작용은 몸통에 되돌려서 허공에서 운동량이 생기지 않게 한다 -
        // 팔은 몸에 달려 있으므로 이게 물리적으로도 맞다.
        const err = grip.target.vsub(grip.hand.position);
        const tv = grip.targetVel;
        const rvx = grip.hand.velocity.x - (tv ? tv.x : 0);
        const rvy = grip.hand.velocity.y - (tv ? tv.y : 0);
        const rvz = grip.hand.velocity.z - (tv ? tv.z : 0);
        const fx = (err.x * P.handReachKp - rvx * P.handReachKd) * grip.hand.mass;
        const fy = (err.y * P.handReachKp - rvy * P.handReachKd) * grip.hand.mass;
        const fz = (err.z * P.handReachKp - rvz * P.handReachKd) * grip.hand.mass;
        const fm = Math.hypot(fx, fy, fz);
        const s = (fm > P.handReachMax ? P.handReachMax / fm : 1) * k;
        const f = new CANNON.Vec3(fx * s, fy * s, fz * s);
        if (Number.isFinite(f.x) && Number.isFinite(f.y) && Number.isFinite(f.z)) {
          grip.hand.applyForce(f);
          torso.applyForce(new CANNON.Vec3(-f.x, -f.y, -f.z));
        }
      }
    }

    // ---- 4b-2. 캐리 포즈 (가벼운 물체를 가슴 앞에 받쳐 든 그림)
    // 뻗기와 달리 이건 "받치는" 자세라 들 수 있는 물체일 때만 쓴다.
    if (carrying > 0 && liftableHeld) {
      // 몸통 기준 앞쪽 + 약간 위를 향하는 목표 방향
      const fwd = new CANNON.Vec3(0, 0, 1);
      torso.quaternion.vmult(fwd, fwd);
      // 팔 캡슐의 로컬 축은 -Y(관절 axis와 동일). 이 축이 앞을 보게 만든다.
      const tx = fwd.x * 0.86, ty = -0.5, tz = fwd.z * 0.86;
      const tl = Math.hypot(tx, ty, tz);
      const nx = tx / tl, ny = ty / tl, nz = tz / tl;
      const ct = P.carryTorque * gain;
      for (const ua of [armL.ua, armR.ua]) {
        // 현재 팔 방향 = quaternion * (0,-1,0)
        const cur = new CANNON.Vec3(0, -1, 0);
        ua.quaternion.vmult(cur, cur);
        // torque = cross(cur, target) * k - angVel * damp
        applyTorque(ua, new CANNON.Vec3(
          (cur.y * nz - cur.z * ny) * ct + dampTorque(ua, ua.angularVelocity.x, P.carryDamp, dt),
          (cur.z * nx - cur.x * nz) * ct + dampTorque(ua, ua.angularVelocity.y, P.carryDamp, dt),
          (cur.x * ny - cur.y * nx) * ct + dampTorque(ua, ua.angularVelocity.z, P.carryDamp, dt)
        ));
      }
      // 아래팔은 팔꿈치를 살짝 굽혀 물체를 몸쪽으로 받친다
      const et = P.carryTorque * 0.55 * gain;
      for (const la of [armL.la, armR.la]) {
        const cur = new CANNON.Vec3(0, -1, 0);
        la.quaternion.vmult(cur, cur);
        applyTorque(la, new CANNON.Vec3(
          (cur.y * nz - cur.z * ny) * et + dampTorque(la, la.angularVelocity.x, P.carryDamp, dt),
          (cur.z * nx - cur.x * nz) * et + dampTorque(la, la.angularVelocity.y, P.carryDamp, dt),
          (cur.x * ny - cur.y * nx) * et + dampTorque(la, la.angularVelocity.z, P.carryDamp, dt)
        ));
      }
    }

    // ---- 5. 점프
    if (input.jump && grounded && jumpTimer <= 0 && state === "ACTIVE") {
      jumpTimer = P.jumpCooldown;
      pelvis.applyImpulse(new CANNON.Vec3(0, P.jumpImpulse, 0));
      torso.applyImpulse(new CANNON.Vec3(0, P.jumpImpulse * 0.25, 0));
      // 다리 접힘 느낌
      legL.ul.applyImpulse(new CANNON.Vec3(0, -2, 1.5));
      legR.ul.applyImpulse(new CANNON.Vec3(0, -2, 1.5));
    }
    // ---- 6. 안정화
    // 강한 토크(upright/swing)와 관절 solver가 상호작용하면서 에너지가 주입되어
    // 캐릭터가 튀어오르거나 과속하는 경우가 있다. 물리적 재미는 유지하되
    // "발사"는 막기 위해 접지 상태에서 속도 상한을 건다.
    {
      const vx = pelvis.velocity.x, vz = pelvis.velocity.z;
      const hs = Math.hypot(vx, vz);
      const hCap = P.maxSpeed * 1.3;
      if (hs > hCap) {
        pelvis.velocity.x = (vx / hs) * hCap;
        pelvis.velocity.z = (vz / hs) * hCap;
      }
      // 점프 직후가 아닌데 위로 솟구치면 억제
      if (jumpTimer <= 0 && pelvis.velocity.y > 6.5) pelvis.velocity.y = 6.5;
    }
  }

  function guard(): boolean {
    let recovered = false;
    for (const b of bodies) {
      const p = b.position, v = b.velocity, a = b.angularVelocity, q = b.quaternion;
      const bad =
        !Number.isFinite(p.x) || !Number.isFinite(p.y) || !Number.isFinite(p.z) ||
        !Number.isFinite(v.x) || !Number.isFinite(v.y) || !Number.isFinite(v.z) ||
        !Number.isFinite(a.x) || !Number.isFinite(a.y) || !Number.isFinite(a.z) ||
        !Number.isFinite(q.x) || !Number.isFinite(q.y) || !Number.isFinite(q.z) || !Number.isFinite(q.w) ||
        p.y < -25 || p.y > 45 ||
        Math.abs(p.x) > 400 || Math.abs(p.z) > 400;   // 맵 밖으로 날아간 경우도 복구
      if (bad) { recovered = true; break; }
    }
    if (recovered) {
      guardCount++;
      console.warn(`[ragdoll] NaN/이탈 감지 -> 복구 (#${guardCount})`);
      const safe = new CANNON.Vec3(
        Number.isFinite(pelvis.position.x) ? pelvis.position.x : 0,
        3,
        Number.isFinite(pelvis.position.z) ? pelvis.position.z : 0
      );
      reset(safe);
      return true;
    }
    // 속도 상한
    for (const b of bodies) {
      const s = b.velocity.length();
      if (s > 40) b.velocity.scale(40 / s, b.velocity);
      const w = b.angularVelocity.length();
      if (w > 20) b.angularVelocity.scale(20 / w, b.angularVelocity);
    }
    return false;
  }

  function reset(pos: CANNON.Vec3) {
    bodies.forEach((b, i) => {
      const off = initOffsets[i];
      b.type = CANNON.Body.DYNAMIC;
      b.position.set(pos.x + off.x, pos.y + off.y, pos.z + off.z);
      b.velocity.setZero();
      b.angularVelocity.setZero();
      b.quaternion.set(0, 0, 0, 1);
      b.force.setZero();
      b.torque.setZero();
      b.updateMassProperties();
      b.wakeUp();
    });
    state = "ACTIVE";
    tiltTimer = 0; ragdollTimer = 0; recoverTimer = 0;
    spawnGrace = 1.0;
    recoverGrace = 0;
  }

  const rag: Ragdoll = {
    parts, bodies, constraints, group: g,
    pelvis, torso,
    handL: armL.hand, handR: armR.hand,
    get state() { return state; },
    get grounded() { return grounded; },
    /** 보행 주기 위상 (rad). 발소리를 보폭에 맞추는 데 쓴다 - 읽기 전용 */
    get swingPhase() { return swingPhase; },
    get aimX() { return aimX; },
    get aimZ() { return aimZ; },
    get intentX() { return intentX; },
    get intentZ() { return intentZ; },
    control,
    sync() {
      for (const p of parts.values()) {
        p.mesh.position.set(p.body.position.x, p.body.position.y, p.body.position.z);
        p.mesh.quaternion.set(
          p.body.quaternion.x, p.body.quaternion.y,
          p.body.quaternion.z, p.body.quaternion.w
        );
      }
    },
    knockdown,
    setNetState(st: RagdollState) { state = st; },
    setHeld(bodies: CANNON.Body[], grips: HandGrip[] = []) {
      carrying = bodies.length;
      heldBodies.clear();
      carriedMass = 0;
      for (const b of bodies) { heldBodies.add(b); carriedMass += b.mass; }
      // 놓았다가 다시 잡으면 손 스프링을 다시 0부터 올린다 (스냅 방지)
      if (grips.length === 0) reachRamp = 0;
      handGrips = grips;
    },
    reset,
    guard,
    dispose(w: CANNON.World, s: THREE.Scene) {
      for (const c of constraints) w.removeConstraint(c);
      for (const b of bodies) w.removeBody(b);
      s.remove(g);
      // 파츠마다 지오메트리/머티리얼을 새로 만들고 머리에는 눈까지 자식으로
      // 붙어 있으므로, 씬에서 떼는 것만으로는 GPU 자원이 안 풀린다.
      // (사람이 들락날락하는 방에서는 이게 계속 쌓인다)
      g.traverse((o) => {
        const m = o as THREE.Mesh;
        if (!m.isMesh) return;
        m.geometry.dispose();
        const mat = m.material;
        if (Array.isArray(mat)) for (const x of mat) x.dispose();
        else mat.dispose();
      });
    },
  } as Ragdoll;

  return rag;
}
