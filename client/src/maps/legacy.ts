/**
 * 「냉장고 옮기기(Hold Tight!)」 시절의 맵 3개 — 집 / 창고 / 옥상.
 *
 * Goal Rush로 방향이 바뀌면서 기본 플레이에서는 빠졌다. 지우지 않고 남겨 둔
 * 이유는 mapkit의 가구 빌더 20여 개의 **유일한 사용처**이자, 물리(grab/캐리/
 * 충돌) 회귀를 눈으로 확인할 때 쓸 수 있는 밀도 높은 씬이기 때문이다.
 *
 * Goal Rush 스테이지와 섞이면 코스 생성기를 읽을 때마다 방해가 되므로 파일을
 * 따로 뒀다. 여기 있는 것 중 어느 것도 `MAPS`에 등록되지 않는다.
 */
import * as THREE from "three";

import {
  C, type V3,
  solid, deco, solidCyl, decoCyl, decoSph, boxGeo, cylGeo, sphGeo, toyMat, at,
  buildTable, buildChair, buildSofa, buildArmchair, buildShelf, buildBed, buildNightstand,
  buildDresser, buildCounter, buildStove, buildSink, buildLamp, buildPlant, buildTV,
  buildStairs, buildBarrel, buildPillar, buildRug, buildWindow, buildPicture,
  buildWallpaper, buildBoxStack, buildCoatRack, buildCone, buildBeanbag,
  buildSconce, buildClock, buildBoard, buildBench,
} from "../mapkit";
import { BALL_ID, PROP_HEAVY_MASS, type MapCtx, type MapDef } from "./types";

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
