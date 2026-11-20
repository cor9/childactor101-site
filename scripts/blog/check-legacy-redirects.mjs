#!/usr/bin/env node
/**
 * READ-ONLY check of the legacy site's redirects for the 101 Blog. Only GET requests, 3 at a time.
 *
 *   NODE_USE_ENV_PROXY=1 node scripts/blog/check-legacy-redirects.mjs
 *       [--legacy https://legacy.childactor101.com] [--target https://www.childactor101.com] [--follow] [--only slug,slug] [--content <dir>]
 *
 * For every article it reports one of:
 *   REDIRECTED  a single 301 to exactly the matching new URL (and, with --follow, the new URL answers 200)
 *   NOT-YET     still served by the legacy site (HTTP 200)
 *   WRONG       a redirect to somewhere else, a 302/307/308, a chain, a loop, or a non-200 end
 * Exit code 1 if any WRONG. Use it before (baseline), during (pilot) and after the transition.
 */
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = fileURLToPath(new URL("../..", import.meta.url));
const arg = (name, fallback) => (process.argv.includes(name) ? process.argv[process.argv.indexOf(name) + 1] : fallback);
const LEGACY = arg("--legacy", "https://legacy.childactor101.com");
const TARGET = arg("--target", "https://www.childactor101.com");
const CONTENT = arg("--content", join(ROOT, "src/content/blog"));
const follow = process.argv.includes("--follow");
const only = arg("--only", "")?.split(",").filter(Boolean);

const index = JSON.parse(readFileSync(join(CONTENT, "index.json"), "utf8")).filter((post) => !only?.length || only.includes(post.slug));
const enc = (slug) => encodeURIComponent(slug);

async function check(slug) {
  const from = `${LEGACY}/101-blog/${enc(slug)}`;
  const expected = `${TARGET}/101-blog/${enc(slug)}`;
  const response = await fetch(from, { redirect: "manual" });
  if (response.status === 200) return { slug, state: "NOT-YET" };
  const location = response.headers.get("location");
  if (response.status !== 301 || !location) return { slug, state: "WRONG", why: `HTTP ${response.status}${location ? ` to ${location}` : ""}` };
  const resolved = new URL(location, from).href;
  if (resolved !== expected) return { slug, state: "WRONG", why: `redirects to ${resolved}, expected ${expected}` };
  if (follow) {
    const end = await fetch(resolved, { redirect: "manual" });
    if (end.status !== 200) return { slug, state: "WRONG", why: `new URL answers HTTP ${end.status}${end.headers.get("location") ? ` to ${end.headers.get("location")}` : ""}` };
  }
  return { slug, state: "REDIRECTED" };
}

const results = [];
const queue = [...index];
await Promise.all(
  Array.from({ length: 3 }, async () => {
    while (queue.length) {
      const { slug } = queue.shift();
      try {
        results.push(await check(slug));
      } catch (error) {
        results.push({ slug, state: "WRONG", why: `request failed: ${error.cause?.message ?? error.message}` });
      }
      await new Promise((done) => setTimeout(done, 120));
    }
  }),
);

const count = (state) => results.filter((result) => result.state === state).length;
console.log(`Checked ${results.length} articles on ${LEGACY}: ${count("REDIRECTED")} redirected correctly, ${count("NOT-YET")} not yet redirected, ${count("WRONG")} wrong.`);
for (const result of results.filter((entry) => entry.state === "WRONG").sort((a, b) => a.slug.localeCompare(b.slug)).slice(0, 40)) console.log(`  WRONG ${result.slug}: ${result.why}`);
process.exit(count("WRONG") ? 1 : 0);
