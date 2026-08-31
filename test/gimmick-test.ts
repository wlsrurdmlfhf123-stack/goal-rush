import * as THREE from "three";
import * as CANNON from "cannon-es";
import { createRagdoll, GROUP_WORLD, P, type Ragdoll } from "../client/src/ragdoll";
import { B } from "../client/src/ball";
import { OB, createObstacles, type ObstacleKind, type ObstacleSpec } from "../client/src/obstacles";
import type { World } from "../client/src/world";

/**
 * 맵 공통 기믹 런타임 — 플랫폼 / 컨베이어 / 바람 / 공 소켓 / 레버 / 신호 문.
 *
 * 여기서 잠그는 것은 "새 기믹이 도는가"만이 아니다. **기존 구조를 안 깨뜨렸는가**가
 * 절반이다:
 *  - park() 가 새 kind 도 초기 자세로 되돌리는가 (다시하기 / 맵 전환)
 *  - 새 kind 가 사람을 넘어뜨리지 않는가 (KNOCKS 에 안 들어갔는가)
 *  - link 가 없는 예전 coopgate 동작이 그대로인가
 *
 * 파라미터 이름은 maps/gimmicks.ts 의 어휘를 그대로 쓴다 (axis/span/speed/w/len,
 * dirZ, dirX/force, hold). 스테이지 파일이 이미 그 이름으로 적혀 있기 때문이다.
 *
 * 물리 설정은 test/ball-test.ts 와 같은 rig 다.
 */

let pass = 0, fail = 0;
function check(name: string, cond: boolean, extra = "") {
  if (cond) { pass++; console.log(`  PASS  ${name}`); }
  else { fail++; console.log(`  FAIL  ${name} ${extra}`); }
}
const fin = (v: CANNON.Vec3) => Number.isFinite(v.x) && Number.isFinite(v.y) && Number.isFinite(v.z);
const GROUP_A = 2;
const LANE_HALF = 7;

/** 맵이 선언하는 것과 같은 모양의 스펙 */
interface Decl {
  kind: ObstacleKind;
  z: number;
  arg?: number;
  phase?: number;
  x?: number;
  link?: number;
  params?: Record<string, number>;
}

interface Rig {
  ball: CANNON.Body;
  obstacles: ReturnType<typeof createObstacles>;
  rags: Ragdoll[];
  addRagdoll(x: number, z: number, y?: number): Ragdoll;
  step(n?: number, input?: { moveX: number; moveZ: number; jump: boolean }): void;
}

