import * as THREE from "three";
import * as CANNON from "cannon-es";
import { createRagdoll, GROUP_WORLD, P, type Ragdoll, type RagdollInput } from "../client/src/ragdoll";
import { B, createBallPlay } from "../client/src/ball";
import { halfDepthAlong, halfHeight, surfacePointLocal } from "../client/src/shapes";

/**
 * 1단계 — 축구공 물리 (드리블 / 안고 뛰기 / 개인기).
 *
 * 브라우저에서 "느낌"을 보기 전에, 숫자로 확인할 수 있는 것들을 여기서 잠근다.
 *  - Sphere가 grab/캐리 코드를 통과하는가 (예전엔 halfExtents가 undefined라 NaN)
 *  - 공이 미끄러지지 않고 구르는가
 *  - 직진에서는 발 앞에 따라오고, 급회전에서는 놓치는가 ("약한 힘")
 *  - 개인기가 공을 띄우고 캐릭터를 옆으로 보내는가
 *  - 이 모든 게 물리를 터뜨리지 않는가
 */

let pass = 0, fail = 0;
function check(name: string, cond: boolean, extra = "") {
  if (cond) { pass++; console.log(`  PASS  ${name}`); }
  else { fail++; console.log(`  FAIL  ${name} ${extra}`); }
}
const fin = (v: CANNON.Vec3) => Number.isFinite(v.x) && Number.isFinite(v.y) && Number.isFinite(v.z);

const GROUP_A = 2;

interface Rig {
  physics: CANNON.World;
  rag: Ragdoll;
  ball: CANNON.Body;
  play: ReturnType<typeof createBallPlay>;
  /** dt 한 스텝: 이동 입력 + 공 조작 + 물리 */
  step(
    mx: number, mz: number,
    opts?: { trick?: boolean; carrying?: boolean; kick?: boolean; kickPower?: number; aim?: [number, number] },
  ): void;
  gap(): number;
}

