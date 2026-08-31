/**
 * 사운드 — 효과음 합성 + 배경음.
 *
 * [왜 음원 파일이 아니라 합성인가]
 * 지금 이 저장소에는 오디오 에셋이 하나도 없고, 받아올 곳도 정해져 있지 않다.
 * 소리가 아예 없는 것과 임시로라도 있는 것은 체감 차이가 아주 크므로,
 * WebAudio 오실레이터로 그 자리에서 만들어 쓴다. 파일이 생기면 play()의
 * 구현만 바꾸면 되도록, 바깥에서는 이름(SfxName)으로만 부르게 해 뒀다.
 *
 * [교체 방법] loadSamples()에 { kick: ArrayBuffer, ... } 를 넘기면 그 이름은
 * 합성 대신 샘플을 재생한다. 호출부는 한 줄도 안 바뀐다.
 *
 * [자동재생 정책] 브라우저는 사용자 제스처 전에는 AudioContext를 재생 상태로
 * 두지 않는다. 그래서 컨텍스트를 미리 만들되, 첫 클릭/키 입력에서 resume()
 * 한다. 그 전에 들어온 소리는 조용히 버린다 (에러를 내지 않는다).
 */

export type SfxName =
  | "step"        // 발소리
  | "touch"       // 드리블 터치
  | "kick"        // 킥
  | "kickHard"    // 빠르고 강한 킥 (풀차지)
  | "kickCharge"  // 킥 차징 완료
  | "trick"       // 개인기
  | "pickup"      // 공 안기
  | "drop"        // 공 놓기
  | "hit"         // 장애물/봇에 맞음
  | "ballBounce"  // 공이 바닥/물체에 튕김
  | "ballHard"    // 강한 공 충돌 / 사람끼리 세게 부딪힘
  | "ragdoll"     // 넘어짐 (래그돌 진입) - 진입 시 1회
  | "land"        // 착지
  | "botSpawn"    // 봇 등장
  | "goal"        // 골
  | "crowd"       // 관중 환호
  | "fail"        // 실패
  | "countdown"   // 카운트다운
  | "start"       // 시작
  | "ui";         // UI 클릭

/** 합성 레시피 하나 */
interface Recipe {
  /** 파형 */
  type: OscillatorType;
  /** 시작/끝 주파수 (Hz) */
  f0: number;
  f1: number;
  /** 길이 (초) */
  dur: number;
  /** 최대 볼륨 (0..1) */
  gain: number;
  /** 노이즈를 섞을 비율 (0..1). 발소리·충돌처럼 "탁" 하는 소리에 쓴다 */
  noise?: number;
  /** 어택 시간 (초). 짧을수록 타격감이 있다 */
  attack?: number;
  /** 살짝 겹쳐 내는 두 번째 음 (화음) */
  harmonic?: number;
}

