import { ArrowRight } from "lucide-react";

import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { ChalkDoodle } from "@/components/primitives/ChalkDoodle";
import { ChalkDust } from "@/components/primitives/ChalkDust";
import { SectionHeader } from "@/components/ui/SectionHeader";

export interface JourneyStep {
  description: string;
  title: string;
}

export interface JourneyTimelineProps {
  description: string;
  id?: string;
  steps: JourneyStep[];
  title: string;
}

export function JourneyTimeline({
  description,
  id = "journey",
  steps,
  title,
}: JourneyTimelineProps) {
  return (
    <Section
      id={id}
      className="relative bg-[linear-gradient(180deg,#122c21_0%,#143226_100%)] px-4 pb-22 pt-4 text-white sm:px-6 lg:px-8 lg:pb-24"
    >
      <ChalkDust />
      <Container>
        <SectionHeader
          align="center"
          className="relative"
          description={description}
          descriptionClassName="mt-4 text-[1.45rem] leading-8 text-white/72"
          title={title}
          titleClassName="font-display text-[2rem] leading-tight text-white sm:text-[2.3rem] lg:text-[2.3rem]"
        />
        <ChalkDoodle variant="star" className="left-[10%] top-8 hidden h-8 w-8 md:block" />
        <ChalkDoodle variant="spark" className="right-[12%] top-10 hidden h-8 w-8 md:block" />

        <div className="mt-14 grid gap-10 md:grid-cols-2 xl:grid-cols-5 xl:gap-6">
          {steps.map((step, index) => (
            <div key={step.title} className="relative text-center xl:px-4">
              {index < steps.length - 1 ? (
                <ArrowRight className="absolute right-[-1.2rem] top-10 hidden h-9 w-9 text-[#8ed8bf] xl:block" />
              ) : null}
              {index === 0 ? (
                <ChalkDoodle
                  variant="arrow-right"
                  className="left-6 top-28 hidden h-10 w-10 text-white/45 lg:block"
                />
              ) : null}
              {index === 3 ? (
                <ChalkDoodle
                  variant="swirl"
                  className="right-4 top-30 hidden h-12 w-12 text-white/45 lg:block"
                />
              ) : null}
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border-[4px] border-[#a8ead6] font-display text-4xl text-[#d8fff3]">
                {index + 1}
              </div>
              <h3 className="mt-8 font-display text-[2rem] leading-tight text-white">
                {step.title}
              </h3>
              <p className="mt-4 text-[1.15rem] leading-9 text-white/72">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
