import Image from "next/image";
import type { ReactNode } from "react";

import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";
import { Pill } from "@/components/ui/Pill";
import { SectionHeader } from "@/components/ui/SectionHeader";

export interface MeetCoreyProps {
  ctaHref: string;
  ctaIcon?: ReactNode;
  ctaLabel: string;
  description: string;
  headshotAlt: string;
  headshotSrc: string;
  label: string;
  name: string;
  roles: string[];
  secondaryDescription: string;
}

export function MeetCorey({
  ctaHref,
  ctaIcon,
  ctaLabel,
  description,
  headshotAlt,
  headshotSrc,
  label,
  name,
  roles,
  secondaryDescription,
}: MeetCoreyProps) {
  return (
    <Section id="corey" className="bg-paper px-4 py-20 sm:px-6 lg:px-8">
      <Container className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-center">
        <div className="mx-auto w-full max-w-[380px] rounded-[34px] bg-[#f5eddd] p-8 shadow-[var(--shadow-paper)] lg:max-w-none">
          <div className="overflow-hidden rounded-[34px] border-[6px] border-[#9be5cf] bg-[linear-gradient(180deg,#23503b_0%,#17382b_100%)] shadow-[0_28px_50px_rgba(35,79,59,0.22)]">
            <Image
              src={headshotSrc}
              alt={headshotAlt}
              width={900}
              height={1200}
              className="aspect-square w-full object-cover object-center"
            />
          </div>
        </div>

        <div>
          <SectionHeader
            className="mt-0"
            label={label}
            labelClassName="text-purple-deep"
            title={name}
            titleClassName="mt-4 text-chalkboard"
          />
          <div className="mt-5 flex flex-wrap gap-3 text-sm font-medium text-chalkboard">
            {roles.map((role) => (
              <Pill key={role} tone="paper">
                {role}
              </Pill>
            ))}
          </div>
          <p className="mt-8 text-[1.35rem] leading-[1.75] text-ink-soft lg:text-[1.55rem]">
            {description}
          </p>
          <p className="mt-4 text-[1.35rem] leading-[1.75] text-ink-soft lg:text-[1.55rem]">
            {secondaryDescription}
          </p>
          <Button href={ctaHref} variant="chalk" className="mt-10 w-fit">
            {ctaLabel}
            {ctaIcon}
          </Button>
        </div>
      </Container>
    </Section>
  );
}
