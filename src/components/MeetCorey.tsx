import { ArrowRight } from "lucide-react";

import { Button } from "@/components/Button";
import { SectionLabel } from "@/components/SectionLabel";

export function MeetCorey() {
  return (
    <section id="corey" className="bg-paper px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto grid w-full max-w-[1440px] gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-center">
        <div className="mx-auto w-full max-w-[380px] rounded-[34px] bg-[#f5eddd] p-8 shadow-[var(--shadow-paper)] lg:max-w-none">
          <div className="flex aspect-square items-center justify-center rounded-[34px] border-[6px] border-[#9be5cf] bg-[linear-gradient(180deg,#23503b_0%,#17382b_100%)] shadow-[0_28px_50px_rgba(35,79,59,0.22)]">
            <div className="text-center text-white">
              <p className="font-display text-7xl">CR</p>
              <p className="mt-4 text-lg uppercase tracking-[0.22em] text-white/78">
                Your headshot here
              </p>
            </div>
          </div>
        </div>

        <div>
          <SectionLabel>Meet your teacher</SectionLabel>
          <h2 className="mt-4 font-display text-4xl leading-tight text-chalkboard sm:text-5xl lg:text-[4rem]">
            Corey Ralston
          </h2>
          <div className="mt-5 flex flex-wrap gap-3 text-sm font-medium text-chalkboard">
            <span className="rounded-full border border-[#ece1cc] bg-white px-5 py-3 shadow-[0_8px_20px_rgba(22,36,58,0.06)]">
              Former child actor
            </span>
            <span className="rounded-full border border-[#ece1cc] bg-white px-5 py-3 shadow-[0_8px_20px_rgba(22,36,58,0.06)]">
              Youth talent manager
            </span>
            <span className="rounded-full border border-[#ece1cc] bg-white px-5 py-3 shadow-[0_8px_20px_rgba(22,36,58,0.06)]">
              Founder
            </span>
          </div>
          <p className="mt-8 text-[1.35rem] leading-[1.75] text-ink-soft lg:text-[1.55rem]">
            Corey Ralston is a former child actor, youth talent manager, acting
            coach, and founder of Child Actor 101.
          </p>
          <p className="mt-4 text-[1.35rem] leading-[1.75] text-ink-soft lg:text-[1.55rem]">
            He built Child Actor 101 to give parents the unvarnished truth — no
            hype, no gatekeeping, just the manual he wished existed.
          </p>
          <Button href="/corey-ralston" variant="chalk" className="mt-10 w-fit">
            Learn more about Corey
            <ArrowRight className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
}
