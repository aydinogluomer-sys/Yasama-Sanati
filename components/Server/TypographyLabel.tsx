import type { ReactNode } from "react";
import cn from "@/utils/cn";

/**
 * Space Mono micro-label (Phase 2 ref 04): 01/02 indices, dates, coordinates, scroll cues,
 * program indices, small metadata. Micro use only — never headings, body or logo.
 */
export default function TypographyLabel({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "font-mono text-[0.72rem] uppercase tracking-[0.18em] tabular-nums",
        className,
      )}
    >
      {children}
    </span>
  );
}
