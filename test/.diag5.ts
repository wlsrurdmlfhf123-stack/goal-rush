import * as THREE from "three";
import * as CANNON from "cannon-es";
import { createRagdoll, P, type RagdollInput } from "../client/src/ragdoll";
import { groupFor, ragdollMask } from "../client/src/input-math";

interface Cfg { fric?: number; comDrop?: number; }

function build(cfg: Cfg) {
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
  physics.addContactMaterial(new CANNON.ContactMaterial(playerMat, propMat, { friction: cfg.fric ?? 0.3, restitution: 0.05 }));

  const ground = new CANNON.Body({ type: CANNON.Body.STATIC, shape: new CANNON.Plane(), material: groundMat });
  ground.quaternion.setFromEuler(-Math.PI / 2, 0, 0);
  physics.addBody(ground);
  const g = groupFor(1);
  const rag = createRagdoll(physics, new THREE.Scene(), new CANNON.Vec3(0, P.rideHeight + 0.15, 0), playerMat,
    { skin: 0xffcc99, shirt: 0x3f8cff, pants: 0x333344 }, g, ragdollMask(g));
  return { physics, rag, propMat };
}

const NONE: RagdollInput = { moveX: 0, moveZ: 0, jump: false };
const FWD: RagdollInput = { moveX: 0, moveZ: 1, jump: false };

function penetrationTest(label: string, cfg: Cfg) {
  const { physics, rag, propMat } = build(cfg);
  const fridge = new CANNON.Body({ mass: 20, position: new CANNON.Vec3(0, 1.1, 2.2), material: propMat });
  fridge.addShape(new CANNON.Box(new CANNON.Vec3(0.6, 1.1, 0.5)), new CANNON.Vec3(0, cfg.comDrop ?? 0, 0));
  fridge.angularDamping = 0.2; fridge.linearDamping = 0.02;
  fridge.updateMassProperties();
  physics.addBody(fridge);

  for (let i = 0; i < 120; i++) { rag.control(1 / 60, NONE, physics); physics.step(1 / 60); rag.guard(); }

  let passedThrough = false, maxPelvisY = 0, minGap = Infinity;
  for (let i = 0; i < 600; i++) {
    rag.control(1 / 60, FWD, physics);
    physics.step(1 / 60);
    rag.guard();
    const gap = fridge.position.z - rag.pelvis.position.z;
    minGap = Math.min(minGap, gap);
    maxPelvisY = Math.max(maxPelvisY, rag.pelvis.position.y);
    if (gap < -0.6) passedThrough = true;
  }
  // 전복 여부: 똑바로 서 있으면 body의 local up이 월드 up과 거의 같다
  const up = new CANNON.Vec3(0, 1, 0);
  fridge.quaternion.vmult(up, up);
  console.log(
    `  ${label.padEnd(30)} 통과=${passedThrough ? "예 ✗" : "아니오 ✓"}  ` +
    `최소간격=${minGap.toFixed(2).padStart(7)}  최고골반=${maxPelvisY.toFixed(2)}  ` +
    `냉장고z=${fridge.position.z.toFixed(2).padStart(6)}  세워짐=${up.y > 0.8 ? "예 ✓" : "아니오 ✗"}(up=${up.y.toFixed(2)})`
  );
}

console.log("=== 플레이어<->소품 마찰 / 무게중심에 따른 등반·전복 (10초 돌진) ===");
penetrationTest("현재 (friction 0.3)", {});
penetrationTest("friction 0.15", { fric: 0.15 });
penetrationTest("friction 0.05", { fric: 0.05 });
penetrationTest("friction 0.0", { fric: 0.0 });
penetrationTest("fric 0.05 + 무게중심 -0.4", { fric: 0.05, comDrop: 0.4 });
penetrationTest("fric 0.05 + 무게중심 -0.7", { fric: 0.05, comDrop: 0.7 });
penetrationTest("무게중심 -0.7 만", { comDrop: 0.7 });

console.log("\n=== 안정성 회귀 (가만히 서 있기 10초) ===");
for (const [label, cfg] of [["현재", {}], ["friction 0.05", { fric: 0.05 }]] as [string, Cfg][]) {
  const { physics, rag } = build(cfg);
  for (let i = 0; i < 600; i++) { rag.control(1 / 60, NONE, physics); physics.step(1 / 60); rag.guard(); }
  const drift = Math.hypot(rag.pelvis.position.x, rag.pelvis.position.z);
  console.log(`  ${label.padEnd(18)} pelvisY=${rag.pelvis.position.y.toFixed(3)} state=${rag.state} drift=${drift.toFixed(2)}`);
}
