/**
 * PHASE 1 게임 루프 검증 (헤드리스).
 *
 * game.ts는 렌더러를 쓰지 않고 THREE.Scene에 마커만 붙이므로, DOM만 최소로
 * 흉내내면 노드에서 그대로 돌릴 수 있다. 물리는 실제 cannon-es 바디를 쓴다
 * (판정이 body.position을 읽기 때문).
 *
 * 여기서 검증하는 것:
 *   - 타이머가 host에서만 흐른다
 *   - 목표 물체가 출구에 들어가면 성공, 스쳐 지나가면 성공이 아니다
 *   - 벽 너머로 던져 넘긴 건 성공이 아니다
 *   - 시간이 다 되면 실패
 *   - 결과가 난 뒤에는 타이머가 더 이상 흐르지 않는다
 *   - [다시하기]가 월드 리셋을 호출하고 타이머/상태를 되돌린다
 *   - 비-host는 판정하지 않고 host의 스냅샷을 그대로 따른다
 */

// ---------------------------------------------------------------- DOM 스텁
interface FakeEl {
  id: string;
  textContent: string;
  hidden: boolean;
  style: Record<string, string>;
  classList: { toggle(c: string, on: boolean): void; has(c: string): boolean };
  addEventListener(type: string, fn: (ev: { preventDefault(): void }) => void): void;
  click(): void;
}

const els = new Map<string, FakeEl>();
function makeEl(id: string): FakeEl {
  const classes = new Set<string>();
  const listeners: ((ev: { preventDefault(): void }) => void)[] = [];
  return {
    id,
    textContent: "",
    hidden: false,
    style: {},
    classList: {
      toggle(c, on) { if (on) classes.add(c); else classes.delete(c); },
      has(c) { return classes.has(c); },
    },
    addEventListener(_type, fn) { listeners.push(fn); },
    click() { for (const fn of listeners) fn({ preventDefault() {} }); },
  };
}
for (const id of ["goal-text", "timer", "goal-dist", "result", "result-title", "result-sub", "retry"]) {
  els.set(id, makeEl(id));
}
(globalThis as unknown as { document: unknown }).document = {
  getElementById: (id: string) => els.get(id) ?? null,
  pointerLockElement: null,
  exitPointerLock() {},
};

// document 스텁이 있어야 import가 통과한다 - 그래서 동적 import를 쓴다
const THREE = await import("three");
const CANNON = await import("cannon-es");
const { createGame } = await import("../client/src/game");
// RULE_MAPS[0]은 이제 Goal Rush 코스이고 judge:false(골 판정은 5단계)라 규칙 테스트에
// 쓸 수 없다. 판정이 살아 있는 예전 맵으로 픽스처를 만든다.
const { LEGACY_MAPS: RULE_MAPS } = await import("../client/src/maps");
const TARGET_ID = RULE_MAPS[0].targetId;
const TIME_LIMIT = RULE_MAPS[0].timeLimit;
import type { World } from "../client/src/world";

let pass = 0, fail = 0;
function check(name: string, cond: boolean, extra = "") {
  if (cond) { pass++; console.log(`  PASS  ${name}`); }
  else { fail++; console.log(`  FAIL  ${name} ${extra}`); }
}

// 첫 맵(집)의 출구. game.ts가 world.map에서 읽으므로 여기서도 맵 정의를 쓴다.
const GOAL_X = RULE_MAPS[0].goal.x, GOAL_Z = RULE_MAPS[0].goal.z;
const el = (id: string) => els.get(id)!;

