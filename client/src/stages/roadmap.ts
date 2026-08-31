import type { GimmickKind } from "../maps/gimmicks";
import { GIMMICK_STATUS } from "../maps/gimmicks";

/**
 * Goal Rush! 10 스테이지 계획표.
 *
 * [왜 코드에 두나] 스테이지를 하나 만들 때마다 "이 스테이지가 무엇을 요구하고,
 * 그중 무엇이 아직 없는가"를 문서에서 찾아 읽으면 문서와 코드가 곧 어긋난다.
 * 여기 적어 두면 `missingGimmicks()`가 `GIMMICK_STATUS`를 직접 보고 답한다 —
 * 런타임이 하나 붙는 순간 이 표의 "남은 것"이 저절로 줄어든다.
 *
 * [설계 원칙 — 전 스테이지 공통]
 *  1. 협동 전용 구역("패스존")을 만들지 않는다. 지나가는 길 자체가 둘을
 *     요구해야 한다 — 문을 눌러 두는 동안 공을 옮기고, 갈라진 길에서 서로
 *     장치를 켜고, 무거운 것을 같이 밀고, 공을 건넨다.
 *  2. 실패는 즉사가 아니라 물리 코미디여야 한다. 넘어짐 / 공 굴러감 / 서로
 *     충돌 / 공 쫓아가기. 떨어져도 리스폰이고 공은 되돌아온다.
 *  3. 어떤 기믹도 플레이어 좌표를 읽지 않는다(공 도둑 AI만 예외). 위상과
 *     시드 난수로만 움직여야 보고 피할 수 있다.
 *  4. 골 앞 18m는 비운다. 마지막은 "이제 넣기만 하면 된다"가 되어야 한다.
 *  5. 코스 가운데(x=0)를 가로로 끊지 않는다. 떨어진 공이 x=0으로 되돌아오기
 *     때문이다 (maps/course.ts의 중앙선 검사 참고).
 */
export interface StagePlan {
  /** 1 ~ 10 */
  no: number;
  /** MapDef의 id와 같아야 한다 (구현된 스테이지에 한해) */
  id: string;
  name: string;
  /** 이 스테이지가 내는 문제 한 줄 */
  theme: string;
  /** 맵이 어떻게 협동을 강제하는가 — 장치가 아니라 지형/상황으로 적는다 */
  coop: string;
  /** 이 스테이지가 쓰는 기믹 */
  needs: GimmickKind[];
  /** 지형만으로 만드는 것 (런타임이 필요 없는 것) */
  terrain?: string;
  status: "playable" | "designed";
}

