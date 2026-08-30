import * as THREE from "three";
import * as CANNON from "cannon-es";
import { createWorld, type PhysObject } from "./world";
import { createRagdoll, GROUP_WORLD, P, type HandGrip, type Ragdoll, type RagdollInput, type RagdollState } from "./ragdoll";
import { applyCarryForce, holdForceFor, type Holder } from "./carry";
import { Net } from "./net";
import { createMenu } from "./menu";
import { defaultPresetFor, presetColors } from "./characters";
import { BALL_ID, TUTORIAL_PADS, TUTORIAL_PAD_HALF } from "./maps";
import { createGame } from "./game";
import { applyLook, cameraBasis, groupFor, ragdollMask } from "./input-math";
import { surfacePointLocal } from "./shapes";
import { B, createBallPlay } from "./ball";
import { createFx } from "./fx";
import { createAudio, type SfxName } from "./audio";
import { HZ, createHazards } from "./hazards";
import { createObstacles } from "./obstacles";
import { BOT, createBots } from "./bot";
import type { GamePhase, InputState, ObjectState, RagdollSnapshot, SfxEvent } from "./protocol";

const DEBUG = true;

const container = document.getElementById("app")!;
const world = createWorld(container);
const { scene, camera, renderer, physics, objects, objectById } = world;

// 소품의 최초 상태. [다시하기]가 여기로 되돌린다.
// (맵 로드 직후에 떠 놓아야 한 프레임이라도 물리가 돌기 전 값이 잡힌다)
// 맵을 갈아끼울 때마다 다시 뜬다 - 새 맵의 소품은 완전히 다른 집합이다.
interface PropHome { p: CANNON.Vec3; q: CANNON.Quaternion; ld: number; ad: number }
let propHome = new Map<number, PropHome>();

function capturePropHome() {
  propHome = new Map(objects.map((o) => [o.id, {
    p: o.body.position.clone(),
    q: o.body.quaternion.clone(),
    ld: o.body.linearDamping,
    ad: o.body.angularDamping,
  }]));
}
capturePropHome();
// 맵이 바뀌면 새 소품 기준으로 다시 뜬다
world.onMapLoaded(capturePropHome);

/** 지금 맵의 스폰 지점 */
const spawns = () => world.map.spawns;

// ---------------------------------------------------------------- 래그돌 관리
interface PlayerEntry {
  id: number;
  rag: Ragdoll;
  input: RagdollInput;
  grabPending: boolean;
  /** 이번 스텝에 개인기 버튼이 눌렸는가 */
  trickPending: boolean;
  kickPending: boolean;
  /** 이번 스텝에 스톱턴이 눌렸는가 */
  stopPending: boolean;
  /** 그 킥의 세기 (0..1) */
  kickPower: number;
}
const playersById = new Map<number, PlayerEntry>();

/**
 * 이 플레이어가 입을 옷.
 *
 * 캐릭터 선택 화면(characters.ts PRESETS)에서 고른 프리셋을 쓴다. 아직 아무도
 * 안 골랐으면(예: 늦게 들어와 선택 전) id 기반 기본값으로 떨어진다.
 *
 * [왜 서버가 들고 있는 값을 쓰는가] 멀티에서는 모든 클라이언트가 같은 사람을
 * 같은 색으로 그려야 한다. 각자 로컬에서 정하면 내 화면의 파란 옷이 상대
 * 화면에서는 빨간 옷이 되어, 「서로조종」에서 누구를 조종 중인지 헷갈린다.
 * 선택은 서버가 방 단위로 모아서 picks로 뿌리므로 모든 화면이 일치한다.
 */
/** 방해꾼 봇 색 - 플레이어 프리셋에는 없는 조합이라 한눈에 구분된다 */
const BOT_LOOK = [
  { skin: 0x6b6f78, shirt: 0x2b2f38, pants: 0x14171c, shoes: 0xd93b3b, eye: 0xff3b5c },
  { skin: 0x7a6b78, shirt: 0x3b2b38, pants: 0x1c141a, shoes: 0xff8a3d, eye: 0xff3b5c },
];

function colorsFor(playerId: number) {
  if (isBot(playerId)) return BOT_LOOK[(-playerId - 1) % BOT_LOOK.length];
  const picked = net.presetOf(playerId);
  return presetColors(picked ?? defaultPresetFor(playerId));
}

/**
 * 음수 id는 AI 봇이다.
 *
 * 봇을 playersById에 같이 넣는 이유: 그러면 스폰/물리/스냅샷/렌더/장애물 피격이
 * 전부 사람과 같은 경로를 타서 새로 만들 게 없다. 대신 "사람 수"를 세거나
 * 「서로조종」 상대를 고를 때는 반드시 제외해야 한다.
 */
function isBot(id: number): boolean { return id < 0; }

/** 사람 플레이어 id만 (봇 제외) */
function humanIds(): number[] {
  return [...playersById.keys()].filter((id) => !isBot(id)).sort((a, b) => a - b);
}

function spawnPlayer(id: number, at?: [number, number]): PlayerEntry {
  const existing = playersById.get(id);
  if (existing) return existing;

  const idx = [...playersById.keys()].filter((k) => isBot(k) === isBot(id)).length;
  const sp = spawns();
  const [sx, sz] = at ?? sp[idx % sp.length];
  const myGroup = groupFor(id);
  // 월드(GROUP_WORLD=1) + 다른 모든 래그돌과 충돌 (자기 자신 그룹만 제외).
  // 소품/벽/바닥은 cannon-es 기본값(group=1, mask=-1)이라 GROUP_WORLD 비트로 잡힌다.
  const mask = ragdollMask(myGroup) | GROUP_WORLD;

  const rag = createRagdoll(
    physics, scene,
    new CANNON.Vec3(sx, P.rideHeight + 0.15, sz),
    world.materials.player,
    // 옷은 스폰 순서(idx)가 아니라 playerId로 정한다. 스폰 순서는 클라이언트마다
    // 다를 수 있어서, 그걸로 색을 정하면 같은 사람이 화면마다 다른 옷을 입는다.
    colorsFor(id),
    myGroup, mask
  );
  const entry: PlayerEntry = {
    id, rag,
    input: { moveX: 0, moveZ: 0, jump: false },
    grabPending: false,
    trickPending: false,
    kickPending: false,
    stopPending: false,
    kickPower: 0,
  };
  playersById.set(id, entry);
  return entry;
}

function despawnPlayer(id: number) {
  const e = playersById.get(id);
  if (!e) return;
  releaseGrabsOf(e.rag);
  ballPlay.forget(e.rag);
  hazards.forget(e.rag);
  obstacles.forget(e.rag);
  bots.forget(e.rag);
  trickTrail.delete(e.rag);
  stepPhase.delete(e.rag);
  wasAir.delete(e.rag);
  walkTrack.delete(e.rag);
  e.rag.dispose(physics, scene);
  playersById.delete(id);
}

// ---------------------------------------------------------------- 카메라
let yaw = Math.PI;
let pitch = 0.28;
const CAM_DIST = 6.2, CAM_HEIGHT = 1.8;

let pointerLocked = false;
renderer.domElement.addEventListener("click", () => {
  // 결과 화면이 떠 있는 동안은 커서를 잠그지 않는다 ([다시하기]를 눌러야 하므로)
  if (game.phase !== "playing") return;
  renderer.domElement.requestPointerLock();
});
// 킥 — F 또는 마우스 좌클릭. 누르고 있는 동안 세기가 찬다.
// (잠그기 전의 첫 클릭은 pointer lock 요청이므로 킥으로 세지 않는다)
document.addEventListener("mousedown", (e) => {
  if (!pointerLocked || e.button !== 0) return;
  beginKickCharge();
});
document.addEventListener("mouseup", (e) => {
  if (e.button !== 0) return;
  releaseKickCharge();
});
document.addEventListener("pointerlockchange", () => {
  pointerLocked = document.pointerLockElement === renderer.domElement;
});
document.addEventListener("mousemove", (e) => {
  if (!pointerLocked) return;
  const look = applyLook({ yaw, pitch }, e.movementX, e.movementY);
  yaw = look.yaw;
  pitch = look.pitch;
});

/**
 * 타이틀/대기실 배경용 카메라.
 * 따라갈 캐릭터가 아직 없을 때 방 전경을 천천히 훑는다.
 */
let menuCamAngle = Math.PI * 0.15;
function updateMenuCamera(dt: number) {
  menuCamAngle += dt * 0.06;
  const R = 17, H = 9.5;
  camera.position.lerp(
    new THREE.Vector3(Math.sin(menuCamAngle) * R, H, Math.cos(menuCamAngle) * R),
    0.05
  );
  camera.lookAt(0, 1.0, 0);
}

/**
 * 카메라 충격 — 맞거나 세게 찼을 때 화면이 잠깐 흔들린다.
 *
 * [왜 위치가 아니라 lookAt을 흔드는가] 카메라 위치를 흔들면 벽/바닥에 파고들어
 * 한 프레임씩 지형이 비쳐 보인다. 바라보는 지점만 흔들면 그림은 그대로고
 * 화면만 떨려서, 안전하면서도 같은 인상을 준다.
 */
let shake = 0;
/** 충격량(0..1)을 더한다. 이미 흔들리는 중이면 더 센 쪽을 쓴다 */
function addShake(v: number) { shake = Math.min(1, Math.max(shake, v)); }

/** 달릴수록 시야가 살짝 넓어진다 (속도감) */
let fovBoost = 0;
const BASE_FOV = 70;

function updateCamera(target: CANNON.Vec3, vel: CANNON.Vec3, dt: number) {
  const cx = target.x - Math.sin(yaw) * Math.cos(pitch) * CAM_DIST;
  const cy = target.y + Math.sin(pitch) * CAM_DIST + CAM_HEIGHT;
  const cz = target.z - Math.cos(yaw) * Math.cos(pitch) * CAM_DIST;
  camera.position.lerp(new THREE.Vector3(cx, cy, cz), 0.16);

  // 속도 비례 FOV. 전력질주에서 +6도 정도만 - 더 주면 어지럽다.
  const spd = Math.hypot(vel.x, vel.z);
  const want = Math.min(1, spd / P.maxSpeed) * 6;
  fovBoost += (want - fovBoost) * Math.min(1, dt * 3);
  const fov = BASE_FOV + fovBoost;
  if (Math.abs(camera.fov - fov) > 0.01) { camera.fov = fov; camera.updateProjectionMatrix(); }

  shake = Math.max(0, shake - dt * 3.2);
  const s = shake * shake * 0.5;          // 제곱으로 빠르게 잦아들게
  camera.lookAt(
    target.x + (Math.random() - 0.5) * s,
    target.y + 0.7 + (Math.random() - 0.5) * s,
    target.z + (Math.random() - 0.5) * s,
  );
}

// ---------------------------------------------------------------- 입력
const keys: Record<string, boolean> = {};
let grabEdge = false;
let trickEdge = false;
let stopEdge = false;
let kickEdge = false;
/** 이번에 놓은 킥의 세기 (0..1) */
let kickPower = 0;
/**
 * 킥 차징.
 *
 * 누른 순간이 아니라 "뗀 순간"에 찬다. 짧게 톡 치면 약하게, 꽉 누르고
 * 있다가 놓으면 세게 나간다. 누르고 있던 시간은 누른 사람만 알기 때문에
 * (host가 다시 계산할 수 없다) 세기를 계산해서 입력에 실어 보낸다.
 */
let kickHeldSince = 0;
let kickCharging = false;

function beginKickCharge() {
  if (kickCharging) return;
  kickCharging = true;
  kickHeldSince = performance.now();
}
/** 지금까지 채운 세기 (0..1). HUD 게이지도 이 값을 쓴다 */
function kickChargeNow(): number {
  if (!kickCharging) return 0;
  return Math.min(1, (performance.now() - kickHeldSince) / (B.chargeTime * 1000));
}
function releaseKickCharge() {
  if (!kickCharging) return;
  kickPower = kickChargeNow();
  kickCharging = false;
  kickEdge = true;
  // 내 킥은 이미 자기 연출(fx.kick + 소리 + 흔들림)이 있으므로 "공이 갑자기
  // 날아갔다" 판정에서 빼야 한다. 대신 세게 찬 것은 기억해 뒀다가 잠시 뒤에
  // "그래서 공이 어디까지 갔는지"를 본다 (updateBallDrama의 overkick).
  myKickAt = performance.now() / 1000;
  myKickPower = kickPower;
  if (myKickPower > 0.75) overkickCheck = 1.3;
}
const debugEdge = { R: false, T: false, Y: false, U: false };

window.addEventListener("keydown", (e) => {
  if (e.code === "KeyE" && !keys["KeyE"]) grabEdge = true;
  // 개인기.
  //
  // 스펙에서는 "Space + 방향키"를 예로 들었지만 Space는 이미 점프이고,
  // 달리는 중에는 방향키가 눌려 있는 게 정상이라 그 조합은 "달리며 점프"와
  // 구분할 수가 없다. 그래서 별도 키(Shift)로 뺐다.
  if ((e.code === "ShiftLeft" || e.code === "ShiftRight") && !keys[e.code]) trickEdge = true;
  // 킥 - F를 누르고 있는 동안 세기가 찬다 (놓을 때 나간다)
  if (e.code === "KeyF" && !keys[e.code]) beginKickCharge();
  // 개인기 2 (스톱턴). Shift 조합이 아니라 별도 키다 - 달리는 중에는
  // 방향키가 눌려 있는 게 정상이라 조합키는 다른 동작과 구분되지 않는다.
  if (e.code === "KeyQ" && !keys[e.code]) stopEdge = true;
  if (e.code === "KeyM" && !keys[e.code]) { sfx.setMuted(!sfx.muted); sfx.play("ui"); }
  // 개발용 값 상자 (FPS/Ping/WS/Auth). 기본은 꺼져 있다.
  if (e.code === "KeyH" && !keys[e.code]) { hudOn = !hudOn; updateHud(); }
  if (DEBUG) {
    if (e.code === "KeyR" && !keys["KeyR"]) debugEdge.R = true;
    if (e.code === "KeyT" && !keys["KeyT"]) debugEdge.T = true;
    if (e.code === "KeyY" && !keys["KeyY"]) debugEdge.Y = true;
    if (e.code === "KeyU" && !keys["KeyU"]) debugEdge.U = true;
  }
  keys[e.code] = true;
  if (e.code === "Space") e.preventDefault();
});
window.addEventListener("keyup", (e) => {
  if (e.code === "KeyF") releaseKickCharge();
  keys[e.code] = false;
});
window.addEventListener("blur", () => {
  for (const k of Object.keys(keys)) keys[k] = false;
  // 누른 채 창을 벗어나면 keyup이 안 온다. 차징만 조용히 접는다(킥은 안 나간다)
  kickCharging = false;
});

/**
 * 지금 조준하고 있는 방향 = 카메라 정면의 수평 성분.
 *
 * 킥이 이 값을 쓴다. 이동 입력(readMoveInput)과 따로 두는 이유는, 가만히
 * 서 있으면 이동 입력이 0이라 "어디를 보고 있는가"가 통째로 사라지기
 * 때문이다 (protocol.ts InputState.ax 주석).
 */
function readAimInput(): { ax: number; az: number } {
  const { fx, fz } = cameraBasis(yaw);
  const l = Math.hypot(fx, fz) || 1;
  return { ax: fx / l, az: fz / l };
}

/** 카메라 yaw 기준 월드 이동 벡터 */
function readMoveInput(): { mx: number; mz: number } {
  const { fx, fz, rx, rz } = cameraBasis(yaw);
  let mx = 0, mz = 0;
  if (keys["KeyW"] || keys["ArrowUp"])    { mx += fx; mz += fz; }
  if (keys["KeyS"] || keys["ArrowDown"])  { mx -= fx; mz -= fz; }
  if (keys["KeyA"] || keys["ArrowLeft"])  { mx -= rx; mz -= rz; }
  if (keys["KeyD"] || keys["ArrowRight"]) { mx += rx; mz += rz; }
  const len = Math.hypot(mx, mz);
  if (len > 0) { mx /= len; mz /= len; }
  return { mx, mz };
}

// ---------------------------------------------------------------- Grab
interface GrabLink {
  ownerRag: Ragdoll;
  hand: CANNON.Body;
  objectId: number;
  /**
   * 손↔물체 강체 제약. 들 수 있을 때만 존재하고, 못 드는 물체는 null이다
   * ("밀기 모드" - 아래 updateGripMode 참고).
   */
  constraint: CANNON.PointToPointConstraint | null;
  /** 잡은 뒤 경과 시간 (캐리 힘 ramp-in용) */
  ramp: number;
  /**
   * 붙잡은 지점 - 물체 로컬 좌표.
   *
   * 제약(pivotB)과 "팔이 뻗어갈 목표"가 같은 점을 쓰도록 여기에 보관한다.
   * 로컬로 들고 있어야 물체가 움직이거나 돌아도 손이 같은 자리를 잡고 있는
   * 것처럼 보인다. (월드 좌표로 저장하면 물체를 미는 순간 목표만 뒤에 남는다)
   */
  pivotLocal: CANNON.Vec3;
  /** 이 물체에 대한 최종 목표 maxForce */
  holdForce: number;
  /** 잡기 전 물체의 damping (놓을 때 되돌리기 위해 보관) */
  prevLinearDamping: number;
  prevAngularDamping: number;
  /** 잡기 전 물체의 물리 재질 (놓을 때 되돌리기 위해 보관) */
  prevMaterial: CANNON.Material | null;
}
const grabs: GrabLink[] = [];

function grabsOf(rag: Ragdoll) { return grabs.filter((g) => g.ownerRag === rag); }

function releaseGrabsOf(rag: Ragdoll) {
  for (let i = grabs.length - 1; i >= 0; i--) {
    if (grabs[i].ownerRag === rag) {
      const g = grabs[i];
      if (g.constraint) physics.removeConstraint(g.constraint);
      // 잡는 동안 걸어둔 damping을 원래대로 (안 되돌리면 놓은 뒤에도
      // 물체가 공기 중에서 이상하게 느리게 떨어진다)
      const obj = objectById.get(g.objectId);
      if (obj) {
        obj.body.linearDamping = g.prevLinearDamping;
        obj.body.angularDamping = g.prevAngularDamping;
        // 바닥 마찰도 원래대로 (안 되돌리면 놓은 물체가 계속 미끄러진다)
        obj.body.material = g.prevMaterial;
      }
      grabs.splice(i, 1);
    }
  }
  rag.setHeld([]);
}

/**
 * 손에서 가장 가까운 물체 표면 위의 "붙잡을 점" (물체 로컬 좌표).
 * Box/Sphere를 함께 다룬다 - 축구공은 Sphere라 예전처럼 halfExtents를
 * 그대로 읽으면 NaN이 된다 (shapes.ts 주석 참고).
 */
function grabPivotOn(obj: PhysObject, hand: CANNON.Body): CANNON.Vec3 {
  return surfacePointLocal(obj.body, hand.position);
}

function nearestObjectTo(hand: CANNON.Body): PhysObject | null {
  let best: PhysObject | null = null, bestD = Infinity;
  for (const obj of objects) {
    // 낙하 장애물처럼 잡으면 안 되는 물체는 후보에서 뺀다
    if (obj.grabbable === false) continue;
    // grabRadius(중심까지 거리)는 1차 필터일 뿐이다. 실제 판정은 "물체
    // 표면까지의 거리" 기준으로 한다 - 중심 기준으로만 보면 큰 물체는
    // 2m 밖에서도 잡혀버리고, 그만큼 제약 초기 오차가 커져서 잡는 순간
    // 팔이 끌려가며 캐릭터가 튀어오른다.
    if (obj.body.position.distanceTo(hand.position) > obj.grabRadius) continue;
    const worldPivot = obj.body.position.vadd(obj.body.quaternion.vmult(grabPivotOn(obj, hand)));
    const d = worldPivot.distanceTo(hand.position);
    // 물체가 자기 사거리를 정할 수 있다 (공은 발 앞에 있어서 더 멀다)
    const reach = obj.grabReach ?? P.grabReach;
    if (d < reach && d < bestD) { bestD = d; best = obj; }
  }
  return best;
}

