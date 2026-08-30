import * as THREE from "three";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";
import * as CANNON from "cannon-es";

/**
 * 맵 제작 키트.
 *
 * 팔레트 + 지오메트리 캐시 + 가구/소품 빌더. world.ts 안에 한 덩어리로 있던
 * 것을 빼냈다. 맵이 여러 개가 되면서 world.ts(엔진: 렌더러/물리/조명)와
 * maps.ts(맵 내용)가 둘 다 이 빌더들을 쓰기 때문이다.
 *
 * 여기 있는 함수는 전부 "Build 컨텍스트를 받아 씬/물리에 물건을 얹는" 순수
 * 작업만 한다. 렌더러나 카메라를 모른다.
 */
// ================================================================ 팔레트
//
// Human Fall Flat 같은 "장난감/인형" 톤을 노린다.
//  - 채도는 높게, 명도도 높게 (파스텔인데 흐리지 않게)
//  - 회색 대신 살짝 색이 도는 중성색 (크림/모래/연회색빛 파랑)
export const C = {
  // 바닥 / 벽
  floorA: 0xf6e7c8,
  floorB: 0xe6cfa1,
  floorRim: 0xd9b784,
  wall: 0xf2efe6,
  wallTrim: 0xffffff,
  baseboard: 0xd8d2c2,
  // 나무
  wood: 0xc98b52,
  woodDark: 0x9c6337,
  woodLight: 0xe0b183,
  // 패브릭
  fabricA: 0x6fb7e8, // 소파 파랑
  fabricB: 0xff8f7a, // 안락의자 코랄
  fabricC: 0xa8e0a0, // 민트
  fabricD: 0xffd166, // 노랑
  rugA: 0xef7d94,
  rugB: 0x8fd6c9,
  rugC: 0xffc75f,
  // 소품
  metal: 0xdfe6ee,
  metalDark: 0x8f9bab,
  leaf: 0x4fbf6a,
  leafDark: 0x2f9550,
  pot: 0xe08b5a,
  screen: 0x1d2a3a,
  lampGlow: 0xfff0c0,
  crateA: 0xe0a030,
  crateB: 0xd06a30,
  crateC: 0x67c2e0,
  crateD: 0x9b8ef0,
  crateE: 0xf07aa8,
  crateF: 0x7ad6a0,
};

// ================================================================ 캐시
//
// 방 하나에 메시가 300개 넘게 들어가므로 지오메트리/재질은 반드시 공유한다.
const geoCache = new Map<string, THREE.BufferGeometry>();
const matCache = new Map<string, THREE.MeshStandardMaterial>();

/** 모서리가 둥근 박스 - "플라스틱 장난감" 실루엣의 핵심 */
export function boxGeo(w: number, h: number, d: number): THREE.BufferGeometry {
  const key = `b${w},${h},${d}`;
  let g = geoCache.get(key);
  if (!g) {
    const r = Math.min(0.055, Math.min(w, h, d) * 0.3);
    g = new RoundedBoxGeometry(w, h, d, 2, r);
    geoCache.set(key, g);
  }
  return g;
}

export function cylGeo(rTop: number, rBot: number, h: number, seg = 18): THREE.BufferGeometry {
  const key = `c${rTop},${rBot},${h},${seg}`;
  let g = geoCache.get(key);
  if (!g) {
    g = new THREE.CylinderGeometry(rTop, rBot, h, seg);
    geoCache.set(key, g);
  }
  return g;
}

export function sphGeo(r: number, seg = 18): THREE.BufferGeometry {
  const key = `s${r},${seg}`;
  let g = geoCache.get(key);
  if (!g) {
    g = new THREE.SphereGeometry(r, seg, Math.max(8, seg >> 1));
    geoCache.set(key, g);
  }
  return g;
}

export interface MatOpts {
  /** 낮을수록 반들반들한 플라스틱 */
  rough?: number;
  metal?: number;
  emissive?: number;
  emissiveIntensity?: number;
  opacity?: number;
}

/**
 * 장난감 플라스틱 재질.
 * roughness를 0.35~0.6으로 두고 metalness를 거의 0으로 두면
 * 환경광(RoomEnvironment)에서 넓고 부드러운 하이라이트가 생긴다.
 */
export function toyMat(color: number, o: MatOpts = {}): THREE.MeshStandardMaterial {
  const rough = o.rough ?? 0.5;
  const metal = o.metal ?? 0.03;
  const em = o.emissive ?? 0x000000;
  const ei = o.emissiveIntensity ?? 1;
  const op = o.opacity ?? 1;
  const key = `${color}|${rough}|${metal}|${em}|${ei}|${op}`;
  let m = matCache.get(key);
  if (!m) {
    m = new THREE.MeshStandardMaterial({
      color,
      roughness: rough,
      metalness: metal,
      emissive: em,
      emissiveIntensity: ei,
      transparent: op < 1,
      opacity: op,
    });
    matCache.set(key, m);
  }
  return m;
}

// ================================================================ 배치 헬퍼
export type V3 = [number, number, number];

export interface Build {
  physics: CANNON.World;
  /** 정적 지형/가구용 물리 재질 (= ground) */
  mat: CANNON.Material;
  /** 정적 씬 그래프. 모든 장식이 여기 들어간다 */
  root: THREE.Group;
  /**
   * 이 맵이 만든 정적 바디 전부.
   *
   * 맵을 갈아끼울 때 물리 월드에서 빼내야 한다. 안 빼면 예전 맵의 벽과
   * 가구가 보이지 않는 채로 남아서 새 맵에서 캐릭터가 허공에 부딪힌다.
   */
  bodies: CANNON.Body[];
}

export function put(b: Build, geo: THREE.BufferGeometry, m: THREE.Material, pos: V3, rot: V3, cast = true): THREE.Mesh {
  const mesh = new THREE.Mesh(geo, m);
  mesh.position.set(pos[0], pos[1], pos[2]);
  mesh.rotation.set(rot[0], rot[1], rot[2]);
  mesh.castShadow = cast;
  mesh.receiveShadow = true;
  b.root.add(mesh);
  return mesh;
}

export function staticBody(b: Build, shape: CANNON.Shape, pos: V3, rot: V3): CANNON.Body {
  const body = new CANNON.Body({ type: CANNON.Body.STATIC, shape, material: b.mat });
  body.position.set(pos[0], pos[1], pos[2]);
  body.quaternion.setFromEuler(rot[0], rot[1], rot[2]);
  b.physics.addBody(body);
  b.bodies.push(body);
  return body;
}

/** 보이고 + 부딪히는 박스 */
export function solid(b: Build, size: V3, pos: V3, color: number, rot: V3 = [0, 0, 0], o?: MatOpts): THREE.Mesh {
  const mesh = put(b, boxGeo(size[0], size[1], size[2]), toyMat(color, o), pos, rot);
  staticBody(b, new CANNON.Box(new CANNON.Vec3(size[0] / 2, size[1] / 2, size[2] / 2)), pos, rot);
  return mesh;
}

