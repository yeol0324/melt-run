export function drawBackground(
  ctx: CanvasRenderingContext2D,
  baseW: number,
  baseH: number,
  groundY: number,
  surface: "normal" | "ice",
  telegraph: boolean
) {
  // 하늘
  ctx.fillStyle = "#6EC0FF";
  ctx.fillRect(0, 0, baseW, baseH);

  // 바닥 색
  const isIce = surface === "ice";
  ctx.fillStyle = isIce ? "#BEE8FF" : "#FFFFFF";
  ctx.fillRect(0, groundY, baseW, baseH - groundY);

  // 바닥 빙판
  if (isIce) {
    ctx.fillStyle = "#DFF5FF";
    ctx.fillRect(0, groundY, baseW, 1);
    ctx.fillStyle = "#A9DFFF";
    for (let x = 0; x < baseW; x += 4) ctx.fillRect(x, groundY + 2, 2, 1);
  }

  // 빙판 시작 직전
  if (telegraph && !isIce) {
    const t = performance.now() * 0.02;
    const pulse = 0.5 + 0.5 * Math.sin(t);
    ctx.save();
    ctx.globalAlpha = 0.2 + 0.5 * pulse;
    ctx.fillStyle = "#BEE8FF";
    ctx.fillRect(0, groundY, baseW, baseH - groundY);
    ctx.restore();
  }
}
