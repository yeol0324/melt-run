import { aabbIntersect } from "@shared/lib/physics";
import type { Obstacle } from "@entities/obstacle";
import { useSnowman } from "@entities/snowman";

/** 장애물 충돌 감지 */
export function checkCollision(obstacles: Obstacle[], now: number): boolean {
  const snow = useSnowman.getState();
  if (snow.isInvincible?.(now)) return false;
  const saabb = snow.aabb();
  return obstacles.some((o) =>
    aabbIntersect(saabb, { x: o.x, y: o.y, w: o.w, h: o.h })
  );
}
