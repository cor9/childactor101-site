/**
 * Redirect rules for /101-blog, driven by which articles have been migrated into the native blog.
 *
 *  - No posts imported yet: behaviour is exactly the pre-migration setup (the index and 20 article
 *    redirects to the classroom, plus the optional catch-all to the legacy host).
 *  - Posts imported: an article that now exists natively is never redirected, so it serves HTTP 200
 *    at its original URL. The index redirect goes away. The classroom lessons stay as they are.
 *    Inventory articles that are still missing fall back to the legacy host (only when
 *    LEGACY_BLOG_ORIGIN is set), one exact rule per slug, so no native URL can be shadowed.
 *  - Squarespace's ?format=rss feed URL is forwarded to the native feed.
 */
import type { NextConfig } from "next";

import { LEGACY_BLOG_INDEX_DESTINATION, legacyBlogRedirects } from "../content/legacy-blog-redirects";
import { buildLegacyBlogFallbackRedirects, parseLegacyBlogOrigin } from "./legacy-blog-fallback";

type Redirect = Awaited<ReturnType<NonNullable<NextConfig["redirects"]>>>[number];

export interface BlogRedirectInput {
  /** Lower-cased slugs that exist in the native blog. */
  migratedSlugs: ReadonlySet<string>;
  /** Every slug the original blog is known to have had (the 155-article inventory). */
  inventorySlugs: readonly string[];
  legacyOrigin: string | undefined;
}

export function buildBlogExactRedirects({ migratedSlugs }: Pick<BlogRedirectInput, "migratedSlugs">): Redirect[] {
  const nativeBlog = migratedSlugs.size > 0;

  return [
    ...(nativeBlog
      ? [
          {
            source: "/101-blog",
            has: [{ type: "query" as const, key: "format", value: "rss" }],
            destination: "/101-blog/feed.xml",
            permanent: true,
          },
        ]
      : [{ source: "/101-blog", destination: LEGACY_BLOG_INDEX_DESTINATION, permanent: true }]),
    ...legacyBlogRedirects
      .filter(({ legacySlug }) => !migratedSlugs.has(legacySlug.toLowerCase()))
      .map(({ legacySlug, destination }) => ({
        source: `/101-blog/${legacySlug}`,
        destination,
        permanent: true,
      })),
  ];
}

export function buildBlogFallbackRedirects({ migratedSlugs, inventorySlugs, legacyOrigin }: BlogRedirectInput): Redirect[] {
  if (migratedSlugs.size === 0) {
    return buildLegacyBlogFallbackRedirects(legacyOrigin);
  }

  const legacy = parseLegacyBlogOrigin(legacyOrigin);
  if (!legacy) return [];

  const redirected = new Set(legacyBlogRedirects.map(({ legacySlug }) => legacySlug.toLowerCase()));

  return inventorySlugs
    .filter((slug) => !migratedSlugs.has(slug.toLowerCase()) && !redirected.has(slug.toLowerCase()))
    .map((slug) => ({
      source: `/101-blog/${slug.replaceAll(" ", "%20")}`,
      destination: `${legacy.origin}/101-blog/${slug.replaceAll(" ", "%20")}`,
      permanent: false,
      missing: [{ type: "host" as const, value: legacy.host.replaceAll(".", "\\.") }],
    }));
}
