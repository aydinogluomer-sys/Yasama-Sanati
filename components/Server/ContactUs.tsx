import React, { CSSProperties } from "react";
import DashedLink from "./DashedLink";
import cn from "@/utils/cn";

export default function ContactUs({
  className,
  style,
}: {
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <div
      style={style}
      className={cn("flex flex-col [line-height:1]", className)}
    >
      <div>Bize Ulaşın</div>
      <div className="flex md:flex-col">
        <a href="mailto:info@yasamasanati.com" className="w-fit focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)]">
          <DashedLink>info@yasamasanati.com</DashedLink>
        </a>
        <div className="md:hidden">|</div>
        <a href="tel:+905327893753" className="w-fit focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)]">
          <DashedLink>+90 532 789 37 53</DashedLink>
        </a>
      </div>
    </div>
  );
}
