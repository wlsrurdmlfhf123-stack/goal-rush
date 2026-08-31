import * as THREE from "three";
import * as CANNON from "cannon-es";
import { createRagdoll, GROUP_WORLD, P, type Ragdoll, type RagdollInput } from "../client/src/ragdoll";
import { B, createBallPlay } from "../client/src/ball";
import { SC, createScuffle, type ScuffleHit, type ReboundEvent, type HoldEvent } from "../client/src/scuffle";
import { createFlair } from "../client/src/flair";
import { groupFor, ragdollMask } from "../client/src/input-math";

/**
 * 3단계 — 몸싸움 (E 밀치기 / Q 잡기·끌기 / F 발차기).
 *
 * 이 테스트가 지키려는 것은 두 가지다.
 *
 *  1) 세 동작이 **실제로 물리에 영향을 준다** — 밀리고, 끌려오고, 날아간다.
 *     ragdoll.ts control()의 속도 서보가 충격량을 지워 버리기 때문에(HANDOFF 5절
 *     "전속력 몸통박치기: 밀린 거리 0.00m"), 이건 저절로 성립하지 않는다.
 *     그래서 "호출이 null이 아니다"가 아니라 **밀린 거리**를 잰다.
 *
 *  2) 기존 축구 조작이 하나도 죽지 않았다 — E/Q/F는 이미 공 줍기 / 스톱턴 /
 *     공 킥이 쓰던 키다. 앞에 사람이 없으면 예전 동작이 그대로 나가야 한다.
 *
 * [rig가 main.ts를 흉내내는 이유]
 * 우선순위 판정(사람이 먼저냐 공이 먼저냐)은 main.ts의 fixedUpdate 안에 있다.
 * ball-test.ts의 rig가 이미 같은 이유로 fixedUpdate의 호출 순서를 그대로 옮겨
 * 적고 있어서(그 파일 step() 주석), 여기서도 같은 방식을 따른다. 아래 step()
 * 은 main.ts의 분기와 **같은 순서·같은 조건**으로 적혀 있다. main.ts를 고치면
 * 여기도 같이 고쳐야 한다.
 */

let pass = 0, fail = 0;
function check(name: string, cond: boolean, extra = "") {
  if (cond) { pass++; console.log(`  PASS  ${name}`); }
  else { fail++; console.log(`  FAIL  ${name} ${extra}`); }
}
const fin = (v: CANNON.Vec3) => Number.isFinite(v.x) && Number.isFinite(v.y) && Number.isFinite(v.z);
const DT = 1 / 60;

/** 한 사람의 이번 스텝 입력 */
interface PIn {
  mx?: number; mz?: number;
  /** 조준 = 카메라 정면. 몸싸움 판정의 기준축이다 */
  aim?: [number, number];
  e?: boolean; q?: boolean; f?: boolean;
  /** F의 차징 세기 (0..1) */
  kp?: number;
  carrying?: boolean;
}

/**
 * 이번 스텝에 그 키가 무엇으로 소비되었는가.
 * 폴백이 살아 있는지 보려면 "무엇이 눌렸나"가 아니라 "무엇이 실행됐나"를 봐야 한다.
 */
type Tag =
  | "push" | "grabbed" | "released" | "kick"          // 몸싸움이 가져감
  | "ball-pickup" | "stopturn" | "ballkick" | "rush"  // 기존 축구 동작이 가져감
  | "none";

interface Rig {
  physics: CANNON.World;
  ball: CANNON.Body;
  play: ReturnType<typeof createBallPlay>;
  sc: ReturnType<typeof createScuffle>;
  A: Ragdoll; C: Ragdoll;
  rags: Ragdoll[];
  /** 이번 판에서 성립한 밀치기/발차기 전부 (방향 판정을 보려고 모아둔다) */
  hits: ScuffleHit[];
  /** 벽에 박아 되튕긴 순간들 */
  rebounds: ReboundEvent[];
  /** 잡고 있는 동안 일어난 일들 (풀림 / 후려치기 / 줄다리기) */
  holdEvents: HoldEvent[];
  step(a?: PIn, c?: PIn): { A: Tag; C: Tag };
}

