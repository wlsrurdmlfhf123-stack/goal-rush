import * as CANNON from "cannon-es";

/**
 * 소품 모양(Box / Sphere)을 같이 다루기 위한 헬퍼.
 *
 * [왜 필요한가]
 * 지금까지 동적 소품은 전부 Box였고, grab/캐리/목표 마커 코드가 그걸 단정하고
 * `(body.shapes[0] as CANNON.Box).halfExtents` 를 그대로 읽었다. 축구공은
 * Sphere라 그 자리에서 halfExtents가 undefined가 되고, clamp 계산이 NaN을
 * 뱉어 손 제약과 캐리 힘을 통해 래그돌 전체로 번진다(= 사지가 날아간다).
 *
 * 그래서 "모양을 묻는" 일은 전부 이 파일을 거치게 한다.
 */

/** 축에 정렬된 반지름. Box면 halfExtents, Sphere면 (r, r, r) */
export function halfExtentsOf(body: CANNON.Body): CANNON.Vec3 {
  const shape = body.shapes[0];
  if (shape instanceof CANNON.Box) return shape.halfExtents;
  if (shape instanceof CANNON.Sphere) {
    const r = shape.radius;
    return new CANNON.Vec3(r, r, r);
  }
  // 그 밖의 모양은 bounding sphere로 근사한다 (마커 크기용이라 이 정도면 된다)
  const r = body.boundingRadius || 0.5;
  return new CANNON.Vec3(r, r, r);
}

/**
 * 월드 좌표 `world` 에서 가장 가까운 물체 표면 위의 점 - 물체 로컬 좌표로.
 *
 * grab이 손을 붙일 지점이다.
 *  - Box:    로컬 좌표로 옮긴 뒤 반지름 안으로 clamp (= 면/모서리 위의 점)
 *  - Sphere: 중심에서 그 방향으로 반지름만큼 (= 구 표면 위의 점)
 *
 * Box에서 clamp를 쓰면 손이 물체 안에 있을 때 그 자리가 그대로 나오는데,
 * 그건 의도된 동작이다(이미 파묻혀 있으면 더 끌어당길 필요가 없다).
 * 구에서는 중심에 정확히 겹치는 경우만 방향이 없으므로 그때만 위쪽을 쓴다.
 */
export function surfacePointLocal(body: CANNON.Body, world: CANNON.Vec3): CANNON.Vec3 {
  const local = body.quaternion.clone().conjugate().vmult(world.vsub(body.position));
  const shape = body.shapes[0];

  if (shape instanceof CANNON.Sphere) {
    const len = local.length();
    if (len < 1e-6) return new CANNON.Vec3(0, shape.radius, 0);
    return local.scale(shape.radius / len);
  }

  const h = halfExtentsOf(body);
  return new CANNON.Vec3(
    Math.max(-h.x, Math.min(h.x, local.x)),
    Math.max(-h.y, Math.min(h.y, local.y)),
    Math.max(-h.z, Math.min(h.z, local.z))
  );
}

/**
 * 수평 방향 (dx, dz)에 대한 "반두께".
 * Box는 OBB의 support 함수, Sphere는 방향과 무관하게 반지름.
 */
export function halfDepthAlong(body: CANNON.Body, dx: number, dz: number): number {
  const shape = body.shapes[0];
  if (shape instanceof CANNON.Sphere) return shape.radius;
  if (!(shape instanceof CANNON.Box)) return 0;

  const h = shape.halfExtents;
  let sum = 0;
  const axis = new CANNON.Vec3();
  for (const [ax, ext] of [
    [new CANNON.Vec3(1, 0, 0), h.x],
    [new CANNON.Vec3(0, 1, 0), h.y],
    [new CANNON.Vec3(0, 0, 1), h.z],
  ] as [CANNON.Vec3, number][]) {
    body.quaternion.vmult(ax, axis);
    sum += Math.abs(axis.x * dx + axis.z * dz) * ext;
  }
  return sum;
}

/** 월드 기준 수직 반높이 */
export function halfHeight(body: CANNON.Body): number {
  const shape = body.shapes[0];
  if (shape instanceof CANNON.Sphere) return shape.radius;
  if (!(shape instanceof CANNON.Box)) return 0;

  const h = shape.halfExtents;
  let sum = 0;
  const axis = new CANNON.Vec3();
  for (const [ax, ext] of [
    [new CANNON.Vec3(1, 0, 0), h.x],
    [new CANNON.Vec3(0, 1, 0), h.y],
    [new CANNON.Vec3(0, 0, 1), h.z],
  ] as [CANNON.Vec3, number][]) {
    body.quaternion.vmult(ax, axis);
    sum += Math.abs(axis.y) * ext;
  }
  return sum;
}
