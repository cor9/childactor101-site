#!/usr/bin/env node
/**
 * Verifies rendered SEO against the live originals for every imported article (READ-ONLY on the legacy site).
 *
 *   NODE_USE_ENV_PROXY=1 node scripts/blog/verify-seo.mjs http://localhost:3000
 *
 * For each article it fetches the new page (from the given origin) and the live legacy page, then checks:
 * <title> and meta description match the live ones; canonical is the primary-domain URL; the page is
 * indexable (no noindex); Open Graph title/image; BlogPosting JSON-LD (headline, author, Pacific-time date).
 */
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = fileURLToPath(new URL("../..", import.meta.url));
const base = process.argv[2];
if (!base) {
  console.error("Usage: node scripts/blog/verify-seo.mjs <origin>");
  process.exit(2);
}
const LEGACY = "https://legacy.childactor101.com";
const SITE = "https://www.childactor101.com";
const decode = (s) =>
  s.replace(/&#x([0-9a-f]+);/gi, (_m, h) => String.fromCodePoint(parseInt(h, 16))).replace(/&#(\d+);/g, (_m, d) => String.fromCodePoint(+d))
    .replace(/&mdash;/g, "—").replace(/&nbsp;/g, " ").replace(/&quot;/g, '"').replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&");
const pick = (html, re) => decode((html.match(re) ?? [, ""])[1] ?? "").replace(/\s+/g, " ").trim();
const index = JSON.parse(readFileSync(join(ROOT, "src/content/blog/index.json"), "utf8"));

const problems = [];
const tally = { checked: 0, titleOk: 0, descOk: 0, canonicalOk: 0, indexable: 0, ogOk: 0, jsonLdOk: 0, liveDescriptionMissingHere: 0 };

async function check({ slug }) {
  const path = `/101-blog/${encodeURIComponent(slug)}`;
  const [mine, live] = await Promise.all([fetch(new URL(path, base)).then((r) => r.text()), fetch(`${LEGACY}${path}`).then((r) => r.text())]);
  const fail = (message) => problems.push(`${slug}: ${message}`);
  tally.checked += 1;

  const strip = (title) => title.replace(/\s+(\||[—-])\s+Child Actor 101\s*$/, "");
  const myTitle = strip(pick(mine, /<title>([\s\S]*?)<\/title>/));
  const liveTitle = strip(pick(live, /<title>([\s\S]*?)<\/title>/));
  myTitle === liveTitle ? (tally.titleOk += 1) : fail(`title "${myTitle}" vs live "${liveTitle}"`);

  const liveDescription = pick(live, /<meta name="description" content="([^"]*)"/);
  const myDescription = pick(mine, /<meta name="description" content="([^"]*)"/);
  if (liveDescription) myDescription === liveDescription ? (tally.descOk += 1) : fail(`description differs from live`);
  else myDescription ? (tally.descOk += 1, tally.liveDescriptionMissingHere += 1) : fail("no description (live has none either)");

  pick(mine, /<link rel="canonical" href="([^"]*)"/) === `${SITE}${path.replace(/%20/g, "%20")}` || pick(mine, /<link rel="canonical" href="([^"]*)"/).toLowerCase() === `${SITE}/101-blog/${encodeURIComponent(slug)}`.toLowerCase()
    ? (tally.canonicalOk += 1) : fail(`canonical is ${pick(mine, /<link rel="canonical" href="([^"]*)"/)}`);
  /<meta name="robots" content="[^"]*noindex/.test(mine) ? fail("page is noindex") : (tally.indexable += 1);
  pick(mine, /<meta property="og:title" content="([^"]*)"/) && /^https?:\/\//.test(pick(mine, /<meta property="og:image" content="([^"]*)"/)) ? (tally.ogOk += 1) : fail("missing og:title or absolute og:image");

  try {
    const blocks = [...mine.matchAll(/<script type="application\/ld\+json">([^<]*)<\/script>/g)].flatMap((m) => JSON.parse(m[1]));
    const posting = blocks.find((b) => b["@type"] === "BlogPosting");
    const liveDate = pick(live, /<time[^>]*datetime="([^"]+)"/);
    const posted = posting && new Date(posting.datePublished).toLocaleDateString("en-CA", { timeZone: "America/Los_Angeles" });
    posting?.headline && posting.author?.name && posted === liveDate ? (tally.jsonLdOk += 1) : fail(`JSON-LD incomplete or date ${posted} vs live ${liveDate}`);
  } catch (error) {
    fail(`JSON-LD unreadable: ${error.message}`);
  }
}

const queue = [...index];
await Promise.all(Array.from({ length: 3 }, async () => { while (queue.length) { await check(queue.shift()); await new Promise((d) => setTimeout(d, 120)); } }));
console.log(JSON.stringify(tally));
for (const problem of problems.slice(0, 40)) console.log(`  - ${problem}`);
console.log(`${problems.length} problem(s)`);
process.exit(problems.length ? 1 : 0);
