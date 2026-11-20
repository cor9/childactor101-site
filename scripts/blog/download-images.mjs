#!/usr/bin/env node
/**
 * Copies every image referenced by imported posts into public/blog/images, then re-points the
 * posts at the local copies. Reads image URLs from the export only (no crawling of the live site).
 *
 *   node scripts/blog/download-images.mjs [--dir <content dir>] [--public <public/blog/images>] [--retry-failed]
 *
 * Static images are resized to at most MAX_WIDTH px wide and saved as WebP (alpha kept) so the repo and the
 * deployment stay small; animated images and SVGs are copied untouched. Width and height are recorded in the
 * manifest so posts can reserve space and avoid layout shift. Originals stay on Squarespace, which is never modified.
 *
 * Safe to re-run: already-downloaded files are skipped; failures are recorded, not fatal. A file is
 * accepted only when the server answers 200 with an image/* content type.
 */
import { createHash } from "node:crypto";
import { existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import { extname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import sharp from "sharp";

import { applyImageManifest } from "./lib/images.mjs";

const ROOT = fileURLToPath(new URL("../..", import.meta.url));
const args = process.argv.slice(2);
const flag = (name, fallback) => (args.includes(name) ? resolve(args[args.indexOf(name) + 1]) : fallback);
const contentDir = flag("--dir", join(ROOT, "src/content/blog"));
const imageDir = flag("--public", join(ROOT, "public/blog/images"));
const publicPrefix = "/blog/images";
const retryFailed = args.includes("--retry-failed");
const CONCURRENCY = 6;
const MAX_WIDTH = 1600;
const WEBP_QUALITY = 82;

const KEEP_AS_IS = new Set(["image/gif", "image/svg+xml"]);
const EXT_BY_TYPE = { "image/jpeg": ".jpg", "image/png": ".png", "image/gif": ".gif", "image/webp": ".webp", "image/svg+xml": ".svg", "image/avif": ".avif" };

const manifestPath = join(contentDir, "image-manifest.json");
if (!existsSync(manifestPath)) {
  console.error("No image-manifest.json. Run scripts/blog/import-squarespace.mjs first.");
  process.exit(2);
}
const manifest = JSON.parse(readFileSync(manifestPath, "utf8"));
mkdirSync(imageDir, { recursive: true });

/** Returns the bytes to store plus metadata. Animated or vector images are kept exactly as served. */
async function prepare(bytes, contentType) {
  const type = contentType.split(";")[0].trim();
  const meta = await sharp(bytes, { animated: true }).metadata().catch(() => null);
  const animated = (meta?.pages ?? 1) > 1;
  if (KEEP_AS_IS.has(type) || animated || !meta) {
    return { bytes, type, width: meta?.width ?? null, height: meta ? (meta.pageHeight ?? meta.height) : null, optimized: false };
  }
  const { data, info } = await sharp(bytes)
    .rotate()
    .resize({ width: MAX_WIDTH, withoutEnlargement: true })
    .webp({ quality: WEBP_QUALITY })
    .toBuffer({ resolveWithObject: true });
  return { bytes: data, type: "image/webp", width: info.width, height: info.height, optimized: true };
}

function fileNameFor(url, contentType) {
  const hash = createHash("sha1").update(url).digest("hex").slice(0, 10);
  const pathname = new URL(url).pathname;
  const base = decodeURIComponent(pathname.split("/").pop() || "image").replace(/\.[a-z0-9]+$/i, "").replace(/[^A-Za-z0-9_-]+/g, "-").slice(0, 60) || "image";
  const ext = EXT_BY_TYPE[contentType.split(";")[0].trim()] ?? (extname(pathname).toLowerCase() || ".img");
  return `${hash}-${base}${ext}`;
}

async function fetchImage(url) {
  const response = await fetch(url, { redirect: "follow", signal: AbortSignal.timeout(30_000) });
  const contentType = response.headers.get("content-type") ?? "";
  if (response.status !== 200) throw new Error(`HTTP ${response.status}`);
  if (!contentType.startsWith("image/")) throw new Error(`not an image (${contentType || "no content-type"})`);
  return { bytes: Buffer.from(await response.arrayBuffer()), contentType };
}

const todo = Object.entries(manifest).filter(([, entry]) => entry.status === "pending" || (retryFailed && entry.status === "failed"));
console.log(`${Object.keys(manifest).length} images in manifest; ${todo.length} to download.`);

let done = 0;
let queue = [...todo];
async function worker() {
  while (queue.length) {
    const [url] = queue.shift();
    try {
      const fetched = await fetchImage(url);
      const prepared = await prepare(fetched.bytes, fetched.contentType);
      const name = fileNameFor(url, prepared.type);
      writeFileSync(join(imageDir, name), prepared.bytes);
      manifest[url] = {
        status: "downloaded",
        localPath: `${publicPrefix}/${name}`,
        bytes: prepared.bytes.length,
        originalBytes: fetched.bytes.length,
        contentType: prepared.type,
        width: prepared.width,
        height: prepared.height,
        optimized: prepared.optimized,
      };
    } catch (error) {
      manifest[url] = { status: "failed", localPath: null, error: String(error.message ?? error) };
    }
    done += 1;
    if (done % 25 === 0 || done === todo.length) console.log(`  ${done}/${todo.length}`);
  }
}
await Promise.all(Array.from({ length: CONCURRENCY }, worker));

// Re-point posts and summaries at local copies.
const postsDir = join(contentDir, "posts");
for (const name of readdirSync(postsDir).filter((file) => file.endsWith(".json"))) {
  const path = join(postsDir, name);
  const post = JSON.parse(readFileSync(path, "utf8"));
  writeFileSync(path, `${JSON.stringify(applyImageManifest(post, manifest), null, 2)}\n`);
}
const indexPath = join(contentDir, "index.json");
const index = JSON.parse(readFileSync(indexPath, "utf8")).map((summary) => {
  const entry = summary.featuredImage ? manifest[summary.featuredImage.url] : null;
  return summary.featuredImage
    ? { ...summary, featuredImage: { ...summary.featuredImage, src: entry?.status === "downloaded" ? entry.localPath : summary.featuredImage.url } }
    : summary;
});
writeFileSync(indexPath, `${JSON.stringify(index, null, 2)}\n`);
writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);

const counts = Object.values(manifest).reduce((acc, entry) => ({ ...acc, [entry.status]: (acc[entry.status] ?? 0) + 1 }), {});
console.log(`Done: ${JSON.stringify(counts)}`);
const failed = Object.entries(manifest).filter(([, entry]) => entry.status === "failed");
for (const [url, entry] of failed.slice(0, 20)) console.log(`  FAILED ${url} (${entry.error})`);
if (failed.length) console.log("Re-run with --retry-failed after fixing access. Failed images keep hot-linking the original URL.");
