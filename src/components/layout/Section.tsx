import type { ReactNode } from "react";

export interface SectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
}

export function Section({ children, className = "", id }: SectionProps) {
  return (
    <section className={className} id={id}>
      {children}
    </section>
  );
}
