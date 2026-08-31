import { BALL_ID, type MapDef } from "../maps/types";
import { BRIDGE_HALF, GOAL_HALF_W, LANE_HALF, makeCourse } from "../maps/course";

/**
 * 예전 스테이지 배열의 2·3번 — 「회전 협곡」과 「봇 소굴」.
 *
 * 10 스테이지 계획으로 바뀌면서 2·3번 자리는 각각 「양쪽 레버」와
 * 「움직이는 바닥」이 가져갔다. 이 두 맵은 지우지 않고 여기 옮겨 뒀다.
 *
 *  - 「회전 협곡」: 장애물 리듬(조합의 축을 서로 다르게 골라 항상 지나갈 틈을
 *    남긴다)이 실측으로 다듬어진 배치다. 8·9 스테이지의 조합 구간을 짤 때
 *    베낄 만하다.
 *  - 「봇 소굴」: 봇 셋 + 셔터 + 협동 관문. **STAGE 6(공 도둑)의 바탕**이다.
 *    `thief` 런타임이 붙으면 봇 자리를 도둑으로 바꾸고 이름만 갈아 끼우면 된다.
 *
 * 둘 다 `MAPS`에 등록되지 않는다. 브라우저에서 `?lab`을 붙이면 시험장과 함께
 * 로드되므로 배치를 눈으로 다시 볼 수 있다.
 */

/** 회전 협곡 — 공 전용 틈 두 개와 난간 없는 좁은 다리 */
export const ARCHIVE_CANYON: MapDef = {
  id: "canyon",
  name: "회전 협곡 (보관)",
  blurb: "공만 지나가는 틈과 좁은 다리",
  timeLimit: 230,
  targetId: BALL_ID,
  targetName: "공",
  goal: { x: 0, z: -134, radius: 2.4, halfWidth: GOAL_HALF_W },
  spawns: [[-1.6, 10], [1.6, 10], [-3.6, 10], [3.6, 10]],
  botSpawns: [[3.2, -50], [-3.2, -112]],
  ballSlots: [-20, -104],
  floor: { size: 30, color: 0xffe0b2, outside: 0xffd0a0, hideOutside: true, hideFloor: true, noGround: true },
  fog: [0xffe2c0, 65, 200],
  build: makeCourse({
    label: "canyon",
    startZ: 18, finishZ: -140, seed: 771133,
    sections: [[18, -10, LANE_HALF], [-10, -56, LANE_HALF], [-56, -96, BRIDGE_HALF], [-96, -140, LANE_HALF]],
    gates: [[-10, 0xffd166], [-56, 0xff8a3d], [-96, 0x7c5cff]],
    hazards: [-4, -34, -108],
    ballSlots: [-20, -104],
    // [다리 구간(-56~-96)에는 좌우 장애물을 두지 않는다] 반폭이 2.6이라
    // 피스톤(±5.65)이나 회전봉(반경 4.4)을 두면 판 바깥 허공에서 헛돈다.
    // 폭 자체가 이미 압박이므로 여기는 중앙에 서는 협동 게이트만 둔다.
    gimmicks: [
      { kind: "sweeper", z: -26, arg: 0, phase: 0.0 },
      { kind: "buttongate", z: -36, arg: 0, phase: 0.0 },
      { kind: "spinner", z: -46, arg: 4.4, phase: 1.1 },
      // 조합: 왼쪽에서 피스톤 + 오른쪽에서 팝업이 동시에 (막는 축이 다르다)
      { kind: "piston", z: -52, arg: -1, phase: 0.0 },
      { kind: "popup", z: -52, arg: 1, phase: 0.9 },
      { kind: "coopgate", z: -70, arg: 0, phase: 0.0 },
      { kind: "popup", z: -98, arg: 0, phase: 0.7 },
      { kind: "spinner", z: -110, arg: 4.4, phase: 0.5 },
      { kind: "piston", z: -113, arg: 1, phase: 1.4 },
    ],
    shortcuts: [[-40, -56]],
  }),
};

/** 봇 소굴 — STAGE 6(공 도둑)의 바탕이 될 배치 */
export const ARCHIVE_DEN: MapDef = {
  id: "denof",
  name: "봇 소굴 (보관)",
  blurb: "셔터 통로와 방해꾼 셋",
  timeLimit: 260,
  targetId: BALL_ID,
  targetName: "공",
  goal: { x: 0, z: -154, radius: 2.4, halfWidth: GOAL_HALF_W },
  spawns: [[-1.6, 10], [1.6, 10], [-3.6, 10], [3.6, 10]],
  // 세 번째 봇은 클라이맥스(버튼 문 -114)에 맞춰 등장한다.
  // -130이면 이미 다 지난 뒤라 아무것도 안 하고 끝났다.
  botSpawns: [[3.4, -34], [-3.4, -86], [2.6, -108]],
  ballSlots: [-72],
  floor: { size: 30, color: 0xd9c8ff, outside: 0xc9b6ff, hideOutside: true, hideFloor: true, noGround: true },
  fog: [0xd8ccff, 60, 190],
  build: makeCourse({
    label: "denof",
    startZ: 18, finishZ: -160, seed: 424242,
    sections: [[18, -14, LANE_HALF], [-14, -60, LANE_HALF], [-60, -100, LANE_HALF], [-100, -160, LANE_HALF]],
    gates: [[-14, 0x7c5cff], [-60, 0xff8a3d], [-100, 0xffd166]],
    hazards: [-6, -50, -112],
    ballSlots: [-72],
    gimmicks: [
      { kind: "buttongate", z: -16, arg: 0, phase: 0.0 },
      { kind: "shutter", z: -24, arg: -1, phase: 0.0 },
      { kind: "shutter", z: -24, arg: 1, phase: 0.0 },
      // roller는 -44에서 +Z로 18m(-44 ~ -26) 굴러간다. 셔터(-24)와 2m 띄운다
      { kind: "roller", z: -44, arg: 0, phase: 0.0 },
      { kind: "spinner", z: -54, arg: 4.4, phase: 0.8 },
      { kind: "coopgate", z: -66, arg: 0, phase: 0.0 },
      { kind: "piston", z: -78, arg: -1, phase: 0.0 },
      { kind: "piston", z: -81, arg: 1, phase: 1.1 },
      { kind: "sweeper", z: -92, arg: 0, phase: 0.5 },
      // 지름길(-86~-100) 뒤에 둔다. 앞에 두면 협동 관문을 건너뛸 수 있다
      { kind: "coopgate", z: -102, arg: 0, phase: 0.0 },
      { kind: "shutter", z: -104, arg: -1, phase: 1.3 },
      { kind: "shutter", z: -104, arg: 1, phase: 1.3 },
      { kind: "popup", z: -108, arg: 0, phase: 0.4 },
      // [클라이맥스] 봇 · 장애물 · 협동이 한꺼번에 온다
      { kind: "buttongate", z: -114, arg: 0, phase: 0.0 },
      { kind: "spinner", z: -120, arg: 4.4, phase: 0.3 },
    ],
    shortcuts: [[-86, -100]],
  }),
};

export const ARCHIVED_STAGES: MapDef[] = [ARCHIVE_CANYON, ARCHIVE_DEN];
