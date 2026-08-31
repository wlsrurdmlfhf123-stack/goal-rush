import * as THREE from "three";
import * as CANNON from "cannon-es";
import { createRagdoll, GROUP_WORLD, P, type Ragdoll, type RagdollInput } from "../client/src/ragdoll";
import { FL, createFlair } from "../client/src/flair";
import { groupFor, ragdollMask } from "../client/src/input-math";

/**
 * 4단계 — 몸짓 (flair.ts): 달리기 젖힘 / 급정지 쏠림 / 방향전환 흔들 / 착지 자세.
 *
 * 이 테스트가 지키려는 것은 세 가지다.
 *
 *  1) **자세가 실제로 바뀐다.** 토크를 걸었다는 사실이 아니라, 상체 각도가
 *     몸짓 없이 돌렸을 때와 다른지를 잰다. 같은 입력으로 두 번 돌려서
 *     (몸짓 켬 / 끔) 각도를 비교하는 방식이라, 값이 우연히 커지는 일이 없다.
 *
 *  2) **넘어뜨리지 않는다.** flair.ts 머리말이 "이 파일은 넘어뜨릴 수 없다"고
 *     주장한다 (평형각 계산). 주장은 검사로 못 박아야 주장이다.
 *
 *  3) **조작 반응성이 안 죽는다.** 이게 이번 작업의 유일한 금지선이었다.
 *     같은 입력에 대한 이동 거리·최고 속도·가속 시간이 사실상 같아야 한다.
 *
 * [왜 rig가 따로인가] 몸싸움과 달리 몸짓은 사람 하나로 전부 관찰된다. 공도
 * 상대도 필요 없어서, 판을 최소로 만들어야 "몸짓 때문에 변한 것"만 남는다.
 */

let pass = 0, fail = 0;
function check(name: string, cond: boolean, extra = "") {
  if (cond) { pass++; console.log(`  PASS  ${name}`); }
  else { fail++; console.log(`  FAIL  ${name} ${extra}`); }
}
const fin = (v: CANNON.Vec3) => Number.isFinite(v.x) && Number.isFinite(v.y) && Number.isFinite(v.z);
const DT = 1 / 60;

interface Rig {
  physics: CANNON.World;
  rag: Ragdoll;
  /** 한 스텝. main.ts 와 같은 순서 - control() 뒤에 몸짓을 얹는다 */
  step(inp?: { mx?: number; mz?: number; jump?: boolean }): void;
  /** 넘어진 적이 있는가 (한 번이라도 ACTIVE가 아니었으면 true) */
  fell: boolean;
}

function build(useFlair: boolean, startY = P.rideHeight): Rig {
  const physics = new CANNON.World({ gravity: new CANNON.Vec3(0, -18, 0) });
  physics.broadphase = new CANNON.NaiveBroadphase();
  physics.allowSleep = false;
  (physics.solver as CANNON.GSSolver).iterations = 22;

  const groundMat = new CANNON.Material("ground");
  const bodyMat = new CANNON.Material("player");
  physics.addContactMaterial(new CANNON.ContactMaterial(groundMat, bodyMat, { friction: 0.55, restitution: 0 }));

  const ground = new CANNON.Body({
    type: CANNON.Body.STATIC, shape: new CANNON.Plane(), material: groundMat,
    collisionFilterGroup: GROUP_WORLD, collisionFilterMask: -1,
  });
  ground.quaternion.setFromEuler(-Math.PI / 2, 0, 0);
  physics.addBody(ground);

  const scene = new THREE.Scene();
  const rag = createRagdoll(
    physics, scene, new CANNON.Vec3(0, startY, 0), bodyMat,
    { skin: 0xffcc99, shirt: 0x3f8cff, pants: 0x333344 },
    groupFor(0), ragdollMask(groupFor(0)),
  );

  const fl = createFlair();
  const rig: Rig = {
    physics, rag, fell: false,
    step(inp = {}) {
      const input: RagdollInput = { moveX: inp.mx ?? 0, moveZ: inp.mz ?? 0, jump: !!inp.jump };
      rag.control(DT, input, physics);
      // main.ts 와 같은 자리 (flair.ts 머리말 - control() 뒤에 토크만 얹는다)
      if (useFlair) fl.update(rag, DT);
      physics.step(DT);
      rag.guard();
      if (rag.state !== "ACTIVE") rig.fell = true;
    },
  };
  return rig;
}

/**
 * 상체가 진행 방향으로 얼마나 기울었는가 (부호 있는 값).
 *
 * 몸통의 up 벡터를 진행 방향에 투영한다. 앞으로 숙이면 +, 뒤로 젖히면 -.
 * 크기가 아니라 **부호**가 중요해서 이렇게 잰다 - "젖혔다"와 "숙였다"는
 * 절댓값으로는 구별되지 않는다.
 */
