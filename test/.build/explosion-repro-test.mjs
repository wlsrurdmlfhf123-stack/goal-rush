// test/explosion-repro-test.ts
import * as THREE2 from "three";
import * as CANNON2 from "cannon-es";

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

// test/explosion-repro-test.ts
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
function build(iterations) {
  const physics = new CANNON2.World({ gravity: new CANNON2.Vec3(0, -18, 0) });
  physics.broadphase = new CANNON2.SAPBroadphase(physics);
  physics.allowSleep = false;
  physics.solver.iterations = iterations;
  const gm = new CANNON2.Material("g"), bm = new CANNON2.Material("b");
  physics.addContactMaterial(new CANNON2.ContactMaterial(gm, bm, { friction: 0.55, restitution: 0 }));
  const ground = new CANNON2.Body({
    type: CANNON2.Body.STATIC,
    shape: new CANNON2.Plane(),
    material: gm,
    collisionFilterGroup: GROUP_WORLD,
    collisionFilterMask: -1
  });
  ground.quaternion.setFromEuler(-Math.PI / 2, 0, 0);
  physics.addBody(ground);
  const scene = new THREE2.Scene();
  const rag = createRagdoll(
    physics,
    scene,
    new CANNON2.Vec3(0, P.rideHeight + 0.15, 0),
    bm,
    { skin: 16764328, shirt: 4164863, pants: 3752026 },
    2,
    GROUP_WORLD | 4
  );
  return { physics, rag };
}
function simulateBrowserLikeStart(iterations, spikeDt, substeps, clampFirst) {
  const { physics, rag } = build(iterations);
  const frameDts = [spikeDt, 0.033, 0.016, 0.016, 0.016, 0.016, 0.016, 0.016];
  let exploded = false;
  frameDts.forEach((rawDt, i) => {
    const dt = clampFirst && i < 5 ? Math.min(rawDt, 1 / 60) : Math.min(rawDt, 0.05);
    rag.control(dt, { moveX: 0, moveZ: 0, jump: false }, physics);
    physics.step(1 / 60, dt, substeps);
    if (rag.bodies.some((b) => !fin(b.position) || !fin(b.velocity))) exploded = true;
  });
  for (let i = 0; i < 300; i++) {
    rag.control(1 / 60, { moveX: 0, moveZ: 0, jump: false }, physics);
    physics.step(1 / 60, 1 / 60, substeps);
    rag.guard();
  }
  return { rag, exploded };
}
console.log("\n--- TEST 1: \uC7AC\uD604 - solver iterations 10(\uC218\uC815 \uC804) + dt \uC2A4\uD30C\uC774\uD06C(0.5s) + substep 3 ---");
{
  const { rag, exploded } = simulateBrowserLikeStart(10, 0.5, 3, false);
  const pelvisY = rag.pelvis.position.y;
  const airborne = pelvisY > 5 || !fin(rag.pelvis.position);
  console.log(`    [\uCC38\uACE0] exploded=${exploded} pelvisY=${fin(rag.pelvis.position) ? pelvisY.toFixed(2) : "NaN"} airborne=${airborne}`);
  console.log("    (\uC774 \uD569\uC131 \uC2DC\uB098\uB9AC\uC624\uB85C\uB294 \uC6D0\uBCF8 \uBC84\uADF8\uAC00 \uC7AC\uD604\uB418\uC9C0 \uC54A\uC74C - \uC2E4\uC81C \uBE0C\uB77C\uC6B0\uC800\uC758 \uBD88\uADDC\uCE59\uD55C \uD504\uB808\uC784 \uD0C0\uC774\uBC0D\uC740 \uD5E4\uB4DC\uB9AC\uC2A4\uB85C \uC644\uC804\uD788 \uC7AC\uD604 \uBD88\uAC00. \uC815\uBCF4\uC131 \uB85C\uADF8\uB9CC \uB0A8\uAE40)");
}
console.log("\n--- TEST 2: \uC218\uC815 \uD6C4 - solver iterations 22 + \uCD08\uBC18 dt clamp + substep 6 ---");
{
  const { rag, exploded } = simulateBrowserLikeStart(22, 0.5, 6, true);
  check("dt \uC2A4\uD30C\uC774\uD06C\uC5D0\uB3C4 \uBC1C\uC0B0\uD558\uC9C0 \uC54A\uC74C", !exploded);
  check("\uBAA8\uB4E0 \uD30C\uCE20 \uC720\uD55C\uAC12 \uC720\uC9C0", rag.bodies.every((b) => fin(b.position) && fin(b.velocity)));
  check(
    "\uC815\uC0C1\uC801\uC73C\uB85C \uC11C \uC788\uB294 \uB192\uC774\uB85C \uC548\uC815\uD654 (0.6~1.3)",
    rag.pelvis.position.y > 0.6 && rag.pelvis.position.y < 1.3,
    `y=${rag.pelvis.position.y.toFixed(3)}`
  );
  check("\uBAB8\uC774 \uD558\uB298\uB85C \uBC1C\uC0AC\uB418\uC9C0 \uC54A\uC74C", rag.pelvis.position.y < 3, `y=${rag.pelvis.position.y.toFixed(3)}`);
}
console.log("\n--- TEST 3: \uC5EC\uB7EC \uC2A4\uD3F0 \uC704\uCE58\uC5D0\uC11C \uB3D9\uC2DC\uC5D0 \uC2DC\uC791\uD574\uB3C4 \uC548\uC815\uC801\uC778\uAC00 (2\uC778 \uB3D9\uC2DC \uC2A4\uD3F0) ---");
{
  const physics = new CANNON2.World({ gravity: new CANNON2.Vec3(0, -18, 0) });
  physics.broadphase = new CANNON2.SAPBroadphase(physics);
  physics.allowSleep = false;
  physics.solver.iterations = 22;
  const gm = new CANNON2.Material("g"), bm = new CANNON2.Material("b");
  physics.addContactMaterial(new CANNON2.ContactMaterial(gm, bm, { friction: 0.55, restitution: 0 }));
  const ground = new CANNON2.Body({
    type: CANNON2.Body.STATIC,
    shape: new CANNON2.Plane(),
    material: gm,
    collisionFilterGroup: GROUP_WORLD,
    collisionFilterMask: -1
  });
  ground.quaternion.setFromEuler(-Math.PI / 2, 0, 0);
  physics.addBody(ground);
  const scene = new THREE2.Scene();
  const spawns = [[-2, 5], [2, 5]];
  const rags = spawns.map((s, i) => {
    const myGroup = 1 << i + 2;
    const mask = (GROUP_WORLD | 65534) & ~myGroup;
    return createRagdoll(
      physics,
      scene,
      new CANNON2.Vec3(s[0], P.rideHeight + 0.15, s[1]),
      bm,
      { skin: 16764328, shirt: i === 0 ? 4164863 : 16737860, pants: 3752026 },
      myGroup,
      mask
    );
  });
  const frameDts = [0.4, 0.03, 0.016, 0.016, 0.016];
  let exploded = false;
  frameDts.forEach((rawDt, i) => {
    const dt = i < 5 ? Math.min(rawDt, 1 / 60) : Math.min(rawDt, 0.05);
    for (const r of rags) r.control(dt, { moveX: 0, moveZ: 0, jump: false }, physics);
    physics.step(1 / 60, dt, 6);
    if (rags.some((r) => r.bodies.some((b) => !fin(b.position)))) exploded = true;
  });
  for (let i = 0; i < 300; i++) {
    for (const r of rags) r.control(1 / 60, { moveX: 0, moveZ: 0, jump: false }, physics);
    physics.step(1 / 60, 1 / 60, 6);
    for (const r of rags) r.guard();
  }
  check("2\uC778 \uB3D9\uC2DC \uC2A4\uD3F0 + dt \uC2A4\uD30C\uC774\uD06C\uC5D0\uB3C4 \uBC1C\uC0B0 \uC5C6\uC74C", !exploded);
  check(
    "\uB450 \uCE90\uB9AD\uD130 \uBAA8\uB450 \uC720\uD55C\uAC12 \uC720\uC9C0 (\uD3ED\uBC1C \uC5C6\uC74C)",
    rags.every((r) => r.bodies.every((b) => fin(b.position) && fin(b.velocity)))
  );
  check(
    "\uB450 \uCE90\uB9AD\uD130 \uBAA8\uB450 \uD569\uB9AC\uC801 \uBC94\uC704 \uB0B4 (\uD558\uB298\uB85C \uBC1C\uC0AC\uB418\uC9C0 \uC54A\uC74C, y<3)",
    rags.every((r) => r.pelvis.position.y > 0 && r.pelvis.position.y < 3),
    rags.map((r) => r.pelvis.position.y.toFixed(2)).join(",")
  );
  console.log(`    [\uCC38\uACE0] \uCD5C\uC885 \uB192\uC774: ${rags.map((r) => r.pelvis.position.y.toFixed(3)).join(", ")} (0.86 \uADFC\uCC98\uAC00 \uC774\uC0C1\uC801, \uB0AE\uC73C\uBA74 \uC6C5\uD06C\uB9BC \uC794\uC5EC \uC9C4\uB3D9)`);
}
console.log(`
RESULT: ${pass} passed, ${fail} failed`);
process.exit(fail === 0 ? 0 : 1);