function build(opts: {
  aAt?: [number, number]; cAt?: [number, number]; ballAt?: [number, number];
  /** z가 이 값인 자리에 벽을 세운다 (되튕김 검증용) */
  wallZ?: number;
} = {}): Rig {
  const aAt = opts.aAt ?? [0, 0];
  const cAt = opts.cAt ?? [0, 1.4];
  const ballAt = opts.ballAt ?? [40, 40];   // 기본은 "공이 멀리 있다"

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
  // 사람 둘. 그룹이 다르므로 서로 부딪힌다 (main.ts와 같은 규칙)
  const mk = (id: number, at: [number, number], shirt: number) => createRagdoll(
    physics, scene, new CANNON.Vec3(at[0], P.rideHeight, at[1]), bodyMat,
    { skin: 0xffcc99, shirt, pants: 0x333344 },
    groupFor(id), ragdollMask(groupFor(id)),
  );
  const A = mk(0, aAt, 0x3f8cff);
  const C = mk(1, cAt, 0xff5f5f);

  const ball = new CANNON.Body({
    mass: B.mass, shape: new CANNON.Sphere(B.radius),
    position: new CANNON.Vec3(ballAt[0], B.radius + 0.01, ballAt[1]),
    material: ballMat,
  });
  ball.angularDamping = 0.22;
  ball.linearDamping = 0.012;
  physics.addBody(ball);

  // 되튕김 검증용 벽. 없으면 안 만든다 (다른 판은 예전과 완전히 같은 조건이다)
  if (opts.wallZ !== undefined) {
    const wall = new CANNON.Body({
      type: CANNON.Body.STATIC,
      shape: new CANNON.Box(new CANNON.Vec3(12, 2.5, 0.4)),
      position: new CANNON.Vec3(0, 2.5, opts.wallZ),
      material: groundMat,
      collisionFilterGroup: GROUP_WORLD, collisionFilterMask: -1,
    });
    physics.addBody(wall);
  }

  const play = createBallPlay();
  const sc = createScuffle();
  // main.ts 와 같이 몸짓도 돌린다 - 몸짓이 몸싸움을 흔들지 않는지까지 여기서 걸린다
  const fl = createFlair();
  const rags = [A, C];
  const hits: ScuffleHit[] = [];
  const rebounds: ReboundEvent[] = [];
  const holdEvents: HoldEvent[] = [];

  /**
   * main.ts fixedUpdate의 E/Q/F 분기를 그대로 옮긴 것.
   *
   * 순서가 중요하다:
   *  - E는 몸싸움 판정도 공 줍기도 **control() 전**이다 (원래 grabPending 자리).
   *  - Q/F는 몸싸움 판정만 control() 전으로 당겨 왔고, 실패했을 때의 기존 동작은
   *    예전 그대로 **control() 뒤**에서 돈다. 그래서 축구 쪽 타이밍은 안 변했다.
   */
  function step(ai: PIn = {}, ci: PIn = {}): { A: Tag; C: Tag } {
    for (const rb of sc.tick(DT, physics)) rebounds.push(rb);
    const tags: Record<"A" | "C", Tag> = { A: "none", C: "none" };
    const order: ["A" | "C", Ragdoll, PIn][] = [["A", A, ai], ["C", C, ci]];

    // ---- 1) control() 전: 몸싸움 판정 + E의 기존 동작
    const leftover = new Map<Ragdoll, { q: boolean; f: boolean; kp: number }>();
    for (const [key, rag, inp] of order) {
      const ax = inp.aim ? inp.aim[0] : 0, az = inp.aim ? inp.aim[1] : 0;
      let q = !!inp.q, f = !!inp.f;

      if (inp.e) {
        const pushed = sc.tryPush(rag, ax, az, rags);
        if (pushed) { tags[key] = "push"; hits.push(pushed); }
        else if (play.requestPickup(rag, ball)) tags[key] = "ball-pickup";
      }
      if (q) {
        const g = sc.toggleGrab(rag, ax, az, rags);
        if (g) { tags[key] = g; q = false; }
      }
      if (f) {
        const p = rag.pelvis.position;
        const atFoot = Math.hypot(ball.position.x - p.x, ball.position.z - p.z) <= B.kickRange;
        if (!atFoot) {
          const k = sc.tryKick(rag, ax, az, rags);
          if (k) { tags[key] = "kick"; f = false; hits.push(k); }
        }
      }
      leftover.set(rag, { q, f, kp: inp.kp ?? 0 });
    }

    // ---- 2) 이동 입력 -> control()
    for (const [, rag, inp] of order) {
      const input: RagdollInput = { moveX: inp.mx ?? 0, moveZ: inp.mz ?? 0, jump: false };
      if (inp.aim) { input.aimX = inp.aim[0]; input.aimZ = inp.aim[1]; }
      rag.setHeld(inp.carrying ? [ball] : []);
      const dash = play.dashDir(rag);
      if (dash) { input.moveX = dash.x; input.moveZ = dash.z; }
      const rd = play.rushDir(rag);
      if (rd) {
        const w = B.rushSteer;
        const nx = rd.x * (1 - w) + input.moveX * w;
        const nz = rd.z * (1 - w) + input.moveZ * w;
        const l = Math.hypot(nx, nz) || 1;
        input.moveX = nx / l; input.moveZ = nz / l;
      }
      // 밀린 사람은 이동 입력이 덮어써진다 (main.ts와 같은 자리 = 대시/러시 뒤)
      const sh = sc.shoveDir(rag);
      if (sh) { input.moveX = sh.x; input.moveZ = sh.z; }
      // 잡힌 사람은 잡은 쪽으로 끌려간다 (main.ts와 같은 식)
      const holder = sc.heldBy(rag);
      if (holder) {
        const hp = holder.pelvis.position, tp = rag.pelvis.position;
        const dx = hp.x - tp.x, dz = hp.z - tp.z;
        const d = Math.hypot(dx, dz);
        if (d > SC.GRAB_AHEAD) {
          const ux = dx / d, uz = dz / d;
          // 버티면 끌리는 방향이 옆으로 틀린다 (main.ts와 같은 식)
          let gx = ux, gz = uz;
          const own = Math.hypot(input.moveX, input.moveZ);
          if (own > 0.01) {
            const push = (input.moveX * ux + input.moveZ * uz) / own;
            if (push < 0) {
              let side = (input.moveX * -uz + input.moveZ * ux) / own;
              if (Math.abs(side) < 1e-3) side = 1;
              const th = SC.GRAB_RESIST * -push * Math.sign(side);
              const c = Math.cos(th), sn = Math.sin(th);
              gx = ux * c - uz * sn; gz = ux * sn + uz * c;
            }
          }
          const nx = gx * SC.GRAB_DRAG + input.moveX * (1 - SC.GRAB_DRAG);
          const nz = gz * SC.GRAB_DRAG + input.moveZ * (1 - SC.GRAB_DRAG);
          const l = Math.hypot(nx, nz) || 1;
          input.moveX = nx / l; input.moveZ = nz / l;
        }
      }
      rag.control(DT, input, physics);
      // main.ts 와 같은 자리 - control() 뒤에 몸짓 토크를 얹는다 (flair.ts 머리말)
      fl.update(rag, DT);
    }

    // ---- 3) control() 뒤: 남은 Q/F가 기존 축구 동작으로 간다
    for (const [key, rag, inp] of order) {
      play.tick(rag, DT);
      const lo = leftover.get(rag)!;
      const carrying = !!inp.carrying;
      if (lo.q && play.tryStopTurn(rag, ball, carrying)) tags[key] = "stopturn";
      if (lo.f) {
        if (play.tryKick(rag, ball, carrying, lo.kp)) tags[key] = "ballkick";
        else if (play.tryRush(rag, ball, carrying)) tags[key] = "rush";
      }
      play.dribble(rag, ball, DT, carrying);
    }

    // ---- 4) 잡고 있는 사람 끌어당기기 -> 물리 한 스텝
    for (const ev of sc.updateHolds(DT)) holdEvents.push(ev);
    physics.step(DT);
    for (const rag of rags) rag.guard();
    return tags;
  }

  return { physics, ball, play, sc, A, C, rags, hits, rebounds, holdEvents, step };
}

/**
 * 캐릭터가 보는 쪽을 바꾼다 (테스트 전용).
 *
 * 몸싸움의 정면/등/옆 판정은 **맞은 사람이 어디를 보고 있었나**로 갈린다.
 * 그런데 래그돌은 항상 +Z를 보고 태어나므로, 판정 세 가지를 다 보려면 세워
 * 놓는 방향을 바꿔야 한다.
 *
 * 몸통만 돌리면 안 된다 - 척추 관절의 비틀림 한계(약 25도)를 넘겨서 그 프레임에
 * 자세가 터진다. 그래서 **15개 바디 전부를 골반 기준으로 통째로 회전**시킨다.
 * 강체 전체를 돌리는 것이라 관절은 하나도 늘어나지 않는다.
 */