/** 맵 없이(=DOM 없이) 장애물 station 만 세우는 rig. 바디는 world.ts 와 같은 모양이다 */
function build(decls: Decl[], ballAt: [number, number, number] = [0, B.radius + 0.01, 0]): Rig {
  const physics = new CANNON.World({ gravity: new CANNON.Vec3(0, -18, 0) });
  physics.broadphase = new CANNON.NaiveBroadphase();
  physics.allowSleep = false;
  (physics.solver as CANNON.GSSolver).iterations = 22;

  const groundMat = new CANNON.Material("ground");
  const bodyMat = new CANNON.Material("player");
  const ballMat = new CANNON.Material("ball");
  const propMat = new CANNON.Material("prop");
  physics.addContactMaterial(new CANNON.ContactMaterial(groundMat, bodyMat, { friction: 0.55, restitution: 0 }));
  physics.addContactMaterial(new CANNON.ContactMaterial(groundMat, ballMat, { friction: 0.32, restitution: 0.45 }));
  physics.addContactMaterial(new CANNON.ContactMaterial(bodyMat, ballMat, { friction: 0.28, restitution: 0.35 }));
  physics.addContactMaterial(new CANNON.ContactMaterial(propMat, bodyMat, { friction: 0.6, restitution: 0.02 }));
  physics.addContactMaterial(new CANNON.ContactMaterial(propMat, ballMat, { friction: 0.25, restitution: 0.2 }));

  const ground = new CANNON.Body({
    type: CANNON.Body.STATIC, shape: new CANNON.Plane(), material: groundMat,
    collisionFilterGroup: GROUP_WORLD, collisionFilterMask: -1,
  });
  ground.quaternion.setFromEuler(-Math.PI / 2, 0, 0);
  physics.addBody(ground);

  const ball = new CANNON.Body({
    mass: B.mass, shape: new CANNON.Sphere(B.radius),
    position: new CANNON.Vec3(ballAt[0], ballAt[1], ballAt[2]), material: ballMat,
  });
  ball.linearDamping = 0.012;
  ball.angularDamping = 0.22;
  physics.addBody(ball);

  const obstacleSpecs: ObstacleSpec[] = [];
  const objectById = new Map<number, { body: CANNON.Body }>();
  let nextId = 200;
  for (const d of decls) {
    const id = nextId++;
    const pp = d.params ?? {};
    const x = d.x ?? 0;
    let shape: CANNON.Shape;
    let pos: CANNON.Vec3;
    let noResponse = false;
    switch (d.kind) {
      case "platform": {
        const w = pp.w ?? OB.platW, l = pp.len ?? OB.platD;
        shape = new CANNON.Box(new CANNON.Vec3(w * 0.5, OB.platH * 0.5, l * 0.5));
        pos = new CANNON.Vec3(x, OB.platY, d.z);
        break;
      }
      case "conveyor": {
        const w = pp.w ?? OB.convW, l = pp.len ?? OB.convD;
        shape = new CANNON.Box(new CANNON.Vec3(w * 0.5, OB.convH * 0.5, l * 0.5));
        pos = new CANNON.Vec3(x, OB.convY, d.z);
        break;
      }
      case "wind": {
        const w = pp.w ?? OB.windW, l = pp.len ?? OB.windD;
        shape = new CANNON.Box(new CANNON.Vec3(w * 0.5, OB.windH * 0.5, l * 0.5));
        pos = new CANNON.Vec3(x, OB.windH * 0.5, d.z);
        noResponse = true;
        break;
      }
      case "ballsocket":
        shape = new CANNON.Cylinder(OB.sockR, OB.sockR, 0.12, 12);
        pos = new CANNON.Vec3(x, OB.sockY, d.z);
        noResponse = true;
        break;
      case "lever": {
        const w = pp.w ?? OB.leverW, l = pp.len ?? OB.leverD;
        shape = new CANNON.Box(new CANNON.Vec3(w * 0.5, 0.05, l * 0.5));
        pos = new CANNON.Vec3(x, OB.leverY, d.z);
        noResponse = true;
        break;
      }
      case "holdgate": {
        const w = pp.w ?? OB.gateW, h = pp.h ?? OB.gateH;
        shape = new CANNON.Box(new CANNON.Vec3(w * 0.5, h * 0.5, OB.gateD * 0.5));
        pos = new CANNON.Vec3(x, h * 0.5, d.z);
        break;
      }
      default:
        shape = new CANNON.Box(new CANNON.Vec3(OB.gateW * 0.5, OB.gateH * 0.5, OB.gateD * 0.5));
        pos = new CANNON.Vec3(0, OB.gateH * 0.5, d.z);
    }
    const body = new CANNON.Body({
      mass: 0, type: CANNON.Body.KINEMATIC, shape, position: pos, material: propMat,
    });
    if (noResponse) body.collisionResponse = false;
    physics.addBody(body);
    objectById.set(id, { body });
    obstacleSpecs.push({
      id, kind: d.kind, z: d.z, arg: d.arg ?? 0, phase: d.phase ?? 0,
      x: d.x, link: d.link, params: d.params,
    });
  }

  // ridersOf() 가 physics.contacts 를 읽으므로 스텁에도 물리 월드를 넣는다
  const world = { obstacleSpecs, objectById, physics } as unknown as World;
  const obstacles = createObstacles(world, LANE_HALF);
  obstacles.rebuild();

  const scene = new THREE.Scene();
  const rags: Ragdoll[] = [];
  /** y 를 주면 그 높이에 세운다 (발판 위에 올려놓을 때 = 발판 윗면 + rideHeight) */
  const addRagdoll = (x: number, z: number, y = P.rideHeight) => {
    const r = createRagdoll(
      physics, scene, new CANNON.Vec3(x, y, z), bodyMat,
      { skin: 0xffcc99, shirt: 0x3f8cff, pants: 0x333344 },
      GROUP_A, 0xffff & ~GROUP_A,
    );
    rags.push(r);
    return r;
  };

  const dt = 1 / 60;
  /**
   * 한 스텝.
   *
   * [control() 을 반드시 같이 돌린다] 발판 승객 문제의 원인이 control() 의
   * 속도 서보이므로, 그걸 안 돌리면 실제 조건이 재현되지 않는다. 입력은 0
   * (= 가만히 서 있음)이라 서보는 "월드 기준 속도 0"을 목표로 제동을 건다 -
   * 게임에서 발판 위에 가만히 서 있는 것과 같은 상황이다.
   */
  const step = (n = 1, input: { moveX: number; moveZ: number; jump: boolean } = { moveX: 0, moveZ: 0, jump: false }) => {
    for (let i = 0; i < n; i++) {
      obstacles.update(dt, rags, ball);
      for (const rag of rags) rag.control(dt, input, physics);
      physics.step(dt);
    }
  };
  return { ball, obstacles, rags, addRagdoll, step };
}

