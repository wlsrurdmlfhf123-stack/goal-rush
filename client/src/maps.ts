import { OB, type ObstacleKind } from "./obstacles";
import * as THREE from "three";

import {
  C, type Build, type MatOpts, type V3,
  solid, deco, solidCyl, decoCyl, decoSph, boxGeo, cylGeo, sphGeo, toyMat, at,
  buildTable, buildChair, buildSofa, buildArmchair, buildShelf, buildBed, buildNightstand,
  buildDresser, buildCounter, buildStove, buildSink, buildLamp, buildPlant, buildTV,
  buildStairs, buildBarrel, buildPillar, buildRug, buildWindow, buildPicture,
  buildWallpaper, buildBoxStack, buildCoatRack, buildCone, buildBeanbag,
  buildSconce, buildClock, buildBoard, buildBench,
  GR, buildFence, buildCloud, buildBalloon, buildKeyPad, buildGoalNet, buildBallSlot, rng,
} from "./mapkit";

/** 무거운 소품(운반 목표) 기본 질량. "혼자면 겨우 밀고, 둘이면 들어서 옮긴다" 기준 */
export const PROP_HEAVY_MASS = 20;

/**
 * 축구공의 소품 id. 맵마다 하나씩 둔다.
 *
 * 다른 소품과 겹치지 않게 높은 번호를 쓴다 (기존 소품은 1~26).
 */
export const BALL_ID = 90;

/** 낙하 장애물 소품 id 시작값. station마다 하나씩 순서대로 쓴다 */
export const HAZARD_ID0 = 100;
/** 코스 장애물(회전봉/피스톤/거대 공) id 시작값 */
const OBSTACLE_ID0 = 200;

/** 맵이 소품을 등록할 때 쓰는 함수 시그니처 (world.ts가 구현해서 넘겨준다) */
export type AddProp = (
  id: number,
  size: V3,
  pos: V3,
  color: number,
  mass: number,
  grabRadius: number,
  decorate?: (g: THREE.Group) => void,
  matOpts?: MatOpts,
) => void;

/**
 * 굴러가는 공을 등록한다.
 *
 * addProp은 첫 shape를 항상 Box로 만든다(grab/캐리 코드가 오래 그걸 단정해
 * 왔다). 공은 Sphere라야 굴러가므로 경로를 따로 둔다.
 */
export type AddBall = (
  id: number,
  radius: number,
  pos: V3,
  opts?: { mass?: number; color?: number; patch?: number },
) => void;

/**
 * 낙하 장애물 지점을 등록한다.
 * @param phase 첫 낙하까지의 대기 시간(초). station마다 다르게 줘서 한꺼번에 안 떨어지게 한다
 */
export type AddHazard = (id: number, z: number, phase: number) => void;

/**
 * 코스 장애물 등록.
 * @param kind spinner(회전봉) / piston(좌우 벽) / roller(굴러오는 거대 공)
 * @param arg  spinner: 봉 반길이 / piston: 나오는 쪽(-1 왼쪽, +1 오른쪽) / roller: 안 씀
 */
export type AddObstacle = (
  id: number, kind: ObstacleKind, z: number, arg: number, phase: number,
) => void;

export interface MapCtx {
  /** 정적 지형/가구 빌더 컨텍스트 */
  b: Build;
  /** 잡을 수 있는(= 네트워크 동기화되는) 동적 소품 등록 */
  addProp: AddProp;
  /** 굴러가는 공 등록 */
  addBall: AddBall;
  /** 낙하 장애물 지점 등록 */
  addHazard: AddHazard;
  /** 코스 장애물(회전봉/피스톤/거대 공) 등록 */
  addObstacle: AddObstacle;
}

export interface MapDef {
  id: string;
  /** 화면에 보여줄 이름 */
  name: string;
  /** 한 줄 설명 (로딩/성공 화면에 쓴다) */
  blurb: string;
  /** 제한시간(초). 뒤로 갈수록 빡빡해진다 */
  timeLimit: number;
  /** 운반해야 할 소품 id (그 맵의 addProp에 반드시 있어야 한다) */
  targetId: number;
  targetName: string;
  /** 도착 지점. 거리 표시에 쓰고, judge가 켜져 있으면 성공 판정에도 쓴다 */
  goal: {
    x: number; z: number; radius: number;
    /**
     * 골라인의 좌우 반폭. 공이 이 폭 안으로 z를 가로질러야 골이다.
     * 없으면 radius * 2.4로 잡는다 (game.ts checkCross 참고).
     */
    halfWidth?: number;
  };
  /**
   * 성공/실패를 판정할 것인가.
   *
   * Goal Rush 코스는 골대와 골 판정이 5단계 몫이라 아직 false다.
   * false면 game.ts가 출구 마커도, 타이머 카운트다운도, 결과 화면도 띄우지
   * 않고 거리 표시만 한다.
   */
  judge?: boolean;
  /**
   * 공만 지나가는 틈의 z 목록.
   *
   * 지오메트리는 build 안에서 만들지만, 런타임(main.ts)도 이 위치를 알아야
   * 한다 - "여기서 막힌 건 벽이 아니라 규칙이다"를 알려주고, 공이 틈 안에
   * 서 버렸을 때 빼내주기 위해서다. 그래서 좌표를 여기로 한 번 더 올린다.
   */
  ballSlots?: number[];
  /** 캐릭터 스폰 지점 (최대 4명) */
  spawns: [number, number][];
  /**
   * AI 봇 스폰 지점. 없으면 봇을 쓰지 않는 맵이다.
   * 코스 중간쯤에 두어야 출발하자마자 달려들지 않는다.
   */
  botSpawns?: [number, number][];
  /** 바닥 렌더 색/크기와 바깥 배경색 */
  floor: {
    size: number;
    color: number;
    outside: number;
    /** 바깥 배경 판을 감춘다 (하늘 위 코스는 아래가 하늘이라야 한다) */
    hideOutside?: boolean;
    /** 코스 바닥 자체를 맵이 직접 만드는 경우 엔진 바닥판을 감춘다 */
    hideFloor?: boolean;

    /**

     * 무한 물리 지면(y=0)을 빼버린다.

     *

     * 기본값(false)이면 y=0에 보이지 않는 무한 평면이 깔려 있어서, 코스 밖으로

     * 나가도 그 위를 계속 걸을 수 있다. 즉 "떨어진다"가 성립하지 않고

     * main.ts의 낙사/리스폰(VOID_Y=-8)도 영원히 발동하지 않는다.

     * 좁은 다리처럼 떨어지는 게 규칙의 일부인 맵은 이걸 켠다.

     */

    noGround?: boolean;
  };
  /** 안개 [색, 시작거리, 끝거리]. 없으면 기본값 */
  fog?: [number, number, number];
  build(ctx: MapCtx): void;
}

// ================================================================ 1. 집
  /** 나무 상자 - 세 축에 띠를 둘러서 "상자"임이 한눈에 읽히게 */
  const crateTrim = (s: number, band: number) => (g: THREE.Group) => {
    const sizes: V3[] = [
      [s * 1.02, band, s * 1.02],
      [band, s * 1.02, s * 1.02],
      [s * 1.02, s * 1.02, band],
    ];
    for (const sz of sizes) {
      const m = new THREE.Mesh(boxGeo(sz[0], sz[1], sz[2]), toyMat(C.woodDark, { rough: 0.6 }));
      m.castShadow = true;
      g.add(m);
    }
  };


