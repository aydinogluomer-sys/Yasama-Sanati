"use client";
import React, { Dispatch, SetStateAction, useEffect, useRef } from "react";
import { motion, useReducedMotion } from "motion/react";

interface VideoPlayerProps {
  setPlayIntro: Dispatch<SetStateAction<boolean>>;
  playIntro: boolean;
  handlers?: {
    onMouseEnter: (e: React.MouseEvent<HTMLDivElement>) => void;
    onMouseLeave: () => void;
    onMouseMove: (e: React.MouseEvent<HTMLDivElement>) => void;
  };
}
export default function VideoPlayer({
  setPlayIntro,
  playIntro,
  handlers,
}: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const returnFocusRef = useRef<HTMLElement | null>(null);
  const reduceMotion = useReducedMotion();
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setPlayIntro(false);
    handlers?.onMouseLeave();
  };
  useEffect(() => {
    if (!playIntro) return;
    returnFocusRef.current = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setPlayIntro(false);
        return;
      }
      if (event.key !== "Tab") return;
      const controls = dialogRef.current?.querySelectorAll<HTMLElement>(
        'button:not([disabled]), video[controls]',
      );
      if (!controls?.length) return;
      const first = controls[0];
      const last = controls[controls.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
      const returnTarget = returnFocusRef.current;
      returnTarget?.focus();
    };
  }, [playIntro, reduceMotion, setPlayIntro]);
  return (
    <>
      {playIntro && (
          <motion.div
            ref={dialogRef}
            key="video-container"
            role="dialog"
            aria-modal="true"
            aria-label="Yaşama Sanatı tanıtım filmi"
            onClick={handleClick}
            {...handlers}
            initial="initial"
            animate="animate"
            exit="exit"
            variants={{
              initial: { clipPath: "inset(100% 0% 0% 0%)" },
              animate: {
                clipPath: "inset(0% 0% 0% 0%)",
                transition: {
                  ease: [0.24, 0.43, 0.15, 0.97],
                  duration: 0.8,
                },
              },
            }}
            className="fixed top-0 z-[100] grid h-[100svh] w-full cursor-pointer place-items-center bg-[#1a1a1a] px-3-75"
          >
            <button
              ref={closeButtonRef}
              type="button"
              onClick={handleClick}
              className="absolute right-5 top-5 z-10 min-h-11 rounded-full border border-white/30 bg-black/30 px-4 text-xs uppercase tracking-[0.14em] text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              Kapat
            </button>
            <div
              className="flex h-auto w-full flex-col md:w-[140vh]"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="flex-1">
                <video
                  ref={videoRef}
                  tabIndex={0}
                  width="100%"
                  height="100%"
                  autoPlay={!reduceMotion}
                  controls
                  playsInline
                  preload="metadata"
                  poster="/Hero/elementis-posterjpg.png"
                  aria-label="Yaşama Sanatı tanıtım filmi oynatıcısı"
                >
                  <source src="/Hero/elementis-fullmp4.mp4" type="video/mp4" />
                </video>
              </div>
            </div>
          </motion.div>
      )}
    </>
  );
}
