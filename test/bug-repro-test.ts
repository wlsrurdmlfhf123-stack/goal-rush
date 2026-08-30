/**
 * 긴급 버그 4개 재현/검증 테스트.
 *
 * [이 테스트가 존재하는 이유]
 * 기존 ragdoll-test.ts는 자기만의 작은 월드를 직접 만들어서 돌렸다. 그래서
 * "래그돌 자체는 멀쩡한데 main.ts/world.ts의 배선이 틀린" 종류의 버그를
 * 원리적으로 잡을 수 없었다. 여기서는 main.ts와 world.ts의 실제 설정값을
 * 그대로 복제해서(그룹/마스크 공식, 소품 바디 구성, 물리 파라미터) 배선을
 * 검증한다.
 *
 * 카메라/입력은 순수 수학이므로 main.ts에서 추출한 함수를 직접 테스트한다.
 */
import * as THREE from "three";
import * as CANNON from "cannon-es";
import { createRagdoll, GROUP_WORLD, P, type Ragdoll, type RagdollInput } from "../client/src/ragdoll";
import { applyCarryForce, holdForceFor } from "../client/src/carry";
import { cameraBasis, groupFor, ragdollMask } from "../client/src/input-math";

let pass = 0, fail = 0;
function check(name: string, cond: boolean, extra = "") {
  if (cond) { pass++; console.log(`  PASS  ${name}`); }
  else { fail++; console.log(`  FAIL  ${name} ${extra}`); }
}
const near = (a: number, b: number, eps = 1e-6) => Math.abs(a - b) < eps;

// ================================================================ 버그 1 / 2
//
// 카메라 기저 벡터. 오른손 좌표계(Y up)에서 right = forward × up 이다.
//   forward = (sin yaw, 0, cos yaw)
//   right   = forward × (0,1,0) = (-cos yaw, 0, sin yaw)
// 이걸 뒤집어 쓰면 A/D가 정확히 반대로 나온다.
console.log("\n--- BUG 1: A/D 좌우 매핑 ---");
{
  // yaw = 0 -> 정면이 +Z ("남쪽"을 본다)
  const b0 = cameraBasis(0);
  check("yaw=0 이면 forward = +Z", near(b0.fx, 0) && near(b0.fz, 1), `f=(${b0.fx},${b0.fz})`);
  // +Z를 보고 있을 때 내 오른쪽은 -X 다 (오른손 좌표계)
  check("yaw=0 이면 right = -X", near(b0.rx, -1) && near(b0.rz, 0), `r=(${b0.rx},${b0.rz})`);

  // yaw = PI/2 -> 정면이 +X, 오른쪽은 +Z
  const b1 = cameraBasis(Math.PI / 2);
  check("yaw=90° 이면 forward = +X", near(b1.fx, 1) && Math.abs(b1.fz) < 1e-9,
    `f=(${b1.fx.toFixed(3)},${b1.fz.toFixed(3)})`);
  check("yaw=90° 이면 right = +Z", near(b1.rz, 1, 1e-9) && Math.abs(b1.rx) < 1e-9,
    `r=(${b1.rx.toFixed(3)},${b1.rz.toFixed(3)})`);

  // right 는 forward 와 직교해야 하고, forward × up 과 같은 방향이어야 한다
  for (const yaw of [0, 0.7, 1.9, -2.4, Math.PI]) {
    const b = cameraBasis(yaw);
    const dot = b.fx * b.rx + b.fz * b.rz;
    check(`yaw=${yaw.toFixed(1)} : right ⊥ forward`, Math.abs(dot) < 1e-9, `dot=${dot}`);
    // 외적 forward × up 의 xz 성분 = (-fz, fx)
    check(`yaw=${yaw.toFixed(1)} : right = forward × up`,
      near(b.rx, -b.fz) && near(b.rz, b.fx),
      `right=(${b.rx.toFixed(3)},${b.rz.toFixed(3)}) expected=(${(-b.fz).toFixed(3)},${b.fx.toFixed(3)})`);
  }
}