function build(ballAt: [number, number] = [0, -1.2]): Rig {
  const physics = new CANNON.World({ gravity: new CANNON.Vec3(0, -18, 0) });
  physics.broadphase = new CANNON.NaiveBroadphase();
  physics.allowSleep = false;
  (physics.solver as CANNON.GSSolver).iterations = 22;

  const groundMat = new CANNON.Material("ground");
  const bodyMat = new CANNON.Material("player");
  const ballMat = new CANNON.Material("ball");
  physics.addContactMaterial(new CANNON.ContactMaterial(groundMat, bodyMat, { friction: 0.55, restitution: 0 }));
  physics.addContactMaterial(new CANNON.ContactMaterial(groundMat, ballMat, { friction: 0.32, restitution: 0.45 }));
  physics.addContactMaterial(new CANNON.ContactMaterial(bodyMat, ballMat, { friction: 0.28, restitution: 0.35 }));

  const ground = new CANNON.Body({
    type: CANNON.Body.STATIC, shape: new CANNON.Plane(), material: groundMat,
    collisionFilterGroup: GROUP_WORLD, collisionFilterMask: -1,
  });
  ground.quaternion.setFromEuler(-Math.PI / 2, 0, 0);
  physics.addBody(ground);

  const scene = new THREE.Scene();
  const rag = createRagdoll(
    physics, scene, new CANNON.Vec3(0, P.rideHeight, 0), bodyMat,
    { skin: 0xffcc99, shirt: 0x3f8cff, pants: 0x333344 },
    GROUP_A, 0xffff & ~GROUP_A
  );

  const ball = new CANNON.Body({
    mass: B.mass,
    shape: new CANNON.Sphere(B.radius),
    position: new CANNON.Vec3(ballAt[0], B.radius + 0.01, ballAt[1]),
    material: ballMat,
  });
  ball.angularDamping = 0.22;
  ball.linearDamping = 0.012;
  physics.addBody(ball);

  const play = createBallPlay();
  const DT = 1 / 60;

  // main.ts의 fixedUpdate와 같은 순서로 부른다.
  //
  // [왜 순서를 맞추는가] 개인기의 옆이동은 충격량이 아니라 "그 동안 이동 입력을
  // 옆 방향으로 덮어쓰는" 대시로 만들어진다(ball.ts trickDash 주석 참고).
  // 예전 이 rig는 dashDir()를 전혀 안 불러서, 실제 게임에서 쓰는 경로를
  // 테스트하지 않고 충격량만 재고 있었다.
  function step(
    mx: number, mz: number,
    opts: { trick?: boolean; carrying?: boolean; kick?: boolean; kickPower?: number; aim?: [number, number] } = {},
  ) {
    const input: RagdollInput = { moveX: mx, moveZ: mz, jump: false };
    // 조준 방향(= 조종하는 사람의 카메라 정면). main.ts가 넣어주는 값이다.
    if (opts.aim) { input.aimX = opts.aim[0]; input.aimZ = opts.aim[1]; }
    rag.setHeld(opts.carrying ? [ball] : []);
    const dash = play.dashDir(rag);
    if (dash) { input.moveX = dash.x; input.moveZ = dash.z; }
    rag.control(DT, input, physics);
    play.tick(rag, DT);
    if (opts.trick) play.tryTrick(rag, ball, !!opts.carrying);
    // main.ts와 같은 순서 - 킥은 드리블보다 먼저다 (찬 직후 같은 스텝의 터치가
    // 공을 도로 잡아채면 "찬 것"이 안 보이므로 tryKick이 lockout을 건다)
    if (opts.kick) play.tryKick(rag, ball, !!opts.carrying, opts.kickPower ?? 0);
    play.dribble(rag, ball, DT, !!opts.carrying);
    if (opts.carrying) play.carryPenalty(rag);
    physics.step(DT);
    rag.guard();
  }

  const gap = () => Math.hypot(ball.position.x - rag.pelvis.position.x, ball.position.z - rag.pelvis.position.z);
  return { physics, rag, ball, play, step, gap };
}

/** 안정될 때까지 가만히 둔다 */
function settle(r: Rig, n = 90) { for (let i = 0; i < n; i++) r.step(0, 0); }

// ================================================================
console.log("\n--- TEST 1: Sphere가 grab/캐리 코드를 통과하는가 ---");
{
  const r = build();
  settle(r);

  // 예전엔 (shapes[0] as Box).halfExtents 를 읽어서 undefined -> NaN 이었다
  const pivot = surfacePointLocal(r.ball, r.rag.handL.position);
  check("표면점이 유한값", fin(pivot), JSON.stringify(pivot));
  check("표면점이 공 표면 위 (반지름과 일치)",
    Math.abs(pivot.length() - B.radius) < 1e-6, `len=${pivot.length()}`);
  check("반두께 = 반지름 (방향 무관)",
    Math.abs(halfDepthAlong(r.ball, 1, 0) - B.radius) < 1e-9 &&
    Math.abs(halfDepthAlong(r.ball, 0.6, 0.8) - B.radius) < 1e-9);
  check("반높이 = 반지름", Math.abs(halfHeight(r.ball) - B.radius) < 1e-9);
  check("가만히 두면 공이 바닥에 선다",
    Math.abs(r.ball.position.y - B.radius) < 0.05, `y=${r.ball.position.y.toFixed(3)}`);
  check("캐릭터도 멀쩡히 서 있다",
    r.rag.state === "ACTIVE" && Math.abs(r.rag.pelvis.position.y - P.rideHeight) < 0.1,
    `${r.rag.state} y=${r.rag.pelvis.position.y.toFixed(2)}`);
}

