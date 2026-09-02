import { OB } from "../obstacles";

import {
  type V3,
  solid, deco, decoCyl,
  GR, buildFence, buildCloud, buildBalloon, buildKeyPad, buildGoalNet, buildBallSlot, rng,
} from "../mapkit";
import {
  BALL_ID, HAZARD_ID0, OBSTACLE_ID0, STAGE_PROP_ID0, type MapCtx,
} from "./types";
import {
  PENDING_GIMMICKS, drawGimmickPlaceholder, isLive, type GimmickSpec,
} from "./gimmicks";

// ================================================================ Goal Rush! 코스
//
// 하늘 위에 떠 있는 축구 코스. 출발 구역(+Z)에서 도착 구역(-Z)까지 한 방향으로
// 달린다. 카메라 기본 yaw가 π(정면 = -Z)라 스폰하자마자 코스가 눈앞에 뻗어 있다.
//
// [좌표 규약]
//   x: 좌우 (코스 폭). 기본 레인은 ±LANE_HALF
//   z: 진행 방향. START_Z(뒤) -> FINISH_Z(앞, 음수)
//
// [이 파일이 만드는 것 / 안 만드는 것]
// 만드는 것: 바닥, 난간, 낭떠러지 경고, 기둥, 출발·도착, 지름길, 하늘 장식,
//            골대, 공, 그리고 스테이지가 선언한 기믹·낙하물·소품의 "배치".
// 안 만드는 것: 기믹의 동작. 그건 obstacles.ts(런타임)의 몫이고 여기는
//            좌표와 파라미터만 넘긴다.

/** 코스 반폭 (기본 레인에서 달릴 수 있는 면은 ±7) */
export const LANE_HALF = 7;
/** 좁은 다리 구간의 반폭 */
export const BRIDGE_HALF = 2.6;
/** 두 갈래 길 한쪽의 반폭 (둘을 합쳐도 기본 레인 안에 들어간다) */
export const SPLIT_HALF = 3.0;
/** 두 갈래 길 한쪽의 중심 x */
export const SPLIT_X = 4.0;

/** 코스 바닥 두께 (아랫면이 보여야 "떠 있다"가 읽힌다) */
const DECK_H = 1.2;

/** 골대 반폭. game.ts의 골라인 판정 폭과 같은 값을 쓴다 */
export const GOAL_HALF_W = 4.2;

/**
 * 코스 바닥 한 조각.
 *
 * [왜 튜플에서 객체로 바꿨나] 예전에는 `[z0, z1, half]` 세 값이었다. 그러면
 * 표현할 수 있는 코스가 "가운데 정렬된 판을 z로 이어붙인 것"뿐이라
 *
 *   - 낭떠러지 (판 사이가 비어 있는 구간)          -> 스테이지 3
 *   - 두 갈래 길 (같은 z에 왼쪽 판과 오른쪽 판)    -> 스테이지 7
 *
 * 를 만들 수 없다. 둘 다 스테이지 설계의 핵심이라 x와 옵션을 붙였다.
 *
 * **판은 이어 붙일 의무가 없다.** 두 판 사이를 비워 두면 그게 낭떠러지고,
 * 끊긴 자리에는 경고 줄무늬가 자동으로 그려진다(아래 "낭떠러지 경고" 참고).
 */
export interface CourseSection {
  /** 시작 z (진행 방향이 -Z이므로 z0 > z1) */
  z0: number;
  z1: number;
  /** 반폭 */
  half: number;
  /** 중심 x. 기본 0 (두 갈래 길에서만 쓴다) */
  x?: number;
  /**
   * 난간을 어느 쪽에 세울 것인가.
   *
   * `"auto"`(기본) - 폭이 기본 레인만 하면 양쪽에, 좁으면 아예 안 세운다.
   *                  "좁은 길은 떨어질 수 있어야 긴장이 산다"는 규칙 그대로다.
   * `"none"`       - 세우지 않는다
   * `"both"|"left"|"right"` - 명시적으로 고른다 (갈래길의 바깥쪽만 막을 때)
   */
  fence?: "auto" | "none" | "both" | "left" | "right";
  /**
   * 가장자리에 공만 붙잡는 낮은 턱을 둘 것인가.
   *
   * 기본은 "난간이 없는 쪽에는 턱을 둔다". 난간 없는 구간에서 공까지 같이
   * 떨어지면 그 구간이 통째로 "공 주우러 되돌아가는 시간"이 된다(실측으로
   * 자동 완주가 여기서 두 번 연속 시간 초과로 끝났다). 사람 골반은 0.86이라
   * 턱(0.42)을 그냥 넘어가므로 **사람은 여전히 떨어질 수 있다** — 긴장은
   * 그대로 두고 공만 붙잡는다.
   */
  curb?: boolean;
  /** 바닥 색 (구간을 색으로 구분하고 싶을 때) */
  color?: number;
}

/** 튜플로 적어도 되게 열어 둔다 — 폭만 바뀌는 평범한 구간은 이쪽이 짧다 */
export type SectionLike = CourseSection | [number, number, number];