function faceTo(rag: Ragdoll, fx: number, fz: number) {
  const yaw = Math.atan2(fx, fz);          // 기본 자세가 +Z를 본다
  const q = new CANNON.Quaternion();
  q.setFromEuler(0, yaw, 0);
  const c = rag.pelvis.position.clone();
  for (const b of rag.bodies) {
    const r = b.position.vsub(c);
    const nr = q.vmult(r);
    b.position.copy(c.vadd(nr));
    const nq = q.mult(b.quaternion);
    b.quaternion.copy(nq);
    b.velocity.setZero();
    b.angularVelocity.setZero();
    b.previousPosition.copy(b.position);
    b.interpolatedPosition.copy(b.position);
    b.previousQuaternion.copy(b.quaternion);
    b.interpolatedQuaternion.copy(b.quaternion);
  }
}

/** 몸통이 보고 있는 쪽 (수평 단위벡터) */
function facing(rag: Ragdoll): [number, number] {
  const v = rag.torso.quaternion.vmult(new CANNON.Vec3(0, 0, 1));
  const l = Math.hypot(v.x, v.z) || 1;
  return [v.x / l, v.z / l];
}

/** 둘 다 가만히 서서 안정될 때까지 */
function settle(r: Rig, n = 90) { for (let i = 0; i < n; i++) r.step(); }
const flat = (a: CANNON.Vec3, b: CANNON.Vec3) => Math.hypot(a.x - b.x, a.z - b.z);

// ================================================================
console.log("\n--- TEST 1: E 대상 있음 -> 밀치기 (그리고 실제로 밀린다) ---");
{
  const r = build({ cAt: [0, 1.4] });
  settle(r);
  const before = r.C.pelvis.position.clone();

  const t = r.step({ e: true, aim: [0, 1] });
  check("E가 밀치기로 소비됐다", t.A === "push", t.A);
  check("공 줍기로 새지 않았다", t.A !== "ball-pickup");

  for (let i = 0; i < 40; i++) r.step();
  const moved = flat(r.C.pelvis.position, before);
  // HANDOFF 5절: 그냥 충격량만으로는 0.00m 였다. shoveDir이 붙어야 밀린다.
  check("맞은 사람이 실제로 밀렸다 (>0.35m)", moved > 0.35, `moved=${moved.toFixed(2)}m`);
  check("밀린 사람이 앞쪽(+Z)으로 갔다", r.C.pelvis.position.z > before.z + 0.2,
    `z ${before.z.toFixed(2)} -> ${r.C.pelvis.position.z.toFixed(2)}`);
  check("민 사람은 안 넘어졌다", r.A.state === "ACTIVE", r.A.state);
  check("좌표가 유한값", fin(r.A.pelvis.position) && fin(r.C.pelvis.position));
}

// ================================================================
console.log("\n--- TEST 2: E 대상 없음 -> 기존 공 줍기가 그대로 ---");
{
  // 앞에 사람이 없다. 공은 발 앞에 있다.
  const r = build({ cAt: [30, 30], ballAt: [0, 1.1] });
  settle(r);
  const t = r.step({ e: true, aim: [0, 1] });
  check("E가 기존 공 줍기로 갔다", t.A === "ball-pickup", t.A);
  check("실제로 줍는 동작이 시작됐다", r.play.scooping(r.A));
}

// ================================================================
console.log("\n--- TEST 3: E 뒤통수는 못 민다 (앞쪽 판정) ---");
{
  const r = build({ cAt: [0, 1.4] });
  settle(r);
  // 상대는 +Z에 있는데 -Z를 보고 있다
  const t = r.step({ e: true, aim: [0, -1] });
  check("등 뒤의 사람은 안 밀린다", t.A !== "push", t.A);
}

// ================================================================
console.log("\n--- TEST 4: Q 대상 있음 -> 잡기 / 재입력 -> 놓기 ---");
{
  const r = build({ cAt: [0, 1.5] });
  settle(r);
  const t1 = r.step({ q: true, aim: [0, 1] });
  check("Q가 잡기로 소비됐다", t1.A === "grabbed", t1.A);
  check("잡은 상대가 기록됐다", r.sc.holding(r.A) === r.C);
  check("잡힌 쪽에서도 보인다 (heldBy)", r.sc.heldBy(r.C) === r.A);
  check("스톱턴으로 새지 않았다", t1.A !== "stopturn");

  // 토글 쿨다운(0.3초)이 지나야 놓을 수 있다
  for (let i = 0; i < 25; i++) r.step();
  const t2 = r.step({ q: true, aim: [0, 1] });
  check("Q를 다시 누르면 놓는다", t2.A === "released", t2.A);
  check("놓은 뒤에는 잡은 사람이 없다", r.sc.holding(r.A) === null);
  check("놓은 뒤에는 잡힌 사람도 없다", r.sc.heldBy(r.C) === null);
}

// ================================================================
console.log("\n--- TEST 5: Q 대상 없음 -> 기존 스톱턴이 그대로 ---");
{
  // 앞에 사람이 없고, 공은 스톱턴 사거리 안에 있다
  const r = build({ cAt: [30, 30], ballAt: [0, 1.0] });
  settle(r);
  // 달리다가 Q (스톱턴은 급정지 기술이다)
  for (let i = 0; i < 30; i++) r.step({ mx: 0, mz: 1, aim: [0, 1] });
  const before = Math.hypot(r.A.pelvis.velocity.x, r.A.pelvis.velocity.z);
  const t = r.step({ q: true, mx: 0, mz: 1, aim: [0, 1] });
  check("Q가 기존 스톱턴으로 갔다", t.A === "stopturn", t.A);
  const after = Math.hypot(r.A.pelvis.velocity.x, r.A.pelvis.velocity.z);
  check("실제로 급정지했다", after < before, `${before.toFixed(2)} -> ${after.toFixed(2)}`);
}

