"use client";
import { Dispatch, SetStateAction, useEffect, useRef } from "react";
import useMountedReducedMotion from "@/hooks/useMountedReducedMotion";
import Cursor from "@/components/Client/Cursor";
import PlaySVG from "@/components/SVGComponents/PlaySVG";
export default function HeroMobileClient({
  playIntro,
  setPlayIntro,
}: {
  setPlayIntro: Dispatch<SetStateAction<boolean>>;
  playIntro: boolean;
}) {
  // Mounted-safe reduced motion: keeps SSR/first-render `autoPlay` consistent (no hydration mismatch),
  // then pauses the loop for reduced-motion users after mount.
  const reduceMotion = useMountedReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    if (reduceMotion) {
      videoRef.current?.pause();
      return;
    }
    void videoRef.current?.play().catch(() => undefined);
  }, [reduceMotion]);
  return (
    <button
      type="button"
      aria-label="Tanıtım filmini oynat"
      className="absolute inset-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-white/80"
      onClick={() => setPlayIntro((prev) => !prev)}
    >
      <video
        ref={videoRef}
        className="size-full object-cover md:hidden"
        autoPlay={!reduceMotion}
        muted
        loop
        playsInline
        aria-hidden="true"
        poster="/Hero/elementis-cover-mjpg.png"
      >
        <source src="/Hero/elementis-mmp4.mp4" type="video/mp4" />
      </video>
      {/* Play affordance kept clear of the editorial headline: upper-centre, discreet ring. */}
      <Cursor
        renderCursor={!playIntro}
        isMobile={true}
        className="absolute left-1/2 top-[23%] grid aspect-square w-12 -translate-x-1/2 place-items-center rounded-full bg-black/20 ring-1 ring-white/40 backdrop-blur-sm"
      >
        <PlaySVG className="w-1/3" />
      </Cursor>
    </button>
  );
}
