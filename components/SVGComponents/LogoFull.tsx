import { MotionProps } from "motion/react";
import * as motion from "motion/react-client";

type LogoFullProps = MotionProps & {
  className?: string;
};

export default function LogoFull({ className, ...props }: LogoFullProps) {
  return (
    <motion.div
      className={`${className} flex items-center gap-2.5 md:gap-3 select-none`}
      {...props}
      style={{
        display: "inline-flex",
        alignItems: "center",
        whiteSpace: "nowrap",
      }}
    >
      {/* Premium Minimalist Sacred Geometry / Lotus Emblem */}
      <svg
        width="32"
        height="32"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-[calc(32*var(--multiplier))] h-[calc(32*var(--multiplier))] md:w-[calc(40*var(--multiplier))] md:h-[calc(40*var(--multiplier))] text-current flex-shrink-0"
      >
        {/* Outer delicate ring representing wholeness & connection */}
        <circle cx="12" cy="12" r="10.5" stroke="currentColor" strokeWidth="1.2" strokeDasharray="1.5 1.5" className="opacity-60" />
        
        {/* Inner solid delicate ring */}
        <circle cx="12" cy="12" r="7.5" stroke="currentColor" strokeWidth="0.8" className="opacity-35" />
        
        {/* Stylized organic meridian / lotus lines with copper accent highlight */}
        <path
          d="M12 4.5C10.2 8.8 10.2 12.2 12 18.5C13.8 12.2 13.8 8.8 12 4.5Z"
          stroke="currentColor"
          strokeWidth="1.3"
          fill="currentColor"
          fillOpacity="0.1"
          className="text-[#C9875B]"
        />
        <path
          d="M12 8C7.5 10.2 7.5 13.2 12 18.5C16.5 13.2 16.5 10.2 12 8Z"
          stroke="currentColor"
          strokeWidth="0.9"
          fill="currentColor"
          fillOpacity="0.05"
          className="opacity-55"
        />
        
        {/* Meridian center point in copper */}
        <circle cx="12" cy="12" r="1.25" fill="currentColor" className="text-[#C9875B]" />
      </svg>

      {/* Typography Block */}
      <div className="flex flex-col items-start justify-center leading-none">
        {/* "Yaşama Sanatı" in script/serif font */}
        <span className="font-kisthe italic font-normal tracking-[0.03em] text-24 md:text-30 text-current leading-tight">
          Yaşama Sanatı
        </span>
        {/* Small subtitle: "AKADEMİ" with tracked mono style */}
        <span className="font-mono text-[calc(9*var(--multiplier))] md:text-[calc(10.5*var(--multiplier))] tracking-[0.38em] uppercase opacity-75 text-current -mt-0.5 font-light">
          Akademi
        </span>
      </div>
    </motion.div>
  );
}
