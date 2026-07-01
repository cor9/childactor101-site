import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen, Compass, GraduationCap, LayoutGrid, Users, Sparkles, MoveRight } from "lucide-react";

import { Card } from "@/components/ui/Card";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { PageHero } from "@/components/PageHero";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Newsletter } from "@/components/content/Newsletter";
import { Pill } from "@/components/ui/Pill";
import { ChalkDust } from "@/components/primitives/ChalkDust";
import { ChalkDoodle } from "@/components/primitives/ChalkDoodle";

export const metadata: Metadata = {
  title: "Child Actor 101 Ecosystem | Tools, Training & Resources",
  description:
    "Explore the connected Child Actor 101 ecosystem of lessons, tools, training, coaching, guides, and resources for parents of young actors.",
};

const mainPathways = [
  {
    title: "Learn",
    description: "Build a strong foundation of industry knowledge.",
    icon: <BookOpen className="h-6 w-6 text-gold" />,
    items: [
      { name: "Start Here", href: "/start-here" },
      { name: "From the Classroom", href: "/from-the-classroom" },
      { name: "The Callback", href: "/from-the-classroom#newsletter" },
      { name: "Podcast", href: "/podcast" },
    ],
  },
  {
    title: "Create",
    description: "Build professional materials for your child.",
    icon: <LayoutGrid className="h-6 w-6 text-[#bcefdc]" />,
    items: [
      { name: "Resume101", href: "#resume101" },
      { name: "Pages101", href: "#pages101" },
      { name: "Prep101", href: "#prep101" },
      { name: "Reader101", href: "#reader101" },
      { name: "Bold Choices", href: "#bold-choices" },
    ],
  },
  {
    title: "Train",
    description: "Develop craft, confidence, and audition skills.",
    icon: <GraduationCap className="h-6 w-6 text-purple" />,
    items: [
      { name: "101 Training Program", href: "#training" },
      { name: "Character Lab", href: "#character-lab" },
      { name: "Audition Mastery", href: "#audition-mastery" },
      { name: "Master Methods", href: "#master-methods" },
      { name: "The Craft", href: "#the-craft" },
    ],
  },
  {
    title: "Discover & Connect",
    description: "Find trusted professionals and opportunities.",
    icon: <Users className="h-6 w-6 text-chalk" />,
    items: [
      { name: "Vendor Directory", href: "#directory" },
      { name: "Facebook Parent Group", href: "#facebook-group" },
      { name: "Industry LIVE", href: "#industry-live" },
      { name: "Open Calls", href: "#open-calls" },
    ],
  },
];

const prepareTools = [
  "Self Tape Feedback",
  "Coaching with Corey",
  "Headshot Guide",
  "Self Tape Setup Tips",
  "Zoom Callback Tips",
  "Fast Memorization",
];

const guidedPaths = [
  {
    label: "Brand-New Parent",
    title: "Learning the basics.",
    description: "The smoothest path when you are just starting out.",
    steps: ["Start Here", "From the Classroom", "Podcast", "Directory"],
  },
  {
    label: "Represented Actor Family",
    title: "Organizing the business.",
    description: "For families who already have reps but need better systems.",
    steps: ["Resume101", "Prep101", "Coaching", "Industry LIVE"],
  },
  {
    label: "Actor Needs Better Auditions",
    title: "Leveling up performance.",
    description: "When the auditions are happening but the bookings aren't.",
    steps: ["Bold Choices", "Audition Mastery", "Feedback", "101 Training"],
  },
];

