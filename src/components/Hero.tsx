import Image from "next/image";
import { ArrowDown, Mic2 } from "lucide-react";

import { Button } from "@/components/Button";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-[radial-gradient(circle_at_top_left,rgba(49,99,71,0.55),transparent_34%),linear-gradient(180deg,#18352a_0%,#122c21_100%)] px-4 pb-12 pt-10 text-white sm:px-6 lg:px-8 lg:pb-16 lg:pt-14">
      <div className="absolute inset-0 opacity-10 [background-image:radial-gradient(circle_at_1px_1px,rgba(248,244,232,0.85)_1px,transparent_0)] [background-size:18px_18px]" />
      <div className="relative mx-auto grid w-full max-w-[1440px] gap-10 lg:grid-cols-[1.02fr_0.98fr] lg:items-center">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.24em] text-[#b9ecd9]">
            <span className="h-2.5 w-2.5 rounded-full bg-[#d04c3f]" />
            For families of young actors
          </div>
          <h1 className="mt-8 max-w-3xl font-display text-5xl leading-[0.94] text-white sm:text-6xl lg:text-[5.2rem]">
            The industry doesn&apos;t come with a{" "}
            <span className="relative inline-block whitespace-nowrap">
              manual
              <svg
                aria-hidden="true"
                className="absolute -bottom-3 left-[-2%] h-4 w-[104%] text-[#a882ff]"
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
          <p className="mt-8 max-w-2xl text-[1.55rem] leading-[1.65] text-white/78 sm:text-[1.75rem]">
            So we built a whole classroom for it — a step-by-step path through
            the business of TV and film, taught by someone who&apos;s lived every
            side of it.
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Button href="/start-here" size="lg">
              Start here
              <ArrowDown className="h-5 w-5" />
            </Button>
            <Button href="/podcast" size="lg" variant="outlineLight">
              Conversations from inside Hollywood
              <Mic2 className="h-5 w-5" />
            </Button>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-[760px] lg:max-w-none">
          <div className="absolute left-8 top-0 z-10 rounded-[18px] bg-[#cc4f40] px-5 py-2 text-sm font-semibold text-white shadow-[0_12px_24px_rgba(204,79,64,0.28)]">
            ● Now learning
          </div>
          <div className="overflow-hidden rounded-[42px] border-[6px] border-[#a8ead6] bg-[#183329] shadow-[0_34px_70px_rgba(8,23,19,0.38)]">
            <Image
              src="/images/home-hero.jpg"
              alt="Young actor at a desk learning from a laptop"
              width={760}
              height={760}
              className="aspect-square w-full object-cover"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