/**
 * 잡는 방식을 물체 무게에 따라 전환한다.
 *
 *  - 들 수 있다  -> 손↔물체를 강체 제약으로 붙인다 (가슴 앞에 들고 다니는 그림)
 *  - 못 든다     -> 제약을 아예 걸지 않는다 ("밀기 모드")
 *
 * [왜 못 드는 물체에는 제약을 안 거는가]
 * 양손을 무거운 물체에 강체로 붙이면 "물체 - 손 - 팔 - 몸통 - 다리 - 지면 - 물체"
 * 라는 닫힌 고리가 생긴다. 반복식(Gauss-Seidel) 솔버는 이 고리를 풀지 못하고
 * 전체를 그냥 굳혀버린다. 실측으로 미는 힘을 230N -> 2000N까지 올려도,
 * 악력을 500N -> 60N까지 낮춰도 이동거리가 0.19m로 똑같았다. 힘이 모자란 게
 * 아니라 고리 자체가 문제였다. 게다가 캐릭터가 자기 팔에 매달려 떠오르면서
 * (pelvisY 0.86 -> 1.04) 접지를 잃어 다리 힘까지 못 쓰게 된다.
 *
 * 제약을 빼면 고리가 사라지고, 물체는 캐리 힘(carry.ts)으로 밀리고 캐릭터는
 * 몸으로 기대어 버틴다. 실제로 냉장고를 잡고 미는 동작과도 맞는 모델이다.
 *
 * 사람이 늘어 들기 예산을 넘기는 순간 자동으로 강체 제약으로 승격되므로
 * "혼자면 밀기만, 둘이 붙으면 번쩍 들어서 운반"이 자연스럽게 나온다.
 */
function updateGripMode(body: CANNON.Body, holderCount: number) {
  const gMag = Math.abs(physics.gravity.y);
  const liftable = body.mass * gMag <= P.carryLiftStrength * holderCount;
  for (const g of grabs) {
    const obj = objectById.get(g.objectId);
    if (!obj || obj.body !== body) continue;

    if (liftable && !g.constraint) {
      // 승격: 지금 손 위치 기준으로 제약을 새로 만든다.
      // 팔이 뻗어갈 목표도 같은 점으로 갱신해서 제약과 그림이 어긋나지 않게 한다.
      const pivotB = grabPivotOn(obj, g.hand);
      g.pivotLocal = pivotB;
      const c = new CANNON.PointToPointConstraint(g.hand, new CANNON.Vec3(0, 0, 0), body, pivotB, g.holdForce);
      for (const eq of c.equations) { eq.maxForce = 0; eq.minForce = -0; }
      physics.addConstraint(c);
      g.constraint = c;
      g.ramp = 0;   // 새로 붙였으니 힘을 다시 0부터 올린다 (스냅 방지)
    } else if (!liftable && g.constraint) {
      physics.removeConstraint(g.constraint);
      g.constraint = null;
    }
  }
}

/**
 * host에서만 실행. 잡을 수 있는 물체를 찾아 양손 모두 붙인다.
 * @returns 이번 호출로 실제로 잡았으면 true
 */
function tryGrab(rag: Ragdoll): boolean {
  if (grabsOf(rag).length > 0) { releaseGrabsOf(rag); return false; }

  // 손별로 따로 판정하면 한 손만 닿아서 Grab:1로 잡히는 경우가 생긴다.
  // 한 손이라도 닿으면 두 손 모두 그 물체에 붙인다 - 그래야 잡는 힘이
  // 좌우 대칭이 되고(안 그러면 몸이 한쪽으로 돌아간다) 악력도 2배가 된다.
  const obj = nearestObjectTo(rag.handL) ?? nearestObjectTo(rag.handR);
  if (!obj) return false;

  // 손 두 개가 각각 링크를 만들므로, 되돌릴 원래 값은 루프 밖에서 한 번만 읽는다.
  // (루프 안에서 읽으면 두 번째 링크가 "이미 바뀐 값"을 원본으로 저장한다)
  const prevMaterial = obj.body.material;
  const prevLinearDamping = obj.body.linearDamping;
  const prevAngularDamping = obj.body.angularDamping;

  for (const hand of [rag.handL, rag.handR]) {
    const pivotB = grabPivotOn(obj, hand);
    // pivotA는 반드시 손 중심 (0,0,0)이어야 한다. 생성 시점의 오차를 없애려고
    // pivotA에 실제 간격을 넣어봤더니, 0.3kg짜리 손에 수십 cm짜리 지렛대가
    // 생겨서 손이 사방으로 튀었다(실측 handY가 0.1~2.4를 오감). 초기 오차는
    // 아래 maxForce 램프로 부드럽게 흡수한다.
    //
    // maxForce는 물체 무게에 맞춰 잡는다. 고정 420이면 무거운 물체(냉장고
    // 28kg = 504N)는 정지 하중만으로도 상한을 넘겨 손에서 계속 미끄러졌다.
    const holdForce = holdForceFor(obj.body, Math.abs(physics.gravity.y));
    // 제약을 여기서 만들지 않는다. 물체가 들 수 있는 무게인지에 따라
    // updateGripMode()가 매 스텝 강체 제약/밀기 모드를 정한다.
    // 다만 pivotB(= 물체 표면의 붙잡은 점)는 지금 기억해 둔다. 제약이 없는
    // 밀기 모드에서도 팔은 이 점을 향해 뻗어야 하기 때문이다.
    grabs.push({
      ownerRag: rag, hand, objectId: obj.id, constraint: null, ramp: 0, holdForce,
      pivotLocal: pivotB,
      prevLinearDamping, prevAngularDamping, prevMaterial,
    });
  }

  // 잡고 있는 동안엔 물체 자체를 감쇠시킨다. 반중력으로 가벼워진 물체가
  // 팔 스프링과 공진해서 펄럭이는 걸 막는 가장 효과적인 방법이다.
  obj.body.linearDamping = Math.max(prevLinearDamping, P.carryObjDamp);
  obj.body.angularDamping = Math.max(prevAngularDamping, P.carryObjAngDamp);
  // 바닥 마찰을 낮춘 재질로 갈아 끼운다 (world.ts heldMat 주석 참고).
  // 이게 없으면 접촉점 4개짜리 마찰(실측 약 400N)이 밀기 예산 400N을 그대로
  // 상쇄해서 "잡히는데 안 밀림"이 된다.
  obj.body.material = world.materials.held;
  obj.body.wakeUp();
  return true;
}

// ---------------------------------------------------------------- 공
//
// 1단계에서는 맵에 놓인 공 하나를 쓴다. 코스/골대는 다음 단계에서 붙인다.
const ballPlay = createBallPlay();

// ---------------------------------------------------------------- 낙하 장애물
//
// 코스 반폭(±7)은 맵이 정하지만 hazards는 그 값만 알면 되므로 여기서 넘긴다.
const hazards = createHazards(world, 7);

// ---------------------------------------------------------------- 코스 장애물
//
// 회전봉 / 좌우 피스톤 / 굴러오는 거대 공. 낙하 장애물과 마찬가지로 바디는
// 맵을 만들 때 미리 만들어 두므로, 여기서는 상태만 진행하면 위치가 기존
// objects 스냅샷을 타고 클라이언트로 간다.
const obstacles = createObstacles(world, 7);

/** 코스 장애물의 소품 id (checkFalls가 건드리지 않게 하기 위해) */
let obstacleIds = new Set<number>();
function refreshObstacleIds() {
  obstacleIds = new Set(world.obstacleSpecs.map((s) => s.id));
}

// ---------------------------------------------------------------- AI 봇
//
// 봇은 host에서만 "생각"하고, 결과로 나오는 몸의 움직임은 기존 래그돌 스냅샷을
// 타고 클라이언트로 간다. 봇 전용 네트워크 메시지는 없다.
// ---------------------------------------------------------------- 연출
//
// 물리와 완전히 분리된 장식이다 (fx.ts 참고). scene 바로 밑에 붙으므로
// world.unloadMap()이 걷어가지 않는다 - 맵을 갈아끼워도 다시 만들 필요가 없다.
const fx = createFx(scene);

// ---------------------------------------------------------------- 머리 위 표시
//
// "화면 속 어느 인형이 나이고 어느 쪽이 친구인가".
//
// [왜 필요한가] 「서로조종」 때문에 내가 조종하는 캐릭터가 내 id의 캐릭터가
// 아니다. 게다가 출발선에서는 둘이 나란히 서 있고 카메라가 그 사이에서
// 시작해서, 실측으로 첫 몇 초 동안 어느 쪽이 내 캐릭터인지 알 방법이 화면에
// 없었다 (HUD의 "조종 중인 캐릭터: P4"는 화면 속 어느 인형이 P4인지까지는
// 알려주지 않는다).
//
// 물리와 무관한 장식이다. 바디도 제약도 만들지 않고 위치만 따라간다.
// 봇에는 안 붙인다 - 봇은 색이 확연히 다르고 등장 배너가 따로 있다.
const HEAD_ME = 0xffffff;
const HEAD_MATE = 0x6ee7ff;
const headMarks = new Map<number, THREE.Mesh>();
/** 표시가 위아래로 살랑이는 데 쓰는 시간 (초) */
let markClock = 0;
// 아래를 가리키는 작은 삼각뿔. 벽 뒤에서도 보이게 depthTest를 끈다
// (친구가 장애물에 가려 있을 때가 정확히 찾아야 하는 순간이다).
const headGeo = new THREE.ConeGeometry(0.17, 0.3, 4);

function headMarkFor(id: number): THREE.Mesh {
  let m = headMarks.get(id);
  if (m) return m;
  const mat = new THREE.MeshBasicMaterial({ color: HEAD_MATE, toneMapped: false });
  mat.depthTest = false;
  mat.depthWrite = false;
  m = new THREE.Mesh(headGeo, mat);
  m.rotation.z = Math.PI;      // 뾰족한 쪽이 머리를 가리킨다
  m.renderOrder = 998;
  m.frustumCulled = false;
  scene.add(m);
  headMarks.set(id, m);
  return m;
}

function updateHeadMarks(t: number) {
  const me = myRag();
  for (const [id, m] of headMarks) {
    if (!playersById.has(id)) { scene.remove(m); (m.material as THREE.Material).dispose(); headMarks.delete(id); }
  }
  for (const e of playersById.values()) {
    if (isBot(e.id)) continue;
    const m = headMarkFor(e.id);
    const mine = e.rag === me;
    m.visible = inGame && game.phase === "playing";
    (m.material as THREE.MeshBasicMaterial).color.setHex(mine ? HEAD_ME : HEAD_MATE);
    // 내 것은 작고 조용하게, 친구 것은 조금 크게 - 찾아야 하는 쪽은 친구다
    m.scale.setScalar(mine ? 0.8 : 1.15);
    // 넘어져 있으면 머리가 바닥에 있다 - 그때도 그 위에 떠 있어야 "저기 쓰러져
    // 있다"가 읽힌다. 그래서 골반이 아니라 머리 파츠를 따라간다.
    const h = e.rag.parts.get("head")?.body.position ?? e.rag.pelvis.position;
    m.position.set(h.x, h.y + 0.62 + Math.sin(t * 3 + e.id) * 0.05, h.z);
    m.rotation.y += 0.02;
  }
}

// 사운드. 음원 파일 없이 WebAudio로 합성한다 (audio.ts 참고).
// 브라우저 자동재생 정책 때문에 첫 사용자 입력에서 unlock() 해야 소리가 난다.
const sfx = createAudio();

// ---------------------------------------------------------------- 소리 중계
//
// [문제] 이 게임의 비-host는 물리를 하나도 안 돌리는 얇은 클라이언트다
// (setAuthority 참고 - 모든 바디가 KINEMATIC이 되고 스냅샷만 따라간다).
// 그런데 킥·드리블 터치·개인기·공 들기 소리는 전부 ball.ts의 판정 결과라
// fixedUpdate의 host 분기 안에서만 울렸다. 실측: 친구(비-host) 탭에서는
// 발소리·착지·카운트다운 말고는 **자기가 F를 눌러 공을 차도 무음**이었다.
//
// [고치는 방법 - 두 갈래]
//  1) 스냅샷만 보고도 알 수 있는 것(넘어짐 · 봇 등장 · 골/실패 · 버튼 문)은
//     받는 쪽에서 직접 관찰해 울린다. 통신이 안 늘고 지연도 없다.
//     이미 있던 watchGatesLocally(패스 성공)와 같은 방식이다.
//  2) 관찰로는 알 수 없는 것(누가 방금 찼다/재꼈다/주웠다)만 스냅샷에
//     얹어 보낸다. 새 메시지도 새 시스템도 만들지 않는다.
//
// 볼륨의 "내가 한 것인가" 보정은 **받는 쪽에서** 건다. 그래서 전송하는
// 값에는 세기 보정만 담고 isMine 배수는 빼 둔다.
const SFX_MAX_PER_SNAPSHOT = 8;
let sfxOut: SfxEvent[] = [];

/** 이 id의 캐릭터가 지금 내가 조종 중인 캐릭터인가 */
function isMyId(id: number | null | undefined): boolean {
  if (id === null || id === undefined) return false;
  const me = net.id;
  return me !== null && controlTargetOf(me) === id;
}

/** "그 캐릭터가 낸 소리"를 내 기준 볼륨으로 재생한다 */
function playFor(n: SfxName, by: number | null | undefined, vol = 1, rate?: number) {
  const near = by === null || by === undefined ? 1 : (isMyId(by) ? 1 : 0.4);
  sfx.play(n, { vol: vol * near, rate });
}

/**
 * 소리를 내면서, host라면 같은 소리를 스냅샷에 실어 보낸다.
 * @param by 이 소리를 낸 캐릭터의 id (월드 이벤트면 null)
 */
function netSfx(n: SfxName, by: number | null, vol = 1, rate?: number) {
  playFor(n, by, vol, rate);
  if (!authority || net.offline) return;
  // 같은 이름이 이미 이번 묶음에 들어 있으면 보내지 않는다.
  //
  // [왜] 스냅샷 한 번(1/20초) 안에 드리블 터치가 여러 번 들어간다. 실측으로
  // 공에 붙어 있는 동안 한 묶음에 touch가 8개까지 찼는데, 받는 쪽은 그걸
  // 같은 JS 턴에 한꺼번에 재생하므로 ctx.currentTime이 전부 같고 결국
  // audio.ts의 MIN_GAP(touch 0.05초)에서 첫 개만 살아남는다. 즉 나머지는
  // 회선만 잡아먹고 소리로는 이어지지 않는다. 보내는 쪽에서 미리 접는다.
  if (sfxOut.some((s) => s.n === n)) return;
  if (sfxOut.length < SFX_MAX_PER_SNAPSHOT) sfxOut.push({ n, p: by ?? undefined, v: vol, r: rate });
}
for (const ev of ["pointerdown", "keydown"] as const) {
  window.addEventListener(ev, () => sfx.unlock(), { once: false, passive: true });
}

/**
 * 개인기 직후 공에 잔상을 남기는 남은 시간 (사람별).
 *
 * 개인기는 0.4초 만에 끝나서 한 프레임짜리 이펙트로는 "뭔가 번쩍했다"로 끝난다.
 * 공이 실제로 어느 쪽으로 넘어갔는지가 보여야 무슨 기술인지 이해되므로,
 * 잠깐 동안 공이 지나간 자리에 점을 남긴다.
 */
const trickTrail = new Map<Ragdoll, number>();
/** 이 래그돌이 지금 내 화면이 따라다니는 캐릭터인가 (소리/흔들림은 여기만 강하게) */
/**
 * 발소리 / 착지음.
 *
 * 보행 위상(swingPhase)이 반 바퀴 돌 때마다 한 발이 땅에 닿는다. 그 순간에
 * 소리를 내면 눈에 보이는 걸음과 소리가 맞는다 (일정 간격으로 내면 어긋난다).
 */
const stepPhase = new Map<Ragdoll, number>();
const wasAir = new Map<Ragdoll, boolean>();
/**
 * 비-host에서 걸음을 재구성하기 위한 직전 위치와 누적 이동 거리.
 *
 * [왜 필요한가] 발소리는 swingPhase(보행 위상)와 grounded를 본다. 둘 다
 * control() 안에서 갱신되는데 비-host는 control()을 아예 안 돌린다 - 바디가
 * KINEMATIC이고 스냅샷 위치만 대입되므로 velocity도 0이다. 그래서 조건
 * (`!grounded || spd < 0.6`)에 항상 걸려 **친구 화면에서는 발소리도 착지음도
 * 한 번도 안 났다.** 발소리를 스냅샷에 실어 보내는 건 낭비이므로(초당 수십 개)
 * 받는 쪽에서 위치 변화만 보고 다시 만든다.
 */
const walkTrack = new Map<Ragdoll, { x: number; y: number; z: number; dist: number; air: boolean }>();
/** 이 거리를 걸을 때마다 한 발 (전력질주 4.5m/s에서 초당 5회쯤) */
const STRIDE = 0.9;
/** 이 높이보다 위에 있으면 떠 있는 것으로 본다 (골반 기준) */
const AIR_Y = P.rideHeight + 0.35;

function updateFootsteps(rag: Ragdoll, dt: number) {
  const mine = isMine(rag);
  if (!authority) { footstepsFromSnapshot(rag, dt, mine); return; }

  const spd = Math.hypot(rag.pelvis.velocity.x, rag.pelvis.velocity.z);
  // 착지
  const air = !rag.grounded;
  if (wasAir.get(rag) && !air) {
    sfx.play("land", { vol: mine ? 0.9 : 0.3 });
    if (mine && rag.pelvis.velocity.y < -4) addShake(0.2);
  }
  wasAir.set(rag, air);
  // 발소리
  if (!rag.grounded || spd < 0.6 || rag.state !== "ACTIVE") return;
  const half = Math.floor(rag.swingPhase / Math.PI);
  if (stepPhase.get(rag) !== half) {
    stepPhase.set(rag, half);
    sfx.play("step", { vol: (mine ? 0.9 : 0.25) * Math.min(1, spd / P.maxSpeed), rate: 0.9 + Math.random() * 0.2 });
  }
}

/** 비-host용. 위치가 얼마나 움직였는지만 보고 발소리/착지음을 만든다 */
function footstepsFromSnapshot(rag: Ragdoll, dt: number, mine: boolean) {
  const p = rag.pelvis.position;
  const prev = walkTrack.get(rag);
  if (!prev) { walkTrack.set(rag, { x: p.x, y: p.y, z: p.z, dist: 0, air: false }); return; }

  const step = Math.hypot(p.x - prev.x, p.z - prev.z);
  const spd = step / Math.max(1e-3, dt);
  const air = p.y > AIR_Y;

  // 착지 - 떠 있다가 내려앉은 순간
  if (prev.air && !air) {
    sfx.play("land", { vol: mine ? 0.9 : 0.3 });
    if (mine && p.y - prev.y < -0.08) addShake(0.2);
  }

  // 순간이동(낙사 회수 / 맵 전환)은 걸은 게 아니다
  let dist = prev.dist + (step > 2 ? 0 : step);
  if (!air && rag.state === "ACTIVE" && spd > 0.6 && dist >= STRIDE) {
    dist -= STRIDE;
    sfx.play("step", { vol: (mine ? 0.9 : 0.25) * Math.min(1, spd / P.maxSpeed), rate: 0.9 + Math.random() * 0.2 });
  }
  if (dist > STRIDE * 2) dist = 0;   // 멈춰 있는 동안 쌓이지 않게
  walkTrack.set(rag, { x: p.x, y: p.y, z: p.z, dist, air });
}

function isMine(rag: Ragdoll): boolean {
  const id = net.id;
  if (id === null) return false;
  const e = playersById.get(controlTargetOf(id));
  return !!e && e.rag === rag;
}
/** 잔상을 몇 프레임에 한 번 찍을지 세는 카운터 */
let trailSkip = 0;

const bots = createBots(7);

/**
 * host 전용. 봇 등장 이벤트.
 *
 * [왜 처음부터 세워두지 않는가] 전에는 게임이 시작되는 순간 봇 2마리가
 * 코스 중간에 서 있었다. 출발선에서 이미 보이니까 놀랄 일이 없고, 봇도
 * 하는 일 없이 공만 기다렸다. 지금은 "그 구간에 들어서면 그때 튀어나온다".
 *
 * 등장 조건은 사람 플레이어 중 가장 앞선 사람의 z다. 입력이 아니라 위치를
 * 보는 것이므로 치팅이 아니고, 등장한 뒤의 행동은 기존 bot.ts 그대로
 * (공의 위치/속도만 보고 움직인다).
 */
