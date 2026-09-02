import * as THREE from "three";
import * as CANNON from "cannon-es";
import { STAGES, GIMMICK_LAB, ARCHIVED_STAGES, STAGE_PLANS, gimmickBacklog } from "../client/src/stages/index";
import { OB } from "../client/src/obstacles";
import { B } from "../client/src/ball";
import { LEGACY_MAPS } from "../client/src/maps/legacy";
import { PENDING_GIMMICKS } from "../client/src/maps/gimmicks";
import type { MapDef, V3 } from "../client/src/maps/types";

// mapkit의 바닥 글자판(buildKeyPad)이 CanvasTexture를 쓴다. 헤드리스에서는
// 글자가 필요 없으므로 그리기 호출만 삼키는 최소 스텁을 둔다.
const ctx2d = new Proxy({}, { get: () => () => undefined });
(globalThis as unknown as { document: unknown }).document = {
  createElement: () => ({ width: 0, height: 0, getContext: () => ctx2d }),
};

let pass = 0, fail = 0;
const ok = (c: boolean, m: string) => { if (c) { pass++; console.log("  PASS " + m); } else { fail++; console.log("  FAIL " + m); } };

let warned: string[] = [];
const realWarn = console.warn;
console.warn = (...a: unknown[]) => { warned.push(String(a[0])); };

function run(def: MapDef) {
  const physics = new CANNON.World();
  const root = new THREE.Group();
  const bodies: CANNON.Body[] = [];
  const mat = new CANNON.Material("g");
  const props: number[] = [];
  const balls: { id: number; pos: V3 }[] = [];
  const hazards: number[] = [];
  const obs: { id: number; kind: string; z: number }[] = [];
  const obsFull: { id: number; kind: string; z: number; x: number; params: Record<string, number> }[] = [];
  def.build({
    b: { physics, mat, root, bodies },
    addProp: (id) => { props.push(id); },
    addBall: (id, _r, pos) => { balls.push({ id, pos }); },
    addHazard: (id) => { hazards.push(id); },
    addObstacle: (id, kind, z, _arg, _phase, o) => {
      obs.push({ id, kind, z });
      obsFull.push({ id, kind, z, x: o?.x ?? 0, params: o?.params ?? {} });
    },
  });
  return { bodies, props, balls, hazards, obs, obsFull };
}

/** 이 z 에서 정적 바디(벽/난간/바닥)가 x 방향으로 가리는 구간들 */
function blockedSpansAt(bodies: CANNON.Body[], z: number, minHeight = 1.2): [number, number][] {
  const out: [number, number][] = [];
  for (const b of bodies) {
    const s = b.shapes[0];
    if (!(s instanceof CANNON.Box)) continue;
    const he = s.halfExtents;
    // 사람이 못 넘는 높이여야 "막는다"로 친다 (턱/줄무늬는 제외)
    if (b.position.y + he.y < minHeight) continue;
    if (Math.abs(b.position.z - z) > he.z) continue;
    out.push([b.position.x - he.x, b.position.x + he.x]);
  }
  return out;
}

console.log("=== 스테이지가 전부 지어지는가 ===");
for (const def of [...STAGES, GIMMICK_LAB, ...ARCHIVED_STAGES, ...LEGACY_MAPS]) {
  warned = [];
  const r = run(def);
  ok(r.bodies.length > 0, `${def.id}: 정적 바디 ${r.bodies.length}개`);
  // 목표는 Goal Rush면 공(addBall), 레거시 맵이면 무거운 소품(addProp)이다
  const hasTarget = r.balls.some((x) => x.id === def.targetId) || r.props.includes(def.targetId);
  ok(hasTarget, `${def.id}: 목표(${def.targetId})가 실제로 있다`);
  ok(warned.length === 0, `${def.id}: 중앙선(x=0) 경고 없음${warned.length ? " -> " + warned[0] : ""}`);
  // id 중복 = 스냅샷 키 충돌
  const ids = [...r.props, ...r.balls.map((x) => x.id), ...r.hazards, ...r.obs.map((o) => o.id)];
  ok(new Set(ids).size === ids.length, `${def.id}: 소품 id 중복 없음 (${ids.length}개)`);
}

console.log("\n=== 골 앞 18m가 비어 있는가 ===");
for (const def of STAGES) {
  const r = run(def);
  const near = r.obs.filter((o) => o.z > def.goal.z && o.z < def.goal.z + 18);
  ok(near.length === 0, `${def.id}: 골(${def.goal.z}) 앞 18m 안에 장애물 ${near.length}개`);
}

