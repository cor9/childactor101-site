import type { Metadata } from "next";

import { ChapterCards } from "@/components/ChapterCards";
import { EcosystemSection } from "@/components/EcosystemSection";
import { Hero } from "@/components/Hero";
import { JourneySteps } from "@/components/JourneySteps";
import { MeetCorey } from "@/components/MeetCorey";
import { PodcastCTA } from "@/components/PodcastCTA";

export const metadata: Metadata = {
  title: "Homepage",
  description:
    "Start with the foundational Child Actor 101 homepage shell: the parent-first path into learning, tools, training, and podcast conversations.",
};

export default function Home() {
  return (
    <main className="overflow-hidden">
      <Hero />
      <JourneySteps />
      <ChapterCards />
      <EcosystemSection />
      <MeetCorey />
      <PodcastCTA />
    </main>
  );
}
