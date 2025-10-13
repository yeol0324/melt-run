import type { Obstacle } from "../model/types";

export function drawObstacle(ctx: CanvasRenderingContext2D, o: Obstacle) {
  ctx.fillStyle = "#6B7280";
  ctx.fillRect(
    Math.floor(o.x),
    Math.floor(o.y),
    Math.floor(o.w),
    Math.floor(o.h)
  );
}
