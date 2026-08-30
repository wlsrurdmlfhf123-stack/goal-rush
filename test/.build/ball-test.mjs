// test/ball-test.ts
import * as THREE2 from "three";
import * as CANNON4 from "cannon-es";

// client/src/ragdoll.ts
import * as THREE from "three";
import * as CANNON from "cannon-es";
var GROUP_WORLD = 1;
var P = {
  // 서 있기
  rideHeight: 0.86,
  // 골반이 지면에서 유지하려는 높이
  rideSpring: 2600,
  // 지면 스프링 강도 (PD 보정분)
  rideDamp: 220,
  // 지면 스프링 감쇠
  rideRayExtra: 0.5,
  // 레이 길이 여유
  // 자세 유지
  uprightTorque: 70,
  // 몸통을 세우려는 토크
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
  moveAccel: 8,
  // 가속력 상한 (N). 출발 순간 킥을 막는 안전장치.
  // moveAccel을 올리면 정지->최고속 순간의 요구 힘이 (8.0 * 약20kg * 4.6) =
  // 736N이라 620에서 잘려 버린다. 잘리면 게인을 올린 의미가 없으므로 같이 올린다.
  // (상한 자체는 남겨둔다 - 없으면 부활 직후 큰 오차에서 몸이 튄다)
  moveForce: 980,
  maxSpeed: 4.6,
  // 목표 최고 속도
  airForceRatio: 0.22,
  // 입력 없을 때 감속 게인 배율. 0.75는 손을 떼도 한참 미끄러져서 급정지가
  // 안 됐다. 1.0이면 가속과 같은 세기로 선다 = 멈추려고 할 때 바로 멈춘다.
  // (공은 관성을 그대로 갖고 굴러가므로 "급정지하면 공만 굴러나간다"가 성립)
  brakeRatio: 1,
  leanAmount: 0.26,
  // 가속 방향으로 몸을 기울이는 정도 (목표 up 벡터 tilt)
  // 점프
  jumpImpulse: 88,
  jumpCooldown: 0.45,
  // 팔다리 흔들림 (procedural) - 케이던스/진폭은 실제 속도에 비례한다
  legSwing: 17,
  // 다리 스윙 토크
  kneeSwing: 6,
  // 무릎 접힘 토크
  armSwing: 6,
  // 팔 스윙 토크
  swingSpeed: 8.5,
  // 최고 속도일 때의 스윙 주기
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
  carryTorque: 3.5,
  // 팔을 캐리 포즈로 올리는 토크 (보조 - 그림용)
  carryDamp: 0.5,
  // 캐리 포즈 각속도 감쇠 (ω*이 값이 토크 단위임을 유의)
  carryObjDamp: 0.45,
  // 든 물체에 걸어두는 linearDamping (펄럭임 억제)
  carryObjAngDamp: 0.7,
  // 든 물체에 걸어두는 angularDamping
  // 든 물체를 가슴 앞으로 끌어오는 위치 PD (main.ts에서 사용)
  carryDist: 0.55,
  // 몸통 앞으로 얼마나 떨어진 곳에 들 것인가
  carryHeight: 0.12,
  // 몸통 중심 기준 높이
  carryKp: 62,
  // 위치 게인
  carryKd: 15,
  // 속도 감쇠 (2*sqrt(Kp) ≈ 15.7 = 임계감쇠 근처)
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
  carryLiftStrength: 260,
  // 한 명이 낼 수 있는 수직(들기) 힘 (N)
  carryPushStrength: 400,
  // 한 명이 낼 수 있는 수평(밀기) 힘 (N)
  // 잡고 있는 물체를 세워서 잡아주는 토크 (사람이 균형을 잡아주는 몫).
  // 없으면 키 큰 냉장고가 미는 힘과 바닥 마찰의 짝힘으로 그냥 자빠진다.
  // 관성모멘트에 곱해지는 "각가속도" 단위(rad/s^2, 1/s)라 물체 크기와 무관하다
  // 못 드는 물체를 밀 때 힘을 거는 높이 (반높이 대비 아래쪽 비율).
  // 바닥 마찰과 같은 높이에서 밀어야 물체가 안 기운다.
  pushLowRatio: 0.85,
  // 밀기 모드 속도 추종 (carry.ts). 물체가 사람 걸음의 이 비율까지 밀린다.
  pushSpeedFactor: 1,
  // 물체가 사람 걸음과 같은 속도까지 밀린다.
  // 0.55로 두면 사람이 물체보다 빨리 걸어 계속 들이받는다.
  pushVelGain: 10,
  // 밀기 모드에서 물체가 "팔이 닿는 거리" 안으로 따라오게 하는 보정 (1/s).
  // 속도 추종만 하면 물체가 가속하는 동안 뒤처진 간격(실측 0.24m, 뒤로 끌 땐
  // 0.6m)이 그대로 남아 손이 표면에서 떨어진다 = 다시 "허공에서 미는" 그림.
  // 위치 PD로 바꾸면 목표에 닿는 순간 힘이 죽어 교착이 생기므로(위 주석 참고),
  // 목표 "속도"에 더하는 형태로만 보정한다. 닿을 거리 안에 있으면 0이라
  // 평상시 거동은 그대로다.
  pushCatchGain: 6,
  pushCatchMax: 3,
  // 보정으로 더할 수 있는 최대 속도 (m/s)
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
  carryDragAssist: 0.75,
  // 든 물체 질량을 이동 컨트롤러 질량에 더하는 비율
  carryRamp: 0.55,
  // 잡은 직후 캐리 힘/제약 힘을 0->1로 올리는 시간 (스냅 방지)
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
  carryUprightBoost: 1.5,
  // 물건을 들었을 때 몸 세우는 토크 배율
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
  reachTorque: 6.5,
  // 위팔을 잡은 지점 방향으로 돌리는 토크
  reachElbowRatio: 0.6,
  // 아래팔은 그보다 약하게 (팔꿈치가 자연스럽게 따라옴)
  reachDamp: 0.9,
  // 각속도 감쇠 (ω * 이 값이 토크 단위)
  // 손을 붙잡은 지점에 실제로 갖다 붙이는 스프링.
  // 밀기 모드에는 제약이 없으므로 이게 없으면 손이 절대 표면에 닿지 않는다.
  // [중요] 솔버 제약이 아니라 "힘"이다. 강체 제약으로 붙이면 무거운 물체에서
  // 물체-손-팔-몸통-지면-물체 닫힌 고리가 생겨 Gauss-Seidel이 전체를 굳혀
  // 버리지만(updateGripMode 주석 참고), 힘은 그런 교착을 만들지 않는다.
  handReachKp: 400,
  // 위치 게인 (1/s²)
  handReachKd: 40,
  // 속도 감쇠 (2*sqrt(400) = 임계감쇠)
  handReachMax: 60,
  // 손에 걸 수 있는 힘 상한 (N)
  handReachRamp: 0.35,
  // 잡은 직후 0 -> 1로 올리는 시간 (스냅 방지)
  // 넘어짐
  fallTiltDot: 0.42,
  // 몸통 up벡터가 이만큼 기울면 넘어진 것으로 판단
  fallTiltTime: 0.55,
  // 그 상태가 이 시간 지속되면 RAGDOLL
  impactSpeed: 13,
  // 이 속도 이상 충격이면 즉시 RAGDOLL
  ragdollTime: 1.7,
  // RAGDOLL 유지 시간
  recoverTime: 1.3
  // 일어나는 데 걸리는 시간 (gain 램프)
};
var DIM = {
  pelvis: { rx: 0.17, mass: 5, y: 0 },
  torso: { r: 0.2, sep: 0.28, mass: 5, y: 0.42 },
  head: { r: 0.19, mass: 1.2, y: 0.44 },
  // torso 기준
  upperArm: { r: 0.085, sep: 0.18, mass: 0.55 },
  lowerArm: { r: 0.075, sep: 0.17, mass: 0.45 },
  hand: { r: 0.085, mass: 0.3 },
  upperLeg: { r: 0.105, sep: 0.2, mass: 1.5 },
  lowerLeg: { r: 0.09, sep: 0.2, mass: 1.1 },
  foot: { r: 0.1, mass: 0.6 },
  shoulderX: 0.29,
  hipX: 0.14
};
function mkBody(r, sep, mass, pos, material, group, mask, angDamp = 0.35) {
  const b = new CANNON.Body({
    mass,
    position: pos.clone(),
    material,
    linearDamping: 0.02,
    angularDamping: angDamp,
    collisionFilterGroup: group,
    collisionFilterMask: mask
  });
  if (sep > 0) {
    b.addShape(new CANNON.Sphere(r), new CANNON.Vec3(0, -sep / 2, 0));
    b.addShape(new CANNON.Sphere(r), new CANNON.Vec3(0, sep / 2, 0));
  } else {
    b.addShape(new CANNON.Sphere(r));
  }
  b.updateMassProperties();
  b.allowSleep = false;
  return b;
}
var VIS = {
  // 머리를 0.16m 올리는 이유: 물리 머리 중심이 어깨보다 0.31m밖에 안 위라,
  // 반지름 0.37짜리 머리를 그대로 두면 어깨와 상의를 통째로 덮어버린다
  // (실측: 셔츠가 0.27m짜리 띠로만 보였다). 올리면 목 없이 머리가 어깨에
  // 얹힌 치비 실루엣이 되면서 상의도 제대로 보인다.
  head: { r: 1.95, len: 1, up: 0.16 },
  // 머리지름 0.74m
  torso: { r: 1.22, len: 0.85 },
  pelvis: { r: 1.28, len: 1 },
  upperArm: { r: 1.55, len: 0.55 },
  // 짧고 뭉툭
  lowerArm: { r: 1.62, len: 0.55 },
  hand: { r: 2.05, len: 1 },
  // 손은 크게 - 장난감 인형 실루엣의 핵심
  upperLeg: { r: 1.15, len: 0.86 },
  // ±0.14 간격이라 이보다 굵으면 두 다리가 붙는다
  lowerLeg: { r: 1.3, len: 0.76 },
  foot: { r: 1.62, len: 1 }
  // 발도 크게 (신발처럼 보이게)
};
function toyMaterial(color) {
  return new THREE.MeshStandardMaterial({ color, roughness: 0.42, metalness: 0.05 });
}
var NO_SCALE = { r: 1, len: 1 };
function mkMesh(r, sep, color, vis = NO_SCALE) {
  const vr = r * vis.r;
  const vsep = sep > 0 ? sep * vis.len : sep;
  const geo = sep > 0 ? new THREE.CapsuleGeometry(vr, vsep, 8, 20) : new THREE.SphereGeometry(vr, 24, 16);
  if (vis.up) geo.translate(0, vis.up, 0);
  const mesh = new THREE.Mesh(geo, toyMaterial(color));
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  return mesh;
}
function addFace(head, r, eyeColor, up = 0) {
  const eyeGeo = new THREE.SphereGeometry(r * 0.19, 12, 10);
  const eyeMat = new THREE.MeshStandardMaterial({ color: eyeColor, roughness: 0.25, metalness: 0.1 });
  for (const sx of [-1, 1]) {
    const eye = new THREE.Mesh(eyeGeo, eyeMat);
    eye.position.set(sx * r * 0.34, up + r * 0.1, r * 0.9);
    head.add(eye);
    const dot = new THREE.Mesh(
      new THREE.SphereGeometry(r * 0.07, 8, 6),
      new THREE.MeshBasicMaterial({ color: 16777215 })
    );
    dot.position.set(sx * r * 0.3, up + r * 0.16, r * 1.02);
    head.add(dot);
  }
}
function coneTwist(a, b, pivotA, pivotB, angle, twist, maxForce = 4e3) {
  return new CANNON.ConeTwistConstraint(a, b, {
    pivotA,
    pivotB,
    axisA: new CANNON.Vec3(0, -1, 0),
    axisB: new CANNON.Vec3(0, -1, 0),
    angle,
    twistAngle: twist,
    maxForce
  });
}
function shade(color, k) {
  const r = Math.min(255, Math.round((color >> 16 & 255) * k));
  const g = Math.min(255, Math.round((color >> 8 & 255) * k));
  const b = Math.min(255, Math.round((color & 255) * k));
  return r << 16 | g << 8 | b;
}
function createRagdoll(physics, scene, origin, material, colors, group, otherMask) {
  const parts = /* @__PURE__ */ new Map();
  const bodies = [];
  const constraints = [];
  const g = new THREE.Group();
  scene.add(g);
  const mask = otherMask;
  function add(name, body, mesh) {
    physics.addBody(body);
    g.add(mesh);
    parts.set(name, { name, body, mesh });
    bodies.push(body);
    return body;
  }
  const O = origin;
  const pelvis = mkBody(
    DIM.pelvis.rx,
    0,
    DIM.pelvis.mass,
    new CANNON.Vec3(O.x, O.y, O.z),
    material,
    group,
    mask
  );
  add("pelvis", pelvis, mkMesh(DIM.pelvis.rx, 0, colors.pants, VIS.pelvis));
  const torsoY = O.y + DIM.torso.y;
  const torso = mkBody(
    DIM.torso.r,
    DIM.torso.sep,
    DIM.torso.mass,
    new CANNON.Vec3(O.x, torsoY, O.z),
    material,
    group,
    mask
  );
  add("torso", torso, mkMesh(DIM.torso.r, DIM.torso.sep, colors.shirt, VIS.torso));
  const headY = torsoY + DIM.head.y;
  const head = mkBody(
    DIM.head.r,
    0,
    DIM.head.mass,
    new CANNON.Vec3(O.x, headY, O.z),
    material,
    group,
    mask,
    P.endDamp
  );
  const headMesh = mkMesh(DIM.head.r, 0, colors.skin, VIS.head);
  addFace(headMesh, DIM.head.r * VIS.head.r, colors.eye ?? 3811874, VIS.head.up ?? 0);
  add("head", head, headMesh);
  function arm(side, L) {
    const sx = O.x + side * DIM.shoulderX;
    const shoulderY = torsoY + 0.13;
    const uaY = shoulderY - DIM.upperArm.sep / 2 - 0.08;
    const ua = mkBody(
      DIM.upperArm.r,
      DIM.upperArm.sep,
      DIM.upperArm.mass,
      new CANNON.Vec3(sx, uaY, O.z),
      material,
      group,
      mask
    );
    add("upperArm" + L, ua, mkMesh(DIM.upperArm.r, DIM.upperArm.sep, colors.shirt, VIS.upperArm));
    const laY = uaY - DIM.upperArm.sep / 2 - DIM.lowerArm.sep / 2 - 0.05;
    const la = mkBody(
      DIM.lowerArm.r,
      DIM.lowerArm.sep,
      DIM.lowerArm.mass,
      new CANNON.Vec3(sx, laY, O.z),
      material,
      group,
      mask,
      P.endDamp
    );
    add("lowerArm" + L, la, mkMesh(DIM.lowerArm.r, DIM.lowerArm.sep, colors.skin, VIS.lowerArm));
    const hY = laY - DIM.lowerArm.sep / 2 - DIM.hand.r - 0.02;
    const hand = mkBody(
      DIM.hand.r,
      0,
      DIM.hand.mass,
      new CANNON.Vec3(sx, hY, O.z),
      material,
      group,
      mask,
      P.endDamp
    );
    add("hand" + L, hand, mkMesh(DIM.hand.r, 0, colors.skin, VIS.hand));
    const sh = coneTwist(
      torso,
      ua,
      new CANNON.Vec3(side * DIM.shoulderX, 0.13, 0),
      new CANNON.Vec3(0, DIM.upperArm.sep / 2 + 0.08, 0),
      Math.PI * 0.55,
      Math.PI / 4,
      5e3
    );
    physics.addConstraint(sh);
    constraints.push(sh);
    const el = coneTwist(
      ua,
      la,
      new CANNON.Vec3(0, -DIM.upperArm.sep / 2 - 0.025, 0),
      new CANNON.Vec3(0, DIM.lowerArm.sep / 2 + 0.025, 0),
      Math.PI * 0.3,
      Math.PI / 8,
      2200
    );
    physics.addConstraint(el);
    constraints.push(el);
    const wr = coneTwist(
      la,
      hand,
      new CANNON.Vec3(0, -DIM.lowerArm.sep / 2 - 0.01, 0),
      new CANNON.Vec3(0, DIM.hand.r + 0.01, 0),
      Math.PI * 0.22,
      Math.PI / 8,
      900
    );
    physics.addConstraint(wr);
    constraints.push(wr);
    return { ua, la, hand };
  }
  const armL = arm(-1, "L");
  const armR = arm(1, "R");
  function leg(side, L) {
    const hx = O.x + side * DIM.hipX;
    const hipY = O.y - 0.1;
    const ulY = hipY - DIM.upperLeg.sep / 2 - 0.06;
    const ul = mkBody(
      DIM.upperLeg.r,
      DIM.upperLeg.sep,
      DIM.upperLeg.mass,
      new CANNON.Vec3(hx, ulY, O.z),
      material,
      group,
      mask
    );
    add("upperLeg" + L, ul, mkMesh(DIM.upperLeg.r, DIM.upperLeg.sep, colors.pants, VIS.upperLeg));
    const llY = ulY - DIM.upperLeg.sep / 2 - DIM.lowerLeg.sep / 2 - 0.05;
    const ll = mkBody(
      DIM.lowerLeg.r,
      DIM.lowerLeg.sep,
      DIM.lowerLeg.mass,
      new CANNON.Vec3(hx, llY, O.z),
      material,
      group,
      mask
    );
    add("lowerLeg" + L, ll, mkMesh(DIM.lowerLeg.r, DIM.lowerLeg.sep, colors.pants, VIS.lowerLeg));
    const fY = llY - DIM.lowerLeg.sep / 2 - DIM.foot.r;
    const foot = mkBody(
      DIM.foot.r,
      0,
      DIM.foot.mass,
      new CANNON.Vec3(hx, fY, O.z + 0.03),
      material,
      group,
      mask,
      P.endDamp
    );
    add("foot" + L, foot, mkMesh(DIM.foot.r, 0, colors.shoes ?? shade(colors.pants, 0.55), VIS.foot));
    const hip = coneTwist(
      pelvis,
      ul,
      new CANNON.Vec3(side * DIM.hipX, -0.1, 0),
      new CANNON.Vec3(0, DIM.upperLeg.sep / 2 + 0.06, 0),
      Math.PI * 0.42,
      Math.PI / 6,
      9e3
    );
    physics.addConstraint(hip);
    constraints.push(hip);
    const knee = coneTwist(
      ul,
      ll,
      new CANNON.Vec3(0, -DIM.upperLeg.sep / 2 - 0.025, 0),
      new CANNON.Vec3(0, DIM.lowerLeg.sep / 2 + 0.025, 0),
      Math.PI * 0.26,
      Math.PI / 10,
      4e3
    );
    physics.addConstraint(knee);
    constraints.push(knee);
    const ankle = coneTwist(
      ll,
      foot,
      new CANNON.Vec3(0, -DIM.lowerLeg.sep / 2 - 0.01, 0),
      new CANNON.Vec3(0, DIM.foot.r + 0.01, 0),
      Math.PI * 0.2,
      Math.PI / 10,
      1500
    );
    physics.addConstraint(ankle);
    constraints.push(ankle);
    return { ul, ll, foot };
  }
  const legL = leg(-1, "L");
  const legR = leg(1, "R");
  const spine = coneTwist(
    pelvis,
    torso,
    new CANNON.Vec3(0, DIM.torso.y / 2, 0),
    new CANNON.Vec3(0, -DIM.torso.y / 2, 0),
    Math.PI * 0.18,
    Math.PI / 7,
    26e3
  );
  physics.addConstraint(spine);
  constraints.push(spine);
  const neck = coneTwist(
    torso,
    head,
    new CANNON.Vec3(0, DIM.head.y / 2, 0),
    new CANNON.Vec3(0, -DIM.head.y / 2, 0),
    Math.PI * 0.16,
    Math.PI / 6,
    3e3
  );
  physics.addConstraint(neck);
  constraints.push(neck);
  const initOffsets = bodies.map((b) => b.position.vsub(pelvis.position));
  const totalMass = bodies.reduce((sum, b) => sum + b.mass, 0);
  let state = "ACTIVE";
  let tiltTimer = 0;
  let ragdollTimer = 0;
  let recoverTimer = 0;
  let jumpTimer = 0;
  let swingPhase = 0;
  let grounded = false;
  let guardCount = 0;
  let recoverGrace = 0;
  let carrying = 0;
  const heldBodies = /* @__PURE__ */ new Set();
  let carriedMass = 0;
  let handGrips = [];
  let reachRamp = 0;
  let leanX = 0, leanZ = 0;
  let intentX = 0, intentZ = 0;
  let aimX = 0, aimZ = 0;
  let spawnGrace = 1;
  for (const name of ["head", "torso", "pelvis"]) {
    const part = parts.get(name);
    part.body.addEventListener("collide", (e) => {
      if (state !== "ACTIVE" || spawnGrace > 0 || recoverGrace > 0) return;
      const rel = Math.abs(e.contact.getImpactVelocityAlongNormal());
      if (rel > P.impactSpeed) knockdown(P.ragdollTime, `\uCDA9\uACA9(${name}) rel=${rel.toFixed(1)}`);
    });
  }
  function knockdown(seconds = P.ragdollTime, reason = "unknown") {
    if (state === "RAGDOLL") return;
    console.warn(`[ragdoll] knockdown \uBC1C\uB3D9! reason=${reason} state=${state}->RAGDOLL seconds=${seconds.toFixed(2)}`);
    state = "RAGDOLL";
    ragdollTimer = seconds;
    recoverTimer = 0;
    tiltTimer = 0;
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
  function uprightDot() {
    torso.quaternion.vmult(_up, _tmp);
    return _tmp.y;
  }
  function checkGrounded(physics2) {
    ray.from.set(pelvis.position.x, pelvis.position.y, pelvis.position.z);
    ray.to.set(pelvis.position.x, pelvis.position.y - (P.rideHeight + P.rideRayExtra), pelvis.position.z);
    let best = -1;
    for (const b of physics2.bodies) {
      if (b.collisionFilterGroup === group) continue;
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
  function applyTorque(b, t) {
    b.torque.x += t.x;
    b.torque.y += t.y;
    b.torque.z += t.z;
  }
  function dampTorque(b, w, coeff, dt) {
    const iMin = Math.min(b.inertia.x, b.inertia.y, b.inertia.z);
    const cap = Math.abs(w) * iMin / dt;
    const raw = -w * coeff;
    return Math.max(-cap, Math.min(cap, raw));
  }
  function driveCap(b, torque, maxRate, dt) {
    const iMin = Math.min(b.inertia.x, b.inertia.y, b.inertia.z);
    const cap = iMin * maxRate / dt;
    return Math.max(-cap, Math.min(cap, torque));
  }
  const _aimCur = new CANNON.Vec3();
  function aimLimb(limb, from, to, torque, dt) {
    const dx = to.x - from.x, dy = to.y - from.y, dz = to.z - from.z;
    const len = Math.hypot(dx, dy, dz);
    if (!(len > 1e-4)) return;
    const nx = dx / len, ny = dy / len, nz = dz / len;
    _aimCur.set(0, -1, 0);
    limb.quaternion.vmult(_aimCur, _aimCur);
    const c = _aimCur;
    applyTorque(limb, new CANNON.Vec3(
      (c.y * nz - c.z * ny) * torque + dampTorque(limb, limb.angularVelocity.x, P.reachDamp, dt),
      (c.z * nx - c.x * nz) * torque + dampTorque(limb, limb.angularVelocity.y, P.reachDamp, dt),
      (c.x * ny - c.y * nx) * torque + dampTorque(limb, limb.angularVelocity.z, P.reachDamp, dt)
    ));
  }
  function control(dt, input, physics2) {
    jumpTimer = Math.max(0, jumpTimer - dt);
    spawnGrace = Math.max(0, spawnGrace - dt);
    recoverGrace = Math.max(0, recoverGrace - dt);
    if (state === "ACTIVE" && spawnGrace <= 0 && recoverGrace <= 0) {
      for (const name of ["torso", "pelvis", "head"]) {
        const b = parts.get(name).body;
        if (b.angularVelocity.length() > 34 || b.velocity.length() > 34) {
          knockdown(0.9, `\uC120\uC81C\uC548\uC804\uC7A5\uCE58(${name}) angVel=${b.angularVelocity.length().toFixed(1)} vel=${b.velocity.length().toFixed(1)}`);
          break;
        }
      }
    }
    const dist = checkGrounded(physics2);
    grounded = dist >= 0 && dist <= P.rideHeight + 0.18;
    const up = uprightDot();
    if (state === "ACTIVE") {
      if (up < P.fallTiltDot && spawnGrace <= 0 && recoverGrace <= 0) {
        tiltTimer += dt;
        if (tiltTimer > P.fallTiltTime) knockdown(P.ragdollTime, `\uAE30\uC6B8\uC5B4\uC9D0 up=${up.toFixed(2)}`);
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
        recoverGrace = 0.9;
        for (const b of bodies) {
          b.velocity.scale(0.35, b.velocity);
          b.angularVelocity.scale(0.35, b.angularVelocity);
        }
      }
    }
    if (state === "RAGDOLL") return;
    const gain = state === "RECOVERING" ? 1 - Math.max(0, recoverTimer) / P.recoverTime : 1;
    const upDot = up;
    if (dist >= 0 && dist < P.rideHeight + 0.12 && upDot > 0.35 && jumpTimer <= 0) {
      const gMag = Math.abs(physics2.gravity.y);
      const weight = totalMass * gMag;
      const rawErr = P.rideHeight - dist;
      const err = Math.max(-0.15, Math.min(0.22, rawErr));
      const vy = pelvis.velocity.y;
      const support = Math.min(1, (upDot - 0.35) / 0.4);
      const f = (weight + err * P.rideSpring - vy * P.rideDamp) * gain * support;
      if (Number.isFinite(f)) {
        const clamped = Math.max(-weight * 0.4, Math.min(weight * 1.55, f));
        pelvis.applyForce(new CANNON.Vec3(0, clamped, 0));
      }
    }
    const leanScale = carrying > 0 ? 0.35 : 1;
    const leanMag = Math.hypot(leanX, leanZ);
    let tux = 0, tuz = 0;
    if (leanMag > 1e-3 && grounded) {
      const l = Math.min(1, leanMag) * P.leanAmount * leanScale;
      tux = leanX / leanMag * l;
      tuz = leanZ / leanMag * l;
    }
    const tuLen = Math.hypot(tux, 1, tuz);
    const tUx = tux / tuLen, tUy = 1 / tuLen, tUz = tuz / tuLen;
    torso.quaternion.vmult(_up, _tmp);
    const tq = P.uprightTorque * gain * (carrying > 0 ? P.carryUprightBoost : 1);
    applyTorque(torso, new CANNON.Vec3(
      (_tmp.y * tUz - _tmp.z * tUy) * tq + dampTorque(torso, torso.angularVelocity.x, P.uprightDamp, dt),
      dampTorque(torso, torso.angularVelocity.y, P.uprightDamp * 0.4, dt),
      (_tmp.x * tUy - _tmp.y * tUx) * tq + dampTorque(torso, torso.angularVelocity.z, P.uprightDamp, dt)
    ));
    pelvis.quaternion.vmult(_up, _tmp);
    applyTorque(pelvis, new CANNON.Vec3(
      (_tmp.y * tUz - _tmp.z * tUy) * tq * 0.6 + dampTorque(pelvis, pelvis.angularVelocity.x, P.uprightDamp * 0.5, dt),
      dampTorque(pelvis, pelvis.angularVelocity.y, P.uprightDamp * 0.25, dt),
      (_tmp.x * tUy - _tmp.y * tUx) * tq * 0.6 + dampTorque(pelvis, pelvis.angularVelocity.z, P.uprightDamp * 0.5, dt)
    ));
    const vx = pelvis.velocity.x, vz = pelvis.velocity.z;
    const spd = Math.hypot(vx, vz);
    const mLen = Math.hypot(input.moveX, input.moveZ);
    const moving = mLen > 0.01;
    const dx = moving ? input.moveX / mLen : 0;
    const dz = moving ? input.moveZ / mLen : 0;
    intentX = dx;
    intentZ = dz;
    {
      const ax = input.aimX ?? 0, az = input.aimZ ?? 0;
      const aLen = Math.hypot(ax, az);
      if (aLen > 0.01) {
        aimX = ax / aLen;
        aimZ = az / aLen;
      }
    }
    if (grounded || moving) {
      const tvx = dx * P.maxSpeed;
      const tvz = dz * P.maxSpeed;
      const evx = tvx - vx, evz = tvz - vz;
      const dragMass = totalMass + carriedMass * P.carryDragAssist;
      const massK = dragMass / totalMass;
      const airK = grounded ? 1 : P.airForceRatio;
      const k = P.moveAccel * dragMass * airK * gain * (moving ? 1 : P.brakeRatio);
      let fx = evx * k, fz = evz * k;
      const fm = Math.hypot(fx, fz);
      const fCap = P.moveForce * massK * airK * gain;
      if (fm > fCap) {
        fx = fx / fm * fCap;
        fz = fz / fm * fCap;
      }
      pelvis.applyForce(new CANNON.Vec3(fx, 0, fz));
      torso.applyForce(new CANNON.Vec3(fx * 0.22, 0, fz * 0.22));
      leanX = fx / Math.max(1, fCap);
      leanZ = fz / Math.max(1, fCap);
    } else {
      leanX = 0;
      leanZ = 0;
    }
    if (moving) {
      const targetYaw = Math.atan2(dx, dz);
      const fwd = new CANNON.Vec3(0, 0, 1);
      torso.quaternion.vmult(fwd, fwd);
      const curYaw = Math.atan2(fwd.x, fwd.z);
      let dYaw = targetYaw - curYaw;
      while (dYaw > Math.PI) dYaw -= Math.PI * 2;
      while (dYaw < -Math.PI) dYaw += Math.PI * 2;
      applyTorque(torso, new CANNON.Vec3(
        0,
        driveCap(torso, dYaw * P.yawTorque * gain, P.yawMaxRate, dt),
        0
      ));
    }
    if (grounded && spd > 0.15) {
      const speedFrac = Math.min(1, spd / (P.maxSpeed * 0.75));
      swingPhase += dt * P.swingSpeed * (0.35 + 0.65 * speedFrac);
      const s = Math.sin(swingPhase);
      const hx = spd > 0.01 ? vx / spd : dx;
      const hz = spd > 0.01 ? vz / spd : dz;
      const swingDamp = (b, ax, az, t) => applyTorque(b, new CANNON.Vec3(
        ax * t + dampTorque(b, b.angularVelocity.x, P.swingDamp, dt),
        dampTorque(b, b.angularVelocity.y, P.swingDamp, dt),
        az * t + dampTorque(b, b.angularVelocity.z, P.swingDamp, dt)
      ));
      const swing = P.legSwing * gain * speedFrac;
      swingDamp(legL.ul, hz * s, -hx * s, swing);
      swingDamp(legR.ul, -hz * s, hx * s, swing);
      const kneeSwing = P.kneeSwing * gain * speedFrac;
      const sk = Math.sin(swingPhase - Math.PI / 2);
      swingDamp(legL.ll, hz * sk, -hx * sk, kneeSwing);
      swingDamp(legR.ll, -hz * sk, hx * sk, kneeSwing);
      if (carrying === 0) {
        const aswing = P.armSwing * gain * speedFrac;
        swingDamp(armL.ua, -hz * s, hx * s, aswing);
        swingDamp(armR.ua, hz * s, -hx * s, aswing);
      }
    }
    for (const end of [armL.hand, armR.hand, legL.foot, legR.foot]) {
      applyTorque(end, new CANNON.Vec3(
        dampTorque(end, end.angularVelocity.x, P.endSpinDamp, dt),
        dampTorque(end, end.angularVelocity.y, P.endSpinDamp, dt),
        dampTorque(end, end.angularVelocity.z, P.endSpinDamp, dt)
      ));
    }
    const liftableHeld = carriedMass * Math.abs(physics2.gravity.y) <= P.carryLiftStrength;
    if (handGrips.length > 0 && state === "ACTIVE") {
      reachRamp += dt;
      const k = Math.min(1, reachRamp / P.handReachRamp) * gain;
      const gy = Math.abs(physics2.gravity.y);
      for (const grip of handGrips) {
        const side = grip.hand === armL.hand ? -1 : 1;
        const limb = side < 0 ? armL : armR;
        let comp = 0;
        for (const b of [limb.ua, limb.la, grip.hand]) {
          const f2 = b.mass * gy * k;
          b.applyForce(new CANNON.Vec3(0, f2, 0));
          comp += f2;
        }
        torso.applyForce(new CANNON.Vec3(0, -comp, 0));
        const sh = new CANNON.Vec3(side * DIM.shoulderX, 0.13, 0);
        torso.quaternion.vmult(sh, sh);
        sh.vadd(torso.position, sh);
        aimLimb(limb.ua, sh, grip.target, P.reachTorque * k, dt);
        const el = new CANNON.Vec3(0, -DIM.upperArm.sep / 2 - 0.025, 0);
        limb.ua.quaternion.vmult(el, el);
        el.vadd(limb.ua.position, el);
        aimLimb(limb.la, el, grip.target, P.reachTorque * P.reachElbowRatio * k, dt);
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
    if (carrying > 0 && liftableHeld) {
      const fwd = new CANNON.Vec3(0, 0, 1);
      torso.quaternion.vmult(fwd, fwd);
      const tx = fwd.x * 0.86, ty = -0.5, tz = fwd.z * 0.86;
      const tl = Math.hypot(tx, ty, tz);
      const nx = tx / tl, ny = ty / tl, nz = tz / tl;
      const ct = P.carryTorque * gain;
      for (const ua of [armL.ua, armR.ua]) {
        const cur = new CANNON.Vec3(0, -1, 0);
        ua.quaternion.vmult(cur, cur);
        applyTorque(ua, new CANNON.Vec3(
          (cur.y * nz - cur.z * ny) * ct + dampTorque(ua, ua.angularVelocity.x, P.carryDamp, dt),
          (cur.z * nx - cur.x * nz) * ct + dampTorque(ua, ua.angularVelocity.y, P.carryDamp, dt),
          (cur.x * ny - cur.y * nx) * ct + dampTorque(ua, ua.angularVelocity.z, P.carryDamp, dt)
        ));
      }
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
    if (input.jump && grounded && jumpTimer <= 0 && state === "ACTIVE") {
      jumpTimer = P.jumpCooldown;
      pelvis.applyImpulse(new CANNON.Vec3(0, P.jumpImpulse, 0));
      torso.applyImpulse(new CANNON.Vec3(0, P.jumpImpulse * 0.25, 0));
      legL.ul.applyImpulse(new CANNON.Vec3(0, -2, 1.5));
      legR.ul.applyImpulse(new CANNON.Vec3(0, -2, 1.5));
    }
    {
      const vx2 = pelvis.velocity.x, vz2 = pelvis.velocity.z;
      const hs = Math.hypot(vx2, vz2);
      const hCap = P.maxSpeed * 1.3;
      if (hs > hCap) {
        pelvis.velocity.x = vx2 / hs * hCap;
        pelvis.velocity.z = vz2 / hs * hCap;
      }
      if (jumpTimer <= 0 && pelvis.velocity.y > 6.5) pelvis.velocity.y = 6.5;
    }
  }
  function guard() {
    let recovered = false;
    for (const b of bodies) {
      const p = b.position, v = b.velocity, a = b.angularVelocity, q = b.quaternion;
      const bad = !Number.isFinite(p.x) || !Number.isFinite(p.y) || !Number.isFinite(p.z) || !Number.isFinite(v.x) || !Number.isFinite(v.y) || !Number.isFinite(v.z) || !Number.isFinite(a.x) || !Number.isFinite(a.y) || !Number.isFinite(a.z) || !Number.isFinite(q.x) || !Number.isFinite(q.y) || !Number.isFinite(q.z) || !Number.isFinite(q.w) || p.y < -25 || p.y > 45 || Math.abs(p.x) > 400 || Math.abs(p.z) > 400;
      if (bad) {
        recovered = true;
        break;
      }
    }
    if (recovered) {
      guardCount++;
      console.warn(`[ragdoll] NaN/\uC774\uD0C8 \uAC10\uC9C0 -> \uBCF5\uAD6C (#${guardCount})`);
      const safe = new CANNON.Vec3(
        Number.isFinite(pelvis.position.x) ? pelvis.position.x : 0,
        3,
        Number.isFinite(pelvis.position.z) ? pelvis.position.z : 0
      );
      reset(safe);
      return true;
    }
    for (const b of bodies) {
      const s = b.velocity.length();
      if (s > 40) b.velocity.scale(40 / s, b.velocity);
      const w = b.angularVelocity.length();
      if (w > 20) b.angularVelocity.scale(20 / w, b.angularVelocity);
    }
    return false;
  }
  function reset(pos) {
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
    tiltTimer = 0;
    ragdollTimer = 0;
    recoverTimer = 0;
    spawnGrace = 1;
    recoverGrace = 0;
  }
  const rag = {
    parts,
    bodies,
    constraints,
    group: g,
    pelvis,
    torso,
    handL: armL.hand,
    handR: armR.hand,
    get state() {
      return state;
    },
    get grounded() {
      return grounded;
    },
    /** 보행 주기 위상 (rad). 발소리를 보폭에 맞추는 데 쓴다 - 읽기 전용 */
    get swingPhase() {
      return swingPhase;
    },
    get aimX() {
      return aimX;
    },
    get aimZ() {
      return aimZ;
    },
    get intentX() {
      return intentX;
    },
    get intentZ() {
      return intentZ;
    },
    control,
    sync() {
      for (const p of parts.values()) {
        p.mesh.position.set(p.body.position.x, p.body.position.y, p.body.position.z);
        p.mesh.quaternion.set(
          p.body.quaternion.x,
          p.body.quaternion.y,
          p.body.quaternion.z,
          p.body.quaternion.w
        );
      }
    },
    knockdown,
    setNetState(st) {
      state = st;
    },
    setHeld(bodies2, grips = []) {
      carrying = bodies2.length;
      heldBodies.clear();
      carriedMass = 0;
      for (const b of bodies2) {
        heldBodies.add(b);
        carriedMass += b.mass;
      }
      if (grips.length === 0) reachRamp = 0;
      handGrips = grips;
    },
    reset,
    guard,
    dispose(w, s) {
      for (const c of constraints) w.removeConstraint(c);
      for (const b of bodies) w.removeBody(b);
      s.remove(g);
      g.traverse((o) => {
        const m = o;
        if (!m.isMesh) return;
        m.geometry.dispose();
        const mat = m.material;
        if (Array.isArray(mat)) for (const x of mat) x.dispose();
        else mat.dispose();
      });
    }
  };
  return rag;
}

// client/src/ball.ts
import * as CANNON2 from "cannon-es";
var B = {
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
  touchSpeed: 1,
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
  touchMax: 6,
  /**
   * 공이 발 앞 ahead보다 더 나가 있을 때 "죽이는" 터치의 충격량 상한.
   *
   * [왜 필요한가] 미는 터치만 있으면 한 번 세게 나간 공을 되돌릴 방법이
   * 없어서, 같은 설정으로도 어떤 판에서는 공이 발 앞에 남고 어떤 판에서는
   * 그대로 달아났다(실측: pushOut 1.8이면 평균 +1.8m, 2.4면 -4.9m).
   * 실제 드리블도 너무 나간 공은 발바닥으로 눌러 죽인다. 미는 힘보다
   * 약하게 둬서 "너무 세게 찬 공은 못 살린다"가 남게 한다.
   */
  touchBrake: 2,
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
  turnRateFull: 6,
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
  guideDamp: 2,
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
  trickBallKeep: 1,
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
  stopCooldown: 1,
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
  stopLockout: 0.22
};
function createBallPlay() {
  const states = /* @__PURE__ */ new Map();
  function stateOf(rag) {
    let s = states.get(rag);
    if (!s) {
      s = { trickTimer: 0, lockout: 0, pokeTimer: 0, kickTimer: 0, scoopTimer: 0, dashTimer: 0, dashX: 0, dashZ: 0, lastTrick: 0, stopTimer: 0, settleTimer: 0, settleRefX: 0, settleRefZ: 0, lastDirX: 0, lastDirZ: 0, turnRate: 0, rushTimer: 0, rushX: 0, rushZ: 0, rushCd: 0, touch: null, lastTrickInfo: null };
      states.set(rag, s);
    }
    return s;
  }
  function facing(rag) {
    const ix = rag.intentX, iz = rag.intentZ;
    if (Math.hypot(ix, iz) > 0.01) return { x: ix, z: iz };
    return aiming(rag);
  }
  function aiming(rag) {
    const ax = rag.aimX, az = rag.aimZ;
    if (Math.hypot(ax, az) > 0.01) return { x: ax, z: az };
    const fwd = new CANNON2.Vec3(0, 0, 1);
    rag.torso.quaternion.vmult(fwd, fwd);
    const l = Math.hypot(fwd.x, fwd.z) || 1;
    return { x: fwd.x / l, z: fwd.z / l };
  }
  const moving = (rag) => Math.hypot(rag.intentX, rag.intentZ) > 0.01;
  function dribble(rag, ball, dt, carrying) {
    if (carrying) return;
    if (rag.state !== "ACTIVE") return;
    const st = stateOf(rag);
    if (st.settleTimer > 0) {
      const v = ball.velocity;
      const rx = st.settleRefX, rz = st.settleRefZ;
      const fwd = v.x * rx + v.z * rz;
      const fx = rx * fwd, fz = rz * fwd;
      const lx = v.x - fx, lz = v.z - fz;
      const m = ball.mass;
      ball.applyForce(new CANNON2.Vec3(
        -(fx * B.trickSettleFwdDamp + lx * B.trickSettleDamp) * m,
        0,
        -(fz * B.trickSettleFwdDamp + lz * B.trickSettleDamp) * m
      ));
      ball.wakeUp();
    }
    if (st.lockout > 0) return;
    if (st.scoopTimer > 0) return;
    if (ball.position.y > B.radius * 2.2) return;
    const p = rag.pelvis.position;
    const dx = ball.position.x - p.x;
    const dz = ball.position.z - p.z;
    const dist = Math.hypot(dx, dz);
    if (dist > B.range) return;
    const pv = rag.pelvis.velocity;
    const bvx = ball.velocity.x, bvz = ball.velocity.z;
    const bs = Math.hypot(bvx, bvz);
    if (!moving(rag)) {
      if (dist < B.trapRange && bs > 0.15 && bs < B.trapMaxSpeed && st.pokeTimer <= 0) {
        const j = Math.min(B.trapMax, bs * ball.mass);
        ball.applyImpulse(
          new CANNON2.Vec3(-bvx / bs * j, 0, -bvz / bs * j),
          new CANNON2.Vec3(0, B.radius, 0)
        );
        st.pokeTimer = B.touchIntervalSlow;
        st.touch = {
          x: ball.position.x,
          y: B.radius * 0.5,
          z: ball.position.z,
          strength: Math.min(1, j / B.trapMax) * 0.6
        };
        ball.wakeUp();
      }
      return;
    }
    const dir = facing(rag);
    const pspd = Math.hypot(pv.x, pv.z);
    const lead = B.leadBase + pspd * B.leadPerSpeed;
    const fadeStart = B.range * (1 - B.fade);
    const fade = dist <= fadeStart ? 1 : Math.max(0, (B.range - dist) / (B.range - fadeStart));
    {
      const side = dx * dir.z - dz * dir.x;
      let ax = -dir.z * side * B.guideAccel;
      let az = dir.x * side * B.guideAccel;
      const relSide = (ball.velocity.x - pv.x) * dir.z - (ball.velocity.z - pv.z) * dir.x;
      ax += -dir.z * relSide * B.guideDamp;
      az += dir.x * relSide * B.guideDamp;
      const am = Math.hypot(ax, az);
      const cap2 = B.guideAccel * fade;
      if (am > cap2 && am > 0) {
        ax = ax / am * cap2;
        az = az / am * cap2;
      }
      ball.applyForce(new CANNON2.Vec3(ax * ball.mass, 0, az * ball.mass));
    }
    const alongDist = dx * dir.x + dz * dir.z;
    const hadDir = st.lastDirX !== 0 || st.lastDirZ !== 0;
    const dot = hadDir ? Math.max(-1, Math.min(1, dir.x * st.lastDirX + dir.z * st.lastDirZ)) : 1;
    const turned = hadDir ? dot < B.turnResetDot : false;
    const rate = Math.acos(dot) / Math.max(1e-4, dt);
    const k = 1 - Math.exp(-dt / B.turnSmooth);
    st.turnRate += (rate - st.turnRate) * k;
    const turning = Math.min(1, st.turnRate / B.turnRateFull);
    st.lastDirX = dir.x;
    st.lastDirZ = dir.z;
    const rushBoost = st.rushTimer > 0 ? B.rushReach : 1;
    const reachAhead = B.touchAhead * (1 + (B.turnReachAhead - 1) * turning) * rushBoost;
    const reachSide = B.touchSide * (1 + (B.turnReachSide - 1) * turning) * rushBoost;
    const behind = B.behindLimit + (B.turnBehind - B.behindLimit) * turning;
    if (alongDist < behind || alongDist > reachAhead) {
      ball.wakeUp();
      return;
    }
    if (Math.abs(dx * dir.z - dz * dir.x) > reachSide) {
      ball.wakeUp();
      return;
    }
    const stuck = alongDist < B.minAhead;
    if (st.pokeTimer > 0 && !stuck && !turned) {
      ball.wakeUp();
      return;
    }
    let want = pspd * B.touchSpeed + Math.max(0, lead - alongDist) * B.pushOut;
    const rushTouch = st.rushTimer > 0 && alongDist > lead;
    if (rushTouch) want = pspd * B.rushTouchKeep;
    if (stuck) want = Math.max(want, pspd + B.unstickSpeed);
    const align = bs > 0.5 ? (bvx * dir.x + bvz * dir.z) / bs : 1;
    let jx, jz, cap;
    if (align < B.turnAlign) {
      jx = (dir.x * want - bvx * B.turnBite) * ball.mass;
      jz = (dir.z * want - bvz * B.turnBite) * ball.mass;
      cap = B.touchMax * B.turnBoost;
    } else {
      const along = bvx * dir.x + bvz * dir.z;
      const need = (want - along) * ball.mass;
      jx = dir.x * need;
      jz = dir.z * need;
      cap = need >= 0 ? B.touchMax : rushTouch ? B.touchMax : B.touchBrake;
    }
    const jm = Math.hypot(jx, jz);
    if (jm > cap && jm > 0) {
      jx = jx / jm * cap;
      jz = jz / jm * cap;
    }
    ball.applyImpulse(new CANNON2.Vec3(jx, 0, jz));
    const sf = Math.min(1, pspd / P.maxSpeed);
    st.pokeTimer = B.touchIntervalSlow + (B.touchIntervalFast - B.touchIntervalSlow) * sf;
    st.touch = {
      x: ball.position.x - dir.x * B.radius,
      y: B.radius * 0.5,
      z: ball.position.z - dir.z * B.radius,
      strength: Math.min(1, Math.hypot(jx, jz) / B.touchMax)
    };
    ball.wakeUp();
  }
  function tryKick(rag, ball, carrying, power = 0) {
    if (rag.state !== "ACTIVE") return null;
    const st = stateOf(rag);
    if (st.kickTimer > 0) return null;
    if (carrying) return null;
    const p = rag.pelvis.position;
    const dx = ball.position.x - p.x;
    const dz = ball.position.z - p.z;
    if (Math.hypot(dx, dz) > B.kickRange) return null;
    const k = Math.max(0, Math.min(1, power));
    const fwd = B.kickForwardMin + (B.kickForwardMax - B.kickForwardMin) * k;
    const up = B.kickUpMin + (B.kickUpMax - B.kickUpMin) * k;
    const dir = aiming(rag);
    ball.applyImpulse(new CANNON2.Vec3(dir.x * fwd, up, dir.z * fwd));
    const recoil = B.kickRecoil * (0.5 + k * 0.5);
    rag.pelvis.applyImpulse(new CANNON2.Vec3(-dir.x * recoil, 0, -dir.z * recoil));
    ball.wakeUp();
    st.kickTimer = B.kickCooldown;
    st.lockout = Math.max(st.lockout, B.kickLockout);
    return { x: ball.position.x, y: 0.02, z: ball.position.z, power: k };
  }
  function kickCooldownOf(rag) {
    return Math.max(0, stateOf(rag).kickTimer / B.kickCooldown);
  }
  function takeTrick(rag) {
    const st = stateOf(rag);
    const t = st.lastTrickInfo;
    st.lastTrickInfo = null;
    return t;
  }
  function takeTouch(rag) {
    const st = stateOf(rag);
    const t = st.touch;
    st.touch = null;
    return t;
  }
  function requestPickup(rag, ball) {
    if (rag.state !== "ACTIVE") return false;
    const p = rag.pelvis.position;
    if (Math.hypot(ball.position.x - p.x, ball.position.z - p.z) > B.scoopRange) return false;
    stateOf(rag).scoopTimer = B.scoopTime;
    return true;
  }
  function scooping(rag) {
    return stateOf(rag).scoopTimer > 0;
  }
  function scoopStep(rag, ball) {
    const fwd = new CANNON2.Vec3(0, 0, 1);
    rag.torso.quaternion.vmult(fwd, fwd);
    const fl = Math.hypot(fwd.x, fwd.z) || 1;
    const tx = rag.torso.position.x + fwd.x / fl * B.scoopAhead;
    const ty = rag.torso.position.y + B.scoopHeight;
    const tz = rag.torso.position.z + fwd.z / fl * B.scoopAhead;
    const g = Math.abs(-18);
    let ax = (tx - ball.position.x) * 34 - ball.velocity.x * 6;
    let ay = (ty - ball.position.y) * 34 - ball.velocity.y * 6 + g;
    let az = (tz - ball.position.z) * 34 - ball.velocity.z * 6;
    const am = Math.hypot(ax, ay, az);
    if (am > B.scoopAccel) {
      const k = B.scoopAccel / am;
      ax *= k;
      ay *= k;
      az *= k;
    }
    ball.applyForce(new CANNON2.Vec3(ax * ball.mass, ay * ball.mass, az * ball.mass));
    ball.wakeUp();
  }
  function carryPenalty(rag) {
    const v = rag.pelvis.velocity;
    rag.pelvis.applyForce(new CANNON2.Vec3(-v.x * B.carryDrag, 0, -v.z * B.carryDrag));
  }
  function tryTrick(rag, ball, carrying) {
    const s = stateOf(rag);
    if (s.trickTimer > 0) return false;
    if (carrying) return false;
    if (rag.state !== "ACTIVE") return false;
    if (rag.pelvis.position.y > P.rideHeight + 0.35) return false;
    const p = rag.pelvis.position;
    const dist = Math.hypot(ball.position.x - p.x, ball.position.z - p.z);
    if (dist > B.trickRange) return false;
    const ref = aiming(rag);
    const dir = facing(rag);
    const sx = -ref.z, sz = ref.x;
    const inSide = rag.intentX * sx + rag.intentZ * sz;
    let dodge;
    if (Math.abs(inSide) > 0.25) {
      dodge = Math.sign(inSide);
    } else {
      const ballSide2 = (ball.position.x - p.x) * sx + (ball.position.z - p.z) * sz;
      dodge = ballSide2 >= 0 ? -1 : 1;
    }
    const ballSide = -dodge;
    {
      const pv = rag.pelvis.velocity;
      const fwdSpeed = pv.x * ref.x + pv.z * ref.z;
      const tvx = ref.x * fwdSpeed * B.trickBallKeep + sx * ballSide * B.trickBallSide;
      const tvz = ref.z * fwdSpeed * B.trickBallKeep + sz * ballSide * B.trickBallSide;
      ball.applyImpulse(new CANNON2.Vec3(
        (tvx - ball.velocity.x) * ball.mass,
        B.trickBallUp,
        (tvz - ball.velocity.z) * ball.mass
      ));
    }
    ball.wakeUp();
    rag.pelvis.applyImpulse(new CANNON2.Vec3(
      sx * dodge * B.trickBodySide,
      B.trickBodyUp,
      sz * dodge * B.trickBodySide
    ));
    rag.torso.torque.y += dodge * B.trickTorque;
    s.trickTimer = B.trickCooldown;
    s.lockout = B.trickLockout;
    s.settleTimer = B.trickSettleTime;
    s.settleRefX = ref.x;
    s.settleRefZ = ref.z;
    const dxRaw = sx * dodge + ref.x * B.trickDashForward;
    const dzRaw = sz * dodge + ref.z * B.trickDashForward;
    const dl = Math.hypot(dxRaw, dzRaw) || 1;
    s.dashTimer = B.trickDash;
    s.dashX = dxRaw / dl;
    s.dashZ = dzRaw / dl;
    s.lastTrick = performance.now();
    s.lastTrickInfo = {
      x: p.x,
      z: p.z,
      dodgeX: sx * dodge,
      dodgeZ: sz * dodge,
      ballX: sx * ballSide,
      ballZ: sz * ballSide
    };
    return true;
  }
  function tryStopTurn(rag, ball, carrying) {
    const s = stateOf(rag);
    if (s.stopTimer > 0) return false;
    if (carrying) return false;
    if (rag.state !== "ACTIVE") return false;
    if (rag.pelvis.position.y > P.rideHeight + 0.35) return false;
    const p = rag.pelvis.position;
    const dist = Math.hypot(ball.position.x - p.x, ball.position.z - p.z);
    if (dist > B.stopRange) return false;
    const bv = ball.velocity;
    ball.applyImpulse(new CANNON2.Vec3(
      -bv.x * (1 - B.stopBallKeep) * ball.mass,
      0,
      -bv.z * (1 - B.stopBallKeep) * ball.mass
    ), new CANNON2.Vec3(0, B.radius, 0));
    const toMeX = p.x - ball.position.x, toMeZ = p.z - ball.position.z;
    const l = Math.hypot(toMeX, toMeZ) || 1;
    ball.applyImpulse(new CANNON2.Vec3(toMeX / l * B.stopBallPull, 0, toMeZ / l * B.stopBallPull));
    ball.wakeUp();
    const pv = rag.pelvis.velocity;
    const spd = Math.hypot(pv.x, pv.z);
    for (const b of [rag.pelvis, rag.torso]) {
      const v = b.velocity;
      b.applyImpulse(new CANNON2.Vec3(-v.x * B.stopBrake * b.mass, 0, -v.z * B.stopBrake * b.mass));
    }
    const back = spd > 0.3 ? { x: -pv.x / spd, z: -pv.z / spd } : facing(rag);
    s.dashTimer = B.stopDash;
    s.dashX = spd > 0.3 ? back.x : -back.x;
    s.dashZ = spd > 0.3 ? back.z : -back.z;
    s.stopTimer = B.stopCooldown;
    s.lockout = Math.max(s.lockout, B.stopLockout);
    s.lastTrickInfo = {
      x: p.x,
      z: p.z,
      dodgeX: s.dashX,
      dodgeZ: s.dashZ,
      ballX: 0,
      ballZ: 0
    };
    return true;
  }
  function stopCooldownOf(rag) {
    return Math.max(0, stateOf(rag).stopTimer / B.stopCooldown);
  }
  function tick(rag, dt) {
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
    if (s.rushTimer > 0) {
      s.rushTimer = Math.max(0, s.rushTimer - dt);
      if (rag.state !== "ACTIVE") {
        s.rushTimer = 0;
      } else {
        for (const b of rag.bodies) {
          b.applyForce(new CANNON2.Vec3(s.rushX * B.rushAccel * b.mass, 0, s.rushZ * B.rushAccel * b.mass));
        }
      }
    }
  }
  function tryRush(rag, ball, carrying) {
    if (carrying) return null;
    if (rag.state !== "ACTIVE") return null;
    const s = stateOf(rag);
    if (s.rushCd > 0 || s.rushTimer > 0) return null;
    const p = rag.pelvis.position;
    const d = Math.hypot(ball.position.x - p.x, ball.position.z - p.z);
    if (d <= B.kickRange || d > B.rushRange) return null;
    const dir = facing(rag);
    s.rushTimer = B.rushTime;
    s.rushX = dir.x;
    s.rushZ = dir.z;
    s.rushCd = B.rushCooldown;
    const total = rag.bodies.reduce((a, b) => a + b.mass, 0) || 1;
    for (const b of rag.bodies) {
      const k = B.rushImpulse * b.mass / total;
      b.applyImpulse(new CANNON2.Vec3(dir.x * k, 0, dir.z * k));
    }
    return { x: dir.x, z: dir.z };
  }
  function rushing(rag) {
    return stateOf(rag).rushTimer > 0;
  }
  function rushDir(rag) {
    const s = stateOf(rag);
    if (s.rushTimer <= 0) return null;
    return { x: s.rushX, z: s.rushZ };
  }
  function rushCooldownOf(rag) {
    return stateOf(rag).rushCd;
  }
  function dashDir(rag) {
    const s = stateOf(rag);
    if (s.dashTimer <= 0) return null;
    return { x: s.dashX, z: s.dashZ };
  }
  function forget(rag) {
    states.delete(rag);
  }
  function cooldownOf(rag) {
    return stateOf(rag).trickTimer;
  }
  return { dribble, tryKick, kickCooldownOf, carryPenalty, tryTrick, tick, forget, cooldownOf, requestPickup, scooping, scoopStep, dashDir, takeTouch, takeTrick, tryStopTurn, stopCooldownOf, tryRush, rushing, rushCooldownOf, rushDir };
}

// client/src/shapes.ts
import * as CANNON3 from "cannon-es";
function halfExtentsOf(body) {
  const shape = body.shapes[0];
  if (shape instanceof CANNON3.Box) return shape.halfExtents;
  if (shape instanceof CANNON3.Sphere) {
    const r2 = shape.radius;
    return new CANNON3.Vec3(r2, r2, r2);
  }
  const r = body.boundingRadius || 0.5;
  return new CANNON3.Vec3(r, r, r);
}
function surfacePointLocal(body, world) {
  const local = body.quaternion.clone().conjugate().vmult(world.vsub(body.position));
  const shape = body.shapes[0];
  if (shape instanceof CANNON3.Sphere) {
    const len = local.length();
    if (len < 1e-6) return new CANNON3.Vec3(0, shape.radius, 0);
    return local.scale(shape.radius / len);
  }
  const h = halfExtentsOf(body);
  return new CANNON3.Vec3(
    Math.max(-h.x, Math.min(h.x, local.x)),
    Math.max(-h.y, Math.min(h.y, local.y)),
    Math.max(-h.z, Math.min(h.z, local.z))
  );
}
function halfDepthAlong(body, dx, dz) {
  const shape = body.shapes[0];
  if (shape instanceof CANNON3.Sphere) return shape.radius;
  if (!(shape instanceof CANNON3.Box)) return 0;
  const h = shape.halfExtents;
  let sum = 0;
  const axis = new CANNON3.Vec3();
  for (const [ax, ext] of [
    [new CANNON3.Vec3(1, 0, 0), h.x],
    [new CANNON3.Vec3(0, 1, 0), h.y],
    [new CANNON3.Vec3(0, 0, 1), h.z]
  ]) {
    body.quaternion.vmult(ax, axis);
    sum += Math.abs(axis.x * dx + axis.z * dz) * ext;
  }
  return sum;
}
function halfHeight(body) {
  const shape = body.shapes[0];
  if (shape instanceof CANNON3.Sphere) return shape.radius;
  if (!(shape instanceof CANNON3.Box)) return 0;
  const h = shape.halfExtents;
  let sum = 0;
  const axis = new CANNON3.Vec3();
  for (const [ax, ext] of [
    [new CANNON3.Vec3(1, 0, 0), h.x],
    [new CANNON3.Vec3(0, 1, 0), h.y],
    [new CANNON3.Vec3(0, 0, 1), h.z]
  ]) {
    body.quaternion.vmult(ax, axis);
    sum += Math.abs(axis.y) * ext;
  }
  return sum;
}

// test/ball-test.ts
var pass = 0;
var fail = 0;
function check(name, cond, extra = "") {
  if (cond) {
    pass++;
    console.log(`  PASS  ${name}`);
  } else {
    fail++;
    console.log(`  FAIL  ${name} ${extra}`);
  }
}
var fin = (v) => Number.isFinite(v.x) && Number.isFinite(v.y) && Number.isFinite(v.z);
var GROUP_A = 2;
function build(ballAt = [0, -1.2]) {
  const physics = new CANNON4.World({ gravity: new CANNON4.Vec3(0, -18, 0) });
  physics.broadphase = new CANNON4.NaiveBroadphase();
  physics.allowSleep = false;
  physics.solver.iterations = 22;
  const groundMat = new CANNON4.Material("ground");
  const bodyMat = new CANNON4.Material("player");
  const ballMat = new CANNON4.Material("ball");
  physics.addContactMaterial(new CANNON4.ContactMaterial(groundMat, bodyMat, { friction: 0.55, restitution: 0 }));
  physics.addContactMaterial(new CANNON4.ContactMaterial(groundMat, ballMat, { friction: 0.32, restitution: 0.45 }));
  physics.addContactMaterial(new CANNON4.ContactMaterial(bodyMat, ballMat, { friction: 0.28, restitution: 0.35 }));
  const ground = new CANNON4.Body({
    type: CANNON4.Body.STATIC,
    shape: new CANNON4.Plane(),
    material: groundMat,
    collisionFilterGroup: GROUP_WORLD,
    collisionFilterMask: -1
  });
  ground.quaternion.setFromEuler(-Math.PI / 2, 0, 0);
  physics.addBody(ground);
  const scene = new THREE2.Scene();
  const rag = createRagdoll(
    physics,
    scene,
    new CANNON4.Vec3(0, P.rideHeight, 0),
    bodyMat,
    { skin: 16764057, shirt: 4164863, pants: 3355460 },
    GROUP_A,
    65535 & ~GROUP_A
  );
  const ball = new CANNON4.Body({
    mass: B.mass,
    shape: new CANNON4.Sphere(B.radius),
    position: new CANNON4.Vec3(ballAt[0], B.radius + 0.01, ballAt[1]),
    material: ballMat
  });
  ball.angularDamping = 0.22;
  ball.linearDamping = 0.012;
  physics.addBody(ball);
  const play = createBallPlay();
  const DT = 1 / 60;
  function step(mx, mz, opts = {}) {
    const input = { moveX: mx, moveZ: mz, jump: false };
    if (opts.aim) {
      input.aimX = opts.aim[0];
      input.aimZ = opts.aim[1];
    }
    rag.setHeld(opts.carrying ? [ball] : []);
    const dash = play.dashDir(rag);
    if (dash) {
      input.moveX = dash.x;
      input.moveZ = dash.z;
    }
    rag.control(DT, input, physics);
    play.tick(rag, DT);
    if (opts.trick) play.tryTrick(rag, ball, !!opts.carrying);
    if (opts.kick) play.tryKick(rag, ball, !!opts.carrying, opts.kickPower ?? 0);
    play.dribble(rag, ball, DT, !!opts.carrying);
    if (opts.carrying) play.carryPenalty(rag);
    physics.step(DT);
    rag.guard();
  }
  const gap = () => Math.hypot(ball.position.x - rag.pelvis.position.x, ball.position.z - rag.pelvis.position.z);
  return { physics, rag, ball, play, step, gap };
}
function settle(r, n = 90) {
  for (let i = 0; i < n; i++) r.step(0, 0);
}
console.log("\n--- TEST 1: Sphere\uAC00 grab/\uCE90\uB9AC \uCF54\uB4DC\uB97C \uD1B5\uACFC\uD558\uB294\uAC00 ---");
{
  const r = build();
  settle(r);
  const pivot = surfacePointLocal(r.ball, r.rag.handL.position);
  check("\uD45C\uBA74\uC810\uC774 \uC720\uD55C\uAC12", fin(pivot), JSON.stringify(pivot));
  check(
    "\uD45C\uBA74\uC810\uC774 \uACF5 \uD45C\uBA74 \uC704 (\uBC18\uC9C0\uB984\uACFC \uC77C\uCE58)",
    Math.abs(pivot.length() - B.radius) < 1e-6,
    `len=${pivot.length()}`
  );
  check(
    "\uBC18\uB450\uAED8 = \uBC18\uC9C0\uB984 (\uBC29\uD5A5 \uBB34\uAD00)",
    Math.abs(halfDepthAlong(r.ball, 1, 0) - B.radius) < 1e-9 && Math.abs(halfDepthAlong(r.ball, 0.6, 0.8) - B.radius) < 1e-9
  );
  check("\uBC18\uB192\uC774 = \uBC18\uC9C0\uB984", Math.abs(halfHeight(r.ball) - B.radius) < 1e-9);
  check(
    "\uAC00\uB9CC\uD788 \uB450\uBA74 \uACF5\uC774 \uBC14\uB2E5\uC5D0 \uC120\uB2E4",
    Math.abs(r.ball.position.y - B.radius) < 0.05,
    `y=${r.ball.position.y.toFixed(3)}`
  );
  check(
    "\uCE90\uB9AD\uD130\uB3C4 \uBA40\uCA61\uD788 \uC11C \uC788\uB2E4",
    r.rag.state === "ACTIVE" && Math.abs(r.rag.pelvis.position.y - P.rideHeight) < 0.1,
    `${r.rag.state} y=${r.rag.pelvis.position.y.toFixed(2)}`
  );
}
console.log("\n--- TEST 2: \uAC00\uB9CC\uD788 \uC11C \uC788\uC73C\uBA74 \uACF5\uC744 \uAC74\uB4DC\uB9AC\uC9C0 \uC54A\uB294\uB2E4 ---");
{
  const r = build([0, -1]);
  settle(r);
  const before = r.ball.position.clone();
  for (let i = 0; i < 120; i++) r.step(0, 0);
  const moved = Math.hypot(r.ball.position.x - before.x, r.ball.position.z - before.z);
  check("\uACF5\uC774 \uC81C\uC790\uB9AC\uC5D0 \uC788\uB2E4", moved < 0.05, `moved=${moved.toFixed(3)}`);
  check("\uCE90\uB9AD\uD130\uAC00 \uC548 \uB118\uC5B4\uC9C4\uB2E4", r.rag.state === "ACTIVE", r.rag.state);
}
console.log("\n--- TEST 3: \uC9C1\uC9C4 \uB4DC\uB9AC\uBE14 - \uACF5\uC774 \uBC1C \uC55E\uC5D0 \uB530\uB77C\uC628\uB2E4 ---");
{
  const r = build([0, -1]);
  settle(r);
  let maxGap = 0, minSpin = Infinity, rolled = 0;
  for (let i = 0; i < 200; i++) {
    r.step(0, -1);
    if (i > 60) {
      maxGap = Math.max(maxGap, r.gap());
      minSpin = Math.min(minSpin, r.ball.angularVelocity.length());
    }
  }
  rolled = Math.abs(r.ball.position.z);
  check("\uACF5\uC774 \uC2E4\uC81C\uB85C \uC55E\uC73C\uB85C \uB098\uAC14\uB2E4", rolled > 6, `z\uC774\uB3D9=${rolled.toFixed(1)}m`);
  check(
    "\uC8FC\uD589 \uC911 \uACF5\uC744 \uB193\uCE58\uC9C0 \uC54A\uB294\uB2E4 (\uAC04\uACA9 < range)",
    maxGap < B.range,
    `maxGap=${maxGap.toFixed(2)} (range=${B.range})`
  );
  check(
    "\uACF5\uC774 \uBBF8\uB044\uB7EC\uC9C0\uC9C0 \uC54A\uACE0 \uAD6C\uB978\uB2E4 (\uAC01\uC18D\uB3C4 \uC720\uC9C0)",
    minSpin > 3,
    `minSpin=${minSpin.toFixed(1)} rad/s`
  );
  check("\uB4DC\uB9AC\uBE14 \uC911\uC5D0\uB3C4 \uCE90\uB9AD\uD130\uAC00 \uC11C \uC788\uB2E4", r.rag.state === "ACTIVE", r.rag.state);
  check("\uBB3C\uB9AC\uAC00 \uC720\uD55C\uAC12", fin(r.ball.velocity) && fin(r.rag.pelvis.velocity));
}
console.log('\n--- TEST 4: \uC790\uC11D\uC774 \uC544\uB2C8\uB2E4 ("\uC57D\uD55C \uD798") ---');
{
  const r = build([0, -1]);
  settle(r);
  for (let i = 0; i < 150; i++) r.step(0, -1);
  const straightGap = r.gap();
  let maxGap = 0;
  for (let i = 0; i < 60; i++) {
    r.step(1, 0);
    maxGap = Math.max(maxGap, r.gap());
  }
  const pspd = Math.hypot(r.rag.pelvis.velocity.x, r.rag.pelvis.velocity.z);
  const predicted = B.leadBase + pspd * B.leadPerSpeed;
  check(
    "\uC9C1\uC9C4 \uC911\uC5D0\uB294 \uBC1C \uC55E, \uADF8 \uAC70\uB9AC\uAC00 \uC18D\uB3C4 \uBAA8\uB378\uACFC \uB9DE\uB294\uB2E4",
    Math.abs(straightGap - predicted) < 0.55,
    `gap=${straightGap.toFixed(2)} \uC608\uCE21=${predicted.toFixed(2)} (\uC18D\uB3C4 ${pspd.toFixed(2)})`
  );
  {
    const slow = build([0, -1]);
    settle(slow);
    for (let i = 0; i < 18; i++) slow.step(0, -1);
    const slowSpd = Math.hypot(slow.rag.pelvis.velocity.x, slow.rag.pelvis.velocity.z);
    const slowGap = slow.gap();
    check(
      "\uB290\uB9B4 \uB54C\uB294 \uACF5\uC774 \uB354 \uAC00\uAE4C\uC774 \uC788\uB2E4",
      slowGap < straightGap && slowSpd < pspd,
      `\uB290\uB9BC ${slowSpd.toFixed(2)}m/s gap=${slowGap.toFixed(2)} / \uBE60\uB984 ${pspd.toFixed(2)}m/s gap=${straightGap.toFixed(2)}`
    );
  }
  check(
    "\uAEBE\uC73C\uBA74 \uBC14\uAE65\uC73C\uB85C \uBD80\uD47C\uB2E4 (\uACE0\uC815 \uC624\uD504\uC14B\uC774 \uC544\uB2C8\uB2E4)",
    maxGap > straightGap * 1.2,
    `straight=${straightGap.toFixed(2)} -> turn=${maxGap.toFixed(2)}`
  );
  const r2 = build([0, -1]);
  settle(r2);
  const farZ = -(B.range + 1.5);
  r2.ball.position.set(0, B.radius, farZ);
  r2.ball.velocity.setZero();
  r2.ball.angularVelocity.setZero();
  for (let i = 0; i < 60; i++) r2.step(1, 0);
  const drift = Math.hypot(r2.ball.position.x, r2.ball.position.z - farZ);
  check("\uBC94\uC704 \uBC16 \uACF5\uC740 \uC804\uD600 \uB04C\uB824\uC624\uC9C0 \uC54A\uB294\uB2E4", drift < 0.05, `\uACF5\uC774\uB3D9=${drift.toFixed(3)}m`);
}
console.log("\n--- TEST 5: \uAC1C\uC778\uAE30 - \uACF5\uC744 \uB744\uC6B0\uACE0 \uBAB8\uC774 \uC606\uC73C\uB85C \uBE60\uC9C4\uB2E4 ---");
{
  const r = build([0, -0.9]);
  settle(r);
  for (let i = 0; i < 90; i++) r.step(0, -1);
  const ballBefore = r.ball.position.clone();
  const pelvisBefore = r.rag.pelvis.position.clone();
  const yBefore = r.ball.position.y;
  r.step(0, -1, { trick: true });
  let peakY = r.ball.position.y;
  for (let i = 0; i < 25; i++) {
    r.step(0, -1);
    peakY = Math.max(peakY, r.ball.position.y);
  }
  const lateral = Math.abs(r.rag.pelvis.position.x - pelvisBefore.x);
  check("\uACF5\uC774 \uC2E4\uC81C\uB85C \uB5B4\uB2E4", peakY > yBefore + 0.25, `${yBefore.toFixed(2)} -> ${peakY.toFixed(2)}`);
  check(
    "\uACF5\uC774 \uC606\uC73C\uB85C\uB3C4 \uAC14\uB2E4",
    Math.abs(r.ball.position.x - ballBefore.x) > 0.3,
    `dx=${(r.ball.position.x - ballBefore.x).toFixed(2)}`
  );
  check("\uCE90\uB9AD\uD130\uAC00 \uC606\uC73C\uB85C \uBE60\uC84C\uB2E4", lateral > 0.25, `dx=${lateral.toFixed(2)}`);
  check(
    "\uAC1C\uC778\uAE30 \uB4A4\uC5D0\uB3C4 \uCE90\uB9AD\uD130\uAC00 \uC0B4\uC544 \uC788\uB2E4",
    r.rag.state !== "RAGDOLL" || r.rag.pelvis.position.y > 0.2,
    r.rag.state
  );
  check("\uBB3C\uB9AC\uAC00 \uC720\uD55C\uAC12", fin(r.ball.velocity) && fin(r.rag.pelvis.velocity));
  const fired = r.play.tryTrick(r.rag, r.ball, false);
  check("\uCFE8\uB2E4\uC6B4 \uC911\uC5D0\uB294 \uB2E4\uC2DC \uC548 \uB098\uAC04\uB2E4", fired === false);
}
console.log("\n--- TEST 6: \uC548\uACE0 \uB6F0\uBA74 \uB290\uB824\uC9C4\uB2E4 ---");
{
  const a = build([0, -30]);
  settle(a);
  for (let i = 0; i < 200; i++) a.step(0, -1);
  const freeSpeed = Math.hypot(a.rag.pelvis.velocity.x, a.rag.pelvis.velocity.z);
  const b = build([0, -30]);
  settle(b);
  for (let i = 0; i < 200; i++) b.step(0, -1, { carrying: true });
  const carrySpeed = Math.hypot(b.rag.pelvis.velocity.x, b.rag.pelvis.velocity.z);
  check(
    "\uC548\uACE0 \uB6F0\uBA74 \uB290\uB824\uC9C4\uB2E4",
    carrySpeed < freeSpeed - 0.3,
    `free=${freeSpeed.toFixed(2)} carry=${carrySpeed.toFixed(2)} m/s`
  );
  check(
    "\uADF8\uB798\uB3C4 \uBABB \uAC78\uC744 \uC815\uB3C4\uB294 \uC544\uB2C8\uB2E4 (\uC790\uC720\uC18D\uB3C4\uC758 50% \uC774\uC0C1)",
    carrySpeed > freeSpeed * 0.5,
    `${(carrySpeed / freeSpeed * 100).toFixed(0)}%`
  );
  check(
    "\uCE90\uB9AC \uC18D\uB3C4\uAC00 carryDrag \uC124\uACC4\uC2DD\uACFC \uB9DE\uB294\uB2E4 (2.39 m/s \uADFC\uCC98)",
    Math.abs(carrySpeed - 2.39) < 0.6,
    `carry=${carrySpeed.toFixed(2)} \uC608\uCE21=2.39 m/s`
  );
  check(
    "\uC790\uC720 \uB2EC\uB9AC\uAE30\uAC00 maxSpeed\uC758 90% \uC774\uC0C1 (\uBB3C\uB9AC \uC548\uC815\uC131 \uC9C0\uD45C)",
    freeSpeed > P.maxSpeed * 0.9,
    `free=${freeSpeed.toFixed(2)} / maxSpeed=${P.maxSpeed}`
  );
  check("\uC548\uACE0 \uB6F0\uC5B4\uB3C4 \uC548 \uB118\uC5B4\uC9C4\uB2E4", b.rag.state === "ACTIVE", b.rag.state);
}
console.log("\n--- TEST 7: \uB118\uC5B4\uC838 \uC788\uC73C\uBA74 \uACF5\uC744 \uBABB \uBAAC\uB2E4 ---");
{
  const r = build([0, -1]);
  settle(r);
  r.rag.knockdown(1.5);
  const before = r.ball.position.clone();
  for (let i = 0; i < 60; i++) r.step(0, -1);
  const moved = Math.hypot(r.ball.position.x - before.x, r.ball.position.z - before.z);
  check("RAGDOLL \uC0C1\uD0DC\uC5D0\uC11C\uB294 \uB4DC\uB9AC\uBE14\uC774 \uC548 \uBA39\uB294\uB2E4", moved < 0.6, `moved=${moved.toFixed(2)}`);
  check("\uB109\uBC31\uC740 \uAE30\uC874 knockdown()\uC73C\uB85C \uB3D9\uC791", r.rag.state !== "ACTIVE", r.rag.state);
}
console.log("\n--- TEST 8: \uC624\uB798 \uAD74\uB824\uB3C4 \uBB3C\uB9AC\uAC00 \uC548 \uD130\uC9C4\uB2E4 ---");
{
  const r = build([0, -1]);
  settle(r);
  const dirs = [[0, -1], [1, 0], [0, 1], [-1, 0], [0.7, -0.7]];
  for (let k = 0; k < 5; k++) {
    const [mx, mz] = dirs[k % dirs.length];
    for (let i = 0; i < 120; i++) r.step(mx, mz, { trick: i === 60 });
  }
  check("\uACF5 \uC704\uCE58\uAC00 \uC720\uD55C\uAC12", fin(r.ball.position), r.ball.position.toString());
  check("\uACF5 \uC18D\uB3C4\uAC00 \uD3ED\uC8FC\uD558\uC9C0 \uC54A\uC74C", r.ball.velocity.length() < 40, `${r.ball.velocity.length().toFixed(1)} m/s`);
  check("\uCE90\uB9AD\uD130 \uACE8\uBC18\uC774 \uC720\uD55C\uAC12", fin(r.rag.pelvis.position));
  check(
    "\uCE90\uB9AD\uD130\uAC00 \uB545 \uC704\uC5D0 \uC788\uB2E4",
    r.rag.pelvis.position.y > 0 && r.rag.pelvis.position.y < 4,
    `y=${r.rag.pelvis.position.y.toFixed(2)}`
  );
}
console.log("\n--- TEST 9: \uD0A5\uC740 \uC774\uB3D9\uC774 \uC544\uB2C8\uB77C '\uBCF4\uB294 \uCABD'\uC73C\uB85C \uB098\uAC04\uB2E4 ---");
{
  const angles = [0, Math.PI / 2, Math.PI, -Math.PI / 2, 2.3];
  let worstErr = 0;
  for (const a of angles) {
    const ax = Math.sin(a), az = Math.cos(a);
    const r = build([0, -1]);
    for (let i = 0; i < 60; i++) r.step(0, -1);
    for (let i = 0; i < 30; i++) r.step(0, 0);
    const p = r.rag.pelvis.position;
    r.ball.position.set(p.x + ax * 0.9, B.radius + 0.01, p.z + az * 0.9);
    r.ball.velocity.setZero();
    r.ball.angularVelocity.setZero();
    for (let i = 0; i < 6; i++) r.step(0, 0, { aim: [ax, az] });
    r.step(0, 0, { aim: [ax, az], kick: true });
    const v = r.ball.velocity;
    const l = Math.hypot(v.x, v.z);
    const dot = l > 1e-6 ? (v.x * ax + v.z * az) / l : 0;
    const err = Math.acos(Math.max(-1, Math.min(1, dot))) * 180 / Math.PI;
    worstErr = Math.max(worstErr, err);
    check(
      `\uC870\uC900 ${Math.round(a * 180 / Math.PI)}\uB3C4\uB85C \uCC2C\uB2E4`,
      l > 3 && err < 12,
      `speed=${l.toFixed(2)} err=${err.toFixed(1)}\uB3C4`
    );
  }
  check("\uBAA8\uB4E0 \uBC29\uD5A5\uC5D0\uC11C \uC870\uC900\uACFC \uC5B4\uAE0B\uB0A8\uC774 \uC791\uB2E4", worstErr < 12, `\uCD5C\uB300 ${worstErr.toFixed(1)}\uB3C4`);
  {
    const r = build([0, -1]);
    for (let i = 0; i < 70; i++) r.step(1, 0, { aim: [0, -1] });
    const p = r.rag.pelvis.position;
    r.ball.position.set(p.x, B.radius + 0.01, p.z - 0.9);
    r.ball.velocity.setZero();
    r.ball.angularVelocity.setZero();
    for (let i = 0; i < 3; i++) r.step(1, 0, { aim: [0, -1] });
    const before = r.ball.velocity.clone();
    r.step(1, 0, { aim: [0, -1], kick: true, kickPower: 1 });
    const dvx = r.ball.velocity.x - before.x;
    const dvz = r.ball.velocity.z - before.z;
    check(
      "\uB2EC\uB9AC\uB294 \uC911\uC5D0\uB3C4 \uD0A5\uC740 \uC870\uC900(-Z) \uCABD\uC73C\uB85C",
      dvz < -3 && Math.abs(dvx) < Math.abs(dvz),
      `\u0394v=(${dvx.toFixed(2)}, ${dvz.toFixed(2)})`
    );
  }
}
console.log(`
RESULT: ${pass} passed, ${fail} failed`);
process.exit(fail === 0 ? 0 : 1);
