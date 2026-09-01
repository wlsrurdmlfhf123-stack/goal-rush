export type Vec3 = [number, number, number];
export type Quat = [number, number, number, number];

/** 플레이어가 매 프레임 보내는 입력. host가 이걸 "상대 캐릭터"에 적용한다. */
export interface InputState {
  mx: number;      // 이동 X (월드 기준, -1..1)
  mz: number;      // 이동 Z (월드 기준, -1..1)
  jump: boolean;
  grab: boolean;   // grab 토글 요청 (엣지 트리거)
  /** 개인기(트릭) 요청 (엣지 트리거). 없으면 false로 본다 */
  trick?: boolean;
  /** 개인기 2 - 스톱턴 요청 (엣지 트리거) */
  stop?: boolean;
  /** 킥 버튼을 이 프레임에 놓았는가 (엣지). 누른 순간이 아니라 뗀 순간이다 */
  kick?: boolean;
  /**
   * 그때까지 채운 킥 세기 (0..1).
   *
   * 짧게 톡 치면 0에 가깝고, chargeTime만큼 누르고 있으면 1이다.
   * 세기를 host에서 다시 계산할 수는 없다 - 버튼을 누르고 있던 시간은
   * 누른 사람만 알기 때문이다. 그래서 입력에 실어 보낸다.
   */
  kp?: number;
  /**
   * 조준 방향 (월드 기준 수평 단위벡터) = 보내는 사람의 카메라 정면.
   *
   * [왜 이동 입력과 따로 보내는가] 킥은 "지금 보고 있는 쪽으로 차는" 조준
   * 동작이라 이동 방향과 다를 수 있다(옆으로 빠지면서 앞으로 차기). 게다가
   * 가만히 서 있으면 mx/mz가 0이라 방향 정보가 아예 없어서, 예전에는 몸통이
   * 우연히 향해 있던 쪽으로 찼다 (main.ts의 aim 주석 참고).
   */
  ax?: number;
  az?: number;
}

/** 래그돌 1개의 전체 파츠 transform. 15 body × 7 float = 105 */
export interface RagdollSnapshot {
  id: number;          // 이 래그돌의 주인 playerId
  b: number[];         // [px,py,pz,qx,qy,qz,qw] × 15
  st: string;          // RagdollState
}

export interface ObjectState {
  id: number;
  p: Vec3;
  r: Quat;
}

/** 게임 진행 상태 */
export type GamePhase = "playing" | "success" | "fail";

/** host가 계산하는 게임 상태. snapshot에 얹어서 보낸다. */
export interface GameSnapshot {
  phase: GamePhase;
  /** 남은 시간(초) */
  t: number;
  /** 지금 맵 인덱스. host가 다음 맵으로 넘어가면 비-host도 따라간다 */
  m?: number;
  /**
   * 마지막으로 통과한 체크포인트 번호 (-1 = 아직 없음).
   *
   * 판정은 host만 한다 (사람이 **전부** 그 선을 넘었는가). 결과만 실어
   * 보내므로 한쪽 화면에서만 체크포인트가 잡히는 일이 없다.
   */
  c?: number;
}

/**
 * host가 일으킨 소리 이벤트 한 건. snapshot에 얹어서 같이 보낸다.
 *
 * [왜 필요한가] 이 게임의 비-host는 물리를 아예 안 돌리는 얇은 클라이언트다
 * (main.ts setAuthority 참고). 그래서 킥·드리블 터치·개인기·공 들기처럼
 * ball.ts가 판정하는 소리는 전부 host 쪽에서만 울렸고, 친구 화면에서는
 * 자기가 F를 눌러 공을 차도 아무 소리가 안 났다.
 *
 * 넘어짐·봇 등장·골·버튼 문처럼 「스냅샷만 보고도 알 수 있는」 것은 받는 쪽에서
 * 직접 관찰해 울린다 (그게 더 싸고 지연도 없다). 이 통로는 관찰로는 알 수 없는
 * 「누가 방금 무엇을 했다」만 나른다.
 */
export interface SfxEvent {
  /** audio.ts의 SfxName */
  n: string;
  /** 이 소리를 낸 캐릭터의 id. 받는 쪽이 "내가 한 것인가"로 볼륨을 정한다 */
  p?: number;
  /** 기본 볼륨 배수 (누가 들었는지에 따른 보정은 뺀 값) */
  v?: number;
  /** 재생 속도 */
  r?: number;
}

/** 방 참가 실패 사유 */
export type JoinErrorReason = "noRoom" | "full" | "badCode";

/** 누가 어떤 캐릭터 프리셋을 골랐는지 (playerId -> preset index) */
export type PickMap = Record<number, number>;

export type ServerMessage =
  /** 방에 들어갔다. room은 4자리 방 코드, picks는 이미 고른 사람들 */
  | { type: "welcome"; id: number; hostId: number | null; players: number[]; room: string; picks: PickMap }
  /** 누군가 캐릭터를 골랐다 (자기 자신 포함) */
  | { type: "picks"; picks: PickMap }
  | { type: "host"; hostId: number }
  | { type: "playerJoined"; id: number }
  | { type: "playerLeft"; id: number }
  /** 방 참가 실패. 서버가 곧 소켓을 닫는다 */
  | { type: "joinError"; reason: JoinErrorReason }
  /** host가 [게임 시작]을 눌렀다. 이제 대기실을 닫고 래그돌을 스폰한다 */
  | { type: "gameStart" }
  /** host가 받는다: 누가 어떤 입력을 넣었는지 */
  | { type: "input"; id: number; input: InputState }
  /** 비-host가 받는다: host가 계산한 월드 전체 상태 */
  | { type: "snapshot"; ragdolls: RagdollSnapshot[]; objects: ObjectState[]; game?: GameSnapshot; sfx?: SfxEvent[] }
  /** host가 받는다: 누군가 [다시하기]를 눌렀다 */
  | { type: "restart"; id: number }
  /** host가 받는다: 누군가 [다음 맵]을 눌렀다 */
  | { type: "nextMap"; id: number }
  | { type: "pong"; t: number };

export type ClientMessage =
  | { type: "input"; input: InputState }
  | { type: "snapshot"; ragdolls: RagdollSnapshot[]; objects: ObjectState[]; game?: GameSnapshot; sfx?: SfxEvent[] }
  /** 비-host -> host 재시작 요청 */
  | { type: "restart" }
  /** 비-host -> host 다음 맵 요청 */
  | { type: "nextMap" }
  /** 캐릭터 프리셋 선택을 알린다 */
  | { type: "pick"; preset: number }
  /** 대기실에서 host만 보낼 수 있다 */
  | { type: "startGame" }
  | { type: "ping"; t: number };
