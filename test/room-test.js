/**
 * 방(room) 격리 테스트.
 *
 * server.js를 실제로 띄우고 WebSocket 클라이언트를 여러 개 붙여서
 *  - 방 만들기가 4자리 코드를 돌려주는지
 *  - 같은 코드로 들어간 둘이 서로를 보는지
 *  - 다른 코드끼리는 입력/스냅샷이 절대 섞이지 않는지
 *  - 대기실 [게임 시작]이 그 방에만 퍼지는지
 * 를 확인한다.
 *
 * 브라우저 탭 2개로 하는 확인과 같은 내용을 자동화한 것이다.
 */
import { spawn } from "node:child_process";
import { WebSocket } from "ws";

const PORT = 8123;
const URL = `ws://127.0.0.1:${PORT}`;

let pass = 0, fail = 0;
function check(name, cond) {
  if (cond) { pass++; console.log(`  PASS  ${name}`); }
  else { fail++; console.log(`  FAIL  ${name}`); }
}
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

/** 받은 메시지를 전부 모아두는 테스트용 클라이언트 */
function client(query) {
  const ws = new WebSocket(`${URL}/?${query}`);
  const msgs = [];
  ws.on("message", (raw) => msgs.push(JSON.parse(raw.toString())));
  return {
    ws, msgs,
    open: new Promise((res) => { ws.on("open", res); ws.on("error", res); }),
    send: (o) => ws.readyState === ws.OPEN && ws.send(JSON.stringify(o)),
    of: (type) => msgs.filter((m) => m.type === type),
    last: (type) => msgs.filter((m) => m.type === type).pop(),
    close: () => ws.close(),
  };
}

const server = spawn(process.execPath, ["server/server.js"], {
  env: { ...process.env, PORT: String(PORT) },
  stdio: ["ignore", "pipe", "pipe"],
});
server.stdout.on("data", () => {});
server.stderr.on("data", (d) => process.stderr.write(d));

