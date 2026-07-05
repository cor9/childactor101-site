import type { Metadata } from "next";
import { ArrowRight, BookOpenCheck, Clapperboard, GraduationCap, HeartHandshake, Sparkles, Users } from "lucide-react";

import { NewsletterSignup } from "@/components/NewsletterSignup";
import { NextStepCTA } from "@/components/NextStepCTA";
import { PageHero } from "@/components/PageHero";
import { RelatedLessons } from "@/components/RelatedLessons";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Card } from "@/components/ui/Card";
import { SectionHeader } from "@/components/ui/SectionHeader";

export const metadata: Metadata = {
  title: "Online Acting Training for Young Actors | Child Actor 101",
  description:
    "Explore acting classes, coaching, audition training, and craft guidance for young actors ready to build stronger on-camera skills and a more professional path.",
};

const trainingOptionsHref = "https://101training.childactor101.com";
const coachingHref = "https://coaching.childactor101.com";
const auditionMasteryHref = "https://auditionmastery.childactor101.com";
const characterLabHref = "https://characterlab.childactor101.com";

const whoThisIsFor = [
  "They need stronger audition technique.",
  "They need more truthful on-camera choices.",
  "They need consistency between auditions.",
  "They need confidence without becoming over-rehearsed.",
  "They need coaching that respects both craft and childhood.",
];

const philosophyCards = [
  {
    title: "Craft before tricks",
    description:
      "Training should deepen behavior, listening, and choices before it reaches for shortcuts, gimmicks, or fake intensity.",
    icon: <BookOpenCheck className="h-7 w-7 text-purple-deep" />,
  },
  {
    title: "Confidence through preparation",
    description:
      "Strong confidence usually comes from repeatable work, not hype. Preparation gives actors something real to trust.",
    icon: <Sparkles className="h-7 w-7 text-purple-deep" />,
  },
  {
    title: "Childhood still matters",
    description:
      "Good training respects age, emotional health, and family rhythm. It should support the child, not swallow them.",
    icon: <HeartHandshake className="h-7 w-7 text-purple-deep" />,
  },
];

const trainingPaths = [
  {
    title: "Structured class training",
    description:
      "For young actors who need consistency, community, and a curriculum that builds over time.",
    ctaLabel: "Explore Classes",
    href: trainingOptionsHref,
    eyebrow: "Group classes",
    icon: <GraduationCap className="h-7 w-7 text-purple-deep" />,
  },
  {
    title: "Private coaching",
    description:
      "For actors who need individual attention, audition strategy, or focused work on performance habits.",
    ctaLabel: "Book Coaching",
    href: coachingHref,
    eyebrow: "Private coaching",
    icon: <Users className="h-7 w-7 text-purple-deep" />,
  },
  {
    title: "Audition-focused training",
    description:
      "For actors who need to improve self-tapes, redirects, slates, and the choices that make auditions more competitive.",
    ctaLabel: "Explore Audition Mastery",
    href: auditionMasteryHref,
    eyebrow: "Audition Mastery",
    icon: <Clapperboard className="h-7 w-7 text-purple-deep" />,
  },
  {
    title: "Character and craft work",
    description:
      "For actors ready to go deeper into imagination, behavior, subtext, physicality, and emotional specificity.",
    ctaLabel: "Explore Character Lab",
    href: characterLabHref,
    eyebrow: "Character Lab",
    icon: <BookOpenCheck className="h-7 w-7 text-purple-deep" />,
  },
];

const beforeTraining = [
  "Guessing what casting wants",
  "Memorizing without understanding",
  "Playing emotion instead of behavior",
  "Overthinking every audition",
  "Waiting for talent to magically become skill",
];

const afterTraining = [
  "Clearer choices",
  "Stronger listening",
  "More grounded self-tapes",
  "Better use of feedback",
  "A healthier relationship with the work",
];

const relatedLessons = [
  {
    title: "Why Consistent Training Matters for Young Actors",
    chapter: "Career Growth",
    href: "/from-the-classroom/career-growth/why-consistent-training-matters-for-young-actors",
    summary:
      "A practical lesson on why repeatable training builds durable skill faster than rushed intensity or occasional bursts of effort.",
  },
  {
    title: "When Should My Child Start Acting Training?",
    chapter: "Start Here",
    href: "/from-the-classroom/start-here/when-should-my-child-start-acting-training",
    summary:
      "Use this when your family is still deciding whether the actor is truly ready for classes or just curious about the idea.",
  },
  {
    title: "What Makes a Child Actor’s Self Tape Competitive",
    chapter: "Auditions",
    href: "/from-the-classroom/auditions/what-makes-a-child-actors-self-tape-competitive",
    summary:
      "A grounded lesson on the performance habits and tape choices that become stronger when training is consistent.",
  },
  {
    title: "Maintaining Self-Esteem as a Child Actor",
    chapter: "Wellness & Resilience",
    href: "/from-the-classroom/wellness-resilience/maintaining-self-esteem-as-a-child-actor",
    summary:
      "A useful counterbalance for families who want serious training without letting the work take over the child’s sense of self.",
  },
];

