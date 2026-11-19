#!/usr/bin/env node
/**
 * Compares every imported article with its live original. READ-ONLY: only GET requests, 3 at a time, to the
 * legacy site. Nothing on Squarespace is changed.
 *
 *   NODE_USE_ENV_PROXY=1 node scripts/blog/compare-live.mjs [--origin https://legacy.childactor101.com]
 *       [--only slug,slug] [--seo]    (--seo also writes src/content/blog/seo-overrides.json)
 *
 * Per article it checks: title, publication date, text coverage (live words missing here, and words here that
 * are not on the live page), unique images, video IDs and internal links. It also captures the live SEO title,
 * meta description and social image, which the WordPress export does not contain.
 * Writes docs/seo/blog-live-comparison.csv and .md.
 */
import { mkdirSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = fileURLToPath(new URL("../..", import.meta.url));
const arg = (name, fallback) => (process.argv.includes(name) ? process.argv[process.argv.indexOf(name) + 1] : fallback);
const ORIGIN = arg("--origin", "https://legacy.childactor101.com");
const only = arg("--only", "")?.split(",").filter(Boolean);
const writeSeo = process.argv.includes("--seo");

const decode = (s) =>
  s
    .replace(/&#x([0-9a-f]+);/gi, (_m, h) => String.fromCodePoint(parseInt(h, 16)))
    .replace(/&#(\d+);/g, (_m, d) => String.fromCodePoint(Number(d)))
    .replace(/&nbsp;/g, " ").replace(/&mdash;/g, "—").replace(/&ndash;/g, "–").replace(/&rsquo;/g, "’").replace(/&lsquo;/g, "‘")
    .replace(/&rdquo;/g, "”").replace(/&ldquo;/g, "“").replace(/&hellip;/g, "…").replace(/&quot;/g, '"').replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">").replace(/&amp;/g, "&");
const textOf = (html) =>
  decode(
    html
      .replace(/<(script|style|noscript)[\s\S]*?<\/\1>/gi, " ")
      .replace(/<\/(p|div|h[1-6]|li|ul|ol|blockquote|figure|tr|td|th|section)>|<br\s*\/?>/gi, " ")
      .replace(/<[^>]+>/g, " "),
  ).replace(/\s+/g, " ").trim();
const norm = (s) => s.toLowerCase().replace(/[^\p{L}\p{N}\s]/gu, " ").replace(/\s+/g, " ").trim();
const words = (s) => norm(s).split(" ").filter(Boolean);
const shingles = (list, n = 6) => {
  const set = new Set();
  for (let i = 0; i + n <= list.length; i += 1) set.add(list.slice(i, i + n).join(" "));
  return set;
};
const coverage = (from, within) => {
  const a = shingles(from);
  if (a.size === 0) return 1;
  const b = shingles(within);
  let hit = 0;
  for (const s of a) if (b.has(s)) hit += 1;
  return hit / a.size;
};
const meta = (html, re) => decode((html.match(re) ?? [, ""])[1] ?? "").trim();
const videoIds = (html) => new Set([...html.matchAll(/(?:youtube(?:-nocookie)?\.com\/(?:embed\/|watch\?v=)|youtu\.be\/|player\.vimeo\.com\/video\/|vimeo\.com\/)([\w-]{6,})/g)].map((m) => m[1]));
const imageKey = (url) => decode(url).replace(/^https?:/, "").replace(/\?.*$/, "").split("/").slice(-2).join("/");

const dir = join(ROOT, "src/content/blog");
const index = JSON.parse(readFileSync(join(dir, "index.json"), "utf8")).filter((p) => !only?.length || only.includes(p.slug));
const rows = [];
const seo = {};

async function check(summary) {
  const post = JSON.parse(readFileSync(join(dir, "posts", `${summary.slug.toLowerCase()}.json`), "utf8"));
  const url = `${ORIGIN}/101-blog/${encodeURIComponent(summary.slug)}`;
  const row = { slug: summary.slug, issues: [] };
  let html;
  try {
    const response = await fetch(url, { redirect: "manual" });
    row.status = response.status;
    if (response.status !== 200) {
      row.issues.push(`live page returned HTTP ${response.status}`);
      return row;
    }
    html = await response.text();
  } catch (error) {
    row.status = 0;
    row.issues.push(`fetch failed: ${error.cause?.message ?? error.message}`);
    return row;
  }

  // The article body ends where the post footer begins (tags, author profile box, comments).
  const bodyAttr = html.indexOf('itemprop="articleBody"');
  const bodyStart = bodyAttr > -1 ? html.indexOf(">", bodyAttr) + 1 : -1;
  const footerAt = ["blog-meta-item--tags", "blog-item-tag-wrapper", "blog-item-author-profile-wrapper", "blog-item-comments"]
    .map((marker) => html.indexOf(marker, bodyStart))
    .filter((position) => position > -1);
  const bodyEnd = footerAt.length ? html.lastIndexOf("<", Math.min(...footerAt)) : html.indexOf("</article>", bodyStart);
  const liveBody = bodyStart > 0 ? html.slice(bodyStart, bodyEnd > bodyStart ? bodyEnd : undefined) : "";
  if (!liveBody) row.issues.push("could not locate the live article body");

  row.liveTitle = textOf(meta(html, /<h1[^>]*entry-title[^>]*>([\s\S]*?)<\/h1>/));
  row.titleMatch = norm(row.liveTitle) === norm(post.title);
  if (!row.titleMatch) row.issues.push(`title differs: live "${row.liveTitle}" vs "${post.title}"`);

  row.liveDate = meta(html, /<time[^>]*datetime="([^"]+)"/);
  const pacific = post.date ? new Date(post.date).toLocaleDateString("en-CA", { timeZone: "America/Los_Angeles" }) : null;
  row.dateMatch = row.liveDate === post.dateDisplay;
  row.dateMatchPacific = row.liveDate === pacific;
  row.pacific = pacific;
  if (!row.dateMatch) row.issues.push(`date differs: live ${row.liveDate} vs ${post.dateDisplay} (Pacific-time conversion: ${pacific})`);

  const liveText = textOf(liveBody);
  const myText = textOf(post.body);
  row.liveWords = words(liveText).length;
  row.myWords = words(myText).length;
  row.liveInMine = coverage(words(liveText), words(myText));
  row.mineInLive = coverage(words(myText), words(liveText));
  if (row.liveInMine < 0.97) row.issues.push(`only ${(row.liveInMine * 100).toFixed(1)}% of the live text is present here`);
  if (row.mineInLive < 0.97) row.issues.push(`${((1 - row.mineInLive) * 100).toFixed(1)}% of the text here is not on the live page`);

  // Related-post thumbnails (…?format=300w) are page furniture, not article content.
  const liveImages = new Set([...liveBody.matchAll(/<img[^>]+(?:data-src|src)="([^"]+)"/g)].filter((m) => !/format=300w/.test(m[1])).map((m) => imageKey(m[1])));
  const myImages = new Set(post.images.map(imageKey));
  const missingImages = [...liveImages].filter((key) => !myImages.has(key));
  row.liveImages = liveImages.size;
  row.myImages = myImages.size;
  row.missingImages = missingImages.length;
  if (missingImages.length) row.issues.push(`${missingImages.length} live image(s) not in the migrated article`);

  const liveVideos = videoIds(decode(liveBody));
  const myVideos = videoIds(post.body);
  const missingVideos = [...liveVideos].filter((id) => !myVideos.has(id));
  row.liveVideos = liveVideos.size;
  row.myVideos = myVideos.size;
  if (missingVideos.length) row.issues.push(`video(s) missing: ${missingVideos.join(", ")}`);

  const liveLinks = new Set([...liveBody.matchAll(/<a [^>]*href="([^"]+)"/g)].map((m) => decode(m[1]).replace(/^https?:\/\/(www\.|legacy\.)?childactor101\.com/, "").replace(/\/$/, "")));
  const myLinks = new Set([...post.body.matchAll(/<a [^>]*href="([^"]+)"/g)].map((m) => decode(m[1]).replace(/\/$/, "")));
  const repaired = new Set((post.linkFixes ?? []).map((fix) => fix.from));
  const lostLinks = [...liveLinks].filter((href) => href && !href.startsWith("#") && !/^\/101-blog(\/(tag|category)\/|\?(author|category|tag)=)/.test(href) && !myLinks.has(href) && !repaired.has(href.split(/[?#]/)[0]));
  row.liveLinks = liveLinks.size;
  row.lostLinks = lostLinks.length;
  if (lostLinks.length) row.issues.push(`${lostLinks.length} live link(s) absent: ${lostLinks.slice(0, 3).join(" ")}`);

  const seoTitle = textOf(meta(html, /<title>([\s\S]*?)<\/title>/)).replace(/\s+[—-]\s+Child Actor 101\s*$/, "");
  const description = meta(html, /<meta name="description" content="([^"]*)"/);
  const ogImage = meta(html, /<meta property="og:image" content="([^"]*)"/);
  row.seoTitle = seoTitle;
  row.metaDescription = description;
  seo[summary.slug] = { title: seoTitle || null, description: description || null };
  return row;
}

const queue = [...index];
async function worker() {
  while (queue.length) {
    const next = queue.shift();
    rows.push(await check(next));
    await new Promise((done) => setTimeout(done, 150));
  }
}
await Promise.all(Array.from({ length: 3 }, worker));
rows.sort((a, b) => a.slug.localeCompare(b.slug));

const bad = rows.filter((row) => row.issues.length);
const pct = (n, d) => (d ? `${((n / d) * 100).toFixed(1)}%` : "n/a");
const ok = rows.filter((row) => row.status === 200);
const summary = {
  compared: rows.length,
  reachable: ok.length,
  titleMatch: ok.filter((r) => r.titleMatch).length,
  dateMatch: ok.filter((r) => r.dateMatch).length,
  dateMatchPacific: ok.filter((r) => r.dateMatchPacific).length,
  postsMissingLiveText: ok.filter((r) => r.liveInMine < 0.97).length,
  noIssues: rows.length - bad.length,
  withIssues: bad.length,
  minLiveInMine: Math.min(...ok.map((r) => r.liveInMine ?? 1)),
  avgLiveInMine: ok.reduce((n, r) => n + (r.liveInMine ?? 0), 0) / (ok.length || 1),
  imagesLive: ok.reduce((n, r) => n + r.liveImages, 0),
  imagesMissing: ok.reduce((n, r) => n + r.missingImages, 0),
  videosLive: ok.reduce((n, r) => n + r.liveVideos, 0),
  videosMissing: ok.filter((r) => r.issues.some((i) => i.startsWith("video"))).length,
  descriptionsOnLive: ok.filter((r) => r.metaDescription).length,
};
console.log(JSON.stringify(summary, null, 1));
for (const row of bad.slice(0, 60)) console.log(`- ${row.slug}: ${row.issues.join(" | ")}`);

mkdirSync(join(ROOT, "docs/seo"), { recursive: true });
const cell = (v) => `"${String(v ?? "").replace(/"/g, '""')}"`;
writeFileSync(
  join(ROOT, "docs/seo/blog-live-comparison.csv"),
  [
    "slug,live_status,title_match,date_match,live_words,migrated_words,live_text_present,migrated_text_on_live,live_images,migrated_images,live_videos,migrated_videos,issues",
    ...rows.map((r) => [r.slug, r.status, r.titleMatch, r.dateMatch, r.liveWords, r.myWords, r.liveInMine?.toFixed(3), r.mineInLive?.toFixed(3), r.liveImages, r.myImages, r.liveVideos, r.myVideos, r.issues.join("; ")].map(cell).join(",")),
  ].join("\n") + "\n",
);
if (writeSeo) {
  writeFileSync(join(dir, "seo-overrides.json"), `${JSON.stringify(seo, null, 2)}\n`);
  console.log(`Wrote ${Object.keys(seo).length} SEO entries to src/content/blog/seo-overrides.json`);
}
void pct;
