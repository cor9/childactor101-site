import type { Metadata } from "next";
import { ArrowRight, Headphones, NotebookPen } from "lucide-react";

import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { ChapterCards } from "@/components/ChapterCards";
import { JourneySteps } from "@/components/JourneySteps";
import { PageHero } from "@/components/PageHero";
import { PlaceholderBlock } from "@/components/PlaceholderBlock";
import { SectionLabel } from "@/components/SectionLabel";

const checklist = [
  "Learn how agents, managers, casting, and auditions actually fit together.",
  "Choose training before chasing expensive marketing materials.",
  "Set expectations around timeline, finances, and family bandwidth.",
  "Protect school, routine, and your child&apos;s off-camera life from the start.",
];

const firstReads = [
  {
    title: "Industry overview",
    description:
      "A calm explanation of how TV and film jobs, auditions, and representation really work.",
  },
  {
    title: "Beginner checklist",
    description:
      "The practical first-month actions to take before you start buying everything at once.",
  },
  {
    title: "Recommended tools",
    description:
      "Which materials and products matter now, and which ones can wait until later.",
  },
];

const tools = [
  {
    title: "Resume101",
    description: "For building a clean, professional resume when the time is right.",
  },
  {
    title: "Pages101",
    description: "For creating a polished home base for an actor&apos;s materials.",
  },
  {
    title: "Prep101",
    description: "For preparing smarter once real audition opportunities start coming in.",
  },
];

export const metadata: Metadata = {
  title: "Start Here",
  description:
    "The onboarding page for new Child Actor 101 families: industry overview, first steps, beginner checklist, and the right next resources.",
};

export default function StartHerePage() {
  return (
    <main className="overflow-hidden">
      <PageHero
        label="The first stop"
        title="I&apos;m brand new. What should I do first?"
        description="Start Here is the onboarding page for parents who need the business explained clearly before they make expensive decisions. Think of it as the first chapter of the manual."
        primaryAction={{
          href: "#journey",
          label: "See the five-step path",
          icon: <ArrowRight className="h-5 w-5" />,
        }}
        secondaryAction={{
          href: "/podcast",
          label: "Hear the real conversations",
          icon: <Headphones className="h-5 w-5" />,
        }}
        supportingPoints={[
          "Industry overview",
          "Recommended lessons",
          "Beginner checklist",
        ]}
      >
        <div className="space-y-4">
          <div className="inline-flex rotate-[-4deg] rounded-full bg-paper px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-chalkboard shadow-soft">
            First 30 days
          </div>
          <PlaceholderBlock
            title="Roadmap board"
            subtitle="Editorial illustration placeholder"
            tone="dark"
          />
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-[22px] bg-paper p-5 text-ink shadow-soft">
              <p className="text-xs uppercase tracking-[0.22em] text-chalkboard">
                Core rule
              </p>
              <p className="mt-3 font-display text-3xl text-chalkboard">
                Learn before you spend
              </p>
            </div>
            <div className="rounded-[22px] border border-chalk/10 bg-chalkboard-soft/60 p-5">
              <p className="text-xs uppercase tracking-[0.22em] text-chalk/65">
                Built for
              </p>
              <p className="mt-3 text-sm leading-7 text-chalk/80">
                Parents who want clarity, order, and a safer starting point.
              </p>
            </div>
          </div>
        </div>
      </PageHero>

      <JourneySteps />

      <ChapterCards />

      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid w-full max-w-7xl gap-6 lg:grid-cols-2">
          <Card tone="warm">
            <SectionLabel>Beginner checklist</SectionLabel>
            <h2 className="mt-6 font-display text-4xl leading-tight text-chalkboard sm:text-5xl">
              What to lock in first
            </h2>
            <ul className="mt-8 space-y-4 text-sm leading-7 text-ink-soft">
              {checklist.map((item) => (
                <li key={item} className="rounded-[20px] bg-white/75 px-5 py-4 shadow-soft">
                  {item}
                </li>
              ))}
            </ul>
          </Card>

          <Card>
            <SectionLabel>Read these first</SectionLabel>
            <div className="mt-6 space-y-4">
              {firstReads.map((item) => (
                <div
                  key={item.title}
                  className="rounded-[22px] border border-chalkboard/10 bg-paper px-5 py-5"
                >
                  <p className="text-xs uppercase tracking-[0.22em] text-chalkboard">
                    Lesson
                  </p>
                  <h3 className="mt-3 font-display text-2xl text-chalkboard">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-7 text-ink-soft">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </section>

      <section className="bg-chalkboard px-4 py-20 text-chalk sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-7xl">
          <SectionLabel>Recommended tools</SectionLabel>
          <div className="mt-6 max-w-3xl">
            <h2 className="font-display text-4xl leading-tight text-chalk sm:text-5xl">
              Use tools in the right order.
            </h2>
            <p className="mt-4 text-lg leading-8 text-chalk/72">
              The tools matter, but not all at once. Start with education, then
              add the materials that support real progress.
            </p>
          </div>
          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {tools.map((tool) => (
              <Card
                key={tool.title}
                tone="chalkboard"
                className="border-chalk/10 bg-chalkboard-deep/65"
              >
                <NotebookPen className="h-8 w-8 text-gold" />
                <h3 className="mt-5 font-display text-2xl text-chalk">
                  {tool.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-chalk/75">
                  {tool.description}
                </p>
              </Card>
            ))}
          </div>
          <div className="mt-10">
            <Button href="/ecosystem" variant="secondary">
              See the full ecosystem
              <ArrowRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
