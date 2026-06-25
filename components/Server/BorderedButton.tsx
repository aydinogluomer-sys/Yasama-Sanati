"use client";
import React, { PropsWithChildren } from "react";
import { motion, useReducedMotion, type MotionProps } from "motion/react";
import cn from "@/utils/cn";
import { easing, duration } from "@/utils/motion/tokens";

type BorderedButtonProps = PropsWithChildren &
  MotionProps & {
    className?: string;
  };

export default function BorderedButton({
  children,
  className,
  ...props
}: BorderedButtonProps) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial="initial"
      whileHover="whileHover"
      whileFocus="whileHover"
      className={cn("relative", className)}
      {...props}
    >
      {children}
      <div className="absolute inset-0">
        <svg
          viewBox="0 0 250 100"
          className="h-full w-full"
          preserveAspectRatio="none"
        >
          <path
            d="M1 99 H249 V1 H1 Z"
            opacity="0.5"
            strokeWidth="2"
            fill="none"
            vectorEffect="non-scaling-stroke"
          />
          <motion.path
            d="M1 99 H249 V1 H1 Z"
            strokeWidth="3"
            fill="none"
            vectorEffect="non-scaling-stroke"
            variants={{
              initial: { pathLength: 0 },
              whileHover: {
                pathLength: 1,
                transition: reduce
                  ? { duration: 0 }
                  : { duration: duration.buttonStroke, ease: easing.editorial },
              },
            }}
          />
        </svg>
      </div>
    </motion.div>
  );
}
