import type { Metadata } from "next";
import { ArrowRight, ShieldCheck, Sparkles, Users } from "lucide-react";

import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { OPEN_CALL_URL, TALENT_PORTAL_URL } from "@/lib/site-links";

export const metadata: Metadata = {
  title: "Open Call for Talent Representatives",
  description:
    "How agents and managers access Child Actor 101 Talent Representation Open Calls, plus representative access to the talent portal.",
  alternates: {
    canonical: "/industry/open-call",
  },
};

const howItWorks = [
  {
    icon: <Users className="h-7 w-7 text-purple-deep" />,
    title: "Families submit for free",
    description:
      "Young performers seeking representation submit professional materials at no cost during an active Open Call window.",
  },
  {
    icon: <ShieldCheck className="h-7 w-7 text-purple-deep" />,
    title: "Materials are reviewed for readiness",
    description:
      "Submissions are organized around professional materials and personality, not volume, so reps see prepared performers.",
  },
  {
    icon: <Sparkles className="h-7 w-7 text-purple-deep" />,
    title: "Reps get streamlined access",
    description:
      "Participating agents and managers get low-friction access to submissions, with practical access for offices, assistants, and team members.",
  },
];

export default function IndustryOpenCallPage() {
  return (
    <main className="overflow-hidden">
      <Section className="px-4 pt-10 sm:px-6 lg:px-8">
        <Container>
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "For Industry", href: "/industry" },
              { label: "Open Call" },
            ]}
          />
        </Container>
      </Section>

      <Section className="px-4 pb-16 pt-10 sm:px-6 lg:px-8">
        <Container className="max-w-4xl">
          <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.24em] text-purple-deep">
            Talent Discovery
          </span>
          <h1 className="mt-6 font-display text-5xl leading-[0.95] text-chalkboard sm:text-6xl">
            Open Call for Talent Representatives
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-ink-soft sm:text-xl">
            This page is an informational bridge, not a new application
            system. It explains how the Child Actor 101 Talent Representation
            Open Call works and routes agents and managers to the existing
            submission and talent-portal systems.
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Button href={OPEN_CALL_URL} target="_blank" rel="noreferrer" size="lg">
              Access the Current Open Call
              <ArrowRight className="h-5 w-5" />
            </Button>
            <Button href={TALENT_PORTAL_URL} target="_blank" rel="noreferrer" size="lg" variant="secondary">
              Representative Access
            </Button>
          </div>
          <p className="mt-5 text-sm leading-7 text-ink-soft">
            Open Call availability changes throughout the year. The
            destinations above always reflect current status — this page
            does not track it independently.
          </p>
        </Container>
      </Section>

      <Section className="bg-paper-warm px-4 py-20 sm:px-6 lg:px-8">
        <Container>
          <SectionHeader
            className="max-w-3xl"
            label="How It Works"
            title="A free, low-friction way to see prepared talent."
          />
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {howItWorks.map((step) => (
              <Card key={step.title} className="bg-white">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-paper">
                  {step.icon}
                </div>
                <h3 className="mt-5 font-display text-2xl text-chalkboard">{step.title}</h3>
                <p className="mt-3 text-sm leading-7 text-ink-soft">{step.description}</p>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="px-4 py-20 sm:px-6 lg:px-8">
        <Container className="max-w-4xl">
          <Card tone="warm">
            <SectionHeader
              label="Not On the List Yet?"
              title="Join the representative list."
              description="If you would like early notice of upcoming Open Calls, tell us about your agency or management company."
              descriptionClassName="mt-4 text-lg leading-8 text-ink-soft"
              titleClassName="mt-6 text-chalkboard"
            />
            <Button href="/industry/get-involved" className="mt-8 w-fit">
              Join the Representative List
              <ArrowRight className="h-5 w-5" />
            </Button>
          </Card>
        </Container>
      </Section>
    </main>
  );
}
