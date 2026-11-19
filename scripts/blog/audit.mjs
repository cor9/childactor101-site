#!/usr/bin/env node
/**
 * Migration audit: compares what was imported against the 155-article inventory and writes
 *   docs/seo/blog-migration-audit.md   human-readable summary and issue lists
 *   docs/seo/blog-migration-audit.csv  one row per article: original URL vs new URL, status, images, issues
 *
 *   node scripts/blog/audit.mjs [--content <dir>] [--docs <dir>] [--strict]
 *
 * --strict exits 1 when any inventory article is missing or needs review.
 */
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { imageSummary } from "./lib/images.mjs";

const ROOT = fileURLToPath(new URL("../..", import.meta.url));
const args = process.argv.slice(2);
const flag = (name, fallback) => (args.includes(name) ? resolve(args[args.indexOf(name) + 1]) : fallback);
const contentDir = flag("--content", join(ROOT, "src/content/blog"));
const docsDir = flag("--docs", join(ROOT, "docs/seo"));
const strict = args.includes("--strict");

const SITE = "https://www.childactor101.com";
const SHORT_BODY_WORDS = 60;

const readJson = (path, fallback) => (existsSync(path) ? JSON.parse(readFileSync(path, "utf8")) : fallback);
const inventory = readJson(join(ROOT, "src/content/blog/legacy-inventory.json"), []);
const index = readJson(join(contentDir, "index.json"), []);
const manifest = readJson(join(contentDir, "image-manifest.json"), {});
const report = readJson(join(contentDir, "import-report.json"), null);

if (!report) {
  console.error("No import-report.json found. Import an export first: node scripts/blog/import-squarespace.mjs <export.xml>");
  process.exit(2);
}

const loadPost = (slug) => readJson(join(contentDir, "posts", `${slug.toLowerCase()}.json`), null);
const bySlug = new Map(index.map((post) => [post.slug.toLowerCase(), post]));
const inventorySlugs = new Set(inventory.map((entry) => entry.slug.toLowerCase()));

const rows = [];
const notes = [];
const seoIssues = [];
const titleCount = new Map();
for (const post of index) titleCount.set(post.title.trim().toLowerCase(), (titleCount.get(post.title.trim().toLowerCase()) ?? 0) + 1);

