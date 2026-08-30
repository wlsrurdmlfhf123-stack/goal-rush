import * as THREE from "three";
import * as CANNON from "cannon-es";
import { createRagdoll, GROUP_WORLD, P, type Ragdoll } from "../client/src/ragdoll";

let pass = 0, fail = 0;
function check(name: string, cond: boolean, extra = "") {
  if (cond) { pass++; console.log(`  PASS  ${name}`); }
  else { fail++; console.log(`  FAIL  ${name} ${extra}`); }
}

/** main.ts의 controlTargetOf와 동일한 규칙 */
function controlTargetOf(playerId: number, allIds: number[]): number {
  const ids = [...allIds].sort((a, b) => a - b);
  if (ids.length < 2) return playerId;
  const i = ids.indexOf(playerId);
  return ids[(i + 1) % ids.length];
}

console.log("\n--- TEST 1: 서로조종 매핑 규칙 ---");
{
  check("혼자일 때는 자기 캐릭터를 조종", controlTargetOf(1, [1]) === 1);
  check("P1은 P2의 캐릭터를 조종", controlTargetOf(1, [1, 2]) === 2);
  check("P2는 P1의 캐릭터를 조종", controlTargetOf(2, [1, 2]) === 1);
  check("자기 자신을 조종하지 않음 (2인)",
    controlTargetOf(1, [1, 2]) !== 1 && controlTargetOf(2, [1, 2]) !== 2);
  // 3인 순환
  const three = [1, 2, 3];
  const map = three.map((id) => controlTargetOf(id, three));
  check("3인일 때 순환 구조 (중복 없음)", new Set(map).size === 3, JSON.stringify(map));
  check("3인일 때 아무도 자신을 조종 안 함",
    three.every((id) => controlTargetOf(id, three) !== id), JSON.stringify(map));
}

// ---------------------------------------------------------------- 실제 물리로 검증
function buildWorld() {
  const physics = new CANNON.World({ gravity: new CANNON.Vec3(0, -18, 0) });
  physics.broadphase = new CANNON.SAPBroadphase(physics);
  physics.allowSleep = false;
  (physics.solver as CANNON.GSSolver).iterations = 20;

  const gm = new CANNON.Material("ground");
  const bm = new CANNON.Material("body");
  physics.addContactMaterial(new CANNON.ContactMaterial(gm, bm, { friction: 0.55, restitution: 0 }));

  const ground = new CANNON.Body({
    type: CANNON.Body.STATIC, shape: new CANNON.Plane(), material: gm,
    collisionFilterGroup: GROUP_WORLD, collisionFilterMask: -1,
  });
  ground.quaternion.setFromEuler(-Math.PI / 2, 0, 0);
  physics.addBody(ground);

  const scene = new THREE.Scene();
  return { physics, scene, bm };
}

function groupFor(id: number) { return 1 << ((id % 10) + 1); }

console.log("\n--- TEST 2: P1의 입력이 실제로 P2의 몸을 움직이는가 ---");
{
  const { physics, scene, bm } = buildWorld();
  const ids = [1, 2];
  const rags = new Map<number, Ragdoll>();

  ids.forEach((id, i) => {
    const g = groupFor(id);
    const mask = (GROUP_WORLD | 0xfffe) & ~g;
    rags.set(id, createRagdoll(
      physics, scene,
      new CANNON.Vec3(i * 4 - 2, P.rideHeight + 0.15, 0),
      bm,
      { skin: 0xffcda8, shirt: i === 0 ? 0x3f8cff : 0xff6644, pants: 0x39405a },
      g, mask
    ));
  });

  const settle = () => {
    for (let i = 0; i < 180; i++) {
      for (const r of rags.values()) r.control(1 / 60, { moveX: 0, moveZ: 0, jump: false }, physics);
      physics.step(1 / 60);
      for (const r of rags.values()) r.guard();
    }
  };
  settle();

  const p1Start = rags.get(1)!.pelvis.position.clone();
  const p2Start = rags.get(2)!.pelvis.position.clone();

  // P1만 +Z 입력을 넣는다. P2는 아무 입력 없음.
  const inputs = new Map<number, { mx: number; mz: number; jump: boolean }>([
    [1, { mx: 0, mz: 1, jump: false }],
    [2, { mx: 0, mz: 0, jump: false }],
  ]);

  for (let i = 0; i < 420; i++) {
    // 서로조종 배분
    const applied = new Map<number, { moveX: number; moveZ: number; jump: boolean }>();
    for (const id of ids) applied.set(id, { moveX: 0, moveZ: 0, jump: false });
    for (const [from, inp] of inputs) {
      const target = controlTargetOf(from, ids);
      applied.set(target, { moveX: inp.mx, moveZ: inp.mz, jump: inp.jump });
    }
    for (const id of ids) rags.get(id)!.control(1 / 60, applied.get(id)!, physics);
    physics.step(1 / 60);
    for (const r of rags.values()) r.guard();
  }

  const p1Moved = rags.get(1)!.pelvis.position.z - p1Start.z;
  const p2Moved = rags.get(2)!.pelvis.position.z - p2Start.z;

  check("P1이 입력했는데 P2의 몸이 움직임", p2Moved > 1.0, `p2Δz=${p2Moved.toFixed(2)}`);
  check("P1 자신의 몸은 거의 안 움직임", Math.abs(p1Moved) < 1.0, `p1Δz=${p1Moved.toFixed(2)}`);
  check("두 캐릭터 모두 유한값",
    [...rags.values()].every((r) => r.bodies.every((b) => Number.isFinite(b.position.x) && Number.isFinite(b.position.y))));
}

console.log("\n--- TEST 3: 혼자 있을 땐 자기 캐릭터가 움직인다 ---");
{
  const { physics, scene, bm } = buildWorld();
  const g = groupFor(1);
  const rag = createRagdoll(physics, scene, new CANNON.Vec3(0, P.rideHeight + 0.15, 0), bm,
    { skin: 0xffcda8, shirt: 0x3f8cff, pants: 0x39405a }, g, (GROUP_WORLD | 0xfffe) & ~g);

  for (let i = 0; i < 180; i++) {
    rag.control(1 / 60, { moveX: 0, moveZ: 0, jump: false }, physics);
    physics.step(1 / 60); rag.guard();
  }
  const start = rag.pelvis.position.z;

  const target = controlTargetOf(1, [1]);
  check("혼자면 조종 대상이 자기 자신", target === 1);

  for (let i = 0; i < 420; i++) {
    rag.control(1 / 60, { moveX: 0, moveZ: 1, jump: false }, physics);
    physics.step(1 / 60); rag.guard();
  }
  const moved = rag.pelvis.position.z - start;
  check("혼자일 때 자기 캐릭터가 이동함", moved > 1.0, `Δz=${moved.toFixed(2)}`);
}

console.log(`\nRESULT: ${pass} passed, ${fail} failed`);
process.exit(fail === 0 ? 0 : 1);
