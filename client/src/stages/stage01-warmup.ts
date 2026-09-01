import { GR } from "../mapkit";
import { BALL_ID, type MapDef } from "../maps/types";
import { GOAL_HALF_W, LANE_HALF, makeCourse } from "../maps/course";

/**
 * STAGE 1 — 몸풀기
 *
 * 앞쪽 절반에서 조작을 배우고, 뒤쪽 절반에서 **둘이 아니면 못 지나가는 것**을
 * 셋 만난다. 예전 이 스테이지는 협동 장치를 하나도 두지 않은 순수 튜토리얼이었다
 * (「조작을 익히기도 전에 둘이 나눠 서야 열리는 문을 들이밀지 말자」).
 * 그 판단은 앞쪽 절반에 그대로 살아 있다 — 출발선부터 -46까지는 예전과 같다.
 * 달라진 건 뒤쪽이다: 1번 코스에서조차 혼자 다 해버릴 수 있으면 이 게임이
 * 2인 협동이라는 사실이 첫 판에서 전달되지 않는다.
 *
 * [뒤쪽 절반의 협동 셋]
 *   -56  공 전용 틈    — 공과 사람이 갈라진다 (지형. 설명이 필요 없다)
 *   -62  패스 게이트   — 한 명이 찬 공을 다른 한 명이 받아야 열린다
 *   -78  2인 동시 발판 — 좌우 발판을 **동시에** 밟아야 문이 8초간 열린다
 * 셋이 서로 다른 방식이다. 하나는 지형, 하나는 공, 하나는 몸 — 같은 장치를
 * 세 번 반복하는 게 아니다.
 *
 * [-78 발판이 혼자서는 왜 불가능한가]
 * 발판이 ±4.6m(사이 9.2m)이고 신호가 `latch` 1.2초만 유지된다. 사람 최고
 * 속도가 4.6 m/s 남짓이라 한쪽을 밟고 반대쪽까지 가는 데 최소 2초다 —
 * 도착하기 전에 첫 신호가 꺼진다. 규칙으로 막은 게 아니라 **거리와 시간**이
 * 막는다 (obstacles.ts `OB.leverLatch` 주석).
 * 혼자 플레이할 때는 main.ts `syncCoopGates`가 열어 준다.
 *
 * [장애물은 한 번에 하나씩]
 * 같은 z에 두 종류를 겹치지 않는다. 종류를 하나씩 처음 만나는 자리이고,
 * 여기서 좌절하면 뒤를 안 본다.
 *
 * [골 앞 18m는 비워 둔다]
 * 마지막 관문(-78 문)부터 골(-104)까지는 아무것도 없다. 마지막 구간은
 * "장애물을 다 지났다, 이제 넣기만 하면 된다"가 되어야 한다.
 * (이 규칙은 이후 모든 스테이지에 그대로 적용한다)
 */
export const STAGE1_WARMUP: MapDef = {
  id: "s1-warmup",
  name: "1. 몸풀기",
  blurb: "굴리고, 차고, 둘이서 넣는다",
  // 협동 관문이 둘 늘었다. 패스를 한 번 놓치고 발판 타이밍을 한 번 놓쳐도
  // 완주할 수 있는 만큼만 늘린다 (190 -> 210).
  timeLimit: 210,
  targetId: BALL_ID,
  targetName: "공",
  goal: { x: 0, z: -104, radius: 2.4, halfWidth: GOAL_HALF_W },
  spawns: [[-1.6, 10], [1.6, 10], [-3.6, 10], [3.6, 10]],
  // 공 전용 틈 (아래 build의 ballSlots와 같은 값이어야 한다 - 위쪽은 자동
  // 플레이어의 우회 판정이, 아래쪽은 실제 지형이 이 값을 읽는다)
  ballSlots: [-56],
  // 튜토리얼 구간을 지난 뒤 한 번, 협동 구간에 들어가기 전 한 번.
  // 둘 다 지나야 저장되므로 앞선 사람이 뒤를 한 번 돌아보게 된다.
  checkpoints: [-26, -50],
  tutorial: true,
  floor: { size: 30, color: 0x8fe3ff, outside: 0x9fd8ff, hideOutside: true, hideFloor: true, noGround: true },
  fog: [0xbfe9ff, 70, 210],
  build: makeCourse({
    label: "s1-warmup",
    startZ: 18, finishZ: -110, seed: 20260827, tutorial: true,
    sections: [[18, -12, LANE_HALF], [-12, -52, LANE_HALF], [-52, -110, LANE_HALF]],
    gates: [[-12, GR.laneEdge], [-52, 0xff8a3d]],
    checkpoints: [-26, -50],
    // 리듬: 튜토리얼(빈 구간) -> 낙하물 하나 -> 압박(popup+회전봉)
    //       -> 협동 구간 -> 마무리
    // 발판(-74.4)에서 6m 이상 띄운다 — 발판 위에서 버티는 쪽은 못 피한다.
    hazards: [2, -28, -66],
    gimmicks: [
      { kind: "popup", z: -20, arg: -1, phase: 0.0, note: "첫 장애물. 내려간 사이에 지나간다" },
      { kind: "spinner", z: -33, arg: 4.2, phase: 1.0, note: "몸은 못 지나가고 공은 굴려 통과" },
      { kind: "piston", z: -46, arg: -1, phase: 0.4, note: "길이 좁아지는 타이밍" },

      // ---- 협동 1: 패스 게이트 (공 전용 틈 -56 바로 뒤)
      //
      // 틈에서 공과 사람이 갈라진 직후다. 공을 먼저 통과시킨 쪽과 돌아 나온
      // 쪽이 자연스럽게 떨어져 있으므로, 여기서 한 번 차서 건네는 것이
      // 억지가 아니라 그 자리에서 제일 편한 선택이 된다.
      // (판정: 4.5m 이상 날아간 공을 다른 사람이 2.6m 안에서 받는다 —
      //  main.ts `updateCoopPass`)
      { kind: "coopgate", z: -62, arg: 0, phase: 0.0, note: "패스를 성공해야 열린다" },

      { kind: "sweeper", z: -70, arg: 0, phase: 0.0, note: "지나갈 틈이 좌우로 움직인다" },

      // ---- 협동 2: 2인 동시 발판
      //
      // 좌우 발판을 동시에 밟으면 문이 8초 열린다. 그 안에 둘 다 들어가야
      // 하므로 "빨리 와!"가 나온다. 한 명이 지나가고 나면 걸어 잠기므로
      // (obstacles.ts holdgate 의 forceOpen) 남은 쪽이 갇히지 않는다.
      {
        kind: "lever", z: -78, x: -4.6, link: "s1-door",
        params: { latch: 1.2, w: 2.2, len: 2.2 },
        note: "latch 1.2초 — 혼자서는 반대쪽 발판까지 못 간다",
      },
      { kind: "lever", z: -78, x: 4.6, link: "s1-door", params: { latch: 1.2, w: 2.2, len: 2.2 } },
      {
        kind: "holdgate", z: -84, link: "s1-door",
        params: { w: 5.6, h: 2.6, openTime: 8 },
        note: "둘 다 밟은 순간 8초 열린다. 여기부터 골(-104)까지는 비어 있다",
      },
    ],
    // [공 전용 틈] 공은 아래로 지나가고 사람은 옆으로 돈다.
    // 회전봉(-33)과 피스톤(-46)을 지난 뒤, 패스 게이트(-62) 앞자리다.
    ballSlots: [-56],
  }),
};
