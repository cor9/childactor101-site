import type { Metadata } from "next";

import { DoorLandingPage } from "@/components/five-doors/DoorLandingPage";
import { beforeYouPayPage } from "@/content/five-doors";

export const metadata: Metadata = {
  title: "Before You Pay Anyone",
  description:
    "A problem-first route for families who need scam awareness, cost clarity, and safer vendor decisions before they spend.",
};

export default function BeforeYouPayPage() {
  return <DoorLandingPage content={beforeYouPayPage} />;
}
