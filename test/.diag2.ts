import * as THREE from "three";
import * as CANNON from "cannon-es";
import { createRagdoll, P, type RagdollInput } from "../client/src/ragdoll";
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
  const scene = new THREE.Scene();
  const rag = createRagdoll(physics, scene, new CANNON.Vec3(0, P.rideHeight + 0.15, 0), playerMat,
    { skin: 0xffcc99, shirt: 0x3f8cff, pants: 0x333344 }, g, ragdollMask(g));
  return { physics, rag, propMat, scene };
}

function grabPivotOn(body: CANNON.Body, hand: CANNON.Body): CANNON.Vec3 {
  const local = body.quaternion.clone().conjugate().vmult(hand.position.vsub(body.position));
  const h = (body.shapes[0] as CANNON.Box).halfExtents;
  return new CANNON.Vec3(
    Math.max(-h.x, Math.min(h.x, local.x)),
    Math.max(-h.y, Math.min(h.y, local.y)),
    Math.max(-h.z, Math.min(h.z, local.z)));
}
function surfaceDist(body: CANNON.Body, hand: CANNON.Body) {
  const wp = body.position.vadd(body.quaternion.vmult(grabPivotOn(body, hand)));
  return wp.distanceTo(hand.position);
}

const NONE: RagdollInput = { moveX: 0, moveZ: 0, jump: false };

console.log("=== 가만히 서 있을 때 손 위치 (grabReach=" + P.grabReach + ") ===");
{
  const { physics, rag } = build();
  for (let i = 0; i < 240; i++) { rag.control(1 / 60, NONE, physics); physics.step(1 / 60); rag.guard(); }
  const h = rag.handL, hr = rag.handR;
  console.log(`  pelvis=(${rag.pelvis.position.x.toFixed(2)},${rag.pelvis.position.y.toFixed(2)},${rag.pelvis.position.z.toFixed(2)})`);
  console.log(`  handL =(${h.position.x.toFixed(2)},${h.position.y.toFixed(2)},${h.position.z.toFixed(2)})`);
  console.log(`  handR =(${hr.position.x.toFixed(2)},${hr.position.y.toFixed(2)},${hr.position.z.toFixed(2)})`);
  const torsoFwd = new CANNON.Vec3(0, 0, 1);
  rag.torso.quaternion.vmult(torsoFwd, torsoFwd);
  console.log(`  torso forward = (${torsoFwd.x.toFixed(2)},${torsoFwd.y.toFixed(2)},${torsoFwd.z.toFixed(2)})`);
}

console.log("\n=== 냉장고를 정면 여러 거리에 두고 손-표면 거리 측정 ===");
for (const dz of [0.8, 1.0, 1.2, 1.4, 1.6, 1.8]) {
  const { physics, rag, propMat } = build();
  const fridge = new CANNON.Body({
    mass: 20, shape: new CANNON.Box(new CANNON.Vec3(0.6, 1.1, 0.5)),
    position: new CANNON.Vec3(0, 1.1, dz), material: propMat,
  });
  fridge.angularDamping = 0.2; fridge.linearDamping = 0.02;
  physics.addBody(fridge);
  for (let i = 0; i < 240; i++) { rag.control(1 / 60, NONE, physics); physics.step(1 / 60); rag.guard(); }
  const dL = surfaceDist(fridge, rag.handL), dR = surfaceDist(fridge, rag.handR);
  const centerL = fridge.position.distanceTo(rag.handL.position);
  const within = fridge.position.distanceTo(rag.handL.position) <= 2.4;
  console.log(`  냉장고z=${dz.toFixed(1)}  손-표면 L=${dL.toFixed(3)} R=${dR.toFixed(3)}  ` +
    `중심거리=${centerL.toFixed(2)}(radius2.4:${within ? "OK" : "밖"})  ` +
    `-> grab ${(dL < P.grabReach || dR < P.grabReach) ? "가능" : "불가"}   pelvisY=${rag.pelvis.position.y.toFixed(2)} state=${rag.state}`);
}

console.log("\n=== 작은 상자(0.8) 정면 여러 거리 ===");
for (const dz of [0.6, 0.8, 1.0, 1.2]) {
  const { physics, rag, propMat } = build();
  const box = new CANNON.Body({
    mass: 4, shape: new CANNON.Box(new CANNON.Vec3(0.4, 0.4, 0.4)),
    position: new CANNON.Vec3(0, 0.4, dz), material: propMat,
  });
  box.angularDamping = 0.2; box.linearDamping = 0.02;
  physics.addBody(box);
  for (let i = 0; i < 240; i++) { rag.control(1 / 60, NONE, physics); physics.step(1 / 60); rag.guard(); }
  const dL = surfaceDist(box, rag.handL), dR = surfaceDist(box, rag.handR);
  console.log(`  상자z=${dz.toFixed(1)}  손-표면 L=${dL.toFixed(3)} R=${dR.toFixed(3)} -> grab ${(dL < P.grabReach || dR < P.grabReach) ? "가능" : "불가"}`);
}