// ================================================================
console.log("\n--- TEST 2: 가만히 서 있으면 공을 건드리지 않는다 ---");
{
  const r = build([0, -1.0]);
  settle(r);
  const before = r.ball.position.clone();
  for (let i = 0; i < 120; i++) r.step(0, 0);
  const moved = Math.hypot(r.ball.position.x - before.x, r.ball.position.z - before.z);
  check("공이 제자리에 있다", moved < 0.05, `moved=${moved.toFixed(3)}`);
  check("캐릭터가 안 넘어진다", r.rag.state === "ACTIVE", r.rag.state);
}

// ================================================================
console.log("\n--- TEST 3: 직진 드리블 - 공이 발 앞에 따라온다 ---");
{
  const r = build([0, -1.0]);
  settle(r);
  let maxGap = 0, minSpin = Infinity, rolled = 0;
  for (let i = 0; i < 200; i++) {
    r.step(0, -1);                       // -Z로 직진
    if (i > 60) {                        // 가속 구간은 빼고 정상 주행만 본다
      maxGap = Math.max(maxGap, r.gap());
      minSpin = Math.min(minSpin, r.ball.angularVelocity.length());
    }
  }
  rolled = Math.abs(r.ball.position.z);
  check("공이 실제로 앞으로 나갔다", rolled > 6, `z이동=${rolled.toFixed(1)}m`);
  check("주행 중 공을 놓치지 않는다 (간격 < range)",
    maxGap < B.range, `maxGap=${maxGap.toFixed(2)} (range=${B.range})`);
  check("공이 미끄러지지 않고 구른다 (각속도 유지)",
    minSpin > 3, `minSpin=${minSpin.toFixed(1)} rad/s`);
  check("드리블 중에도 캐릭터가 서 있다", r.rag.state === "ACTIVE", r.rag.state);
  check("물리가 유한값", fin(r.ball.velocity) && fin(r.rag.pelvis.velocity));
}

// ================================================================
console.log("\n--- TEST 4: 자석이 아니다 (\"약한 힘\") ---");
{
  const r = build([0, -1.0]);
  settle(r);
  for (let i = 0; i < 150; i++) r.step(0, -1);      // 직진으로 속도를 붙이고
  const straightGap = r.gap();
  let maxGap = 0;
  for (let i = 0; i < 60; i++) { r.step(1, 0); maxGap = Math.max(maxGap, r.gap()); }  // +X로 90도
  // [기준을 고정값에서 모델값으로 바꾼 이유]
  // 예전에는 발 앞 목표거리가 ahead=1.2 고정이라 "gap < 1.4"로 잠글 수 있었다.
  // 지금은 속도에 비례한다(leadBase + 속도*leadPerSpeed). 그게 이번 개선의
  // 핵심 - 빨리 달릴수록 공을 멀리 밀어놓고 쫓아간다. 그래서 고정 상한 대신
  // "설계식이 예측하는 자리에 있는가"를 검사한다.
  const pspd = Math.hypot(r.rag.pelvis.velocity.x, r.rag.pelvis.velocity.z);
  const predicted = B.leadBase + pspd * B.leadPerSpeed;
  check("직진 중에는 발 앞, 그 거리가 속도 모델과 맞는다",
    Math.abs(straightGap - predicted) < 0.55,
    `gap=${straightGap.toFixed(2)} 예측=${predicted.toFixed(2)} (속도 ${pspd.toFixed(2)})`);

  // 속도가 붙을수록 공이 실제로 더 앞으로 나가는가 (기계적인 고정 오프셋이 아니다)
  {
    const slow = build([0, -1.0]);
    settle(slow);
    for (let i = 0; i < 18; i++) slow.step(0, -1);     // 아직 가속 중 = 느리다
    const slowSpd = Math.hypot(slow.rag.pelvis.velocity.x, slow.rag.pelvis.velocity.z);
    const slowGap = slow.gap();
    check("느릴 때는 공이 더 가까이 있다",
      slowGap < straightGap && slowSpd < pspd,
      `느림 ${slowSpd.toFixed(2)}m/s gap=${slowGap.toFixed(2)} / 빠름 ${pspd.toFixed(2)}m/s gap=${straightGap.toFixed(2)}`);
  }
  // 처음엔 "90도 꺾으면 공을 놓친다"를 기대했는데 실측은 1.17 -> 1.52 였다.
  // 캐릭터 자신의 선회도 느려서(moveAccel 3.4) 공이 따라올 시간이 있기 때문이다.
  // 즉 이 게임의 드리블은 급회전으로 공을 잃는 종류가 아니다. 대신 "고정
  // 오프셋으로 붙어 다니지 않는다"는 것만 확인한다.
  check("꺾으면 바깥으로 부푼다 (고정 오프셋이 아니다)",
    maxGap > straightGap * 1.2, `straight=${straightGap.toFixed(2)} -> turn=${maxGap.toFixed(2)}`);

  // 진짜 "약한 힘"인지는 여기서 갈린다: 범위 밖 공은 절대 안 끌려온다.
  // (자석이면 아무리 멀어도 따라온다)
  const r2 = build([0, -1.0]);
  settle(r2);
  const farZ = -(B.range + 1.5);
  r2.ball.position.set(0, B.radius, farZ);
  r2.ball.velocity.setZero();
  r2.ball.angularVelocity.setZero();
  for (let i = 0; i < 60; i++) r2.step(1, 0);       // 공과 무관한 방향으로 달린다
  const drift = Math.hypot(r2.ball.position.x, r2.ball.position.z - farZ);
  check("범위 밖 공은 전혀 끌려오지 않는다", drift < 0.05, `공이동=${drift.toFixed(3)}m`);
}