console.log("\n--- BUG 2: 마우스 pitch 방향 ---");
{
  // main.ts와 동일한 규칙: 마우스를 위로 올리면 movementY < 0.
  // 3인칭 궤도 카메라에서 "위를 본다" = 카메라가 캐릭터보다 아래로 내려간다
  // = pitch(고도각)가 작아진다.
  const applyPitch = (pitch: number, movementY: number) => pitch + movementY * 0.0022;

  const start = 0.4;
  const up = applyPitch(start, -100);    // 마우스 위로
  const down = applyPitch(start, +100);  // 마우스 아래로
  check("마우스를 위로 올리면 pitch가 감소 (= 하늘을 본다)", up < start, `${start} -> ${up}`);
  check("마우스를 아래로 내리면 pitch가 증가 (= 바닥을 본다)", down > start, `${start} -> ${down}`);

  // pitch가 카메라 높이에 어떻게 반영되는지 (updateCamera와 동일한 식)
  const camY = (pitch: number) => Math.sin(pitch) * 6.2 + 1.8;
  check("pitch가 작을수록 카메라가 낮다 (= 올려다본다)", camY(up) < camY(down), `${camY(up)} vs ${camY(down)}`);
}

// ================================================================ 공통 픽스처
//
// world.ts createWorld()의 물리 설정을 그대로 복제한다.
// (여기 숫자가 world.ts와 어긋나면 이 테스트는 의미가 없어진다 - world.ts를
//  고칠 때 같이 고쳐야 한다)
function buildWorld() {
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

  return { physics, scene: new THREE.Scene(), groundMat, playerMat, propMat };
}

/** world.ts addProp()과 동일한 바디 구성 */
function addProp(
  physics: CANNON.World, propMat: CANNON.Material,
  size: [number, number, number], pos: [number, number, number], mass: number
) {
  const body = new CANNON.Body({
    mass,
    shape: new CANNON.Box(new CANNON.Vec3(size[0] / 2, size[1] / 2, size[2] / 2)),
    position: new CANNON.Vec3(pos[0], pos[1], pos[2]),
    material: propMat,
  });
  body.angularDamping = 0.2;
  body.linearDamping = 0.02;
  physics.addBody(body);
  return body;
}

/** main.ts spawnPlayer()와 동일한 그룹/마스크로 래그돌 생성 */
function spawn(
  physics: CANNON.World, scene: THREE.Scene, playerMat: CANNON.Material,
  id: number, x: number, z: number
): Ragdoll {
  const myGroup = groupFor(id);
  return createRagdoll(
    physics, scene, new CANNON.Vec3(x, P.rideHeight + 0.15, z), playerMat,
    { skin: 0xffcc99, shirt: 0x3f8cff, pants: 0x333344 },
    myGroup, ragdollMask(myGroup)
  );
}

const NONE: RagdollInput = { moveX: 0, moveZ: 0, jump: false };
function step(physics: CANNON.World, rags: Ragdoll[], n: number, input: RagdollInput = NONE) {
  for (let i = 0; i < n; i++) {
    for (const r of rags) r.control(1 / 60, input, physics);
    physics.step(1 / 60);
    for (const r of rags) r.guard();
  }
}

