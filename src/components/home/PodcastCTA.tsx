import type { ReactNode } from "react";
import Image from "next/image";

import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { ChalkDoodle } from "@/components/primitives/ChalkDoodle";
import { ChalkDust } from "@/components/primitives/ChalkDust";
import { Button } from "@/components/ui/Button";
import { SectionHeader } from "@/components/ui/SectionHeader";

export interface PodcastCTAProps {
  ctaHref: string;
  ctaIcon?: ReactNode;
  ctaLabel: string;
  ctaRel?: string;
  ctaTarget?: string;
  description: string;
  imageAlt: string;
  imageSrc: string;
  label: string;
  title: string;
}

export function PodcastCTA({
  ctaHref,
  ctaIcon,
  ctaLabel,
  ctaRel,
  ctaTarget,
  description,
  imageAlt,
  imageSrc,
  label,
  title,
}: PodcastCTAProps) {
  return (
    <Section
      id="podcast"
      className="relative bg-[radial-gradient(circle_at_top_left,rgba(49,99,71,0.4),transparent_28%),linear-gradient(180deg,#173226_0%,#10261d_100%)] px-4 py-20 pb-24 text-white sm:px-6 lg:px-8"
    >
      <ChalkDust />
      <ChalkDoodle variant="swirl" className="left-10 top-16 hidden h-14 w-14 lg:block" />
      <ChalkDoodle variant="spark" className="right-14 bottom-14 hidden h-10 w-10 lg:block" />
      <Container className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
        <div className="relative mx-auto w-full max-w-[430px] lg:max-w-none">
          <ChalkDoodle variant="star" className="left-4 top-20 h-10 w-10" />
          <Image
            src={imageSrc}
            alt={imageAlt}
            width={820}
            height={820}
            className="w-full object-contain drop-shadow-[0_28px_44px_rgba(8,23,19,0.35)]"
          />
        </div>
        <div className="relative">
          <ChalkDoodle variant="arrow-right" className="right-8 top-8 hidden h-12 w-12 lg:block" />
          <SectionHeader
            className="max-w-3xl"
            description={description}
            descriptionClassName="mt-4 max-w-3xl text-[1.45rem] leading-[1.7] text-white/72"
            label={label}
            labelClassName="text-[#c7f2e4]"
            title={title}
            titleClassName="mt-6 text-white"
          />
          <Button
            href={ctaHref}
            rel={ctaRel}
            className="mt-10 w-fit"
            target={ctaTarget}
          >
            {ctaLabel}
            {ctaIcon}
          </Button>
        </div>
      </Container>
    </Section>
  );
}