export default function TrainingPage() {
  return (
    <main className="overflow-hidden">
      <PageHero
        label="Training"
        title="Ready to take this seriously?"
        description="When a young actor is ready for more than tips and lucky guesses, training becomes the difference between hoping and preparing. This is where families start building skill, confidence, consistency, and stronger on-camera work."
        primaryAction={{
          href: trainingOptionsHref,
          label: "Explore Training Options",
          icon: <ArrowRight className="h-5 w-5" />,
        }}
        secondaryAction={{
          href: coachingHref,
          label: "Book Coaching",
          variant: "secondary",
        }}
        supportingPoints={["Build skill", "Work consistently", "Stay age-appropriate"]}
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
              This is the door beyond dabbling.
            </p>
            <p className="mt-2 text-sm leading-7 text-white/74">
              Families who are ready for this page usually do not need more random advice. They need structure, feedback, stronger habits, and a path that turns effort into repeatable work.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-[22px] bg-paper p-5 text-ink shadow-soft">
              <p className="text-sm leading-7 text-ink-soft">
                Good training makes an actor more specific, not more robotic.
              </p>
            </div>
            <div className="rounded-[22px] bg-paper p-5 text-ink shadow-soft">
              <p className="text-sm leading-7 text-ink-soft">
                The goal is professional habit, not a desperate purchase.
              </p>
            </div>
          </div>
        </div>
      </PageHero>

      <Section className="bg-paper px-4 py-20 sm:px-6 lg:px-8">
        <Container>
          <SectionHeader
            className="max-w-3xl"
            description="Maybe your child loves acting. Maybe auditions are starting to come in. Maybe you can see the spark, but the work needs more structure. This page is for families who want training that is practical, honest, and connected to the realities of television and film."
            descriptionClassName="mt-4 text-lg leading-8 text-ink-soft"
            label="Who this is for"
            title="This door is for families past the dabbling stage."
            titleClassName="mt-6 text-chalkboard"
          />
          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-5">
            {whoThisIsFor.map((item, index) => (
              <Card key={item} className="h-full">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-purple-deep">
                  Signal {index + 1}
                </p>
                <p className="mt-5 font-display text-2xl leading-tight text-chalkboard">{item}</p>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="bg-paper-warm px-4 py-20 sm:px-6 lg:px-8">
        <Container>
          <SectionHeader
            className="max-w-3xl"
            description="The goal is to help young actors understand behavior, listen more truthfully, make stronger choices, and show up prepared without losing their personality. Good training should make a child more specific, not more robotic."
            descriptionClassName="mt-4 text-lg leading-8 text-ink-soft"
            label="Training philosophy"
            title="The goal is not to manufacture a perfect little performer."
            titleClassName="mt-6 text-chalkboard"
          />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {philosophyCards.map((card) => (
              <Card key={card.title} tone="warm" className="h-full">
                {card.icon}
                <h2 className="mt-5 font-display text-3xl leading-tight text-chalkboard">
                  {card.title}
                </h2>
                <p className="mt-4 text-sm leading-7 text-ink-soft">{card.description}</p>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="bg-paper px-4 py-20 sm:px-6 lg:px-8">
        <Container>
          <SectionHeader
            className="max-w-3xl"
            description="Not every actor needs the same structure. The smartest path depends on their age, habits, current skill, and the kind of support that will actually move the work forward."
            descriptionClassName="mt-4 text-lg leading-8 text-ink-soft"
            label="Training paths"
            title="Choose the training path that fits where they are."
            titleClassName="mt-6 text-chalkboard"
          />
          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {trainingPaths.map((path) => (
              <Card key={path.title} className="flex h-full flex-col">
                {path.icon}
                <p className="mt-5 text-xs font-semibold uppercase tracking-[0.24em] text-purple-deep">
                  {path.eyebrow}
                </p>
                <h2 className="mt-3 font-display text-3xl leading-tight text-chalkboard">
                  {path.title}
                </h2>
                <p className="mt-4 flex-1 text-sm leading-7 text-ink-soft">{path.description}</p>
                <a
                  href={path.href}
                  className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-purple-deep transition hover:text-chalkboard"
                  rel="noreferrer"
                  target="_blank"
                >
                  {path.ctaLabel}
                  <ArrowRight className="h-4 w-4" />
                </a>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="bg-[radial-gradient(circle_at_top_left,rgba(49,99,71,0.45),transparent_28%),linear-gradient(180deg,#173226_0%,#10261d_100%)] px-4 py-20 text-white sm:px-6 lg:px-8">
        <Container>
          <SectionHeader
            className="max-w-3xl"
            description="Serious training should change how the actor works, not just how motivated they feel for a week."
            descriptionClassName="mt-4 text-lg leading-8 text-white/74"
            label="What training changes"
            labelClassName="text-[#bcefdc]"
            title="What serious training changes."
            titleClassName="mt-6 text-white"
          />
          <div className="mt-12 grid gap-8 lg:grid-cols-2">
            <Card tone="chalkboard" className="border border-white/10">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#bcefdc]">
                Before
              </p>
              <div className="mt-6 space-y-3">
                {beforeTraining.map((item) => (
                  <div
                    key={item}
                    className="rounded-[22px] border border-white/8 bg-white/6 px-5 py-4 text-sm leading-7 text-chalk/76"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </Card>
            <Card tone="warm">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-purple-deep">
                After
              </p>
              <div className="mt-6 space-y-3">
                {afterTraining.map((item) => (
                  <div
                    key={item}
                    className="rounded-[22px] border border-[#e7dcc7] bg-white px-5 py-4 text-sm leading-7 text-ink-soft shadow-soft"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </Container>
      </Section>

      <Section className="bg-paper-warm px-4 py-20 sm:px-6 lg:px-8">
        <Container className="max-w-6xl">
          <Card tone="warm" className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-purple-deep">
                Featured support
              </p>
              <h2 className="mt-5 font-display text-4xl leading-tight text-chalkboard sm:text-5xl">
                Start with the right level of support.
              </h2>
              <p className="mt-5 text-lg leading-8 text-ink-soft">
                Not every actor needs the same training plan. Some need class structure. Some need audition coaching. Some need a reset. The right next step depends on the actor&apos;s age, goals, experience, and current habits.
              </p>
            </div>
            <div className="rounded-[28px] border border-[#e7dcc7] bg-white px-6 py-6 shadow-soft">
              <p className="text-sm leading-7 text-ink-soft">
                Use classes for consistency, coaching for focused attention, and the broader training ecosystem for long-term skill-building that stays connected to real auditions and real industry expectations.
              </p>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <a
                  href={trainingOptionsHref}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[linear-gradient(180deg,#b58bf8_0%,#9568ec_100%)] px-7 py-4 text-base font-semibold text-white shadow-[0_18px_32px_rgba(149,104,236,0.34)] transition duration-200 hover:-translate-y-0.5 hover:brightness-105"
                  rel="noreferrer"
                  target="_blank"
                >
                  Explore Training Options
                  <ArrowRight className="h-5 w-5" />
                </a>
                <a
                  href={coachingHref}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-[#e7dcc7] bg-white px-7 py-4 text-base font-semibold text-chalkboard shadow-[0_12px_28px_rgba(23,56,43,0.09)] transition duration-200 hover:-translate-y-0.5 hover:bg-paper-warm"
                  rel="noreferrer"
                  target="_blank"
                >
                  Book a Strategy Session
                  <ArrowRight className="h-5 w-5" />
                </a>
              </div>
            </div>
          </Card>
        </Container>
      </Section>

      <Section className="bg-paper px-4 py-20 sm:px-6 lg:px-8">
        <Container>
          <RelatedLessons
            description="These classroom lessons help families think more clearly about training consistency, readiness, self-tape growth, and keeping the child healthy while the work gets more serious."
            lessons={relatedLessons}
            title="Related classroom guidance"
          />
        </Container>
      </Section>

      <Section className="bg-paper-warm px-4 py-20 sm:px-6 lg:px-8">
        <Container className="max-w-6xl">
          <NewsletterSignup
            ctaLabel="Join The Callback"
            description="Join The Callback for practical acting guidance, class updates, audition tips, and honest parent-first perspective from Child Actor 101."
            eyebrow="Free training guidance"
            href="https://childactor-101.eo.page/subscribe"
            title="Get the next training note."
          />
        </Container>
      </Section>

      <Section className="bg-paper px-4 pb-20 sm:px-6 lg:px-8">
        <Container className="max-w-6xl">
          <NextStepCTA
            description="A strong actor is not built in one audition. They are built through consistent work, honest feedback, and the courage to keep growing."
            eyebrow="Keep building"
            primaryHref={trainingOptionsHref}
            primaryLabel="Explore Training"
            secondaryHref={coachingHref}
            secondaryLabel="Book Coaching"
            title="Training is where talent becomes repeatable."
          />
        </Container>
      </Section>
    </main>
  );
}
