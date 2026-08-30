import WebSocket from "ws";
import { spawn } from "node:child_process";

const PORT = 8093;
const URL = `ws://127.0.0.1:${PORT}`;

let pass = 0, fail = 0;
function check(name, cond, extra = "") {
  if (cond) { pass++; console.log(`  PASS  ${name}`); }
  else { fail++; console.log(`  FAIL  ${name} ${extra}`); }
}
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// 서버가 방 단위로 격리되므로 테스트 클라이언트도 방을 지정해서 붙는다.
//   create=1  -> 새 방을 만들고 그 코드를 welcome으로 받는다
//   room=CODE -> 그 방에 참가한다
function client(query = "create=1") {
  const ws = new WebSocket(`${URL}/?${query}`);
  const inbox = [];
  ws.on("message", (raw) => inbox.push(JSON.parse(raw.toString())));
  return {
    ws, inbox,
    open: () => new Promise((res, rej) => { ws.once("open", res); ws.once("error", rej); }),
    send: (o) => ws.send(JSON.stringify(o)),
    take: (t) => inbox.filter((m) => m.type === t),
    clear: () => (inbox.length = 0),
    close: () => ws.close(),
  };
}

const server = spawn("node", ["server/server.js"], {
  env: { ...process.env, PORT: String(PORT) },
  stdio: ["ignore", "pipe", "pipe"],
});
server.stdout.on("data", (d) => process.stdout.write(`  [srv] ${d}`));

try {
  await sleep(700);

  console.log("\n--- TEST 1: 접속 / ID 할당 / host 지정 ---");
  const A = client("create=1"); await A.open(); await sleep(200);
  const wA = A.take("welcome")[0];
  check("A welcome 수신", !!wA);
  check("방 코드를 받는다 (4자리)", /^[A-Z0-9]{4}$/.test(wA?.room ?? ""));
  const ROOM = wA?.room;
  check("A id = 1", wA?.id === 1);
  check("A가 host", wA?.hostId === 1);

  const B = client(`room=${ROOM}`); await B.open(); await sleep(200);
  const wB = B.take("welcome")[0];
  check("B id = 2", wB?.id === 2);
  check("B가 host를 1로 인지", wB?.hostId === 1);
  check("B가 기존 플레이어 [1] 인지", JSON.stringify(wB?.players) === "[1]");
  check("A가 playerJoined(2) 수신", A.take("playerJoined").some((m) => m.id === 2));

  console.log("\n--- TEST 2: 입력은 host에게만 전달된다 (서로조종의 전제) ---");
  A.clear(); B.clear();
  B.send({ type: "input", input: { mx: 1, mz: 0, jump: true, grab: false } });
  await sleep(200);
  const inp = A.take("input")[0];
  check("host(A)가 B의 입력 수신", !!inp);
  check("입력에 보낸 사람 id 포함", inp?.id === 2);
  check("입력 값 보존 (mx)", inp?.input.mx === 1);
  check("입력 값 보존 (jump)", inp?.input.jump === true);
  check("B는 자기 입력을 되돌려받지 않음", B.take("input").length === 0);

  console.log("\n--- TEST 3: host 자신의 입력은 릴레이하지 않는다 (자기 루프 방지) ---");
  A.clear(); B.clear();
  A.send({ type: "input", input: { mx: 0, mz: 1, jump: false, grab: true } });
  await sleep(200);
  check("host의 입력은 아무에게도 전달 안 됨",
    A.take("input").length === 0 && B.take("input").length === 0);

  console.log("\n--- TEST 4: 스냅샷은 host만 보낼 수 있다 ---");
  A.clear(); B.clear();
  const snap = {
    type: "snapshot",
    ragdolls: [{ id: 1, b: new Array(105).fill(0.5), st: "ACTIVE" }],
    objects: [{ id: 3, p: [0, 1, 0], r: [0, 0, 0, 1] }],
    game: { phase: "playing", t: 137.4 },
  };
  A.send(snap);
  await sleep(200);
  const got = B.take("snapshot")[0];
  check("host 스냅샷이 B에게 전달됨", !!got);
  check("래그돌 105개 float 보존", got?.ragdolls[0].b.length === 105);
  check("래그돌 상태 문자열 보존", got?.ragdolls[0].st === "ACTIVE");
  check("오브젝트 상태 보존", got?.objects[0].id === 3);
  check("게임 상태(phase) 보존", got?.game?.phase === "playing", JSON.stringify(got?.game));
  check("게임 상태(남은 시간) 보존", got?.game?.t === 137.4, JSON.stringify(got?.game));

  A.clear(); B.clear();
  B.send({ ...snap, ragdolls: [{ id: 2, b: new Array(105).fill(9), st: "RAGDOLL" }] });
  await sleep(200);
  check("비-host의 스냅샷은 무시됨 (권위 위조 차단)", A.take("snapshot").length === 0);

  console.log("\n--- TEST 4b: [다시하기] 요청 릴레이 ---");
  A.clear(); B.clear();
  B.send({ type: "restart" });
  await sleep(200);
  check("비-host의 restart가 host에게 전달됨", A.take("restart").some((m) => m.id === 2));
  check("restart를 보낸 본인은 되돌려받지 않음", B.take("restart").length === 0);

  A.clear(); B.clear();
  A.send({ type: "restart" });
  await sleep(200);
  check("host의 restart는 아무에게도 전달 안 됨 (자기가 바로 실행)",
    A.take("restart").length === 0 && B.take("restart").length === 0);

  console.log("\n--- TEST 5: ping/pong ---");
  A.clear();
  const t0 = Date.now();
  A.send({ type: "ping", t: t0 });
  await sleep(200);
  check("pong 수신 + timestamp 반환", A.take("pong")[0]?.t === t0);

  console.log("\n--- TEST 6: host 퇴장 시 이양 ---");
  B.clear();
  A.close();
  await sleep(350);
  check("B가 playerLeft(1) 수신", B.take("playerLeft").some((m) => m.id === 1));
  check("host가 B(2)로 이양됨", B.take("host")[0]?.hostId === 2);

  console.log("\n--- TEST 7: 이양 후 새 host가 스냅샷 권한을 갖는가 ---");
  const C = client(`room=${ROOM}`); await C.open(); await sleep(250);
  B.clear(); C.clear();
  B.send(snap);
  await sleep(200);
  check("새 host(B)의 스냅샷이 C에게 전달됨", C.take("snapshot").length === 1);

  C.clear();
  C.send({ type: "input", input: { mx: -1, mz: 0, jump: false, grab: false } });
  await sleep(200);
  check("C의 입력이 새 host(B)에게 전달됨", B.take("input").some((m) => m.id === 3));

  B.close(); C.close();
  await sleep(200);
} finally {
  server.kill();
}

console.log(`\nRESULT: ${pass} passed, ${fail} failed`);
process.exit(fail === 0 ? 0 : 1);
