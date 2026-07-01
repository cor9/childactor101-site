import type { ElementType, ReactNode } from "react";

export interface ContainerProps {
  as?: ElementType;
  children: ReactNode;
  className?: string;
  size?: "narrow" | "wide" | "full";
}

const sizeClasses = {
  narrow: "max-w-7xl",
  wide: "max-w-[1440px]",
  full: "max-w-none",
} as const;

export function Container({
  as,
  children,
  className = "",
  size = "wide",
}: ContainerProps) {
  const Component = as ?? "div";

  return (
    <Component className={`mx-auto w-full ${sizeClasses[size]} ${className}`}>
      {children}
    </Component>
  );
}
