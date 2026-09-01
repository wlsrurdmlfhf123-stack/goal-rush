import * as THREE from "three";
import * as CANNON from "cannon-es";
import { createRagdoll, GROUP_WORLD, P, type Ragdoll, type RagdollInput } from "../client/src/ragdoll";
import { B } from "../client/src/ball";
import { BOT, createBots, isBotRole, roleForBot, type BotRole } from "../client/src/bot";

/**
 * 방해꾼 AI — 특히 **공 도둑(thief)**.
 *
 * [무엇을 잠그는가] 도둑의 재미는 "뺏겼다 → 둘이 쫓아간다 → 되찾았다"라는
 * 한 바퀴가 실제로 도는 것이다. 그 바퀴가 끊기는 지점이 셋이라 전부 검사한다.
 *
 *   1. 안 뺏긴다        — 사거리 안인데 소유가 안 넘어가면 아무 일도 안 일어난다
 *   2. 못 되찾는다      — 자석처럼 붙들고 있으면 킥도 몸싸움도 의미가 없다.
 *                         **넘어뜨리면 놓는다 / 부딪히면 놓는다 / 멀어지면 놓친다**
 *   3. 영영 안 놓는다   — 아무도 못 잡으면 라운드가 그냥 끝난다 (fleeTime)
 *
 * 그리고 기존 역할(chaser / blocker / bruiser)이 안 바뀌었는지도 같이 본다.
 *
 * 물리 설정은 test/ball-test.ts, test/gimmick-test.ts 와 같은 rig 다.
 */

let pass = 0, fail = 0;
function check(name: string, cond: boolean, extra = "") {
  if (cond) { pass++; console.log(`  PASS  ${name}`); }
  else { fail++; console.log(`  FAIL  ${name} ${extra}`); }
}

const GROUP_A = 2;
const GROUP_B = 4;
const DT = 1 / 60;

interface Rig {
  physics: CANNON.World;
  ball: CANNON.Body;
  bots: ReturnType<typeof createBots>;
  bot: Ragdoll;
  humans: Ragdoll[];
  addHuman(x: number, z: number): Ragdoll;
  /**
   * 봇 한 스텝 + 사람들 입력 + 물리. 봇이 낸 사건을 모아 돌려준다.
   *
   * humanInput 에 함수를 주면 **사람마다 다른 입력**을 준다 (한 명은 앞을
   * 막고 한 명은 뒤에서 쫓는 상황을 재현하려면 필요하다).
   */
  step(
    n?: number,
    humanInput?: RagdollInput | ((h: Ragdoll, i: number) => RagdollInput),
  ): ReturnType<ReturnType<typeof createBots>["update"]>[];
}

/** from 에서 to 쪽으로 걸어가는 이동 입력 */
function toward(from: Ragdoll, to: CANNON.Vec3): RagdollInput {
  const dx = to.x - from.pelvis.position.x;
  const dz = to.z - from.pelvis.position.z;
  const d = Math.hypot(dx, dz) || 1;
  return { moveX: dx / d, moveZ: dz / d, jump: false };
}

