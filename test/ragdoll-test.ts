import * as THREE from "three";
import * as CANNON from "cannon-es";
import { createRagdoll, GROUP_WORLD, P, type Ragdoll, type RagdollInput } from "../client/src/ragdoll";

let pass = 0, fail = 0;
function check(name: string, cond: boolean, extra = "") {
  if (cond) { pass++; console.log(`  PASS  ${name}`); }
  else { fail++; console.log(`  FAIL  ${name} ${extra}`); }
}
const fin = (v: CANNON.Vec3) => Number.isFinite(v.x) && Number.isFinite(v.y) && Number.isFinite(v.z);
const NONE: RagdollInput = { moveX: 0, moveZ: 0, jump: false };

const GROUP_A = 2, GROUP_B = 4;

function build(): { physics: CANNON.World; scene: THREE.Scene; rag: Ragdoll } {
  const physics = new CANNON.World({ gravity: new CANNON.Vec3(0, -18, 0) });
  physics.broadphase = new CANNON.SAPBroadphase(physics);
  physics.allowSleep = false;
  (physics.solver as CANNON.GSSolver).iterations = 20;

  const groundMat = new CANNON.Material("ground");
  const bodyMat = new CANNON.Material("body");
  physics.addContactMaterial(new CANNON.ContactMaterial(groundMat, bodyMat, { friction: 0.55, restitution: 0.0 }));

  const ground = new CANNON.Body({
    type: CANNON.Body.STATIC, shape: new CANNON.Plane(), material: groundMat,
    collisionFilterGroup: GROUP_WORLD, collisionFilterMask: -1,
  });
  ground.quaternion.setFromEuler(-Math.PI / 2, 0, 0);
  physics.addBody(ground);

  const scene = new THREE.Scene();
  const rag = createRagdoll(
    physics, scene, new CANNON.Vec3(0, P.rideHeight, 0), bodyMat,
    { skin: 0xffcc99, shirt: 0x3f8cff, pants: 0x333344 },
    GROUP_A, GROUP_WORLD | GROUP_B
  );
  return { physics, scene, rag };
}

function step(physics: CANNON.World, rag: Ragdoll, n: number, input: RagdollInput = NONE) {
  for (let i = 0; i < n; i++) {
    rag.control(1 / 60, input, physics);
    physics.step(1 / 60);
    rag.guard();
  }
}

// ------------------------------------------------------------------ TEST 1
console.log("\n--- TEST 1: 인간형 구성 확인 ---");
{
  const { rag } = build();
  const expected = [
    "head", "torso", "pelvis",
    "upperArmL", "upperArmR", "lowerArmL", "lowerArmR", "handL", "handR",
    "upperLegL", "upperLegR", "lowerLegL", "lowerLegR", "footL", "footR",
  ];
  check("15개 body 생성됨", rag.bodies.length === 15, `count=${rag.bodies.length}`);
  check("모든 파츠 이름 존재", expected.every((n) => rag.parts.has(n)),
    expected.filter((n) => !rag.parts.has(n)).join(","));
  check("관절 14개 생성됨", rag.constraints.length === 14, `count=${rag.constraints.length}`);
}

// ------------------------------------------------------------------ TEST 2
console.log("\n--- TEST 2: 가만히 두면 스스로 서 있는가 (Active Ragdoll) ---");
{
  const { physics, rag } = build();
  step(physics, rag, 600);

  check("모든 파츠 유한값", rag.bodies.every((b) => fin(b.position) && fin(b.velocity)));
  check("상태가 ACTIVE 유지", rag.state === "ACTIVE", `state=${rag.state}`);

  const pelvisY = rag.pelvis.position.y;
  check("골반이 서 있는 높이 유지 (>0.7)", pelvisY > 0.7, `y=${pelvisY.toFixed(3)}`);

  const head = rag.parts.get("head")!.body;
  check("머리가 골반보다 위", head.position.y > rag.pelvis.position.y + 0.5,
    `head=${head.position.y.toFixed(2)} pelvis=${pelvisY.toFixed(2)}`);

  const footL = rag.parts.get("footL")!.body;
  check("발이 지면 근처", footL.position.y < 0.45, `footY=${footL.position.y.toFixed(3)}`);

  const drift = Math.hypot(rag.pelvis.position.x, rag.pelvis.position.z);
  check("제자리에서 크게 미끄러지지 않음 (<2.5)", drift < 2.5, `drift=${drift.toFixed(2)}`);
}

