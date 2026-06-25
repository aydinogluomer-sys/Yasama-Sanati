import { ComponentProps } from "react";
import cn from "@/utils/cn";

type InputProps = ComponentProps<"input"> & {
  className?: string;
};
export default function Input({ className, ...rest }: InputProps) {
  return (
    <input
      {...rest}
      className={cn(
        "min-h-12 w-full border-b border-[#677260] bg-[#c4c7b3] px-4 py-3 text-base text-[#2b3530] outline-none transition-colors placeholder:text-[#2b3530]/55 focus-visible:border-[#2b3530] focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)] focus-visible:ring-inset md:px-6",
        className,
      )}
    />
  );
}
