import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { fiveDoorCards } from "@/content/five-doors";

export function FiveDoorsSection() {
  return (
    <Section className="bg-paper-warm px-4 py-20 sm:px-6 lg:px-8">
      <Container>
        <SectionHeader
          className="max-w-3xl"
          description="Choose the door that matches the problem in front of you. We’ll give you the clearest first answer, then one next step."
          descriptionClassName="mt-4 text-[1.2rem] leading-8 text-ink-soft sm:text-[1.35rem]"
          title="What brings you here today?"
          titleClassName="text-chalkboard"
        />

        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {fiveDoorCards.map((door, index) => {
            const isFeatured = index === 0;

            return (
              <Link
                key={door.title}
                href={door.href}
                className={`group block h-full ${isFeatured ? "xl:col-span-2 xl:row-span-2" : ""}`}
              >
                <article
                  className={`relative flex h-full min-h-[250px] flex-col overflow-hidden rounded-[34px] border border-[#e7dcc7] bg-white p-7 shadow-[var(--shadow-paper)] transition duration-200 hover:-translate-y-1 hover:shadow-[0_24px_48px_rgba(23,56,43,0.12)] sm:p-8 ${
                    isFeatured
                      ? "bg-[radial-gradient(circle_at_top_left,rgba(244,201,93,0.2),transparent_36%),linear-gradient(180deg,#fffdf8_0%,#f7efe0_100%)]"
                      : ""
                  }`}
                >
                  <div className="absolute right-5 top-1/2 hidden h-14 w-2 -translate-y-1/2 rounded-full bg-[#d7c7a2] opacity-75 xl:block" />
                  <span className="text-xs font-semibold uppercase tracking-[0.24em] text-purple-deep">
                    Door {index + 1}
                  </span>
                  <h2
                    className={`mt-5 max-w-[18ch] font-display leading-tight text-chalkboard ${
                      isFeatured ? "text-4xl sm:text-5xl" : "text-3xl"
                    }`}
                  >
                    {door.title}
                  </h2>
                  <p
                    className={`mt-4 max-w-[32ch] text-ink-soft ${
                      isFeatured ? "text-lg leading-8" : "text-sm leading-7"
                    }`}
                  >
                    {door.description}
                  </p>
                  <div className="mt-auto inline-flex items-center gap-2 pt-8 text-sm font-semibold text-purple-deep transition group-hover:text-chalkboard">
                    Enter here
                    <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                  </div>
                </article>
              </Link>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