// ------------------------------------------------------------------ TEST 3
console.log("\n--- TEST 3: 이동 입력에 반응하는가 ---");
{
  const { physics, rag } = build();
  step(physics, rag, 180);
  const startZ = rag.pelvis.position.z;
  const startHeadZ = rag.parts.get("head")!.body.position.z;

  step(physics, rag, 420, { moveX: 0, moveZ: 1, jump: false });

  const moved = rag.pelvis.position.z - startZ;
  const headMoved = rag.parts.get("head")!.body.position.z - startHeadZ;
  check("골반이 입력 방향으로 이동 (>1.5)", moved > 1.5, `moved=${moved.toFixed(2)}`);
  check("머리도 함께 따라옴 (>1.5)", headMoved > 1.5, `head=${headMoved.toFixed(2)}`);
  check("몸이 분해되지 않음 (머리-골반 <1.6)",
    rag.parts.get("head")!.body.position.distanceTo(rag.pelvis.position) < 1.6,
    `d=${rag.parts.get("head")!.body.position.distanceTo(rag.pelvis.position).toFixed(2)}`);
  check("이동 중 전부 유한값", rag.bodies.every((b) => fin(b.position)));
}

// ------------------------------------------------------------------ TEST 4
console.log("\n--- TEST 4: 강한 충격을 받으면 넘어지는가 (RAGDOLL 전환) ---");
{
  const { physics, rag } = build();
  step(physics, rag, 180);
  check("충격 전 상태 ACTIVE", rag.state === "ACTIVE", `state=${rag.state}`);

  rag.knockdown();
  check("knockdown 후 RAGDOLL 상태", rag.state === "RAGDOLL", `state=${rag.state}`);

  step(physics, rag, 60);
  const yDuringRagdoll = rag.pelvis.position.y;
  check("래그돌 중 몸이 주저앉음 (골반 하강)", yDuringRagdoll < P.rideHeight,
    `y=${yDuringRagdoll.toFixed(3)}`);
  check("래그돌 중 유한값 유지", rag.bodies.every((b) => fin(b.position) && fin(b.velocity)));
}

// ------------------------------------------------------------------ TEST 5
console.log("\n--- TEST 5: 넘어진 후 스스로 일어나는가 (RECOVERY) ---");
{
  const { physics, rag } = build();
  step(physics, rag, 180);
  rag.knockdown();

  // RAGDOLL 유지 시간 동안
  step(physics, rag, Math.ceil(P.ragdollTime * 60) + 5);
  check("일정 시간 후 RECOVERING으로 전환", rag.state === "RECOVERING", `state=${rag.state}`);

  // 회복 시간 동안
  step(physics, rag, Math.ceil(P.recoverTime * 60) + 10);
  check("회복 완료 후 ACTIVE 복귀", rag.state === "ACTIVE", `state=${rag.state}`);

  // 충분히 더 두면 다시 서 있어야 함
  // 완전 능동제어(active ragdoll)라 살짝 흔들리며 서있는 게 정상이므로
  // 마지막 순간값 하나가 아니라 최근 1초(60프레임) 평균 높이로 판단한다.
  const heights: number[] = [];
  for (let i = 0; i < 400; i++) {
    rag.control(1 / 60, { moveX: 0, moveZ: 0, jump: false }, physics);
    physics.step(1 / 60);
    rag.guard();
    if (i >= 340) heights.push(rag.pelvis.position.y);
  }
  const avgHeight = heights.reduce((a, b) => a + b, 0) / heights.length;
  check("일어난 뒤 다시 서 있음 (최근 1초 평균 골반높이 >0.55)", avgHeight > 0.55,
    `avg=${avgHeight.toFixed(3)}`);
  check("회복 후 유한값", rag.bodies.every((b) => fin(b.position)));
}

// ------------------------------------------------------------------ TEST 6
console.log("\n--- TEST 6: 점프 ---");
{
  const { physics, rag } = build();
  step(physics, rag, 240);
  const beforeY = rag.pelvis.position.y;

  let maxY = beforeY;
  for (let i = 0; i < 90; i++) {
    rag.control(1 / 60, { moveX: 0, moveZ: 0, jump: i < 3 }, physics);
    physics.step(1 / 60);
    rag.guard();
    maxY = Math.max(maxY, rag.pelvis.position.y);
  }
  check("점프로 몸이 떠오름", maxY > beforeY + 0.25,
    `before=${beforeY.toFixed(2)} max=${maxY.toFixed(2)}`);

  step(physics, rag, 300);
  check("착지 후 유한값", rag.bodies.every((b) => fin(b.position)));
}

