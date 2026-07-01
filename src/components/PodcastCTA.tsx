import { Headphones } from "lucide-react";

import { PodcastCTA as PodcastCTASection } from "@/components/home/PodcastCTA";
import { SPOTIFY_PODCAST_URL } from "@/lib/site-links";

export function PodcastCTA() {
  return (
    <PodcastCTASection
      ctaHref={SPOTIFY_PODCAST_URL}
      ctaIcon={<Headphones className="h-5 w-5" />}
      ctaLabel="Start listening"
      ctaRel="noreferrer"
      ctaTarget="_blank"
      description="The Callback — honest talks about auditions, the business, and keeping kids kids while they chase the dream. New every week."
      imageAlt="Child Actor 101 retro television logo"
      imageSrc="/101logo.png"
      label="● On air"
      title="Conversations from inside Hollywood"
    />
  );
}
