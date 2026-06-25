"use client";
import cn from "@/utils/cn";
import React, { ReactNode, useState } from "react";
import CheckBoxIcon from "../SVGComponents/CheckBoxIcon";

interface CheckboxProps {
  children: ReactNode;
  className?: string;
  required?: boolean;
  name?: string;
  value?: string;
}

export default function Checkbox({
  children,
  className,
  required = false,
  name,
  value,
}: CheckboxProps) {
  const [checked, setChecked] = useState(false);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(e.target.checked);
  };
  return (
    <label
      className={cn(
        "group flex min-h-11 cursor-pointer items-center gap-3 text-[#2b3530]",
        className,
      )}
    >
      <input
        type="checkbox"
        className="peer sr-only"
        name={name}
        value={value}
        checked={checked}
        onChange={handleChange}
        required={required}
      />
      <span
        className={cn(
          "grid size-5 shrink-0 place-items-center border border-[#2b3530] transition-colors peer-focus-visible:outline-2 peer-focus-visible:outline-offset-3 peer-focus-visible:outline-[var(--focus-ring)]",
          checked && "bg-[#2b3530]",
        )}
      >
        {checked && <CheckBoxIcon className="h-auto w-1-75" />}
      </span>
      <div className="text-sm leading-[1.25] md:text-base">{children}</div>
    </label>
  );
}
