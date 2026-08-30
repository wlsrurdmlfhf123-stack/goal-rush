import * as THREE from "three";
import * as CANNON from "cannon-es";
import { createRagdoll, P, type RagdollInput } from "../client/src/ragdoll";
import { groupFor, ragdollMask } from "../client/src/input-math";

interface Cfg { stiff?: number; relax?: number; iters?: number; }

function build(cfg: Cfg) {
  const physics = new CANNON.World({ gravity: new CANNON.Vec3(0, -18, 0) });
  physics.broadphase = new CANNON.SAPBroadphase(physics);
  physics.allowSleep = false;
  (physics.solver as CANNON.GSSolver).iterations = cfg.iters ?? 22;
  (physics.solver as CANNON.GSSolver).tolerance = 0.0005;
  if (cfg.stiff) physics.defaultContactMaterial.contactEquationStiffness = cfg.stiff;
  if (cfg.relax) physics.defaultContactMaterial.contactEquationRelaxation = cfg.relax;

  const groundMat = new CANNON.Material("ground");
  const playerMat = new CANNON.Material("player");
  const propMat = new CANNON.Material("prop");
  const cm = (a: CANNON.Material, b: CANNON.Material, o: CANNON.ContactMaterialOptions) => {
    const m = new CANNON.ContactMaterial(a, b, o);
    if (cfg.stiff) m.contactEquationStiffness = cfg.stiff;
    if (cfg.relax) m.contactEquationRelaxation = cfg.relax;
    physics.addContactMaterial(m);
  };
  cm(groundMat, playerMat, { friction: 0.55, restitution: 0 });
  cm(groundMat, propMat, { friction: 0.2, restitution: 0.05 });
  cm(playerMat, propMat, { friction: 0.3, restitution: 0.05 });

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

/** 냉장고를 향해 계속 걸어갔을 때 "뚫고 지나갔는가"를 측정 */
function penetrationTest(label: string, cfg: Cfg) {
  const { physics, rag, propMat } = build(cfg);
  const fridge = new CANNON.Body({
    mass: 20, shape: new CANNON.Box(new CANNON.Vec3(0.6, 1.1, 0.5)),
    position: new CANNON.Vec3(0, 1.1, 2.2), material: propMat,
  });
  fridge.angularDamping = 0.2; fridge.linearDamping = 0.02;
  physics.addBody(fridge);

  for (let i = 0; i < 120; i++) { rag.control(1 / 60, NONE, physics); physics.step(1 / 60); rag.guard(); }

  let passedThrough = false;
  let maxPelvisY = 0;
  let minGap = Infinity;
  for (let i = 0; i < 600; i++) {
    rag.control(1 / 60, FWD, physics);
    physics.step(1 / 60);
    rag.guard();
    const gap = fridge.position.z - rag.pelvis.position.z;
    minGap = Math.min(minGap, gap);
    maxPelvisY = Math.max(maxPelvisY, rag.pelvis.position.y);
    if (gap < -0.6) passedThrough = true;
  }
  console.log(
    `  ${label.padEnd(34)} 통과=${passedThrough ? "예 ✗" : "아니오 ✓"}  ` +
    `최소간격=${minGap.toFixed(2)}  최고골반높이=${maxPelvisY.toFixed(2)}  ` +
    `냉장고z=${fridge.position.z.toFixed(2)} y=${fridge.position.y.toFixed(2)}`
  );
}

console.log("=== 접촉 강성에 따른 관통 여부 (냉장고 20kg 정면 돌진 10초) ===");
penetrationTest("현재 (기본 stiff 1e7, relax 3)", {});
penetrationTest("stiff 5e7", { stiff: 5e7 });
penetrationTest("stiff 1e8", { stiff: 1e8 });
penetrationTest("stiff 1e8 + relax 2", { stiff: 1e8, relax: 2 });
penetrationTest("stiff 1e8 + relax 2 + iters 30", { stiff: 1e8, relax: 2, iters: 30 });
penetrationTest("stiff 3e8 + relax 2", { stiff: 3e8, relax: 2 });

console.log("\n=== 같은 설정에서 캐릭터가 멀쩡히 서 있는가 (안정성 회귀 확인) ===");
for (const [label, cfg] of [
  ["현재", {}],
  ["stiff 1e8 + relax 2", { stiff: 1e8, relax: 2 }],
  ["stiff 3e8 + relax 2", { stiff: 3e8, relax: 2 }],
] as [string, Cfg][]) {
  const { physics, rag } = build(cfg);
  for (let i = 0; i < 600; i++) { rag.control(1 / 60, NONE, physics); physics.step(1 / 60); rag.guard(); }
  const drift = Math.hypot(rag.pelvis.position.x, rag.pelvis.position.z);
  console.log(`  ${label.padEnd(22)} pelvisY=${rag.pelvis.position.y.toFixed(3)} state=${rag.state} drift=${drift.toFixed(2)} 유한=${Number.isFinite(rag.pelvis.position.y)}`);
}