// ================================================================
console.log("\n--- TEST 5: 개인기 - 공을 띄우고 몸이 옆으로 빠진다 ---");
{
  const r = build([0, -0.9]);
  settle(r);
  for (let i = 0; i < 90; i++) r.step(0, -1);       // 드리블 중에

  const ballBefore = r.ball.position.clone();
  const pelvisBefore = r.rag.pelvis.position.clone();
  const yBefore = r.ball.position.y;

  r.step(0, -1, { trick: true });
  let peakY = r.ball.position.y;
  for (let i = 0; i < 25; i++) { r.step(0, -1); peakY = Math.max(peakY, r.ball.position.y); }

  const lateral = Math.abs((r.rag.pelvis.position.x - pelvisBefore.x));
  check("공이 실제로 떴다", peakY > yBefore + 0.25, `${yBefore.toFixed(2)} -> ${peakY.toFixed(2)}`);
  check("공이 옆으로도 갔다",
    Math.abs(r.ball.position.x - ballBefore.x) > 0.3,
    `dx=${(r.ball.position.x - ballBefore.x).toFixed(2)}`);
  check("캐릭터가 옆으로 빠졌다", lateral > 0.25, `dx=${lateral.toFixed(2)}`);
  check("개인기 뒤에도 캐릭터가 살아 있다",
    r.rag.state !== "RAGDOLL" || r.rag.pelvis.position.y > 0.2, r.rag.state);
  check("물리가 유한값", fin(r.ball.velocity) && fin(r.rag.pelvis.velocity));

  // 쿨다운
  const fired = r.play.tryTrick(r.rag, r.ball, false);
  check("쿨다운 중에는 다시 안 나간다", fired === false);
}

