import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import * as CANNON from "cannon-es";
import { type Build, type V3, boxGeo, cylGeo, makeFloorTexture, makeSkyTexture, sphGeo, toyMat } from "./mapkit";
import { MAPS, type AddBall, type AddHazard, type AddObstacle, type AddProp, type MapDef } from "./maps";
import { HZ, type HazardSpec } from "./hazards";
import { OB, type ObstacleSpec } from "./obstacles";

export interface PhysObject {
  id: number;
  /** 시각 표현. 장식 자식을 붙일 수 있게 Group도 허용한다 */
  mesh: THREE.Object3D;
  body: CANNON.Body;
  grabRadius: number;
  /**
   * 손이 이 거리 안에 들어와야 잡힌다 (물체 표면 기준). 없으면 P.grabReach.
   *
   * 공은 발 앞 1.15m에 두고 몰기 때문에, 상자처럼 손 옆에 오는 일이 없다.
   * 실측으로 드리블 중 손↔공 표면 거리가 0.97m라 기본값 0.5로는 영영 못 잡는다.
   * "굴러가는 공을 몸을 숙여 주워 안는다"에 해당하는 값을 따로 준다.
   */
  grabReach?: number;
  /** false면 E로 잡을 수 없다 (낙하 장애물처럼 잡으면 안 되는 물체) */
  grabbable?: boolean;
  /**
   * host일 때 이 물체가 가져야 할 질량.
   * (권한이 host <-> client로 바뀔 때 main.ts가 이 값으로 복구한다.
   *  예전엔 main.ts에 "id 3이면 무겁고 나머진 4" 라고 박혀 있어서
   *  소품을 늘리는 순간 질량이 전부 4로 뭉개졌다.)
   */
  mass: number;
}

export interface World {
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  renderer: THREE.WebGLRenderer;
  physics: CANNON.World;
  objects: PhysObject[];
  objectById: Map<number, PhysObject>;
  groundBody: CANNON.Body;
  /** 지금 로드된 맵의 인덱스 */
  readonly mapIndex: number;
  /** 지금 로드된 맵 정의 (목표/출구/스폰/제한시간) */
  readonly map: MapDef;
  /** 전체 맵 개수 */
  mapCount: number;
  /** 맵을 갈아끼운다 (이전 맵의 바디/메시를 전부 떼어낸다) */
  loadMap(index: number): void;
  /** 맵이 로드될 때마다 불린다. main.ts가 소품 초기위치 캐시를 갱신하는 데 쓴다 */
  onMapLoaded(fn: () => void): void;
  /** 지금 맵의 낙하 지점 목록 (hazards.ts가 읽는다) */
  hazardSpecs: HazardSpec[];
  obstacleSpecs: ObstacleSpec[];
  materials: {
    ground: CANNON.Material;
    player: CANNON.Material;
    prop: CANNON.Material;
    /** 잡고 있는 동안만 소품에 갈아 끼우는 재질 (바닥 마찰을 낮춘다) */
    held: CANNON.Material;
    /** 공 전용 - 구르도록 마찰을 주고 반발을 얹는다 */
    ball: CANNON.Material;
  };
  /**
   * 해 (그림자용).
   *
   * 그림자 카메라가 ±22m라 90m짜리 코스에서는 대부분이 그림자 밖으로 나간다.
   * main.ts가 매 프레임 카메라가 보는 지점으로 옮겨서 그림자가 따라다니게 한다.
   */
  sun: THREE.DirectionalLight;
}

// 맵 제작 키트(팔레트/가구 빌더)는 mapkit.ts, 맵 내용은 maps.ts로 분리했다.
export { PROP_HEAVY_MASS } from "./maps";
export type { MapDef } from "./maps";

