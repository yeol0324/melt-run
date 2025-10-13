import { nanoid } from "nanoid";
import type { Obstacle } from "./types";

export function spawnObstacle(viewW: number, groundY: number): Obstacle {
  const h = 36 + Math.floor(Math.random() * 40);
  const w = 24 + Math.floor(Math.random() * 30);
  return {
    id: nanoid(6),
    x: viewW + 20,
    y: groundY - h,
    w,
    h,
  };
}

export function moveObstacles(list: Obstacle[], dt: number, speed: number) {
  for (const o of list) o.x -= speed * dt;
  return list.filter((o) => o.x + o.w > -40);
}