console.log("\n=== 거대 공 주행선(18m)이 비어 있는가 ===");
for (const def of [...STAGES, ...ARCHIVED_STAGES]) {
  const r = run(def);
  for (const roller of r.obs.filter((o) => o.kind === "roller")) {
    const inRun = r.obs.filter((o) => o !== roller && o.z > roller.z && o.z < roller.z + 18);
    ok(inRun.length === 0, `${def.id}: roller@${roller.z} 주행선에 ${inRun.length}개`);
  }
}

console.log("\n=== 게이트를 옆으로 돌아갈 수 없는가 (gate side bypass) ===");
//
// [이 검사가 왜 생겼나 — 실제로 뚫려 있었다]
// 게이트 몸체는 폭 5.6m 인데 레인은 14m 다. mesh 와 collider 는 정확히
// 일치했지만(둘 다 5.6) **좌우에 4.02m 씩 빈 바닥이 남아서 닫힌 문 옆으로
// 그냥 걸어 지나갈 수 있었다.** 브라우저에서 확인한 실제 경로: 스테이지 1의
// 홀드게이트(z=-84)를 x=-5 로 지나 z=-108.9 까지 통과.
//
// 그래서 "collider 가 mesh 와 맞는가"로는 부족하다. **레인 폭 전체가 실제로
// 막히는가**를 재야 한다. 아래는 각 게이트의 z 에서 정적 벽 + 게이트 몸체를
// 합쳐 x 축을 훑으며 빈틈을 찾는다.
{
  const LANE_HALF = 7;
  const PASSABLE = 0.5;          // 사람 몸 폭. 이만큼 뚫려 있으면 지나간다
  const GATE_KINDS = ["coopgate", "buttongate", "holdgate", "pushblock"];
  let checked = 0;

  /** world.ts 의 collider 치수와 같은 식 (한쪽만 바뀌면 이 검사가 잡는다) */
  function gateSpan(o: { kind: string; x: number; params: Record<string, number> }) {
    const p = o.params;
    switch (o.kind) {
      case "coopgate":
      case "buttongate": return { c: 0, half: OB.gateW / 2, h: OB.gateH };
      case "holdgate": return { c: o.x, half: (p.w ?? OB.gateW) / 2, h: p.h ?? OB.gateH };
      case "pushblock": return { c: o.x, half: (p.w ?? OB.pushW) / 2, h: p.h ?? OB.pushH };
      default: return null;
    }
  }

  for (const def of STAGES) {
    const r = run(def);
    for (const g of r.obsFull.filter((o) => GATE_KINDS.includes(o.kind))) {
      checked++;
      const sp = gateSpan(g)!;
      // 게이트 높이의 절반보다 높은 정적 바디만 "막는 것"으로 친다
      // (바닥 줄무늬·턱은 넘어갈 수 있으므로 벽으로 세지 않는다)
      const spans = blockedSpansAt(r.bodies, g.z, Math.min(1.2, sp.h * 0.5));
      spans.push([sp.c - sp.half, sp.c + sp.half]);
      spans.sort((a, b) => a[0] - b[0]);
      let cur = -LANE_HALF, gap = 0;
      for (const [a, b] of spans) {
        if (a > cur) gap = Math.max(gap, a - cur);
        cur = Math.max(cur, b);
      }
      if (cur < LANE_HALF) gap = Math.max(gap, LANE_HALF - cur);
      ok(gap < PASSABLE,
        `${def.id}: ${g.kind}@${g.z} 옆 빈틈 ${gap.toFixed(2)}m (< ${PASSABLE})`);
    }
  }
  // 게이트가 하나도 안 잡히면 이 검사는 아무것도 안 한 것이다
  ok(checked >= 8, `게이트를 ${checked}개 검사했다 (>= 8)`);
}

