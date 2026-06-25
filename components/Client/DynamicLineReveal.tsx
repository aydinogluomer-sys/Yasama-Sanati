"use client";
import { Fragment } from "react";
import { motion, type Variants } from "motion/react";
import { easing, duration, stagger } from "@/utils/motion/tokens";
import cn from "@/utils/cn";

interface DynamicLineRevealProps {
  /** Plain text. Wraps and reflows naturally; the reveal is word-level so it is responsive-safe. */
  text: string;
  /** Optional substring rendered in the accent colour. */
  highlight?: string;
  className?: string;
  accentClassName?: string;
  as?: "p" | "h2" | "span";
  /** seconds before the first word reveals */
  delay?: number;
  /** cap on the cumulative per-word stagger so long paragraphs do not drag */
  maxStagger?: number;
}

type Token = { w: string; accent: boolean };

function tokenize(text: string, highlight?: string): Token[] {
  const toWords = (s: string, accent: boolean): Token[] =>
    s
      .split(/\s+/)
      .filter(Boolean)
      .map((w) => ({ w, accent }));
  if (!highlight) return toWords(text, false);
  const idx = text.indexOf(highlight);
  if (idx === -1) return toWords(text, false);
  return [
    ...toWords(text.slice(0, idx), false),
    ...toWords(highlight, true),
    ...toWords(text.slice(idx + highlight.length), false),
  ];
}

/**
 * Word-level masked reveal. Chosen over manual line arrays / ResizeObserver line-grouping because
 * it is responsive by construction (each word owns its clip + rises from its own baseline), produces
 * no hydration mismatch (markup is deterministic from `text`), needs no resize recompute, and reduced
 * motion is handled globally by the layout MotionConfig (transforms collapse to the final state).
 */
export default function DynamicLineReveal({
  text,
  highlight,
  className,
  accentClassName = "text-[#C9875B]",
  as = "p",
  delay = 0,
  maxStagger = 0.9,
}: DynamicLineRevealProps) {
  const tokens = tokenize(text, highlight);

  const wordVariant: Variants = {
    hidden: { y: "110%" },
    show: (i: number) => ({
      y: "0%",
      transition: {
        ease: easing.editorial,
        duration: duration.textLine,
        delay: delay + Math.min(i * stagger.word, maxStagger),
      },
    }),
  };

  const Tag = as === "h2" ? motion.h2 : as === "span" ? motion.span : motion.p;

  return (
    <Tag
      className={cn(className)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
    >
      {tokens.map((t, i) => (
        <Fragment key={i}>
          <span className="inline-block -mb-[0.14em] overflow-hidden pb-[0.14em] align-bottom">
            <motion.span
              custom={i}
              variants={wordVariant}
              className={cn("inline-block", t.accent && accentClassName)}
            >
              {t.w}
            </motion.span>
          </span>{" "}
        </Fragment>
      ))}
    </Tag>
  );
}
