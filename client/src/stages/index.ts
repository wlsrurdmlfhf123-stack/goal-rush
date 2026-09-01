import type { MapDef } from "../maps/types";

import { STAGE1_WARMUP } from "./stage01-warmup";
import { STAGE2_LEVERS } from "./stage02-levers";
import { STAGE3_MOVING_FLOOR } from "./stage03-movingfloor";
import { STAGE4_PUSH } from "./stage04-push";
import { GIMMICK_LAB } from "./lab";
import { ARCHIVED_STAGES } from "./archive";
import { PENDING_GIMMICKS } from "../maps/gimmicks";
import { STAGE_PLANS, gimmickBacklog } from "./roadmap";

export { STAGE_PLANS, missingGimmicks, gimmickBacklog, type StagePlan } from "./roadmap";
export { GIMMICK_LAB } from "./lab";
export { ARCHIVED_STAGES } from "./archive";

/**
 * 정식 스테이지 — 배열 순서가 곧 스테이지 번호다.
 *
 * `game.ts`가 `world.mapIndex`로 진행을 관리하므로 **중간에 끼워 넣지 않는다.**
 * 4번을 만들면 4번 자리에, 그 다음이 5번이다. 아직 못 만든 스테이지 때문에
 * 빈 칸을 남기지도 않는다 — 빈 칸이 있으면 game.ts의 "다음 스테이지" 진행이
 * 존재하지 않는 맵으로 넘어간다.
 *
 * 계획 전체(1~10)는 `roadmap.ts`의 `STAGE_PLANS`에 있다. 여기와 저기의 id가
 * 같은 것끼리 짝이고, 아직 `status: "designed"`인 것이 만들 차례다.
 */
export const STAGES: MapDef[] = [
  STAGE1_WARMUP,
  STAGE2_LEVERS,
  STAGE3_MOVING_FLOOR,
  STAGE4_PUSH,
];

/**
 * 정식 진행에는 없지만 눈으로 확인할 수 있어야 하는 맵들.
 *
 * 주소에 `?lab`을 붙이면 이것만 로드된다 — 기믹 시험장과 보관해 둔 예전
 * 스테이지 둘이다. 플래그가 없으면 `STAGES`와 완전히 동일하므로 정상
 * 플레이와 테스트에는 아무 영향이 없다.
 *
 * [왜 이렇게 하나] 드래프트 맵을 로드하려고 world.ts에 스위치를 다는 것은
 * 맵 담당이 건드릴 자리가 아니다. 맵 목록을 고르는 일은 맵 쪽 책임이므로
 * 여기서 끝낸다. 브라우저가 없는 환경(헤드리스 테스트)에서는 항상 STAGES다.
 */
const wantDrafts =
  typeof location !== "undefined" && new URLSearchParams(location.search).has("lab");

export const MAPS: MapDef[] = wantDrafts ? [GIMMICK_LAB, ...ARCHIVED_STAGES] : STAGES;

// 콘솔에서 바로 확인할 수 있게 노출해 둔다 (world.ts의 __world와 같은 이유).
//   __stages.backlog()  - 아직 런타임이 없는 기믹을 필요한 순서대로
//   __stages.pending    - 이번에 로드된 맵에서 표식만 그려진 기믹들
if (typeof window !== "undefined") {
  (window as unknown as Record<string, unknown>).__stages = {
    MAPS, STAGES, plans: STAGE_PLANS, pending: PENDING_GIMMICKS, backlog: gimmickBacklog,
  };
}
