import type { RagdollColors } from "./ragdoll";

/**
 * 고를 수 있는 캐릭터 프리셋.
 *
 * 예전엔 playerId로 옷을 자동 배정했다(서로소 보폭). 이제는 사람이 직접 고르되,
 * 자동 배정 로직은 "아직 안 고른 사람에게 배정할 기본값"으로 남는다.
 *
 * [왜 프리셋 배열인가] 멀티에서는 내가 고른 캐릭터를 남의 화면에서도 똑같이
 * 그려야 한다. 색 5개(상의/하의/신발/피부/눈)를 통째로 네트워크에 실어보내는
 * 대신 인덱스 하나만 보내면 되고, 인덱스라서 "같은 걸 고른 사람이 있는가"를
 * 비교하기도 쉽다.
 */
export interface CharacterPreset extends RagdollColors {
  /** 선택 화면에 띄울 이름 */
  name: string;
}

export const PRESETS: CharacterPreset[] = [
  { name: "블루베리", shirt: 0x4f9dff, pants: 0x374151, shoes: 0xffffff, skin: 0xffd9b8, eye: 0x1f2a44 },
  { name: "딸기우유", shirt: 0xff9ecb, pants: 0x8a3f52, shoes: 0xffffff, skin: 0xffe2c4, eye: 0x4a2f5d },
  { name: "라임소다", shirt: 0x8ee06a, pants: 0x2f7d68, shoes: 0x2b2f38, skin: 0xf0b184, eye: 0x2f5d3a },
  { name: "귤",       shirt: 0xff8a3d, pants: 0x8c3b2a, shoes: 0xf0d64f, skin: 0xf7c095, eye: 0x3a2a22 },
  { name: "포도",     shirt: 0xb98cff, pants: 0x5b3a7a, shoes: 0x8b5cf6, skin: 0xd99a6c, eye: 0x4a2f5d },
  { name: "민트초코", shirt: 0x5fd8a4, pants: 0x4a4f5c, shoes: 0x6b4a2f, skin: 0x8d5a3a, eye: 0x11151c },
  { name: "레몬",     shirt: 0xffe066, pants: 0x566b2f, shoes: 0x3f8f4f, skin: 0xffd9b8, eye: 0x3a2a22 },
  { name: "체리콕",   shirt: 0xf05f7a, pants: 0x2c5f8a, shoes: 0xd93b3b, skin: 0xb87a4e, eye: 0x1f2a44 },
];

/**
 * 아직 아무것도 안 고른 사람에게 줄 기본 프리셋 인덱스.
 *
 * 팔레트 길이와 서로소인 보폭(3)으로 건너뛰므로 id가 연속인 사람끼리는 반드시
 * 다른 프리셋이 나온다. 해시로 뽑으면 확률적으로 겹친다(실측: 12명 중 6명이
 * 같은 파란 상의였다).
 */
export function defaultPresetFor(playerId: number): number {
  return ((playerId + 1) * 3) % PRESETS.length;   // gcd(3, 8) = 1
}

export function presetColors(index: number): RagdollColors {
  const p = PRESETS[((index % PRESETS.length) + PRESETS.length) % PRESETS.length];
  return { skin: p.skin, shirt: p.shirt, pants: p.pants, shoes: p.shoes, eye: p.eye };
}
