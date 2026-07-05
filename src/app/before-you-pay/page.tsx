import type { Metadata } from "next";
import { ArrowRight, CircleDollarSign, ShieldAlert, ShieldCheck, WalletCards } from "lucide-react";

import { FAQ } from "@/components/content/FAQ";
import { NewsletterSignup } from "@/components/NewsletterSignup";
import { NextStepCTA } from "@/components/NextStepCTA";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { PageHero } from "@/components/PageHero";
import { RelatedLessons } from "@/components/RelatedLessons";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";

export const metadata: Metadata = {
  title: "Before You Pay Anyone | Child Acting Scams, Costs & Vendor Safety",
  description:
    "A parent guide to spotting child acting scams, understanding normal costs, checking vendors, and making safer decisions before spending money in the entertainment industry.",
};

const directoryHref = "https://directory.childactor101.com";
const checklistHref = "https://childactor-101.eo.page/subscribe";
const heroScamLessonHref = "/from-the-classroom";

const urgencyRedFlags = [
  {
    title: "Guaranteed auditions",
    description:
      "Be careful when anyone promises access, bookings, or representation in exchange for upfront payment.",
  },
  {
    title: "Mandatory in-house services",
    description:
      "A professional may recommend resources, but pressure to buy from only their people should raise questions.",
  },
  {
    title: "Representation fees",
    description:
      "Legitimate agents and managers earn when your child earns. Upfront representation fees are a major red flag.",
  },
];

const worthConsidering = [
  "Quality headshots from a reputable youth photographer",
  "Consistent acting training with a qualified coach",
  "A professional resume and casting profile",
  "Self-tape setup basics",
  "Targeted coaching when the audition truly matters",
];

const pauseFirst = [
  "Expensive showcases promising discovery",
  "Programs that guarantee agent meetings",
  "Anyone charging upfront to represent your child",
  "Packages that bundle photos, classes, websites, and representation pressure",
  "Limited-time offers that discourage outside advice",
];

const spendQuestions = [
  "What exactly am I buying?",
  "Who benefits if I say yes today?",
  "Can I verify their reputation outside their own marketing?",
  "Is this required, recommended, or just being sold?",
  "Would a legitimate agent or manager expect this?",
];

const directoryCategories = [
  "Photographers",
  "Acting coaches",
  "Self-tape services",
  "Classes and workshops",
  "Industry resources",
];

const relatedGuidance = [
  {
    title: "The New Hollywood Casting Scam Every Parent Needs to Know About",
    chapter: "Safety & Ethics",
    description:
      "A plain-English scam lesson for the parent who wants the warning signs before someone turns hope into a sales funnel.",
    href: "/from-the-classroom/safety-ethics/the-new-hollywood-casting-scam-every-parent-needs-to-know-about",
  },
  {
    title: "Understanding Talent Rep Commissions",
    chapter: "Representation",
    description:
      "Use this before signing anything that touches money, percentages, or representation terms.",
    href: "/from-the-classroom/representation/understanding-talent-rep-commissions",
  },
  {
    title: "When to Update Child Actor Headshots",
    chapter: "Professional Materials",
    description:
      "A useful timing check when someone is pushing a new photo package before the actor actually needs one.",
    href: "/from-the-classroom/professional-materials/when-to-update-child-actor-headshots",
  },
  {
    title: "Child Acting Budget: What Families Really Spend",
    chapter: "Parent Operations",
    description:
      "A calmer budgeting lens for parents trying to separate normal costs from expensive noise.",
    href: "/from-the-classroom/parent-operations/child-acting-budget-what-families-really-spend",
  },
];

const costFaqs = [
  {
    question: "Should I ever pay upfront for representation?",
    answer:
      "As general educational guidance: be extremely cautious. Legitimate agents and managers are typically paid when the actor books work, not through large upfront representation fees.",
  },
  {
    question: "Do we need expensive headshots right away?",
    answer:
      "Not always. Good headshots matter, but timing matters too. A reputable photographer at the right stage is useful; being pressured into constant updates usually is not.",
  },
  {
    question: "Are showcases and discovery programs required?",
    answer:
      "No. Some programs may be useful in the right context, but urgency, guaranteed meetings, and discovery language should make you slow down before you pay.",
  },
  {
    question: "How do I know whether something is education or a sales trap?",
    answer:
      "Ask what the service actually delivers, whether the claims can be verified elsewhere, and whether the seller benefits from making you decide immediately. Legitimate help can survive a pause.",
  },
];

