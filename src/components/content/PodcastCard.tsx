import type { ReactNode } from "react";

import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Pill } from "@/components/ui/Pill";

export interface PodcastCardProps {
  ctaHref: string;
  ctaLabel: string;
  description: string;
  icon?: ReactNode;
  label?: string;
  title: string;
}

export function PodcastCard({
  ctaHref,
  ctaLabel,
  description,
  icon,
  label,
  title,
}: PodcastCardProps) {
  return (
    <Card className="flex h-full flex-col">
      {label ? (
        <Pill className="w-fit px-4 py-2 text-xs uppercase tracking-[0.22em]" tone="light">
          {label}
        </Pill>
      ) : null}
      <h3 className="mt-5 font-display text-2xl text-chalkboard">{title}</h3>
      <p className="mt-3 flex-1 text-sm leading-7 text-ink-soft">{description}</p>
      <Button href={ctaHref} className="mt-6 w-fit" variant="secondary">
        {ctaLabel}
        {icon}
      </Button>
    </Card>
  );
}