// ================================================================
console.log("\n--- TEST 6: 잡으면 따라오고, 멀어지면 저절로 놓인다 ---");
{
  const r = build({ cAt: [0, 1.5] });
  settle(r);
  r.step({ q: true, aim: [0, 1] });
  check("잡았다", r.sc.holding(r.A) === r.C);

  // 잡은 채로 -Z(뒤)로 계속 걸어간다. 끌려와야 한다.
  // (힘만 주고 이동 입력을 안 덮어쓰면 여기서 0.87m 따라오다 0.78초 만에
  //  사거리 밖으로 밀려나 저절로 풀렸다 - SC.GRAB_DRAG 주석의 실측)
  const cStart = r.C.pelvis.position.clone();
  let heldAll = true;
  let worstGap = 0;
  for (let i = 0; i < 120; i++) {
    r.step({ mx: 0, mz: -1, aim: [0, 1] });
    if (r.sc.holding(r.A) !== r.C) heldAll = false;
    else worstGap = Math.max(worstGap, flat(r.A.pelvis.position, r.C.pelvis.position));
  }
  const cMoved = flat(r.C.pelvis.position, cStart);
  check("잡힌 사람이 실제로 끌려왔다 (>3m)", cMoved > 3, `moved=${cMoved.toFixed(2)}m`);
  check("120스텝 내내 안 놓쳤다", heldAll);
  check("끄는 동안 간격이 안 벌어진다 (<GRAB_DISTANCE)", worstGap < SC.GRAB_DISTANCE,
    `worstGap=${worstGap.toFixed(2)}m`);
  check("끌다가 물리가 안 터졌다", fin(r.A.pelvis.position) && fin(r.C.pelvis.position));

  // 멀리 떼어놓으면 (밀려남/낭떠러지) 다음 스텝에 풀린다.
  // reset()으로 옮긴다 - 골반만 옮기면 나머지 조각이 남아 관절이 터진다.
  r.C.reset(new CANNON.Vec3(r.A.pelvis.position.x, P.rideHeight + 0.15, r.A.pelvis.position.z + 9));
  r.step();
  check("거리를 넘기면 저절로 놓인다", r.sc.holding(r.A) === null);
}

// ================================================================
console.log("\n--- TEST 7: F 대상 있음 -> 발차기 (넘어뜨리고 날린다) ---");
{
  const r = build({ cAt: [0, 1.3] });   // 공은 기본값이라 멀리 있다
  settle(r);
  const before = r.C.pelvis.position.clone();
  const t = r.step({ f: true, aim: [0, 1], kp: 1 });
  check("F가 발차기로 소비됐다", t.A === "kick", t.A);
  check("맞은 사람이 넘어졌다 (E와 다른 점)", r.C.state !== "ACTIVE", r.C.state);

  for (let i = 0; i < 50; i++) r.step();
  const moved = flat(r.C.pelvis.position, before);
  check("발차기가 밀치기보다 멀리 보낸다 (>1.0m)", moved > 1.0, `moved=${moved.toFixed(2)}m`);
  check("차고 나서 물리가 멀쩡하다", fin(r.C.pelvis.position) && fin(r.C.pelvis.velocity));
}

// ================================================================
console.log("\n--- TEST 8: F 대상 없음 -> 기존 공 킥이 그대로 ---");
{
  const r = build({ cAt: [30, 30], ballAt: [0, 1.2] });
  settle(r);
  const t = r.step({ f: true, aim: [0, 1], kp: 1 });
  check("F가 기존 공 킥으로 갔다", t.A === "ballkick", t.A);
  for (let i = 0; i < 10; i++) r.step();
  const spd = Math.hypot(r.ball.velocity.x, r.ball.velocity.z);
  check("공이 실제로 날아갔다", spd > 3, `speed=${spd.toFixed(2)} m/s`);
}

// ================================================================
console.log("\n--- TEST 9: 공이 발밑이면 사람이 앞에 있어도 기존 공 킥 (축구 보존) ---");
{
  // 상대도 사거리 안에 있고(1.58m) 공도 발밑에 있다(1.0m). 이때는 축구가 이긴다.
  // 상대는 살짝 옆으로 비켜 세운다 - 공 바로 뒤에 세우면 찬 공이 그 몸에
  // 맞고 서 버려서 "공이 날아갔는가"를 잴 수 없다.
  const r = build({ cAt: [0.9, 1.3], ballAt: [0, 1.0] });
  settle(r);
  const t = r.step({ f: true, aim: [0, 1], kp: 1 });
  check("공이 발밑이면 공을 찬다", t.A === "ballkick", t.A);
  check("사람은 안 찼다 (안 넘어졌다)", r.C.state === "ACTIVE", r.C.state);
  for (let i = 0; i < 10; i++) r.step();
  check("공이 날아갔다", Math.hypot(r.ball.velocity.x, r.ball.velocity.z) > 3);
}

// ================================================================
console.log("\n--- TEST 10: 때리는 쪽 쿨다운 ---");
{
  const r = build({ cAt: [0, 1.4] });
  settle(r);
  const t1 = r.step({ e: true, aim: [0, 1] });
  check("첫 E는 나간다", t1.A === "push", t1.A);
  const t2 = r.step({ e: true, aim: [0, 1] });
  check("바로 다음 E는 쿨다운에 걸린다", t2.A !== "push", t2.A);

  // 쿨다운(0.5초) + 무적(0.65초)이 지나면 다시 된다.
  // 밀린 상대는 사거리(2.0m) 밖으로 나가 있으므로 다시 앞에 세워야
  // "쿨다운이 풀렸는가"만 따로 볼 수 있다.
  for (let i = 0; i < 55; i++) r.step();
  r.C.reset(new CANNON.Vec3(r.A.pelvis.position.x, P.rideHeight + 0.15, r.A.pelvis.position.z + 1.4));
  for (let i = 0; i < 5; i++) r.step();
  const t3 = r.step({ e: true, aim: [0, 1] });
  check("쿨다운이 지나면 다시 민다", t3.A === "push", t3.A);
}

// ================================================================
console.log("\n--- TEST 11: 맞은 쪽 무적 (연속타가 안 들어간다) ---");
{
  const r = build({ cAt: [0, 1.3] });
  settle(r);
  const t1 = r.step({ f: true, aim: [0, 1] });
  check("A가 C를 찼다", t1.A === "kick", t1.A);

  // 곧바로 C를 다시 때리려 해도 무적(0.65초 = 39스텝)이라 안 맞는다.
  let landed = 0;
  for (let i = 0; i < 20; i++) {
    const t = r.step({ e: true, aim: [0, 1] });
    if (t.A === "push") landed++;
  }
  check("무적 동안에는 연속타가 안 들어간다", landed === 0, `들어간 횟수=${landed}`);
  check("무적 시간이 실제로 존재한다", SC.hitImmunity > 0);
}