// ---------------------------------------------------------------- 픽스처
interface Fixture {
  game: ReturnType<typeof createGame>;
  body: InstanceType<typeof CANNON.Body>;
  resets: { n: number };
  remoteRestarts: { n: number };
  authority: { on: boolean };
  /** 협동 골 규칙: 지금 골이 인정되는가 (main.ts isGoalValid 를 흉내낸다) */
  goalOk: { on: boolean };
  /** 인정되지 않아 되돌린 횟수 */
  rejects: { n: number };
  /** 체크포인트 번호 (host 가 정하고 스냅샷으로 나른다) */
  checkpoint: { n: number };
  /** 고정 timestep으로 sec초만큼 게임을 진행시킨다 */
  run(sec: number): void;
}

function fixture(isHost = true): Fixture {
  const scene = new THREE.Scene();
  const body = new CANNON.Body({
    mass: 20,
    shape: new CANNON.Box(new CANNON.Vec3(0.6, 1.1, 0.5)),
    position: new CANNON.Vec3(0, 1.1, -4),
  });
  // game.ts는 이제 맵 정의(목표 id/출구/제한시간)를 world에서 읽는다.
  // 맵 로드는 이 테스트의 관심사가 아니므로 첫 맵으로 고정한 스텁을 준다.
  const world = {
    scene,
    objectById: new Map([[TARGET_ID, { id: TARGET_ID, mesh: new THREE.Group(), body, grabRadius: 2.4, mass: 20 }]]),
    mapIndex: 0,
    map: RULE_MAPS[0],
    mapCount: RULE_MAPS.length,
    loadMap: () => {},
    onMapLoaded: () => {},
  } as unknown as World;

  const resets = { n: 0 };
  const remoteRestarts = { n: 0 };
  const authority = { on: isHost };

  const goalOk = { on: true };
  const rejects = { n: 0 };
  const checkpoint = { n: -1 };

  const game = createGame(world, {
    isAuthority: () => authority.on,
    resetWorld: () => { resets.n++; body.position.set(0, 1.1, -4); },
    requestRestartRemote: () => { remoteRestarts.n++; },
    isGoalValid: () => goalOk.on,
    onGoalRejected: () => { rejects.n++; body.position.set(GOAL_X, 1.1, GOAL_Z + 4.5); },
    checkpoint: () => checkpoint.n,
    setCheckpoint: (n) => { checkpoint.n = n; },
  });

  const DT = 1 / 60;
  return {
    game, body, resets, remoteRestarts, authority, goalOk, rejects, checkpoint,
    run(sec: number) {
      const steps = Math.round(sec / DT);
      for (let i = 0; i < steps; i++) { game.update(DT); game.render(DT); }
    },
  };
}

// ---------------------------------------------------------------- 테스트
console.log("\n--- TEST 1: 초기 상태 ---");
{
  const f = fixture();
  check("시작하면 진행중", f.game.phase === "playing");
  check("타이머가 제한시간에서 시작", f.game.snapshot().t === TIME_LIMIT, `t=${f.game.snapshot().t}`);
  f.run(0.1);
  check("결과 화면은 숨겨져 있음", el("result").hidden === true);
  check("목표 안내 텍스트가 표시됨", el("goal-text").textContent.includes("출구"), el("goal-text").textContent);
  check("타이머가 3:00으로 표시됨", el("timer").textContent === "3:00", el("timer").textContent);
}

console.log("\n--- TEST 2: 타이머가 흐른다 ---");
{
  const f = fixture();
  f.run(10);
  const t = f.game.snapshot().t;
  check("10초 뒤 약 170초 남음", Math.abs(t - (TIME_LIMIT - 10)) < 0.2, `t=${t}`);
  check("아직 진행중", f.game.phase === "playing");
  check("타이머 표기 2:50", el("timer").textContent === "2:50", el("timer").textContent);
}

/**
 * 공을 골라인 너머로 "넘긴다".
 *
 * [왜 위치만 찍으면 안 되나] 판정이 거리에서 "골라인 통과"로 바뀌었다
 * (game.ts checkCross). 한 번에 라인 뒤로 순간이동시키면 직전 위치가 라인
 * 앞이 아니라서 통과로 안 잡힌다. 라인 앞에 한 번 두고 한 스텝 굴린 뒤
 * 라인 뒤로 옮겨야 "앞 -> 뒤"가 성립한다 - 실제로 공이 굴러 들어오는 것과 같다.
 */