console.log("\n=== 문틀 높이가 점프로 넘을 수 없는가 ===");
//
// 점프 최고 높이는 골반 y=1.66 (평지 0.86 에서 +0.80). 발이 올라설 수 있는
// 턱은 0.8m 남짓이다. 문틀이 그보다 낮으면 뛰어올라 걸터앉아 넘어간다.
{
  const MIN_H = 1.6;
  for (const def of STAGES) {
    const r = run(def);
    const gates = r.obsFull.filter((o) => ["coopgate", "buttongate", "holdgate", "pushblock"].includes(o.kind));
    for (const g of gates) {
      // 그 z 의 정적 벽 중 제일 낮은 윗면 (문틀이 여기 들어 있다)
      const tops = r.bodies
        .filter((b) => {
          const s = b.shapes[0];
          if (!(s instanceof CANNON.Box)) return false;
          if (Math.abs(b.position.z - g.z) > s.halfExtents.z) return false;
          return b.position.y + s.halfExtents.y > 0.5;   // 바닥판·턱 제외
        })
        .map((b) => b.position.y + (b.shapes[0] as InstanceType<typeof CANNON.Box>).halfExtents.y);
      if (tops.length === 0) continue;
      const lowest = Math.min(...tops);
      ok(lowest >= MIN_H, `${def.id}: ${g.kind}@${g.z} 문틀 제일 낮은 윗면 ${lowest.toFixed(2)}m (>= ${MIN_H})`);
    }
  }
}