// ================================================================ createWorld
export function createWorld(container: HTMLElement): World {
  // ---------------------------------------------------------- three
  const scene = new THREE.Scene();
  const fog = new THREE.Fog(0xd9ecff, 45, 130);
  scene.fog = fog;

  const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 220);

  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(window.innerWidth, window.innerHeight);
  // NeutralToneMapping은 ACES와 달리 채도를 덜 깎는다.
  // 파스텔인데 "쨍한" 장난감 느낌을 유지하려면 이쪽이 맞다.
  renderer.toneMapping = THREE.NeutralToneMapping;
  renderer.toneMappingExposure = 1.0;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  container.appendChild(renderer.domElement);

  // 실내 환경맵. metalness가 거의 0이어도 표면에 넓고 부드러운 반사광이
  // 생겨서 "비닐/플라스틱 인형" 질감이 난다. (외부 텍스처 파일이 필요 없다)
  const pmrem = new THREE.PMREMGenerator(renderer);
  const roomEnv = new RoomEnvironment();
  scene.environment = pmrem.fromScene(roomEnv, 0.04).texture;
  scene.environmentIntensity = 0.35;
  roomEnv.dispose();
  pmrem.dispose();

  // ---------------------------------------------------------- 조명
  //
  // [세기 배분] 앰비언트/헤미를 넉넉히 주면 안전하지만 그림자가 씻겨나가서
  // 전부 납작해 보인다(실측: amb 0.3 + hemi 0.7이면 소파 밑 그림자가 거의
  // 안 보였다). 채움광은 형태가 죽지 않을 만큼만 주고 태양을 세게 둔다.
  scene.add(new THREE.AmbientLight(0xffffff, 0.12));
  scene.add(new THREE.HemisphereLight(0xbfe0ff, 0xe8d3a8, 0.4));

  // 높이 띄우면 그림자가 물체 바로 밑에 깔려서 안 읽힌다. 45도보다 낮게 둬서
  // 그림자가 옆으로 길게 눕도록 한다.
  const sun = new THREE.DirectionalLight(0xfff2dc, 2.7);
  sun.position.set(17, 19, 11);
  sun.castShadow = true;
  sun.shadow.mapSize.set(2048, 2048);
  sun.shadow.camera.left = -22;
  sun.shadow.camera.right = 22;
  sun.shadow.camera.top = 22;
  sun.shadow.camera.bottom = -22;
  sun.shadow.camera.near = 1;
  sun.shadow.camera.far = 70;
  sun.shadow.bias = -0.0006;
  sun.shadow.normalBias = 0.025;
  scene.add(sun);
  scene.add(sun.target);

  // 반대편 채움광 - 그림자 쪽이 새까맣게 죽는 걸 막는다 (그림자는 안 만든다)
  const fill = new THREE.DirectionalLight(0xa9cdff, 0.28);
  fill.position.set(-12, 9, -14);
  scene.add(fill);

  // ---------------------------------------------------------- 하늘
  const sky = new THREE.Mesh(
    new THREE.SphereGeometry(95, 32, 20),
    new THREE.MeshBasicMaterial({
      map: makeSkyTexture(), side: THREE.BackSide, depthWrite: false, fog: false,
    })
  );
  sky.renderOrder = -1;
  scene.add(sky);

  // ---------------------------------------------------------- cannon
  const physics = new CANNON.World({ gravity: new CANNON.Vec3(0, -18, 0) });
  // [중요] SAPBroadphase를 쓰면 안 된다 - 캐릭터가 소품을 그냥 통과한다.
  //
  // cannon-es의 SAPBroadphase는 bodies를 aabb.lowerBound[axis] 기준으로 정렬해
  // 두고, 스윕 도중 checkBounds()가 실패하면 안쪽 루프를 break로 끊는다.
  // 그런데 두 가지가 어긋나 있다.
  //  1) 정렬 키는 body.aabb 인데, 스윕의 종료 판정은 position ± boundingRadius다.
  //     둘이 일치하지 않으므로 break가 "아직 겹칠 수 있는 쌍"을 잘라버린다.
  //  2) 애초에 이 월드의 AABB 대부분이 원점 기준으로 굳어 있다. cannon-es는
  //     aabbNeedsUpdate가 켜진 바디만 updateAABB()를 돌리는데, 정적 바디는
  //     적분되지 않아 그 플래그가 다시 켜지지 않는다. 실측으로 236개 중
  //     194개(벽/가구 전부)의 AABB가 (0,0,0)에 있는 상태였다 - 예를 들어
  //     z=-15의 벽이 z∈[-0.3,0.3]으로 잡혀 있었다.
  //     게다가 SAPBroadphase는 dirty 플래그를 setWorld()에서만 켜므로 정렬을
  //     첫 스텝에 딱 한 번 하고, 이후 래그돌이 추가되거나 움직여도 다시
  //     정렬하지 않는다.
  // 그 결과 스윕이 엉뚱한 지점에서 끊겨(실측: 냉장고 인덱스 70에서 시작해
  // 71번 바디 - 위치 x=6.6인데 AABB는 x=-0.58에 있던 원기둥 - 에서 즉시 break)
  // 래그돌(인덱스 141)과 소품의 쌍이 아예 생성되지 않았다. 브로드페이즈가
  // 쌍을 안 내놓으니 내로우페이즈는 돌지도 않고, 그래서 몸이 냉장고를
  // 그대로 통과했다. (충돌 그룹/마스크는 처음부터 정상이었다 - 직접 확인함)
  //
  // NaiveBroadphase는 정렬/조기종료 가정이 없고 쌍 판정도 AABB가 아니라
  // 위치+bounding sphere로 하므로 이 문제에서 자유롭다. 바디 236개면
  // O(n²)라 해도 스텝당 약 2.8만 번의 값싼 비교이고, 대부분은 "둘 다 정적"
  // 조기 탈출로 끝난다. 실측 60fps 유지.
  physics.broadphase = new CANNON.NaiveBroadphase();
  physics.allowSleep = false;
  // 기본 solver iterations(10)는 다관절 래그돌(15 body / 14 constraint)에 부족해서
  // 스폰 직후 관절이 수렴하지 못하고 즉시 발산(사지 분해 + 날아감)한다.
  // 헤드리스 테스트에서는 20으로 맞췄었는데 실제 게임 월드 생성 코드에는 빠져 있었음.
  (physics.solver as CANNON.GSSolver).iterations = 22;
  (physics.solver as CANNON.GSSolver).tolerance = 0.0005;

  const groundMat = new CANNON.Material("ground");
  const playerMat = new CANNON.Material("player");
  const propMat = new CANNON.Material("prop");
  const heldMat = new CANNON.Material("held");
  const ballMat = new CANNON.Material("ball");

  physics.addContactMaterial(
    // 래그돌은 발로 지면을 짚어서 걷는다 -> 마찰이 필요하다.
    // (단일 캡슐 컨트롤러 시절엔 마찰 0이 맞았지만 다관절에서는 정반대)
    new CANNON.ContactMaterial(groundMat, playerMat, { friction: 0.55, restitution: 0 })
  );
  physics.addContactMaterial(
    // 무거운 소품이 바닥에 "붙어버리지" 않도록 마찰을 낮춘다.
    // 무게감은 마찰이 아니라 관성(질량)이 만들어야 자연스럽다.
    new CANNON.ContactMaterial(groundMat, propMat, { friction: 0.2, restitution: 0.05 })
  );
  physics.addContactMaterial(
    new CANNON.ContactMaterial(playerMat, propMat, { friction: 0.3, restitution: 0.05 })
  );

  // ---- 잡고 있는 동안의 소품 재질
  //
  // [왜 따로 두는가 - "잡히는데 안 밀림"의 진짜 원인]
  // cannon-es의 마찰 상한은 이름과 달리 "힘"이 아니라 "한 스텝 충격량"이다.
  // Narrowphase는 접촉점마다
  //     FrictionEquation.maxForce = μ * |g| * reducedMass
  // 를 넣는데, GSSolver는 이 값을 lambda(= 충격량)에 직접 clamp한다.
  // 즉 실제 마찰력 상한은 μ*|g|*m 이 아니라 그것을 dt로 나눈 값이다.
  //   20kg 냉장고 / μ=0.2 / dt=1/60  ->  0.2*18*20/(1/60) = 4320 N (접촉점당!)
  // 교과서 값(72N)의 60배다. 그래서 밀기 예산 400N으로는 꿈쩍도 하지 않았고,
  // μ를 0.04로 낮추든 0.6으로 올리든 결과가 완전히 똑같았다(실측). 어느 쪽이든
  // 상한이 필요량보다 훨씬 위라 clamp가 걸리지 않기 때문이다.
  //
  // 따라서 "실효 마찰계수 μ_eff를 원한다"면 넣어야 하는 값은
  //     μ = μ_eff * dt
  // 다. 아래 0.004는 μ_eff ≈ 0.24 (= 냉장고 기준 마찰 약 86N)를 노린 값이고,
  // 질량에 비례하므로 가벼운 소품은 그만큼 덜 끈다.
  //   냉장고: 밀기 400N - 마찰 86N -> 낑낑대며 밀림
  //   두 명이면 들기 예산 520N > 무게 360N -> 아예 들어서 옮김
  //
  // 이 보정을 전역 μ에 적용하지 않는 이유는, 지금의 "끈적한" 마찰이 손 안 댄
  // 소품이 제자리에 얌전히 있어 주는 근거이자 캐릭터가 발로 땅을 짚고 걷는
  // 근거이기 때문이다. 그래서 잡고 있는 동안에만 이 재질로 갈아 끼운다
  // (main.ts tryGrab/releaseGrabsOf). 사람이 무거운 물건을 붙잡고 흔들며 미는
  // 상황과도 맞는 모델이다.
  physics.addContactMaterial(
    new CANNON.ContactMaterial(groundMat, heldMat, { friction: 0.004, restitution: 0.05 })
  );
  physics.addContactMaterial(
    new CANNON.ContactMaterial(playerMat, heldMat, { friction: 0.3, restitution: 0.05 })
  );
  physics.addContactMaterial(
    new CANNON.ContactMaterial(propMat, heldMat, { friction: 0.2, restitution: 0.05 })
  );

  // ---- 공
  //
  // 마찰을 넉넉히 준다. cannon-es의 마찰 상한은 사실상 μ*|g|*m/dt 라서(heldMat
  // 주석 참고) 이 정도면 "미끄러지지 않고 구른다"에 해당한다 - 공한테는 그게
  // 정확히 원하는 거동이다. 반발은 통통 튀되 농구공처럼 되지는 않을 만큼만.
  physics.addContactMaterial(
    new CANNON.ContactMaterial(groundMat, ballMat, { friction: 0.32, restitution: 0.45 })
  );
  // 발로 차는 느낌. 캐릭터와의 반발을 조금 주면 툭 튀어나가는 맛이 산다.
  physics.addContactMaterial(
    new CANNON.ContactMaterial(playerMat, ballMat, { friction: 0.28, restitution: 0.35 })
  );
  physics.addContactMaterial(
    new CANNON.ContactMaterial(propMat, ballMat, { friction: 0.25, restitution: 0.45 })
  );

  // ---------------------------------------------------------- 바닥
  const floorTex = makeFloorTexture();
  floorTex.anisotropy = renderer.capabilities.getMaxAnisotropy();
  const groundMesh = new THREE.Mesh(
    new THREE.PlaneGeometry(30, 30),
    new THREE.MeshStandardMaterial({ map: floorTex, roughness: 0.72, metalness: 0.02 })
  );
  groundMesh.rotation.x = -Math.PI / 2;
  groundMesh.receiveShadow = true;
  scene.add(groundMesh);

  // 맵 바깥으로 이어지는 넓은 바닥. 없으면 방이 허공에 뜬 상자처럼 보인다.
  // 색은 맵 테마를 따라간다 (집=잔디, 창고=콘크리트, 옥상=도시 안개).
  const outside = new THREE.Mesh(
    new THREE.PlaneGeometry(190, 190),
    new THREE.MeshStandardMaterial({ color: 0x7ec06a, roughness: 0.95, metalness: 0 })
  );
  outside.rotation.x = -Math.PI / 2;
  outside.position.y = -0.08;
  scene.add(outside);

  const groundBody = new CANNON.Body({
    type: CANNON.Body.STATIC,
    shape: new CANNON.Plane(),
    material: groundMat,
  });
  groundBody.quaternion.setFromEuler(-Math.PI / 2, 0, 0);
  physics.addBody(groundBody);

  // ---------------------------------------------------------- 맵 슬롯
  //
  // 맵 하나가 씬/물리에 얹는 것은 두 종류다.
  //   1) 정적 지형·가구 : mapRoot(메시) + mapBodies(정적 바디)
  //   2) 동적 소품      : objects[] (메시 Group + 동적 바디)
  // loadMap()이 갈아끼울 때 이 둘을 전부 떼어낸다.
  //
  // [objects/objectById를 새로 만들지 않는 이유]
  // main.ts가 `const { objects, objectById } = world` 로 참조를 붙들고 있다.
  // 배열을 갈아치우면 그 참조가 옛 맵을 가리킨 채 남는다. 그래서 항상 같은
  // 배열/맵을 제자리에서 비우고 다시 채운다.
  const objects: PhysObject[] = [];
  const objectById = new Map<number, PhysObject>();

  let mapRoot: THREE.Group | null = null;
  let mapBodies: CANNON.Body[] = [];
  let mapIndex = 0;
  const mapListeners: (() => void)[] = [];

  /**
   * 잡을 수 있는(= 네트워크로 동기화되는) 소품.
   *
   * [제약] main.ts의 grabPivotOn()이 shapes[0]을 CANNON.Box로 단정하고
   * halfExtents를 읽는다. 그래서 동적 소품의 첫 shape는 반드시 Box여야 한다.
   * 모양 변화는 물리가 아니라 mesh 쪽 자식으로 붙인다.
   */
  const addProp: AddProp = (id, size, pos, color, mass, grabRadius, decorate, matOpts = { rough: 0.45 }) => {
    const g = new THREE.Group();
    const main = new THREE.Mesh(boxGeo(size[0], size[1], size[2]), toyMat(color, matOpts));
    main.castShadow = true;
    main.receiveShadow = true;
    g.add(main);
    decorate?.(g);
    g.position.set(pos[0], pos[1], pos[2]);
    scene.add(g);

    const body = new CANNON.Body({
      mass,
      shape: new CANNON.Box(new CANNON.Vec3(size[0] / 2, size[1] / 2, size[2] / 2)),
      position: new CANNON.Vec3(pos[0], pos[1], pos[2]),
      material: propMat,
    });
    body.angularDamping = 0.2;
    body.linearDamping = 0.02;
    physics.addBody(body);

    const obj: PhysObject = { id, mesh: g, body, grabRadius, mass };
    objects.push(obj);
    objectById.set(id, obj);
  };

  /**
   * 굴러가는 공.
   *
   * addProp과 다른 점은 물리 shape가 Sphere라는 것과, 구름에 맞춘 재질/감쇠를
   * 쓴다는 것뿐이다. objects/objectById에는 똑같이 들어가므로 grab도 네트워크
   * 동기화도 소품과 동일하게 동작한다.
   */
  const addBall: AddBall = (id, radius, pos, opts = {}) => {
    const { mass = 1.1, color = 0xffffff, patch = 0x2b2f38 } = opts;

    const g = new THREE.Group();
    const main = new THREE.Mesh(sphGeo(radius, 28), toyMat(color, { rough: 0.38 }));
    main.castShadow = true;
    main.receiveShadow = true;
    g.add(main);

    // 축구공 무늬. 표면에 살짝 파묻은 납작한 구 몇 개면 충분히 "공"으로 읽히고,
    // 굴러갈 때 회전이 눈에 보인다 (단색 구는 굴러도 멈춘 것처럼 보인다).
    const dirs: V3[] = [
      [0, 1, 0], [0, -1, 0], [1, 0.3, 0.5], [-1, 0.3, -0.5],
      [0.5, -0.3, -1], [-0.5, -0.3, 1], [0.8, 0.2, -0.8], [-0.8, 0.2, 0.8],
    ];
    for (const d of dirs) {
      const len = Math.hypot(d[0], d[1], d[2]);
      const dot = new THREE.Mesh(sphGeo(radius * 0.34, 14), toyMat(patch, { rough: 0.4 }));
      dot.position.set(
        (d[0] / len) * radius * 0.86,
        (d[1] / len) * radius * 0.86,
        (d[2] / len) * radius * 0.86
      );
      dot.scale.set(1, 1, 1);
      g.add(dot);
    }

    g.position.set(pos[0], pos[1], pos[2]);
    scene.add(g);

    const body = new CANNON.Body({
      mass,
      shape: new CANNON.Sphere(radius),
      position: new CANNON.Vec3(pos[0], pos[1], pos[2]),
      material: ballMat,
    });
    // 구르는 물체라 감쇠가 소품과 다르다. 각감쇠를 소품값(0.2)으로 두면
    // 몇 미터 못 가 회전이 죽어서 미끄러지듯 멈춘다.
    // 0.22에서는 놓친 공이 1.7 m/s로 사실상 영원히 굴러가서
    // (실측: 30스텝 동안 1.74 -> 1.71) 한 번 놓치면 따라잡을 수가 없었다.
    // 조금 올리면 놓친 공이 스스로 잦아들어 "다시 따라잡는" 플레이가 된다.
    //
    // [0.35 -> 0.65] 굴러가는 공은 바닥 마찰이 회전과 속도를 묶어두기 때문에
    // 실효 감속은 사실상 이 각감쇠가 정한다. 브라우저 실측으로 감쇠계수를 재
    // 총 주행거리(= v0/k)를 뽑으면:
    //     0.35 -> 33.4m   0.50 -> 21.1m   0.65 -> 14.3m   0.80 -> 9.3m
    // 0.35은 봇에게 한 번 걷어차인 공이 40m 넘게 굴러 출발선 뒤까지 가버려서
    // (실측: 코스를 달리다 뺏기니 공이 z -23 에서 +17로 갔다) 되찾는 게
    // 플레이가 아니라 벌칙이었다. 0.65면 놓친 공(6 m/s)이 14m에서 멈춰
    // 3초쯤 달리면 따라잡히고, 강한 킥(10.5 m/s)은 여전히 25m를 날아간다.
    // 드리블은 터치 간격이 0.1초뿐이라 영향이 거의 없다
    // (실측: 발 앞 간격 1.0~1.3m, 각속도 15 rad/s = 미끄러짐 없이 구름).
    body.angularDamping = 0.65;
    body.linearDamping = 0.012;
    physics.addBody(body);

    const obj: PhysObject = { id, mesh: g, body, grabRadius: radius + 1.6, grabReach: 1.5, mass };
    objects.push(obj);
    objectById.set(id, obj);
  };

  const hazardSpecs: HazardSpec[] = [];

  /**
   * 낙하 장애물.
   *
   * 물리적으로는 무거운 공일 뿐이라 addBall과 거의 같다. 다른 점은
   *  - 잡을 수 없다 (grabbable: false)
   *  - hazardSpecs에 낙하 지점으로 등록된다
   * 맵을 만들 때 station마다 하나씩 미리 만들어 두고 재활용하므로, 기존
   * objects 스냅샷에 그대로 실려서 멀티 동기화가 공짜로 된다 (hazards.ts 주석).
   */
  const addHazard: AddHazard = (id, z, phase) => {
    const g = new THREE.Group();
    const main = new THREE.Mesh(sphGeo(HZ.radius, 24), toyMat(0xff5d73, { rough: 0.35 }));
    main.castShadow = true;
    main.receiveShadow = true;
    g.add(main);
    // 줄무늬 - 굴러갈 때 회전이 보이고, 멀리서도 "위험한 것"으로 읽힌다
    for (const [dy, r] of [[0.55, 0.62], [-0.55, 0.62], [0, 0.9]] as [number, number][]) {
      const band = new THREE.Mesh(sphGeo(HZ.radius * r, 18), toyMat(0xffd166, { rough: 0.4 }));
      band.position.y = HZ.radius * dy;
      band.scale.set(1, 0.42, 1);
      g.add(band);
    }
    g.position.set(0, HZ.hoverY, z);
    scene.add(g);

    const body = new CANNON.Body({
      mass: HZ.mass,
      shape: new CANNON.Sphere(HZ.radius),
      position: new CANNON.Vec3(0, HZ.hoverY, z),
      material: propMat,
    });
    body.angularDamping = 0.35;
    body.linearDamping = 0.008;
    physics.addBody(body);

    const obj: PhysObject = { id, mesh: g, body, grabRadius: 0, grabbable: false, mass: HZ.mass };
    objects.push(obj);
    objectById.set(id, obj);
    hazardSpecs.push({ id, z, phase });
  };

  const obstacleSpecs: ObstacleSpec[] = [];

  /**
   * 코스 장애물 (회전봉 / 피스톤 / 굴러오는 거대 공).
   *
   * 회전봉과 피스톤은 KINEMATIC이다. 질량이 무한대처럼 취급되므로 부딪힌
   * 쪽만 밀려나고, 속도를 넣어주면 그 속도로 움직이면서 물체를 실제로 민다
   * (위치를 매 스텝 직접 대입하면 접촉이 파고들었다가 튀어나온다).
   * 거대 공만 DYNAMIC이라 지형을 타고 실제로 굴러간다.
   *
   * 낙하 장애물과 마찬가지로 맵을 만들 때 미리 만들어 두고 재활용하므로
   * 기존 objects 스냅샷으로 멀티 동기화가 공짜로 된다.
   */
  const addObstacle: AddObstacle = (id, kind, z, arg, phase, opts) => {
    const g = new THREE.Group();
    let body: CANNON.Body;

    if (kind === "roller") {
      const main = new THREE.Mesh(sphGeo(OB.rollR, 26), toyMat(0xff8a3d, { rough: 0.4 }));
      main.castShadow = true; main.receiveShadow = true;
      g.add(main);
      for (const dy of [0.5, -0.5]) {
        const band = new THREE.Mesh(sphGeo(OB.rollR * 0.72, 20), toyMat(0x2b2f45, { rough: 0.5 }));
        band.position.y = OB.rollR * dy;
        band.scale.set(1, 0.34, 1);
        g.add(band);
      }
      body = new CANNON.Body({
        mass: OB.rollMass,
        shape: new CANNON.Sphere(OB.rollR),
        position: new CANNON.Vec3(0, OB.rollParkY, z),
        material: propMat,
      });
      body.angularDamping = 0.05;
      body.linearDamping = 0.005;
    } else if (kind === "spinner") {
      // 봉 + 가운데 기둥 (기둥은 그림용 - 물리는 봉만)
      const bar = new THREE.Mesh(boxGeo(arg * 2, OB.spinThick, OB.spinThick), toyMat(0xffd166, { rough: 0.35 }));
      bar.castShadow = true; bar.receiveShadow = true;
      g.add(bar);
      for (const sx of [-1, 1]) {
        const tip = new THREE.Mesh(boxGeo(OB.spinThick * 1.6, OB.spinThick * 1.6, OB.spinThick * 1.6),
          toyMat(0xff5d73, { rough: 0.35 }));
        tip.position.x = sx * arg;
        g.add(tip);
      }
      body = new CANNON.Body({
        mass: 0,
        type: CANNON.Body.KINEMATIC,
        shape: new CANNON.Box(new CANNON.Vec3(arg, OB.spinThick * 0.5, OB.spinThick * 0.5)),
        position: new CANNON.Vec3(0, OB.spinY, z),
        material: propMat,
      });
    } else if (kind === "sweeper") {
      // 레인을 가로질러 오가는 봉. 진행 방향(빨강 화살표 줄무늬)을 넣어
      // 멀리서도 "움직이는 것"으로 읽히게 한다.
      const main = new THREE.Mesh(boxGeo(OB.sweepW, OB.sweepH, OB.sweepD), toyMat(0x30d6a0, { rough: 0.4 }));
      main.castShadow = true; main.receiveShadow = true;
      g.add(main);
      for (const sx of [-1, 1]) {
        const cap = new THREE.Mesh(boxGeo(0.28, OB.sweepH * 1.06, OB.sweepD * 1.06), toyMat(0xffd166, { rough: 0.35 }));
        cap.position.x = sx * OB.sweepW * 0.5;
        g.add(cap);
      }
      body = new CANNON.Body({
        mass: 0, type: CANNON.Body.KINEMATIC,
        shape: new CANNON.Box(new CANNON.Vec3(OB.sweepW * 0.5, OB.sweepH * 0.5, OB.sweepD * 0.5)),
        position: new CANNON.Vec3(0, OB.sweepH * 0.5, z),
        material: propMat,
      });
    } else if (kind === "popup") {
      // 바닥에서 솟는 벽. 윗면에 경고색 띠를 둘러서 올라올 자리가 보이게 한다.
      const main = new THREE.Mesh(boxGeo(OB.popW, OB.popH, OB.popD), toyMat(0xff5d73, { rough: 0.42 }));
      main.castShadow = true; main.receiveShadow = true;
      g.add(main);
      const top = new THREE.Mesh(boxGeo(OB.popW * 1.02, 0.18, OB.popD * 1.06), toyMat(0xffd166, { rough: 0.35 }));
      top.position.y = OB.popH * 0.5 - 0.09;
      g.add(top);
      body = new CANNON.Body({
        mass: 0, type: CANNON.Body.KINEMATIC,
        shape: new CANNON.Box(new CANNON.Vec3(OB.popW * 0.5, OB.popH * 0.5, OB.popD * 0.5)),
        position: new CANNON.Vec3(0, -OB.popH, z),
        material: propMat,
      });
    } else if (kind === "coopgate") {
      // 협동 게이트. "둘이 패스해야 열린다"가 한눈에 읽히도록 다른 장애물과
      // 확실히 다른 색(청록 + 노란 빗금)으로 세운다.
      const main = new THREE.Mesh(boxGeo(OB.gateW, OB.gateH, OB.gateD), toyMat(0x1fb6a8, { rough: 0.4 }));
      main.castShadow = true; main.receiveShadow = true;
      g.add(main);
      for (let i = 0; i < 4; i++) {
        const bar = new THREE.Mesh(boxGeo(OB.gateW * 1.02, 0.2, OB.gateD * 1.06),
          toyMat(0xffd166, { rough: 0.35 }));
        bar.position.y = -OB.gateH * 0.35 + i * (OB.gateH * 0.23);
        g.add(bar);
      }
      body = new CANNON.Body({
        mass: 0, type: CANNON.Body.KINEMATIC,
        shape: new CANNON.Box(new CANNON.Vec3(OB.gateW * 0.5, OB.gateH * 0.5, OB.gateD * 0.5)),
        position: new CANNON.Vec3(0, OB.gateH * 0.5, z),
        material: propMat,
      });
    } else if (kind === "buttongate") {
      // 버튼 문. coopgate와 형태는 같게 두되 색을 보라로 바꿔 "여는 방법이
      // 다른 문"임을 구분시킨다 (청록 = 패스로, 보라 = 발판으로).
      const main = new THREE.Mesh(boxGeo(OB.gateW, OB.gateH, OB.gateD), toyMat(0x8b5cf6, { rough: 0.4 }));
      main.castShadow = true; main.receiveShadow = true;
      g.add(main);
      for (let i = 0; i < 4; i++) {
        const bar = new THREE.Mesh(boxGeo(OB.gateW * 1.02, 0.2, OB.gateD * 1.06),
          toyMat(0xffd166, { rough: 0.35 }));
        bar.position.y = -OB.gateH * 0.35 + i * (OB.gateH * 0.23);
        g.add(bar);
      }
      body = new CANNON.Body({
        mass: 0, type: CANNON.Body.KINEMATIC,
        shape: new CANNON.Box(new CANNON.Vec3(OB.gateW * 0.5, OB.gateH * 0.5, OB.gateD * 0.5)),
        position: new CANNON.Vec3(0, OB.gateH * 0.5, z),
        material: propMat,
      });
    } else if (kind === "shutter") {
      // 셔터 한 장. 폭은 레인 반폭에서 가운데 틈을 뺀 만큼이다.
      const w = OB.shutterW;
      const main = new THREE.Mesh(boxGeo(w, OB.shutterH, OB.shutterD), toyMat(0x4f9dff, { rough: 0.4 }));
      main.castShadow = true; main.receiveShadow = true;
      g.add(main);
      // 안쪽 끝(통로 쪽)에 노란 띠 - 어디가 닫히는 면인지 보인다
      const edge = new THREE.Mesh(boxGeo(0.24, OB.shutterH * 1.04, OB.shutterD * 1.06), toyMat(0xffd166, { rough: 0.35 }));
      edge.position.x = -Math.sign(arg || 1) * w * 0.5;
      g.add(edge);
      body = new CANNON.Body({
        mass: 0, type: CANNON.Body.KINEMATIC,
        shape: new CANNON.Box(new CANNON.Vec3(w * 0.5, OB.shutterH * 0.5, OB.shutterD * 0.5)),
        position: new CANNON.Vec3(0, OB.shutterH * 0.5, z),
        material: propMat,
      });
    } else if (kind === "platform") {
      // 움직이는 발판. 크기는 맵이 params.w / params.len 으로 정한다.
      const pw = opts?.params?.w ?? OB.platW;
      const pl = opts?.params?.len ?? OB.platD;
      const top = new THREE.Mesh(boxGeo(pw, OB.platH, pl), toyMat(0x4dd2ff, { rough: 0.45 }));
      top.castShadow = true; top.receiveShadow = true;
      g.add(top);
      // 가장자리 노란 레일 - 멀리서도 "탈 수 있는 것"으로 읽힌다
      for (const sx of [-1, 1]) {
        const rail = new THREE.Mesh(boxGeo(0.18, OB.platH * 1.5, pl), toyMat(0xffd166, { rough: 0.4 }));
        rail.position.set(sx * (pw * 0.5 - 0.09), OB.platH * 0.2, 0);
        g.add(rail);
      }
      body = new CANNON.Body({
        mass: 0,
        type: CANNON.Body.KINEMATIC,
        shape: new CANNON.Box(new CANNON.Vec3(pw * 0.5, OB.platH * 0.5, pl * 0.5)),
        position: new CANNON.Vec3(opts?.x ?? 0, opts?.params?.y ?? OB.platY, z),
        material: propMat,
      });
    } else if (kind === "conveyor") {
      // 컨베이어. 진행 방향으로 줄무늬를 깔아 어느 쪽으로 미는지 보이게 한다.
      const cw = opts?.params?.w ?? OB.convW;
      const cl = opts?.params?.len ?? OB.convD;
      const cdir = (opts?.params?.dirZ ?? 1) >= 0 ? 1 : -1;
      const belt = new THREE.Mesh(boxGeo(cw, OB.convH, cl), toyMat(0x2b2f45, { rough: 0.7 }));
      belt.receiveShadow = true;
      g.add(belt);
      for (let k = -2; k <= 2; k++) {
        const chev = new THREE.Mesh(boxGeo(cw * 0.62, 0.06, 0.34), toyMat(0x30d6a0, { rough: 0.3 }));
        chev.position.set(0, OB.convH * 0.5 + 0.03, k * (cl / 5.5) + cdir * 0.2);
        g.add(chev);
      }
      body = new CANNON.Body({
        mass: 0,
        type: CANNON.Body.KINEMATIC,
        shape: new CANNON.Box(new CANNON.Vec3(cw * 0.5, OB.convH * 0.5, cl * 0.5)),
        position: new CANNON.Vec3(opts?.x ?? 0, OB.convY, z),
        material: propMat,
      });
    } else if (kind === "wind") {
      // 바람 영역 - 막지 않는다. 반투명 판으로 "여기 바람이 분다"만 알린다.
      const ww = opts?.params?.w ?? OB.windW;
      const wl = opts?.params?.len ?? OB.windD;
      const wdir = (opts?.params?.dirX ?? arg) >= 0 ? 1 : -1;
      for (let k = -1; k <= 1; k++) {
        const sheet = new THREE.Mesh(
          boxGeo(ww * 0.9, 0.06, wl * 0.8),
          toyMat(0x9fd0ff, { rough: 0.2, opacity: 0.22 }),
        );
        sheet.position.set(wdir * 0.4, OB.windH * (0.3 + k * 0.22), 0);
        sheet.rotation.z = wdir * 0.12;
        g.add(sheet);
      }
      body = new CANNON.Body({
        mass: 0,
        type: CANNON.Body.KINEMATIC,
        shape: new CANNON.Box(new CANNON.Vec3(ww * 0.5, OB.windH * 0.5, wl * 0.5)),
        position: new CANNON.Vec3(opts?.x ?? 0, OB.windH * 0.5, z),
        material: propMat,
      });
      body.collisionResponse = false;   // 밀기만 하고 막지는 않는다
    } else if (kind === "ballsocket") {
      // 공을 넣는 링. 공이 들어가야 하므로 충돌은 끄고 바닥 표시만 남긴다.
      const ring = new THREE.Mesh(cylGeo(OB.sockR, OB.sockR, 0.12, 22), toyMat(0xffd166, { rough: 0.35 }));
      g.add(ring);
      const hole = new THREE.Mesh(cylGeo(OB.sockR * 0.72, OB.sockR * 0.72, 0.16, 22), toyMat(0x1a1f2e, { rough: 0.8 }));
      hole.position.y = 0.03;
      g.add(hole);
      body = new CANNON.Body({
        mass: 0,
        type: CANNON.Body.KINEMATIC,
        shape: new CANNON.Cylinder(OB.sockR, OB.sockR, 0.12, 12),
        position: new CANNON.Vec3(opts?.x ?? 0, OB.sockY, z),
        material: propMat,
      });
      body.collisionResponse = false;
    } else if (kind === "lever") {
      // 밟는 바닥 판. 막지 않는다 - 걸려 넘어지면 스위치가 함정이 된다.
      const lw = opts?.params?.w ?? OB.leverW;
      const ll = opts?.params?.len ?? OB.leverD;
      const pad = new THREE.Mesh(boxGeo(lw, 0.1, ll), toyMat(0xffd166, { rough: 0.5 }));
      g.add(pad);
      const inner = new THREE.Mesh(boxGeo(lw * 0.72, 0.12, ll * 0.72), toyMat(0xff8a3d, { rough: 0.4 }));
      inner.position.y = 0.02;
      g.add(inner);
      body = new CANNON.Body({
        mass: 0,
        type: CANNON.Body.KINEMATIC,
        shape: new CANNON.Box(new CANNON.Vec3(lw * 0.5, 0.05, ll * 0.5)),
        position: new CANNON.Vec3(opts?.x ?? 0, OB.leverY, z),
        material: propMat,
      });
      body.collisionResponse = false;
    } else if (kind === "holdgate") {
      // 신호 문 - coopgate 와 같은 몸체를 쓰되 색을 달리해 구분한다.
      const gw = opts?.params?.w ?? OB.gateW;
      const gh = opts?.params?.h ?? OB.gateH;
      const main = new THREE.Mesh(boxGeo(gw, gh, OB.gateD), toyMat(0x8b5cf6, { rough: 0.4 }));
      main.castShadow = true; main.receiveShadow = true;
      g.add(main);
      for (let k = 0; k < 3; k++) {
        const bar = new THREE.Mesh(boxGeo(gw * 1.02, 0.2, OB.gateD * 1.06), toyMat(0xffd166, { rough: 0.35 }));
        bar.position.y = -gh * 0.35 + k * (gh * 0.23);
        g.add(bar);
      }
      body = new CANNON.Body({
        mass: 0,
        type: CANNON.Body.KINEMATIC,
        shape: new CANNON.Box(new CANNON.Vec3(gw * 0.5, gh * 0.5, OB.gateD * 0.5)),
        position: new CANNON.Vec3(opts?.x ?? 0, gh * 0.5, z),
        material: propMat,
      });
    } else if (kind === "press") {
      // 위에서 내려오는 판. 아랫면에 이빨을 달아 "찍는 물건"으로 읽히게 한다.
      const pw = opts?.params?.w ?? OB.pressW;
      const pl = opts?.params?.len ?? OB.pressD;
      const ph = opts?.params?.h ?? OB.pressH;
      const main = new THREE.Mesh(boxGeo(pw, ph, pl), toyMat(0xff5d73, { rough: 0.42 }));
      main.castShadow = true; main.receiveShadow = true;
      g.add(main);
      for (let k = -2; k <= 2; k++) {
        const tooth = new THREE.Mesh(boxGeo(pw * 0.14, 0.26, pl * 0.86), toyMat(0xffd166, { rough: 0.35 }));
        tooth.position.set(k * (pw / 5.2), -ph * 0.5 - 0.1, 0);
        g.add(tooth);
      }
      body = new CANNON.Body({
        mass: 0, type: CANNON.Body.KINEMATIC,
        shape: new CANNON.Box(new CANNON.Vec3(pw * 0.5, ph * 0.5, pl * 0.5)),
        position: new CANNON.Vec3(opts?.x ?? 0, (opts?.params?.topY ?? OB.pressTopY) + ph * 0.5, z),
        material: propMat,
      });
    } else if (kind === "pushblock") {
      // 둘이 밀어야 움직이는 문. 손자국(밀 자리)을 앞면에 크게 그려 둔다.
      const bw = opts?.params?.w ?? OB.pushW;
      const bh = opts?.params?.h ?? OB.pushH;
      const bl = opts?.params?.len ?? OB.pushD;
      const main = new THREE.Mesh(boxGeo(bw, bh, bl), toyMat(0x9a6b3f, { rough: 0.72 }));
      main.castShadow = true; main.receiveShadow = true;
      g.add(main);
      // 밀 자리 표시 두 개 — "여기 둘이 붙어라"가 형태로 보여야 한다
      for (const sx of [-1, 1]) {
        const grip = new THREE.Mesh(boxGeo(bw * 0.26, bh * 0.34, 0.16), toyMat(0xffd166, { rough: 0.4 }));
        grip.position.set(sx * bw * 0.24, 0, bl * 0.5 + 0.06);
        g.add(grip);
      }
      body = new CANNON.Body({
        mass: 0, type: CANNON.Body.KINEMATIC,
        shape: new CANNON.Box(new CANNON.Vec3(bw * 0.5, bh * 0.5, bl * 0.5)),
        position: new CANNON.Vec3(opts?.x ?? 0, bh * 0.5, z),
        material: propMat,
      });
    } else if (kind === "ice") {
      // 빙판. 막지 않는다 — 바닥 위에 얇게 덮인 판이다.
      const iw = opts?.params?.w ?? OB.iceW;
      const il = opts?.params?.len ?? OB.iceD;
      const sheet = new THREE.Mesh(boxGeo(iw, 0.04, il), toyMat(0xbfe9ff, { rough: 0.05, opacity: 0.75 }));
      sheet.receiveShadow = true;
      g.add(sheet);
      // 반짝이는 결 — 멀리서도 "여기 미끄럽다"로 읽히게
      for (let k = -2; k <= 2; k++) {
        const shine = new THREE.Mesh(boxGeo(iw * 0.7, 0.05, 0.22), toyMat(0xffffff, { rough: 0.02, opacity: 0.5 }));
        shine.position.set(k * 0.6, 0.03, k * (il / 6));
        shine.rotation.y = 0.3;
        g.add(shine);
      }
      body = new CANNON.Body({
        mass: 0, type: CANNON.Body.KINEMATIC,
        shape: new CANNON.Box(new CANNON.Vec3(iw * 0.5, 0.02, il * 0.5)),
        position: new CANNON.Vec3(opts?.x ?? 0, 0.02, z),
        material: propMat,
      });
      body.collisionResponse = false;   // 밀지도 막지도 않는다 - 판정용 구역이다
    } else if (kind === "bumper") {
      // 범퍼. 닿으면 튕긴다 - 실제로 막아야 하므로 충돌은 켜 둔다.
      const br = opts?.params?.r ?? OB.bumperR;
      const post = new THREE.Mesh(cylGeo(br, br * 0.86, OB.bumperH, 20), toyMat(0xff4fa3, { rough: 0.3 }));
      post.castShadow = true; post.receiveShadow = true;
      g.add(post);
      const cap = new THREE.Mesh(cylGeo(br * 1.06, br * 1.06, 0.18, 20), toyMat(0xffd166, { rough: 0.25 }));
      cap.position.y = OB.bumperH * 0.5;
      g.add(cap);
      body = new CANNON.Body({
        mass: 0, type: CANNON.Body.KINEMATIC,
        shape: new CANNON.Cylinder(br, br, OB.bumperH, 12),
        position: new CANNON.Vec3(opts?.x ?? 0, OB.bumperH * 0.5, z),
        material: propMat,
      });
    } else if (kind === "jumppad") {
      // 점프 패드. 밟는 판이라 막지 않는다 (lever 와 같은 이유).
      const jr = opts?.params?.r ?? OB.jumppadR;
      const pad = new THREE.Mesh(cylGeo(jr, jr, 0.12, 24), toyMat(0x30d6a0, { rough: 0.35 }));
      g.add(pad);
      const inner = new THREE.Mesh(cylGeo(jr * 0.62, jr * 0.62, 0.16, 24), toyMat(0xffd166, { rough: 0.3 }));
      inner.position.y = 0.03;
      g.add(inner);
      // 위로 쏜다는 표시 — 얇은 기둥 셋
      for (let k = 0; k < 3; k++) {
        const arrow = new THREE.Mesh(boxGeo(jr * 0.5 - k * 0.18, 0.07, 0.16), toyMat(0xffffff, { rough: 0.3, opacity: 0.6 }));
        arrow.position.y = 0.35 + k * 0.3;
        g.add(arrow);
      }
      body = new CANNON.Body({
        mass: 0, type: CANNON.Body.KINEMATIC,
        shape: new CANNON.Cylinder(jr, jr, 0.12, 12),
        position: new CANNON.Vec3(opts?.x ?? 0, 0.06, z),
        material: propMat,
      });
      body.collisionResponse = false;
    } else {
      const main = new THREE.Mesh(boxGeo(OB.pistonW, OB.pistonH, OB.pistonD), toyMat(0x7c5cff, { rough: 0.4 }));
      main.castShadow = true; main.receiveShadow = true;
      g.add(main);
      const stripe = new THREE.Mesh(boxGeo(OB.pistonW * 1.02, 0.22, OB.pistonD * 1.02), toyMat(0xffd166, { rough: 0.4 }));
      stripe.position.y = OB.pistonH * 0.22;
      g.add(stripe);
      body = new CANNON.Body({
        mass: 0,
        type: CANNON.Body.KINEMATIC,
        shape: new CANNON.Box(new CANNON.Vec3(OB.pistonW * 0.5, OB.pistonH * 0.5, OB.pistonD * 0.5)),
        position: new CANNON.Vec3(0, OB.pistonH * 0.5, z),
        material: propMat,
      });
    }

    scene.add(g);
    physics.addBody(body);
    const obj: PhysObject = { id, mesh: g, body, grabRadius: 0, grabbable: false, mass: body.mass };
    objects.push(obj);
    objectById.set(id, obj);
    obstacleSpecs.push({ id, kind, z, arg, phase, x: opts?.x, params: opts?.params, link: opts?.link });
  };

  /**
   * 현재 맵을 씬과 물리 월드에서 완전히 떼어낸다.
   *
   * [지오메트리/머티리얼은 dispose 하지 않는다]
   * mapkit의 boxGeo/cylGeo/sphGeo/toyMat은 전부 캐시를 거친다. 같은 크기의
   * 상자는 맵이 바뀌어도 같은 BufferGeometry를 공유하므로, 여기서 dispose 하면
   * 다음 맵이 이미 해제된 GPU 버퍼를 참조하게 된다(빈 화면/경고).
   * 캐시는 크기 종류 수만큼만 늘고 계속 재사용되므로 누수도 아니다.
   * 씬 그래프와 물리 월드에서 빼는 것으로 충분하다.
   */
  function unloadMap() {
    for (const body of mapBodies) physics.removeBody(body);
    mapBodies = [];
    if (mapRoot) {
      scene.remove(mapRoot);
      mapRoot.clear();
      mapRoot = null;
    }
    for (const o of objects) {
      physics.removeBody(o.body);
      scene.remove(o.mesh);
      (o.mesh as THREE.Group).clear();
    }
    objects.length = 0;
    objectById.clear();
    hazardSpecs.length = 0;
    obstacleSpecs.length = 0;
  }

  /** 맵을 갈아끼운다. 범위를 벗어난 인덱스는 clamp 한다. */
  function loadMap(index: number) {
    unloadMap();
    mapIndex = Math.max(0, Math.min(MAPS.length - 1, index));
    const def = MAPS[mapIndex];

    mapRoot = new THREE.Group();
    scene.add(mapRoot);
    mapBodies = [];
    const b: Build = { physics, mat: groundMat, root: mapRoot, bodies: mapBodies };
    def.build({ b, addProp, addBall, addHazard, addObstacle });

    // 바닥과 바깥 배경은 맵 테마를 따라간다 (물리 지면은 무한 평면이라 그대로)
    groundMesh.scale.set(def.floor.size / 30, def.floor.size / 30, 1);
    (groundMesh.material as THREE.MeshStandardMaterial).color.setHex(def.floor.color);
    (outside.material as THREE.MeshStandardMaterial).color.setHex(def.floor.outside);
    // 하늘 위 코스는 바닥판/배경판을 감춘다 - 코스 자체가 바닥이고,
    // 그 바깥은 하늘이라야 "떠 있다"가 읽힌다.
    // (물리 지면 groundBody는 그대로 둔다. 2단계에는 리스폰이 없어서,
    //  경계를 넘어간 물체가 무한히 떨어지면 되돌릴 방법이 없기 때문이다)
    groundMesh.visible = !def.floor.hideFloor;
    // 무한 지면을 뺄지 말지. 빼면 코스 밖은 진짜 허공이 되고, 떨어진 것은
    // main.ts의 checkFalls가 리스폰시킨다.
    const wantGround = !def.floor.noGround;
    const hasGround = physics.bodies.includes(groundBody);
    if (wantGround && !hasGround) physics.addBody(groundBody);
    if (!wantGround && hasGround) physics.removeBody(groundBody);
    outside.visible = !def.floor.hideOutside;

    const f = def.fog ?? [0xd9ecff, 45, 130];
    fog.color.setHex(f[0]);
    fog.near = f[1];
    fog.far = f[2];

    for (const fn of mapListeners) fn();
  }

  loadMap(0);

  // ---------------------------------------------------------- 리사이즈
  window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  const world: World = {
    scene,
    camera,
    renderer,
    physics,
    objects,
    objectById,
    groundBody,
    materials: { ground: groundMat, player: playerMat, prop: propMat, held: heldMat, ball: ballMat },
    sun,
    get mapIndex() { return mapIndex; },
    get map() { return MAPS[mapIndex]; },
    mapCount: MAPS.length,
    loadMap,
    onMapLoaded(fn: () => void) { mapListeners.push(fn); },
    hazardSpecs,
    obstacleSpecs,
  };
  // 콘솔에서 드로우콜/그림자 비용을 바로 재보려고 노출해 둔다.
  (window as unknown as { __world: World }).__world = world;
  return world;
}
