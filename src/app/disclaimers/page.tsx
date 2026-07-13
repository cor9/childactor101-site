import type { Metadata } from "next";
import { AlertCircle, Copyright, FileBadge2, Scale, ShieldCheck } from "lucide-react";

import { PageHero } from "@/components/PageHero";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Card } from "@/components/ui/Card";
import { SectionHeader } from "@/components/ui/SectionHeader";
import {
  californiaAcknowledgementNotice,
  californiaDisclosureParagraphs,
  californiaLegalSections,
  copyrightOfficeParagraphs,
  fairUseAdditionalGuidance,
  fairUseDefinitionParagraphs,
  fairUseFactors,
  fairUseIntroParagraphs,
  informationAdviceParagraphs,
  noImpliedContractParagraphs,
  permitDetails,
} from "@/content/disclaimers";

export const metadata: Metadata = {
  title: "Disclaimers",
  description:
    "Information, fair use, representation boundaries, and California compliance notices used by Child Actor 101.",
};

function ParagraphGroup({
  paragraphs,
  className = "",
}: {
  paragraphs: readonly string[];
  className?: string;
}) {
  return (
    <div className={`space-y-4 ${className}`}>
      {paragraphs.map((paragraph) => (
        <p key={paragraph} className="text-sm leading-7 text-ink-soft sm:text-base">
          {paragraph}
        </p>
      ))}
    </div>
  );
}