console.log("\n=== 문틀 코너에 공이 끼지 않는가 / 문틀을 뚫지 않는가 (Cannon 실측) ===");
//
// [왜 치수 비교로는 부족한가] 위의 「gate side bypass」는 x 축을 훑어 빈틈만
// 본다. 그런데 문틀을 세우면 **전에 없던 오목한 코너가 두 군데 생긴다.**
//   (a) 문틀 앞면 x 난간 안쪽면 — 레인 가장자리의 90도 안쪽 구석
//   (b) 문틀 안쪽 끝 x 문 옆면 — 통로 입구 모서리
// 겹쳐 놓은 정적 박스 둘이 solver 에서 서로 반대되는 접촉 법선을 내면 치수가
// 아무리 맞아도 공이 그 구석에서 떨며 안 나온다. 치수로는 절대 안 보인다.
// 그래서 공을 실제로 놓고 Cannon 을 돌린다.
//
// 그리고 반대 방향의 실패도 같이 막는다: 문틀 두께는 문과 같다(게이트 0.5m).
// 강킥(실측 10.5 m/s)이면 한 스텝(1/60초)에 0.175m 를 가는데, 더 세게 튕기면
// 한 스텝에 벽 두께를 건너뛰어 **discrete 충돌 판정을 지나칠 수 있다.**
// 그러면 "문틀로 옆을 막았다"가 공에 대해서만 거짓이 된다.
{
  const R = B.radius, DT = 1 / 60;
  const GATE_KINDS = ["coopgate", "buttongate", "holdgate", "pushblock"];
  type Ob = { kind: string; z: number; x: number; params: Record<string, number> };

  /** world.ts 의 addObstacle 과 **같은** 문 몸체 치수 (여기선 두께까지 쓴다) */
  function gateBody(o: Ob) {
    const p = o.params;
    switch (o.kind) {
      case "coopgate":
      case "buttongate": return { x: 0, half: OB.gateW / 2, h: OB.gateH, depth: OB.gateD };
      case "holdgate":   return { x: o.x, half: (p.w ?? OB.gateW) / 2, h: p.h ?? OB.gateH, depth: OB.gateD };
      case "pushblock":  return { x: o.x, half: (p.w ?? OB.pushW) / 2, h: p.h ?? OB.pushH, depth: p.len ?? OB.pushD };
      default: return null;
    }
  }

  /**
   * 원본과 같은 모양의 **새** shape.
   *
   * [같은 객체를 물려주면 안 된다] cannon-es 의 Body.addShape 는 `shape.body = this`
   * 를 넣는다. 원본 바디의 shape 을 그대로 재사용하면 그 포인터가 덮여서
   * narrowphase 가 엉뚱한 바디를 참조한다 — 실측으로 가만히 있던 공이
   * x=46, y=-24 로 날아갔다. 물리가 아니라 테스트가 만든 가짜였다.
   */
  function cloneShape(s: CANNON.Shape): CANNON.Shape | null {
    if (s instanceof CANNON.Box) return new CANNON.Box(s.halfExtents.clone());
    if (s instanceof CANNON.Sphere) return new CANNON.Sphere(s.radius);
    if (s instanceof CANNON.Cylinder) {
      const c = s as unknown as { radiusTop: number; radiusBottom: number; height: number; numSegments: number };
      return new CANNON.Cylinder(c.radiusTop, c.radiusBottom, c.height, c.numSegments);
    }
    return null;
  }

  /**
   * 문 z 주변 ±KEEP m 만 담은 작은 월드 + 닫힌 문.
   * 코너 고착은 국소 현상이라 멀리 있는 바디는 결과를 바꾸지 않는다
   * (스테이지 전체를 NaiveBroadphase 로 수천 번 돌리면 너무 느리다).
   * 설정값은 world.ts 와 같아야 한다 — broadphase/solver 가 다르면 고착 여부가 달라진다.
   */
  const KEEP = 14;
  function gateWorld(src: CANNON.Body[], box: { x: number; half: number; h: number; depth: number }, gz: number) {
    const w = new CANNON.World({ gravity: new CANNON.Vec3(0, -18, 0) });
    w.broadphase = new CANNON.NaiveBroadphase();
    w.allowSleep = false;
    (w.solver as CANNON.GSSolver).iterations = 22;
    (w.solver as CANNON.GSSolver).tolerance = 0.0005;
    const ground = new CANNON.Material("ground");
    const prop = new CANNON.Material("prop");
    const ballMat = new CANNON.Material("ball");
    w.addContactMaterial(new CANNON.ContactMaterial(ground, ballMat, { friction: 0.32, restitution: 0.45 }));
    w.addContactMaterial(new CANNON.ContactMaterial(prop, ballMat, { friction: 0.25, restitution: 0.45 }));
    for (const b of src) {
      const s = b.shapes[0];
      const zHalf = s instanceof CANNON.Box ? s.halfExtents.z : s.boundingSphereRadius;
      if (Math.abs(b.position.z - gz) - zHalf > KEEP) continue;
      const shape = cloneShape(s);
      if (!shape) continue;
      const nb = new CANNON.Body({ type: CANNON.Body.STATIC, shape, material: ground });
      nb.position.copy(b.position);
      nb.quaternion.copy(b.quaternion);
      w.addBody(nb);
    }
    // 닫힌 문 (문틀은 문이 열려도 남으므로 코너는 닫힘 상태가 제일 빡빡하다)
    const gb = new CANNON.Body({
      mass: 0, type: CANNON.Body.KINEMATIC, material: prop,
      shape: new CANNON.Box(new CANNON.Vec3(box.half, box.h * 0.5, box.depth * 0.5)),
    });
    gb.position.set(box.x, box.h * 0.5, gz);
    w.addBody(gb);
    return { w, ballMat };
  }

  function addBall(w: CANNON.World, mat: CANNON.Material, p: V3, v: V3) {
    const b = new CANNON.Body({ mass: B.mass, shape: new CANNON.Sphere(R), material: mat });
    b.position.set(p[0], p[1], p[2]);
    b.velocity.set(v[0], v[1], v[2]);
    b.angularDamping = 0.65;
    b.linearDamping = 0.012;
    w.addBody(b);
    return b;
  }

  /** 그 z 에서 사람 키만큼 높은 정적 구간들 (= 문틀 + 난간) */
  function tallSpansAt(bodies: CANNON.Body[], z: number): [number, number][] {
    const out: [number, number][] = [];
    for (const b of bodies) {
      const s = b.shapes[0];
      if (!(s instanceof CANNON.Box)) continue;
      if (Math.abs(b.position.z - z) > s.halfExtents.z) continue;
      if (b.position.y + s.halfExtents.y < 1.2) continue;
      out.push([b.position.x - s.halfExtents.x, b.position.x + s.halfExtents.x]);
    }
    return out;
  }

  let stuckAll = 0, throughAll = 0, trials = 0;
  for (const def of STAGES) {
    const r = run(def);
    for (const g of r.obsFull.filter((o) => GATE_KINDS.includes(o.kind))) {
      const box = gateBody(g)!;
      const spans = tallSpansAt(r.bodies, g.z);
      const outer = spans.length ? Math.max(...spans.map((s) => Math.max(Math.abs(s[0]), Math.abs(s[1])))) : 7;
      const fenceInner = outer - 0.18;         // buildFence 두께 0.36
      let stuck = 0, through = 0, n = 0;

      for (const sx of [-1, 1] as const) {
        for (const zs of [1, -1] as const) {
          const zOut = g.z + zs * (box.depth * 0.5 + R + 0.02);

          // ---- (1) 코너에 놓고 통로 쪽으로 민다. 안 나오면 고착이다.
          //      미는 가속도 10 m/s^2 — 드리블 한 터치보다 약하게 잡았다.
          for (const px of [
            sx * (fenceInner - R - 0.01),                  // (a) 난간과 만나는 구석
            box.x + sx * (box.half - R - 0.01),            // (b) 통로 입구 모서리
          ]) {
            n++; trials++;
            const { w, ballMat } = gateWorld(r.bodies, box, g.z);
            // 코너 쐐기로 처박은 채 시작한다 (제일 불리한 초기 조건)
            const bb = addBall(w, ballMat, [px, R + 0.02, zOut], [sx * 3, 0, -zs * 3]);
            for (let t = 0; t < 2.0; t += DT) w.step(DT);
            if (bb.position.y < -1.5) continue;            // 낭떠러지 구간은 코너가 아니다
            const s0x = bb.position.x, s0z = bb.position.z;
            const tz = g.z + zs * (box.depth * 0.5 + 1.6);
            for (let t = 0; t < 3.0; t += DT) {
              const dx = box.x - bb.position.x, dz = tz - bb.position.z;
              const L = Math.hypot(dx, dz) || 1;
              // [두 번째 인자를 주면 안 된다] applyForce 의 relativePoint 는
              // 질량중심 기준 상대좌표다. 월드 좌표를 넣으면 r x F 가 그대로
              // 토크가 되어(z=-88 이면 팔 길이 88m) 공이 회전하며 날아간다.
              bb.applyForce(new CANNON.Vec3((dx / L) * 10 * B.mass, 0, (dz / L) * 10 * B.mass));
              w.step(DT);
              if (Math.abs(bb.position.x) > 8.5) break;
            }
            const moved = Math.hypot(bb.position.x - s0x, bb.position.z - s0z);
            const inMouth = Math.abs(bb.position.x - box.x) <= Math.max(0.1, box.half - R);
            if (Number.isFinite(moved) && !inMouth && moved < 0.25 && bb.position.y > -1.5) {
              stuck++; stuckAll++;
              console.log(`    ${def.id} ${g.kind}@${g.z} 코너 x=${px.toFixed(2)} -> ${moved.toFixed(3)}m 밖에 못 움직임`);
            }
          }

          // ---- (2) 문틀을 향해 세게 쏜다. 뒤로 넘어가면 관통이다.
          if (zs > 0) {
            for (const f of [0.25, 0.6, 0.9]) {
              for (const sp of [15, 25, 35]) {
                n++; trials++;
                const { w, ballMat } = gateWorld(r.bodies, box, g.z);
                const x = sx * (box.half + f * (fenceInner - box.half));
                const z0 = g.z + box.depth * 0.5 + 3;
                // 바닥이 없는 자리(스테이지 3의 세 갈래)에서 쏘면 공이 그냥
                // 허공을 날아간다. 그걸 관통으로 읽으면 없는 버그를 만든다.
                const probe = addBall(w, ballMat, [x, R + 0.02, z0], [0, 0, 0]);
                for (let t = 0; t < 0.4; t += DT) w.step(DT);
                const okSpot = probe.position.y > -0.2 && Math.abs(probe.position.x) < 8.5;
                const px2 = probe.position.x, py2 = probe.position.y, pz2 = probe.position.z;
                w.removeBody(probe);
                if (!okSpot) { n--; trials--; continue; }
                const bb = addBall(w, ballMat, [px2, py2, pz2], [0, 0, -sp]);
                for (let t = 0; t < 1.5; t += DT) {
                  w.step(DT);
                  if (bb.position.z < g.z - box.depth * 0.5 - R
                      && Math.abs(bb.position.x - box.x) > box.half
                      && bb.position.y > -1.0) {
                    through++; throughAll++;
                    console.log(`    ${def.id} ${g.kind}@${g.z} x=${x.toFixed(2)} ${sp}m/s -> 문틀 관통`);
                    break;
                  }
                  if (!Number.isFinite(bb.position.z)) break;
                }
              }
            }
          }
        }
      }
      ok(stuck === 0 && through === 0,
        `${def.id}: ${g.kind}@${g.z} 코너 고착 ${stuck} / 문틀 관통 ${through} (${n}회 실측)`);
    }
  }
  ok(trials >= 150, `공을 ${trials}회 실제로 굴려 봤다 (>= 150)`);
  ok(stuckAll === 0 && throughAll === 0, `전 스테이지 합계 — 고착 ${stuckAll}, 관통 ${throughAll}`);
}

