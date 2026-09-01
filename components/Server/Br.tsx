import React from "react";
import * as motion from "motion/react-client";
import { easing, duration } from "@/utils/motion/tokens";
const Br = () => (
  <svg
    className="absolute inset-x-0 top-0"
    width="100%"
    height="100%"
    viewBox="0 0 100 100"
    preserveAspectRatio="none"
  >
    <motion.path
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{
        duration: duration.ui,
        delay: 0.2,
        ease: easing.editorial,
      }}
      d="M0 0H100"
      stroke="#ffffff75"
      strokeWidth="2px"
    />
  </svg>
);

export default Br;