function updateBotSpawns() {
  if (!authority) return;
  const spots = world.map.botSpawns ?? [];
  if (spots.length === 0) return;

  // 사람 중 가장 많이 전진한 사람 (코스는 -Z 방향으로 간다)
  let lead = Infinity;
  for (const e of playersById.values()) {
    if (isBot(e.id)) continue;
    lead = Math.min(lead, e.rag.pelvis.position.z);
  }
  if (!isFinite(lead)) return;

  for (let i = 0; i < spots.length; i++) {
    const id = -(i + 1);
    if (playersById.has(id)) continue;
    // 등장 지점보다 BOT_APPEAR_AHEAD 앞까지 오면 그 자리에 나타난다.
    if (lead > spots[i][1] + BOT_APPEAR_AHEAD) continue;
    spawnPlayer(id, spots[i]);
    // 등장은 놀라야 의미가 있다 - 소리와 화면 흔들림을 같이 준다
    sfx.play("botSpawn");
    // 등장은 놀라야 의미가 있다. 화면을 크게 흔들고 배너를 띄운다.
    addShake(0.85);
    showAlert("방해꾼 등장!");
    // 발밑에서 링이 두 겹 퍼지고 사방으로 먼지가 인다
    fx.kick(spots[i][0], 0.05, spots[i][1], 1);
    fx.kick(spots[i][0], 0.05, spots[i][1], 0.5);
    for (const [dx, dz] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
      fx.dash(spots[i][0], spots[i][1], dx, dz);
    }
  }
}

/** 이만큼 앞까지 접근하면 봇이 등장한다 (m) */
const BOT_APPEAR_AHEAD = 26;

/** host 전용. 맵을 새로 켤 때 봇을 전부 치운다 (등장은 이벤트로 다시 일어난다) */
function spawnBots() {
  if (!authority) return;
  for (const id of [...playersById.keys()]) if (isBot(id)) despawnPlayer(id);
}

/** 봇을 전부 치운다 (권한을 잃었을 때 - 그때부터는 host가 보내주는 대로만 그린다) */
function despawnBots() {
  for (const id of [...playersById.keys()]) if (isBot(id)) despawnPlayer(id);
}

/**
 * 낙하 경고 링.
 *
 * 장애물이 떨어질 자리에 바닥 링을 그린다. 장애물이 낮아질수록 링이 진해지고
 * 작아져서 "언제 떨어지는지"가 눈으로 읽힌다.
 *
 * [동기화가 필요 없는 이유] 링은 오직 장애물의 "현재 높이와 위치"만 보고
 * 그린다. 그 위치는 이미 기존 objects 스냅샷으로 모든 클라이언트에 와 있으므로,
 * host든 client든 같은 링을 그린다. 경고용 메시지를 따로 보낼 필요가 없다.
 */
const warnRings: THREE.Mesh[] = [];
const warnGroup = new THREE.Group();
scene.add(warnGroup);
function updateWarnRings() {
  const marks = hazards.activeMarkers();
  while (warnRings.length < marks.length) {
    const m = new THREE.Mesh(
      new THREE.RingGeometry(0.62, 1, 40),
      new THREE.MeshBasicMaterial({
        color: 0xff3b5c, transparent: true, opacity: 0.8,
        depthWrite: false, toneMapped: false, side: THREE.DoubleSide,
      })
    );
    m.rotation.x = -Math.PI / 2;
    warnGroup.add(m);
    warnRings.push(m);
  }
  for (let i = 0; i < warnRings.length; i++) {
    const r = warnRings[i];
    const mk = marks[i];
    if (!mk) { r.visible = false; continue; }
    r.visible = true;
    // 높을수록 크고 옅게, 가까워질수록 작고 진하게
    const t = Math.min(1, Math.max(0, mk.y / HZ.hoverY));
    const scale = mk.r * (1.25 + t * 1.35);
    r.scale.set(scale, scale, 1);
    r.position.set(mk.x, 0.05, mk.z);
    (r.material as THREE.MeshBasicMaterial).opacity = 0.35 + (1 - t) * 0.5;
  }
}

// ---------------------------------------------------------------- 공 위치 표시
//
// [왜 필요한가] game.ts가 공 위에 3D 화살표를 띄우지만, 그건 공이 화면 안에
// 있을 때만 보인다. 실측으로 봇에게 한 번 걷어차이면 공이 등 뒤 수십 미터로
// 사라졌고, 그때부터는 어느 쪽으로 돌아야 하는지 알 방법이 아예 없었다
// (코스가 일직선이라 뒤를 봐도 똑같이 생겼다).
//
// 그래서 공이 화면 밖에 있는 동안만 화면 가장자리에 방향 화살표와 거리를
// 띄운다. 읽기만 하는 표시라 물리/네트워크와 무관하고, 각 클라이언트가
// 자기 카메라로 계산하므로 동기화할 것도 없다.

const elBallCue = document.getElementById("ball-cue");
const elBallCueArrow = document.getElementById("ball-cue-arrow");
const elBallCueDist = document.getElementById("ball-cue-dist");
/**
 * 화면 가장자리에서 이만큼 안쪽에 붙인다 (px).
 *
 * 표시 전체(화살표 30px + 거리 글자 + 알약 여백 = 약 58px 높이)의 절반인
 * 29px보다 넉넉히 커야 모서리에서 잘리지 않는다. 그렇다고 너무 키우면
 * "가장자리에서 가리키는" 느낌이 사라지고 화면 한복판을 가린다.
 */
const CUE_MARGIN = 72;

/**
 * 화면 밖에 있는 지점을 가장자리 화살표로 가리킨다.
 *
 * 공과 친구가 같은 장치를 쓴다 (색만 다르다). 화면 안에 있으면 표시를 감춘다.
 * 읽기 전용이라 물리/네트워크와 무관하고, 각자 자기 카메라로 계산한다.
 */
function placeCue(
  el: HTMLElement | null, arrow: HTMLElement | null, dist: HTMLElement | null,
  at: CANNON.Vec3 | null, from: CANNON.Body | null, margin: number,
) {
  if (!el || !arrow || !dist) return;
  if (!at || !from || !inGame) { el.hidden = true; return; }

  const v = new THREE.Vector3(at.x, at.y, at.z);
  // NDC로 투영한다. w가 음수면 카메라 뒤라서 project()의 x/y 부호가 뒤집히므로
  // 직접 뒤집어 준다 (안 하면 등 뒤의 대상이 정반대 방향을 가리킨다).
  const behind = v.clone().sub(camera.position).dot(
    camera.getWorldDirection(new THREE.Vector3())
  ) < 0;
  const ndc = v.clone().project(camera);
  let nx = behind ? -ndc.x : ndc.x;
  let ny = behind ? -ndc.y : ndc.y;

  const onScreen = !behind && Math.abs(ndc.x) <= 1 && Math.abs(ndc.y) <= 1;
  if (onScreen) { el.hidden = true; return; }

  // 화면 밖 방향을 가장자리로 눌러 붙인다
  const m = Math.max(Math.abs(nx), Math.abs(ny)) || 1;
  nx /= m; ny /= m;
  const hw = window.innerWidth / 2 - margin;
  const hh = window.innerHeight / 2 - margin;
  const px = window.innerWidth / 2 + nx * hw;
  const py = window.innerHeight / 2 - ny * hh;

  el.hidden = false;
  el.style.transform = `translate(${px.toFixed(0)}px, ${py.toFixed(0)}px) translate(-50%, -50%)`;
  // 화살표만 회전시킨다 (거리 글자까지 돌면 못 읽는다)
  const deg = Math.atan2(nx, ny) * 180 / Math.PI - 90;
  arrow.style.transform = `rotate(${deg.toFixed(0)}deg)`;
  dist.textContent = `${Math.hypot(at.x - from.position.x, at.z - from.position.z).toFixed(0)}m`;
}

function updateBallCue(target: CANNON.Body | null) {
  placeCue(elBallCue, elBallCueArrow, elBallCueDist, ballBody()?.position ?? null, target, CUE_MARGIN);
}

// ---------------------------------------------------------------- 친구 위치 표시
//
// [왜 필요한가] 코스가 200m 일직선이고 카메라는 진행 방향만 본다. 그래서
// 친구가 뒤에 처지거나 지름길로 새면 화면에서 통째로 사라지고, 어디 있는지
// 알 방법이 없었다. 버튼 문(한 명은 발판, 한 명은 공)처럼 갈라서야 하는
// 장치에서는 그게 곧 "협동이 성립하지 않는다"가 된다.
//
// 공 표시와 같은 함수를 쓰고 색(청록)과 크기만 다르다. 사람이 여럿이면
// 제일 가까운 한 명만 가리킨다 - 화살표가 여러 개 뜨면 그때부터는 장식이다.
const elMateCue = document.getElementById("mate-cue");
const elMateCueArrow = document.getElementById("mate-cue-arrow");
const elMateCueDist = document.getElementById("mate-cue-dist");
/** 공 표시보다 살짝 안쪽에 붙여 둘이 같은 자리에서 겹치지 않게 한다 */
const MATE_CUE_MARGIN = 112;

function updateMateCue(target: CANNON.Body | null) {
  const me = myRag();
  let best: CANNON.Vec3 | null = null;
  let bestD = Infinity;
  if (target && me) {
    for (const e of playersById.values()) {
      if (isBot(e.id) || e.rag === me) continue;
      const p = e.rag.pelvis.position;
      const d = Math.hypot(p.x - target.position.x, p.z - target.position.z);
      if (d < bestD) { bestD = d; best = p; }
    }
  }
  placeCue(elMateCue, elMateCueArrow, elMateCueDist, best, target, MATE_CUE_MARGIN);
}

world.onMapLoaded(() => {
  hazards.rebuild(); obstacles.rebuild(); refreshObstacleIds();
  if (inGame) spawnBots();
  if (inGame) startCountdown();
  botHintsShown = 0;
  rushHintsShown = 0;
  brakeHintsShown = 0;
  skillHintCd = 0;
  gateHintsShown = 0;
  gateOpenHinted = new Set();
  slotHintShown = new Set();
  slotPassed = new Set();
  slotIdle = 0;
  seenGateOpen = new Set();
  passFrom = null;
  ballBestZ = null; backstopTold = false;
});
hazards.rebuild();
obstacles.rebuild();
refreshObstacleIds();

/** 지금 맵의 공. 없으면 null (공이 없는 맵도 있을 수 있다) */
function ballBody(): CANNON.Body | null {
  const o = objectById.get(BALL_ID);
  return o ? o.body : null;
}

// ---------------------------------------------------------------- 네트워크
// 소켓은 아직 열지 않는다. 타이틀 화면에서 모드를 고르면 menu.ts가
// net.connect() 또는 net.goOffline()을 부른다.
const net = new Net();
let authority = false;   // host면 true
/** 대기실을 지나 실제 게임 화면으로 들어왔는가. 그 전에는 래그돌을 스폰하지 않는다 */
let inGame = false;

const remoteInputs = new Map<number, InputState>();
const snapTargets = new Map<number, { pos: THREE.Vector3[]; quat: THREE.Quaternion[] }>();
const objTargets = new Map<number, { p: THREE.Vector3; q: THREE.Quaternion }>();

/**
 * 권한이 아직 한 번도 적용되지 않았음을 표시한다.
 *
 * 예전엔 `if (authority === isHost) return;` 하나뿐이었는데, authority의 초기값이
 * false라 비-host가 처음 setAuthority(false)를 받으면 그대로 빠져나갔다. 그래서
 * 비-host의 소품과 래그돌이 KINEMATIC으로 안 바뀌고 DYNAMIC인 채로 남아, 스냅샷
 * 보간과 자체 물리가 서로 밀어내며 떨렸다. 첫 호출은 값이 같아도 반드시 적용한다.
 */
let authorityApplied = false;

function setAuthority(isHost: boolean) {
  if (authorityApplied && authority === isHost) return;
  authorityApplied = true;
  authority = isHost;
  // 비-host는 모든 물리 오브젝트를 kinematic으로 두고 스냅샷을 따라간다
  for (const obj of objects) {
    obj.body.type = isHost ? CANNON.Body.DYNAMIC : CANNON.Body.KINEMATIC;
    // 질량은 world.ts가 소품마다 들고 있는 값으로 되돌린다.
    // (예전엔 "id 3이면 무겁고 나머진 4"가 여기 박혀 있어서, 소품을 늘리는
    //  순간 권한 전환 한 번에 모든 소품 질량이 4로 뭉개졌다)
    obj.body.mass = isHost ? obj.mass : 0;
    if (!isHost) { obj.body.velocity.setZero(); obj.body.angularVelocity.setZero(); }
    obj.body.updateMassProperties();
    obj.body.wakeUp();
  }
  for (const e of playersById.values()) applyRagdollAuthority(e.rag, isHost);
  // 봇은 host만 굴린다. 권한을 넘겨받으면 세우고, 잃으면 치운다
  // (그때부터는 새 host가 보내주는 스냅샷대로 그리기만 한다).
  if (inGame) { if (isHost) spawnBots(); else despawnBots(); }
  if (!isHost) {
    for (const g of grabs) if (g.constraint) physics.removeConstraint(g.constraint);
    grabs.length = 0;
  }
}

function applyRagdollAuthority(rag: Ragdoll, isHost: boolean) {
  for (const b of rag.bodies) {
    b.type = isHost ? CANNON.Body.DYNAMIC : CANNON.Body.KINEMATIC;
    if (!isHost) { b.velocity.setZero(); b.angularVelocity.setZero(); }
    b.updateMassProperties();
  }
}

net.on((msg) => {
  // 대기실에 있는 동안(inGame=false)은 방 인원이 오가는 걸 menu.ts가 그리기만
  // 하고, 여기서는 아무도 스폰하지 않는다. 게임은 host가 [게임 시작]을 눌러
  // gameStart가 올 때 beginSession()에서 한꺼번에 시작된다.
  if (!inGame) return;

  switch (msg.type) {
    case "welcome": {
      spawnPlayer(msg.id);
      for (const p of msg.players) spawnPlayer(p);
      setAuthority(net.isHost);
      break;
    }
    case "host":
      setAuthority(net.isHost);
      break;
    case "playerJoined":
      spawnPlayer(msg.id);
      if (authority) applyRagdollAuthority(playersById.get(msg.id)!.rag, true);
      break;
    case "playerLeft":
      despawnPlayer(msg.id);
      remoteInputs.delete(msg.id);
      break;
    case "input":
      if (!authority) break;
      remoteInputs.set(msg.id, msg.input);
      break;
    case "restart":
      // 비-host가 누른 [다시하기]. 월드를 되돌릴 수 있는 건 host뿐이다.
      if (authority) game.restart();
      break;
    case "nextMap":
      // 비-host가 누른 [다음 맵]. 맵 로드도 host만 한다 (물리 권위).
      if (authority) game.nextMap();
      break;
    case "snapshot": {
      if (authority) break;
      if (msg.game) game.applyRemote(msg.game);
      // host가 낸 소리를 여기서 울린다. "내가 한 것인가"는 받는 쪽 기준으로
      // 다시 계산한다 (보낸 값에는 세기 보정만 들어 있다).
      if (msg.sfx) for (const s of msg.sfx) playFor(s.n as SfxName, s.p, s.v ?? 1, s.r);
      for (const rs of msg.ragdolls) {
        spawnPlayer(rs.id);
        const pos: THREE.Vector3[] = [];
        const quat: THREE.Quaternion[] = [];
        for (let i = 0; i < rs.b.length; i += 7) {
          pos.push(new THREE.Vector3(rs.b[i], rs.b[i + 1], rs.b[i + 2]));
          quat.push(new THREE.Quaternion(rs.b[i + 3], rs.b[i + 4], rs.b[i + 5], rs.b[i + 6]));
        }
        snapTargets.set(rs.id, { pos, quat });
        // host가 보낸 상태를 그대로 비춘다. 안 하면 상대 화면에서는 쓰러진
        // 캐릭터가 계속 ACTIVE로 남아 발소리 같은 연출이 어긋난다.
        playersById.get(rs.id)?.rag.setNetState(rs.st as RagdollState);
      }
      for (const o of msg.objects) {
        objTargets.set(o.id, {
          p: new THREE.Vector3(o.p[0], o.p[1], o.p[2]),
          q: new THREE.Quaternion(o.r[0], o.r[1], o.r[2], o.r[3]),
        });
      }
      break;
    }
  }
});

// ---------------------------------------------------------------- 낙사 / 리스폰
//
// 3단계에서 넉백이 생기면서 코스 밖으로 튕겨나갈 수 있게 됐다. 코스는 하늘 위에
// 떠 있으므로 한 번 벗어나면 되돌아올 방법이 없다 - 최소한의 복구를 둔다.
//
// [왜 "떨어진 자리"로 되살리는가]
// 출발점으로 되돌리면 90m를 다시 뛰어야 해서 한 번의 사고가 판 전체를 날린다.
// 떨어진 지점 조금 뒤(코스 한가운데)에 세우면 진행은 지키면서 실수의 대가는
// 남는다. 체크포인트를 따로 두지 않은 이유는 4~5단계에서 코스 구조가 더
// 바뀔 예정이라, 지금 고정 지점을 박아두면 곧 다시 옮겨야 하기 때문이다.

/** 떨어진 걸로 보는 높이 */
const VOID_Y = HZ.voidY;

/** 코스 안쪽으로 되돌릴 z 범위 (맵 스폰 지점에서 유도) */
function courseZRange(): [number, number] {
  const sp = spawns();
  const startZ = Math.max(...sp.map((s) => s[1]));
  // 코스 끝은 목표 지점 기준. 맵이 바뀌어도 따라간다.
  const endZ = world.map.goal.z;
  return [Math.min(startZ, endZ) + 3, Math.max(startZ, endZ) - 1];
}

/**
 * 코스 아래에 끼어 있던 시간 (id별 / 공은 BALL_ID).
 *
 * [왜 필요한가] 낙사 복구는 y가 VOID_Y(-8) 아래로 내려가야 걸린다. 그런데
 * 좁은 다리 모서리에서는 그 아래로 떨어지지 않고 판 옆구리에 걸려서 멈춘다 -
 * 실측으로 사람이 y=-0.37, 공이 y=-1.7에서 접지 없이 70초 넘게 그대로였고,
 * 스테이지 2가 그 상태로 시간 초과로 끝났다. 바닥 윗면이 y=0이므로 그보다
 * 확실히 아래에서 접지도 없이 오래 있으면 "빠졌다"로 보고 되돌린다.
 */
const WEDGE_Y = -0.3;
const WEDGE_TIME = 1.5;
const wedgeTimer = new Map<number, number>();

/**
 * 서 있는데 파묻혀서 못 움직이는 경우.
 *
 * [실측] 지름길 선반(x≈10)에서 본선 쪽으로 나오다 난간 밑동에 끼면 골반이
 * y=0.37에 박힌 채 grounded=true / state=ACTIVE 로 남는다. 그 상태로 W를
 * 계속 눌러도 600프레임(10초) 동안 0.5m밖에 못 갔다. 위의 두 복구가 전부
 * 안 걸린다 - VOID_Y(-8)는 한참 아래고, WEDGE_Y(-0.3)는 "떠 있을 때"만 보는데
 * 여기서는 접지로 판정되기 때문이다. 2인 협동에서 한 명이 이렇게 되면 그
 * 판은 사실상 끝난다.
 *
 * [오작동하지 않는 이유] 세 조건이 동시에 필요하다 - 서 있고(ACTIVE),
 * 골반이 정상 높이보다 확실히 낮고(0.61 미만; 평지는 0.86, 난간 위 턱은 0.8),
 * 그러고도 2.5초 동안 제자리다. 닫힌 셔터에 W를 대고 기다리는 흔한 상황은
 * 높이가 정상이라 걸리지 않는다.
 */
const STUCK_Y = P.rideHeight - 0.25;
const STUCK_TIME = 2.5;
const STUCK_MOVE = 0.35;
const stuckTimer = new Map<number, number>();
const stuckFrom = new Map<number, { x: number; z: number }>();

