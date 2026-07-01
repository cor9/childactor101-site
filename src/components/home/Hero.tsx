import type { ReactNode } from "react";
import Image from "next/image";

import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { ChalkDoodle } from "@/components/primitives/ChalkDoodle";
import { ChalkDust } from "@/components/primitives/ChalkDust";
import { Button } from "@/components/ui/Button";

export interface HomeHeroAction {
  href: string;
  icon?: ReactNode;
  label: string;
  rel?: string;
  target?: string;
  variant?: "primary" | "secondary" | "chalk" | "outlineLight" | "ghost";
}

export interface HeroProps {
  description: string;
  imageAlt: string;
  imageSrc: string;
  kicker: string;
  primaryAction: HomeHeroAction;
  secondaryAction: HomeHeroAction;
  tapeLabel: string;
  title: ReactNode;
}

export function Hero({
  description,
  imageAlt,
  imageSrc,
  kicker,
  primaryAction,
  secondaryAction,
  tapeLabel,
  title,
}: HeroProps) {
  return (
    <Section className="relative overflow-hidden bg-[radial-gradient(circle_at_top_left,rgba(49,99,71,0.55),transparent_34%),linear-gradient(180deg,#18352a_0%,#122c21_100%)] px-4 pb-12 pt-10 text-white sm:px-6 lg:px-8 lg:pb-16 lg:pt-14">
      <ChalkDust />
      <Container className="relative grid gap-10 lg:grid-cols-[1.02fr_0.98fr] lg:items-center">
        <div className="max-w-3xl">
          <ChalkDoodle variant="spark" className="left-[-0.5rem] top-4 hidden h-9 w-9 lg:block" />
          <ChalkDoodle variant="swirl" className="right-12 top-28 hidden h-14 w-14 lg:block" />
          <div className="inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.24em] text-[#b9ecd9]">
            <span className="h-2.5 w-2.5 rounded-full bg-[#d04c3f]" />
            {kicker}
          </div>
          <h1 className="mt-8 max-w-3xl font-display text-5xl leading-[0.94] text-white sm:text-6xl lg:text-[5.2rem]">
            {title}
          </h1>
          <p className="mt-8 max-w-2xl text-[1.55rem] leading-[1.65] text-white/78 sm:text-[1.75rem]">
            {description}
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Button
              href={primaryAction.href}
              rel={primaryAction.rel}
              size="lg"
              target={primaryAction.target}
              variant={primaryAction.variant}
            >
              {primaryAction.label}
              {primaryAction.icon}
            </Button>
            <Button
              href={secondaryAction.href}
              rel={secondaryAction.rel}
              size="lg"
              target={secondaryAction.target}
              variant={secondaryAction.variant}
            >
              {secondaryAction.label}
              {secondaryAction.icon}
            </Button>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-[760px] lg:max-w-none">
          <ChalkDoodle variant="star" className="right-8 top-14 h-10 w-10" />
          <ChalkDoodle variant="arrow-down" className="left-10 bottom-10 hidden h-12 w-12 md:block" />
          <div className="absolute left-8 top-0 z-10 rounded-[18px] bg-[#cc4f40] px-5 py-2 text-sm font-semibold text-white shadow-[0_12px_24px_rgba(204,79,64,0.28)]">
            {tapeLabel}
          </div>
          <div className="overflow-hidden rounded-[42px] border-[6px] border-[#a8ead6] bg-[#183329] shadow-[0_34px_70px_rgba(8,23,19,0.38)]">
            <Image
              src={imageSrc}
              alt={imageAlt}
              width={760}
              height={760}
              className="aspect-square w-full object-cover"
              priority
            />
          </div>
        </div>
      </Container>
    </Section>
  );
}