function pitchAlong(rag: Ragdoll, hx: number, hz: number): number {
  const up = rag.torso.quaternion.vmult(new CANNON.Vec3(0, 1, 0));
  return up.x * hx + up.z * hz;
}

/** 상체가 진행 방향 축을 기준으로 좌우로 얼마나 기울었는가 */
function rollAcross(rag: Ragdoll, hx: number, hz: number): number {
  const up = rag.torso.quaternion.vmult(new CANNON.Vec3(0, 1, 0));
  return up.x * -hz + up.z * hx;
}

const settle = (r: Rig, n = 90) => { for (let i = 0; i < n; i++) r.step(); };

// ================================================================
console.log("\n--- TEST 1: 달리면 상체가 뒤로 젖혀진다 ---");
{
  const run = (useFlair: boolean) => {
    const r = build(useFlair);
    settle(r);
    // 전속력이 붙을 때까지 달린 뒤, 정상 주행 구간의 평균 자세를 본다.
    for (let i = 0; i < 90; i++) r.step({ mz: 1 });
    let sum = 0;
    for (let i = 0; i < 60; i++) { r.step({ mz: 1 }); sum += pitchAlong(r.rag, 0, 1); }
    return { lean: sum / 60, fell: r.fell, spd: Math.hypot(r.rag.pelvis.velocity.x, r.rag.pelvis.velocity.z) };
  };
  const on = run(true);
  const off = run(false);
  console.log(`       몸짓 켬 ${on.lean.toFixed(3)} / 끔 ${off.lean.toFixed(3)} (음수 = 뒤로 젖힘)`);
  check("달릴 때 몸짓이 상체를 뒤로 젖힌다", on.lean < off.lean - 0.02,
    `${on.lean.toFixed(3)} vs ${off.lean.toFixed(3)}`);
  check("실제로 뒤로 젖혀져 있다 (부호가 음수)", on.lean < 0, `${on.lean.toFixed(3)}`);
  check("달리다 넘어지지 않는다", !on.fell);
  check("전속력이 그대로다", Math.abs(on.spd - off.spd) < 0.3,
    `${on.spd.toFixed(2)} vs ${off.spd.toFixed(2)}`);
}

// ================================================================
console.log("\n--- TEST 2: 급정지하면 상체가 앞으로 쏠린다 ---");
{
  const run = (useFlair: boolean) => {
    const r = build(useFlair);
    settle(r);
    for (let i = 0; i < 120; i++) r.step({ mz: 1 });
    // 달리던 자세를 기준으로 잡는다. **절대 각도가 아니라 흔들린 폭**을 봐야 한다 -
    // 몸짓을 켜면 달리는 동안 이미 뒤로 젖혀져 있어서(TEST 1), 거기서 앞으로
    // 크게 넘어와도 최종 각도는 오히려 작을 수 있다. 눈에 보이는 건 폭이다.
    const base = pitchAlong(r.rag, 0, 1);
    // 키를 뗀다 (control()의 목표속도 0 = 최대 제동)
    let peak = -9;
    for (let i = 0; i < 40; i++) { r.step(); peak = Math.max(peak, pitchAlong(r.rag, 0, 1)); }
    return { base, peak, swing: peak - base, fell: r.fell };
  };
  const on = run(true);
  const off = run(false);
  console.log(`       몸짓 켬 ${on.base.toFixed(3)} -> ${on.peak.toFixed(3)} (폭 ${on.swing.toFixed(3)}) / 끔 ${off.base.toFixed(3)} -> ${off.peak.toFixed(3)} (폭 ${off.swing.toFixed(3)})`);
  check("급정지에서 상체가 훨씬 크게 앞으로 쏠린다", on.swing > off.swing * 1.4,
    `폭 ${on.swing.toFixed(3)} vs ${off.swing.toFixed(3)}`);
  check("실제로 앞으로 넘어온다 (부호가 양수)", on.peak > 0, `${on.peak.toFixed(3)}`);
  check("급정지에 넘어지지 않는다", !on.fell);
}

// ================================================================
console.log("\n--- TEST 3: 방향을 홱 틀면 몸이 좌우로 흔들린다 ---");
{
  const run = (useFlair: boolean) => {
    const r = build(useFlair);
    settle(r);
    for (let i = 0; i < 120; i++) r.step({ mz: 1 });
    // +Z로 달리다가 갑자기 +X로
    let peak = 0;
    for (let i = 0; i < 40; i++) {
      r.step({ mx: 1 });
      peak = Math.max(peak, Math.abs(rollAcross(r.rag, 0, 1)));
    }
    return { peak, fell: r.fell };
  };
  const on = run(true);
  const off = run(false);
  console.log(`       몸짓 켬 ${on.peak.toFixed(3)} / 끔 ${off.peak.toFixed(3)} (좌우 기울기)`);
  check("방향 전환에서 몸이 더 흔들린다", on.peak > off.peak + 0.02,
    `${on.peak.toFixed(3)} vs ${off.peak.toFixed(3)}`);
  check("방향을 틀다 넘어지지 않는다", !on.fell);
}