// ================================================================ 버그 3
console.log("\n--- BUG 3: 캐릭터 <-> 소품 충돌 ---");
{
  const { physics, scene, playerMat, propMat } = buildWorld();

  // 마스크 계산부터 확인 (여기가 틀리면 아래 시뮬레이션은 볼 것도 없다)
  for (const id of [0, 1, 2, 3]) {
    const g = groupFor(id);
    const m = ragdollMask(g);
    check(`P${id}: 월드(그룹1)와 충돌 가능`, (GROUP_WORLD & m) !== 0, `group=${g} mask=${m}`);
    check(`P${id}: 자기 자신과는 충돌 안 함`, (g & m) === 0, `group=${g} mask=${m}`);
  }
  const gA = groupFor(1), gB = groupFor(2);
  check("서로 다른 플레이어끼리는 충돌 가능",
    (gA & ragdollMask(gB)) !== 0 && (gB & ragdollMask(gA)) !== 0);

  // 소품 바디는 기본 그룹(1)/마스크(-1)를 쓴다 - 래그돌 마스크에 걸려야 한다
  const box = addProp(physics, propMat, [0.8, 0.8, 0.8], [0, 0.4, 1.6], 4);
  check("소품 바디 그룹 = 1 (GROUP_WORLD)", box.collisionFilterGroup === GROUP_WORLD,
    `group=${box.collisionFilterGroup}`);
  const rag = spawn(physics, scene, playerMat, 1, 0, 0);
  check("소품 마스크가 래그돌 그룹을 포함",
    (rag.pelvis.collisionFilterGroup & box.collisionFilterMask) !== 0);

  // 실제로 걸어가서 부딪히는가
  step(physics, [rag], 120);
  const boxStart = box.position.clone();
  step(physics, [rag], 300, { moveX: 0, moveZ: 1, jump: false });

  const boxMoved = box.position.distanceTo(boxStart);
  check("몸으로 밀면 가벼운 상자가 움직인다 (>0.3m)", boxMoved > 0.3, `moved=${boxMoved.toFixed(3)}`);
  check("상자를 통과해 지나가지 않는다 (캐릭터가 상자보다 뒤)",
    rag.pelvis.position.z < box.position.z, `pelvisZ=${rag.pelvis.position.z.toFixed(2)} boxZ=${box.position.z.toFixed(2)}`);
}

{
  // 무거운 소품(냉장고)은 몸통 박치기만으로는 거의 안 밀려야 한다 (설계 의도)
  // 단, "전혀 반응이 없다 = 통과한다"와는 구분되어야 한다.
  const { physics, scene, playerMat, propMat } = buildWorld();
  const fridge = addProp(physics, propMat, [1.2, 2.2, 1.0], [0, 1.1, 2.0], 20);
  const rag = spawn(physics, scene, playerMat, 1, 0, 0);
  step(physics, [rag], 120);
  step(physics, [rag], 300, { moveX: 0, moveZ: 1, jump: false });

  const gap = fridge.position.z - rag.pelvis.position.z;
  check("냉장고를 몸으로 통과하지 못한다 (골반이 냉장고 앞면 바깥)",
    gap > 0.45, `gap=${gap.toFixed(3)}`);
  check("냉장고가 몸통 박치기로는 크게 안 밀린다 (<1.0m)",
    Math.abs(fridge.position.z - 2.0) < 1.0, `z=${fridge.position.z.toFixed(3)}`);
}

// ================================================================ 버그 4
console.log("\n--- BUG 4: 냉장고 grab -> 운반 ---");

/** main.ts grabPivotOn()과 동일 */
function grabPivotOn(body: CANNON.Body, hand: CANNON.Body): CANNON.Vec3 {
  const local = body.quaternion.clone().conjugate().vmult(hand.position.vsub(body.position));
  const h = (body.shapes[0] as CANNON.Box).halfExtents;
  return new CANNON.Vec3(
    Math.max(-h.x, Math.min(h.x, local.x)),
    Math.max(-h.y, Math.min(h.y, local.y)),
    Math.max(-h.z, Math.min(h.z, local.z))
  );
}

/** main.ts nearestObjectTo()와 동일 (소품 1개짜리 축소판) */
function canReach(body: CANNON.Body, hand: CANNON.Body, grabRadius: number): { ok: boolean; d: number } {
  if (body.position.distanceTo(hand.position) > grabRadius) return { ok: false, d: Infinity };
  const worldPivot = body.position.vadd(body.quaternion.vmult(grabPivotOn(body, hand)));
  const d = worldPivot.distanceTo(hand.position);
  return { ok: d < P.grabReach, d };
}

