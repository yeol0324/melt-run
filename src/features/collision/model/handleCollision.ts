import { useSnowman } from "@entities/snowman/model/useSnowman";
import { useWorld } from "@entities/world/model/useWorld";
import { HIT } from "@shared/config/constants";

/** 충돌 처리: 크기감소, 무적, 넉백, 점수 페널티 */
export function handleCollision(nowSec: number) {
  const snow = useSnowman.getState();
  const world = useWorld.getState();

  if (snow.isInvincible?.(nowSec)) return;

  snow.halve();
  snow.onHit?.(nowSec);
  snow.knockback?.(HIT.KNOCKBACK_PX);

  world.addScore?.(-HIT.SCORE_PENALTY);
}
