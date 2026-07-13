import type { Metadata } from "next";
import { AlertTriangle, BadgeDollarSign, FileText, ShieldAlert, ShieldCheck } from "lucide-react";

import { FAQ } from "@/components/content/FAQ";
import { PageHero } from "@/components/PageHero";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Card } from "@/components/ui/Card";
import { SectionHeader } from "@/components/ui/SectionHeader";
import {
  ab1319AppliesTo,
  ab1319Faqs,
  ab1319IfScammed,
  ab1319Intro,
  ab1319LegitVsScam,
  ab1319Protections,
  ab1319RedFlags,
  ab1319Resources,
  ab1319SimpleVersion,
  ab1319SuccessPath,
  ab1319VerifySteps,
  ab1319VerifyTip,
  ab1319WhyItMatters,
  legalFooterMeta,
} from "@/content/legal-pages";

export const metadata: Metadata = {
  title: "AB1319",
  description:
    "A redesigned parent guide to California's Krekorian Talent Scam Prevention Act and the warning signs around advance-fee talent services.",
};

export default function AB1319Page() {
  return (
    <main className="overflow-hidden">
      <PageHero
        label="AB1319"
        title="California's scam-prevention law for talent services."
        description="This page carries forward the parent-facing guide to the Krekorian Talent Scam Prevention Act, including what it covers, red flags to watch for, and the practical steps families can take before paying anyone."
        primaryAction={{
          href: "#protections",
          label: "See the protections",
        }}
        secondaryAction={{
          href: "#red-flags",
          label: "Review warning signs",
          variant: "secondary",
        }}
        supportingPoints={["Advance-fee rules", "$50,000 bond", "Parent verification steps"]}
      >
        <div className="space-y-4">
          <div className="inline-flex rotate-[-4deg] rounded-full bg-paper px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-chalkboard shadow-soft">
            Legal library
          </div>
          <div className="rounded-[24px] border border-[#a8ead6]/35 bg-[#17382b]/78 px-5 py-5 text-chalk shadow-[0_18px_40px_rgba(8,23,19,0.2)]">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#bcefdc]">
              Bottom line for parents
            </p>
            <p className="mt-3 font-display text-[1.8rem] leading-tight text-white">
              If someone wants money upfront for opportunities in acting, modeling, or music, they must follow strict rules or they are likely breaking the law.
            </p>
            <p className="mt-2 text-sm leading-7 text-white/74">{ab1319Intro[0]}</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-[22px] bg-paper p-5 text-ink shadow-soft">
              <BadgeDollarSign className="h-6 w-6 text-purple-deep" />
              <p className="mt-3 text-sm leading-7 text-ink-soft">{ab1319WhyItMatters}</p>
            </div>
            <div className="rounded-[22px] bg-paper p-5 text-ink shadow-soft">
              <ShieldAlert className="h-6 w-6 text-purple-deep" />
              <p className="mt-3 text-sm leading-7 text-ink-soft">
                This law exists because families were being sold expensive promises instead of legitimate industry help.
              </p>
            </div>
          </div>
        </div>
      </PageHero>

      <Section className="bg-paper px-4 py-20 sm:px-6 lg:px-8">
        <Container>
          <SectionHeader
            className="max-w-3xl"
            label="Simple version"
            title="What AB1319 does in practical terms."
            titleClassName="mt-6 text-chalkboard"
            description={ab1319SimpleVersion[0]}
            descriptionClassName="mt-4 text-lg leading-8 text-ink-soft"
          />
          <p className="mt-6 max-w-3xl text-base leading-7 text-ink-soft">{ab1319SimpleVersion[1]}</p>
        </Container>
      </Section>

      <Section id="protections" className="bg-paper-warm px-4 py-20 sm:px-6 lg:px-8">
        <Container>
          <SectionHeader
            className="max-w-3xl"
            label="Key protections"
            title="The law is designed to slow down scams before they take your money."
            titleClassName="mt-6 text-chalkboard"
            description="The source page focused on four parent-facing protections: no advance-fee opportunity selling, clearer paperwork, bonding, and a direct path to sue when harm occurs."
            descriptionClassName="mt-4 text-lg leading-8 text-ink-soft"
          />
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {ab1319Protections.map((item) => (
              <Card key={item.title} tone="warm" className="h-full">
                <ShieldCheck className="h-7 w-7 text-purple-deep" />
                <h2 className="mt-5 font-display text-3xl leading-tight text-chalkboard">
                  {item.title}
                </h2>
                <p className="mt-4 text-sm leading-7 text-ink-soft">{item.description}</p>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="bg-paper px-4 py-20 sm:px-6 lg:px-8">
        <Container>
          <div className="grid gap-6 lg:grid-cols-2">
            <Card className="h-full">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-purple-deep">
                Who it applies to
              </p>
              <ul className="mt-5 space-y-4 pl-6 text-sm leading-7 text-ink-soft sm:text-base">
                {ab1319AppliesTo.map((item) => (
                  <li key={item} className="list-disc">
                    {item}
                  </li>
                ))}
              </ul>
            </Card>
            <Card className="h-full">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-purple-deep">
                The real path to success
              </p>
              <ul className="mt-5 space-y-4 pl-6 text-sm leading-7 text-ink-soft sm:text-base">
                {ab1319SuccessPath.map((item) => (
                  <li key={item} className="list-disc">
                    {item}
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </Container>
      </Section>

      <Section id="red-flags" className="bg-paper-warm px-4 py-20 sm:px-6 lg:px-8">
        <Container>
          <SectionHeader
            className="max-w-3xl"
            label="Red flags"
            title="The sales patterns families should slow down around."
            titleClassName="mt-6 text-chalkboard"
            description="These warning signs come directly from the parent-facing source copy and are the right first filter before signing anything."
            descriptionClassName="mt-4 text-lg leading-8 text-ink-soft"
          />
          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {ab1319RedFlags.map((item) => (
              <Card key={item} className="h-full">
                <AlertTriangle className="h-7 w-7 text-[#c45745]" />
                <p className="mt-5 text-sm leading-7 text-ink-soft">{item}</p>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="bg-paper px-4 py-20 sm:px-6 lg:px-8">
        <Container>
          <SectionHeader
            className="max-w-3xl"
            label="Legitimate vs scam"
            title="What normal industry behavior looks like and what it does not."
            titleClassName="mt-6 text-chalkboard"
            description="The original copy makes a strong comparison between legitimate service providers and scam operations. Keeping that contrast visible helps families make faster decisions."
            descriptionClassName="mt-4 text-lg leading-8 text-ink-soft"
          />
          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            <Card tone="warm" className="h-full">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-purple-deep">
                Legitimate entertainment services
              </p>
              <ul className="mt-5 space-y-4 pl-6 text-sm leading-7 text-ink-soft sm:text-base">
                {ab1319LegitVsScam.legit.map((item) => (
                  <li key={item} className="list-disc">
                    {item}
                  </li>
                ))}
              </ul>
            </Card>
            <Card className="h-full">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#c45745]">
                Scam operations typically
              </p>
              <ul className="mt-5 space-y-4 pl-6 text-sm leading-7 text-ink-soft sm:text-base">
                {ab1319LegitVsScam.scam.map((item) => (
                  <li key={item} className="list-disc">
                    {item}
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </Container>
      </Section>

      <Section className="bg-paper-warm px-4 py-20 sm:px-6 lg:px-8">
        <Container>
          <div className="grid gap-6 lg:grid-cols-[1fr_1fr_0.8fr]">
            <Card tone="warm" className="h-full">
              <FileText className="h-7 w-7 text-purple-deep" />
              <h2 className="mt-5 font-display text-3xl leading-tight text-chalkboard">
                How to verify a company's compliance
              </h2>
              <ul className="mt-5 space-y-4 pl-6 text-sm leading-7 text-ink-soft sm:text-base">
                {ab1319VerifySteps.map((item) => (
                  <li key={item} className="list-disc">
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-5 text-sm leading-7 text-ink-soft">{ab1319VerifyTip}</p>
            </Card>
            <Card className="h-full">
              <AlertTriangle className="h-7 w-7 text-[#c45745]" />
              <h2 className="mt-5 font-display text-3xl leading-tight text-chalkboard">
                What to do if you've been scammed
              </h2>
              <ul className="mt-5 space-y-4 pl-6 text-sm leading-7 text-ink-soft sm:text-base">
                {ab1319IfScammed.map((item) => (
                  <li key={item} className="list-disc">
                    {item}
                  </li>
                ))}
              </ul>
            </Card>
            <Card className="h-full">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-purple-deep">
                Permit and bond notes
              </p>
              <div className="mt-5 space-y-4">
                {legalFooterMeta.map((item) => (
                  <div key={item.label}>
                    <p className="text-sm font-semibold text-chalkboard">{item.label}</p>
                    <p className="text-sm leading-7 text-ink-soft">{item.value}</p>
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
            label="Frequently asked questions"
            title="Common parent questions about AB1319."
            titleClassName="mt-6 text-chalkboard"
            description="The questions below are taken from the source legal-library page and preserved in redesigned form."
            descriptionClassName="mt-4 text-lg leading-8 text-ink-soft"
          />
          <div className="mt-12">
            <FAQ items={ab1319Faqs.map((item) => ({ question: item.question, answer: item.answer }))} />
          </div>
        </Container>
      </Section>

      <Section className="bg-paper-warm px-4 py-20 sm:px-6 lg:px-8">
        <Container>
          <SectionHeader
            className="max-w-3xl"
            label="Resources"
            title="Reference points families may want nearby."
            titleClassName="mt-6 text-chalkboard"
            description="The original page listed resource names rather than a structured bibliography. Those references are preserved here as source labels without inventing links."
            descriptionClassName="mt-4 text-lg leading-8 text-ink-soft"
          />
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {ab1319Resources.map((group) => (
              <Card key={group.heading} className="h-full">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-purple-deep">
                  {group.heading}
                </p>
                <ul className="mt-5 space-y-4 pl-6 text-sm leading-7 text-ink-soft sm:text-base">
                  {group.items.map((item) => (
                    <li key={item} className="list-disc">
                      {item}
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </Container>
      </Section>
    </main>
  );
}
