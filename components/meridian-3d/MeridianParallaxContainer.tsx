"use client";

import React, { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import MeridianSceneWrapper from "./MeridianSceneWrapper";

export default function MeridianParallaxContainer() {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  // Track scroll position of the wrapper container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });


  // Animate scale slightly for a dynamic zoom-out parallax depth effect
  const sceneScale = useTransform(scrollYProgress, [0.0, 0.4], [1.025, 1.0]);

  // Fade the "scroll for more" indicator based on scroll progress
  // Fades in as it expands, stays visible, then fades out as subsequent content approaches
  const indicatorOpacity = useTransform(
    scrollYProgress,
    [0.1, 0.3, 0.75, 0.85],
    [0, 1, 1, 0]
  );

  return (
    <div 
      ref={containerRef} 
      className="relative h-[150svh] w-full bg-transparent motion-reduce:h-[100svh]"
    >
      {/* Sticky container that keeps the 3D scene pinned to viewport */}
      <div className="sticky top-0 flex h-[100svh] w-full items-center justify-center overflow-hidden bg-[#030806]">
        
        {/* Animated container (without clip-path to prevent cutting off left/right UI overlays) */}
        <motion.div
          style={{ 
            scale: prefersReducedMotion ? 1 : sceneScale,
            width: "100%",
            height: "100%",
          }}
          className="relative w-full h-full overflow-hidden shadow-2xl"
        >
          {/* Render the 3D scene */}
          <div className="w-full h-full">
            <MeridianSceneWrapper />
          </div>
        </motion.div>

        {/* Scroll Indicator at the bottom */}
        <motion.div
          style={{ opacity: indicatorOpacity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-40 pointer-events-none flex flex-col items-center gap-2 select-none"
        >
          <span className="text-[10px] md:text-xs font-medium tracking-[0.25em] text-[#e0a96d] uppercase font-sans drop-shadow-md">
            Müfredat ve Detaylar İçin Aşağı Kaydırın
          </span>
          <div className="flex flex-col items-center justify-center gap-1.5 mt-1">
            {/* Animated Bouncing Arrow */}
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24" 
              strokeWidth={2} 
              stroke="currentColor" 
              className={`size-5 text-[#e0a96d] ${prefersReducedMotion ? "" : "animate-bounce"}`}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
            </svg>
            {/* Mouse wheel animation */}
            <div className="w-[16px] h-[26px] border border-[#e0a96d]/40 rounded-full flex justify-center p-1 opacity-70">
              <motion.div 
                animate={prefersReducedMotion ? undefined : { y: [0, 8, 0] }}
                transition={{ 
                  duration: 1.5, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
                className="w-1 h-1 bg-[#e0a96d] rounded-full"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