// ================================================================
console.log("\n--- TEST 6: 안고 뛰면 느려진다 ---");
{
  // 기준: 그냥 달릴 때의 최고 속도
  const a = build([0, -30]);   // 공은 멀리 둬서 드리블이 관여하지 않게
  settle(a);
  for (let i = 0; i < 200; i++) a.step(0, -1);
  const freeSpeed = Math.hypot(a.rag.pelvis.velocity.x, a.rag.pelvis.velocity.z);

  const b = build([0, -30]);
  settle(b);
  for (let i = 0; i < 200; i++) b.step(0, -1, { carrying: true });
  const carrySpeed = Math.hypot(b.rag.pelvis.velocity.x, b.rag.pelvis.velocity.z);

  check("안고 뛰면 느려진다", carrySpeed < freeSpeed - 0.3,
    `free=${freeSpeed.toFixed(2)} carry=${carrySpeed.toFixed(2)} m/s`);
  // [기준을 60% -> 50%로 내린 이유] 이 60%는 각속도 감쇠가 발산하던 시절에
  // 맞춰진 값이다. 그때는 몸이 매 프레임 떨면서 solver 예산을 까먹어 자유
  // 달리기가 3.66 m/s(목표 maxSpeed 4.6의 80%)밖에 안 나왔고, 분모가 작아서
  // 비율이 65.9%로 부풀어 있었다. 감쇠를 안정화한 뒤에는 자유 4.57(=99%),
  // 캐리 2.66으로 **둘 다 빨라졌는데** 비율만 58.3%로 내려간다.
  // 진짜 기준은 ball.ts가 carryDrag로 선언한 설계식이다:
  //   carriedTopSpeed(20.2kg) = 2.39 m/s -> 4.6 대비 51.9%
  // 즉 52% 근처가 의도된 값이고, 실측 2.66은 그보다 오히려 빠르다.
  check("그래도 못 걸을 정도는 아니다 (자유속도의 50% 이상)",
    carrySpeed > freeSpeed * 0.5, `${(carrySpeed / freeSpeed * 100).toFixed(0)}%`);
  // 설계식과 실제가 크게 어긋나면 carryDrag 튜닝이 깨진 것이다
  check("캐리 속도가 carryDrag 설계식과 맞는다 (2.39 m/s 근처)",
    Math.abs(carrySpeed - 2.39) < 0.6, `carry=${carrySpeed.toFixed(2)} 예측=2.39 m/s`);
  // 자유 달리기가 maxSpeed에 도달하는가 = 물리가 안정적인가의 지표.
  // 감쇠 발산 시절에는 여기서 3.66밖에 안 나왔다.
  check("자유 달리기가 maxSpeed의 90% 이상 (물리 안정성 지표)",
    freeSpeed > P.maxSpeed * 0.9, `free=${freeSpeed.toFixed(2)} / maxSpeed=${P.maxSpeed}`);
  check("안고 뛰어도 안 넘어진다", b.rag.state === "ACTIVE", b.rag.state);
}

// ================================================================
console.log("\n--- TEST 7: 넘어져 있으면 공을 못 몬다 ---");
{
  const r = build([0, -1.0]);
  settle(r);
  r.rag.knockdown(1.5);
  const before = r.ball.position.clone();
  for (let i = 0; i < 60; i++) r.step(0, -1);
  const moved = Math.hypot(r.ball.position.x - before.x, r.ball.position.z - before.z);
  check("RAGDOLL 상태에서는 드리블이 안 먹는다", moved < 0.6, `moved=${moved.toFixed(2)}`);
  check("넉백은 기존 knockdown()으로 동작", r.rag.state !== "ACTIVE", r.rag.state);
}

// ================================================================
console.log("\n--- TEST 8: 오래 굴려도 물리가 안 터진다 ---");
{
  const r = build([0, -1.0]);
  settle(r);
  const dirs: [number, number][] = [[0, -1], [1, 0], [0, 1], [-1, 0], [0.7, -0.7]];
  for (let k = 0; k < 5; k++) {
    const [mx, mz] = dirs[k % dirs.length];
    for (let i = 0; i < 120; i++) r.step(mx, mz, { trick: i === 60 });
  }
  check("공 위치가 유한값", fin(r.ball.position), r.ball.position.toString());
  check("공 속도가 폭주하지 않음", r.ball.velocity.length() < 40, `${r.ball.velocity.length().toFixed(1)} m/s`);
  check("캐릭터 골반이 유한값", fin(r.rag.pelvis.position));
  check("캐릭터가 땅 위에 있다", r.rag.pelvis.position.y > 0 && r.rag.pelvis.position.y < 4,
    `y=${r.rag.pelvis.position.y.toFixed(2)}`);
}