console.log("\n=== 둘이 밀어야 하는 문을 옆으로 돌아갈 수 없는가 ===");
//
// [이게 이 스테이지의 유일한 실패 모드다] 미는 상자는 협동을 강제하는 장치인데,
// 문틀(고정 벽)과 상자 사이에 사람이 지나갈 틈이 조금이라도 있으면 그냥 걸어서
// 지나가면 된다 — 장치가 통째로 장식이 된다. 벽 좌표와 상자 폭을 손으로
// 맞춰야 하는 구조라, 어느 한쪽을 고칠 때 반대쪽을 잊기 쉽다.
//
// 검사: 상자가 있는 z 에서 벽 + 상자가 레인 전체(±LANE_HALF)를 빈틈없이
// 덮는가. 사람 몸 폭이 0.4 남짓이므로 0.5m 이상 뚫려 있으면 지나갈 수 있다.
{
  const LANE_HALF = 7;
  const PASSABLE = 0.5;
  //
  // [시험장(lab)은 제외한다] 거기 있는 상자는 문틀 없이 벌판에 놓여 있다 —
  // "미는 힘이 제대로 도는가"만 보는 작업대이고, 옆으로 걸어 지나갈 수 있는
  // 것이 정상이다. 협동을 강제해야 하는 것은 **정식 스테이지**뿐이다.
  let found = 0;
  for (const def of STAGES) {
    const r = run(def);
    for (const pb of r.obsFull.filter((o) => o.kind === "pushblock")) {
      found++;
      const w = pb.params.w ?? 4.4;
      const spans = blockedSpansAt(r.bodies, pb.z);
      spans.push([pb.x - w / 2, pb.x + w / 2]);          // 상자 자신
      spans.sort((a, b) => a[0] - b[0]);
      // 왼쪽 끝부터 훑으면서 0.5m 이상 뚫린 자리가 있는지 본다
      let cur = -LANE_HALF;
      let gap = 0;
      for (const [a, b] of spans) {
        if (a > cur) gap = Math.max(gap, a - cur);
        cur = Math.max(cur, b);
      }
      if (cur < LANE_HALF) gap = Math.max(gap, LANE_HALF - cur);
      ok(gap < PASSABLE,
        `${def.id}: 미는 문 z=${pb.z} 옆으로 지나갈 틈 ${gap.toFixed(2)}m (< ${PASSABLE})`);
    }
  }
  // 시험장에는 문틀 없는 상자가 하나 있다(밀기 자체를 보는 용도). 정식
  // 스테이지에만 문틀이 필요하므로, 정식 쪽에 하나도 없으면 그건 회귀다.
  const inStages = STAGES.some((d) => run(d).obsFull.some((o) => o.kind === "pushblock"));
  ok(inStages, `정식 스테이지에 미는 문이 있다 (전체 ${found}개 검사)`);
}

