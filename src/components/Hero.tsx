import { ArrowDown, Mic2 } from "lucide-react";

import { Hero as HomeHero } from "@/components/home/Hero";
import { SPOTIFY_PODCAST_URL } from "@/lib/site-links";

export function Hero() {
  return (
    <HomeHero
      description="So we built a whole classroom for it — a step-by-step path through the business of TV and film, taught by someone who&apos;s lived every side of it."
      imageAlt="Young actor at a desk learning from a laptop"
      imageSrc="/images/home-hero.jpg"
      kicker="For families of young actors"
      primaryAction={{
        href: "/start-here",
        icon: <ArrowDown className="h-5 w-5" />,
        label: "Start here",
      }}
      secondaryAction={{
        href: SPOTIFY_PODCAST_URL,
        icon: <Mic2 className="h-5 w-5" />,
        label: "Conversations from inside Hollywood",
        rel: "noreferrer",
        target: "_blank",
        variant: "outlineLight",
      }}
      tapeLabel="● Now learning"
      title={
        <>
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
        </>
      }
    />
  );
}
