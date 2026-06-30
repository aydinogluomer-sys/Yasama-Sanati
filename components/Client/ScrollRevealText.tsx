"use client";
import { useRef, useState, useEffect, ReactNode } from "react";
import { motion, useReducedMotion, useScroll, useTransform, MotionValue } from "motion/react";
import cn from "@/utils/cn";

interface ScrollRevealTextProps {
  text: string;
  className?: string;
}

interface WordProps {
  children: ReactNode;
  progress: MotionValue<number>;
  range: [number, number];
  shouldReduceMotion: boolean;
}

function Word({ children, progress, range, shouldReduceMotion }: WordProps) {
  const opacity = useTransform(progress, range, [0.25, 1]);
  return (
    <motion.span style={{ opacity: shouldReduceMotion ? 1 : opacity }} className="inline-block">
      {children}
    </motion.span>
  );
}

export default function ScrollRevealText({ text, className }: ScrollRevealTextProps) {
  const containerRef = useRef<HTMLParagraphElement>(null);
  // Hydration-safe reduced-motion gate (D5): SSR and first client render both take the
  // default (scroll-linked) path; the reduced-motion opacity override is applied only after
  // mount, so server and client markup match. Reduced-motion users still settle to opacity 1.
  const prefersReducedMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const shouldReduceMotion = mounted && prefersReducedMotion === true;

  // As the container scrolls from 85% of the viewport (near bottom)
  // to 60% of the viewport, we reveal the words from left to right.
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 85%", "start 60%"],
  });

  const words = text.split(/\s+/).filter(Boolean);
  const total = words.length;

  return (
    <p ref={containerRef} className={cn("flex flex-wrap gap-x-[0.22em] gap-y-0", className)}>
      {words.map((word, i) => {
        const start = i / total;
        const end = Math.min(1, (i + 1.2) / total); // Slightly overlapping transitions for smoothness
        return (
          <Word key={i} progress={scrollYProgress} range={[start, end]} shouldReduceMotion={shouldReduceMotion}>
            {word}
          </Word>
        );
      })}
    </p>
  );
}
