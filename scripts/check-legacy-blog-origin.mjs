#!/usr/bin/env node
/**
 * Readiness check for the legacy blog fallback.
 *
 * Usage: node scripts/check-legacy-blog-origin.mjs https://legacy.childactor101.com [--all]
 *
 * Requests unmigrated /101-blog/ URLs from docs/seo/legacy-blog-migration-map.csv on the
 * legacy origin without following redirects. Passes only when every URL answers 200, or
 * redirects within the legacy host itself. Any redirect toward the main domain fails,
 * because enabling LEGACY_BLOG_ORIGIN in that state would create a redirect loop.
 * Checks a sample of 12 URLs by default; pass --all to check every unmigrated URL.
 */
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

const MAIN_SITE_HOSTS = new Set(["childactor101.com", "www.childactor101.com"]);
const MAP_PATH = fileURLToPath(new URL("../docs/seo/legacy-blog-migration-map.csv", import.meta.url));

const [originArg, ...flags] = process.argv.slice(2);

if (!originArg) {
  console.error("Usage: node scripts/check-legacy-blog-origin.mjs <legacy-origin> [--all]");
  process.exit(2);
}

const origin = new URL(originArg);

if (MAIN_SITE_HOSTS.has(origin.hostname)) {
  console.error(`Refusing to check ${origin.hostname}: the legacy origin must differ from the main site.`);
  process.exit(2);
}

// Legacy URL is the first CSV column; category is the fourth. Skip already-redirected rows (A).
const legacyPaths = readFileSync(MAP_PATH, "utf8")
  .split("\n")
  .slice(1)
  .filter((line) => line.startsWith("https://") && !line.includes(",A. Redirected"))
  .map((line) => new URL(line.split(",")[0]).pathname);

const sample = flags.includes("--all")
  ? legacyPaths
  : legacyPaths.filter((_, index) => index % Math.ceil(legacyPaths.length / 12) === 0);

let failures = 0;

for (const path of ["/101-blog", ...sample]) {
  const url = new URL(path, origin);
  let verdict;

  try {
    const response = await fetch(url, { redirect: "manual" });
    const location = response.headers.get("location");
    const target = location ? new URL(location, url) : null;

    if (response.status === 200) {
      verdict = "ok";
    } else if (target && target.hostname === origin.hostname) {
      verdict = `ok (redirects within legacy host to ${target.pathname})`;
    } else if (target && MAIN_SITE_HOSTS.has(target.hostname)) {
      verdict = `FAIL: redirects to main domain ${target.href} (loop risk)`;
    } else {
      verdict = `FAIL: HTTP ${response.status}${target ? ` -> ${target.href}` : ""}`;
    }
  } catch (error) {
    verdict = `FAIL: ${error instanceof Error ? error.message : String(error)}`;
  }

  if (verdict.startsWith("FAIL")) {
    failures += 1;
  }

  console.log(`${verdict.padEnd(12)}  ${url.href}`);
}

console.log(failures === 0 ? "\nLegacy origin looks ready." : `\n${failures} check(s) failed. Do not set LEGACY_BLOG_ORIGIN yet.`);
process.exit(failures === 0 ? 0 : 1);