// ================================================================
console.log("\n--- TEST 4: 높은 데서 떨어지면 착지 자세가 나온다 ---");
{
  const run = (useFlair: boolean) => {
    const r = build(useFlair, P.rideHeight + 3.5);   // 3.5m 위에서 떨어뜨린다
    let peak = -9, landed = -1;
    for (let i = 0; i < 150; i++) {
      r.step();
      if (landed < 0 && r.rag.grounded && i > 5) landed = i;
      if (landed >= 0 && i - landed < 30) peak = Math.max(peak, pitchAlong(r.rag, 0, 1));
    }
    return { peak, landed, fell: r.fell, y: r.rag.pelvis.position.y };
  };
  const on = run(true);
  const off = run(false);
  console.log(`       착지 ${on.landed}스텝 / 몸짓 켬 ${on.peak.toFixed(3)} / 끔 ${off.peak.toFixed(3)}`);
  check("실제로 착지했다", on.landed > 0 && Number.isFinite(on.y), `landed=${on.landed}`);
  check("착지 순간 자세가 달라진다", Math.abs(on.peak - off.peak) > 0.02,
    `${on.peak.toFixed(3)} vs ${off.peak.toFixed(3)}`);
  check("착지 뒤 물리가 멀쩡하다", Number.isFinite(on.y) && on.y > 0, `y=${on.y.toFixed(2)}`);
  check("착지에 넘어지지 않는다", !on.fell);
}

// ================================================================
console.log("\n--- TEST 5: 조작 반응성이 안 죽는다 (이번 작업의 금지선) ---");
{
  // 같은 입력으로 두 번 돌려서 이동 거리 / 최고 속도 / 가속 시간을 비교한다.
  const run = (useFlair: boolean) => {
    const r = build(useFlair);
    settle(r);
    const p0 = r.rag.pelvis.position.clone();
    let top = 0, toFull = -1;
    for (let i = 0; i < 180; i++) {
      r.step({ mz: 1 });
      const s = Math.hypot(r.rag.pelvis.velocity.x, r.rag.pelvis.velocity.z);
      top = Math.max(top, s);
      if (toFull < 0 && s > P.maxSpeed * 0.9) toFull = i;
    }
    const dist = Math.hypot(r.rag.pelvis.position.x - p0.x, r.rag.pelvis.position.z - p0.z);
    // 멈추는 데 걸리는 시간도 본다 (몸짓이 제동을 늦추면 안 된다)
    let toStop = -1;
    for (let i = 0; i < 90; i++) {
      r.step();
      const s = Math.hypot(r.rag.pelvis.velocity.x, r.rag.pelvis.velocity.z);
      if (toStop < 0 && s < 0.4) toStop = i;
    }
    return { dist, top, toFull, toStop };
  };
  const on = run(true);
  const off = run(false);
  console.log(`       3초 이동 ${on.dist.toFixed(2)}m vs ${off.dist.toFixed(2)}m / 최고속도 ${on.top.toFixed(2)} vs ${off.top.toFixed(2)}`);
  console.log(`       전속력까지 ${on.toFull}스텝 vs ${off.toFull}스텝 / 정지까지 ${on.toStop}스텝 vs ${off.toStop}스텝`);
  check("이동 거리가 사실상 같다 (오차 5% 이내)",
    Math.abs(on.dist - off.dist) / off.dist < 0.05,
    `${on.dist.toFixed(2)}m vs ${off.dist.toFixed(2)}m`);
  check("최고 속도가 사실상 같다 (오차 5% 이내)",
    Math.abs(on.top - off.top) / off.top < 0.05,
    `${on.top.toFixed(2)} vs ${off.top.toFixed(2)}`);
  check("가속이 느려지지 않았다 (2스텝 이내)", Math.abs(on.toFull - off.toFull) <= 2,
    `${on.toFull} vs ${off.toFull}`);
  check("제동이 느려지지 않았다 (3스텝 이내)", Math.abs(on.toStop - off.toStop) <= 3,
    `${on.toStop} vs ${off.toStop}`);
}