export default function EcosystemPage() {
  return (
    <main className="bg-paper overflow-hidden">
      <PageHero
        label="Platform Map"
        title="The Child Actor 101 Ecosystem"
        description="A connected set of lessons, tools, training, and resources for families navigating TV and film."
        primaryAction={{
          href: "/start-here",
          label: "Start Here",
          icon: <ArrowRight className="h-5 w-5" />,
        }}
        secondaryAction={{
          href: "/from-the-classroom",
          label: "Explore the Classroom",
          icon: <Compass className="h-5 w-5" />,
        }}
        supportingPoints={[
          "Learn the business",
          "Build the materials",
          "Support the performance",
        ]}
      >
        <div className="space-y-6 py-4">
          <div className="flex items-center justify-center py-6">
            <ChalkDoodle variant="star" className="h-24 w-24 text-gold opacity-90" />
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {["Learn", "Create", "Train"].map((item) => (
              <div
                key={item}
                className="rounded-[20px] bg-paper px-4 py-5 text-center text-chalkboard shadow-soft"
              >
                <p className="text-[10px] uppercase tracking-[0.22em] text-chalkboard/70 font-semibold">
                  Pathway
                </p>
                <p className="mt-2 font-display text-2xl">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </PageHero>

      <Section className="px-4 py-20 sm:px-6 lg:px-8">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-20 lg:items-center">
            <div>
              <SectionHeader
                label="How It Connects"
                title="Everything here works together."
                description="Child Actor 101 is not a list of disconnected products. It is a single, interconnected ecosystem. Whether you start by reading a classroom lesson, taking a training program, or downloading a guide, every piece is designed to lead you naturally to the next right step."
              />
              <p className="mt-6 text-lg leading-8 text-ink-soft">
                Enter through the classroom when you need context, use the tools when you need to take action, and join the training programs when your child is ready to deepen their craft.
              </p>
            </div>
            <div className="relative">
              <div className="absolute inset-0 -m-8 bg-[radial-gradient(circle_at_center,rgba(166,120,242,0.1),transparent_70%)]" />
              <Card tone="chalkboard" className="relative border-chalk/10">
                <ChalkDust />
                <div className="relative space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-chalk/10">
                      <Sparkles className="h-6 w-6 text-gold" />
                    </div>
                    <div>
                      <h3 className="font-display text-xl text-chalk">One Mission</h3>
                      <p className="text-sm text-chalk/70">Many ways to grow</p>
                    </div>
                  </div>
                  <p className="text-lg leading-8 text-chalk/80">
                    This community exists to help families pursue this industry with more clarity, confidence, education, and support. And hopefully... a little less chaos.
                  </p>
                </div>
              </Card>
            </div>
          </div>
        </Container>
      </Section>

      <Section className="bg-paper-warm px-4 py-20 sm:px-6 lg:px-8">
        <Container>
          <SectionHeader
            className="text-center"
            titleClassName="mx-auto max-w-3xl"
            label="The Core Hubs"
            title="The four main pathways of the ecosystem."
          />
          <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {mainPathways.map((pathway) => (
              <Card key={pathway.title} className="flex h-full flex-col bg-white">
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-chalkboard shadow-soft">
                  {pathway.icon}
                </div>
                <h3 className="font-display text-2xl text-chalkboard">{pathway.title}</h3>
                <p className="mb-6 mt-3 text-sm leading-7 text-ink-soft">{pathway.description}</p>
                <div className="mt-auto space-y-3 border-t border-[#e7dcc7] pt-6">
                  {pathway.items.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="group flex items-center justify-between text-sm font-medium text-ink-soft transition hover:text-purple-deep"
                    >
                      {item.name}
                      <ArrowRight className="h-4 w-4 -translate-x-2 opacity-0 transition group-hover:translate-x-0 group-hover:opacity-100" />
                    </Link>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="relative overflow-hidden bg-[radial-gradient(circle_at_top_left,rgba(49,99,71,0.45),transparent_28%),linear-gradient(180deg,#173226_0%,#10261d_100%)] px-4 py-24 sm:px-6 lg:px-8">
        <ChalkDust />
        <ChalkDoodle variant="arrow-right" className="absolute right-10 top-20 hidden h-16 w-24 opacity-50 md:block" />
        <Container className="relative">
          <SectionHeader
            label="Guided Paths"
            labelClassName="text-[#bcefdc]"
            title="Follow a natural progression."
            titleClassName="text-white mx-auto"
            description="Rather than a long list of products, here are examples of how the ecosystem resources lead naturally into each other based on where your family is today."
            descriptionClassName="text-white/70 mx-auto"
            className="mb-16 mx-auto max-w-3xl text-center"
          />
          <div className="grid gap-8 lg:grid-cols-3">
            {guidedPaths.map((path) => (
              <div key={path.label} className="relative rounded-[32px] border border-white/10 bg-white/5 p-8 backdrop-blur-sm">
                <Pill tone="light" className="border-none bg-white/10 text-xs tracking-widest text-white uppercase">{path.label}</Pill>
                <h3 className="mt-6 font-display text-3xl text-chalk">{path.title}</h3>
                <p className="mb-8 mt-3 text-sm leading-7 text-chalk/70">{path.description}</p>
                <div className="space-y-4">
                  {path.steps.map((step, index) => (
                    <div key={step} className="flex flex-col">
                      <div className="flex items-center gap-4 rounded-2xl border border-white/5 bg-chalkboard-deep/50 px-5 py-4">
                        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-purple/20 text-xs font-bold text-purple">
                          {index + 1}
                        </div>
                        <span className="font-medium text-chalk/90">{step}</span>
                      </div>
                      {index < path.steps.length - 1 && (
                        <div className="flex justify-center py-2">
                          <MoveRight className="h-5 w-5 rotate-90 text-chalk/30" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="px-4 py-24 sm:px-6 lg:px-8">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1fr_1.3fr] lg:gap-16">
            <div>
              <SectionHeader
                label="Prepare & Coaching"
                title="Support when you need it."
                description="Sometimes you need targeted help for a specific audition or a recurring challenge. These focused tools and guides bridge the gap between learning and performing."
              />
              <div className="mt-10 grid gap-4 sm:grid-cols-2">
                {prepareTools.map((tool) => (
                  <div key={tool} className="flex items-center gap-3 rounded-full border border-[#e7dcc7] bg-white px-5 py-3 shadow-sm">
                    <Sparkles className="h-4 w-4 text-purple" />
                    <span className="text-sm font-medium text-ink-soft">{tool}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="grid gap-6 sm:grid-cols-2">
              <Card className="border-[#e7dcc7] bg-paper-warm">
                <Pill tone="light" className="mb-4">Resume101</Pill>
                <h3 className="font-display text-2xl text-chalkboard">Professional standard.</h3>
                <p className="mt-3 text-sm leading-7 text-ink-soft">A step-by-step system for creating a professional actor resume that actually gets you seen.</p>
              </Card>
              <Card className="border-[#e7dcc7] bg-paper-warm">
                <Pill tone="light" className="mb-4">Pages101</Pill>
                <h3 className="font-display text-2xl text-chalkboard">Stand out online.</h3>
                <p className="mt-3 text-sm leading-7 text-ink-soft">Optimize your casting profiles across the major platforms so you don&apos;t miss opportunities.</p>
              </Card>
              <Card className="border-[#e7dcc7] bg-paper-warm">
                <Pill tone="light" className="mb-4">Prep101</Pill>
                <h3 className="font-display text-2xl text-chalkboard">Scene breakdown.</h3>
                <p className="mt-3 text-sm leading-7 text-ink-soft">Detailed audition preparation guides to help actors understand character choices confidently.</p>
              </Card>
              <Card className="border-[#e7dcc7] bg-paper-warm">
                <Pill tone="light" className="mb-4">Vendor Directory</Pill>
                <h3 className="font-display text-2xl text-chalkboard">Trusted resources.</h3>
                <p className="mt-3 text-sm leading-7 text-ink-soft">A growing directory of trusted industry professionals, services, photographers, and coaches.</p>
              </Card>
            </div>
          </div>
        </Container>
      </Section>

      <Section className="border-y border-[#e7dcc7] bg-paper-warm px-4 py-20 sm:px-6 lg:px-8">
        <Container className="max-w-4xl text-center">
          <SectionHeader
            label="The Classroom Connection"
            title="Everything leads back to the classroom."
            description="The entire ecosystem is built around the core lessons found in From the Classroom. When a tool or training program introduces a complex concept, it links right back to the foundational classroom lesson to ensure you never feel lost."
            className="mb-8"
            titleClassName="mx-auto"
            descriptionClassName="mx-auto"
          />
          <Link
            href="/from-the-classroom"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-purple px-8 py-4 text-sm font-semibold text-white shadow-sm transition hover:bg-purple-deep"
          >
            Explore the Classroom
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Container>
      </Section>

      <Section className="bg-paper px-4 py-24 sm:px-6 lg:px-8">
        <Container className="max-w-5xl">
          <Newsletter
            title="The Callback Newsletter"
            description="Free newsletter for parents of child actors featuring practical advice, industry perspective, and updates from Corey."
            ctaLabel="Join the Newsletter"
            ctaHref="/podcast"
            label="Stay in the loop"
          />
        </Container>
      </Section>
    </main>
  );
}