function checkFalls() {
  const [zMin, zMax] = courseZRange();
  const clampZ = (z: number) => Math.max(zMin, Math.min(zMax, z));

  for (const e of playersById.values()) {
    const p = e.rag.pelvis.position;
    // 판 아래에 접지 없이 오래 걸려 있으면 낙사와 똑같이 처리한다
    let wedged = false;
    if (p.y < WEDGE_Y && !e.rag.grounded) {
      const t = (wedgeTimer.get(e.id) ?? 0) + FIXED_DT;
      wedgeTimer.set(e.id, t);
      wedged = t > WEDGE_TIME;
    } else {
      wedgeTimer.delete(e.id);
    }
    if (wedged) wedgeTimer.delete(e.id);

    // 서 있는 채로 지형에 파묻혀 못 나오는 경우 (stuckTimer 주석 참고)
    let stuck = false;
    if (!wedged && e.rag.state === "ACTIVE" && p.y < STUCK_Y) {
      const from = stuckFrom.get(e.id);
      if (!from || Math.hypot(p.x - from.x, p.z - from.z) > STUCK_MOVE) {
        stuckFrom.set(e.id, { x: p.x, z: p.z });
        stuckTimer.set(e.id, 0);
      } else {
        const t = (stuckTimer.get(e.id) ?? 0) + FIXED_DT;
        stuckTimer.set(e.id, t);
        stuck = t > STUCK_TIME;
      }
    } else {
      stuckFrom.delete(e.id);
      stuckTimer.delete(e.id);
    }
    if (stuck) { stuckFrom.delete(e.id); stuckTimer.delete(e.id); }

    if (p.y > VOID_Y && !wedged && !stuck) continue;
    releaseGrabsOf(e.rag);
    e.rag.reset(new CANNON.Vec3(0, P.rideHeight + 0.15, clampZ(p.z + 4)));
    e.input.moveX = 0; e.input.moveZ = 0; e.input.jump = false;
    e.grabPending = false; e.trickPending = false; e.stopPending = false; e.kickPending = false;
  }

  // 공도 같이 챙긴다. 공만 떨어지면 게임이 그냥 멈춰버린다.
  const ball = objectById.get(BALL_ID);
  let ballWedged = false;
  if (ball) {
    // 공은 판 위에 있으면 y=0.3이다. 그보다 아래에 오래 있으면 빠진 것이다.
    if (ball.body.position.y < WEDGE_Y) {
      const t = (wedgeTimer.get(BALL_ID) ?? 0) + FIXED_DT;
      wedgeTimer.set(BALL_ID, t);
      ballWedged = t > WEDGE_TIME;
    } else {
      wedgeTimer.delete(BALL_ID);
    }
    if (ballWedged) wedgeTimer.delete(BALL_ID);
  }
  if (ball && (ball.body.position.y <= VOID_Y || ballWedged)) {
    // 사람들이 있는 자리 근처로 돌려준다 (아무도 없으면 출발 구역)
    const ps = [...playersById.values()];
    const z = ps.length
      ? ps.reduce((a, e) => a + e.rag.pelvis.position.z, 0) / ps.length
      : zMax;
    ball.body.position.set(0, 1.2, clampZ(z - 1.5));
    ball.body.velocity.setZero();
    ball.body.angularVelocity.setZero();
    ball.body.force.setZero();
    ball.body.torque.setZero();
    ball.body.wakeUp();
  }

  // 장애물이 코스 밖으로 나갔으면 대기 위치로 회수한다 (안 하면 영영 안 돌아온다)
  for (const o of objects) {
    if (o.grabbable !== false) continue;
    // 코스 장애물(회전봉/피스톤/거대 공)은 obstacles.ts가 자기 상태기계로
    // 제자리에 돌려놓는다. 여기서 낙하물 대기 높이(hoverY)로 올려버리면
    // 대기 중인 거대 공이 코스 위에 떠 있는 꼴이 된다.
    if (obstacleIds.has(o.id)) continue;
    if (o.body.position.y > VOID_Y) continue;
    o.body.position.set(0, HZ.hoverY, o.body.position.z);
    o.body.velocity.setZero();
    o.body.angularVelocity.setZero();
  }
}

// ---------------------------------------------------------------- 게임 규칙
//
// 물리/캐릭터 쪽은 그대로 두고, 게임 진행(목표/타이머/판정/재시작)만
// game.ts가 얹는다. 월드를 되돌리는 일만 여기서 해준다 - 래그돌과 grab
// 링크는 main.ts가 소유하고 있어서 game.ts가 직접 만질 수 없다.

/** host 전용. 소품과 캐릭터를 라운드 시작 상태로 되돌린다. */
function resetWorld() {
  // 다시하기/다음 맵에서도 카운트다운부터 시작한다
  startCountdown();
  // 공이 출발점으로 돌아갔으니 되밀림 기준도 같이 지운다.
  // (안 지우면 지난 판의 최전진 지점이 남아 새 판 시작부터 한계선에 걸린다)
  ballBestZ = null; backstopTold = false;
  // 다시하기는 새 시도다. 상황 안내도 다시 뜰 수 있게 되돌린다.
  slotHintShown = new Set();
  slotPassed = new Set();
  slotIdle = 0;
  gateHintsShown = 0;
  gateOpenHinted = new Set();
  // 사고 연출도 새 판 기준으로 되돌린다. 특히 ballSeen을 안 지우면 스폰
  // 지점으로 돌아간 공의 텔레포트가 "뻥 날아갔다"로 잡힌다.
  ballSeen = false;
  ballFalling = false;
  ballTrail = 0;
  blastCool = 0;
  overkickCheck = 0;
  fallingNow.clear();
  dramaAt.clear();
  dramaAnyAt = -1e9;
  // 1) 잡고 있던 것부터 전부 놓는다 (제약을 남긴 채 텔레포트하면 폭발한다)
  for (const e of playersById.values()) releaseGrabsOf(e.rag);
  for (const g of grabs) if (g.constraint) physics.removeConstraint(g.constraint);
  grabs.length = 0;

  // 2) 소품 복구
  for (const o of objects) {
    const home = propHome.get(o.id);
    if (!home) continue;
    o.body.position.copy(home.p);
    o.body.quaternion.copy(home.q);
    o.body.velocity.setZero();
    o.body.angularVelocity.setZero();
    o.body.force.setZero();
    o.body.torque.setZero();
    o.body.linearDamping = home.ld;
    o.body.angularDamping = home.ad;
    o.body.updateMassProperties();
    o.body.wakeUp();
    // 렌더 메시도 같이 옮겨둔다 (다음 프레임까지 이전 위치가 한 번 비치는 걸 방지)
    o.mesh.position.set(home.p.x, home.p.y, home.p.z);
    o.mesh.quaternion.set(home.q.x, home.q.y, home.q.z, home.q.w);
  }

  // 3) 캐릭터 복구. rag.reset()이 속도/힘/관절 상태까지 정리해 준다.
  //    봇은 사람 스폰 지점이 아니라 자기 자리(맵의 botSpawns)로 돌려보낸다.
  let i = 0, bi = 0;
  const botSpots = world.map.botSpawns ?? [];
  for (const e of playersById.values()) {
    const sp = spawns();
    const [sx, sz] = isBot(e.id) && botSpots.length
      ? botSpots[bi++ % botSpots.length]
      : sp[i++ % sp.length];
    e.rag.reset(new CANNON.Vec3(sx, P.rideHeight + 0.15, sz));
    e.input.moveX = 0; e.input.moveZ = 0; e.input.jump = false;
    e.grabPending = false;
    e.trickPending = false;
    e.kickPending = false;
  }
  for (const inp of remoteInputs.values()) inp.grab = false;
  snapTargets.clear();
  objTargets.clear();
}

const game = createGame(world, {
  isAuthority: () => authority,
  resetWorld,
  requestRestartRemote: () => net.send({ type: "restart" }),
  requestNextMapRemote: () => net.send({ type: "nextMap" }),
  // 안고 들어가는 건 골이 아니다 (game.ts checkCross 주석)
  isBallCarried: () => grabs.some((g) => g.objectId === BALL_ID),
  onGoal: () => {
    sfx.play("goal");
    addShake(0.7);
    // 골대 앞에서 색종이처럼 링이 퍼진다
    const gz = world.map.goal.z;
    for (let i = 0; i < 4; i++) fx.kick(world.map.goal.x + (i - 1.5) * 1.6, 0.05, gz + 1.5, 1);
  },
  onFail: () => sfx.play("fail"),
});

/** 「서로조종」 규칙: playerId가 조종하는 캐릭터의 주인 id */
function controlTargetOf(playerId: number): number {
  // 봇은 조종 대상이 아니다. 봇이 끼면 "내 입력이 AI를 조종"하게 된다.
  const ids = humanIds();
  if (ids.length < 2) return playerId;             // 혼자면 자기 캐릭터
  const i = ids.indexOf(playerId);
  if (i < 0) return playerId;
  return ids[(i + 1) % ids.length];                // 다음 사람의 캐릭터를 조종
}

// ---------------------------------------------------------------- 튜토리얼 안내
//
// 맵의 바닥 패드(TUTORIAL_PADS)와 같은 좌표를 읽어서, 그 위에 서 있는 동안만
// 한 줄짜리 설명을 띄운다. 바닥에는 키 이름이 크게 적혀 있으므로 여기서는
// "그래서 뭘 하는 건가"만 짧게 말한다. 구간을 벗어나면 조용히 사라진다.
const elTut = document.getElementById("tut");
const TUTORIAL_TEXT: Record<string, string> = {
  WASD: "<b>WASD</b>로 공을 몰아보세요 — 빨리 달릴수록 공이 앞으로 크게 굴러갑니다",
  F: "<b>F</b>를 눌러 차보세요 — 길게 누르고 있다가 놓으면 더 세게 나갑니다",
  SHIFT: "<b>Shift</b> — 공은 한쪽으로 띄우고 몸은 반대쪽으로 빠집니다 (상대를 지나칠 때)",
  E: "<b>E</b>로 공을 안고 뛸 수 있습니다 (느려집니다) · 다시 <b>E</b>로 놓기",
};

function updateTutorial(target: CANNON.Body | null) {
  if (!elTut) return;
  // Goal Rush 코스에서만. 다른 맵에는 패드가 없다.
  if (!target || !inGame || world.map.id !== "goalrush") { elTut.hidden = true; return; }
  const z = target.position.z;
  const pad = TUTORIAL_PADS.find(([pz]) => Math.abs(z - pz) <= TUTORIAL_PAD_HALF);
  if (!pad) { elTut.hidden = true; return; }
  const text = TUTORIAL_TEXT[pad[1]];
  if (!text) { elTut.hidden = true; return; }
  if (elTut.innerHTML !== text) elTut.innerHTML = text;
  elTut.hidden = false;
}

// ---------------------------------------------------------------- 협동 패스
//
// [무엇을 만드는가] 멀티에서만 닫혀 있는 게이트가 있고, "한 사람이 찬 공을
// 다른 사람이 받으면" 열린다. 혼자서는 못 여는 문이라 둘이 붙어 다니게 된다.
//
// [기존 구조를 그대로 쓴다]
//  - 패스는 새 조작이 아니라 지금 있는 킥(F)이다. 찬 사람만 기록해 두면 된다.
//  - 판정은 host에서만 돈다 (hazards/obstacles/game과 같은 자리).
//  - 게이트는 그냥 kinematic 장애물이라, 열리는 움직임이 기존 objects
//    스냅샷에 실려 비-host로 간다. 새 프로토콜 메시지가 필요 없다.
//  - 비-host의 화면 연출은 "게이트가 열렸다"를 위치로 알아채서 로컬로 띄운다.
//
// [싱글이 막히면 안 된다] 사람이 한 명이면 게이트를 처음부터 열어둔다.

/** 지금 이 방의 사람 수 (봇 제외) */
const humanCount = () => humanIds().length;

/** 마지막으로 공을 찬 사람과 그때의 공 위치 (host 전용) */
let passFrom: { id: number; x: number; z: number; t: number } | null = null;
/** 패스가 유효한 시간 (초). 이 안에 받아야 한다 */
const PASS_WINDOW = 5;
/** 이만큼은 날아가야 "패스"로 친다 (발 앞에서 툭 친 건 패스가 아니다) */
const PASS_MIN_DIST = 4.5;
/** 받는 사람 기준 이 반경에 공이 들어오면 받은 것으로 본다 */
const PASS_CATCH_R = 2.6;

/**
 * host 전용. 패스가 성립했는지 보고, 성립하면 게이트를 연다.
 *
 * 받는 사람의 "위치"를 본다. 방향까지 정밀하게 요구하면 조작이 어려워지므로
 * 반경 판정으로 두되, 최소 비행 거리를 둬서 아무렇게나 차는 걸로는 안 되게 한다.
 */
/**
 * 빗나간 패스에 붙이는 한 줄.
 *
 * [왜 필요한가] 성공한 패스에는 PASS! 와 소리·파티클이 있는데, **빗나간
 * 패스에는 아무것도 없었다.** 그냥 공이 굴러가고 둘 다 조용히 쫓아간다.
 * 실패가 사건으로 안 읽히니 "아 미안" 같은 말이 나올 자리가 없다.
 * 새 시스템이 아니라 이미 있는 passFrom(누가 언제 어디서 찼는가)의
 * 만료 시점을 읽어서 dramaLine을 부르는 것뿐이다.
 */
const PASS_FAIL_LINES = ["빗나갔다!", "그쪽 아니라고", "패스 미안"];

function updateCoopPass() {
  if (!authority) return;
  const ball = ballBody();
  if (!ball || !passFrom) return;
  if (performance.now() - passFrom.t > PASS_WINDOW * 1000) {
    // 창이 끝났는데 아무도 못 받았다 = 빗나간 패스.
    // 혼자 놀 때는 받을 사람이 없으니 실패라고 할 게 없다.
    const flewFar = Math.hypot(ball.position.x - passFrom.x, ball.position.z - passFrom.z) >= PASS_MIN_DIST;
    if (flewFar && humanCount() >= 2) {
      sfx.play("drop", { vol: 0.5, rate: 0.8 });
      dramaLine("passFail", PASS_FAIL_LINES, 6);
    }
    passFrom = null;
    return;
  }

  const flew = Math.hypot(ball.position.x - passFrom.x, ball.position.z - passFrom.z);
  if (flew < PASS_MIN_DIST) return;

  for (const e of playersById.values()) {
    if (isBot(e.id) || e.id === passFrom.id) continue;   // 자기 자신에게 준 건 패스가 아니다
    const p = e.rag.pelvis.position;
    if (Math.hypot(ball.position.x - p.x, ball.position.z - p.z) > PASS_CATCH_R) continue;
    // 성립
    const z = obstacles.openGate(p.z);
    passFrom = null;
    onPassSuccess(z);
    return;
  }
}

/** 패스 성공 연출 (host에서 부른다. 비-host는 게이트가 열리는 걸 보고 따로 띄운다) */
function onPassSuccess(gateZ: number | null) {
  showMove("PASS!", gateZ !== null ? "게이트가 열렸다" : "좋은 패스");
  sfx.play("goal", { vol: 0.7, rate: 1.25 });
  addShake(0.3);
  const b = ballBody();
  if (b) { fx.kick(b.position.x, 0.05, b.position.z, 1); fx.trail(b.position.x, b.position.y, b.position.z); }
}

/**
 * 비-host용: 닫혀 있던 게이트가 열리는 걸 보면 연출을 띄운다.
 * (host가 스냅샷으로 위치만 보내주므로 이벤트 메시지 없이도 알 수 있다)
 */
let seenGateOpen = new Set<number>();
function watchGatesLocally() {
  if (authority) return;
  for (const s of obstacles.stations) {
    if (s.spec.kind !== "coopgate") continue;
    const open = s.body.position.y < OB_GATE_OPEN_Y;
    if (open && !seenGateOpen.has(s.spec.z)) {
      seenGateOpen.add(s.spec.z);
      onPassSuccess(s.spec.z);
    }
  }
}
/** 이 높이 아래로 내려가 있으면 열린 것으로 본다 */
const OB_GATE_OPEN_Y = 0.6;

// ------------------------------------------------------------ 공 되밀림 제한
//
// [왜 필요한가] 장애물은 저마다 속도가 묶여 있지만, 공이 뒤로 밀려나는 총
// 거리에는 아무 상한이 없다. 굴러가던 공이 다음 장애물에 또 맞고, 그게
// 또 다음 장애물에 닿으면서 연쇄로 밀린다 - 실측으로 스테이지 1에서
// 방치한 공이 z=-60에서 +8.5까지 68m, 출발선 뒤까지 되돌아갔다
// (중간 최대 속도 18 m/s).
//
// 공을 뺏기고 쫓아가는 건 이 게임에서 제일 웃긴 장면이라 살려야 한다.
// 다만 "한 구간을 다시 뛰는 것"과 "코스를 통째로 다시 하는 것"은 다르다.
// 그래서 공이 여태 가장 앞서 나갔던 지점에서 이만큼까지만 뒤로 갈 수 있게
// 묶는다. 안쪽에서는 물리가 하던 대로 자유롭게 튄다.
const BALL_BACK_MAX = 25;
/** 이 맵에서 공이 도달한 가장 앞선 z (작을수록 앞) */
let ballBestZ: number | null = null;
/** 튕김 이펙트 연발 방지 (초) */
let backstopFx = 0;
/** 규칙 설명은 맵당 한 번만 */
let backstopTold = false;

function updateBallBackstop(dt: number) {
  backstopFx = Math.max(0, backstopFx - dt);
  if (!authority) return;
  const b = ballBody();
  if (!b) { ballBestZ = null; return; }
  const z = b.position.z;
  if (ballBestZ === null || z < ballBestZ) { ballBestZ = z; return; }
  const limit = ballBestZ + BALL_BACK_MAX;
  if (z <= limit) return;
  // 한계선에 붙이고 뒤로 가는 속도만 죽인다. 좌우/위아래는 건드리지 않아서
  // 벽에 부딪힌 것처럼 자연스럽게 멎는다.
  //
  // [보이게 만든다] 아무 표시 없이 공이 허공에서 멎으면 버그로 읽힌다.
  // 실제로 검증 중에 내가 먼저 "왜 공이 안 움직이지"로 한참 헤맸다.
  // 튕긴 자리에 이펙트를 찍고, 처음 한 번은 무슨 규칙인지 말해준다.
  const wasMoving = b.velocity.z > 1.2;
  b.position.z = limit;
  if (b.velocity.z > 0) b.velocity.z = 0;
  b.wakeUp();
  if (wasMoving && backstopFx <= 0) {
    backstopFx = 1.2;
    // 여기서 z를 한계선으로 붙이는 건 순간이동이다. "공이 갑자기 튀었다"
    // 판정(updateBallDrama)이 그걸 사고로 오인해 연출을 겹쳐 내지 않도록
    // 같은 쿨다운을 걸어둔다 - 이 자리는 이미 자기 연출이 있다.
    blastCool = BLAST.cool;
    fx.kick(b.position.x, b.position.y, b.position.z, 0.6);
    sfx.play("hit", { vol: 0.5 });
    if (!backstopTold) {
      backstopTold = true;
      showMove("여기까지", "공은 여기보다 뒤로는 안 굴러간다");
    }
  }
}

/** 사람이 한 명이면 게이트를 전부 열어둔다 (싱글이 막히면 안 된다) */
function syncCoopGates() {
  if (!authority) return;
  if (humanCount() >= 2) return;
  // 버튼 문은 발판 판정이 매 스텝 opened를 덮어쓰므로 closedGates()(패스
  // 게이트 전용)로는 남았는지 알 수 없다. forceOpen까지 보는 쪽을 쓴다.
  if (!obstacles.needsSoloOpen()) return;
  obstacles.openGate();
}

// ---------------------------------------------------------------- 상황 힌트
//
// [왜 튜토리얼이 아니라 상황 힌트인가]
// Shift/Q는 설명을 읽어도 "언제 쓰는지"를 모르면 안 쓰게 된다. 그래서 실제로
// 쓸 상황이 왔을 때 - 봇이 가까이 붙었을 때 - 그 순간에만 한 줄 띄운다.
// 몇 번 겪고 나면 안 띄워도 알게 되므로 스테이지마다 처음 두 번만 보여준다.
/** 이 스테이지에서 봇 접근 힌트를 몇 번 띄웠는가 */
let botHintsShown = 0;
/** 힌트 재표시 쿨다운 */
let botHintCooldown = 0;
const BOT_HINT_DIST = 6.5;
const BOT_HINT_MAX = 2;

