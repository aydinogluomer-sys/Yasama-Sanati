import { CSSProperties } from "react";
import cn from "@/utils/cn";

interface EditorialSectionTitleProps {
  /** Two-digit section index rendered in serif italic, e.g. "01". Optional. */
  index?: string;
  children: string;
  className?: string;
  style?: CSSProperties;
  /** Surface tone the label sits on. */
  tone?: "light" | "dark";
}

/**
 * Editorial section kicker: Space Mono index (Phase 2 micro-label voice) + thin rule + tracked
 * uppercase label. Gives each section an authored, magazine-like marker with quiet system
 * precision, without competing with the serif display mass.
 */
export default function EditorialSectionTitle({
  index,
  children,
  className,
  style,
  tone = "light",
}: EditorialSectionTitleProps) {
  return (
    <div
      style={style}
      className={cn(
        "flex select-none items-center gap-4",
        tone === "light" ? "text-[#D1CCBF]" : "text-[#2B3530]",
        className,
      )}
    >
      {index && (
        <span
          className={cn(
            "font-mono text-[0.95rem] leading-none tracking-[0.06em] tabular-nums md:text-[1.05rem]",
            tone === "dark" ? "text-[#A85F33]" : "text-[#C9875B]",
          )}
        >
          {index}
        </span>
      )}
      <span aria-hidden className="h-px w-10 shrink-0 bg-current opacity-40 md:w-16" />
      <span className="text-kicker font-medium uppercase tracking-[0.32em]">
        {children}
      </span>
    </div>
  );
}
