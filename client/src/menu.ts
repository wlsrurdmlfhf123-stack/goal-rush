/**
 * 타이틀 / 캐릭터 선택 / 방 만들기 / 방 참가 / 대기실.
 *
 * 물리·게임 로직은 전혀 건드리지 않는다. 여기서 하는 일은 셋뿐이다.
 *  1) 어떤 캐릭터로 놀지 고른다 (characters.ts PRESETS)
 *  2) 어떤 모드로 놀지 정한다 (싱글 = 서버 없음 / 멀티 = 방 코드로 격리)
 *  3) 게임을 시작해도 되는 시점에 onStart()를 부른다
 *
 * 3D 씬은 뒤에서 계속 돌고 있고 이 UI는 그 위에 덮이는 오버레이다.
 * (main.ts가 animate()를 먼저 돌리므로 타이틀 배경이 정지 화면이 아니다)
 */
import type { Net } from "./net";
import { PRESETS, defaultPresetFor } from "./characters";
import type { JoinErrorReason } from "./protocol";
import { wsBase } from "./ws-url";

export type StartMode = "single" | "multi";

export interface MenuHooks {
  /** 게임 화면으로 넘어가도 되는 시점. 싱글이면 즉시, 멀티면 host가 시작했을 때 */
  onStart(mode: StartMode): void;
}

const WS_URL = wsBase();

const el = <T extends HTMLElement = HTMLElement>(id: string) =>
  document.getElementById(id) as T;

const JOIN_ERROR_TEXT: Record<JoinErrorReason, string> = {
  noRoom: "그런 방이 없다. 코드를 다시 확인해라.",
  full: "방이 가득 찼다 (최대 4명).",
  badCode: "코드는 영문/숫자 4자리다.",
};

