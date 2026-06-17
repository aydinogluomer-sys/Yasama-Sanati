import { MotionProps } from "motion/react";
import * as motion from "motion/react-client";
type LogoFullProps = MotionProps & {
  className?: string;
};
export default function LogoFull({ className, ...props }: LogoFullProps) {
  return (
    <motion.div
      className={`${className} font-grotesque font-medium tracking-[0.22em] text-[16px] md:text-[20px] select-none`}
      {...props}
      style={{
        display: "inline-block",
        whiteSpace: "nowrap",
      }}
    >
      YAŞAMA SANATI
    </motion.div>
  );
}