// ---------------------------------------------------------------- 1. 플랫폼
console.log("\n--- TEST 1: 움직이는 플랫폼 (axis / span / phase) ---");
{
  // axis 0 = x축 왕복 (기믹 시험장이 쓰는 형태)
  const r = build([{ kind: "platform", z: 0, params: { axis: 0, span: 8, speed: 2.4, w: 3.2, len: 3.0, y: 0.5 } }]);
  const b = r.obstacles.stations[0].body;
  let minX = b.position.x, maxX = b.position.x;
  for (let i = 0; i < 900; i++) { r.step(); minX = Math.min(minX, b.position.x); maxX = Math.max(maxX, b.position.x); }
  check("axis 0: x축으로 왕복한다", maxX > 3.0 && minX < -3.0, `min=${minX.toFixed(2)} max=${maxX.toFixed(2)}`);
  check("axis 0: span(8) 을 넘지 않는다", maxX < 4.3 && minX > -4.3, `min=${minX.toFixed(2)} max=${maxX.toFixed(2)}`);
  check("axis 0: z 는 고정", Math.abs(b.position.z) < 1e-6, `z=${b.position.z}`);
}
{
  // axis 1 = z축 왕복 (스테이지 3이 쓰는 형태)
  const r = build([{ kind: "platform", z: -55, x: -4.6, params: { axis: 1, span: 10, speed: 2.4, w: 3.2, len: 3.0, y: 0.5 } }]);
  const b = r.obstacles.stations[0].body;
  let minZ = b.position.z, maxZ = b.position.z;
  for (let i = 0; i < 900; i++) { r.step(); minZ = Math.min(minZ, b.position.z); maxZ = Math.max(maxZ, b.position.z); }
  check("axis 1: z축으로 왕복한다", maxZ > -51.5 && minZ < -58.5, `min=${minZ.toFixed(2)} max=${maxZ.toFixed(2)}`);
  check("axis 1: 중심 z(-55) 기준 span(10) 안", maxZ < -49.7 && minZ > -60.3, `min=${minZ.toFixed(2)} max=${maxZ.toFixed(2)}`);
  check("axis 1: x 는 맵이 준 -4.6 에 고정", Math.abs(b.position.x + 4.6) < 1e-6, `x=${b.position.x}`);
}
{
  // 위상을 어긋나게 두면 실제로 서로 다른 자리에 있다 (스테이지 3의 의도)
  const r = build([
    { kind: "platform", z: -55, x: -4.6, phase: 0.0, params: { axis: 1, span: 10, speed: 2.4, y: 0.5 } },
    { kind: "platform", z: -55, x: 4.6, phase: 2.1, params: { axis: 1, span: 10, speed: 2.4, y: 0.5 } },
  ]);
  const a = r.obstacles.stations[0].body, c = r.obstacles.stations[1].body;
  check("phase 가 다르면 출발 위치가 다르다", Math.abs(a.position.z - c.position.z) > 1.0,
    `${a.position.z.toFixed(2)} vs ${c.position.z.toFixed(2)}`);
  let maxGap = 0;
  for (let i = 0; i < 600; i++) { r.step(); maxGap = Math.max(maxGap, Math.abs(a.position.z - c.position.z)); }
  check("둘이 계속 어긋나 움직인다", maxGap > 2.0, `maxGap=${maxGap.toFixed(2)}`);
}
{
  // 발판 위의 공이 같이 실려 간다
  const r = build(
    [{ kind: "platform", z: 0, params: { axis: 0, span: 8, speed: 2.4, w: 4.0, len: 4.0, y: 0.5 } }],
    [-4, 0.5 + OB.platH * 0.5 + B.radius + 0.05, 0],
  );
  const bx0 = r.ball.position.x;
  const bp0 = r.obstacles.stations[0].body.position.x;
  r.step(90);
  const bMoved = r.ball.position.x - bx0;
  const bPlat = r.obstacles.stations[0].body.position.x - bp0;
  console.log(`      공: ${bMoved.toFixed(2)}m / 발판 ${bPlat.toFixed(2)}m = ${(bMoved / bPlat * 100).toFixed(0)}%`);
  // [사람과 달리 공은 "태워 옮기지" 않는다 - 승객 처리는 래그돌에만 건다]
  // 공은 구(球)라 표면이 끌면 미끄러지기보다 **구른다**. 그래서 발판을 그대로
  // 따라가지 않고 제자리에서 구르며 뒤처진다. 브라우저 실측도 같았다(따라감 0%).
  // 이건 이번 수정 전후가 동일한, 원래부터의 거동이다. 여기서 잠그는 것은
  // "공이 발판 위에 남아 있고 튕겨 나가지 않는다"까지다.
  check("발판 위의 공이 굴러떨어지거나 튕겨나가지 않는다",
    r.ball.position.y > 0.5 && Math.abs(r.ball.position.x - r.obstacles.stations[0].body.position.x) < 2.4,
    `y=${r.ball.position.y.toFixed(2)} 발판중심과 ${Math.abs(r.ball.position.x - r.obstacles.stations[0].body.position.x).toFixed(2)}m`);
  check("공 물리가 유한값", fin(r.ball.position) && fin(r.ball.velocity));
}
{
  // 사람이 발판 위에 올라가 같이 실려 간다
  const r = build([{ kind: "platform", z: 0, params: { axis: 0, span: 8, speed: 2.4, w: 4.4, len: 4.4, y: 0.5 } }]);
  const rag = r.addRagdoll(-4, 0, 0.7 + P.rideHeight);
  r.step(40);
  const y = rag.pelvis.position.y;
  const x0 = rag.pelvis.position.x;
  const px0 = r.obstacles.stations[0].body.position.x;
  r.step(90);
  const moved = rag.pelvis.position.x - x0;
  const platMoved = r.obstacles.stations[0].body.position.x - px0;
  const ratio = platMoved !== 0 ? moved / platMoved : 0;
  check("사람이 발판 위에 서 있다", y > 0.5, `y=${y.toFixed(2)}`);
  check("발판이 사람을 싣고 간다", moved > 0.5,
    `${x0.toFixed(2)} -> ${rag.pelvis.position.x.toFixed(2)}`);
  // [핵심] 속도 서보에 지워지지 않고 발판 이동량을 거의 그대로 받는가.
  // 위치로 옮기기 전에는 이 비율이 0.38 (6.32m 중 2.39m) 였다.
  check("발판 이동량을 거의 그대로 따라간다 (90% 이상)", ratio > 0.9,
    `사람 ${moved.toFixed(2)} / 발판 ${platMoved.toFixed(2)} = ${(ratio * 100).toFixed(0)}%`);
  console.log(`      따라간 비율: ${(ratio * 100).toFixed(1)}% (사람 ${moved.toFixed(2)}m / 발판 ${platMoved.toFixed(2)}m)`);
  check("발판에 실려도 안 넘어진다", rag.state !== "RAGDOLL", rag.state);
  check("물리가 유한값", fin(rag.pelvis.position) && fin(rag.pelvis.velocity));
}

