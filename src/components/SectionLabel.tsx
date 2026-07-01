import type { ReactNode } from "react";

export interface SectionLabelProps {
  children: ReactNode;
  className?: string;
}

export function SectionLabel({ children, className = "" }: SectionLabelProps) {
  return (
    <span
      className={`inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.24em] text-purple-deep ${className}`}
    >
      {children}
    </span>
  );
}
