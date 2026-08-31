/**
 * 로컬 Vite dev 서버(기본 :5173)를 Cloudflare 무료 quick tunnel로 인터넷에 노출한다.
 *
 * 이미 `npm run server` + `npm run dev:tunnel` 을 따로 띄운 상태에서 이 스크립트만
 * 돌리면 된다. (셋 다 한 번에: `npm run share`)
 *
 * - 계정/로그인 불필요. cloudflared 바이너리는 자동으로 받는다.
 * - 나오는 URL 은 실행할 때마다 바뀐다 (예: https://xxxx.trycloudflare.com).
 * - HTTPS 이므로 클라이언트는 자동으로 wss:// 를 쓰고, /ws 는 vite proxy 가
 *   server/server.js(:8080)로 넘긴다 (vite.config.ts 참고).
 */
import { startQuickTunnel } from "./_cloudflared.mjs";

const PORT = Number(process.env.PORT || 5173);

const tunnel = await startQuickTunnel(PORT).catch((e) => {
  console.error("터널을 못 열었다:", e.message);
  process.exit(1);
});

console.log("\n" + "=".repeat(62));
console.log("  친구에게 보낼 링크 (실행마다 바뀜):");
console.log(`\n    ${tunnel.url}\n`);
console.log("  방장: 링크 열기 -> 캐릭터 선택 -> [방 만들기]");
console.log("  그 다음 대기실 안내줄의 주소(#코드 포함)를 복사해 친구에게 전송.");
console.log("  끄려면 이 창에서 Ctrl+C");
console.log("=".repeat(62) + "\n");

tunnel.proc.on("exit", (c) => { console.log(`  cloudflared 종료(${c}).`); process.exit(c ?? 0); });

const keepAlive = setInterval(() => {}, 1 << 30);
const stop = () => { clearInterval(keepAlive); try { tunnel.stop(); } catch { /* */ } process.exit(0); };
process.on("SIGINT", stop);
process.on("SIGTERM", stop);
process.on("SIGBREAK", stop);