export default function DisclaimersPage() {
  return (
    <main className="overflow-hidden">
      <PageHero
        label="Disclaimers"
        title="The legal and educational notices behind the classroom."
        description="This page brings together the information, fair use, representation, permit, and California compliance notices used across Child Actor 101."
        primaryAction={{
          href: "#information-advice",
          label: "Read the notices",
        }}
        secondaryAction={{
          href: "#california-notice",
          label: "Jump to California notice",
          variant: "secondary",
        }}
        supportingPoints={["Educational context", "Fair use notice", "California compliance"]}
      >
        <div className="space-y-4">
          <div className="inline-flex rotate-[-4deg] rounded-full bg-paper px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-chalkboard shadow-soft">
            Transparency page
          </div>
          <div className="rounded-[24px] border border-[#a8ead6]/35 bg-[#17382b]/78 px-5 py-5 text-chalk shadow-[0_18px_40px_rgba(8,23,19,0.2)]">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#bcefdc]">
              What lives here
            </p>
            <p className="mt-3 font-display text-[1.8rem] leading-tight text-white">
              Clear boundaries, source context, and compliance language.
            </p>
            <p className="mt-2 text-sm leading-7 text-white/74">
              The goal of this page is not marketing. It is clarity about how the site presents educational material, how copyright is handled, and what legal disclosures apply to covered services.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {permitDetails.map((detail) => (
              <div
                key={detail.label}
                className="rounded-[22px] bg-paper p-5 text-ink shadow-soft"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-purple-deep">
                  {detail.label}
                </p>
                <p className="mt-3 text-sm leading-7 text-ink-soft">{detail.value}</p>
              </div>
            ))}
          </div>
        </div>
      </PageHero>

      <Section id="information-advice" className="bg-paper px-4 py-20 sm:px-6 lg:px-8">
        <Container>
          <SectionHeader
            className="max-w-3xl"
            label="Information, advice, and opinions"
            title="Educational guidance should still state its limits."
            titleClassName="mt-6 text-chalkboard"
            description="These notices explain the scope of the site's educational content, the absence of guarantees, and the limits of liability tied to informational material."
            descriptionClassName="mt-4 text-lg leading-8 text-ink-soft"
          />
          <div className="mt-12 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <Card className="h-full">
              <ParagraphGroup paragraphs={informationAdviceParagraphs} />
            </Card>
            <Card tone="warm" className="h-full">
              <AlertCircle className="h-7 w-7 text-purple-deep" />
              <h2 className="mt-5 font-display text-3xl leading-tight text-chalkboard">
                Plain-English takeaway
              </h2>
              <p className="mt-4 text-sm leading-7 text-ink-soft">
                Child Actor 101 is an educational resource. Families should still verify facts,
                make their own decisions, and seek legal or professional advice when the stakes
                require it.
              </p>
            </Card>
          </div>
        </Container>
      </Section>

      <Section className="bg-paper-warm px-4 py-20 sm:px-6 lg:px-8">
        <Container>
          <SectionHeader
            className="max-w-3xl"
            label="Fair use"
            title="Copyright context belongs next to educational use."
            titleClassName="mt-6 text-chalkboard"
            description="This section carries forward the site's fair use notice, source references, and the four-factor framework commonly cited for educational commentary and criticism."
            descriptionClassName="mt-4 text-lg leading-8 text-ink-soft"
          />
          <div className="mt-12 grid gap-6 xl:grid-cols-3">
            <Card tone="warm" className="xl:col-span-1">
              <Copyright className="h-7 w-7 text-purple-deep" />
              <h2 className="mt-5 font-display text-3xl leading-tight text-chalkboard">
                Fair use overview
              </h2>
              <ParagraphGroup paragraphs={fairUseIntroParagraphs} className="mt-4" />
            </Card>
            <Card className="xl:col-span-1">
              <h2 className="font-display text-3xl leading-tight text-chalkboard">
                Fair use definition
              </h2>
              <ParagraphGroup paragraphs={fairUseDefinitionParagraphs} className="mt-4" />
            </Card>
            <Card className="xl:col-span-1">
              <h2 className="font-display text-3xl leading-tight text-chalkboard">
                U.S. Copyright Office summary
              </h2>
              <ParagraphGroup paragraphs={copyrightOfficeParagraphs} className="mt-4" />
            </Card>
          </div>
          <div className="mt-6 grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
            <Card className="h-full">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-purple-deep">
                Section 107 factors
              </p>
              <ol className="mt-5 space-y-4 text-sm leading-7 text-ink-soft">
                {fairUseFactors.map((factor, index) => (
                  <li key={factor} className="flex gap-4">
                    <span className="font-semibold text-chalkboard">{index + 1}.</span>
                    <span>{factor}</span>
                  </li>
                ))}
              </ol>
            </Card>
            <Card className="h-full">
              <h2 className="font-display text-3xl leading-tight text-chalkboard">
                Additional guidance
              </h2>
              <ParagraphGroup paragraphs={fairUseAdditionalGuidance} className="mt-4" />
            </Card>
          </div>
        </Container>
      </Section>

      <Section className="bg-paper px-4 py-20 sm:px-6 lg:px-8">
        <Container>
          <SectionHeader
            className="max-w-3xl"
            label="Representation and permits"
            title="Educational services are not representation promises."
            titleClassName="mt-6 text-chalkboard"
            description="This section preserves the no-implied-contract language and the permit, bond, and insurance details presented on the original page."
            descriptionClassName="mt-4 text-lg leading-8 text-ink-soft"
          />
          <div className="mt-12 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
            <Card tone="warm" className="h-full">
              <ShieldCheck className="h-7 w-7 text-purple-deep" />
              <h2 className="mt-5 font-display text-3xl leading-tight text-chalkboard">
                No implied contract for representation
              </h2>
              <ParagraphGroup paragraphs={noImpliedContractParagraphs} className="mt-4" />
            </Card>
            <Card className="h-full">
              <FileBadge2 className="h-7 w-7 text-purple-deep" />
              <h2 className="mt-5 font-display text-3xl leading-tight text-chalkboard">
                Permits, bond, and insurance
              </h2>
              <div className="mt-6 grid gap-4 sm:grid-cols-3">
                {permitDetails.map((detail) => (
                  <div
                    key={detail.label}
                    className="rounded-[24px] border border-[#ece2d0] bg-paper px-5 py-5"
                  >
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-purple-deep">
                      {detail.label}
                    </p>
                    <p className="mt-3 text-sm leading-7 text-ink-soft">{detail.value}</p>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </Container>
      </Section>

      <Section id="california-notice" className="bg-chalkboard px-4 py-20 sm:px-6 lg:px-8">
        <Container>
          <SectionHeader
            className="max-w-3xl"
            label="California AB1319"
            labelClassName="text-[#bcefdc]"
            title="California fee-related talent services notice"
            titleClassName="mt-6 text-white"
            description="The material below carries forward the California disclosure and Labor Code notice tied to covered counseling, training, and related services."
            descriptionClassName="mt-4 text-lg leading-8 text-white/72"
          />
          <div className="mt-12 grid gap-6">
            <Card tone="chalkboard">
              <Scale className="h-7 w-7 text-[#bcefdc]" />
              <div className="mt-5 grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
                <div>
                  <h2 className="font-display text-3xl leading-tight text-white">
                    Disclosure context
                  </h2>
                  <div className="mt-4 space-y-4">
                    {californiaDisclosureParagraphs.map((paragraph) => (
                      <p key={paragraph} className="text-sm leading-7 text-white/74 sm:text-base">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>
                <div className="rounded-[28px] border border-white/10 bg-white/6 px-6 py-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#bcefdc]">
                    Acknowledgement notice
                  </p>
                  <div className="mt-4 space-y-4">
                    {californiaAcknowledgementNotice.map((paragraph) => (
                      <p key={paragraph} className="text-sm leading-7 text-white/78 sm:text-base">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </Card>

            {californiaLegalSections.map((section) => {
              const ListTag = section.listType === "ordered" ? "ol" : "ul";

              return (
                <Card key={section.title} tone="chalkboard">
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#bcefdc]">
                    {section.eyebrow}
                  </p>
                  <h2 className="mt-4 font-display text-3xl leading-tight text-white">
                    {section.title}
                  </h2>
                  {section.paragraphs ? (
                    <div className="mt-5 space-y-4">
                      {section.paragraphs.map((paragraph) => (
                        <p
                          key={paragraph}
                          className="text-sm leading-7 text-white/76 sm:text-base"
                        >
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  ) : null}
                  {section.items ? (
                    <ListTag
                      className={`mt-5 space-y-4 text-sm leading-7 text-white/76 sm:text-base ${
                        section.listType === "ordered" ? "list-decimal pl-6" : "list-disc pl-6"
                      }`}
                    >
                      {section.items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ListTag>
                  ) : null}
                  {section.closingParagraphs ? (
                    <div className="mt-5 space-y-4">
                      {section.closingParagraphs.map((paragraph) => (
                        <p
                          key={paragraph}
                          className="text-sm leading-7 text-white/76 sm:text-base"
                        >
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  ) : null}
                  {section.noticeText ? (
                    <div className="mt-6 rounded-[28px] border border-white/10 bg-white/6 px-6 py-6">
                      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#bcefdc]">
                        Required contract notice
                      </p>
                      <p className="mt-4 whitespace-pre-line text-sm leading-7 text-white/78">
                        {section.noticeText}
                      </p>
                    </div>
                  ) : null}
                </Card>
              );
            })}
          </div>
        </Container>
      </Section>
    </main>
  );
}
