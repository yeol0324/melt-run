import { create } from "zustand";
import { BASE, GAME } from "@shared/config/constants";
import type { SnowmanModel } from "./types";

type SnowmanState = SnowmanModel & {
  init: () => void;
  applyGravity: (dt: number) => void;
  jump: () => void;
  setScale: (s: number) => void;
  halve: () => void; // todo: 충돌 시 절반
  aabb: () => { x: number; y: number; w: number; h: number };
};

const BASE_W = 16; // 눈사람 기본 너비
const BASE_H = 24; // 기본 높이

export const useSnowman = create<SnowmanState>((set, get) => ({
  pos: { x: Math.floor(BASE.W * 0.33), y: GAME.GROUND_Y },
  velY: 0,
  scale: 1,
  width: BASE_W,
  height: BASE_H,
  onGround: true,
  init: () => {
    set({
      pos: { x: Math.floor(BASE.W * 0.33), y: GAME.GROUND_Y },
      velY: 0,
      scale: 1,
      onGround: true,
    });
  },
  applyGravity: (dt) => {
    const st = get();
    let velY = st.velY + GAME.GRAVITY * dt;
    let y = st.pos.y + velY * dt;

    const groundY = GAME.GROUND_Y - st.height * st.scale;
    let onGround = st.onGround;

    if (y >= groundY) {
      y = groundY;
      velY = 0;
      onGround = true;
    } else {
      onGround = false;
    }
    set({ pos: { x: st.pos.x, y }, velY, onGround });
  },
  jump: () => {
    const st = get();
    if (!st.onGround) return;
    set({ velY: GAME.JUMP_VELOCITY, onGround: false });
  },
  setScale: (s) => {
    const clamped = Math.max(
      GAME.SNOW_MIN_SCALE,
      Math.min(GAME.SNOW_MAX_SCALE, s)
    );
    set({ scale: clamped });
  },
  halve: () => {
    const st = get();
    set({ scale: Math.max(GAME.SNOW_MIN_SCALE, st.scale * 0.5) });
  },
  aabb: () => {
    const st = get();
    const w = Math.round(st.width * st.scale);
    const h = Math.round(st.height * st.scale);
    const xLeft = Math.round(st.pos.x - w / 2);
    const yTop = Math.round(st.pos.y - h);
    return { x: xLeft, y: yTop, w, h };
  },
}));
