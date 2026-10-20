#!/usr/bin/env node
/**
 * Classifies old-site URLs against what this repo handles after cutover.
 *
 * Usage: node scripts/classify-legacy-urls.mjs <file> [<file> ...] [--json]
 *
 * Each file can be a Squarespace sitemap.xml, a Short.io or Stripe link export (CSV/text),
 * or a plain list of URLs or paths, one per line. URLs on childactor101.com / www. are
 * classified. Other childactor101.com subdomains are listed so their DNS records are kept.
 *
 * Classes:
 *   blog exact      /101-blog index or one of the verified lesson redirects (always on)
 *   blog fallback   other /101-blog/... URLs (needs LEGACY_BLOG_ORIGIN)
 *   preserved       one of the 14 preserved pages/PDFs (needs LEGACY_BLOG_ORIGIN)
 *   new-site route  the same path exists on the new site, so the OLD page is replaced
 *   unhandled       404 after cutover. Add it to src/content/legacy-preserved-pages.json
 *
 * "Customer access" marks paths that look like store, cart, checkout, account, member,
 * course, download, or file paths. Any of those that is unhandled or replaced is a
 * launch blocker. Exit code is 1 when there is at least one unhandled path or a
 * customer-access path replaced by a new-site page.
 *
 * With --json, prints ready-to-review entries for the unhandled paths.
 */
