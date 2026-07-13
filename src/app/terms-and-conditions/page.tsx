import type { Metadata } from "next";
import { FileText, Gavel, Mail, ShieldCheck } from "lucide-react";

import { PageHero } from "@/components/PageHero";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Card } from "@/components/ui/Card";
import { SectionHeader } from "@/components/ui/SectionHeader";
import {
  legalFooterMeta,
  termsContents,
  termsIntroParagraphs,
  termsLastUpdated,
  termsSections,
} from "@/content/legal-pages";

export const metadata: Metadata = {
  title: "Terms and Conditions",
  description:
    "The operating terms for Child Actor 101, the Directory, and related services, carried into the redesigned legal library.",
};

function toAnchorId(sectionId: string) {
  return `section-${sectionId}`;
}

export default function TermsAndConditionsPage() {
  return (
    <main className="overflow-hidden">
      <PageHero
        label="Terms and Conditions"
        title="The operating agreement for Child Actor 101 and its related platforms."
        description="This page carries the current terms source into the redesign, including account rules, user content terms, ecommerce provisions, disclaimers, liability limitations, and dispute procedures."
        primaryAction={{
          href: "#contents",
          label: "Browse contents",
        }}
        secondaryAction={{
          href: "#section-contact-us",
          label: "Contact details",
          variant: "secondary",
        }}
        supportingPoints={[
          `Last updated ${termsLastUpdated}`,
          "California governing law",
          "Directory included",
        ]}
      >
        <div className="space-y-4">
          <div className="inline-flex rotate-[-4deg] rounded-full bg-paper px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-chalkboard shadow-soft">
            Legal library
          </div>
          <div className="rounded-[24px] border border-[#a8ead6]/35 bg-[#17382b]/78 px-5 py-5 text-chalk shadow-[0_18px_40px_rgba(8,23,19,0.2)]">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#bcefdc]">
              Introduction
            </p>
            <p className="mt-3 font-display text-[1.8rem] leading-tight text-white">
              Using the Website means agreeing to the rules that govern access, accounts, payments, content, and dispute handling.
            </p>
            <p className="mt-2 text-sm leading-7 text-white/74">{termsIntroParagraphs[1]}</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-[22px] bg-paper p-5 text-ink shadow-soft">
              <FileText className="h-6 w-6 text-purple-deep" />
              <p className="mt-3 text-sm leading-7 text-ink-soft">
                The Agreement explicitly incorporates the Privacy Policy and Disclaimer.
              </p>
            </div>
            <div className="rounded-[22px] bg-paper p-5 text-ink shadow-soft">
              <Gavel className="h-6 w-6 text-purple-deep" />
              <p className="mt-3 text-sm leading-7 text-ink-soft">
                The source terms state that California law governs use of the Website.
              </p>
            </div>
            <div className="rounded-[22px] bg-paper p-5 text-ink shadow-soft">
              <ShieldCheck className="h-6 w-6 text-purple-deep" />
              <p className="mt-3 text-sm leading-7 text-ink-soft">
                These terms apply to the main site, the Directory, and connected services operated by Ralston Entertainment.
              </p>
            </div>
          </div>
        </div>
      </PageHero>

      <Section className="bg-paper px-4 py-20 sm:px-6 lg:px-8">
        <Container>
          <SectionHeader
            className="max-w-3xl"
            label="Agreement overview"
            title="The introductory terms, preserved in redesigned form."
            titleClassName="mt-6 text-chalkboard"
            description={termsIntroParagraphs[0]}
            descriptionClassName="mt-4 text-lg leading-8 text-ink-soft"
          />
          <div className="mt-6 max-w-4xl space-y-4">
            {termsIntroParagraphs.slice(1).map((paragraph) => (
              <p key={paragraph} className="text-base leading-7 text-ink-soft">
                {paragraph}
              </p>
            ))}
          </div>
        </Container>
      </Section>

      <Section id="contents" className="bg-paper-warm px-4 py-20 sm:px-6 lg:px-8">
        <Container>
          <SectionHeader
            className="max-w-3xl"
            label="Contents"
            title="Jump to any section."
            titleClassName="mt-6 text-chalkboard"
            description="The original page included a table of contents. This version keeps the same navigational function with anchored sections below."
            descriptionClassName="mt-4 text-lg leading-8 text-ink-soft"
          />
          <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {termsSections.map((section, index) => (
              <a
                key={section.id}
                href={`#${toAnchorId(section.id)}`}
                className="rounded-[24px] border border-[#eadfc8] bg-white px-5 py-4 text-sm font-semibold text-chalkboard shadow-soft transition hover:-translate-y-0.5 hover:bg-paper"
              >
                {index + 1}. {termsContents[index]}
              </a>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="bg-paper px-4 py-20 sm:px-6 lg:px-8">
        <Container>
          <div className="grid gap-6">
            {termsSections.map((section) => (
              <Card key={section.id} className="h-full" >
                <div id={toAnchorId(section.id)} className="scroll-mt-24" />
                <h2 className="font-display text-3xl leading-tight text-chalkboard">
                  {section.title}
                </h2>
                {section.paragraphs ? (
                  <div className="mt-5 space-y-4">
                    {section.paragraphs.map((paragraph) => (
                      <p key={paragraph} className="text-sm leading-7 text-ink-soft sm:text-base">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                ) : null}
                {section.bullets ? (
                  <ul className="mt-5 space-y-4 pl-6 text-sm leading-7 text-ink-soft sm:text-base">
                    {section.bullets.map((bullet) => (
                      <li key={bullet} className="list-disc">
                        {bullet}
                      </li>
                    ))}
                  </ul>
                ) : null}
                <a
                  href="#contents"
                  className="mt-6 inline-flex text-sm font-semibold text-purple-deep transition hover:text-chalkboard"
                >
                  Back to contents
                </a>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="bg-paper-warm px-4 py-20 sm:px-6 lg:px-8">
        <Container>
          <div className="grid gap-6 lg:grid-cols-[1fr_1fr_0.9fr]">
            <Card tone="warm" className="h-full">
              <Mail className="h-7 w-7 text-purple-deep" />
              <h2 className="mt-5 font-display text-3xl leading-tight text-chalkboard">
                Contact for questions
              </h2>
              <p className="mt-4 text-sm leading-7 text-ink-soft">corey@childactor101.com</p>
            </Card>
            <Card className="h-full">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-purple-deep">
                Source note
              </p>
              <p className="mt-5 text-sm leading-7 text-ink-soft">
                This page is a structured redesign of the supplied terms source. It preserves the meaning and section flow of the attached text rather than inventing a new agreement.
              </p>
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
    </main>
  );
}
