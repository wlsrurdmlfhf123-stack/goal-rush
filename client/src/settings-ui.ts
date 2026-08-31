/**
 * 오디오 볼륨 설정 UI 배선.
 *
 * 게임 로직·물리·네트워크와는 무관하다. 하는 일은 셋뿐이다.
 *  1) 시작할 때 localStorage 에 저장된 BGM/SFX 볼륨을 audio 에 적용
 *     (저장값이 없으면 현재 게임의 기본 밸런스 = BGM 0.32 / SFX 0.9)
 *  2) index.html 의 슬라이더(#vol-bgm / #vol-sfx)를 움직이면 즉시 반영 + 저장
 *  3) 톱니(#btn-settings-gear) / 닫기 버튼으로 오버레이(#settings)를 열고 닫음
 *
 * 오디오 재생 자체는 audio.ts 의 setMusicVolume()/setSfxVolume() 를 그대로 쓴다
 * (새 오디오 시스템을 만들지 않는다). M 키 전체 음소거도 audio.ts 쪽 그대로.
 */
import type { Audio } from "./audio";

const LS_BGM = "gr.vol.bgm";
const LS_SFX = "gr.vol.sfx";

/** 저장된 값이 없을 때 쓸 기본값 = 현재 게임의 볼륨 밸런스 */
const DEFAULT_BGM = 0.32;
const DEFAULT_SFX = 0.9;

const clamp01 = (n: number) => Math.max(0, Math.min(1, n));

/**
 * 저장된 볼륨을 읽는다. **읽을 수 없는 값은 0이 아니라 null**(= 기본값)이다.
 *
 * [왜 이렇게까지] `Number("")` 도 `Number(" ")` 도 0 이다. 그 0 이 그대로
 * 볼륨이 되면, localStorage 에 빈 값이 한 번 들어간 순간 BGM 이 영영 무음이
 * 된다 - 게다가 <audio> 는 정상 재생 중(paused=false)이라 콘솔에도 아무 것도
 * 안 뜬다. 숫자 모양이 아닌 값은 아예 받지 않는다.
 *
 * 0..100(퍼센트)으로 저장된 옛 값도 여기서 0..1 로 옮겨 준다.
 */
function readStored(key: string): number | null {
  try {
    const raw = localStorage.getItem(key);
    if (raw === null) return null;
    const t = raw.trim();
    if (t === "") return null;                       // 빈 문자열/공백 -> 기본값 (Number("")는 0이다)
    const n = Number(t);
    if (!Number.isFinite(n) || n < 0) return null;   // 쓰레기 값 -> 기본값
    if (n > 1 && n <= 100) return clamp01(n / 100);  // 옛 형식(퍼센트) 마이그레이션
    return clamp01(n);
  } catch {
    return null;
  }
}

function writeStored(key: string, v: number): void {
  try {
    localStorage.setItem(key, String(v));
  } catch {
    /* 프라이빗 모드 등에서 저장 불가 - 조용히 무시 */
  }
}

const el = <T extends HTMLElement = HTMLElement>(id: string) =>
  document.getElementById(id) as T | null;

/**
 * 오디오 볼륨 설정 UI를 초기화한다. main.ts 에서 sfx 생성 직후 한 번 부른다.
 */
export function initSettingsUI(audio: Audio): void {
  // 1) 저장값(또는 기본값)을 오디오에 적용 -- UI 유무와 상관없이 항상.
  audio.setMusicVolume(readStored(LS_BGM) ?? DEFAULT_BGM);
  audio.setSfxVolume(readStored(LS_SFX) ?? DEFAULT_SFX);

  const overlay = el("settings");
  const gear = el<HTMLButtonElement>("btn-settings-gear");
  const closeBtn = el<HTMLButtonElement>("btn-settings-close");
  const bgmSlider = el<HTMLInputElement>("vol-bgm");
  const sfxSlider = el<HTMLInputElement>("vol-sfx");
  const bgmOut = el("vol-bgm-val");
  const sfxOut = el("vol-sfx-val");
  if (!overlay || !bgmSlider || !sfxSlider) return; // HTML 이 없으면 볼륨만 적용하고 끝

  const pct = (v: number) => `${Math.round(v * 100)}%`;

  const showBgm = (v: number) => {
    bgmSlider.value = String(Math.round(v * 100));
    if (bgmOut) bgmOut.textContent = pct(v);
  };
  const showSfx = (v: number) => {
    sfxSlider.value = String(Math.round(v * 100));
    if (sfxOut) sfxOut.textContent = pct(v);
  };
  showBgm(audio.getMusicVolume());
  showSfx(audio.getSfxVolume());

  bgmSlider.addEventListener("input", () => {
    const v = clamp01(Number(bgmSlider.value) / 100);
    audio.setMusicVolume(v);
    if (bgmOut) bgmOut.textContent = pct(v);
    writeStored(LS_BGM, v);
  });
  sfxSlider.addEventListener("input", () => {
    const v = clamp01(Number(sfxSlider.value) / 100);
    audio.setSfxVolume(v);
    if (sfxOut) sfxOut.textContent = pct(v);
    writeStored(LS_SFX, v);
  });
  // 효과음은 값을 바꾼 뒤 한 번 들어봐야 감이 온다. 슬라이더를 놓는 순간 짧게 미리듣기.
  sfxSlider.addEventListener("change", () => audio.play("ui"));

  const open = () => {
    showBgm(audio.getMusicVolume());
    showSfx(audio.getSfxVolume());
    overlay.hidden = false;
  };
  const close = () => {
    overlay.hidden = true;
  };

  gear?.addEventListener("click", open);
  closeBtn?.addEventListener("click", close);
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) close(); // 바깥 여백 클릭 = 닫기
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !overlay.hidden) close();
  });
}