const RECIPES: Record<SfxName, Recipe> = {
  // 발소리는 아주 짧고 작게. 크면 달릴 때 귀가 아프다.
  step:       { type: "triangle", f0: 150, f1: 90,  dur: 0.07, gain: 0.05, noise: 0.8, attack: 0.002 },
  // 드리블 터치 - 가볍게 "톡"
  touch:      { type: "sine",     f0: 420, f1: 260, dur: 0.07, gain: 0.10, noise: 0.25, attack: 0.002 },
  // 킥 - 낮고 두툼하게 "퍽"
  kick:       { type: "sine",     f0: 220, f1: 70,  dur: 0.16, gain: 0.30, noise: 0.35, attack: 0.002 },
  // 풀차지 킥 - 더 낮고 길게 "퍼억"
  kickHard:   { type: "sine",     f0: 200, f1: 52,  dur: 0.24, gain: 0.40, noise: 0.45, attack: 0.001 },
  kickCharge: { type: "square",   f0: 660, f1: 880, dur: 0.06, gain: 0.07, attack: 0.004 },
  // 개인기 - 위로 훑는 소리 (뭔가 해냈다는 신호)
  trick:      { type: "triangle", f0: 480, f1: 1150, dur: 0.20, gain: 0.20, attack: 0.004, harmonic: 1.5 },
  pickup:     { type: "sine",     f0: 520, f1: 780, dur: 0.12, gain: 0.16, attack: 0.004 },
  drop:       { type: "sine",     f0: 500, f1: 300, dur: 0.10, gain: 0.13, attack: 0.004 },
  // 충돌 - 낮은 노이즈 덩어리
  hit:        { type: "sawtooth", f0: 180, f1: 60,  dur: 0.24, gain: 0.30, noise: 0.6, attack: 0.001 },
  // 공이 바닥/물체에 튕김 - 짧고 가벼운 "톡"
  ballBounce: { type: "sine",     f0: 300, f1: 120, dur: 0.12, gain: 0.20, noise: 0.5, attack: 0.001 },
  // 강한 공 충돌 / 사람끼리 세게 부딪힘 - 묵직한 "퍽"
  ballHard:   { type: "sawtooth", f0: 240, f1: 66,  dur: 0.20, gain: 0.34, noise: 0.55, attack: 0.001 },
  // 넘어짐 - 아래로 훑는 소리 (뭔가 무너졌다는 신호)
  ragdoll:    { type: "triangle", f0: 420, f1: 90,  dur: 0.34, gain: 0.24, noise: 0.3, attack: 0.004 },
  land:       { type: "triangle", f0: 130, f1: 70,  dur: 0.10, gain: 0.12, noise: 0.5, attack: 0.002 },
  // 봇 등장 - 낮게 깔리는 경고
  botSpawn:   { type: "sawtooth", f0: 300, f1: 120, dur: 0.45, gain: 0.22, attack: 0.02, harmonic: 0.5 },
  goal:       { type: "square",   f0: 520, f1: 1050, dur: 0.55, gain: 0.26, attack: 0.006, harmonic: 1.5 },
  // 관중 환호 - 넓게 퍼지는 노이즈
  crowd:      { type: "sawtooth", f0: 200, f1: 420, dur: 1.2,  gain: 0.18, noise: 0.75, attack: 0.05 },
  fail:       { type: "sawtooth", f0: 380, f1: 110, dur: 0.7,  gain: 0.24, attack: 0.01 },
  countdown:  { type: "square",   f0: 700, f1: 700, dur: 0.10, gain: 0.18, attack: 0.004 },
  start:      { type: "square",   f0: 900, f1: 1300, dur: 0.30, gain: 0.24, attack: 0.004, harmonic: 1.5 },
  ui:         { type: "sine",     f0: 660, f1: 880, dur: 0.07, gain: 0.12, attack: 0.003 },
};

