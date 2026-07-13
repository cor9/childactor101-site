import type { Metadata } from "next";
import { Database, LockKeyhole, Mail, Shield } from "lucide-react";

import { PageHero } from "@/components/PageHero";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Card } from "@/components/ui/Card";
import { SectionHeader } from "@/components/ui/SectionHeader";
import {
  legalFooterMeta,
  privacyPolicyIntro,
  privacyPolicyLastUpdated,
  privacyPolicySections,
} from "@/content/legal-pages";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Child Actor 101 collects, uses, shares, and protects information across the site, directory, and related services.",
};

export default function PrivacyPolicyPage() {
  return (
    <main className="overflow-hidden">
      <PageHero
        label="Privacy Policy"
        title="How Child Actor 101 handles data across the site and directory."
        description="This policy covers what information is collected, how it is used, how it may be shared, and what choices families and professionals have when using Child Actor 101 services."
        primaryAction={{
          href: "#policy-sections",
          label: "Read the policy",
        }}
        secondaryAction={{
          href: "#contact",
          label: "Privacy contacts",
          variant: "secondary",
        }}
        supportingPoints={[
          `Last updated ${privacyPolicyLastUpdated}`,
          "Adults-focused service",
          "California rights included",
        ]}
      >
        <div className="space-y-4">
          <div className="inline-flex rotate-[-4deg] rounded-full bg-paper px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-chalkboard shadow-soft">
            Legal library
          </div>
          <div className="rounded-[24px] border border-[#a8ead6]/35 bg-[#17382b]/78 px-5 py-5 text-chalk shadow-[0_18px_40px_rgba(8,23,19,0.2)]">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#bcefdc]">
              Scope
            </p>
            <p className="mt-3 font-display text-[1.8rem] leading-tight text-white">
              The main site, the directory, vendor tools, newsletters, and related forms.
            </p>
            <p className="mt-2 text-sm leading-7 text-white/74">
              This is the operational privacy notice for Child Actor 101, including directory and account workflows.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-[22px] bg-paper p-5 text-ink shadow-soft">
              <LockKeyhole className="h-6 w-6 text-purple-deep" />
              <p className="mt-3 text-sm leading-7 text-ink-soft">
                The service is intended for adults, and the policy states that Child Actor 101 does not knowingly collect personal information from children under 13.
              </p>
            </div>
            <div className="rounded-[22px] bg-paper p-5 text-ink shadow-soft">
              <Shield className="h-6 w-6 text-purple-deep" />
              <p className="mt-3 text-sm leading-7 text-ink-soft">
                California rights, retention, processor disclosures, and security practices are all carried into the redesigned version here.
              </p>
            </div>
          </div>
        </div>
      </PageHero>

      <Section id="policy-sections" className="bg-paper px-4 py-20 sm:px-6 lg:px-8">
        <Container>
          <SectionHeader
            className="max-w-3xl"
            label="Policy overview"
            title="The current privacy policy, section by section."
            titleClassName="mt-6 text-chalkboard"
            description={privacyPolicyIntro[0]}
            descriptionClassName="mt-4 text-lg leading-8 text-ink-soft"
          />
          <p className="mt-6 max-w-3xl text-base leading-7 text-ink-soft">{privacyPolicyIntro[1]}</p>

          <div className="mt-12 grid gap-6">
            {privacyPolicySections.map((section) => (
              <Card key={section.title}>
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
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      <Section id="contact" className="bg-paper-warm px-4 py-20 sm:px-6 lg:px-8">
        <Container>
          <SectionHeader
            className="max-w-3xl"
            label="Privacy contacts"
            title="Where privacy questions should go."
            titleClassName="mt-6 text-chalkboard"
            description="The source policy ends with direct contact routes for privacy and legal requests."
            descriptionClassName="mt-4 text-lg leading-8 text-ink-soft"
          />

          <div className="mt-12 grid gap-6 lg:grid-cols-[1fr_1fr_0.8fr]">
            <Card tone="warm" className="h-full">
              <Mail className="h-7 w-7 text-purple-deep" />
              <h2 className="mt-5 font-display text-3xl leading-tight text-chalkboard">
                Primary privacy contact
              </h2>
              <p className="mt-4 text-sm leading-7 text-ink-soft">privacy@childactor101.com</p>
            </Card>
            <Card className="h-full">
              <Database className="h-7 w-7 text-purple-deep" />
              <h2 className="mt-5 font-display text-3xl leading-tight text-chalkboard">
                Alternate contact
              </h2>
              <p className="mt-4 text-sm leading-7 text-ink-soft">Corey@childactor101.com</p>
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
