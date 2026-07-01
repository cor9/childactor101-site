import type { ReactNode } from "react";

export interface PillProps {
  children: ReactNode;
  className?: string;
  tone?: "default" | "light" | "paper" | "outline" | "chalk";
}

const toneClasses = {
  default: "bg-white text-chalkboard shadow-[0_8px_20px_rgba(22,36,58,0.06)]",
  light: "bg-paper text-chalkboard shadow-soft",
  paper: "border border-[#ece1cc] bg-white text-chalkboard shadow-[0_8px_20px_rgba(22,36,58,0.06)]",
  outline: "border border-chalkboard/15 bg-transparent text-chalkboard",
  chalk: "border border-white/10 bg-white/10 text-white",
} as const;

export function Pill({
  children,
  className = "",
  tone = "default",
}: PillProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-5 py-3 text-sm font-medium ${toneClasses[tone]} ${className}`}
    >
      {children}
    </span>
  );
}
