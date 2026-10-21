import type { Metadata } from "next";
import type { ReactNode } from "react";

/** Everything under /learn is a purchased course: unlisted, unlinked and kept out of search results. */
export const metadata: Metadata = {
  robots: { index: false, follow: false, nocache: true },
};

export default function LearnLayout({ children }: { children: ReactNode }) {
  return children;
}
