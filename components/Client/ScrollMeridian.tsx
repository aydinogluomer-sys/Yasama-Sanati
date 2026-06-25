"use client";
import { useScroll, useSpring } from "motion/react";
import MeridianDrawPath from "@/components/Client/MeridianDrawPath";

/**
 * Site signature motif: a thin "meridian / breath" line fixed in the right gutter that draws
 * itself as the page scrolls, threading every scene together. Scroll-linked (user-driven), so it
 * is acceptable under reduced motion; pointer-events-none and hidden on small screens.
 */
export default function ScrollMeridian() {
  const { scrollYProgress } = useScroll();
  const drawn = useSpring(scrollYProgress, {
    stiffness: 70,
    damping: 28,
    mass: 0.4,
  });

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed right-2.5 top-0 z-[5] hidden h-screen w-5 md:right-6 md:block md:w-7"
    >
      <MeridianDrawPath
        progress={drawn}
        className="h-full w-full"
        d="M20 4 C 34 130, 6 260, 20 380 S 36 640, 18 760"
        nodes={[
          { cx: 13, cy: 260 },
          { cx: 24, cy: 520 },
        ]}
      />
    </div>
  );
}
