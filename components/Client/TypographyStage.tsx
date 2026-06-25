"use client";
import { Fragment } from "react";
import { motion, type Variants } from "motion/react";
import { easing, duration, stagger } from "@/utils/motion/tokens";
import cn from "@/utils/cn";

type Segment = { text: string; accent?: boolean };

/**
 * Katya Yumasheva editorial staging (Phase 2 ref 05) — large confident serif, generous whitespace,
 * selected-word emphasis. Behaviour, not a font: solid serif is the readable message, accent
 * segments lift to the Kisthe signature voice. Word-level masked reveal → responsive-safe + SSR-safe;
 * reduced motion collapses to the final state via the layout MotionConfig.
 */
export default function TypographyStage({
  segments,
  className,
}: {
  segments: Segment[];
  className?: string;
}) {
  // Flatten into words, each carrying its accent flag, so wrapping stays natural at any width.
  const words = segments.flatMap((seg) =>
    seg.text
      .split(/\s+/)
      .filter(Boolean)
      .map((w) => ({ w, accent: !!seg.accent })),
  );

  const wordVariant: Variants = {
    hidden: { y: "115%" },
    show: (i: number) => ({
      y: "0%",
      transition: {
        ease: easing.editorial,
        duration: duration.textLine,
        delay: Math.min(i * stagger.word, 0.9),
      },
    }),
  };

  return (
    <motion.p
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      className={cn(
        "font-serif text-[28px] sm:text-[36px] md:text-[46px] lg:text-[54px] xl:text-[60px] font-normal leading-[1.1] tracking-[-0.02em] text-[#F4EFE4]",
        className,
      )}
    >
      {words.map((t, i) => (
        <Fragment key={i}>
          <span className="inline-block -mb-[0.14em] overflow-hidden pb-[0.14em] align-bottom">
            <motion.span
              custom={i}
              variants={wordVariant}
              className={cn("inline-block", t.accent && "font-kisthe italic text-[#E0A878]")}
            >
              {t.w}
            </motion.span>
          </span>{" "}
        </Fragment>
      ))}
    </motion.p>
  );
}
