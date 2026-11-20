import type { NextConfig } from "next";

import blogIndex from "./src/content/blog/index.json";
import legacyInventory from "./src/content/blog/legacy-inventory.json";
import { buildBlogExactRedirects, buildBlogFallbackRedirects } from "./src/lib/blog-redirects";
import { buildLegacyPagePreservationRedirects } from "./src/lib/legacy-page-preservation";

// Slugs that exist in the native 101 Blog (imported from the Squarespace export). Empty until the
// export is imported, which keeps the pre-migration redirects in place.
const blogInput = {
  migratedSlugs: new Set((blogIndex as { slug: string }[]).map((post) => post.slug.toLowerCase())),
  inventorySlugs: legacyInventory.map((entry) => entry.slug),
  legacyOrigin: process.env.LEGACY_BLOG_ORIGIN,
};

const nextConfig: NextConfig = {
  turbopack: {
    root: process.cwd(),
  },
  async redirects() {
    return [
      // Exact blog rules first. Articles that now exist natively are not redirected.
      ...buildBlogExactRedirects(blogInput),
      // Everything below is off unless LEGACY_BLOG_ORIGIN is set, and must stay after the exact
      // blog redirects above.
      ...buildLegacyPagePreservationRedirects(process.env.LEGACY_BLOG_ORIGIN),
      ...buildBlogFallbackRedirects(blogInput),
    ];
  },
};

export default nextConfig;
