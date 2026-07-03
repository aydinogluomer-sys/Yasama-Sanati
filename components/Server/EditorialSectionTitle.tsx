import { CSSProperties, ReactNode } from "react";
import cn from "@/utils/cn";

interface EditorialSectionTitleProps {
  /** Two-digit section index rendered in serif italic, e.g. "01". Optional. */
  index?: string;
  children: string;
  className?: string;
  style?: CSSProperties;
  /** Surface tone the label sits on. */
  tone?: "light" | "dark";
  /**
   * Element to render. Defaults to "div" (decorative kicker). Pass a heading such as "h2" when
   * this label is the section's semantic heading. Default keeps all existing callers unchanged.
   */
  as?: "div" | "h2" | "h3";
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
  as = "div",
}: EditorialSectionTitleProps) {
  const containerClassName = cn(
    "flex select-none items-center gap-4",
    tone === "light" ? "text-[#D1CCBF]" : "text-[#2B3530]",
    className,
  );
  const inner: ReactNode = (
    <>
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
    </>
  );

  if (as === "h2") {
    return (
      <h2 style={style} className={containerClassName}>
        {inner}
      </h2>
    );
  }
  if (as === "h3") {
    return (
      <h3 style={style} className={containerClassName}>
        {inner}
      </h3>
    );
  }
  return (
    <div style={style} className={containerClassName}>
      {inner}
    </div>
  );
}
