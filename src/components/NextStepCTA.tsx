import type { ReactNode } from "react";

import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { SectionLabel } from "@/components/SectionLabel";

export interface NextStepCTAProps {
  description: ReactNode;
  eyebrow?: ReactNode;
  primaryHref: string;
  primaryLabel: string;
  secondaryHref?: string;
  secondaryLabel?: string;
  title: ReactNode;
  variant?: "default" | "warm" | "dark" | "minimal";
}

export function NextStepCTA({
  description,
  eyebrow,
  primaryHref,
  primaryLabel,
  secondaryHref,
  secondaryLabel,
  title,
  variant = "default",
}: NextStepCTAProps) {
  const config = {
    default: {
      cardClassName: "bg-[linear-gradient(180deg,#fffdf8_0%,#f7efe0_100%)]",
      descriptionClassName: "mt-5 max-w-3xl text-lg leading-8 text-ink-soft",
      labelClassName: "",
      primaryVariant: "primary" as const,
      secondaryVariant: "secondary" as const,
      titleClassName: "mt-5 max-w-3xl text-4xl leading-tight text-chalkboard sm:text-5xl",
      tone: "paper" as const,
    },
    warm: {
      cardClassName: "",
      descriptionClassName: "mt-5 max-w-3xl text-lg leading-8 text-ink-soft",
      labelClassName: "",
      primaryVariant: "primary" as const,
      secondaryVariant: "secondary" as const,
      titleClassName: "mt-5 max-w-3xl text-4xl leading-tight text-chalkboard sm:text-5xl",
      tone: "warm" as const,
    },
    dark: {
      cardClassName: "border border-white/10",
      descriptionClassName: "mt-5 max-w-3xl text-lg leading-8 text-chalk/76",
      labelClassName: "text-[#bcefdc]",
      primaryVariant: "primary" as const,
      secondaryVariant: "outlineLight" as const,
      titleClassName: "mt-5 max-w-3xl text-4xl leading-tight text-white sm:text-5xl",
      tone: "chalkboard" as const,
    },
    minimal: {
      cardClassName: "border border-[#e7dcc7] bg-white shadow-soft",
      descriptionClassName: "mt-4 max-w-3xl text-lg leading-8 text-ink-soft",
      labelClassName: "",
      primaryVariant: "primary" as const,
      secondaryVariant: "ghost" as const,
      titleClassName: "mt-4 max-w-3xl text-3xl leading-tight text-chalkboard sm:text-4xl",
      tone: "paper" as const,
    },
  }[variant];

  return (
    <Card className={`relative overflow-hidden ${config.cardClassName}`} tone={config.tone}>
      {eyebrow ? <SectionLabel className={config.labelClassName}>{eyebrow}</SectionLabel> : null}
      <h2 className={`font-display ${config.titleClassName}`}>{title}</h2>
      <p className={config.descriptionClassName}>{description}</p>
      <div className="mt-8 flex flex-col gap-4 sm:flex-row">
        <Button href={primaryHref} size="lg" variant={config.primaryVariant}>
          {primaryLabel}
        </Button>
        {secondaryHref && secondaryLabel ? (
          <Button href={secondaryHref} size="lg" variant={config.secondaryVariant}>
            {secondaryLabel}
          </Button>
        ) : null}
      </div>
    </Card>
  );
}