import { readdirSync, readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

const ROOT = fileURLToPath(new URL("..", import.meta.url));
const MAIN_HOSTS = new Set(["childactor101.com", "www.childactor101.com"]);

const files = process.argv.slice(2).filter((arg) => !arg.startsWith("--"));
const wantJson = process.argv.includes("--json");

if (files.length === 0) {
  console.error("Usage: node scripts/classify-legacy-urls.mjs <file> [<file> ...] [--json]");
  process.exit(2);
}

const exactBlogSlugs = new Set(
  [...readFileSync(`${ROOT}src/content/legacy-blog-redirects.ts`, "utf8").matchAll(/legacySlug:\s*"([^"]+)"/g)].map((match) => match[1].toLowerCase()),
);
const preserved = new Map(JSON.parse(readFileSync(`${ROOT}src/content/legacy-preserved-pages.json`, "utf8")).map((page) => [page.path.toLowerCase(), page]));
const appRoutes = new Set(readdirSync(`${ROOT}src/app`, { withFileTypes: true }).filter((entry) => entry.isDirectory()).map((entry) => entry.name.toLowerCase()));

const CUSTOMER_ACCESS = /^\/(cart|checkout|account|commerce|api|config|login|signin|sign-in|store|shop|products?|member|members|membership|my-[^/]+|course|courses|download|downloads|order|orders|s|thank-?you|success|payment[^/]*|portal|class|classes|workshops?)(\/|$)/;

function normalise(path) {
  let value = path;

  try {
    value = decodeURIComponent(path);
  } catch {
    // keep the raw value
  }

  value = value.split(/[?#]/)[0].toLowerCase();
  return value.length > 1 ? value.replace(/\/+$/, "") : value;
}

const urlPattern = /https?:\/\/[^\s,"'<>)\]]+/g;
const paths = new Map(); // normalised path -> { shown, sources }
const subdomains = new Map(); // host -> count
let urlCount = 0;

function record(path, source) {
  const key = normalise(path);

  if (key === "/" || key === "") {
    return;
  }

  const entry = paths.get(key) ?? { shown: path.split(/[?#]/)[0], sources: new Set() };
  entry.sources.add(source);
  paths.set(key, entry);
}

for (const file of files) {
  const text = readFileSync(file, "utf8");
  const source = file.split("/").pop();

  for (const match of text.matchAll(urlPattern)) {
    let url;

    try {
      url = new URL(match[0].replace(/&amp;/g, "&"));
    } catch {
      continue;
    }

    const host = url.hostname.toLowerCase();

    if (MAIN_HOSTS.has(host)) {
      urlCount += 1;
      record(url.pathname, source);
    } else if (host.endsWith(".childactor101.com")) {
      subdomains.set(host, (subdomains.get(host) ?? 0) + 1);
    }
  }

  // Bare paths, one per line (skip lines that already held a full URL).
  for (const line of text.split("\n")) {
    const trimmed = line.trim();

    if (/^\/[^\s]*$/.test(trimmed) && !trimmed.startsWith("//")) {
      urlCount += 1;
      record(trimmed, source);
    }
  }
}

function classify(key) {
  if (key === "/101-blog" || (key.startsWith("/101-blog/") && exactBlogSlugs.has(key.slice("/101-blog/".length)))) {
    return "blog exact";
  }

  if (key.startsWith("/101-blog/")) {
    return "blog fallback";
  }

  if (preserved.has(key)) {
    return "preserved";
  }

  if (appRoutes.has(key.split("/")[1])) {
    return "new-site route";
  }

  return "unhandled";
}

const results = [...paths.entries()]
  .map(([key, entry]) => ({ key, shown: entry.shown, sources: [...entry.sources], cls: classify(key), customerAccess: CUSTOMER_ACCESS.test(key) }))
  .sort((a, b) => a.key.localeCompare(b.key));

const count = (cls) => results.filter((result) => result.cls === cls).length;
const unhandled = results.filter((result) => result.cls === "unhandled");
const replaced = results.filter((result) => result.cls === "new-site route");
const replacedAccess = replaced.filter((result) => result.customerAccess);

console.log(`Classified ${results.length} unique paths (${urlCount} URLs) from ${files.length} file${files.length === 1 ? "" : "s"}.\n`);
console.log(`  blog exact       ${count("blog exact")}   (verified redirect to a classroom lesson)`);
console.log(`  blog fallback    ${count("blog fallback")}   (needs LEGACY_BLOG_ORIGIN)`);
console.log(`  preserved        ${count("preserved")}   (needs LEGACY_BLOG_ORIGIN)`);
console.log(`  new-site route   ${replaced.length}   (same path exists on the new site, so the OLD page is replaced)`);
console.log(`  UNHANDLED        ${unhandled.length}   (404 after cutover)`);

if (replaced.length > 0) {
  console.log("\nNew-site routes that replace an old URL. Confirm each replacement is intended:");
  for (const result of replaced) {
    console.log(`  ${result.customerAccess ? "CUSTOMER ACCESS  " : "                 "}${result.shown}   [${result.sources.join(", ")}]`);
  }
}

if (unhandled.length > 0) {
  console.log("\nUnhandled paths:");
  for (const result of unhandled) {
    console.log(`  ${result.customerAccess ? "CUSTOMER ACCESS  " : "                 "}${result.shown}   [${result.sources.join(", ")}]`);
  }
}

if (subdomains.size > 0) {
  console.log("\nOther childactor101.com subdomains seen. Their DNS records must stay unchanged:");
  for (const [host, hostCount] of [...subdomains.entries()].sort()) {
    console.log(`  ${host}  (${hostCount} URL${hostCount === 1 ? "" : "s"})`);
  }
}

if (wantJson && unhandled.length > 0) {
  const stubs = unhandled.map((result) => ({
    path: result.shown,
    kind: result.shown.toLowerCase().endsWith(".pdf") ? "pdf" : "page",
    title: "TODO",
    risk: result.customerAccess ? "high" : "medium",
    eventualDestination: null,
    reviewNote: result.customerAccess
      ? "Customer-access path found in the old-site inventory. Keep on the legacy host and test it there before cutover."
      : "Found in the old-site inventory. Keep on the legacy host until a replacement is verified.",
  }));
  console.log(`\nEntries to review and add to src/content/legacy-preserved-pages.json:\n${JSON.stringify(stubs, null, 2)}`);
}

process.exit(unhandled.length > 0 || replacedAccess.length > 0 ? 1 : 0);
