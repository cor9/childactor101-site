import Link from "next/link";

type ButtonProps = {
  children: React.ReactNode;
  className?: string;
  href: string;
  size?: "sm" | "md" | "lg";
  variant?: "primary" | "secondary" | "ghost";
};

const variantClasses = {
  primary:
    "bg-purple text-chalk shadow-soft hover:-translate-y-0.5 hover:bg-purple-deep",
  secondary:
    "border border-chalkboard/15 bg-paper text-chalkboard shadow-soft hover:-translate-y-0.5 hover:border-chalkboard/30 hover:bg-paper-warm",
  ghost:
    "bg-transparent text-ink shadow-none hover:-translate-y-0.5 hover:text-chalkboard",
} as const;

const sizeClasses = {
  sm: "px-4 py-2 text-sm",
  md: "px-5 py-3 text-sm sm:text-base",
  lg: "px-6 py-3.5 text-base",
} as const;

export function Button({
  children,
  className = "",
  href,
  size = "md",
  variant = "primary",
}: ButtonProps) {
  return (
    <Link
      href={href}
      className={[
        "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple",
        variantClasses[variant],
        sizeClasses[size],
        className,
      ].join(" ")}
    >
      {children}
    </Link>
  );
}