{
  const { physics, scene, playerMat, propMat } = buildWorld();
  const fridge = addProp(physics, propMat, [1.2, 2.2, 1.0], [0, 1.1, 2.2], 20);
  const rag = spawn(physics, scene, playerMat, 1, 0, 0);
  step(physics, [rag], 120);
  // 냉장고 앞까지 걸어간다
  step(physics, [rag], 200, { moveX: 0, moveZ: 1, jump: false });

  const rL = canReach(fridge, rag.handL, 2.4);
  const rR = canReach(fridge, rag.handR, 2.4);
  console.log(`    [측정] handL 표면거리=${rL.d.toFixed(3)}  handR=${rR.d.toFixed(3)}  grabReach=${P.grabReach}`);
  check("냉장고 앞에 서면 손이 잡기 사거리 안에 들어온다", rL.ok || rR.ok,
    `dL=${rL.d.toFixed(3)} dR=${rR.d.toFixed(3)} reach=${P.grabReach}`);
}

{
  // grab -> 캐리 힘 적용 -> 실제로 옮겨지는가 (main.ts fixedUpdate의 캐리 부분 복제)
  const { physics, scene, playerMat, propMat } = buildWorld();
  const fridge = addProp(physics, propMat, [1.2, 2.2, 1.0], [0, 1.1, 2.2], 20);
  const rag = spawn(physics, scene, playerMat, 1, 0, 0);
  step(physics, [rag], 120);
  step(physics, [rag], 200, { moveX: 0, moveZ: 1, jump: false });

  const startZ = fridge.position.z;
  const holdForce = holdForceFor(fridge, Math.abs(physics.gravity.y));
  check("holdForce가 냉장고 무게(360N) 이상으로 잡힌다", holdForce >= 20 * 18,
    `holdForce=${holdForce.toFixed(1)}`);

  // 잡은 상태로 앞으로 계속 이동
  fridge.linearDamping = Math.max(fridge.linearDamping, P.carryObjDamp);
  fridge.angularDamping = Math.max(fridge.angularDamping, P.carryObjAngDamp);
  let ramp = 0;
  const input: RagdollInput = { moveX: 0, moveZ: 1, jump: false };
  for (let i = 0; i < 420; i++) {
    ramp += 1 / 60;
    rag.setHeld([fridge]);
    rag.control(1 / 60, input, physics);
    applyCarryForce(physics, fridge, [{ rag, ramp }]);
    physics.step(1 / 60);
    rag.guard();
  }
  const moved = fridge.position.z - startZ;
  console.log(`    [측정] 1인 grab 7초 후 냉장고 이동 = ${moved.toFixed(3)}m`);
  check("1인이 잡고 밀면 냉장고가 실제로 움직인다 (>0.8m)", moved > 0.8, `moved=${moved.toFixed(3)}`);
  check("냉장고가 공중으로 뜨지 않는다 (혼자서는 못 듦)", fridge.position.y < 1.6,
    `y=${fridge.position.y.toFixed(3)}`);
}

{
  // 2인이 잡으면 들어올릴 수 있어야 한다
  const { physics, scene, playerMat, propMat } = buildWorld();
  const fridge = addProp(physics, propMat, [1.2, 2.2, 1.0], [0, 1.1, 2.2], 20);
  const a = spawn(physics, scene, playerMat, 1, -0.5, 0.6);
  const b = spawn(physics, scene, playerMat, 2, 0.5, 0.6);
  step(physics, [a, b], 150);

  fridge.linearDamping = Math.max(fridge.linearDamping, P.carryObjDamp);
  fridge.angularDamping = Math.max(fridge.angularDamping, P.carryObjAngDamp);
  let ramp = 0;
  for (let i = 0; i < 300; i++) {
    ramp += 1 / 60;
    a.setHeld([fridge]); b.setHeld([fridge]);
    a.control(1 / 60, NONE, physics);
    b.control(1 / 60, NONE, physics);
    applyCarryForce(physics, fridge, [{ rag: a, ramp }, { rag: b, ramp }]);
    physics.step(1 / 60);
    a.guard(); b.guard();
  }
  console.log(`    [측정] 2인 grab 5초 후 냉장고 높이 = ${fridge.position.y.toFixed(3)}m (시작 1.1)`);
  check("2인이 잡으면 냉장고가 들린다 (y > 1.15)", fridge.position.y > 1.15,
    `y=${fridge.position.y.toFixed(3)}`);
}

console.log(`\nRESULT: ${pass} passed, ${fail} failed`);
if (fail > 0) process.exit(1);
