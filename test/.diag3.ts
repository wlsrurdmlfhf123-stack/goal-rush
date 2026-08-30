import * as THREE from "three";
import * as CANNON from "cannon-es";
import { createRagdoll, P, type Ragdoll, type RagdollInput } from "../client/src/ragdoll";
import { applyCarryForce, holdForceFor } from "../client/src/carry";
import { groupFor, ragdollMask } from "../client/src/input-math";

function build() {
  const physics = new CANNON.World({ gravity: new CANNON.Vec3(0, -18, 0) });
  physics.broadphase = new CANNON.SAPBroadphase(physics);
  physics.allowSleep = false;
  (physics.solver as CANNON.GSSolver).iterations = 22;
  (physics.solver as CANNON.GSSolver).tolerance = 0.0005;
  const groundMat = new CANNON.Material("ground");
  const playerMat = new CANNON.Material("player");
  const propMat = new CANNON.Material("prop");
  physics.addContactMaterial(new CANNON.ContactMaterial(groundMat, playerMat, { friction: 0.55, restitution: 0 }));
  physics.addContactMaterial(new CANNON.ContactMaterial(groundMat, propMat, { friction: 0.2, restitution: 0.05 }));
  physics.addContactMaterial(new CANNON.ContactMaterial(playerMat, propMat, { friction: 0.3, restitution: 0.05 }));
  const ground = new CANNON.Body({ type: CANNON.Body.STATIC, shape: new CANNON.Plane(), material: groundMat });
  ground.quaternion.setFromEuler(-Math.PI / 2, 0, 0);
  physics.addBody(ground);
  const g = groupFor(1);
  const rag = createRagdoll(physics, new THREE.Scene(), new CANNON.Vec3(0, P.rideHeight + 0.15, 0), playerMat,
    { skin: 0xffcc99, shirt: 0x3f8cff, pants: 0x333344 }, g, ragdollMask(g));
  return { physics, rag, propMat };
}

function mkFridge(physics: CANNON.World, propMat: CANNON.Material, z: number) {
  const b = new CANNON.Body({
    mass: 20, shape: new CANNON.Box(new CANNON.Vec3(0.6, 1.1, 0.5)),
    position: new CANNON.Vec3(0, 1.1, z), material: propMat,
  });
  b.angularDamping = 0.2; b.linearDamping = 0.02;
  physics.addBody(b);
  return b;
}

const NONE: RagdollInput = { moveX: 0, moveZ: 0, jump: false };
const FWD: RagdollInput = { moveX: 0, moveZ: 1, jump: false };

/** main.ts의 grab 링크를 최소 복제 (강체 제약 승격 포함) */
function runCarry(label: string, gripMode: boolean) {
  const { physics, rag, propMat } = build();
  const fridge = mkFridge(physics, propMat, 0.9);
  for (let i = 0; i < 240; i++) { rag.control(1 / 60, NONE, physics); physics.step(1 / 60); rag.guard(); }

  const startZ = fridge.position.z;
  const startPelvisZ = rag.pelvis.position.z;
  fridge.linearDamping = Math.max(fridge.linearDamping, P.carryObjDamp);
  fridge.angularDamping = Math.max(fridge.angularDamping, P.carryObjAngDamp);

  const holdForce = holdForceFor(fridge, 18);
  let constraintL: CANNON.PointToPointConstraint | null = null;
  let ramp = 0;
  const gMag = 18;

  for (let i = 0; i < 480; i++) {
    ramp += 1 / 60;
    // updateGripMode 복제: 들 수 있으면 강체 제약, 못 들면 밀기 모드
    if (gripMode) {
      const liftable = fridge.mass * gMag <= P.carryLiftStrength * 1;
      if (liftable && !constraintL) {
        const c = new CANNON.PointToPointConstraint(rag.handL, new CANNON.Vec3(0, 0, 0), fridge, new CANNON.Vec3(0, 0, -0.5), holdForce);
        physics.addConstraint(c); constraintL = c;
      } else if (!liftable && constraintL) {
        physics.removeConstraint(constraintL); constraintL = null;
      }
    }
    rag.setHeld([fridge]);
    rag.control(1 / 60, FWD, physics);
    applyCarryForce(physics, fridge, [{ rag, ramp }]);
    physics.step(1 / 60);
    rag.guard();
    if (i === 120 || i === 240 || i === 479) {
      console.log(`    t=${(i / 60).toFixed(1)}s fridgeZ=${fridge.position.z.toFixed(3)} fridgeY=${fridge.position.y.toFixed(3)} ` +
        `pelvisZ=${rag.pelvis.position.z.toFixed(3)} pelvisY=${rag.pelvis.position.y.toFixed(2)} state=${rag.state}`);
    }
  }
  console.log(`  ${label}: 냉장고 이동 ${(fridge.position.z - startZ).toFixed(3)}m, 캐릭터 이동 ${(rag.pelvis.position.z - startPelvisZ).toFixed(3)}m\n`);
}

console.log("=== 1인 grab 후 전진 (밀기 모드 = main.ts 실제 동작) ===");
runCarry("1인", true);

console.log("=== 참고: 잡지 않고 몸으로만 밀기 ===");
{
  const { physics, rag, propMat } = build();
  const fridge = mkFridge(physics, propMat, 0.9);
  for (let i = 0; i < 240; i++) { rag.control(1 / 60, NONE, physics); physics.step(1 / 60); rag.guard(); }
  const startZ = fridge.position.z;
  for (let i = 0; i < 480; i++) { rag.control(1 / 60, FWD, physics); physics.step(1 / 60); rag.guard(); }
  console.log(`  몸으로만: 냉장고 이동 ${(fridge.position.z - startZ).toFixed(3)}m  pelvisY=${rag.pelvis.position.y.toFixed(2)}\n`);
}

console.log("=== 2인 grab (들어올리기) ===");
{
  const { physics, propMat } = build();
  // 위 build()의 rag은 버리고 두 명을 새로 만든다
  const playerMat = new CANNON.Material("player2");
  physics.addContactMaterial(new CANNON.ContactMaterial(propMat, playerMat, { friction: 0.3, restitution: 0.05 }));
  const rags: Ragdoll[] = [];
  for (const [i, x] of [[1, -0.45], [2, 0.45]] as [number, number][]) {
    const g = groupFor(i);
    rags.push(createRagdoll(physics, new THREE.Scene(), new CANNON.Vec3(x, P.rideHeight + 0.15, 0), playerMat,
      { skin: 0xffcc99, shirt: 0x3f8cff, pants: 0x333344 }, g, ragdollMask(g)));
  }
  const fridge = mkFridge(physics, propMat, 0.9);
  for (let i = 0; i < 240; i++) { for (const r of rags) r.control(1 / 60, NONE, physics); physics.step(1 / 60); for (const r of rags) r.guard(); }
  fridge.linearDamping = Math.max(fridge.linearDamping, P.carryObjDamp);
  fridge.angularDamping = Math.max(fridge.angularDamping, P.carryObjAngDamp);
  let ramp = 0;
  for (let i = 0; i < 360; i++) {
    ramp += 1 / 60;
    for (const r of rags) { r.setHeld([fridge]); r.control(1 / 60, NONE, physics); }
    applyCarryForce(physics, fridge, rags.map((r) => ({ rag: r, ramp })));
    physics.step(1 / 60);
    for (const r of rags) r.guard();
  }
  console.log(`  2인: 냉장고 높이 ${fridge.position.y.toFixed(3)} (시작 1.1)  liftStrength=${P.carryLiftStrength} 2인예산=${P.carryLiftStrength * 2} 무게=${20 * 18}N`);
}