/**
 * 코스를 가로막는 고정 벽 한 장.
 *
 * [왜 필요해졌나] 「둘이 밀어야 움직이는 문」(`pushblock`)은 **길을 막고 있어야**
 * 의미가 있다. 그런데 지금까지 코스가 만들 수 있는 것은 바닥과 난간뿐이라,
 * 레인 한가운데에 문틀을 세울 방법이 없었다 — 문 옆으로 그냥 걸어서 지나가면
 * 협동 장치가 장식이 된다.
 *
 * 벽은 `solid()`라 실제 물리 바디가 하나 늘어난다(장식이 아니다). 문틀 하나에
 * 둘이면 충분하므로 남발하지 않는다.
 */
export interface StageWall {
  /** 중심 x / z */
  x: number;
  z: number;
  /** 가로 폭 */
  w: number;
  /** 높이 (기본 2.6 — 사람이 못 넘는다) */
  h?: number;
  /** z 방향 두께 (기본 1.0) */
  len?: number;
  color?: number;
}

/** 스테이지가 직접 놓는 소품 (둘이 밀어야 하는 상자 등) */
export interface StageProp {
  /** [가로, 높이, 깊이] */
  size: V3;
  pos: V3;
  color: number;
  /**
   * 질량.
   *
   * 20(PROP_HEAVY_MASS)이 "혼자면 겨우 밀고 둘이면 옮긴다"의 기준점이다.
   * 그보다 무겁게 잡으면 둘이 같이 밀어야만 움직인다 — carry.ts가 사람 하나의
   * 수평 밀기 힘을 예산으로 제한하고 있어서 질량만으로 협동을 요구할 수 있다.
   */
  mass: number;
  grabRadius?: number;
}

/**
 * 한 스테이지의 코스 설정.
 *
 * [왜 설정으로 뺐나] 데크/난간/기둥/하늘 장식처럼 어느 스테이지에나 똑같은
 * 부분까지 스테이지 수만큼 복사되는 것을 막기 위해서다. 달라지는 것(구간
 * 경계, 기믹 목록, 색, 시드)만 스테이지 파일에 적고 나머지는 여기가 만든다.
 */
export interface StageCfg {
  startZ: number;
  finishZ: number;
  /** 바닥 조각 목록. 비워 둔 z 구간이 곧 낭떠러지다 */
  sections: SectionLike[];
  /** 구간 경계에 세울 아치 [z, 색] */
  gates: [number, number][];
  /** 낙하 장애물 z 목록 */
  hazards?: number[];
  /** 이 스테이지가 요구하는 기믹 목록 (maps/gimmicks.ts의 어휘) */
  gimmicks?: GimmickSpec[];
  /** 스테이지가 직접 놓는 소품 */
  props?: StageProp[];
  /** 레인을 가로막는 고정 벽 (문틀을 세울 때 쓴다) */
  walls?: StageWall[];
  /**
   * 공만 지나가는 낮은 틈의 z 목록 (mapkit buildBallSlot).
   * 사람은 옆으로 돌아가야 하므로 킥과 드리블을 따로 쓰게 된다.
   */
  ballSlots?: number[];
  /**
   * 위험한 지름길 [입구z, 출구z] 목록 (입구 > 출구).
   *
   * 난간 바깥에 난간 없는 좁은 선반을 놓고, 본선 난간에 입출구 구멍을 낸다.
   * 선반은 장애물이 깔린 x 범위(±LANE_HALF) 바깥이라 그 구간의 장애물을
   * 통째로 건너뛴다 - 대신 폭이 3m이고 난간이 없어서 공을 몰고 가다 한 번
   * 삐끗하면 떨어진다(떨어지면 조금 뒤로 리스폰). 그래서 "안전하게 장애물을
   * 뚫을래, 아니면 빠르게 선반으로 갈래"가 진짜 선택이 된다.
   *
   * 협동 관문과 공 전용 틈은 절대 건너뛰게 두지 않는다. 그건 이 게임이 둘이서
   * 하는 이유라서, 우회로가 생기면 의미가 사라진다.
   */
  shortcuts?: [number, number][];
  /**
   * 체크포인트의 z 목록. `MapDef.checkpoints`와 **같은 값**을 적어야 한다 —
   * 위쪽은 런타임(main.ts)이 판정에 쓰고, 여기는 바닥에 표시를 그린다.
   */
  checkpoints?: number[];
  /** 튜토리얼 패드를 깔 것인가 (1스테이지만) */
  tutorial?: boolean;
  /** 공의 시작 위치 [x, z]. 기본은 출발선 안쪽 가운데 */
  ballStart?: [number, number];
  /** 난수 시드 (하늘 장식 배치) */
  seed: number;
  /** 디버그/보고용 이름. PENDING_GIMMICKS에 실린다 */
  label?: string;
}

/**
 * 튜토리얼 바닥 패드 [z, 키 이름, 색].
 *
 * main.ts가 같은 z를 읽어서 HUD 한 줄 안내를 띄운다 (좌표를 공유해서 바닥
 * 표시와 안내가 어긋나지 않게 한다).
 */
export const TUTORIAL_PADS: [number, string, number][] = [
  [6, "WASD", 0x3fb8f0],
  [-1, "F", 0xf0913f],
  [-6, "SHIFT", 0x9b6cff],
  [-11, "E", 0x3fc98a],
];
/** 패드 판정 반지름 (z 기준). 이 안에 들어오면 그 단계 안내가 뜬다 */
export const TUTORIAL_PAD_HALF = 2.6;

