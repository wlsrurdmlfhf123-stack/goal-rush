import { defineConfig } from "vite";

/**
 * WebSocket 릴레이 서버(server/server.js, 기본 :8080)를 **페이지와 같은 origin의
 * `/ws` 경로로 프록시**한다.
 *
 * 이렇게 하면:
 *  - 클라이언트는 8080 포트를 몰라도 된다 (menu.ts wsBase 참고)
 *  - 터널(Cloudflare 등)을 dev 포트(5173) 하나에만 걸면 페이지 + WebSocket이
 *    같은 HTTPS URL 하나로 나간다 → 친구에게 줄 링크가 하나
 *  - 로컬 개발도 그대로: http://localhost:5173 → /ws → (proxy) → ws://localhost:8080
 *
 * WS_TARGET 환경변수로 대상 서버를 바꿀 수 있다 (기본 ws://localhost:8080).
 */
const WS_TARGET = process.env.WS_TARGET || "ws://localhost:8080";

const wsProxy = {
  "/ws": { target: WS_TARGET, ws: true, changeOrigin: true },
};

/**
 * Vite 의 DNS-rebinding 방어(server.allowedHosts)를 통과시킬 호스트.
 *
 * localhost / 127.0.0.1 / *.localhost 는 Vite 가 항상 허용하므로 로컬 개발은
 * 영향 없다. Cloudflare quick tunnel 은 매번 바뀌는 `xxxx.trycloudflare.com`
 * 서브도메인을 쓰므로, 특정 주소를 박지 않고 `.trycloudflare.com` 을 넣어
 * **그 도메인의 모든 서브도메인**만 허용한다 (`allowedHosts: true` 전체 개방 아님).
 * Vite 5.4+ 의 `allowedHost[0] === "." && hostname.endsWith(allowedHost)` 규칙.
 *
 * 다른 터널(ngrok 등)을 쓰면 EXTRA_ALLOWED_HOSTS=".ngrok-free.app,..." 로 추가.
 */
const allowedHosts = [
  ".trycloudflare.com",
  ...(process.env.EXTRA_ALLOWED_HOSTS?.split(",").map((h) => h.trim()).filter(Boolean) ?? []),
];

export default defineConfig(({ mode }) => ({
  root: "client",
  server: {
    host: true,
    port: 5173,
    allowedHosts,
    proxy: wsProxy,
    // 터널 뒤에서는 Vite HMR 소켓이 페이지와 다른 포트로 붙으려다 실패해
    // 콘솔이 시끄럽다. 플레이테스트에는 HMR이 필요 없으므로 tunnel 모드에서 끈다.
    //   npm run dev:tunnel  ->  vite --mode tunnel
    hmr: mode === "tunnel" ? false : undefined,
  },
  preview: {
    host: true,
    port: 5173,
    allowedHosts,
    proxy: wsProxy,
  },
  build: {
    outDir: "../dist",
    emptyOutDir: true,
  },
}));