function auditPost(post, inventoryEntry) {
  const full = loadPost(post.slug) ?? post;
  const issues = [];
  const seo = [];
  if (!post.title) issues.push("no title");
  if (!post.author) issues.push("no author");
  if (!post.date) issues.push("no publication date");
  if (!full.body) issues.push("empty body");
  else if (full.sourceWordCount && post.wordCount < full.sourceWordCount * 0.98) issues.push(`text lost in cleaning (${full.sourceWordCount} words in export, ${post.wordCount} kept)`);
  if (full.body && post.wordCount < SHORT_BODY_WORDS) {
    notes.push({ slug: post.slug, message: `${post.wordCount} words, ${full.images?.length ?? 0} image(s), ${full.embedCount ?? 0} embed(s)${full.embedCount || full.images?.length ? " (media-led post; text is genuinely short in the export)" : ""}` });
  }

  const images = imageSummary(full, manifest);
  if (images.failed) issues.push(`${images.failed} image(s) failed to download`);
  if (full.contentIssues?.imagesWithoutAlt) seo.push(`${full.contentIssues.imagesWithoutAlt} image(s) without alt text`);
  if (full.contentIssues?.iframesDropped) issues.push(`${full.contentIssues.iframesDropped} embed(s) removed (not on the allow-list)`);
  if (!post.featuredImage) seo.push("no featured image (social sharing falls back to the site image)");
  if (post.excerptSource === "derived-from-body") seo.push("no excerpt in export: meta description derived from body text");
  if (post.title.length > 60) seo.push(`title is ${post.title.length} characters (may truncate in search results)`);
  if (titleCount.get(post.title.trim().toLowerCase()) > 1) seo.push("duplicate title shared with another article");
  if (inventoryEntry && inventoryEntry.slug !== post.slug) seo.push(`slug case differs from inventory (${inventoryEntry.slug} vs ${post.slug}): the site redirects case variants to the exported slug`);
  for (const link of full.internalLinks ?? []) {
    const target = link.replace(/^\/101-blog\//i, "").split(/[/?#]/)[0].toLowerCase();
    if (target && !["page", "category", "tag", "feed.xml"].includes(target) && !bySlug.has(target)) seo.push(`internal link to a blog URL that was not migrated: ${link}`);
  }
  return { issues, seo, images };
}

for (const entry of inventory) {
  const post = bySlug.get(entry.slug.toLowerCase());
  if (!post) {
    rows.push({ status: "Missing", entry, post: null, issues: ["not found in the export"], seo: [], images: { total: 0, local: 0, remote: 0, failed: 0 } });
    continue;
  }
  const { issues, seo, images } = auditPost(post, entry);
  rows.push({ status: issues.length ? "Needs review" : "Migrated", entry, post, issues, seo, images });
}

const extras = index.filter((post) => !inventorySlugs.has(post.slug.toLowerCase()));
for (const post of extras) {
  const { issues, seo, images } = auditPost(post, null);
  rows.push({ status: "Extra (not in inventory)", entry: null, post, issues, seo, images });
}

for (const row of rows) for (const message of row.seo) seoIssues.push({ slug: row.post?.slug ?? row.entry.slug, message });

// Image verification against the disk, not just the manifest.
const publicDir = flag("--public", join(ROOT, "public"));
let missingFiles = 0;
for (const entry of Object.values(manifest)) {
  if (entry.status === "downloaded" && !existsSync(join(publicDir, entry.localPath))) missingFiles += 1;
}
let remoteBodyRefs = 0;
let postsWithRemote = 0;
let remoteFeatured = 0;
for (const post of index) {
  const full = loadPost(post.slug);
  const remote = (full?.body?.match(/<img[^>]+src="https?:\/\//g) ?? []).length;
  remoteBodyRefs += remote;
  if (remote) postsWithRemote += 1;
  if (post.featuredImage && !post.featuredImage.src.startsWith("/")) remoteFeatured += 1;
}
const stored = Object.values(manifest).reduce((sum, entry) => sum + (entry.bytes ?? 0), 0);
const original = Object.values(manifest).reduce((sum, entry) => sum + (entry.originalBytes ?? 0), 0);

const count = (status) => rows.filter((row) => row.status === status).length;
const totals = Object.values(manifest).reduce((acc, entry) => ({ ...acc, [entry.status]: (acc[entry.status] ?? 0) + 1 }), {});
const cell = (value) => `"${String(value ?? "").replace(/"/g, '""')}"`;

const csvHeader = ["status", "original_url", "new_url", "title", "author", "date", "words", "images_total", "images_local", "images_hotlinked", "images_failed", "issues", "seo_notes"];
const csv = [
  csvHeader.join(","),
  ...rows.map((row) =>
    [
      row.status,
      row.entry?.url ?? "",
      row.post ? `${SITE}/101-blog/${row.post.slug}` : "",
      row.post?.title ?? row.entry?.title ?? "",
      row.post?.author ?? "",
      row.post?.date ?? "",
      row.post?.wordCount ?? "",
      row.images.total,
      row.images.local,
      row.images.remote,
      row.images.failed,
      row.issues.join("; "),
      row.seo.join("; "),
    ].map(cell).join(","),
  ),
].join("\n");

const list = (items) => (items.length ? items.map((item) => `- ${item}`).join("\n") : "_None._");
const missing = rows.filter((row) => row.status === "Missing");
const review = rows.filter((row) => row.status === "Needs review");
const seoByMessage = new Map();
for (const { slug, message } of seoIssues) {
  const key = message.replace(/\d+/g, "N").replace(/:.*$/, "");
  seoByMessage.set(key, [...(seoByMessage.get(key) ?? []), `${slug} — ${message}`]);
}

const md = `# Blog migration audit

Generated ${new Date().toISOString()} by \`scripts/blog/audit.mjs\` from \`${report.files.map((file) => file.file).join(", ")}\`.
Source of truth for the expected set: \`src/content/blog/legacy-inventory.json\` (${inventory.length} original article URLs).

## Summary

| Measure | Count |
|---|---|
| Original article URLs expected (inventory) | ${inventory.length} |
| Posts discovered in the export | ${report.postsRead} |
| Published posts imported | ${index.length} |
| **Inventory articles migrated cleanly** | **${count("Migrated")}** |
| Inventory articles migrated but needing review | ${count("Needs review")} |
| **Inventory articles missing from the export** | **${count("Missing")}** |
| Imported posts not in the inventory (new since it was made) | ${count("Extra (not in inventory)")} |
| Skipped (draft, scheduled, no slug) | ${report.skipped.length} |
| Duplicate slugs ignored | ${report.duplicates.length} |

## Images

| State | Count |
|---|---|
| Unique images referenced | ${Object.keys(manifest).length} |
| Copied to \`public/blog/images\` | ${totals.downloaded ?? 0} |
| Still hot-linked from Squarespace (not yet downloaded) | ${totals.pending ?? 0} |
| Failed to download | ${totals.failed ?? 0} |
| Local files missing on disk | ${missingFiles} |
| Image tags in article bodies still pointing at a remote URL | ${remoteBodyRefs} (${postsWithRemote} posts) |
| Featured images still remote | ${remoteFeatured} |
| Stored size${original ? " (originals were " + (original / 1e6).toFixed(0) + " MB)" : ""} | ${(stored / 1e6).toFixed(0)} MB |

${(totals.pending ?? 0) + (totals.failed ?? 0) + remoteBodyRefs > 0 ? "Some images still depend on Squarespace's CDN. Run `NODE_USE_ENV_PROXY=1 node scripts/blog/download-images.mjs --retry-failed` and re-run this audit before the legacy site is ever retired." : "Every image is stored locally; no article depends on Squarespace's CDN."}

## Missing articles

${list(missing.map((row) => `\`/101-blog/${row.entry.slug}\` — ${row.entry.title}`))}

