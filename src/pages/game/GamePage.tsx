import React, { useEffect, useMemo, useRef } from "react";
import {
  WorldCanvas,
  type WorldCanvasHandle,
} from "@entities/world/ui/WorldCanvas";
import { useWorld } from "@entities/world/model/useWorld";
import { useSnowman } from "@entities/snowman/model/useSnowman";
import { drawSnowman } from "@entities/snowman/render";
import { drawBackground } from "@entities/world/render";
import { GAME } from "@shared/config/constants";
import { createLoop } from "@shared/lib/loop";

export const GamePage: React.FC = () => {
  const viewW = useMemo(() => 360, []);
  const viewH = useMemo(() => 640, []);
  const world = useWorld();
  const snow = useSnowman();
  const canvasRef = useRef<WorldCanvasHandle>(null);

  // 루프
  useEffect(() => {
    const loop = createLoop((dt) => {
      if (world.phase !== "playing") return;
      const h = canvasRef.current;
      if (!h) return;

      // 물리 업데이트
      snow.applyGravity(dt);
      world.tick(dt);

      // 점수 : 스케일 반영
      const baseScale = 1 + world.score * GAME.GROWTH_PER_SCORE;
      snow.setScale(baseScale);

      // render
      const ctx = h.offCtx;
      ctx.clearRect(0, 0, h.BASE_W, h.BASE_H);

      drawBackground(ctx, h.BASE_W, h.BASE_H, GAME.GROUND_Y);

      const sm = useSnowman.getState();
      const smx = Math.floor(sm.pos.x);
      const smy = Math.floor(sm.pos.y + sm.height * sm.scale); // 발
      drawSnowman(ctx, smx, smy, sm.scale);

      h.present();
    });
    loop.start();
    return () => loop.stop();
  }, [world.phase, world.time, world.speed, snow]);

  // 시작/리셋
  useEffect(() => {
    if (world.phase === "playing") {
      snow.init();
      //   setObs([]);
    }
  }, [world.phase]);

  return (
    <div className="w-full h-dvh flex items-center justify-center bg-slate-900">
      <div
        className="relative rounded-2xl shadow-xl overflow-hidden"
        style={{ width: viewW, height: viewH }}
      >
        <WorldCanvas ref={canvasRef} viewW={viewW} viewH={viewH} />
        <div className="absolute top-2 left-2 text-xs pixel-font pixelated no-aa bg-black/60 text-white px-2 py-1 rounded">
          Score: {Math.floor(world.score)} | Scale:{" "}
          {useSnowman((s) => s.scale.toFixed(2))}
        </div>
        {world.phase !== "playing" && (
          <div className="absolute inset-0 flex items-center justify-center">
            <button
              className="pixel-font pixelated no-aa bg-white/90 text-black px-4 py-2 rounded"
              onClick={world.phase === "idle" ? world.start : world.reset}
            >
              {world.phase === "idle" ? "Start" : "Retry"}
            </button>
          </div>
        )}
        <button
          className="absolute bottom-4 right-4 pixel-font pixelated no-aa bg-white/80 text-black px-4 py-3 rounded"
          onClick={useSnowman.getState().jump}
        >
          JUMP
        </button>
      </div>
    </div>
  );
};
