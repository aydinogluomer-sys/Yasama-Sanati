"use client";
import {
  motion,
  MotionValue,
  useMotionTemplate,
  useTransform,
} from "motion/react";
import { ReactNode } from "react";

interface CardImageProps {
  index: number;
  scrollYProgress: MotionValue<number>;
  children: ReactNode;
}
export default function ClipImageContainer({
  index,
  scrollYProgress,
  children,
}: CardImageProps) {
  const start = index * 0.25;
  const bottom = useTransform(scrollYProgress, [start, start + 0.25], ["0%", "100%"]);
  // settle: the image eases from a slight zoom to rest as it becomes the active card
  const scale = useTransform(scrollYProgress, [(index - 1) * 0.25, start], [1.04, 1]);
  // gentle crossfade with the card below during the final part of the clip wipe
  const opacity = useTransform(
    scrollYProgress,
    [start + 0.17, start + 0.25],
    [1, 0.45],
  );
  const clipPath = useMotionTemplate`inset(0px 0px ${bottom} 0px)`;
  return (
    <motion.div
      className="absolute inset-0"
      style={{ clipPath, zIndex: -index, scale, opacity }}
    >
      {children}
    </motion.div>
  );
}
