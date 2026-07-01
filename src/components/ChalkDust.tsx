type ChalkDustProps = {
  className?: string;
};

export function ChalkDust({ className = "" }: ChalkDustProps) {
  return (
    <div className={`pointer-events-none absolute inset-0 ${className}`} aria-hidden="true">
      <div className="absolute inset-0 opacity-18 [background-image:radial-gradient(circle_at_16%_18%,rgba(255,255,255,0.16),transparent_22%),radial-gradient(circle_at_84%_18%,rgba(255,255,255,0.14),transparent_18%),radial-gradient(circle_at_26%_72%,rgba(255,255,255,0.12),transparent_24%),radial-gradient(circle_at_74%_76%,rgba(255,255,255,0.1),transparent_20%)] blur-2xl" />
      <div className="absolute inset-0 opacity-10 [background-image:radial-gradient(circle_at_1px_1px,rgba(248,244,232,0.85)_1px,transparent_0)] [background-size:18px_18px]" />
    </div>
  );
}
