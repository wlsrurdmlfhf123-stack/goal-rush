/**
 * 맵이 엔진과 주고받는 타입 — "맵은 무엇을 선언할 수 있는가"의 정의.
 *
 * [왜 파일을 나눴나] 예전에는 타입 / 코스 생성기 / 스테이지 3개 / 냉장고 시절
 * 레거시 맵이 `maps.ts` 한 파일(1300줄)에 같이 있었다. 스테이지를 10개로
 * 늘리면 그 파일만 3000줄이 넘고, 스테이지 하나를 손볼 때마다 코스 생성기와
 * 레거시 맵까지 같이 열어야 한다. 그래서
 *
 *   maps/types.ts    - 이 파일. 엔진과의 계약(타입 + id 규약)
 *   maps/course.ts   - Goal Rush 코스 생성기 (지형/난간/장식/골대)
 *   maps/gimmicks.ts - 기믹 선언 어휘 + 구현 여부 레지스트리
 *   maps/legacy.ts   - 냉장고 시절 맵 3개
 *   stages/stageNN-*.ts - 스테이지 한 개 = 파일 한 개
 *
 * 로 나눴다. `maps/index.ts`가 예전 `maps.ts`와 똑같은 것을 다시 내보내므로
 * world.ts / main.ts / game.ts의 `from "./maps"`는 하나도 바뀌지 않는다.
 */
import type * as THREE from "three";

import type { ObstacleKind } from "../obstacles";
import type { Build, MatOpts, V3 } from "../mapkit";

/** 무거운 소품(운반 목표) 기본 질량. "혼자면 겨우 밀고, 둘이면 들어서 옮긴다" 기준 */
export const PROP_HEAVY_MASS = 20;

/**
 * 축구공의 소품 id. 맵마다 하나씩 둔다.
 *
 * 다른 소품과 겹치지 않게 높은 번호를 쓴다 (기존 소품은 1~26).
 */
export const BALL_ID = 90;

/** 낙하 장애물 소품 id 시작값. station마다 하나씩 순서대로 쓴다 */
export const HAZARD_ID0 = 100;
/** 코스 장애물(회전봉/피스톤/거대 공) id 시작값 */
export const OBSTACLE_ID0 = 200;
/**
 * 스테이지가 직접 놓는 소품(둘이 밀어야 하는 상자 등) id 시작값.
 *
 * 낙하물(100~) / 장애물(200~)과 겹치지 않게 띄워 둔다. 소품 id는 네트워크
 * 스냅샷의 키라서 같은 맵 안에서 유일하기만 하면 되지만, 대역을 나눠 두면
 * 디버그 HUD에서 id만 보고 무엇인지 알 수 있다.
 */
export const STAGE_PROP_ID0 = 300;

/** 맵이 소품을 등록할 때 쓰는 함수 시그니처 (world.ts가 구현해서 넘겨준다) */
export type AddProp = (
  id: number,
  size: V3,
  pos: V3,
  color: number,
  mass: number,
  grabRadius: number,
  decorate?: (g: THREE.Group) => void,
  matOpts?: MatOpts,
) => void;

/**
 * 굴러가는 공을 등록한다.
 *
 * addProp은 첫 shape를 항상 Box로 만든다(grab/캐리 코드가 오래 그걸 단정해
 * 왔다). 공은 Sphere라야 굴러가므로 경로를 따로 둔다.
 */
export type AddBall = (
  id: number,
  radius: number,
  pos: V3,
  opts?: { mass?: number; color?: number; patch?: number },
) => void;

/**
 * 낙하 장애물 지점을 등록한다.
 * @param phase 첫 낙하까지의 대기 시간(초). station마다 다르게 줘서 한꺼번에 안 떨어지게 한다
 */
export type AddHazard = (id: number, z: number, phase: number) => void;

/**
 * 코스 장애물 등록.
 * @param kind spinner(회전봉) / piston(좌우 벽) / roller(굴러오는 거대 공)
 * @param arg  spinner: 봉 반길이 / piston: 나오는 쪽(-1 왼쪽, +1 오른쪽) / roller: 안 씀
 */
export type AddObstacle = (
  id: number, kind: ObstacleKind, z: number, arg: number, phase: number,
  /**
   * 값이 하나(arg)로 안 되는 기믹의 나머지 (obstacles.ts ObstacleSpec 참고).
   *   x      좌우 위치 (기본 0 = 레인 중앙)
   *   params axis/span/speed/w/len 처럼 값이 둘 이상 필요한 것들
   *   link   트리거와 문을 잇는 신호 채널 번호
   */
  opts?: { x?: number; params?: Record<string, number>; link?: number },
) => void;

