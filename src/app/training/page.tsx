import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";

import { LessonCard } from "@/components/content/LessonCard";
import { NewsletterSignup } from "@/components/NewsletterSignup";
import { PageHero } from "@/components/PageHero";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Card } from "@/components/ui/Card";
import { SectionHeader } from "@/components/ui/SectionHeader";

export const metadata: Metadata = {
  title: "Training",
  description:
    "A focused route for families who are ready to build skill, consistency, confidence, and stronger on-camera work.",
};

const trainingCards = [
  {
    title: "Training programs",
    description:
      "Structured classes help actors build repeatable skill, vocabulary, and steadier on-camera work over time.",
    href: "/ecosystem#training",
    actionLabel: "Explore training",
    eyebrow: "Next step",
  },
  {
    title: "Private coaching",
    description:
      "Coaching is most useful when a young actor needs focused feedback for a tape, a callback, or a specific growth edge.",
    href: "/corey-ralston",
    actionLabel: "Book coaching",
    eyebrow: "Support",
  },
  {
    title: "Why Consistent Training Matters for Young Actors",
    description:
      "A classroom lesson on why long-term repetition and patience usually matter more than occasional intensity.",
    href: "/from-the-classroom/career-growth/why-consistent-training-matters-for-young-actors",
    actionLabel: "Read lesson",
    eyebrow: "Classroom lesson",
  },
];

export default function TrainingPage() {
  return (
    <main className="overflow-hidden">
      <PageHero
        label="Training"
        title="Ready to take this seriously?"
        description="For families who are ready to build skill, consistency, confidence, and stronger on-camera work."
        primaryAction={{
          href: "/ecosystem#training",
          label: "Explore Training",
          icon: <ArrowRight className="h-5 w-5" />,
        }}
        secondaryAction={{
          href: "/corey-ralston",
          label: "Book Coaching",
          variant: "secondary",
        }}
        supportingPoints={["Build skill", "Work steadily", "Stay age-appropriate"]}
      >
        <div className="space-y-4">
          <div className="inline-flex rotate-[-4deg] rounded-full bg-paper px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-chalkboard shadow-soft">
            Serious families
          </div>
          <div className="rounded-[24px] border border-[#a8ead6]/35 bg-[#17382b]/78 px-5 py-5 text-chalk shadow-[0_18px_40px_rgba(8,23,19,0.2)]">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#bcefdc]">
              What this route is for
            </p>
            <p className="mt-3 font-display text-[1.8rem] leading-tight text-white">
              Training should deepen the foundation.
            </p>
            <p className="mt-2 text-sm leading-7 text-white/74">
              Use classes and coaching to strengthen craft, consistency, and confidence, not to race past the basics.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-[22px] bg-paper p-5 text-ink shadow-soft">
              <p className="text-sm leading-7 text-ink-soft">
                Strong training supports the actor’s work, not a family’s panic.
              </p>
            </div>
            <div className="rounded-[22px] bg-paper p-5 text-ink shadow-soft">
              <p className="text-sm leading-7 text-ink-soft">
                The best next step is steady repetition, not buying everything at once.
              </p>
            </div>
          </div>
        </div>
      </PageHero>

      <Section className="bg-paper px-4 py-20 sm:px-6 lg:px-8">
        <Container className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <SectionHeader
              description="Choose the support that matches where the actor actually is right now: structured classes for long-game growth, coaching for focused needs, and classroom lessons for context."
              descriptionClassName="mt-4 text-lg leading-8 text-ink-soft"
              label="Recommended next step"
              title="Build the training rhythm before you chase intensity."
              titleClassName="mt-6 text-chalkboard"
            />
          </div>
          <Card tone="warm">
            <div className="grid gap-6 md:grid-cols-3">
              {trainingCards.map((card) => (
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
          </Card>
        </Container>
      </Section>

      <Section className="bg-paper-warm px-4 py-20 sm:px-6 lg:px-8">
        <Container className="max-w-6xl">
          <NewsletterSignup
            ctaLabel="Join The Callback"
            description="The Callback helps parents stay close to practical guidance on training, coaching, confidence, and pacing so growth can stay healthy as the work gets more serious."
            eyebrow="Email follow-up"
            href="/from-the-classroom#newsletter"
            title="Keep the long game in view."
          />
        </Container>
      </Section>
    </main>
  );
}