function crossGoal(f: ReturnType<typeof fixture>, x = GOAL_X, y = 1.1) {
  f.body.position.set(x, y, GOAL_Z + 1.5);   // 라인 앞
  f.run(1 / 60);
  f.body.position.set(x, y, GOAL_Z - 0.5);   // 라인 뒤
  f.run(1 / 60);
}

console.log("\n--- TEST 3: 공이 골라인을 넘으면 성공 ---");
{
  const f = fixture();
  f.run(5);
  check("옮기기 전에는 성공이 아님", f.game.phase === "playing");
  // 라인 앞에서 서성이기만 하면 골이 아니다 (예전 거리 판정이면 여기서 들어갔다)
  f.body.position.set(GOAL_X, 1.1, GOAL_Z + 1.2);
  f.run(0.6);
  check("라인 앞에 있기만 하면 성공이 아님", f.game.phase === "playing", f.game.phase);
  crossGoal(f);
  check("골라인을 넘으면 성공", f.game.phase === "success", f.game.phase);
  check("결과 화면이 뜸", el("result").hidden === false);
  check("결과 제목이 '성공!'", el("result-title").textContent === "성공!", el("result-title").textContent);
  check("남은 시간이 결과에 표시됨", el("result-sub").textContent.includes("남은 시간"), el("result-sub").textContent);

  // 결과가 난 뒤에는 타이머가 멈춘다
  const t0 = f.game.snapshot().t;
  f.run(3);
  check("성공 뒤에는 타이머가 멈춤", f.game.snapshot().t === t0, `${t0} -> ${f.game.snapshot().t}`);
}

console.log("\n--- TEST 4: 오판정 방지 ---");
{
  const f = fixture();
  // 한 프레임만 스쳐 지나가는 경우
  f.body.position.set(GOAL_X, 1.1, GOAL_Z);
  f.run(1 / 60);
  f.body.position.set(0, 1.1, -4);
  f.run(1);
  check("한 프레임 스쳐 지나가면 성공 아님", f.game.phase === "playing", f.game.phase);

  // 벽 너머로 던져 넘긴 경우 (y 상한 초과)
  f.body.position.set(GOAL_X, 5.0, GOAL_Z);
  f.run(1);
  check("높이 상한 위로 지나가면 성공 아님", f.game.phase === "playing", f.game.phase);

  // 골대 옆으로 빗나가면 골이 아니다 (골라인 폭 밖)
  crossGoal(f, GOAL_X - 9);
  check("골대 옆으로 지나가면 성공 아님", f.game.phase === "playing", f.game.phase);

  // 골대 폭 안으로 넘으면 성공
  crossGoal(f, GOAL_X - 1.2);
  check("골대 폭 안으로 넘으면 성공", f.game.phase === "success", f.game.phase);
}

console.log("\n--- TEST 5: 시간 초과 실패 ---");
{
  const f = fixture();
  f.run(TIME_LIMIT - 1);
  check("1초 남았을 때는 아직 진행중", f.game.phase === "playing", f.game.phase);
  check("남은 시간 30초 이하면 urgent 표시", el("timer").classList.has("urgent"));
  f.run(1.2);
  check("시간이 다 되면 실패", f.game.phase === "fail", f.game.phase);
  check("타이머가 0:00", el("timer").textContent === "0:00", el("timer").textContent);
  check("결과 제목이 '실패!'", el("result-title").textContent === "실패!", el("result-title").textContent);
  check("남은 시간은 음수로 내려가지 않음", f.game.snapshot().t === 0, `t=${f.game.snapshot().t}`);
}

