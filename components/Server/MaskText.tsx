import * as motion from "motion/react-client";
import { MotionProps } from "motion/react";
import React, { CSSProperties, ReactNode } from "react";
import cn from "@/utils/cn";
import { easing, duration, stagger } from "@/utils/motion/tokens";

interface MaskTextProps extends MotionProps {
  lines: ReactNode[];
  className?: string;
  style?: CSSProperties;
}

export default function MaskText({
  lines,
  className,
  style,
  ...motionProps
}: MaskTextProps) {
  const containerVariants = {
    inView: {
      transition: {
        staggerChildren: stagger.line,
        ...motionProps.transition,
      },
    },
  };
  const variants = {
    initial: { y: "100%", clipPath: "inset(0% 0% 100% 0%)" },
    inView: {
      y: "0%",
      clipPath: "inset(0% 0% 0% 0%)",
      transition: {
        ease: easing.editorial,
        duration: duration.textLine,
      },
    },
  };
  return (
    <motion.div
      initial="initial"
      whileInView="inView"
      variants={containerVariants}
      viewport={{ once: true }}
      style={{ ...style }}
      className={cn("", className)}
    >
      {lines.map((eachLine, index) => (
        <motion.div key={index + 1} variants={variants}>
          {eachLine}
        </motion.div>
      ))}
    </motion.div>
  );
}
