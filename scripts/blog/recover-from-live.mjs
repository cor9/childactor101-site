#!/usr/bin/env node
/**
 * Recovers article bodies that the WordPress export drops. The export omits some Squarespace block types (for
 * example HTML "website component" blocks), so a few posts arrive with part or all of their text missing.
 * Squarespace's own read-only JSON feed (<post URL>?format=json) carries the full body.
 *
 *   NODE_USE_ENV_PROXY=1 node scripts/blog/recover-from-live.mjs [--dry-run]
 *
 * READ-ONLY: GET requests only, 3 at a time. Nothing on Squarespace is changed. For every imported post it
 * compares the feed's text with the migrated text; if more than 1% of the feed's text is missing from the
 * migrated body (and nothing the export had would be lost), the raw feed body is stored in
 * src/content/blog/recovered-bodies.json. The importer uses it in place of the export body. Then re-run
 * the importer. Posts that are already complete are left exactly as exported.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

import { cleanBody, countWords, stripTags } from "./lib/wxr.mjs";

const ROOT = fileURLToPath(new URL("../..", import.meta.url));
const dir = join(ROOT, "src/content/blog");
const ORIGIN = "https://legacy.childactor101.com";
const dryRun = process.argv.includes("--dry-run");

const norm = (s) => s.toLowerCase().replace(/[^\p{L}\p{N}\s]/gu, " ").replace(/\s+/g, " ").trim().split(" ").filter(Boolean);
const shingles = (words, n = 6) => {
  const set = new Set();
  for (let i = 0; i + n <= words.length; i += 1) set.add(words.slice(i, i + n).join(" "));
  return set;
};
const coverage = (from, within) => {
  const a = shingles(from);
  if (!a.size) return 1;
  const b = shingles(within);
  let hit = 0;
  for (const s of a) if (b.has(s)) hit += 1;
  return hit / a.size;
};
const videoIds = (html) => new Set([...html.matchAll(/(?:youtube(?:-nocookie)?\.com\/(?:embed\/|watch\?v=)|youtu\.be\/|player\.vimeo\.com\/video\/)([\w-]{6,})/g)].map((m) => m[1]));
const imageKey = (url) => url.replace(/^https?:/, "").replace(/\?.*$/, "").split("/").slice(-2).join("/");
const linkMap = Object.fromEntries(Object.entries(JSON.parse(readFileSync(join(ROOT, "scripts/blog/link-map.json"), "utf8"))).filter(([k]) => k.startsWith("/")).map(([k, v]) => [k.toLowerCase(), v]));

const index = JSON.parse(readFileSync(join(dir, "index.json"), "utf8"));
let store = {};
try {
  store = JSON.parse(readFileSync(join(dir, "recovered-bodies.json"), "utf8"));
} catch {
  /* first run */
}

const results = [];
const queue = [...index];
async function worker() {
  while (queue.length) {
    const { slug } = queue.shift();
    const mine = JSON.parse(readFileSync(join(dir, "posts", `${slug.toLowerCase()}.json`), "utf8"));
    try {
      const response = await fetch(`${ORIGIN}/101-blog/${encodeURIComponent(slug)}?format=json`);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const item = (await response.json()).item;
      const feed = cleanBody(item.body ?? "", linkMap);
      const feedWords = norm(stripTags(feed.html));
      const myWords = norm(stripTags(mine.body));
      // What fraction of the feed's text is missing from the migrated body, and the reverse.
      const feedInMine = coverage(feedWords, myWords);
      const mineInFeed = coverage(myWords, feedWords);
      const lostVideos = [...videoIds(mine.body)].filter((id) => !videoIds(feed.html).has(id));
      // Also incomplete when the feed has a video or image the migrated body lacks (e.g. a code-block embed).
      const missingVideos = [...videoIds(feed.html)].filter((id) => !videoIds(mine.body).has(id));
      const mineImages = new Set(mine.images.map(imageKey));
      const missingImages = feed.images.filter((url) => !mineImages.has(imageKey(url)));
      const incomplete = feedInMine < 0.99 || missingVideos.length > 0 || missingImages.length > 0;
      const safe = mineInFeed >= 0.97 && lostVideos.length === 0;
      results.push({ missingVideos, missingImages: missingImages.length, slug, mineWords: myWords.length, feedWords: feedWords.length, feedInMine, mineInFeed, incomplete, safe, lostVideos, body: item.body });
    } catch (error) {
      results.push({ slug, error: error.message });
    }
    await new Promise((done) => setTimeout(done, 150));
  }
}
await Promise.all(Array.from({ length: 3 }, worker));
results.sort((a, b) => a.slug.localeCompare(b.slug));

const errors = results.filter((r) => r.error);
const incomplete = results.filter((r) => r.incomplete);
console.log(`Checked ${results.length} posts: ${errors.length} fetch errors, ${incomplete.length} with an incomplete export body.`);
for (const r of incomplete) {
  console.log(`  ${r.safe ? "RECOVER" : "REVIEW "} ${r.slug.slice(0, 58).padEnd(58)} words ${String(r.mineWords).padStart(5)} → ${String(r.feedWords).padStart(5)}  (${((1 - r.feedInMine) * 100).toFixed(1)}% of feed text missing${r.missingVideos?.length ? `; ${r.missingVideos.length} video(s) missing` : ""}${r.missingImages ? `; ${r.missingImages} image(s) missing` : ""}${r.lostVideos.length ? `; would lose video ${r.lostVideos}` : ""})`);
}
for (const r of errors) console.log(`  ERROR ${r.slug}: ${r.error}`);

if (!dryRun) {
  for (const r of incomplete.filter((entry) => entry.safe)) {
    store[r.slug.toLowerCase()] = {
      source: "squarespace-json-feed",
      note: "The WordPress export omitted part of this post's body; recovered from the read-only JSON feed.",
      exportWords: r.mineWords,
      recoveredWords: r.feedWords,
      body: r.body,
    };
  }
  writeFileSync(join(dir, "recovered-bodies.json"), `${JSON.stringify(store, null, 2)}\n`);
  console.log(`Stored ${Object.keys(store).length} recovered bodies. Now re-run: node scripts/blog/import-squarespace.mjs <export.xml>`);
}
process.exit(errors.length ? 1 : 0);
