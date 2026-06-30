"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import useMountedReducedMotion from "@/hooks/useMountedReducedMotion";
import cn from "@/utils/cn";

/**
 * ODDWORKS signature type mass (Phase 2 ref 05). Oversized words behaving like visual objects —
 * a slow horizontal scroll-linked drift of large serif words, with one rotated/vertical accent.
 * One signature moment only. Decorative (aria-hidden); reduced motion → static, content readable.
 */
export default function RotatedTypeMass({
  words,
  className,
  rotatedWord,
  progress,
}: {
  /** large words rendered as a drifting horizontal band */
  words: string[];
  /** optional single word rendered vertically as the rotated accent */
  rotatedWord?: string;
  className?: string;
  /** optional scroll progress from a parent pinning container */
  progress?: MotionValue<number>;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useMountedReducedMotion();
  const { scrollYProgress: localScrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const activeProgress = progress || localScrollYProgress;
  const x = useTransform(activeProgress, [0, 1], ["8%", "-22%"]);

  return (
    <div
      ref={ref}
      aria-hidden
      className={cn("relative w-full overflow-hidden", className)}
    >
      <motion.div
        style={{ x: reduce ? "0%" : x }}
        className="flex w-max items-center gap-[0.35em] whitespace-nowrap font-serif text-[clamp(4rem,18vw,15rem)] font-normal leading-[0.82] tracking-[-0.03em] text-[#F4EFE4]"
      >
        {words.map((w, i) => (
          <span key={i} className="inline-flex items-baseline">
            <span
              className="select-none"
              style={
                i % 2 === 1
                  ? {
                      color: "transparent",
                      WebkitTextStrokeWidth: "1.5px",
                      WebkitTextStrokeColor: "rgba(244,239,228,0.45)",
                    }
                  : undefined
              }
            >
              {w}
            </span>
            <span className="mx-[0.18em] text-[0.3em] text-[#C9875B]">✦</span>
          </span>
        ))}
      </motion.div>

      {rotatedWord && (
        <span
          className="pointer-events-none absolute right-3 top-1/2 hidden -translate-y-1/2 select-none font-mono text-[0.78rem] uppercase tracking-[0.22em] text-[#C9875B] [writing-mode:vertical-rl] md:block"
        >
          {rotatedWord}
        </span>
      )}
    </div>
  );
}