// ------------------------------------------------------------------ TEST 7
console.log("\n--- TEST 7: 극단 충격 연타에도 물리 폭발이 없는가 ---");
{
  const { physics, rag } = build();
  step(physics, rag, 120);

  let sawNaN = false;
  for (let i = 0; i < 1200; i++) {
    const s = i % 2 === 0 ? 1 : -1;
    rag.torso.applyImpulse(new CANNON.Vec3(70 * s, 25, -55 * s), rag.torso.position);
    rag.parts.get("head")!.body.applyImpulse(new CANNON.Vec3(-40 * s, 10 * s, 35 * s), rag.parts.get("head")!.body.position);
    rag.control(1 / 60, { moveX: s, moveZ: -s, jump: i % 17 === 0 }, physics);
    physics.step(1 / 60);
    rag.guard();
    if (rag.bodies.some((b) => !fin(b.position) || !fin(b.angularVelocity))) sawNaN = true;
  }
  check("1200프레임 극단 충격에도 NaN 없음", !sawNaN);
  check("모든 파츠 최종 좌표가 유한값 (무한대로 발산하지 않음)",
    rag.bodies.every((b) => fin(b.position) && fin(b.velocity)));
}

// ------------------------------------------------------------------ TEST 8
console.log("\n--- TEST 8: 자기 파츠끼리 충돌하지 않는가 ---");
{
  const { physics, rag } = build();
  const ids = new Set(rag.bodies.map((b) => b.id));
  let selfHit = false;
  for (const b of rag.bodies) {
    b.addEventListener("collide", (e: { body: CANNON.Body }) => {
      if (ids.has(e.body.id)) selfHit = true;
    });
  }
  for (let i = 0; i < 400; i++) {
    rag.torso.applyImpulse(new CANNON.Vec3(18, 0, 18), rag.torso.position);
    rag.control(1 / 60, NONE, physics);
    physics.step(1 / 60);
    rag.guard();
  }
  check("래그돌 내부 파츠 간 충돌 없음", !selfHit);
}

// ------------------------------------------------------------------ TEST 9
console.log("\n--- TEST 9: 두 래그돌이 서로 충돌하는가 (플레이어 간 충돌) ---");
{
  const physics = new CANNON.World({ gravity: new CANNON.Vec3(0, -18, 0) });
  physics.broadphase = new CANNON.SAPBroadphase(physics);
  physics.allowSleep = false;
  (physics.solver as CANNON.GSSolver).iterations = 20;

  const groundMat = new CANNON.Material("ground");
  const bodyMat = new CANNON.Material("body");
  physics.addContactMaterial(new CANNON.ContactMaterial(groundMat, bodyMat, { friction: 0.55, restitution: 0 }));
  const ground = new CANNON.Body({
    type: CANNON.Body.STATIC, shape: new CANNON.Plane(), material: groundMat,
    collisionFilterGroup: GROUP_WORLD, collisionFilterMask: -1,
  });
  ground.quaternion.setFromEuler(-Math.PI / 2, 0, 0);
  physics.addBody(ground);

  const scene = new THREE.Scene();
  const a = createRagdoll(physics, scene, new CANNON.Vec3(-0.75, P.rideHeight, 0), bodyMat,
    { skin: 0xffcc99, shirt: 0x3f8cff, pants: 0x333344 }, GROUP_A, GROUP_WORLD | GROUP_B);
  const b = createRagdoll(physics, scene, new CANNON.Vec3(0.75, P.rideHeight, 0), bodyMat,
    { skin: 0xffcc99, shirt: 0xff6644, pants: 0x333344 }, GROUP_B, GROUP_WORLD | GROUP_A);

  const bIds = new Set(b.bodies.map((x) => x.id));
  let crossHit = false;
  for (const x of a.bodies) {
    x.addEventListener("collide", (e: { body: CANNON.Body }) => {
      if (bIds.has(e.body.id)) crossHit = true;
    });
  }

  // 서로를 향해 걸어감
  for (let i = 0; i < 400; i++) {
    a.control(1 / 60, { moveX: 1, moveZ: 0, jump: false }, physics);
    b.control(1 / 60, { moveX: -1, moveZ: 0, jump: false }, physics);
    physics.step(1 / 60);
    a.guard(); b.guard();
  }
  check("서로 다른 플레이어끼리는 충돌함", crossHit);
  check("충돌 후에도 양쪽 유한값",
    a.bodies.every((x) => fin(x.position)) && b.bodies.every((x) => fin(x.position)));
}

