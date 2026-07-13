import type { Metadata } from "next";
import { AlertTriangle, Fingerprint, Shield, ShieldCheck, UserRoundCheck } from "lucide-react";

import { FAQ } from "@/components/content/FAQ";
import { PageHero } from "@/components/PageHero";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Card } from "@/components/ui/Card";
import { SectionHeader } from "@/components/ui/SectionHeader";
import {
  ab1660ApplicationSteps,
  ab1660ComplianceReality,
  ab1660CoveredServices,
  ab1660Exemptions,
  ab1660Faqs,
  ab1660Intro,
  ab1660Overview,
  ab1660Penalties,
  ab1660Requirements,
  ab1660Resources,
  ab1660SafetyAlert,
  ab1660SafetyPractices,
  ab1660VerificationSteps,
  ab1660WhyItExists,
  legalFooterMeta,
} from "@/content/legal-pages";

export const metadata: Metadata = {
  title: "AB1660",
  description:
    "A redesigned parent guide to California's Child Performer Protection Act and the permit rules meant to keep minors safer in entertainment.",
};

export default function AB1660Page() {
  return (
    <main className="overflow-hidden">
      <PageHero
        label="AB1660"
        title="California's permit and background-check law for child performer services."
        description="This page preserves the parent-facing guide to AB1660, including who needs a permit, what the permit covers, how to verify it, and the practical safety steps families should use before working with anyone."
        primaryAction={{
          href: "#verification",
          label: "Verify a permit",
        }}
        secondaryAction={{
          href: "#faq",
          label: "Read the FAQs",
          variant: "secondary",
        }}
        supportingPoints={["Background checks", "Permit verification", "Minor safety first"]}
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
              Before anyone works with your child in entertainment for money, they need a Child Performer Services Permit that includes background-check clearance.
            </p>
            <p className="mt-2 text-sm leading-7 text-white/74">{ab1660Intro[0]}</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-[22px] bg-paper p-5 text-ink shadow-soft">
              <Fingerprint className="h-6 w-6 text-purple-deep" />
              <p className="mt-3 text-sm leading-7 text-ink-soft">{ab1660WhyItExists}</p>
            </div>
            <div className="rounded-[22px] bg-paper p-5 text-ink shadow-soft">
              <Shield className="h-6 w-6 text-purple-deep" />
              <p className="mt-3 text-sm leading-7 text-ink-soft">{ab1660SafetyAlert}</p>
            </div>
          </div>
        </div>
      </PageHero>

      <Section className="bg-paper px-4 py-20 sm:px-6 lg:px-8">
        <Container>
          <SectionHeader
            className="max-w-3xl"
            label="Overview"
            title="What AB1660 does and why it exists."
            titleClassName="mt-6 text-chalkboard"
            description={ab1660Overview[0]}
            descriptionClassName="mt-4 text-lg leading-8 text-ink-soft"
          />
        </Container>
      </Section>

      <Section className="bg-paper-warm px-4 py-20 sm:px-6 lg:px-8">
        <Container>
          <SectionHeader
            className="max-w-3xl"
            label="Who must be permitted"
            title="Providers working with child performers need a real permit, not a promise."
            titleClassName="mt-6 text-chalkboard"
            description="The source page breaks this into required application steps and the kinds of services that trigger the rule."
            descriptionClassName="mt-4 text-lg leading-8 text-ink-soft"
          />
          <div className="mt-12 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
            <Card tone="warm" className="h-full">
              <UserRoundCheck className="h-7 w-7 text-purple-deep" />
              <h2 className="mt-5 font-display text-3xl leading-tight text-chalkboard">
                Permit requirements
              </h2>
              <ul className="mt-5 space-y-4 pl-6 text-sm leading-7 text-ink-soft sm:text-base">
                {ab1660Requirements.map((item) => (
                  <li key={item} className="list-disc">
                    {item}
                  </li>
                ))}
              </ul>
            </Card>
            <Card className="h-full">
              <h2 className="font-display text-3xl leading-tight text-chalkboard">
                Services that require a permit
              </h2>
              <ul className="mt-5 space-y-4 pl-6 text-sm leading-7 text-ink-soft sm:text-base">
                {ab1660CoveredServices.map((item) => (
                  <li key={item} className="list-disc">
                    {item}
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </Container>
      </Section>

      <Section className="bg-paper px-4 py-20 sm:px-6 lg:px-8">
        <Container>
          <div className="grid gap-6 lg:grid-cols-[1fr_1fr_0.8fr]">
            <Card className="h-full">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-purple-deep">
                Exemptions
              </p>
              <ul className="mt-5 space-y-4 pl-6 text-sm leading-7 text-ink-soft sm:text-base">
                {ab1660Exemptions.map((item) => (
                  <li key={item} className="list-disc">
                    {item}
                  </li>
                ))}
              </ul>
            </Card>
            <Card className="h-full">
              <AlertTriangle className="h-7 w-7 text-[#c45745]" />
              <h2 className="mt-5 font-display text-3xl leading-tight text-chalkboard">
                Compliance reality check
              </h2>
              <p className="mt-4 text-sm leading-7 text-ink-soft">{ab1660ComplianceReality}</p>
            </Card>
            <Card className="h-full">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-purple-deep">
                Compliance details
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

      <Section id="verification" className="bg-paper-warm px-4 py-20 sm:px-6 lg:px-8">
        <Container>
          <SectionHeader
            className="max-w-3xl"
            label="Verification"
            title="How parents should verify a permit before hiring anyone."
            titleClassName="mt-6 text-chalkboard"
            description="The original page is blunt here: if someone cannot show proof, the safe answer is do not hire them."
            descriptionClassName="mt-4 text-lg leading-8 text-ink-soft"
          />
          <div className="mt-12 grid gap-6 lg:grid-cols-[1fr_0.9fr]">
            <Card tone="warm" className="h-full">
              <ShieldCheck className="h-7 w-7 text-purple-deep" />
              <ul className="mt-5 space-y-4 pl-6 text-sm leading-7 text-ink-soft sm:text-base">
                {ab1660VerificationSteps.map((item) => (
                  <li key={item} className="list-disc">
                    {item}
                  </li>
                ))}
              </ul>
            </Card>
            <Card className="h-full">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#c45745]">
                Absolute rule
              </p>
              <p className="mt-5 font-display text-3xl leading-tight text-chalkboard">
                No permit equals no work with your child.
              </p>
              <p className="mt-4 text-sm leading-7 text-ink-soft">
                The application process takes time. A provider saying they are about to get it is not the same as having it.
              </p>
            </Card>
          </div>
        </Container>
      </Section>

      <Section className="bg-paper px-4 py-20 sm:px-6 lg:px-8">
        <Container>
          <SectionHeader
            className="max-w-3xl"
            label="Penalties and process"
            title="Operating without a permit carries real consequences."
            titleClassName="mt-6 text-chalkboard"
            description="The source copy includes both the penalties for noncompliance and the basic application flow for providers."
            descriptionClassName="mt-4 text-lg leading-8 text-ink-soft"
          />
          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            <Card className="h-full">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-purple-deep">
                Penalties for noncompliance
              </p>
              <ul className="mt-5 space-y-4 pl-6 text-sm leading-7 text-ink-soft sm:text-base">
                {ab1660Penalties.map((item) => (
                  <li key={item} className="list-disc">
                    {item}
                  </li>
                ))}
              </ul>
            </Card>
            <Card tone="warm" className="h-full">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-purple-deep">
                How the application process works
              </p>
              <ul className="mt-5 space-y-4 pl-6 text-sm leading-7 text-ink-soft sm:text-base">
                {ab1660ApplicationSteps.map((item) => (
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
          <SectionHeader
            className="max-w-3xl"
            label="Safety practices"
            title="The permit is not the only safeguard families should use."
            titleClassName="mt-6 text-chalkboard"
            description="The page ends by pairing the law with everyday parent behavior: verify, supervise, document, and trust your instincts."
            descriptionClassName="mt-4 text-lg leading-8 text-ink-soft"
          />
          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {ab1660SafetyPractices.map((item) => (
              <Card key={item} className="h-full">
                <p className="text-sm leading-7 text-ink-soft">{item}</p>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      <Section id="faq" className="bg-paper px-4 py-20 sm:px-6 lg:px-8">
        <Container>
          <SectionHeader
            className="max-w-3xl"
            label="Frequently asked questions"
            title="Common parent questions about AB1660."
            titleClassName="mt-6 text-chalkboard"
            description="These are preserved from the existing legal-library source and focus on edge cases families actually run into."
            descriptionClassName="mt-4 text-lg leading-8 text-ink-soft"
          />
          <div className="mt-12">
            <FAQ items={ab1660Faqs.map((item) => ({ question: item.question, answer: item.answer }))} />
          </div>
        </Container>
      </Section>

      <Section className="bg-paper-warm px-4 py-20 sm:px-6 lg:px-8">
        <Container>
          <SectionHeader
            className="max-w-3xl"
            label="Resources"
            title="Reference names carried forward from the source page."
            titleClassName="mt-6 text-chalkboard"
            description="The original page listed resource names without structured URLs in the pasted source. They are preserved here without inventing outbound links."
            descriptionClassName="mt-4 text-lg leading-8 text-ink-soft"
          />
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {ab1660Resources.map((group) => (
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
