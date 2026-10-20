import type { NextConfig } from "next";

import {
  LEGACY_BLOG_INDEX_DESTINATION,
  legacyBlogRedirects,
} from "./src/content/legacy-blog-redirects";

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
    ];
  },
};

export default nextConfig;
