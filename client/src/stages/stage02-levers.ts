import { BALL_ID, type MapDef } from "../maps/types";
import { GOAL_HALF_W, LANE_HALF, makeCourse } from "../maps/course";

/**
 * STAGE 2 — 양쪽 레버
 *
 * 이 스테이지의 규칙 하나: **문은 눌러 두는 동안에만 열려 있다.**
 * 좌우 발판을 둘이 동시에 밟고 있어야 하고, 한쪽이 떨어지면 그 자리에서
 * 다시 닫힌다(obstacles.ts `buttongate`). 그래서 둘의 역할이 저절로 갈린다 —
 * 한 명은 발판 위에서 버티고, 다른 한 명이 공을 몰고 문을 지난다. 그리고
 * 지난 쪽이 반대편 발판으로 뛰어가야 처음 사람이 따라올 수 있다.
 *
 * [왜 "패스존" 같은 전용 구역을 안 쓰나]
 * 협동을 특정 칸 안에서만 하게 만들면 그 칸 밖에서는 둘이 남남이 된다.
 * 여기서는 문이 코스 한복판을 막고 있고 발판이 그 코스 위에 있다 — 지나가는
 * 길 자체가 협동을 요구하므로 따로 구역을 표시할 필요가 없다.
 *
 * [문을 세 번 두는 이유]
 *  -20  아무것도 없는 자리. "밟으면 열린다"를 손해 없이 배운다
 *  -50  회전봉 바로 뒤. 발판을 밟은 쪽은 회전봉을 못 피하니 자리를 골라야 한다
 *  -92  스위퍼 뒤. 문을 지난 쪽이 곧바로 다음 압박을 만난다
 * 같은 장치를 세 번 반복하는 게 아니라, **주변 상황이 매번 다르다.**
 *
 * [지금은 buttongate로 만든다]
 * 설계상 원하는 것은 "코스 양 끝처럼 아주 멀리 떨어진 레버 두 개"인데,
 * 지금 있는 buttongate는 발판이 문 앞 좌우(±4.6m)로 고정이다. 떨어뜨린
 * 레버(`lever`)와 그것에 묶이는 문(`holdgate`)이 준비되면 -50 문을 그걸로
 * 바꾼다 — 좌표와 파라미터는 maps/gimmicks.ts의 어휘로 이미 적을 수 있다.
 */
export const STAGE2_LEVERS: MapDef = {
  id: "s2-levers",
  name: "2. 양쪽 레버",
  blurb: "둘이 같이 밟고 있어야 열린다",
  timeLimit: 230,
  targetId: BALL_ID,
  targetName: "공",
  goal: { x: 0, z: -124, radius: 2.4, halfWidth: GOAL_HALF_W },
  spawns: [[-1.6, 10], [1.6, 10], [-3.6, 10], [3.6, 10]],
  // 첫 문(-20)을 배운 직후 방해꾼 하나가 따라붙는다. 스폰 자리는 넓은 구간이고
  // 주변 장애물(스위퍼 -76 / 문 -50·-92 / 낙하물 -42)과 6m 이상 떨어져 있다.
  botSpawns: [[3.4, -26]],
  ballSlots: [-40],
  floor: { size: 30, color: 0xc8f5d8, outside: 0xb4ecc9, hideOutside: true, hideFloor: true, noGround: true },
  fog: [0xd2f7e2, 68, 205],
  build: makeCourse({
    label: "s2-levers",
    startZ: 18, finishZ: -130, seed: 5150220,
    sections: [[18, -14, LANE_HALF], [-14, -70, LANE_HALF], [-70, -130, LANE_HALF]],
    gates: [[-14, 0x7bed9f], [-70, 0xffd166]],
    // [발판 위에 낙하물을 떨어뜨리지 않는다] buttongate의 발판은 문보다 3.6m
    // 앞(+Z)에 있다. 발판 위에서 버티는 쪽은 피할 수가 없으므로 낙하 지점은
    // 발판에서 6m 이상 띄운다 (-50 문의 발판은 -46.4다).
    hazards: [-4, -42, -100],
    gimmicks: [
      { kind: "buttongate", z: -20, arg: 0, phase: 0.0, note: "배우는 자리. 주변에 아무것도 없다" },
      { kind: "spinner", z: -34, arg: 4.2, phase: 0.8 },
      { kind: "buttongate", z: -50, arg: 0, phase: 0.0, note: "회전봉 뒤. 발판 자리를 골라야 한다" },
      { kind: "popup", z: -62, arg: -1, phase: 0.5 },
      { kind: "sweeper", z: -76, arg: 0, phase: 0.3 },
      { kind: "buttongate", z: -92, arg: 0, phase: 0.0, note: "지난 쪽이 곧바로 다음 압박을 만난다" },
      { kind: "piston", z: -106, arg: 1, phase: 0.6, note: "여기부터 골(-124)까지 18m는 비워 둔다" },
    ],
    // 공 전용 틈. 문 앞에서 공과 사람이 한 번 갈라져 있어야, 문이 열린 순간에
    // "누가 공을 가지고 있나"가 매번 달라진다.
    ballSlots: [-40],
  }),
};
