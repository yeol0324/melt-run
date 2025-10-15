import { useWorld } from "@entities/world/model/useWorld";
import { useSnowman } from "@entities/snowman/model/useSnowman";
import { GAME } from "@shared/config/constants";

/** 눈사람 크기 스케일 반영 */
export function applyGrowth() {
  const score = useWorld.getState().score;
  const setScale = useSnowman.getState().setScale;
  const base = 1 + score * GAME.GROWTH_PER_SCORE;
  setScale(base);
}
