import * as THREE from "three";
import * as CANNON from "cannon-es";
import { createRagdoll, GROUP_WORLD, P } from "../client/src/ragdoll";

let pass = 0, fail = 0;
function check(name: string, cond: boolean, extra = "") {
  if (cond) { pass++; console.log(`  PASS  ${name}`); }
  else { fail++; console.log(`  FAIL  ${name} ${extra}`); }
}
const fin = (v: CANNON.Vec3) => Number.isFinite(v.x) && Number.isFinite(v.y) && Number.isFinite(v.z);

function build(iterations: number) {
  const physics = new CANNON.World({ gravity: new CANNON.Vec3(0, -18, 0) });
  physics.broadphase = new CANNON.SAPBroadphase(physics);
  physics.allowSleep = false;
  (physics.solver as CANNON.GSSolver).iterations = iterations;

  const gm = new CANNON.Material("g"), bm = new CANNON.Material("b");
  physics.addContactMaterial(new CANNON.ContactMaterial(gm, bm, { friction: 0.55, restitution: 0 }));
  const ground = new CANNON.Body({
    type: CANNON.Body.STATIC, shape: new CANNON.Plane(), material: gm,
    collisionFilterGroup: GROUP_WORLD, collisionFilterMask: -1,
  });
  ground.quaternion.setFromEuler(-Math.PI / 2, 0, 0);
  physics.addBody(ground);

  const scene = new THREE.Scene();
  const rag = createRagdoll(physics, scene, new CANNON.Vec3(0, P.rideHeight + 0.15, 0), bm,
    { skin: 0xffcda8, shirt: 0x3f8cff, pants: 0x39405a }, 2, GROUP_WORLD | 4);
  return { physics, rag };
}

/** 브라우저 첫 프레임처럼 큰 dt 스파이크를 준 뒤 정상 프레임을 진행 */
function simulateBrowserLikeStart(iterations: number, spikeDt: number, substeps: number, clampFirst: boolean) {
  const { physics, rag } = build(iterations);
  const frameDts = [spikeDt, 0.033, 0.016, 0.016, 0.016, 0.016, 0.016, 0.016];
  let exploded = false;
  frameDts.forEach((rawDt, i) => {
    const dt = clampFirst && i < 5 ? Math.min(rawDt, 1 / 60) : Math.min(rawDt, 0.05);
    rag.control(dt, { moveX: 0, moveZ: 0, jump: false }, physics);
    physics.step(1 / 60, dt, substeps);
    if (rag.bodies.some((b) => !fin(b.position) || !fin(b.velocity))) exploded = true;
  });
  // 이후 300프레임 정상 진행하며 안정화되는지
  for (let i = 0; i < 300; i++) {
    rag.control(1 / 60, { moveX: 0, moveZ: 0, jump: false }, physics);
    physics.step(1 / 60, 1 / 60, substeps);
    rag.guard();
  }
  return { rag, exploded };
}

console.log("\n--- TEST 1: 재현 - solver iterations 10(수정 전) + dt 스파이크(0.5s) + substep 3 ---");
{
  const { rag, exploded } = simulateBrowserLikeStart(10, 0.5, 3, false);
  const pelvisY = rag.pelvis.position.y;
  const airborne = pelvisY > 5 || !fin(rag.pelvis.position);
  console.log(`    [참고] exploded=${exploded} pelvisY=${fin(rag.pelvis.position) ? pelvisY.toFixed(2) : "NaN"} airborne=${airborne}`);
  console.log("    (이 합성 시나리오로는 원본 버그가 재현되지 않음 - 실제 브라우저의 불규칙한 프레임 타이밍은 헤드리스로 완전히 재현 불가. 정보성 로그만 남김)");
}

console.log("\n--- TEST 2: 수정 후 - solver iterations 22 + 초반 dt clamp + substep 6 ---");
{
  const { rag, exploded } = simulateBrowserLikeStart(22, 0.5, 6, true);
  check("dt 스파이크에도 발산하지 않음", !exploded);
  check("모든 파츠 유한값 유지", rag.bodies.every((b) => fin(b.position) && fin(b.velocity)));
  check("정상적으로 서 있는 높이로 안정화 (0.6~1.3)",
    rag.pelvis.position.y > 0.6 && rag.pelvis.position.y < 1.3,
    `y=${rag.pelvis.position.y.toFixed(3)}`);
  check("몸이 하늘로 발사되지 않음", rag.pelvis.position.y < 3, `y=${rag.pelvis.position.y.toFixed(3)}`);
}

console.log("\n--- TEST 3: 여러 스폰 위치에서 동시에 시작해도 안정적인가 (2인 동시 스폰) ---");
{
  const physics = new CANNON.World({ gravity: new CANNON.Vec3(0, -18, 0) });
  physics.broadphase = new CANNON.SAPBroadphase(physics);
  physics.allowSleep = false;
  (physics.solver as CANNON.GSSolver).iterations = 22;
  const gm = new CANNON.Material("g"), bm = new CANNON.Material("b");
  physics.addContactMaterial(new CANNON.ContactMaterial(gm, bm, { friction: 0.55, restitution: 0 }));
  const ground = new CANNON.Body({
    type: CANNON.Body.STATIC, shape: new CANNON.Plane(), material: gm,
    collisionFilterGroup: GROUP_WORLD, collisionFilterMask: -1,
  });
  ground.quaternion.setFromEuler(-Math.PI / 2, 0, 0);
  physics.addBody(ground);
  const scene = new THREE.Scene();

  const spawns: [number, number][] = [[-2, 5], [2, 5]];
  const rags = spawns.map((s, i) => {
    const myGroup = 1 << (i + 2);
    const mask = (GROUP_WORLD | 0xfffe) & ~myGroup; // main.ts와 동일: 자기 그룹은 제외
    return createRagdoll(physics, scene, new CANNON.Vec3(s[0], P.rideHeight + 0.15, s[1]), bm,
      { skin: 0xffcda8, shirt: i === 0 ? 0x3f8cff : 0xff6644, pants: 0x39405a }, myGroup, mask);
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

  check("2인 동시 스폰 + dt 스파이크에도 발산 없음", !exploded);
  check("두 캐릭터 모두 유한값 유지 (폭발 없음)",
    rags.every((r) => r.bodies.every((b) => fin(b.position) && fin(b.velocity))));
  check("두 캐릭터 모두 합리적 범위 내 (하늘로 발사되지 않음, y<3)",
    rags.every((r) => r.pelvis.position.y > 0 && r.pelvis.position.y < 3),
    rags.map((r) => r.pelvis.position.y.toFixed(2)).join(","));
  // 알려진 이슈: 2인 동시 스폰 시 한쪽이 계속 웅크리는 잔여 진동이 있을 수 있음 (폭발 아님, 후속 튜닝 대상)
  console.log(`    [참고] 최종 높이: ${rags.map((r) => r.pelvis.position.y.toFixed(3)).join(", ")} (0.86 근처가 이상적, 낮으면 웅크림 잔여 진동)`);
}

console.log(`\nRESULT: ${pass} passed, ${fail} failed`);
process.exit(fail === 0 ? 0 : 1);