/**
 * 보이기만 하는 박스 (얇은 장식 - 충돌 껍데기를 만들면 오히려 걸리적거린다).
 *
 * 아주 납작한 장식(러그, 몰딩, 서랍면, 책등)은 그림자도 만들지 않는다.
 * 이유가 둘이다:
 *  1) 바닥에 2cm 두께로 깔린 러그가 그림자를 던지면 자기 자신에게 얼룩이 진다
 *     (shadow acne). bias를 아무리 만져도 완전히는 안 없어진다.
 *  2) 이 방에는 메시가 600개쯤 들어간다. 그림자 패스는 그걸 한 번 더 그리므로
 *     "보이지도 않을 그림자"를 빼는 게 가장 싼 최적화다.
 *     (실측: 583개 전부 캐스터일 때 그림자 패스만 3.2ms)
 */
export function deco(b: Build, size: V3, pos: V3, color: number, rot: V3 = [0, 0, 0], o?: MatOpts): THREE.Mesh {
  const cast = Math.min(size[0], size[1], size[2]) >= 0.12;
  return put(b, boxGeo(size[0], size[1], size[2]), toyMat(color, o), pos, rot, cast);
}

/** 보이고 + 부딪히는 원기둥 */
export function solidCyl(b: Build, r: number, h: number, pos: V3, color: number, rot: V3 = [0, 0, 0], o?: MatOpts): THREE.Mesh {
  const mesh = put(b, cylGeo(r, r, h), toyMat(color, o), pos, rot);
  staticBody(b, new CANNON.Cylinder(r, r, h, 12), pos, rot);
  return mesh;
}

export function decoCyl(
  b: Build, rTop: number, rBot: number, h: number, pos: V3, color: number, rot: V3 = [0, 0, 0], o?: MatOpts
): THREE.Mesh {
  // 손잡이·테두리처럼 가느다란 것은 그림자를 만들어봐야 보이지 않는다
  const cast = Math.min(rTop, rBot) >= 0.1;
  return put(b, cylGeo(rTop, rBot, h), toyMat(color, o), pos, rot, cast);
}

export function decoSph(b: Build, r: number, pos: V3, color: number, scale: V3 = [1, 1, 1], o?: MatOpts): THREE.Mesh {
  const m = put(b, sphGeo(r), toyMat(color, o), pos, [0, 0, 0]);
  m.scale.set(scale[0], scale[1], scale[2]);
  return m;
}

/**
 * 가구 로컬 좌표 -> 월드 좌표.
 * 가구를 (x, z)에 rotY로 놓으면, 부품마다 이 함수로 위치를 뽑는다.
 * (THREE의 Y회전 행렬 [c 0 s; 0 1 0; -s 0 c]와 같은 규약이라
 *  메시 rotation.y에 그대로 rotY를 넣으면 아귀가 맞는다.)
 */
export function at(x: number, z: number, rotY: number) {
  const c = Math.cos(rotY), s = Math.sin(rotY);
  return (lx: number, ly: number, lz: number): V3 => [x + lx * c + lz * s, ly, z - lx * s + lz * c];
}

/** 결정론적 난수 - 새로고침해도 방 배치가 똑같아야 한다 */
export function rng(seed: number) {
  let t = seed >>> 0;
  return () => {
    t = (t + 0x6d2b79f5) >>> 0;
    let x = Math.imul(t ^ (t >>> 15), 1 | t);
    x = (x + Math.imul(x ^ (x >>> 7), 61 | x)) ^ x;
    return ((x ^ (x >>> 14)) >>> 0) / 4294967296;
  };
}

