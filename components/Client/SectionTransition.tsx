"use client";
import { ReactNode } from "react";
import { motion, useReducedMotion, type Variants } from "motion/react";
import { easing, duration } from "@/utils/motion/tokens";
import cn from "@/utils/cn";

interface SectionTransitionProps {
  children: ReactNode;
  className?: string;
  /** entrance character */
  variant?: "rise" | "clip";
}

/**
 * Scroll-linked cinematic entrance for a section's content block.
 * "rise" lifts + fades; "clip" opens a horizontal clip band. Reduced motion → static.
 * Wrap normal-flow content only (do not wrap sticky / parallax stages).
 */
export default function SectionTransition({
  children,
  className,
  variant = "rise",
}: SectionTransitionProps) {
  const reduce = useReducedMotion();
  const variants: Variants =
    variant === "clip"
      ? {
          hidden: { clipPath: "inset(14% 0% 14% 0%)", opacity: 0 },
          show: { clipPath: "inset(0% 0% 0% 0%)", opacity: 1 },
        }
      : {
          hidden: { y: 56, opacity: 0 },
          show: { y: 0, opacity: 1 },
        };

  return (
    <motion.div
      className={cn(className)}
      initial={reduce ? "show" : "hidden"}
      whileInView="show"
      viewport={{ once: true, margin: "0px 0px -15% 0px" }}
      variants={variants}
      transition={{ ease: easing.softOut, duration: duration.section }}
    >
      {children}
    </motion.div>
  );
}
