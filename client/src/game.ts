import * as THREE from "three";
import * as CANNON from "cannon-es";
import type { World } from "./world";
import { MAPS } from "./maps";
import { halfExtentsOf } from "./shapes";
import type { GamePhase, GameSnapshot } from "./protocol";

/**
 * 게임 루프 — 목표 표시 / 타이머 / 성공·실패 / 맵 진행.
 *
 * 물리/캐릭터 코드는 건드리지 않는다. 이 모듈은
 *   - 그 맵의 목표 오브젝트와 출구를 시각적으로 표시하고
 *   - 제한시간을 세고
 *   - 성공/실패를 판정하고
 *   - 다시하기 / 다음 맵 / 전체 클리어를 처리한다
 * 만 담당한다. 물리 상태를 되돌리는 일은 main.ts가 넘겨준 훅에 위임한다 -
 * 래그돌/제약/grab 은 main.ts가 소유하고 있기 때문이다.
 *
 * [맵] 목표 id·출구 좌표·제한시간은 전부 world.map(= maps.ts의 MapDef)에서
 * 읽는다. 맵이 바뀌면 world.onMapLoaded로 통보받아 마커를 다시 만든다.
 *
 * [권위] 타이머와 판정은 host에서만 돈다. 비-host는 snapshot에 실려오는
 * GameSnapshot을 그대로 표시만 한다. host가 바뀌어도 마지막으로 받은 값에서
 * 이어서 세기 때문에 이양이 자연스럽다.
 */

/** 첫 맵의 목표 id / 제한시간 (헤드리스 테스트가 기준값으로 쓴다) */
export const TARGET_ID = MAPS[0].targetId;
export const TARGET_NAME = MAPS[0].targetName;
export const TIME_LIMIT = MAPS[0].timeLimit;

/** 물체를 벽 너머로 던져 넘기는 걸 막는 높이 상한 */
const GOAL_MAX_Y = 3.0;
/** 이 시간만큼 출구 안에 머물러야 성공 (한 프레임 스쳐가는 오판정 방지) */
const GOAL_DWELL = 0.25;

const COL_GOAL = 0x3ddc84;
const COL_TARGET = 0xffd23f;

export interface GameHooks {
  /** 지금 이 클라이언트가 물리 권위(host)인가 */
  isAuthority(): boolean;
  /** host: 소품/캐릭터를 초기 위치로 되돌린다 */
  resetWorld(): void;
  /** 비-host: host에게 재시작을 요청한다 */
  requestRestartRemote(): void;
  /** 비-host: host에게 다음 맵을 요청한다 */
  requestNextMapRemote?(): void;
  /** 지금 공을 누가 들고 있는가 (들고 들어가는 건 골이 아니다) */
  isBallCarried?(): boolean;
  /**
   * 골라인을 넘은 이 공이 **인정되는가** (협동 골 규칙).
   *
   * [왜 game.ts가 규칙을 안 갖는가] "둘 다 공을 건드렸나"를 알려면 누가 언제
   * 공을 찼는지를 봐야 하는데, 그건 래그돌과 공을 소유한 main.ts만 안다.
   * 여기서는 골라인 통과라는 **기하학**만 판정하고, 인정 여부는 물어본다.
   * 훅이 없으면 예전 그대로 전부 인정된다.
   */
  isGoalValid?(): boolean;
  /** 골라인은 넘었지만 인정되지 않았다 (공을 되돌리고 이유를 알려주는 몫) */
  onGoalRejected?(): void;
  /**
   * 체크포인트 번호를 주고받는다 (host가 정하고 비-host가 받는다).
   *
   * 상태를 game.ts가 갖지 않는 이유는 위와 같다 — 판정에 필요한 사람 위치를
   * main.ts가 갖고 있다. 여기는 **스냅샷에 실어 나르기만** 한다.
   */
  checkpoint?(): number;
  setCheckpoint?(n: number): void;
  /** 골이 들어간 순간 (연출/사운드용) */
  onGoal?(): void;
  /** 실패한 순간 */
  onFail?(): void;
  /** 골라인/골대 좌표를 맵에서 읽어간다 */
}