// ================================================================ 텍스처
/** 바닥 타일 - 2x2 체커 한 블록을 그려서 반복시킨다 */
export function makeFloorTexture(): THREE.CanvasTexture {
  const T = 128;
  const cv = document.createElement("canvas");
  cv.width = cv.height = T * 2;
  const g = cv.getContext("2d")!;
  const hex = (n: number) => "#" + n.toString(16).padStart(6, "0");

  g.fillStyle = hex(C.floorRim);
  g.fillRect(0, 0, T * 2, T * 2);

  const tile = (tx: number, ty: number, color: number) => {
    g.fillStyle = hex(color);
    g.fillRect(tx * T + 3, ty * T + 3, T - 6, T - 6);
    // 타일 안쪽 그라디언트 - 살짝 볼록해 보이게
    const grd = g.createLinearGradient(tx * T, ty * T, tx * T, ty * T + T);
    grd.addColorStop(0, "rgba(255,255,255,0.28)");
    grd.addColorStop(0.55, "rgba(255,255,255,0.0)");
    grd.addColorStop(1, "rgba(0,0,0,0.07)");
    g.fillStyle = grd;
    g.fillRect(tx * T + 3, ty * T + 3, T - 6, T - 6);
  };
  tile(0, 0, C.floorA);
  tile(1, 1, C.floorA);
  tile(1, 0, C.floorB);
  tile(0, 1, C.floorB);

  // 아주 옅은 얼룩 - 완전 균일한 면은 CG처럼 보인다
  const r = rng(7);
  g.globalAlpha = 0.05;
  for (let i = 0; i < 400; i++) {
    g.fillStyle = r() > 0.5 ? "#ffffff" : "#000000";
    const s = 1 + r() * 3;
    g.fillRect(r() * T * 2, r() * T * 2, s, s);
  }
  g.globalAlpha = 1;

  const tex = new THREE.CanvasTexture(cv);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(15, 15);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

/** 위쪽은 하늘색, 아래쪽은 따뜻한 크림색 + 옅은 구름 띠 */
export function makeSkyTexture(): THREE.CanvasTexture {
  const W = 64, H = 512;
  const cv = document.createElement("canvas");
  cv.width = W;
  cv.height = H;
  const g = cv.getContext("2d")!;
  const grd = g.createLinearGradient(0, 0, 0, H);
  grd.addColorStop(0.0, "#3f8fe0"); // 천정
  grd.addColorStop(0.35, "#79bdf2");
  grd.addColorStop(0.62, "#bfe3fb");
  grd.addColorStop(0.8, "#ffe6c9"); // 지평선 근처는 따뜻하게
  grd.addColorStop(1.0, "#ffd7ae");
  g.fillStyle = grd;
  g.fillRect(0, 0, W, H);

  // 구름은 옅게. 진하게 그리면 하늘 위쪽에 흰 띠가 굵게 남아서
  // 그라디언트가 아니라 "줄무늬 천장"처럼 보인다.
  const r = rng(31);
  g.globalAlpha = 0.26;
  g.fillStyle = "#ffffff";
  for (let i = 0; i < 22; i++) {
    const y = H * (0.5 + r() * 0.28);
    const h = 3 + r() * 8;
    g.beginPath();
    g.ellipse(W / 2, y, W * (0.5 + r() * 0.6), h, 0, 0, Math.PI * 2);
    g.fill();
  }
  g.globalAlpha = 1;

  const tex = new THREE.CanvasTexture(cv);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

// ================================================================ 가구 빌더
//
// 모든 빌더는 (b, x, z, rotY, ...)를 받아서 그 자리에 부품을 깐다.
// 부품 좌표는 전부 로컬 기준이고 at()이 월드로 옮긴다.

export function buildTable(
  b: Build, x: number, z: number, rotY: number,
  w = 1.7, d = 1.0, h = 0.76, color = C.wood
) {
  const t = at(x, z, rotY);
  const R: V3 = [0, rotY, 0];
  solid(b, [w, 0.09, d], t(0, h, 0), color, R, { rough: 0.55 });
  deco(b, [w - 0.16, 0.07, d - 0.16], t(0, h - 0.09, 0), C.woodDark, R, { rough: 0.7 });
  const lx = w / 2 - 0.13, lz = d / 2 - 0.13;
  for (const sx of [-1, 1]) {
    for (const sz of [-1, 1]) {
      solid(b, [0.11, h - 0.09, 0.11], t(sx * lx, (h - 0.09) / 2, sz * lz), C.woodDark, R, { rough: 0.65 });
    }
  }
}

export function buildChair(b: Build, x: number, z: number, rotY: number, color = C.wood, seatColor = C.fabricD) {
  const t = at(x, z, rotY);
  const R: V3 = [0, rotY, 0];
  solid(b, [0.52, 0.08, 0.52], t(0, 0.46, 0), color, R);
  deco(b, [0.44, 0.06, 0.44], t(0, 0.52, 0), seatColor, R, { rough: 0.85 });
  solid(b, [0.52, 0.6, 0.09], t(0, 0.78, -0.22), color, R);
  deco(b, [0.4, 0.34, 0.05], t(0, 0.84, -0.16), seatColor, R, { rough: 0.85 });
  for (const sx of [-1, 1]) {
    for (const sz of [-1, 1]) {
      solid(b, [0.075, 0.46, 0.075], t(sx * 0.2, 0.23, sz * 0.2), C.woodDark, R);
    }
  }
}

export function buildSofa(b: Build, x: number, z: number, rotY: number, color = C.fabricA) {
  const t = at(x, z, rotY);
  const R: V3 = [0, rotY, 0];
  const soft: MatOpts = { rough: 0.92, metal: 0 };
  solid(b, [2.5, 0.4, 1.05], t(0, 0.34, 0), color, R, soft);
  solid(b, [2.5, 0.78, 0.3], t(0, 0.75, -0.46), color, R, soft);
  for (const sx of [-1, 1]) solid(b, [0.28, 0.58, 1.05], t(sx * 1.11, 0.63, 0), color, R, soft);
  for (const i of [-1, 0, 1]) {
    deco(b, [0.72, 0.16, 0.88], t(i * 0.75, 0.62, 0.03), 0xfffdf6, R, soft);
  }
  deco(b, [0.34, 0.34, 0.14], t(-0.78, 0.86, -0.24), C.fabricD, [0.1, rotY, 0.2], soft);
  deco(b, [0.34, 0.34, 0.14], t(0.8, 0.86, -0.24), C.fabricB, [0.1, rotY, -0.24], soft);
  for (const sx of [-1, 1]) {
    for (const sz of [-1, 1]) {
      decoCyl(b, 0.06, 0.06, 0.16, t(sx * 1.05, 0.08, sz * 0.4), C.woodDark, R);
    }
  }
}

export function buildArmchair(b: Build, x: number, z: number, rotY: number, color = C.fabricB) {
  const t = at(x, z, rotY);
  const R: V3 = [0, rotY, 0];
  const soft: MatOpts = { rough: 0.92, metal: 0 };
  solid(b, [1.0, 0.4, 1.0], t(0, 0.34, 0), color, R, soft);
  solid(b, [1.0, 0.76, 0.28], t(0, 0.74, -0.42), color, R, soft);
  for (const sx of [-1, 1]) solid(b, [0.26, 0.56, 1.0], t(sx * 0.37, 0.62, 0), color, R, soft);
  deco(b, [0.72, 0.16, 0.84], t(0, 0.62, 0.03), 0xfff2e0, R, soft);
}

export function buildShelf(b: Build, x: number, z: number, rotY: number, seed: number) {
  const t = at(x, z, rotY);
  const R: V3 = [0, rotY, 0];
  const W = 1.5, D = 0.42, H = 2.1;
  solid(b, [W, H, 0.07], t(0, H / 2, -D / 2 + 0.03), C.woodDark, R); // 뒤판
  for (const sx of [-1, 1]) solid(b, [0.09, H, D], t(sx * (W / 2 - 0.045), H / 2, 0), C.wood, R);
  solid(b, [W + 0.08, 0.09, D + 0.06], t(0, H + 0.04, 0), C.wood, R); // 갓
  const r = rng(seed);
  const palette = [0xef6f6c, 0x5bc0eb, 0xf6c453, 0x8ac926, 0x9b5de5, 0xff9f68, 0x4ecdc4];
  for (const sy of [0.34, 0.79, 1.24, 1.69]) {
    solid(b, [W - 0.18, 0.06, D], t(0, sy, 0), C.woodLight, R);
    // 책은 얇아서 충돌 껍데기를 안 만든다 (걸리적거리기만 한다)
    let cx = -W / 2 + 0.16;
    while (cx < W / 2 - 0.22) {
      const bw = 0.055 + r() * 0.06;
      const bh = 0.26 + r() * 0.13;
      const lean = r() > 0.85 ? 0.22 : 0;
      deco(
        b, [bw, bh, D - 0.12], t(cx + bw / 2, sy + 0.03 + bh / 2, 0.02),
        palette[Math.floor(r() * palette.length)], [0, rotY, lean], { rough: 0.8 }
      );
      cx += bw + 0.012;
      if (r() > 0.88) cx += 0.09; // 빈칸
    }
  }
}

export function buildBed(b: Build, x: number, z: number, rotY: number) {
  const t = at(x, z, rotY);
  const R: V3 = [0, rotY, 0];
  const soft: MatOpts = { rough: 0.95, metal: 0 };
  solid(b, [2.05, 0.34, 1.55], t(0, 0.2, 0), C.wood, R);
  solid(b, [2.05, 0.3, 1.5], t(0, 0.52, 0), 0xfffaf0, R, soft); // 매트리스
  solid(b, [0.12, 0.85, 1.55], t(-1.08, 0.55, 0), C.woodDark, R); // 헤드보드
  solid(b, [0.12, 0.4, 1.55], t(1.08, 0.32, 0), C.woodDark, R);
  deco(b, [1.25, 0.12, 1.44], t(0.36, 0.71, 0), C.fabricC, R, soft); // 이불
  deco(b, [0.16, 0.1, 1.44], t(-0.28, 0.73, 0), 0xffffff, R, soft);
  for (const sz of [-1, 1]) deco(b, [0.55, 0.16, 0.42], t(-0.68, 0.76, sz * 0.34), 0xffffff, R, soft);
}

export function buildNightstand(b: Build, x: number, z: number, rotY: number) {
  const t = at(x, z, rotY);
  const R: V3 = [0, rotY, 0];
  solid(b, [0.55, 0.6, 0.45], t(0, 0.3, 0), C.wood, R);
  deco(b, [0.6, 0.05, 0.5], t(0, 0.62, 0), C.woodLight, R);
  for (const i of [0, 1]) {
    deco(b, [0.46, 0.2, 0.03], t(0, 0.18 + i * 0.25, 0.23), C.woodDark, R);
    decoCyl(b, 0.03, 0.03, 0.07, t(0, 0.18 + i * 0.25, 0.26), C.metalDark, [Math.PI / 2, 0, 0]);
  }
}

export function buildDresser(b: Build, x: number, z: number, rotY: number) {
  const t = at(x, z, rotY);
  const R: V3 = [0, rotY, 0];
  solid(b, [1.8, 1.0, 0.55], t(0, 0.52, 0), C.woodLight, R);
  deco(b, [1.88, 0.06, 0.62], t(0, 1.05, 0), C.woodDark, R);
  for (let i = 0; i < 3; i++) {
    for (const sx of [-1, 1]) {
      deco(b, [0.78, 0.24, 0.03], t(sx * 0.44, 0.24 + i * 0.29, 0.28), C.wood, R);
      decoCyl(b, 0.035, 0.035, 0.06, t(sx * 0.44, 0.24 + i * 0.29, 0.31), C.metalDark, [Math.PI / 2, 0, 0]);
    }
  }
  for (const sx of [-1, 1]) decoCyl(b, 0.05, 0.05, 0.06, t(sx * 0.78, 0.03, 0), C.woodDark);
}

export function buildCounter(b: Build, x: number, z: number, rotY: number, w: number) {
  const t = at(x, z, rotY);
  const R: V3 = [0, rotY, 0];
  solid(b, [w, 0.86, 0.68], t(0, 0.43, 0), 0xf0f4f7, R, { rough: 0.4 });
  solid(b, [w + 0.06, 0.08, 0.74], t(0, 0.9, 0), C.metal, R, { rough: 0.3, metal: 0.25 });
  const doors = Math.max(1, Math.round(w / 0.62));
  for (let i = 0; i < doors; i++) {
    const dx = -w / 2 + (w / doors) * (i + 0.5);
    deco(b, [w / doors - 0.06, 0.66, 0.03], t(dx, 0.44, 0.35), 0xdfe7ee, R, { rough: 0.45 });
    decoCyl(b, 0.02, 0.02, 0.16, t(dx + w / doors / 2 - 0.1, 0.44, 0.38), C.metalDark, R, { rough: 0.3, metal: 0.6 });
  }
}

export function buildStove(b: Build, x: number, z: number, rotY: number) {
  const t = at(x, z, rotY);
  const R: V3 = [0, rotY, 0];
  solid(b, [0.9, 0.88, 0.68], t(0, 0.44, 0), 0x54607a, R, { rough: 0.35, metal: 0.2 });
  deco(b, [0.94, 0.05, 0.72], t(0, 0.91, 0), 0x2b3245, R, { rough: 0.25, metal: 0.3 });
  for (const sx of [-1, 1]) {
    for (const sz of [-1, 1]) {
      decoCyl(b, 0.11, 0.11, 0.02, t(sx * 0.2, 0.94, sz * 0.16), 0x1b1f2c, R, { rough: 0.4 });
    }
  }
  deco(b, [0.7, 0.42, 0.03], t(0, 0.5, 0.36), 0x9fd6ff, R, { rough: 0.15, metal: 0.1, opacity: 0.75 });
  decoCyl(b, 0.03, 0.03, 0.78, t(0, 0.78, 0.42), C.metal, [0, 0, Math.PI / 2], { rough: 0.25, metal: 0.6 });
}

export function buildSink(b: Build, x: number, z: number, rotY: number) {
  const t = at(x, z, rotY);
  const R: V3 = [0, rotY, 0];
  buildCounter(b, x, z, rotY, 1.3);
  deco(b, [0.72, 0.1, 0.46], t(0, 0.92, 0), 0xc9d6e2, R, { rough: 0.25, metal: 0.4 });
  decoCyl(b, 0.028, 0.028, 0.34, t(0, 1.1, -0.2), C.metal, R, { rough: 0.2, metal: 0.7 });
  decoCyl(b, 0.026, 0.026, 0.22, t(0, 1.26, -0.11), C.metal, [Math.PI / 2, 0, 0], { rough: 0.2, metal: 0.7 });
}

export function buildLamp(b: Build, x: number, z: number) {
  decoCyl(b, 0.26, 0.28, 0.06, [x, 0.03, z], C.metalDark, [0, 0, 0], { rough: 0.35, metal: 0.5 });
  solidCyl(b, 0.045, 1.5, [x, 0.78, z], C.metalDark, [0, 0, 0], { rough: 0.35, metal: 0.5 });
  decoCyl(b, 0.2, 0.34, 0.4, [x, 1.72, z], C.lampGlow, [0, 0, 0], {
    rough: 0.85, metal: 0, emissive: C.lampGlow, emissiveIntensity: 0.5,
  });
  const light = new THREE.PointLight(0xffd9a0, 7, 8, 2);
  light.position.set(x, 1.62, z);
  b.root.add(light);
}

export function buildPlant(b: Build, x: number, z: number, scale = 1, seed = 3) {
  const r = rng(seed);
  decoCyl(b, 0.26 * scale, 0.2 * scale, 0.42 * scale, [x, 0.21 * scale, z], C.pot, [0, 0, 0], { rough: 0.55 });
  decoCyl(b, 0.28 * scale, 0.27 * scale, 0.07 * scale, [x, 0.4 * scale, z], 0xc4703f, [0, 0, 0], { rough: 0.6 });
  staticBody(b, new CANNON.Cylinder(0.26 * scale, 0.26 * scale, 0.42 * scale, 10), [x, 0.21 * scale, z], [0, 0, 0]);
  // 잎: 눌린 구를 여러 개 붙여서 뭉게뭉게하게
  const blobs = 6;
  for (let i = 0; i < blobs; i++) {
    const ang = (i / blobs) * Math.PI * 2 + r();
    const rad = (0.16 + r() * 0.16) * scale;
    const h = (0.62 + r() * 0.55) * scale;
    decoSph(
      b, 0.24 * scale, [x + Math.cos(ang) * rad, h, z + Math.sin(ang) * rad],
      i % 2 ? C.leaf : C.leafDark, [1, 0.85, 1], { rough: 0.7, metal: 0 }
    );
  }
  decoSph(b, 0.3 * scale, [x, (1.0 + r() * 0.15) * scale, z], C.leaf, [1, 0.8, 1], { rough: 0.7, metal: 0 });
}

export function buildTV(b: Build, x: number, z: number, rotY: number) {
  const t = at(x, z, rotY);
  const R: V3 = [0, rotY, 0];
  solid(b, [1.9, 0.5, 0.5], t(0, 0.26, 0), C.woodDark, R); // 스탠드
  deco(b, [1.7, 0.28, 0.04], t(0, 0.28, 0.24), C.woodLight, R);
  solid(b, [0.4, 0.1, 0.3], t(0, 0.56, 0), 0x2b3245, R);
  solid(b, [1.6, 0.95, 0.1], t(0, 1.1, 0), 0x2b3245, R, { rough: 0.35 });
  deco(b, [1.46, 0.82, 0.03], t(0, 1.1, 0.06), C.screen, R, {
    rough: 0.12, metal: 0.2, emissive: 0x2a6bd0, emissiveIntensity: 0.35,
  });
}

export function buildStairs(b: Build, x: number, z: number, rotY: number, steps = 5, w = 2.4, rise = 0.34, run = 0.62) {
  const t = at(x, z, rotY);
  const R: V3 = [0, rotY, 0];
  const tone = [C.crateC, C.crateD, C.crateE, C.crateF, C.fabricD];
  for (let i = 0; i < steps; i++) {
    const h = rise * (i + 1);
    solid(b, [w, h, run], t(0, h / 2, -i * run), tone[i % tone.length], R, { rough: 0.45 });
  }
}

export function buildBarrel(b: Build, x: number, z: number, color = C.crateB) {
  solidCyl(b, 0.34, 0.92, [x, 0.46, z], color, [0, 0, 0], { rough: 0.45 });
  for (const y of [0.22, 0.7]) {
    decoCyl(b, 0.36, 0.36, 0.07, [x, y, z], C.metalDark, [0, 0, 0], { rough: 0.35, metal: 0.5 });
  }
  decoCyl(b, 0.3, 0.3, 0.04, [x, 0.93, z], C.metalDark, [0, 0, 0], { rough: 0.35, metal: 0.5 });
}

export function buildPillar(b: Build, x: number, z: number, h = 3.0) {
  solidCyl(b, 0.32, h, [x, h / 2, z], 0xf4efe2, [0, 0, 0], { rough: 0.6 });
  decoCyl(b, 0.42, 0.42, 0.14, [x, 0.07, z], C.wallTrim, [0, 0, 0], { rough: 0.6 });
  decoCyl(b, 0.42, 0.42, 0.14, [x, h - 0.07, z], C.wallTrim, [0, 0, 0], { rough: 0.6 });
}

/** 러그 - 밟고 지나가야 하니 충돌 껍데기는 만들지 않는다 */
export function buildRug(b: Build, x: number, z: number, w: number, d: number, rotY: number, a: number, inner: number) {
  const t = at(x, z, rotY);
  const R: V3 = [0, rotY, 0];
  const flat: MatOpts = { rough: 1, metal: 0 };
  deco(b, [w, 0.02, d], t(0, 0.012, 0), a, R, flat);
  deco(b, [w - 0.4, 0.02, d - 0.4], t(0, 0.022, 0), inner, R, flat);
  deco(b, [Math.max(0.2, w - 1.0), 0.02, Math.max(0.2, d - 1.0)], t(0, 0.032, 0), a, R, flat);
}

/** 벽에 붙는 창문 (바깥 하늘이 비치는 것처럼 밝은 판) */
export function buildWindow(b: Build, pos: V3, rotY: number, w = 1.6, h = 1.4) {
  const R: V3 = [0, rotY, 0];
  const t = at(pos[0], pos[2], rotY);
  deco(b, [w + 0.18, h + 0.18, 0.1], t(0, pos[1], 0), C.wallTrim, R, { rough: 0.6 });
  deco(b, [w, h, 0.06], t(0, pos[1], 0.04), 0xbfe6ff, R, {
    rough: 0.1, metal: 0.1, emissive: 0x9fd4ff, emissiveIntensity: 0.5,
  });
  deco(b, [0.07, h, 0.07], t(0, pos[1], 0.07), C.wallTrim, R);
  deco(b, [w, 0.07, 0.07], t(0, pos[1], 0.07), C.wallTrim, R);
}

export function buildPicture(b: Build, pos: V3, rotY: number, color: number, w = 0.8, h = 0.6) {
  const R: V3 = [0, rotY, 0];
  const t = at(pos[0], pos[2], rotY);
  deco(b, [w + 0.1, h + 0.1, 0.06], t(0, pos[1], 0), C.woodDark, R);
  deco(b, [w, h, 0.03], t(0, pos[1], 0.03), color, R, { rough: 0.5 });
}

/**
 * 벽지. 벽 하나를 통째로 흰색으로 두면 그늘진 쪽이 그냥 회색 판이 되어
 * 방이 죽는다. 벽마다 다른 파스텔을 깔고 허리높이에 몰딩 선을 하나 그으면
 * 색만으로도 "여기는 침실, 저기는 주방"이 구분된다.
 *
 * 벽 안쪽 면은 ±14.7이므로 0.03 앞에 붙인다 (z-fighting 회피).
 */
export function buildWallpaper(b: Build, axis: "x" | "z", face: number, upper: number, lower: number) {
  // face = 벽 안쪽 면의 좌표(±14.7). 0.03 만큼 방 안쪽으로 띄워 z-fighting을 피한다.
  const at2 = face - Math.sign(face) * 0.03;
  const size = (h: number): V3 => (axis === "z" ? [29.4, h, 0.05] : [0.05, h, 29.4]);
  const pos = (y: number): V3 => (axis === "z" ? [0, y, at2] : [at2, y, 0]);
  deco(b, size(1.5), pos(1.97), upper, [0, 0, 0], { rough: 0.85 });
  deco(b, size(0.95), pos(0.72), lower, [0, 0, 0], { rough: 0.8 });
  // 허리높이 몰딩 (chair rail)
  const rail: V3 = axis === "z" ? [29.4, 0.09, 0.09] : [0.09, 0.09, 29.4];
  deco(b, rail, pos(1.24), C.wallTrim, [0, 0, 0], { rough: 0.7 });
}

/** 이사 안 끝난 집 느낌 - 쌓아둔 종이상자 */
export function buildBoxStack(b: Build, x: number, z: number, rotY: number, seed: number) {
  const r = rng(seed);
  const t = at(x, z, rotY);
  let y = 0;
  const n = 2 + Math.floor(r() * 2);
  for (let i = 0; i < n; i++) {
    const w = 0.85 - i * 0.1, h = 0.45 + r() * 0.2;
    const yaw = rotY + (r() - 0.5) * 0.35;
    const p = t((r() - 0.5) * 0.12, y + h / 2, (r() - 0.5) * 0.12);
    solid(b, [w, h, w], p, i % 2 ? 0xd9a066 : 0xc98b52, [0, yaw, 0], { rough: 0.75 });
    deco(b, [w * 1.02, 0.05, w * 0.2], [p[0], y + h, p[2]], 0xe8d8b0, [0, yaw, 0], { rough: 0.9 });
    y += h;
  }
}

/** 옷걸이 - 세로로 긴 물체가 있어야 방에 높이감이 생긴다 */
export function buildCoatRack(b: Build, x: number, z: number) {
  decoCyl(b, 0.24, 0.26, 0.06, [x, 0.03, z], C.woodDark, [0, 0, 0], { rough: 0.6 });
  solidCyl(b, 0.055, 1.75, [x, 0.9, z], C.wood, [0, 0, 0], { rough: 0.6 });
  const coats = [C.crateE, C.crateC, C.fabricD];
  for (let i = 0; i < 3; i++) {
    const a = (i / 3) * Math.PI * 2;
    const hx = x + Math.cos(a) * 0.18, hz = z + Math.sin(a) * 0.18;
    decoCyl(b, 0.03, 0.03, 0.34, [hx, 1.68, hz], C.wood, [Math.PI / 2, -a, 0], { rough: 0.6 });
    deco(b, [0.34, 0.75, 0.16], [x + Math.cos(a) * 0.3, 1.24, z + Math.sin(a) * 0.3], coats[i], [0, -a, 0], {
      rough: 0.95, metal: 0,
    });
  }
}

/** 공사장 고깔 - 알록달록한 포인트 색이 필요할 때 */
export function buildCone(b: Build, x: number, z: number) {
  deco(b, [0.42, 0.05, 0.42], [x, 0.025, z], 0xff6a3d, [0, 0, 0], { rough: 0.6 });
  put(b, cylGeo(0.04, 0.2, 0.62), toyMat(0xff6a3d, { rough: 0.55 }), [x, 0.33, z], [0, 0, 0]);
  decoCyl(b, 0.135, 0.16, 0.1, [x, 0.36, z], 0xfff6e8, [0, 0, 0], { rough: 0.6 });
  staticBody(b, new CANNON.Cylinder(0.16, 0.2, 0.6, 8), [x, 0.3, z], [0, 0, 0]);
}

/** 빈백 소파 - 둥글둥글한 실루엣이 하나쯤 있어야 방이 딱딱해 보이지 않는다 */
export function buildBeanbag(b: Build, x: number, z: number, color: number) {
  const m = put(b, sphGeo(0.62, 20), toyMat(color, { rough: 0.95, metal: 0 }), [x, 0.4, z], [0, 0, 0]);
  m.scale.set(1, 0.72, 1);
  staticBody(b, new CANNON.Cylinder(0.5, 0.58, 0.8, 12), [x, 0.4, z], [0, 0, 0]);
  const c2 = put(b, sphGeo(0.34, 16), toyMat(color, { rough: 0.95, metal: 0 }), [x, 0.72, z - 0.24], [0, 0, 0]);
  c2.scale.set(1.1, 0.7, 0.8);
}

/** 벽등 - 벽면에 밝은 점이 몇 개 있으면 "빈 벽"이 덜 허전하다 */
export function buildSconce(b: Build, pos: V3, rotY: number) {
  const R: V3 = [0, rotY, 0];
  const t = at(pos[0], pos[2], rotY);
  deco(b, [0.16, 0.3, 0.1], t(0, pos[1], 0.06), C.metalDark, R, { rough: 0.4, metal: 0.5 });
  decoCyl(b, 0.13, 0.19, 0.24, t(0, pos[1] + 0.22, 0.14), C.lampGlow, R, {
    rough: 0.85, metal: 0, emissive: C.lampGlow, emissiveIntensity: 0.7,
  });
}

/** 벽시계 */
export function buildClock(b: Build, pos: V3, rotY: number) {
  const R: V3 = [Math.PI / 2, 0, 0];
  const t = at(pos[0], pos[2], rotY);
  const p = t(0, pos[1], 0.06);
  decoCyl(b, 0.24, 0.24, 0.07, p, C.woodDark, [R[0], rotY, 0], { rough: 0.6 });
  decoCyl(b, 0.2, 0.2, 0.09, t(0, pos[1], 0.08), 0xfffdf4, [R[0], rotY, 0], { rough: 0.5 });
  deco(b, [0.03, 0.13, 0.02], t(0, pos[1] + 0.05, 0.13), 0x333c4a, [0, rotY, 0]);
  deco(b, [0.1, 0.03, 0.02], t(0.04, pos[1], 0.13), 0x333c4a, [0, rotY, 0]);
}

/** 화이트보드 */
export function buildBoard(b: Build, pos: V3, rotY: number) {
  const R: V3 = [0, rotY, 0];
  const t = at(pos[0], pos[2], rotY);
  deco(b, [2.0, 1.2, 0.08], t(0, pos[1], 0.05), C.metal, R, { rough: 0.4, metal: 0.3 });
  deco(b, [1.86, 1.06, 0.03], t(0, pos[1], 0.1), 0xfbfdff, R, { rough: 0.25 });
  deco(b, [0.9, 0.06, 0.02], t(-0.4, pos[1] + 0.28, 0.12), 0x6fb7e8, R, { rough: 0.6 });
  deco(b, [0.6, 0.06, 0.02], t(-0.55, pos[1] + 0.1, 0.12), 0xef7d94, R, { rough: 0.6 });
  deco(b, [1.1, 0.06, 0.02], t(-0.3, pos[1] - 0.08, 0.12), 0x8ac926, R, { rough: 0.6 });
}

/** 낮은 벤치 - 앉을 수도 있고 올라설 수도 있는 높이 */
export function buildBench(b: Build, x: number, z: number, rotY: number, color = C.crateC) {
  const t = at(x, z, rotY);
  const R: V3 = [0, rotY, 0];
  solid(b, [1.8, 0.14, 0.5], t(0, 0.44, 0), color, R, { rough: 0.5 });
  for (const sx of [-1, 1]) solid(b, [0.14, 0.44, 0.44], t(sx * 0.75, 0.22, 0), C.woodDark, R);
}


// ================================================================ Goal Rush 코스 부품
//
// Fall Guys 톤: 채도 높은 파스텔 + 둥근 형태 + 반복되는 줄무늬.
// 전부 mapkit 캐시(boxGeo/cylGeo/sphGeo/toyMat)를 거치므로 맵을 갈아끼워도
// 지오메트리가 새로 생기지 않는다.

/** Goal Rush 팔레트 - 코스 전용으로 더 쨍하게 */
export const GR = {
  laneA: 0x8fe3ff,     // 코스 바닥 줄무늬 A (하늘색)
  laneB: 0xb6f0ff,     // 줄무늬 B
  laneEdge: 0x4fc3f7,  // 가장자리 띠
  fence: 0xff8fc7,     // 펜스 본체 (핑크)
  fenceTop: 0xffd166,  // 펜스 윗 파이프 (노랑)
  post: 0x9b6cff,      // 기둥 (보라)
  start: 0x7bed9f,     // 출발 구역
  finish: 0xffd166,    // 도착 구역
  skirt: 0x6ec6ff,     // 코스 아랫면 (하늘에 떠 있는 느낌)
  cloud: 0xffffff,
  balloon: [0xff6b8a, 0xffd166, 0x7bed9f, 0x64d2ff, 0xc490ff, 0xff9f68],
};

/**
 * 좌우 경계 펜스.
 *
 * 물리는 단순한 벽 하나(solid)로 두고, 그 위에 장식(파이프/기둥)만 얹는다.
 * 격자무늬를 물리 바디로 만들면 바디 수가 수백 개 늘어나는데, 튕겨나가지
 * 않게 막는 목적에는 벽 하나면 충분하다.
 */
export function buildFence(b: Build, x: number, z0: number, z1: number, h = 1.7) {
  const len = Math.abs(z1 - z0);
  const cz = (z0 + z1) / 2;
  solid(b, [0.36, h, len], [x, h / 2, cz], GR.fence, [0, 0, 0], { rough: 0.5 });
  // 윗 파이프 - 실루엣에 선이 하나 있어야 "경계"로 읽힌다
  deco(b, [0.5, 0.16, len], [x, h + 0.08, cz], GR.fenceTop, [0, 0, 0], { rough: 0.4 });
  // 기둥 (장식). 일정 간격으로 세우면 달릴 때 속도감이 생긴다
  for (let z = Math.min(z0, z1); z <= Math.max(z0, z1); z += 4) {
    decoCyl(b, 0.16, 0.16, h + 0.5, [x, (h + 0.5) / 2, z], GR.post, [0, 0, 0], { rough: 0.45 });
    decoSph(b, 0.2, [x, h + 0.55, z], GR.fenceTop, [1, 0.8, 1], { rough: 0.35 });
  }
}

/**
 * 바닥에 글자를 찍은 안내 표지 (장식만 - 물리 없음).
 *
 * 튜토리얼 구간에서 "여기서 F를 눌러라"를 알려주는 용도다. HUD에 문장을
 * 길게 띄우는 대신 바닥에 키 이름을 크게 그려두면, 달리다가 밟으면서
 * 자연스럽게 읽힌다.
 *
 * [텍스처를 캐시하는 이유] CanvasTexture는 GPU 텍스처를 하나씩 잡는다.
 * 맵을 다시 로드할 때마다 새로 만들면 (world.unloadMap은 머티리얼을
 * dispose하지 않는다 - 캐시를 공유하기 때문) 그대로 쌓인다. 라벨이 같으면
 * 같은 텍스처를 돌려쓴다.
 */
const signCache = new Map<string, THREE.MeshBasicMaterial>();
function signMat(label: string, color: number): THREE.MeshBasicMaterial {
  const key = `${label}|${color}`;
  const hit = signCache.get(key);
  if (hit) return hit;

  const S = 256;
  const cv = document.createElement("canvas");
  cv.width = S; cv.height = S;
  const g = cv.getContext("2d")!;
  g.clearRect(0, 0, S, S);
  // 라벨이 길수록 글자를 줄인다 (SHIFT 같은 건 5글자다)
  const size = label.length <= 1 ? 168 : label.length <= 2 ? 132 : 300 / label.length;
  g.font = `900 ${size}px ui-sans-serif, system-ui, "Malgun Gothic", sans-serif`;
  g.textAlign = "center";
  g.textBaseline = "middle";
  // 바닥색과 섞이지 않게 어두운 테두리를 먼저
  g.lineWidth = size * 0.16;
  g.strokeStyle = "rgba(18,24,32,0.85)";
  g.strokeText(label, S / 2, S / 2 + size * 0.02);
  g.fillStyle = `#${color.toString(16).padStart(6, "0")}`;
  g.fillText(label, S / 2, S / 2 + size * 0.02);

  const tex = new THREE.CanvasTexture(cv);
  tex.anisotropy = 4;
  const mat = new THREE.MeshBasicMaterial({
    map: tex, transparent: true, depthWrite: false, toneMapped: false,
  });
  signCache.set(key, mat);
  return mat;
}

/**
 * 튜토리얼 바닥 패드 — 색 판 + 그 위에 찍힌 키 글자.
 *
 * 물리 바디를 만들지 않는다. 밟고 지나가는 표시일 뿐이라 걸리면 안 된다.
 */
export function buildKeyPad(
  b: Build, x: number, z: number, w: number, d: number, label: string, color: number,
) {
  // 바탕 판 (아주 얇게 깔아서 코스 줄무늬 위에 얹힌다)
  deco(b, [w, 0.04, d], [x, 0.03, z], color, [0, 0, 0], { rough: 0.8 });
  // 테두리 4줄 - 구역이 어디까지인지 눈으로 잡아준다
  const t = 0.16;
  deco(b, [w, 0.05, t], [x, 0.045, z - d / 2 + t / 2], 0xffffff, [0, 0, 0], { rough: 0.7 });
  deco(b, [w, 0.05, t], [x, 0.045, z + d / 2 - t / 2], 0xffffff, [0, 0, 0], { rough: 0.7 });
  deco(b, [t, 0.05, d], [x - w / 2 + t / 2, 0.045, z], 0xffffff, [0, 0, 0], { rough: 0.7 });
  deco(b, [t, 0.05, d], [x + w / 2 - t / 2, 0.045, z], 0xffffff, [0, 0, 0], { rough: 0.7 });

  // 키 글자. 코스는 -Z로 달리므로 달려오는 사람이 바로 읽도록 돌려놓는다.
  const size = Math.min(w, d) * 0.8;
  const plane = new THREE.Mesh(new THREE.PlaneGeometry(size, size), signMat(label, 0xffffff));
  plane.rotation.x = -Math.PI / 2;
  plane.rotation.z = Math.PI;
  plane.position.set(x, 0.07, z);
  b.root.add(plane);
}

/**
 * 골대 — 실제로 부딪히는 물리 구조물.
 *
 * 기둥과 크로스바는 solid(= 정적 바디)라 공이 맞고 튕긴다. 그물은 뒤쪽에
 * 살짝 기울인 벽 하나로 대신한다 - 격자를 물리로 만들면 바디가 수백 개
 * 늘어나는데, "들어간 공이 뒤로 새지 않는다"는 목적에는 벽 하나면 충분하다.
 *
 * 골라인 판정 자체는 game.ts가 공의 z 통과로 한다. 여기 있는 건 전부
 * 눈에 보이고 부딪히는 몸통이다.
 *
 * @param z    골라인 z (기둥은 이 자리에 선다)
 * @param half 골대 반폭 (골라인 판정 폭과 맞춰야 한다)
 */
export function buildGoalNet(b: Build, z: number, half: number, color = 0xffffff) {
  const H = 3.2, T = 0.22;
  // 좌우 기둥
  for (const sx of [-1, 1]) {
    solid(b, [T, H, T], [sx * half, H / 2, z], color, [0, 0, 0], { rough: 0.35 });
  }
  // 크로스바
  solid(b, [half * 2 + T, T, T], [0, H, z], color, [0, 0, 0], { rough: 0.35 });
  // 뒤 그물 (공이 뒤로 빠져나가지 않게)
  solid(b, [half * 2, H, 0.2], [0, H / 2, z - 2.2], 0xdfefff, [0, 0, 0], { rough: 0.9 });
  // 옆 그물
  for (const sx of [-1, 1]) {
    solid(b, [0.2, H, 2.2], [sx * half, H / 2, z - 1.1], 0xdfefff, [0, 0, 0], { rough: 0.9 });
  }
  // 그물 무늬 (장식) - 격자선 몇 개만 그어도 "골대"로 읽힌다
  for (let i = 1; i < 6; i++) {
    const y = (H / 6) * i;
    deco(b, [half * 2, 0.05, 0.05], [0, y, z - 2.15], 0xffffff, [0, 0, 0], { rough: 0.8 });
  }
  for (let i = -3; i <= 3; i++) {
    deco(b, [0.05, H, 0.05], [(half / 3.2) * i, H / 2, z - 2.15], 0xffffff, [0, 0, 0], { rough: 0.8 });
  }
  // 골라인 (바닥에 흰 줄)
  deco(b, [half * 2 + 1.2, 0.06, 0.28], [0, 0.045, z], 0xffffff, [0, 0, 0], { rough: 0.8 });
}

/**
 * 좌우로 왕복하는 발판/장애물의 "레일" 장식.
 * 물리는 obstacles.ts가 kinematic 바디로 움직인다 - 여기는 표시만.
 */
export function buildRail(b: Build, z: number, half: number, color = 0x9b6cff) {
  deco(b, [half * 2, 0.08, 0.3], [0, 0.05, z], color, [0, 0, 0], { rough: 0.6 });
}

/**
 * 공만 지나가는 낮은 틈 — 공과 사람이 서로 다른 길로 가야 하는 구간.
 *
 * 가운데를 가로막는 벽인데 바닥에서 slotH 높이까지가 비어 있다. 공(지름
 * 0.6m)은 그 아래로 굴러 통과하지만, 사람은 몸통이 걸려서 못 지나간다.
 * 그래서 "공을 먼저 차 넣고, 나는 옆으로 돌아가서 다시 잡는다"가 된다 -
 * 킥과 드리블을 따로 쓰게 만드는 자리다.
 *
 * 옆으로 돌아갈 길은 벽 양 끝에 남겨둔다(sideGap). 그 길이 너무 넓으면
 * 공까지 그냥 옆으로 끌고 갈 수 있어서 기믹이 무의미해지므로, 사람 하나
 * 지나갈 만큼만 둔다.
 *
 * 전부 정적 지형이라 움직이는 부품이 없다 - 맵을 짓는 시점에 한 번 세운다.
 */
export function buildBallSlot(
  b: Build, z: number, laneHalf: number,
  opts: { slotH?: number; sideGap?: number; wallH?: number; color?: number } = {},
) {
  const slotH = opts.slotH ?? 0.78;      // 이 아래로 공이 지나간다
  const sideGap = opts.sideGap ?? 1.6;   // 양 끝에 남기는 사람 통로
  const wallH = opts.wallH ?? 2.4;
  const color = opts.color ?? 0xff8a3d;
  const D = 0.5;

  // 벽은 가운데만 막는다. 양 끝 sideGap 만큼은 비워서 사람이 돌아간다.
  const wallHalf = laneHalf - sideGap;
  if (wallHalf <= 0.2) return;

  // 윗부분 (사람도 공도 못 지나간다)
  solid(b, [wallHalf * 2, wallH - slotH, D], [0, slotH + (wallH - slotH) / 2, z],
    color, [0, 0, 0], { rough: 0.45 });

  // 틈 양옆의 기둥 - 슬롯의 폭을 눈으로 잡아준다
  for (const sx of [-1, 1]) {
    solid(b, [0.26, slotH, D * 1.1], [sx * wallHalf, slotH / 2, z], color, [0, 0, 0], { rough: 0.45 });
  }
  // 슬롯 안쪽에 가로 기둥을 몇 개 세워 "공만 통과"임을 읽히게 한다.
  // (사람은 어차피 윗벽에 걸리므로 물리적으로는 장식이다)
  const bars = Math.max(2, Math.round(wallHalf));
  for (let i = 1; i < bars; i++) {
    const x = -wallHalf + (wallHalf * 2 * i) / bars;
    deco(b, [0.1, slotH, 0.1], [x, slotH / 2, z], 0xffd166, [0, 0, 0], { rough: 0.5 });
  }
  // 바닥 표시 - 공이 지나갈 자리
  deco(b, [wallHalf * 2, 0.05, 1.6], [0, 0.04, z], 0xffd166, [0, 0, 0], { rough: 0.75 });
  // 사람이 돌아갈 옆길 표시
  for (const sx of [-1, 1]) {
    deco(b, [sideGap - 0.2, 0.05, 1.6], [sx * (laneHalf - sideGap / 2), 0.04, z],
      0x7bed9f, [0, 0, 0], { rough: 0.75 });
  }

  /**
   * 옆길 턱 — 공만 못 넘어가게 하는 낮은 문턱.
   *
   * [왜 필요한가] 옆길이 사람용으로 열려 있으니 공도 그리로 그냥 몰고 갈 수
   * 있었다. 그러면 "공은 틈으로, 나는 옆으로"라는 기믹이 통째로 무의미해진다.
   *
   * [왜 벽이 아니라 턱인가] 옆길을 막아버리면 사람도 못 지나가서 구간 자체가
   * 통과 불가가 된다. 턱 높이를 공 반지름(0.3)보다 조금 높게만 두면
   *  - 굴러오는 공은 턱에 부딪혀 튕긴다 (세게 차면 넘어갈 수는 있다 = 여지)
   *  - 사람은 다리가 길어서 그냥 넘어간다 (골반이 0.86에 있다)
   * 가 된다. 완전히 막는 게 아니라 "그쪽으로는 공을 몰기 불편하다"로 만든다.
   */
  const lipH = 0.42;
  for (const sx of [-1, 1]) {
    solid(b, [sideGap - 0.2, lipH, 0.36], [sx * (laneHalf - sideGap / 2), lipH / 2, z],
      0x3fc98a, [0, 0, 0], { rough: 0.6 });
  }
}

/** 뭉게구름 (장식만 - 물리 없음). 구 몇 개를 겹쳐 만든다 */
export function buildCloud(b: Build, x: number, y: number, z: number, scale = 1) {
  const blobs: [number, number, number, number][] = [
    [0, 0, 0, 1.0], [0.9, -0.15, 0.1, 0.72], [-0.95, -0.1, -0.1, 0.66],
    [0.35, 0.35, -0.2, 0.62], [-0.4, 0.28, 0.25, 0.55],
  ];
  for (const [dx, dy, dz, r] of blobs) {
    const m = put(b, sphGeo(r * scale, 14),
      toyMat(GR.cloud, { rough: 1, metal: 0 }),
      [x + dx * scale, y + dy * scale, z + dz * scale], [0, 0, 0], false);
    m.receiveShadow = false;
  }
}

/** 풍선 다발 (장식만). 코스 옆에 띄워서 색을 뿌린다 */
export function buildBalloon(b: Build, x: number, y: number, z: number, color: number, scale = 1) {
  const m = put(b, sphGeo(0.42 * scale, 16), toyMat(color, { rough: 0.3 }),
    [x, y, z], [0, 0, 0], false);
  m.scale.set(1, 1.18, 1);
  // 매듭 + 줄
  put(b, cylGeo(0.07 * scale, 0.02 * scale, 0.16 * scale), toyMat(color, { rough: 0.4 }),
    [x, y - 0.5 * scale, z], [0, 0, 0], false);
  const str = put(b, cylGeo(0.015, 0.015, 1.6 * scale), toyMat(0xffffff, { rough: 0.9 }),
    [x, y - 1.38 * scale, z], [0, 0, 0], false);
  str.receiveShadow = false;
}

