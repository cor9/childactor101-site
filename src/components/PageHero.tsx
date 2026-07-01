import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { SectionLabel } from "@/components/SectionLabel";

type HeroAction = {
  href: string;
  label: string;
  icon?: React.ReactNode;
  rel?: string;
  target?: string;
  variant?: "primary" | "secondary" | "ghost";
};

type PageHeroProps = {
  children: React.ReactNode;
  description: string;
  label: string;
  primaryAction: HeroAction;
  secondaryAction?: HeroAction;
  supportingPoints?: string[];
  title: string;
};

export function PageHero({
  children,
  description,
  label,
  primaryAction,
  secondaryAction,
  supportingPoints = [],
  title,
}: PageHeroProps) {
  return (
    <section className="relative overflow-hidden px-4 pb-16 pt-12 sm:px-6 lg:px-8 lg:pb-20 lg:pt-16">
      <div className="absolute inset-x-0 top-0 h-[30rem] bg-[radial-gradient(circle_at_top_left,_rgba(244,201,93,0.22),_transparent_42%),radial-gradient(circle_at_top_right,_rgba(166,120,242,0.18),_transparent_30%)]" />
      <div className="mx-auto grid w-full max-w-7xl gap-8 lg:grid-cols-[1.02fr_0.98fr] lg:items-center">
        <div className="relative">
          <SectionLabel>{label}</SectionLabel>
          <h1 className="mt-6 max-w-4xl font-display text-5xl leading-[0.95] text-chalkboard sm:text-6xl lg:text-7xl">
            {title}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-ink-soft sm:text-xl">
            {description}
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Button href={primaryAction.href} size="lg" variant={primaryAction.variant}>
              {primaryAction.label}
              {primaryAction.icon}
            </Button>
            {secondaryAction ? (
              <Button
                href={secondaryAction.href}
                rel={secondaryAction.rel}
                size="lg"
                target={secondaryAction.target}
                variant={secondaryAction.variant ?? "secondary"}
              >
                {secondaryAction.label}
                {secondaryAction.icon}
              </Button>
            ) : null}
          </div>
          {supportingPoints.length > 0 ? (
            <div className="mt-10 grid gap-3 text-sm text-ink-soft sm:grid-cols-3">
              {supportingPoints.map((point) => (
                <p
                  key={point}
                  className="rounded-2xl border border-chalkboard/10 bg-white/80 px-4 py-3 shadow-soft"
                >
                  {point}
                </p>
              ))}
            </div>
          ) : null}
        </div>

        <Card
          className="relative overflow-hidden bg-[linear-gradient(160deg,#234F3B_0%,#17382B_100%)] text-chalk"
          tone="chalkboard"
        >
          <div className="absolute inset-0 opacity-20 [background-image:radial-gradient(circle_at_1px_1px,rgba(248,244,232,0.9)_1px,transparent_0)] [background-size:18px_18px]" />
          <div className="relative">{children}</div>
        </Card>
      </div>
    </section>
  );
}
