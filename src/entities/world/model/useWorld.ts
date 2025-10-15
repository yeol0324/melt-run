import { create } from "zustand";
import { GAME } from "@shared/config/constants";
import type { GamePhase } from "@shared/types";

export type Surface = "normal" | "ice";

type WorldState = {
  phase: GamePhase;
  time: number;
  score: number;
  /**월드 스크롤 속도*/
  speed: number;
  lastSpawnAt: number;

  // 빙판 타이밍
  surface: Surface;
  iceUntil: number;
  nextIceAt: number;

  iceTelegraph: boolean;

  // 액션
  start: () => void;
  reset: () => void;
  tick: (dt: number) => void;

  addScore: (s: number) => void;
};

export const useWorld = create<WorldState>((set, get) => ({
  phase: "idle",
  time: 0,
  score: 0,
  speed: GAME.BASE_SPEED,
  lastSpawnAt: 0,

  surface: "normal",
  iceUntil: 0,
  nextIceAt: 2.0,
  iceTelegraph: false,

  start: () =>
    set({
      phase: "playing",
      time: 0,
      score: 0,
      speed: GAME.BASE_SPEED,
      lastSpawnAt: 0,

      //빙판 state
      surface: "normal",
      iceUntil: 0,
      nextIceAt: 2.0,
    }),
  reset: () =>
    set({
      phase: "idle",
      time: 0,
      score: 0,
      speed: GAME.BASE_SPEED,
      lastSpawnAt: 0,

      //빙판 state
      surface: "normal",
      iceUntil: 0,
      nextIceAt: 2.0,
    }),
  tick: (dt) => {
    const { phase, time, score } = get();
    if (phase !== "playing") return;
    set({
      time: time + dt,
      score: score + GAME.SCORE_PER_SEC * dt,
    });
  },
  addScore: (s) => set((st) => ({ score: st.score + s })),
}));
