import cn from "@/utils/cn";

interface LabelProps {
  label: string;
  children: React.ReactNode;
  className?: string;
}

const Label = ({ label, children, className }: LabelProps) => (
  <label
    className={cn(
      "flex flex-col gap-3 font-mono text-3xs tracking-[0.1em] uppercase [line-height:1] text-[#2b3530] md:text-2xs",
      className,
    )}
  >
    <span className="opacity-60">{label}</span> {children}
  </label>
);
export default Label;
