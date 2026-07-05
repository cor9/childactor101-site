import { ArrowRight } from "lucide-react";

import { Newsletter } from "@/components/content/Newsletter";
import { LessonCard } from "@/components/content/LessonCard";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { PageHero } from "@/components/PageHero";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import type { DoorPageContent } from "@/content/five-doors";

export interface DoorLandingPageProps {
  content: DoorPageContent;
}

export function DoorLandingPage({ content }: DoorLandingPageProps) {
  return (
    <main className="overflow-hidden">
      <PageHero
        label={content.heroLabel}
        title={content.heroTitle}
        description={content.heroDescription}
        primaryAction={{
          href: content.heroPrimaryActionHref,
          label: content.heroPrimaryActionLabel,
          icon: <ArrowRight className="h-5 w-5" />,
        }}
        secondaryAction={
          content.heroSecondaryActionHref && content.heroSecondaryActionLabel
            ? {
                href: content.heroSecondaryActionHref,
                label: content.heroSecondaryActionLabel,
                variant: "secondary",
              }
            : undefined
        }
        supportingPoints={content.heroSupportingPoints}
      >
        <div className="space-y-4">
          <div className="inline-flex rotate-[-4deg] rounded-full bg-paper px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-chalkboard shadow-soft">
            {content.heroPanelLabel}
          </div>
          <div className="rounded-[24px] border border-[#a8ead6]/35 bg-[#17382b]/78 px-5 py-5 text-chalk shadow-[0_18px_40px_rgba(8,23,19,0.2)]">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#bcefdc]">
              {content.heroLabel}
            </p>
            <p className="mt-3 font-display text-[1.8rem] leading-tight text-white">
              {content.heroPanelTitle}
            </p>
            <p className="mt-2 text-sm leading-7 text-white/74">
              {content.heroPanelDescription}
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {content.heroHighlights.map((highlight) => (
              <div key={highlight} className="rounded-[22px] bg-paper p-5 text-ink shadow-soft">
                <p className="text-sm leading-7 text-ink-soft">{highlight}</p>
              </div>
            ))}
          </div>
        </div>
      </PageHero>

      <Section id="free-first-answer" className="bg-paper px-4 py-20 sm:px-6 lg:px-8">
        <Container>
          <SectionHeader
            className="max-w-3xl"
            description={content.freeFirstAnswerDescription}
            descriptionClassName="mt-4 text-lg leading-8 text-ink-soft"
            label="Free first answer"
            title={content.freeFirstAnswerTitle}
            titleClassName="mt-6 text-chalkboard"
          />
          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {content.freeFirstAnswerCards.map((card) => (
              <Card key={card.title} className="h-full">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-purple-deep">
                  Start here
                </p>
                <h2 className="mt-5 font-display text-3xl leading-tight text-chalkboard">
                  {card.title}
                </h2>
                <p className="mt-4 text-sm leading-7 text-ink-soft">{card.description}</p>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="bg-[radial-gradient(circle_at_top_left,rgba(49,99,71,0.45),transparent_28%),linear-gradient(180deg,#173226_0%,#10261d_100%)] px-4 py-20 text-white sm:px-6 lg:px-8">
        <Container className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <SectionHeader
              description={content.nextStepDescription}
              descriptionClassName="mt-4 text-lg leading-8 text-white/74"
              label="Recommended next step"
              labelClassName="text-[#bcefdc]"
              title={content.nextStepTitle}
              titleClassName="mt-6 text-white"
            />
          </div>
          <Card tone="chalkboard" className="border border-white/10">
            <p className="text-sm leading-7 text-chalk/76">
              The best next step should reduce chaos, not create another long list of things to buy or compare.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Button href={content.nextStepPrimaryHref} size="lg" variant="primary">
                {content.nextStepPrimaryLabel}
                <ArrowRight className="h-5 w-5" />
              </Button>
              {content.nextStepSecondaryHref && content.nextStepSecondaryLabel ? (
                <Button href={content.nextStepSecondaryHref} size="lg" variant="outlineLight">
                  {content.nextStepSecondaryLabel}
                  <ArrowRight className="h-5 w-5" />
                </Button>
              ) : null}
            </div>
          </Card>
        </Container>
      </Section>

      <Section className="bg-paper-warm px-4 py-20 sm:px-6 lg:px-8">
        <Container>
          <SectionHeader
            className="max-w-3xl"
            description={content.relatedGuidanceDescription}
            descriptionClassName="mt-4 text-lg leading-8 text-ink-soft"
            label="Related classroom lessons"
            title={content.relatedGuidanceTitle}
            titleClassName="mt-6 text-chalkboard"
          />
          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {content.relatedGuidanceCards.map((card) => (
              <LessonCard
                key={card.title}
                actionHref={card.href}
                actionLabel={card.actionLabel}
                description={card.description}
                eyebrow={card.eyebrow}
                title={card.title}
                tone="warm"
              />
            ))}
          </div>
        </Container>
      </Section>

      <Section className="bg-paper px-4 py-20 sm:px-6 lg:px-8">
        <Container className="max-w-6xl">
          <Newsletter
            ctaHref="/from-the-classroom#newsletter"
            ctaLabel="Join The Callback"
            description={content.newsletterDescription}
            label={content.newsletterLabel}
            title={content.newsletterTitle}
          />
        </Container>
      </Section>
    </main>
  );
}
