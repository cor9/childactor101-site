import type { Metadata } from "next";
import {
  ArrowRight,
  BookOpen,
  Handshake,
  Mic2,
  Newspaper,
  Radio,
  UserCheck,
  Users,
} from "lucide-react";

import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { PageHero } from "@/components/PageHero";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { DIRECTORY_URL } from "@/lib/site-links";
import { GetInvolvedForm } from "./_components/GetInvolvedForm";

export const metadata: Metadata = {
  title: "Get Involved | Industry Professionals",
  description:
    "Child Actor 101 regularly works with agents, managers, casting professionals, coaches, photographers, educators, attorneys, creators, and other experts who want to help families navigate the business more intelligently.",
  alternates: {
    canonical: "/industry/get-involved",
  },
};

const ways = [
  {
    title: "Open Call",
    description: "Participate as an agent or manager reviewing talent.",
    icon: <UserCheck className="h-6 w-6 text-gold" />,
    href: "/industry/open-call",
  },
  {
    title: "The Callback",
    description: "Join Corey for a podcast conversation.",
    icon: <Mic2 className="h-6 w-6 text-[#bcefdc]" />,
    href: "/media",
  },
  {
    title: "Live Events",
    description: "Speak at parent Q&As, panels, webinars, or community events.",
    icon: <Radio className="h-6 w-6 text-purple" />,
    href: "/media",
  },
  {
    title: "Expert Contributions",
    description: "Contribute perspective, quotes, articles, interviews, reviews, or educational guidance.",
    icon: <Newspaper className="h-6 w-6 text-chalk" />,
    href: "/media",
  },
  {
    title: "Directory",
    description: "Join or claim a professional listing.",
    icon: <Users className="h-6 w-6 text-gold" />,
    href: DIRECTORY_URL,
    external: true,
  },
  {
    title: "Educational Collaboration",
    description: "Partner on a resource, panel, guide, class conversation, research project, or industry initiative.",
    icon: <BookOpen className="h-6 w-6 text-[#bcefdc]" />,
  },
  {
    title: "Community Expert",
    description: "Potentially participate in Child Actor 101 community discussions or moderation where appropriate.",
    icon: <Handshake className="h-6 w-6 text-purple" />,
  },
];

export default function GetInvolvedPage() {
  return (
    <main className="overflow-hidden">
      <Section className="px-4 pt-10 sm:px-6 lg:px-8">
        <Container>
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "For Industry", href: "/industry" },
              { label: "Get Involved" },
            ]}
          />
        </Container>
      </Section>

      <PageHero
        label="Get Involved"
        title="Good professionals make the whole industry better."
        description="Child Actor 101 regularly works with agents, managers, casting professionals, coaches, photographers, educators, attorneys, creators, and other experts who want to help families navigate the business more intelligently."
        primaryAction={{
          href: "#form",
          label: "Tell us what you have in mind",
          icon: <ArrowRight className="h-5 w-5" />,
        }}
        secondaryAction={{
          href: "/industry",
          label: "Back to For Industry",
        }}
        supportingPoints={["Open Call", "Podcast & events", "Directory & collaboration"]}
      >
        <div className="space-y-4">
          <p className="text-sm leading-7 text-chalk/82">
            Legitimate youth-entertainment professionals of every kind are
            welcome here — this page is the permanent intake, not a
            one-time campaign.
          </p>
          <div className="rounded-[22px] border border-chalk/10 bg-chalkboard-soft/60 p-5">
            <p className="text-xs uppercase tracking-[0.22em] text-chalk/65">
              Good to know
            </p>
            <p className="mt-3 text-sm leading-7 text-chalk/80">
              Filling this out starts a conversation. It does not guarantee
              placement, publication, or participation in any specific
              program.
            </p>
          </div>
        </div>
      </PageHero>

      <Section className="px-4 py-20 sm:px-6 lg:px-8">
        <Container>
          <SectionHeader
            className="max-w-3xl"
            label="Ways to Participate"
            title="Pick the path that fits, or tell us something else entirely."
          />
          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {ways.map((way) => (
              <Card key={way.title} className="flex h-full flex-col">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-chalkboard shadow-soft">
                  {way.icon}
                </div>
                <h3 className="mt-5 font-display text-2xl text-chalkboard">{way.title}</h3>
                <p className="mt-3 flex-1 text-sm leading-7 text-ink-soft">{way.description}</p>
                {way.href ? (
                  <Button
                    href={way.href}
                    variant="secondary"
                    className="mt-6 w-fit"
                    target={way.external ? "_blank" : undefined}
                    rel={way.external ? "noreferrer" : undefined}
                  >
                    Learn more
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                ) : null}
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      <Section id="form" className="bg-paper-warm px-4 py-20 sm:px-6 lg:px-8">
        <Container className="max-w-3xl">
          <SectionHeader
            label="Tell Us About You"
            title="Get involved."
            description="Share a bit about your work and what you're interested in. This starts the conversation — Corey and the team follow up from there."
            descriptionClassName="mt-4 text-lg leading-8 text-ink-soft"
            titleClassName="mt-6 text-chalkboard"
          />
          <Card className="mt-10 bg-white">
            <GetInvolvedForm />
          </Card>
        </Container>
      </Section>
    </main>
  );
}
