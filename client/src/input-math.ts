/**
 * 카메라 기저 벡터 / 마우스 룩 / 충돌 그룹 계산.
 *
 * main.ts 안에 인라인으로 박혀 있던 순수 함수들을 빼냈다. 렌더러/DOM에 의존하지
 * 않으므로 헤드리스로 그대로 테스트할 수 있다 - A/D가 뒤집힌 버그와 pitch가
 * 뒤집힌 버그가 오래 살아남은 이유가 정확히 "이 계산이 테스트 불가능한 위치에
 * 있었기" 때문이다.
 */

export interface CameraBasis {
  /** 정면 방향 (수평 성분, 정규화됨) */
  fx: number;
  fz: number;
  /** 오른쪽 방향 (수평 성분, 정규화됨) */
  rx: number;
  rz: number;
}

/**
 * yaw 로부터 정면/오른쪽 벡터를 만든다.
 *
 * [규약] main.ts updateCamera()가 카메라를
 *     camPos = target - (sin yaw, ·, cos yaw) * dist
 * 에 두고 target을 바라보므로, 화면의 "앞"은 (sin yaw, cos yaw) 이다.
 *
 * [오른쪽 - 여기가 버그였다]
 * three.js는 오른손 좌표계(Y up)다. 이때 오른쪽 벡터는
 *     right = forward × up = (fx,0,fz) × (0,1,0) = (-fz, 0, fx)
 * 검산: 기본 카메라는 -Z를 보고 오른쪽이 +X다.
 *     (0,0,-1) × (0,1,0) = (1,0,0)  ✓
 *
 * 예전 코드는 (cos yaw, -sin yaw) = (fz, -fx) 를 썼는데 이건 위 결과의
 * 정확히 부호 반전, 즉 "왼쪽"이다. 그래서 A가 오른쪽으로, D가 왼쪽으로 갔다.
 */
export function cameraBasis(yaw: number): CameraBasis {
  const fx = Math.sin(yaw), fz = Math.cos(yaw);
  return { fx, fz, rx: -fz, rz: fx };
}

export interface Look { yaw: number; pitch: number; }

/** pitch(카메라 고도각) 상한/하한 */
export const PITCH_MIN = -0.15;
export const PITCH_MAX = 0.85;
/** 마우스 감도 */
export const LOOK_SENS = 0.0022;
/** 한 이벤트에서 반영할 최대 픽셀 이동 (커서 점프로 시점이 튀는 것 방지) */
const MOVE_CAP = 50;

const clamp = (v: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, v));

/**
 * 마우스 이동량을 yaw/pitch에 반영한다.
 *
 * [pitch 부호 - 여기가 버그였다]
 * pitch는 "카메라가 캐릭터보다 얼마나 위에 있는가"(고도각)다.
 *     camY = target.y + sin(pitch) * dist + height
 * 즉 pitch가 커질수록 카메라가 높이 올라가고 => 캐릭터를 내려다본다.
 *
 * 마우스를 위로 올리면 movementY < 0 이고, 이때 플레이어가 기대하는 건
 * "위(하늘)를 본다" = 카메라가 아래로 내려간다 = pitch 감소다.
 * 따라서 pitch += movementY 가 맞다. 예전 코드는 pitch -= movementY 라서
 * 마우스를 올리면 카메라가 더 높이 올라가 바닥을 내려다봤다.
 */
export function applyLook(look: Look, movementX: number, movementY: number): Look {
  const dx = clamp(movementX, -MOVE_CAP, MOVE_CAP);
  const dy = clamp(movementY, -MOVE_CAP, MOVE_CAP);
  return {
    yaw: look.yaw - dx * LOOK_SENS,
    pitch: clamp(look.pitch + dy * LOOK_SENS, PITCH_MIN, PITCH_MAX),
  };
}

/**
 * 래그돌 충돌 그룹: 참가자마다 고유 비트.
 *
 * 사람(id >= 0)은 2, 4, 8 … 1024 를 쓰고, AI 봇(id < 0)은 그 위 2048부터 쓴다.
 *
 * [음수 id를 따로 다루는 이유]
 * 예전엔 `1 << ((playerId % 10) + 1)` 하나였는데, JS의 %는 음수를 음수로
 * 돌려주므로 봇 id -1에서 `1 << 0` = 1 = GROUP_WORLD 가 됐다. 그러면
 * ragdollMask()가 빼는 "자기 자신 그룹"이 월드 비트와 같아져서, 마스크에
 * 자기 그룹이 그대로 남고 래그돌이 자기 팔다리와 충돌한다. 실측으로 봇이
 * 스폰 직후 그 자리에 주저앉아(골반 y 1.01 -> 0.17) 영영 못 일어났다.
 */
export function groupFor(playerId: number): number {
  const i = playerId >= 0
    ? playerId % 10                       // 사람: 0..9  -> 비트 2..1024
    : 10 + ((-playerId - 1) % 4);         // 봇:   10..13 -> 비트 2048..16384
  return 1 << (i + 1);
}

/** 월드 + 다른 모든 래그돌과 충돌 (자기 자신 그룹만 제외) */
export function ragdollMask(myGroup: number): number {
  return 0xffff & ~myGroup;
}
