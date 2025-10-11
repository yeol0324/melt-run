import React, { useEffect, useRef } from "react";
import { setupPixelCanvas } from "@shared/lib/pixel-canvas";
import { BASE } from "@shared/config/constants";

export type WorldCanvasHandle = {
  offCtx: CanvasRenderingContext2D;
  present: () => void;
  BASE_W: number;
  BASE_H: number;
  scale: number;
  resize: (w: number, h: number) => void;
};

export const WorldCanvas = React.forwardRef<
  WorldCanvasHandle,
  { viewW: number; viewH: number }
>(({ viewW, viewH }, ref) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const pixelRef = useRef<ReturnType<typeof setupPixelCanvas> | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    pixelRef.current = setupPixelCanvas(
      canvasRef.current,
      viewW,
      viewH,
      BASE.W,
      BASE.H
    );

    if (!ref) return;
    // TODO:
    (ref as { current: unknown }).current = {
      offCtx: pixelRef.current.offCtx,
      present: pixelRef.current.present,
      BASE_W: pixelRef.current.BASE_W,
      BASE_H: pixelRef.current.BASE_H,
      scale: pixelRef.current.scale,
      resize: pixelRef.current.resize,
    };
    return () => {
      if (ref && typeof ref !== "function") ref.current = null;
      pixelRef.current = null;
    };
  }, []);

  useEffect(() => {
    pixelRef.current?.resize(viewW, viewH);
  }, [viewW, viewH]);

  return (
    <canvas ref={canvasRef} className="world-canvas absolute inset-0 block" />
  );
});
WorldCanvas.displayName = "WorldCanvas";
