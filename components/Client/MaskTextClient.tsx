"use client";
import cn from "@/utils/cn";
import { AnimatePresence, motion } from "motion/react";
import { CSSProperties, ReactNode, useEffect, useRef } from "react";
import { easing } from "@/utils/motion/tokens";

interface MaskTextClientProps {
  lines: ReactNode[];
  className?: string;
  style?: CSSProperties;
  state: number;
  /** stagger this block relative to its siblings (index → title → description cascade). */
  delay?: number;
}
export default function MaskTextClient({
  state,
  lines,
  delay = 0,
  ...rest
}: MaskTextClientProps) {
  const currentState = useRef(state);

  useEffect(() => {
    currentState.current = state;
  }, [state]);

  const containerVariants = {
    animate: {
      transition: {
        staggerChildren: 0.05,
        delayChildren: delay,
        staggerDirection: state > currentState.current ? 1 : -1,
      },
    },
  };

  const childVariants = {
    initial: {
      y: state > currentState.current ? "100%" : "-100%",
      clipPath:
        state > currentState.current
          ? "inset(0% 0% 100% 0%)"
          : "inset(100% 0% 0% 0%)",
    },
    animate: {
      y: "0%",
      clipPath: "inset(0% 0% 0% 0%)",
      transition: {
        ease: easing.editorial,
        duration: 0.55,
      },
    },
    exit: (custom: boolean) => ({
      y: custom ? "-100%" : "100%",
      clipPath: custom ? "inset(100% 0% 0% 0%)" : "inset(0% 0% 100% 0%)",
      transition: {
        ease: easing.editorial,
        duration: 0.32,
      },
    }),
  };
  return (
    <>
      <AnimatePresence mode="wait" custom={state > currentState.current}>
        <motion.div
          key={state}
          initial="initial"
          animate="animate"
          exit="exit"
          className={cn("text-center whitespace-nowrap", rest.className)}
          style={{ ...rest.style }}
          variants={containerVariants}
        >
          {lines.map((eachLine, index) => (
            <motion.div key={index + 1} variants={childVariants}>
              {eachLine}
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>
    </>
  );
}
