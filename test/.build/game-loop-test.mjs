var __defProp = Object.defineProperty;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// client/src/obstacles.ts
import * as CANNON from "cannon-es";
var OB, _d, _l;
var init_obstacles = __esm({
  "client/src/obstacles.ts"() {
    "use strict";
    OB = {
      // ---- 회전봉
      /** 봉이 도는 속도 (rad/s) */
      spinRate: 1.5,
      /**
       * 봉 높이 (바닥에서 봉 중심까지).
       *
       * [넘어진 사람 위로 지나가야 한다] 0.75로 뒀더니 봉이 y 0.58~0.92를
       * 쓸고 지나갔는데, 이건 서 있는 골반 높이(0.86)이면서 동시에 넘어져
       * 누워 있는 몸에도 닿는 높이다. 그래서 한 번 맞아 쓰러지면 일어나는
       * 도중에 다음 봉에 또 맞아 영원히 못 일어났다
       * (실측: 60초 동안 z가 -8에서 그대로였다).
       * 1.05로 올리면 봉 아랫면이 0.88이라 누운 몸(대부분 0.5 이하) 위로
       * 지나가고, 서 있으면 몸통을 쳐서 쓰러뜨린다.
       */
      spinY: 1.05,
      /** 봉 두께 */
      spinThick: 0.34,
      // ---- 좌우 피스톤
      /** 왕복 한 번에 걸리는 시간 (초) */
      pistonPeriod: 4.4,
      /** 밀려나온 상태로 머무는 비율 */
      pistonOutFrac: 0.32,
      /** 피스톤 속도 (m/s) */
      pistonSpeed: 5.5,
      /** 피스톤 몸통 크기 */
      pistonW: 1.5,
      pistonH: 1.5,
      pistonD: 2.6,
      // ---- 굴러오는 거대 공
      /** 반지름 */
      rollR: 1.9,
      /** 질량. 사람(약 20kg)보다 훨씬 무거워야 튕겨낸다 */
      rollMass: 120,
      /** 굴러오는 속도 (+Z 방향 = 플레이어 쪽) */
      rollSpeed: 7.5,
      /** 한 번 굴리고 다음까지 쉬는 시간 (초) */
      rollPeriod: 7,
      /**
       * 출발 지점에서 이만큼 굴러가면 회수한다 (m).
       *
       * 거대 공이 자기 구간을 넘어 좁은 다리까지 굴러가면 다리 위에서 떨어져
       * 버린다. 구간 안에서만 왕복하도록 짧게 잡는다.
       */
      rollRun: 18,
      /** 대기 중에 숨겨두는 높이 */
      rollParkY: -40,
      // ---- 좌우 왕복 (sweeper)
      //
      // 피스톤이 "옆에서 잠깐 튀어나왔다 들어가는" 것이라면, 이건 레인 전체를
      // 가로질러 계속 오간다. 그래서 "지나갈 틈"이 항상 한쪽에만 있고, 그 틈이
      // 좌우로 움직인다. 공을 끌고 그 틈을 따라가야 해서 드리블 방향 전환을 쓴다.
      /** 봉 크기 */
      sweepW: 2.2,
      sweepH: 1.3,
      sweepD: 0.7,
      /** 한쪽 끝에서 반대 끝까지 가는 속도 (m/s) */
      sweepSpeed: 3.6,
      /**
       * 봉 바깥면과 난간 사이에 남기는 여유 (m).
       *
       * 0이면 가장자리에 선 사람이 난간과 봉 사이에 끼여 빠져나갈 수 없다.
       * 사람 몸 폭이 0.4 남짓이므로 0.6이면 붙어 서서 버틸 수 있다.
       */
      sweepEdgeGap: 0.6,
      // ---- 솟았다 내려가는 벽 (popup)
      //
      // 바닥에서 올라와 길을 막았다가 다시 내려간다. 내려가 있는 동안 지나가면
      // 되는데, 올라올 때 공만 걸리면 공이 튕겨 나간다. 그래서 "공을 먼저 굴려
      // 보내고 몸이 따라가는" 판단이 생긴다.
      popW: 5.4,
      popH: 1.5,
      popD: 0.6,
      /** 한 주기 (초) */
      popPeriod: 3.4,
      /** 그중 올라와 있는 비율 */
      popUpFrac: 0.42,
      /** 오르내리는 속도 (m/s) */
      popSpeed: 4.5,
      /** 내려갔을 때 윗면이 바닥 아래로 잠기는 깊이 */
      popSink: 0.15,
      // ---- 열렸다 닫히는 통로 (shutter)
      //
      // 좌우 셔터가 가운데로 모였다(닫힘) 레인 밖으로 물러난다(열림).
      // 닫혔을 때 가운데에 shutterGapHalf 만큼의 좁은 틈만 남는다 - 공은 넉넉히
      // 지나가지만 사람은 아슬아슬하다. 그래서 선택지가 셋이 된다:
      //   1) 열릴 때까지 기다린다 (Q 스톱턴으로 공을 세워두고)
      //   2) 좁은 틈으로 공만 차 넣고 몸은 열릴 때 따라간다
      //   3) 닫히기 전에 그냥 뚫는다
      // 셔터는 kinematic이라 닫힐 때 걸리면 실제로 밀려난다.
      shutterH: 1.6,
      shutterD: 0.6,
      /** 한 주기 (초) */
      shutterPeriod: 4,
      /** 셔터가 움직이는 속도 (m/s) */
      shutterSpeed: 3.2,
      /**
       * 닫혔을 때 가운데에 남기는 틈의 반폭.
       *
       * [0.35 -> 0.55] 0.35면 틈이 0.7m다. 캐릭터 몸 폭을 생각하면 뚫고 지나가는
       * 게 실력이 아니라 운이 됐다(어깨가 걸리면 그냥 튕긴다). 1.1m면 조준해서
       * 들어가면 통과하고, 대충 달려들면 걸린다 = 판단이 의미를 갖는다.
       */
      shutterGapHalf: 0.55,
      // ---- 협동 게이트 (coopgate)
      //
      // 멀티에서만 닫혀 있다. 한 명이 찬 공을 다른 사람이 받으면 열린다.
      // 혼자 플레이할 때는 처음부터 열어둔다 - 싱글이 막히면 안 되기 때문이다.
      //
      // 움직임은 다른 장애물처럼 위상으로 정해지지 않고 바깥(main.ts의 패스 판정)이
      // open()을 불러야 열린다. 그래서 station에 opened 플래그를 따로 둔다.
      gateW: 5.6,
      gateH: 2.6,
      gateD: 0.5,
      /** 열릴 때 바닥 아래로 잠기는 깊이 */
      gateSink: 3.2,
      /** 열리는 속도 (m/s) */
      gateSpeed: 4,
      /** 셔터 한 장의 폭. 레인 반폭(7) - 가운데 틈(0.55) */
      shutterW: 6.45,
      // ---- 버튼 문 (buttongate)
      //
      // 좌우 발판을 "동시에" 밟고 있는 동안만 열린다. 손을 떼면 다시 닫힌다.
      // coopgate가 한 번 열면 끝나는 일회성 관문이라면, 이건 유지해야 하는
      // 장치다. 그래서 둘이 역할을 나눌 수밖에 없다 - 한 명은 발판을 밟고
      // 서 있고, 다른 한 명이 공을 몰고 문을 지난다. 그 다음 밟고 있던 쪽이
      // 뛰어와야 하니 "빨리 지나가고 기다려 줘"가 자연스럽게 나온다.
      //
      // 발판이 둘 다 필요하므로 혼자서는 물리적으로 불가능하다 - 싱글에서는
      // coopgate와 똑같이 rebuild 직후 열어둔다(main.ts의 syncCoopGates).
      /** 발판 중심의 좌우 위치 */
      btnPadX: 4.6,
      /** 발판이 문보다 얼마나 앞(+Z)에 있는가 */
      btnPadAhead: 3.6,
      /** 발판 반폭 / 반길이 */
      btnPadHalf: 1.15,
      /** 발판 판정 높이 - 이 아래에 골반이 있어야 밟은 것으로 친다 */
      btnPadMaxY: 1.5,
      /** 거대 공에 맞은 판정 여유 */
      rollHitPad: 0.6,
      /** 넉백 충격량 */
      rollKnockSide: 90,
      rollKnockUp: 30,
      rollKnockdownTime: 1.4,
      rollHitCooldown: 1.3,
      // ---- 움직이는 장애물 피격 (거대 공 외 나머지)
      //
      // [왜 필요한가] roller만 rag.knockdown()을 직접 불렀고 나머지 장애물은
      // ragdoll.ts의 범용 충격 임계값(P.impactSpeed = 13 m/s)에 기대고 있었다.
      // 그런데 피스톤이 5.5, 스위퍼가 3.6, 셔터가 3.2 m/s다. 코어(머리/몸통/
      // 골반)의 상대 충돌 속도가 13에 닿을 일이 없으니 사실상 아무도 안
      // 넘어졌다 - 실측으로 스테이지 1·2를 완주하는 동안 넘어짐이 0회였다.
      // 회전봉 옆을 스쳐도, 셔터에 끼어도 그냥 밀리기만 했다.
      //
      // 그래서 kind별로 명시적인 피격 판정을 둔다. 판정은 바디의 실제 shape
      // 크기를 로컬 좌표로 가져다 쓰므로(회전봉의 회전까지 포함) 여기서 치수를
      // 다시 적지 않는다 - 장애물 크기를 바꿔도 판정이 따라온다.
      /** 가로 판정 여유 (사람 몸 반지름 몫) */
      hitPad: 0.42,
      /**
       * 세로 판정 여유.
       *
       * 가로와 같은 0.42를 주면 회전봉 판정이 y 0.46까지 내려온다. 일어나는
       * 중인(state는 이미 ACTIVE인) 사람의 골반이 그 높이라서 회복하자마자
       * 다시 맞고 쓰러지는 무한 루프가 된다. 세로는 좁게 잡는다.
       */
      hitPadY: 0.12,
      /**
       * 이 속도 이상으로 움직이는 장애물만 사람을 넘어뜨린다 (m/s).
       *
       * 멈춰 서 있는 피스톤이나 다 열린 셔터는 그냥 벽이어야 한다. 벽에
       * 걸어가 부딪혔다고 넘어지면 짜증만 난다.
       */
      hitMinSpeed: 1.2,
      /**
       * 같은 사람을 다시 때리기까지 (초).
       *
       * [1.1 -> 2.4] knockdownTime(1.15)에 맞춰 뒀더니 넘어졌다 일어나는 그
       * 순간에 쿨다운이 풀려서 곧바로 다시 맞았다. spinY 주석이 경고한 무한
       * 루프가 그대로 재현됐다 - 실측으로 스테이지 1에서 회전봉 앞 z=-36에
       * 갇혀 공까지 뒤로 밀려 진행이 완전히 멈췄다. 넘어져 있는 시간(1.15)에
       * 일어나는 시간까지 더한 뒤에야 다시 맞도록 넉넉히 잡는다.
       */
      hitCooldownTime: 2.4,
      /**
       * 이 높이 위에 골반이 있어야 맞는다 (m).
       *
       * 쿨다운만으로는 부족하다. 일어나는 중인 사람은 state가 이미 ACTIVE라
       * 골반이 0.2에서 0.86으로 올라오는 동안 판정 높이를 스쳐 지나간다.
       * 서 있을 때(0.86)만 맞고 기어오르는 중에는 안 맞게 바닥을 둔다.
       */
      hitMinY: 0.62,
      /** 넉백 충격량 - 장애물 진행 방향 / 위로 */
      knockPush: 62,
      knockUp: 26,
      /** 넘어져 있는 시간 (초). 거대 공보다 짧게 - 빈도가 훨씬 높기 때문이다 */
      knockdownTime: 1.15
    };
    _d = new CANNON.Vec3();
    _l = new CANNON.Vec3();
  }
});