function updateBotHint(dt: number, me: Ragdoll | null) {
  botHintCooldown = Math.max(0, botHintCooldown - dt);
  if (!me || !inGame || botHintsShown >= BOT_HINT_MAX || botHintCooldown > 0) return;
  if (game.phase !== "playing" || inCountdown()) return;
  // 앞쪽에서 다가오는 봇이 사거리 안인가
  const p = me.pelvis.position;
  for (const e of playersById.values()) {
    if (!isBot(e.id) || e.rag.state !== "ACTIVE") continue;
    const b = e.rag.pelvis.position;
    if (Math.hypot(b.x - p.x, b.z - p.z) > BOT_HINT_DIST) continue;
    showMove("Shift", "옆으로 재껴서 지나가기 · Q 급정지");
    botHintsShown++;
    botHintCooldown = 6;
    return;
  }
}

// ------------------------------------------------------------ 서로 부딪히기
//
// [왜 따로 만드나] ragdoll.ts의 충격 판정은 코어 상대속도 13 m/s가 임계값이다.
// 사람 최고 속도가 4.5 m/s라 정면으로 마주 달려도 9 m/s밖에 안 나온다.
// 그래서 둘이 부딪혀도 서로 튕기기만 하고 아무도 안 넘어졌다 - 친구랑 할 때
// 제일 웃긴 장면 하나가 통째로 없었던 셈이다.
//
// 조건을 넉넉하게 두지 않는다. 스쳐도 넘어지면 같이 못 달린다. 서로 마주
// 보고 다가가는 속도(closing speed)가 충분할 때만 둘 다 넘어뜨린다.
const BUMP_DIST = 1.15;
/** 서로 가까워지는 속도가 이 이상이어야 넘어진다 (m/s) */
const BUMP_CLOSING = 3.2;
const BUMP_COOLDOWN = 1.6;
const bumpCooldown = new Map<number, number>();
/** 부딪힐 때마다 같은 글자가 뜨면 세 번째부터는 안 웃긴다 - 돌려 쓴다 */
const BUMP_LINES = ["쿵!", "야 앞에 봐", "둘 다 넘어짐"];

function updatePlayerBumps(dt: number) {
  if (!authority) return;
  for (const [id, t] of bumpCooldown) {
    const nt = t - dt;
    if (nt <= 0) bumpCooldown.delete(id); else bumpCooldown.set(id, nt);
  }
  const list = [...playersById.values()];
  for (let i = 0; i < list.length; i++) {
    for (let j = i + 1; j < list.length; j++) {
      const a = list[i], b = list[j];
      // [사람끼리만] 이건 "친구랑 부딪혀 같이 자빠진다"를 위한 장치다.
      // 봇까지 넣었더니 봇이 공을 뺏는 데 더해 몸으로 넘어뜨리기까지 해서
      // 봇 구간이 그냥 더 아파졌다 (실측: 스테이지 3에서 봇 충돌 knockdown이
      // 3회/40초). 웃기려고 넣은 게 난이도만 올리면 뺀 것만 못하다.
      if (isBot(a.id) || isBot(b.id)) continue;
      if (a.rag.state !== "ACTIVE" || b.rag.state !== "ACTIVE") continue;
      if (bumpCooldown.has(a.id) || bumpCooldown.has(b.id)) continue;
      const pa = a.rag.pelvis.position, pb = b.rag.pelvis.position;
      let dx = pb.x - pa.x, dz = pb.z - pa.z;
      const d = Math.hypot(dx, dz);
      if (d > BUMP_DIST || d < 1e-3) continue;
      // 서로 다가오는 속도 = 상대속도를 이은 선에 투영한 값
      dx /= d; dz /= d;
      const va = a.rag.pelvis.velocity, vb = b.rag.pelvis.velocity;
      const closing = (va.x - vb.x) * dx + (va.z - vb.z) * dz;
      if (closing < BUMP_CLOSING) continue;

      a.rag.knockdown(1.1);
      b.rag.knockdown(1.1);
      // 서로 반대로 튕겨나간다 (겹친 채 쓰러지면 일어나다 또 걸린다)
      a.rag.pelvis.applyImpulse(new CANNON.Vec3(-dx * 34, 18, -dz * 34));
      b.rag.pelvis.applyImpulse(new CANNON.Vec3(dx * 34, 18, dz * 34));
      bumpCooldown.set(a.id, BUMP_COOLDOWN);
      bumpCooldown.set(b.id, BUMP_COOLDOWN);

      sfx.play("hit", { vol: 1 });
      // 부딪힌 자리에서 양쪽으로 먼지가 튄다. 소리만 나고 화면이 그대로면
      // "왜 갑자기 둘 다 자빠졌지"가 되어 사고가 아니라 버그처럼 보인다.
      const cx = (pa.x + pb.x) * 0.5, cz = (pa.z + pb.z) * 0.5;
      fx.dash(cx, cz, dx, dz);
      fx.dash(cx, cz, -dx, -dz);
      fx.kick(cx, 0.05, cz, 0.5);
      if (isMine(a.rag) || isMine(b.rag)) {
        addShake(0.9);
        if (!dramaLine("bump", BUMP_LINES, 3)) showMove("쿵!", "둘이 정면으로 부딪혔다");
      }
    }
  }
}

// ------------------------------------------------------------ 공 전용 틈
//
// 틈(ballSlot)은 "공은 아래로 지나가고 사람은 옆으로 돈다"는 규칙인데,
// 실제로 부딪히면 그냥 벽에 막힌 것처럼 보인다. 실측으로 자동 플레이가
// 이 자리에서 가장 오래 갇혔고, 사람이 해도 "왜 못 가지"가 먼저 온다.
// 지오메트리는 그대로 두고 두 가지만 붙인다.
//  1) 틈 앞에서 막혔을 때 한 번 알려준다 (옆으로 돌아가라)
//  2) 공이 틈 안에 서 버리면 살짝 밀어 빼준다 (사람 몸이 못 닿는 자리다)

/** 틈 벽의 z 두께 반값 + 여유. 이 안에 있으면 "틈 속"으로 본다 */
const SLOT_BAND = 0.9;
/** 사람이 이 거리 안에서 틈을 마주하고 있으면 안내를 띄운다 */
const SLOT_HINT_NEAR = 5;
let slotHintShown = new Set<number>();
/** 공이 틈 안에서 멈춰 있던 시간 */
let slotIdle = 0;

function slotsOf(): number[] {
  return world.map.ballSlots ?? [];
}

/** 틈 앞에서 막힌 사람에게 한 번만 알려준다 (모든 클라이언트) */
function updateSlotHint(me: Ragdoll | null) {
  if (!me || !inGame || game.phase !== "playing" || inCountdown()) return;
  const p = me.pelvis.position;
  const b = ballBody();
  if (!b) return;
  for (const z of slotsOf()) {
    if (slotHintShown.has(z)) continue;
    // 나는 아직 틈 앞(+Z)에 있고, 공은 이미 틈을 넘어갔다 = 갈라진 순간이다
    const ahead = p.z - z;
    if (ahead < 0 || ahead > SLOT_HINT_NEAR) continue;
    if (Math.abs(p.x) > 5.4) continue;          // 이미 옆길로 가고 있으면 침묵
    if (b.position.z > z) continue;             // 공이 아직 안 넘어갔다
    slotHintShown.add(z);
    showMove("공만 통과", "사람은 옆으로 돌아간다 — 초록 길로");
    return;
  }
}

/**
 * 공이 틈 안에 서 버렸으면 빼준다 (host 전용).
 *
 * 틈 속(|x| < 5.4, 벽 z ± SLOT_BAND)은 위가 막혀 있어서 사람 몸이 닿지
 * 않는다. 거기서 공이 멎으면 양쪽 어디서도 건드리기 어렵다 - 실측으로
 * 공을 z=-20.1에 놓고 옆길로 돌아가 봐도 3.4m 앞에서 더 못 갔다.
 * 규칙(공만 통과)은 그대로 두고, "멈춰 있으면 가던 방향으로 조금 더
 * 굴려준다"만 한다. 잠깐 굴러가는 것뿐이라 눈에는 사고처럼 안 보인다.
 */
/**
 * 이미 통과한 틈들 (공 기준). 통과한 틈으로는 다시 못 돌아온다.
 *
 * [왜 일방통행인가] 틈은 아래가 뚫려 있어서 공이 앞뒤로 자유롭게 굴러
 * 다닌다. 그런데 사람은 통과할 수 없으니, 공이 뒤로 한 번 굴러갈 때마다
 * 사람은 옆길 왕복(실측 4.8초 × 2)을 강요당한다. 실측으로 공이 -18로
 * 돌아가 있고 사람은 -30에 있는 상태가 반복되면서 스테이지 2가 시간
 * 초과로 실패했다.
 *
 * "공만 통과한다"는 규칙은 그대로 두고 방향만 하나로 만든다. 그러면
 * 한 번 차 넣으면 그걸로 결정이 끝나고(그래서 차 넣는 판단이 무거워지고),
 * 사람은 우회를 한 번만 하면 된다. 멀티에서 "내가 차 넣을 테니 네가
 * 받아라"도 한 번으로 끝나서 오히려 또렷해진다.
 */
let slotPassed = new Set<number>();

function updateSlotUnstick(dt: number) {
  if (!authority) return;
  const b = ballBody();
  if (!b) { slotIdle = 0; return; }

  // ---- 일방통행 처리
  for (const z of slotsOf()) {
    const gate = z - 0.5;                    // 통과로 인정하는 선
    if (!slotPassed.has(z)) {
      if (b.position.z < gate) slotPassed.add(z);
      continue;
    }
    if (b.position.z <= gate) continue;
    // 되돌아왔다 - 선에 붙이고 뒤로 가는 속도만 죽인다 (되밀림 제한과 같은 방식)
    const wasMoving = b.velocity.z > 1.2;
    b.position.z = gate;
    if (b.velocity.z > 0) b.velocity.z = 0;
    b.wakeUp();
    if (wasMoving && backstopFx <= 0) {
      backstopFx = 1.2;
      fx.kick(b.position.x, b.position.y, b.position.z, 0.6);
      sfx.play("hit", { vol: 0.5 });
    }
  }

  const inSlot = Math.abs(b.position.x) < 5.4
    && slotsOf().some((z) => Math.abs(b.position.z - z) < SLOT_BAND);
  if (!inSlot || Math.hypot(b.velocity.x, b.velocity.z) > 0.35) { slotIdle = 0; return; }
  slotIdle += dt;
  if (slotIdle < 1.2) return;
  slotIdle = 0;
  b.velocity.z = -2.4;   // 코스 진행 방향(-Z)으로 밀어낸다
  b.wakeUp();
}

// ------------------------------------------------------------ 버튼 문 상황 힌트
//
// [왜 상황 힌트인가] 버튼 문은 둘이 나눠 서야 열리는데, 그걸 화면에 계속
// 띄워두면 잔소리가 되고 아무 말도 안 하면 "왜 안 열리지"로 끝난다. 그래서
// 실제로 그 상황에 들어갔을 때만 한 번 말한다.
//
// 두 가지 순간만 잡는다.
//  1) 닫힌 버튼 문에 다가갔다        -> 여는 방법을 알려준다
//  2) 내가 안 밟았는데 문이 열려 있다 -> 친구가 잡아주고 있다는 뜻이다.
//     이때 "먼저 지나가라"가 나와야 역할 분담이 말 없이도 굴러간다.
//
// 싱글에서는 관문이 처음부터 열려 있으므로 아예 돌지 않는다.
const GATE_HINT_NEAR = 16;
const GATE_HINT_MAX = 3;
let gateHintCooldown = 0;
let gateHintsShown = 0;
let gateOpenHinted = new Set<number>();

function updateGateHint(dt: number, me: Ragdoll | null) {
  gateHintCooldown = Math.max(0, gateHintCooldown - dt);
  if (!me || !inGame || humanCount() < 2) return;
  if (game.phase !== "playing" || inCountdown()) return;
  const p = me.pelvis.position;
  for (const g of obstacles.buttonGates()) {
    // 코스는 -Z로 간다. 내 앞에 있는 것만 본다.
    const ahead = p.z - g.z;
    if (ahead < 0 || ahead > GATE_HINT_NEAR) continue;
    const iAmOnPad = obstacles.onPad(g.z, p.x, p.y, p.z);
    if (g.open && !iAmOnPad) {
      // 친구가 밟아준 상태. 이건 한 문당 한 번만.
      if (gateOpenHinted.has(g.z)) continue;
      gateOpenHinted.add(g.z);
      showMove("지금이다", "친구가 문을 잡고 있다 — 공 몰고 먼저 지나가라");
      gateHintCooldown = 4;
      return;
    }
    if (!g.open && gateHintCooldown <= 0 && gateHintsShown < GATE_HINT_MAX) {
      showMove("버튼 문", "한 명이 발판을 밟으면 열린다 — 나머지가 공을 몰고 지나가라");
      gateHintsShown++;
      gateHintCooldown = 8;
      return;
    }
  }
}

// ---------------------------------------------------------------- 경고 배너
//
// 봇이 튀어나올 때 화면을 가로지르는 띠. "지금 뭔가 일어났다"를 0.1초 안에
// 알려주는 게 목적이라 글자는 짧게, 지속은 1초 남짓만.
const elAlert = document.getElementById("alert-banner");
let alertTimer = 0;

function showAlert(text: string) {
  if (!elAlert) return;
  const span = elAlert.querySelector("span");
  if (span) span.textContent = text;
  // 애니메이션 재시작 (같은 요소를 다시 보여주는 것만으로는 재생되지 않는다)
  elAlert.hidden = true;
  void elAlert.offsetWidth;
  elAlert.hidden = false;
  alertTimer = 1.1;
}

function updateAlert(dt: number) {
  if (!elAlert || alertTimer <= 0) return;
  alertTimer -= dt;
  if (alertTimer <= 0) elAlert.hidden = true;
}

// ---------------------------------------------------------------- 기술 이름 표시
//
// 개인기는 0.4초면 끝난다. 화면에 파티클만 튀면 "뭔가 일어났다"까지는 알아도
// "내가 무슨 기술을 썼는지"는 모른다. 이름과 한 줄 설명을 잠깐 띄워서,
// 몇 번 써보는 사이에 Shift와 Q의 차이가 저절로 익도록 한다.
const elToast = document.getElementById("move-toast");
let toastTimer = 0;

function showMove(name: string, desc = "") {
  if (!elToast) return;
  // 애니메이션을 다시 재생시키려면 노드를 갈아끼워야 한다
  // (같은 요소에 같은 class를 다시 붙여도 브라우저가 재시작하지 않는다)
  elToast.innerHTML = desc ? `${name}<small>${desc}</small>` : name;
  elToast.hidden = true;
  void elToast.offsetWidth;
  elToast.hidden = false;
  toastTimer = 0.75;
}

function updateToast(dt: number) {
  if (!elToast || toastTimer <= 0) return;
  toastTimer -= dt;
  if (toastTimer <= 0) elToast.hidden = true;
}

// ================================================================ 웃긴 순간
//
// 이 게임에서 제일 기억에 남는 장면은 성공이 아니라 사고다 - 공이 팝업에
// 맞아 코스 밖으로 날아가고, 봇한테 뺏겨 둘이 같이 쫓아가고, 다 와서 발이
// 미끄러져 허공으로 떨어지는 순간. 그런데 실측해 보니 그 순간들이 전부
// **소리도 화면 반응도 없었다**:
//
//  - 팝업이 공을 11 m/s로 튕겨내도 효과음 0 / 파티클 0 / 흔들림 0
//  - 봇의 걷어차기(bot.ts)는 applyImpulse 한 줄이라 아무 신호가 없다
//  - 낙사는 그냥 순간이동이다. 떨어지는 것도 되돌아오는 것도 조용하다.
//    특히 **공이 떨어지면 아무 말 없이 텔레포트**해서, 공이 어디로 갔는지
//    모른 채 한참 헤맨다 (웃긴 게 아니라 그냥 답답한 상태)
//
// [설계 원칙]
//  1. 새 시스템을 만들지 않는다. 여기서 하는 일은 이미 있는 fx / sfx /
//     addShake / showMove 를 "지금까지 아무도 안 부르던 자리"에서 부르는 것뿐이다.
//  2. 물리를 건드리지 않는다. 전부 상태를 **읽기만** 한다.
//  3. 그래서 host가 아니어도 돈다. 기존 킥/터치 연출은 전부 fixedUpdate의
//     host 분기 안에 있어서 비-host는 아무 소리도 못 듣는데, 여기 것들은
//     공/캐릭터의 위치만 보므로 스냅샷을 받는 쪽에서도 똑같이 나온다.
//     (친구 둘이 붙었을 때 한 명만 조용한 게 제일 큰 문제였다)
//  4. 과하지 않게. 같은 문구가 연달아 나오지 않도록 돌려 쓰고, 종류별 ·
//     전체 쿨다운을 둔다. 글자는 기존 토스트(0.75초, 화면 위쪽)를 그대로
//     쓰므로 플레이를 가리지 않는다.

/** 문구를 돌려 쓰기 위한 커서 (종류별) */
const dramaCursor = new Map<string, number>();
/** 종류별 마지막 표시 시각 */
const dramaAt = new Map<string, number>();
/** 아무 문구나 마지막으로 나간 시각 - 서로 다른 종류가 겹쳐 도배되는 걸 막는다 */
let dramaAnyAt = -1e9;
/** 글자가 연달아 뜨지 않는 최소 간격 (초) */
const DRAMA_ANY_GAP = 1.6;

/**
 * 짧은 한 줄을 띄운다. 같은 종류는 gap초 안에 다시 안 나오고,
 * 문구는 매번 다음 것으로 넘어간다 ("아 ㅋㅋ"는 두 번째부터 안 웃기다).
 *
 * 소리/파티클은 이것과 별개로 나간다 - 글자만 아끼는 것이지 반응 자체를
 * 없애면 무슨 일이 일어났는지 모른다.
 */
function dramaLine(key: string, lines: string[], gap: number): boolean {
  const now = performance.now() / 1000;
  if (now - dramaAnyAt < DRAMA_ANY_GAP) return false;
  if (now - (dramaAt.get(key) ?? -1e9) < gap) return false;
  const i = (dramaCursor.get(key) ?? 0) % lines.length;
  dramaCursor.set(key, i + 1);
  dramaAt.set(key, now);
  dramaAnyAt = now;
  showMove(lines[i]);
  return true;
}

/** 내가 조종 중인 캐릭터 (없으면 null) */
function myRag(): Ragdoll | null {
  const id = net.id;
  if (id === null) return null;
  return playersById.get(controlTargetOf(id))?.rag ?? null;
}

// ---------------------------------------------------------------- 공이 날아간 순간
//
// "누가 찼는지"를 이벤트로 받아오지 않고 공의 **움직임만** 본다. 팝업에
// 맞았든 봇이 걷어찼든 친구가 잘못 찼든, 플레이어에게는 전부 "공이 갑자기
// 뻥 날아갔다" 하나의 사건이고 그게 웃긴 지점이기 때문이다. 원인은 그 순간
// 공 옆에 누가 서 있었는지로 나눈다 (틀려도 손해가 없는 분류다).
const BLAST = {
  /**
   * "갑자기 빨라졌다"의 기준.
   *
   * [실측으로 정한 값] 자동 주행 10초 동안 드리블 중인 공의 속력은
   * 중앙값 2.0 / 상위 1% 4.3 / 최대 6.2 m/s 였다. 그러니까 절대속도만으로는
   * 드리블과 사고를 못 가른다 - 팝업에 맞고 튄 공이 3.5 m/s, 스위퍼에
   * 쓸린 공이 5.2 m/s 였다. **"누가 옆에 있었나"로 먼저 가르고**, 속도는
   * 종류별로 따로 본다.
   */
  /** 아무도 없는데 공이 갑자기 이 속도를 넘으면 = 장애물/튕김 */
  wildSpeed: 5.2,
  /** 봇이 옆에 있을 때의 기준 (걷어차기 충격량 4.6 N·s / 1.1kg = Δ4.2 m/s) */
  stealSpeed: 4.6,
  /**
   * 사람 친구가 옆에 있을 때의 기준.
   *
   * 친구의 평범한 드리블 터치까지 사건으로 잡으면 공을 몰고 갈 때마다
   * 글자가 뜬다. 드리블 최대(6.2)를 확실히 넘는 값이라야 "세게 잘못 찼다"만
   * 걸린다.
   */
  mateSpeed: 8.5,
  /** 직전보다 이만큼은 빨라져야 한다 (원래 빠르던 공은 사건이 아니다) */
  jumpMul: 1.5,
  jumpAdd: 1.4,
  /** 연출 쿨다운 (초) */
  cool: 1.0,
  /** 이 안에 사람/봇이 있으면 "발이 닿았다"로 본다 (ball.ts의 range와 같다) */
  near: 2.6,
  /** 내 킥은 이미 자기 연출이 있다 - 이 시간 안에는 안 잡는다 (초) */
  myKickGrace: 0.5,
};

