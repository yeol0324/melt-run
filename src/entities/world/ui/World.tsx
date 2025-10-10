import React from "react";
import { GAME } from "@shared/config/constants";

export const World: React.FC = () => (
  <div className="absolute inset-0 bg-gradient-to-b from-sky-400 to-sky-600">
    <div
      className="absolute left-0 right-0 bg-white"
      style={{ top: GAME.GROUND_Y, height: 400 }}
    />
  </div>
);