/**
 * 문틀의 최소 높이 (m).
 *
 * 점프 최고 높이가 골반 y=1.66(평지 0.86에서 +0.80)이므로 발이 올라설 수 있는
 * 턱은 0.8m 남짓이다. 2.0m면 뛰어올라 걸터앉을 수 없다.
 * 실제로는 게이트 높이(2.6) 쪽이 커서 이 값이 쓰이는 건 미는 문(2.2)뿐이다.
 */
const FRAME_MIN_H = 2.0;

/**
 * 이 기믹이 「레인을 막는 문」인가. 맞으면 그 **통로**의 치수를 돌려준다.
 *
 * [world.ts 와 반드시 같은 값이어야 한다] 여기서 돌려주는 half/h/depth 는
 * `world.ts` 의 `addObstacle` 이 만드는 **collider 치수와 같은 식**으로 계산한다.
 * 한쪽만 바꾸면 문틀과 문 사이에 틈이 생기거나 겹친다.
 * (`test:map` 의 「gate side bypass」 검사가 이 일치를 매번 확인한다)
 */
function gateOpening(g: GimmickSpec): { x: number; half: number; h: number; depth: number } | null {
  const p = g.params ?? {};
  switch (g.kind) {
    // 문 몸체가 항상 레인 중앙(x=0)에 고정이다 (obstacles.ts park/update)
    case "coopgate":
    case "buttongate":
      return { x: 0, half: OB.gateW / 2, h: OB.gateH, depth: OB.gateD };
    // 신호 문은 맵이 폭·높이·좌우 위치를 정한다
    case "holdgate":
      return { x: g.x ?? 0, half: (p.w ?? OB.gateW) / 2, h: p.h ?? OB.gateH, depth: OB.gateD };
    // 미는 문은 상자 자체가 마개다. 통로가 상자 폭과 같아야 딱 맞게 막힌다
    case "pushblock":
      return { x: g.x ?? 0, half: (p.w ?? OB.pushW) / 2, h: p.h ?? OB.pushH, depth: p.len ?? OB.pushD };
    default:
      return null;
  }
}

interface Sec extends CourseSection { x: number }

function normSection(s: SectionLike): Sec {
  const o = Array.isArray(s) ? { z0: s[0], z1: s[1], half: s[2] } : s;
  return { ...o, x: o.x ?? 0 };
}

