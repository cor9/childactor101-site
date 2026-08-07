import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { PageHero } from "@/components/PageHero";
import { Pill } from "@/components/ui/Pill";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { CTA } from "@/components/content/CTA";
import {
  DIRECTORY_URL,
  MEMORIZATION_GUIDE_URL,
  PAGES101_URL,
  RESUME101_URL,
  ZOOM_CALLBACK_GUIDE_URL,
} from "@/lib/site-links";

export const metadata: Metadata = {
  title: "Resources for Talent Agents & Youth Entertainment Professionals",
  description:
    "Clear guides, tools, and parent education for the questions youth-industry professionals answer every week — organized for agents, managers, coaches, and casting professionals to share directly with families.",
  alternates: {
    canonical: "/industry/resources",
  },
};

type ResourceItem = {
  title: string;
  description: string;
  href: string;
  external?: boolean;
};

type ResourceCategory = {
  label: string;
  description: string;
  items: ResourceItem[];
};

const categories: ResourceCategory[] = [
  {
    label: "Professional Materials",
    description: "What families need before their materials look and read as professional.",
    items: [
      {
        title: "Resume",
        description: "Resume101 helps families build and maintain a professional actor résumé.",
        href: RESUME101_URL,
        external: true,
      },
      {
        title: "Actor page",
        description: "Pages101 builds a safety-conscious actor page for sharing materials.",
        href: PAGES101_URL,
        external: true,
      },
      {
        title: "Headshots",
        description: "When it's actually time to update headshots, and why.",
        href: "/from-the-classroom/professional-materials/when-to-update-child-actor-headshots",
      },
      {
        title: "Casting profiles",
        description: "Keeping an Actors Access profile clean, accurate, and professional.",
        href: "/from-the-classroom/professional-materials/actors-access-for-parents-of-child-actors",
      },
    ],
  },
  {
    label: "Auditions",
    description: "The mechanics of self tapes, slates, and callbacks, explained plainly.",
    items: [
      {
        title: "Self tape",
        description: "The essential, cost-effective equipment families actually need.",
        href: "/from-the-classroom/auditions/self-tape-equipment-for-child-actors",
      },
      {
        title: "Memorization",
        description: "A practical technique for learning lines faster without cramming.",
        href: MEMORIZATION_GUIDE_URL,
        external: true,
      },
      {
        title: "Slate",
        description: "How to build a natural, grounded slate that makes a strong first impression.",
        href: "/from-the-classroom/auditions/how-to-build-a-better-audition-slate",
      },
      {
        title: "Callback",
        description: "A calm checklist for showing up prepared to a virtual callback.",
        href: ZOOM_CALLBACK_GUIDE_URL,
        external: true,
      },
      {
        title: "Reader",
        description: "Reader101 is part of the connected audition-preparation tool family.",
        href: "/ecosystem",
      },
    ],
  },
  {
    label: "Representation",
    description: "The business side of agents, managers, and submissions.",
    items: [
      {
        title: "Agent vs. manager",
        description: "The core differences families need before building a rep team.",
        href: "/from-the-classroom/representation/agents-vs-managers-for-child-actors",
      },
      {
        title: "Rep commissions",
        description: "Standard commission structures and the red flags to avoid.",
        href: "/from-the-classroom/representation/understanding-talent-rep-commissions",
      },
      {
        title: "Booking out",
        description: "Why booking out well is one of the fastest ways to look professional.",
        href: "/from-the-classroom/representation/booking-out-for-child-actors",
      },
      {
        title: "Submission preparation",
        description: "Milestones to hit before a family is ready to seek representation.",
        href: "/from-the-classroom/representation/is-my-child-ready-for-an-agent",
      },
    ],
  },
  {
    label: "Parent Business",
    description: "The financial and legal basics families should not learn the hard way.",
    items: [
      {
        title: "Expenses",
        description: "Simple systems for tracking auditions and spending.",
        href: "/from-the-classroom/parent-operations/how-to-track-auditions-and-expenses",
      },
      {
        title: "Coogan account",
        description: "What a Coogan account protects and where it's legally required.",
        href: "/from-the-classroom/safety-ethics/what-is-a-coogan-account",
      },
      {
        title: "Taxes",
        description: "Basic record-keeping habits for treating this like a small business.",
        href: "/from-the-classroom/parent-operations/tax-guide-for-parents-of-child-actors",
      },
      {
        title: "Child labor basics",
        description: "The legal protections around set hours, education, and welfare.",
        href: "/from-the-classroom/safety-ethics/child-labor-laws-for-child-actors",
      },
    ],
  },
  {
    label: "Safety",
    description: "Helping families avoid the most expensive and painful mistakes.",
    items: [
      {
        title: "Scam red flags",
        description: "How to recognize modern casting scams before money changes hands.",
        href: "/from-the-classroom/safety-ethics/the-new-hollywood-casting-scam-every-parent-needs-to-know-about",
      },
      {
        title: "Online safety",
        description: "Balancing professional visibility with a child's privacy and safety.",
        href: "/from-the-classroom/safety-ethics/tiktok-and-your-child-actor-safety",
      },
      {
        title: "Paying professionals",
        description: "The Directory helps families find and vet who they're paying for services.",
        href: DIRECTORY_URL,
        external: true,
      },
    ],
  },
  {
    label: "Training",
    description: "Setting realistic expectations about skill-building and pacing.",
    items: [
      {
        title: "Training readiness",
        description: "How to assess whether a young actor is ready for training, not just age.",
        href: "/from-the-classroom/start-here/when-should-my-child-start-acting-training",
      },
      {
        title: "Consistency",
        description: "Why steady, ongoing training beats cramming before an audition.",
        href: "/from-the-classroom/career-growth/why-consistent-training-matters-for-young-actors",
      },
      {
        title: "Audition technique",
        description: "What actually makes a self-tape performance competitive.",
        href: "/from-the-classroom/auditions/what-makes-a-child-actors-self-tape-competitive",
      },
    ],
  },
];

