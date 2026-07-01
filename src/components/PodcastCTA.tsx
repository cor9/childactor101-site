import { Headphones, Mic2 } from "lucide-react";

import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { SectionLabel } from "@/components/SectionLabel";

export function PodcastCTA() {
  return (
    <section id="podcast" className="px-4 py-20 pb-24 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-7xl">
        <Card
          className="overflow-hidden border-chalk/10 bg-[linear-gradient(160deg,#234F3B_0%,#17382B_100%)] text-chalk"
          tone="chalkboard"
        >
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <SectionLabel>● On air</SectionLabel>
              <h2 className="mt-6 font-display text-4xl leading-tight text-chalk sm:text-5xl">
                Conversations from inside Hollywood
              </h2>
              <p className="mt-4 max-w-2xl text-lg leading-8 text-chalk/72">
                The Callback — honest talks about auditions, the business, and
                keeping kids kids while they chase the dream. New every week.
              </p>
              <Button href="/podcast" className="mt-8 w-fit">
                Start listening
                <Headphones className="h-5 w-5" />
              </Button>
            </div>
            <div className="rounded-[28px] border border-chalk/10 bg-chalkboard-deep/65 p-6 shadow-soft">
              <div className="flex aspect-[4/3] items-center justify-center rounded-[22px] border border-chalk/10 bg-[radial-gradient(circle_at_top,_rgba(248,244,232,0.16),transparent_45%)] text-chalk">
                <div className="text-center">
                  <Mic2 className="mx-auto h-12 w-12" />
                  <p className="mt-4 font-display text-3xl">
                    Featured episode placeholder
                  </p>
                  <p className="mt-2 text-sm uppercase tracking-[0.18em] text-chalk/70">
                    No external embeds yet
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}
