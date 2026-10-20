#!/usr/bin/env node
/**
 * Readiness check for the legacy host (blog fallback and preserved pages/PDFs).
 *
 * Usage: node scripts/check-legacy-blog-origin.mjs https://legacy.childactor101.com [--all]
 *
 * Checks, against the legacy origin:
 *   1. /101-blog plus unmigrated blog URLs from docs/seo/legacy-blog-migration-map.csv
 *      (a sample of 12 by default, every one with --all)
 *   2. Every page and PDF in src/content/legacy-preserved-pages.json (always all 14)
 *
 * Each URL is requested with redirects followed by hand (max 5 hops). A URL passes only
 * when the chain ends in HTTP 200 and never touches the main site. PDFs must also return
 * real PDF bytes, so a soft "not found" HTML page served with 200 fails.
 * Any hop that lands on childactor101.com or www.childactor101.com fails, because setting
 * LEGACY_BLOG_ORIGIN in that state would create a redirect loop. A redirect loop or a
 * connection/certificate error also fails. Exit code is 0 only when everything passes.
 *
 * Not checked: page content, checkout, logins, video playback, or Stripe delivery links.
 * Those need the manual tests in docs/seo/legacy-squarespace-cutover.md.
 */
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

const MAIN_SITE_HOSTS = new Set(["childactor101.com", "www.childactor101.com"]);
const MAX_HOPS = 5;
const MAP_PATH = fileURLToPath(new URL("../docs/seo/legacy-blog-migration-map.csv", import.meta.url));
const PAGES_PATH = fileURLToPath(new URL("../src/content/legacy-preserved-pages.json", import.meta.url));

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

// Legacy URL is the first CSV column. Skip rows already redirected to the new site (category A).
const legacyBlogPaths = readFileSync(MAP_PATH, "utf8")
  .split("\n")
  .slice(1)
  .filter((line) => line.startsWith("https://") && !line.includes(",A. Redirected"))
  .map((line) => new URL(line.split(",")[0]).pathname);

const blogSample = flags.includes("--all")
  ? legacyBlogPaths
  : legacyBlogPaths.filter((_, index) => index % Math.ceil(legacyBlogPaths.length / 12) === 0);

const preservedPages = JSON.parse(readFileSync(PAGES_PATH, "utf8"));

/** Follows redirects by hand and returns { ok, detail }. */
async function probe(startUrl, { expectPdf }) {
  const visited = new Set();
  let url = new URL(startUrl);

  for (let hop = 0; hop <= MAX_HOPS; hop += 1) {
    if (MAIN_SITE_HOSTS.has(url.hostname)) {
      return { ok: false, detail: `redirects to main domain ${url.href} (loop risk)` };
    }

    if (visited.has(url.href)) {
      return { ok: false, detail: `redirect loop at ${url.href}` };
    }

    visited.add(url.href);

    let response;

    try {
      response = await fetch(url, { redirect: "manual" });
    } catch (error) {
      const cause = error instanceof Error && error.cause instanceof Error ? ` (${error.cause.message})` : "";
      return { ok: false, detail: `${error instanceof Error ? error.message : String(error)}${cause}` };
    }

    const location = response.headers.get("location");

    if (response.status >= 300 && response.status < 400 && location) {
      url = new URL(location, url);
      continue;
    }

    if (response.status !== 200) {
      return { ok: false, detail: `HTTP ${response.status} at ${url.href}` };
    }

    if (!expectPdf) {
      return { ok: true, detail: hop === 0 ? "200" : `200 after ${hop} redirect${hop === 1 ? "" : "s"}` };
    }

    const bytes = new Uint8Array(await response.arrayBuffer());
    const looksLikePdf = new TextDecoder("latin1").decode(bytes.subarray(0, 5)) === "%PDF-";
    const type = response.headers.get("content-type") ?? "no content-type";

    if (!looksLikePdf || bytes.length < 100) {
      return { ok: false, detail: `200 but not a PDF at ${url.href} (${type}, ${bytes.length} bytes)` };
    }

    const via = hop === 0 ? "" : ` via ${hop} redirect${hop === 1 ? "" : "s"} to ${url.hostname}`;
    return { ok: true, detail: `200 PDF, ${bytes.length} bytes${via}` };
  }

  return { ok: false, detail: `more than ${MAX_HOPS} redirects` };
}

const checks = [
  ...["/101-blog", ...blogSample].map((path) => ({ group: "blog", path, expectPdf: false })),
  ...preservedPages.map(({ path, kind }) => ({ group: kind, path, expectPdf: kind === "pdf" })),
];

let failures = 0;

for (const { group, path, expectPdf } of checks) {
  const { ok, detail } = await probe(new URL(path, origin), { expectPdf });

  if (!ok) {
    failures += 1;
  }

  console.log(`${ok ? "ok  " : "FAIL"}  ${group.padEnd(4)}  ${path}  ${detail}`);
}

const summary = `${checks.length} URLs checked (${blogSample.length + 1} blog, ${preservedPages.length} preserved pages and PDFs).`;
console.log(failures === 0 ? `\n${summary} Legacy origin looks ready.` : `\n${summary} ${failures} failed. Do not set LEGACY_BLOG_ORIGIN yet.`);
process.exit(failures === 0 ? 0 : 1);
