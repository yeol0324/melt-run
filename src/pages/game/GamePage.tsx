import { useEffect, useRef } from "react";

import { GAME, HIT } from "@shared/config/constants";
import { createLoop } from "@shared/lib/loop";
import {
  useWorld,
  drawBackground,
  WorldCanvas,
  type WorldCanvasHandle,
} from "@entities/world";
import {
  drawObstacle,
  moveObstacles,
  spawnObstacle,
  type Obstacle,
} from "@entities/obstacle";
import { useSnowman, drawSnowman } from "@entities/snowman";
import { aabbIntersect } from "@shared/lib/physics";

export const GamePage = () => {
  const viewW = 360;
  const viewH = 640;
  const world = useWorld();
  const snow = useSnowman();

  const canvasRef = useRef<WorldCanvasHandle>(null);
  const obsRef = useRef<Obstacle[]>([]);
  const worldRef = useRef(world);
  useEffect(() => {
    worldRef.current = world;
  });

  useEffect(() => {
    const loop = createLoop((dt) => {
      const w = worldRef.current;
      if (w.phase !== "playing") return;

      const h = canvasRef.current;
      if (!h) return;

      // 물리 업데이트
      snow.applyGravity(dt);
      w.tick(dt);

      // 스폰
      if (w.time - w.lastSpawnAt > GAME.SPAWN_INTERVAL) {
        const o = spawnObstacle(h.BASE_W, GAME.GROUND_Y);
        obsRef.current = [...obsRef.current, o];
        useWorld.setState({ lastSpawnAt: w.time });
      }

      obsRef.current = moveObstacles(obsRef.current, dt, w.speed);

      // 충돌 체크
      const saabb = snow.aabb();
      const now = w.time;
      if (!snow.isInvincible(now)) {
        for (const o of obsRef.current) {
          const oaabb = { x: o.x, y: o.y, w: o.w, h: o.h };
          if (aabbIntersect(saabb, oaabb)) {
            console.log("충돌~!~!");

            snow.halve();
            snow.onHit(now);
            snow.knockback(HIT.KNOCKBACK_PX);
            useWorld.getState().addScore(-HIT.SCORE_PENALTY);

            break;
          }
        }
      }

      // 스케일 반영
      const baseScale = 1 + w.score * GAME.GROWTH_PER_SCORE;
      snow.setScale(baseScale);

      // render
      const ctx = h.offCtx;
      ctx.clearRect(0, 0, h.BASE_W, h.BASE_H);
      drawBackground(ctx, h.BASE_W, h.BASE_H, GAME.GROUND_Y);

      for (const o of obsRef.current) drawObstacle(ctx, o);

      const sm = useSnowman.getState();
      const smx = Math.floor(sm.pos.x);
      const smy = Math.floor(sm.pos.y + sm.height * sm.scale);
      drawSnowman(ctx, smx, smy, sm.scale);

      h.present();
    });

    loop.start();
    return () => loop.stop();
  }, [world.phase]);

  // 시작/리셋
  useEffect(() => {
    if (world.phase === "playing") {
      snow.init();
      obsRef.current = [];
    }
  }, [world.phase]);

  // 입력
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.code === "Space" || e.code === "ArrowUp") snow.jump();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [snow]);

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
          className="absolute bottom-4 right-20 pixel-font pixelated no-aa bg-white/80 text-black px-4 py-3 rounded"
          onClick={world.reset}
        >
          STOP
        </button>
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