function build(role: BotRole, botAt: [number, number], ballAt: [number, number]): Rig {
  const physics = new CANNON.World({ gravity: new CANNON.Vec3(0, -18, 0) });
  physics.broadphase = new CANNON.NaiveBroadphase();
  physics.allowSleep = false;
  (physics.solver as CANNON.GSSolver).iterations = 22;

  const groundMat = new CANNON.Material("ground");
  const bodyMat = new CANNON.Material("player");
  const ballMat = new CANNON.Material("ball");
  physics.addContactMaterial(new CANNON.ContactMaterial(groundMat, bodyMat, { friction: 0.55, restitution: 0 }));
  physics.addContactMaterial(new CANNON.ContactMaterial(groundMat, ballMat, { friction: 0.32, restitution: 0.45 }));
  physics.addContactMaterial(new CANNON.ContactMaterial(bodyMat, ballMat, { friction: 0.28, restitution: 0.35 }));

  const ground = new CANNON.Body({
    type: CANNON.Body.STATIC, shape: new CANNON.Plane(), material: groundMat,
    collisionFilterGroup: GROUP_WORLD, collisionFilterMask: -1,
  });
  ground.quaternion.setFromEuler(-Math.PI / 2, 0, 0);
  physics.addBody(ground);

  const scene = new THREE.Scene();
  const mk = (x: number, z: number, group: number) => createRagdoll(
    physics, scene, new CANNON.Vec3(x, P.rideHeight, z), bodyMat,
    { skin: 0xffcc99, shirt: 0x3f8cff, pants: 0x333344 },
    group, 0xffff & ~group,
  );

  const bot = mk(botAt[0], botAt[1], GROUP_A);
  const humans: Ragdoll[] = [];

  const ball = new CANNON.Body({
    mass: B.mass, shape: new CANNON.Sphere(B.radius),
    position: new CANNON.Vec3(ballAt[0], B.radius + 0.01, ballAt[1]), material: ballMat,
  });
  ball.linearDamping = 0.012;
  ball.angularDamping = 0.22;
  physics.addBody(ball);

  const bots = createBots(7);

  const addHuman = (x: number, z: number) => {
    const h = mk(x, z, GROUP_B);
    humans.push(h);
    return h;
  };

  // main.ts fixedUpdate 와 같은 순서다: 봇 입력 -> control -> physics.step
  function step(
    n = 1,
    humanInput: RagdollInput | ((h: Ragdoll, i: number) => RagdollInput) = { moveX: 0, moveZ: 0, jump: false },
  ) {
    const out: ReturnType<typeof bots.update>[] = [];
    for (let i = 0; i < n; i++) {
      const r = bots.update(bot, ball, DT, {
        carriers: [], humans, goalZ: -100, role,
      });
      out.push(r);
      bot.control(DT, { moveX: r.input.moveX, moveZ: r.input.moveZ, jump: false }, physics);
      humans.forEach((h, k) => h.control(DT, typeof humanInput === "function" ? humanInput(h, k) : humanInput, physics));
      physics.step(DT);
      bot.guard();
      for (const h of humans) h.guard();
    }
    return out;
  }

  return { physics, ball, bots, bot, humans, addHuman, step };
}

// ================================================================
console.log("\n--- TEST 1: 역할 이름 ---");
{
  check("thief 가 유효한 역할이다", isBotRole("thief"));
  check("오타는 걸러진다", !isBotRole("theif"));
  check("기존 역할이 그대로다",
    isBotRole("chaser") && isBotRole("blocker") && isBotRole("bruiser"));
  // 맵이 botRoles 를 안 주면 예전 규칙(id 로 정하기)이 그대로 돈다
  check("기본 규칙은 안 바뀌었다 (-1 -> chaser)", roleForBot(-1) === "chaser");
  check("기본 규칙은 안 바뀌었다 (-3 -> blocker)", roleForBot(-3) === "blocker");
  check("기본 규칙에 thief 는 안 들어간다 (맵이 명시해야 한다)",
    [-1, -2, -3, -4, -5, -6].every((id) => roleForBot(id) !== "thief"));
}

console.log("\n--- TEST 2: 도둑이 공을 빼앗는다 ---");
{
  // 등장 유예(spawnGrace 1.1초)가 지나기 전에는 안 뺏는다 — 나타나자마자
  // 공이 사라지면 반응할 기회조차 없다.
  const r = build("thief", [0, 0], [0, -1.0]);
  r.step(30);   // 0.5초
  check("등장 유예 동안에는 안 뺏는다", !r.bots.owningBall(r.bot));
  r.step(90);   // 1.5초까지
  check("유예가 지나면 빼앗는다", r.bots.owningBall(r.bot));
}
{
  // 멀리 있으면 못 뺏는다 (거리 판정이 실제로 걸린다)
  const r = build("thief", [0, 0], [0, -8]);
  r.step(90);
  check("멀리 있는 공은 못 뺏는다", !r.bots.owningBall(r.bot));
}

