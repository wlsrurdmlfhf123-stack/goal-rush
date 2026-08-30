import * as THREE from "three";
import * as CANNON from "cannon-es";
import { createRagdoll, P, type RagdollInput } from "../client/src/ragdoll";
import { groupFor, ragdollMask } from "../client/src/input-math";

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

const fridge = new CANNON.Body({
  mass: 20,
  shape: new CANNON.Box(new CANNON.Vec3(0.6, 1.1, 0.5)),
  position: new CANNON.Vec3(0, 1.1, 2.2),
  material: propMat,
});
fridge.angularDamping = 0.2;
fridge.linearDamping = 0.02;
physics.addBody(fridge);

const g = groupFor(1);
const scene = new THREE.Scene();
const rag = createRagdoll(
  physics, scene, new CANNON.Vec3(0, P.rideHeight + 0.15, 0), playerMat,
  { skin: 0xffcc99, shirt: 0x3f8cff, pants: 0x333344 },
  g, ragdollMask(g)
);

const ragBodies = new Set(rag.bodies);
const NONE: RagdollInput = { moveX: 0, moveZ: 0, jump: false };
const FWD: RagdollInput = { moveX: 0, moveZ: 1, jump: false };

function contactsBetweenRagAndFridge(): number {
  let n = 0;
  for (const c of physics.contacts) {
    const a = c.bi, b = c.bj;
    if ((ragBodies.has(a) && b === fridge) || (ragBodies.has(b) && a === fridge)) n++;
  }
  return n;
}

for (let i = 0; i < 120; i++) { rag.control(1 / 60, NONE, physics); physics.step(1 / 60); rag.guard(); }

console.log("step  pelvisZ  pelvisY  fridgeZ  fridgeY  contacts  torsoZ  headZ  footLZ");
for (let i = 0; i < 400; i++) {
  rag.control(1 / 60, FWD, physics);
  physics.step(1 / 60);
  rag.guard();
  const nc = contactsBetweenRagAndFridge();
  if (i % 10 === 0 || (nc > 0 && i % 5 === 0)) {
    console.log(
      `${String(i).padStart(4)}  ${rag.pelvis.position.z.toFixed(3).padStart(7)}  ${rag.pelvis.position.y.toFixed(3).padStart(7)}  ` +
      `${fridge.position.z.toFixed(3).padStart(7)}  ${fridge.position.y.toFixed(3).padStart(7)}  ${String(nc).padStart(8)}  ` +
      `${rag.torso.position.z.toFixed(3).padStart(6)}  ${rag.parts.get("head")!.body.position.z.toFixed(3).padStart(6)}  ` +
      `${rag.parts.get("footL")!.body.position.z.toFixed(3).padStart(6)}`
    );
  }
}
