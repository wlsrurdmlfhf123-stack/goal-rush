import * as THREE from "three";
import * as CANNON from "cannon-es";
import { STAGES, GIMMICK_LAB, ARCHIVED_STAGES, STAGE_PLANS, gimmickBacklog } from "../client/src/stages/index";
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
