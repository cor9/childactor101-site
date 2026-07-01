import type { ReactNode } from "react";

import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { SectionHeader } from "@/components/ui/SectionHeader";

export interface CTAProps {
  actionHref: string;
  actionIcon?: ReactNode;
  actionLabel: string;
  description: string;
  label?: string;
  title: string;
}

export function CTA({
  actionHref,
  actionIcon,
  actionLabel,
  description,
  label,
  title,
}: CTAProps) {
  return (
    <Card tone="warm">
      <SectionHeader
        description={description}
        descriptionClassName="mt-4 text-lg leading-8 text-ink-soft"
        label={label}
        title={title}
        titleClassName="mt-6 text-chalkboard lg:text-5xl"
      />
      <Button href={actionHref} className="mt-8 w-fit">
        {actionLabel}
        {actionIcon}
      </Button>
    </Card>
  );
}
