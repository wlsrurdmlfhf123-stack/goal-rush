import type { ObstacleKind } from "../obstacles";
import { deco, decoCyl } from "../mapkit";
import type { Build } from "../mapkit";

/**
 * 기믹 선언 어휘 — "맵이 무엇을 요구할 수 있는가"의 목록.
 *
 * [이 파일이 왜 있나]
 * 지금 코스 장애물의 인터페이스는 `addObstacle(id, kind, z, arg, phase)`다.
 * 숫자 인자가 `arg` 하나뿐이라 회전봉(봉 길이)이나 피스톤(나오는 쪽)처럼
 * 값이 하나인 기믹까지만 표현된다. 그런데 앞으로 올 스테이지가 요구하는 것은
 *
 *   움직이는 플랫폼  - 축 / 이동 폭 / 속도 / 발판 크기  (값 4개)
 *   바람             - 방향 / 세기 / 구역 폭 / 길이 / 주기 (값 5개)
 *   컨베이어         - 방향 / 속도 / 폭 / 길이           (값 4개)
 *   프레스           - 주기 / 내려와 있는 비율 / 폭      (값 3개)
 *
 * 이라서 `arg` 하나로는 안 된다. 기믹 런타임(obstacles.ts)을 만드는 쪽과
 * 맵을 만드는 쪽이 서로를 기다리지 않도록, **맵이 쓰는 선언 형식**을 여기서
 * 먼저 확정한다. 런타임이 붙기 전까지 그 자리에는 바닥 표식만 그려지고
 * `PENDING_GIMMICKS`에 쌓인다 — 레벨 배치를 지금 눈으로 확인할 수 있다.
 *
 * [기믹 런타임을 만드는 사람에게]
 * 새 kind를 구현했으면 할 일은 두 가지뿐이다.
 *   1. `obstacles.ts`의 `ObstacleKind`에 kind를 추가하고 동작을 구현한다
 *   2. 이 파일의 `GIMMICK_STATUS`에서 그 kind를 `"live"`로 바꾼다
 * 그러면 이미 배치돼 있던 스테이지들이 그대로 살아난다. 맵 파일은 손댈 필요가
 * 없다 — 좌표와 파라미터는 처음부터 스테이지 파일에 적혀 있다.
 */

/** obstacles.ts가 이미 구현해 둔 기믹 */
export type LiveGimmick = ObstacleKind;

/**
 * 스테이지 설계가 요구하지만 아직 런타임이 없는 기믹.
 *
 * 이름은 "무엇을 하는 물건인가"로 짓는다 — 어느 스테이지에서 쓰는지로 지으면
 * (`stage5wind` 같은) 다른 스테이지에서 재사용할 때 이름이 거짓말이 된다.
 */
/**
 * 스테이지 설계가 요구하지만 아직 **장애물 런타임**이 없는 기믹.
 *
 * [thief 는 왜 여기 없나] 「공을 빼앗아 도망가는 AI」는 장애물이 아니라
 * **봇의 역할**로 만들었다 (`bot.ts` 의 `BotRole = "thief"`). 그래야 이미
 * 있는 것을 전부 재사용한다 — 봇은 그냥 래그돌이라 걷기/넘어짐/일어남/충돌이
 * 사람과 똑같이 돌고, 스냅샷 동기화도 공짜다. 장애물로 만들었다면 그 전부를
 * 새로 짜야 했다. 스테이지는 `MapDef.botSpawns` + `botRoles` 로 배치한다.
 */
export type PlannedGimmick = never;

export type GimmickKind = LiveGimmick | PlannedGimmick;

/**
 * 기믹 하나의 선언.
 *
 * `arg`/`phase`는 기존 `addObstacle`과 같은 뜻이라 live 기믹은 그대로 흘러간다.
 * 값이 둘 이상 필요한 기믹은 `params`를 쓴다 — 새 kind가 생겨도 이 인터페이스를
 * 고칠 일이 없게 하려고 자유 사전으로 뒀다.
 */
export interface GimmickSpec {
  kind: GimmickKind;
  /** 코스 상의 z 위치 */
  z: number;
  /**
   * 좌우 위치. 지금 live 기믹은 전부 x=0(레인 중앙)을 전제로 만들어져 있어서
   * 무시된다 — 두 갈래 길에 놓는 planned 기믹만 이 값을 쓴다.
   */
  x?: number;
  /** spinner: 봉 반길이 / piston·shutter: 나오는 쪽(-1 왼쪽, +1 오른쪽) */
  arg?: number;
  /** 시작 위상(초). 서로 다르게 줘야 한꺼번에 움직이지 않는다 */
  phase?: number;
  /** 값이 둘 이상 필요한 기믹의 파라미터 */
  params?: Record<string, number>;
  /**
   * 같은 문자열끼리 한 묶음 (레버 2개 -> 문 1개).
   *
   * 스위치와 문을 z 좌표로 묶으면 "가까운 것끼리"가 되어 스테이지 2처럼
   * **일부러 멀리 떨어뜨린** 배치를 표현할 수 없다. 이름으로 묶는다.
   */
  link?: string;
  /** 이 자리에 이걸 둔 이유. 배치를 나중에 손볼 때 읽는다 */
  note?: string;
}