// ================================================================
console.log("\n--- TEST 6: 넘어져 있는 동안에는 아무것도 하지 않는다 ---");
{
  const r = build(true);
  settle(r);
  for (let i = 0; i < 60; i++) r.step({ mz: 1 });
  r.rag.knockdown(1.0);
  // 널브러진 몸에 자세 토크가 걸리면 각속도가 폭주하거나 관절이 벌어진다
  let worstSpin = 0, worstJoint = 0;
  for (let i = 0; i < 60; i++) {
    r.step({ mz: 1 });
    for (const b of r.rag.bodies) {
      worstSpin = Math.max(worstSpin, b.angularVelocity.length());
      worstJoint = Math.max(worstJoint, b.position.distanceTo(r.rag.pelvis.position));
    }
  }
  console.log(`       누워 있는 동안 최고 회전 ${worstSpin.toFixed(1)} rad/s / 골반-말단 ${worstJoint.toFixed(2)}m`);
  check("각속도가 폭주하지 않는다 (< 30 rad/s)", worstSpin < 30, `${worstSpin.toFixed(1)}`);
  check("래그돌이 안 쪼개진다 (< 2.5m)", worstJoint < 2.5, `${worstJoint.toFixed(2)}m`);
  check("좌표가 유한값", fin(r.rag.pelvis.position) && fin(r.rag.pelvis.velocity));
}

// ================================================================
console.log("\n--- TEST 7: 오래 굴려도 안 넘어지고 안 터진다 ---");
{
  const r = build(true);
  settle(r);
  let worstSpin = 0, worstJoint = 0, downSteps = 0;
  for (let i = 0; i < 1800; i++) {   // 30초
    // 계속 달리고, 서고, 방향을 홱홱 바꾸고, 점프한다 (몸짓이 전부 발동하는 조합)
    const phase = i % 120;
    const inp = phase < 40 ? { mz: 1 }
      : phase < 55 ? {}
        : phase < 95 ? { mx: 1, mz: -0.2 }
          : { mz: -1, jump: phase === 100 };
    r.step(inp);
    if (r.rag.state !== "ACTIVE") downSteps++;
    for (const b of r.rag.bodies) {
      worstSpin = Math.max(worstSpin, b.angularVelocity.length());
      worstJoint = Math.max(worstJoint, b.position.distanceTo(r.rag.pelvis.position));
    }
  }
  console.log(`       30초 동안 넘어진 시간 ${(downSteps / 60).toFixed(2)}초 / 최고 회전 ${worstSpin.toFixed(1)} rad/s`);
  // flair.ts 머리말의 평형각 계산이 맞다면 이 값은 0이어야 한다
  check("30초 동안 한 번도 안 넘어진다", downSteps === 0, `${downSteps}스텝`);
  check("각속도가 폭주하지 않았다 (< 60 rad/s)", worstSpin < 60, `${worstSpin.toFixed(1)}`);
  check("래그돌이 안 쪼개졌다 (< 2.5m)", worstJoint < 2.5, `${worstJoint.toFixed(2)}m`);
  check("좌표가 유한값", fin(r.rag.pelvis.position) && fin(r.rag.pelvis.velocity));
}

// ================================================================
console.log("\n--- TEST 8: 상수가 넘어뜨릴 수 없는 크기다 (평형각) ---");
{
  // flair.ts 머리말의 주장을 식으로 다시 확인한다. 몸을 세우는 토크는
  // P.uprightTorque * sin(기울기)이므로, 여기서 T를 걸면 sin(θ) = T/uprightTorque
  // 에서 멈춘다. 넘어짐 판정은 up.y < P.fallTiltDot = sin(θ) > 0.907 이다.
  const limit = Math.sqrt(1 - P.fallTiltDot * P.fallTiltDot);   // 넘어지는 기울기
  const worst = Math.max(FL.RUN_LEAN, FL.STOP_PITCH, FL.TURN_ROLL, FL.LAND_PITCH);
  const equilibrium = worst / P.uprightTorque;
  console.log(`       제일 센 몸짓 ${worst} N·m -> 평형 기울기 ${equilibrium.toFixed(2)} (넘어짐 ${limit.toFixed(2)})`);
  check("제일 센 몸짓도 넘어짐 기울기의 절반 미만이다", equilibrium < limit * 0.5,
    `${equilibrium.toFixed(2)} vs ${limit.toFixed(2)}`);
  // 착지 + 방향전환이 같은 프레임에 겹치는 최악의 경우까지 본다
  const stacked = (FL.LAND_PITCH + FL.TURN_ROLL) / P.uprightTorque;
  check("두 몸짓이 겹쳐도 안 넘어진다", stacked < limit,
    `${stacked.toFixed(2)} vs ${limit.toFixed(2)}`);
}

console.log(`\nRESULT: ${pass} passed, ${fail} failed`);
if (fail > 0) process.exit(1);
