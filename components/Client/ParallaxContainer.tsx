"use client";
import React, { CSSProperties, ReactNode, useRef } from "react";
import { useScroll, useTransform, motion } from "motion/react";
import cn from "@/utils/cn";
import useMountedReducedMotion from "@/hooks/useMountedReducedMotion";

export default function ParallaxContainer({
  style,
  children,
  className,
  parallaxAmount,
}: {
  style?: CSSProperties;
  children: ReactNode;
  className?: string;
  parallaxAmount: number;
}) {
  const imageContainer = useRef<HTMLDivElement>(null);
  const reduceMotion = useMountedReducedMotion();
  const { scrollYProgress } = useScroll({
    target: imageContainer,
    offset: ["start end", "end start"],
  });
  const transform = useTransform(scrollYProgress, (latest) => {
    const offset = latest * parallaxAmount * 2 - parallaxAmount;
    return `translateY(${offset}%) scale(${1 + 0.01 * parallaxAmount})`;
  });
  return (
    <motion.div className="overflow-hidden" ref={imageContainer}>
      <motion.div
        style={{
          transform: reduceMotion ? "none" : transform,
          ...style,
        }}
        className={cn(className, "origin-bottom")}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}
