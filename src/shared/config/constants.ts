export const BASE = {
  W: 360,
  H: 640,
} as const;

export const HIT = {
  /**무적 Time*/
  COOLDOWN: 0.8,
  KNOCKBACK_PX: 6,
  SCORE_PENALTY: 15,
} as const;

export const GAME = {
  /** px/s^2 */
  GRAVITY: 2200,
  /** px/s (위로 마이너스) */
  JUMP_VELOCITY: -900,
  /** 바닥 y */
  GROUND_Y: Math.floor(BASE.H * 0.75),
  /** 장애물 왼쪽 이동 속도(px/s) */
  BASE_SPEED: 280,
  /** 장애물 생성 간격(초) */
  SPAWN_INTERVAL: 1.1,
  /** 초당 점수 */
  SCORE_PER_SEC: 10,
  /** 점수→스케일 변환 계수 */
  GROWTH_PER_SCORE: 0.002,
  /** 최소 크기 */
  SNOW_MIN_SCALE: 0.6,
  /** 최대 크기 */
  SNOW_MAX_SCALE: 2.4,
} as const;
