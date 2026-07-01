import { JourneyTimeline } from "@/components/home/JourneyTimeline";

const steps = [
  {
    title: "Understand the industry",
    description: "Learn how it really works — and how to stay safe.",
  },
  {
    title: "Train",
    description: "Build real on-camera skill and confidence.",
  },
  {
    title: "Build materials",
    description: "Resume, photos, and a professional page.",
  },
  {
    title: "Audition",
    description: "Prep, self-tape, and book the room.",
  },
  {
    title: "Grow",
    description: "Keep building a healthy, lasting career.",
  },
];

export function JourneySteps() {
  return (
    <JourneyTimeline
      description="Five steps, in order. This is the path every family walks."
      steps={steps}
      title="New here? ☆ Start here."
    />
  );
}