export interface Game {
  readonly phase: GamePhase;
  /** 고정 timestep에서 호출 - 타이머/판정 */
  update(dt: number): void;
  /** 매 렌더 프레임 호출 - 마커 애니메이션 + HUD */
  render(dt: number): void;
  /** host: 지금 맵을 처음부터 다시 시작 */
  restart(): void;
  /** host: 다음 맵으로 넘어간다. 마지막 맵이었으면 전체 클리어 화면 */
  nextMap(): void;
  /** 네트워크로 내보낼 게임 상태 (host 전용) */
  snapshot(): GameSnapshot;
  /** 비-host: host가 보낸 게임 상태를 반영 */
  applyRemote(s: GameSnapshot): void;
}

/**
 * 받침 유무에 따라 목적격 조사를 고른다.
 * ("공구함를" 처럼 어색하게 나오던 걸 맞춘다)
 */
function obj(word: string): string {
  const last = word.charCodeAt(word.length - 1);
  const hasBatchim = last >= 0xac00 && last <= 0xd7a3 && (last - 0xac00) % 28 !== 0;
  return word + (hasBatchim ? "을" : "를");
}

function fmtTime(sec: number): string {
  const s = Math.max(0, Math.ceil(sec));
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
}

/** 벽/가구에 가려도 항상 보이는 마커용 재질 */
function overlayMat(color: number): THREE.MeshBasicMaterial {
  const m = new THREE.MeshBasicMaterial({ color });
  m.depthTest = false;
  m.depthWrite = false;
  m.toneMapped = false;
  return m;
}

