# 배포 — Goal Rush! 인터넷 공개

프론트엔드와 WebSocket 릴레이 서버를 **한 개의 Render 웹 서비스**로 올린다.
`server/server.js` 가 `../dist`(빌드된 프론트)를 서빙하면서 같은 포트로 WS
업그레이드도 처리하므로, 클라이언트는 `wss://<주소>/ws` 하나로 붙는다
(코드: `client/src/ws-url.ts`). 공유 링크·방 코드 기능은 그대로.

## 최초 배포 (집에서 한 번)

1. GitHub 에 이 저장소를 올린다 (private 가능).
   ```
   git remote add origin https://github.com/<계정>/<repo>.git
   git push -u origin feature/logic
   ```
2. https://dashboard.render.com → **New +** → **Blueprint** → 위 저장소 선택
   → `render.yaml` 을 자동 인식 → **Apply**.
3. 3~5분 뒤 `https://goal-rush-xxxx.onrender.com` 주소가 나온다. 끝.

> 계정/카드 없이 무료. 15분간 아무도 안 들어오면 절전 → 다음 접속 때 최초
> 로딩이 ~50초 걸리고 그 뒤로는 정상. (방장이 먼저 열어두면 친구는 바로 붙는다.)

## 업데이트 (코드 고친 뒤)

```
git push
```
→ Render 가 자동으로 다시 빌드·배포한다 (`autoDeploy: true`).

## 학교에서 플레이

1. 브라우저에서 `https://goal-rush-xxxx.onrender.com` 접속
2. 캐릭터 선택 → **[방 만들기]**
3. 대기실 안내줄(주소 + `#코드`)을 **클릭 → 복사** → 친구에게 전송
4. 친구가 그 주소를 열면 자동으로 같은 방 입장 → 방장이 **[게임 시작]**

## 로컬 개발은 그대로

```
npm run server      # 릴레이 (:8080) — 이제 dist 도 같이 서빙(있으면)
npm run dev         # vite (:5173), /ws → :8080 프록시
```
`npm run share` (Cloudflare 터널)도 계속 동작한다.

## 다른 호스팅

`render.yaml` 없이도 아무 Node 호스팅에서 동작한다. 필요한 것:
- 빌드: `npm install --include=dev && npm run build`
- 실행: `node server/server.js` (환경변수 `PORT` 를 읽는다)
- WebSocket 업그레이드 허용 (serverless/Edge 는 불가 — 상태를 들고 있는
  릴레이라 상시 프로세스가 필요하다). Koyeb·Fly.io·Railway 등도 가능.