{
  // 태워 주는 것이 "걷기"를 잡아먹으면 안 된다. 발판 진행축(x)과 직각(z)으로
  // 걸으면, x 는 발판을 따라가고 z 는 자기 걸음만큼 가야 한다.
  const r = build([{ kind: "platform", z: 0, params: { axis: 0, span: 8, speed: 2.4, w: 6.0, len: 6.0, y: 0.5 } }]);
  const rag = r.addRagdoll(-4, 0, 0.7 + P.rideHeight);
  r.step(40);
  const x0 = rag.pelvis.position.x, z0 = rag.pelvis.position.z;
  const px0 = r.obstacles.stations[0].body.position.x;
  r.step(70, { moveX: 0, moveZ: 1, jump: false });
  const dxMe = rag.pelvis.position.x - x0;
  const dzMe = rag.pelvis.position.z - z0;
  const dxPlat = r.obstacles.stations[0].body.position.x - px0;
  console.log(`      발판 위 걷기: x 사람 ${dxMe.toFixed(2)} / 발판 ${dxPlat.toFixed(2)}, z 사람 ${dzMe.toFixed(2)}`);
  check("발판 위에서 걸어도 발판 방향은 계속 따라간다",
    dxPlat !== 0 && dxMe / dxPlat > 0.8, `${(dxMe / dxPlat * 100).toFixed(0)}%`);
  // 멈춰 있는 발판 위에서 같은 걸음 (태우기는 이동량 0이라 아예 안 걸린다)
  const still = build([{ kind: "platform", z: 0, params: { axis: 0, span: 8, speed: 0, w: 6.0, len: 6.0, y: 0.5 } }]);
  const sr = still.addRagdoll(-4, 0, 0.7 + P.rideHeight);
  still.step(40);
  const sz0 = sr.pelvis.position.z;
  still.step(70, { moveX: 0, moveZ: 1, jump: false });
  const dzStill = sr.pelvis.position.z - sz0;
  console.log(`      멈춘 발판 위 걷기: z ${dzStill.toFixed(2)}m`);

  // 기준선: 발판 없이 평지에서 같은 시간 걸었을 때의 거리 (래그돌은 가속이 느리다)
  const flat = build([]);
  const fr = flat.addRagdoll(0, 0);
  flat.step(40);
  const fz0 = fr.pelvis.position.z;
  flat.step(70, { moveX: 0, moveZ: 1, jump: false });
  const dzFlat = fr.pelvis.position.z - fz0;
  console.log(`      평지 기준선: z ${dzFlat.toFixed(2)}m`);
  check("태우기가 걷기를 취소하지 않는다 (평지 대비 60% 이상)",
    dzFlat !== 0 && Math.abs(dzMe) > Math.abs(dzFlat) * 0.6,
    `발판 위 ${dzMe.toFixed(2)} vs 평지 ${dzFlat.toFixed(2)}`);
  check("발판 위에서 안 넘어진다", rag.state !== "RAGDOLL", rag.state);
}