/** 직전 프레임의 공 위치 / 그때의 속력 (위치 차이로 재므로 비-host에서도 맞다) */
let ballPrevX = 0, ballPrevZ = 0, ballPrevSpeed = 0, ballSeen = false;
let blastCool = 0;
/** 내가 마지막으로 F를 놓은 시각과 그때의 세기 */
let myKickAt = -1e9;
let myKickPower = 0;
/** 세게 찬 공이 정말 멀리 가버렸는지 나중에 확인하기 위한 타이머 */
let overkickCheck = 0;
/** 공에 잔상을 남기는 남은 시간 (날아가는 중인 공을 눈으로 쫓게) */
let ballTrail = 0;

const BLAST_LINES = {
  steal:  ["뺏겼다!", "야 그거 내 공", "도둑이야!"],
  mate:   ["친구가 찼다!", "그쪽 아니야!", "누구야 지금"],
  wild:   ["뻥—!", "공 날아감!", "어디가!"],
  goal:   ["아까비!", "골 코앞에서…", "다 왔었는데"],
  over:   ["너무 셌다!", "패스가 아니라 슛인데", "공 어디감"],
};

/**
 * 공의 움직임만 보고 "사건"을 잡아낸다. 렌더 프레임마다 부른다.
 * 물리에는 손대지 않는다 (읽기 전용).
 */
function updateBallDrama(dt: number) {
  blastCool = Math.max(0, blastCool - dt);
  ballTrail = Math.max(0, ballTrail - dt);

  const b = ballBody();
  if (!b || game.phase !== "playing") { ballSeen = false; return; }

  const px = b.position.x, py = b.position.y, pz = b.position.z;
  if (!ballSeen) {
    ballSeen = true;
    ballPrevX = px; ballPrevZ = pz; ballPrevSpeed = 0;
    return;
  }
  // 위치 차이로 잰다. 비-host의 공은 스냅샷 보간이라 body.velocity를 믿을 수 없다.
  const step = Math.max(1e-4, dt);
  const speed = Math.hypot(px - ballPrevX, pz - ballPrevZ) / step;
  const prevSpeed = ballPrevSpeed;
  ballPrevX = px; ballPrevZ = pz; ballPrevSpeed = speed;

  const now = performance.now() / 1000;
  const me = myRag();

  // ---- 세게 찬 공이 정말로 날아가 버렸는가 (패스가 슛이 된 순간)
  //
  // 찬 직후에는 알 수 없다. 세게 찼다는 것만 기억해 두고 잠시 뒤에 결과를 본다.
  if (overkickCheck > 0) {
    overkickCheck -= dt;
    if (overkickCheck <= 0 && me) {
      const away = Math.hypot(px - me.pelvis.position.x, pz - me.pelvis.position.z);
      if (away > 13 && speed > 3) {
        sfx.play("drop", { vol: 0.5, rate: 0.8 });
        dramaLine("over", BLAST_LINES.over, 8);
      }
    }
  }

  // 텔레포트(낙사 회수)는 사건이 아니다 - 한 프레임에 수십 m가 뛴다
  if (speed > 60) return;
  // 안고 있는 공은 사람이 움직이는 것이지 날아가는 게 아니다
  if (grabs.some((g) => g.objectId === BALL_ID)) return;
  if (blastCool > 0) return;
  // 갑자기 빨라졌는가 (원래 굴러가던 속도는 사건이 아니다)
  if (speed < prevSpeed * BLAST.jumpMul + BLAST.jumpAdd) return;
  // 내가 방금 찬 것이면 킥 연출이 이미 나갔다
  if (now - myKickAt < BLAST.myKickGrace) return;

  // ---- 원인 분류: 그 순간 공 옆에 누가 있었나.
  // 내 발이 닿는 거리에 있는 건 내 드리블이므로 아예 사건이 아니다.
  let nearestBot = Infinity, nearestMate = Infinity, mine = Infinity;
  for (const e of playersById.values()) {
    const p = e.rag.pelvis.position;
    const d = Math.hypot(p.x - px, p.z - pz);
    if (isBot(e.id)) nearestBot = Math.min(nearestBot, d);
    else if (e.rag === me) mine = Math.min(mine, d);
    else nearestMate = Math.min(nearestMate, d);
  }

  let kind: keyof typeof BLAST_LINES;
  if (nearestBot < BLAST.near) {
    if (speed < BLAST.stealSpeed) return;
    kind = "steal";
  } else if (nearestMate < BLAST.near) {
    if (speed < BLAST.mateSpeed) return;
    kind = "mate";
  } else {
    // 내 발이 닿는 자리면 내 터치다. 다만 그 자리에서 장애물에 맞을 수도
    // 있으므로 "드리블로는 절대 안 나오는 속도"면 그대로 사건으로 본다.
    if (mine < BLAST.near && speed < BLAST.mateSpeed) return;
    if (speed < BLAST.wildSpeed) return;
    kind = "wild";
  }

  // 골 코앞에서 날아가는 건 종류를 불문하고 제일 억울하고 제일 웃기다
  const nearGoal = Math.abs(pz - world.map.goal.z) < 22;
  if (nearGoal && kind === "wild") kind = "goal";

  blastCool = BLAST.cool;
  ballTrail = 0.55;

  // ---- 연출. 글자는 아껴도 소리/파티클은 매번 낸다 (안 그러면 무슨 일인지 모른다)
  fx.kick(px, py, pz, 1);
  sfx.play("hit", { vol: 0.7, rate: kind === "steal" ? 1.35 : 1.15 });
  if (me) {
    const d = Math.hypot(px - me.pelvis.position.x, pz - me.pelvis.position.z);
    // 멀리서 벌어진 일은 화면을 흔들지 않는다 (남의 사고까지 흔들리면 어지럽다)
    if (d < 14) addShake(nearGoal ? 0.75 : 0.45);
  }
  // 종류별 간격. 봇 구간은 실측으로 74초에 4번까지 나왔다 - 문구가 세 개라
  // 같은 글자가 반복되지는 않지만, 뺏고 뺏기는 실랑이 중에는 조금 더 아낀다.
  dramaLine(kind, BLAST_LINES[kind], kind === "goal" ? 6 : kind === "steal" ? 4.5 : 3.5);
}

// ---------------------------------------------------------------- 낙사 / 공 실종
//
// 코스는 하늘 위에 떠 있어서 밖으로 밀리면 그대로 허공이다. 지금까지 이게
// 통째로 조용했다 - 떨어지는 것도, 되돌아오는 것도. 특히 공이 떨어지면
// 아무 말 없이 텔레포트해서 "공이 어디 갔지"로 한참을 허비한다.
//
// checkFalls()가 아니라 여기(렌더 루프)에서 보는 이유는 checkFalls가 host
// 전용이기 때문이다. 위치는 스냅샷으로 모두에게 오므로 여기서 보면 친구
// 화면에서도 똑같이 나온다.

/** 이 아래로 내려가면 "떨어지는 중"으로 본다 (바닥 윗면은 y=0) */
const FALL_Y = -3;
/** id별 "지금 떨어지는 중인가" */
const fallingNow = new Map<number, boolean>();
let ballFalling = false;

const FALL_LINES = {
  me:   ["으아아—", "안녕히 계세요", "발이 미끄러졌다"],
  mate: ["친구가 떨어졌다!", "야 어디가", "한 명 실종"],
  bot:  ["방해꾼도 떨어졌다", "잘 가라"],
  ball: ["공이 떨어졌다!", "공 어디감"],
};

function updateVoidDrama() {
  if (game.phase !== "playing") return;
  const me = myRag();

  for (const e of playersById.values()) {
    const p = e.rag.pelvis.position;
    const was = fallingNow.get(e.id) ?? false;
    const is = p.y < FALL_Y;
    if (is === was) continue;
    fallingNow.set(e.id, is);
    if (is) {
      // ---- 떨어지기 시작했다
      if (e.rag === me) {
        sfx.play("fail", { vol: 0.45, rate: 1.6 });
        addShake(0.4);
        dramaLine("fallMe", FALL_LINES.me, 4);
      } else if (isBot(e.id)) {
        dramaLine("fallBot", FALL_LINES.bot, 10);
      } else {
        // 친구가 떨어진 건 내 화면에서도 보여야 웃기다 ("한 명은 골 앞,
        // 한 명은 허공" 이 되는 순간이 이 게임에서 제일 많이 나온다)
        sfx.play("drop", { vol: 0.4, rate: 0.75 });
        dramaLine("fallMate", FALL_LINES.mate, 4);
      }
    } else if (p.y > -1) {
      // ---- 되살아났다. 어디에 다시 섰는지 눈에 보이게만 한다 (글자 없음)
      fx.kick(p.x, 0.05, p.z, 0.7);
      if (e.rag === me) sfx.play("pickup", { vol: 0.7 });
    }
  }
  // 사라진 캐릭터의 기록은 남겨두지 않는다 (봇은 스테이지마다 새로 뜬다)
  for (const id of [...fallingNow.keys()]) if (!playersById.has(id)) fallingNow.delete(id);

  const b = ballBody();
  if (!b) return;
  const is = b.position.y < FALL_Y;
  if (is !== ballFalling) {
    ballFalling = is;
    if (is) {
      sfx.play("drop", { vol: 0.6, rate: 0.7 });
      dramaLine("fallBall", FALL_LINES.ball, 5);
    } else if (b.position.y > -1) {
      // 회수된 공이 어디에 놓였는지 반드시 보이게 한다. 이게 없으면
      // 공이 소리 없이 순간이동한 것으로 보여서 한참을 헤맨다.
      fx.kick(b.position.x, 0.05, b.position.z, 1.1);
      ballTrail = 0.6;
      sfx.play("pickup", { vol: 0.8, rate: 0.85 });
    }
  }
}

// ---------------------------------------------------------------- 관찰형 소리
//
// 스냅샷만 보고도 알 수 있는 사건은 통신을 늘리지 않고 받는 쪽에서 직접 울린다
// (protocol.ts SfxEvent 주석의 "두 갈래" 중 1번). 여기 있는 것들은 전부
// 위치/상태를 **읽기만** 한다.

/** 직전 프레임의 캐릭터 상태 (넘어지는 순간을 잡기 위해) */
const prevRagState = new Map<number, RagdollState>();
/** 직전 프레임의 버튼 문 열림 여부 (z별) */
const prevGateOpen = new Map<number, boolean>();
/** 비-host가 마지막으로 본 게임 단계 / 봇 목록 */
let sfxPrevPhase: GamePhase = "playing";
const seenBots = new Set<number>();

function updateLocalSfx() {
  // ---- 넘어지는 순간
  //
  // [왜 이걸로 충돌음을 대신하나] 장애물 피격음은 host 분기에만 있어서 친구
  // 화면에서는 안 났다. 그런데 "넘어졌다"는 상태는 스냅샷에 실려 오므로
  // (ragdoll.setNetState) 양쪽 모두가 알 수 있다. 게다가 봇에 밀려서 ·
  // 서로 부딪혀서 · 떨어져서 넘어지는 경우까지 한 번에 덮는다.
  //
  // host에서는 기존 피격음과 같은 순간에 겹치는데, audio.ts가 hit에 0.12초
  // MIN_GAP을 걸어 두었으므로 뒤에 온 쪽이 조용히 버려진다 - 중복 방지가
  // 이미 있는 자리라 여기서 따로 막지 않는다.
  for (const e of playersById.values()) {
    const was = prevRagState.get(e.id);
    prevRagState.set(e.id, e.rag.state);
    if (was === undefined || was !== "ACTIVE" || e.rag.state === "ACTIVE") continue;
    playFor("hit", e.id, 0.85, 1.05);
    if (isMyId(e.id)) addShake(0.5);
  }
  for (const id of [...prevRagState.keys()]) if (!playersById.has(id)) prevRagState.delete(id);

  // ---- 버튼 문이 열리고 닫히는 소리 (양쪽 모두. 지금까지 아무 소리도 없었다)
  //
  // 발판에서 발을 떼면 문이 다시 닫히는데, 공을 몰고 가는 쪽은 문을 보고
  // 있지 않다. 소리가 없으면 "친구가 아직 밟고 있나"를 알 방법이 없다.
  for (const g of obstacles.buttonGates()) {
    const was = prevGateOpen.get(g.z);
    prevGateOpen.set(g.z, g.open);
    if (was === undefined || was === g.open) continue;
    sfx.play(g.open ? "pickup" : "drop", { vol: 0.55, rate: 0.65 });
  }

  if (authority) return;
  // ---- 아래는 비-host 전용 (host는 자기 자리에서 이미 울린다)

  // 골 / 실패. host는 game 훅에서 울리지만 그 훅은 host에서만 돈다.
  const ph = game.phase;
  if (ph !== sfxPrevPhase) {
    if (ph === "success") { sfx.play("goal"); addShake(0.7); }
    else if (ph === "fail") sfx.play("fail");
    sfxPrevPhase = ph;
  }

  // 봇 등장. 비-host는 스냅샷에 새 음수 id가 나타나는 것으로 알 수 있다.
  // [소리만이 아니다] 경고 배너도 host에만 있었다 - 친구는 방해꾼이 튀어나온
  // 걸 아무 신호 없이 화면으로만 알아채야 했다. 같이 띄운다.
  for (const e of playersById.values()) {
    if (!isBot(e.id) || seenBots.has(e.id)) continue;
    seenBots.add(e.id);
    sfx.play("botSpawn");
    addShake(0.85);
    showAlert("방해꾼 등장!");
  }
  for (const id of [...seenBots]) if (!playersById.has(id)) seenBots.delete(id);
}

// ---------------------------------------------------------------- 아슬아슬
//
// Shift로 장애물을 코앞에서 재끼고 지나가는 건 이 게임에서 제일 잘한 순간인데,
// 지금은 아무것도 없는 자리에서 재낀 것과 화면이 똑같다. 재낀 자리에 실제로
// 위협이 있었을 때만 다른 글자를 띄운다 (obstacles.stations를 읽기만 한다).
const NEARMISS_R = 3.2;
const NEARMISS_LINES = ["아슬아슬!", "닿을 뻔했다", "지금 뭐 지나갔지"];

/** 이 자리 근처에 지금 "올라와 있는" 장애물이 있는가 */
function obstacleNear(x: number, z: number, r: number): boolean {
  for (const s of obstacles.stations) {
    const b = s.body;
    // 내려가 있는 팝업 / 열린 문 / 대기 중인 거대 공은 위협이 아니다
    if (b.position.y < -0.2) continue;
    if (Math.hypot(b.position.x - x, b.position.z - z) < r) return true;
  }
  return false;
}

// ---------------------------------------------------------------- 기술 쓸 자리 안내
//
// [왜 필요한가] 실측 보고에서 "F/Shift/Q가 서로 대체 가능하고 결국 W로만
// 밀고 간다"가 반복해서 나왔다. 문제는 기술의 성능이 아니라 **언제 쓰는지가
// 화면에 한 번도 안 나온다**는 것이다. 봇이 다가올 때의 Shift 안내는 이미
// 있었는데(updateBotHint), 정작 새로 생긴 F 러시와 Q 급정지는 아무 데서도
// 자기 자리를 말하지 않았다.
//
// 맵 지형은 건드리지 않는다. 이미 있는 상황(공을 놓쳤다 / 앞이 막혔다)을
// 읽어서 그 자리에 맞는 키를 한 번 알려줄 뿐이다. 맵당 횟수를 묶어 두어서
// 익숙해진 뒤에는 조용해진다.
const SKILL_HINT_MAX = 2;
let rushHintsShown = 0, brakeHintsShown = 0;
let skillHintCd = 0;

function updateSkillHints(dt: number, me: Ragdoll | null) {
  skillHintCd = Math.max(0, skillHintCd - dt);
  if (!me || !inGame || skillHintCd > 0) return;
  if (game.phase !== "playing" || inCountdown()) return;
  const b = ballBody();
  if (!b) return;
  const p = me.pelvis.position;
  const d = Math.hypot(b.position.x - p.x, b.position.z - p.z);

  // ---- F: 공을 놓쳤다. 달려가는 대신 달려든다.
  if (rushHintsShown < SKILL_HINT_MAX && d > 4 && d < 12) {
    showMove("F — 러시", "놓친 공으로 달려든다 (러시 중엔 못 꺾는다)");
    rushHintsShown++;
    skillHintCd = 9;
    return;
  }

  // ---- Q: 공은 앞에 있는데 그 앞이 막혔다. 계속 몰면 공만 부딪힌다.
  //
  // "공보다 앞쪽"에 올라와 있는 장애물이 있을 때만 띄운다 - 이미 지나친
  // 장애물이나 옆으로 비켜난 것에는 안 뜬다.
  if (brakeHintsShown < SKILL_HINT_MAX && d < 3) {
    const bx = b.position.x, bz = b.position.z;
    // 코스는 -Z로 간다. 공보다 2~7m 더 앞을 본다.
    if (obstacleNear(bx, bz - 4.5, 3.4) && p.z > bz) {
      showMove("Q — 급정지", "공을 세우고 지나갈 때를 기다린다");
      brakeHintsShown++;
      skillHintCd = 12;
    }
  }
}

// ---------------------------------------------------------------- 카운트다운
//
// 스테이지가 시작되면 3초를 세고 나서 조작을 연다.
//
// [왜 조작을 막는가] 지금은 맵이 뜨는 순간 이미 굴러갈 수 있어서, 어디가
// 앞인지 파악하기도 전에 시작한다. 잠깐 멈춰 세우면 코스를 한 번 보고
// 출발하게 되고, "이제 시작이다"라는 신호도 생긴다.
//
// 물리는 계속 돈다 - 캐릭터가 착지하고 자세를 잡을 시간이기도 하다.
const elCountdown = document.getElementById("countdown");
/** 남은 카운트다운 시간 (초). 0 이하면 플레이 중 */
let countdown = 0;
let countdownShown = -1;
/** 카운트다운 중에는 이동/공 조작 입력을 받지 않는다 */
const inCountdown = () => countdown > 0;

function startCountdown() {
  countdown = 3.2;
  countdownShown = -1;
}

function updateCountdown(dt: number) {
  if (!elCountdown) return;
  if (countdown <= 0) { elCountdown.hidden = true; return; }
  countdown -= dt;
  elCountdown.hidden = false;
  // 3, 2, 1, GO! - 바뀔 때만 DOM을 건드린다 (매 프레임 바꾸면 애니메이션이 재시작된다)
  const n = Math.ceil(countdown - 0.2);
  if (n !== countdownShown) {
    countdownShown = n;
    // 스테이지 이름은 카운트 내내 그대로 두고 숫자만 바뀌게 한다.
    // (이름까지 매번 다시 그리면 등장 애니메이션이 세 번 재생된다)
    const m = world.map;
    const head = `<div class="cd-stage">STAGE ${world.mapIndex + 1} / ${world.mapCount} · ${m.name.replace(/^\d+\.\s*/, "")}<em>${m.blurb}</em></div>`;
    elCountdown.innerHTML = `${head}<span>${n > 0 ? n : "GO!"}</span>`;
    sfx.play(n > 0 ? "countdown" : "start");
  }
  if (countdown <= 0) elCountdown.hidden = true;
}

