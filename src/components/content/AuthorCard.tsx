import type { ReactNode } from "react";
import Image from "next/image";

import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Pill } from "@/components/ui/Pill";

export interface AuthorCardProps {
  ctaHref?: string;
  ctaIcon?: ReactNode;
  ctaLabel?: string;
  description: string;
  imageAlt: string;
  imageSrc: string;
  name: string;
  roles?: string[];
}

export function AuthorCard({
  ctaHref,
  ctaIcon,
  ctaLabel,
  description,
  imageAlt,
  imageSrc,
  name,
  roles = [],
}: AuthorCardProps) {
  return (
    <Card className="grid gap-6 md:grid-cols-[220px_1fr] md:items-center">
      <div className="overflow-hidden rounded-[28px]">
        <Image
          src={imageSrc}
          alt={imageAlt}
          width={440}
          height={550}
          className="aspect-[4/5] w-full object-cover"
        />
      </div>
      <div>
        <h3 className="font-display text-3xl text-chalkboard">{name}</h3>
        {roles.length > 0 ? (
          <div className="mt-4 flex flex-wrap gap-3">
            {roles.map((role) => (
              <Pill key={role} tone="paper">
                {role}
              </Pill>
            ))}
          </div>
        ) : null}
        <p className="mt-5 text-sm leading-7 text-ink-soft">{description}</p>
        {ctaHref && ctaLabel ? (
          <Button href={ctaHref} className="mt-6 w-fit" variant="secondary">
            {ctaLabel}
            {ctaIcon}
          </Button>
        ) : null}
      </div>
    </Card>
  );
}
