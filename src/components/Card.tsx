type CardProps = {
  children: React.ReactNode;
  className?: string;
  tone?: "paper" | "chalkboard" | "warm";
};

const toneClasses = {
  paper: "border border-chalkboard/10 bg-white text-ink shadow-soft",
  chalkboard: "border border-chalk/10 bg-chalkboard text-chalk shadow-soft",
  warm: "border border-chalkboard/10 bg-paper-warm text-ink shadow-soft",
} as const;

export function Card({ children, className = "", tone = "paper" }: CardProps) {
  return (
    <div className={`rounded-[28px] p-6 sm:p-8 ${toneClasses[tone]} ${className}`}>
      {children}
    </div>
  );
}
