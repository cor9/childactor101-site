import type { ReactNode } from "react";

export interface CardProps {
  children: ReactNode;
  className?: string;
  tone?: "paper" | "chalkboard" | "warm";
}

const toneClasses = {
  paper: "border border-[#ece2d0] bg-white text-ink shadow-[var(--shadow-paper)]",
  chalkboard:
    "border border-white/10 bg-[linear-gradient(180deg,rgba(34,54,44,0.94),rgba(20,39,31,0.98))] text-chalk shadow-[var(--shadow-board)]",
  warm: "border border-[#eadfc8] bg-paper-warm text-ink shadow-[var(--shadow-paper)]",
} as const;

export function Card({ children, className = "", tone = "paper" }: CardProps) {
  return (
    <div className={`rounded-[34px] p-6 sm:p-8 ${toneClasses[tone]} ${className}`}>
      {children}
    </div>
  );
}
