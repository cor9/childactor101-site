/**
 * Preservation redirects for non-blog pages and files from the legacy Squarespace site.
 *
 * Same gate as the blog fallback: OFF unless LEGACY_BLOG_ORIGIN is set at build time
 * to a validated legacy origin. Temporary (307) on purpose, because each path may later
 * get a permanent redirect to a newer destination once its content has been compared.
 */
import type { NextConfig } from "next";

import { legacyPreservedPages } from "../content/legacy-page-redirects";
import { parseLegacyBlogOrigin } from "./legacy-blog-fallback";

type Redirect = Awaited<ReturnType<NonNullable<NextConfig["redirects"]>>>[number];

export function buildLegacyPagePreservationRedirects(rawValue: string | undefined): Redirect[] {
  const legacy = parseLegacyBlogOrigin(rawValue);

  if (!legacy) {
    return [];
  }

  return legacyPreservedPages.map(({ path }) => ({
    source: path,
    destination: `${legacy.origin}${path}`,
    permanent: false,
    // Never re-forward a request that is already on the legacy host.
    missing: [{ type: "host" as const, value: legacy.host.replaceAll(".", "\\.") }],
  }));
}