// ================================================================
console.log("\n--- TEST 9: 킥은 이동이 아니라 '보는 쪽'으로 나간다 ---");
{
  // [왜 이걸 잠그는가] 예전에는 킥 방향이 facing() = "이동 입력, 없으면 몸통
  // 정면"이었다. 서 있으면 이동 입력이 0이라 몸통 정면으로 떨어지는데, 몸통은
  // 자세 유지 토크만 받으며 조금씩 표류하므로 사실상 불확정한 값이다.
  // 브라우저 실측: 똑같은 자세에서 카메라만 돌려가며 세 번 찼더니 공이
  // (5.27,-3.96) (6.31,-1.90) (-5.56,-3.55) 로 전부 다른 데로 갔고, 셋 다
  // 카메라가 보는 쪽이 아니었다. 지금은 조준 방향(aim)을 따로 받아서 찬다.
  const angles = [0, Math.PI / 2, Math.PI, -Math.PI / 2, 2.3];
  let worstErr = 0;
  for (const a of angles) {
    const ax = Math.sin(a), az = Math.cos(a);
    const r = build([0, -1.0]);
    // 일부러 -Z로 달렸다 멈춰서 몸통을 조준과 다른 쪽에 남겨둔다
    // (예전 코드였다면 여기서 -Z로 찼다)
    for (let i = 0; i < 60; i++) r.step(0, -1);
    for (let i = 0; i < 30; i++) r.step(0, 0);
    // 공을 조준 방향 바로 앞(킥 사거리 안)에 놓는다
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
    check(`조준 ${Math.round(a * 180 / Math.PI)}도로 찬다`, l > 3 && err < 12,
      `speed=${l.toFixed(2)} err=${err.toFixed(1)}도`);
  }
  check("모든 방향에서 조준과 어긋남이 작다", worstErr < 12, `최대 ${worstErr.toFixed(1)}도`);

  // 이동 중에도 킥은 조준을 따른다 - "옆으로 빠지면서 앞으로 차기"가 성립해야 한다.
  // (드리블 터치와 개인기는 반대로 이동 방향을 따른다. 발 앞에 두고 가는 동작과
  //  몸을 빼는 동작이라 진행 방향이 맞다)
  {
    const r = build([0, -1.0]);
    for (let i = 0; i < 70; i++) r.step(1, 0, { aim: [0, -1] });   // +X로 달리며 -Z를 본다
    const p = r.rag.pelvis.position;
    r.ball.position.set(p.x, B.radius + 0.01, p.z - 0.9);
    r.ball.velocity.setZero();
    r.ball.angularVelocity.setZero();
    for (let i = 0; i < 3; i++) r.step(1, 0, { aim: [0, -1] });
    // [속도가 아니라 "속도 변화량"을 본다] 달리면서 차면 공은 이미 사람을 따라
    // +X로 굴러가는 중이다. 킥이 더한 몫만 떼어봐야 조준을 따랐는지 알 수 있다.
    // (예전에는 킥이 고정 11.5 N·s라 기존 운동량을 통째로 덮어써서 절대속도로도
    //  판별이 됐지만, 지금은 짧게 누르면 6.5까지 약해진다)
    const before = r.ball.velocity.clone();
    r.step(1, 0, { aim: [0, -1], kick: true, kickPower: 1 });
    const dvx = r.ball.velocity.x - before.x;
    const dvz = r.ball.velocity.z - before.z;
    check("달리는 중에도 킥은 조준(-Z) 쪽으로", dvz < -3 && Math.abs(dvx) < Math.abs(dvz),
      `Δv=(${dvx.toFixed(2)}, ${dvz.toFixed(2)})`);
  }
}

