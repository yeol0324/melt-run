export type SnowmanModel = {
  pos: { x: number; y: number };
  velY: number;
  /** 1.0 기준 */
  scale: number;
  /** AABB 계산용(스케일 포함 전 기준) */
  width: number;
  height: number;
  onGround: boolean;
};