export const STAGE_PLANS: StagePlan[] = [
  {
    no: 1, id: "s1-warmup", name: "몸풀기",
    theme: "이동 · 드리블 · 킥 · 골. 규칙을 배운다",
    coop: "공 전용 틈에서 공과 사람이 갈라진다 — 먼저 돌아 나온 쪽이 공을 잇는다",
    needs: ["popup", "spinner", "piston", "sweeper"],
    terrain: "튜토리얼 패드, 공 전용 틈",
    status: "playable",
  },
  {
    no: 2, id: "s2-levers", name: "양쪽 레버",
    theme: "눌러 두는 동안에만 열리는 문",
    coop: "한 명이 발판 위에서 버티고 다른 한 명이 공을 몰고 지난다. 손을 떼면 닫힌다",
    needs: ["buttongate", "spinner", "popup", "sweeper", "piston"],
    terrain: "공 전용 틈",
    status: "playable",
  },
  {
    no: 3, id: "s3-movingfloor", name: "움직이는 바닥",
    theme: "바닥이 갈라지고 끊긴다",
    coop: "길이 셋인데 공은 하나다. 갈라서면 공을 틈 너머로 건네야 한다",
    needs: ["platform", "sweeper", "popup", "spinner", "roller", "piston"],
    terrain: "세 갈래 + 사이 낭떠러지, 외줄 다리",
    status: "playable",
  },
  {
    no: 4, id: "s4-push", name: "양쪽에서 밀어",
    theme: "혼자서는 움직이지 않는 무게",
    coop: "질량으로 강제한다. 한 사람 몫의 밀기 힘으로는 안 밀리는 상자를 길이 막고 있다",
    needs: ["conveyor", "piston"],
    terrain: "무거운 상자(props), 상자를 끼워 넣어야 건너는 홈",
    status: "designed",
  },
  {
    no: 5, id: "s5-wind", name: "바람이 분다",
    theme: "사람과 공을 옆으로 밀어내는 바람",
    coop: "한 명이 바람막이 뒤에 서서 바람을 끊어 주고 그 그늘로 다른 한 명이 공을 민다",
    needs: ["wind", "popup", "sweeper"],
    terrain: "바람 방향으로 뚫린 낭떠러지, 이동 가능한 바람막이(props)",
    status: "designed",
  },
  {
    no: 6, id: "s6-thief", name: "공 도둑",
    theme: "AI가 공을 빼앗아 도망간다",
    coop: "혼자서는 못 잡는다 — 한 명이 길을 막고 다른 한 명이 몰아간다",
    needs: ["thief", "shutter", "spinner", "roller"],
    terrain: "막다른 골목과 되돌아오는 순환로 (몰이가 성립하는 지형)",
    status: "designed",
  },
  {
    no: 7, id: "s7-twopaths", name: "두 개의 길",
    theme: "둘이 아예 다른 길을 간다",
    coop: "한쪽 길에만 레버가 있고 다른 쪽 길에만 공이 지나갈 수 있다. 서로를 볼 수 없다",
    needs: ["lever", "holdgate", "spinner", "piston"],
    terrain: "완전히 갈라진 두 갈래(중앙에 벽), 공만 넘어가는 창",
    status: "designed",
  },
  {
    no: 8, id: "s8-factory", name: "공장",
    theme: "컨베이어 · 회전 · 프레스 · 낙하물이 겹친다",
    coop: "컨베이어가 공을 계속 되돌려 보낸다. 한 명이 프레스 타이밍을 잡아 주고 다른 한 명이 통과",
    needs: ["conveyor", "press", "spinner", "shutter", "piston"],
    terrain: "층이 나뉜 라인, 아래로 떨어진 공이 다시 올라오는 경로",
    status: "designed",
  },
  {
    no: 9, id: "s9-chaos", name: "대혼돈",
    theme: "지금까지의 기믹을 전부 섞는다 + 시간 제한",
    coop: "공을 떨어뜨려도 되돌아오는 구조라, 한 명이 회수하러 가는 동안 다른 한 명이 길을 연다",
    needs: ["wind", "conveyor", "press", "platform", "buttongate", "roller", "sweeper"],
    terrain: "떨어진 공이 다시 코스로 올라오는 회수 경사로",
    status: "designed",
  },
  {
    no: 10, id: "s10-final", name: "THE FINAL RUSH",
    theme: "핵심 기믹을 하나의 긴 코스에",
    coop: "마지막 골은 둘이 같이 넣어야 한다 (한 명이 문을 열어 둔 채 다른 한 명이 슛)",
    needs: ["holdgate", "lever", "platform", "wind", "conveyor", "press", "thief"],
    terrain: "각 스테이지의 대표 구간을 한 줄로 이은 장거리 코스",
    status: "designed",
  },
];

/** 그 스테이지가 요구하는 기믹 중 아직 런타임이 없는 것 */
export function missingGimmicks(plan: StagePlan): GimmickKind[] {
  return plan.needs.filter((k) => GIMMICK_STATUS[k] !== "live");
}

/**
 * 아직 아무 스테이지도 못 쓰는 기믹의 목록 — 만드는 쪽이 볼 우선순위표.
 *
 * 앞 스테이지에서 필요한 것부터 나온다. `stage`는 그 기믹을 처음 요구하는
 * 스테이지 번호다.
 */
export function gimmickBacklog(): { kind: GimmickKind; stage: number; count: number }[] {
  const first = new Map<GimmickKind, number>();
  const count = new Map<GimmickKind, number>();
  for (const p of STAGE_PLANS) {
    for (const k of missingGimmicks(p)) {
      if (!first.has(k)) first.set(k, p.no);
      count.set(k, (count.get(k) ?? 0) + 1);
    }
  }
  return [...first]
    .map(([kind, stage]) => ({ kind, stage, count: count.get(kind) ?? 0 }))
    .sort((a, c) => a.stage - c.stage);
}