function buildHouse({ b, addProp, addBall }: MapCtx) {
  // ---------------------------------------------------------- 벽 (4)
  const H = 3, T = 0.6, S = 15; // 안쪽 면은 ±14.7
  solid(b, [S * 2, H, T], [0, H / 2, -S], C.wall, [0, 0, 0], { rough: 0.75 });
  solid(b, [S * 2, H, T], [0, H / 2, S], C.wall, [0, 0, 0], { rough: 0.75 });
  solid(b, [T, H, S * 2], [-S, H / 2, 0], C.wall, [0, 0, 0], { rough: 0.75 });
  solid(b, [T, H, S * 2], [S, H / 2, 0], C.wall, [0, 0, 0], { rough: 0.75 });

  // 걸레받이 + 윗몰딩. 평평한 벽에 선이 하나만 있어도 "방"으로 읽힌다.
  for (const p of [[0, 0.11, -14.62], [0, 0.11, 14.62]] as V3[]) {
    deco(b, [29.4, 0.22, 0.1], p, C.baseboard, [0, 0, 0], { rough: 0.7 });
  }
  for (const p of [[-14.62, 0.11, 0], [14.62, 0.11, 0]] as V3[]) {
    deco(b, [0.1, 0.22, 29.4], p, C.baseboard, [0, 0, 0], { rough: 0.7 });
  }
  for (const p of [[0, 2.86, -14.66], [0, 2.86, 14.66]] as V3[]) {
    deco(b, [29.4, 0.28, 0.14], p, C.wallTrim, [0, 0, 0], { rough: 0.7 });
  }
  for (const p of [[-14.66, 2.86, 0], [14.66, 2.86, 0]] as V3[]) {
    deco(b, [0.14, 0.28, 29.4], p, C.wallTrim, [0, 0, 0], { rough: 0.7 });
  }

  // 벽지 - 벽마다 다른 파스텔을 깔아서 구역이 색으로 구분되게 한다
  // 그늘진 벽은 색이 한 단계 죽어서 회색으로 보인다. 아래쪽 띠는 원하는
  // 인상보다 한 톤 진하게 잡아야 그림자 속에서도 색으로 읽힌다.
  buildWallpaper(b, "z", -14.7, 0xd6f0e2, 0x8fd0b6); // 주방/서재 쪽: 민트
  buildWallpaper(b, "z", 14.7, 0xffe6d3, 0xf7b48f);  // 식당/거실 쪽: 살구
  buildWallpaper(b, "x", -14.7, 0xe9e2fb, 0xb3a8e6); // 침실/파쿠르 쪽: 라벤더
  buildWallpaper(b, "x", 14.7, 0xdcecfb, 0x96c4e8);  // 거실/서재 쪽: 하늘

  // 창문 (주방 상부장 x -8~0 구간은 피해서 배치한다 - 겹치면 찬장이 창을 뚫는다)
  buildWindow(b, [-11.5, 1.9, -14.66], 0, 2.0, 1.4);
  buildWindow(b, [11.0, 1.9, -14.66], 0, 2.0, 1.4);
  buildWindow(b, [-4, 1.9, 14.66], Math.PI, 2.0, 1.4);
  buildWindow(b, [6, 1.9, 14.66], Math.PI, 2.0, 1.4);
  buildWindow(b, [14.66, 1.9, 1.5], -Math.PI / 2, 2.2, 1.4);
  buildWindow(b, [-14.66, 1.9, 2.6], Math.PI / 2, 2.0, 1.4);

  // 액자 / 시계 / 벽등
  buildPicture(b, [-14.62, 1.95, 9.5], Math.PI / 2, C.crateE, 0.9, 0.7);
  buildPicture(b, [-14.62, 1.95, 11.3], Math.PI / 2, C.crateC, 0.7, 0.9);
  buildPicture(b, [-14.62, 0.78, 10.4], Math.PI / 2, C.fabricD, 0.6, 0.5);
  buildPicture(b, [2.5, 2.05, -14.62], 0, C.crateF, 1.1, 0.8);
  buildPicture(b, [11.5, 2.05, 14.62], Math.PI, C.crateD, 1.0, 0.7);
  buildPicture(b, [9.0, 2.05, 14.62], Math.PI, C.fabricC, 0.7, 0.9);
  buildClock(b, [0, 2.2, -14.62], 0);
  buildBoard(b, [14.62, 1.95, -12.2], -Math.PI / 2);
  buildSconce(b, [-14.62, 1.6, 6.0], Math.PI / 2);
  buildSconce(b, [-14.62, 1.6, 13.0], Math.PI / 2);
  buildSconce(b, [14.62, 1.6, 6.5], -Math.PI / 2);
  buildSconce(b, [-1.5, 1.6, 14.62], Math.PI);

  // ---------------------------------------------------------- 경사로
  //
  // 충돌체(8 x 0.5 x 6, rotZ 0.28)는 원래 그대로다 - 이건 게임플레이 지형이라
  // 건드리면 안 된다. 시각적으로만 "널판지 경사로"로 보이게 살을 붙인다.
  // (색만 입힌 두꺼운 판이라 예전엔 공중에 뜬 주황색 접시처럼 보였다.)
  solid(b, [8, 0.5, 6], [-7, 1.1, -6], C.wood, [0, 0, 0.28], { rough: 0.65 });
  const RAMP_TILT = 0.28;
  const rampY = (x: number) => 1.1 + (x + 7) * Math.tan(RAMP_TILT);
  // 가장자리 턱
  for (const rz of [-3.15, -8.85]) {
    deco(b, [8.1, 0.16, 0.36], [-7, 1.36, rz], C.fabricD, [0, 0, RAMP_TILT], { rough: 0.6 });
  }
  // 미끄럼 방지 발판 무늬
  for (let i = -3; i <= 3; i++) {
    const rx = -7 + i * 1.05;
    deco(b, [0.3, 0.06, 5.2], [rx, rampY(rx) + 0.26, -6], C.woodDark, [0, 0, RAMP_TILT], { rough: 0.8 });
  }
  // 밑을 받치는 기둥. 없으면 판이 공중에 떠 있는 것처럼 보인다.
  for (const rx of [-7.6, -4.6]) {
    const under = rampY(rx) - 0.28 / Math.cos(RAMP_TILT);
    for (const rz of [-3.6, -8.4]) {
      deco(b, [0.26, under, 0.26], [rx, under / 2, rz], C.woodDark, [0, 0, 0], { rough: 0.7 });
    }
    deco(b, [0.2, 0.2, 5.0], [rx, under - 0.1, -6], C.woodDark, [0, 0, 0], { rough: 0.7 });
  }

  // ---------------------------------------------------------- 거실 (+X, +Z)
  buildRug(b, 9.6, 9.8, 6.4, 4.8, 0, C.rugA, 0xfff0f2);
  buildSofa(b, 9.6, 13.0, Math.PI, C.fabricA);
  buildTable(b, 9.6, 9.9, 0, 1.5, 0.85, 0.44, C.woodLight); // 좌탁
  buildArmchair(b, 13.2, 9.6, -Math.PI / 2, C.fabricB);
  buildArmchair(b, 6.1, 9.6, Math.PI / 2, C.fabricC);
  buildTV(b, 9.6, 6.3, 0);
  buildLamp(b, 13.4, 12.9);
  buildPlant(b, 6.0, 13.6, 1.15, 11);
  buildPlant(b, 13.6, 6.4, 0.9, 12);
  buildBeanbag(b, 6.6, 11.6, C.crateD);
  buildBench(b, 12.6, 5.2, Math.PI / 2, C.crateF);
  buildBoxStack(b, 13.4, 8.0, 0.3, 501);

  // ---------------------------------------------------------- 침실 (-X, +Z)
  buildRug(b, -9.4, 8.4, 4.6, 3.4, 0, C.rugB, 0xeafaf5);
  buildBed(b, -11.6, 11.6, 0);
  buildNightstand(b, -13.6, 9.6, Math.PI / 2);
  buildNightstand(b, -13.6, 13.6, Math.PI / 2);
  buildDresser(b, -7.4, 13.8, Math.PI);
  buildPlant(b, -13.8, 6.6, 1.0, 21);
  buildLamp(b, -6.4, 9.6);
  buildCoatRack(b, -13.4, 5.0);
  buildBench(b, -9.4, 13.9, 0, C.fabricC);
  buildBoxStack(b, -5.4, 12.4, -0.4, 502);
  buildBeanbag(b, -8.0, 9.4, C.fabricB);

  // ---------------------------------------------------------- 서재 (+X, -Z)
  buildShelf(b, 14.0, -6.4, -Math.PI / 2, 101);
  buildShelf(b, 14.0, -8.1, -Math.PI / 2, 202);
  buildShelf(b, 14.0, -9.8, -Math.PI / 2, 303);
  buildRug(b, 10.6, -8.6, 4.2, 3.2, 0, C.rugC, 0xfff6e0);
  buildTable(b, 10.4, -12.4, 0, 2.0, 1.0, 0.76, C.wood); // 책상
  buildChair(b, 10.4, -11.2, Math.PI, C.wood, C.crateC);
  buildChair(b, 12.4, -12.4, -Math.PI / 2, C.wood, C.crateE);
  buildPlant(b, 13.8, -13.6, 1.2, 33);
  buildBarrel(b, 7.0, -13.6, C.crateB);
  buildBarrel(b, 7.9, -13.9, C.crateA);
  buildBarrel(b, 7.3, -12.7, C.crateF);
  buildShelf(b, 5.4, -10.0, Math.PI / 2, 404);
  buildBoxStack(b, 12.6, -3.4, 0.6, 503);
  buildBench(b, 8.4, -8.6, 0, C.crateD);
  buildPlant(b, 5.6, -5.2, 0.95, 34);

  // ---------------------------------------------------------- 주방 (-Z 벽)
  buildCounter(b, -3.4, -14.3, 0, 4.2);
  buildStove(b, -0.7, -14.3, 0);
  buildSink(b, -6.6, -14.3, 0);
  for (const cx of [-6.6, -4.2, -1.8]) {
    deco(b, [2.2, 0.9, 0.4], [cx, 2.1, -14.42], 0xe9eef3, [0, 0, 0], { rough: 0.45 });
    deco(b, [1.0, 0.03, 0.03], [cx, 1.68, -14.2], C.metalDark, [0, 0, 0], { rough: 0.3, metal: 0.6 });
  }
  buildTable(b, -8.8, -12.2, 0, 1.4, 0.9, 0.76, C.woodLight);
  buildChair(b, -8.8, -10.9, Math.PI, C.woodLight, C.crateF);
  // 조리대 위 소품
  decoCyl(b, 0.17, 0.17, 0.22, [-1.9, 1.05, -14.2], C.metal, [0, 0, 0], { rough: 0.25, metal: 0.6 });
  decoCyl(b, 0.18, 0.18, 0.03, [-1.9, 1.17, -14.2], C.metalDark, [0, 0, 0], { rough: 0.3, metal: 0.6 });
  decoCyl(b, 0.2, 0.16, 0.12, [-3.6, 1.0, -14.2], C.crateE, [0, 0, 0], { rough: 0.4 });
  for (const [fx, fc] of [[-3.7, C.crateA], [-3.5, C.leaf], [-3.6, C.crateB]] as [number, number][]) {
    decoSph(b, 0.075, [fx, 1.09, -14.18], fc, [1, 1, 1], { rough: 0.6 });
  }
  deco(b, [0.24, 0.3, 0.18], [-4.9, 1.09, -14.25], C.crateC, [0, 0.3, 0], { rough: 0.4 });
  buildBoxStack(b, -1.6, -12.4, 0.2, 504);
  buildCone(b, -6.0, -11.2);
  buildCone(b, -5.4, -10.6);

  // ---------------------------------------------------------- 식탁 (+Z 중앙)
  // (러그 색을 바닥 크림색과 비슷하게 뒀더니 아예 안 보였다 -> 진하게)
  buildRug(b, 0, 11.8, 4.6, 3.6, 0, 0x7fb2d9, 0xe9f2fb);
  buildTable(b, 0, 11.8, 0, 2.2, 1.2, 0.76, C.wood);
  buildChair(b, -1.5, 11.8, -Math.PI / 2, C.wood, C.crateA);
  buildChair(b, 1.5, 11.8, Math.PI / 2, C.wood, C.crateC);
  buildChair(b, 0, 10.3, Math.PI, C.wood, C.crateE);
  buildChair(b, 0, 13.3, 0, C.wood, C.crateF);
  decoCyl(b, 0.16, 0.12, 0.3, [0, 0.92, 11.8], C.crateC, [0, 0, 0], { rough: 0.35 });
  decoSph(b, 0.12, [0, 1.14, 11.8], C.crateE, [1, 1, 1], { rough: 0.6 });
  decoSph(b, 0.1, [0.17, 1.1, 11.9], C.fabricD, [1, 1, 1], { rough: 0.6 });

  // ---------------------------------------------------------- 파쿠르 (-X, -Z)
  buildStairs(b, -12.5, -10.4, 0, 5, 2.6, 0.34, 0.62);
  solid(b, [3.0, 1.7, 2.6], [-12.5, 0.85, -13.4], C.crateD, [0, 0, 0], { rough: 0.45 });
  solid(b, [1.4, 0.55, 1.4], [-4.6, 0.28, -12.6], C.crateC, [0, 0, 0], { rough: 0.45 });
  solid(b, [1.4, 1.05, 1.4], [-6.4, 0.53, -13.4], C.crateE, [0, 0, 0], { rough: 0.45 });
  solid(b, [1.4, 1.55, 1.4], [-8.2, 0.78, -12.4], C.crateF, [0, 0, 0], { rough: 0.45 });
  solid(b, [2.4, 0.35, 2.4], [-3.0, 0.18, -10.4], C.fabricD, [0, 0, 0], { rough: 0.45 });
  buildPillar(b, -13.3, -3.2, 3.0);
  buildPillar(b, -13.3, 1.2, 3.0);
  buildBarrel(b, -10.0, -0.6, C.crateA);
  buildBarrel(b, -10.9, -1.2, C.crateD);
  buildPlant(b, -13.6, -1.0, 0.85, 44);
  buildCone(b, -3.4, -8.4);
  buildCone(b, -2.4, -8.9);
  buildBoxStack(b, -14.0, -6.6, 0.5, 505);
  buildBench(b, -10.6, -12.0, Math.PI / 2, C.crateE);
  // 낮은 발판 징검다리. 경사로(x -11~-3, z -9~-3) 밑을 지나가지 않도록
  // 일부러 z = -11 아래쪽 빈 바닥에 깔았다 - 밑에 깔면 발판이 경사로를 뚫는다.
  for (let i = 0; i < 4; i++) {
    const h = 0.3 + i * 0.22;
    solid(b, [0.9, h, 0.9], [1.2 + i * 1.25, h / 2, -11.4 - i * 0.45],
      [C.crateC, C.crateE, C.crateD, C.crateF][i], [0, i * 0.3, 0], { rough: 0.45 });
  }

  // ---------------------------------------------------------- 나머지 여백
  buildRug(b, 0, 3.2, 5.0, 3.6, 0, 0x9fd0b6, 0xf1fbf6); // 스폰 지점 (통과 가능)
  buildPillar(b, 13.2, 2.6, 3.0);
  buildPlant(b, 4.8, -2.4, 0.8, 55);
  buildPlant(b, 12.4, 12.6, 0.75, 66);
  buildPlant(b, -4.6, 6.4, 0.9, 77);
  buildBarrel(b, 13.9, 4.6, C.crateF);
  buildCone(b, 4.4, 5.6);
  solid(b, [0.9, 0.9, 0.9], [-13.9, 0.45, 4.4], C.crateD, [0, 0, 0], { rough: 0.45 });
  solid(b, [0.9, 0.6, 0.9], [-13.9, 1.2, 4.4], C.crateE, [0, 0, 0], { rough: 0.45 });

  // ---------------------------------------------------------- 동적 소품

  addProp(1, [0.8, 0.8, 0.8], [3, 0.4, 2], C.crateA, 4, 1.6, crateTrim(0.8, 0.12));
  addProp(2, [0.8, 0.8, 0.8], [5, 0.4, -1], C.crateB, 4, 1.6, crateTrim(0.8, 0.12));
  // 큰 물체 = "냉장고".
  // 질량은 "혼자면 겨우 밀고, 둘이면 들어서 옮긴다"가 되도록 잡았다.
  //   한 명 들기 예산 260N -> 20kg(360N)은 혼자 못 듦 -> 바닥에 둔 채 밀기만
  //   두 명 들기 예산 520N -> 360N을 넘으므로 번쩍 들어서 운반
  // 28kg일 때는 혼자 미는 경우가 solver 교착 영역에 걸려 아예 안 움직였다.
  addProp(
    3, [1.2, 2.2, 1.0], [0, 1.1, -4], 0xf2f5f8, PROP_HEAVY_MASS, 2.4,
    (g) => {
      const seam = new THREE.Mesh(boxGeo(1.22, 0.05, 1.02), toyMat(C.metalDark, { rough: 0.4, metal: 0.5 }));
      seam.position.y = 0.42;
      g.add(seam);
      for (const y of [0.75, -0.15]) {
        const h = new THREE.Mesh(cylGeo(0.035, 0.035, 0.5), toyMat(C.metalDark, { rough: 0.3, metal: 0.7 }));
        h.position.set(0.42, y, 0.53);
        h.castShadow = true;
        g.add(h);
      }
    },
    { rough: 0.35, metal: 0.15 }
  );

  // 색색깔 소품들. 전부 4kg = 혼자서도 들 수 있는 무게로 통일했다.
  addProp(4, [0.7, 0.7, 0.7], [6.4, 0.35, 3.6], C.crateC, 4, 1.5, crateTrim(0.7, 0.1));
  addProp(5, [0.6, 0.6, 0.6], [6.9, 0.3, 4.8], C.crateD, 4, 1.4, crateTrim(0.6, 0.09));
  addProp(6, [0.6, 0.6, 0.6], [6.9, 0.9, 4.8], C.crateE, 4, 1.4, crateTrim(0.6, 0.09));
  addProp(7, [1.5, 0.2, 0.42], [-5.2, 0.1, 2.4], C.woodLight, 4, 1.6); // 널판지
  addProp(8, [1.5, 0.2, 0.42], [-5.16, 0.3, 2.46], C.wood, 4, 1.6);
  addProp(9, [0.95, 0.62, 0.34], [-8.9, 0.31, 7.6], C.crateE, 4, 1.5, (g) => { // 여행가방
    const h = new THREE.Mesh(cylGeo(0.03, 0.03, 0.34), toyMat(C.woodDark, { rough: 0.5 }));
    h.rotation.z = Math.PI / 2;
    h.position.y = 0.36;
    g.add(h);
    for (const sx of [-1, 1]) {
      const s2 = new THREE.Mesh(boxGeo(0.09, 0.64, 0.36), toyMat(C.metalDark, { rough: 0.4, metal: 0.5 }));
      s2.position.x = sx * 0.3;
      g.add(s2);
    }
  });
  addProp(10, [0.62, 0.42, 0.36], [8.6, 0.21, -5.6], C.crateF, 4, 1.4, (g) => { // 공구함
    const lid = new THREE.Mesh(boxGeo(0.66, 0.08, 0.4), toyMat(C.metalDark, { rough: 0.4, metal: 0.4 }));
    lid.position.y = 0.2;
    g.add(lid);
  });
  addProp(11, [0.46, 0.5, 0.62], [11.6, 0.25, -9.4], C.crateD, 4, 1.4, (g) => { // 책더미
    let y = -0.17;
    for (const col of [0xef6f6c, 0x5bc0eb, 0xf6c453, 0x8ac926]) {
      const m = new THREE.Mesh(boxGeo(0.44, 0.1, 0.6), toyMat(col, { rough: 0.78 }));
      m.position.y = y;
      m.rotation.y = (y * 2) % 0.25;
      m.castShadow = true;
      g.add(m);
      y += 0.115;
    }
  }, { rough: 0.78 });
  addProp(12, [0.9, 0.72, 0.9], [-2.6, 0.36, -9.6], C.crateA, 4, 1.7, crateTrim(0.9, 0.13));
  addProp(13, [0.75, 0.75, 0.75], [-9.6, 0.375, -7.0], C.crateC, 4, 1.6, crateTrim(0.75, 0.11));
  addProp(14, [0.75, 0.75, 0.75], [-10.6, 0.375, -8.3], C.crateF, 4, 1.6, crateTrim(0.75, 0.11));
  addProp(15, [1.0, 0.34, 1.0], [2.6, 0.17, 8.6], C.fabricD, 4, 1.8, undefined, { rough: 0.95, metal: 0 });
  addProp(16, [1.0, 0.34, 1.0], [2.64, 0.51, 8.64], C.fabricB, 4, 1.8, undefined, { rough: 0.95, metal: 0 });
  addProp(17, [0.5, 1.1, 0.5], [13.0, 0.55, 13.2], C.crateE, 4, 1.6, (g) => { // 화분
    const leaf = new THREE.Mesh(sphGeo(0.36), toyMat(C.leaf, { rough: 0.7, metal: 0 }));
    leaf.position.y = 0.72;
    leaf.scale.set(1, 0.8, 1);
    leaf.castShadow = true;
    g.add(leaf);
  });
  addProp(18, [0.55, 0.55, 0.55], [-12.6, 1.98, -13.9], C.crateB, 4, 1.4, crateTrim(0.55, 0.09));
  addProp(19, [0.66, 0.66, 0.66], [-13.0, 0.33, 1.6], C.crateE, 4, 1.5, crateTrim(0.66, 0.1));
  addProp(20, [0.66, 0.66, 0.66], [-12.4, 0.33, 0.6], C.crateF, 4, 1.5, crateTrim(0.66, 0.1));
  addProp(21, [0.9, 0.28, 0.6], [11.2, 0.14, 3.4], C.crateC, 4, 1.5, (g) => { // 쟁반
    for (const sx of [-1, 1]) {
      const lip = new THREE.Mesh(boxGeo(0.06, 0.22, 0.62), toyMat(C.crateD, { rough: 0.45 }));
      lip.position.set(sx * 0.44, 0.06, 0);
      g.add(lip);
    }
  });
  addProp(22, [0.44, 0.62, 0.44], [-0.9, 0.31, 6.4], C.metal, 4, 1.4, (g) => { // 양동이
    const rim = new THREE.Mesh(cylGeo(0.3, 0.3, 0.07), toyMat(C.metalDark, { rough: 0.3, metal: 0.6 }));
    rim.position.y = 0.32;
    rim.castShadow = true;
    g.add(rim);
    const handle = new THREE.Mesh(cylGeo(0.022, 0.022, 0.6), toyMat(C.metalDark, { rough: 0.3, metal: 0.7 }));
    handle.rotation.z = Math.PI / 2;
    handle.position.y = 0.42;
    g.add(handle);
  }, { rough: 0.3, metal: 0.45 });
  addProp(23, [0.38, 0.9, 0.38], [-2.2, 0.45, -13.0], C.crateD, 4, 1.5, (g) => { // 페인트통
    const band = new THREE.Mesh(boxGeo(0.4, 0.16, 0.4), toyMat(0xfff3d6, { rough: 0.5 }));
    band.position.y = 0.12;
    g.add(band);
  });
  addProp(24, [1.15, 0.26, 0.7], [9.4, 0.13, -3.2], C.woodLight, 4, 1.7, (g) => { // 나무 판자 더미
    const b2 = new THREE.Mesh(boxGeo(1.1, 0.2, 0.62), toyMat(C.wood, { rough: 0.7 }));
    b2.position.set(0.04, 0.23, 0.03);
    b2.rotation.y = 0.09;
    b2.castShadow = true;
    g.add(b2);
  }, { rough: 0.7 });
  addProp(25, [0.7, 0.7, 0.7], [-6.0, 0.35, 5.6], C.crateA, 4, 1.5, crateTrim(0.7, 0.1));
  addProp(26, [0.52, 0.52, 0.52], [-6.02, 0.96, 5.57], C.crateC, 4, 1.4, crateTrim(0.52, 0.08));

  // 1단계용 축구공 (코스/골대는 다음 단계)
  addBall(BALL_ID, 0.3, [0, 0.31, 3.5]);
}