console.log("\n=== 체크포인트가 되살아날 수 있는 자리인가 ===");
//
// main.ts 는 체크포인트보다 3m 뒤(+Z)에 사람을 세운다. 그 자리가 허공이면
// 되살아나자마자 떨어지고, 그러면 무한 낙사가 된다. 스테이지가 체크포인트를
// 옮길 때마다 사람이 기억할 수는 없으므로 여기서 센다.
//
// (바닥이 있는지는 course.ts 의 중앙선 검사가 z 마다 이미 보고 있으므로,
//  여기서는 **선언한 z 가 코스 범위 안이고 순서가 맞는가**를 본다)
for (const def of STAGES) {
  const cps = def.checkpoints;
  if (!cps || cps.length === 0) continue;
  const startZ = Math.max(...def.spawns.map((s) => s[1]));
  const sorted = cps.every((z, i) => i === 0 || z < cps[i - 1]);
  ok(sorted, `${def.id}: 체크포인트가 진행 순서대로다 [${cps.join(", ")}]`);
  ok(cps.every((z) => z < startZ && z > def.goal.z),
    `${def.id}: 체크포인트가 출발선과 골 사이에 있다`);
  // 되살아나는 자리(z + 3)가 다른 체크포인트를 넘어서지 않아야 한다
  ok(cps.every((z, i) => i === 0 || z + 3 < cps[i - 1]),
    `${def.id}: 되살아나는 자리가 앞 체크포인트를 다시 넘지 않는다`);
}

