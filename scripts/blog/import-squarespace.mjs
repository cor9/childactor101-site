#!/usr/bin/env node
/**
 * Imports an official Squarespace export (WordPress-format .xml) into src/content/blog.
 *
 *   node scripts/blog/import-squarespace.mjs <export.xml | folder> [more files...] [--out <dir>] [--dry-run]
 *
 * Writes (under --out, default src/content/blog):
 *   posts/<lowercase-slug>.json   full post, body HTML sanitised
 *   index.json                    lightweight summaries, newest first (archive, sitemap, redirects)
 *   image-manifest.json           original image URL -> migration state (kept across re-imports)
 *   import-report.json            what was read, skipped and flagged
 *
 * Re-running is safe: posts are rebuilt from the export, and image copies already downloaded
 * (scripts/blog/download-images.mjs) are re-applied. Squarespace is only ever read, never contacted.
 */
import { existsSync, mkdirSync, readFileSync, readdirSync, rmSync, statSync, writeFileSync } from "node:fs";
import { basename, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { applyImageManifest, emptyEntry } from "./lib/images.mjs";
import { buildPost, parseExport } from "./lib/wxr.mjs";

const ROOT = fileURLToPath(new URL("../..", import.meta.url));

function parseArgs(argv) {
  const args = { inputs: [], out: join(ROOT, "src/content/blog"), dryRun: false, authors: join(ROOT, "scripts/blog/author-map.json") };
  for (let i = 0; i < argv.length; i += 1) {
    if (argv[i] === "--out") args.out = resolve(argv[(i += 1)]);
    else if (argv[i] === "--authors") args.authors = resolve(argv[(i += 1)]);
    else if (argv[i] === "--dry-run") args.dryRun = true;
    else args.inputs.push(resolve(argv[i]));
  }
  return args;
}

function collectXmlFiles(inputs) {
  const files = [];
  for (const input of inputs) {
    if (!existsSync(input)) throw new Error(`Not found: ${input}`);
    if (statSync(input).isDirectory()) {
      for (const name of readdirSync(input).sort()) if (name.toLowerCase().endsWith(".xml")) files.push(join(input, name));
    } else {
      files.push(input);
    }
  }
  return files;
}

const readJson = (path, fallback) => (existsSync(path) ? JSON.parse(readFileSync(path, "utf8")) : fallback);

function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.inputs.length === 0) {
    console.error("Usage: node scripts/blog/import-squarespace.mjs <export.xml | folder> [more.xml ...] [--out <dir>] [--dry-run]");
    process.exit(2);
  }

  const files = collectXmlFiles(args.inputs);
  if (files.length === 0) throw new Error("No .xml files found in the given inputs.");

  const authorMap = readJson(args.authors, {});
  const linkMap = Object.fromEntries(
    Object.entries(readJson(join(ROOT, "scripts/blog/link-map.json"), {}))
      .filter(([key]) => key.startsWith("/"))
      .map(([key, value]) => [key.toLowerCase(), value]),
  );
  const recovered = readJson(join(args.out, "recovered-bodies.json"), {});
  const seo = readJson(join(args.out, "seo-overrides.json"), {});
  const manifestPath = join(args.out, "image-manifest.json");
  const manifest = readJson(manifestPath, {});

  const report = {
    importedAt: new Date().toISOString(),
    files: [],
    postsRead: 0,
    skipped: [],
    duplicates: [],
    warnings: {},
    nonPostItems: [],
  };
  const bySlug = new Map();

  for (const file of files) {
    const { posts, attachments, other, site, authors } = parseExport(readFileSync(file, "utf8"), basename(file));
    // Display names from the export's own author table; author-map.json overrides win.
    Object.assign(authorMap, { ...authors, ...readJson(args.authors, {}) });
    report.files.push({ file: basename(file), site: site.title, posts: posts.length, attachments: attachments.size });
    report.nonPostItems.push(...other.map((item) => ({ ...item, file: basename(file) })));

    for (const item of posts) {
      report.postsRead += 1;
      const { post, status, warnings } = buildPost(item, attachments, { authorMap, linkMap, recovered, seo });
      const label = post.slug || post.title || post.sourceId || "(unknown)";

      if (status !== "publish") {
        report.skipped.push({ slug: post.slug, title: post.title, reason: `status is "${status}", not published`, file: basename(file) });
        continue;
      }
      if (!post.slug) {
        report.skipped.push({ slug: null, title: post.title, reason: "no slug, cannot create a URL", file: basename(file) });
        continue;
      }
      const key = post.slug.toLowerCase();
      if (bySlug.has(key)) {
        report.duplicates.push({ slug: post.slug, keptFrom: bySlug.get(key).file, ignoredFrom: basename(file) });
        continue;
      }
      if (warnings.length) report.warnings[label] = warnings;
      bySlug.set(key, { post, file: basename(file) });
    }
  }

  const posts = [...bySlug.values()]
    .map(({ post }) => post)
    .sort((a, b) => (b.date ?? "").localeCompare(a.date ?? "") || a.slug.localeCompare(b.slug));

  for (const post of posts) {
    for (const url of post.images) manifest[url] ??= emptyEntry();
  }

  const finalPosts = posts.map((post) => applyImageManifest(post, manifest));
  const index = finalPosts.map(({ body, images, internalLinks, linkFixes, contentIssues, ...summary }) => ({
    ...summary,
    imageCount: images.length,
  }));

  console.log(`Read ${report.postsRead} posts from ${files.length} file(s): ${finalPosts.length} importable, ${report.skipped.length} skipped, ${report.duplicates.length} duplicate slugs.`);
  console.log(`Posts with warnings: ${Object.keys(report.warnings).length}. Images referenced: ${Object.keys(manifest).length}.`);

  if (args.dryRun) {
    console.log("Dry run: nothing written.");
    return;
  }

  const postsDir = join(args.out, "posts");
  mkdirSync(postsDir, { recursive: true });
  const keep = new Set(finalPosts.map((post) => `${post.slug.toLowerCase()}.json`));
  for (const name of readdirSync(postsDir)) if (name.endsWith(".json") && !keep.has(name)) rmSync(join(postsDir, name));
  for (const post of finalPosts) writeFileSync(join(postsDir, `${post.slug.toLowerCase()}.json`), `${JSON.stringify(post, null, 2)}\n`);

  writeFileSync(join(args.out, "index.json"), `${JSON.stringify(index, null, 2)}\n`);
  writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);
  writeFileSync(join(args.out, "import-report.json"), `${JSON.stringify(report, null, 2)}\n`);
  console.log(`Wrote ${finalPosts.length} posts to ${args.out}`);
  console.log("Next: node scripts/blog/download-images.mjs, then node scripts/blog/audit.mjs");
}

try {
  main();
} catch (error) {
  console.error(`Import failed: ${error.message}`);
  process.exit(1);
}