// ================================================================ 2. 창고
//
// 집보다 넓고 텅 비어 있지만, 선반 열과 팔레트 더미가 통로를 꺾어 놓아서
// 운반 경로가 직선이 아니다. 목표는 무거운 공구함이고 출구가 대각선 반대편이다.
function buildWarehouse({ b, addProp, addBall }: MapCtx) {
  const H = 4.2, T = 0.6, S = 17;   // 안쪽 면 ±16.7

  // ---- 벽 (콘크리트 톤)
  for (const [sz, p] of [
    [[S * 2, H, T], [0, H / 2, -S]],
    [[S * 2, H, T], [0, H / 2, S]],
    [[T, H, S * 2], [-S, H / 2, 0]],
    [[T, H, S * 2], [S, H / 2, 0]],
  ] as [V3, V3][]) solid(b, sz, p, 0xb9bec7, [0, 0, 0], { rough: 0.9 });

  // 아래쪽 띠 - 창고 벽 특유의 페인트 경계
  for (const [sz, p] of [
    [[S * 2 - 0.3, 1.1, 0.08], [0, 0.55, -S + 0.34]],
    [[S * 2 - 0.3, 1.1, 0.08], [0, 0.55, S - 0.34]],
    [[0.08, 1.1, S * 2 - 0.3], [-S + 0.34, 0.55, 0]],
    [[0.08, 1.1, S * 2 - 0.3], [S - 0.34, 0.55, 0]],
  ] as [V3, V3][]) deco(b, sz, p, 0x6f7885, [0, 0, 0], { rough: 0.8 });

  // 천장 트러스 (장식만 - 높이 4.2라 캐릭터가 닿지 않는다)
  for (let x = -14; x <= 14; x += 7) {
    deco(b, [0.28, 0.28, S * 2 - 1], [x, 4.05, 0], 0x8e97a3, [0, 0, 0], { rough: 0.6, metal: 0.35 });
  }
  for (let z = -13.5; z <= 13.5; z += 4.5) {
    deco(b, [S * 2 - 1, 0.2, 0.2], [0, 4.2, z], 0x8e97a3, [0, 0, 0], { rough: 0.6, metal: 0.35 });
  }

  // 채광창
  for (const x of [-9, 0, 9]) {
    buildWindow(b, [x, 3.1, -S + 0.32], 0, 2.6, 1.5);
    buildWindow(b, [x, 3.1, S - 0.32], Math.PI, 2.6, 1.5);
  }

  // ---- 선반 열 (통로를 만든다)
  for (const z of [-11, -5.5]) {
    for (const x of [-12, -7.5]) buildShelf(b, x, z, 0, x * 7 + z);
  }
  for (const z of [5.5, 11]) {
    for (const x of [7.5, 12]) buildShelf(b, x, z, Math.PI, x * 5 + z);
  }

  // ---- 팔레트 더미 (경로를 꺾는 장애물)
  const pallet = (x: number, z: number, h: number) => {
    for (let i = 0; i < h; i++) {
      solid(b, [1.5, 0.16, 1.3], [x, 0.08 + i * 0.62, z], C.wood, [0, 0, 0], { rough: 0.7 });
      solid(b, [1.35, 0.46, 1.15], [x, 0.39 + i * 0.62, z], i % 2 ? C.crateB : C.crateE, [0, 0, 0], { rough: 0.55 });
    }
  };
  pallet(-2.5, -8, 3);
  pallet(-2.5, -6.2, 2);
  pallet(2.5, 1.5, 3);
  pallet(2.5, 3.3, 2);
  pallet(-6, 8.5, 2);
  pallet(9, -3.5, 3);

  // ---- 드럼통 / 콘 / 기둥
  for (const [x, z] of [[-13, 2], [-13, 3.4], [-11.6, 2.7], [13.5, -8], [13.5, -6.6]] as [number, number][]) {
    buildBarrel(b, x, z, C.crateF);
  }
  buildPillar(b, 0, -14.5, 4.2);
  buildPillar(b, 0, 14.5, 4.2);
  for (const [x, z] of [[5, -11], [6.4, -11], [-9, 12], [-7.6, 12]] as [number, number][]) {
    buildCone(b, x, z);
  }

  // ---- 적재장 턱
  buildStairs(b, 14.2, 4.5, -Math.PI / 2, 4, 2.6, 0.3, 0.7);

  // ---- 바닥 통로 라인
  for (const z of [-3, 3]) deco(b, [S * 2 - 2, 0.02, 0.16], [0, 0.012, z], 0xf0d64f, [0, 0, 0], { rough: 0.9 });

  // ---- 동적 소품
  // 목표: 공구함
  addProp(
    3, [1.1, 1.5, 0.9], [-11.5, 0.75, -13.5], 0xd94f3d, PROP_HEAVY_MASS, 2.2,
    (g) => {
      const lid = new THREE.Mesh(boxGeo(1.14, 0.12, 0.94), toyMat(0x8f2f22, { rough: 0.4 }));
      lid.position.y = 0.7;
      g.add(lid);
      const latch = new THREE.Mesh(boxGeo(0.22, 0.26, 0.06), toyMat(C.metalDark, { rough: 0.3, metal: 0.7 }));
      latch.position.set(0, 0.5, 0.48);
      g.add(latch);
      for (const sx of [-1, 1]) {
        const handle = new THREE.Mesh(cylGeo(0.04, 0.04, 0.34), toyMat(C.metalDark, { rough: 0.3, metal: 0.7 }));
        handle.rotation.z = Math.PI / 2;
        handle.position.set(sx * 0.58, 0.2, 0);
        g.add(handle);
      }
    },
    { rough: 0.42, metal: 0.2 }
  );

  addProp(1, [0.9, 0.9, 0.9], [-6, 0.45, -12], C.crateA, 4, 1.7, crateTrim(0.9, 0.13));
  addProp(2, [0.9, 0.9, 0.9], [-6.1, 1.36, -12.1], C.crateC, 4, 1.7, crateTrim(0.9, 0.13));
  addProp(4, [0.75, 0.75, 0.75], [1, 0.38, -12.5], C.crateB, 4, 1.5, crateTrim(0.75, 0.11));
  addProp(5, [0.75, 0.75, 0.75], [6.5, 0.38, 6], C.crateD, 4, 1.5, crateTrim(0.75, 0.11));
  addProp(6, [0.6, 0.6, 0.6], [6.4, 1.05, 6.1], C.crateE, 4, 1.4, crateTrim(0.6, 0.09));
  addProp(7, [1.6, 0.22, 0.45], [-3, 0.11, 11], C.woodLight, 4, 1.7);
  addProp(8, [1.6, 0.22, 0.45], [-2.9, 0.34, 11.1], C.wood, 4, 1.7);
  addProp(9, [0.5, 0.9, 0.5], [11, 0.45, 12], C.crateF, 4, 1.4, (g) => {
    const band = new THREE.Mesh(boxGeo(0.54, 0.14, 0.54), toyMat(0xfff3d6, { rough: 0.5 }));
    band.position.y = 0.2;
    g.add(band);
  });
  addProp(10, [0.85, 0.5, 0.85], [-13.5, 0.25, 9], C.crateD, 4, 1.5);

  addBall(BALL_ID, 0.3, [-11, 0.31, -7]);
}

