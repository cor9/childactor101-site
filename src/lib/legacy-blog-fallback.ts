/**
 * Optional fallback that forwards unmigrated legacy blog URLs (/101-blog/...)
 * to the archived Squarespace site.
 *
 * The fallback is OFF unless LEGACY_BLOG_ORIGIN is set at build time. It must
 * only be set once the legacy host is confirmed to serve the old blog paths
 * itself (HTTP 200, no redirect back to the main domain), otherwise visitors
 * would bounce between the two hosts.
 */
import type { NextConfig } from "next";

type Redirect = Awaited<ReturnType<NonNullable<NextConfig["redirects"]>>>[number];

// Hosts this Next.js app answers on. The legacy origin may never be one of them.
const MAIN_SITE_HOSTS = ["childactor101.com", "www.childactor101.com"];

export interface LegacyBlogOrigin {
  host: string;
  origin: string;
}

/** Returns the validated legacy origin, or null when the fallback is not configured. Throws on a bad value. */
export function parseLegacyBlogOrigin(rawValue: string | undefined): LegacyBlogOrigin | null {
  const value = rawValue?.trim();

  if (!value) {
    return null;
  }

  let url: URL;

  try {
    url = new URL(value);
  } catch {
    throw new Error(`LEGACY_BLOG_ORIGIN must be an absolute URL such as https://legacy.childactor101.com (got "${value}").`);
  }

  if (url.protocol !== "https:") {
    throw new Error(`LEGACY_BLOG_ORIGIN must use https (got "${value}").`);
  }

  if (url.username || url.password || url.port || url.search || url.hash || (url.pathname !== "/" && url.pathname !== "")) {
    throw new Error(`LEGACY_BLOG_ORIGIN must be a bare origin with no path, port, query, or credentials (got "${value}").`);
  }

  const host = url.hostname.toLowerCase();

  if (MAIN_SITE_HOSTS.includes(host) || host.endsWith(".vercel.app")) {
    throw new Error(`LEGACY_BLOG_ORIGIN cannot point at this site (${host}); that would create a redirect loop.`);
  }

  return { host, origin: `https://${host}` };
}

/**
 * Builds the catch-all fallback. It must be placed after every exact legacy
 * redirect, because Next.js applies the first matching redirect.
 */
export function buildLegacyBlogFallbackRedirects(rawValue: string | undefined): Redirect[] {
  const legacy = parseLegacyBlogOrigin(rawValue);

  if (!legacy) {
    return [];
  }

  return [
    {
      source: "/101-blog/:path+",
      destination: `${legacy.origin}/101-blog/:path+`,
      // Temporary: these URLs move to permanent classroom destinations as articles are migrated.
      permanent: false,
      // Never forward a request that is already on the legacy host, even if that host is
      // mistakenly attached to this project.
      missing: [{ type: "host", value: legacy.host.replaceAll(".", "\\.") }],
    },
  ];
}
