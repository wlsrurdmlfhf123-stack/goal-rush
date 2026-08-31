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
  def.build({
    b: { physics, mat, root, bodies },
    addProp: (id) => { props.push(id); },
    addBall: (id, _r, pos) => { balls.push({ id, pos }); },
    addHazard: (id) => { hazards.push(id); },
    addObstacle: (id, kind, z) => { obs.push({ id, kind, z }); },
  });
  return { bodies, props, balls, hazards, obs };
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