// ================================================================ 3. 옥상
//
// 실외. 벽 대신 낮은 난간이라 시야가 트이지만 그만큼 떨어뜨리기 쉽다.
// 실외기와 환기구가 경로를 막고, 목표는 맵 대각선 반대편이다.
function buildRooftop({ b, addProp, addBall }: MapCtx) {
  const S = 16;   // 옥상 반폭
  const railH = 1.05;

  // ---- 난간
  for (const [sz, p] of [
    [[S * 2, railH, 0.4], [0, railH / 2, -S]],
    [[S * 2, railH, 0.4], [0, railH / 2, S]],
    [[0.4, railH, S * 2], [-S, railH / 2, 0]],
    [[0.4, railH, S * 2], [S, railH / 2, 0]],
  ] as [V3, V3][]) solid(b, sz, p, 0xd8d2c4, [0, 0, 0], { rough: 0.85 });

  // 난간 윗 파이프 - 실루엣에 선이 하나 생겨야 "옥상"으로 읽힌다
  for (const [sz, p] of [
    [[S * 2, 0.1, 0.1], [0, railH + 0.06, -S]],
    [[S * 2, 0.1, 0.1], [0, railH + 0.06, S]],
    [[0.1, 0.1, S * 2], [-S, railH + 0.06, 0]],
    [[0.1, 0.1, S * 2], [S, railH + 0.06, 0]],
  ] as [V3, V3][]) deco(b, sz, p, C.metalDark, [0, 0, 0], { rough: 0.4, metal: 0.6 });

  // ---- 옥상탑 (계단실)
  solid(b, [4.4, 2.8, 3.6], [-12, 1.4, 12], 0xe7dfd0, [0, 0, 0], { rough: 0.8 });
  solid(b, [4.8, 0.25, 4.0], [-12, 2.9, 12], 0xb9a98f, [0, 0, 0], { rough: 0.85 });
  deco(b, [1.0, 1.9, 0.12], [-12, 0.95, 10.15], C.metalDark, [0, 0, 0], { rough: 0.5, metal: 0.4 });

  // ---- 에어컨 실외기 (경로 장애물)
  const acUnit = (x: number, z: number, rotY: number) => {
    const t = at(x, z, rotY);
    const R: V3 = [0, rotY, 0];
    solid(b, [1.8, 1.1, 1.1], t(0, 0.55, 0), 0xc9ccd2, R, { rough: 0.55, metal: 0.25 });
    deco(b, [1.5, 0.06, 0.9], t(0, 1.14, 0), 0x9aa0a8, R, { rough: 0.5, metal: 0.3 });
    for (const sx of [-1, 1]) {
      decoCyl(b, 0.34, 0.34, 0.08, t(sx * 0.42, 1.16, 0), 0x7d838c, R, { rough: 0.4, metal: 0.5 });
    }
  };
  acUnit(-4, -9, 0);
  acUnit(-4, -6.6, 0);
  acUnit(6.5, 4, Math.PI / 2);
  acUnit(6.5, 6.4, Math.PI / 2);
  acUnit(0.5, 11, 0);

  // ---- 환기구
  for (const [x, z, r] of [[10, -10, 0.7], [12.4, -10, 0.55], [-9, 3, 0.65], [3, -2.5, 0.6]] as V3[]) {
    solidCyl(b, r, 1.2, [x, 0.6, z], 0xa9b0b8, [0, 0, 0], { rough: 0.5, metal: 0.35 });
    decoCyl(b, r * 1.25, r * 1.25, 0.16, [x, 1.28, z], 0x848c95, [0, 0, 0], { rough: 0.45, metal: 0.5 });
  }

  // ---- 물탱크
  solidCyl(b, 1.5, 2.2, [13, 1.1, 12], 0x8fa8c4, [0, 0, 0], { rough: 0.6, metal: 0.2 });
  for (const [dx, dz] of [[-1, -1], [1, -1], [-1, 1], [1, 1]] as [number, number][]) {
    solidCyl(b, 0.12, 0.9, [13 + dx * 1.1, 0.45, 12 + dz * 1.1], C.metalDark, [0, 0, 0], { rough: 0.4, metal: 0.6 });
  }

  // ---- 바닥 방수 이음매 + 배수구
  for (let z = -14; z <= 14; z += 4) {
    deco(b, [S * 2 - 1, 0.02, 0.1], [0, 0.012, z], 0xcdc5b6, [0, 0, 0], { rough: 0.95 });
  }
  decoCyl(b, 0.35, 0.35, 0.04, [-14, 0.02, -14], 0x6f7885, [0, 0, 0], { rough: 0.6, metal: 0.4 });

  // ---- 화분 / 벤치 (사람이 쓰는 옥상)
  buildPlant(b, -13.5, -3, 1.0, 11);
  buildPlant(b, -13.5, -1.2, 0.85, 22);
  buildBench(b, -12, 3.5, Math.PI / 2, C.crateC);
  buildBench(b, -12, 6, Math.PI / 2, C.crateC);

  // ---- 동적 소품
  // 목표: 실외기 한 대를 반대편 화물 승강기로
  addProp(
    3, [1.3, 1.4, 1.0], [-13, 0.7, -13], 0xb8bec6, PROP_HEAVY_MASS, 2.2,
    (g) => {
      const grill = new THREE.Mesh(boxGeo(1.34, 0.06, 1.04), toyMat(0x8b9199, { rough: 0.45, metal: 0.4 }));
      grill.position.y = 0.62;
      g.add(grill);
      const fan = new THREE.Mesh(cylGeo(0.42, 0.42, 0.1), toyMat(0x6f757d, { rough: 0.35, metal: 0.6 }));
      fan.position.y = 0.68;
      g.add(fan);
      for (const sz of [-1, 1]) {
        const vent = new THREE.Mesh(boxGeo(1.2, 0.72, 0.05), toyMat(0x9aa0a8, { rough: 0.5, metal: 0.3 }));
        vent.position.set(0, -0.1, sz * 0.51);
        g.add(vent);
      }
    },
    { rough: 0.5, metal: 0.3 }
  );

  addProp(1, [0.8, 0.8, 0.8], [-7, 0.4, -13], C.crateA, 4, 1.6, crateTrim(0.8, 0.12));
  addProp(2, [0.8, 0.8, 0.8], [-7.1, 1.21, -13.1], C.crateB, 4, 1.6, crateTrim(0.8, 0.12));
  addProp(4, [0.7, 0.7, 0.7], [1, 0.35, -13], C.crateD, 4, 1.5, crateTrim(0.7, 0.1));
  addProp(5, [0.7, 0.7, 0.7], [9, 0.35, 1], C.crateE, 4, 1.5, crateTrim(0.7, 0.1));
  addProp(6, [1.5, 0.2, 0.42], [-2, 0.1, 6], C.woodLight, 4, 1.6);
  addProp(7, [0.55, 0.85, 0.55], [11, 0.42, -3], C.crateF, 4, 1.4);
  addProp(8, [0.9, 0.55, 0.6], [-10, 0.28, 7.5], C.crateC, 4, 1.5);

  addBall(BALL_ID, 0.3, [-11, 0.31, -6]);
}


