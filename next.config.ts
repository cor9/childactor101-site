import type { NextConfig } from "next";

import {
  LEGACY_BLOG_INDEX_DESTINATION,
  legacyBlogRedirects,
} from "./src/content/legacy-blog-redirects";
import { buildLegacyBlogFallbackRedirects } from "./src/lib/legacy-blog-fallback";
import { buildLegacyPagePreservationRedirects } from "./src/lib/legacy-page-preservation";

const nextConfig: NextConfig = {
  turbopack: {
    root: process.cwd(),
  },
  async redirects() {
    return [
      {
        source: "/101-blog",
        destination: LEGACY_BLOG_INDEX_DESTINATION,
        permanent: true,
      },
      ...legacyBlogRedirects.map(({ legacySlug, destination }) => ({
        source: `/101-blog/${legacySlug}`,
        destination,
        permanent: true,
      })),
      // Everything below is off unless LEGACY_BLOG_ORIGIN is set, and must stay after the exact
      // blog redirects above. The blog catch-all stays last so it never shadows an exact rule.
      ...buildLegacyPagePreservationRedirects(process.env.LEGACY_BLOG_ORIGIN),
      ...buildLegacyBlogFallbackRedirects(process.env.LEGACY_BLOG_ORIGIN),
    ];
  },
};

export default nextConfig;
