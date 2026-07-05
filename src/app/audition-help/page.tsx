import type { Metadata } from "next";
import { ArrowRight, Camera, CheckSquare, Clapperboard, MicVocal, MonitorPlay, TimerReset } from "lucide-react";

import { LessonCard } from "@/components/content/LessonCard";
import { Newsletter } from "@/components/content/Newsletter";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { PageHero } from "@/components/PageHero";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";

export const metadata: Metadata = {
  title: "Audition Help | Self Tape, Slate & Callback Support",
  description:
    "A calm first-stop route for families who need urgent audition help, self tape support, slate guidance, and one smart next step before they send.",
};

const firstAnswerCards = [
  {
    title: "Self Tape Setup Guide",
    description:
      "Start with framing, eyeline, sound, and room basics so the tape reads clearly before you start overworking performance notes.",
    icon: <Camera className="h-6 w-6 text-purple-deep" />,
  },
  {
    title: "Memorization Guide",
    description:
      "Use a calmer line-learning rhythm that helps the actor prepare without turning the room into an emergency.",
    icon: <TimerReset className="h-6 w-6 text-purple-deep" />,
  },
  {
    title: "Zoom Callback Guide",
    description:
      "Keep callback tech, eye contact, and parent support clean so the actor can stay present when the room moves online.",
    icon: <MonitorPlay className="h-6 w-6 text-purple-deep" />,
  },
  {
    title: "Slate Basics",
    description:
      "A slate should be grounded, short, and human. It helps casting trust the actor before the scene even starts.",
    icon: <MicVocal className="h-6 w-6 text-purple-deep" />,
  },
];

const triageChecks = [
  {
    title: "Fix the room first",
    description: "If the frame, eyeline, or sound is rough, fix that before chasing a dozen performance notes.",
  },
  {
    title: "Keep the slate simple",
    description: "Do not turn the slate into a commercial. Calm, clear, and watchable is enough.",
  },
  {
    title: "Support the actor, not your panic",
    description: "A nervous parent can create ten extra problems faster than a hard scene ever could.",
  },
  {
    title: "Choose one next step",
    description: "When the tape still needs help, get focused eyes on it instead of collecting conflicting opinions.",
  },
];

const prepTools = [
  {
    title: "Self Tape Feedback",
    description:
      "The fastest way to get focused notes before you send when the deadline is close and the tape needs clearer decisions.",
    href: "/ecosystem#self-tape-feedback",
    actionLabel: "Get Self Tape Feedback",
    eyebrow: "Best next step",
    icon: <Clapperboard className="h-6 w-6 text-purple-deep" />,
  },
  {
    title: "Prep101",
    description:
      "Use Prep101 when the actor needs a stronger scene plan, clearer choices, or better structure before the camera turns on.",
    href: "/ecosystem#prep101",
    actionLabel: "Use Prep101",
    eyebrow: "Preparation tool",
    icon: <CheckSquare className="h-6 w-6 text-purple-deep" />,
  },
];

const relatedLessons = [
  {
    title: "Auditions Chapter",
    description:
      "Open the full audition shelf when one urgent tape turns into a broader need for a better family process.",
    href: "/from-the-classroom/auditions",
  },
  {
    title: "Self Tape Equipment for Child Actors",
    description:
      "A practical equipment lesson so families can stop wasting time and money on gear that does not improve the tape.",
    href: "/from-the-classroom/auditions/self-tape-equipment-for-child-actors",
  },
  {
    title: "How to Build a Better Audition Slate",
    description:
      "Use this when the slate feels stiff, over-coached, or like it is competing with the scene.",
    href: "/from-the-classroom/auditions/how-to-build-a-better-audition-slate",
  },
  {
    title: "What Makes a Child Actor’s Self Tape Competitive",
    description:
      "A grounded lesson on what actually helps a tape feel trustworthy, watchable, and castable.",
    href: "/from-the-classroom/auditions/what-makes-a-child-actors-self-tape-competitive",
  },
];