// ================================================================ Goal Rush! 코스
//
// 하늘 위에 떠 있는 일직선 축구 코스. 출발 구역(+Z)에서 도착 구역(-Z)까지
// 한 방향으로만 달린다. 카메라 기본 yaw가 π(정면 = -Z)라 스폰하자마자 코스가
// 눈앞에 뻗어 있다.
//
// [좌표 규약]
//   x: 좌우 (코스 폭). ±LANE_HALF 안쪽이 달릴 수 있는 면
//   z: 진행 방향. START_Z(뒤) -> FINISH_Z(앞, 음수)
//
// 3~5단계(낙하 장애물 / AI 봇 / 골대·골키퍼)는 여기 없다. 코스와 경계,
// 그리고 하늘 분위기만 만든다.

/** 코스 반폭 (달릴 수 있는 면은 ±7) */
const LANE_HALF = 7;
/** 좁은 다리 구간의 반폭 */
const BRIDGE_HALF = 2.6;

/** 코스 바닥 두께 (아랫면이 보여야 "떠 있다"가 읽힌다) */
const DECK_H = 1.2;

/**
 * 한 스테이지의 코스 설정.
 *
 * [왜 설정으로 뺐나] 예전에는 코스가 하나뿐이라 좌표를 전부 상수로 박아 뒀다.
 * 스테이지를 늘리려면 같은 함수를 통째로 복사해야 하는데, 그러면 데크/난간/
 * 기둥/하늘 장식처럼 어느 스테이지에나 똑같은 부분까지 세 벌이 된다.
 * 달라지는 것(구간 경계, 장애물 목록, 튜토리얼 유무, 색)만 설정으로 빼고
 * 나머지는 이 함수 하나가 만든다.
 */
export interface StageCfg {
  startZ: number;
  finishZ: number;
  /** [시작z, 끝z, 반폭] - 진행 방향이 -Z이므로 시작 > 끝 */
  sections: [number, number, number][];
  /** 구간 경계에 세울 아치 [z, 색] */
  gates: [number, number][];
  /** 낙하 장애물 z 목록 */
  hazards: number[];
  /** 코스 장애물 [종류, z, arg, 위상] */
  obstacles: [ObstacleKind, number, number, number][];
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
   * 협동 관문(coopgate/buttongate)과 공 전용 틈은 절대 건너뛰게 두지 않는다.
   * 그건 이 게임이 둘이서 하는 이유라서, 우회로가 생기면 의미가 사라진다.
   */
  shortcuts?: [number, number][];
  /** 튜토리얼 패드를 깔 것인가 (1스테이지만) */
  tutorial?: boolean;
  /** 난수 시드 (하늘 장식 배치) */
  seed: number;
}