console.log("\n--- TEST 3: 뺏은 공을 끌고 도망간다 ---");
{
  const r = build("thief", [0, 0], [0, -1.0]);
  r.step(120);
  check("공을 가지고 있다", r.bots.owningBall(r.bot));
  const z0 = r.ball.position.z;
  r.step(90);
  // 골이 -100(=-Z)이므로 도둑은 +Z 로 도망간다 = 공도 같이 +Z 로 간다
  check("공이 골 반대쪽으로 끌려간다", r.ball.position.z > z0 + 1.5,
    `${z0.toFixed(2)} -> ${r.ball.position.z.toFixed(2)}`);
  const gap = Math.hypot(
    r.ball.position.x - r.bot.pelvis.position.x,
    r.ball.position.z - r.bot.pelvis.position.z,
  );
  check("공이 도둑 발 앞에 붙어 있다", gap < BOT.thiefKeepMax, `gap=${gap.toFixed(2)}`);
}

console.log("\n--- TEST 4: 되찾는 방법 세 가지 ---");
{
  // (1) 넘어뜨리면 놓는다 — F 발차기 / 장애물 / 범퍼가 전부 이 길로 이어진다
  const r = build("thief", [0, 0], [0, -1.0]);
  r.step(120);
  check("먼저 뺏겨 있다", r.bots.owningBall(r.bot));
  r.bot.knockdown(1.0);
  const evs = r.step(2);
  check("넘어뜨리면 놓는다", !r.bots.owningBall(r.bot));
  check("놓쳤다는 사건이 나온다", evs.some((e) => e.thief?.kind === "lost"));
}
{
  // (2) 공을 사거리 밖으로 차 보내면 놓친다 (자석이 아니라는 증거)
  //
  // [회전을 같이 줘야 한다 — 이 테스트를 처음 틀리게 썼던 자리]
  // 선속도만 주면 공이 **미끄러지는** 상태라 첫 스텝에 바닥 마찰이 13 -> 8 m/s로
  // 깎아 버린다(구르는 속도 5/7 로 수렴). 그러면 도둑이 아니라 마찰을 재는
  // 셈이 된다. 실제 킥은 공을 굴리므로 ω = v/R 을 같이 준다.
  for (const v of [9, 13]) {
    const r = build("thief", [0, 0], [0, -1.0]);
    r.step(120);
    if (v === 9) check("먼저 뺏겨 있다", r.bots.owningBall(r.bot));
    r.ball.velocity.set(v, 0, 0);
    r.ball.angularVelocity.set(0, 0, -v / B.radius);   // +X 로 구르는 회전
    r.ball.wakeUp();
    let lost = false;
    for (let i = 0; i < 90 && !lost; i++) { r.step(); lost = !r.bots.owningBall(r.bot); }
    check(`공을 ${v} m/s 로 차 보내면 놓친다 (자석이 아니다)`, lost);
  }
}
{
  // (3) 시간이 다 되면 스스로 놓는다 — 아무도 못 잡아도 라운드가 안 끝난다
  const r = build("thief", [0, 0], [0, -1.0]);
  r.step(120);
  check("먼저 뺏겨 있다", r.bots.owningBall(r.bot));
  r.step(Math.round((BOT.thiefFleeTime + 0.5) * 60));
  check("도주 시간이 끝나면 스스로 놓는다", !r.bots.owningBall(r.bot));
}
{
  // 놓친 직후에는 바로 다시 못 뺏는다 (놓자마자 도로 가져가면 되찾은 게 아니다)
  const r = build("thief", [0, 0], [0, -1.0]);
  r.step(120);
  r.bot.knockdown(0.2);
  r.step(2);
  check("일단 놓쳤다", !r.bots.owningBall(r.bot));
  r.step(60);   // 1초 - regrab(3.2초) 보다 짧다
  check("곧바로 다시 뺏지는 않는다", !r.bots.owningBall(r.bot));
}

