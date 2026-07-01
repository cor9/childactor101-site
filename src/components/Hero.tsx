import { ArrowRight, Mic2 } from "lucide-react";

import { Button } from "@/components/Button";
import { Card } from "@/components/Card";

export function Hero() {
  return (
    <section className="relative overflow-hidden px-4 pb-20 pt-12 sm:px-6 lg:px-8 lg:pb-24 lg:pt-16">
      <div className="absolute inset-x-0 top-0 h-[30rem] bg-[radial-gradient(circle_at_top_left,_rgba(244,201,93,0.24),_transparent_40%),radial-gradient(circle_at_top_right,_rgba(166,120,242,0.22),_transparent_34%)]" />
      <div className="mx-auto grid w-full max-w-7xl gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div className="relative">
          <div className="inline-flex items-center gap-3 rounded-full border border-chalk/15 bg-chalkboard px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-chalk shadow-soft">
            <span className="h-2.5 w-2.5 rounded-full bg-[#CB4435]" />
            For families of young actors
          </div>
          <h1 className="mt-6 max-w-3xl font-display text-5xl leading-[0.95] text-chalkboard sm:text-6xl lg:text-7xl">
            The industry doesn&apos;t come with a{" "}
            <span className="relative inline-block whitespace-nowrap">
              manual
              <svg
                aria-hidden="true"
                className="absolute -bottom-3 left-[-2%] h-4 w-[104%] text-chalkboard"
                fill="none"
                viewBox="0 0 200 12"
              >
                <path
                  d="M2 8 C40 2 80 11 120 6 S180 3 198 7"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeWidth="2.5"
                />
              </svg>
            </span>
            .
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-ink-soft sm:text-xl">
            So we built a whole classroom for it — a step-by-step path through
            the business of TV and film, taught by someone who&apos;s lived every
            side of it.
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Button href="/#journey" size="lg">
              Start here
              <ArrowRight className="h-5 w-5" />
            </Button>
            <Button href="/#podcast" size="lg" variant="secondary">
              Conversations from inside Hollywood
              <Mic2 className="h-5 w-5" />
            </Button>
          </div>
          <div className="mt-10 grid gap-3 text-sm text-ink-soft sm:grid-cols-3">
            <p className="rounded-2xl border border-chalkboard/10 bg-white/80 px-4 py-3 shadow-soft">
              Parents first, always.
            </p>
            <p className="rounded-2xl border border-chalkboard/10 bg-white/80 px-4 py-3 shadow-soft">
              Learn before you spend.
            </p>
            <p className="rounded-2xl border border-chalkboard/10 bg-white/80 px-4 py-3 shadow-soft">
              Build confidence one chapter at a time.
            </p>
          </div>
        </div>

        <Card className="relative overflow-hidden bg-[linear-gradient(160deg,#234F3B_0%,#17382B_100%)] text-chalk">
          <div className="absolute inset-0 opacity-20 [background-image:radial-gradient(circle_at_1px_1px,rgba(248,244,232,0.9)_1px,transparent_0)] [background-size:18px_18px]" />
          <div className="relative">
            <div className="inline-flex rotate-[-4deg] rounded-full bg-paper px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-chalkboard shadow-soft">
              ● Now learning
            </div>
            <div className="mt-5 rounded-[24px] border border-chalk/12 bg-chalkboard-soft/55 p-6">
              <div className="relative overflow-hidden rounded-[24px] border border-dashed border-chalk/30 bg-chalkboard-deep/50 px-6 py-7">
                <div className="absolute right-8 top-6 text-chalk/70">✦</div>
                <div className="absolute left-8 top-10 text-chalk/55">✦</div>
                <div className="grid gap-5 sm:grid-cols-[1.05fr_0.95fr]">
                  <div className="rounded-[22px] border border-chalk/10 bg-[linear-gradient(180deg,rgba(248,244,232,0.06),rgba(248,244,232,0.02))] p-5">
                    <div className="flex aspect-square items-center justify-center rounded-[18px] border border-chalk/10 bg-[radial-gradient(circle_at_top,_rgba(248,244,232,0.16),transparent_45%)]">
                      <div className="text-center">
                        <p className="font-display text-3xl text-chalk">
                          Hero illustration
                        </p>
                        <p className="mt-2 text-sm uppercase tracking-[0.18em] text-chalk/70">
                          Local placeholder only
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="rounded-[20px] bg-paper p-5 text-ink shadow-soft">
                      <p className="text-xs uppercase tracking-[0.22em] text-chalkboard">
                        Start here
                      </p>
                      <p className="mt-3 font-display text-3xl text-chalkboard">
                        Five steps
                      </p>
                      <p className="mt-2 text-sm leading-7 text-ink-soft">
                        Industry, training, materials, auditions, growth.
                      </p>
                    </div>
                    <div className="rounded-[20px] border border-chalk/12 bg-chalkboard-deep/60 p-5">
                      <p className="text-xs uppercase tracking-[0.22em] text-chalk/60">
                        Classroom notes
                      </p>
                      <ul className="mt-3 space-y-2 text-sm text-chalk/80">
                        <li>• Honest guidance</li>
                        <li>• Parent-focused clarity</li>
                        <li>• Tools that support the craft</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}