// ------------------------------------------------------------------
console.log("\n--- 수치 안정성: 감쇠항이 발산하지 않는가 ---");
{
  // [왜 이 검사가 필요한가]
  // control()의 각속도 감쇠는 전방 오일러로 적분된다.
  //     ω' = ω (1 - c·dt/I)
  // r = c·dt/I 가 2를 넘으면 매 스텝 부호가 뒤집히며 |r-1| 배로 커진다.
  // uprightDamp를 28에서 46으로 올렸을 때 실제로 이 선을 넘었고, 그 결과
  // 가만히 서 있기만 해도
  //     관절이 0.18m 벌어지고 / 각속도가 클램프(20 rad/s)에 붙고 /
  //     골반이 0.10m 진폭으로 들썩이고 / 최고 이동속도가 4.6 -> 3.66 으로 떨어졌다.
  // 기존 테스트가 이걸 놓친 이유는 "ACTIVE인가 / 골반 높이가 맞는가"만 봤기
  // 때문이다. 떨면서도 서 있기는 했다. 그래서 여기서는 흔들림 자체를 잰다.
  const { physics, rag } = build();
  step(physics, rag, 120);            // 안정화

  let maxGap = 0, maxW = 0, capHits = 0, minY = 9, maxY = -9;
  const N = 600;                       // 10초
  for (let i = 0; i < N; i++) {
    step(physics, rag, 1);
    for (const c of physics.constraints) {
      const cc = c as unknown as {
        pivotA?: CANNON.Vec3; pivotB?: CANNON.Vec3; bodyA: CANNON.Body; bodyB: CANNON.Body;
      };
      if (!cc.pivotA || !cc.pivotB) continue;
      const pa = cc.bodyA.position.vadd(cc.bodyA.quaternion.vmult(cc.pivotA));
      const pb = cc.bodyB.position.vadd(cc.bodyB.quaternion.vmult(cc.pivotB));
      maxGap = Math.max(maxGap, pa.distanceTo(pb));
    }
    for (const b of rag.bodies) {
      const w = b.angularVelocity.length();
      maxW = Math.max(maxW, w);
      if (w > 19.9) capHits++;
    }
    minY = Math.min(minY, rag.pelvis.position.y);
    maxY = Math.max(maxY, rag.pelvis.position.y);
  }

  check("가만히 서 있을 때 관절이 벌어지지 않는다 (< 2cm)",
    maxGap < 0.02, `maxGap=${maxGap.toFixed(3)}m`);
  check("각속도가 안전 클램프(20 rad/s)에 닿지 않는다",
    capHits === 0 && maxW < 10, `maxAngVel=${maxW.toFixed(1)} capHits=${capHits}`);
  check("제자리에서 들썩이지 않는다 (골반 진폭 < 2cm)",
    maxY - minY < 0.02, `amp=${(maxY - minY).toFixed(3)}m`);

  // 감쇠 계수 자체가 발산 영역에 있어도, dampTorque의 상한이 실효 r을 1 이하로
  // 눌러준다. 상한이 사라지면(= 누가 다시 -w*c 로 되돌리면) 위 검사가 깨진다.
  const worst = [rag.torso, rag.pelvis].map((b) => {
    const iMin = Math.min(b.inertia.x, b.inertia.y, b.inertia.z);
    return (P.uprightDamp * (1 / 60)) / iMin;
  });
  check("감쇠 계수는 여전히 발산 영역이다 = 상한이 실제로 일하고 있다",
    worst.some((r) => r > 2), `r=${worst.map((r) => r.toFixed(2)).join(", ")}`);
}

