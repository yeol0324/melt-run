export type WorldCanvasHandle = {
  offCtx: CanvasRenderingContext2D;
  present: () => void;
  BASE_W: number;
  BASE_H: number;
  scale: number;
  resize: (w: number, h: number) => void;
};