export function makeCourse(cfg: StageCfg) {
  return function build({ b, addProp, addBall, addHazard, addObstacle }: MapCtx) {
  const { startZ: START_Z, finishZ: FINISH_Z } = cfg;
  const rnd = rng(cfg.seed);
  const secs = cfg.sections.map(normSection);
  const tag = cfg.label ?? "stage";

  // ---------------------------------------------------------- 바닥 만들기
  //
  // 물리는 구간마다 판 하나씩이면 충분하다. 줄무늬는 전부 장식(deco)이라
  // 바디가 늘지 않는다 - 200m 코스에 줄무늬마다 바디를 만들면 수백 개가 된다.
  function deck(s: Sec) {
    const { z0, z1, half, x } = s;
    const color = s.color ?? GR.laneB;
    const len = z0 - z1;
    const mid = (z0 + z1) / 2;
    solid(b, [half * 2, DECK_H, len], [x, -DECK_H / 2, mid], color, [0, 0, 0], { rough: 0.6 });

    // 진행 방향 줄무늬 - 달릴 때 속도감을 만드는 가장 싼 방법이다
    for (let z = z1; z < z0; z += 4) {
      const w = Math.min(4, z0 - z);
      deco(b, [half * 2 - 0.4, 0.04, w * 0.5], [x, 0.02, z + w * 0.25], GR.laneA, [0, 0, 0], { rough: 0.75 });
    }
    // 가장자리 띠 - 코스 폭을 눈으로 딱 잡아준다
    for (const sx of [-1, 1]) {
      deco(b, [0.5, 0.06, len], [x + sx * (half - 0.25), 0.03, mid], GR.laneEdge, [0, 0, 0], { rough: 0.6 });
    }
    // 아랫면 - 하늘에 떠 있는 판임을 보여주는 부분
    deco(b, [half * 2 + 0.5, 0.5, len], [x, -DECK_H - 0.2, mid], GR.skirt, [0, 0, 0], { rough: 0.7 });
  }

  /** 구간 시작을 알리는 색 띠 + 아치 기둥 */
  function gate(z: number, color: number) {
    deco(b, [LANE_HALF * 2 - 0.6, 0.06, 0.7], [0, 0.045, z], color, [0, 0, 0], { rough: 0.7 });
    for (const sx of [-1, 1]) {
      decoCyl(b, 0.28, 0.28, 3.4, [sx * (LANE_HALF - 0.4), 1.7, z], color, [0, 0, 0], { rough: 0.45 });
    }
    deco(b, [LANE_HALF * 2, 0.32, 0.32], [0, 3.4, z], color, [0, 0, 0], { rough: 0.45 });
  }

  for (const s of secs) deck(s);
  for (const [z, col] of cfg.gates) gate(z, col);

  // ---------------------------------------------------------- 낭떠러지 경고
  //
  // [자동으로 그리는 이유] 판 사이를 비워 두는 것만으로 낭떠러지가 되게 했다.
  // 그런데 하늘 코스는 아래가 전부 하늘이라, 달리는 눈높이에서 바닥이 끊긴
  // 자리와 이어진 자리가 똑같이 하늘색이다 - "안 보이는 구멍"은 웃긴 실패가
  // 아니라 그냥 억울한 실패다. 판 끝이 허공이면 여기서 줄무늬를 그린다.
  // 스테이지 파일이 손으로 적으면 배치를 옮길 때마다 어긋나므로 자동으로 한다.

  /** (x, z)가 어떤 판 위인가 */
  const onDeck = (x: number, z: number) =>
    secs.some((s) => z <= s.z0 + 0.01 && z >= s.z1 - 0.01 && Math.abs(x - s.x) <= s.half + 0.01);

  for (const s of secs) {
    // 앞뒤 끝
    for (const [edgeZ, dir] of [[s.z0, 1], [s.z1, -1]] as [number, number][]) {
      if (onDeck(s.x, edgeZ + dir * 0.6)) continue;
      // 출발선 뒤 / 코스 끝은 벽으로 막으므로 경고가 필요 없다
      if (Math.abs(edgeZ - START_Z) < 0.01 || Math.abs(edgeZ - FINISH_Z) < 0.01) continue;
      const n = Math.max(3, Math.round(s.half));
      const w = (s.half * 2) / n;
      for (let i = 0; i < n; i++) {
        deco(b, [w * 0.86, 0.07, 0.7], [s.x - s.half + w * (i + 0.5), 0.05, edgeZ - dir * 0.4],
          i % 2 ? 0x2b2f38 : 0xffd166, [0, 0, 0], { rough: 0.8 });
      }
    }
    // 좁은 판의 좌우 (갈래길 안쪽처럼 바로 옆이 허공인 가장자리)
    if (s.half >= LANE_HALF) continue;
    for (const sx of [-1, 1]) {
      if (onDeck(s.x + sx * (s.half + 0.6), (s.z0 + s.z1) / 2)) continue;
      deco(b, [0.34, 0.07, s.z0 - s.z1], [s.x + sx * (s.half - 0.17), 0.045, (s.z0 + s.z1) / 2],
        0xff5d73, [0, 0, 0], { rough: 0.7 });
    }
  }

  // ---------------------------------------------------------- 중앙선 검사
  //
  // [반드시 지켜야 하는 규칙 — 낭떠러지를 팔 때 읽을 것]
  // 공이 코스 밖으로 떨어지면 main.ts의 checkFalls가 **항상 x = 0**으로
  // 되돌린다(사람들 평균 z 근처, 높이 1.2m). 그래서 x=0 줄이 어느 z에서든
  // 바닥이 아니면, 공이 되돌아오자마자 다시 떨어지는 무한 루프가 된다.
  //
  // 즉 코스를 좌우로 가르는 낭떠러지는 얼마든지 파도 되지만, **가운데를
  // 가로로 완전히 끊어서는 안 된다.** 끊고 싶으면 아주 좁아도 좋으니 x=0을
  // 지나는 판(외줄 다리)을 남기고, 넓고 편한 길을 옆에 따로 둔다.
  //
  // 스테이지를 손볼 때마다 사람이 기억하고 있을 수는 없으므로 여기서 센다.
  {
    const holes: number[] = [];
    for (let z = START_Z - 1; z > FINISH_Z + 1; z -= 1) if (!onDeck(0, z)) holes.push(z);
    if (holes.length) {
      console.warn(
        `[course:${tag}] x=0에 바닥이 없는 z가 ${holes.length}곳 있다 ` +
        `(${holes[0]} ~ ${holes[holes.length - 1]}). 떨어진 공이 x=0으로 되돌아오므로 ` +
        `그 자리에서 무한히 다시 떨어진다. 좁아도 좋으니 가운데를 잇는 판을 남길 것.`,
      );
    }
  }

  // 코스 아래 기둥 (아래로 사라지게 - 끝을 안 보여주면 더 높아 보인다)
  for (const s of secs) {
    for (let z = s.z0 - 8; z > s.z1; z -= 26) {
      for (const sx of [-1, 1]) {
        decoCyl(b, 0.5, 0.34, 14, [s.x + sx * (s.half - 1.0), -DECK_H - 7.2, z], GR.post, [0, 0, 0], { rough: 0.6 });
      }
    }
  }

  // ---------------------------------------------------------- 출발 / 도착
  deco(b, [LANE_HALF * 2 - 0.6, 0.05, 11], [0, 0.035, START_Z - 5.5], GR.start, [0, 0, 0], { rough: 0.7 });
  deco(b, [LANE_HALF * 2 - 0.6, 0.05, 9], [0, 0.035, FINISH_Z + 4.5], GR.finish, [0, 0, 0], { rough: 0.7 });
  for (let i = 0; i < 14; i++) {
    const w = (LANE_HALF * 2 - 0.6) / 14;
    deco(b, [w, 0.06, 0.5], [-LANE_HALF + 0.3 + w * (i + 0.5), 0.045, FINISH_Z + 9],
      i % 2 ? 0xffffff : 0x2b2f38, [0, 0, 0], { rough: 0.8 });
  }
  deco(b, [LANE_HALF * 2 - 0.6, 0.06, 0.4], [0, 0.045, START_Z - 11.5], 0xffffff, [0, 0, 0], { rough: 0.8 });

  // ---------------------------------------------------------- 위험한 지름길
  //
  // 본선 난간 바깥(+x)에 난간 없는 좁은 선반을 놓는다. 입출구에서만 본선과
  // 이어지고, 그 사이는 장애물이 하나도 없다 - 대신 떨어지면 리스폰이다.
  /** 선반 중심의 x */
  const SC_X = LANE_HALF + 3.2;
  /** 선반 반폭 (3m 남짓 - 혼자 달리기엔 넉넉하고 공을 몰기엔 아슬아슬하다) */
  const SC_HALF = 1.5;
  /** 입출구 통로의 z 방향 반길이 */
  const SC_MOUTH = 1.6;

  /** [z0,z1]에서 지름길 입출구 구멍을 뺀 난간 구간들 */
  function fenceRuns(z0: number, z1: number): [number, number][] {
    const holes: [number, number][] = [];
    for (const [ez, xz] of cfg.shortcuts ?? []) {
      for (const mz of [ez, xz]) {
        const a = Math.min(z0, mz + SC_MOUTH), c = Math.max(z1, mz - SC_MOUTH);
        if (a > c) holes.push([a, c]);
      }
    }
    if (holes.length === 0) return [[z0, z1]];
    holes.sort((p, q) => q[0] - p[0]);   // z가 큰 것부터 (진행 방향 순)
    const runs: [number, number][] = [];
    let cur = z0;
    for (const [a, c] of holes) {
      if (cur > a) runs.push([cur, a]);
      cur = Math.min(cur, c);
    }
    if (cur > z1) runs.push([cur, z1]);
    return runs;
  }

  for (const [ez, xz] of cfg.shortcuts ?? []) {
    const len = ez - xz;
    // 선반 바닥
    solid(b, [SC_HALF * 2, DECK_H, len], [SC_X, -DECK_H / 2, (ez + xz) / 2],
      GR.laneB, [0, 0, 0], { rough: 0.6 });
    // 가장자리 경고색 - 난간이 없다는 걸 색으로 알린다
    for (const sx of [-1, 1]) {
      deco(b, [0.34, 0.07, len], [SC_X + sx * (SC_HALF - 0.17), 0.04, (ez + xz) / 2],
        0xff5d73, [0, 0, 0], { rough: 0.7 });
    }
    deco(b, [SC_HALF * 2 + 0.5, 0.5, len], [SC_X, -DECK_H - 0.2, (ez + xz) / 2],
      GR.skirt, [0, 0, 0], { rough: 0.7 });
    // 본선과 잇는 입출구 바닥
    for (const mz of [ez, xz]) {
      const gapMid = (LANE_HALF + SC_X - SC_HALF) / 2;
      const gapW = SC_X - SC_HALF - LANE_HALF;
      if (gapW > 0.05) {
        solid(b, [gapW, DECK_H, SC_MOUTH * 2], [gapMid, -DECK_H / 2, mz],
          GR.laneB, [0, 0, 0], { rough: 0.6 });
      }
      // 입구 표시 - 노란 화살표 대신 굵은 띠 두 줄로 "여기로 빠진다"를 읽힌다
      deco(b, [gapW + 1.2, 0.06, 0.34], [gapMid, 0.045, mz + SC_MOUTH - 0.2],
        0xffd166, [0, 0, 0], { rough: 0.7 });
      deco(b, [gapW + 1.2, 0.06, 0.34], [gapMid, 0.045, mz - SC_MOUTH + 0.2],
        0xffd166, [0, 0, 0], { rough: 0.7 });
    }
    // 선반 양 끝 막이.
    //
    // [왜 필요한가] 막이가 없으면 출구(z=xz)를 못 보고 지나쳐 선반 끝에서
    // 그대로 허공으로 떨어진다 - 실측으로 z=-78 출구를 3m 지나쳐 낙하했다.
    // 위험은 "폭이 좁아서 옆으로 떨어지는 것"이어야지 "끝이 어딘지 몰라서
    // 앞으로 떨어지는 것"이면 안 된다. 앞뒤는 막고 좌우만 열어 둔다.
    for (const [mz, dir] of [[ez, 1], [xz, -1]] as [number, number][]) {
      solid(b, [SC_HALF * 2, 1.2, 0.4], [SC_X, 0.6, mz + dir * (SC_MOUTH + 0.2)],
        GR.fence, [0, 0, 0], { rough: 0.5 });
      deco(b, [SC_HALF * 2, 0.14, 0.5], [SC_X, 1.27, mz + dir * (SC_MOUTH + 0.2)],
        0xff5d73, [0, 0, 0], { rough: 0.4 });
    }

    // 선반 아래 기둥 (본선 기둥과 같은 간격으로)
    for (let z = ez - 6; z > xz; z -= 26) {
      decoCyl(b, 0.45, 0.3, 14, [SC_X, -DECK_H - 7.2, z], GR.post, [0, 0, 0], { rough: 0.6 });
    }
  }

  // ---------------------------------------------------------- 좌우 경계
  //
  // 폭이 좁은 구간(다리 / 갈래길)은 난간을 두지 않는다 - 떨어질 수 있어야
  // 긴장이 산다 (떨어지면 main.ts가 조금 뒤로 리스폰시킨다).
  for (const s of secs) {
    const mode = s.fence ?? "auto";
    const narrow = s.half < LANE_HALF;
    const wantLeft = mode === "both" || mode === "left" || (mode === "auto" && !narrow);
    const wantRight = mode === "both" || mode === "right" || (mode === "auto" && !narrow);
    const wantCurb = s.curb ?? (!wantLeft || !wantRight);

    if (wantLeft) buildFence(b, s.x - s.half, s.z0, s.z1);
    // 지름길이 있는 쪽(+x) 난간은 입출구만큼 끊어서 세운다
    if (wantRight) {
      for (const [a, c] of fenceRuns(s.z0, s.z1)) buildFence(b, s.x + s.half, a, c);
    }

    // 좁은 구간 입구/출구에 난간 끝단 - 여기서부터 난간이 없다는 걸 보여준다
    if (narrow) {
      for (const z of [s.z0, s.z1]) {
        for (const sx of [-1, 1]) {
          if ((sx < 0 && wantLeft) || (sx > 0 && wantRight)) continue;
          decoCyl(b, 0.34, 0.34, 2.2, [s.x + sx * (s.half + 0.4), 1.1, z], 0xffd166, [0, 0, 0], { rough: 0.45 });
        }
      }
    }

    /**
     * 가장자리 턱 — 공만 붙잡는 낮은 문턱.
     *
     * [왜 필요한가] 난간이 없는 게 이 구간의 규칙이라 사람은 떨어져야 맞다.
     * 그런데 공까지 같이 굴러 떨어지면 얘기가 달라진다 - 그 구간이 통째로
     * "공 주우러 되돌아가는 시간"이 되고, 실측으로 자동 완주가 여기서 두 번
     * 연속 시간 초과로 끝났다. 긴장은 "내가 떨어질 수 있다"에서 나오지
     * "공을 또 주우러 간다"에서 나오지 않는다.
     *
     * 공 반지름(0.3)보다 조금 높게만 두면 굴러오는 공은 걸리고(세게 차면
     * 넘어간다 = 여지는 남는다), 사람은 골반이 0.86이라 그냥 넘어간다
     * = 여전히 떨어질 수 있다.
     */
    if (wantCurb) {
      for (const sx of [-1, 1]) {
        if ((sx < 0 && wantLeft) || (sx > 0 && wantRight)) continue;
        solid(b, [0.22, 0.42, s.z0 - s.z1], [s.x + sx * (s.half - 0.11), 0.21, (s.z0 + s.z1) / 2],
          0xffd166, [0, 0, 0], { rough: 0.6 });
      }
    }
  }
  // 출발선 뒤 / 코스 끝을 막는다
  for (const z of [START_Z, FINISH_Z]) {
    solid(b, [LANE_HALF * 2, 1.7, 0.4], [0, 0.85, z], GR.fence, [0, 0, 0], { rough: 0.5 });
    deco(b, [LANE_HALF * 2, 0.16, 0.5], [0, 1.78, z], GR.fenceTop, [0, 0, 0], { rough: 0.4 });
  }

  // ---------------------------------------------------------- 하늘 장식
  /** 그 z에서 가장 바깥에 있는 판의 끝 x (장식을 코스 밖에 두기 위해) */
  const outerAt = (z: number) => {
    let m = 0;
    for (const s of secs) if (z <= s.z0 && z >= s.z1) m = Math.max(m, Math.abs(s.x) + s.half);
    return m || LANE_HALF;
  };
  for (let z = START_Z + 6; z > FINISH_Z - 10; z -= 11) {
    const side = rnd() > 0.5 ? 1 : -1;
    buildCloud(b, side * (LANE_HALF + 5 + rnd() * 5), -2 - rnd() * 4, z + rnd() * 5, 1.1 + rnd() * 0.9);
    if (rnd() > 0.5) {
      buildCloud(b, -side * (LANE_HALF + 7 + rnd() * 6), 3 + rnd() * 5, z - rnd() * 6, 0.9 + rnd() * 0.8);
    }
  }
  let bi = 0;
  for (let z = START_Z - 4; z > FINISH_Z + 4; z -= 14) {
    for (const sx of [-1, 1]) {
      const col = GR.balloon[bi++ % GR.balloon.length];
      buildBalloon(b, sx * (outerAt(z) + 1.1), 3.2 + (bi % 3) * 0.5, z, col, 1);
    }
  }

  // ---------------------------------------------------------- 배치
  //
  // 전부 플레이어를 쫓지 않는다. 회전봉/피스톤은 위상만으로 움직이고,
  // 낙하물과 거대 공이 나오는 x는 시드 난수다 (hazards.ts / obstacles.ts).

  (cfg.hazards ?? []).forEach((z, i) => addHazard(HAZARD_ID0 + i, z, 2.2 + i * 1.15));

  // 이 맵이 지난번에 남긴 pending 기록을 지우고 다시 센다 (맵을 다시 로드해도
  // 목록이 두 배가 되지 않게)
  for (let i = PENDING_GIMMICKS.length - 1; i >= 0; i--) {
    if (PENDING_GIMMICKS[i].map === tag) PENDING_GIMMICKS.splice(i, 1);
  }

  // 맵은 신호를 **이름**으로 묶는다 ("lab-door"). 런타임은 번호로 다룬다.
  // 여기서 한 번만 이름 -> 번호로 바꾼다. 등장 순서가 곧 채널 번호다.
  const linkIds = new Map<string, number>();
  const linkId = (name?: string) => {
    if (name === undefined) return undefined;
    let n = linkIds.get(name);
    if (n === undefined) { n = linkIds.size; linkIds.set(name, n); }
    return n;
  };

  let oid = OBSTACLE_ID0;
  for (const g of cfg.gimmicks ?? []) {
    if (!isLive(g.kind)) {
      // 런타임이 아직 없다. 자리만 표시해 두고 목록에 남긴다.
      drawGimmickPlaceholder(b, g);
      PENDING_GIMMICKS.push({ map: tag, kind: g.kind, z: g.z });
      continue;
    }
    addObstacle(oid++, g.kind, g.z, g.arg ?? 0, g.phase ?? 0,
      { x: g.x, params: g.params, link: linkId(g.link) });

    // 버튼 문의 발판은 문과 함께 가라앉으면 안 되므로(문 바디를 따라가는
    // 그룹이 아니라) 바닥 장식으로 따로 깐다. 물리는 없다 - 밟았는지는
    // obstacles.ts가 골반 위치로 판정한다.
    if (g.kind === "buttongate") {
      for (const sx of [-1, 1]) {
        const px = sx * OB.btnPadX, pz = g.z + OB.btnPadAhead;
        deco(b, [OB.btnPadHalf * 2, 0.06, OB.btnPadHalf * 2], [px, 0.045, pz],
          0x8b5cf6, [0, 0, 0], { rough: 0.6 });
        deco(b, [OB.btnPadHalf * 1.5, 0.09, OB.btnPadHalf * 1.5], [px, 0.07, pz],
          0xffd166, [0, 0, 0], { rough: 0.5 });
        // 발판 -> 문을 잇는 선. "이걸 밟으면 저게 열린다"를 눈으로 잇는다
        deco(b, [0.14, 0.05, OB.btnPadAhead], [px, 0.035, g.z + OB.btnPadAhead / 2],
          0x8b5cf6, [0, 0, 0], { rough: 0.7 });
      }
    }
  }

  // ---- 스위치와 문을 눈으로 잇는다
  //
  // [왜 필요한가] buttongate는 발판과 문이 한 몸이라 관계가 저절로 보이는데,
  // lever는 문에서 **떨어뜨려 놓는 것이 목적**이라 아무것도 안 그리면
  // "이 판을 밟으면 뭐가 열리는가"를 알 방법이 없다. 바닥에 색 줄 하나만
  // 그어 두면 밟고 서서 고개를 들면 그 줄이 문으로 이어져 있다.
  // 전부 장식(deco)이라 물리 바디가 늘지 않는다.
  {
    const gates = (cfg.gimmicks ?? []).filter((g) => g.kind === "holdgate" || g.kind === "coopgate");
    for (const sw of cfg.gimmicks ?? []) {
      if (sw.kind !== "lever" && sw.kind !== "ballsocket") continue;
      if (sw.link === undefined) continue;
      const door = gates.find((d) => d.link === sw.link);
      if (!door) continue;
      const sx = sw.x ?? 0, dx = door.x ?? 0;
      const steps = Math.max(2, Math.round(Math.abs(sw.z - door.z) / 2.2));
      for (let i = 0; i <= steps; i++) {
        const t = i / steps;
        deco(b, [0.16, 0.05, 1.0], [sx + (dx - sx) * t, 0.035, sw.z + (door.z - sw.z) * t],
          0x8b5cf6, [0, 0, 0], { rough: 0.7 });
      }
    }
  }

  // ---------------------------------------------------------- 고정 벽 (문틀)
  //
  // [왜 게이트마다 자동으로 세우는가 — 실측으로 드러난 구멍]
  // 게이트(coopgate/buttongate/holdgate)의 몸체는 폭 5.6m인데 레인은 14m다.
  // mesh와 collider는 정확히 일치하지만(둘 다 5.6), **좌우에 4.02m씩 빈 바닥이
  // 남아서 닫힌 문 옆으로 그냥 걸어 지나갈 수 있었다.** 브라우저에서 확인한
  // 실제 경로: 스테이지 1의 홀드게이트(z=-84)를 x=-5로 지나 z=-108.9까지
  // 아무 저항 없이 통과했다. 「혼자서는 못 지나간다」가 통째로 거짓이었다.
  //
  // 스테이지 파일이 벽을 손으로 적게 하면(스테이지 4의 미는 문이 그랬다)
  // 게이트를 하나 추가할 때마다 잊어버릴 수 있다 — 실제로 그렇게 잊었다.
  // 그래서 **게이트를 선언하면 문틀이 따라온다.**
  //
  // 문틀은 게이트가 열려도 남는다(정적 바디다). 열리는 것은 가운데 통로뿐이다.
  const frameWalls: StageWall[] = [];
  for (const g of cfg.gimmicks ?? []) {
    const op = gateOpening(g);
    if (!op) continue;
    const outer = outerAt(g.z);
    // 문 높이보다 낮으면 문틀을 넘어갈 수 있다. 점프 최고 높이는 골반 1.66
    // (평지 0.86에서 +0.80)이라 발이 올라갈 수 있는 턱은 0.8m 남짓이다.
    // 그보다 한참 높은 FRAME_MIN_H를 바닥으로 두고, 문이 더 높으면 문에 맞춘다.
    const h = Math.max(op.h, FRAME_MIN_H);
    for (const side of [-1, 1] as const) {
      const inner = op.x + side * op.half;              // 통로 가장자리
      const outerEdge = side * outer;                   // 레인 가장자리
      const w = Math.abs(outerEdge - inner);
      if (w < 0.05) continue;                           // 문이 레인을 이미 다 덮는다
      frameWalls.push({ x: (inner + outerEdge) / 2, z: g.z, w, h, len: op.depth });
    }
  }
  for (const w of [...frameWalls, ...(cfg.walls ?? [])]) {
    const h = w.h ?? 2.6;
    const len = w.len ?? 1.0;
    solid(b, [w.w, h, len], [w.x, h / 2, w.z], w.color ?? GR.fence, [0, 0, 0], { rough: 0.55 });
    // 윗면 띠 — 난간과 같은 어휘로 "넘을 수 없는 것"임을 알린다
    deco(b, [w.w, 0.16, len + 0.1], [w.x, h + 0.06, w.z], GR.fenceTop, [0, 0, 0], { rough: 0.4 });
  }

  let pid = STAGE_PROP_ID0;
  for (const p of cfg.props ?? []) {
    addProp(pid++, p.size, p.pos, p.color, p.mass, p.grabRadius ?? Math.max(...p.size) * 0.8);
  }

  for (const z of cfg.ballSlots ?? []) buildBallSlot(b, z, LANE_HALF);

  // ---------------------------------------------------------- 체크포인트
  //
  // 물리는 없다 — 판정은 main.ts가 z 좌표로만 한다. 여기서 그리는 것은
  // "여기를 **둘 다** 지나면 저장된다"를 알아볼 수 있게 하는 표시다.
  // 초록 깃대 두 개 + 바닥 줄무늬. 구간 아치(gate)와 색이 겹치지 않게 고른다.
  for (const cz of cfg.checkpoints ?? []) {
    if (!onDeck(0, cz)) {
      console.warn(
        `[course:${tag}] 체크포인트 z=${cz} 자리에 x=0 바닥이 없다. ` +
        `되살아난 사람과 공이 그 자리에서 떨어진다.`,
      );
    }
    const halfHere = (() => {
      let m = LANE_HALF;
      for (const s of secs) if (cz <= s.z0 && cz >= s.z1 && s.x === 0) m = s.half;
      return m;
    })();
    deco(b, [halfHere * 2 - 0.5, 0.07, 0.9], [0, 0.05, cz], 0x3ddc84, [0, 0, 0], { rough: 0.6 });
    for (let i = 0; i < 8; i++) {
      const w = (halfHere * 2 - 0.5) / 8;
      deco(b, [w * 0.8, 0.09, 0.34], [-halfHere + 0.25 + w * (i + 0.5), 0.07, cz],
        i % 2 ? 0xffffff : 0x2b2f38, [0, 0, 0], { rough: 0.8 });
    }
    // 깃대 — 멀리서 보고 "저기까지 가면 저장된다"를 노린다
    for (const sx of [-1, 1]) {
      const px = sx * Math.max(1.2, halfHere - 0.7);
      decoCyl(b, 0.12, 0.12, 3.0, [px, 1.5, cz], 0x3ddc84, [0, 0, 0], { rough: 0.45 });
      deco(b, [0.9, 0.6, 0.06], [px + sx * 0.5, 2.7, cz], 0x3ddc84, [0, 0, 0], { rough: 0.5 });
    }
  }

  // ---------------------------------------------------------- 튜토리얼 구간
  //
  // 출발선과 첫 게이트 사이(z 6 ~ -11)의 빈 구간을 그대로 쓴다. 맵을 새로
  // 만들지 않고, 바닥 패드 네 장만 깔아서 지나가며 하나씩 익히게 한다.
  // 안내 문장은 HUD에 한 줄만 뜬다(main.ts) - 여기서는 "무엇을 누르는
  // 자리인가"만 바닥에 크게 적어둔다.
  if (cfg.tutorial) {
    for (const [z, key, color] of TUTORIAL_PADS) {
      buildKeyPad(b, 0, z, 5.2, 4.2, key, color);
    }
  }

  // ---------------------------------------------------------- 골대
  // 골라인 판정(game.ts checkCross)과 같은 폭으로 세운다.
  buildGoalNet(b, FINISH_Z + 6, GOAL_HALF_W);

  // ---------------------------------------------------------- 공
  const [bx, bz] = cfg.ballStart ?? [0, START_Z - 11];
  addBall(BALL_ID, 0.3, [bx, 0.31, bz]);
  };
}
