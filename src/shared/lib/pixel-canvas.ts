export type PixelCanvas = {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  off: HTMLCanvasElement;
  offCtx: CanvasRenderingContext2D;
  BASE_W: number;
  BASE_H: number;
  scale: number;
  resize: (viewW: number, viewH: number) => void;
  present: () => void; // off → main 업스케일 드로우
};

export function setupPixelCanvas(
  canvas: HTMLCanvasElement,
  viewW: number,
  viewH: number,
  baseW = 180,
  baseH = 320
): PixelCanvas {
  const ctx = canvas.getContext("2d")!;
  const off = document.createElement("canvas");
  const offCtx = off.getContext("2d")!;
  offCtx.imageSmoothingEnabled = false;
  ctx.imageSmoothingEnabled = false;

  const BASE_W = baseW;
  const BASE_H = baseH;
  let scale = 1;

  const resize = (w: number, h: number) => {
    // 정수 배율
    scale = Math.max(1, Math.floor(Math.min(w / BASE_W, h / BASE_H)));
    canvas.width = BASE_W * scale;
    canvas.height = BASE_H * scale;
    canvas.style.width = `${BASE_W * scale}px`;
    canvas.style.height = `${BASE_H * scale}px`;

    off.width = BASE_W;
    off.height = BASE_H;
  };

  const present = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(
      off,
      0,
      0,
      BASE_W,
      BASE_H,
      0,
      0,
      BASE_W * scale,
      BASE_H * scale
    );
  };

  resize(viewW, viewH);

  return { canvas, ctx, off, offCtx, BASE_W, BASE_H, scale, resize, present };
}