console.log("\n--- TEST 5: 혼자서는 못 잡고, 둘이면 잡는다 ---");
{
  /**
   * 사람들이 도둑을 향해 달려가 되찾을 수 있는가.
   *
   * @param spots 사람들을 세울 z. 도둑은 +Z 로 도망가므로, 뒤(-Z)에 두면
   *              추격이고 앞(+Z)에 두면 길목 막기다.
   * @returns 되찾기까지 걸린 초 (못 되찾으면 null)
   */
  function recover(spots: number[], limitSec = 10): number | null {
    const r = build("thief", [0, 0], [0, -1.0]);
    for (const z of spots) r.addHuman(0, z);
    r.step(120);                        // 도둑이 공을 가져갈 때까지
    if (!r.bots.owningBall(r.bot)) return null;
    for (let i = 0; i < 60 * limitSec; i++) {
      // 사람은 언제나 도둑 쪽으로 달린다 (사람이 할 수 있는 최선)
      const evs = r.step(1, (h) => toward(h, r.bot.pelvis.position));
      for (const e of evs) if (e.thief?.kind === "lost" && e.thief.by) return i / 60;
    }
    return null;
  }

  // [방향에 주의] 도둑은 골(-Z) 반대쪽인 **+Z** 로 도망간다.
  // 그러므로 "뒤에서 쫓는다" = -Z 쪽에 선다, "앞을 막는다" = +Z 쪽에 선다.
  //
  // 뒤에서 쫓기만 하면 못 잡는다 — 도둑과 사람의 최고 속도가 같기 때문이다.
  // (봇을 느리게 만들어 "잡히게" 하지 않았다는 뜻이기도 하다)
  const solo = recover([-8]);
  console.log(`       뒤에서 혼자 쫓기: ${solo === null ? "못 잡음" : solo.toFixed(1) + "초"}`);
  check("뒤에서 혼자 쫓아서는 10초 안에 못 잡는다", solo === null,
    solo === null ? "" : `${solo.toFixed(1)}초 만에 잡혔다`);

  // 한 명이 도주로(+Z)를 막고 있으면 도둑이 그쪽으로 뛰어들게 된다.
  const duo = recover([-8, 22]);
  console.log(`       앞을 막고 뒤에서 몰기: ${duo === null ? "못 잡음" : duo.toFixed(1) + "초"}`);
  check("앞을 막고 뒤에서 몰면 잡는다", duo !== null, "10초 안에 못 잡았다");
}
{
  // 누가 뺏었는지 사건에 담겨 온다 (main.ts 가 연출을 그 사람 기준으로 낸다)
  const r = build("thief", [0, 0], [0, -1.0]);
  const back = r.addHuman(0, -8);
  const front = r.addHuman(0, 22);
  r.step(120);
  check("먼저 뺏겨 있다", r.bots.owningBall(r.bot));
  let taker: Ragdoll | null | undefined;
  for (let i = 0; i < 60 * 10 && taker === undefined; i++) {
    const evs = r.step(1, (h) => toward(h, r.bot.pelvis.position));
    for (const e of evs) if (e.thief?.kind === "lost") taker = e.thief.by;
  }
  check("누가 뺏었는지 알려준다", taker === front || taker === back, `taker=${taker === null ? "null" : "?"}`);
}
{
  // 옆에 가만히 서 있는 것만으로는 못 뺏는다 (접근 속도가 필요하다)
  const r = build("thief", [0, 0], [0, -1.0]);
  r.addHuman(0.9, 0);
  r.step(120);
  check("먼저 뺏겨 있다", r.bots.owningBall(r.bot));
  let took = false;
  for (let i = 0; i < 60 * 2; i++) {
    const evs = r.step(1);
    for (const e of evs) if (e.thief?.kind === "lost" && e.thief.by) took = true;
  }
  check("가만히 붙어 있는 것만으로는 안 뺏긴다", !took);
}

