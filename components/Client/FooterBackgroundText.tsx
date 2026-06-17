"use client";

import React, { useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform, useScroll } from "motion/react";

interface FooterBackgroundTextProps {
  containerRef: React.RefObject<HTMLDivElement | null>;
}

export default function FooterBackgroundText({ containerRef }: FooterBackgroundTextProps) {
  const letters = Array.from("YAŞAMA SANATI");

  // Mouse move parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 30, stiffness: 120 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth) - 0.5;
      const y = (e.clientY / innerHeight) - 0.5;
      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  // Subtle 3D floating effect
  const containerX = useTransform(smoothMouseX, [-0.5, 0.5], [-25, 25]);
  const containerY = useTransform(smoothMouseY, [-0.5, 0.5], [-15, 15]);

  // Scroll parallax
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"],
  });

  const smoothScrollProgress = useSpring(scrollYProgress, { damping: 40, stiffness: 100 });

  // Top-level transform hooks to satisfy React Hook rules
  // Left word "YAŞAMA" slides from left, right word "SANATI" slides from right
  const scrollLeftX = useTransform(smoothScrollProgress, [0, 1], [-120, 0]);
  const scrollRightX = useTransform(smoothScrollProgress, [0, 1], [120, 0]);
  const scrollOpacity = useTransform(smoothScrollProgress, [0, 0.85], [0.1, 1]);

  return (
    <motion.div 
      className="absolute top-[15px] left-0 right-0 w-full max-w-[1400px] mx-auto flex justify-between items-center pointer-events-none select-none z-0 overflow-hidden hidden lg:flex px-16"
      style={{ 
        x: containerX, 
        y: containerY,
        WebkitMaskImage: "radial-gradient(ellipse at 42% 18%, rgba(0, 0, 0, 0.72) 0%, rgba(0, 0, 0, 0.46) 38%, rgba(0, 0, 0, 0.16) 68%, transparent 100%)",
        maskImage: "radial-gradient(ellipse at 42% 18%, rgba(0, 0, 0, 0.72) 0%, rgba(0, 0, 0, 0.46) 38%, rgba(0, 0, 0, 0.16) 68%, transparent 100%)"
      }}
    >
      <style>{`
        .footer-bg-letter {
          transition: -webkit-text-stroke 0.3s ease, color 0.3s ease, text-shadow 0.3s ease, transform 0.3s ease !important;
        }
        .footer-bg-letter:hover {
          -webkit-text-stroke: 1px rgba(201, 135, 91, 0.25) !important;
        }
        nextjs-portal {
          display: none !important;
        }
      `}</style>
      {letters.map((char, index) => {
        if (char === " ") {
          return <div key={index} className="w-[4vw]" />;
        }
 
        const letterX = index < 6 ? scrollLeftX : scrollRightX;
        const letterOpacity = scrollOpacity;
 
        return (
          <motion.span
            key={index}
            className="text-[9vw] font-bold uppercase text-transparent font-serif pointer-events-auto cursor-default select-none footer-bg-letter"
            style={{
              WebkitTextStroke: "1px rgba(243, 239, 230, 0.04)",
              display: "inline-block",
              x: letterX,
              opacity: letterOpacity,
            }}
            whileHover={{
              scale: 1.1,
              y: -6,
              rotateX: 6,
              rotateY: 10,
              color: "rgba(201, 135, 91, 0.10)",
              textShadow: "0px 12px 24px rgba(201, 135, 91, 0.12)",
            }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 15,
            }}
          >
            {char}
          </motion.span>
        );
      })}
    </motion.div>
  );
}
