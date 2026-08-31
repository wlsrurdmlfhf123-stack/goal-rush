/**
 * WebSocket 릴레이 서버(server/server.js) 주소를 **접속한 페이지 기준으로** 정한다.
 *
 *  - 페이지가 https(터널) → wss:// , http(로컬) → ws://   (혼합 콘텐츠 차단 회피)
 *  - 기본: 페이지와 같은 host 의 `/ws` 경로. vite.config.ts 의 proxy 가 이걸
 *    server/server.js(기본 8080)로 넘긴다. 그래서 친구에게 줄 URL은 **하나**면
 *    되고(예: https://xxx.trycloudflare.com), 8080 포트를 밖에 열 필요가 없다.
 *  - 페이지를 8080 포트로 직접 열었으면(옛 방식) 서버에 바로 붙는다.
 *
 * 로컬 개발도 그대로: http://localhost:5173 → ws://localhost:5173/ws → (proxy) → :8080
 */
export function wsBase(loc?: { protocol: string; host: string; port: string }): string {
  const l = loc ?? (typeof location !== "undefined"
    ? location
    : { protocol: "http:", host: "localhost:5173", port: "5173" });
  const proto = l.protocol === "https:" ? "wss:" : "ws:";
  if (l.port === "8080") return `${proto}//${l.host}`;   // 서버에 직접
  return `${proto}//${l.host}/ws`;                        // vite proxy 경유
}
