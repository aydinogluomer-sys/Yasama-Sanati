"use client";
import { motion, useScroll, useTransform } from "motion/react";
import Image from "next/image";
import useMountedReducedMotion from "@/hooks/useMountedReducedMotion";
import { useRef } from "react";
import useMaskImage from "@/hooks/useMaskImage";
import heroDesktop from "@/public/Hero/hero-desktop.jpg";

export default function HeroDesktopClient() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "50vh start"],
  });
  const maskImage = useMaskImage(scrollYProgress, false, {
    divisions: 24,
    inset: 0.15,
    gap: 0.3,
    vh: 100,
  });
  const reduceMotion = useMountedReducedMotion();
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  return (
    <div className="absolute inset-0 overflow-clip" ref={containerRef}>
      <motion.div
        style={{ y: reduceMotion ? "0%" : y, maskImage: reduceMotion ? "none" : maskImage }}
        className="h-full"
      >
        {/* The movement is authored here rather than shot: a single slow settle across the still
            on arrival. One-shot, not a loop — it is an entrance gesture, and an endless drift
            would keep a compositor layer alive for the whole visit. Held for reduced motion. */}
        <motion.div
          className="h-full"
          animate={reduceMotion ? { scale: 1 } : { scale: [1.06, 1] }}
          transition={reduceMotion ? { duration: 0 } : { duration: 28, ease: "easeOut" }}
        >
          <Image
            src={heroDesktop}
            alt=""
            aria-hidden
            priority
            sizes="100vw"
            placeholder="blur"
            className="size-full object-cover"
          />
        </motion.div>
      </motion.div>
    </div>
  );
}
