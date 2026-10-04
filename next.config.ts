import type { NextConfig } from "next";

import { getLegacyLessonRedirects } from "./src/content/courses";

const nextConfig: NextConfig = {
  turbopack: {
    root: process.cwd(),
  },
  // Per-lesson course URLs were folded into module pages; keep old links working.
  async redirects() {
    return getLegacyLessonRedirects().map((redirect) => ({ ...redirect, permanent: true }));
  },
};

export default nextConfig;
