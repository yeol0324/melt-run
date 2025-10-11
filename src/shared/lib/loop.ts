type Loop = { start: () => void; stop: () => void };

export function createLoop(step: (dt: number) => void): Loop {
  let raf = 0;
  let last = performance.now();
  const frame = (t: number) => {
    const dt = Math.min(0.05, (t - last) / 1000); // 50ms clamp
    last = t;
    step(dt);
    raf = requestAnimationFrame(frame);
  };
  return {
    start: () => {
      last = performance.now();
      raf = requestAnimationFrame(frame);
    },
    stop: () => cancelAnimationFrame(raf),
  };
}
