type SectionLabelProps = {
  children: React.ReactNode;
};

export function SectionLabel({ children }: SectionLabelProps) {
  return (
    <span className="inline-flex rounded-full border border-chalkboard/15 bg-white/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-chalkboard shadow-soft">
      {children}
    </span>
  );
}
