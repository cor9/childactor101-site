import type { Metadata } from "next";

import { DoorLandingPage } from "@/components/five-doors/DoorLandingPage";
import { auditionHelpPage } from "@/content/five-doors";

export const metadata: Metadata = {
  title: "Audition Help",
  description:
    "A calm first-stop route for families who need quick audition triage, self tape guidance, and one smart next step.",
};

export default function AuditionHelpPage() {
  return <DoorLandingPage content={auditionHelpPage} />;
}