// ---------------------------------------------------------------- 킥 게이지
/** 이미 "꽉 찼다" 소리를 냈는가 (한 번만 울리게) */
let chargeFullPinged = false;
const elGauge = document.getElementById("kick-gauge");
const elGaugeFill = elGauge?.querySelector("i") as HTMLElement | null;
function updateKickGauge() {
  if (!elGauge || !elGaugeFill) return;
  const c = kickChargeNow();
  if (c <= 0) { elGauge.hidden = true; chargeFullPinged = false; return; }
  elGauge.hidden = false;
  // 꽉 찬 순간 한 번 울린다 - 게이지를 안 보고 있어도 "지금 놓으면 최대"를 안다
  if (c >= 1 && !chargeFullPinged) { chargeFullPinged = true; sfx.play("kickCharge"); }
  elGaugeFill.style.width = `${(c * 100).toFixed(0)}%`;
}

// ---------------------------------------------------------------- HUD
//
// [기본으로 감춘다] 이 상자는 FPS·Ping·WS·Auth·Grab 같은 개발용 값이다.
// 플레이어에게는 아무 의미가 없는데 화면 왼쪽 위를 6줄이나 덮고 있어서,
// 처음 켠 사람 눈에는 게임이 아니라 디버거로 보인다. H로 켜고 끈다.
const hud = document.getElementById("hud")!;
const elHelpSwap = document.getElementById("help-swap");
let hudOn = false;
let fps = 0, frames = 0, fpsTimer = 0;
function updateHud() {
  hud.hidden = !hudOn || !inGame;
  if (!hudOn) return;
  const myId = net.id;
  const ctrl = myId !== null ? controlTargetOf(myId) : null;
  const rag = ctrl !== null ? playersById.get(ctrl)?.rag : undefined;
  // 「서로조종」 안내는 정말로 남을 조종하고 있을 때만 (싱글에서는 자기 자신이다)
  if (elHelpSwap) elHelpSwap.hidden = ctrl === null || ctrl === myId;
  hud.innerHTML = [
    `FPS: ${fps}   Ping: ${net.ping}ms`,
    `나: P${myId ?? "-"}${net.isHost ? " (HOST)" : ""}   접속: ${humanIds().length}   봇: ${playersById.size - humanIds().length}`,
    `조종 중인 캐릭터: P${ctrl ?? "-"}${ctrl === myId ? " (자기 자신)" : ""}`,
    `상태: ${rag?.state ?? "-"}   접지: ${rag?.grounded ? "O" : "X"}`,
    `WS: ${net.statusText}   Grab: ${grabs.length}   Auth: ${authority ? "LOCAL" : "REMOTE"}`,
    DEBUG ? `[DEBUG] R:넘어짐 T:리셋 Y:충격 U:점프` : "",
  ].join("<br/>");
}

// ---------------------------------------------------------------- 전송
let sendTimer = 0;
const SEND_HZ = 30;
const r3 = (n: number) => Math.round(n * 1000) / 1000;

function sendNetwork() {
  if (!authority) {
    const playing = game.phase === "playing";
    const { mx, mz } = playing ? readMoveInput() : { mx: 0, mz: 0 };
    const { ax, az } = readAimInput();
    const input: InputState = {
      mx: r3(mx), mz: r3(mz),
      ax: r3(ax), az: r3(az),
      jump: playing && !!keys["Space"],
      grab: playing && grabEdge,
      trick: playing && trickEdge,
      stop: playing && stopEdge,
      kick: playing && kickEdge,
      kp: r3(kickPower),
    };
    net.send({ type: "input", input });
    // 보냈으니 이제 지운다 (fixedUpdate의 주석 참고). 여기서 지워야
    // "누른 건 반드시 한 번 전송된다"가 성립한다.
    grabEdge = false;
    trickEdge = false;
    stopEdge = false;
    kickEdge = false;
    kickPower = 0;
  } else {
    const ragdolls: RagdollSnapshot[] = [];
    for (const e of playersById.values()) {
      const b: number[] = [];
      for (const body of e.rag.bodies) {
        b.push(r3(body.position.x), r3(body.position.y), r3(body.position.z),
               r3(body.quaternion.x), r3(body.quaternion.y), r3(body.quaternion.z), r3(body.quaternion.w));
      }
      ragdolls.push({ id: e.id, b, st: e.rag.state });
    }
    const objs: ObjectState[] = objects.map((o) => ({
      id: o.id,
      p: [r3(o.body.position.x), r3(o.body.position.y), r3(o.body.position.z)],
      r: [r3(o.body.quaternion.x), r3(o.body.quaternion.y), r3(o.body.quaternion.z), r3(o.body.quaternion.w)],
    }));
    // 이번 구간에 host에서 난 소리들을 같이 보낸다 (netSfx 주석 참고).
    // 보내고 비운다 - 다음 스냅샷에 같은 소리가 또 실리면 두 번 들린다.
    const sfxNow = sfxOut;
    sfxOut = [];
    net.send({
      type: "snapshot", ragdolls, objects: objs, game: game.snapshot(),
      ...(sfxNow.length ? { sfx: sfxNow } : {}),
    });
  }
}

// ---------------------------------------------------------------- 메인 루프
//
// [중요] 물리는 반드시 고정 timestep으로, control() 1회당 physics 내부 스텝 1회로
// 짝을 맞춰서 돌려야 한다.
//
// 예전 코드는 매 rAF 프레임마다 control()을 호출하고 physics.step(1/60, dt, 6)로
// 넘겼다. cannon-es의 이 3인자 형태는 내부에 accumulator를 두고 accumulator가
// 1/60을 넘길 때만 internalStep()을 돌린다. 그런데 body.force / body.torque를
// 비우는 clearForces()는 internalStep() 안에서만 호출된다.
//
// 따라서 화면 주사율이 60Hz보다 높으면(측정: 이 개발 PC는 165Hz) 프레임의 약
// 64%가 internalStep을 한 번도 돌리지 않은 채 control()의 힘/토크만 body에
// 누적시킨다. 실측 결과 몸통 토크가 한 스텝당 1060~1850까지 쌓였고(1프레임분의
// 2~3배, 스텝마다 들쭉날쭉), 관절이 최대 2.47m까지 벌어지고 팔다리 각속도가
// 417 rad/s에 달했다 = "스폰 직후 사지가 쪼개져 날아다님".
//
// 헤드리스 테스트는 physics.step(1/60) 단일 인자 형태(= control 1회당 정확히
// internalStep 1회)로 돌기 때문에 이 현상이 원리적으로 재현되지 않았다.
// 아래 accumulator 루프는 브라우저를 테스트와 동일한 조건으로 만든다.
const FIXED_DT = 1 / 60;
const MAX_SUBSTEPS = 5;   // 프레임 하락 시 따라잡기 상한 (넘으면 시간을 버린다)
const clock = new THREE.Clock();
let accumulator = 0;
let firstFrames = 5;

/** 정확히 FIXED_DT 만큼 물리를 한 스텝 진행한다. control()은 여기서만 호출된다. */
function fixedUpdate(dt: number) {
  const myId = net.id;
  // 결과 화면이 떠 있는 동안엔 조작을 받지 않는다 (물리는 계속 돈다 - 물체가
  // 굴러가던 관성은 그대로 두는 편이 어색하지 않다)
  // 카운트다운 중에도 조작을 받지 않는다 (물리는 계속 돈다)
  const playing = game.phase === "playing" && !inCountdown();
  const { mx, mz } = playing ? readMoveInput() : { mx: 0, mz: 0 };
  const { ax, az } = readAimInput();
  const myInput: InputState = {
    mx, mz, ax, az,
    jump: playing && !!keys["Space"],
    grab: playing && grabEdge,
    trick: playing && trickEdge,
    stop: playing && stopEdge,
    kick: playing && kickEdge,
    kp: kickPower,
  };
  // grab은 엣지 트리거 - 물리 스텝이 실제로 도는 여기서만 소비한다.
  // (animate()에서 소비하면 안 된다: 165Hz 화면에서는 프레임의 ~64%가
  //  물리 스텝을 0회 돌기 때문에 그 프레임에 눌린 E가 통째로 버려진다.
  //  실측으로 E 10번 중 6번이 씹혔다.)
  //
  // [비-host에서는 여기서 지우면 안 된다 — 실측으로 찾은 버그]
  // 비-host는 물리를 안 돌리므로 위에서 만든 myInput을 쓰지 않는다. 대신
  // sendNetwork()가 같은 엣지 변수를 읽어 host로 보낸다. 그런데 animate()는
  // fixedUpdate를 먼저 돌리고 sendNetwork를 나중에 부르므로, 여기서 지워
  // 버리면 **친구가 누른 F/Shift/Q/E가 전송되기 전에 사라진다.**
  // 실제로 2탭 테스트에서 비-host가 F를 눌러도 킥도 러시도 나가지 않았다
  // (공 속도 0, 캐릭터 이동 0). 60Hz에서는 거의 매 프레임 물리 스텝이 1회
  // 돌기 때문에 대부분 씹힌다. 전송한 쪽(sendNetwork)에서 지운다.
  if (authority) {
    grabEdge = false;
    trickEdge = false;
    stopEdge = false;
    kickEdge = false;
    kickPower = 0;
  }

  if (authority && myId !== null) {
    // ---- host: 모든 입력을 "서로조종" 규칙에 따라 배분
    for (const e of playersById.values()) {
      e.input.moveX = 0; e.input.moveZ = 0; e.input.jump = false;
      // 봇은 조준을 주지 않는다 (자기 진행 방향이 곧 조준이다). 매 스텝
      // 지워두지 않으면 사람이 조종하다 놓은 값이 봇에게 남는다.
      e.input.aimX = 0; e.input.aimZ = 0;
    }
    const applyInput = (fromId: number, inp: InputState) => {
      const targetId = controlTargetOf(fromId);
      const target = playersById.get(targetId);
      if (!target || !playing) return;
      target.input.moveX = inp.mx;
      target.input.moveZ = inp.mz;
      target.input.jump = inp.jump;
      // 조준은 "조종하는 사람의 카메라"에서 온다. 「서로조종」이라 내 카메라가
      // 남의 캐릭터를 조준하는 셈인데, 그 캐릭터를 모는 게 나이므로 맞다.
      target.input.aimX = inp.ax ?? 0;
      target.input.aimZ = inp.az ?? 0;
      if (inp.grab) target.grabPending = true;
      if (inp.trick) target.trickPending = true;
      if (inp.stop) target.stopPending = true;
      if (inp.kick) { target.kickPending = true; target.kickPower = inp.kp ?? 0; }
    };
    applyInput(myId, myInput);
    for (const [rid, inp] of remoteInputs) applyInput(rid, inp);
    for (const inp of remoteInputs.values()) { inp.grab = false; inp.trick = false; inp.stop = false; inp.kick = false; inp.kp = 0; }

    // 지금 공을 안고 있는 사람들 - 봇이 들이받을 대상이다.
    // (봇이 읽는 건 "누가 공을 들고 있나"라는 월드 상태이지 키 입력이 아니다)
    const carriers = [...playersById.values()]
      .filter((e) => !isBot(e.id) && grabsOf(e.rag).some((g) => g.objectId === BALL_ID))
      .map((e) => e.rag);

    // ---- 물리 제어
    for (const e of playersById.values()) {
      if (e.grabPending) {
        e.grabPending = false;
        // 손이 안 닿으면 "줍는 동작"을 시작한다. 드리블 중인 공은 항상 발 앞
        // 1m 넘게 있어서 그냥 눌러서는 절대 안 잡힌다 (ball.ts scoopRange 주석).
        const holding = grabsOf(e.rag).length > 0;
        if (holding) netSfx("drop", e.id);
        const grabbed = tryGrab(e.rag);
        if (!holding && grabbed) netSfx("pickup", e.id);
        const bb = ballBody();
        if (!holding && !grabbed && bb) ballPlay.requestPickup(e.rag, bb);
      }
      // 잡고 있는 물체 + "각 손이 붙잡은 지점"을 함께 넘긴다.
      // 지점은 물체 로컬로 보관하다가 여기서 월드로 변환하므로, 물체가 밀려
      // 나가거나 회전해도 손이 계속 그 자리를 붙잡고 있는 그림이 유지된다.
      const links = grabsOf(e.rag);
      const held: CANNON.Body[] = [];
      const grips: HandGrip[] = [];
      for (const g of links) {
        const obj = objectById.get(g.objectId);
        if (!obj) continue;
        held.push(obj.body);
        // 강체 제약이 없는 밀기 모드에서는 붙잡은 점을 매 프레임 다시 잡는다.
        // 손이 닿을 수 있는 가장 가까운 표면으로 미끄러지므로, 팔 길이가
        // 모자라 목표가 붕 떠 있는 일이 없다 (= 손이 표면에 얹힌 그림).
        // 제약이 걸린 뒤에는 고정한다 - 안 그러면 물체가 손 안에서 미끄러진다.
        if (!g.constraint) g.pivotLocal = grabPivotOn(obj, g.hand);
        const r = obj.body.quaternion.vmult(g.pivotLocal);
        grips.push({
          hand: g.hand,
          target: obj.body.position.vadd(r),
          // 그 점이 실제로 움직이는 속도 = 물체 선속도 + ω × r.
          // 손 스프링의 감쇠를 상대속도로 걸기 위해 필요하다 (HandGrip 주석 참고).
          targetVel: obj.body.velocity.vadd(obj.body.angularVelocity.cross(r)),
        });
      }
      e.rag.setHeld(held, grips);

      // ---- AI 봇: 사람의 키 입력 대신 여기서 이동 입력을 만든다.
      // 넣는 값의 모양이 사람과 완전히 같아서 control()은 차이를 모른다.
      if (isBot(e.id)) {
        const bb = ballBody();
        if (bb) {
          const r = bots.update(e.rag, bb, dt, carriers);
          e.input.moveX = r.input.moveX;
          e.input.moveZ = r.input.moveZ;
          e.input.jump = false;
          // 안고 있던 사람을 들이받았으면 놓치게 한다
          for (const c of r.brokeCarry) {
            const owner = [...playersById.values()].find((x) => x.rag === c);
            if (!owner) continue;
            for (const g of grabsOf(owner.rag)) {
              const o = objectById.get(g.objectId);
              if (o) {
                const dx = o.body.position.x - e.rag.pelvis.position.x;
                const dz = o.body.position.z - e.rag.pelvis.position.z;
                const l = Math.hypot(dx, dz) || 1;
                o.body.applyImpulse(new CANNON.Vec3((dx / l) * BOT.bumpImpulse, 1.4, (dz / l) * BOT.bumpImpulse));
              }
            }
            releaseGrabsOf(owner.rag);
          }
        } else {
          e.input.moveX = 0; e.input.moveZ = 0;
        }
      }

      // 개인기 대시: 트릭 직후 잠깐은 이동 입력을 옆 방향으로 바꾼다.
      // control() 자체는 그대로 두고, "무엇을 입력으로 줄지"만 바꾸는 것이라
      // 검증된 이동/서기 로직에는 손대지 않는다 (ball.ts trickDash 주석).
      const dash = ballPlay.dashDir(e.rag);
      if (dash) { e.input.moveX = dash.x; e.input.moveZ = dash.z; }

      // 러시 중에는 몸을 거의 못 튼다 - 겨눈 쪽으로 그대로 나아간다.
      // (ball.ts rushSteer 주석: F에 "직선 돌파"라는 대가를 붙이는 부분)
      const rd = ballPlay.rushDir(e.rag);
      if (rd) {
        const w = B.rushSteer;
        const nx = rd.x * (1 - w) + e.input.moveX * w;
        const nz = rd.z * (1 - w) + e.input.moveZ * w;
        const l = Math.hypot(nx, nz) || 1;
        e.input.moveX = nx / l; e.input.moveZ = nz / l;
      }

      e.rag.control(dt, e.input, physics);

      // ---- 공 조작 (드리블 / 개인기 / 안고 뛰기 페널티)
      //
      // control() 뒤에 부르는 이유: 드리블이 rag.intentX/intentZ(이번 스텝의
      // 이동 입력 방향)를 쓰는데, 그 값이 control() 안에서 갱신되기 때문이다.
      const ball = ballBody();
      ballPlay.tick(e.rag, dt);
      // 봇은 드리블/캐리/개인기를 쓰지 않는다. 몸으로 밀고 걷어차기만 한다.
      if (ball && !isBot(e.id)) {
        // 줍는 중이면 공을 품으로 당기면서 매 스텝 다시 잡아본다
        if (ballPlay.scooping(e.rag) && grabsOf(e.rag).length === 0) {
          ballPlay.scoopStep(e.rag, ball);
          tryGrab(e.rag);
        }
        // held는 이 스텝 앞부분에서 뜬 값이라, 방금 줍기에 성공했으면 아직
        // 반영돼 있지 않다. 지금 상태로 다시 확인해야 잡은 공을 또 차지 않는다.
        const carryingBall = grabsOf(e.rag).some((g) => g.objectId === BALL_ID);
        if (e.stopPending) {
          e.stopPending = false;
          if (ballPlay.tryStopTurn(e.rag, ball, carryingBall)) {
            const info = ballPlay.takeTrick(e.rag);
            if (info) fx.dash(info.x, info.z, info.dodgeX, info.dodgeZ);
            netSfx("trick", e.id, 0.9, 0.72);
            if (isMine(e.rag)) { addShake(0.22); showMove("스톱턴", "급정지 — 달려오는 상대가 지나친다"); }
          }
        }
        if (e.trickPending) {
          e.trickPending = false;
          if (ballPlay.tryTrick(e.rag, ball, carryingBall)) {
            // 개인기가 실제로 나갔을 때만 연출한다 (쿨다운/사거리에 걸리면 조용히 무시)
            const info = ballPlay.takeTrick(e.rag);
            if (info) {
              fx.dash(info.x, info.z, info.dodgeX, info.dodgeZ);
              trickTrail.set(e.rag, B.trickLockout + 0.25);
              netSfx("trick", e.id);
              if (isMine(e.rag)) {
                const p = e.rag.pelvis.position;
                // 실제로 위협을 코앞에서 흘렸을 때만 다른 글자를 띄운다.
                // 빈 자리에서 재낀 것과 화면이 같으면 잘한 게 안 보인다.
                if (obstacleNear(p.x, p.z, NEARMISS_R)) {
                  addShake(0.45);
                  if (!dramaLine("nearmiss", NEARMISS_LINES, 4)) showMove("재끼기", "공은 한쪽 · 몸은 반대쪽");
                } else {
                  addShake(0.3);
                  showMove("재끼기", "공은 한쪽 · 몸은 반대쪽");
                }
              }
            }
          }
        }
        // 킥은 드리블보다 먼저 처리한다 - 찬 직후 같은 스텝의 터치가 공을
        // 도로 잡아채면 "찬 것"이 안 보인다 (tryKick이 lockout을 건다).
        if (e.kickPending) {
          e.kickPending = false;
          const k = ballPlay.tryKick(e.rag, ball, carryingBall, e.kickPower);
          e.kickPower = 0;
          if (k) {
            // 패스 판정용: 누가 어디서 찼는지 (updateCoopPass 주석 참고)
            passFrom = { id: e.id, x: k.x, z: k.z, t: performance.now() };
            fx.kick(k.x, k.y, k.z, k.power);
            netSfx("kick", e.id, 0.55 + k.power * 0.45, 1.15 - k.power * 0.25);
            if (isMine(e.rag)) addShake(0.25 + k.power * 0.35);
          } else {
            // 찰 수 없는 거리면 러시로 돌린다 (ball.ts rushRange 주석 참고).
            // 예전엔 여기서 아무 일도 안 일어났다 - 공을 놓친 동안 F는
            // 완전히 죽은 입력이었다.
            const r = ballPlay.tryRush(e.rag, ball, carryingBall);
            if (r) {
              const p = e.rag.pelvis.position;
              fx.dash(p.x, p.z, r.x, r.z);
              netSfx("step", e.id, 1, 0.55);
              if (isMine(e.rag)) addShake(0.18);
            }
          }
        }
        ballPlay.dribble(e.rag, ball, dt, carryingBall);
        // 발이 공에 닿은 순간을 그린다 - "툭 찼다"가 눈에 보여야 드리블로 읽힌다
        const tc = ballPlay.takeTouch(e.rag);
        if (tc) {
          fx.touch(tc.x, tc.y, tc.z, tc.strength);
          netSfx("touch", e.id, 0.4 + tc.strength * 0.6);
        }
        if (carryingBall) ballPlay.carryPenalty(e.rag);
      } else {
        e.trickPending = false;
        e.stopPending = false;
        e.kickPending = false;
      }
    }

    // ---- 든 물체를 "가슴 앞 목표 지점"으로 끌어온다 (위치 PD)
    //
    // 처음엔 팔에 캐리 토크만 주고 물체엔 반중력만 걸었는데, 그러면
    // "거의 무중력인 물체를 가벼운 팔(1.3kg)의 방향 스프링이 밀어올리는" 꼴이
    // 되어 공진했다(실측: 큐브가 0.53 <-> 1.57 사이를 1.5초 주기로 펄럭임).
    //
    // 팔의 방향을 제어하는 대신 물체의 위치를 직접 PD로 잡으면 훨씬 안정적이다.
    // 물체가 목표 위치로 수렴하고 팔은 P2P 제약으로 거기에 끌려가므로
    // 결과적으로 "물건을 가슴 앞에 들고 있는" 그림이 자연스럽게 나온다.
    // 팔의 캐리 토크는 이제 보기 좋으라고 남겨둔 보조 역할이다.
    {
      const held = new Map<CANNON.Body, Holder[]>();
      const seen = new Set<string>();
      for (const g of grabs) {
        g.ramp += dt;
        // 제약의 힘도 같이 램프업한다. (min/max를 반드시 대칭으로 -
        //  한쪽만 줄이면 제약이 한 방향으로만 밀 수 있게 되어 오히려 튄다)
        if (g.constraint) {
          const k = Math.min(1, g.ramp / P.carryRamp);
          for (const eq of g.constraint.equations) {
            eq.maxForce = g.holdForce * k;
            eq.minForce = -g.holdForce * k;
          }
        }
        const obj = objectById.get(g.objectId);
        if (!obj) continue;
        // 한 사람이 양손으로 같은 물체를 잡아도 그 사람 몫은 1인분이다.
        // (사람이 다르면 각각 더해져서 "둘이 힘을 합치면 옮겨진다"가 된다)
        const key = `${g.objectId}:${g.ownerRag.pelvis.id}`;
        if (seen.has(key)) continue;
        seen.add(key);
        const list = held.get(obj.body) ?? [];
        list.push({ rag: g.ownerRag, ramp: g.ramp });
        held.set(obj.body, list);
      }
      // 잡는 방식(강체 제약 vs 밀기)을 매 스텝 갱신한 뒤 힘을 준다
      for (const [body, hs] of held) updateGripMode(body, hs.length);
      // 여러 명이 같은 물체를 잡고 있으면 힘 예산이 합산된다 (carry.ts 참고)
      for (const [body, hs] of held) applyCarryForce(physics, body, hs);
    }
    // ---- 낙하 장애물 (host 전용)
    //
    // 장애물 바디는 맵을 만들 때 미리 만들어 둔 소품이라, 여기서 상태만
    // 진행하면 위치는 기존 objects 스냅샷을 타고 클라이언트로 간다.
    if (playing) {
      const rags = [...playersById.values()].map((e) => e.rag);
      // 코스 장애물(회전봉/피스톤/거대 공)도 같은 방식으로 진행한다.
      // 회전봉과 피스톤은 kinematic이라 부딪힌 쪽이 실제로 밀려나고,
      // 거대 공에 맞은 사람만 여기서 넉백 처리를 받는다.
      const obHits = obstacles.update(dt, rags);
      updateBotSpawns();
      updateCoopPass();
      syncCoopGates();
      updateBallBackstop(dt);
      updateSlotUnstick(dt);
      updatePlayerBumps(dt);
      const hits = [...hazards.update(dt, rags), ...obHits];
      for (const hit of hits) {
        sfx.play("hit", { vol: isMine(hit.rag) ? 1 : 0.4 });
        if (isMine(hit.rag)) addShake(0.85);
        // 골 코앞에서 맞으면 그게 제일 억울하고 제일 웃기다. 그 순간만
        // 따로 집어준다 (평소 피격은 기존 연출 그대로).
        if (isMine(hit.rag)) {
          const gz = world.map.goal.z;
          const bb = ballBody();
          if (Math.abs(hit.rag.pelvis.position.z - gz) < 20
              && bb && Math.abs(bb.position.z - gz) < 20) {
            addShake(1.3);
            showMove("아까비!", "골 코앞에서 놓쳤다");
          }
        }
        // 맞으면 잡고 있던 걸 놓는다. E로 공을 안고 있었으면 캐리가 풀리고,
        // 공은 제약이 사라진 채 그대로 물리로 굴러간다.
        // (드리블 중이었다면 knockdown으로 state가 ACTIVE가 아니게 되므로
        //  ball.ts의 드리블이 알아서 손을 뗀다 - 따로 막을 필요가 없다)
        const links = grabsOf(hit.rag);
        if (links.length > 0) {
          for (const g of links) {
            const obj = objectById.get(g.objectId);
            // 놓는 순간 맞은 방향으로 살짝 튕겨 나가게 해서 "놓쳤다"가 보이게
            if (obj) obj.body.applyImpulse(new CANNON.Vec3(hit.dirX * 2.2, 1.2, hit.dirZ * 2.2));
          }
          releaseGrabsOf(hit.rag);
        }
      }
    }

    // 단일 인자 = 고정 스텝 1회. internalStep()이 정확히 한 번 돌고
    // 그 끝에서 clearForces()가 불리므로 control()의 힘이 누적되지 않는다.
    physics.step(dt);
    for (const e of playersById.values()) {
      if (e.rag.guard()) releaseGrabsOf(e.rag);
    }
    if (playing) checkFalls();
  } else {
    // ---- 비-host: 스냅샷 보간만
    for (const [pid, snap] of snapTargets) {
      const e = playersById.get(pid);
      if (!e) continue;
      e.rag.bodies.forEach((body, i) => {
        if (i >= snap.pos.length) return;
        const cur = new THREE.Vector3(body.position.x, body.position.y, body.position.z);
        cur.lerp(snap.pos[i], 0.4);
        body.position.set(cur.x, cur.y, cur.z);
        const cq = new THREE.Quaternion(body.quaternion.x, body.quaternion.y, body.quaternion.z, body.quaternion.w);
        cq.slerp(snap.quat[i], 0.4);
        body.quaternion.set(cq.x, cq.y, cq.z, cq.w);
      });
    }
    for (const o of objects) {
      const t = objTargets.get(o.id);
      if (!t) continue;
      const cur = new THREE.Vector3(o.body.position.x, o.body.position.y, o.body.position.z);
      cur.lerp(t.p, 0.4);
      o.body.position.set(cur.x, cur.y, cur.z);
      const cq = new THREE.Quaternion(o.body.quaternion.x, o.body.quaternion.y, o.body.quaternion.z, o.body.quaternion.w);
      cq.slerp(t.q, 0.4);
      o.body.quaternion.set(cq.x, cq.y, cq.z, cq.w);
    }
    physics.step(dt);
  }

  // 타이머/성공·실패 판정. host에서만 실제로 돈다 (비-host는 즉시 리턴).
  game.update(dt);
}

