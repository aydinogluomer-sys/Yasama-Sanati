import type { ReactNode } from "react";
import cn from "@/utils/cn";

/**
 * Kisthe accent / human-signature voice (Phase 2 ref 03): logo, footer signature, single-word
 * emphasis, hero/manifesto accent word. Accent only — never body, navigation, forms or long
 * headings. Until a licensed Kisthe woff2 is supplied, `--font-kisthe` falls back to the serif
 * italic (see docs/decisions.md D035); swap the token to use the real face with no markup changes.
 */
export default function SignatureWordmark({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <span className={cn("font-kisthe", className)}>{children}</span>;
}
