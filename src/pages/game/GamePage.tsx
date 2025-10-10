import React, { useEffect, useMemo, useRef } from "react";
import { World } from "@entities/world/ui/World";
import { Snowman } from "@entities/snowman/ui/Snowman";
import { useSnowman } from "@entities/snowman/model/useSnowman";
import { useWorld } from "@entities/world/model/useWorld";

export const GamePage: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const world = useWorld();
  const snow = useSnowman();

  const viewW = useMemo(() => 360, []);
  const viewH = useMemo(() => 640, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.code === "Space" || e.code === "ArrowUp") snow.jump();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [snow]);

  // init
  useEffect(() => {
    if (world.phase === "playing") {
      snow.init();
    }
  }, [world.phase]);

  return (
    <div className="w-full h-dvh flex items-center justify-center bg-sky-900">
      <div
        ref={ref}
        className="relative bg-sky-300 overflow-hidden rounded-2xl shadow-xl"
        style={{ width: viewW, height: viewH, touchAction: "manipulation" }}
        onPointerDown={() => snow.jump()}
      >
        <World />
        <Snowman />
      </div>
    </div>
  );
};