async function main() {
  await sleep(600);

  // ------------------------------------------------------------ 방 만들기
  console.log("\n--- TEST 1: 방 만들기 ---");
  const hostA = client("create=1");
  await hostA.open; await sleep(200);
  const welA = hostA.last("welcome");
  check("welcome를 받는다", !!welA);
  check("4자리 방 코드를 돌려준다", !!welA && /^[A-Z0-9]{4}$/.test(welA.room));
  check("만든 사람이 host다", !!welA && welA.hostId === welA.id);
  check("처음엔 혼자다", !!welA && welA.players.length === 0);
  const codeA = welA.room;

  // 두 번째 방은 다른 코드여야 한다
  const hostB = client("create=1");
  await hostB.open; await sleep(200);
  const codeB = hostB.last("welcome").room;
  check("방마다 코드가 다르다", codeA !== codeB);

  // ------------------------------------------------------------ 같은 코드로 참가
  console.log("\n--- TEST 2: 같은 코드로 들어가면 만난다 ---");
  const guestA = client(`room=${codeA}`);
  await guestA.open; await sleep(250);
  const welG = guestA.last("welcome");
  check("참가자도 welcome를 받는다", !!welG);
  check("같은 방 코드다", !!welG && welG.room === codeA);
  check("참가자는 방장을 명단에서 본다", !!welG && welG.players.includes(welA.id));
  check("참가자의 host는 방장이다", !!welG && welG.hostId === welA.id);
  check("방장에게 playerJoined가 간다", hostA.of("playerJoined").some((m) => m.id === welG.id));
  check("다른 방(B)에는 아무 소식도 없다", hostB.of("playerJoined").length === 0);

  // 소문자로 입력해도 들어가진다 (사람이 손으로 치는 코드라서)
  const guestLower = client(`room=${codeA.toLowerCase()}`);
  await guestLower.open; await sleep(250);
  check("소문자 코드도 같은 방으로 들어간다", guestLower.last("welcome")?.room === codeA);
  guestLower.close();
  await sleep(200);

  // ------------------------------------------------------------ 격리
  console.log("\n--- TEST 3: 다른 코드끼리는 섞이지 않는다 ---");
  const guestB = client(`room=${codeB}`);
  await guestB.open; await sleep(250);

  // 각 방의 비-host가 입력을 보낸다
  guestA.send({ type: "input", input: { mx: 1, mz: 0, jump: false, grab: false } });
  guestB.send({ type: "input", input: { mx: -1, mz: 0, jump: false, grab: false } });
  await sleep(250);

  const inA = hostA.of("input"), inB = hostB.of("input");
  check("A방 host는 A방 입력만 받는다", inA.length === 1 && inA[0].id === welG.id && inA[0].input.mx === 1);
  check("B방 host는 B방 입력만 받는다", inB.length === 1 && inB[0].input.mx === -1);

  // host가 스냅샷을 보낸다
  hostA.send({ type: "snapshot", ragdolls: [{ id: 1, b: [], st: "ACTIVE" }], objects: [], game: { phase: "playing", t: 42 } });
  await sleep(250);
  check("A방 참가자는 A방 스냅샷을 받는다", guestA.of("snapshot").length === 1);
  check("B방 참가자는 A방 스냅샷을 못 받는다", guestB.of("snapshot").length === 0);
  check("B방 host도 A방 스냅샷을 못 받는다", hostB.of("snapshot").length === 0);

  // ------------------------------------------------------------ 대기실 시작
  console.log("\n--- TEST 4: [게임 시작]은 그 방에만 퍼진다 ---");
  guestA.send({ type: "startGame" });      // 비-host는 시작할 수 없다
  await sleep(250);
  check("비-host의 startGame은 무시된다", guestA.of("gameStart").length === 0);

  hostA.send({ type: "startGame" });
  await sleep(250);
  check("A방 host가 시작하면 host도 받는다", hostA.of("gameStart").length === 1);
  check("A방 참가자도 받는다", guestA.of("gameStart").length === 1);
  check("B방은 시작되지 않는다", hostB.of("gameStart").length === 0 && guestB.of("gameStart").length === 0);

  // 이미 시작된 방에 늦게 들어오면 바로 게임 화면으로
  const late = client(`room=${codeA}`);
  await late.open; await sleep(250);
  check("늦게 들어온 사람은 곧바로 gameStart를 받는다", late.of("gameStart").length === 1);
  late.close();
  await sleep(200);

  // ------------------------------------------------------------ 잘못된 코드
  console.log("\n--- TEST 5: 잘못된 코드 ---");
  const noRoom = client("room=ZZZZ");
  await noRoom.open; await sleep(250);
  check("없는 방이면 joinError(noRoom)", noRoom.last("joinError")?.reason === "noRoom");

  const badCode = client("room=AB");
  await badCode.open; await sleep(250);
  check("형식이 틀리면 joinError(badCode)", badCode.last("joinError")?.reason === "badCode");

  const noQuery = client("");
  await noQuery.open; await sleep(250);
  check("코드가 아예 없어도 joinError", noQuery.of("joinError").length === 1);

  // ------------------------------------------------------------ host 이양 / 방 정리
  console.log("\n--- TEST 6: host 이양과 빈 방 정리 ---");
  hostA.close();
  await sleep(300);
  check("host가 나가면 남은 사람에게 이양된다", guestA.last("host")?.hostId === welG.id);

  guestA.close();
  await sleep(300);
  // 방이 지워졌으면 같은 코드로는 못 들어간다
  const reuse = client(`room=${codeA}`);
  await reuse.open; await sleep(250);
  check("빈 방은 지워진다 (같은 코드로 못 들어감)", reuse.last("joinError")?.reason === "noRoom");
  check("B방은 그대로 살아있다", hostB.ws.readyState === hostB.ws.OPEN);

  for (const c of [hostB, guestB, reuse, noRoom, badCode, noQuery]) c.close();
  await sleep(200);

  console.log(`\nRESULT: ${pass} passed, ${fail} failed`);
  server.kill();
  process.exit(fail === 0 ? 0 : 1);
}

main().catch((e) => { console.error(e); server.kill(); process.exit(1); });
