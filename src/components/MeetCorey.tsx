import { ArrowRight } from "lucide-react";

import { MeetCorey as MeetCoreySection } from "@/components/home/MeetCorey";

export function MeetCorey() {
  return (
    <MeetCoreySection
      ctaHref="/corey-ralston"
      ctaIcon={<ArrowRight className="h-5 w-5" />}
      ctaLabel="Learn more about Corey"
      description="Corey Ralston is a former child actor, youth talent manager, acting coach, and founder of Child Actor 101."
      headshotAlt="Corey Ralston headshot"
      headshotSrc="/images/corey-ralston.jpg"
      label="Meet your teacher"
      name="Corey Ralston"
      roles={["Former child actor", "Youth talent manager", "Founder"]}
      secondaryDescription="He built Child Actor 101 to give parents the unvarnished truth — no hype, no gatekeeping, just the manual he wished existed."
    />
  );
}
