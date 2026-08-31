import { WebSocketServer } from "ws";
import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { existsSync } from "node:fs";
import { extname, join, normalize, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const PORT = Number(process.env.PORT || 8080);

/**
 * 「Hold Tight! (꽉 잡아!)」 릴레이 서버
 *
 * 서버는 물리를 계산하지 않는다. 역할:
 *  - 방(room) 관리: 4자리 코드로 클라이언트를 서로 격리
 *  - 접속 수락 / playerId 할당
 *  - 방의 첫 접속자를 host(물리 권위)로 지정, host가 나가면 이양
 *  - 각 클라이언트의 "입력"을 같은 방의 host에게 전달 ("서로조종"은 host가 해석)
 *  - host가 계산한 스냅샷을 같은 방의 나머지에게 전달
 *  - 대기실: host가 [게임 시작]을 누르면 방 전체에 gameStart를 뿌린다
 *  - ping/pong
 *
 * [격리] 릴레이는 전부 "그 소켓이 속한 방" 안에서만 일어난다. 다른 코드를 쓴
 * 클라이언트끼리는 입력도 스냅샷도 서로 보이지 않는다.
 *
 * [배포] 하나의 HTTP 서버가 두 가지를 같이 한다:
 *  - `GET *`     -> ../dist 의 빌드된 프론트엔드를 서빙 (SPA 폴백 = index.html)
 *  - `Upgrade`   -> WebSocket 릴레이 (경로 무관 - 쿼리스트링만 본다)
 * 그래서 프론트와 WS 가 **같은 origin/포트 하나**로 나간다. 클라이언트는
 * `wss://<host>/ws` 로 붙고(ws-url.ts), Render 같은 PaaS 가 주는 PORT 하나만
 * 열면 된다. dist 가 없으면(테스트 등) 정적 서빙만 건너뛰고 WS 는 그대로 돈다.
 */

const DIST = join(dirname(fileURLToPath(import.meta.url)), "..", "dist");
const SEP = process.platform === "win32" ? "\\" : "/";
const MIME = {
  ".html": "text/html; charset=utf-8", ".js": "text/javascript", ".mjs": "text/javascript",
  ".css": "text/css", ".json": "application/json", ".map": "application/json",
  ".mp3": "audio/mpeg", ".wav": "audio/wav", ".ogg": "audio/ogg",
  ".png": "image/png", ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".gif": "image/gif",
  ".svg": "image/svg+xml", ".ico": "image/x-icon", ".webp": "image/webp",
  ".woff": "font/woff", ".woff2": "font/woff2", ".ttf": "font/ttf", ".txt": "text/plain; charset=utf-8",
};

async function serveStatic(req, res) {
  if (req.method !== "GET" && req.method !== "HEAD") { res.writeHead(405); return res.end(); }
  if (!existsSync(DIST)) { res.writeHead(503, { "content-type": "text/plain" }); return res.end("build missing - run `npm run build`"); }
  let p = decodeURIComponent((req.url || "/").split("?")[0]);
  if (p === "/" || p === "") p = "/index.html";
  const rel = normalize(p).replace(/^([/\\]|\.\.[/\\])+/, "");
  let file = join(DIST, rel);
  if (file !== DIST && !file.startsWith(DIST + SEP)) { res.writeHead(403); return res.end(); }
  try {
    let s = existsSync(file) ? await stat(file) : null;
    if (!s || s.isDirectory()) { file = join(DIST, "index.html"); s = existsSync(file) ? await stat(file) : null; }
    if (!s) { res.writeHead(404, { "content-type": "text/plain" }); return res.end("not found"); }
    const body = await readFile(file);
    res.writeHead(200, {
      "content-type": MIME[extname(file).toLowerCase()] || "application/octet-stream",
      "content-length": body.length,
      "cache-control": file.endsWith("index.html") ? "no-cache" : "public, max-age=3600",
    });
    res.end(req.method === "HEAD" ? undefined : body);
  } catch { res.writeHead(500); res.end("error"); }
}

const httpServer = createServer((req, res) => { void serveStatic(req, res); });
const wss = new WebSocketServer({ noServer: true });
httpServer.on("upgrade", (req, socket, head) => {
  wss.handleUpgrade(req, socket, head, (ws) => wss.emit("connection", ws, req));
});

/**
 * @typedef {{ id:number, ws:import('ws').WebSocket, room:string, preset:number|null }} Player
 * @typedef {{ code:string, players:Map<number,Player>, hostId:number|null, started:boolean }} Room
 */

/** @type {Map<string, Room>} */
const rooms = new Map();
let nextId = 1;

/** 방당 최대 인원. main.ts의 SPAWNS 개수와 맞춘다 */
const MAX_PLAYERS = 4;

// 사람이 불러주기 쉬운 글자만 쓴다 (0/O, 1/I 같은 혼동 쌍 제외)
const CODE_ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
const CODE_LEN = 4;

const log = (m) => console.log(`[server] ${m}`);

function send(ws, obj) {
  if (ws.readyState === ws.OPEN) ws.send(JSON.stringify(obj));
}

function makeCode() {
  let code = "";
  for (let i = 0; i < CODE_LEN; i++) {
    code += CODE_ALPHABET[Math.floor(Math.random() * CODE_ALPHABET.length)];
  }
  return code;
}

function newRoomCode() {
  // 코드 공간이 32^4 = 약 100만이라 충돌은 드물지만, 확인은 해둔다
  for (let i = 0; i < 200; i++) {
    const code = makeCode();
    if (!rooms.has(code)) return code;
  }
  return null;
}

/** 입력된 코드를 정규화한다. 형식이 틀리면 null */
function normalizeCode(raw) {
  if (typeof raw !== "string") return null;
  const code = raw.trim().toUpperCase();
  if (code.length !== CODE_LEN) return null;
  for (const ch of code) if (!CODE_ALPHABET.includes(ch)) return null;
  return code;
}

/** @param {Room} room */
function broadcast(room, obj, exceptId = null) {
  const raw = JSON.stringify(obj);
  for (const p of room.players.values()) {
    if (p.id === exceptId) continue;
    if (p.ws.readyState === p.ws.OPEN) p.ws.send(raw);
  }
}

/**
 * 방의 캐릭터 선택 현황. { playerId: presetIndex }
 * @param {Room} room
 */
function picksOf(room) {
  /** @type {Record<number, number>} */
  const out = {};
  for (const p of room.players.values()) if (p.preset !== null) out[p.id] = p.preset;
  return out;
}

/** @param {Room} room */
function pickHost(room) {
  if (room.hostId !== null && room.players.has(room.hostId)) return;
  const first = room.players.values().next();
  room.hostId = first.done ? null : first.value.id;
  if (room.hostId !== null) {
    broadcast(room, { type: "host", hostId: room.hostId });
    log(`[${room.code}] host -> player ${room.hostId}`);
  }
}

wss.on("connection", (ws, req) => {
  // 연결 URL이 어느 방으로 갈지 정한다.
  //   ?create=1     -> 새 방을 만들고 그 코드를 welcome으로 알려준다
  //   ?room=ABCD    -> 그 방에 참가한다 (없으면 joinError 후 종료)
  const url = new URL(req.url ?? "/", "http://localhost");
  const wantsCreate = url.searchParams.get("create") === "1";
  const rawRoom = url.searchParams.get("room");

  /** @type {Room | undefined} */
  let room;

  if (wantsCreate) {
    const code = newRoomCode();
    if (code === null) {
      send(ws, { type: "joinError", reason: "full" });
      ws.close();
      return;
    }
    room = { code, players: new Map(), hostId: null, started: false };
    rooms.set(code, room);
    log(`room ${code} created`);
  } else {
    const code = normalizeCode(rawRoom);
    if (code === null) {
      send(ws, { type: "joinError", reason: "badCode" });
      ws.close();
      return;
    }
    room = rooms.get(code);
    if (!room) {
      send(ws, { type: "joinError", reason: "noRoom" });
      ws.close();
      return;
    }
    if (room.players.size >= MAX_PLAYERS) {
      send(ws, { type: "joinError", reason: "full" });
      ws.close();
      return;
    }
  }

  const id = nextId++;
  const player = { id, ws, room: room.code, preset: null };
  room.players.set(id, player);
  log(`[${room.code}] player ${id} connected (total ${room.players.size})`);

  pickHost(room);

  send(ws, {
    type: "welcome",
    id,
    hostId: room.hostId,
    players: [...room.players.keys()].filter((p) => p !== id),
    room: room.code,
    picks: picksOf(room),
  });
  broadcast(room, { type: "playerJoined", id }, id);

  // 이미 시작된 방에 늦게 들어왔다면 곧바로 게임 화면으로 보낸다
  if (room.started) send(ws, { type: "gameStart" });

  ws.on("message", (raw) => {
    let msg;
    try { msg = JSON.parse(raw.toString()); } catch { return; }

    // 릴레이는 항상 "이 소켓이 속한 방" 안에서만 한다
    const r = rooms.get(player.room);
    if (!r) return;

    switch (msg.type) {
      case "input": {
        // 입력은 host에게만. host가 "서로조종" 규칙에 따라 상대 캐릭터에 적용한다.
        if (r.hostId !== null && r.hostId !== id && r.players.has(r.hostId)) {
          send(r.players.get(r.hostId).ws, { type: "input", id, input: msg.input });
        }
        break;
      }
      case "snapshot": {
        // host만 월드 상태를 보낼 수 있다
        if (id !== r.hostId) break;
        // sfx는 host가 이번 구간에 낸 소리 목록이다 (protocol.ts SfxEvent).
        // 필드를 빠뜨리면 비-host 화면이 통째로 무음이 되므로 같이 넘긴다.
        broadcast(r, { type: "snapshot", ragdolls: msg.ragdolls, objects: msg.objects, game: msg.game, sfx: msg.sfx }, id);
        break;
      }
      case "restart": {
        // [다시하기]는 host만 실행할 수 있다 (월드 리셋 = 물리 권위).
        // 비-host가 누르면 요청만 host에게 넘긴다.
        if (r.hostId !== null && r.hostId !== id && r.players.has(r.hostId)) {
          send(r.players.get(r.hostId).ws, { type: "restart", id });
        }
        break;
      }
      case "nextMap": {
        // [다음 맵]도 월드 로드라 host만 실행할 수 있다.
        if (r.hostId !== null && r.hostId !== id && r.players.has(r.hostId)) {
          send(r.players.get(r.hostId).ws, { type: "nextMap", id });
        }
        break;
      }
      case "pick": {
        // 캐릭터 선택. 같은 방에서 이미 남이 고른 프리셋은 거절하고
        // 현재 현황을 되돌려준다 (클라이언트가 그걸로 화면을 되돌린다).
        const n = Number(msg.preset);
        if (!Number.isInteger(n) || n < 0 || n > 63) break;
        const taken = [...r.players.values()].some((p) => p.id !== id && p.preset === n);
        if (!taken) player.preset = n;
        broadcast(r, { type: "picks", picks: picksOf(r) });
        break;
      }
      case "startGame": {
        // 대기실에서 host만 시작할 수 있다
        if (id !== r.hostId || r.started) break;
        r.started = true;
        log(`[${r.code}] game start (${r.players.size} players)`);
        broadcast(r, { type: "gameStart" });
        break;
      }
      case "ping":
        send(ws, { type: "pong", t: msg.t });
        break;
    }
  });

  ws.on("close", () => {
    const r = rooms.get(player.room);
    if (!r) return;
    r.players.delete(id);
    log(`[${r.code}] player ${id} disconnected (total ${r.players.size})`);
    if (r.players.size === 0) {
      // 빈 방은 치운다. 안 그러면 코드가 영원히 점유된다.
      rooms.delete(r.code);
      log(`room ${r.code} closed`);
      return;
    }
    broadcast(r, { type: "playerLeft", id });
    // 나간 사람이 잡고 있던 캐릭터를 풀어준다
    broadcast(r, { type: "picks", picks: picksOf(r) });
    if (id === r.hostId) { r.hostId = null; pickHost(r); }
  });

  ws.on("error", (e) => log(`[${player.room}] player ${id} socket error: ${e.message}`));
});

httpServer.listen(PORT, () => {
  log(`listening on :${PORT} (ws relay${existsSync(DIST) ? " + static frontend" : " — no dist, WS only"})`);
});
