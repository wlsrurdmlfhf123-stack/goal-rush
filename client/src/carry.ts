import * as CANNON from "cannon-es";
import { P, type Ragdoll } from "./ragdoll";
import { halfDepthAlong, halfHeight } from "./shapes";

/** 한 물체를 잡고 있는 캐릭터 한 명 */
export interface Holder {
  rag: Ragdoll;
  /** 잡은 뒤 경과 시간 (힘 ramp-in용) */
  ramp: number;
}

/**
 * 들고 있는 물체에 캐릭터가 내는 힘을 적용한다.
 *
 * [핵심] "들기(수직)" 예산과 "밀기(수평)" 예산을 완전히 분리한다.
 *
 * 예전에는 중력 보상(mass*g)까지 포함한 힘 벡터 하나를 통째로 carryStrength(300N)
 * 으로 clamp했다. 그런데 냉장고(28kg)는 자기 무게만 504N이라 예산을 이미 넘겨서,
 * clamp가 벡터 전체를 0.6배로 줄여버렸다. 그 결과 남는 힘의 대부분이 수직 성분이
 * 되고 수평(밀기) 성분은 100N 남짓으로 쪼그라들어 바닥 마찰(약 200N)조차 이기지
 * 못했다 = "잡히긴 하는데 전혀 안 밀림".
 *
 * 이제는
 *   - 수직: 중력 보상 + PD 를 liftStrength로 제한. 가벼우면 완전히 들리고,
 *     무거우면 "부분적으로 가벼워질" 뿐이라 바닥에 남는다(= 무게감).
 *     동시에 접지 하중이 줄어 마찰도 같이 줄어든다 -> 밀기가 가능해진다.
 *   - 수평: 중력과 무관하게 pushStrength 전액을 밀기에 쓴다.
 *
 * 잡은 사람이 여러 명이면 예산이 사람 수만큼 더해진다. 그래서 무거운 물체는
 * 혼자서는 겨우 끌고, 둘이 붙으면 제대로 옮길 수 있다.
 */