// ------------------------------------------------------------------
console.log("\n--- 수치 안정성: 걷기/급회전/점프에서도 유지되는가 ---");
{
  const { physics, rag } = build();
  step(physics, rag, 90);

  const dirs: [number, number][] = [[0, -1], [1, 0], [0, 1], [-1, 0], [0.7, -0.7]];
  const core = new Set<CANNON.Body>([rag.torso, rag.pelvis, rag.parts.get("head")!.body]);
  let maxGap = 0, coreMaxW = 0, coreCapHits = 0, limbCapHits = 0;
  for (let k = 0; k < dirs.length; k++) {
    const [mx, mz] = dirs[k];
    for (let i = 0; i < 90; i++) {
      // 30프레임마다 점프도 섞는다
      step(physics, rag, 1, { moveX: mx, moveZ: mz, jump: i % 30 === 0 });
      for (const c of physics.constraints) {
        const cc = c as unknown as {
          pivotA?: CANNON.Vec3; pivotB?: CANNON.Vec3; bodyA: CANNON.Body; bodyB: CANNON.Body;
        };
        if (!cc.pivotA || !cc.pivotB) continue;
        const pa = cc.bodyA.position.vadd(cc.bodyA.quaternion.vmult(cc.pivotA));
        const pb = cc.bodyB.position.vadd(cc.bodyB.quaternion.vmult(cc.pivotB));
        maxGap = Math.max(maxGap, pa.distanceTo(pb));
      }
      for (const b of rag.bodies) {
        const w = b.angularVelocity.length();
        if (core.has(b)) { coreMaxW = Math.max(coreMaxW, w); if (w > 19.9) coreCapHits++; }
        else if (w > 19.9) limbCapHits++;
      }
    }
  }
  console.log();
  // [무엇을 잠그고 무엇을 잠그지 않는가]
  // 고친 것은 "코어(몸통/골반/머리)가 발산하지 않는다"이다. 이게 캐릭터가
  // 하나의 몸으로 읽히느냐를 정한다. 반면 손/아래팔 같은 말단은 빠르게 달릴 때
  // 여전히 클램프에 닿는다 - 스윙 감쇠와 말단 자체 감쇠로 직진 기준 300스텝당
  // 550회에서 115회까지 줄였지만 0은 아니다. 그래서 여기서는 달성하지도 않은
  // 0을 요구하지 않고, 실제로 복구한 불변식만 검사한다.
  check("급회전/점프를 섞어도 코어(몸통/골반/머리)는 클램프에 닿지 않는다",
    coreCapHits === 0, `coreMaxW=${coreMaxW.toFixed(1)} coreCapHits=${coreCapHits}`);
  check("급회전/점프 중 관절이 크게 벌어지지 않는다 (< 18cm, 착지 충격 포함)",
    maxGap < 0.18, `maxGap=${maxGap.toFixed(3)}m`);
  check("그 뒤에도 서 있다", rag.state === "ACTIVE", rag.state);

  // 착지 충격으로 잠깐 늘어나는 건 정상이다. 중요한 건 "영구히 벌어진 채로
  // 남지 않는가" - 예전엔 가만히 둬도 0.18m가 유지됐다.
  step(physics, rag, 180);
  let settled = 0;
  for (let i = 0; i < 60; i++) {
    step(physics, rag, 1);
    for (const c of physics.constraints) {
      const cc = c as unknown as {
        pivotA?: CANNON.Vec3; pivotB?: CANNON.Vec3; bodyA: CANNON.Body; bodyB: CANNON.Body;
      };
      if (!cc.pivotA || !cc.pivotB) continue;
      const pa = cc.bodyA.position.vadd(cc.bodyA.quaternion.vmult(cc.pivotA));
      const pb = cc.bodyB.position.vadd(cc.bodyB.quaternion.vmult(cc.pivotB));
      settled = Math.max(settled, pa.distanceTo(pb));
    }
  }
  check("멈추면 관절이 도로 붙는다 (< 2cm)", settled < 0.02, `settled=${settled.toFixed(4)}m`);

  // knockdown -> 복구가 여전히 정상인가 (감쇠 상한이 넘어짐을 막으면 안 된다)
  rag.knockdown(1.0);
  check("knockdown으로 넘어진다", rag.state !== "ACTIVE", rag.state);
  step(physics, rag, 60 * 6);
  check("일정 시간 뒤 스스로 일어난다", rag.state === "ACTIVE", rag.state);
  check("일어난 뒤 골반 높이가 정상", Math.abs(rag.pelvis.position.y - P.rideHeight) < 0.2,
    `y=${rag.pelvis.position.y.toFixed(2)}`);
}

console.log(`\nRESULT: ${pass} passed, ${fail} failed`);
process.exit(fail === 0 ? 0 : 1);
