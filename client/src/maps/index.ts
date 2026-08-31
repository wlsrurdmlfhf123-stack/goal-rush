/**
 * 맵 계층의 공개 창구.
 *
 * world.ts / main.ts / game.ts는 예전처럼 `from "./maps"` 하나만 알면 된다.
 * 그 안이 types / course / gimmicks / legacy / stages로 나뉘어 있다는 사실은
 * 맵을 만드는 사람만 알면 되는 일이다.
 *
 *   maps/types.ts    엔진과의 계약 (MapDef, MapCtx, 소품 id 규약)
 *   maps/course.ts   Goal Rush 코스 생성기 (지형·난간·장식·골대)
 *   maps/gimmicks.ts 기믹 선언 어휘 + 구현 여부 레지스트리
 *   maps/legacy.ts   냉장고 시절 맵 3개 (게임에 등록되지 않는다)
 *   stages/          스테이지 한 개 = 파일 한 개. 목록은 stages/index.ts
 */
export {
  PROP_HEAVY_MASS, BALL_ID, HAZARD_ID0, OBSTACLE_ID0, STAGE_PROP_ID0,
} from "./types";
export type { AddProp, AddBall, AddHazard, AddObstacle, MapCtx, MapDef } from "./types";

export {
  LANE_HALF, BRIDGE_HALF, SPLIT_HALF, SPLIT_X, GOAL_HALF_W,
  TUTORIAL_PADS, TUTORIAL_PAD_HALF, makeCourse,
} from "./course";
export type { CourseSection, SectionLike, StageProp, StageCfg } from "./course";

export {
  GIMMICK_STATUS, PENDING_GIMMICKS, isLive, drawGimmickPlaceholder,
} from "./gimmicks";
export type { GimmickKind, GimmickSpec, LiveGimmick, PlannedGimmick } from "./gimmicks";

export { LEGACY_MAPS } from "./legacy";

export {
  MAPS, STAGES, STAGE_PLANS, GIMMICK_LAB, ARCHIVED_STAGES,
  missingGimmicks, gimmickBacklog,
} from "../stages";
export type { StagePlan } from "../stages";
