"use client";
import MaskText from "../Server/MaskText";
import cn from "@/utils/cn";
import { CSSProperties, ReactNode } from "react";

interface ResponsiveMaskTextVariantProps {
  mobile: ReactNode[];
  desktop: ReactNode[];
  className?: string;
  style?: CSSProperties;
}
export default function ResponsiveMaskTextVariant({
  desktop,
  mobile,
  className,
  style,
}: ResponsiveMaskTextVariantProps) {
  const textClassName = cn(
    "font-light text-nowrap text-[#D1CCBF] [&_span]:text-[#ca7d57]",
    className,
  );
  return (
    <>
      <div className="md:hidden">
        <MaskText lines={mobile} className={textClassName} style={style} />
      </div>
      <div className="hidden md:block">
        <MaskText lines={desktop} className={textClassName} style={style} />
      </div>
    </>
  );
}
