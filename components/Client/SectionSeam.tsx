"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import useMountedReducedMotion from "@/hooks/useMountedReducedMotion";
import cn from "@/utils/cn";

interface SectionSeamProps {
  /** top colour — should match the previous section's edge. */
  from: string;
  /** bottom colour — should match the next section's edge. */
  to: string;
  /** seam band height utility. */
  className?: string;
  /** wash tint that sweeps through the seam (default warm copper). */
  wash?: string;
}

/**
 * Cinematic section seam: an ambient tonal morph (gradient from the previous tone to the next)
 * with a soft "screen wash" that sweeps vertically as the seam passes the viewport. Replaces the
 * hard colour cut between two sections with a scroll-linked transition. Reduced motion → static blend.
 */
export default function SectionSeam({
  from,
  to,
  className = "h-24 md:h-40",
  wash = "rgba(201,135,91,0.14)",
}: SectionSeamProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useMountedReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-70%", "170%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0]);

  return (
    <div
      ref={ref}
      aria-hidden
      className={cn("relative w-full overflow-hidden", className)}
      style={{ background: `linear-gradient(to bottom, ${from}, ${to})` }}
    >
      {!reduce && (
        <motion.div
          className="absolute inset-x-0 h-2/3"
          style={{
            y,
            opacity,
            background: `linear-gradient(to bottom, transparent, ${wash}, transparent)`,
          }}
        />
      )}
    </div>
  );
}
