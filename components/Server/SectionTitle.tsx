import { CSSProperties } from "react";
import BurgerSVG from "../SVGComponents/BurgerSVG";
import cn from "@/utils/cn";

interface SectionTitleProps {
  children: string;
  className?: string;
  style?: CSSProperties;
}
/**
 * Names the section it sits in, so it is that section's heading. Şifa Yolculuğu is the longest
 * stretch of the landing page and used to carry no heading at all, leaving it invisible to
 * heading navigation.
 */
export default function SectionTitle({
  children,
  className,
  style,
}: SectionTitleProps) {
  return (
    <h2
      style={{ ...style }}
      className={cn("flex h-fit items-center gap-5", className)}
    >
      <span aria-hidden className="flex">
        <BurgerSVG />
      </span>
      <div className="text-base [line-height:1] md:text-xl">{children}</div>
    </h2>
  );
}
