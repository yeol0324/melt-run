export function drawSnowman(
  ctx: CanvasRenderingContext2D,
  bottomX: number,
  bottomY: number,
  scale: number,
  tSec: number,
  inv: boolean
) {
  if (inv && Math.floor(tSec * 10) % 2 === 0) return;

  const w = (16 * scale) | 0;
  const h = (24 * scale) | 0;
  const x = bottomX - (w >> 1);
  const y = bottomY - h;

  const h3 = Math.max(1, (h * 0.5) | 0);
  const h2 = Math.max(1, (h * 0.33) | 0);
  const h1 = Math.max(1, (h * 0.17) | 0);

  ctx.fillStyle = "#FFFFFF";
  ctx.fillRect(x, y + (h - h3), w, h3);
  ctx.fillRect(x + ((w * 0.125) | 0), y + (h - h3 - h2), (w * 0.75) | 0, h2);
  ctx.fillRect(x + ((w * 0.25) | 0), y + (h - h3 - h2 - h1), (w * 0.5) | 0, h1);

  // 눈/코
  ctx.fillStyle = "#000000";
  ctx.fillRect(x + Math.floor(w * 0.35), y + (h - h3 - h2 - h1) + 1, 1, 1);
  ctx.fillRect(x + Math.floor(w * 0.55), y + (h - h3 - h2 - h1) + 1, 1, 1);

  ctx.fillStyle = "#FF7A00";
  ctx.fillRect(x + Math.floor(w * 0.46), y + (h - h3 - h2 - h1) + 3, 2, 1);
}