console.log("\n--- TEST 6: 다시하기 ---");
{
  const f = fixture();
  f.run(TIME_LIMIT + 1);
  check("실패 상태", f.game.phase === "fail");
  el("retry").click();
  check("월드 리셋이 호출됨", f.resets.n === 1, `n=${f.resets.n}`);
  check("다시 진행중", f.game.phase === "playing", f.game.phase);
  check("타이머가 리셋됨", f.game.snapshot().t === TIME_LIMIT, `t=${f.game.snapshot().t}`);
  f.run(0.1);
  check("결과 화면이 닫힘", el("result").hidden === true);
  check("urgent 표시가 해제됨", !el("timer").classList.has("urgent"));

  // 리셋 뒤에도 정상적으로 다시 성공할 수 있어야 한다
  crossGoal(f);
  check("리셋 뒤에도 성공 판정이 다시 동작", f.game.phase === "success", f.game.phase);
  el("retry").click();
  check("성공 뒤 다시하기도 동작", f.game.phase === "playing" && f.resets.n === 2, `n=${f.resets.n}`);
}

console.log("\n--- TEST 7: 비-host는 판정하지 않고 따라간다 ---");
{
  const f = fixture(false);   // authority = false
  f.run(10);
  check("비-host는 타이머를 직접 세지 않음", f.game.snapshot().t === TIME_LIMIT, `t=${f.game.snapshot().t}`);

  f.body.position.set(GOAL_X, 1.1, GOAL_Z);
  f.run(2);
  check("비-host는 스스로 성공 판정하지 않음", f.game.phase === "playing", f.game.phase);

  f.game.applyRemote({ phase: "playing", t: 42.5 });
  f.run(1 / 60);
  check("host 스냅샷의 남은 시간을 따라감", Math.abs(f.game.snapshot().t - 42.5) < 0.001, `t=${f.game.snapshot().t}`);
  check("타이머 표기도 따라감", el("timer").textContent === "0:43", el("timer").textContent);

  f.game.applyRemote({ phase: "success", t: 40 });
  f.run(1 / 60);
  check("host가 성공이면 비-host도 성공 화면", f.game.phase === "success" && el("result").hidden === false);

  // 비-host의 [다시하기]는 직접 리셋하지 않고 host에게 요청만 한다
  el("retry").click();
  check("비-host는 월드를 직접 리셋하지 않음", f.resets.n === 0, `n=${f.resets.n}`);
  check("host에게 재시작을 요청함", f.remoteRestarts.n === 1, `n=${f.remoteRestarts.n}`);
  check("요청만 보냈으므로 아직 성공 상태 유지", f.game.phase === "success", f.game.phase);

  // host가 리셋해서 보낸 스냅샷을 받으면 그때 결과 화면이 닫힌다
  f.game.applyRemote({ phase: "playing", t: TIME_LIMIT });
  f.run(1 / 60);
  check("host 스냅샷으로 결과 화면이 닫힘", f.game.phase === "playing" && el("result").hidden === true);
}

console.log("\n--- TEST 8: host 이양 ---");
{
  const f = fixture(false);
  f.game.applyRemote({ phase: "playing", t: 100 });
  f.run(1 / 60);
  // 원래 host가 나가서 이 클라이언트가 host가 된 상황
  f.authority.on = true;
  f.run(5);
  const t = f.game.snapshot().t;
  check("이양받으면 마지막으로 받은 시간에서 이어서 센다", Math.abs(t - 95) < 0.2, `t=${t}`);
  crossGoal(f);
  check("이양 뒤에는 스스로 판정한다", f.game.phase === "success", f.game.phase);
}

