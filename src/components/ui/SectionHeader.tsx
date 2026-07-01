import type { ReactNode } from "react";

export interface SectionHeaderProps {
  align?: "left" | "center";
  className?: string;
  description?: ReactNode;
  descriptionClassName?: string;
  label?: ReactNode;
  labelClassName?: string;
  title: ReactNode;
  titleClassName?: string;
}

export function SectionHeader({
  align = "left",
  className = "",
  description,
  descriptionClassName = "",
  label,
  labelClassName = "",
  title,
  titleClassName = "",
}: SectionHeaderProps) {
  const alignmentClass = align === "center" ? "text-center" : "";
  const labelAlignmentClass = align === "center" ? "justify-center" : "";

  return (
    <header className={`${alignmentClass} ${className}`}>
      {label ? (
        <span
          className={`inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.24em] text-purple-deep ${labelAlignmentClass} ${labelClassName}`}
        >
          {label}
        </span>
      ) : null}
      <h2
        className={`font-display text-4xl leading-tight sm:text-5xl lg:text-[4rem] ${titleClassName}`}
      >
        {title}
      </h2>
      {description ? (
        <p className={`text-[1.45rem] leading-[1.7] ${descriptionClassName}`}>
          {description}
        </p>
      ) : null}
    </header>
  );
}
