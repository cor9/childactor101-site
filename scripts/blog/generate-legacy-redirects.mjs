#!/usr/bin/env node
/**
 * Generates the article-to-article redirect list for the legacy Squarespace site (URL Mappings format).
 * It only WRITES A FILE for a human to review and paste later. It never contacts or changes Squarespace.
 *
 *   node scripts/blog/generate-legacy-redirects.mjs [--content src/content/blog] [--out docs/seo/legacy-url-mappings.txt]
 *
 * Format, one per line:  /101-blog/<slug> -> https://www.childactor101.com/101-blog/<slug> 301
 * Sections: (1) every article, one to one; (2) the blog index; (3) category and tag archives mapped to the
 * matching new archive, or to the blog archive when the new site has no indexable page for it. Nothing is
 * ever mapped to the homepage.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = fileURLToPath(new URL("../..", import.meta.url));
const arg = (name, fallback) => (process.argv.includes(name) ? resolve(process.argv[process.argv.indexOf(name) + 1]) : fallback);
const contentDir = arg("--content", join(ROOT, "src/content/blog"));
const outFile = arg("--out", join(ROOT, "docs/seo/legacy-url-mappings.txt"));
const NEW = "https://www.childactor101.com";

const index = JSON.parse(readFileSync(join(contentDir, "index.json"), "utf8"));
const enc = (value) => encodeURIComponent(value);

const lines = [];
const special = [];

lines.push("# 1. Articles (one to one)");
for (const post of index) {
  const source = `/101-blog/${enc(post.slug)}`;
  const target = `${NEW}/101-blog/${enc(post.slug)}`;
  lines.push(`${source} -> ${target} 301`);
  if (/[^A-Za-z0-9_-]/.test(post.slug) || post.slug.startsWith("-")) special.push(post.slug);
}

lines.push("", "# 2. Blog index (archive to archive)", `/101-blog -> ${NEW}/101-blog 301`);

const countBy = (select) => {
  const map = new Map();
  for (const post of index) for (const term of select(post)) map.set(term.slug, { ...term, count: (map.get(term.slug)?.count ?? 0) + 1 });
  return [...map.values()];
};
lines.push("", "# 3. Category and tag archives (archive to archive; single-article tags go to the blog archive, never the homepage)");
for (const category of countBy((post) => post.categories)) {
  lines.push(`/101-blog/category/${enc(category.name)} -> ${NEW}/101-blog/category/${enc(category.slug)} 301`);
}
for (const tag of countBy((post) => post.tags)) {
  const target = tag.count >= 2 ? `${NEW}/101-blog/tag/${enc(tag.slug)}` : `${NEW}/101-blog`;
  lines.push(`/101-blog/tag/${enc(tag.name)} -> ${target} 301`);
}

const header = [
  "# Legacy Squarespace URL Mappings for the 101 Blog. NOT APPLIED. Generated for review.",
  "# Apply only after the new blog is deployed and verified (docs/seo/legacy-seo-transition-plan.md).",
  `# ${index.length} articles. Slugs needing a manual test in the pilot (spaces, leading hyphen): ${special.length ? special.join(" | ") : "none"}`,
  "",
];
writeFileSync(outFile, `${[...header, ...lines].join("\n")}\n`);
console.log(`Wrote ${lines.filter((line) => line.includes(" -> ")).length} mappings to ${outFile}`);
if (special.length) console.log(`Special slugs to pilot: ${special.join(", ")}`);
