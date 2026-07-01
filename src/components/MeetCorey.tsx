import { ArrowRight } from "lucide-react";

import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { SectionLabel } from "@/components/SectionLabel";

export function MeetCorey() {
  return (
    <section id="corey" className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto grid w-full max-w-7xl gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <Card tone="warm" className="overflow-hidden">
          <SectionLabel>Meet your teacher</SectionLabel>
          <div className="mt-6 rounded-[24px] border border-dashed border-chalkboard/20 bg-paper p-6">
            <div className="flex aspect-[4/5] items-center justify-center rounded-[20px] bg-[linear-gradient(180deg,rgba(35,79,59,0.08),rgba(166,120,242,0.14))]">
              <div className="text-center">
                <p className="font-display text-5xl text-chalkboard">CR</p>
                <p className="mt-2 text-sm uppercase tracking-[0.18em] text-ink-soft">
                  Your headshot here
                </p>
              </div>
            </div>
          </div>
        </Card>

        <Card className="lg:p-10">
          <SectionLabel>Meet your teacher</SectionLabel>
          <h2 className="mt-6 font-display text-4xl leading-tight text-chalkboard sm:text-5xl">
            Corey Ralston
          </h2>
          <div className="mt-5 flex flex-wrap gap-3 text-sm font-medium text-chalkboard">
            <span className="rounded-full bg-paper-warm px-4 py-2">
              Former child actor
            </span>
            <span className="rounded-full bg-paper-warm px-4 py-2">
              Youth talent manager
            </span>
            <span className="rounded-full bg-paper-warm px-4 py-2">Founder</span>
          </div>
          <p className="mt-5 text-lg leading-8 text-ink-soft">
            Corey Ralston is a former child actor, youth talent manager, acting
            coach, and founder of Child Actor 101.
          </p>
          <p className="mt-4 text-base leading-8 text-ink-soft">
            He built Child Actor 101 to give parents the unvarnished truth —
            no hype, no gatekeeping, just the manual he wished existed.
          </p>
          <Button href="/corey-ralston" className="mt-8 w-fit">
            Learn more about Corey
            <ArrowRight className="h-5 w-5" />
          </Button>
        </Card>
      </div>
    </section>
  );
}