// ---------------------------------------------------------------- 2. 컨베이어
console.log("\n--- TEST 2: 컨베이어 (dirZ / speed / w / len) ---");
{
  const r = build(
    [{ kind: "conveyor", z: 0, params: { dirZ: 1, speed: 3.4, w: 8, len: 8 } }],
    [0, OB.convY + OB.convH * 0.5 + B.radius + 0.05, 0],
  );
  r.step(120);
  check("dirZ +1 이면 공을 +Z 로 보낸다", r.ball.position.z > 1.0, `z=${r.ball.position.z.toFixed(2)}`);
  check("설정 속도(3.4)를 크게 넘지 않는다", r.ball.velocity.z < 3.4 * 1.6, `vz=${r.ball.velocity.z.toFixed(2)}`);
}
{
  const r = build(
    [{ kind: "conveyor", z: 0, params: { dirZ: -1, speed: 3.4, w: 8, len: 8 } }],
    [0, OB.convY + OB.convH * 0.5 + B.radius + 0.05, 0],
  );
  r.step(120);
  check("dirZ -1 이면 반대로 보낸다", r.ball.position.z < -1.0, `z=${r.ball.position.z.toFixed(2)}`);
}
{
  const r = build([{ kind: "conveyor", z: 0, params: { dirZ: 1, speed: 3.4, w: 8, len: 8 } }], [0, B.radius + 0.01, 20]);
  const z0 = r.ball.position.z;
  r.step(120);
  check("벨트 밖(len 밖)의 공은 안 움직인다", Math.abs(r.ball.position.z - z0) < 0.3,
    `dz=${(r.ball.position.z - z0).toFixed(2)}`);
}