export interface Audio {
  /** 효과음 한 번. pan은 -1(왼쪽)..1(오른쪽), vol은 배수 */
  play(name: SfxName, opts?: { vol?: number; pan?: number; rate?: number }): void;
  /** 배경음 시작/정지 (합성 루프 - BGM 파일이 없을 때의 폴백) */
  music(on: boolean): void;
  /**
   * BGM 파일을 재생한다 (루프). url이 null이면 정지.
   *
   * [겹침 금지] 새 곡으로 바꾸면 이전 <audio>를 **즉시 정지**하고 버린다.
   * 크로스페이드하지 않는다 - 동시에 살아 있는 엘리먼트는 항상 최대 1개다.
   * 자동재생 정책 때문에 unlock() 전에는 원하는 url만 기억해 뒀다가
   * unlock() 시점에 시작한다. 로드 실패는 조용히 무시.
   */
  playBgm(url: string | null): void;
  /** 효과음 마스터 볼륨 (0..1). 기본 0.9 */
  setSfxVolume(v: number): void;
  /** BGM 볼륨 (0..1). 효과음을 가리지 않게 낮게 잡는다 */
  setMusicVolume(v: number): void;
  /** 현재 효과음 볼륨 (0..1). 설정 UI 슬라이더 초기값용 */
  getSfxVolume(): number;
  /** 현재 BGM 볼륨 (0..1). 설정 UI 슬라이더 초기값용 */
  getMusicVolume(): number;
  /** 사용자 제스처에서 부른다. 이걸 부르기 전 소리는 조용히 버려진다 */
  unlock(): void;
  /** 전체 음소거 토글 */
  setMuted(m: boolean): void;
  /**
   * 지금 소리가 실제로 나갈 수 있는 상태인가 (검증용).
   * ctx가 running이고 unlock()이 됐고 음소거가 아니어야 한다.
   *
   * played = play()가 불린 횟수(시도), heard = 그중 MIN_GAP 스로틀을 통과해
   * 실제로 오실레이터를 만든 횟수. 둘의 차이가 "겹쳐서 버린 소리"다 -
   * 반복음이 지저분해지는지 재려면 이 둘을 같이 봐야 한다.
   */
  status(): {
    ctx: string; unlocked: boolean; muted: boolean; played: number; heard: number;
    sfxVolume: number; musicVolume: number;
    /** BGM 파이프라인의 현재 상태. 소리가 안 나면 여기부터 본다 */
    bgm: {
      /** 재생하려고 기억해 둔 url (unlock 전이면 아직 시작되지 않은 곡) */
      want: string | null;
      src: string | null;
      paused: boolean | null;
      /** 엘리먼트에 실제로 걸린 볼륨. 0 이면 "재생 중인데 무음"이다 */
      volume: number | null;
      readyState: number | null;
      /** 마지막 재생 실패 사유 (자동재생 거부 / 로드 실패). 없으면 null */
      error: string | null;
    };
  };
  readonly muted: boolean;
  /** 파일 음원으로 교체 (있으면 합성 대신 이걸 쓴다) */
  loadSamples(map: Partial<Record<SfxName, ArrayBuffer>>): Promise<void>;
  /** URL에서 효과음 파일을 받아 교체. 못 받으면 그 이름은 합성으로 남는다 */
  loadSampleUrls(map: Partial<Record<SfxName, string>>): Promise<void>;
  dispose(): void;
}