console.log("\n=== 협동 골 스테이지 ===");
{
  const coop = STAGES.filter((d) => d.coopGoal);
  ok(coop.length >= 1, `협동 골 스테이지가 있다 (${coop.length}개)`);
  for (const def of coop) {
    // 협동 골은 "둘 다 공을 건드렸어야 인정"이다. 그 앞에 둘이 아니면
    // 못 여는 관문이 하나도 없으면, 규칙만 있고 상황이 없는 셈이 된다.
    const r = run(def);
    const hasCoopGate = r.obs.some((o) => ["holdgate", "coopgate", "buttongate", "pushblock"].includes(o.kind));
    ok(hasCoopGate, `${def.id}: 협동 관문도 같이 있다`);
  }
}

console.log("\n=== 협동 장치가 「거리와 시간」의 부등식을 지키는가 ===");
//
// 이 게임의 「혼자서는 못 한다」는 플래그가 아니라 부등식이다. 그래서 값을
// 만질 때마다 그 부등식을 여기서 다시 센다. 기준 수치는 전부 헤드리스 실측이다
// (test/gimmick-test.ts TEST 9 와 각 스테이지 파일 주석 참고).
{
  /** 사람 최고 속도. ragdoll.ts P.maxSpeed 와 같은 값이어야 한다 */
  const MAX_SPEED = 4.6;
  /**
   * 레버에서 발을 뗀 뒤 문이 다시 막힐 때까지 사람이 갈 수 있는 거리 (m).
   *
   * hold:1 레버 + 신호 문만 세워 놓고 「밟고 곧바로 전력으로 달려간다」를
   * 거리별로 재 봤다: 7.2m 까지는 지나가고 7.4m 부터 못 지나간다.
   * (문이 닫히는 데 걸리는 시간이 아니라 **닫히기 전에 몸이 통과선을
   *  넘는가**가 기준이다 — 문 뒤 0.6m 까지 가야 지나간 것으로 친다)
   *
   * [지금 제일 아슬아슬한 자리] 스테이지 2 의 -46 레버 -> -54 문이 8.0m 로,
   * 이 한계선에서 0.6m 밖에 안 떨어져 있다. 지금은 실제로 못 지나가지만
   * (실측: z=-7.58 에서 문에 막힌다) 이 값을 더 줄이면 그 자리가 먼저 깨진다.
   */
  const HOLD_REACH = 7.4;

  for (const def of STAGES) {
    const r = run(def);
    const levers = r.obsFull.filter((o) => o.kind === "lever");

    // ---- 1) latch 가 걸린 레버 둘 = 2인 동시 압력판.
    //         발판 사이를 latch 안에 건널 수 없어야 한다.
    const latched = levers.filter((lv) => (lv.params.latch ?? 0) > 0);
    if (latched.length >= 2) {
      // 스테이지가 쓰는 형태는 「같은 z 의 좌우 한 쌍」이다
      const a = latched[0], b2 = latched[1];
      const gap = Math.abs(a.x - b2.x);
      const pad = (a.params.w ?? OB.leverW);
      // 발판 가장자리에서 가장자리까지가 실제로 달려야 하는 거리다
      const need = (gap - pad) / MAX_SPEED;
      const latch = a.params.latch ?? 0;
      console.log(`       ${def.id}: 발판 간격 ${gap.toFixed(1)}m / latch ${latch}s -> 건너는 데 ${need.toFixed(2)}s`);
      ok(need > latch + 0.3,
        `${def.id}: 혼자서는 latch 안에 반대쪽 발판까지 못 간다 (필요 ${need.toFixed(2)}s > latch ${latch}s + 0.3)`);
      ok(Math.abs(a.x) + pad / 2 <= 7.01,
        `${def.id}: 발판이 레인(반폭 7) 안에 있다 (바깥 끝 ${(Math.abs(a.x) + pad / 2).toFixed(2)}m)`);
    }

    // ---- 2) hold:1 레버(밟고 있는 동안만) + 그 채널의 문.
    //         문이 레버에서 HOLD_REACH 보다 멀어야 혼자 못 지나간다.
    const doors = r.obsFull.filter((o) => o.kind === "coopgate" || o.kind === "holdgate");
    for (const lv of levers) {
      if ((lv.params.latch ?? 0) > 0) continue;                  // 위에서 봤다
      if ((lv.params.hold ?? 1) < 0.5) continue;                 // hold:0 은 혼자 켜 놓고 간다
      // 이 레버가 여는 문 = 같은 채널. 채널 번호는 obsFull 에 안 실리므로
      // 「앞쪽(-Z)에서 가장 가까운 신호 문」을 본다 (스테이지 배치가 그렇다).
      const ahead = doors.filter((d) => d.z < lv.z).sort((a2, b2) => b2.z - a2.z)[0];
      if (!ahead) continue;
      const dist = Math.abs(lv.z - ahead.z);
      console.log(`       ${def.id}: 밟고 있어야 하는 레버 z=${lv.z} -> 문 z=${ahead.z} (${dist.toFixed(1)}m)`);
      ok(dist > HOLD_REACH,
        `${def.id}: 레버에서 문까지가 혼자 닿는 거리(${HOLD_REACH}m)보다 멀다 (${dist.toFixed(1)}m)`);
    }
  }
}

