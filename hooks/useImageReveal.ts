import { useAnimate } from "motion/react";
import { useCallback, useRef } from "react";
import { easing } from "@/utils/motion/tokens";

export function useImageReveal() {
  const [imgContainerRef, animate] = useAnimate();
  const focus = useRef(0);
  const zIndex = useRef(1);
  const handleFocus = useCallback(
    (newFocus: number, directionalSensitive: boolean) => {
      if (newFocus != focus.current) {
        animate(
          `[data-index="${newFocus}"]`,
          {
            zIndex: zIndex.current,
            clipPath:
              newFocus < focus.current && directionalSensitive
                ? ["inset(0% 0% 100% 0%)", "inset(0% 0% 0% 0%)"]
                : ["inset(100% 0% 0% 0%)", "inset(0% 0% 0% 0%)"],
            scale: [1.15, 1],
          },
          {
            scale: {
              duration: 0.6,
              ease: easing.editorial,
            },
            clipPath: {
              duration: 0.45,
              ease: easing.editorial,
            },
          },
        );
        focus.current = newFocus;
        zIndex.current = zIndex.current + 1;
      }
    },
    [animate],
  );
  return { imgContainerRef, handleFocus };
}