## Migrated but needing review

${list(review.map((row) => `\`/101-blog/${row.post.slug}\` — ${row.issues.join("; ")}`))}

## Short or media-only posts (not errors)

These contain little or no text in the export. They are complete as exported; eyeball them against the live pages.

${list(notes.map((note) => `\`/101-blog/${note.slug}\` — ${note.message}`))}

## Skipped or ignored by the importer

${list([...report.skipped.map((item) => `${item.slug ?? item.title ?? "(untitled)"} — ${item.reason}`), ...report.duplicates.map((item) => `${item.slug} — duplicate slug (kept ${item.keptFrom}, ignored ${item.ignoredFrom})`)])}

## SEO issues requiring attention

${seoByMessage.size ? [...seoByMessage.entries()].map(([key, items]) => `### ${key} (${items.length})\n\n${list(items.slice(0, 40))}${items.length > 40 ? `\n- …and ${items.length - 40} more (see CSV)` : ""}`).join("\n\n") : "_None detected._"}

### Always check (cannot be detected from the export)

- Squarespace "SEO title" and "SEO description" overrides are **not included** in the WordPress export. Meta descriptions here come from the post excerpt, or from the first ~160 characters of the body. Compare a sample against the live pages (view-source on the legacy site) and add overrides if they differ.
- Squarespace "thumbnail" images are only exported when they were uploaded as post attachments. Posts marked "no featured image" above may have a thumbnail on the live site.
- Confirm the Squarespace blog collection kept every article's URL slug unchanged; the audit matches on slug only.
- Old category and tag URLs (\`/101-blog/category/...\`, \`/101-blog/tag/...\`) are rebuilt from the export's categories and tags. Spot-check a few against the live site.

## Original URL versus new URL

Every migrated article keeps its original path, so no redirect is needed. The full per-article table (status, original URL, new URL, author, date, words, image counts, issues) is in \`blog-migration-audit.csv\`.

| Original URL | New URL | Status |
|---|---|---|
${rows.slice(0, 400).map((row) => `| ${row.entry?.url ?? "—"} | ${row.post ? `${SITE}/101-blog/${row.post.slug}` : "—"} | ${row.status} |`).join("\n")}
`;

mkdirSync(docsDir, { recursive: true });
writeFileSync(join(docsDir, "blog-migration-audit.md"), md);
writeFileSync(join(docsDir, "blog-migration-audit.csv"), `${csv}\n`);

console.log(`Audit: ${count("Migrated")} migrated, ${count("Needs review")} need review, ${count("Missing")} missing, ${count("Extra (not in inventory)")} extra (of ${inventory.length} expected).`);
console.log(`Wrote ${join(docsDir, "blog-migration-audit.md")} and .csv`);
if (strict && (missing.length || review.length)) process.exit(1);
