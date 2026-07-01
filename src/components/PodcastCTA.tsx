import Image from "next/image";
import { Headphones } from "lucide-react";

import { Button } from "@/components/Button";
import { ChalkDoodle } from "@/components/ChalkDoodle";
import { ChalkDust } from "@/components/ChalkDust";
import { SectionLabel } from "@/components/SectionLabel";

export function PodcastCTA() {
  return (
    <section
      id="podcast"
      className="relative bg-[radial-gradient(circle_at_top_left,rgba(49,99,71,0.4),transparent_28%),linear-gradient(180deg,#173226_0%,#10261d_100%)] px-4 py-20 pb-24 text-white sm:px-6 lg:px-8"
    >
      <ChalkDust />
      <ChalkDoodle variant="swirl" className="left-10 top-16 hidden h-14 w-14 lg:block" />
      <ChalkDoodle variant="spark" className="right-14 bottom-14 hidden h-10 w-10 lg:block" />
      <div className="mx-auto grid w-full max-w-[1440px] gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
        <div className="mx-auto w-full max-w-[430px] lg:max-w-none">
          <ChalkDoodle variant="star" className="left-4 top-20 h-10 w-10" />
          <Image
            src="/101logo.png"
            alt="Child Actor 101 retro television logo"
            width={820}
            height={820}
            className="w-full object-contain drop-shadow-[0_28px_44px_rgba(8,23,19,0.35)]"
          />
        </div>
        <div>
          <ChalkDoodle variant="arrow-right" className="right-8 top-8 hidden h-12 w-12 lg:block" />
          <SectionLabel className="text-[#c7f2e4]">● On air</SectionLabel>
          <h2 className="mt-6 font-display text-4xl leading-tight text-white sm:text-5xl lg:text-[4rem]">
            Conversations from inside Hollywood
          </h2>
          <p className="mt-4 max-w-3xl text-[1.45rem] leading-[1.7] text-white/72">
            The Callback — honest talks about auditions, the business, and
            keeping kids kids while they chase the dream. New every week.
          </p>
          <Button href="/podcast" className="mt-10 w-fit">
            Start listening
            <Headphones className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
}
