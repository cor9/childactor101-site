import Link from "next/link";

type ButtonProps = {
  children: React.ReactNode;
  className?: string;
  href: string;
  rel?: string;
  size?: "sm" | "md" | "lg";
  target?: string;
  variant?: "primary" | "secondary" | "chalk" | "outlineLight" | "ghost";
};

const variantClasses = {
  primary:
    "bg-[linear-gradient(180deg,#b58bf8_0%,#9568ec_100%)] text-white shadow-[0_18px_32px_rgba(149,104,236,0.34)] hover:-translate-y-0.5 hover:brightness-105",
  secondary:
    "border border-[#e7dcc7] bg-white text-chalkboard shadow-[0_12px_28px_rgba(23,56,43,0.09)] hover:-translate-y-0.5 hover:bg-paper-warm",
  chalk:
    "bg-[linear-gradient(180deg,#3d845a_0%,#2f704d_100%)] text-white shadow-[0_18px_34px_rgba(35,79,59,0.28)] hover:-translate-y-0.5 hover:brightness-105",
  outlineLight:
    "border border-[#596f62] bg-[#22382d]/35 text-white shadow-none hover:-translate-y-0.5 hover:border-[#b8ead8] hover:bg-[#284236]/60",
  ghost:
    "bg-transparent text-ink shadow-none hover:-translate-y-0.5 hover:text-chalkboard",
} as const;

const sizeClasses = {
  sm: "px-5 py-2.5 text-sm",
  md: "px-6 py-3.5 text-sm sm:text-base",
  lg: "px-7 py-4 text-base",
} as const;

export function Button({
  children,
  className = "",
  href,
  rel,
  size = "md",
  target,
  variant = "primary",
}: ButtonProps) {
  return (
    <Link
      href={href}
      rel={rel}
      target={target}
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
