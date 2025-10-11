export function drawBackground(
  ctx: CanvasRenderingContext2D,
  baseW: number,
  baseH: number,
  groundY: number
) {
  ctx.fillStyle = "#6EC0FF";
  ctx.fillRect(10, 10, 10, 10);
  ctx.fillStyle = "#6EC0FF";
  ctx.fillRect(0, 0, baseW, baseH);
  ctx.fillStyle = "#FFFFFF";
  ctx.fillRect(0, groundY, baseW, baseH - groundY);
}