console.log("\n=== 스테이지 3 낭떠러지 구간의 새 협동 장치 ===");
//
// 좌표가 서로 물려 있어서 하나만 옮겨도 조용히 깨진다. 스테이지 파일의
// [좌표를 옮기면 같이 확인할 것] 목록을 그대로 검사로 옮겨 둔다.
{
  const def = STAGES.find((d) => d.id === "s3-movingfloor")!;
  const r = run(def);
  const lever = r.obsFull.find((o) => o.kind === "lever");
  const gate = r.obsFull.filter((o) => o.kind === "coopgate").sort((a, b) => a.z - b.z)[0];
  ok(!!lever && !!gate, "s3: 레버와 신호 문이 둘 다 있다");
  if (lever && gate) {
    ok(lever.x === 0,
      `s3: 레버가 x=0 이다 (레버-문 표시줄이 낭떠러지 위를 지나가지 않게) x=${lever.x}`);
    // 움직이는 발판은 z=-55 중심 span 10, len 3 -> 가장 멀리 나올 때 z=-61.5
    const plats = r.obsFull.filter((o) => o.kind === "platform");
    const platFar = Math.min(...plats.map((p) => p.z - (p.params.span ?? 0) / 2 - (p.params.len ?? OB.platD) / 2));
    ok(gate.z + OB.gateD / 2 < platFar,
      `s3: 문틀(${(gate.z + OB.gateD / 2).toFixed(2)})이 발판이 나오는 끝(${platFar.toFixed(2)})보다 뒤에 있다`);
    // 체크포인트보다 **앞**(z 가 큰 쪽)이어야 「문 앞에서 저장」이 안 생긴다
    const cp = (def.checkpoints ?? []).filter((z) => z < -60).sort((a, b) => b - a)[0];
    ok(cp !== undefined && gate.z > cp,
      `s3: 문(${gate.z})이 체크포인트(${cp})보다 앞이다 = 저장될 때는 이미 지난 뒤다`);
    // 공은 체크포인트 + 1.2 에서 되살아난다. 문틀 안이면 튕겨 나간다.
    const ballZ = (cp ?? 0) + 1.2;
    ok(Math.abs(ballZ - gate.z) > OB.gateD / 2 + B.radius,
      `s3: 공이 되살아나는 자리(${ballZ.toFixed(1)})가 문틀 밖이다`);
  }
}

console.log("\n=== 스테이지 계획표와 실제 등록이 맞는가 ===");
ok(STAGE_PLANS.length === 10, `계획표가 10개 (${STAGE_PLANS.length})`);
const playable = STAGE_PLANS.filter((p) => p.status === "playable");
ok(playable.length === STAGES.length, `playable ${playable.length} == 등록 ${STAGES.length}`);
for (let i = 0; i < STAGES.length; i++) {
  ok(STAGES[i].id === playable[i].id, `${i + 1}번: ${STAGES[i].id} == ${playable[i].id}`);
}

console.log("\n=== 아직 없는 기믹 (backlog) ===");
console.warn = realWarn;
for (const b of gimmickBacklog()) console.log(`  ${b.kind}  (STAGE ${b.stage}부터, ${b.count}개 스테이지가 요구)`);
run(GIMMICK_LAB);
console.log("  lab 표식:", PENDING_GIMMICKS.filter((p) => p.map === "lab").map((p) => p.kind).join(", "));

console.log(`\nRESULT: ${pass} passed, ${fail} failed`);
process.exit(fail ? 1 : 0);