// ================================================================
console.log("\n--- TEST 12: 2인 물리 안정성 (마구 눌러도 안 터진다) ---");
{
  const r = build({ cAt: [0, 1.6] });
  settle(r);
  let worstJoint = 0;
  let worstSpin = 0;
  for (let i = 0; i < 600; i++) {
    // 둘이 서로 마주보며 E/Q/F를 번갈아 난타한다
    r.step(
      { e: i % 7 === 0, q: i % 23 === 0, f: i % 11 === 0, mx: 0, mz: 1, aim: [0, 1] },
      { e: i % 9 === 0, q: i % 29 === 0, f: i % 13 === 0, mx: 0, mz: -1, aim: [0, -1] },
    );
    for (const rag of r.rags) {
      for (const b of rag.bodies) {
        if (!fin(b.position) || !fin(b.velocity)) { worstJoint = 1e9; break; }
        worstSpin = Math.max(worstSpin, b.angularVelocity.length());
        // 관절이 벌어졌는가 = 골반에서 가장 먼 조각까지의 거리
        worstJoint = Math.max(worstJoint, b.position.distanceTo(rag.pelvis.position));
      }
    }
  }
  check("600스텝 동안 좌표가 유한값", worstJoint < 1e8, `worst=${worstJoint}`);
  // 정상적인 사람 크기는 골반에서 2m 안쪽이다. 관절이 터지면 수 m~수십 m가 된다.
  check("래그돌이 안 쪼개졌다 (골반-말단 < 2.5m)", worstJoint < 2.5, `worst=${worstJoint.toFixed(2)}m`);
  check("각속도가 폭주하지 않았다 (< 200 rad/s)", worstSpin < 200, `worst=${worstSpin.toFixed(1)}`);
  check("둘 다 살아 있다", fin(r.A.pelvis.position) && fin(r.C.pelvis.position));
}

// ================================================================
console.log("\n--- TEST 13: 기존 공 동작이 그대로다 (몸싸움을 붙여도) ---");
{
  // 사람 둘이 있는 판에서, 공은 A의 발 앞. 드리블이 예전처럼 되는가.
  const r = build({ cAt: [0, 6], ballAt: [0, 1.1] });
  settle(r);
  let maxGap = 0;
  for (let i = 0; i < 120; i++) {
    r.step({ mx: 0, mz: 1, aim: [0, 1] });
    maxGap = Math.max(maxGap, Math.hypot(
      r.ball.position.x - r.A.pelvis.position.x, r.ball.position.z - r.A.pelvis.position.z));
  }
  check("직진 드리블에서 공을 안 놓친다 (<2.2m)", maxGap < 2.2, `maxGap=${maxGap.toFixed(2)}m`);
  check("공이 앞으로 나갔다", r.ball.position.z > 3, `z=${r.ball.position.z.toFixed(2)}`);
  check("공 좌표가 유한값", fin(r.ball.position));

  // 아무 키도 안 눌렀으면 몸싸움은 아무것도 안 한다
  check("잡은 사람이 없다", r.sc.holding(r.A) === null && r.sc.holding(r.C) === null);
  check("밀린 사람도 없다", r.sc.shoveDir(r.A) === null && r.sc.shoveDir(r.C) === null);
}

// ================================================================
console.log("\n--- TEST 14: 넘어져 있으면 못 때리고 못 잡는다 ---");
{
  const r = build({ cAt: [0, 1.4] });
  settle(r);
  r.A.knockdown(1.2);
  r.step();
  const t = r.step({ e: true, aim: [0, 1] });
  check("누운 사람은 밀지 못한다", t.A !== "push", t.A);
  const t2 = r.step({ q: true, aim: [0, 1] });
  check("누운 사람은 잡지 못한다", t2.A !== "grabbed", t2.A);
}

// ================================================================
console.log("\n--- TEST 15: 세기가 거리와 각도를 따라간다 (툭 스침 vs 정통) ---");
{
  // 코앞에서 정면으로
  const near = build({ cAt: [0, 0.8] });
  settle(near);
  const hN = near.step({ e: true, aim: [0, 1] });
  check("코앞 정면이 맞는다", hN.A === "push", hN.A);
  const pN = near.C.pelvis.position.clone();
  for (let i = 0; i < 45; i++) near.step();
  const dNear = flat(near.C.pelvis.position, pN);

  // 사거리 끝에서 비스듬히 (판정 경계 근처)
  const far = build({ cAt: [1.5, 1.25] });   // d≈1.95m, 약 50도
  settle(far);
  const hF = far.step({ e: true, aim: [0, 1] });
  check("사거리 끝 스침도 맞기는 한다", hF.A === "push", hF.A);
  const pF = far.C.pelvis.position.clone();
  for (let i = 0; i < 45; i++) far.step();
  const dFar = flat(far.C.pelvis.position, pF);

  console.log(`       코앞정면 ${dNear.toFixed(2)}m / 멀리스침 ${dFar.toFixed(2)}m`);
  // 튜닝 전에는 0.7m든 1.95m든, 0도든 63도든 전부 1.46~1.48m로 똑같았다.
  check("정통으로 맞으면 확실히 더 밀린다", dNear > dFar * 1.25,
    `${dNear.toFixed(2)}m vs ${dFar.toFixed(2)}m`);
  check("스쳐도 아주 안 밀리지는 않는다", dFar > 0.2, `${dFar.toFixed(2)}m`);
  check("어느 쪽도 안 넘어진다 (E는 넉다운이 아니다)",
    near.C.state === "ACTIVE" && far.C.state === "ACTIVE");
}

// ================================================================
console.log("\n--- TEST 16: 발차기는 몸을 뒤집는다 (굴러가는 그림) ---");
{
  const r = build({ cAt: [0, 1.3] });
  settle(r);
  const t = r.step({ f: true, aim: [0, 1] });
  check("찼다", t.A === "kick", t.A);
  let minUp = 1, peakSpin = 0;
  const up = new CANNON.Vec3();
  for (let i = 0; i < 120; i++) {
    r.step();
    r.C.torso.quaternion.vmult(new CANNON.Vec3(0, 1, 0), up);
    minUp = Math.min(minUp, up.y);
    peakSpin = Math.max(peakSpin, r.C.torso.angularVelocity.length());
  }
  console.log(`       기울기 최소 ${minUp.toFixed(2)} (0 미만 = 뒤집힘) / 최고 회전 ${peakSpin.toFixed(1)} rad/s`);
  // 회전을 안 줬을 때는 0.27까지밖에 안 내려갔다 = 옆으로 기운 채 미끄러질 뿐이었다
  check("몸이 실제로 뒤집힌다 (기울기 < 0)", minUp < 0, `minUp=${minUp.toFixed(2)}`);
  check("굴러갈 만큼 돈다 (> 8 rad/s)", peakSpin > 8, `${peakSpin.toFixed(1)}`);
  check("뒤집혀도 물리가 안 터진다", fin(r.C.pelvis.position) && fin(r.C.pelvis.velocity));
}