export function applyCarryForce(
  physics: CANNON.World,
  body: CANNON.Body,
  holders: Holder[]
) {
  if (holders.length === 0) return;
  const gMag = Math.abs(physics.gravity.y);
  const weight = body.mass * gMag;

  // ---- 예산 합산 + 목표 지점 평균
  let liftBudget = 0, pushBudget = 0;
  let tx = 0, ty = 0, tz = 0;
  for (const h of holders) {
    const k = Math.min(1, h.ramp / P.carryRamp);
    liftBudget += P.carryLiftStrength * k;
    pushBudget += P.carryPushStrength * k;

    const fwd = new CANNON.Vec3(0, 0, 1);
    h.rag.torso.quaternion.vmult(fwd, fwd);
    const fLen = Math.hypot(fwd.x, fwd.z) || 1;
    const fx = fwd.x / fLen, fz = fwd.z / fLen;

    // [중요] 목표 거리에 물체의 "앞뒤 반두께"를 더해야 한다.
    // 예전엔 물체 중심을 가슴 앞 0.55m 고정 지점으로 끌어당겼는데, 냉장고는
    // 깊이가 1.0m라 중심이 그렇게 가까이 올 수가 없다(몸을 뚫어야 함).
    // 그래서 PD가 항상 "뒤로" 최대 출력(-190N)을 내며 캐릭터가 앞으로 가려는
    // 걸 정면으로 상쇄했고, 결국 둘이 맞물려 제자리에 굳었다
    // (실측: carryF=(0,260,-190)로 포화된 채 boxZ가 0.24m에서 멈춤).
    // 물체의 앞면이 가슴에서 carryDist만큼 떨어지도록 목표를 잡는다.
    tx += h.rag.torso.position.x + fx * (P.carryDist + halfDepthAlong(body, fx, fz));
    ty += h.rag.torso.position.y + P.carryHeight;
    tz += h.rag.torso.position.z + fz * (P.carryDist + halfDepthAlong(body, fx, fz));
  }
  const n = holders.length;
  tx /= n; ty /= n; tz /= n;

  // ---- 수직
  // 들 수 있는 물체와 못 드는 물체를 구분한다.
  //  - 들 수 있으면: 가슴 높이로 위치 PD (가벼운 상자를 번쩍 드는 그림)
  //  - 못 들면: 위치 제어를 아예 하지 않고 "부분적으로 가볍게"만 만든다.
  //    못 드는 물체까지 가슴 높이로 끌어올리려 들면, 무게중심보다 위를 향한
  //    힘이 계속 걸려서 키 큰 냉장고(2.2m)가 앞으로 넘어가 버린다
  //    (실측: boxTilt 1.00 -> 0.00으로 완전히 자빠짐).
  //    가볍게만 해주면 접지 하중이 줄어 마찰이 작아지므로 밀기는 가능해진다.
  // 못 드는 물체에 위쪽 힘을 조금이라도 걸면, 그 힘이 팔(제약)을 타고 올라와
  // 캐릭터를 자기 팔로 땅에서 들어올린다. 그러면 접지를 잃어 다리 힘을 못 쓰고,
  // 결국 물체에 매달린 꼴이 되어 아무것도 못 민다
  // (실측: pelvisY 0.86 -> 1.04에서 고착, 냉장고는 0.44m만 밀리고 정지).
  // 그래서 못 드는 물체에는 수직 힘을 아예 걸지 않는다. 대신 수평 예산만으로
  // 바닥 마찰을 이겨야 하고, 그 마찰이 "혼자/둘이"를 가르는 기준이 된다.
  const liftable = weight <= liftBudget;
  let fy = 0;
  if (liftable) {
    fy = weight
      + (ty - body.position.y) * P.carryKp * body.mass
      - body.velocity.y * P.carryKd * body.mass;
    fy = Math.max(-liftBudget, Math.min(liftBudget, fy));
  }

  // ---- 수평: 중력에 잠식당하지 않는 독립 예산
  let fx: number, fz: number;
  if (liftable) {
    // 들고 있는 물체는 "가슴 앞 지점"으로 위치 제어 (정확히 따라옴)
    fx = (tx - body.position.x) * P.carryKp * body.mass - body.velocity.x * P.carryKd * body.mass;
    fz = (tz - body.position.z) * P.carryKp * body.mass - body.velocity.z * P.carryKd * body.mass;
  } else {
    // 못 드는 물체는 "속도"로 민다.
    // 위치 PD로 밀면 물체가 목표 지점(가슴 앞 고정 오프셋)에 닿는 순간 힘이
    // 0으로 죽어버려서, 딱 그 거리(실측 0.17m)만 밀리고 멈춘다. 그 다음부터는
    // 캐릭터가 전진해야 다시 밀리는데 캐릭터는 물체에 막혀 못 간다 = 교착.
    // 그래서 밀기 모드에서는 "잡은 사람이 가려는 방향으로 물체도 그 속도가
    // 되게" 속도 추종을 한다. 미는 동안 힘이 죽지 않고 계속 유지된다.
    let ix = 0, iz = 0;
    for (const h of holders) { ix += h.rag.intentX; iz += h.rag.intentZ; }
    const il = Math.hypot(ix, iz);

    // 잡은 사람에게서 팔 길이보다 멀어진 만큼 되돌아오는 속도.
    // 방향에 무관하게 "손이 닿는 거리 안에 있어라"만 강제하므로, 앞으로 밀 때든
    // 뒤로 끌 때든 손이 표면에서 떨어지지 않는다.
    let cvx = 0, cvz = 0;
    for (const h of holders) {
      const dx = body.position.x - h.rag.torso.position.x;
      const dz = body.position.z - h.rag.torso.position.z;
      const dist = Math.hypot(dx, dz);
      if (dist < 1e-4) continue;
      const nx = dx / dist, nz = dz / dist;
      // 물체 중심까지의 "정상" 거리 = 몸통 앞 붙들 거리 + 그 방향 반두께
      const excess = dist - (P.pushHoldDist + halfDepthAlong(body, nx, nz));
      if (excess <= 0) continue;
      const v = Math.min(P.pushCatchMax, excess * P.pushCatchGain);
      cvx -= nx * v; cvz -= nz * v;   // 사람 쪽으로
    }
    cvx /= holders.length; cvz /= holders.length;

    if (il > 0.01) {
      const tvx = (ix / il) * P.maxSpeed * P.pushSpeedFactor + cvx;
      const tvz = (iz / il) * P.maxSpeed * P.pushSpeedFactor + cvz;
      fx = (tvx - body.velocity.x) * P.pushVelGain * body.mass;
      fz = (tvz - body.velocity.z) * P.pushVelGain * body.mass;
    } else if (cvx !== 0 || cvz !== 0) {
      // 입력이 없어도 너무 멀어졌으면 끌어당긴다 (놓기 직전 손이 떨어지는 것 방지)
      fx = (cvx - body.velocity.x) * P.pushVelGain * body.mass;
      fz = (cvz - body.velocity.z) * P.pushVelGain * body.mass;
    } else {
      // 입력이 없으면 물체를 세워둔다 (미끄러짐 제동)
      fx = -body.velocity.x * P.pushVelGain * body.mass * 0.5;
      fz = -body.velocity.z * P.pushVelGain * body.mass * 0.5;
    }
  }
  const hm = Math.hypot(fx, fz);
  if (hm > pushBudget) { const s = pushBudget / hm; fx *= s; fz *= s; }

  if (liftable) {
    // 들 수 있는 물체는 무게중심에 걸어 회전 없이 깔끔하게 따라오게 한다
    body.applyForce(new CANNON.Vec3(fx, fy, fz));
  } else {
    // 못 드는 물체는 "낮게" 민다.
    // 무게중심(냉장고는 1.1m)에 밀면 바닥 마찰과 짝힘을 이뤄 물체가 앞으로
    // 기울어 모서리로 서 버리고, 그러면 잡은 면이 들리면서 캐릭터까지 매달려
    // 올라간다(실측: boxTilt 1.00 -> 0.94, pelvisY 0.86 -> 1.04에서 고착).
    // 마찰이 걸리는 바닥 높이에 맞춰 밀면 짝힘이 사라져 그냥 미끄러진다.
    const rp = new CANNON.Vec3(0, -halfHeight(body) * P.pushLowRatio, 0);
    body.applyForce(new CANNON.Vec3(fx, 0, fz), rp);
  }

  // ---- 반작용을 잡은 사람에게 되돌려준다
  // 캐리 힘은 캐릭터의 근력에서 나오는 것이므로 반드시 반작용이 있어야 한다.
  // 이게 없으면 "허공에서 생긴 힘"이 되어, 못 드는 물체를 들어올리려는
  // 260N이 팔을 통해 캐릭터를 통째로 땅에서 들어올려 버린다
  // (실측: pelvisY가 0.86 -> 1.17로 떠서 grounded=false가 되고, 접지가 없으니
  //  이동력이 airForceRatio(0.22배)로 쪼그라들어 아예 못 밀게 됐다).
  //
  // 반작용을 골반에 걸면 물리적으로도 맞고 게임적으로도 좋다:
  //  - 무거운 걸 들수록 캐릭터가 땅을 더 강하게 밟는다 = 접지력 증가
  //  - 미는 반작용이 뒤로 걸리므로 다리 힘으로 버텨야 앞으로 나간다
  const per = 1 / holders.length;
  for (const h of holders) {
    h.rag.pelvis.applyForce(new CANNON.Vec3(-fx * per, -fy * per, -fz * per));

    // ---- 매달리기 방지 (anti-hang)
    // 무거워서 꿈쩍 않는 물체에 팔이 붙어 있으면, 캐릭터가 조금이라도 위로
    // 뜨는 순간 그 자세가 그대로 고정된다 - 사실상 냉장고에 턱걸이를 한 채
    // 공중에 매달리는 꼴이다. 접지를 잃으면 다리 힘(이동력)이 0.22배로
    // 쪼그라들어 결국 아무것도 못 민다(실측: pelvisY 0.86 -> 1.04에서 고착).
    // 게다가 매달린 체중이 물체를 캐릭터 쪽으로 기울여서 잡은 면이 더 들리는
    // 양의 되먹임까지 생긴다.
    // 그래서 "들 수 없는 물체를 잡고 있는 동안"에는 서 있어야 할 높이보다
    // 위로 뜨는 것을 적극적으로 눌러준다. 물건에 기대는 것이지 매달리는 게
    // 아니다. (들 수 있는 물체는 이런 문제가 없으므로 건드리지 않는다)
    if (!liftable) {
      const excess = h.rag.pelvis.position.y - P.rideHeight;
      if (excess > 0) {
        const down = Math.min(P.antiHangMax, excess * P.antiHangK)
          + Math.max(0, h.rag.pelvis.velocity.y) * P.antiHangDamp;
        h.rag.pelvis.applyForce(new CANNON.Vec3(0, -down, 0));
      }
    }
  }

  // ---- 잡고 있는 동안엔 물체가 자빠지지 않게 세워서 잡아준다
  // (사람이 물건을 붙잡고 균형을 잡아주는 것에 해당). 이게 없으면 키 큰 물체는
  // 미는 힘과 바닥 마찰이 만드는 짝힘 때문에 그냥 앞으로 넘어간다.
  //
  // [중요] 토크는 반드시 물체의 관성모멘트에 비례시킨다. 고정 N·m로 두면
  // 물체마다 각가속도가 수십 배씩 달라진다 - 실측으로 300 N·m는
  // 4kg 큐브(I≈0.43)에서 α=700 rad/s²라 상자가 폭발해 날아갔고(속도 108 m/s),
  // 28kg 냉장고(I≈13.6)에서는 오히려 모자라 그대로 자빠졌다.
  // 관성에 비례시키면 "각가속도"가 물체 크기와 무관하게 일정해진다.
  const up = new CANNON.Vec3(0, 1, 0);
  body.quaternion.vmult(up, up);
  const inertia = Math.max(body.inertia.x, body.inertia.z);
  const accel = P.carryUprightAccel * holders.length;
  const damp = P.carryUprightDampRate * holders.length;
  // cross(currentUp, worldUp) = (-up.z, 0, up.x)
  body.torque.x += inertia * (-up.z * accel - body.angularVelocity.x * damp);
  body.torque.z += inertia * (up.x * accel - body.angularVelocity.z * damp);
}

/** 물체를 잡을 때 쓸 제약 최대 힘 */
export function holdForceFor(body: CANNON.Body, gMag: number): number {
  return Math.min(P.holdForceMax, Math.max(P.holdForceMin, body.mass * gMag * P.holdForceScale));
}
