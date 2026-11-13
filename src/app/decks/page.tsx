import type { Metadata } from "next";

import DeckShuffler from "./DeckShuffler";

export const metadata: Metadata = {
  title: "Acting Choice Decks",
  description: "Practice scenes with the Child Actor 101 acting choice decks.",
  robots: { index: false, follow: false, googleBot: { index: false, follow: false } },
};

export default function DecksPage() {
  return <DeckShuffler />;
}
