import * as motion from "motion/react-client";
import Link from "next/link";
import cn from "@/utils/cn";
import SocialLogos from "@/components/SVGComponents/socials";
import { CSSProperties } from "react";

interface StayConnectedProps {
  className?: string;
  style?: CSSProperties;
}

export default function StayConnected({
  className,
  style,
}: StayConnectedProps) {
  return (
    <nav
      style={{ ...style }}
      aria-label="Social Navigation"
      className={cn("flex flex-col", className)}
    >
      <div>Takipte Kalın</div>
      <div className="flex items-center">
        {SocialLogos.map((eachSocial) => (
          <Link
            href={eachSocial.href}
            key={eachSocial.key}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={eachSocial.label}
            className="grid min-h-11 min-w-11 place-items-center rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)]"
          >
            <motion.div
              className="cursor-pointer [&>svg]:size-4 md:[&>svg]:size-7"
              initial={{ opacity: 1 }}
              whileHover={{ opacity: 0.7 }}
              transition={{ ease: "easeInOut" }}
            >
              {eachSocial.logo}
            </motion.div>
          </Link>
        ))}
      </div>
    </nav>
  );
}