export function createAudio(): Audio {
  let ctx: AudioContext | null = null;
  let master: GainNode | null = null;
  let musicGain: GainNode | null = null;
  let musicTimer: number | null = null;
  let muted = false;
  let unlocked = false;
  /** 효과음 마스터 볼륨 / BGM 볼륨 - 따로 관리한다 */
  let sfxVolume = 0.9;
  let musicVolume = 0.32;
  /** 지금 재생 중인 BGM <audio> 엘리먼트와, 재생하고 싶은 url */
  /** 지금 재생 중인 BGM <audio>. 항상 최대 1개만 살아 있다 */
  let bgmEl: HTMLAudioElement | null = null;
  let bgmWant: string | null = null;
  let bgmFade: number | null = null;
  /** 마지막 BGM 재생 실패 사유. 조용히 삼키지 않고 남겨 둔다 (status/콘솔용) */
  let bgmError: string | null = null;
  /** 실제로 재생을 시도한 횟수 (검증용) */
  let playCount = 0;
  /** 그중 스로틀을 통과해 실제로 소리를 만든 횟수 */
  let heardCount = 0;
  const samples = new Map<SfxName, AudioBuffer>();

  /**
   * 같은 소리가 한 프레임에 여러 번 겹치는 걸 막는다.
   *
   * 드리블 터치는 초당 7번까지 나가고, 멀티에서는 사람 수만큼 곱해진다.
   * 그대로 두면 소리가 뭉쳐서 지직거린다.
   */
  const lastAt = new Map<SfxName, number>();
  const MIN_GAP: Partial<Record<SfxName, number>> = {
    step: 0.12, touch: 0.05, hit: 0.12, land: 0.15, kickCharge: 0.05,
    ballBounce: 0.11, ballHard: 0.14, kickHard: 0.15, ragdoll: 0.4, crowd: 2.0,
    trick: 0.35,
  };

  function ensure(): AudioContext | null {
    if (ctx) return ctx;
    try {
      const AC = window.AudioContext ?? (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AC) return null;
      ctx = new AC();
      master = ctx.createGain();
      master.gain.value = muted ? 0 : sfxVolume;
      master.connect(ctx.destination);
      musicGain = ctx.createGain();
      musicGain.gain.value = 0.0;
      musicGain.connect(master);
    } catch {
      ctx = null;
    }
    return ctx;
  }

  /** 노이즈 버퍼는 한 번만 만들어 재활용한다 */
  let noiseBuf: AudioBuffer | null = null;
  function getNoise(c: AudioContext): AudioBuffer {
    if (noiseBuf) return noiseBuf;
    const len = Math.floor(c.sampleRate * 0.5);
    noiseBuf = c.createBuffer(1, len, c.sampleRate);
    const d = noiseBuf.getChannelData(0);
    for (let i = 0; i < len; i++) d[i] = Math.random() * 2 - 1;
    return noiseBuf;
  }

  function play(name: SfxName, opts: { vol?: number; pan?: number; rate?: number } = {}) {
    if (muted || !unlocked) return;
    const c = ensure();
    if (!c || !master) return;

    playCount++;
    const now = c.currentTime;
    const gap = MIN_GAP[name];
    if (gap !== undefined) {
      const prev = lastAt.get(name) ?? -1e9;
      if (now - prev < gap) return;
      lastAt.set(name, now);
    }
    heardCount++;

    const vol = opts.vol ?? 1;
    const rate = opts.rate ?? 1;

    // 좌우 배치 (거리감). 지원 안 하는 브라우저면 그냥 건너뛴다.
    let out: AudioNode = master;
    if (opts.pan !== undefined && typeof c.createStereoPanner === "function") {
      const p = c.createStereoPanner();
      p.pan.value = Math.max(-1, Math.min(1, opts.pan));
      p.connect(master);
      out = p;
    }

    // 파일 음원이 있으면 그걸 쓴다
    const buf = samples.get(name);
    if (buf) {
      const src = c.createBufferSource();
      src.buffer = buf;
      src.playbackRate.value = rate;
      const g = c.createGain();
      g.gain.value = vol;
      src.connect(g).connect(out);
      src.start();
      return;
    }

    const r = RECIPES[name];
    const dur = r.dur / rate;
    const g = c.createGain();
    const peak = r.gain * vol;
    const atk = r.attack ?? 0.005;
    g.gain.setValueAtTime(0.0001, now);
    g.gain.exponentialRampToValueAtTime(Math.max(0.0002, peak), now + atk);
    g.gain.exponentialRampToValueAtTime(0.0001, now + dur);
    g.connect(out);

    const osc = c.createOscillator();
    osc.type = r.type;
    osc.frequency.setValueAtTime(r.f0 * rate, now);
    osc.frequency.exponentialRampToValueAtTime(Math.max(20, r.f1 * rate), now + dur);
    osc.connect(g);
    osc.start(now);
    osc.stop(now + dur + 0.02);

    if (r.harmonic) {
      const h = c.createOscillator();
      h.type = r.type;
      h.frequency.setValueAtTime(r.f0 * r.harmonic * rate, now);
      h.frequency.exponentialRampToValueAtTime(Math.max(20, r.f1 * r.harmonic * rate), now + dur);
      const hg = c.createGain();
      hg.gain.value = 0.4;
      h.connect(hg).connect(g);
      h.start(now);
      h.stop(now + dur + 0.02);
    }

    if (r.noise) {
      const n = c.createBufferSource();
      n.buffer = getNoise(c);
      const nf = c.createBiquadFilter();
      nf.type = "bandpass";
      nf.frequency.value = r.f0 * 2;
      const ng = c.createGain();
      ng.gain.value = r.noise;
      n.connect(nf).connect(ng).connect(g);
      n.start(now);
      n.stop(now + dur + 0.02);
    }
  }

  /**
   * 배경음 — 짧은 코드 진행을 계속 도는 아주 단순한 루프.
   *
   * 음원이 없으므로 여기서도 합성한다. 게임 소리를 가리지 않게 아주 작게 깔고,
   * 화음만 바꿔가며 "뭔가 흐르고 있다" 정도만 만든다.
   */
  const CHORDS = [
    [262, 330, 392],   // C
    [294, 370, 440],   // D
    [220, 277, 330],   // A
    [247, 311, 392],   // B
  ];
  let chordIdx = 0;

  function musicStep() {
    const c = ensure();
    if (!c || !musicGain || muted) return;
    const now = c.currentTime;
    const chord = CHORDS[chordIdx++ % CHORDS.length];
    for (const f of chord) {
      const o = c.createOscillator();
      o.type = "triangle";
      o.frequency.value = f;
      const g = c.createGain();
      g.gain.setValueAtTime(0.0001, now);
      g.gain.exponentialRampToValueAtTime(0.05, now + 0.25);
      g.gain.exponentialRampToValueAtTime(0.0001, now + 1.9);
      o.connect(g).connect(musicGain);
      o.start(now);
      o.stop(now + 2.0);
    }
  }

  function music(on: boolean) {
    const c = ensure();
    if (!c || !musicGain) return;
    if (on) {
      if (musicTimer !== null) return;
      musicGain.gain.value = 1;
      musicStep();
      musicTimer = window.setInterval(musicStep, 2000);
    } else {
      if (musicTimer !== null) { clearInterval(musicTimer); musicTimer = null; }
      musicGain.gain.value = 0;
    }
  }

  // ---------------------------------------------------------------- BGM (파일)
  //
  // WebAudio 버퍼가 아니라 <audio> 엘리먼트로 스트리밍한다. 곡이 2~4MB라
  // 통째로 디코드하면 메모리가 아깝고, loop 속성 하나로 반복이 끝난다.
  // 볼륨은 엘리먼트에 직접 건다 (효과음 마스터와 완전히 분리).

  /** 엘리먼트를 완전히 정지하고 버린다 (동기) */
  function killBgm(el: HTMLAudioElement | null) {
    if (!el) return;
    try { el.pause(); el.currentTime = 0; el.src = ""; el.load(); } catch { /* 무시 */ }
  }

  /** 현재 BGM 엘리먼트 볼륨을 musicVolume 까지 짧게 올린다 (새 곡만, 페이드 인) */
  function fadeInBgm() {
    if (bgmFade) { clearInterval(bgmFade); bgmFade = null; }
    const el = bgmEl;
    if (!el) return;
    const t0 = performance.now();
    bgmFade = window.setInterval(() => {
      if (bgmEl !== el) { if (bgmFade) clearInterval(bgmFade); bgmFade = null; return; }
      const k = Math.min(1, (performance.now() - t0) / 400);
      try { el.volume = muted ? 0 : musicVolume * k; } catch { /* 무시 */ }
      if (k >= 1 && bgmFade) { clearInterval(bgmFade); bgmFade = null; }
    }, 40);
  }

  /**
   * bgmWant 를 실제 재생 상태에 반영한다.
   *
   * 이전 곡은 **즉시** 죽인다 (동기 killBgm). 두 <audio>가 동시에 소리를
   * 내는 순간이 없다. 새 곡만 짧게 페이드 인한다.
   */
  function applyBgm() {
    if (!unlocked) return;                 // 자동재생 차단 - unlock()에서 다시 부른다
    const want = bgmWant;
    // 이미 이 곡이 돌고 있으면 - 재생이 막혔었다면 다시 시도만 하고 끝
    if (bgmEl && (bgmEl.dataset.url ?? null) === want && want !== null) {
      if (bgmEl.paused) {
        const p = bgmEl.play();
        if (p && typeof p.catch === "function") {
          p.catch((e: unknown) => { bgmError = `play() 거부: ${(e as Error)?.name ?? e}`; });
        }
      }
      return;
    }

    // 이전 곡 즉시 정지 + 폐기
    if (bgmFade) { clearInterval(bgmFade); bgmFade = null; }
    killBgm(bgmEl);
    bgmEl = null;

    if (!want) return;
    try {
      const el = new Audio(want);
      el.loop = true;
      el.preload = "auto";
      el.volume = 0;
      el.muted = muted;
      el.dataset.url = want;
      // 파일이 없어도 게임은 계속된다. 다만 왜 안 나는지는 남긴다.
      el.addEventListener("error", () => {
        // killBgm() 이 src 를 비우면 버려진 엘리먼트도 error 를 한 번 낸다.
        // 그건 실패가 아니라 정상적인 곡 교체다 - 현재 곡일 때만 기록한다.
        if (bgmEl !== el) return;
        bgmError = `로드 실패(code ${el.error?.code ?? "?"}): ${want}`;
      });
      const p = el.play();
      if (p && typeof p.catch === "function") {
        // 재생 거부 - unlock 후 다음 제스처에서 재시도된다
        p.catch((e: unknown) => { bgmError = `play() 거부: ${(e as Error)?.name ?? e}`; });
      }
      bgmEl = el;
      fadeInBgm();
    } catch { bgmEl = null; }
  }

  function playBgm(url: string | null) {
    if (url === bgmWant) { applyBgm(); return; }   // 같은 곡 재요청이면 재생 보장만
    bgmWant = url;
    bgmError = null;                               // 새 곡 - 이전 곡의 실패 사유는 지운다
    applyBgm();
  }

  return {
    play,
    music,
    playBgm,
    setSfxVolume(v: number) {
      sfxVolume = Math.max(0, Math.min(1, v));
      if (master && !muted) master.gain.value = sfxVolume;
    },
    setMusicVolume(v: number) {
      musicVolume = Math.max(0, Math.min(1, v));
      if (bgmEl && !bgmFade) { try { bgmEl.volume = muted ? 0 : musicVolume; } catch { /* 무시 */ } }
    },
    getSfxVolume() { return sfxVolume; },
    getMusicVolume() { return musicVolume; },
    unlock() {
      const c = ensure();
      if (!c) return;
      unlocked = true;
      if (c.state === "suspended") void c.resume();
      applyBgm();                      // 자동재생 정책: 여기서 처음으로 BGM이 시작된다
    },
    status() {
      return {
        ctx: ctx ? ctx.state : "none", unlocked, muted,
        played: playCount, heard: heardCount,
        sfxVolume, musicVolume,
        bgm: {
          want: bgmWant,
          src: bgmEl ? bgmEl.src : null,
          paused: bgmEl ? bgmEl.paused : null,
          volume: bgmEl ? bgmEl.volume : null,
          readyState: bgmEl ? bgmEl.readyState : null,
          error: bgmError,
        },
      };
    },
    setMuted(m: boolean) {
      muted = m;
      if (master) master.gain.value = m ? 0 : sfxVolume;
      if (bgmEl) bgmEl.muted = m;
    },
    get muted() { return muted; },
    async loadSamples(map) {
      const c = ensure();
      if (!c) return;
      for (const [name, buf] of Object.entries(map)) {
        if (!buf) continue;
        try {
          samples.set(name as SfxName, await c.decodeAudioData(buf.slice(0)));
        } catch { /* 못 읽으면 그냥 합성으로 남는다 */ }
      }
    },
    async loadSampleUrls(map) {
      const c = ensure();
      if (!c) return;
      await Promise.all(Object.entries(map).map(async ([name, url]) => {
        if (!url) return;
        try {
          const res = await fetch(url);
          if (!res.ok) return;
          const buf = await res.arrayBuffer();
          samples.set(name as SfxName, await c.decodeAudioData(buf));
        } catch { /* 파일이 없거나 못 읽으면 그 이름은 합성으로 남는다 */ }
      }));
    },
    dispose() {
      if (musicTimer !== null) clearInterval(musicTimer);
      if (bgmFade) { clearInterval(bgmFade); bgmFade = null; }
      killBgm(bgmEl);
      bgmEl = null;
      bgmWant = null;
      if (ctx) void ctx.close();
      ctx = null;
    },
  };
}