function makeCourse(cfg: StageCfg) {
  return function build({ b, addBall, addHazard, addObstacle }: MapCtx) {
  const { startZ: START_Z, finishZ: FINISH_Z } = cfg;
  const rnd = rng(cfg.seed);

  // ---------------------------------------------------------- 바닥 만들기
  //
  // 물리는 구간마다 판 하나씩이면 충분하다. 줄무늬는 전부 장식(deco)이라
  // 바디가 늘지 않는다 - 200m 코스에 줄무늬마다 바디를 만들면 수백 개가 된다.
  function deck(z0: number, z1: number, half: number, color = GR.laneB) {
    const len = z0 - z1;
    const mid = (z0 + z1) / 2;
    solid(b, [half * 2, DECK_H, len], [0, -DECK_H / 2, mid], color, [0, 0, 0], { rough: 0.6 });

    // 진행 방향 줄무늬 - 달릴 때 속도감을 만드는 가장 싼 방법이다
    for (let z = z1; z < z0; z += 4) {
      const w = Math.min(4, z0 - z);
      deco(b, [half * 2 - 0.4, 0.04, w * 0.5], [0, 0.02, z + w * 0.25], GR.laneA, [0, 0, 0], { rough: 0.75 });
    }
    // 가장자리 띠 - 코스 폭을 눈으로 딱 잡아준다
    for (const sx of [-1, 1]) {
      deco(b, [0.5, 0.06, len], [sx * (half - 0.25), 0.03, mid], GR.laneEdge, [0, 0, 0], { rough: 0.6 });
    }
    // 아랫면 - 하늘에 떠 있는 판임을 보여주는 부분
    deco(b, [half * 2 + 0.5, 0.5, len], [0, -DECK_H - 0.2, mid], GR.skirt, [0, 0, 0], { rough: 0.7 });
  }

  /** 구간 시작을 알리는 색 띠 + 아치 기둥 */
  function gate(z: number, color: number) {
    deco(b, [LANE_HALF * 2 - 0.6, 0.06, 0.7], [0, 0.045, z], color, [0, 0, 0], { rough: 0.7 });
    for (const sx of [-1, 1]) {
      decoCyl(b, 0.28, 0.28, 3.4, [sx * (LANE_HALF - 0.4), 1.7, z], color, [0, 0, 0], { rough: 0.45 });
    }
    deco(b, [LANE_HALF * 2, 0.32, 0.32], [0, 3.4, z], color, [0, 0, 0], { rough: 0.45 });
  }

  // ---------------------------------------------------------- 구간
  //
  // 그냥 길게 늘이면 지루하기만 하다. 40m 안팎으로 끊어서 구간마다 다른
  // 문제를 낸다. 각 구간은 드리블 / 킥 / 캐리 중 무엇을 고르냐로 답이 갈린다.
  //
  //  1 워밍업   - 넓고 방해물이 낙하물뿐. 드리블 감을 잡는 곳
  //  2 회전봉   - 봉이 쓸고 지나간다. 타이밍 맞춰 드리블하거나 공만 킥으로 넘긴다
  //  3 좁은 다리 - 폭이 1/3로 줄고 난간이 없다. 드리블은 공을 떨어뜨리기 쉬워서
  //               E로 안고 건너는 게 안전하다 (대신 느려진다)
  //  4 거대 공   - 코스를 거슬러 굴러온다. 몸은 피하고 공은 옆 레인으로 뺀다
  //  5 피스톤    - 좌우 벽이 번갈아 튀어나온다. 길이 좁아지는 타이밍을 읽어야 한다
  for (const [z0, z1, half] of cfg.sections) deck(z0, z1, half, GR.laneB);

  // 구간 경계 표시
  for (const [z, col] of cfg.gates) gate(z, col);

  // 코스 아래 기둥 (아래로 사라지게 - 끝을 안 보여주면 더 높아 보인다)
  /** 그 z에서의 코스 반폭 (구간 설정에서 찾는다) */
  const halfAt = (z: number) => {
    for (const [z0, z1, h] of cfg.sections) if (z <= z0 && z >= z1) return h;
    return LANE_HALF;
  };
  for (let z = START_Z - 8; z > FINISH_Z; z -= 26) {
    const half = halfAt(z);
    for (const sx of [-1, 1]) {
      decoCyl(b, 0.5, 0.34, 14, [sx * (half - 1.0), -DECK_H - 7.2, z], GR.post, [0, 0, 0], { rough: 0.6 });
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
  // 좁은 다리 구간만 난간을 두지 않는다. 떨어질 수 있어야 "조심해서 건넌다"가
  // 성립하기 때문이다 (떨어지면 main.ts가 조금 뒤로 리스폰시킨다).
  // 폭이 좁은 구간(다리)은 난간을 두지 않는다 - 떨어질 수 있어야 긴장이 산다.
  for (const [z0, z1, half] of cfg.sections) {
    if (half < LANE_HALF) {
      // 다리 입구/출구에 난간 끝단 - 여기서부터 난간이 없다는 걸 보여준다
      for (const z of [z0, z1]) {
        for (const sx of [-1, 1]) {
          decoCyl(b, 0.34, 0.34, 2.2, [sx * (LANE_HALF - 0.4), 1.1, z], 0xffd166, [0, 0, 0], { rough: 0.45 });
        }
      }
      /**
       * 다리 가장자리 턱 — 공만 붙잡는 낮은 문턱.
       *
       * [왜 필요한가] 난간이 없는 게 다리의 규칙이라 사람은 떨어져야 맞다.
       * 그런데 공까지 같이 굴러 떨어지면 얘기가 달라진다 - 40m 내내 공을
       * 주우러 되돌아가는 구간이 되고, 실측으로 자동 완주가 여기서 두 번
       * 연속 시간 초과로 끝났다. 긴장은 "내가 떨어질 수 있다"에서 나오지
       * "공을 또 주우러 간다"에서 나오지 않는다.
       *
       * 공 전용 틈의 옆길 턱과 같은 수법이다. 공 반지름(0.3)보다 조금 높게만
       * 두면 굴러오는 공은 걸리고(세게 차면 넘어간다 = 여지는 남는다),
       * 사람은 골반이 0.86이라 그냥 넘어간다 = 여전히 떨어질 수 있다.
       */
      for (const sx of [-1, 1]) {
        solid(b, [0.22, 0.42, z0 - z1], [sx * (half - 0.11), 0.21, (z0 + z1) / 2],
          0xffd166, [0, 0, 0], { rough: 0.6 });
      }
      continue;
    }
    buildFence(b, -LANE_HALF, z0, z1);
    // 지름길이 있는 쪽(+x) 난간은 입출구만큼 끊어서 세운다
    for (const [a, c] of fenceRuns(z0, z1)) buildFence(b, LANE_HALF, a, c);
  }
  // 출발선 뒤 / 코스 끝을 막는다
  for (const z of [START_Z, FINISH_Z]) {
    solid(b, [LANE_HALF * 2, 1.7, 0.4], [0, 0.85, z], GR.fence, [0, 0, 0], { rough: 0.5 });
    deco(b, [LANE_HALF * 2, 0.16, 0.5], [0, 1.78, z], GR.fenceTop, [0, 0, 0], { rough: 0.4 });
  }

  // ---------------------------------------------------------- 하늘 장식
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
      buildBalloon(b, sx * (halfAt(z) + 1.1), 3.2 + (bi % 3) * 0.5, z, col, 1);
    }
  }

  // ---------------------------------------------------------- 장애물 배치
  //
  // 전부 플레이어를 쫓지 않는다. 회전봉/피스톤은 위상만으로 움직이고,
  // 낙하물과 거대 공이 나오는 x는 시드 난수다 (hazards.ts / obstacles.ts).

  cfg.hazards.forEach((z, i) => addHazard(HAZARD_ID0 + i, z, 2.2 + i * 1.15));
  let oid = OBSTACLE_ID0;
  for (const [kind, z, arg, phase] of cfg.obstacles) {
    addObstacle(oid++, kind, z, arg, phase);
    // 버튼 문의 발판은 문과 함께 가라앉으면 안 되므로(문 바디를 따라가는
    // 그룹이 아니라) 바닥 장식으로 따로 깐다. 물리는 없다 - 밟았는지는
    // obstacles.ts가 골반 위치로 판정한다.
    if (kind === "buttongate") {
      for (const sx of [-1, 1]) {
        const px = sx * OB.btnPadX, pz = z + OB.btnPadAhead;
        deco(b, [OB.btnPadHalf * 2, 0.06, OB.btnPadHalf * 2], [px, 0.045, pz],
          0x8b5cf6, [0, 0, 0], { rough: 0.6 });
        deco(b, [OB.btnPadHalf * 1.5, 0.09, OB.btnPadHalf * 1.5], [px, 0.07, pz],
          0xffd166, [0, 0, 0], { rough: 0.5 });
        // 발판 -> 문을 잇는 선. "이걸 밟으면 저게 열린다"를 눈으로 잇는다
        deco(b, [0.14, 0.05, OB.btnPadAhead], [px, 0.035, z + OB.btnPadAhead / 2],
          0x8b5cf6, [0, 0, 0], { rough: 0.7 });
      }
    }
  }

  // ---------------------------------------------------------- 튜토리얼 구간
  //
  // 출발선과 첫 게이트 사이(z 6 ~ -10)의 빈 구간을 그대로 쓴다. 맵을 새로
  // 만들지 않고, 바닥 패드 네 장만 깔아서 지나가며 하나씩 익히게 한다.
  // 안내 문장은 HUD에 한 줄만 뜬다(main.ts의 TUTORIAL) - 여기서는 "무엇을
  // 누르는 자리인가"만 바닥에 크게 적어둔다.
  //
  // 낙하 장애물 첫 지점이 z=2라 그 위에는 패드를 두지 않는다.
  for (const z of cfg.ballSlots ?? []) buildBallSlot(b, z, LANE_HALF);

  if (cfg.tutorial) {
    for (const [z, label, color] of TUTORIAL_PADS) {
      buildKeyPad(b, 0, z, 5.2, 4.2, label, color);
    }
  }

  // ---------------------------------------------------------- 골대
  // 골라인 판정(game.ts checkCross)과 같은 폭으로 세운다.
  buildGoalNet(b, FINISH_Z + 6, GOAL_HALF_W);

  // ---------------------------------------------------------- 공
  addBall(BALL_ID, 0.3, [0, 0.31, START_Z - 11]);
  };
}

