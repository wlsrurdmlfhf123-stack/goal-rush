import type { ClientMessage, PickMap, ServerMessage } from "./protocol";

export class Net {
  /** 아직 연결 전이거나 싱글 플레이면 null */
  ws: WebSocket | null = null;
  id: number | null = null;
  hostId: number | null = null;
  peers = new Set<number>();
  ping = 0;
  /** 지금 들어가 있는 방 코드 (싱글 플레이면 null) */
  room: string | null = null;
  /** 싱글 플레이(로컬 단독) 모드인가 */
  offline = false;
  /** 방 사람들의 캐릭터 선택 현황 (playerId -> preset index) */
  picks: PickMap = {};
  /** 내가 고른 프리셋. 서버가 거절하면 picks 쪽이 정답이다 */
  myPreset = 0;
  private handlers: ((m: ServerMessage) => void)[] = [];
  private pingTimer: number | null = null;

  /**
   * 소켓은 생성자에서 열지 않는다.
   *
   * 타이틀 화면에서 [싱글 플레이]를 고르면 서버에 아예 연결하지 않고,
   * [멀티 플레이]를 골라 방을 만들거나 참가할 때만 connect()가 불린다.
   * (예전엔 생성자가 곧바로 다이얼해서, 서버가 없어도 매번 붙으려 시도했다)
   */
  connect(url: string) {
    this.close();
    const ws = new WebSocket(url);
    this.ws = ws;
    this.offline = false;

    ws.onopen = () => {
      this.pingTimer = window.setInterval(() => {
        this.send({ type: "ping", t: performance.now() });
      }, 1000);
    };

    ws.onmessage = (ev) => {
      let msg: ServerMessage;
      try { msg = JSON.parse(ev.data as string); } catch { return; }

      if (msg.type === "pong") {
        this.ping = Math.round(performance.now() - msg.t);
        return;
      }
      if (msg.type === "welcome") {
        this.id = msg.id;
        this.hostId = msg.hostId;
        this.room = msg.room;
        this.picks = msg.picks ?? {};
        this.peers.clear();
        for (const p of msg.players) this.peers.add(p);
      }
      if (msg.type === "picks") {
        this.picks = msg.picks;
        // 서버가 내 선택을 거절했으면(누가 먼저 잡았으면) 서버 값이 정답이다
        if (this.id !== null && this.picks[this.id] !== undefined) {
          this.myPreset = this.picks[this.id];
        }
      }
      if (msg.type === "host") this.hostId = msg.hostId;
      if (msg.type === "playerJoined") this.peers.add(msg.id);
      if (msg.type === "playerLeft") this.peers.delete(msg.id);

      for (const h of this.handlers) h(msg);
    };

    ws.onclose = () => {
      if (this.pingTimer !== null) { window.clearInterval(this.pingTimer); this.pingTimer = null; }
      if (this.ws === ws) this.ws = null;
    };
  }

  /** 서버 없이 혼자 논다. 소켓을 열지 않고 id만 스스로 정한다. */
  goOffline(id = 0) {
    this.close();
    this.offline = true;
    this.id = id;
    this.hostId = id;   // 혼자면 자기가 host = 물리 권위
    this.room = null;
    this.peers.clear();
    this.picks = { [id]: this.myPreset };
  }

  /** 이 플레이어가 고른 프리셋 (아무도 안 골랐으면 null) */
  presetOf(playerId: number): number | null {
    const v = this.picks[playerId];
    return v === undefined ? null : v;
  }

  close() {
    if (this.pingTimer !== null) { window.clearInterval(this.pingTimer); this.pingTimer = null; }
    if (this.ws) {
      const ws = this.ws;
      this.ws = null;
      ws.onopen = ws.onmessage = ws.onclose = null;
      if (ws.readyState === WebSocket.OPEN || ws.readyState === WebSocket.CONNECTING) ws.close();
    }
  }

  get isHost(): boolean {
    return this.id !== null && this.id === this.hostId;
  }

  /** 「서로조종」: 내가 조종하는 캐릭터 = 상대의 캐릭터. 혼자면 내 캐릭터. */
  get controlledId(): number | null {
    if (this.id === null) return null;
    const other = [...this.peers][0];
    return other !== undefined ? other : this.id;
  }

  get statusText(): string {
    if (this.offline) return "SOLO";
    if (!this.ws) return "CLOSED";
    switch (this.ws.readyState) {
      case WebSocket.CONNECTING: return "CONNECTING";
      case WebSocket.OPEN: return "OPEN";
      case WebSocket.CLOSING: return "CLOSING";
      default: return "CLOSED";
    }
  }

  on(handler: (m: ServerMessage) => void) { this.handlers.push(handler); }

  send(msg: ClientMessage) {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) this.ws.send(JSON.stringify(msg));
  }
}
