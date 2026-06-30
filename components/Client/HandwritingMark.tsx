"use client";
import { motion } from "motion/react";
import useMountedReducedMotion from "@/hooks/useMountedReducedMotion";
import { easing } from "@/utils/motion/tokens";
import cn from "@/utils/cn";

interface HandwritingMarkProps {
  className?: string;
  color?: string;
  delay?: number;
  strokeWidth?: number;
  /** draw on mount (hero) or when scrolled into view (sections) */
  trigger?: "mount" | "inView";
  preserveAspectRatio?: string;
  variant?: "standard" | "long";
  style?: React.CSSProperties;
}

/** A loose, hand-drawn underline stroke — the "human mark" accent. */
const STROKE_STANDARD = "M2 13 C 70 4, 150 21, 220 9 S 360 3, 416 15";
const STROKE_LONG = "M2 13 C 70 4, 150 21, 220 9 S 360 3, 430 15 S 540 4, 616 13";

export default function HandwritingMark({
  className,
  color = "#C9875B",
  delay = 1.05,
  strokeWidth = 2.4,
  trigger = "mount",
  preserveAspectRatio = "none",
  variant = "standard",
  style,
}: HandwritingMarkProps) {
  const reduce = useMountedReducedMotion();
  const shown = { pathLength: 1, opacity: 0.9 };
  const hidden = { pathLength: 0, opacity: 0 };

  const motionProps =
    trigger === "inView"
      ? {
          initial: reduce ? shown : hidden,
          whileInView: shown,
          viewport: { once: true, margin: "0px 0px -10% 0px" },
        }
      : { initial: reduce ? shown : hidden, animate: shown };

  const stroke = variant === "long" ? STROKE_LONG : STROKE_STANDARD;
  const viewBox = variant === "long" ? "0 0 620 28" : "0 0 420 18";

  return (
    <svg
      className={cn("pointer-events-none overflow-visible", className)}
      viewBox={viewBox}
      fill="none"
      preserveAspectRatio={preserveAspectRatio}
      style={style}
      aria-hidden
    >
      <motion.path
        d={stroke}
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
        {...motionProps}
        transition={reduce ? { duration: 0 } : { duration: 0.95, delay, ease: easing.editorial }}
      />
    </svg>
  );
}