/**
 * kind별 구현 상태.
 *
 * `"live"`  - obstacles.ts에 동작이 있다. 그대로 addObstacle로 넘어간다
 * `"planned"` - 아직 없다. 바닥 표식만 그리고 PENDING_GIMMICKS에 쌓인다
 */
export const GIMMICK_STATUS: Record<GimmickKind, "live" | "planned"> = {
  spinner: "live",
  piston: "live",
  roller: "live",
  sweeper: "live",
  popup: "live",
  shutter: "live",
  coopgate: "live",
  buttongate: "live",

  // obstacles.ts 에 런타임이 붙었다 (움직이는 발판/컨베이어/바람/공 소켓/레버/신호 문).
  // 좌표와 params 는 스테이지 파일에 이미 적혀 있으므로 맵은 고치지 않았다.
  platform: "live",
  conveyor: "live",
  wind: "live",
  ballsocket: "live",
  lever: "live",
  holdgate: "live",

  // 2인 협동 개편에서 붙은 것들 (프레스 / 둘이 미는 문 / 빙판 / 범퍼 / 점프패드)
  press: "live",
  pushblock: "live",
  ice: "live",
  bumper: "live",
  jumppad: "live",
};

export function isLive(kind: GimmickKind): kind is LiveGimmick {
  return GIMMICK_STATUS[kind] === "live";
}

/**
 * planned 기믹의 표식 색 — 종류마다 달라야 배치가 눈으로 구분된다.
 *
 * 지금은 planned 기믹이 하나도 없다(`PlannedGimmick = never`). 목록을 지우지
 * 않고 비워 두는 이유는, 다음 기믹을 선언하는 사람이 이 자리에 색만 더하면
 * 표식 경로가 그대로 살아나기 때문이다.
 */
const PLACEHOLDER_COLOR: Partial<Record<GimmickKind, number>> = {};

/**
 * 아직 런타임이 없는 기믹의 자리 표시.
 *
 * [왜 아무것도 안 그리지 않는가] 스테이지 파일에 좌표를 적어 놓고 화면에
 * 아무것도 없으면, 나중에 런타임이 붙었을 때 배치가 맞는지 그제야 알게 된다.
 * 바닥에 색 판과 기둥만 세워 두면 지금 걸어 다니면서 "여기 프레스가 서면
 * 길이 막히나"를 눈으로 확인할 수 있다. 물리는 없다(전부 deco) — 표식이
 * 진짜 벽처럼 굴면 없는 기믹이 길을 막는 셈이 된다.
 */
export function drawGimmickPlaceholder(b: Build, g: GimmickSpec) {
  const color = PLACEHOLDER_COLOR[g.kind] ?? 0xffffff;
  const x = g.x ?? 0;
  const p = g.params ?? {};
  const w = p.w ?? p.width ?? 3.2;
  const len = p.len ?? p.length ?? 2.4;

  // 바닥 판 + 테두리
  deco(b, [w, 0.04, len], [x, 0.028, g.z], color, [0, 0, 0], { rough: 0.85 });
  for (const sz of [-1, 1]) {
    deco(b, [w, 0.06, 0.18], [x, 0.045, g.z + sz * (len / 2 - 0.09)], 0x2b2f38, [0, 0, 0], { rough: 0.8 });
  }
  // 낮은 기둥 두 개 — 멀리서도 "여기 뭔가 설 자리"로 읽힌다
  for (const sx of [-1, 1]) {
    decoCyl(b, 0.14, 0.18, 0.9, [x + sx * (w / 2 - 0.2), 0.45, g.z], color, [0, 0, 0], { rough: 0.5 });
  }
}

/**
 * 이번 맵 로드에서 "선언은 됐지만 런타임이 없어" 표식만 그려진 기믹들.
 *
 * `world.loadMap()`이 맵을 새로 지을 때마다 course.ts가 비우고 다시 채운다.
 * 콘솔에서 `__pendingGimmicks`로 볼 수 있게 course.ts가 노출한다.
 */
export const PENDING_GIMMICKS: { map: string; kind: GimmickKind; z: number }[] = [];
