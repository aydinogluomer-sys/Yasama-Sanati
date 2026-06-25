"use client";
import { motion, useReducedMotion, type MotionValue } from "motion/react";
import { easing } from "@/utils/motion/tokens";
import cn from "@/utils/cn";

interface MeridianDrawPathProps {
  className?: string;
  d?: string;
  viewBox?: string;
  color?: string;
  strokeWidth?: number;
  /** seconds before the mount draw begins */
  delay?: number;
  /** acupoint-style nodes placed along the line */
  nodes?: { cx: number; cy: number }[];
  /** subtle breathing opacity after the line is drawn */
  breathe?: boolean;
  /** if supplied, the draw follows scroll progress instead of mounting */
  progress?: MotionValue<number>;
}

/**
 * Self-drawing "meridian" line — the brand-specific signature motif (energy / breath path).
 * Mount mode draws on load with a gentle breath; progress mode binds the draw to scroll.
 * Stroke uses non-scaling-stroke so it never deforms when the viewBox is stretched.
 */
export default function MeridianDrawPath({
  className,
  d = "M18 0 C 36 110, 2 230, 18 350 S 36 590, 16 760",
  viewBox = "0 0 40 760",
  color = "#C9875B",
  strokeWidth = 1.4,
  delay = 0.45,
  nodes = [
    { cx: 12, cy: 230 },
    { cx: 22, cy: 590 },
  ],
  breathe = true,
  progress,
}: MeridianDrawPathProps) {
  const reduce = useReducedMotion();
  const scrollBound = Boolean(progress);

  return (
    <svg
      className={cn("pointer-events-none", className)}
      viewBox={viewBox}
      fill="none"
      preserveAspectRatio="none"
      aria-hidden
    >
      {scrollBound && (
        <path
          d={d}
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
          opacity={0.16}
          fill="none"
        />
      )}
      <motion.path
        d={d}
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
        style={scrollBound ? { pathLength: progress, opacity: 0.6 } : undefined}
        initial={
          scrollBound ? undefined : reduce ? { pathLength: 1, opacity: 0.5 } : { pathLength: 0, opacity: 0 }
        }
        animate={
          scrollBound
            ? undefined
            : reduce
              ? { pathLength: 1, opacity: 0.5 }
              : { pathLength: 1, opacity: breathe ? [0, 0.6, 0.4, 0.58] : 0.55 }
        }
        transition={
          scrollBound || reduce
            ? { duration: 0 }
            : {
                pathLength: { duration: 1.7, delay, ease: easing.editorial },
                opacity: {
                  duration: 6,
                  delay,
                  repeat: breathe ? Infinity : 0,
                  repeatType: "mirror",
                },
              }
        }
      />
      {nodes.map((n, i) => {
        // breathing "energy point" pulse — gentle, scroll-thread only, off for reduced motion
        const breathNode = scrollBound && !reduce;
        return (
          <motion.circle
            key={i}
            cx={n.cx}
            cy={n.cy}
            r={2.4}
            fill={color}
            initial={reduce || scrollBound ? { opacity: 0.5 } : { opacity: 0, scale: 0 }}
            animate={
              reduce
                ? { opacity: 0.6 }
                : breathNode
                  ? { opacity: [0.3, 0.75, 0.4] }
                  : { opacity: 0.7, scale: 1 }
            }
            transition={
              reduce
                ? { duration: 0 }
                : breathNode
                  ? {
                      duration: 4.5,
                      delay: i * 0.6,
                      repeat: Infinity,
                      repeatType: "mirror",
                      ease: "easeInOut",
                    }
                  : { delay: delay + 1.1 + i * 0.25, duration: 0.5, ease: easing.softOut }
            }
          />
        );
      })}
    </svg>
  );
}
