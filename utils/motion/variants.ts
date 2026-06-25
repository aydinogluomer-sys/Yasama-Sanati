/**
 * Reusable Motion variants built on the central tokens.
 * Keep motion logic here so components stay declarative and consistent.
 */
import type { Variants } from "motion/react";
import { easing, duration, stagger } from "./tokens";

/** Line-by-line mask reveal (matches the existing MaskText feel). */
export const lineReveal: Variants = {
  initial: { y: "110%", clipPath: "inset(0% 0% 100% 0%)" },
  inView: {
    y: "0%",
    clipPath: "inset(0% 0% 0% 0%)",
    transition: { ease: easing.editorial, duration: duration.textLine },
  },
};

/** Container that staggers child line reveals. */
export const lineRevealGroup: Variants = {
  initial: {},
  inView: { transition: { staggerChildren: stagger.line } },
};

/** Word-level mask reveal for responsive text systems. */
export const wordReveal: Variants = {
  initial: { y: "120%" },
  inView: {
    y: "0%",
    transition: { ease: easing.editorial, duration: duration.textLine },
  },
};

export const wordRevealGroup: Variants = {
  initial: {},
  inView: { transition: { staggerChildren: stagger.word } },
};

/** Soft fade + lift for blocks, images, CTAs. */
export const fadeLift: Variants = {
  initial: { opacity: 0, y: 28 },
  inView: {
    opacity: 1,
    y: 0,
    transition: { ease: easing.softOut, duration: duration.section },
  },
};

/** Standard in-view viewport config: play once, a little before fully on screen. */
export const onceInView = { once: true, margin: "0px 0px -12% 0px" } as const;