export default function BeforeYouPayPage() {
  return (
    <main className="overflow-hidden">
      <PageHero
        label="Before You Pay Anyone"
        title="A little caution can save thousands."
        description="Before you buy headshots, sign up for a program, pay for a showcase, or trust a too-perfect opportunity, take a breath. This page helps parents spot red flags, understand normal costs, and make calmer decisions before money leaves the bank."
        primaryAction={{
          href: directoryHref,
          label: "Check the Directory",
          icon: <ArrowRight className="h-5 w-5" />,
          target: "_blank",
          rel: "noreferrer",
        }}
        secondaryAction={{
          // Intended lesson route once the classroom path exists:
          // /from-the-classroom/safety-and-ethics/the-new-hollywood-casting-scam-every-parent-needs-to-know-about
          href: heroScamLessonHref,
          label: "Read Scam Red Flags",
        }}
        supportingPoints={["Protect your money", "Question urgency", "Buy with context"]}
      >
        <div className="space-y-4">
          <div className="inline-flex rotate-[-4deg] rounded-full bg-paper px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-chalkboard shadow-soft">
            Trust page
          </div>
          <div className="rounded-[24px] border border-[#a8ead6]/35 bg-[#17382b]/78 px-5 py-5 text-chalk shadow-[0_18px_40px_rgba(8,23,19,0.2)]">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#bcefdc]">
              Start here
            </p>
            <p className="mt-3 font-display text-[1.8rem] leading-tight text-white">
              The expensive mistakes usually sound urgent.
            </p>
            <p className="mt-2 text-sm leading-7 text-white/74">
              Most parents do not get scammed because they are careless. They get pressured when someone makes the opportunity feel exclusive, urgent, or impossible to question.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-[22px] bg-paper p-5 text-ink shadow-soft">
              <p className="text-sm leading-7 text-ink-soft">
                Legitimate professionals do not need fear to sell their work.
              </p>
            </div>
            <div className="rounded-[22px] bg-paper p-5 text-ink shadow-soft">
              <p className="text-sm leading-7 text-ink-soft">
                Good decisions usually get clearer when you slow the room down.
              </p>
            </div>
          </div>
        </div>
      </PageHero>

      <Section className="bg-paper px-4 py-20 sm:px-6 lg:px-8">
        <Container>
          <SectionHeader
            className="max-w-3xl"
            description="Most parents do not get scammed because they are careless. They get pressured when someone makes the opportunity feel urgent, exclusive, or impossible to question. Legitimate professionals do not need fear to sell their work."
            descriptionClassName="mt-4 text-lg leading-8 text-ink-soft"
            label="Problem statement"
            title="The expensive mistakes usually start with urgency."
            titleClassName="mt-6 text-chalkboard"
          />
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {urgencyRedFlags.map((flag, index) => (
              <Card key={flag.title} className="h-full">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-paper">
                  <ShieldAlert className="h-6 w-6 text-[#c45745]" />
                </div>
                <p className="mt-5 text-xs font-semibold uppercase tracking-[0.24em] text-purple-deep">
                  Red flag {index + 1}
                </p>
                <h2 className="mt-3 font-display text-3xl leading-tight text-chalkboard">
                  {flag.title}
                </h2>
                <p className="mt-4 text-sm leading-7 text-ink-soft">{flag.description}</p>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="bg-paper-warm px-4 py-20 sm:px-6 lg:px-8">
        <Container>
          <SectionHeader
            className="max-w-3xl"
            description="Some spending is useful. Some spending is just a well-dressed panic button. The goal is not to buy nothing. The goal is to know which category you are in."
            descriptionClassName="mt-4 text-lg leading-8 text-ink-soft"
            label="Worth it or pause?"
            title="What is usually worth paying for?"
            titleClassName="mt-6 text-chalkboard"
          />
          <div className="mt-12 grid gap-8 lg:grid-cols-2">
            <Card tone="warm" className="h-full">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white">
                <ShieldCheck className="h-6 w-6 text-[#2f704d]" />
              </div>
              <h2 className="mt-5 font-display text-3xl text-chalkboard">Worth considering</h2>
              <div className="mt-6 space-y-3">
                {worthConsidering.map((item) => (
                  <div
                    key={item}
                    className="rounded-[22px] border border-[#e7dcc7] bg-white px-5 py-4 text-sm leading-7 text-ink-soft shadow-soft"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </Card>

            <Card className="h-full bg-white">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-paper">
                <WalletCards className="h-6 w-6 text-[#c45745]" />
              </div>
              <h2 className="mt-5 font-display text-3xl text-chalkboard">Pause first</h2>
              <div className="mt-6 space-y-3">
                {pauseFirst.map((item) => (
                  <div
                    key={item}
                    className="rounded-[22px] border border-[#e7dcc7] bg-paper px-5 py-4 text-sm leading-7 text-ink-soft"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </Container>
      </Section>

      <Section className="bg-paper px-4 py-20 sm:px-6 lg:px-8">
        <Container>
          <SectionHeader
            className="max-w-3xl"
            description="Before you spend, slow the moment down and force the sales pitch to survive five basic questions."
            descriptionClassName="mt-4 text-lg leading-8 text-ink-soft"
            label="Decision filter"
            title="Before you spend, ask these questions."
            titleClassName="mt-6 text-chalkboard"
          />
          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-5">
            {spendQuestions.map((question, index) => (
              <Card key={question} className="h-full">
                <p className="flex h-10 w-10 items-center justify-center rounded-full bg-paper text-sm font-semibold text-chalkboard">
                  {index + 1}
                </p>
                <p className="mt-5 font-display text-2xl leading-tight text-chalkboard">
                  {question}
                </p>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="bg-[radial-gradient(circle_at_top_left,rgba(49,99,71,0.45),transparent_28%),linear-gradient(180deg,#173226_0%,#10261d_100%)] px-4 py-20 text-white sm:px-6 lg:px-8">
        <Container className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <div>
            <SectionHeader
              description="Normal cost ranges vary by market, experience, and timing. But pressure, guaranteed results, and blurred money terms are expensive in every city."
              descriptionClassName="mt-4 text-lg leading-8 text-white/74"
              label="Cost clarity"
              labelClassName="text-[#bcefdc]"
              title="Money should get clearer as you learn more."
              titleClassName="mt-6 text-white"
            />
            <div className="mt-8 rounded-[28px] border border-white/10 bg-white/6 p-6 backdrop-blur-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10">
                <CircleDollarSign className="h-6 w-6 text-[#bcefdc]" />
              </div>
              <p className="mt-5 text-lg leading-8 text-white/78">
                If the money conversation gets foggier as the pitch gets more emotional, that is not sophistication. It is usually a warning.
              </p>
            </div>
          </div>
          <FAQ items={costFaqs} />
        </Container>
      </Section>

      <Section className="bg-paper-warm px-4 py-20 sm:px-6 lg:px-8">
        <Container className="grid gap-10 lg:grid-cols-[1fr_1.05fr] lg:items-start">
          <div>
            <SectionHeader
              description="The Child Actor 101 Directory exists so parents can compare industry professionals, discover trusted vendors, and make decisions with more context. It should not replace your judgment, but it gives you a safer place to start."
              descriptionClassName="mt-4 text-lg leading-8 text-ink-soft"
              label="Directory spotlight"
              title="Check the Directory before you sign."
              titleClassName="mt-6 text-chalkboard"
            />
            <div className="mt-8">
              <Button href={directoryHref} size="lg" rel="noreferrer" target="_blank">
                Browse the Directory
                <ArrowRight className="h-5 w-5" />
              </Button>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {directoryCategories.map((category) => (
              <Card key={category} className="h-full bg-white">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-purple-deep">
                  Directory category
                </p>
                <h2 className="mt-4 font-display text-3xl leading-tight text-chalkboard">
                  {category}
                </h2>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="bg-paper px-4 py-20 sm:px-6 lg:px-8">
        <Container>
          <RelatedLessons
            description="Learn the rules before you spend. These classroom routes give parents the language, expectations, and caution signals that make expensive pitches easier to evaluate."
            lessons={relatedGuidance.map((item) => ({
              chapter: item.chapter,
              href: item.href,
              summary: item.description,
              title: item.title,
            }))}
            title="Learn the rules before you spend."
          />
        </Container>
      </Section>

      <Section className="bg-paper-warm px-4 py-20 sm:px-6 lg:px-8">
        <Container className="max-w-6xl">
          <NewsletterSignup
            ctaLabel="Get the Checklist"
            description="A simple parent checklist for spotting high-pressure offers, suspicious fees, and too-good-to-be-true industry promises before you spend money."
            eyebrow="Email magnet"
            href={checklistHref}
            title="Get the Red Flags Checklist."
          />
        </Container>
      </Section>

      <Section className="bg-paper px-4 pb-20 sm:px-6 lg:px-8">
        <Container className="max-w-6xl">
          <NextStepCTA
            description="Start with the Directory, read the classroom guidance, and let any pitch survive a slower, smarter conversation before you hand over money."
            eyebrow="Final CTA"
            primaryHref={directoryHref}
            primaryLabel="Check the Directory"
            secondaryHref={checklistHref}
            secondaryLabel="Get the Checklist"
            title="Spend less like a target and more like a parent with context."
          />
        </Container>
      </Section>
    </main>
  );
}
