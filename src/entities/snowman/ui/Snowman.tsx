import React from "react";
import { useSnowman } from "../model/useSnowman";

export const Snowman: React.FC = () => {
  const { pos, scale } = useSnowman();
  return (
    <div
      className="absolute will-change-transform"
      style={{
        transform: `translate(${pos.x}px, ${pos.y}px) scale(${scale})`,
        transformOrigin: "center bottom",
      }}
    >
      <div className="relative">
        <div className="bg-white rounded-full w-6 h-6 shadow mx-auto relative">
          <div className="absolute w-1 h-1 bg-black rounded-full left-1.5 top-1.5" />
          <div className="absolute w-1 h-1 bg-black rounded-full right-1.5 top-1.5" />
          <div className="absolute w-2 h-1 bg-orange-400 left-1/2 -translate-x-1/2 top-3 rounded-sm" />
        </div>
        <div className="bg-white rounded-full w-10 h-10 shadow -mt-2 mx-auto" />
      </div>
    </div>
  );
};
