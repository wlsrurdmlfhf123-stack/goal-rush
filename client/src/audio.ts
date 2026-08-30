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
  | "kickCharge"  // 킥 차징 완료
  | "trick"       // 개인기
  | "pickup"      // 공 안기
  | "drop"        // 공 놓기
  | "hit"         // 장애물/봇에 맞음
  | "land"        // 착지
  | "botSpawn"    // 봇 등장
  | "goal"        // 골
  | "fail"        // 실패
  | "countdown"   // 카운트다운 틱
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
  kickCharge: { type: "square",   f0: 660, f1: 880, dur: 0.06, gain: 0.07, attack: 0.004 },
  // 개인기 - 위로 훑는 소리 (뭔가 해냈다는 신호)
  trick:      { type: "triangle", f0: 480, f1: 1150, dur: 0.20, gain: 0.20, attack: 0.004, harmonic: 1.5 },
  pickup:     { type: "sine",     f0: 520, f1: 780, dur: 0.12, gain: 0.16, attack: 0.004 },
  drop:       { type: "sine",     f0: 500, f1: 300, dur: 0.10, gain: 0.13, attack: 0.004 },
  // 충돌 - 낮은 노이즈 덩어리
  hit:        { type: "sawtooth", f0: 180, f1: 60,  dur: 0.24, gain: 0.30, noise: 0.6, attack: 0.001 },
  land:       { type: "triangle", f0: 130, f1: 70,  dur: 0.10, gain: 0.12, noise: 0.5, attack: 0.002 },
  // 봇 등장 - 낮게 깔리는 경고
  botSpawn:   { type: "sawtooth", f0: 300, f1: 120, dur: 0.45, gain: 0.22, attack: 0.02, harmonic: 0.5 },
  goal:       { type: "square",   f0: 520, f1: 1050, dur: 0.55, gain: 0.26, attack: 0.006, harmonic: 1.5 },
  fail:       { type: "sawtooth", f0: 380, f1: 110, dur: 0.7,  gain: 0.24, attack: 0.01 },
  countdown:  { type: "square",   f0: 700, f1: 700, dur: 0.10, gain: 0.18, attack: 0.004 },
  start:      { type: "square",   f0: 900, f1: 1300, dur: 0.30, gain: 0.24, attack: 0.004, harmonic: 1.5 },
  ui:         { type: "sine",     f0: 660, f1: 880, dur: 0.07, gain: 0.12, attack: 0.003 },
};

export interface Audio {
  /** 효과음 한 번. pan은 -1(왼쪽)..1(오른쪽), vol은 배수 */
  play(name: SfxName, opts?: { vol?: number; pan?: number; rate?: number }): void;
  /** 배경음 시작/정지 (합성 루프) */
  music(on: boolean): void;
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
  status(): { ctx: string; unlocked: boolean; muted: boolean; played: number; heard: number };
  readonly muted: boolean;
  /** 파일 음원으로 교체 (있으면 합성 대신 이걸 쓴다) */
  loadSamples(map: Partial<Record<SfxName, ArrayBuffer>>): Promise<void>;
  dispose(): void;
}

export function createAudio(): Audio {
  let ctx: AudioContext | null = null;
  let master: GainNode | null = null;
  let musicGain: GainNode | null = null;
  let musicTimer: number | null = null;
  let muted = false;
  let unlocked = false;
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
  };

  function ensure(): AudioContext | null {
    if (ctx) return ctx;
    try {
      const AC = window.AudioContext ?? (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AC) return null;
      ctx = new AC();
      master = ctx.createGain();
      master.gain.value = 0.9;
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

  return {
    play,
    music,
    unlock() {
      const c = ensure();
      if (!c) return;
      unlocked = true;
      if (c.state === "suspended") void c.resume();
    },
    status() {
      return { ctx: ctx ? ctx.state : "none", unlocked, muted, played: playCount, heard: heardCount };
    },
    setMuted(m: boolean) {
      muted = m;
      if (master) master.gain.value = m ? 0 : 0.9;
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
    dispose() {
      if (musicTimer !== null) clearInterval(musicTimer);
      if (ctx) void ctx.close();
      ctx = null;
    },
  };
}
