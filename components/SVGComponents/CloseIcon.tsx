import * as motion from "motion/react-client";
import { easing, duration } from "@/utils/motion/tokens";
export default function CloseIcon({ className }: { className?: string }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
      className={className}
    >
      <motion.path
        style={{
          strokeDasharray: `16.98 10`, //Math.sqrt(2) * 12
        }}
        variants={{
          initial: {
            strokeDashoffset: 0,
          },
          whileHover: {
            strokeDashoffset: -1 * (16.98 + 10),
          },
        }}
        transition={{
          ease: easing.editorial,
          duration: duration.section,
        }}
        d="M13 1L1 13"
        stroke="#2b3530"
        fill="none"
      ></motion.path>
      <motion.path
        style={{
          strokeDasharray: `16.98 10`, //Math.sqrt(2) * 12
        }}
        variants={{
          initial: {
            strokeDashoffset: 0,
          },
          whileHover: {
            strokeDashoffset: -1 * (16.98 + 10),
          },
        }}
        transition={{
          ease: easing.editorial,
          duration: duration.section,
          delay: 0.15,
        }}
        d="M1 1L13 13"
        stroke="#2b3530"
        fill="none"
      ></motion.path>
    </svg>
  );
}
