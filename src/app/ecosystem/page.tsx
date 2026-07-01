import type { Metadata } from "next";
import { ArrowRight, Headphones, Sparkles } from "lucide-react";

import { Card } from "@/components/Card";
import { EcosystemSection } from "@/components/EcosystemSection";
import { PageHero } from "@/components/PageHero";
import { PlaceholderBlock } from "@/components/PlaceholderBlock";
import { SectionLabel } from "@/components/SectionLabel";

const categories = [
  {
    title: "Educational",
    items: ["101 Blog", "Podcast", "Newsletter", "YouTube", "Books", "Legal Library"],
  },
  {
    title: "Training",
    items: [
      "101 Training Program",
      "Character Lab",
      "Audition Mastery",
      "Master Methods",
      "The Craft",
      "Private Coaching",
    ],
  },
  {
    title: "Audition resources",
    items: ["Prep101", "Reader101", "Bold Choices", "Self Tape Feedback"],
  },
  {
    title: "Career tools",
    items: ["Resume101", "Pages101", "Directory", "Events Calendar"],
  },
  {
    title: "Community",
    items: ["Facebook Group", "Industry LIVE", "Open Calls"],
  },
];

const systemNotes = [
  "Education gives parents context before they invest.",
  "Training deepens craft once the foundation is clear.",
  "Audition tools support the real work of preparing.",
  "Career tools organize the materials around the actor.",
];

export const metadata: Metadata = {
  title: "Ecosystem",
  description:
    "Explore the full Child Actor 101 ecosystem across learning, training, audition support, tools, and community.",
};

export default function EcosystemPage() {
  return (
    <main className="overflow-hidden">
      <PageHero
        label="Platform map"
        title="One classroom. Multiple paths through the business."
        description="Child Actor 101 is designed as an ecosystem, not a pile of disconnected products. Each part should make the next part more useful for families navigating TV and film."
        primaryAction={{
          href: "/start-here",
          label: "Begin with Start Here",
          icon: <ArrowRight className="h-5 w-5" />,
        }}
        secondaryAction={{
          href: "/podcast",
          label: "Hear the conversations",
          icon: <Headphones className="h-5 w-5" />,
        }}
        supportingPoints={[
          "Learn the business",
          "Build the materials",
          "Support the performance",
        ]}
      >
        <div className="space-y-5">
          <PlaceholderBlock
            title="Ecosystem illustration"
            subtitle="Local platform map placeholder"
            tone="dark"
          />
          <div className="grid gap-4 sm:grid-cols-3">
            {["Learn", "Create", "Perform"].map((item) => (
              <div
                key={item}
                className="rounded-[20px] bg-paper px-4 py-5 text-center text-chalkboard shadow-soft"
              >
                <p className="text-xs uppercase tracking-[0.22em] text-chalkboard/70">
                  Track
                </p>
                <p className="mt-3 font-display text-3xl">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </PageHero>

      <EcosystemSection />

      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-7xl">
          <SectionLabel>The complete map</SectionLabel>
          <div className="mt-6 max-w-3xl">
            <h2 className="font-display text-4xl leading-tight text-chalkboard sm:text-5xl">
              Each category has a distinct job.
            </h2>
            <p className="mt-4 text-lg leading-8 text-ink-soft">
              The ecosystem grows by helping families answer one question at a
              time instead of forcing them to decode internal product structure.
            </p>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-5">
            {categories.map((category) => (
              <Card key={category.title} className="h-full">
                <h3 className="font-display text-2xl text-chalkboard">
                  {category.title}
                </h3>
                <ul className="mt-5 space-y-3 text-sm leading-7 text-ink-soft">
                  {category.items.map((item) => (
                    <li key={item}>• {item}</li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-chalkboard px-4 py-20 text-chalk sm:px-6 lg:px-8">
        <div className="mx-auto grid w-full max-w-7xl gap-6 lg:grid-cols-[0.92fr_1.08fr]">
          <Card tone="chalkboard" className="border-chalk/10 bg-chalkboard-deep/65">
            <SectionLabel>How it works together</SectionLabel>
            <h2 className="mt-6 font-display text-4xl leading-tight text-chalk sm:text-5xl">
              Everything should reinforce everything else.
            </h2>
            <p className="mt-4 text-lg leading-8 text-chalk/72">
              That is the core ecosystem rule from the platform docs, and it is
              what keeps the site from turning into disconnected offers.
            </p>
          </Card>
          <div className="grid gap-4">
            {systemNotes.map((note) => (
              <div
                key={note}
                className="rounded-[26px] border border-chalk/10 bg-chalkboard-deep/65 p-6"
              >
                <div className="flex items-start gap-4">
                  <Sparkles className="mt-1 h-5 w-5 text-gold" />
                  <p className="text-base leading-8 text-chalk/82">{note}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