// ---------------------------------------------------------------- 3. 바람
console.log("\n--- TEST 3: 바람 (dirX / dirZ / force) ---");
{
  const r = build([{ kind: "wind", z: 0, params: { dirX: 1, dirZ: 0, force: 26, w: 14, len: 10 } }]);
  r.step(90);
  check("dirX +1 이면 공을 +X 로 민다", r.ball.position.x > 1.0, `x=${r.ball.position.x.toFixed(2)}`);
}
{
  const r = build([{ kind: "wind", z: 0, params: { dirX: -1, dirZ: 0, force: 26, w: 14, len: 10 } }]);
  r.step(90);
  check("dirX -1 이면 -X 로 민다", r.ball.position.x < -1.0, `x=${r.ball.position.x.toFixed(2)}`);
}
{
  const r = build([{ kind: "wind", z: 0, params: { dirX: 0, dirZ: 1, force: 26, w: 14, len: 10 } }]);
  r.step(90);
  check("dirZ 로도 밀 수 있다", r.ball.position.z > 1.0, `z=${r.ball.position.z.toFixed(2)}`);
}
{
  const r = build([{ kind: "wind", z: 0, params: { dirX: 1, force: 26, w: 14, len: 10 } }], [0, B.radius + 0.01, 40]);
  const x0 = r.ball.position.x;
  r.step(90);
  check("구역 밖의 공은 안 밀린다", Math.abs(r.ball.position.x - x0) < 0.3,
    `dx=${(r.ball.position.x - x0).toFixed(2)}`);
}
{
  // 바람은 막지 않는다 (collisionResponse=false)
  const r = build([{ kind: "wind", z: 0, params: { dirX: 0, force: 0, w: 14, len: 10 } }], [0, B.radius + 0.01, 7]);
  r.ball.velocity.set(0, 0, -8);
  r.step(120);
  check("바람 구역은 통과할 수 있다", r.ball.position.z < 0, `z=${r.ball.position.z.toFixed(2)}`);
}
{
  const r = build([{ kind: "wind", z: 0, params: { dirX: 1, force: 26, w: 14, len: 10 } }]);
  const rag = r.addRagdoll(0, 0);
  for (let i = 0; i < 30; i++) r.step();
  const x0 = rag.pelvis.position.x;
  r.step(120);
  check("바람이 사람도 민다", rag.pelvis.position.x > x0 + 0.4,
    `${x0.toFixed(2)} -> ${rag.pelvis.position.x.toFixed(2)}`);
  check("바람에 밀려도 안 넘어진다", rag.state !== "RAGDOLL", rag.state);
}

// ---------------------------------------------------------------- 4. 공 소켓
console.log("\n--- TEST 4: 공 소켓 -> 신호 ---");
{
  const r = build([{ kind: "ballsocket", z: 0, link: 5 }], [0, B.radius + 0.01, 0]);
  check("처음에는 꺼져 있다", r.obstacles.signals().length === 0);
  r.step(6);
  check("잠깐으로는 안 켜진다 (머물러야 한다)", !r.obstacles.signalActive(5));
  r.step(60);
  check("링 안에 머물면 켜진다", r.obstacles.signalActive(5) === true, JSON.stringify(r.obstacles.signals()));
  r.ball.position.set(25, B.radius + 0.01, 25);
  r.ball.velocity.setZero();
  r.step(90);
  check("공이 나가면 꺼진다", r.obstacles.signalActive(5) === false);
}
{
  const r = build([{ kind: "ballsocket", z: 0, link: 5 }], [0, B.radius + 0.01, 8]);
  r.ball.velocity.set(0, 0, -12);
  let everOn = false;
  for (let i = 0; i < 120; i++) { r.step(); if (r.obstacles.signalActive(5)) everOn = true; }
  check("스쳐 지나가는 공으로는 안 켜진다", everOn === false);
}

// ---------------------------------------------------------------- 5. 레버 + 신호 문
console.log("\n--- TEST 5: 레버 2개 + holdgate = 둘이 동시에 (스테이지 2의 구조) ---");
{
  const r = build([
    { kind: "lever", z: -130, x: -4.5, link: 0, params: { hold: 1, w: 2.2, len: 2.2 } },
    { kind: "lever", z: -130, x: 4.5, link: 0, params: { hold: 1, w: 2.2, len: 2.2 } },
    { kind: "holdgate", z: -142, link: 0, params: { w: 5.6, h: 2.6 } },
  ]);
  const gate = r.obstacles.stations[2].body;
  r.step(60);
  check("아무도 안 밟으면 닫혀 있다", gate.position.y > 0.5, `y=${gate.position.y.toFixed(2)}`);

  // 한 명만 밟는다 -> 안 열린다
  const p1 = r.addRagdoll(-4.5, -130);
  r.step(120);
  check("한 명만 밟으면 안 열린다 (전부 켜져야 한다)", gate.position.y > 0.5,
    `y=${gate.position.y.toFixed(2)} signals=${JSON.stringify(r.obstacles.signals())}`);
  check("그래도 신호 하나는 켜져 있다", r.obstacles.signalActive(0) === true);
  check("signalAll 은 아직 false", r.obstacles.signalAll(0) === false);

  // 두 번째 사람이 반대편 발판을 밟는다 -> 열린다
  const p2 = r.addRagdoll(4.5, -130);
  r.step(180);
  check("둘이 같이 밟으면 열린다", gate.position.y < 0,
    `y=${gate.position.y.toFixed(2)} signalAll=${r.obstacles.signalAll(0)}`);
  check("둘 다 안 넘어졌다", p1.state !== "RAGDOLL" && p2.state !== "RAGDOLL", `${p1.state}/${p2.state}`);

  // 한 명이 발판에서 내려오면 다시 닫힌다
  p2.pelvis.position.set(4.5, P.rideHeight, -110);
  p2.pelvis.velocity.setZero();
  r.step(180);
  check("한 명이 내려오면 다시 닫힌다", gate.position.y > 0.5, `y=${gate.position.y.toFixed(2)}`);
}
{
  // hold=0 이면 한 번 밟으면 유지된다
  const r = build([{ kind: "lever", z: 0, x: 0, link: 3, params: { hold: 0, w: 2.6, len: 2.6 } }]);
  const rag = r.addRagdoll(0, 0);
  r.step(60);
  check("hold=0: 밟으면 켜진다", r.obstacles.signalActive(3) === true);
  rag.pelvis.position.set(0, P.rideHeight, 30);
  rag.pelvis.velocity.setZero();
  r.step(120);
  check("hold=0: 내려와도 켜진 채로 유지된다", r.obstacles.signalActive(3) === true);
}

