import cn from "@/utils/cn";
import * as motion from "motion/react-client";
import { MotionProps, MotionStyle } from "motion/react";
import React, { PropsWithChildren } from "react";
import { easing, duration } from "@/utils/motion/tokens";

type DashedLinkProps = PropsWithChildren &
  MotionProps & {
    style?: MotionStyle;
    className?: string;
  };
export default function DashedLink({
  children,
  className,
  style,
  ...motionProps
}: DashedLinkProps) {
  return (
    // <Link href={href}>
    <motion.div className="" {...motionProps}>
      <motion.div
        initial="initial"
        whileHover="hover"
        className={cn("relative [line-height:1.2]", className)}
        style={{ ...style }}
      >
        {children}
        <motion.div
          className="animated-underline absolute bottom-0 h-[1px] bg-black"
          variants={{
            initial: { width: "0%", right: "0px", left: "auto" },
            hover: { width: "100%", left: "0px", right: "auto" },
          }}
          transition={{
            left: {
              duration: 0,
            },
            right: {
              duration: 0,
            },
            default: {
              ease: easing.editorial,
              duration: duration.section,
            },
          }}
        />
      </motion.div>
    </motion.div>
    // </Link>
  );
}