// client/src/mapkit.ts
import * as THREE from "three";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";
import * as CANNON2 from "cannon-es";
function boxGeo(w, h, d) {
  const key = `b${w},${h},${d}`;
  let g = geoCache.get(key);
  if (!g) {
    const r = Math.min(0.055, Math.min(w, h, d) * 0.3);
    g = new RoundedBoxGeometry(w, h, d, 2, r);
    geoCache.set(key, g);
  }
  return g;
}
function cylGeo(rTop, rBot, h, seg = 18) {
  const key = `c${rTop},${rBot},${h},${seg}`;
  let g = geoCache.get(key);
  if (!g) {
    g = new THREE.CylinderGeometry(rTop, rBot, h, seg);
    geoCache.set(key, g);
  }
  return g;
}
function sphGeo(r, seg = 18) {
  const key = `s${r},${seg}`;
  let g = geoCache.get(key);
  if (!g) {
    g = new THREE.SphereGeometry(r, seg, Math.max(8, seg >> 1));
    geoCache.set(key, g);
  }
  return g;
}
function toyMat(color, o = {}) {
  const rough = o.rough ?? 0.5;
  const metal = o.metal ?? 0.03;
  const em = o.emissive ?? 0;
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
      opacity: op
    });
    matCache.set(key, m);
  }
  return m;
}
function put(b, geo, m, pos, rot, cast = true) {
  const mesh = new THREE.Mesh(geo, m);
  mesh.position.set(pos[0], pos[1], pos[2]);
  mesh.rotation.set(rot[0], rot[1], rot[2]);
  mesh.castShadow = cast;
  mesh.receiveShadow = true;
  b.root.add(mesh);
  return mesh;
}
function staticBody(b, shape, pos, rot) {
  const body = new CANNON2.Body({ type: CANNON2.Body.STATIC, shape, material: b.mat });
  body.position.set(pos[0], pos[1], pos[2]);
  body.quaternion.setFromEuler(rot[0], rot[1], rot[2]);
  b.physics.addBody(body);
  b.bodies.push(body);
  return body;
}
function solid(b, size, pos, color, rot = [0, 0, 0], o) {
  const mesh = put(b, boxGeo(size[0], size[1], size[2]), toyMat(color, o), pos, rot);
  staticBody(b, new CANNON2.Box(new CANNON2.Vec3(size[0] / 2, size[1] / 2, size[2] / 2)), pos, rot);
  return mesh;
}
function deco(b, size, pos, color, rot = [0, 0, 0], o) {
  const cast = Math.min(size[0], size[1], size[2]) >= 0.12;
  return put(b, boxGeo(size[0], size[1], size[2]), toyMat(color, o), pos, rot, cast);
}
function solidCyl(b, r, h, pos, color, rot = [0, 0, 0], o) {
  const mesh = put(b, cylGeo(r, r, h), toyMat(color, o), pos, rot);
  staticBody(b, new CANNON2.Cylinder(r, r, h, 12), pos, rot);
  return mesh;
}
function decoCyl(b, rTop, rBot, h, pos, color, rot = [0, 0, 0], o) {
  const cast = Math.min(rTop, rBot) >= 0.1;
  return put(b, cylGeo(rTop, rBot, h), toyMat(color, o), pos, rot, cast);
}
function decoSph(b, r, pos, color, scale = [1, 1, 1], o) {
  const m = put(b, sphGeo(r), toyMat(color, o), pos, [0, 0, 0]);
  m.scale.set(scale[0], scale[1], scale[2]);
  return m;
}
function at(x, z, rotY) {
  const c = Math.cos(rotY), s = Math.sin(rotY);
  return (lx, ly, lz) => [x + lx * c + lz * s, ly, z - lx * s + lz * c];
}
function rng(seed) {
  let t = seed >>> 0;
  return () => {
    t = t + 1831565813 >>> 0;
    let x = Math.imul(t ^ t >>> 15, 1 | t);
    x = x + Math.imul(x ^ x >>> 7, 61 | x) ^ x;
    return ((x ^ x >>> 14) >>> 0) / 4294967296;
  };
}
function buildTable(b, x, z, rotY, w = 1.7, d = 1, h = 0.76, color = C.wood) {
  const t = at(x, z, rotY);
  const R = [0, rotY, 0];
  solid(b, [w, 0.09, d], t(0, h, 0), color, R, { rough: 0.55 });
  deco(b, [w - 0.16, 0.07, d - 0.16], t(0, h - 0.09, 0), C.woodDark, R, { rough: 0.7 });
  const lx = w / 2 - 0.13, lz = d / 2 - 0.13;
  for (const sx of [-1, 1]) {
    for (const sz of [-1, 1]) {
      solid(b, [0.11, h - 0.09, 0.11], t(sx * lx, (h - 0.09) / 2, sz * lz), C.woodDark, R, { rough: 0.65 });
    }
  }
}
function buildChair(b, x, z, rotY, color = C.wood, seatColor = C.fabricD) {
  const t = at(x, z, rotY);
  const R = [0, rotY, 0];
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
function buildSofa(b, x, z, rotY, color = C.fabricA) {
  const t = at(x, z, rotY);
  const R = [0, rotY, 0];
  const soft = { rough: 0.92, metal: 0 };
  solid(b, [2.5, 0.4, 1.05], t(0, 0.34, 0), color, R, soft);
  solid(b, [2.5, 0.78, 0.3], t(0, 0.75, -0.46), color, R, soft);
  for (const sx of [-1, 1]) solid(b, [0.28, 0.58, 1.05], t(sx * 1.11, 0.63, 0), color, R, soft);
  for (const i of [-1, 0, 1]) {
    deco(b, [0.72, 0.16, 0.88], t(i * 0.75, 0.62, 0.03), 16776694, R, soft);
  }
  deco(b, [0.34, 0.34, 0.14], t(-0.78, 0.86, -0.24), C.fabricD, [0.1, rotY, 0.2], soft);
  deco(b, [0.34, 0.34, 0.14], t(0.8, 0.86, -0.24), C.fabricB, [0.1, rotY, -0.24], soft);
  for (const sx of [-1, 1]) {
    for (const sz of [-1, 1]) {
      decoCyl(b, 0.06, 0.06, 0.16, t(sx * 1.05, 0.08, sz * 0.4), C.woodDark, R);
    }
  }
}
function buildArmchair(b, x, z, rotY, color = C.fabricB) {
  const t = at(x, z, rotY);
  const R = [0, rotY, 0];
  const soft = { rough: 0.92, metal: 0 };
  solid(b, [1, 0.4, 1], t(0, 0.34, 0), color, R, soft);
  solid(b, [1, 0.76, 0.28], t(0, 0.74, -0.42), color, R, soft);
  for (const sx of [-1, 1]) solid(b, [0.26, 0.56, 1], t(sx * 0.37, 0.62, 0), color, R, soft);
  deco(b, [0.72, 0.16, 0.84], t(0, 0.62, 0.03), 16773856, R, soft);
}
function buildShelf(b, x, z, rotY, seed) {
  const t = at(x, z, rotY);
  const R = [0, rotY, 0];
  const W = 1.5, D = 0.42, H = 2.1;
  solid(b, [W, H, 0.07], t(0, H / 2, -D / 2 + 0.03), C.woodDark, R);
  for (const sx of [-1, 1]) solid(b, [0.09, H, D], t(sx * (W / 2 - 0.045), H / 2, 0), C.wood, R);
  solid(b, [W + 0.08, 0.09, D + 0.06], t(0, H + 0.04, 0), C.wood, R);
  const r = rng(seed);
  const palette = [15691628, 6013163, 16172115, 9095462, 10182117, 16752488, 5164484];
  for (const sy of [0.34, 0.79, 1.24, 1.69]) {
    solid(b, [W - 0.18, 0.06, D], t(0, sy, 0), C.woodLight, R);
    let cx = -W / 2 + 0.16;
    while (cx < W / 2 - 0.22) {
      const bw = 0.055 + r() * 0.06;
      const bh = 0.26 + r() * 0.13;
      const lean = r() > 0.85 ? 0.22 : 0;
      deco(
        b,
        [bw, bh, D - 0.12],
        t(cx + bw / 2, sy + 0.03 + bh / 2, 0.02),
        palette[Math.floor(r() * palette.length)],
        [0, rotY, lean],
        { rough: 0.8 }
      );
      cx += bw + 0.012;
      if (r() > 0.88) cx += 0.09;
    }
  }
}
function buildBed(b, x, z, rotY) {
  const t = at(x, z, rotY);
  const R = [0, rotY, 0];
  const soft = { rough: 0.95, metal: 0 };
  solid(b, [2.05, 0.34, 1.55], t(0, 0.2, 0), C.wood, R);
  solid(b, [2.05, 0.3, 1.5], t(0, 0.52, 0), 16775920, R, soft);
  solid(b, [0.12, 0.85, 1.55], t(-1.08, 0.55, 0), C.woodDark, R);
  solid(b, [0.12, 0.4, 1.55], t(1.08, 0.32, 0), C.woodDark, R);
  deco(b, [1.25, 0.12, 1.44], t(0.36, 0.71, 0), C.fabricC, R, soft);
  deco(b, [0.16, 0.1, 1.44], t(-0.28, 0.73, 0), 16777215, R, soft);
  for (const sz of [-1, 1]) deco(b, [0.55, 0.16, 0.42], t(-0.68, 0.76, sz * 0.34), 16777215, R, soft);
}
function buildNightstand(b, x, z, rotY) {
  const t = at(x, z, rotY);
  const R = [0, rotY, 0];
  solid(b, [0.55, 0.6, 0.45], t(0, 0.3, 0), C.wood, R);
  deco(b, [0.6, 0.05, 0.5], t(0, 0.62, 0), C.woodLight, R);
  for (const i of [0, 1]) {
    deco(b, [0.46, 0.2, 0.03], t(0, 0.18 + i * 0.25, 0.23), C.woodDark, R);
    decoCyl(b, 0.03, 0.03, 0.07, t(0, 0.18 + i * 0.25, 0.26), C.metalDark, [Math.PI / 2, 0, 0]);
  }
}
function buildDresser(b, x, z, rotY) {
  const t = at(x, z, rotY);
  const R = [0, rotY, 0];
  solid(b, [1.8, 1, 0.55], t(0, 0.52, 0), C.woodLight, R);
  deco(b, [1.88, 0.06, 0.62], t(0, 1.05, 0), C.woodDark, R);
  for (let i = 0; i < 3; i++) {
    for (const sx of [-1, 1]) {
      deco(b, [0.78, 0.24, 0.03], t(sx * 0.44, 0.24 + i * 0.29, 0.28), C.wood, R);
      decoCyl(b, 0.035, 0.035, 0.06, t(sx * 0.44, 0.24 + i * 0.29, 0.31), C.metalDark, [Math.PI / 2, 0, 0]);
    }
  }
  for (const sx of [-1, 1]) decoCyl(b, 0.05, 0.05, 0.06, t(sx * 0.78, 0.03, 0), C.woodDark);
}
function buildCounter(b, x, z, rotY, w) {
  const t = at(x, z, rotY);
  const R = [0, rotY, 0];
  solid(b, [w, 0.86, 0.68], t(0, 0.43, 0), 15791351, R, { rough: 0.4 });
  solid(b, [w + 0.06, 0.08, 0.74], t(0, 0.9, 0), C.metal, R, { rough: 0.3, metal: 0.25 });
  const doors = Math.max(1, Math.round(w / 0.62));
  for (let i = 0; i < doors; i++) {
    const dx = -w / 2 + w / doors * (i + 0.5);
    deco(b, [w / doors - 0.06, 0.66, 0.03], t(dx, 0.44, 0.35), 14673902, R, { rough: 0.45 });
    decoCyl(b, 0.02, 0.02, 0.16, t(dx + w / doors / 2 - 0.1, 0.44, 0.38), C.metalDark, R, { rough: 0.3, metal: 0.6 });
  }
}
function buildStove(b, x, z, rotY) {
  const t = at(x, z, rotY);
  const R = [0, rotY, 0];
  solid(b, [0.9, 0.88, 0.68], t(0, 0.44, 0), 5529722, R, { rough: 0.35, metal: 0.2 });
  deco(b, [0.94, 0.05, 0.72], t(0, 0.91, 0), 2830917, R, { rough: 0.25, metal: 0.3 });
  for (const sx of [-1, 1]) {
    for (const sz of [-1, 1]) {
      decoCyl(b, 0.11, 0.11, 0.02, t(sx * 0.2, 0.94, sz * 0.16), 1777452, R, { rough: 0.4 });
    }
  }
  deco(b, [0.7, 0.42, 0.03], t(0, 0.5, 0.36), 10475263, R, { rough: 0.15, metal: 0.1, opacity: 0.75 });
  decoCyl(b, 0.03, 0.03, 0.78, t(0, 0.78, 0.42), C.metal, [0, 0, Math.PI / 2], { rough: 0.25, metal: 0.6 });
}
function buildSink(b, x, z, rotY) {
  const t = at(x, z, rotY);
  const R = [0, rotY, 0];
  buildCounter(b, x, z, rotY, 1.3);
  deco(b, [0.72, 0.1, 0.46], t(0, 0.92, 0), 13227746, R, { rough: 0.25, metal: 0.4 });
  decoCyl(b, 0.028, 0.028, 0.34, t(0, 1.1, -0.2), C.metal, R, { rough: 0.2, metal: 0.7 });
  decoCyl(b, 0.026, 0.026, 0.22, t(0, 1.26, -0.11), C.metal, [Math.PI / 2, 0, 0], { rough: 0.2, metal: 0.7 });
}
function buildLamp(b, x, z) {
  decoCyl(b, 0.26, 0.28, 0.06, [x, 0.03, z], C.metalDark, [0, 0, 0], { rough: 0.35, metal: 0.5 });
  solidCyl(b, 0.045, 1.5, [x, 0.78, z], C.metalDark, [0, 0, 0], { rough: 0.35, metal: 0.5 });
  decoCyl(b, 0.2, 0.34, 0.4, [x, 1.72, z], C.lampGlow, [0, 0, 0], {
    rough: 0.85,
    metal: 0,
    emissive: C.lampGlow,
    emissiveIntensity: 0.5
  });
  const light = new THREE.PointLight(16767392, 7, 8, 2);
  light.position.set(x, 1.62, z);
  b.root.add(light);
}
function buildPlant(b, x, z, scale = 1, seed = 3) {
  const r = rng(seed);
  decoCyl(b, 0.26 * scale, 0.2 * scale, 0.42 * scale, [x, 0.21 * scale, z], C.pot, [0, 0, 0], { rough: 0.55 });
  decoCyl(b, 0.28 * scale, 0.27 * scale, 0.07 * scale, [x, 0.4 * scale, z], 12873791, [0, 0, 0], { rough: 0.6 });
  staticBody(b, new CANNON2.Cylinder(0.26 * scale, 0.26 * scale, 0.42 * scale, 10), [x, 0.21 * scale, z], [0, 0, 0]);
  const blobs = 6;
  for (let i = 0; i < blobs; i++) {
    const ang = i / blobs * Math.PI * 2 + r();
    const rad = (0.16 + r() * 0.16) * scale;
    const h = (0.62 + r() * 0.55) * scale;
    decoSph(
      b,
      0.24 * scale,
      [x + Math.cos(ang) * rad, h, z + Math.sin(ang) * rad],
      i % 2 ? C.leaf : C.leafDark,
      [1, 0.85, 1],
      { rough: 0.7, metal: 0 }
    );
  }
  decoSph(b, 0.3 * scale, [x, (1 + r() * 0.15) * scale, z], C.leaf, [1, 0.8, 1], { rough: 0.7, metal: 0 });
}
function buildTV(b, x, z, rotY) {
  const t = at(x, z, rotY);
  const R = [0, rotY, 0];
  solid(b, [1.9, 0.5, 0.5], t(0, 0.26, 0), C.woodDark, R);
  deco(b, [1.7, 0.28, 0.04], t(0, 0.28, 0.24), C.woodLight, R);
  solid(b, [0.4, 0.1, 0.3], t(0, 0.56, 0), 2830917, R);
  solid(b, [1.6, 0.95, 0.1], t(0, 1.1, 0), 2830917, R, { rough: 0.35 });
  deco(b, [1.46, 0.82, 0.03], t(0, 1.1, 0.06), C.screen, R, {
    rough: 0.12,
    metal: 0.2,
    emissive: 2780112,
    emissiveIntensity: 0.35
  });
}
function buildStairs(b, x, z, rotY, steps = 5, w = 2.4, rise = 0.34, run = 0.62) {
  const t = at(x, z, rotY);
  const R = [0, rotY, 0];
  const tone = [C.crateC, C.crateD, C.crateE, C.crateF, C.fabricD];
  for (let i = 0; i < steps; i++) {
    const h = rise * (i + 1);
    solid(b, [w, h, run], t(0, h / 2, -i * run), tone[i % tone.length], R, { rough: 0.45 });
  }
}
function buildBarrel(b, x, z, color = C.crateB) {
  solidCyl(b, 0.34, 0.92, [x, 0.46, z], color, [0, 0, 0], { rough: 0.45 });
  for (const y of [0.22, 0.7]) {
    decoCyl(b, 0.36, 0.36, 0.07, [x, y, z], C.metalDark, [0, 0, 0], { rough: 0.35, metal: 0.5 });
  }
  decoCyl(b, 0.3, 0.3, 0.04, [x, 0.93, z], C.metalDark, [0, 0, 0], { rough: 0.35, metal: 0.5 });
}
function buildPillar(b, x, z, h = 3) {
  solidCyl(b, 0.32, h, [x, h / 2, z], 16052194, [0, 0, 0], { rough: 0.6 });
  decoCyl(b, 0.42, 0.42, 0.14, [x, 0.07, z], C.wallTrim, [0, 0, 0], { rough: 0.6 });
  decoCyl(b, 0.42, 0.42, 0.14, [x, h - 0.07, z], C.wallTrim, [0, 0, 0], { rough: 0.6 });
}
function buildRug(b, x, z, w, d, rotY, a, inner) {
  const t = at(x, z, rotY);
  const R = [0, rotY, 0];
  const flat = { rough: 1, metal: 0 };
  deco(b, [w, 0.02, d], t(0, 0.012, 0), a, R, flat);
  deco(b, [w - 0.4, 0.02, d - 0.4], t(0, 0.022, 0), inner, R, flat);
  deco(b, [Math.max(0.2, w - 1), 0.02, Math.max(0.2, d - 1)], t(0, 0.032, 0), a, R, flat);
}
function buildWindow(b, pos, rotY, w = 1.6, h = 1.4) {
  const R = [0, rotY, 0];
  const t = at(pos[0], pos[2], rotY);
  deco(b, [w + 0.18, h + 0.18, 0.1], t(0, pos[1], 0), C.wallTrim, R, { rough: 0.6 });
  deco(b, [w, h, 0.06], t(0, pos[1], 0.04), 12576511, R, {
    rough: 0.1,
    metal: 0.1,
    emissive: 10474751,
    emissiveIntensity: 0.5
  });
  deco(b, [0.07, h, 0.07], t(0, pos[1], 0.07), C.wallTrim, R);
  deco(b, [w, 0.07, 0.07], t(0, pos[1], 0.07), C.wallTrim, R);
}
function buildPicture(b, pos, rotY, color, w = 0.8, h = 0.6) {
  const R = [0, rotY, 0];
  const t = at(pos[0], pos[2], rotY);
  deco(b, [w + 0.1, h + 0.1, 0.06], t(0, pos[1], 0), C.woodDark, R);
  deco(b, [w, h, 0.03], t(0, pos[1], 0.03), color, R, { rough: 0.5 });
}
function buildWallpaper(b, axis, face, upper, lower) {
  const at2 = face - Math.sign(face) * 0.03;
  const size = (h) => axis === "z" ? [29.4, h, 0.05] : [0.05, h, 29.4];
  const pos = (y) => axis === "z" ? [0, y, at2] : [at2, y, 0];
  deco(b, size(1.5), pos(1.97), upper, [0, 0, 0], { rough: 0.85 });
  deco(b, size(0.95), pos(0.72), lower, [0, 0, 0], { rough: 0.8 });
  const rail = axis === "z" ? [29.4, 0.09, 0.09] : [0.09, 0.09, 29.4];
  deco(b, rail, pos(1.24), C.wallTrim, [0, 0, 0], { rough: 0.7 });
}
function buildBoxStack(b, x, z, rotY, seed) {
  const r = rng(seed);
  const t = at(x, z, rotY);
  let y = 0;
  const n = 2 + Math.floor(r() * 2);
  for (let i = 0; i < n; i++) {
    const w = 0.85 - i * 0.1, h = 0.45 + r() * 0.2;
    const yaw = rotY + (r() - 0.5) * 0.35;
    const p = t((r() - 0.5) * 0.12, y + h / 2, (r() - 0.5) * 0.12);
    solid(b, [w, h, w], p, i % 2 ? 14262374 : 13208402, [0, yaw, 0], { rough: 0.75 });
    deco(b, [w * 1.02, 0.05, w * 0.2], [p[0], y + h, p[2]], 15259824, [0, yaw, 0], { rough: 0.9 });
    y += h;
  }
}
function buildCoatRack(b, x, z) {
  decoCyl(b, 0.24, 0.26, 0.06, [x, 0.03, z], C.woodDark, [0, 0, 0], { rough: 0.6 });
  solidCyl(b, 0.055, 1.75, [x, 0.9, z], C.wood, [0, 0, 0], { rough: 0.6 });
  const coats = [C.crateE, C.crateC, C.fabricD];
  for (let i = 0; i < 3; i++) {
    const a = i / 3 * Math.PI * 2;
    const hx = x + Math.cos(a) * 0.18, hz = z + Math.sin(a) * 0.18;
    decoCyl(b, 0.03, 0.03, 0.34, [hx, 1.68, hz], C.wood, [Math.PI / 2, -a, 0], { rough: 0.6 });
    deco(b, [0.34, 0.75, 0.16], [x + Math.cos(a) * 0.3, 1.24, z + Math.sin(a) * 0.3], coats[i], [0, -a, 0], {
      rough: 0.95,
      metal: 0
    });
  }
}
function buildCone(b, x, z) {
  deco(b, [0.42, 0.05, 0.42], [x, 0.025, z], 16738877, [0, 0, 0], { rough: 0.6 });
  put(b, cylGeo(0.04, 0.2, 0.62), toyMat(16738877, { rough: 0.55 }), [x, 0.33, z], [0, 0, 0]);
  decoCyl(b, 0.135, 0.16, 0.1, [x, 0.36, z], 16774888, [0, 0, 0], { rough: 0.6 });
  staticBody(b, new CANNON2.Cylinder(0.16, 0.2, 0.6, 8), [x, 0.3, z], [0, 0, 0]);
}
function buildBeanbag(b, x, z, color) {
  const m = put(b, sphGeo(0.62, 20), toyMat(color, { rough: 0.95, metal: 0 }), [x, 0.4, z], [0, 0, 0]);
  m.scale.set(1, 0.72, 1);
  staticBody(b, new CANNON2.Cylinder(0.5, 0.58, 0.8, 12), [x, 0.4, z], [0, 0, 0]);
  const c2 = put(b, sphGeo(0.34, 16), toyMat(color, { rough: 0.95, metal: 0 }), [x, 0.72, z - 0.24], [0, 0, 0]);
  c2.scale.set(1.1, 0.7, 0.8);
}
function buildSconce(b, pos, rotY) {
  const R = [0, rotY, 0];
  const t = at(pos[0], pos[2], rotY);
  deco(b, [0.16, 0.3, 0.1], t(0, pos[1], 0.06), C.metalDark, R, { rough: 0.4, metal: 0.5 });
  decoCyl(b, 0.13, 0.19, 0.24, t(0, pos[1] + 0.22, 0.14), C.lampGlow, R, {
    rough: 0.85,
    metal: 0,
    emissive: C.lampGlow,
    emissiveIntensity: 0.7
  });
}
function buildClock(b, pos, rotY) {
  const R = [Math.PI / 2, 0, 0];
  const t = at(pos[0], pos[2], rotY);
  const p = t(0, pos[1], 0.06);
  decoCyl(b, 0.24, 0.24, 0.07, p, C.woodDark, [R[0], rotY, 0], { rough: 0.6 });
  decoCyl(b, 0.2, 0.2, 0.09, t(0, pos[1], 0.08), 16776692, [R[0], rotY, 0], { rough: 0.5 });
  deco(b, [0.03, 0.13, 0.02], t(0, pos[1] + 0.05, 0.13), 3357770, [0, rotY, 0]);
  deco(b, [0.1, 0.03, 0.02], t(0.04, pos[1], 0.13), 3357770, [0, rotY, 0]);
}
function buildBoard(b, pos, rotY) {
  const R = [0, rotY, 0];
  const t = at(pos[0], pos[2], rotY);
  deco(b, [2, 1.2, 0.08], t(0, pos[1], 0.05), C.metal, R, { rough: 0.4, metal: 0.3 });
  deco(b, [1.86, 1.06, 0.03], t(0, pos[1], 0.1), 16514559, R, { rough: 0.25 });
  deco(b, [0.9, 0.06, 0.02], t(-0.4, pos[1] + 0.28, 0.12), 7321576, R, { rough: 0.6 });
  deco(b, [0.6, 0.06, 0.02], t(-0.55, pos[1] + 0.1, 0.12), 15695252, R, { rough: 0.6 });
  deco(b, [1.1, 0.06, 0.02], t(-0.3, pos[1] - 0.08, 0.12), 9095462, R, { rough: 0.6 });
}
function buildBench(b, x, z, rotY, color = C.crateC) {
  const t = at(x, z, rotY);
  const R = [0, rotY, 0];
  solid(b, [1.8, 0.14, 0.5], t(0, 0.44, 0), color, R, { rough: 0.5 });
  for (const sx of [-1, 1]) solid(b, [0.14, 0.44, 0.44], t(sx * 0.75, 0.22, 0), C.woodDark, R);
}
function buildFence(b, x, z0, z1, h = 1.7) {
  const len = Math.abs(z1 - z0);
  const cz = (z0 + z1) / 2;
  solid(b, [0.36, h, len], [x, h / 2, cz], GR.fence, [0, 0, 0], { rough: 0.5 });
  deco(b, [0.5, 0.16, len], [x, h + 0.08, cz], GR.fenceTop, [0, 0, 0], { rough: 0.4 });
  for (let z = Math.min(z0, z1); z <= Math.max(z0, z1); z += 4) {
    decoCyl(b, 0.16, 0.16, h + 0.5, [x, (h + 0.5) / 2, z], GR.post, [0, 0, 0], { rough: 0.45 });
    decoSph(b, 0.2, [x, h + 0.55, z], GR.fenceTop, [1, 0.8, 1], { rough: 0.35 });
  }
}
function signMat(label, color) {
  const key = `${label}|${color}`;
  const hit = signCache.get(key);
  if (hit) return hit;
  const S = 256;
  const cv = document.createElement("canvas");
  cv.width = S;
  cv.height = S;
  const g = cv.getContext("2d");
  g.clearRect(0, 0, S, S);
  const size = label.length <= 1 ? 168 : label.length <= 2 ? 132 : 300 / label.length;
  g.font = `900 ${size}px ui-sans-serif, system-ui, "Malgun Gothic", sans-serif`;
  g.textAlign = "center";
  g.textBaseline = "middle";
  g.lineWidth = size * 0.16;
  g.strokeStyle = "rgba(18,24,32,0.85)";
  g.strokeText(label, S / 2, S / 2 + size * 0.02);
  g.fillStyle = `#${color.toString(16).padStart(6, "0")}`;
  g.fillText(label, S / 2, S / 2 + size * 0.02);
  const tex = new THREE.CanvasTexture(cv);
  tex.anisotropy = 4;
  const mat = new THREE.MeshBasicMaterial({
    map: tex,
    transparent: true,
    depthWrite: false,
    toneMapped: false
  });
  signCache.set(key, mat);
  return mat;
}
function buildKeyPad(b, x, z, w, d, label, color) {
  deco(b, [w, 0.04, d], [x, 0.03, z], color, [0, 0, 0], { rough: 0.8 });
  const t = 0.16;
  deco(b, [w, 0.05, t], [x, 0.045, z - d / 2 + t / 2], 16777215, [0, 0, 0], { rough: 0.7 });
  deco(b, [w, 0.05, t], [x, 0.045, z + d / 2 - t / 2], 16777215, [0, 0, 0], { rough: 0.7 });
  deco(b, [t, 0.05, d], [x - w / 2 + t / 2, 0.045, z], 16777215, [0, 0, 0], { rough: 0.7 });
  deco(b, [t, 0.05, d], [x + w / 2 - t / 2, 0.045, z], 16777215, [0, 0, 0], { rough: 0.7 });
  const size = Math.min(w, d) * 0.8;
  const plane = new THREE.Mesh(new THREE.PlaneGeometry(size, size), signMat(label, 16777215));
  plane.rotation.x = -Math.PI / 2;
  plane.rotation.z = Math.PI;
  plane.position.set(x, 0.07, z);
  b.root.add(plane);
}
function buildGoalNet(b, z, half, color = 16777215) {
  const H = 3.2, T = 0.22;
  for (const sx of [-1, 1]) {
    solid(b, [T, H, T], [sx * half, H / 2, z], color, [0, 0, 0], { rough: 0.35 });
  }
  solid(b, [half * 2 + T, T, T], [0, H, z], color, [0, 0, 0], { rough: 0.35 });
  solid(b, [half * 2, H, 0.2], [0, H / 2, z - 2.2], 14675967, [0, 0, 0], { rough: 0.9 });
  for (const sx of [-1, 1]) {
    solid(b, [0.2, H, 2.2], [sx * half, H / 2, z - 1.1], 14675967, [0, 0, 0], { rough: 0.9 });
  }
  for (let i = 1; i < 6; i++) {
    const y = H / 6 * i;
    deco(b, [half * 2, 0.05, 0.05], [0, y, z - 2.15], 16777215, [0, 0, 0], { rough: 0.8 });
  }
  for (let i = -3; i <= 3; i++) {
    deco(b, [0.05, H, 0.05], [half / 3.2 * i, H / 2, z - 2.15], 16777215, [0, 0, 0], { rough: 0.8 });
  }
  deco(b, [half * 2 + 1.2, 0.06, 0.28], [0, 0.045, z], 16777215, [0, 0, 0], { rough: 0.8 });
}
function buildBallSlot(b, z, laneHalf, opts = {}) {
  const slotH = opts.slotH ?? 0.78;
  const sideGap = opts.sideGap ?? 1.6;
  const wallH = opts.wallH ?? 2.4;
  const color = opts.color ?? 16747069;
  const D = 0.5;
  const wallHalf = laneHalf - sideGap;
  if (wallHalf <= 0.2) return;
  solid(
    b,
    [wallHalf * 2, wallH - slotH, D],
    [0, slotH + (wallH - slotH) / 2, z],
    color,
    [0, 0, 0],
    { rough: 0.45 }
  );
  for (const sx of [-1, 1]) {
    solid(b, [0.26, slotH, D * 1.1], [sx * wallHalf, slotH / 2, z], color, [0, 0, 0], { rough: 0.45 });
  }
  const bars = Math.max(2, Math.round(wallHalf));
  for (let i = 1; i < bars; i++) {
    const x = -wallHalf + wallHalf * 2 * i / bars;
    deco(b, [0.1, slotH, 0.1], [x, slotH / 2, z], 16765286, [0, 0, 0], { rough: 0.5 });
  }
  deco(b, [wallHalf * 2, 0.05, 1.6], [0, 0.04, z], 16765286, [0, 0, 0], { rough: 0.75 });
  for (const sx of [-1, 1]) {
    deco(
      b,
      [sideGap - 0.2, 0.05, 1.6],
      [sx * (laneHalf - sideGap / 2), 0.04, z],
      8121759,
      [0, 0, 0],
      { rough: 0.75 }
    );
  }
  const lipH = 0.42;
  for (const sx of [-1, 1]) {
    solid(
      b,
      [sideGap - 0.2, lipH, 0.36],
      [sx * (laneHalf - sideGap / 2), lipH / 2, z],
      4180362,
      [0, 0, 0],
      { rough: 0.6 }
    );
  }
}
function buildCloud(b, x, y, z, scale = 1) {
  const blobs = [
    [0, 0, 0, 1],
    [0.9, -0.15, 0.1, 0.72],
    [-0.95, -0.1, -0.1, 0.66],
    [0.35, 0.35, -0.2, 0.62],
    [-0.4, 0.28, 0.25, 0.55]
  ];
  for (const [dx, dy, dz, r] of blobs) {
    const m = put(
      b,
      sphGeo(r * scale, 14),
      toyMat(GR.cloud, { rough: 1, metal: 0 }),
      [x + dx * scale, y + dy * scale, z + dz * scale],
      [0, 0, 0],
      false
    );
    m.receiveShadow = false;
  }
}
function buildBalloon(b, x, y, z, color, scale = 1) {
  const m = put(
    b,
    sphGeo(0.42 * scale, 16),
    toyMat(color, { rough: 0.3 }),
    [x, y, z],
    [0, 0, 0],
    false
  );
  m.scale.set(1, 1.18, 1);
  put(
    b,
    cylGeo(0.07 * scale, 0.02 * scale, 0.16 * scale),
    toyMat(color, { rough: 0.4 }),
    [x, y - 0.5 * scale, z],
    [0, 0, 0],
    false
  );
  const str = put(
    b,
    cylGeo(0.015, 0.015, 1.6 * scale),
    toyMat(16777215, { rough: 0.9 }),
    [x, y - 1.38 * scale, z],
    [0, 0, 0],
    false
  );
  str.receiveShadow = false;
}
var C, geoCache, matCache, GR, signCache;
var init_mapkit = __esm({
  "client/src/mapkit.ts"() {
    "use strict";
    C = {
      // 바닥 / 벽
      floorA: 16181192,
      floorB: 15126433,
      floorRim: 14268292,
      wall: 15921126,
      wallTrim: 16777215,
      baseboard: 14209730,
      // 나무
      wood: 13208402,
      woodDark: 10249015,
      woodLight: 14725507,
      // 패브릭
      fabricA: 7321576,
      // 소파 파랑
      fabricB: 16748410,
      // 안락의자 코랄
      fabricC: 11067552,
      // 민트
      fabricD: 16765286,
      // 노랑
      rugA: 15695252,
      rugB: 9426633,
      rugC: 16762719,
      // 소품
      metal: 14673646,
      metalDark: 9411499,
      leaf: 5226346,
      leafDark: 3118416,
      pot: 14715738,
      screen: 1911354,
      lampGlow: 16773312,
      crateA: 14721072,
      crateB: 13658672,
      crateC: 6800096,
      crateD: 10194672,
      crateE: 15760040,
      crateF: 8050336
    };
    geoCache = /* @__PURE__ */ new Map();
    matCache = /* @__PURE__ */ new Map();
    GR = {
      laneA: 9430015,
      // 코스 바닥 줄무늬 A (하늘색)
      laneB: 11989247,
      // 줄무늬 B
      laneEdge: 5227511,
      // 가장자리 띠
      fence: 16748487,
      // 펜스 본체 (핑크)
      fenceTop: 16765286,
      // 펜스 윗 파이프 (노랑)
      post: 10185983,
      // 기둥 (보라)
      start: 8121759,
      // 출발 구역
      finish: 16765286,
      // 도착 구역
      skirt: 7259903,
      // 코스 아랫면 (하늘에 떠 있는 느낌)
      cloud: 16777215,
      balloon: [16739210, 16765286, 8121759, 6607615, 12882175, 16752488]
    };
    signCache = /* @__PURE__ */ new Map();
  }
});

// client/src/maps.ts
var maps_exports = {};
__export(maps_exports, {
  BALL_ID: () => BALL_ID,
  GOAL_HALF_W: () => GOAL_HALF_W,
  HAZARD_ID0: () => HAZARD_ID0,
  LEGACY_MAPS: () => LEGACY_MAPS,
  MAPS: () => MAPS,
  PROP_HEAVY_MASS: () => PROP_HEAVY_MASS,
  TUTORIAL_PADS: () => TUTORIAL_PADS,
  TUTORIAL_PAD_HALF: () => TUTORIAL_PAD_HALF
});
import * as THREE2 from "three";
function buildHouse({ b, addProp, addBall }) {
  const H = 3, T = 0.6, S = 15;
  solid(b, [S * 2, H, T], [0, H / 2, -S], C.wall, [0, 0, 0], { rough: 0.75 });
  solid(b, [S * 2, H, T], [0, H / 2, S], C.wall, [0, 0, 0], { rough: 0.75 });
  solid(b, [T, H, S * 2], [-S, H / 2, 0], C.wall, [0, 0, 0], { rough: 0.75 });
  solid(b, [T, H, S * 2], [S, H / 2, 0], C.wall, [0, 0, 0], { rough: 0.75 });
  for (const p of [[0, 0.11, -14.62], [0, 0.11, 14.62]]) {
    deco(b, [29.4, 0.22, 0.1], p, C.baseboard, [0, 0, 0], { rough: 0.7 });
  }
  for (const p of [[-14.62, 0.11, 0], [14.62, 0.11, 0]]) {
    deco(b, [0.1, 0.22, 29.4], p, C.baseboard, [0, 0, 0], { rough: 0.7 });
  }
  for (const p of [[0, 2.86, -14.66], [0, 2.86, 14.66]]) {
    deco(b, [29.4, 0.28, 0.14], p, C.wallTrim, [0, 0, 0], { rough: 0.7 });
  }
  for (const p of [[-14.66, 2.86, 0], [14.66, 2.86, 0]]) {
    deco(b, [0.14, 0.28, 29.4], p, C.wallTrim, [0, 0, 0], { rough: 0.7 });
  }
  buildWallpaper(b, "z", -14.7, 14086370, 9425078);
  buildWallpaper(b, "z", 14.7, 16770771, 16233615);
  buildWallpaper(b, "x", -14.7, 15327995, 11774182);
  buildWallpaper(b, "x", 14.7, 14478587, 9880808);
  buildWindow(b, [-11.5, 1.9, -14.66], 0, 2, 1.4);
  buildWindow(b, [11, 1.9, -14.66], 0, 2, 1.4);
  buildWindow(b, [-4, 1.9, 14.66], Math.PI, 2, 1.4);
  buildWindow(b, [6, 1.9, 14.66], Math.PI, 2, 1.4);
  buildWindow(b, [14.66, 1.9, 1.5], -Math.PI / 2, 2.2, 1.4);
  buildWindow(b, [-14.66, 1.9, 2.6], Math.PI / 2, 2, 1.4);
  buildPicture(b, [-14.62, 1.95, 9.5], Math.PI / 2, C.crateE, 0.9, 0.7);
  buildPicture(b, [-14.62, 1.95, 11.3], Math.PI / 2, C.crateC, 0.7, 0.9);
  buildPicture(b, [-14.62, 0.78, 10.4], Math.PI / 2, C.fabricD, 0.6, 0.5);
  buildPicture(b, [2.5, 2.05, -14.62], 0, C.crateF, 1.1, 0.8);
  buildPicture(b, [11.5, 2.05, 14.62], Math.PI, C.crateD, 1, 0.7);
  buildPicture(b, [9, 2.05, 14.62], Math.PI, C.fabricC, 0.7, 0.9);
  buildClock(b, [0, 2.2, -14.62], 0);
  buildBoard(b, [14.62, 1.95, -12.2], -Math.PI / 2);
  buildSconce(b, [-14.62, 1.6, 6], Math.PI / 2);
  buildSconce(b, [-14.62, 1.6, 13], Math.PI / 2);
  buildSconce(b, [14.62, 1.6, 6.5], -Math.PI / 2);
  buildSconce(b, [-1.5, 1.6, 14.62], Math.PI);
  solid(b, [8, 0.5, 6], [-7, 1.1, -6], C.wood, [0, 0, 0.28], { rough: 0.65 });
  const RAMP_TILT = 0.28;
  const rampY = (x) => 1.1 + (x + 7) * Math.tan(RAMP_TILT);
  for (const rz of [-3.15, -8.85]) {
    deco(b, [8.1, 0.16, 0.36], [-7, 1.36, rz], C.fabricD, [0, 0, RAMP_TILT], { rough: 0.6 });
  }
  for (let i = -3; i <= 3; i++) {
    const rx = -7 + i * 1.05;
    deco(b, [0.3, 0.06, 5.2], [rx, rampY(rx) + 0.26, -6], C.woodDark, [0, 0, RAMP_TILT], { rough: 0.8 });
  }
  for (const rx of [-7.6, -4.6]) {
    const under = rampY(rx) - 0.28 / Math.cos(RAMP_TILT);
    for (const rz of [-3.6, -8.4]) {
      deco(b, [0.26, under, 0.26], [rx, under / 2, rz], C.woodDark, [0, 0, 0], { rough: 0.7 });
    }
    deco(b, [0.2, 0.2, 5], [rx, under - 0.1, -6], C.woodDark, [0, 0, 0], { rough: 0.7 });
  }
  buildRug(b, 9.6, 9.8, 6.4, 4.8, 0, C.rugA, 16773362);
  buildSofa(b, 9.6, 13, Math.PI, C.fabricA);
  buildTable(b, 9.6, 9.9, 0, 1.5, 0.85, 0.44, C.woodLight);
  buildArmchair(b, 13.2, 9.6, -Math.PI / 2, C.fabricB);
  buildArmchair(b, 6.1, 9.6, Math.PI / 2, C.fabricC);
  buildTV(b, 9.6, 6.3, 0);
  buildLamp(b, 13.4, 12.9);
  buildPlant(b, 6, 13.6, 1.15, 11);
  buildPlant(b, 13.6, 6.4, 0.9, 12);
  buildBeanbag(b, 6.6, 11.6, C.crateD);
  buildBench(b, 12.6, 5.2, Math.PI / 2, C.crateF);
  buildBoxStack(b, 13.4, 8, 0.3, 501);
  buildRug(b, -9.4, 8.4, 4.6, 3.4, 0, C.rugB, 15399669);
  buildBed(b, -11.6, 11.6, 0);
  buildNightstand(b, -13.6, 9.6, Math.PI / 2);
  buildNightstand(b, -13.6, 13.6, Math.PI / 2);
  buildDresser(b, -7.4, 13.8, Math.PI);
  buildPlant(b, -13.8, 6.6, 1, 21);
  buildLamp(b, -6.4, 9.6);
  buildCoatRack(b, -13.4, 5);
  buildBench(b, -9.4, 13.9, 0, C.fabricC);
  buildBoxStack(b, -5.4, 12.4, -0.4, 502);
  buildBeanbag(b, -8, 9.4, C.fabricB);
  buildShelf(b, 14, -6.4, -Math.PI / 2, 101);
  buildShelf(b, 14, -8.1, -Math.PI / 2, 202);
  buildShelf(b, 14, -9.8, -Math.PI / 2, 303);
  buildRug(b, 10.6, -8.6, 4.2, 3.2, 0, C.rugC, 16774880);
  buildTable(b, 10.4, -12.4, 0, 2, 1, 0.76, C.wood);
  buildChair(b, 10.4, -11.2, Math.PI, C.wood, C.crateC);
  buildChair(b, 12.4, -12.4, -Math.PI / 2, C.wood, C.crateE);
  buildPlant(b, 13.8, -13.6, 1.2, 33);
  buildBarrel(b, 7, -13.6, C.crateB);
  buildBarrel(b, 7.9, -13.9, C.crateA);
  buildBarrel(b, 7.3, -12.7, C.crateF);
  buildShelf(b, 5.4, -10, Math.PI / 2, 404);
  buildBoxStack(b, 12.6, -3.4, 0.6, 503);
  buildBench(b, 8.4, -8.6, 0, C.crateD);
  buildPlant(b, 5.6, -5.2, 0.95, 34);
  buildCounter(b, -3.4, -14.3, 0, 4.2);
  buildStove(b, -0.7, -14.3, 0);
  buildSink(b, -6.6, -14.3, 0);
  for (const cx of [-6.6, -4.2, -1.8]) {
    deco(b, [2.2, 0.9, 0.4], [cx, 2.1, -14.42], 15331059, [0, 0, 0], { rough: 0.45 });
    deco(b, [1, 0.03, 0.03], [cx, 1.68, -14.2], C.metalDark, [0, 0, 0], { rough: 0.3, metal: 0.6 });
  }
  buildTable(b, -8.8, -12.2, 0, 1.4, 0.9, 0.76, C.woodLight);
  buildChair(b, -8.8, -10.9, Math.PI, C.woodLight, C.crateF);
  decoCyl(b, 0.17, 0.17, 0.22, [-1.9, 1.05, -14.2], C.metal, [0, 0, 0], { rough: 0.25, metal: 0.6 });
  decoCyl(b, 0.18, 0.18, 0.03, [-1.9, 1.17, -14.2], C.metalDark, [0, 0, 0], { rough: 0.3, metal: 0.6 });
  decoCyl(b, 0.2, 0.16, 0.12, [-3.6, 1, -14.2], C.crateE, [0, 0, 0], { rough: 0.4 });
  for (const [fx, fc] of [[-3.7, C.crateA], [-3.5, C.leaf], [-3.6, C.crateB]]) {
    decoSph(b, 0.075, [fx, 1.09, -14.18], fc, [1, 1, 1], { rough: 0.6 });
  }
  deco(b, [0.24, 0.3, 0.18], [-4.9, 1.09, -14.25], C.crateC, [0, 0.3, 0], { rough: 0.4 });
  buildBoxStack(b, -1.6, -12.4, 0.2, 504);
  buildCone(b, -6, -11.2);
  buildCone(b, -5.4, -10.6);
  buildRug(b, 0, 11.8, 4.6, 3.6, 0, 8368857, 15332091);
  buildTable(b, 0, 11.8, 0, 2.2, 1.2, 0.76, C.wood);
  buildChair(b, -1.5, 11.8, -Math.PI / 2, C.wood, C.crateA);
  buildChair(b, 1.5, 11.8, Math.PI / 2, C.wood, C.crateC);
  buildChair(b, 0, 10.3, Math.PI, C.wood, C.crateE);
  buildChair(b, 0, 13.3, 0, C.wood, C.crateF);
  decoCyl(b, 0.16, 0.12, 0.3, [0, 0.92, 11.8], C.crateC, [0, 0, 0], { rough: 0.35 });
  decoSph(b, 0.12, [0, 1.14, 11.8], C.crateE, [1, 1, 1], { rough: 0.6 });
  decoSph(b, 0.1, [0.17, 1.1, 11.9], C.fabricD, [1, 1, 1], { rough: 0.6 });
  buildStairs(b, -12.5, -10.4, 0, 5, 2.6, 0.34, 0.62);
  solid(b, [3, 1.7, 2.6], [-12.5, 0.85, -13.4], C.crateD, [0, 0, 0], { rough: 0.45 });
  solid(b, [1.4, 0.55, 1.4], [-4.6, 0.28, -12.6], C.crateC, [0, 0, 0], { rough: 0.45 });
  solid(b, [1.4, 1.05, 1.4], [-6.4, 0.53, -13.4], C.crateE, [0, 0, 0], { rough: 0.45 });
  solid(b, [1.4, 1.55, 1.4], [-8.2, 0.78, -12.4], C.crateF, [0, 0, 0], { rough: 0.45 });
  solid(b, [2.4, 0.35, 2.4], [-3, 0.18, -10.4], C.fabricD, [0, 0, 0], { rough: 0.45 });
  buildPillar(b, -13.3, -3.2, 3);
  buildPillar(b, -13.3, 1.2, 3);
  buildBarrel(b, -10, -0.6, C.crateA);
  buildBarrel(b, -10.9, -1.2, C.crateD);
  buildPlant(b, -13.6, -1, 0.85, 44);
  buildCone(b, -3.4, -8.4);
  buildCone(b, -2.4, -8.9);
  buildBoxStack(b, -14, -6.6, 0.5, 505);
  buildBench(b, -10.6, -12, Math.PI / 2, C.crateE);
  for (let i = 0; i < 4; i++) {
    const h = 0.3 + i * 0.22;
    solid(
      b,
      [0.9, h, 0.9],
      [1.2 + i * 1.25, h / 2, -11.4 - i * 0.45],
      [C.crateC, C.crateE, C.crateD, C.crateF][i],
      [0, i * 0.3, 0],
      { rough: 0.45 }
    );
  }
  buildRug(b, 0, 3.2, 5, 3.6, 0, 10473654, 15858678);
  buildPillar(b, 13.2, 2.6, 3);
  buildPlant(b, 4.8, -2.4, 0.8, 55);
  buildPlant(b, 12.4, 12.6, 0.75, 66);
  buildPlant(b, -4.6, 6.4, 0.9, 77);
  buildBarrel(b, 13.9, 4.6, C.crateF);
  buildCone(b, 4.4, 5.6);
  solid(b, [0.9, 0.9, 0.9], [-13.9, 0.45, 4.4], C.crateD, [0, 0, 0], { rough: 0.45 });
  solid(b, [0.9, 0.6, 0.9], [-13.9, 1.2, 4.4], C.crateE, [0, 0, 0], { rough: 0.45 });
  addProp(1, [0.8, 0.8, 0.8], [3, 0.4, 2], C.crateA, 4, 1.6, crateTrim(0.8, 0.12));
  addProp(2, [0.8, 0.8, 0.8], [5, 0.4, -1], C.crateB, 4, 1.6, crateTrim(0.8, 0.12));
  addProp(
    3,
    [1.2, 2.2, 1],
    [0, 1.1, -4],
    15922680,
    PROP_HEAVY_MASS,
    2.4,
    (g) => {
      const seam = new THREE2.Mesh(boxGeo(1.22, 0.05, 1.02), toyMat(C.metalDark, { rough: 0.4, metal: 0.5 }));
      seam.position.y = 0.42;
      g.add(seam);
      for (const y of [0.75, -0.15]) {
        const h = new THREE2.Mesh(cylGeo(0.035, 0.035, 0.5), toyMat(C.metalDark, { rough: 0.3, metal: 0.7 }));
        h.position.set(0.42, y, 0.53);
        h.castShadow = true;
        g.add(h);
      }
    },
    { rough: 0.35, metal: 0.15 }
  );
  addProp(4, [0.7, 0.7, 0.7], [6.4, 0.35, 3.6], C.crateC, 4, 1.5, crateTrim(0.7, 0.1));
  addProp(5, [0.6, 0.6, 0.6], [6.9, 0.3, 4.8], C.crateD, 4, 1.4, crateTrim(0.6, 0.09));
  addProp(6, [0.6, 0.6, 0.6], [6.9, 0.9, 4.8], C.crateE, 4, 1.4, crateTrim(0.6, 0.09));
  addProp(7, [1.5, 0.2, 0.42], [-5.2, 0.1, 2.4], C.woodLight, 4, 1.6);
  addProp(8, [1.5, 0.2, 0.42], [-5.16, 0.3, 2.46], C.wood, 4, 1.6);
  addProp(9, [0.95, 0.62, 0.34], [-8.9, 0.31, 7.6], C.crateE, 4, 1.5, (g) => {
    const h = new THREE2.Mesh(cylGeo(0.03, 0.03, 0.34), toyMat(C.woodDark, { rough: 0.5 }));
    h.rotation.z = Math.PI / 2;
    h.position.y = 0.36;
    g.add(h);
    for (const sx of [-1, 1]) {
      const s2 = new THREE2.Mesh(boxGeo(0.09, 0.64, 0.36), toyMat(C.metalDark, { rough: 0.4, metal: 0.5 }));
      s2.position.x = sx * 0.3;
      g.add(s2);
    }
  });
  addProp(10, [0.62, 0.42, 0.36], [8.6, 0.21, -5.6], C.crateF, 4, 1.4, (g) => {
    const lid = new THREE2.Mesh(boxGeo(0.66, 0.08, 0.4), toyMat(C.metalDark, { rough: 0.4, metal: 0.4 }));
    lid.position.y = 0.2;
    g.add(lid);
  });
  addProp(11, [0.46, 0.5, 0.62], [11.6, 0.25, -9.4], C.crateD, 4, 1.4, (g) => {
    let y = -0.17;
    for (const col of [15691628, 6013163, 16172115, 9095462]) {
      const m = new THREE2.Mesh(boxGeo(0.44, 0.1, 0.6), toyMat(col, { rough: 0.78 }));
      m.position.y = y;
      m.rotation.y = y * 2 % 0.25;
      m.castShadow = true;
      g.add(m);
      y += 0.115;
    }
  }, { rough: 0.78 });
  addProp(12, [0.9, 0.72, 0.9], [-2.6, 0.36, -9.6], C.crateA, 4, 1.7, crateTrim(0.9, 0.13));
  addProp(13, [0.75, 0.75, 0.75], [-9.6, 0.375, -7], C.crateC, 4, 1.6, crateTrim(0.75, 0.11));
  addProp(14, [0.75, 0.75, 0.75], [-10.6, 0.375, -8.3], C.crateF, 4, 1.6, crateTrim(0.75, 0.11));
  addProp(15, [1, 0.34, 1], [2.6, 0.17, 8.6], C.fabricD, 4, 1.8, void 0, { rough: 0.95, metal: 0 });
  addProp(16, [1, 0.34, 1], [2.64, 0.51, 8.64], C.fabricB, 4, 1.8, void 0, { rough: 0.95, metal: 0 });
  addProp(17, [0.5, 1.1, 0.5], [13, 0.55, 13.2], C.crateE, 4, 1.6, (g) => {
    const leaf = new THREE2.Mesh(sphGeo(0.36), toyMat(C.leaf, { rough: 0.7, metal: 0 }));
    leaf.position.y = 0.72;
    leaf.scale.set(1, 0.8, 1);
    leaf.castShadow = true;
    g.add(leaf);
  });
  addProp(18, [0.55, 0.55, 0.55], [-12.6, 1.98, -13.9], C.crateB, 4, 1.4, crateTrim(0.55, 0.09));
  addProp(19, [0.66, 0.66, 0.66], [-13, 0.33, 1.6], C.crateE, 4, 1.5, crateTrim(0.66, 0.1));
  addProp(20, [0.66, 0.66, 0.66], [-12.4, 0.33, 0.6], C.crateF, 4, 1.5, crateTrim(0.66, 0.1));
  addProp(21, [0.9, 0.28, 0.6], [11.2, 0.14, 3.4], C.crateC, 4, 1.5, (g) => {
    for (const sx of [-1, 1]) {
      const lip = new THREE2.Mesh(boxGeo(0.06, 0.22, 0.62), toyMat(C.crateD, { rough: 0.45 }));
      lip.position.set(sx * 0.44, 0.06, 0);
      g.add(lip);
    }
  });
  addProp(22, [0.44, 0.62, 0.44], [-0.9, 0.31, 6.4], C.metal, 4, 1.4, (g) => {
    const rim = new THREE2.Mesh(cylGeo(0.3, 0.3, 0.07), toyMat(C.metalDark, { rough: 0.3, metal: 0.6 }));
    rim.position.y = 0.32;
    rim.castShadow = true;
    g.add(rim);
    const handle = new THREE2.Mesh(cylGeo(0.022, 0.022, 0.6), toyMat(C.metalDark, { rough: 0.3, metal: 0.7 }));
    handle.rotation.z = Math.PI / 2;
    handle.position.y = 0.42;
    g.add(handle);
  }, { rough: 0.3, metal: 0.45 });
  addProp(23, [0.38, 0.9, 0.38], [-2.2, 0.45, -13], C.crateD, 4, 1.5, (g) => {
    const band = new THREE2.Mesh(boxGeo(0.4, 0.16, 0.4), toyMat(16774102, { rough: 0.5 }));
    band.position.y = 0.12;
    g.add(band);
  });
  addProp(24, [1.15, 0.26, 0.7], [9.4, 0.13, -3.2], C.woodLight, 4, 1.7, (g) => {
    const b2 = new THREE2.Mesh(boxGeo(1.1, 0.2, 0.62), toyMat(C.wood, { rough: 0.7 }));
    b2.position.set(0.04, 0.23, 0.03);
    b2.rotation.y = 0.09;
    b2.castShadow = true;
    g.add(b2);
  }, { rough: 0.7 });
  addProp(25, [0.7, 0.7, 0.7], [-6, 0.35, 5.6], C.crateA, 4, 1.5, crateTrim(0.7, 0.1));
  addProp(26, [0.52, 0.52, 0.52], [-6.02, 0.96, 5.57], C.crateC, 4, 1.4, crateTrim(0.52, 0.08));
  addBall(BALL_ID, 0.3, [0, 0.31, 3.5]);
}
function buildWarehouse({ b, addProp, addBall }) {
  const H = 4.2, T = 0.6, S = 17;
  for (const [sz, p] of [
    [[S * 2, H, T], [0, H / 2, -S]],
    [[S * 2, H, T], [0, H / 2, S]],
    [[T, H, S * 2], [-S, H / 2, 0]],
    [[T, H, S * 2], [S, H / 2, 0]]
  ]) solid(b, sz, p, 12172999, [0, 0, 0], { rough: 0.9 });
  for (const [sz, p] of [
    [[S * 2 - 0.3, 1.1, 0.08], [0, 0.55, -S + 0.34]],
    [[S * 2 - 0.3, 1.1, 0.08], [0, 0.55, S - 0.34]],
    [[0.08, 1.1, S * 2 - 0.3], [-S + 0.34, 0.55, 0]],
    [[0.08, 1.1, S * 2 - 0.3], [S - 0.34, 0.55, 0]]
  ]) deco(b, sz, p, 7305349, [0, 0, 0], { rough: 0.8 });
  for (let x = -14; x <= 14; x += 7) {
    deco(b, [0.28, 0.28, S * 2 - 1], [x, 4.05, 0], 9344931, [0, 0, 0], { rough: 0.6, metal: 0.35 });
  }
  for (let z = -13.5; z <= 13.5; z += 4.5) {
    deco(b, [S * 2 - 1, 0.2, 0.2], [0, 4.2, z], 9344931, [0, 0, 0], { rough: 0.6, metal: 0.35 });
  }
  for (const x of [-9, 0, 9]) {
    buildWindow(b, [x, 3.1, -S + 0.32], 0, 2.6, 1.5);
    buildWindow(b, [x, 3.1, S - 0.32], Math.PI, 2.6, 1.5);
  }
  for (const z of [-11, -5.5]) {
    for (const x of [-12, -7.5]) buildShelf(b, x, z, 0, x * 7 + z);
  }
  for (const z of [5.5, 11]) {
    for (const x of [7.5, 12]) buildShelf(b, x, z, Math.PI, x * 5 + z);
  }
  const pallet = (x, z, h) => {
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
  for (const [x, z] of [[-13, 2], [-13, 3.4], [-11.6, 2.7], [13.5, -8], [13.5, -6.6]]) {
    buildBarrel(b, x, z, C.crateF);
  }
  buildPillar(b, 0, -14.5, 4.2);
  buildPillar(b, 0, 14.5, 4.2);
  for (const [x, z] of [[5, -11], [6.4, -11], [-9, 12], [-7.6, 12]]) {
    buildCone(b, x, z);
  }
  buildStairs(b, 14.2, 4.5, -Math.PI / 2, 4, 2.6, 0.3, 0.7);
  for (const z of [-3, 3]) deco(b, [S * 2 - 2, 0.02, 0.16], [0, 0.012, z], 15783503, [0, 0, 0], { rough: 0.9 });
  addProp(
    3,
    [1.1, 1.5, 0.9],
    [-11.5, 0.75, -13.5],
    14241597,
    PROP_HEAVY_MASS,
    2.2,
    (g) => {
      const lid = new THREE2.Mesh(boxGeo(1.14, 0.12, 0.94), toyMat(9383714, { rough: 0.4 }));
      lid.position.y = 0.7;
      g.add(lid);
      const latch = new THREE2.Mesh(boxGeo(0.22, 0.26, 0.06), toyMat(C.metalDark, { rough: 0.3, metal: 0.7 }));
      latch.position.set(0, 0.5, 0.48);
      g.add(latch);
      for (const sx of [-1, 1]) {
        const handle = new THREE2.Mesh(cylGeo(0.04, 0.04, 0.34), toyMat(C.metalDark, { rough: 0.3, metal: 0.7 }));
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
    const band = new THREE2.Mesh(boxGeo(0.54, 0.14, 0.54), toyMat(16774102, { rough: 0.5 }));
    band.position.y = 0.2;
    g.add(band);
  });
  addProp(10, [0.85, 0.5, 0.85], [-13.5, 0.25, 9], C.crateD, 4, 1.5);
  addBall(BALL_ID, 0.3, [-11, 0.31, -7]);
}
function buildRooftop({ b, addProp, addBall }) {
  const S = 16;
  const railH = 1.05;
  for (const [sz, p] of [
    [[S * 2, railH, 0.4], [0, railH / 2, -S]],
    [[S * 2, railH, 0.4], [0, railH / 2, S]],
    [[0.4, railH, S * 2], [-S, railH / 2, 0]],
    [[0.4, railH, S * 2], [S, railH / 2, 0]]
  ]) solid(b, sz, p, 14209732, [0, 0, 0], { rough: 0.85 });
  for (const [sz, p] of [
    [[S * 2, 0.1, 0.1], [0, railH + 0.06, -S]],
    [[S * 2, 0.1, 0.1], [0, railH + 0.06, S]],
    [[0.1, 0.1, S * 2], [-S, railH + 0.06, 0]],
    [[0.1, 0.1, S * 2], [S, railH + 0.06, 0]]
  ]) deco(b, sz, p, C.metalDark, [0, 0, 0], { rough: 0.4, metal: 0.6 });
  solid(b, [4.4, 2.8, 3.6], [-12, 1.4, 12], 15196112, [0, 0, 0], { rough: 0.8 });
  solid(b, [4.8, 0.25, 4], [-12, 2.9, 12], 12167567, [0, 0, 0], { rough: 0.85 });
  deco(b, [1, 1.9, 0.12], [-12, 0.95, 10.15], C.metalDark, [0, 0, 0], { rough: 0.5, metal: 0.4 });
  const acUnit = (x, z, rotY) => {
    const t = at(x, z, rotY);
    const R = [0, rotY, 0];
    solid(b, [1.8, 1.1, 1.1], t(0, 0.55, 0), 13225170, R, { rough: 0.55, metal: 0.25 });
    deco(b, [1.5, 0.06, 0.9], t(0, 1.14, 0), 10133672, R, { rough: 0.5, metal: 0.3 });
    for (const sx of [-1, 1]) {
      decoCyl(b, 0.34, 0.34, 0.08, t(sx * 0.42, 1.16, 0), 8225676, R, { rough: 0.4, metal: 0.5 });
    }
  };
  acUnit(-4, -9, 0);
  acUnit(-4, -6.6, 0);
  acUnit(6.5, 4, Math.PI / 2);
  acUnit(6.5, 6.4, Math.PI / 2);
  acUnit(0.5, 11, 0);
  for (const [x, z, r] of [[10, -10, 0.7], [12.4, -10, 0.55], [-9, 3, 0.65], [3, -2.5, 0.6]]) {
    solidCyl(b, r, 1.2, [x, 0.6, z], 11120824, [0, 0, 0], { rough: 0.5, metal: 0.35 });
    decoCyl(b, r * 1.25, r * 1.25, 0.16, [x, 1.28, z], 8686741, [0, 0, 0], { rough: 0.45, metal: 0.5 });
  }
  solidCyl(b, 1.5, 2.2, [13, 1.1, 12], 9414852, [0, 0, 0], { rough: 0.6, metal: 0.2 });
  for (const [dx, dz] of [[-1, -1], [1, -1], [-1, 1], [1, 1]]) {
    solidCyl(b, 0.12, 0.9, [13 + dx * 1.1, 0.45, 12 + dz * 1.1], C.metalDark, [0, 0, 0], { rough: 0.4, metal: 0.6 });
  }
  for (let z = -14; z <= 14; z += 4) {
    deco(b, [S * 2 - 1, 0.02, 0.1], [0, 0.012, z], 13485494, [0, 0, 0], { rough: 0.95 });
  }
  decoCyl(b, 0.35, 0.35, 0.04, [-14, 0.02, -14], 7305349, [0, 0, 0], { rough: 0.6, metal: 0.4 });
  buildPlant(b, -13.5, -3, 1, 11);
  buildPlant(b, -13.5, -1.2, 0.85, 22);
  buildBench(b, -12, 3.5, Math.PI / 2, C.crateC);
  buildBench(b, -12, 6, Math.PI / 2, C.crateC);
  addProp(
    3,
    [1.3, 1.4, 1],
    [-13, 0.7, -13],
    12107462,
    PROP_HEAVY_MASS,
    2.2,
    (g) => {
      const grill = new THREE2.Mesh(boxGeo(1.34, 0.06, 1.04), toyMat(9146777, { rough: 0.45, metal: 0.4 }));
      grill.position.y = 0.62;
      g.add(grill);
      const fan = new THREE2.Mesh(cylGeo(0.42, 0.42, 0.1), toyMat(7304573, { rough: 0.35, metal: 0.6 }));
      fan.position.y = 0.68;
      g.add(fan);
      for (const sz of [-1, 1]) {
        const vent = new THREE2.Mesh(boxGeo(1.2, 0.72, 0.05), toyMat(10133672, { rough: 0.5, metal: 0.3 }));
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
function makeCourse(cfg) {
  return function build({ b, addBall, addHazard, addObstacle }) {
    const { startZ: START_Z, finishZ: FINISH_Z } = cfg;
    const rnd = rng(cfg.seed);
    function deck(z0, z1, half, color = GR.laneB) {
      const len = z0 - z1;
      const mid = (z0 + z1) / 2;
      solid(b, [half * 2, DECK_H, len], [0, -DECK_H / 2, mid], color, [0, 0, 0], { rough: 0.6 });
      for (let z = z1; z < z0; z += 4) {
        const w = Math.min(4, z0 - z);
        deco(b, [half * 2 - 0.4, 0.04, w * 0.5], [0, 0.02, z + w * 0.25], GR.laneA, [0, 0, 0], { rough: 0.75 });
      }
      for (const sx of [-1, 1]) {
        deco(b, [0.5, 0.06, len], [sx * (half - 0.25), 0.03, mid], GR.laneEdge, [0, 0, 0], { rough: 0.6 });
      }
      deco(b, [half * 2 + 0.5, 0.5, len], [0, -DECK_H - 0.2, mid], GR.skirt, [0, 0, 0], { rough: 0.7 });
    }
    function gate(z, color) {
      deco(b, [LANE_HALF * 2 - 0.6, 0.06, 0.7], [0, 0.045, z], color, [0, 0, 0], { rough: 0.7 });
      for (const sx of [-1, 1]) {
        decoCyl(b, 0.28, 0.28, 3.4, [sx * (LANE_HALF - 0.4), 1.7, z], color, [0, 0, 0], { rough: 0.45 });
      }
      deco(b, [LANE_HALF * 2, 0.32, 0.32], [0, 3.4, z], color, [0, 0, 0], { rough: 0.45 });
    }
    for (const [z0, z1, half] of cfg.sections) deck(z0, z1, half, GR.laneB);
    for (const [z, col] of cfg.gates) gate(z, col);
    const halfAt = (z) => {
      for (const [z0, z1, h] of cfg.sections) if (z <= z0 && z >= z1) return h;
      return LANE_HALF;
    };
    for (let z = START_Z - 8; z > FINISH_Z; z -= 26) {
      const half = halfAt(z);
      for (const sx of [-1, 1]) {
        decoCyl(b, 0.5, 0.34, 14, [sx * (half - 1), -DECK_H - 7.2, z], GR.post, [0, 0, 0], { rough: 0.6 });
      }
    }
    deco(b, [LANE_HALF * 2 - 0.6, 0.05, 11], [0, 0.035, START_Z - 5.5], GR.start, [0, 0, 0], { rough: 0.7 });
    deco(b, [LANE_HALF * 2 - 0.6, 0.05, 9], [0, 0.035, FINISH_Z + 4.5], GR.finish, [0, 0, 0], { rough: 0.7 });
    for (let i = 0; i < 14; i++) {
      const w = (LANE_HALF * 2 - 0.6) / 14;
      deco(
        b,
        [w, 0.06, 0.5],
        [-LANE_HALF + 0.3 + w * (i + 0.5), 0.045, FINISH_Z + 9],
        i % 2 ? 16777215 : 2830136,
        [0, 0, 0],
        { rough: 0.8 }
      );
    }
    deco(b, [LANE_HALF * 2 - 0.6, 0.06, 0.4], [0, 0.045, START_Z - 11.5], 16777215, [0, 0, 0], { rough: 0.8 });
    const SC_X = LANE_HALF + 3.2;
    const SC_HALF = 1.5;
    const SC_MOUTH = 1.6;
    function fenceRuns(z0, z1) {
      const holes = [];
      for (const [ez, xz] of cfg.shortcuts ?? []) {
        for (const mz of [ez, xz]) {
          const a = Math.min(z0, mz + SC_MOUTH), c = Math.max(z1, mz - SC_MOUTH);
          if (a > c) holes.push([a, c]);
        }
      }
      if (holes.length === 0) return [[z0, z1]];
      holes.sort((p, q) => q[0] - p[0]);
      const runs = [];
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
      solid(
        b,
        [SC_HALF * 2, DECK_H, len],
        [SC_X, -DECK_H / 2, (ez + xz) / 2],
        GR.laneB,
        [0, 0, 0],
        { rough: 0.6 }
      );
      for (const sx of [-1, 1]) {
        deco(
          b,
          [0.34, 0.07, len],
          [SC_X + sx * (SC_HALF - 0.17), 0.04, (ez + xz) / 2],
          16735603,
          [0, 0, 0],
          { rough: 0.7 }
        );
      }
      deco(
        b,
        [SC_HALF * 2 + 0.5, 0.5, len],
        [SC_X, -DECK_H - 0.2, (ez + xz) / 2],
        GR.skirt,
        [0, 0, 0],
        { rough: 0.7 }
      );
      for (const mz of [ez, xz]) {
        const gapMid = (LANE_HALF + SC_X - SC_HALF) / 2;
        const gapW = SC_X - SC_HALF - LANE_HALF;
        if (gapW > 0.05) {
          solid(
            b,
            [gapW, DECK_H, SC_MOUTH * 2],
            [gapMid, -DECK_H / 2, mz],
            GR.laneB,
            [0, 0, 0],
            { rough: 0.6 }
          );
        }
        deco(
          b,
          [gapW + 1.2, 0.06, 0.34],
          [gapMid, 0.045, mz + SC_MOUTH - 0.2],
          16765286,
          [0, 0, 0],
          { rough: 0.7 }
        );
        deco(
          b,
          [gapW + 1.2, 0.06, 0.34],
          [gapMid, 0.045, mz - SC_MOUTH + 0.2],
          16765286,
          [0, 0, 0],
          { rough: 0.7 }
        );
      }
      for (const [mz, dir] of [[ez, 1], [xz, -1]]) {
        solid(
          b,
          [SC_HALF * 2, 1.2, 0.4],
          [SC_X, 0.6, mz + dir * (SC_MOUTH + 0.2)],
          GR.fence,
          [0, 0, 0],
          { rough: 0.5 }
        );
        deco(
          b,
          [SC_HALF * 2, 0.14, 0.5],
          [SC_X, 1.27, mz + dir * (SC_MOUTH + 0.2)],
          16735603,
          [0, 0, 0],
          { rough: 0.4 }
        );
      }
      for (let z = ez - 6; z > xz; z -= 26) {
        decoCyl(b, 0.45, 0.3, 14, [SC_X, -DECK_H - 7.2, z], GR.post, [0, 0, 0], { rough: 0.6 });
      }
    }
    for (const [z0, z1, half] of cfg.sections) {
      if (half < LANE_HALF) {
        for (const z of [z0, z1]) {
          for (const sx of [-1, 1]) {
            decoCyl(b, 0.34, 0.34, 2.2, [sx * (LANE_HALF - 0.4), 1.1, z], 16765286, [0, 0, 0], { rough: 0.45 });
          }
        }
        for (const sx of [-1, 1]) {
          solid(
            b,
            [0.22, 0.42, z0 - z1],
            [sx * (half - 0.11), 0.21, (z0 + z1) / 2],
            16765286,
            [0, 0, 0],
            { rough: 0.6 }
          );
        }
        continue;
      }
      buildFence(b, -LANE_HALF, z0, z1);
      for (const [a, c] of fenceRuns(z0, z1)) buildFence(b, LANE_HALF, a, c);
    }
    for (const z of [START_Z, FINISH_Z]) {
      solid(b, [LANE_HALF * 2, 1.7, 0.4], [0, 0.85, z], GR.fence, [0, 0, 0], { rough: 0.5 });
      deco(b, [LANE_HALF * 2, 0.16, 0.5], [0, 1.78, z], GR.fenceTop, [0, 0, 0], { rough: 0.4 });
    }
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
        buildBalloon(b, sx * (halfAt(z) + 1.1), 3.2 + bi % 3 * 0.5, z, col, 1);
      }
    }
    cfg.hazards.forEach((z, i) => addHazard(HAZARD_ID0 + i, z, 2.2 + i * 1.15));
    let oid = OBSTACLE_ID0;
    for (const [kind, z, arg, phase] of cfg.obstacles) {
      addObstacle(oid++, kind, z, arg, phase);
      if (kind === "buttongate") {
        for (const sx of [-1, 1]) {
          const px = sx * OB.btnPadX, pz = z + OB.btnPadAhead;
          deco(
            b,
            [OB.btnPadHalf * 2, 0.06, OB.btnPadHalf * 2],
            [px, 0.045, pz],
            9133302,
            [0, 0, 0],
            { rough: 0.6 }
          );
          deco(
            b,
            [OB.btnPadHalf * 1.5, 0.09, OB.btnPadHalf * 1.5],
            [px, 0.07, pz],
            16765286,
            [0, 0, 0],
            { rough: 0.5 }
          );
          deco(
            b,
            [0.14, 0.05, OB.btnPadAhead],
            [px, 0.035, z + OB.btnPadAhead / 2],
            9133302,
            [0, 0, 0],
            { rough: 0.7 }
          );
        }
      }
    }
    for (const z of cfg.ballSlots ?? []) buildBallSlot(b, z, LANE_HALF);
    if (cfg.tutorial) {
      for (const [z, label, color] of TUTORIAL_PADS) {
        buildKeyPad(b, 0, z, 5.2, 4.2, label, color);
      }
    }
    buildGoalNet(b, FINISH_Z + 6, GOAL_HALF_W);
    addBall(BALL_ID, 0.3, [0, 0.31, START_Z - 11]);
  };
}
var PROP_HEAVY_MASS, BALL_ID, HAZARD_ID0, OBSTACLE_ID0, crateTrim, LANE_HALF, BRIDGE_HALF, DECK_H, GOAL_HALF_W, TUTORIAL_PADS, TUTORIAL_PAD_HALF, MAPS, LEGACY_MAPS;
var init_maps = __esm({
  "client/src/maps.ts"() {
    "use strict";
    init_obstacles();
    init_mapkit();
    PROP_HEAVY_MASS = 20;
    BALL_ID = 90;
    HAZARD_ID0 = 100;
    OBSTACLE_ID0 = 200;
    crateTrim = (s, band) => (g) => {
      const sizes = [
        [s * 1.02, band, s * 1.02],
        [band, s * 1.02, s * 1.02],
        [s * 1.02, s * 1.02, band]
      ];
      for (const sz of sizes) {
        const m = new THREE2.Mesh(boxGeo(sz[0], sz[1], sz[2]), toyMat(C.woodDark, { rough: 0.6 }));
        m.castShadow = true;
        g.add(m);
      }
    };
    LANE_HALF = 7;
    BRIDGE_HALF = 2.6;
    DECK_H = 1.2;
    GOAL_HALF_W = 4.2;
    TUTORIAL_PADS = [
      [6, "WASD", 4176112],
      [-1, "F", 15765823],
      [-6, "SHIFT", 10185983],
      [-11, "E", 4180362]
    ];
    TUTORIAL_PAD_HALF = 2.6;
    MAPS = [
      {
        id: "sky",
        name: "1. \uD558\uB298 \uCF54\uC2A4",
        blurb: "\uB4DC\uB9AC\uBE14\uC744 \uC775\uD78C\uB2E4",
        // [제한시간을 늘린 이유] 장애물이 늘면서 40초 자동 주행 테스트가 시간
        // 초과로 끝났다. 막혀서 기다리는 시간까지 감안하면 128m에 150초는 빠듯하다.
        timeLimit: 200,
        targetId: BALL_ID,
        targetName: "\uACF5",
        goal: { x: 0, z: -104, radius: 2.4, halfWidth: GOAL_HALF_W },
        spawns: [[-1.6, 10], [1.6, 10], [-3.6, 10], [3.6, 10]],
        botSpawns: [[3.2, -76]],
        // 공 전용 틈 (build 안의 ballSlots와 같은 값이어야 한다 - 위쪽은 자동
        // 플레이어의 우회 판정이, 아래쪽은 실제 지형이 이 값을 읽는다)
        ballSlots: [-52],
        floor: { size: 30, color: 9430015, outside: 10475775, hideOutside: true, hideFloor: true, noGround: true },
        fog: [12577279, 70, 210],
        build: makeCourse({
          startZ: 18,
          finishZ: -110,
          seed: 20260827,
          tutorial: true,
          sections: [[18, -12, LANE_HALF], [-12, -52, LANE_HALF], [-52, -110, LANE_HALF]],
          gates: [[-12, GR.laneEdge], [-52, 16747069]],
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
            ["buttongate", -8, 0, 0],
            ["popup", -20, -1, 0],
            ["spinner", -33, 4.2, 1],
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
            ["coopgate", -40, 0, 0],
            ["piston", -46, -1, 0.4],
            ["sweeper", -60, 0, 0],
            ["popup", -72, 1, 1.2],
            ["piston", -82, 1, 1.6]
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
          shortcuts: [[-56, -78]]
        })
      },
      {
        id: "canyon",
        name: "2. \uD68C\uC804 \uD611\uACE1",
        blurb: "\uACF5\uB9CC \uC9C0\uB098\uAC00\uB294 \uD2C8\uACFC \uC881\uC740 \uB2E4\uB9AC",
        timeLimit: 230,
        targetId: BALL_ID,
        targetName: "\uACF5",
        goal: { x: 0, z: -134, radius: 2.4, halfWidth: GOAL_HALF_W },
        spawns: [[-1.6, 10], [1.6, 10], [-3.6, 10], [3.6, 10]],
        botSpawns: [[3.2, -50], [-3.2, -112]],
        ballSlots: [-20, -104],
        floor: { size: 30, color: 16769202, outside: 16765088, hideOutside: true, hideFloor: true, noGround: true },
        fog: [16769728, 65, 200],
        build: makeCourse({
          startZ: 18,
          finishZ: -140,
          seed: 771133,
          sections: [[18, -10, LANE_HALF], [-10, -56, LANE_HALF], [-56, -96, BRIDGE_HALF], [-96, -140, LANE_HALF]],
          gates: [[-10, 16765286], [-56, 16747069], [-96, 8150271]],
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
            ["sweeper", -26, 0, 0],
            // 버튼 문 - 한 명이 발판을 밟고 있는 동안 다른 한 명이 공을 몰고 지난다
            ["buttongate", -36, 0, 0],
            ["spinner", -46, 4.4, 1.1],
            // 조합: 왼쪽에서 피스톤 + 오른쪽에서 팝업이 동시에
            ["piston", -52, -1, 0],
            ["popup", -52, 1, 0.9],
            // 협동 게이트 - 멀티에서만 닫혀 있다 (싱글은 자동으로 열린다).
            // 다리 한가운데지만 중앙에 서는 문이라 좁은 폭에서도 성립한다.
            ["coopgate", -70, 0, 0],
            ["popup", -98, 0, 0.7],
            // 마지막 조합 (골 -134 앞 18m는 비워 둔다)
            ["spinner", -110, 4.4, 0.5],
            ["piston", -113, 1, 1.4]
          ],
          // 지름길: 회전봉 + 피스톤/팝업 조합을 통째로 건너뛴다.
          // 버튼 문(-36)과 공 전용 틈(-20, -104)은 건너뛸 수 없는 자리에 남는다.
          shortcuts: [[-40, -56]]
        })
      },
      {
        id: "denof",
        name: "3. \uBD07 \uC18C\uAD74",
        blurb: "\uC154\uD130 \uD1B5\uB85C\uC640 \uBC29\uD574\uAFBC \uC14B",
        timeLimit: 260,
        targetId: BALL_ID,
        targetName: "\uACF5",
        goal: { x: 0, z: -154, radius: 2.4, halfWidth: GOAL_HALF_W },
        spawns: [[-1.6, 10], [1.6, 10], [-3.6, 10], [3.6, 10]],
        // 세 번째 봇은 클라이맥스(버튼 문 -114)에 맞춰 등장한다.
        // -130이면 이미 다 지난 뒤라 아무것도 안 하고 끝났다.
        botSpawns: [[3.4, -34], [-3.4, -86], [2.6, -108]],
        ballSlots: [-72],
        floor: { size: 30, color: 14272767, outside: 13219583, hideOutside: true, hideFloor: true, noGround: true },
        fog: [14208255, 60, 190],
        build: makeCourse({
          startZ: 18,
          finishZ: -160,
          seed: 424242,
          sections: [[18, -14, LANE_HALF], [-14, -60, LANE_HALF], [-60, -100, LANE_HALF], [-100, -160, LANE_HALF]],
          gates: [[-14, 8150271], [-60, 16747069], [-100, 16765286]],
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
            ["buttongate", -16, 0, 0],
            ["shutter", -24, -1, 0],
            ["shutter", -24, 1, 0],
            ["roller", -44, 0, 0],
            ["spinner", -54, 4.4, 0.8],
            ["coopgate", -66, 0, 0],
            // 조합: 좌우 피스톤이 시차를 두고 번갈아 나온다
            ["piston", -78, -1, 0],
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
            ["coopgate", -102, 0, 0],
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
            ["buttongate", -114, 0, 0],
            // 마지막 조합: 회전봉 아래에서 스위퍼까지 같이 읽어야 한다
            ["spinner", -120, 4.4, 0.3]
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
          shortcuts: [[-86, -100]]
        })
      }
    ];
    LEGACY_MAPS = [
      {
        id: "house",
        name: "\uC9D1",
        blurb: "\uAC70\uC2E4\uC744 \uAC00\uB85C\uC9C8\uB7EC \uD604\uAD00\uC73C\uB85C",
        timeLimit: 180,
        targetId: 3,
        targetName: "\uB0C9\uC7A5\uACE0",
        goal: { x: 13.4, z: -1, radius: 1.6 },
        spawns: [[-2, 5], [2, 5], [-2, 2], [2, 2]],
        floor: { size: 30, color: 16181192, outside: 8306794 },
        build: buildHouse
      },
      {
        id: "warehouse",
        name: "\uCC3D\uACE0",
        blurb: "\uC120\uBC18 \uC0AC\uC774\uB97C \uBE60\uC838\uB098\uAC00 \uC801\uC7AC\uC7A5\uC73C\uB85C",
        timeLimit: 165,
        targetId: 3,
        targetName: "\uACF5\uAD6C\uD568",
        // 목표가 -X/-Z 구석에서 출발해 +X/+Z 적재장까지 - 대각선 약 33m
        goal: { x: 13.5, z: 13, radius: 1.8 },
        spawns: [[-13, -10], [-10.5, -10], [-13, -7.5], [-10.5, -7.5]],
        floor: { size: 34, color: 14275526, outside: 7305349 },
        build: buildWarehouse
      },
      {
        id: "rooftop",
        name: "\uC625\uC0C1",
        blurb: "\uC2E4\uC678\uAE30\uB97C \uD654\uBB3C \uC2B9\uAC15\uAE30\uAE4C\uC9C0",
        timeLimit: 150,
        targetId: 3,
        targetName: "\uC2E4\uC678\uAE30",
        goal: { x: 13, z: 8.5, radius: 1.8 },
        spawns: [[-13.5, -10], [-11, -10], [-13.5, -7.5], [-11, -7.5]],
        floor: { size: 32, color: 14998733, outside: 10466505 },
        build: buildRooftop
      }
    ];
  }
});

// client/src/shapes.ts
import * as CANNON3 from "cannon-es";
function halfExtentsOf(body) {
  const shape = body.shapes[0];
  if (shape instanceof CANNON3.Box) return shape.halfExtents;
  if (shape instanceof CANNON3.Sphere) {
    const r2 = shape.radius;
    return new CANNON3.Vec3(r2, r2, r2);
  }
  const r = body.boundingRadius || 0.5;
  return new CANNON3.Vec3(r, r, r);
}
var init_shapes = __esm({
  "client/src/shapes.ts"() {
    "use strict";
  }
});

// client/src/game.ts
var game_exports = {};
__export(game_exports, {
  TARGET_ID: () => TARGET_ID,
  TARGET_NAME: () => TARGET_NAME,
  TIME_LIMIT: () => TIME_LIMIT,
  createGame: () => createGame
});
import * as THREE3 from "three";
function obj(word) {
  const last = word.charCodeAt(word.length - 1);
  const hasBatchim = last >= 44032 && last <= 55203 && (last - 44032) % 28 !== 0;
  return word + (hasBatchim ? "\uC744" : "\uB97C");
}
function fmtTime(sec) {
  const s = Math.max(0, Math.ceil(sec));
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
}
function overlayMat(color) {
  const m = new THREE3.MeshBasicMaterial({ color });
  m.depthTest = false;
  m.depthWrite = false;
  m.toneMapped = false;
  return m;
}
function createGame(world, hooks) {
  const { scene } = world;
  let markers = null;
  let outline = null;
  let pointer = null;
  let ring;
  let disc;
  let spinner;
  let goalPin;
  let goalX = 0, goalZ = 0, goalR = 1.6;
  let goalHalfW = 4;
  let prevBallZ = null;
  let crossed = false;
  let targetBody = null;
  let timeLimit = MAPS[0].timeLimit;
  let judging = true;
  function disposeTree(root) {
    root.traverse((o) => {
      const m = o;
      if (!m.isMesh) return;
      m.geometry.dispose();
      const mat = m.material;
      if (Array.isArray(mat)) for (const x of mat) x.dispose();
      else mat.dispose();
    });
  }
  function clearMarkers() {
    if (markers) {
      scene.remove(markers);
      disposeTree(markers);
      markers = null;
    }
    if (pointer) {
      scene.remove(pointer);
      disposeTree(pointer);
      pointer = null;
    }
    if (outline) {
      outline.removeFromParent();
      disposeTree(outline);
      outline = null;
    }
  }
  function buildMarkers() {
    clearMarkers();
    const def = world.map;
    goalX = def.goal.x;
    goalZ = def.goal.z;
    goalR = def.goal.radius;
    goalHalfW = def.goal.halfWidth ?? def.goal.radius * 2.4;
    prevBallZ = null;
    crossed = false;
    timeLimit = def.timeLimit;
    judging = def.judge !== false;
    elTimer.hidden = !judging;
    const target = world.objectById.get(def.targetId) ?? null;
    targetBody = target?.body ?? null;
    const g = new THREE3.Group();
    g.position.set(goalX, 0, goalZ);
    g.visible = judging;
    scene.add(g);
    markers = g;
    disc = new THREE3.Mesh(
      new THREE3.CircleGeometry(goalR, 48),
      new THREE3.MeshBasicMaterial({
        color: COL_GOAL,
        transparent: true,
        opacity: 0.18,
        depthWrite: false,
        toneMapped: false
      })
    );
    disc.rotation.x = -Math.PI / 2;
    disc.position.y = 0.015;
    g.add(disc);
    ring = new THREE3.Mesh(
      new THREE3.RingGeometry(goalR - 0.22, goalR, 64),
      new THREE3.MeshBasicMaterial({
        color: COL_GOAL,
        transparent: true,
        opacity: 0.85,
        depthWrite: false,
        toneMapped: false
      })
    );
    ring.rotation.x = -Math.PI / 2;
    ring.position.y = 0.02;
    g.add(ring);
    spinner = new THREE3.Group();
    spinner.rotation.x = -Math.PI / 2;
    spinner.position.y = 0.03;
    for (let i = 0; i < 6; i++) {
      spinner.add(new THREE3.Mesh(
        new THREE3.RingGeometry(goalR + 0.08, goalR + 0.3, 8, 1, i / 6 * Math.PI * 2, 0.55),
        new THREE3.MeshBasicMaterial({
          color: COL_GOAL,
          transparent: true,
          opacity: 0.7,
          depthWrite: false,
          toneMapped: false
        })
      ));
    }
    g.add(spinner);
    const pillar = new THREE3.Mesh(
      new THREE3.CylinderGeometry(goalR * 0.92, goalR, 2.8, 32, 1, true),
      new THREE3.MeshBasicMaterial({
        color: COL_GOAL,
        transparent: true,
        opacity: 0.1,
        side: THREE3.DoubleSide,
        depthWrite: false,
        toneMapped: false
      })
    );
    pillar.position.y = 1.4;
    g.add(pillar);
    const gateMat = new THREE3.MeshStandardMaterial({ color: 3123306, roughness: 0.5 });
    const GW = goalR * 1.45, GH = 2.6;
    for (const sz of [-1, 1]) {
      const post = new THREE3.Mesh(new THREE3.BoxGeometry(0.26, GH, 0.26), gateMat);
      post.position.set(0, GH / 2, sz * GW);
      post.castShadow = true;
      g.add(post);
    }
    const lintel = new THREE3.Mesh(new THREE3.BoxGeometry(0.26, 0.26, GW * 2 + 0.26), gateMat);
    lintel.position.set(0, GH + 0.13, 0);
    lintel.castShadow = true;
    g.add(lintel);
    goalPin = new THREE3.Mesh(new THREE3.OctahedronGeometry(0.34), overlayMat(COL_GOAL));
    goalPin.position.set(goalX, 3.5, goalZ);
    goalPin.renderOrder = 998;
    scene.add(goalPin);
    markers.add(goalPin);
    goalPin.position.set(0, 3.5, 0);
    pointer = new THREE3.Group();
    pointer.visible = false;
    pointer.renderOrder = 999;
    scene.add(pointer);
    if (target) {
      const h = halfExtentsOf(target.body);
      outline = new THREE3.Mesh(
        new THREE3.BoxGeometry(h.x * 2, h.y * 2, h.z * 2),
        new THREE3.MeshBasicMaterial({ color: COL_TARGET, side: THREE3.BackSide, toneMapped: false })
      );
      outline.scale.setScalar(1.05);
      target.mesh.add(outline);
      const shaft = new THREE3.Mesh(new THREE3.CylinderGeometry(0.09, 0.09, 0.42, 12), overlayMat(COL_TARGET));
      shaft.position.y = 0.42;
      const head = new THREE3.Mesh(new THREE3.ConeGeometry(0.26, 0.42, 14), overlayMat(COL_TARGET));
      head.rotation.z = Math.PI;
      pointer.add(shaft, head);
      for (const c of pointer.children) c.renderOrder = 999;
      pointer.visible = true;
    }
    elGoalText.textContent = !target ? `\uBAA9\uD45C \uC624\uBE0C\uC81D\uD2B8(id ${def.targetId})\uB97C \uCC3E\uC744 \uC218 \uC5C6\uB2E4` : judging ? `[${world.mapIndex + 1}/${world.mapCount}] ${def.name} \u2014 ${obj(def.targetName)} \uCD9C\uAD6C\uAE4C\uC9C0` : `${def.name} \u2014 ${def.blurb}`;
  }
  const elGoalText = document.getElementById("goal-text");
  const elTimer = document.getElementById("timer");
  const elDist = document.getElementById("goal-dist");
  const elResult = document.getElementById("result");
  const elResultTitle = document.getElementById("result-title");
  const elResultSub = document.getElementById("result-sub");
  const elRetry = document.getElementById("retry");
  const elNext = document.getElementById("next-map");
  elResult.hidden = true;
  let phase = "playing";
  let timeLeft = MAPS[0].timeLimit;
  let dwell = 0;
  let clearedAt = 0;
  let t = 0;
  let shownPhase = "playing";
  let shownMap = 0;
  let allCleared = false;
  buildMarkers();
  timeLeft = timeLimit;
  world.onMapLoaded(() => {
    buildMarkers();
    phase = "playing";
    timeLeft = timeLimit;
    dwell = 0;
    clearedAt = 0;
  });
  function checkCross() {
    if (!targetBody) return false;
    const z = targetBody.position.z;
    const prev = prevBallZ;
    prevBallZ = z;
    if (prev === null) return false;
    if (!(prev > goalZ && z <= goalZ)) return false;
    if (Math.abs(targetBody.position.x - goalX) > goalHalfW) return false;
    if (targetBody.position.y > GOAL_MAX_Y) return false;
    if (hooks.isBallCarried?.()) return false;
    return true;
  }
  function inGoal() {
    if (!targetBody) return false;
    if (targetBody.position.y > GOAL_MAX_Y) return false;
    const dx = targetBody.position.x - goalX;
    const dz = targetBody.position.z - goalZ;
    return Math.hypot(dx, dz) <= goalR;
  }
  function update(dt) {
    if (!judging) return;
    if (!hooks.isAuthority()) return;
    if (phase !== "playing") return;
    timeLeft -= dt;
    if (timeLeft <= 0) {
      timeLeft = 0;
      phase = "fail";
      hooks.onFail?.();
      return;
    }
    if (checkCross()) crossed = true;
    if (crossed) {
      crossed = false;
      phase = "success";
      clearedAt = timeLeft;
      hooks.onGoal?.();
    }
  }
  const bare = (n) => n.replace(/^\d+\.\s*/, "");
  function showResult() {
    const ok = phase === "success";
    const last = world.mapIndex >= world.mapCount - 1;
    const stage = world.mapIndex + 1;
    if (ok && last) allCleared = true;
    elResultTitle.textContent = allCleared ? "\uC804\uCCB4 \uD074\uB9AC\uC5B4!" : ok ? "\uC131\uACF5!" : "\uC2E4\uD328!";
    elResultTitle.style.color = ok ? "#5ef2a0" : "#ff8080";
    const nextName = !last ? bare(MAPS[world.mapIndex + 1].name) : null;
    elResultSub.textContent = allCleared ? `STAGE 1~${world.mapCount} \uC804\uBD80 \uD1B5\uACFC\uD588\uB2E4. \uC218\uACE0\uD588\uB2E4!` : ok ? `STAGE ${stage} \u300C${bare(world.map.name)}\u300D \uD074\uB9AC\uC5B4 \u2014 \uB0A8\uC740 \uC2DC\uAC04 ${fmtTime(clearedAt)}` + (nextName ? ` \xB7 \uB2E4\uC74C\uC740 \u300C${nextName}\u300D` : "") : `STAGE ${stage} \u300C${bare(world.map.name)}\u300D \u2014 \uC2DC\uAC04 \uCD08\uACFC` + (targetBody ? ` \xB7 \uACE8\uAE4C\uC9C0 ${Math.hypot(targetBody.position.x - goalX, targetBody.position.z - goalZ).toFixed(0)}m \uB0A8\uC558\uB2E4` : "");
    if (elNext) elNext.hidden = !(ok && !last);
    elRetry.textContent = allCleared ? "\uCC98\uC74C\uBD80\uD130" : "\uB2E4\uC2DC\uD558\uAE30";
    elResult.hidden = false;
    if (document.pointerLockElement) document.exitPointerLock();
  }
  function render(dt) {
    t += dt;
    spinner.rotation.z += dt * 0.6;
    const pulse = 1 + Math.sin(t * 2.4) * 0.04;
    ring.scale.set(pulse, pulse, 1);
    goalPin.position.y = 3.5 + Math.sin(t * 2) * 0.16;
    goalPin.rotation.y += dt * 1.2;
    if (targetBody && outline && pointer) {
      outline.scale.setScalar(1.04 + Math.sin(t * 3.2) * 0.012);
      const hy = halfExtentsOf(targetBody).y;
      pointer.position.set(
        targetBody.position.x,
        targetBody.position.y + hy + 0.55 + Math.sin(t * 2.6) * 0.12,
        targetBody.position.z
      );
      pointer.rotation.y += dt * 1.5;
    }
    const hit = phase === "success" || inGoal();
    const c = hit ? 16777215 : COL_GOAL;
    ring.material.color.setHex(c);
    disc.material.color.setHex(c);
    elTimer.textContent = fmtTime(timeLeft);
    elTimer.classList.toggle("urgent", phase === "playing" && timeLeft <= 30);
    if (targetBody) {
      const d = Math.hypot(targetBody.position.x - goalX, targetBody.position.z - goalZ);
      elDist.textContent = judging ? `\uCD9C\uAD6C\uAE4C\uC9C0 ${d.toFixed(1)}m` : `\uCF54\uC2A4 \uB05D\uAE4C\uC9C0 ${d.toFixed(0)}m`;
    }
    if (phase !== shownPhase || phase !== "playing" && world.mapIndex !== shownMap) {
      shownPhase = phase;
      shownMap = world.mapIndex;
      if (phase === "playing") elResult.hidden = true;
      else showResult();
    }
  }
  function restart() {
    if (allCleared) {
      allCleared = false;
      elRetry.textContent = "\uB2E4\uC2DC\uD558\uAE30";
      world.loadMap(0);
      hooks.resetWorld();
      return;
    }
    hooks.resetWorld();
    phase = "playing";
    timeLeft = timeLimit;
    dwell = 0;
    clearedAt = 0;
  }
  function nextMap() {
    if (world.mapIndex >= world.mapCount - 1) return;
    world.loadMap(world.mapIndex + 1);
    hooks.resetWorld();
  }
  elRetry.addEventListener("click", (ev) => {
    ev.preventDefault();
    if (hooks.isAuthority()) restart();
    else hooks.requestRestartRemote();
  });
  elNext?.addEventListener("click", (ev) => {
    ev.preventDefault();
    if (hooks.isAuthority()) nextMap();
    else hooks.requestNextMapRemote?.();
  });
  return {
    get phase() {
      return phase;
    },
    update,
    render,
    restart,
    nextMap,
    snapshot() {
      return { phase, t: Math.round(timeLeft * 10) / 10, m: world.mapIndex };
    },
    applyRemote(s) {
      if (hooks.isAuthority()) return;
      if (s.m !== void 0 && s.m !== world.mapIndex) world.loadMap(s.m);
      if (s.phase === "success" && phase !== "success") clearedAt = s.t;
      phase = s.phase;
      timeLeft = s.t;
    }
  };
}
var TARGET_ID, TARGET_NAME, TIME_LIMIT, GOAL_MAX_Y, GOAL_DWELL, COL_GOAL, COL_TARGET;
var init_game = __esm({
  "client/src/game.ts"() {
    "use strict";
    init_maps();
    init_shapes();
    TARGET_ID = MAPS[0].targetId;
    TARGET_NAME = MAPS[0].targetName;
    TIME_LIMIT = MAPS[0].timeLimit;
    GOAL_MAX_Y = 3;
    GOAL_DWELL = 0.25;
    COL_GOAL = 4054148;
    COL_TARGET = 16765503;
  }
});

// test/game-loop-test.ts
var els = /* @__PURE__ */ new Map();
function makeEl(id) {
  const classes = /* @__PURE__ */ new Set();
  const listeners = [];
  return {
    id,
    textContent: "",
    hidden: false,
    style: {},
    classList: {
      toggle(c, on) {
        if (on) classes.add(c);
        else classes.delete(c);
      },
      has(c) {
        return classes.has(c);
      }
    },
    addEventListener(_type, fn) {
      listeners.push(fn);
    },
    click() {
      for (const fn of listeners) fn({ preventDefault() {
      } });
    }
  };
}
for (const id of ["goal-text", "timer", "goal-dist", "result", "result-title", "result-sub", "retry"]) {
  els.set(id, makeEl(id));
}
globalThis.document = {
  getElementById: (id) => els.get(id) ?? null,
  pointerLockElement: null,
  exitPointerLock() {
  }
};
var THREE4 = await import("three");
var CANNON4 = await import("cannon-es");
var { createGame: createGame2 } = await Promise.resolve().then(() => (init_game(), game_exports));
var { LEGACY_MAPS: RULE_MAPS } = await Promise.resolve().then(() => (init_maps(), maps_exports));
var TARGET_ID2 = RULE_MAPS[0].targetId;
var TIME_LIMIT2 = RULE_MAPS[0].timeLimit;
var pass = 0;
var fail = 0;
function check(name, cond, extra = "") {
  if (cond) {
    pass++;
    console.log(`  PASS  ${name}`);
  } else {
    fail++;
    console.log(`  FAIL  ${name} ${extra}`);
  }
}
var GOAL_X = RULE_MAPS[0].goal.x;
var GOAL_Z = RULE_MAPS[0].goal.z;
var el = (id) => els.get(id);
function fixture(isHost = true) {
  const scene = new THREE4.Scene();
  const body = new CANNON4.Body({
    mass: 20,
    shape: new CANNON4.Box(new CANNON4.Vec3(0.6, 1.1, 0.5)),
    position: new CANNON4.Vec3(0, 1.1, -4)
  });
  const world = {
    scene,
    objectById: /* @__PURE__ */ new Map([[TARGET_ID2, { id: TARGET_ID2, mesh: new THREE4.Group(), body, grabRadius: 2.4, mass: 20 }]]),
    mapIndex: 0,
    map: RULE_MAPS[0],
    mapCount: RULE_MAPS.length,
    loadMap: () => {
    },
    onMapLoaded: () => {
    }
  };
  const resets = { n: 0 };
  const remoteRestarts = { n: 0 };
  const authority = { on: isHost };
  const game = createGame2(world, {
    isAuthority: () => authority.on,
    resetWorld: () => {
      resets.n++;
      body.position.set(0, 1.1, -4);
    },
    requestRestartRemote: () => {
      remoteRestarts.n++;
    }
  });
  const DT = 1 / 60;
  return {
    game,
    body,
    resets,
    remoteRestarts,
    authority,
    run(sec) {
      const steps = Math.round(sec / DT);
      for (let i = 0; i < steps; i++) {
        game.update(DT);
        game.render(DT);
      }
    }
  };
}
console.log("\n--- TEST 1: \uCD08\uAE30 \uC0C1\uD0DC ---");
{
  const f = fixture();
  check("\uC2DC\uC791\uD558\uBA74 \uC9C4\uD589\uC911", f.game.phase === "playing");
  check("\uD0C0\uC774\uBA38\uAC00 \uC81C\uD55C\uC2DC\uAC04\uC5D0\uC11C \uC2DC\uC791", f.game.snapshot().t === TIME_LIMIT2, `t=${f.game.snapshot().t}`);
  f.run(0.1);
  check("\uACB0\uACFC \uD654\uBA74\uC740 \uC228\uACA8\uC838 \uC788\uC74C", el("result").hidden === true);
  check("\uBAA9\uD45C \uC548\uB0B4 \uD14D\uC2A4\uD2B8\uAC00 \uD45C\uC2DC\uB428", el("goal-text").textContent.includes("\uCD9C\uAD6C"), el("goal-text").textContent);
  check("\uD0C0\uC774\uBA38\uAC00 3:00\uC73C\uB85C \uD45C\uC2DC\uB428", el("timer").textContent === "3:00", el("timer").textContent);
}
console.log("\n--- TEST 2: \uD0C0\uC774\uBA38\uAC00 \uD750\uB978\uB2E4 ---");
{
  const f = fixture();
  f.run(10);
  const t = f.game.snapshot().t;
  check("10\uCD08 \uB4A4 \uC57D 170\uCD08 \uB0A8\uC74C", Math.abs(t - (TIME_LIMIT2 - 10)) < 0.2, `t=${t}`);
  check("\uC544\uC9C1 \uC9C4\uD589\uC911", f.game.phase === "playing");
  check("\uD0C0\uC774\uBA38 \uD45C\uAE30 2:50", el("timer").textContent === "2:50", el("timer").textContent);
}
function crossGoal(f, x = GOAL_X, y = 1.1) {
  f.body.position.set(x, y, GOAL_Z + 1.5);
  f.run(1 / 60);
  f.body.position.set(x, y, GOAL_Z - 0.5);
  f.run(1 / 60);
}
console.log("\n--- TEST 3: \uACF5\uC774 \uACE8\uB77C\uC778\uC744 \uB118\uC73C\uBA74 \uC131\uACF5 ---");
{
  const f = fixture();
  f.run(5);
  check("\uC62E\uAE30\uAE30 \uC804\uC5D0\uB294 \uC131\uACF5\uC774 \uC544\uB2D8", f.game.phase === "playing");
  f.body.position.set(GOAL_X, 1.1, GOAL_Z + 1.2);
  f.run(0.6);
  check("\uB77C\uC778 \uC55E\uC5D0 \uC788\uAE30\uB9CC \uD558\uBA74 \uC131\uACF5\uC774 \uC544\uB2D8", f.game.phase === "playing", f.game.phase);
  crossGoal(f);
  check("\uACE8\uB77C\uC778\uC744 \uB118\uC73C\uBA74 \uC131\uACF5", f.game.phase === "success", f.game.phase);
  check("\uACB0\uACFC \uD654\uBA74\uC774 \uB738", el("result").hidden === false);
  check("\uACB0\uACFC \uC81C\uBAA9\uC774 '\uC131\uACF5!'", el("result-title").textContent === "\uC131\uACF5!", el("result-title").textContent);
  check("\uB0A8\uC740 \uC2DC\uAC04\uC774 \uACB0\uACFC\uC5D0 \uD45C\uC2DC\uB428", el("result-sub").textContent.includes("\uB0A8\uC740 \uC2DC\uAC04"), el("result-sub").textContent);
  const t0 = f.game.snapshot().t;
  f.run(3);
  check("\uC131\uACF5 \uB4A4\uC5D0\uB294 \uD0C0\uC774\uBA38\uAC00 \uBA48\uCDA4", f.game.snapshot().t === t0, `${t0} -> ${f.game.snapshot().t}`);
}
console.log("\n--- TEST 4: \uC624\uD310\uC815 \uBC29\uC9C0 ---");
{
  const f = fixture();
  f.body.position.set(GOAL_X, 1.1, GOAL_Z);
  f.run(1 / 60);
  f.body.position.set(0, 1.1, -4);
  f.run(1);
  check("\uD55C \uD504\uB808\uC784 \uC2A4\uCCD0 \uC9C0\uB098\uAC00\uBA74 \uC131\uACF5 \uC544\uB2D8", f.game.phase === "playing", f.game.phase);
  f.body.position.set(GOAL_X, 5, GOAL_Z);
  f.run(1);
  check("\uB192\uC774 \uC0C1\uD55C \uC704\uB85C \uC9C0\uB098\uAC00\uBA74 \uC131\uACF5 \uC544\uB2D8", f.game.phase === "playing", f.game.phase);
  crossGoal(f, GOAL_X - 9);
  check("\uACE8\uB300 \uC606\uC73C\uB85C \uC9C0\uB098\uAC00\uBA74 \uC131\uACF5 \uC544\uB2D8", f.game.phase === "playing", f.game.phase);
  crossGoal(f, GOAL_X - 1.2);
  check("\uACE8\uB300 \uD3ED \uC548\uC73C\uB85C \uB118\uC73C\uBA74 \uC131\uACF5", f.game.phase === "success", f.game.phase);
}
console.log("\n--- TEST 5: \uC2DC\uAC04 \uCD08\uACFC \uC2E4\uD328 ---");
{
  const f = fixture();
  f.run(TIME_LIMIT2 - 1);
  check("1\uCD08 \uB0A8\uC558\uC744 \uB54C\uB294 \uC544\uC9C1 \uC9C4\uD589\uC911", f.game.phase === "playing", f.game.phase);
  check("\uB0A8\uC740 \uC2DC\uAC04 30\uCD08 \uC774\uD558\uBA74 urgent \uD45C\uC2DC", el("timer").classList.has("urgent"));
  f.run(1.2);
  check("\uC2DC\uAC04\uC774 \uB2E4 \uB418\uBA74 \uC2E4\uD328", f.game.phase === "fail", f.game.phase);
  check("\uD0C0\uC774\uBA38\uAC00 0:00", el("timer").textContent === "0:00", el("timer").textContent);
  check("\uACB0\uACFC \uC81C\uBAA9\uC774 '\uC2E4\uD328!'", el("result-title").textContent === "\uC2E4\uD328!", el("result-title").textContent);
  check("\uB0A8\uC740 \uC2DC\uAC04\uC740 \uC74C\uC218\uB85C \uB0B4\uB824\uAC00\uC9C0 \uC54A\uC74C", f.game.snapshot().t === 0, `t=${f.game.snapshot().t}`);
}
console.log("\n--- TEST 6: \uB2E4\uC2DC\uD558\uAE30 ---");
{
  const f = fixture();
  f.run(TIME_LIMIT2 + 1);
  check("\uC2E4\uD328 \uC0C1\uD0DC", f.game.phase === "fail");
  el("retry").click();
  check("\uC6D4\uB4DC \uB9AC\uC14B\uC774 \uD638\uCD9C\uB428", f.resets.n === 1, `n=${f.resets.n}`);
  check("\uB2E4\uC2DC \uC9C4\uD589\uC911", f.game.phase === "playing", f.game.phase);
  check("\uD0C0\uC774\uBA38\uAC00 \uB9AC\uC14B\uB428", f.game.snapshot().t === TIME_LIMIT2, `t=${f.game.snapshot().t}`);
  f.run(0.1);
  check("\uACB0\uACFC \uD654\uBA74\uC774 \uB2EB\uD798", el("result").hidden === true);
  check("urgent \uD45C\uC2DC\uAC00 \uD574\uC81C\uB428", !el("timer").classList.has("urgent"));
  crossGoal(f);
  check("\uB9AC\uC14B \uB4A4\uC5D0\uB3C4 \uC131\uACF5 \uD310\uC815\uC774 \uB2E4\uC2DC \uB3D9\uC791", f.game.phase === "success", f.game.phase);
  el("retry").click();
  check("\uC131\uACF5 \uB4A4 \uB2E4\uC2DC\uD558\uAE30\uB3C4 \uB3D9\uC791", f.game.phase === "playing" && f.resets.n === 2, `n=${f.resets.n}`);
}
console.log("\n--- TEST 7: \uBE44-host\uB294 \uD310\uC815\uD558\uC9C0 \uC54A\uACE0 \uB530\uB77C\uAC04\uB2E4 ---");
{
  const f = fixture(false);
  f.run(10);
  check("\uBE44-host\uB294 \uD0C0\uC774\uBA38\uB97C \uC9C1\uC811 \uC138\uC9C0 \uC54A\uC74C", f.game.snapshot().t === TIME_LIMIT2, `t=${f.game.snapshot().t}`);
  f.body.position.set(GOAL_X, 1.1, GOAL_Z);
  f.run(2);
  check("\uBE44-host\uB294 \uC2A4\uC2A4\uB85C \uC131\uACF5 \uD310\uC815\uD558\uC9C0 \uC54A\uC74C", f.game.phase === "playing", f.game.phase);
  f.game.applyRemote({ phase: "playing", t: 42.5 });
  f.run(1 / 60);
  check("host \uC2A4\uB0C5\uC0F7\uC758 \uB0A8\uC740 \uC2DC\uAC04\uC744 \uB530\uB77C\uAC10", Math.abs(f.game.snapshot().t - 42.5) < 1e-3, `t=${f.game.snapshot().t}`);
  check("\uD0C0\uC774\uBA38 \uD45C\uAE30\uB3C4 \uB530\uB77C\uAC10", el("timer").textContent === "0:43", el("timer").textContent);
  f.game.applyRemote({ phase: "success", t: 40 });
  f.run(1 / 60);
  check("host\uAC00 \uC131\uACF5\uC774\uBA74 \uBE44-host\uB3C4 \uC131\uACF5 \uD654\uBA74", f.game.phase === "success" && el("result").hidden === false);
  el("retry").click();
  check("\uBE44-host\uB294 \uC6D4\uB4DC\uB97C \uC9C1\uC811 \uB9AC\uC14B\uD558\uC9C0 \uC54A\uC74C", f.resets.n === 0, `n=${f.resets.n}`);
  check("host\uC5D0\uAC8C \uC7AC\uC2DC\uC791\uC744 \uC694\uCCAD\uD568", f.remoteRestarts.n === 1, `n=${f.remoteRestarts.n}`);
  check("\uC694\uCCAD\uB9CC \uBCF4\uB0C8\uC73C\uBBC0\uB85C \uC544\uC9C1 \uC131\uACF5 \uC0C1\uD0DC \uC720\uC9C0", f.game.phase === "success", f.game.phase);
  f.game.applyRemote({ phase: "playing", t: TIME_LIMIT2 });
  f.run(1 / 60);
  check("host \uC2A4\uB0C5\uC0F7\uC73C\uB85C \uACB0\uACFC \uD654\uBA74\uC774 \uB2EB\uD798", f.game.phase === "playing" && el("result").hidden === true);
}
console.log("\n--- TEST 8: host \uC774\uC591 ---");
{
  const f = fixture(false);
  f.game.applyRemote({ phase: "playing", t: 100 });
  f.run(1 / 60);
  f.authority.on = true;
  f.run(5);
  const t = f.game.snapshot().t;
  check("\uC774\uC591\uBC1B\uC73C\uBA74 \uB9C8\uC9C0\uB9C9\uC73C\uB85C \uBC1B\uC740 \uC2DC\uAC04\uC5D0\uC11C \uC774\uC5B4\uC11C \uC13C\uB2E4", Math.abs(t - 95) < 0.2, `t=${t}`);
  crossGoal(f);
  check("\uC774\uC591 \uB4A4\uC5D0\uB294 \uC2A4\uC2A4\uB85C \uD310\uC815\uD55C\uB2E4", f.game.phase === "success", f.game.phase);
}
console.log(`
RESULT: ${pass} passed, ${fail} failed`);
if (fail > 0) process.exit(1);
