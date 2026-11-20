/**
 * Image manifest helpers. The manifest maps each ORIGINAL image URL (as found in the export) to its
 * migration state, so imports and downloads can be re-run safely:
 *   { "https://images.squarespace-cdn.com/...jpg": { status: "downloaded", localPath: "/blog/images/ab12-cover.jpg" } }
 * status: "pending" (still hot-linked from Squarespace), "downloaded", or "failed".
 */
export function emptyEntry() {
  return { status: "pending", localPath: null };
}

/** Points each body image and the featured image at its local copy where one exists. */
export function applyImageManifest(post, manifest) {
  let body = post.body;
  for (const url of post.images) {
    const entry = manifest[url];
    if (entry?.status === "downloaded" && entry.localPath) {
      // Point at the local copy and, when known, reserve its space (width/height) unless the tag already sets them.
      const dims = entry.width && entry.height ? ` width="${entry.width}" height="${entry.height}"` : "";
      body = body.replace(new RegExp(`<img([^>]*?)src="${url.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}"([^>]*)>`, "g"), (_tag, before, after) =>
        /\swidth=|\sheight=/.test(before + after) ? `<img${before}src="${entry.localPath}"${after}>` : `<img${before}src="${entry.localPath}"${dims}${after}>`,
      );
    }
  }
  const featured = post.featuredImage;
  const featuredEntry = featured ? manifest[featured.url] : null;
  return {
    ...post,
    body,
    featuredImage: featured
      ? { ...featured, src: featuredEntry?.status === "downloaded" && featuredEntry.localPath ? featuredEntry.localPath : featured.url }
      : null,
  };
}

export function imageSummary(post, manifest) {
  const summary = { total: post.images.length, local: 0, remote: 0, failed: 0 };
  for (const url of post.images) {
    const status = manifest[url]?.status ?? "pending";
    if (status === "downloaded") summary.local += 1;
    else if (status === "failed") summary.failed += 1;
    else summary.remote += 1;
  }
  return summary;
}
