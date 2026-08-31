/**
 * 인터넷 멀티 접속 환경 테스트.
 *
 *  1) wsBase() 가 페이지 스킴/호스트/포트에 따라 올바른 WebSocket 주소를 만든다
 *     (http→ws, https→wss, /ws 프록시 경로, 8080 직결)
 *  2) server/server.js 가 `/ws/?create=1` 같은 프록시 경로에서도 정상 동작한다
 *  3) Vite dev 서버의 /ws 프록시를 통해 **서로 다른 두 클라이언트**가 같은 방에
 *     접속한다 (친구 = 두 번째 브라우저 시나리오)
 */
import { spawn } from "node:child_process";
import { WebSocket } from "ws";
import { build } from "esbuild";

let pass = 0, fail = 0;
const ok = (n, c, x = "") => { if (c) { pass++; console.log(`  PASS  ${n}`); } else { fail++; console.log(`  FAIL  ${n} ${x}`); } };
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// ---------------------------------------------------------------- 1. wsBase()
{
  console.log("\n--- wsBase(): 페이지 기준으로 WS 주소를 만든다 ---");
  const bundled = await build({
    entryPoints: ["client/src/ws-url.ts"], bundle: true, write: false,
    format: "esm", platform: "neutral",
  });
  const mod = await import(`data:text/javascript;base64,${Buffer.from(bundled.outputFiles[0].text).toString("base64")}`);
  const { wsBase } = mod;

  ok("로컬 http:5173 → ws://localhost:5173/ws",
    wsBase({ protocol: "http:", host: "localhost:5173", port: "5173" }) === "ws://localhost:5173/ws");
  ok("터널 https → wss://<host>/ws (혼합콘텐츠 회피)",
    wsBase({ protocol: "https:", host: "abc.trycloudflare.com", port: "" }) === "wss://abc.trycloudflare.com/ws");
  ok("LAN http://192.168.x:5173 → ws://192.168.x:5173/ws",
    wsBase({ protocol: "http:", host: "192.168.1.20:5173", port: "5173" }) === "ws://192.168.1.20:5173/ws");
  ok("8080으로 직접 연 페이지 → 서버 직결 (프록시 경로 안 씀)",
    wsBase({ protocol: "http:", host: "localhost:8080", port: "8080" }) === "ws://localhost:8080");
}

// ---------------------------------------------------------------- 서버 기동
const PORT = 8097;
const server = spawn("node", ["server/server.js"], {
  env: { ...process.env, PORT: String(PORT) }, stdio: ["ignore", "pipe", "pipe"],
});
server.stdout.on("data", (d) => process.stdout.write(`  [srv] ${d}`));
server.stderr.on("data", (d) => process.stdout.write(`  [srv!] ${d}`));

const clients = [];
function client(base, query) {
  const ws = new WebSocket(`${base}/?${query}`);
  const inbox = [];
  ws.on("message", (raw) => inbox.push(JSON.parse(raw.toString())));
  clients.push(ws);
  return {
    ws, inbox,
    open: () => new Promise((res, rej) => { ws.once("open", res); ws.once("error", rej); }),
    take: (t) => inbox.filter((m) => m.type === t),
  };
}

let vite;
try {
  await sleep(700);

  // ------------------------------------------------ 2. 서버가 /ws 경로에서도 동작
  console.log("\n--- 서버: /ws/?create=1 프록시 경로에서도 방이 만들어진다 ---");
  const D = client(`ws://127.0.0.1:${PORT}/ws`, "create=1");
  await D.open(); await sleep(250);
  const wD = D.take("welcome")[0];
  ok("`/ws/?create=1` 로 welcome 수신 + 방 코드", !!wD && /^[A-Z0-9]{4}$/.test(wD?.room ?? ""), JSON.stringify(wD));

  // ------------------------------------------------ 3. Vite /ws 프록시로 2인 접속
  //
  // vite.config.ts 와 **같은 proxy 설정**을 인라인으로 재현한다 (configFile 경로
  // 문제를 피하려고). 핵심은 `"/ws": { target, ws: true }` 한 줄이 실제로
  // WebSocket 업그레이드를 릴레이하는지 확인하는 것.
  console.log("\n--- Vite dev 서버의 /ws 프록시로 서로 다른 두 클라이언트 접속 ---");
  const { createServer } = await import("vite");
  vite = await createServer({
    configFile: false,
    root: "client",
    logLevel: "silent",
    server: {
      port: 5211, strictPort: true, host: "127.0.0.1", hmr: false,
      proxy: { "/ws": { target: `ws://localhost:${PORT}`, ws: true, changeOrigin: true } },
    },
  });
  await vite.listen();
  await sleep(500);

  const base = "ws://127.0.0.1:5211/ws";
  const A = client(base, "create=1");
  await A.open(); await sleep(400);
  const wA = A.take("welcome")[0];
  ok("A: 프록시(ws://…:5211/ws)로 방 생성", !!wA && /^[A-Z0-9]{4}$/.test(wA?.room ?? ""), JSON.stringify(wA));
  const ROOM = wA?.room;
  ok("A가 자기 방의 host (id === hostId)", wA?.id != null && wA.id === wA.hostId);

  const B = client(base, `room=${ROOM}`);
  await B.open(); await sleep(400);
  const wB = B.take("welcome")[0];
  ok("B: 같은 링크(#코드)로 같은 방 참가", wB?.room === ROOM);
  ok("B는 A와 다른 접속자다 (id 다름)", wB?.id != null && wB.id !== wA?.id);
  ok("B가 host를 A로 인지", wB?.hostId === wA?.id);
  ok("A가 playerJoined(B) 수신 (친구가 들어옴)", A.take("playerJoined").some((m) => m.id === wB?.id));

  // 릴레이가 방 안에서 실제로 도는가 (입력 → host)
  A.inbox.length = 0;
  B.ws.send(JSON.stringify({ type: "input", input: { mx: 1, mz: 0, jump: false } }));
  await sleep(300);
  ok("B의 입력이 프록시를 거쳐 host A에게 전달됨", A.take("input").some((m) => m.id === wB?.id));
} catch (e) {
  fail++;
  console.log(`  FAIL  예외: ${e?.stack || e}`);
} finally {
  for (const ws of clients) { try { ws.close(); } catch { /* */ } }
  try { await vite?.close(); } catch { /* */ }
  server.kill();
}

console.log(`\nRESULT: ${pass} passed, ${fail} failed`);
process.exit(fail === 0 ? 0 : 1);