export interface MapCtx {
  /** 정적 지형/가구 빌더 컨텍스트 */
  b: Build;
  /** 잡을 수 있는(= 네트워크 동기화되는) 동적 소품 등록 */
  addProp: AddProp;
  /** 굴러가는 공 등록 */
  addBall: AddBall;
  /** 낙하 장애물 지점 등록 */
  addHazard: AddHazard;
  /** 코스 장애물(회전봉/피스톤/거대 공) 등록 */
  addObstacle: AddObstacle;
}

export interface MapDef {
  id: string;
  /** 화면에 보여줄 이름 */
  name: string;
  /** 한 줄 설명 (로딩/성공 화면에 쓴다) */
  blurb: string;
  /** 제한시간(초). 뒤로 갈수록 빡빡해진다 */
  timeLimit: number;
  /** 운반해야 할 소품 id (그 맵의 addProp에 반드시 있어야 한다) */
  targetId: number;
  targetName: string;
  /** 도착 지점. 거리 표시에 쓰고, judge가 켜져 있으면 성공 판정에도 쓴다 */
  goal: {
    x: number; z: number; radius: number;
    /**
     * 골라인의 좌우 반폭. 공이 이 폭 안으로 z를 가로질러야 골이다.
     * 없으면 radius * 2.4로 잡는다 (game.ts checkCross 참고).
     */
    halfWidth?: number;
  };
  /**
   * 성공/실패를 판정할 것인가.
   *
   * Goal Rush 코스는 골대와 골 판정이 5단계 몫이라 아직 false다.
   * false면 game.ts가 출구 마커도, 타이머 카운트다운도, 결과 화면도 띄우지
   * 않고 거리 표시만 한다.
   */
  judge?: boolean;
  /**
   * 공만 지나가는 틈의 z 목록.
   *
   * 지오메트리는 build 안에서 만들지만, 런타임(main.ts)도 이 위치를 알아야
   * 한다 - "여기서 막힌 건 벽이 아니라 규칙이다"를 알려주고, 공이 틈 안에
   * 서 버렸을 때 빼내주기 위해서다. 그래서 좌표를 여기로 한 번 더 올린다.
   */
  ballSlots?: number[];
  /** 캐릭터 스폰 지점 (최대 4명) */
  spawns: [number, number][];
  /**
   * AI 봇 스폰 지점. 없으면 봇을 쓰지 않는 맵이다.
   * 코스 중간쯤에 두어야 출발하자마자 달려들지 않는다.
   */
  botSpawns?: [number, number][];
  /** 바닥 렌더 색/크기와 바깥 배경색 */
  floor: {
    size: number;
    color: number;
    outside: number;
    /** 바깥 배경 판을 감춘다 (하늘 위 코스는 아래가 하늘이라야 한다) */
    hideOutside?: boolean;
    /** 코스 바닥 자체를 맵이 직접 만드는 경우 엔진 바닥판을 감춘다 */
    hideFloor?: boolean;

    /**

     * 무한 물리 지면(y=0)을 빼버린다.

     *

     * 기본값(false)이면 y=0에 보이지 않는 무한 평면이 깔려 있어서, 코스 밖으로

     * 나가도 그 위를 계속 걸을 수 있다. 즉 "떨어진다"가 성립하지 않고

     * main.ts의 낙사/리스폰(VOID_Y=-8)도 영원히 발동하지 않는다.

     * 좁은 다리처럼 떨어지는 게 규칙의 일부인 맵은 이걸 켠다.

     */

    noGround?: boolean;
  };
  /** 안개 [색, 시작거리, 끝거리]. 없으면 기본값 */
  fog?: [number, number, number];
  /**
   * 바닥 튜토리얼 패드 위에서 HUD 안내를 띄울 것인가.
   *
   * [왜 맵에 올렸나] main.ts는 예전에 `world.map.id !== "goalrush"`로 이걸
   * 판단했는데, `goalrush`라는 id를 가진 맵은 존재한 적이 없다(실제 id는
   * sky/canyon/denof). 그래서 패드는 바닥에 그려지는데 안내가 한 번도 안 떴다.
   * 맵 id를 문자열로 비교하는 대신 맵이 스스로 선언하게 바꾼다 - 스테이지가
   * 10개로 늘어도 main.ts를 다시 고칠 일이 없다.
   */
  tutorial?: boolean;
  build(ctx: MapCtx): void;
}