console.log("\n--- TEST 6: 도둑은 공을 걷어차지 않는다 ---");
{
  // chaser 는 공을 차서 흩뜨리고, thief 는 가져간다. 도둑이 차 버리면
  // 자기 공을 잃는 셈이라 행동이 앞뒤가 안 맞는다.
  const chase = build("chaser", [0, 0], [0, -1.0]);
  chase.step(120);
  const chaseSpeed = Math.hypot(chase.ball.velocity.x, chase.ball.velocity.z);
  const thief = build("thief", [0, 0], [0, -1.0]);
  thief.step(120);
  console.log(`       chaser 가 만든 공 속도 ${chaseSpeed.toFixed(2)} m/s`);
  check("chaser 는 여전히 공을 걷어찬다", chaseSpeed > 1.0, `${chaseSpeed.toFixed(2)}`);
  check("thief 는 공을 가지고 있다", thief.bots.owningBall(thief.bot));
}

console.log("\n--- TEST 7: 기존 역할이 안 바뀌었다 ---");
{
  // blocker: 공과 골 사이에 자리를 잡는다 (공보다 골 쪽으로 앞선다)
  const r = build("blocker", [0, 0], [0, -4]);
  r.step(60 * 4);
  check("blocker 가 공보다 골 쪽에 선다", r.bot.pelvis.position.z < r.ball.position.z,
    `bot=${r.bot.pelvis.position.z.toFixed(2)} ball=${r.ball.position.z.toFixed(2)}`);
  check("blocker 는 공을 안 가져간다", !r.bots.owningBall(r.bot));
}
{
  // bruiser: 사람에게 달려간다 (공은 반대쪽에 둔다)
  const r = build("bruiser", [0, 0], [0, 12]);
  const h = r.addHuman(0, -6);
  const d0 = Math.abs(r.bot.pelvis.position.z - h.pelvis.position.z);
  r.step(60 * 3);
  const d1 = Math.abs(r.bot.pelvis.position.z - h.pelvis.position.z);
  check("bruiser 는 공이 아니라 사람에게 간다", d1 < d0 - 1.5, `${d0.toFixed(2)} -> ${d1.toFixed(2)}`);
}
{
  // 넘어져 있으면 아무것도 안 한다 (사람과 같은 규칙)
  const r = build("thief", [0, 0], [0, -1.0]);
  r.bot.knockdown(2.0);
  const evs = r.step(60);
  check("넘어져 있는 동안 입력이 0이다", evs.every((e) => e.input.moveX === 0 && e.input.moveZ === 0));
  check("넘어져 있으면 못 뺏는다", !r.bots.owningBall(r.bot));
}

console.log("\n--- TEST 8: 물리가 안 터진다 ---");
{
  const r = build("thief", [0, 0], [0, -1.0]);
  r.addHuman(2, 3);
  r.addHuman(-2, 3);
  for (let i = 0; i < 60 * 20; i++) r.step(1, { moveX: 0, moveZ: i % 120 < 60 ? -1 : 1, jump: false });
  const fin = (v: CANNON.Vec3) => Number.isFinite(v.x) && Number.isFinite(v.y) && Number.isFinite(v.z);
  check("20초를 돌려도 좌표가 유한값", fin(r.bot.pelvis.position) && fin(r.ball.position));
  check("래그돌이 안 쪼개진다",
    r.bot.bodies.every((b) => b.position.distanceTo(r.bot.pelvis.position) < 2.5));
  check("공이 미친 속도가 되지 않는다",
    Math.hypot(r.ball.velocity.x, r.ball.velocity.z) < 30,
    `${Math.hypot(r.ball.velocity.x, r.ball.velocity.z).toFixed(1)} m/s`);
}

console.log(`\nRESULT: ${pass} passed, ${fail} failed`);
if (fail > 0) process.exit(1);
