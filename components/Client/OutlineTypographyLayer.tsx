"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import useMountedReducedMotion from "@/hooks/useMountedReducedMotion";
import cn from "@/utils/cn";

/**
 * Atmospheric outline-serif layer (Phase 2 ref 01). A ghost word drawn with `-webkit-text-stroke`,
 * very low opacity, drifting slowly with scroll. Decorative depth only — never readable content,
 * always aria-hidden, reduced motion → static. Sits behind real content (negative z by default).
 */
export default function OutlineTypographyLayer({
  word,
  className,
  strokeColor = "rgba(243,239,230,0.10)",
  /** vertical drift in px across the element's scroll range */
  drift = 60,
}: {
  word: string;
  className?: string;
  strokeColor?: string;
  drift?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useMountedReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [drift, -drift]);

  return (
    <div
      ref={ref}
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 z-0 flex items-center justify-center overflow-hidden",
        className,
      )}
    >
      <motion.span
        style={{
          y: reduce ? 0 : y,
          color: "transparent",
          WebkitTextStrokeWidth: "1px",
          WebkitTextStrokeColor: strokeColor,
        }}
        className="select-none whitespace-nowrap font-serif text-[34vw] font-normal leading-none tracking-[-0.02em] md:text-[26vw]"
      >
        {word}
      </motion.span>
    </div>
  );
}
