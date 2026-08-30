import * as THREE from "three";

/**
 * 가벼운 연출 효과 — 발 터치 / 개인기 잔상 / 흙먼지.
 *
 * [설계 원칙]
 *  - 물리와 완전히 분리된다. 여기서 만드는 건 전부 장식 메시이고, 물리 바디도
 *    제약도 만들지 않는다. 그래서 이 파일을 통째로 지워도 게임은 그대로 돈다.
 *  - 풀링한다. 개인기 한 번에 잔상 8개가 나가는데 매번 new THREE.Mesh를 하면
 *    GC가 프레임을 갉아먹는다. 지오메트리/머티리얼은 종류당 하나만 만들고,
 *    메시는 재활용하면서 visible과 opacity만 바꾼다.
 *  - 머티리얼을 공유하면 개별 페이드를 못 준다. 그래서 메시마다 머티리얼을
 *    복제해서 들고 있는다 (풀 크기가 고정이라 총 개수도 고정이다).
 *
 * [맵 전환] 이 그룹은 scene 바로 밑에 붙는다. world.unloadMap()은 mapRoot와
 * 소품 메시만 걷어내므로 여기 것은 살아남는다 - 맵을 갈아끼워도 다시 만들 필요가 없다.
 */

/** 효과 하나 */
interface Puff {
  mesh: THREE.Mesh;
  mat: THREE.MeshBasicMaterial;
  /** 남은 수명 (초). 0 이하면 꺼진 상태 */
  life: number;
  maxLife: number;
  /** 시작/끝 크기 */
  from: number;
  to: number;
  /** 시작 불투명도 */
  alpha: number;
  /** 초당 이동 (잔상은 제자리, 먼지는 살짝 퍼진다) */
  vx: number;
  vy: number;
  vz: number;
}

function makePool(
  parent: THREE.Group,
  geo: THREE.BufferGeometry,
  count: number,
  opts: { color: number; flat?: boolean },
): Puff[] {
  const base = new THREE.MeshBasicMaterial({
    color: opts.color,
    transparent: true,
    depthWrite: false,
    toneMapped: false,
    side: THREE.DoubleSide,
  });
  const out: Puff[] = [];
  for (let i = 0; i < count; i++) {
    const mat = base.clone();
    const mesh = new THREE.Mesh(geo, mat);
    mesh.visible = false;
    // 바닥에 눕히는 효과(링)는 수평으로 돌려둔다
    if (opts.flat) mesh.rotation.x = -Math.PI / 2;
    mesh.renderOrder = 997;
    parent.add(mesh);
    out.push({ mesh, mat, life: 0, maxLife: 1, from: 1, to: 1, alpha: 1, vx: 0, vy: 0, vz: 0 });
  }
  base.dispose();
  return out;
}

export interface Fx {
  /** 발이 공을 툭 찬 순간 - 접촉 지점에 작은 링 */
  touch(x: number, y: number, z: number, strength: number): void;
  /** 개인기: 공이 지나간 자리에 남는 잔상 */
  trail(x: number, y: number, z: number): void;
  /** 개인기: 캐릭터가 옆으로 빠질 때 발밑 흙먼지 */
  dash(x: number, z: number, dirX: number, dirZ: number): void;
  /** 강한 킥 - 찬 자리에 퍼지는 링 */
  kick(x: number, y: number, z: number, power: number): void;
  update(dt: number): void;
  dispose(): void;
}

export function createFx(scene: THREE.Scene): Fx {
  const group = new THREE.Group();
  group.frustumCulled = false;
  scene.add(group);

  // 지오메트리는 종류당 하나만. 크기는 mesh.scale로 준다.
  const ringGeo = new THREE.RingGeometry(0.55, 1, 20);
  const sphGeo = new THREE.SphereGeometry(1, 10, 8);

  // 풀 크기: 터치는 자주 나가고(초당 최대 7회), 잔상은 개인기 때 몰아서 나간다.
  const touches = makePool(group, ringGeo, 10, { color: 0xffffff, flat: true });
  const trails = makePool(group, sphGeo, 14, { color: 0xffd23f });
  const dashes = makePool(group, ringGeo, 8, { color: 0xffffff, flat: true });
  const kicks = makePool(group, ringGeo, 4, { color: 0x9fe6ff, flat: true });
  const all = [touches, trails, dashes, kicks];

  /** 풀에서 가장 오래된(수명이 적게 남은) 슬롯을 가져온다 */
  function take(pool: Puff[]): Puff {
    let best = pool[0];
    for (const p of pool) {
      if (p.life <= 0) return p;
      if (p.life < best.life) best = p;
    }
    return best;
  }

  function fire(
    p: Puff, x: number, y: number, z: number,
    life: number, from: number, to: number, alpha: number,
    vx = 0, vy = 0, vz = 0,
  ) {
    p.mesh.position.set(x, y, z);
    p.life = life; p.maxLife = life;
    p.from = from; p.to = to; p.alpha = alpha;
    p.vx = vx; p.vy = vy; p.vz = vz;
    p.mesh.scale.setScalar(from);
    p.mat.opacity = alpha;
    p.mesh.visible = true;
  }

  return {
    touch(x, y, z, strength) {
      // 약한 터치는 거의 안 보이고 세게 찰수록 커진다 - "툭" 찬 게 눈에 보이는 몫
      const s = Math.max(0.25, Math.min(1, strength));
      fire(take(touches), x, y + 0.02, z, 0.26, 0.24 * s, 0.9 * s, 0.62 * s);
    },
    trail(x, y, z) {
      fire(take(trails), x, y, z, 0.5, 0.26, 0.06, 0.8);
    },
    dash(x, z, dirX, dirZ) {
      // 빠져나가는 반대쪽으로 먼지가 밀린다
      for (let i = 0; i < 3; i++) {
        const k = 0.6 + i * 0.35;
        fire(take(dashes), x - dirX * 0.15 * i, 0.04, z - dirZ * 0.15 * i,
          0.42 + i * 0.06, 0.3, 1.25 + i * 0.25, 0.62,
          -dirX * k, 0, -dirZ * k);
      }
    },
    kick(x, y, z, power) {
      const s = 0.6 + power * 0.9;
      fire(take(kicks), x, y + 0.02, z, 0.3, 0.3, 1.9 * s, 0.6);
    },
    update(dt) {
      for (const pool of all) {
        for (const p of pool) {
          if (p.life <= 0) continue;
          p.life -= dt;
          if (p.life <= 0) { p.mesh.visible = false; p.mat.opacity = 0; continue; }
          const t = 1 - p.life / p.maxLife;          // 0 -> 1
          p.mesh.scale.setScalar(p.from + (p.to - p.from) * t);
          p.mat.opacity = p.alpha * (1 - t);
          p.mesh.position.x += p.vx * dt;
          p.mesh.position.y += p.vy * dt;
          p.mesh.position.z += p.vz * dt;
        }
      }
    },
    dispose() {
      scene.remove(group);
      for (const pool of all) for (const p of pool) p.mat.dispose();
      ringGeo.dispose();
      sphGeo.dispose();
    },
  };
}
