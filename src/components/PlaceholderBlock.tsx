type PlaceholderBlockProps = {
  aspectClassName?: string;
  className?: string;
  subtitle: string;
  title: string;
  tone?: "dark" | "light";
};

const toneClasses = {
  dark:
    "border border-chalk/10 bg-[radial-gradient(circle_at_top,_rgba(248,244,232,0.16),transparent_45%)] text-chalk",
  light:
    "border border-dashed border-chalkboard/18 bg-white/60 text-chalkboard",
} as const;

export function PlaceholderBlock({
  aspectClassName = "aspect-[4/3]",
  className = "",
  subtitle,
  title,
  tone = "light",
}: PlaceholderBlockProps) {
  return (
    <div
      className={`flex items-center justify-center rounded-[24px] ${aspectClassName} ${toneClasses[tone]} ${className}`}
    >
      <div className="px-6 text-center">
        <p className="font-display text-3xl">{title}</p>
        <p className="mt-2 text-xs uppercase tracking-[0.18em] opacity-70">
          {subtitle}
        </p>
      </div>
    </div>
  );
}
