import { BALL_ID, type MapDef } from "../maps/types";
import type { GimmickSpec } from "../maps/gimmicks";
import { GOAL_HALF_W, LANE_HALF, makeCourse } from "../maps/course";

/**
 * 기믹 시험장 — 스테이지가 아니라 작업대다.
 *
 * 넓고 평평한 한 줄에 기믹을 12m 간격으로 하나씩 세워 둔다. 새 기믹을
 * 만드는 동안 스테이지를 완주해서 그 자리까지 갈 필요가 없게 하려는 것이다.
 * 앞쪽은 처음부터 있던 것들(회귀 확인용), 뒤쪽은 나중에 붙은 것들이다.
 *
 * 브라우저에서 `?lab`을 붙이면 이 맵만 로드된다 (stages/index.ts).
 * 정상 플레이에는 등록되지 않으므로 스테이지 번호에 영향을 주지 않는다.
 */

/** 동작하는 기믹들 — 여기를 지나면서 예전과 같이 움직이는지 본다 */
const LIVE: GimmickSpec[] = [
  { kind: "spinner", z: -10, arg: 4.4, phase: 0.0 },
  { kind: "piston", z: -22, arg: -1, phase: 0.0 },
  { kind: "sweeper", z: -34, arg: 0, phase: 0.0 },
  { kind: "popup", z: -46, arg: 0, phase: 0.0 },
  { kind: "shutter", z: -58, arg: -1, phase: 0.0 },
  { kind: "shutter", z: -58, arg: 1, phase: 0.0 },
  { kind: "coopgate", z: -70, arg: 0, phase: 0.0 },
  { kind: "buttongate", z: -88, arg: 0, phase: 0.0 },
  // 거대 공은 자기 z에서 +Z로 18m 굴러간다. 그 구간(-118 ~ -100)은 비워 둔다
  { kind: "roller", z: -118, arg: 0, phase: 0.0 },
];

/**
 * 나중에 붙은 기믹들 — 파라미터 이름의 기준.
 *
 * 여기 적힌 `params`가 곧 **스테이지가 실제로 쓰는 파라미터의 형태**다.
 * 런타임(obstacles.ts)이 이 이름들을 그대로 읽으므로, 새 기믹을 만들 때는
 * 먼저 여기에 한 줄 세워 두고 이름을 맞춘다.
 *
 * 2026-09-01 기준 이 목록은 **전부 동작한다**. 아직 없는 기믹이 생기면
 * `maps/gimmicks.ts`의 `GIMMICK_STATUS`에 `"planned"`로 올려 두면 되고,
 * 그러면 바닥 표식만 그려진다(`drawGimmickPlaceholder`).
 */
const LATER: GimmickSpec[] = [
  {
    kind: "lever", z: -130, x: -4.5, link: "lab-door", phase: 0,
    params: { hold: 1, w: 2.2, len: 2.2 },
    note: "hold=1이면 밟고 있는 동안만 켜짐, 0이면 한 번 켜면 유지",
  },
  {
    kind: "lever", z: -130, x: 4.5, link: "lab-door", phase: 0,
    params: { hold: 1, w: 2.2, len: 2.2 },
  },
  {
    kind: "holdgate", z: -142, link: "lab-door",
    params: { w: 5.6, h: 2.6 },
    note: "같은 link의 lever가 전부 켜져 있는 동안만 열린다",
  },
  {
    kind: "platform", z: -152, x: 0, phase: 0,
    params: { axis: 0, span: 8, speed: 2.4, w: 3.2, len: 3.0 },
    note: "axis 0=x축 왕복 / 1=z축 왕복. 위에 탄 것을 같이 옮긴다",
  },
  {
    kind: "wind", z: -162,
    params: { dirX: 1, dirZ: 0, force: 26, w: 14, len: 10, period: 5.2, onFrac: 0.55 },
    note: "구역 안의 사람과 공을 dir 방향으로 민다. period/onFrac으로 켜졌다 꺼진다",
  },
  {
    kind: "conveyor", z: -172,
    params: { dirZ: 1, speed: 3.4, w: 8, len: 8 },
    note: "dirZ +1이면 플레이어를 출발선 쪽으로 되돌려 보낸다",
  },
  {
    kind: "press", z: -182, x: 0, phase: 0,
    params: { w: 5.0, len: 3.0, period: 3.6, downFrac: 0.3, speed: 6, topY: 4.2, bottomY: 0.25 },
    note: "위에서 내려와 찍고 올라간다. topY/bottomY 는 판 **밑면**의 높이다",
  },

  // ---- 2인 협동 개편에서 더한 것들
  {
    kind: "pushblock", z: -192, x: 0,
    params: { axis: 0, span: 5, w: 4.4, h: 2.2, len: 1.4 },
    note: "둘이 붙어서 밀어야 axis 방향으로 움직인다. 혼자면 정지 마찰을 못 넘는다",
  },
  {
    kind: "ice", z: -204, x: 0,
    params: { w: 12, len: 12, slip: 0.82 },
    note: "구역 안에서 브레이크와 방향 전환이 안 듣는다. 공은 계속 굴러간다",
  },
  { kind: "bumper", z: -214, x: -2.6, params: { r: 1.1 }, note: "닿으면 반사. 달려와 박으면 넘어진다" },
  { kind: "bumper", z: -214, x: 2.6, params: { r: 1.1 } },
  { kind: "jumppad", z: -218, x: 0, params: { r: 1.5, up: 9.5 }, note: "밟으면 위로 쏜다. 공도 뜬다" },

  // ---- 2인 동시 압력판 (lever.latch + holdgate.openTime)
  //
  // latch 1.2초 = 발판 사이 9.2m 를 혼자 건너기 전에 첫 신호가 꺼진다.
  // openTime 7초 = 열린 뒤 둘이 뛰어 들어갈 시간.
  {
    kind: "lever", z: -228, x: -4.6, link: "lab-dual", params: { latch: 1.2, w: 2.2, len: 2.2 },
    note: "latch 가 있으면 밟은 뒤 그 시간만 켜져 있다 = 둘이 **동시에** 밟아야 한다",
  },
  { kind: "lever", z: -228, x: 4.6, link: "lab-dual", params: { latch: 1.2, w: 2.2, len: 2.2 } },
  {
    kind: "holdgate", z: -236, link: "lab-dual", params: { w: 5.6, h: 2.6, openTime: 7 },
    note: "둘 다 켜진 순간 openTime 초 동안 열린다. 그 안에 둘 다 지나가야 한다",
  },
];

export const GIMMICK_LAB: MapDef = {
  id: "lab",
  name: "기믹 시험장",
  blurb: "기믹을 하나씩 세워 둔 작업대",
  timeLimit: 900,
  targetId: BALL_ID,
  targetName: "공",
  goal: { x: 0, z: -254, radius: 2.4, halfWidth: GOAL_HALF_W },
  spawns: [[-1.6, 10], [1.6, 10], [-3.6, 10], [3.6, 10]],
  floor: { size: 30, color: 0xe6e6f0, outside: 0xd6d6e6, hideOutside: true, hideFloor: true, noGround: true },
  fog: [0xe8e8f4, 80, 260],
  build: makeCourse({
    label: "lab",
    startZ: 18, finishZ: -260, seed: 1,
    sections: [[18, -260, LANE_HALF]],
    gates: [[-124, 0xff5d73]],   // 여기부터 나중에 붙은 기믹들
    gimmicks: [...LIVE, ...LATER],
  }),
};