// ================================================================
console.log("\n--- TEST 17: 잡힌 사람이 버티면 저항이 된다 ---");
{
  // 반대로 걸어 버티는 상대
  const a = build({ cAt: [0, 1.5] });
  settle(a);
  a.step({ q: true, aim: [0, 1] });
  const a0 = a.C.pelvis.position.clone();
  let heldA = 0;
  for (let i = 0; i < 240; i++) {
    a.step({ mx: 0, mz: -1, aim: [0, 1] }, { mx: 0, mz: 1, aim: [0, -1] });
    if (a.sc.holding(a.A) === a.C) heldA++;
  }
  const movedA = flat(a.C.pelvis.position, a0);

  // 가만히 있는 상대
  const b = build({ cAt: [0, 1.5] });
  settle(b);
  b.step({ q: true, aim: [0, 1] });
  const b0 = b.C.pelvis.position.clone();
  let heldB = 0;
  for (let i = 0; i < 240; i++) {
    b.step({ mx: 0, mz: -1, aim: [0, 1] });
    if (b.sc.holding(b.A) === b.C) heldB++;
  }
  const movedB = flat(b.C.pelvis.position, b0);

  console.log(`       버티면 ${(heldA / 60).toFixed(2)}초 잡혀 있음(${movedA.toFixed(1)}m) / 안 버티면 ${(heldB / 60).toFixed(2)}초(${movedB.toFixed(1)}m)`);
  check("안 버티면 계속 끌려간다 (4초 내내)", heldB >= 235, `${heldB}스텝`);
  check("버티면 결국 뿌리친다", heldA < 200, `${heldA}스텝`);
  check("버텨도 잠깐은 끌려간다 (즉시 탈출이 아니다)", heldA > 30, `${heldA}스텝`);
  check("버틸 때 확실히 덜 끌려간다", movedA < movedB * 0.6,
    `버팀 ${movedA.toFixed(2)}m vs 가만히 ${movedB.toFixed(2)}m`);
}

// ================================================================
console.log("\n--- TEST 18: 쫓아가며 계속 밀어도 무한 경직이 아니다 ---");
{
  const r = build({ cAt: [0, 1.2] });
  settle(r);
  let landed = 0, downSteps = 0, shovedSteps = 0;
  for (let i = 0; i < 600; i++) {
    const t = r.step({ e: true, mx: 0, mz: 1, aim: [0, 1] });
    if (t.A === "push") landed++;
    if (r.C.state !== "ACTIVE") downSteps++;
    if (r.sc.shoveDir(r.C) !== null) shovedSteps++;
  }
  console.log(`       10초 동안 ${landed}회 성립 / 조작을 뺏긴 시간 ${(shovedSteps / 60).toFixed(2)}초`);
  check("계속 밀 수는 있다", landed >= 2, `${landed}회`);
  check("맞아도 넘어지지는 않는다 (E는 넉다운이 아니다)", downSteps === 0, `${downSteps}스텝`);
  // 10초 중 절반 넘게 조작을 뺏기면 "영영 못 움직인다"가 된다
  check("조작을 뺏긴 시간이 절반 미만이다", shovedSteps < 300, `${shovedSteps}스텝`);
  check("끝나고 멀쩡히 서 있다", r.C.state === "ACTIVE", r.C.state);
}

// ================================================================
console.log("\n--- TEST 19: 어느 쪽에서 밀었는지에 따라 다르게 밀린다 ---");
{
  // 셋 다 완전히 같은 자리에서 같은 방향으로 민다. 다른 건 **맞는 사람이
  // 보고 있던 쪽**뿐이다. 그래서 차이가 나면 그건 방향 판정 때문이다.
  const run = (fx: number, fz: number) => {
    const r = build({ cAt: [0, 1.4] });
    settle(r);
    faceTo(r.C, fx, fz);
    for (let i = 0; i < 12; i++) r.step();
    const before = r.C.pelvis.position.clone();
    const [f0x, f0z] = facing(r.C);
    const yaw0 = Math.atan2(f0x, f0z);
    const t = r.step({ e: true, aim: [0, 1] });
    const hit = r.hits[r.hits.length - 1];
    // 맞은 직후 0.25초 동안 상체가 얼마나 젖혀졌나 = up 벡터의 수평 성분.
    // 창을 짧게 잡는 이유: 45스텝을 다 보면 밀려나며 비틀거리는 뒷부분까지
    // 섞여서, "맞는 순간 몸이 어떻게 꺾였나"가 안 보인다.
    let lean = 0, leanLate = 0;
    for (let i = 0; i < 45; i++) {
      r.step();
      const up = r.C.torso.quaternion.vmult(new CANNON.Vec3(0, 1, 0));
      const h = Math.hypot(up.x, up.z);
      if (i < 15) lean = Math.max(lean, h);
      leanLate = Math.max(leanLate, h);
    }
    const p = r.C.pelvis.position;
    const [f1x, f1z] = facing(r.C);
    let dYaw = Math.atan2(f1x, f1z) - yaw0;
    while (dYaw > Math.PI) dYaw -= Math.PI * 2;
    while (dYaw < -Math.PI) dYaw += Math.PI * 2;
    return {
      tag: t.A, side: hit ? hit.side : "none",
      alongZ: p.z - before.z, offX: Math.abs(p.x - before.x),
      lean, leanLate, spun: Math.abs(dYaw), state: r.C.state,
    };
  };
  const back = run(0, 1);     // 등을 보이고 서 있다
  const front = run(0, -1);   // 마주 보고 서 있다
  const side = run(1, 0);     // 옆으로 서 있다
  console.log(`       등:   ${back.side} 앞으로 ${back.alongZ.toFixed(2)}m 젖힘 ${back.lean.toFixed(2)}(끝 ${back.leanLate.toFixed(2)}) 회전 ${back.spun.toFixed(2)}rad`);
  console.log(`       정면: ${front.side} 뒤로 ${front.alongZ.toFixed(2)}m 젖힘 ${front.lean.toFixed(2)}(끝 ${front.leanLate.toFixed(2)}) 회전 ${front.spun.toFixed(2)}rad`);
  console.log(`       옆:   ${side.side} ${side.alongZ.toFixed(2)}m 옆으로 ${side.offX.toFixed(2)}m 회전 ${side.spun.toFixed(2)}rad`);

  check("맞은 사람이 보던 쪽으로 판정이 갈린다",
    back.side === "back" && front.side === "front" && side.side === "side",
    `${back.side}/${front.side}/${side.side}`);
  check("셋 다 밀치기로 성립한다",
    back.tag === "push" && front.tag === "push" && side.tag === "push");
  check("등을 밀면 제일 크게 밀린다", back.alongZ > front.alongZ * 1.15,
    `등 ${back.alongZ.toFixed(2)}m vs 정면 ${front.alongZ.toFixed(2)}m`);
  check("정면으로 맞으면 상체가 더 젖혀진다", front.lean > back.lean * 1.05,
    `정면 ${front.lean.toFixed(2)} vs 등 ${back.lean.toFixed(2)}`);
  check("옆에서 맞으면 몸이 돌아간다 (>0.4rad)", side.spun > 0.4, `${side.spun.toFixed(2)}rad`);
  check("옆에서 맞으면 옆으로도 미끄러진다 (>0.25m)", side.offX > 0.25, `${side.offX.toFixed(2)}m`);
  check("어느 쪽으로 맞아도 E는 넘어뜨리지 않는다",
    back.state === "ACTIVE" && front.state === "ACTIVE" && side.state === "ACTIVE",
    `${back.state}/${front.state}/${side.state}`);
}

