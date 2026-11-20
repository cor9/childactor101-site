#!/usr/bin/env node
/**
 * Requests every internal link found in the imported articles against a running site and reports
 * which resolve. Follows redirects (up to 5 hops) and never leaves the given origin.
 *
 *   node scripts/blog/check-links.mjs http://localhost:3000 [--csv docs/seo/blog-link-check.csv]
 *
 * Exits 1 if any internal link ends in a non-200. External links are counted by host, not requested.
 */
import { readFileSync, readdirSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = fileURLToPath(new URL("../..", import.meta.url));
const base = process.argv[2];
if (!base) {
  console.error("Usage: node scripts/blog/check-links.mjs <origin> [--csv <file>]");
  process.exit(2);
}
const csvIndex = process.argv.indexOf("--csv");
const csvPath = csvIndex > -1 ? resolve(process.argv[csvIndex + 1]) : null;

const dir = join(ROOT, "src/content/blog/posts");
const internal = new Map(); // path -> Set(slugs)
const external = new Map(); // host -> count
for (const file of readdirSync(dir).filter((name) => name.endsWith(".json"))) {
  const post = JSON.parse(readFileSync(join(dir, file), "utf8"));
  for (const match of post.body.matchAll(/<a [^>]*href="([^"]*)"/g)) {
    const href = match[1].replace(/&amp;/g, "&");
    if (href.startsWith("/")) {
      const path = href.split("#")[0] || "/";
      internal.set(path, (internal.get(path) ?? new Set()).add(post.slug));
    } else if (/^https?:/i.test(href)) {
      const host = new URL(href).hostname;
      external.set(host, (external.get(host) ?? 0) + 1);
    }
  }
}

async function resolveLink(path) {
  let url = new URL(path, base);
  for (let hop = 0; hop < 5; hop += 1) {
    const response = await fetch(url, { redirect: "manual" });
    if (response.status >= 300 && response.status < 400 && response.headers.get("location")) {
      url = new URL(response.headers.get("location"), url);
      if (url.origin !== new URL(base).origin) return { status: response.status, final: url.href, hops: hop + 1, left: true };
      continue;
    }
    return { status: response.status, final: url.pathname, hops: hop };
  }
  return { status: 0, final: "redirect loop", hops: 5 };
}

const rows = [];
for (const [path, slugs] of [...internal].sort()) {
  const result = await resolveLink(path);
  rows.push({ path, articles: slugs.size, ...result, ok: result.status === 200 || result.left === true });
}

const broken = rows.filter((row) => !row.ok);
console.log(`Internal links: ${rows.length} unique paths, ${[...internal.values()].reduce((n, s) => n + s.size, 0)} article/link pairs.`);
console.log(`Resolving: ${rows.length - broken.length}. Broken: ${broken.length}.`);
for (const row of broken) console.log(`  BROKEN ${row.status} ${row.path}  (used in ${row.articles} article${row.articles === 1 ? "" : "s"})`);
console.log(`External links: ${[...external.values()].reduce((a, b) => a + b, 0)} across ${external.size} hosts (not requested).`);

if (csvPath) {
  writeFileSync(csvPath, ["path,articles,status,final", ...rows.map((row) => `"${row.path}",${row.articles},${row.status},"${row.final}"`)].join("\n") + "\n");
}
process.exit(broken.length ? 1 : 0);
