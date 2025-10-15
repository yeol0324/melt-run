import { useEffect } from "react";
import { useJump } from "./useJump";

export function useJumpControl(target: Window | HTMLElement = window) {
  const { jump } = useJump();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.code === "Space" || e.code === "ArrowUp") jump();
    };

    const listener = onKey as (event: Event) => void;

    target.addEventListener("keydown", listener);

    return () => {
      target.removeEventListener("keydown", listener);
    };
  }, [jump]);
}