// ---------------------------------------------------------------- 6. coopgate 회귀
console.log("\n--- TEST 6: coopgate — link 있을 때 / 없을 때 ---");
{
  // link 가 있으면 신호 하나만 켜져도 열린다 (holdgate 와의 차이)
  const r = build([
    { kind: "ballsocket", z: 0, link: 1 },
    { kind: "coopgate", z: -10, link: 1 },
  ], [0, B.radius + 0.01, 0]);
  const gate = r.obstacles.stations[1].body;
  r.step(150);
  check("coopgate: 신호 하나로 열린다 (ANY)", gate.position.y < 0, `y=${gate.position.y.toFixed(2)}`);
}
{
  // link 가 없으면 예전 그대로 openGate() 로만 열린다
  const r = build([{ kind: "coopgate", z: -10 }]);
  const gate = r.obstacles.stations[0].body;
  r.step(60);
  check("link 없는 문은 저절로 안 열린다", gate.position.y > 0.5, `y=${gate.position.y.toFixed(2)}`);
  check("싱글 자동 개방 대상으로 남아 있다", r.obstacles.needsSoloOpen() === true);
  r.obstacles.openGate();
  r.step(120);
  check("openGate() 로는 예전처럼 열린다", gate.position.y < 0, `y=${gate.position.y.toFixed(2)}`);
}
{
  const r = build([
    { kind: "ballsocket", z: 0, link: 2 },
    { kind: "coopgate", z: -10, link: 2 },
  ]);
  check("link 문은 싱글 자동 개방 대상이 아니다", r.obstacles.needsSoloOpen() === false);
}

// ---------------------------------------------------------------- 7. park
console.log("\n--- TEST 7: park() 가 새 kind 도 되돌린다 ---");
{
  const r = build([
    { kind: "platform", z: 0, params: { axis: 0, span: 8, speed: 2.4, y: 0.5 } },
    { kind: "ballsocket", z: -10, link: 7 },
  ], [0, B.radius + 0.01, -10]);
  r.step(120);
  const moved = r.obstacles.stations[0].body.position.x;
  check("먼저 상태가 변해 있다", Math.abs(moved + 4) > 0.5, `x=${moved.toFixed(2)}`);
  check("소켓이 켜져 있다", r.obstacles.signalActive(7) === true);

  r.obstacles.park();
  check("park() 후 발판이 출발 위치로", Math.abs(r.obstacles.stations[0].body.position.x + 4) < 1e-6,
    `x=${r.obstacles.stations[0].body.position.x.toFixed(3)}`);
  check("park() 후 신호가 꺼진다", r.obstacles.signalActive(7) === false);
  check("park() 후 신호 목록이 빈다", r.obstacles.signals().length === 0);
}
{
  const r = build([]);
  check("빈 맵도 안 터진다", r.obstacles.stations.length === 0);
  r.step(30);
  check("빈 맵에서 update 가 안전하다", true);
}

console.log(`\nRESULT: ${pass} passed, ${fail} failed`);
if (fail > 0) process.exit(1);
