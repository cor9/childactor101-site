import pageAliases from "./legacy-page-aliases.json";
import preservedPages from "./legacy-preserved-pages.json";

/**
 * Non-blog pages and files from the legacy Squarespace site that are preserved on the
 * legacy host after cutover. None of them has a verified equivalent on this site yet.
 *
 * `eventualDestination` is a candidate for a future permanent redirect, kept here so
 * the follow-up is not lost. It is NOT used by any redirect today.
 * Full reasoning: docs/seo/legacy-page-preservation-map.md.
 */
export interface LegacyPreservedPage {
  path: string;
  kind: "page" | "pdf";
  title: string;
  risk: "low" | "medium" | "high";
  /** Candidate replacement to review later. Never redirected to automatically. */
  eventualDestination: string | null;
  reviewNote: string;
}

export const legacyPreservedPages = preservedPages as LegacyPreservedPage[];

/**
 * A path on this site that has no page of its own on the legacy host, but whose service lives at a
 * different legacy path. It forwards to `legacyPath` on the legacy host while the legacy site exists.
 */
export interface LegacyPageAlias {
  path: string;
  legacyPath: string;
  note: string;
}

export const legacyPageAliases = pageAliases as LegacyPageAlias[];
