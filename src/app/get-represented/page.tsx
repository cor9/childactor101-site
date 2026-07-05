import type { Metadata } from "next";

import { DoorLandingPage } from "@/components/five-doors/DoorLandingPage";
import { getRepresentedPage } from "@/content/five-doors";

export const metadata: Metadata = {
  title: "Get Represented",
  description:
    "A practical route for families preparing for agents, managers, and open calls without rushing the readiness work.",
};

export default function GetRepresentedPage() {
  return <DoorLandingPage content={getRepresentedPage} />;
}