export function createMenu(net: Net, hooks: MenuHooks) {
  const root = el("menu");
  const panels = {
    title: el("panel-title"),
    pick: el("panel-pick"),
    mode: el("panel-mode"),
    create: el("panel-create"),
    join: el("panel-join"),
    lobby: el("panel-lobby"),
  };
  type PanelName = keyof typeof panels;

  const joinInput = el<HTMLInputElement>("join-code");
  const joinError = el("join-error");
  const lobbyCode = el("lobby-code");
  const lobbyList = el("lobby-players");
  const lobbyHint = el("lobby-hint");
  const btnStart = el<HTMLButtonElement>("btn-start-game");
  const pickGrid = el("pick-grid");
  const pickHint = el("pick-hint");

  let started = false;
  /**
   * 캐릭터를 고른 뒤 어디로 갈지.
   *  single/multi - 타이틀에서 들어온 경우 (아직 방에 안 들어갔다)
   *  lobby        - 대기실에서 [캐릭터 변경]으로 들어온 경우.
   *                 이때만 "남이 이미 고른 캐릭터"를 실제로 볼 수 있다.
   */
  let pickThen: "single" | "multi" | "lobby" = "single";

  /**
   * URL 해시로 방에 바로 들어오기 - 친구에게 "링크 하나"만 보내면 되게.
   *   https://…/#ABCD   또는   https://…/#room=ABCD
   * 방을 만든 사람의 주소창에도 자동으로 #코드가 붙는다(welcome 처리 참고).
   */
  const linkCode = (location.hash.match(/[A-Za-z0-9]{4}/)?.[0] ?? "").toUpperCase();
  const pendingJoin = /^[A-Z0-9]{4}$/.test(linkCode) ? linkCode : "";
  /** 방에 들어와 있을 때 친구에게 보낼 전체 URL (포트/스킴은 지금 페이지 기준) */
  const shareURL = () => (net.room ? `${location.origin}${location.pathname}#${net.room}` : "");

  function show(name: PanelName) {
    for (const [k, p] of Object.entries(panels)) p.hidden = k !== name;
    root.hidden = false;
    if (name === "join") { joinError.textContent = ""; joinInput.focus(); }
  }

  function hideAll() {
    root.hidden = true;
  }

  // ------------------------------------------------------------ 캐릭터 선택
  //
  // 3D 미리보기 대신 CSS로 실루엣을 흉내낸다. 프리셋 8개를 보여주려고
  // 래그돌을 8개 만들면 물리 바디가 120개 늘어나고, 정작 보여줄 건 "색 조합"
  // 뿐이다. 큰 머리 + 짧은 팔다리 + 큰 손발 비율만 맞춰도 실제 캐릭터가
  // 어떻게 생겼는지 충분히 읽힌다.
  const hex = (n: number) => "#" + n.toString(16).padStart(6, "0");

  function renderPicks() {
    const mine = net.myPreset;
    // 멀티에서 남이 이미 고른 프리셋은 못 고르게 막는다.
    // (겹치면 「서로조종」에서 누가 누구인지 구분이 안 된다)
    const takenBy = new Map<number, number>();
    for (const [pid, preset] of Object.entries(net.picks)) {
      const id = Number(pid);
      if (id !== net.id) takenBy.set(preset, id);
    }

    pickGrid.innerHTML = PRESETS.map((p, i) => {
      const taken = takenBy.get(i);
      const cls = ["pick-card"];
      if (i === mine && taken === undefined) cls.push("selected");
      if (taken !== undefined) cls.push("taken");
      return `<div class="${cls.join(" ")}" data-i="${i}" role="button" tabindex="0">
        <div class="doll">
          <i class="head" style="background:${hex(p.skin)}"></i>
          <i class="eye eyeL" style="background:${hex(p.eye ?? 0x000000)}"></i>
          <i class="eye eyeR" style="background:${hex(p.eye ?? 0x000000)}"></i>
          <i class="arm armL" style="background:${hex(p.shirt)}"></i>
          <i class="arm armR" style="background:${hex(p.shirt)}"></i>
          <i class="body" style="background:${hex(p.shirt)}"></i>
          <i class="leg legL" style="background:${hex(p.pants)}"></i>
          <i class="leg legR" style="background:${hex(p.pants)}"></i>
          <i class="foot footL" style="background:${hex(p.shoes ?? 0x333333)}"></i>
          <i class="foot footR" style="background:${hex(p.shoes ?? 0x333333)}"></i>
        </div>
        <div class="pick-name">${p.name}</div>
        <div class="pick-by">${taken !== undefined ? `P${seatOf(taken)} 사용중` : ""}</div>
      </div>`;
    }).join("");

    pickHint.textContent = pickThen === "lobby"
      ? "회색으로 흐린 캐릭터는 같은 방의 다른 사람이 쓰는 중이다."
      : pickThen === "multi"
        ? "먼저 캐릭터를 고른다. 방에서 겹치면 자동으로 다른 걸로 바꿔준다."
        : "마음에 드는 캐릭터를 골라라.";
  }

  pickGrid.addEventListener("click", (ev) => {
    const card = (ev.target as HTMLElement).closest(".pick-card") as HTMLElement | null;
    if (!card || card.classList.contains("taken")) return;
    net.myPreset = Number(card.dataset.i);
    // 멀티면 서버에 알려서 다른 사람 화면에도 "사용중"으로 뜨게 한다
    if (!net.offline) net.send({ type: "pick", preset: net.myPreset });
    renderPicks();
  });

  /**
   * 방 안에서 몇 번째 사람인가 (1부터).
   *
   * [왜 id를 그대로 안 쓰나] 서버 id는 접속 순서대로 전역에서 증가한다.
   * 그래서 서버를 몇 번 쓰고 나면 둘이서 만든 새 방인데도 대기실에
   * "P7 / P8"이 뜬다. 둘이 하는 게임에서 그건 "우리 둘" 로 안 읽힌다.
   * 표시만 방 기준으로 다시 매긴다 - id 자체는 조종 대상·색·스폰 지점을
   * 정하는 값이라 절대 건드리지 않는다.
   */
  function roomIds(): number[] {
    return [net.id, ...net.peers].filter((v): v is number => v !== null).sort((a, b) => a - b);
  }
  function seatOf(id: number): number {
    const i = roomIds().indexOf(id);
    return i >= 0 ? i + 1 : id;
  }

  // ------------------------------------------------------------ 대기실 렌더
  function renderLobby() {
    lobbyCode.textContent = net.room ?? "----";
    const ids = roomIds();
    lobbyList.innerHTML = ids.map((id, i) => {
      const me = id === net.id ? " (나)" : "";
      const host = id === net.hostId ? " · 방장" : "";
      const preset = net.presetOf(id) ?? defaultPresetFor(id);
      return `<li>P${i + 1}${me}${host} — ${PRESETS[preset % PRESETS.length].name}</li>`;
    }).join("");

    // [게임 시작]은 방장만. 나머지는 안내만 본다.
    btnStart.hidden = !net.isHost;
    if (net.isHost && ids.length < 2) {
      const url = shareURL();
      lobbyHint.textContent = url
        ? `친구에게 이 주소를 보내라 (누르면 복사): ${url}`
        : "혼자서도 시작할 수 있다. 친구에게 위 코드를 알려줘라.";
    } else {
      lobbyHint.textContent = net.isHost
        ? "모두 모였으면 시작해라."
        : "방장이 시작하기를 기다리는 중…";
    }
  }

  // ------------------------------------------------------------ 네트워크 반응
  net.on((msg) => {
    switch (msg.type) {
      case "joinError":
        // 방 참가 실패. 만들기에서 왔든 참가에서 왔든 입력 화면으로 되돌린다.
        show("join");
        joinError.textContent = JOIN_ERROR_TEXT[msg.reason] ?? "방에 들어가지 못했다.";
        break;
      case "welcome":
        // 방에 들어가자마자 내가 고른 캐릭터를 등록한다.
        // (선택은 연결 전에 끝나 있으므로 서버는 아직 모른다)
        net.send({ type: "pick", preset: net.myPreset });
        // 주소창에 #코드를 박아 둔다 - 방장이 주소를 그대로 복사해 보내면 끝.
        if (net.room) { try { history.replaceState(null, "", `#${net.room}`); } catch { /* 무시 */ } }
        renderLobby();
        show("lobby");
        break;
      case "picks": {
        // 서버가 내 선택을 거절했다면(들어가기 직전에 남이 먼저 잡았다)
        // 비어 있는 첫 캐릭터로 자동으로 옮겨준다. 안 그러면 두 사람이
        // 같은 기본값으로 그려져 「서로조종」에서 구분이 안 된다.
        if (net.id !== null && msg.picks[net.id] === undefined) {
          const used = new Set(Object.values(msg.picks));
          const free = PRESETS.findIndex((_, i) => !used.has(i));
          if (free >= 0) {
            net.myPreset = free;
            net.send({ type: "pick", preset: free });
          }
        }
        if (!started) { renderPicks(); renderLobby(); }
        break;
      }
      case "playerJoined":
      case "playerLeft":
      case "host":
        if (!started) renderLobby();
        break;
      case "gameStart":
        if (started) break;
        started = true;
        hideAll();
        hooks.onStart("multi");
        break;
    }
  });

  // ------------------------------------------------------------ 버튼
  function startSingle() {
    if (started) return;
    started = true;
    net.goOffline(0);        // 서버에 연결하지 않는다
    hideAll();
    hooks.onStart("single");
  }

  // 타이틀 -> 캐릭터 선택 -> (싱글이면 바로 시작 / 멀티면 모드 선택)
  el("btn-single").addEventListener("click", () => {
    pickThen = "single";
    renderPicks();
    show("pick");
  });
  el("btn-multi").addEventListener("click", () => {
    pickThen = "multi";
    renderPicks();
    show("pick");
  });

  el("btn-pick-ok").addEventListener("click", () => {
    if (pickThen === "single") startSingle();
    else if (pickThen === "lobby") { renderLobby(); show("lobby"); }
    else if (pendingJoin) {
      // 링크(#코드)로 들어왔다 - 모드 선택 건너뛰고 그 방으로 바로 참가.
      show("join");
      joinError.textContent = "들어가는 중…";
      net.connect(`${WS_URL}/?room=${encodeURIComponent(pendingJoin)}`);
    }
    else show("mode");
  });
  el("btn-pick-back").addEventListener("click", () => {
    if (pickThen === "lobby") { renderLobby(); show("lobby"); }
    else show("title");
  });

  // 대기실에서 캐릭터를 바꾼다. 여기서는 방 사람들의 선택이 이미 와 있으므로
  // "사용중" 표시가 실제로 의미가 있다.
  el("btn-change-char").addEventListener("click", () => {
    pickThen = "lobby";
    renderPicks();
    show("pick");
  });
  el("btn-back-title").addEventListener("click", () => show("title"));

  el("btn-create-room").addEventListener("click", () => {
    // 코드는 서버가 만든다. 클라이언트가 뽑으면 두 사람이 같은 코드를 만들 수
    // 있고, 그러면 남의 방에 얹혀 들어가 버린다.
    show("create");
    net.connect(`${WS_URL}/?create=1`);
  });

  el("btn-join-room").addEventListener("click", () => show("join"));

  for (const id of ["btn-back-mode", "btn-back-mode2", "btn-leave-lobby"]) {
    el(id).addEventListener("click", () => {
      net.close();   // 방에서 나간다 (마지막 사람이면 서버가 방을 지운다)
      btnStart.disabled = false;
      show("mode");
    });
  }

  function submitJoin() {
    const code = joinInput.value.trim().toUpperCase();
    if (code.length !== 4) {
      joinError.textContent = JOIN_ERROR_TEXT.badCode;
      return;
    }
    joinError.textContent = "들어가는 중…";
    net.connect(`${WS_URL}/?room=${encodeURIComponent(code)}`);
  }
  el("btn-join-go").addEventListener("click", submitJoin);
  joinInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") submitJoin();
  });
  // 코드는 대문자 4자리로만 받는다
  joinInput.addEventListener("input", () => {
    joinInput.value = joinInput.value.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 4);
  });

  btnStart.addEventListener("click", () => {
    if (!net.isHost) return;
    btnStart.disabled = true;
    net.send({ type: "startGame" });
  });

  lobbyCode.addEventListener("click", () => {
    // 코드를 눌러서 복사 - 친구에게 불러주기 귀찮을 때
    const code = net.room;
    if (code) void navigator.clipboard?.writeText(code);
  });
  lobbyHint.addEventListener("click", () => {
    // 안내줄에 뜬 공유 URL을 눌러서 복사
    const url = shareURL();
    if (url && net.isHost) void navigator.clipboard?.writeText(url);
  });

  // 링크(#코드)로 들어왔으면 타이틀을 건너뛰고 바로 캐릭터 선택 -> 자동 참가.
  if (pendingJoin) {
    pickThen = "multi";
    renderPicks();
    show("pick");
  } else {
    show("title");
  }
}
