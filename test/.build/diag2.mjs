// test/.diag2.ts
import * as THREE2 from "three";
import * as CANNON2 from "cannon-es";

// client/src/ragdoll.ts
import * as THREE from "three";
import * as CANNON from "cannon-es";
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
  uprightDamp: 28,
  // 각속도 감쇠
  yawTorque: 26,
  // 이동 방향으로 몸을 돌리는 토크
  // 이동 (목표 속도 추종)
  moveAccel: 3.4,
  // 속도 오차 -> 가속 게인 (1/s). 클수록 반응이 빠릿
  moveForce: 620,
  // 가속력 상한 (N). 출발 순간 킥을 막는 안전장치
  maxSpeed: 4.6,
  // 목표 최고 속도
  airForceRatio: 0.22,
  brakeRatio: 0.75,
  // 입력 없을 때 감속 게인 배율 (1보다 작으면 살짝 미끄러짐)
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
function mkBody(r, sep, mass, pos, material, group, mask) {
  const b = new CANNON.Body({
    mass,
    position: pos.clone(),
    material,
    linearDamping: 0.02,
    angularDamping: 0.35,
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
function mkMesh(r, sep, color) {
  const geo = sep > 0 ? new THREE.CapsuleGeometry(r, sep, 8, 20) : new THREE.SphereGeometry(r, 24, 16);
  const mesh = new THREE.Mesh(geo, new THREE.MeshStandardMaterial({
    color,
    roughness: 0.42,
    metalness: 0.05
  }));
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  return mesh;
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
  add("pelvis", pelvis, mkMesh(DIM.pelvis.rx, 0, colors.pants));
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
  add("torso", torso, mkMesh(DIM.torso.r, DIM.torso.sep, colors.shirt));
  const headY = torsoY + DIM.head.y;
  const head = mkBody(
    DIM.head.r,
    0,
    DIM.head.mass,
    new CANNON.Vec3(O.x, headY, O.z),
    material,
    group,
    mask
  );
  add("head", head, mkMesh(DIM.head.r, 0, colors.skin));
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
    add("upperArm" + L, ua, mkMesh(DIM.upperArm.r, DIM.upperArm.sep, colors.shirt));
    const laY = uaY - DIM.upperArm.sep / 2 - DIM.lowerArm.sep / 2 - 0.05;
    const la = mkBody(
      DIM.lowerArm.r,
      DIM.lowerArm.sep,
      DIM.lowerArm.mass,
      new CANNON.Vec3(sx, laY, O.z),
      material,
      group,
      mask
    );
    add("lowerArm" + L, la, mkMesh(DIM.lowerArm.r, DIM.lowerArm.sep, colors.skin));
    const hY = laY - DIM.lowerArm.sep / 2 - DIM.hand.r - 0.02;
    const hand = mkBody(
      DIM.hand.r,
      0,
      DIM.hand.mass,
      new CANNON.Vec3(sx, hY, O.z),
      material,
      group,
      mask
    );
    add("hand" + L, hand, mkMesh(DIM.hand.r, 0, colors.skin));
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
    add("upperLeg" + L, ul, mkMesh(DIM.upperLeg.r, DIM.upperLeg.sep, colors.pants));
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
    add("lowerLeg" + L, ll, mkMesh(DIM.lowerLeg.r, DIM.lowerLeg.sep, colors.pants));
    const fY = llY - DIM.lowerLeg.sep / 2 - DIM.foot.r;
    const foot = mkBody(
      DIM.foot.r,
      0,
      DIM.foot.mass,
      new CANNON.Vec3(hx, fY, O.z + 0.03),
      material,
      group,
      mask
    );
    add("foot" + L, foot, mkMesh(DIM.foot.r, 0, colors.skin));
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
  let leanX = 0, leanZ = 0;
  let intentX = 0, intentZ = 0;
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
      if (up < P.fallTiltDot && spawnGrace <= 0) {
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
        recoverGrace = 0.5;
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
      (_tmp.y * tUz - _tmp.z * tUy) * tq - torso.angularVelocity.x * P.uprightDamp,
      -torso.angularVelocity.y * P.uprightDamp * 0.4,
      (_tmp.x * tUy - _tmp.y * tUx) * tq - torso.angularVelocity.z * P.uprightDamp
    ));
    pelvis.quaternion.vmult(_up, _tmp);
    applyTorque(pelvis, new CANNON.Vec3(
      (_tmp.y * tUz - _tmp.z * tUy) * tq * 0.6 - pelvis.angularVelocity.x * P.uprightDamp * 0.5,
      -pelvis.angularVelocity.y * P.uprightDamp * 0.25,
      (_tmp.x * tUy - _tmp.y * tUx) * tq * 0.6 - pelvis.angularVelocity.z * P.uprightDamp * 0.5
    ));
    const vx = pelvis.velocity.x, vz = pelvis.velocity.z;
    const spd = Math.hypot(vx, vz);
    const mLen = Math.hypot(input.moveX, input.moveZ);
    const moving = mLen > 0.01;
    const dx = moving ? input.moveX / mLen : 0;
    const dz = moving ? input.moveZ / mLen : 0;
    intentX = dx;
    intentZ = dz;
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
      applyTorque(torso, new CANNON.Vec3(0, dYaw * P.yawTorque * gain, 0));
    }
    if (grounded && spd > 0.15) {
      const speedFrac = Math.min(1, spd / (P.maxSpeed * 0.75));
      swingPhase += dt * P.swingSpeed * (0.35 + 0.65 * speedFrac);
      const s = Math.sin(swingPhase);
      const hx = spd > 0.01 ? vx / spd : dx;
      const hz = spd > 0.01 ? vz / spd : dz;
      const swing = P.legSwing * gain * speedFrac;
      applyTorque(legL.ul, new CANNON.Vec3(hz * s * swing, 0, -hx * s * swing));
      applyTorque(legR.ul, new CANNON.Vec3(-hz * s * swing, 0, hx * s * swing));
      const kneeSwing = P.kneeSwing * gain * speedFrac;
      const sk = Math.sin(swingPhase - Math.PI / 2);
      applyTorque(legL.ll, new CANNON.Vec3(hz * sk * kneeSwing, 0, -hx * sk * kneeSwing));
      applyTorque(legR.ll, new CANNON.Vec3(-hz * sk * kneeSwing, 0, hx * sk * kneeSwing));
      if (carrying === 0) {
        const aswing = P.armSwing * gain * speedFrac;
        applyTorque(armL.ua, new CANNON.Vec3(-hz * s * aswing, 0, hx * s * aswing));
        applyTorque(armR.ua, new CANNON.Vec3(hz * s * aswing, 0, -hx * s * aswing));
      }
    }
    const liftableHeld = carriedMass * Math.abs(physics2.gravity.y) <= P.carryLiftStrength;
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
          (cur.y * nz - cur.z * ny) * ct - ua.angularVelocity.x * P.carryDamp,
          (cur.z * nx - cur.x * nz) * ct - ua.angularVelocity.y * P.carryDamp,
          (cur.x * ny - cur.y * nx) * ct - ua.angularVelocity.z * P.carryDamp
        ));
      }
      const et = P.carryTorque * 0.55 * gain;
      for (const la of [armL.la, armR.la]) {
        const cur = new CANNON.Vec3(0, -1, 0);
        la.quaternion.vmult(cur, cur);
        applyTorque(la, new CANNON.Vec3(
          (cur.y * nz - cur.z * ny) * et - la.angularVelocity.x * P.carryDamp,
          (cur.z * nx - cur.x * nz) * et - la.angularVelocity.y * P.carryDamp,
          (cur.x * ny - cur.y * nx) * et - la.angularVelocity.z * P.carryDamp
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
    setHeld(bodies2) {
      carrying = bodies2.length;
      heldBodies.clear();
      carriedMass = 0;
      for (const b of bodies2) {
        heldBodies.add(b);
        carriedMass += b.mass;
      }
    },
    reset,
    guard,
    dispose(w, s) {
      for (const c of constraints) w.removeConstraint(c);
      for (const b of bodies) w.removeBody(b);
      s.remove(g);
    }
  };
  return rag;
}

// client/src/input-math.ts
function groupFor(playerId) {
  return 1 << playerId % 10 + 1;
}
function ragdollMask(myGroup) {
  return 65535 & ~myGroup;
}

// test/.diag2.ts
function build() {
  const physics = new CANNON2.World({ gravity: new CANNON2.Vec3(0, -18, 0) });
  physics.broadphase = new CANNON2.SAPBroadphase(physics);
  physics.allowSleep = false;
  physics.solver.iterations = 22;
  physics.solver.tolerance = 5e-4;
  const groundMat = new CANNON2.Material("ground");
  const playerMat = new CANNON2.Material("player");
  const propMat = new CANNON2.Material("prop");
  physics.addContactMaterial(new CANNON2.ContactMaterial(groundMat, playerMat, { friction: 0.55, restitution: 0 }));
  physics.addContactMaterial(new CANNON2.ContactMaterial(groundMat, propMat, { friction: 0.2, restitution: 0.05 }));
  physics.addContactMaterial(new CANNON2.ContactMaterial(playerMat, propMat, { friction: 0.3, restitution: 0.05 }));
  const ground = new CANNON2.Body({ type: CANNON2.Body.STATIC, shape: new CANNON2.Plane(), material: groundMat });
  ground.quaternion.setFromEuler(-Math.PI / 2, 0, 0);
  physics.addBody(ground);
  const g = groupFor(1);
  const scene = new THREE2.Scene();
  const rag = createRagdoll(
    physics,
    scene,
    new CANNON2.Vec3(0, P.rideHeight + 0.15, 0),
    playerMat,
    { skin: 16764057, shirt: 4164863, pants: 3355460 },
    g,
    ragdollMask(g)
  );
  return { physics, rag, propMat, scene };
}
function grabPivotOn(body, hand) {
  const local = body.quaternion.clone().conjugate().vmult(hand.position.vsub(body.position));
  const h = body.shapes[0].halfExtents;
  return new CANNON2.Vec3(
    Math.max(-h.x, Math.min(h.x, local.x)),
    Math.max(-h.y, Math.min(h.y, local.y)),
    Math.max(-h.z, Math.min(h.z, local.z))
  );
}
function surfaceDist(body, hand) {
  const wp = body.position.vadd(body.quaternion.vmult(grabPivotOn(body, hand)));
  return wp.distanceTo(hand.position);
}
var NONE = { moveX: 0, moveZ: 0, jump: false };
console.log("=== \uAC00\uB9CC\uD788 \uC11C \uC788\uC744 \uB54C \uC190 \uC704\uCE58 (grabReach=" + P.grabReach + ") ===");
{
  const { physics, rag } = build();
  for (let i = 0; i < 240; i++) {
    rag.control(1 / 60, NONE, physics);
    physics.step(1 / 60);
    rag.guard();
  }
  const h = rag.handL, hr = rag.handR;
  console.log(`  pelvis=(${rag.pelvis.position.x.toFixed(2)},${rag.pelvis.position.y.toFixed(2)},${rag.pelvis.position.z.toFixed(2)})`);
  console.log(`  handL =(${h.position.x.toFixed(2)},${h.position.y.toFixed(2)},${h.position.z.toFixed(2)})`);
  console.log(`  handR =(${hr.position.x.toFixed(2)},${hr.position.y.toFixed(2)},${hr.position.z.toFixed(2)})`);
  const torsoFwd = new CANNON2.Vec3(0, 0, 1);
  rag.torso.quaternion.vmult(torsoFwd, torsoFwd);
  console.log(`  torso forward = (${torsoFwd.x.toFixed(2)},${torsoFwd.y.toFixed(2)},${torsoFwd.z.toFixed(2)})`);
}
console.log("\n=== \uB0C9\uC7A5\uACE0\uB97C \uC815\uBA74 \uC5EC\uB7EC \uAC70\uB9AC\uC5D0 \uB450\uACE0 \uC190-\uD45C\uBA74 \uAC70\uB9AC \uCE21\uC815 ===");
for (const dz of [0.8, 1, 1.2, 1.4, 1.6, 1.8]) {
  const { physics, rag, propMat } = build();
  const fridge = new CANNON2.Body({
    mass: 20,
    shape: new CANNON2.Box(new CANNON2.Vec3(0.6, 1.1, 0.5)),
    position: new CANNON2.Vec3(0, 1.1, dz),
    material: propMat
  });
  fridge.angularDamping = 0.2;
  fridge.linearDamping = 0.02;
  physics.addBody(fridge);
  for (let i = 0; i < 240; i++) {
    rag.control(1 / 60, NONE, physics);
    physics.step(1 / 60);
    rag.guard();
  }
  const dL = surfaceDist(fridge, rag.handL), dR = surfaceDist(fridge, rag.handR);
  const centerL = fridge.position.distanceTo(rag.handL.position);
  const within = fridge.position.distanceTo(rag.handL.position) <= 2.4;
  console.log(`  \uB0C9\uC7A5\uACE0z=${dz.toFixed(1)}  \uC190-\uD45C\uBA74 L=${dL.toFixed(3)} R=${dR.toFixed(3)}  \uC911\uC2EC\uAC70\uB9AC=${centerL.toFixed(2)}(radius2.4:${within ? "OK" : "\uBC16"})  -> grab ${dL < P.grabReach || dR < P.grabReach ? "\uAC00\uB2A5" : "\uBD88\uAC00"}   pelvisY=${rag.pelvis.position.y.toFixed(2)} state=${rag.state}`);
}
console.log("\n=== \uC791\uC740 \uC0C1\uC790(0.8) \uC815\uBA74 \uC5EC\uB7EC \uAC70\uB9AC ===");
for (const dz of [0.6, 0.8, 1, 1.2]) {
  const { physics, rag, propMat } = build();
  const box = new CANNON2.Body({
    mass: 4,
    shape: new CANNON2.Box(new CANNON2.Vec3(0.4, 0.4, 0.4)),
    position: new CANNON2.Vec3(0, 0.4, dz),
    material: propMat
  });
  box.angularDamping = 0.2;
  box.linearDamping = 0.02;
  physics.addBody(box);
  for (let i = 0; i < 240; i++) {
    rag.control(1 / 60, NONE, physics);
    physics.step(1 / 60);
    rag.guard();
  }
  const dL = surfaceDist(box, rag.handL), dR = surfaceDist(box, rag.handR);
  console.log(`  \uC0C1\uC790z=${dz.toFixed(1)}  \uC190-\uD45C\uBA74 L=${dL.toFixed(3)} R=${dR.toFixed(3)} -> grab ${dL < P.grabReach || dR < P.grabReach ? "\uAC00\uB2A5" : "\uBD88\uAC00"}`);
}
