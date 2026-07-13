"use client";
import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "motion/react";
import useMountedReducedMotion from "@/hooks/useMountedReducedMotion";
import MeridianDrawPath from "@/components/Client/MeridianDrawPath";
import cn from "@/utils/cn";

interface SectionSeamProps {
  /** top colour — should match the previous section's edge. */
  from: string;
  /** bottom colour — should match the next section's edge. */
  to: string;
  /** seam band height utility (compact mode only). */
  className?: string;
  /** wash tint that sweeps through the seam (default warm copper). */
  wash?: string;
  /** incoming section's chapter index (only when that section itself shows one, e.g. "02"). */
  index?: string;
  /** incoming section's kicker label — presence upgrades the seam to a full Breathing Thread stage. */
  label?: string;
}

/** 50/50 hex blend, used to route dark↔light transitions through a warmed sage midtone. */
function mix(a: string, b: string): string {
  const pa = a.replace("#", "");
  const pb = b.replace("#", "");
  const c = (i: number) =>
    Math.round((parseInt(pa.slice(i, i + 2), 16) + parseInt(pb.slice(i, i + 2), 16)) / 2)
      .toString(16)
      .padStart(2, "0");
  return `#${c(0)}${c(2)}${c(4)}`;
}

function luminance(hex: string): number {
  const p = hex.replace("#", "");
  return (
    0.2126 * parseInt(p.slice(0, 2), 16) +
    0.7152 * parseInt(p.slice(2, 4), 16) +
    0.0722 * parseInt(p.slice(4, 6), 16)
  );
}

/** Warmed sage bridge — keeps the green family alive through the blend so deep↔cream
 *  transitions never collapse into the muddy neutral grey of a naive two-stop gradient. */
const SAGE_BRIDGE = "#8F947C";

function seamGradient(from: string, to: string): string {
  const crossesTone = Math.abs(luminance(from) - luminance(to)) > 90;
  if (!crossesTone) return `linear-gradient(to bottom, ${from}, ${to})`;
  const upper = mix(from, SAGE_BRIDGE);
  const lower = mix(to, SAGE_BRIDGE);
  return `linear-gradient(to bottom, ${from} 0%, ${upper} 36%, ${lower} 64%, ${to} 100%)`;
}

/**
 * Section seam v2 — "Breathing Thread". With a `label`, the seam becomes a composed transition
 * stage: the copper meridian thread draws through it toward a breathing node at the centre while
 * the incoming section's kicker fades up early (a hand-off between chapters). Dark↔light blends
 * route through a warmed sage midtone instead of neutral grey. Without a `label` it stays the
 * original compact ambient band. Reduced motion: static blend, thread pre-drawn, no pulse.
 */
export default function SectionSeam({
  from,
  to,
  className,
  wash = "rgba(201,135,91,0.14)",
  index,
  label,
}: SectionSeamProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useMountedReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-70%", "170%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0]);
  const thread = useTransform(scrollYProgress, [0.08, 0.72], [0, 1]);
  const kickerOpacity = useTransform(scrollYProgress, [0.3, 0.55], [0, 1]);
  const kickerY = useTransform(scrollYProgress, [0.3, 0.55], [26, 0]);

  // The thread SVG, breath node and wash are the expensive half of a seam. Mounting seven of them
  // at hydration cost ~700ms of main-thread time, so they are gated on proximity: a seam only
  // builds its scene when it is about to be seen, and tears it down again once it is far away.
  const near = useInView(ref, { margin: "60% 0px 60% 0px" });

  const stage = Boolean(label);
  // Kicker sits on whichever half of the blend it will be read against; pick tone by destination.
  const dark = luminance(to) < 128;

  return (
    <div
      ref={ref}
      aria-hidden
      className={cn(
        "relative w-full overflow-hidden",
        stage ? "min-h-[44vh] md:min-h-[56vh]" : (className ?? "h-24 md:h-40"),
        className && stage ? className : undefined,
      )}
      style={{ background: seamGradient(from, to) }}
    >
      {!reduce && near && (
        <motion.div
          className="absolute inset-x-0 h-2/3"
          style={{
            y,
            opacity,
            background: `linear-gradient(to bottom, transparent, ${wash}, transparent)`,
          }}
        />
      )}

      {stage && near && (
        <>
          {/* Thread: curls in from the right gutter (where the fixed ScrollMeridian lives),
              dips to the centre node, and exits back toward the gutter. */}
          <div className="absolute inset-0">
            <MeridianDrawPath
              progress={reduce ? undefined : thread}
              breathe={false}
              className="h-full w-full"
              viewBox="0 0 1000 560"
              d="M965 -10 C 950 120, 700 180, 520 260 C 420 305, 460 360, 560 400 C 720 462, 940 470, 968 570"
              nodes={[{ cx: 520, cy: 300 }]}
              strokeWidth={1.3}
            />
          </div>

          {/* Breathing node — same 4.8s breath language as the hero ring. */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <span className="relative flex size-10 items-center justify-center md:size-12">
              <span
                className="absolute inset-0 rounded-full border border-[#C9875B]/45 motion-safe:animate-[breath_4.8s_ease-in-out_infinite]"
              />
              <span
                className="absolute inset-[5px] rounded-full border border-[#C9875B]/20 motion-safe:animate-[breath_4.8s_ease-in-out_infinite_-2.4s]"
              />
              <span className="size-1 rounded-full bg-[#E0A878]" />
            </span>
          </div>

          {/* Kicker hand-off: the incoming chapter announces itself inside the seam. */}
          <motion.div
            style={reduce ? undefined : { opacity: kickerOpacity, y: kickerY }}
            className={cn(
              "absolute left-1/2 top-1/2 mt-14 flex -translate-x-1/2 select-none items-center gap-4 md:mt-16",
              dark ? "text-[#D1CCBF]" : "text-[#2B3530]",
            )}
          >
            {index && (
              <span
                className={cn(
                  "font-mono text-[0.95rem] leading-none tracking-[0.06em] tabular-nums",
                  dark ? "text-[#C9875B]" : "text-[#A85F33]",
                )}
              >
                {index}
              </span>
            )}
            <span aria-hidden className="h-px w-10 shrink-0 bg-current opacity-40 md:w-14" />
            <span className="whitespace-nowrap text-kicker font-medium uppercase tracking-[0.32em]">
              {label}
            </span>
          </motion.div>
        </>
      )}
    </div>
  );
}