/** 골대 반폭. game.ts의 골라인 판정 폭과 같은 값을 쓴다 */
export const GOAL_HALF_W = 4.2;

/**
 * 튜토리얼 바닥 패드 [z, 키 이름, 색].
 *
 * main.ts가 같은 z를 읽어서 HUD 한 줄 안내를 띄운다 (TUTORIAL_PADS를 공유해서
 * 바닥 표시와 안내가 어긋나지 않게 한다).
 */
export const TUTORIAL_PADS: [number, string, number][] = [
  [6, "WASD", 0x3fb8f0],
  [-1, "F", 0xf0913f],
  [-6, "SHIFT", 0x9b6cff],
  [-11, "E", 0x3fc98a],
];
/** 패드 판정 반지름 (z 기준). 이 안에 들어오면 그 단계 안내가 뜬다 */
export const TUTORIAL_PAD_HALF = 2.6;

// ================================================================ 목록

/**
 * Goal Rush! 의 기본 플레이 공간.
 *
 * 2단계에서는 코스 하나뿐이다. 3~5단계(낙하 장애물 / AI 봇 / 골대)가 여기에
 * 얹히고, 그 다음에 난이도가 다른 코스를 배열에 추가하게 된다.
 */
/**
 * 스테이지 3개.
 *
 * 길이만 늘린 코스 세 개가 아니라, 각각 다른 것을 요구하도록 짰다.
 *  1. 하늘 코스   - 넓다. 튜토리얼 패드가 있고 낙하물과 회전봉 정도만 나온다.
 *                   드리블과 킥을 익히는 곳.
 *  2. 회전 협곡   - 회전봉이 촘촘하고 중간에 난간 없는 좁은 다리가 있다.
 *                   "타이밍을 보고 지나가거나, 공만 킥으로 넘기고 몸은 따라간다".
 *  3. 봇 소굴     - 봇이 셋. 거대 공과 피스톤이 길을 좁혀서 봇을 피할 공간이
 *                   줄어든다. 개인기(Shift/Q)를 쓸 줄 알아야 통과한다.
 */
