import { create } from "zustand";
import { BASE, GAME, HIT, ICE } from "@shared/config/constants";
import { useWorld, type Surface } from "@entities/world";

type SnowmanState = {
  applyHorizontal(dt: number, surface: string): unknown;
  pos: { x: number; y: number };
  velY: number;

  velX: number;
  jumpLockUntil: number;

  scale: number;
  width: number;
  height: number;
  onGround: boolean;

  invUntil: number;
  isInvincible: (t: number) => boolean;

  init: () => void;
  applyGravity: (dt: number) => void;
  jump: () => void;
  setScale: (s: number) => void;
  halve: () => void;

  onHit: (tNow: number) => void;
  knockback: (px: number) => void;

  onLand: (now: number, surface: Surface) => void;
  aabb: () => { x: number; y: number; w: number; h: number };
};

const BASE_W = 16;
const BASE_H = 24;

export const useSnowman = create<SnowmanState>((set, get) => ({
  pos: { x: Math.floor(BASE.W * 0.33), y: GAME.GROUND_Y },
  velY: 0,

  velX: 0,
  jumpLockUntil: 0,

  scale: 1,
  width: BASE_W,
  height: BASE_H,
  onGround: true,

  invUntil: 0,
  isInvincible: (t) => t < get().invUntil,

  init: () =>
    set({
      pos: { x: Math.floor(BASE.W * 0.33), y: GAME.GROUND_Y },
      velY: 0,
      scale: 1,
      onGround: true,
      invUntil: 0,
    }),

  applyGravity: (dt) => {
    const st = get();
    let vy = st.velY + GAME.GRAVITY * dt;
    let bottomY = st.pos.y + vy * dt;
    if (bottomY >= GAME.GROUND_Y) {
      if (!st.onGround) {
        const now = useWorld.getState().time;
        const surface = useWorld.getState().surface;
        get().onLand(now, surface);
        //TODO: 착지 효과음
      }
      bottomY = GAME.GROUND_Y;
      vy = 0;
      set({ pos: { x: st.pos.x, y: bottomY }, velY: 0, onGround: true });
    } else {
      set({ pos: { x: st.pos.x, y: bottomY }, velY: vy, onGround: false });
    }
  },

  applyHorizontal: (dt, surface) => {
    const st = get();
    let vx = st.velX;

    const dampIce = Math.pow(ICE.FRICTION, dt * 60);
    const dampNorm = Math.pow(0.5, dt * 60);

    vx *= surface === "ice" ? dampIce : dampNorm;

    const nx = Math.max(8, Math.min(st.pos.x + vx * dt, BASE.W - 8));
    set({ pos: { x: nx, y: st.pos.y }, velX: vx });
  },

  jump: () => {
    const st = get();
    const now = useWorld.getState().time;
    if (!st.onGround) return;
    if (now < st.jumpLockUntil) return;
    set({ velY: GAME.JUMP_VELOCITY, onGround: false });
  },
  onLand: (now, surface) => {
    if (surface === "ice") {
      const dir = Math.random() < 0.5 ? -1 : 1;
      set({ velX: dir * ICE.INIT_VX, jumpLockUntil: now + ICE.JUMP_LOCK });

      const { iceUntil, surface: curSurface } = useWorld.getState();
      if (curSurface === "ice" && iceUntil - now < ICE.GRACE_EXTEND) {
        useWorld.setState({ iceUntil: now + ICE.GRACE_EXTEND });
      }
    } else {
      set({ velX: 0, jumpLockUntil: 0 });
    }
  },

  setScale: (s) => {
    const clamped = Math.max(
      GAME.SNOW_MIN_SCALE,
      Math.min(GAME.SNOW_MAX_SCALE, s)
    );
    set({ scale: clamped });
  },

  halve: () =>
    set((st) => ({ scale: Math.max(GAME.SNOW_MIN_SCALE, st.scale * 0.5) })),

  onHit: (tNow) => set({ invUntil: tNow + HIT.COOLDOWN }),

  knockback: (px) =>
    set((st) => {
      const x = Math.max(8, Math.min(st.pos.x - px, BASE.W - 8));
      return { pos: { x, y: st.pos.y } };
    }),

  aabb: () => {
    const st = get();
    const w = Math.round(st.width * st.scale);
    const h = Math.round(st.height * st.scale);
    const xLeft = Math.round(st.pos.x - w / 2);
    const yTop = Math.round(st.pos.y - h);
    return { x: xLeft, y: yTop, w, h };
  },
}));