console.log("\n--- TEST 9: 협동 골 (둘 다 공을 건드려야 인정) ---");
{
  // [game.ts 는 규칙을 모른다] 여기서 하는 것은 골라인 통과라는 기하학뿐이고,
  // "인정되는가"는 훅으로 물어본다 (누가 언제 공을 건드렸는지는 래그돌과 공을
  // 가진 main.ts 만 안다). 그 계약이 지켜지는지를 검사한다.
  const f = fixture();
  f.goalOk.on = false;
  crossGoal(f);
  check("인정 안 되면 성공이 아니다", f.game.phase === "playing", f.game.phase);
  check("거절 훅이 불린다 (공을 되돌릴 기회를 준다)", f.rejects.n === 1, `${f.rejects.n}회`);

  // 조건이 채워지면 (친구가 공을 건드리면) 그 다음 골은 들어간다
  f.goalOk.on = true;
  crossGoal(f);
  check("인정되면 성공한다", f.game.phase === "success", f.game.phase);
  check("인정된 골에는 거절 훅이 안 불린다", f.rejects.n === 1, `${f.rejects.n}회`);
}
{
  // 훅을 아예 안 주면 예전 그대로 전부 인정된다 (기존 스테이지가 안 바뀐다)
  const scene = new THREE.Scene();
  const body = new CANNON.Body({
    mass: 20, shape: new CANNON.Box(new CANNON.Vec3(0.6, 1.1, 0.5)),
    position: new CANNON.Vec3(0, 1.1, -4),
  });
  const world = {
    scene,
    objectById: new Map([[TARGET_ID, { id: TARGET_ID, mesh: new THREE.Group(), body, grabRadius: 2.4, mass: 20 }]]),
    mapIndex: 0, map: RULE_MAPS[0], mapCount: RULE_MAPS.length,
    loadMap: () => {}, onMapLoaded: () => {},
  } as unknown as World;
  const g = createGame(world, {
    isAuthority: () => true,
    resetWorld: () => {},
    requestRestartRemote: () => {},
  });
  const DT = 1 / 60;
  body.position.set(GOAL_X, 1.1, GOAL_Z + 1.5); g.update(DT);
  body.position.set(GOAL_X, 1.1, GOAL_Z - 0.5); g.update(DT);
  check("협동 골 훅이 없으면 예전 그대로 인정된다", g.phase === "success", g.phase);
}

console.log("\n--- TEST 10: 체크포인트가 스냅샷으로 나른다 ---");
{
  // 판정은 main.ts 가 한다(사람이 **전부** 그 선을 넘었는가). game.ts 는 그
  // 결과를 스냅샷에 싣고, 받는 쪽에 그대로 넘겨주기만 한다 — 한쪽 화면에서만
  // 체크포인트가 잡히는 일이 없어야 하기 때문이다.
  const host = fixture(true);
  check("처음엔 없다 (-1)", host.game.snapshot().c === -1, `${host.game.snapshot().c}`);
  host.checkpoint.n = 1;
  check("host 가 정한 값이 스냅샷에 실린다", host.game.snapshot().c === 1, `${host.game.snapshot().c}`);

  const guest = fixture(false);
  guest.game.applyRemote(host.game.snapshot());
  check("비-host 가 그 값을 그대로 받는다", guest.checkpoint.n === 1, `${guest.checkpoint.n}`);

  // host 는 자기 계산이 우선이다 (남이 보낸 값에 안 흔들린다)
  const other = fixture(true);
  other.checkpoint.n = 0;
  other.game.applyRemote({ phase: "playing", t: 100, m: 0, c: 2 });
  check("host 는 남이 보낸 체크포인트를 안 받는다", other.checkpoint.n === 0, `${other.checkpoint.n}`);

  // 옛 클라이언트(c 없음)가 보내도 안 깨진다
  const old = fixture(false);
  old.checkpoint.n = 1;
  old.game.applyRemote({ phase: "playing", t: 50, m: 0 });
  check("c 가 없는 스냅샷은 값을 안 건드린다", old.checkpoint.n === 1, `${old.checkpoint.n}`);
}

console.log(`\nRESULT: ${pass} passed, ${fail} failed`);
if (fail > 0) process.exit(1);
