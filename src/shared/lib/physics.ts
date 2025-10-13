import type { AABB } from "@shared/types";

export const aabbIntersect = (a: AABB, b: AABB) =>
  a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y;