export const MAPS: MapDef[] = [
  {
    id: "sky",
    name: "1. 하늘 코스",
    blurb: "드리블을 익힌다",
    // [제한시간을 늘린 이유] 장애물이 늘면서 40초 자동 주행 테스트가 시간
    // 초과로 끝났다. 막혀서 기다리는 시간까지 감안하면 128m에 150초는 빠듯하다.
    timeLimit: 200,
    targetId: BALL_ID,
    targetName: "공",
    goal: { x: 0, z: -104, radius: 2.4, halfWidth: GOAL_HALF_W },
    spawns: [[-1.6, 10], [1.6, 10], [-3.6, 10], [3.6, 10]],
    botSpawns: [[3.2, -76]],
    // 공 전용 틈 (build 안의 ballSlots와 같은 값이어야 한다 - 위쪽은 자동
    // 플레이어의 우회 판정이, 아래쪽은 실제 지형이 이 값을 읽는다)
    ballSlots: [-52],
    floor: { size: 30, color: 0x8fe3ff, outside: 0x9fd8ff, hideOutside: true, hideFloor: true, noGround: true },
    fog: [0xbfe9ff, 70, 210],
    build: makeCourse({
      startZ: 18, finishZ: -110, seed: 20260827, tutorial: true,
      sections: [[18, -12, LANE_HALF], [-12, -52, LANE_HALF], [-52, -110, LANE_HALF]],
      gates: [[-12, GR.laneEdge], [-52, 0xff8a3d]],
      // 리듬: 튜토리얼(빈 구간) -> 낙하물 하나 -> 압박(popup+회전봉)
      //       -> 휴식 -> 새 기믹(sweeper) -> 마무리
      // [골 앞 18m는 비워 둔다] 처음엔 마지막 popup을 -94(골 -104의 10m 앞)에
      // 뒀는데, 오토파일럿 완주 테스트에서 거기서 60초를 갇혔다. 골로 가는
      // 직선을 막고 서 있으니 슛 자세를 잡을 자리가 없다. 마지막 구간은
      // "장애물을 다 지났다, 이제 넣기만 하면 된다"가 되어야 한다.
      hazards: [2, -30, -76],
      // [배치 원칙 - 1스테이지] 한 번에 하나씩만. 같은 z에 둘을 겹치지
      // 않는다. 종류를 하나씩 처음 만나는 자리이고, 여기서 좌절하면 뒤를
      // 안 본다. 다만 104m에 4개(26m당 하나)는 너무 비어서 실측 완주가
      // 넘어짐 0회 / 25초였다 - 간격을 13m로 좁혀 6개로 늘린다.
      obstacles: [
        // [첫 협동] 장애물이 시작되기 전(-20의 팝업 앞)에 둔다. 둘이 처음
        // 만나는 장치라 실패해도 손해가 없는 자리여야 배운다 - 뒤에 두면
        // 장애물에 쫓기면서 처음 보는 문을 해석해야 한다.
        // 발판은 z+3.6 = -4.4로, 시작 낙하물(z=2)과 팝업(-20) 사이의 빈 곳.
        ["buttongate", -8, 0, 0.0],
        ["popup", -20, -1, 0.0],
        ["spinner", -33, 4.2, 1.0],
        // [두 번째 협동 - 패스 게이트]
        //
        // 실측(2인 WebSocket): 이 스테이지의 협동 장치는 -8의 버튼 문 하나뿐이고
        // 그건 한 번 넘으면 영구히 열린다(obstacles.ts forceOpen). 그래서 -8을
        // 지난 뒤 골(-104)까지 96m가 통째로 혼자 하는 구간이었다. 그 결과
        // 두 사람이 20m 넘게 벌어진 채 **한 명이 공을 100% 독점**했다
        // (실측 ownPct A 0% / B 96~100%, 간격 중앙값 9.8m · 상위 25% 17.6m).
        // 패스 게이트는 "한 명이 차고 다른 한 명이 받아야" 열리므로 둘을
        // 같은 자리로 다시 모은다.
        //
        // 지름길(-56~-78) 안에는 두지 않는다 - 협동 관문은 건너뛸 수 있으면
        // 안 된다(위 shortcuts 주석의 규칙). 회전봉(-33)과 피스톤(-46) 사이
        // 빈 자리에 둔다.
        ["coopgate", -40, 0, 0.0],
        ["piston", -46, -1, 0.4],
        ["sweeper", -60, 0, 0.0],
        ["popup", -72, 1, 1.2],
        ["piston", -82, 1, 1.6],
      ],
      // [공 전용 틈] 공은 아래로 지나가고 사람은 옆으로 돈다.
      //
      // 패스 게이트가 "공을 건네는" 장치라면 이건 "공과 사람이 갈라졌다가
      // 다시 만나는" 장치다. 먼저 돌아 나온 쪽이 공을 잇게 되므로, 누가
      // 공을 몰지가 자연스럽게 바뀐다 - 위에서 잰 "한 명이 100% 독점"을
      // 깨는 게 목적이다. 지름길 입구(-56)보다 앞에 둬서 건너뛸 수 없게 한다.
      ballSlots: [-52],
      // 지름길을 처음 만나는 자리. 여기서 "빠른 길엔 난간이 없다"를 배운다.
      // 건너뛰는 건 sweeper(-60)와 popup(-72) 둘뿐이라 손해도 이득도 작다.
      shortcuts: [[-56, -78]],
    }),
  },
  {
    id: "canyon",
    name: "2. 회전 협곡",
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
      startZ: 18, finishZ: -140, seed: 771133,
      sections: [[18, -10, LANE_HALF], [-10, -56, LANE_HALF], [-56, -96, BRIDGE_HALF], [-96, -140, LANE_HALF]],
      gates: [[-10, 0xffd166], [-56, 0xff8a3d], [-96, 0x7c5cff]],
      // 대표 기믹: ballSlot (공과 사람이 갈라진다). 다리 구간은 장애물 없이
      // 폭만으로 압박해서 "쉬었다 가는" 자리를 만든다.
      // 골(-134) 앞 18m는 비워 둔다 (스테이지 1 주석 참고)
      hazards: [-4, -34, -108],
      ballSlots: [-20, -104],
      // [배치 원칙 - 2스테이지] 여기서 처음으로 "둘이 동시에" 온다.
      // 같은 z에 두 종류를 겹쳐 두되, 서로 막는 축을 다르게 골라 항상
      // 지나갈 틈이 남게 한다(피스톤은 옆에서, 팝업은 아래에서).
      //
      // [다리 구간(-56~-96)에는 좌우 장애물을 두지 않는다] 그 구간은 반폭이
      // 2.6이라 피스톤(±5.65)이나 회전봉(반경 4.4)을 두면 판 바깥 허공에서
      // 헛돈다. 폭 자체가 이미 압박이므로 여기는 중앙에 서는 협동 게이트만
      // 둔다 - 위 blurb의 "쉬었다 가는 자리"가 그 뜻이다.
      obstacles: [
        ["sweeper", -26, 0, 0.0],
        // 버튼 문 - 한 명이 발판을 밟고 있는 동안 다른 한 명이 공을 몰고 지난다
        ["buttongate", -36, 0, 0.0],
        ["spinner", -46, 4.4, 1.1],
        // 조합: 왼쪽에서 피스톤 + 오른쪽에서 팝업이 동시에
        ["piston", -52, -1, 0.0],
        ["popup", -52, 1, 0.9],
        // 협동 게이트 - 멀티에서만 닫혀 있다 (싱글은 자동으로 열린다).
        // 다리 한가운데지만 중앙에 서는 문이라 좁은 폭에서도 성립한다.
        ["coopgate", -70, 0, 0.0],
        ["popup", -98, 0, 0.7],
        // 마지막 조합 (골 -134 앞 18m는 비워 둔다)
        ["spinner", -110, 4.4, 0.5],
        ["piston", -113, 1, 1.4],
      ],
      // 지름길: 회전봉 + 피스톤/팝업 조합을 통째로 건너뛴다.
      // 버튼 문(-36)과 공 전용 틈(-20, -104)은 건너뛸 수 없는 자리에 남는다.
      shortcuts: [[-40, -56]],
    }),
  },
  {
    id: "denof",
    name: "3. 봇 소굴",
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
      startZ: 18, finishZ: -160, seed: 424242,
      sections: [[18, -14, LANE_HALF], [-14, -60, LANE_HALF], [-60, -100, LANE_HALF], [-100, -160, LANE_HALF]],
      gates: [[-14, 0x7c5cff], [-60, 0xff8a3d], [-100, 0xffd166]],
      // 대표 기믹: shutter (기다릴지 뚫을지). 봇 등장 지점과 겹치지 않게 배치해서
      // "셔터 앞에서 기다리는데 봇이 온다"가 마지막 구간에만 나오게 한다.
      // 골(-154) 앞 18m는 비워 둔다 (스테이지 1 주석 참고)
      hazards: [-6, -50, -112],
      ballSlots: [-72],
      // [배치 원칙 - 3스테이지] 앞선 두 스테이지의 기믹을 다시 꺼내 조합한다.
      //
      // 이전 배치는 셔터 3쌍 + 거대 공 + 스위퍼였다. 셔터가 세 번 반복되니
      // 처음 본 순간 말고는 새로운 판단이 없었고, 결국 이 스테이지의 난이도는
      // 장애물이 아니라 봇이 혼자 만들고 있었다(실측: 넘어짐 32회 중 대부분이
      // 봇 구간 z=-29~-38에 몰림). 종류를 흩고 뒤로 갈수록 겹치게 바꾼다.
      obstacles: [
        // [거대 공 주행선을 비워 둔다] roller는 자기 z에서 +Z로 rollRun(18m)
        // 만큼 굴러간다. 그 18m 안에 다른 장애물이나 버튼 발판이 있으면
        // 피할 자리가 없어진다 - 실측으로 roller@-40(주행 -40~-22)이 셔터
        // (-24)와 겹쳐 z=-22~-34가 분쇄기가 됐고, 75초 동안 넘어짐 16회에
        // 진행이 0이었다. roller는 -44(주행 -44~-26)로 내려 셔터와 2m 띄운다.
        //
        // 버튼 문은 발판이 -42.4라 그 주행선 한복판이었다 - 버튼을 밟고
        // 서 있는 쪽이 반드시 깔린다. 코스 앞쪽(-16, 발판 -12.4)으로 옮겨
        // 협동 장치를 먼저 가르치고, 거대 공은 그 뒤에 나오게 한다.
        ["buttongate", -16, 0, 0.0],
        ["shutter", -24, -1, 0.0],
        ["shutter", -24, 1, 0.0],
        ["roller", -44, 0, 0.0],
        ["spinner", -54, 4.4, 0.8],
        ["coopgate", -66, 0, 0.0],
        // 조합: 좌우 피스톤이 시차를 두고 번갈아 나온다
        ["piston", -78, -1, 0.0],
        ["piston", -81, 1, 1.1],
        ["sweeper", -92, 0, 0.5],
        // [패스 게이트 + 봇] 이 스테이지에서 봇이 셋 다 살아 있는 유일한
        // 구간이다(-34/-86/-108 등장, 한 번 나오면 안 사라진다). 그 한복판에서
        // "한 명이 차고 다른 한 명이 받아야" 열리는 문을 만난다 - 패스가
        // 빗나가면 봇 셋이 그 공을 먼저 잡는다. 실측에서 가장 웃긴 장면이
        // 봇에게 뺏기고 둘이 쫓아가는 것이었으므로, 그 장면이 확실히 나오는
        // 자리에 협동을 하나 얹는다.
        //
        // 지름길(-86~-100) **뒤에** 둔다. 앞에 두면 지름길로 건너뛸 수 있어서
        // 협동 관문이 무력해진다 (shortcuts 주석의 규칙).
        ["coopgate", -102, 0, 0.0],
        // 조합: 셔터를 통과한 직후에 팝업이 기다린다
        ["shutter", -104, -1, 1.3],
        ["shutter", -104, 1, 1.3],
        ["popup", -108, 0, 0.4],
        // 후반 협동 관문. 여기까지 협동 장치는 -16(버튼)과 -66(패스)뿐이라
        // 코스 절반을 지나면 둘이 같이 할 이유가 사라졌다. 마지막 직선 앞에
        // 하나를 더 둬서 "다 와서 또 나눠 서야 한다"를 만든다.
        // 발판은 z+3.6 = -110.4로, 앞 팝업(-108)과 뒤 회전봉(-120, 반경 4.4가
        // -115.6까지) 사이의 빈 자리다.
        // [클라이맥스] 여기서 봇 · 장애물 · 협동이 한꺼번에 온다.
        // 세 번째 봇이 -108에서 등장하고(botSpawns), 그 자리에서 한 명은
        // 발판(-110.4)을 밟고 버텨야 하며, 다른 한 명은 문을 지나 곧바로
        // 회전봉(-120)을 통과해야 한다. 셋 중 하나만 빠져도 안 풀린다.
        ["buttongate", -114, 0, 0.0],
        // 마지막 조합: 회전봉 아래에서 스위퍼까지 같이 읽어야 한다
        ["spinner", -120, 4.4, 0.3],
        // [스위퍼 -123 / 피스톤 -132 제거] 회전봉 바로 뒤에 스위퍼를 겹쳐
        // 두면 판단이 하나 늘지 않고 통과 시간만 늘어난다. 마지막 직선의
        // 피스톤도 마찬가지로 "개수"였지 "선택"이 아니었다. 난이도는
        // 클라이맥스(봇+발판+회전봉)의 동시성으로 만든다.
      ],
      // 지름길: 스위퍼(-92) 구간을 건너뛴다. 이 스테이지엔 봇이 있어서
      // 좁은 선반 위에서 밀리면 그대로 낙하다.
      //
      // [피스톤 옆에 입구를 두지 않는다] 처음엔 -76~-94로 잡아 피스톤
      // 조합(-78/-81)까지 건너뛰게 했는데, 입구가 난간에 구멍을 내는 자리라
      // 피스톤이 미는 방향과 정확히 겹쳤다. 밀리면 그대로 구멍으로 튕겨
      // 나간다 - 위험을 고르는 게 아니라 위험이 사람을 고르는 셈이다.
      // 협동 관문(-16 버튼 문, -66 게이트)과 공 전용 틈(-72)도 못 건너뛴다.
      shortcuts: [[-86, -100]],
    }),
  },
];

/**
 * 「냉장고 옮기기」 시절의 임시 맵 3개.
 *
 * Goal Rush로 방향이 바뀌면서 기본 플레이에서는 빠졌다. 지우지 않고 남겨 둔
 * 이유는 가구 빌더들의 유일한 사용처이자, 물리(grab/캐리/충돌) 회귀를 눈으로
 * 확인할 때 쓸 수 있는 밀도 높은 씬이기 때문이다.
 * 게임에는 등록되지 않는다 - 쓰려면 MAPS에 넣으면 된다.
 */
export const LEGACY_MAPS: MapDef[] = [
  {
    id: "house",
    name: "집",
    blurb: "거실을 가로질러 현관으로",
    timeLimit: 180,
    targetId: 3,
    targetName: "냉장고",
    goal: { x: 13.4, z: -1.0, radius: 1.6 },
    spawns: [[-2, 5], [2, 5], [-2, 2], [2, 2]],
    floor: { size: 30, color: 0xf6e7c8, outside: 0x7ec06a },
    build: buildHouse,
  },
  {
    id: "warehouse",
    name: "창고",
    blurb: "선반 사이를 빠져나가 적재장으로",
    timeLimit: 165,
    targetId: 3,
    targetName: "공구함",
    // 목표가 -X/-Z 구석에서 출발해 +X/+Z 적재장까지 - 대각선 약 33m
    goal: { x: 13.5, z: 13.0, radius: 1.8 },
    spawns: [[-13, -10], [-10.5, -10], [-13, -7.5], [-10.5, -7.5]],
    floor: { size: 34, color: 0xd9d3c6, outside: 0x6f7885 },
    build: buildWarehouse,
  },
  {
    id: "rooftop",
    name: "옥상",
    blurb: "실외기를 화물 승강기까지",
    timeLimit: 150,
    targetId: 3,
    targetName: "실외기",
    goal: { x: 13.0, z: 8.5, radius: 1.8 },
    spawns: [[-13.5, -10], [-11, -10], [-13.5, -7.5], [-11, -7.5]],
    floor: { size: 32, color: 0xe4dccd, outside: 0x9fb4c9 },
    build: buildRooftop,
  },
];