function animate() {
  requestAnimationFrame(animate);
  const frameDt = Math.min(clock.getDelta(), 0.25);

  const myId = net.id;

  // ---- 디버그 키 (내가 조종 중인 캐릭터 대상)
  // 스텝 루프보다 먼저 소비한다. knockdown/reset은 상태 변경이고 impulse는
  // 속도를 직접 바꾸므로 프레임당 1회로 충분하다(누적 위험 없음).
  if (DEBUG) {
    // 결과 화면 중에는 소비만 하고 실행은 안 한다 (안 지우면 다시하기 직후에
    // 그동안 눌린 디버그 키가 한꺼번에 터진다)
    const target = myId !== null && game.phase === "playing"
      ? playersById.get(controlTargetOf(myId))
      : undefined;
    if (target) {
      if (debugEdge.R) { target.rag.knockdown(); }
      if (debugEdge.T) { target.rag.reset(new CANNON.Vec3(target.rag.pelvis.position.x, P.rideHeight + 0.3, target.rag.pelvis.position.z)); }
      // applyImpulse(force, point)의 point는 무게중심 기준 상대 오프셋이다.
      // 절대 world position을 넘기면 원점에서 먼 곳일수록 커지는 가짜
      // 토크가 생긴다(ragdoll.ts의 ride-height spring 주석 참고). 생략하면
      // 기본값 (0,0,0) = 무게중심을 통과하는 순수 힘/충격량이 된다.
      if (debugEdge.Y) { target.rag.torso.applyImpulse(new CANNON.Vec3(60, 25, 0)); }
      if (debugEdge.U) { target.rag.pelvis.applyImpulse(new CANNON.Vec3(0, P.jumpImpulse, 0)); }
    }
    debugEdge.R = debugEdge.T = debugEdge.Y = debugEdge.U = false;
  }

  // ---- 고정 timestep 루프
  accumulator += frameDt;
  // 로딩 직후 첫 몇 프레임은 자산 로딩/탭 활성화 지연으로 delta가 크게 튄다.
  // 관절이 안정화되기 전에 여러 스텝을 몰아서 돌리지 않도록 초반엔 1스텝으로 제한.
  if (firstFrames > 0) { accumulator = Math.min(accumulator, FIXED_DT); firstFrames--; }
  let steps = 0;
  while (accumulator >= FIXED_DT && steps < MAX_SUBSTEPS) {
    fixedUpdate(FIXED_DT);
    accumulator -= FIXED_DT;
    steps++;
  }
  // 상한에 걸렸으면 남은 시간은 버린다 (안 버리면 다음 프레임에 더 많이 밀려
  // 따라잡기 악순환에 빠지고, 그게 또 관절 발산으로 이어진다)
  if (steps >= MAX_SUBSTEPS) accumulator = 0;

  // (grabEdge는 여기서 지우지 않는다. 물리 스텝이 0회인 프레임에서 지워버리면
  //  그 프레임에 눌린 E가 사라진다 - fixedUpdate 안에서만 소비한다.)

  // ---- 렌더 동기화
  for (const e of playersById.values()) e.rag.sync();
  for (const o of objects) {
    o.mesh.position.set(o.body.position.x, o.body.position.y, o.body.position.z);
    o.mesh.quaternion.set(o.body.quaternion.x, o.body.quaternion.y, o.body.quaternion.z, o.body.quaternion.w);
  }

  // ---- 카메라: 내가 조종하는 캐릭터를 따라간다
  //      (타이틀/대기실 동안에는 따라갈 캐릭터가 없으므로 방 위를 천천히 돈다)
  const camTarget = myId !== null ? playersById.get(controlTargetOf(myId)) : undefined;
  if (camTarget) updateCamera(camTarget.rag.pelvis.position, camTarget.rag.pelvis.velocity, frameDt);
  else updateMenuCamera(frameDt);

  // 해가 카메라를 따라다니게 한다.
  //
  // 그림자 카메라는 ±22m라, 90m짜리 Goal Rush 코스에서는 출발 구역을 벗어나는
  // 순간 그림자가 통째로 사라진다. 해를 "지금 보고 있는 지점" 기준으로 옮기면
  // 코스가 아무리 길어도 그림자 해상도를 그대로 유지할 수 있다.
  // (빛의 방향은 그대로 두고 위치만 평행이동하므로 음영은 변하지 않는다)
  {
    const t = camTarget ? camTarget.rag.pelvis.position : null;
    const fx = t ? t.x : 0, fz = t ? t.z : 0;
    world.sun.position.set(fx + 17, 19, fz + 11);
    world.sun.target.position.set(fx, 0, fz);
    world.sun.target.updateMatrixWorld();
  }

  // 낙하 경고 링 (물리와 무관 - 위치만 보고 그린다)
  updateWarnRings();

  // ---- 개인기 잔상 + 이펙트 (전부 장식. 물리는 건드리지 않는다)
  {
    const bb = ballBody();
    let want = ballTrail > 0;          // 사고로 날아가는 공에도 잔상을 남긴다
    for (const [rag, left] of trickTrail) {
      const t = left - frameDt;
      if (t <= 0) { trickTrail.delete(rag); continue; }
      trickTrail.set(rag, t);
      want = true;
    }
    // 3프레임에 한 번만 찍는다 (매 프레임이면 점이 뭉쳐서 선처럼 보인다)
    if (want && bb && trailSkip % 3 === 0) fx.trail(bb.position.x, bb.position.y, bb.position.z);
    trailSkip++;
  }
  for (const e of playersById.values()) updateFootsteps(e.rag, frameDt);
  // 사고 연출 + 관찰형 소리. 전부 위치/상태를 읽기만 하므로 host가 아니어도 돈다.
  updateBallDrama(frameDt);
  updateVoidDrama();
  if (inGame) updateLocalSfx();
  fx.update(frameDt);
  // 누가 나이고 누가 친구인지 (머리 위 표시). 위치만 읽는다.
  updateHeadMarks(markClock += frameDt);
  // 화면 밖으로 나간 공/친구의 방향·거리 (읽기만 한다)
  updateBallCue(camTarget ? camTarget.rag.pelvis : null);
  updateMateCue(camTarget ? camTarget.rag.pelvis : null);
  // 튜토리얼 한 줄 안내 + 킥 차징 게이지 (둘 다 표시만)
  updateTutorial(camTarget ? camTarget.rag.pelvis : null);
  updateKickGauge();
  updateCountdown(frameDt);
  updateToast(frameDt);
  updateAlert(frameDt);
  updateBotHint(frameDt, camTarget ? camTarget.rag : null);
  updateSkillHints(frameDt, camTarget ? camTarget.rag : null);
  updateGateHint(frameDt, camTarget ? camTarget.rag : null);
  updateSlotHint(camTarget ? camTarget.rag : null);
  watchGatesLocally();

  // 목표/출구 마커 애니메이션 + 상단 HUD (렌더 직전, 물리와 무관)
  game.render(frameDt);

  renderer.render(scene, camera);

  sendTimer += frameDt;
  if (sendTimer >= 1 / SEND_HZ) { sendTimer = 0; sendNetwork(); }

  frames++; fpsTimer += frameDt;
  if (fpsTimer >= 0.5) {
    fps = Math.round(frames / fpsTimer);
    frames = 0; fpsTimer = 0;
    updateHud();
  }
}

// 타이틀 화면 뒤에서도 방이 보이도록 렌더 루프는 즉시 돌린다.
// (물리도 같이 돌지만 래그돌이 아직 없으므로 소품만 자리를 잡는다)
animate();

// ---------------------------------------------------------------- 세션 시작
//
// 타이틀에서 모드를 고르면 여기로 들어온다. 물리/게임 로직은 이 아래로
// 전혀 바뀌지 않는다 - "언제 스폰을 시작하는가"만 메뉴가 정할 뿐이다.
function beginSession() {
  if (inGame) return;
  inGame = true;

  const myId = net.id;
  if (myId === null) return;

  // 지금 방에 있는 사람 전원을 스폰한다.
  // (id 순서로 스폰해야 스폰 지점 배치가 모든 클라이언트에서 같아진다)
  for (const id of [myId, ...net.peers].sort((a, b) => a - b)) spawnPlayer(id);
  setAuthority(net.isHost);
  spawnBots();
  startCountdown();
  sfx.music(true);

  // 게임 화면으로 넘어왔으니 목표바와 조작 안내를 띄운다.
  // (디버그 HUD는 기본으로 감춰 둔다 - H로 켠다)
  for (const id of ["goalbar", "help"]) {
    document.getElementById(id)!.hidden = false;
  }
  updateHud();
}

createMenu(net, {
  onStart: () => beginSession(),
});

void objectById;

// ---------------------------------------------------------------- 디버그 훅
// 브라우저에서 실제 코드 경로를 그대로 태운 채 상태를 들여다보기 위한 창구.
// (헤드리스 테스트로는 카메라 기저/pitch/충돌/grab 버그를 못 잡았다 - 이 훅으로
//  실제 페이지에서 검증한다). DEBUG일 때만 붙는다.
if (DEBUG) {
  (window as unknown as { __dbg: unknown }).__dbg = {
    get yaw() { return yaw; },
    set yaw(v: number) { yaw = v; },
    get pitch() { return pitch; },
    set pitch(v: number) { pitch = v; },
    get camera() { return camera.position.toArray(); },
    /** 실제 mousemove 핸들러와 같은 경로 (pointer lock 없이 호출 가능) */
    look(dx: number, dy: number) {
      const l = applyLook({ yaw, pitch }, dx, dy);
      yaw = l.yaw; pitch = l.pitch;
      return { yaw, pitch };
    },
    /** 공 튜닝 상수 - 브라우저에서 값을 바꿔가며 손맛을 잡을 때 쓴다 */
    ballConst: B,
    audio: () => sfx.status(),
    move: readMoveInput,
    keys,
    physics,
    world,
    net,
    inGame: () => inGame,
    grabs: () => grabs.map((g) => {
      const obj = objectById.get(g.objectId);
      const target = obj
        ? obj.body.position.vadd(obj.body.quaternion.vmult(g.pivotLocal))
        : null;
      return {
        objectId: g.objectId,
        constrained: !!g.constraint,
        ramp: g.ramp,
        hand: g.hand.position.toArray(),
        target: target ? target.toArray() : null,
        /** 손 중심 ↔ 붙잡은 지점 거리. 손 반지름(0.085)보다 작으면 시각적으로 닿아 있다 */
        gap: target ? g.hand.position.distanceTo(target) : null,
      };
    }),
    players: () => [...playersById.values()].map((e) => ({
      id: e.id,
      pelvis: e.rag.pelvis.position.toArray(),
      state: e.rag.state,
      grounded: e.rag.grounded,
      group: e.rag.pelvis.collisionFilterGroup,
      mask: e.rag.pelvis.collisionFilterMask,
    })),
    objects: () => objects.map((o) => ({
      id: o.id, mass: o.body.mass, type: o.body.type,
      p: o.body.position.toArray(),
      group: o.body.collisionFilterGroup, mask: o.body.collisionFilterMask,
    })),
    obj: (id: number) => objectById.get(id)!.body.position.toArray(),
    /** 로컬에서 옷 조합/충돌을 눈으로 보려고 더미 캐릭터를 세운다 */
    spawn: (id: number) => { spawnPlayer(id); return [...playersById.keys()]; },
    outfit: colorsFor,
    controlled: () => (net.id !== null ? controlTargetOf(net.id) : null),
    authority: () => authority,
    phase: () => game.phase,
    pressE: () => { grabEdge = true; },
    pressTrick: () => { trickEdge = true; },
    pressKick: () => { kickEdge = true; },
    /** 봇을 원하는 마리 수만큼 다시 세운다 (검증용) */
    setBots: (n: number) => {
      for (const id of [...playersById.keys()]) if (isBot(id)) despawnPlayer(id);
      const spots = world.map.botSpawns ?? [];
      for (let i = 0; i < Math.min(n, spots.length); i++) spawnPlayer(-(i + 1), spots[i]);
      return [...playersById.keys()].filter(isBot);
    },
    bots: () => [...playersById.values()].filter((e) => isBot(e.id)).map((e) => ({
      id: e.id,
      pos: e.rag.pelvis.position.toArray().map((v) => +v.toFixed(2)),
      state: e.rag.state,
      input: [+e.input.moveX.toFixed(2), +e.input.moveZ.toFixed(2)],
    })),
    hazards: () => hazards.stations.map((s) => ({
      id: s.spec.id, phase: s.phase, timer: +s.timer.toFixed(2),
      pos: s.body.position.toArray().map((v) => +v.toFixed(2)),
    })),
    ball: () => {
      const b = ballBody();
      if (!b) return null;
      const me = net.id !== null ? playersById.get(controlTargetOf(net.id)) : undefined;
      return {
        p: b.position.toArray(),
        v: b.velocity.toArray(),
        w: b.angularVelocity.toArray(),
        speed: Math.hypot(b.velocity.x, b.velocity.z),
        spin: b.angularVelocity.length(),
        heldBy: grabs.filter((g) => g.objectId === BALL_ID).length,
        distToPlayer: me ? Math.hypot(b.position.x - me.rag.pelvis.position.x, b.position.z - me.rag.pelvis.position.z) : null,
        trickCooldown: me ? ballPlay.cooldownOf(me.rag) : null,
      };
    },
    teleport(x: number, z: number) {
      const id = net.id;
      if (id === null) return null;
      const e = playersById.get(controlTargetOf(id));
      if (!e) return null;
      releaseGrabsOf(e.rag);
      e.rag.reset(new CANNON.Vec3(x, P.rideHeight + 0.15, z));
      return e.rag.pelvis.position.toArray();
    },
  };
}
