/**
 * 한 번에: WebSocket 서버 + Vite dev(tunnel 모드) + Cloudflare 무료 터널을 띄우고
 * 친구에게 보낼 링크 하나를 출력한다.
 *
 *   npm run share
 *
 * Ctrl+C 한 번이면 셋 다 정리된다. 로컬 개발(`npm run dev`)은 이 스크립트와
 * 무관하게 그대로 쓸 수 있다.
 *
 * - Cloudflare 계정/로그인 불필요. cloudflared 바이너리는 자동으로 받는다.
 * - 나오는 URL 은 실행할 때마다 바뀐다 (예: https://xxxx.trycloudflare.com).
 */
import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";
import net from "node:net";
import { createServer } from "vite";
import { startQuickTunnel } from "./_cloudflared.mjs";

const WS_PORT = Number(process.env.WS_PORT || 8080);
const WEB_PORT = Number(process.env.PORT || 5173);
const CONFIG = fileURLToPath(new URL("../vite.config.ts", import.meta.url));

// 한글 등 CJK 문자는 터미널에서 2칸을 먹으므로 너비 계산에 반영한다
const wide = (cp) => (cp >= 0x1100 && cp <= 0x115f) || (cp >= 0x2e80 && cp <= 0x9fff)
  || (cp >= 0xac00 && cp <= 0xd7a3) || (cp >= 0xf900 && cp <= 0xfaff) || (cp >= 0xff00 && cp <= 0xff60);
const vw = (s) => [...s].reduce((n, c) => n + (wide(c.codePointAt(0)) ? 2 : 1), 0);
const box = (lines) => {
  const w = Math.max(...lines.map(vw)) + 2;
  const bar = "─".repeat(w);
  console.log(`\n┌${bar}┐`);
  for (const l of lines) console.log(`│ ${l}${" ".repeat(Math.max(0, w - 1 - vw(l)))}│`);
  console.log(`└${bar}┘\n`);
};
const waitPort = async (port, tries = 60) => {
  for (let i = 0; i < tries; i++) {
    const ok = await new Promise((r) => {
      const s = net.connect(port, "127.0.0.1", () => { s.destroy(); r(true); });
      s.on("error", () => r(false));
    });
    if (ok) return true;
    await new Promise((r) => setTimeout(r, 400));
  }
  return false;
};

// 1) WebSocket 릴레이 서버 (server/server.js) — 하위 프로세스
const server = spawn("node", ["server/server.js"], {
  stdio: ["ignore", "pipe", "pipe"], env: { ...process.env, PORT: String(WS_PORT) },
});
server.stdout.on("data", (d) => String(d).trim().split("\n").forEach((l) => console.log(`  [server] ${l}`)));
server.stderr.on("data", (d) => console.log(`  [server!] ${String(d).trim()}`));

// 2) Vite dev 서버 (tunnel 모드 = HMR 끔). /ws 는 :8080 으로 proxy (vite.config.ts)
const vite = await createServer({
  configFile: CONFIG,
  mode: "tunnel",
  logLevel: "info",
  server: { port: WEB_PORT, strictPort: true },
});
await vite.listen();
console.log(`  [vite] http://localhost:${WEB_PORT}  (mode=tunnel, HMR off)`);

if (!(await waitPort(WS_PORT))) { console.error(`WebSocket 서버(:${WS_PORT})가 안 떴다.`); await shutdown(1); }

// 3) Cloudflare 터널 (cloudflared 를 직접 실행)
const tunnel = await startQuickTunnel(WEB_PORT).catch((e) => {
  console.error("터널을 못 열었다:", e.message);
  return null;
});
if (!tunnel) await shutdown(1);

box([
  "친구에게 이 링크 하나만 보내면 된다:",
  "",
  `  ${tunnel.url}`,
  "",
  "1) 위 링크를 연다 (방장)  →  캐릭터 선택  →  [방 만들기]",
  "2) 대기실 안내줄의 주소(#코드 포함)를 눌러 복사 → 친구에게 전송",
  "3) 친구가 그 주소를 열면 곧바로 같은 방으로 들어온다  →  [게임 시작]",
  "",
  `로컬:  http://localhost:${WEB_PORT}      WS 서버:  :${WS_PORT}`,
  "끄려면 이 창에서 Ctrl+C",
]);

// cloudflared 가 죽으면 알리되, 우리는 안 죽는다 (링크만 다시 실행하면 됨)
tunnel.proc.on("exit", (c) => console.log(`  [tunnel] cloudflared 종료(${c}). 다시 열려면 npm run share`));

let stopping = false;
async function shutdown(code = 0) {
  if (stopping) return;
  stopping = true;
  clearInterval(keepAlive);
  try { tunnel?.stop(); } catch { /* */ }
  try { await vite?.close(); } catch { /* */ }
  try { server.kill(); } catch { /* */ }
  process.exit(code);
}
process.on("SIGINT", () => shutdown(0));
process.on("SIGTERM", () => shutdown(0));
process.on("SIGBREAK", () => shutdown(0));   // Windows: Ctrl+Break
process.on("unhandledRejection", (e) => console.error("unhandledRejection:", e));
const keepAlive = setInterval(() => {}, 1 << 30);   // 이벤트 루프를 붙잡아 둔다