export default function IndustryResourcesPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Resources for Talent Agents & Youth Entertainment Professionals | Child Actor 101",
    description:
      "Clear guides, tools, and parent education for the questions youth-industry professionals answer every week.",
    url: "https://www.childactor101.com/industry/resources",
  };

  return (
    <main className="overflow-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <Section className="px-4 pt-10 sm:px-6 lg:px-8">
        <Container>
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "For Industry", href: "/industry" },
              { label: "Resources" },
            ]}
          />
        </Container>
      </Section>

      <PageHero
        label="Professional Resources"
        title="Useful things to send your clients."
        description="Clear guides, tools, and parent education for the questions youth-industry professionals answer every week."
        primaryAction={{
          href: "#categories",
          label: "Browse by category",
          icon: <ArrowRight className="h-5 w-5" />,
        }}
        secondaryAction={{
          href: "/industry",
          label: "Back to For Industry",
        }}
        supportingPoints={["Organized by problem", "Real classroom lessons", "Free to share"]}
      >
        <div className="space-y-4">
          <p className="text-sm leading-7 text-chalk/82">
            This page is built to be shareable: send a link instead of
            re-explaining the same industry basics to a new family.
          </p>
          <div className="grid gap-3">
            {categories.map((category) => (
              <div
                key={category.label}
                className="rounded-[20px] border border-chalk/10 bg-chalkboard-deep/55 px-4 py-3"
              >
                <p className="text-sm font-semibold text-white">{category.label}</p>
                <p className="mt-1 text-xs leading-6 text-chalk/70">{category.description}</p>
              </div>
            ))}
          </div>
        </div>
      </PageHero>

      <Section id="categories" className="px-4 pb-24 sm:px-6 lg:px-8">
        <Container className="space-y-14">
          {categories.map((category) => (
            <div key={category.label}>
              <SectionHeader
                label={category.label}
                labelClassName="text-purple-deep"
                title={category.description}
                titleClassName="mt-3 text-3xl text-chalkboard sm:text-4xl"
              />
              <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
                {category.items.map((item) => (
                  <Card key={item.title} className="flex h-full flex-col bg-white">
                    <Pill tone="light" className="w-fit px-4 py-2 text-xs uppercase tracking-[0.22em]">
                      {item.title}
                    </Pill>
                    <p className="mt-4 flex-1 text-sm leading-7 text-ink-soft">{item.description}</p>
                    <Link
                      href={item.href}
                      target={item.external ? "_blank" : undefined}
                      rel={item.external ? "noreferrer" : undefined}
                      className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-purple-deep transition hover:text-chalkboard"
                    >
                      Open resource
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </Container>
      </Section>

      <Section className="bg-paper-warm px-4 py-20 sm:px-6 lg:px-8">
        <Container className="max-w-5xl">
          <CTA
            label="Next Step"
            title="Want to be part of the ecosystem, not just a link you send?"
            description="Join the Directory, contribute expertise, or bring your Open Call submissions into one place."
            actionHref="/industry/get-involved"
            actionLabel="Get Involved"
            actionIcon={<ArrowRight className="h-5 w-5" />}
          />
        </Container>
      </Section>
    </main>
  );
}
