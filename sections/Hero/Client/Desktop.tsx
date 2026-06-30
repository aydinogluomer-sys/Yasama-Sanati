"use client";
import { motion, useScroll, useTransform } from "motion/react";
import useMountedReducedMotion from "@/hooks/useMountedReducedMotion";
import { Dispatch, SetStateAction, useEffect, useRef } from "react";
import PlaySVG from "@/components/SVGComponents/PlaySVG";
import { useCursor } from "@/hooks/useCursor";
import Cursor from "@/components/Client/Cursor";
import useMaskImage from "@/hooks/useMaskImage";

interface HeroDesktopClientProps {
  setPlayIntro: Dispatch<SetStateAction<boolean>>;
}
export default function HeroDesktopClient({
  setPlayIntro,
}: HeroDesktopClientProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
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
  const { handlers, cursorProps } = useCursor();
  const reduceMotion = useMountedReducedMotion();
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  useEffect(() => {
    if (reduceMotion) {
      videoRef.current?.pause();
      return;
    }
    void videoRef.current?.play().catch(() => undefined);
  }, [reduceMotion]);
  return (
    <>
      <div className="absolute inset-0 overflow-clip" ref={containerRef}>
        <motion.div
          style={{ y: reduceMotion ? "0%" : y, maskImage: reduceMotion ? "none" : maskImage }}
          className="h-full"
        >
          <video
            ref={videoRef}
            className="size-full object-cover"
            autoPlay={!reduceMotion}
            muted
            loop
            playsInline
            poster="/Hero/elementis-cover-mjpg.png"
            aria-hidden="true"
          >
            <source src="/Hero/elementismp4.mp4" type="video/mp4"></source>
          </video>
        </motion.div>
        <motion.button
          type="button"
          aria-label="Tanıtım filmini oynat"
          className="absolute inset-x-0 top-0 flex h-[100svh] cursor-pointer flex-col justify-end gap-8 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-white/80"
          {...handlers}
          onClick={() => {
            handlers.onMouseLeave(); //will exit the cursor
            setPlayIntro((prev) => !prev);
          }}
        />
      </div>
      <Cursor
        {...cursorProps}
        className="-translate-x-1/2 -translate-y-1/2 rounded-full p-6"
      >
        <PlaySVG />
      </Cursor>
    </>
  );
}
