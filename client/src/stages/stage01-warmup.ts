import { GR } from "../mapkit";
import { BALL_ID, type MapDef } from "../maps/types";
import { GOAL_HALF_W, LANE_HALF, makeCourse } from "../maps/course";

/**
 * STAGE 1 — 몸풀기
 *
 * 배우는 것: 이동 / 드리블 / 킥 / 들기, 그리고 "골라인 안으로 굴려 넣으면
 * 끝난다"는 규칙. 그게 전부다.
 *
 * [협동 장치를 하나도 두지 않는다]
 * 예전 1스테이지에는 버튼 문과 패스 게이트가 있었다. 넣은 이유는 실측에서
 * 한 명이 공을 100% 독점하고 둘이 20m 넘게 벌어졌기 때문인데, 처음 잡는
 * 사람에게 "둘이 나눠 서야 열리는 문"을 조작을 익히기도 전에 들이미는 셈이
 * 됐다. 협동은 2스테이지가 통째로 맡는다 — 그래서 여기서는 뺐다.
 * 대신 공 독점은 **공 전용 틈**(-56)으로 다룬다. 장치가 아니라 지형이라
 * 설명이 필요 없고, 공과 사람이 갈라졌다가 먼저 돌아 나온 쪽이 공을 잇게
 * 되므로 누가 몰지가 저절로 바뀐다.
 *
 * [장애물은 한 번에 하나씩]
 * 같은 z에 두 종류를 겹치지 않는다. 종류를 하나씩 처음 만나는 자리이고,
 * 여기서 좌절하면 뒤를 안 본다. 대신 104m에 4개(26m당 하나)는 너무 비어서
 * 실측 완주가 넘어짐 0회 / 25초였다 — 13m 간격으로 6개를 둔다.
 *
 * [골 앞 18m는 비워 둔다]
 * 마지막 팝업을 골 10m 앞에 뒀을 때 오토파일럿이 거기서 60초를 갇혔다.
 * 골로 가는 직선을 막고 서 있으니 슛 자세를 잡을 자리가 없다. 마지막 구간은
 * "장애물을 다 지났다, 이제 넣기만 하면 된다"가 되어야 한다.
 * (이 규칙은 이후 모든 스테이지에 그대로 적용한다)
 */
export const STAGE1_WARMUP: MapDef = {
  id: "s1-warmup",
  name: "1. 몸풀기",
  blurb: "굴리고, 차고, 넣는다",
  timeLimit: 190,
  targetId: BALL_ID,
  targetName: "공",
  goal: { x: 0, z: -104, radius: 2.4, halfWidth: GOAL_HALF_W },
  spawns: [[-1.6, 10], [1.6, 10], [-3.6, 10], [3.6, 10]],
  // 공 전용 틈 (아래 build의 ballSlots와 같은 값이어야 한다 - 위쪽은 자동
  // 플레이어의 우회 판정이, 아래쪽은 실제 지형이 이 값을 읽는다)
  ballSlots: [-56],
  tutorial: true,
  floor: { size: 30, color: 0x8fe3ff, outside: 0x9fd8ff, hideOutside: true, hideFloor: true, noGround: true },
  fog: [0xbfe9ff, 70, 210],
  build: makeCourse({
    label: "s1-warmup",
    startZ: 18, finishZ: -110, seed: 20260827, tutorial: true,
    sections: [[18, -12, LANE_HALF], [-12, -52, LANE_HALF], [-52, -110, LANE_HALF]],
    gates: [[-12, GR.laneEdge], [-52, 0xff8a3d]],
    // 리듬: 튜토리얼(빈 구간) -> 낙하물 하나 -> 압박(popup+회전봉)
    //       -> 휴식 -> 새 기믹(sweeper) -> 마무리
    hazards: [2, -30, -76],
    gimmicks: [
      { kind: "popup", z: -20, arg: -1, phase: 0.0, note: "첫 장애물. 내려간 사이에 지나간다" },
      { kind: "spinner", z: -33, arg: 4.2, phase: 1.0, note: "몸은 못 지나가고 공은 굴려 통과" },
      { kind: "piston", z: -46, arg: -1, phase: 0.4, note: "길이 좁아지는 타이밍" },
      { kind: "sweeper", z: -66, arg: 0, phase: 0.0, note: "지나갈 틈이 좌우로 움직인다" },
      { kind: "popup", z: -78, arg: 1, phase: 1.2 },
      { kind: "piston", z: -86, arg: 1, phase: 1.6, note: "마지막 관문. 여기부터 골까지는 비어 있다" },
    ],
    // [공 전용 틈] 공은 아래로 지나가고 사람은 옆으로 돈다.
    // 회전봉(-33)과 피스톤(-46)을 지난 뒤, 스위퍼(-66) 앞의 빈 자리다.
    ballSlots: [-56],
  }),
};