console.log("\n--- TEST 10: 멈춰 있는 공도 세게 찰 수 있다 (HANDOFF B5) ---");
{
  /** 공이 조용해질 때까지 두고, 한 번 차서 그 뒤 최고 속도를 잰다 */
  function kickTop(dribbling: boolean, power: number): number {
    const r = build([0, -1.2]);
    const mz = dribbling ? -1 : 0;
    for (let i = 0; i < 120; i++) r.step(0, mz);
    r.step(0, mz, { aim: [0, -1], kick: true, kickPower: power });
    let top = Math.hypot(r.ball.velocity.x, r.ball.velocity.z);
    for (let i = 0; i < 45; i++) {
      r.step(0, mz);
      top = Math.max(top, Math.hypot(r.ball.velocity.x, r.ball.velocity.z));
    }
    return top;
  }

  const still0 = kickTop(false, 0);
  const still5 = kickTop(false, 0.5);
  const still1 = kickTop(false, 1);
  const drib1 = kickTop(true, 1);
  console.log(`       정지한 공  톡 ${still0.toFixed(2)} / 반 ${still5.toFixed(2)} / 풀 ${still1.toFixed(2)} m/s`);
  console.log(`       드리블 중  풀 ${drib1.toFixed(2)} m/s`);

  // [무엇이 문제였나] 보정 전에는 정지 3.73 / 6.31 / 8.89 vs 드리블 13.50 이라
  // **멈춰서 자세 잡고 세게 차는 쪽이 훨씬 약했다.** 바닥에 붙어 자고 있는
  // 공은 첫 스텝의 접촉이 충격량을 크게 먹기 때문이다(B.slowKickBoost 주석).
  // 세트피스 슛이라는 플레이가 성립하려면 둘이 비슷해야 한다.
  check("정지한 공의 풀차지가 드리블 킥과 비슷해졌다",
    still1 > drib1 * 0.85, `정지 ${still1.toFixed(2)} vs 드리블 ${drib1.toFixed(2)}`);
  // 반대로 정지 킥이 **더 세지면** 안 된다. 그러면 이번엔 반대로 기울고,
  // 사람을 넘어뜨리는 문턱(13 m/s)을 세워 놓고 차는 것만으로 넘게 된다.
  check("그렇다고 드리블 킥보다 세지지는 않았다",
    still1 < drib1 * 1.15, `정지 ${still1.toFixed(2)} vs 드리블 ${drib1.toFixed(2)}`);
  // 차징 곡선의 모양은 그대로다 (보정이 비율이라 순서가 안 바뀐다)
  check("차징이 셀수록 세다", still0 < still5 && still5 < still1,
    `${still0.toFixed(2)} < ${still5.toFixed(2)} < ${still1.toFixed(2)}`);
  // 톡 치는 킥은 여전히 "밀어 놓는" 세기여야 한다 (드리블의 연장)
  check("톡 치는 킥은 여전히 약하다", still0 < 6.5, `${still0.toFixed(2)} m/s`);

  // [이 보정이 굴러가는 공에는 안 걸린다] 이게 이 변경의 안전선이다.
  // slowKickAt(1.6 m/s) 위의 공에는 배수가 1.0 이므로 예전 킥과 완전히 같다.
  {
    const r = build([0, -1.2]);
    for (let i = 0; i < 120; i++) r.step(0, -1);
    const speed = Math.hypot(r.ball.velocity.x, r.ball.velocity.z);
    check("드리블 중인 공은 보정 문턱 위에 있다", speed > B.slowKickAt,
      `${speed.toFixed(2)} vs ${B.slowKickAt}`);
  }
}

console.log(`\nRESULT: ${pass} passed, ${fail} failed`);
process.exit(fail === 0 ? 0 : 1);