// ================================================================
console.log("\n--- TEST 20: 차인 사람이 벽에 박으면 되튕긴다 ---");
{
  // 벽은 날아가는 길목(앞면 z=3.1)에 세운다. 공중에서 박게 하려고 가까이 둔다 -
  // 멀리 두면 다 떨어진 뒤 바닥을 긁으며 닿아서 마찰이 되튕김을 다 먹는다.
  const r = build({ cAt: [0, 1.3], wallZ: 3.5 });
  settle(r);
  const t = r.step({ f: true, aim: [0, 1] });
  check("찼다", t.A === "kick", t.A);

  // 되튕김은 순간의 사건이다. 몇 초 뒤 최종 위치로 재면 착지 마찰이 결과를
  // 덮어써서 무엇이 일어났는지 알 수 없다. 박은 직후 0.66초만 본다.
  let hitZ = 0, backZ = 99, vzMin = 99, after = 0, seen = 0;
  for (let i = 0; i < 100; i++) {
    r.step();
    if (r.rebounds.length > seen) {
      seen = r.rebounds.length;
      hitZ = r.C.pelvis.position.z;
      after = 40;
    }
    if (after > 0) {
      after--;
      vzMin = Math.min(vzMin, r.C.pelvis.velocity.z);
      backZ = Math.min(backZ, r.C.pelvis.position.z);
    }
  }
  console.log(`       되튕김 ${r.rebounds.length}회 / 박은 자리 z=${hitZ.toFixed(2)} -> ${backZ.toFixed(2)} / 최저 vz=${vzMin.toFixed(2)}`);
  check("벽에 박아 되튕겼다", r.rebounds.length >= 1, `${r.rebounds.length}회`);
  check("되튕김 세기가 0..1 안에 있다",
    r.rebounds.every((b) => b.power > 0 && b.power <= 1));
  check("온 길로 되돌아간다 (vz < -1)", vzMin < -1, `vz=${vzMin.toFixed(2)}`);
  // 물러나는 거리가 크지 않은 건 정상이다 - 박는 순간 몸이 벽에 눌려 있어서
  // 접촉 솔버가 되미는 힘을 그 자리에서 상당 부분 먹는다 (SC.REBOUND_FORCE 주석).
  // "얼마나 멀리"가 아니라 "방향이 뒤집혔나"가 이 기능의 약속이다.
  check("벽에서 실제로 물러난다 (>0.15m)", hitZ - backZ > 0.15,
    `${(hitZ - backZ).toFixed(2)}m`);
  check("한 번 박으면 그걸로 끝난다 (같은 벽에서 계속 튕기지 않는다)",
    r.rebounds.length === 1, `${r.rebounds.length}회`);
  check("튕기고도 물리가 멀쩡하다", fin(r.C.pelvis.position) && fin(r.C.pelvis.velocity));

  // [거짓 양성 검사 1] 벽이 없으면 한 번도 걸리면 안 된다. 땅에 처박히는 순간의
  // 속도 손실(실측 2.97~4.04 m/s)까지 "박았다"로 세면 평지에서 아무 데나 튕긴다.
  const flatRun = build({ cAt: [0, 1.3] });
  settle(flatRun);
  flatRun.step({ f: true, aim: [0, 1] });
  for (let i = 0; i < 150; i++) flatRun.step();
  check("평지에서는 되튕기지 않는다 (바닥을 벽으로 오인하지 않는다)",
    flatRun.rebounds.length === 0, `${flatRun.rebounds.length}회`);

  // [거짓 양성 검사 2] 차이지 않은 사람은 벽에 부딪혀도 튕기지 않는다.
  // 되튕김은 "발차기로 날아가는 중"일 때만 도는 장치다.
  const walk = build({ cAt: [30, 30], wallZ: 3.5 });
  settle(walk);
  for (let i = 0; i < 200; i++) walk.step({ mx: 0, mz: 1, aim: [0, 1] });
  check("그냥 걸어가 벽에 부딪히는 건 되튕김이 아니다",
    walk.rebounds.length === 0, `${walk.rebounds.length}회`);
}

console.log("\n--- TEST 21: 잡은 채로 급회전하면 후려친다 ---");
{
  const r = build({ cAt: [0, 1.5] });
  settle(r);
  r.step({ q: true, aim: [0, 1] });
  check("잡았다", r.sc.holding(r.A) === r.C);
  // 뒤로 끌고 가다가
  for (let i = 0; i < 45; i++) r.step({ mx: 0, mz: -1, aim: [0, 1] });
  const straight = r.holdEvents.filter((e) => e.kind === "whip").length;
  check("곧게 끌기만 할 때는 안 나간다", straight === 0, `${straight}회`);
  // 갑자기 옆으로 튼다
  const before = r.C.pelvis.position.clone();
  for (let i = 0; i < 70; i++) r.step({ mx: 1, mz: 0, aim: [1, 0] });
  const whips = r.holdEvents.filter((e) => e.kind === "whip");
  console.log(`       후려치기 ${whips.length}회 / 잡힌 사람이 ${flat(r.C.pelvis.position, before).toFixed(2)}m 움직임`);
  check("급회전하면 후려친다", whips.length >= 1, `${whips.length}회`);
  check("세기가 0..1 안에 있다", whips.every((w) => w.power > 0 && w.power <= 1));
  check("후려쳐도 물리가 안 터진다", fin(r.A.pelvis.position) && fin(r.C.pelvis.position));
  check("잡은 사람은 안 넘어진다", r.A.state === "ACTIVE", r.A.state);
}