export function createGame(world: World, hooks: GameHooks): Game {
  const { scene } = world;

  // ------------------------------------------------------------ 맵별 상태
  //
  // 맵마다 다시 만들어야 하는 것들. 맵을 갈아끼울 때 씬에서 떼고 지오메트리도
  // 버린다 - 마커는 mapkit 캐시를 쓰지 않고 여기서 직접 만들기 때문에
  // 안 버리면 맵을 넘길 때마다 쌓인다.
  let markers: THREE.Group | null = null;
  let outline: THREE.Mesh | null = null;
  let pointer: THREE.Group | null = null;
  let ring!: THREE.Mesh;
  let disc!: THREE.Mesh;
  let spinner!: THREE.Group;
  let goalPin!: THREE.Mesh;

  let goalX = 0, goalZ = 0, goalR = 1.6;
  /** 골라인의 좌우 반폭 (이 안으로 넘어야 골) */
  let goalHalfW = 4;
  /**
   * 직전 스텝의 공 z (골라인 "통과"를 잡으려면 이전 위치가 있어야 한다).
   * buildMarkers()가 맵마다 초기화하므로 그 함수보다 위에 선언해야 한다.
   */
  let prevBallZ: number | null = null;
  /** 골라인을 넘은 순간을 붙잡아 둔다 (다음 update에서 소비) */
  let crossed = false;
  let targetBody: CANNON.Body | null = null;
  let timeLimit = MAPS[0].timeLimit;
  /**
   * 이 맵이 성공/실패를 판정하는가.
   *
   * Goal Rush 코스는 골대·골키퍼·골 판정이 5단계 몫이라 아직 false다.
   * false면 출구 마커도 결과 화면도 없고, 남은 거리만 표시한다.
   */
  let judging = true;

  function disposeTree(root: THREE.Object3D) {
    root.traverse((o) => {
      const m = o as THREE.Mesh;
      if (!m.isMesh) return;
      m.geometry.dispose();
      const mat = m.material;
      if (Array.isArray(mat)) for (const x of mat) x.dispose();
      else mat.dispose();
    });
  }

  function clearMarkers() {
    if (markers) { scene.remove(markers); disposeTree(markers); markers = null; }
    if (pointer) { scene.remove(pointer); disposeTree(pointer); pointer = null; }
    if (outline) {
      outline.removeFromParent();
      disposeTree(outline);
      outline = null;
    }
  }

  /** 지금 로드된 맵에 맞춰 목표/출구 마커를 새로 만든다 */
  function buildMarkers() {
    clearMarkers();
    const def = world.map;
    goalX = def.goal.x; goalZ = def.goal.z; goalR = def.goal.radius;
    goalHalfW = def.goal.halfWidth ?? def.goal.radius * 2.4;
    prevBallZ = null;
    crossed = false;
    timeLimit = def.timeLimit;
    judging = def.judge !== false;
    // 판정을 안 하는 맵에서는 타이머 자체를 감춘다. 0:00까지 흐르고 아무 일도
    // 안 일어나면 고장난 것처럼 보인다.
    elTimer.hidden = !judging;

    const target = world.objectById.get(def.targetId) ?? null;
    targetBody = target?.body ?? null;

    // ---------------------------------------------------------- 출구
    //
    // judging이 아니면 출구 표시를 만들지 않는다. Goal Rush에서는 이 자리에
    // 5단계의 골대가 들어가므로, 그 전에 초록 원과 아치를 띄우면 "이미 골대가
    // 있는데 판정만 없는" 이상한 상태로 보인다.
    const g = new THREE.Group();
    g.position.set(goalX, 0, goalZ);
    g.visible = judging;
    scene.add(g);
    markers = g;

    disc = new THREE.Mesh(
      new THREE.CircleGeometry(goalR, 48),
      new THREE.MeshBasicMaterial({
        color: COL_GOAL, transparent: true, opacity: 0.18,
        depthWrite: false, toneMapped: false,
      })
    );
    disc.rotation.x = -Math.PI / 2;
    disc.position.y = 0.015;
    g.add(disc);

    ring = new THREE.Mesh(
      new THREE.RingGeometry(goalR - 0.22, goalR, 64),
      new THREE.MeshBasicMaterial({
        color: COL_GOAL, transparent: true, opacity: 0.85,
        depthWrite: false, toneMapped: false,
      })
    );
    ring.rotation.x = -Math.PI / 2;
    ring.position.y = 0.02;
    g.add(ring);

    // 회전하는 조각 링 - 정지한 원보다 훨씬 눈에 잘 띈다
    spinner = new THREE.Group();
    spinner.rotation.x = -Math.PI / 2;
    spinner.position.y = 0.03;
    for (let i = 0; i < 6; i++) {
      spinner.add(new THREE.Mesh(
        new THREE.RingGeometry(goalR + 0.08, goalR + 0.3, 8, 1, (i / 6) * Math.PI * 2, 0.55),
        new THREE.MeshBasicMaterial({
          color: COL_GOAL, transparent: true, opacity: 0.7,
          depthWrite: false, toneMapped: false,
        })
      ));
    }
    g.add(spinner);

    // 빛기둥
    const pillar = new THREE.Mesh(
      new THREE.CylinderGeometry(goalR * 0.92, goalR, 2.8, 32, 1, true),
      new THREE.MeshBasicMaterial({
        color: COL_GOAL, transparent: true, opacity: 0.1,
        side: THREE.DoubleSide, depthWrite: false, toneMapped: false,
      })
    );
    pillar.position.y = 1.4;
    g.add(pillar);

    // 독립형 출구 게이트.
    //
    // 예전엔 집 맵의 +X 벽에 딱 붙는 문틀이었는데, 좌표가 그 벽에 맞춰
    // 하드코딩돼 있어서 다른 맵에서는 허공에 뜨거나 벽을 뚫었다.
    // 출구 원 위에 스스로 서 있는 아치로 바꿔서 어느 맵에서든 맞게 했다.
    const gateMat = new THREE.MeshStandardMaterial({ color: 0x2fa86a, roughness: 0.5 });
    const GW = goalR * 1.45, GH = 2.6;
    for (const sz of [-1, 1]) {
      const post = new THREE.Mesh(new THREE.BoxGeometry(0.26, GH, 0.26), gateMat);
      post.position.set(0, GH / 2, sz * GW);
      post.castShadow = true;
      g.add(post);
    }
    const lintel = new THREE.Mesh(new THREE.BoxGeometry(0.26, 0.26, GW * 2 + 0.26), gateMat);
    lintel.position.set(0, GH + 0.13, 0);
    lintel.castShadow = true;
    g.add(lintel);

    // 벽/가구에 가려도 보이는 출구 표식 (맵 반대편에서도 방향을 알 수 있게)
    goalPin = new THREE.Mesh(new THREE.OctahedronGeometry(0.34), overlayMat(COL_GOAL));
    goalPin.position.set(goalX, 3.5, goalZ);
    goalPin.renderOrder = 998;
    scene.add(goalPin);
    markers.add(goalPin);
    goalPin.position.set(0, 3.5, 0);   // 그룹 자식이므로 로컬 좌표로

    // ---------------------------------------------------------- 목표 오브젝트
    //
    // 아웃라인은 "뒤집힌 껍데기" 방식이다. 물체보다 살짝 큰 박스를 BackSide로
    // 그리면 실루엣 가장자리에만 색이 남는다. 소품 Group의 자식으로 붙이므로
    // 물체가 회전해도 같이 돈다. (물리 바디는 전혀 건드리지 않는다)
    pointer = new THREE.Group();
    pointer.visible = false;
    pointer.renderOrder = 999;
    scene.add(pointer);

    if (target) {
      const h = halfExtentsOf(target.body);
      outline = new THREE.Mesh(
        new THREE.BoxGeometry(h.x * 2, h.y * 2, h.z * 2),
        new THREE.MeshBasicMaterial({ color: COL_TARGET, side: THREE.BackSide, toneMapped: false })
      );
      outline.scale.setScalar(1.05);
      target.mesh.add(outline);

      // 머리 위 화살표. 물체와 같이 돌면 어지러우니 씬 루트에 두고 위치만 따라간다.
      const shaft = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.09, 0.42, 12), overlayMat(COL_TARGET));
      shaft.position.y = 0.42;
      const head = new THREE.Mesh(new THREE.ConeGeometry(0.26, 0.42, 14), overlayMat(COL_TARGET));
      head.rotation.z = Math.PI;   // 아래(물체 쪽)를 가리키게
      pointer.add(shaft, head);
      for (const c of pointer.children) c.renderOrder = 999;
      pointer.visible = true;
    }

    elGoalText.textContent = !target
      ? `목표 오브젝트(id ${def.targetId})를 찾을 수 없다`
      : judging
        ? `[${world.mapIndex + 1}/${world.mapCount}] ${def.name} — ${obj(def.targetName)} 출구까지`
        : `${def.name} — ${def.blurb}`;
  }

  // ------------------------------------------------------------ DOM
  const elGoalText = document.getElementById("goal-text")!;
  const elTimer = document.getElementById("timer")!;
  const elDist = document.getElementById("goal-dist")!;
  const elResult = document.getElementById("result")!;
  const elResultTitle = document.getElementById("result-title")!;
  const elResultSub = document.getElementById("result-sub")!;
  const elRetry = document.getElementById("retry") as HTMLButtonElement;
  const elNext = document.getElementById("next-map") as HTMLButtonElement | null;

  // index.html의 hidden 속성에 기대지 않는다. 결과 화면은 전체화면을 덮으므로
  // 여기서 못 내리면 게임이 시작부터 가려진 채로 뜬다.
  elResult.hidden = true;

  // ------------------------------------------------------------ 상태
  let phase: GamePhase = "playing";
  let timeLeft = MAPS[0].timeLimit;
  let dwell = 0;
  /** 성공 시점의 남은 시간 (결과 화면 표시용) */
  let clearedAt = 0;
  let t = 0;                          // 마커 애니메이션 시간
  let shownPhase: GamePhase = "playing";
  /** 결과 화면을 마지막으로 그렸을 때의 맵 인덱스 (render의 전환 판정 주석 참고) */
  let shownMap = 0;
  /** 마지막 맵까지 깼는가 */
  let allCleared = false;

  buildMarkers();
  timeLeft = timeLimit;
  world.onMapLoaded(() => {
    // 새 맵의 소품이 이미 만들어진 뒤에 불린다
    buildMarkers();
    phase = "playing";
    timeLeft = timeLimit;
    dwell = 0;
    clearedAt = 0;
  });

  /**
   * 골 판정 — "거리"가 아니라 "골라인을 실제로 넘었는가".
   *
   * [왜 거리로 재면 안 되는가] 반경 안에 들어오면 성공으로 치면, 라인 앞에서
   * 서성이기만 해도 들어가고, 라인을 스치듯 옆으로 지나가도 들어간다.
   * 여기서는 공의 z가 이번 스텝에 골라인을 앞에서 뒤로 가로질렀는지를 본다.
   *  - 좌우 폭(goalHalfW) 안이어야 하고
   *  - 너무 높이 떠서 넘어가면 안 되고(GOAL_MAX_Y)
   *  - 들고 들어가면 안 된다 (공이 스스로 굴러 들어가야 한다)
   */
  function checkCross(): boolean {
    if (!targetBody) return false;
    const z = targetBody.position.z;
    const prev = prevBallZ;
    prevBallZ = z;
    if (prev === null) return false;
    // 코스는 -Z로 진행한다. 앞(큰 z) -> 뒤(작은 z)로 가로지르는 순간만 센다.
    if (!(prev > goalZ && z <= goalZ)) return false;
    if (Math.abs(targetBody.position.x - goalX) > goalHalfW) return false;
    if (targetBody.position.y > GOAL_MAX_Y) return false;
    // 안고 들어가는 건 골이 아니다
    if (hooks.isBallCarried?.()) return false;
    // 협동 골 스테이지: 둘 다 공을 건드렸어야 한다.
    // 넘어온 것 자체는 사실이므로 그 처리(공 되돌리기 · 이유 알리기)를 맡기고
    // 성공으로는 세지 않는다.
    if (hooks.isGoalValid && !hooks.isGoalValid()) {
      hooks.onGoalRejected?.();
      return false;
    }
    return true;
  }

  /** 마커 색을 바꾸기 위한 "지금 골 지점 근처인가" (연출용, 판정과 무관) */
  function inGoal(): boolean {
    if (!targetBody) return false;
    if (targetBody.position.y > GOAL_MAX_Y) return false;
    const dx = targetBody.position.x - goalX;
    const dz = targetBody.position.z - goalZ;
    return Math.hypot(dx, dz) <= goalR;
  }

  function update(dt: number) {
    if (!judging) return;               // 아직 이길 방법이 없는 맵이면 시간도 안 센다
    if (!hooks.isAuthority()) return;   // 타이머/판정은 host만
    if (phase !== "playing") return;

    timeLeft -= dt;
    if (timeLeft <= 0) {
      timeLeft = 0;
      phase = "fail";
      hooks.onFail?.();
      return;
    }
    // 골라인을 실제로 넘었는가 (거리 판정이 아니다 - checkCross 주석 참고)
    if (checkCross()) crossed = true;
    if (crossed) {
      crossed = false;
      phase = "success";
      clearedAt = timeLeft;
      hooks.onGoal?.();
    }
    void dwell; void GOAL_DWELL;
  }

  /** 맵 이름에서 앞의 "1. " 같은 번호를 뗀다 (STAGE n 과 겹치므로) */
  const bare = (n: string) => n.replace(/^\d+\.\s*/, "");

  function showResult() {
    const ok = phase === "success";
    const last = world.mapIndex >= world.mapCount - 1;
    const stage = world.mapIndex + 1;

    if (ok && last) allCleared = true;

    elResultTitle.textContent = allCleared ? "전체 클리어!" : ok ? "성공!" : "실패!";
    elResultTitle.style.color = ok ? "#5ef2a0" : "#ff8080";

    // [왜 여기에 스테이지 이름을 적는가] 결과 화면에는 "성공!"과 남은 시간만
    // 있어서, 지금 몇 번째를 깼고 다음이 무엇인지가 화면 어디에도 없었다.
    // 세 판을 이어서 하는 게임이라 "다음은 어디"가 곧 다음 행동이다.
    const nextName = !last ? bare(MAPS[world.mapIndex + 1].name) : null;
    elResultSub.textContent = allCleared
      ? `STAGE 1~${world.mapCount} 전부 통과했다. 수고했다!`
      : ok
        ? `STAGE ${stage} 「${bare(world.map.name)}」 클리어 — 남은 시간 ${fmtTime(clearedAt)}`
          + (nextName ? ` · 다음은 「${nextName}」` : "")
        // 실패는 "왜 졌는지"가 보여야 다시 할 마음이 든다. 남은 거리를 같이 적는다.
        : `STAGE ${stage} 「${bare(world.map.name)}」 — 시간 초과`
          + (targetBody
            ? ` · 골까지 ${Math.hypot(targetBody.position.x - goalX, targetBody.position.z - goalZ).toFixed(0)}m 남았다`
            : "");

    // [다음 맵]은 성공했고 아직 남은 맵이 있을 때만
    if (elNext) elNext.hidden = !(ok && !last);
    elRetry.textContent = allCleared ? "처음부터" : "다시하기";

    elResult.hidden = false;
    // 결과 화면의 버튼을 누르려면 마우스 커서가 필요하다
    if (document.pointerLockElement) document.exitPointerLock();
  }

  function render(dt: number) {
    t += dt;

    // ---- 마커 애니메이션
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

    // 지금 목표 안에 들어가 있는지 색으로 즉시 읽히게
    const hit = phase === "success" || inGoal();
    const c = hit ? 0xffffff : COL_GOAL;
    (ring.material as THREE.MeshBasicMaterial).color.setHex(c);
    (disc.material as THREE.MeshBasicMaterial).color.setHex(c);

    // ---- HUD
    elTimer.textContent = fmtTime(timeLeft);
    elTimer.classList.toggle("urgent", phase === "playing" && timeLeft <= 30);
    if (targetBody) {
      const d = Math.hypot(targetBody.position.x - goalX, targetBody.position.z - goalZ);
      elDist.textContent = judging ? `출구까지 ${d.toFixed(1)}m` : `코스 끝까지 ${d.toFixed(0)}m`;
    }

    // ---- 결과 화면 전환
    //
    // [맵 인덱스도 같이 본다] 비-host는 phase를 스냅샷으로 받는다. 프레임이
    // 한동안 안 도는 사이(탭이 뒤로 갔거나 렉이 걸리면 실제로 그렇게 된다)에
    // host가 「성공 → 다음 맵 → 성공」까지 진행해 버리면, 받는 쪽에서는
    // success -> success 로만 보여서 전환이 한 번도 안 잡힌다. 그러면 3번째
    // 맵을 깼는데 화면에는 1번째 결과가 그대로 남는다 (실측으로 재현했다).
    if (phase !== shownPhase || (phase !== "playing" && world.mapIndex !== shownMap)) {
      shownPhase = phase;
      shownMap = world.mapIndex;
      if (phase === "playing") elResult.hidden = true;
      else showResult();
    }
  }

  function restart() {
    // 전체 클리어 뒤의 [처음부터]는 1번 맵으로 되돌린다
    if (allCleared) {
      allCleared = false;
      elRetry.textContent = "다시하기";   // 다음 결과 화면 전까지 라벨이 안 바뀌므로 여기서
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
    // loadMap이 onMapLoaded를 부르고, 거기서 타이머/판정 상태가 초기화된다.
    world.loadMap(world.mapIndex + 1);
    // 캐릭터를 새 맵 스폰 지점으로 (소품은 loadMap이 이미 새로 만들었다)
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
    get phase() { return phase; },
    update,
    render,
    restart,
    nextMap,
    snapshot(): GameSnapshot {
      return {
        phase, t: Math.round(timeLeft * 10) / 10, m: world.mapIndex,
        c: hooks.checkpoint?.(),
      };
    },
    applyRemote(s: GameSnapshot) {
      if (hooks.isAuthority()) return;   // host는 자기 계산이 우선
      // host가 맵을 넘겼으면 따라간다
      if (s.m !== undefined && s.m !== world.mapIndex) world.loadMap(s.m);
      // 체크포인트는 host가 정한 것을 그대로 따른다. 한쪽만 통과한 상태가
      // 되면 되살아나는 자리가 서로 달라진다.
      if (s.c !== undefined) hooks.setCheckpoint?.(s.c);
      // [비-host의 "남은 시간"] clearedAt은 host의 update()에서만 채워진다.
      // 그래서 친구 화면에는 결과가 늘 「남은 시간 0:00」으로 떴다 - 위쪽
      // 타이머에는 3:15가 찍혀 있는데 결과창은 0:00이라 서로 어긋났다.
      // 골이 들어간 순간 host는 타이머를 멈추므로, 성공으로 바뀐 그 스냅샷의
      // 남은 시간이 곧 클리어 시각이다.
      if (s.phase === "success" && phase !== "success") clearedAt = s.t;
      phase = s.phase;
      timeLeft = s.t;
    },
  };
}