export default function AuditionHelpPage() {
  return (
    <main className="overflow-hidden">
      <PageHero
        label="Audition Help"
        title="You have an audition. Let&apos;s calm the room."
        description="When the deadline is close, you do not need twelve opinions. You need the setup, the slate, the scene, and one smart next step."
        primaryAction={{
          href: "#next-step",
          label: "Get Self Tape Feedback",
          icon: <ArrowRight className="h-5 w-5" />,
        }}
        secondaryAction={{
          href: "#free-first-answer",
          label: "Start with the Basics",
        }}
        supportingPoints={["Less panic", "Cleaner setup", "One clear next step"]}
      >
        <div className="space-y-4">
          <div className="inline-flex rotate-[-4deg] rounded-full bg-paper px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-chalkboard shadow-soft">
            Audition triage
          </div>
          <div className="rounded-[24px] border border-[#a8ead6]/35 bg-[#17382b]/78 px-5 py-5 text-chalk shadow-[0_18px_40px_rgba(8,23,19,0.2)]">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#bcefdc]">
              What matters first
            </p>
            <p className="mt-3 font-display text-[1.8rem] leading-tight text-white">
              Calm choices beat frantic choices.
            </p>
            <p className="mt-2 text-sm leading-7 text-white/74">
              Most last-minute audition chaos comes from trying to solve everything at once. Start with the room, the slate, the scene, and the actor&apos;s focus.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-[22px] bg-paper p-5 text-ink shadow-soft">
              <p className="text-sm leading-7 text-ink-soft">
                A cleaner tape is usually built from simpler decisions, not more opinions.
              </p>
            </div>
            <div className="rounded-[22px] bg-paper p-5 text-ink shadow-soft">
              <p className="text-sm leading-7 text-ink-soft">
                Your job is to help the actor stay present, not to direct the entire performance from panic.
              </p>
            </div>
          </div>
        </div>
      </PageHero>

      <Section className="bg-paper px-4 py-20 sm:px-6 lg:px-8">
        <Container>
          <SectionHeader
            className="max-w-3xl"
            description="When the deadline is close, families usually do not need more noise. They need the first useful answer that reduces mistakes right now."
            descriptionClassName="mt-4 text-lg leading-8 text-ink-soft"
            label="Free first answer"
            title="Start with the pieces that usually break first."
            titleClassName="mt-6 text-chalkboard"
          />
          <div id="free-first-answer" className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {firstAnswerCards.map((card) => (
              <Card key={card.title} className="h-full">
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

      <Section className="bg-paper-warm px-4 py-20 sm:px-6 lg:px-8">
        <Container>
          <SectionHeader
            className="max-w-3xl"
            description="Good audition help is usually a triage problem, not a creativity problem. Solve the most expensive mistakes in the right order."
            descriptionClassName="mt-4 text-lg leading-8 text-ink-soft"
            label="Triage first"
            title="What to fix before you start spiraling."
            titleClassName="mt-6 text-chalkboard"
          />
          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {triageChecks.map((item, index) => (
              <Card key={item.title} tone="warm" className="h-full">
                <p className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-sm font-semibold text-chalkboard shadow-soft">
                  {index + 1}
                </p>
                <h2 className="mt-5 font-display text-3xl leading-tight text-chalkboard">
                  {item.title}
                </h2>
                <p className="mt-4 text-sm leading-7 text-ink-soft">{item.description}</p>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      <Section id="next-step" className="bg-[radial-gradient(circle_at_top_left,rgba(49,99,71,0.45),transparent_28%),linear-gradient(180deg,#173226_0%,#10261d_100%)] px-4 py-20 text-white sm:px-6 lg:px-8">
        <Container className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <div>
            <SectionHeader
              description="When the tape is close but not quite there, the best next step is focused eyes on the work. Not more chaos. Not ten more takes with ten different notes."
              descriptionClassName="mt-4 text-lg leading-8 text-white/74"
              label="Recommended next step"
              labelClassName="text-[#bcefdc]"
              title="Need eyes on the tape?"
              titleClassName="mt-6 text-white"
            />
            <p className="mt-6 text-lg leading-8 text-white/76">
              Self Tape Feedback is the fastest way to get focused notes before you send. If the actor needs stronger scene preparation underneath the tape, Prep101 is the next layer.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {prepTools.map((tool) => (
              <LessonCard
                key={tool.title}
                actionHref={tool.href}
                actionLabel={tool.actionLabel}
                description={tool.description}
                eyebrow={tool.eyebrow}
                icon={tool.icon}
                title={tool.title}
                tone="chalkboard"
              />
            ))}
          </div>
        </Container>
      </Section>

      <Section className="bg-paper px-4 py-20 sm:px-6 lg:px-8">
        <Container>
          <SectionHeader
            className="max-w-3xl"
            description="These classroom lessons cover the recurring problems behind last-minute tape stress, so families can improve the whole process instead of surviving one deadline at a time."
            descriptionClassName="mt-4 text-lg leading-8 text-ink-soft"
            label="Related classroom guidance"
            title="Build a better audition process, not just a better panic response."
            titleClassName="mt-6 text-chalkboard"
          />
          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {relatedLessons.map((lesson) => (
              <LessonCard
                key={lesson.title}
                actionHref={lesson.href}
                actionLabel="Read lesson"
                description={lesson.description}
                eyebrow="Classroom lesson"
                title={lesson.title}
                tone="paper"
              />
            ))}
          </div>
        </Container>
      </Section>

      <Section className="bg-paper-warm px-4 py-20 sm:px-6 lg:px-8">
        <Container className="max-w-6xl">
          <Newsletter
            ctaHref="/from-the-classroom#newsletter"
            ctaLabel="Get audition tips"
            description="Get practical audition help in your inbox: self tape fixes, slate guidance, callback notes, and the calm parent perspective that makes deadlines easier to manage."
            label="Newsletter"
            title="Keep the next audition calmer."
          />
        </Container>
      </Section>

      <Section className="bg-paper px-4 pb-20 sm:px-6 lg:px-8">
        <Container className="max-w-6xl">
          <Card className="relative overflow-hidden bg-[linear-gradient(180deg,#fffdf8_0%,#f7efe0_100%)]">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-purple-deep">
              Final CTA
            </p>
            <h2 className="mt-5 max-w-3xl font-display text-4xl leading-tight text-chalkboard sm:text-5xl">
              Good audition help should make the room quieter.
            </h2>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-ink-soft">
              Start with the basics, get focused feedback when you need it, and build a tape process your family can trust the next time the deadline gets tight.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Button href="/ecosystem#self-tape-feedback" size="lg">
                Get Self Tape Feedback
                <ArrowRight className="h-5 w-5" />
              </Button>
              <Button href="/ecosystem#prep101" size="lg" variant="secondary">
                Use Prep101
                <ArrowRight className="h-5 w-5" />
              </Button>
            </div>
          </Card>
        </Container>
      </Section>
    </main>
  );
}