// ================================================================
console.log("\n--- TEST 22: 서로 잡으면 줄다리기가 된다 ---");
{
  const r = build({ cAt: [0, 1.5] });
  settle(r);
  r.step({ q: true, aim: [0, 1] });                  // A가 C를 잡는다
  for (let i = 0; i < 22; i++) r.step();             // 토글 쿨다운
  r.step({}, { q: true, aim: [0, -1] });             // C도 A를 잡는다
  check("서로 잡을 수 있다", r.sc.holding(r.C) === r.A && r.sc.holding(r.A) === r.C);
  check("줄다리기가 잡힌다", r.holdEvents.some((e) => e.kind === "tug"));
  check("알림은 한 번만 (두 쌍이 같은 스텝에 성립한다)",
    r.holdEvents.filter((e) => e.kind === "tug").length === 1,
    `${r.holdEvents.filter((e) => e.kind === "tug").length}회`);

  const a0 = r.A.pelvis.position.clone();
  const c0 = r.C.pelvis.position.clone();
  let bothHeld = 0;
  for (let i = 0; i < 180; i++) {
    // 둘이 정반대로 걷는다
    r.step({ mx: 0, mz: -1, aim: [0, 1] }, { mx: 0, mz: 1, aim: [0, -1] });
    if (r.sc.holding(r.A) === r.C && r.sc.holding(r.C) === r.A) bothHeld++;
  }
  const am = flat(r.A.pelvis.position, a0), cm = flat(r.C.pelvis.position, c0);
  console.log(`       3초 중 ${(bothHeld / 60).toFixed(2)}초 서로 잡음 / A ${am.toFixed(2)}m, C ${cm.toFixed(2)}m 이동`);
  check("한동안 서로 붙잡고 버틴다 (>1초)", bothHeld > 60, `${bothHeld}스텝`);
  check("팽팽해서 어느 쪽도 멀리 못 간다 (<6m)", am < 6 && cm < 6,
    `A ${am.toFixed(2)}m / C ${cm.toFixed(2)}m`);
  check("줄다리기 중에 물리가 안 터진다",
    fin(r.A.pelvis.position) && fin(r.C.pelvis.position));
  check("래그돌이 안 쪼개졌다",
    r.rags.every((rag) => rag.bodies.every((b) => b.position.distanceTo(rag.pelvis.position) < 2.5)));
}

// ================================================================
console.log("\n--- TEST 23: 달리다 부딪히면 넘어지지 않고 휘청인다 ---");
{
  const r = build({ cAt: [0, 1.0] });
  settle(r);
  const a0 = r.A.pelvis.position.clone();
  const c0 = r.C.pelvis.position.clone();
  check("부딪힘이 성립한다", r.sc.tryBump(r.A, r.C, 0, 1, 1));
  check("둘 다 조작을 잠깐 잃는다",
    r.sc.shoveDir(r.A) !== null && r.sc.shoveDir(r.C) !== null);
  check("바로 다시 부딪히지는 않는다 (쿨다운)", !r.sc.tryBump(r.A, r.C, 0, 1, 1));

  for (let i = 0; i < 45; i++) r.step();
  const az = r.A.pelvis.position.z - a0.z, cz = r.C.pelvis.position.z - c0.z;
  console.log(`       A ${az.toFixed(2)}m / C ${cz.toFixed(2)}m 로 서로 반대로 밀림`);
  check("서로 반대로 밀려난다", az < -0.2 && cz > 0.2, `A ${az.toFixed(2)} / C ${cz.toFixed(2)}`);
  check("둘 다 안 넘어진다 (기존 넘어뜨리기와 다른 점)",
    r.A.state === "ACTIVE" && r.C.state === "ACTIVE", `${r.A.state}/${r.C.state}`);
  check("좌표가 유한값", fin(r.A.pelvis.position) && fin(r.C.pelvis.position));

  // 누워 있는 사람은 휘청일 것도 없다
  r.C.knockdown(1.0);
  r.step();
  check("넘어져 있는 사람과는 성립하지 않는다", !r.sc.tryBump(r.A, r.C, 0, 1, 1));
}

// ================================================================
console.log("\n--- TEST 24: 새 동작을 전부 섞어도 물리가 안 터진다 ---");
{
  const r = build({ cAt: [0, 1.6], wallZ: 9 });
  settle(r);
  let worstJoint = 0, worstSpin = 0;
  for (let i = 0; i < 900; i++) {
    // 서로 밀고 차고 잡고, 잡은 채로 방향을 계속 바꾼다 (= 후려치기가 계속 나간다)
    const turn = Math.sin(i * 0.11);
    r.step(
      { e: i % 7 === 0, q: i % 31 === 0, f: i % 11 === 0, mx: turn, mz: 1 - Math.abs(turn), aim: [0, 1] },
      { e: i % 9 === 0, q: i % 37 === 0, f: i % 13 === 0, mx: -turn, mz: -1 + Math.abs(turn), aim: [0, -1] },
    );
    if (i % 120 === 0) r.sc.tryBump(r.A, r.C, 0, 1, 1);
    for (const rag of r.rags) {
      for (const b of rag.bodies) {
        if (!fin(b.position) || !fin(b.velocity)) { worstJoint = 1e9; break; }
        worstSpin = Math.max(worstSpin, b.angularVelocity.length());
        worstJoint = Math.max(worstJoint, b.position.distanceTo(rag.pelvis.position));
      }
    }
  }
  console.log(`       15초 동안 되튕김 ${r.rebounds.length}회 / 후려치기 ${r.holdEvents.filter((e) => e.kind === "whip").length}회`);
  check("900스텝 동안 좌표가 유한값", worstJoint < 1e8, `worst=${worstJoint}`);
  check("래그돌이 안 쪼개졌다 (골반-말단 < 2.5m)", worstJoint < 2.5, `worst=${worstJoint.toFixed(2)}m`);
  check("각속도가 폭주하지 않았다 (< 200 rad/s)", worstSpin < 200, `worst=${worstSpin.toFixed(1)}`);
  check("둘 다 살아 있다", fin(r.A.pelvis.position) && fin(r.C.pelvis.position));
}

console.log(`\nRESULT: ${pass} passed, ${fail} failed`);
if (fail > 0) process.exit(1);
