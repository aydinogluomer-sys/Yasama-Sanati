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
      <div className="flex cursor-default md:flex-col">
        <DashedLink>merhaba@yasamasanati.com</DashedLink>
        <div className="md:hidden">|</div>
        <DashedLink>+90 232 000 0000</DashedLink>
      </div>
    </div>
  );
}
