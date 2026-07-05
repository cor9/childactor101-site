import type { ReactNode } from "react";

import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { SectionLabel } from "@/components/SectionLabel";

const DEFAULT_SUBSCRIBE_URL = "https://childactor-101.eo.page/subscribe";

export interface NewsletterSignupProps {
  actionUrl?: string;
  ctaLabel: string;
  description: ReactNode;
  eyebrow?: ReactNode;
  href?: string;
  note?: ReactNode;
  title: ReactNode;
  variant?: "default" | "compact" | "panel";
}

function isExternalHref(href: string): boolean {
  return href.startsWith("http://") || href.startsWith("https://");
}

export function NewsletterSignup({
  actionUrl,
  ctaLabel,
  description,
  eyebrow,
  href,
  note,
  title,
  variant = "default",
}: NewsletterSignupProps) {
  const destination = actionUrl ?? href ?? DEFAULT_SUBSCRIBE_URL;
  const external = isExternalHref(destination);

  const config = {
    default: {
      cardClassName: "",
      descriptionClassName: "mt-4 text-lg leading-8 text-ink-soft",
      labelClassName: "",
      titleClassName: "mt-6 text-4xl leading-tight text-chalkboard sm:text-5xl",
      tone: "warm" as const,
      buttonVariant: "secondary" as const,
      noteClassName: "mt-5 text-sm leading-7 text-ink-soft",
    },
    compact: {
      cardClassName: "rounded-[28px] p-5 sm:p-6",
      descriptionClassName: "mt-3 text-sm leading-7 text-ink-soft",
      labelClassName: "",
      titleClassName: "mt-4 text-3xl leading-tight text-chalkboard",
      tone: "paper" as const,
      buttonVariant: "primary" as const,
      noteClassName: "mt-4 text-sm leading-7 text-ink-soft",
    },
    panel: {
      cardClassName: "border border-white/10",
      descriptionClassName: "mt-4 text-lg leading-8 text-chalk/74",
      labelClassName: "text-[#bcefdc]",
      titleClassName: "mt-6 text-4xl leading-tight text-white sm:text-5xl",
      tone: "chalkboard" as const,
      buttonVariant: "outlineLight" as const,
      noteClassName: "mt-5 text-sm leading-7 text-chalk/70",
    },
  }[variant];

  return (
    <Card className={config.cardClassName} tone={config.tone}>
      {eyebrow ? <SectionLabel className={config.labelClassName}>{eyebrow}</SectionLabel> : null}
      <h2 className={`font-display ${config.titleClassName}`}>{title}</h2>
      <p className={config.descriptionClassName}>{description}</p>
      {note ? <p className={config.noteClassName}>{note}</p> : null}
      <Button
        href={destination}
        className="mt-8 w-fit"
        rel={external ? "noreferrer" : undefined}
        target={external ? "_blank" : undefined}
        variant={config.buttonVariant}
      >
        {ctaLabel}
      </Button>
    </Card>
  );
}
