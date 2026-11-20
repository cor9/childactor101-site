#!/usr/bin/env node
/**
 * Tests the blog migration pipeline. Run with: npm run test:blog
 *
 *  1. Importer: sanitising, link rewriting, captions, drafts, authors, dates, categories, images.
 *  2. Image downloader against a local stub server (success, non-image, 404, idempotent re-run).
 *  3. Audit: counts, missing articles, extras, CSV/markdown output.
 *  4. Native blog on a real production build, using a synthetic export (never committed):
 *     routes, status codes, case variants, canonicals, JSON-LD, sitemap, feed, search index, nav,
 *     the classroom, and the redirect rules (with and without LEGACY_BLOG_ORIGIN).
 *
 * Section 4 temporarily writes into src/content/blog and ALWAYS restores it afterwards. All test
 * data is synthetic (scripts/blog/fixtures); nothing here contacts Squarespace or childactor101.com.
 */
import { spawn, spawnSync } from "node:child_process";
import { cpSync, existsSync, mkdtempSync, readFileSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import http from "node:http";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = fileURLToPath(new URL("../..", import.meta.url));
const FIXTURE = join(ROOT, "scripts/blog/fixtures/sample-export.xml");
const CONTENT = join(ROOT, "src/content/blog");
const NEXT_BIN = join(ROOT, "node_modules/next/dist/bin/next");
const PORT = 3128;
const APP = `http://localhost:${PORT}`;
const LEGACY = "https://legacy.childactor101.com";

let passes = 0;
let failures = 0;
const check = (label, ok, detail = "") => {
  ok ? (passes += 1) : (failures += 1);
  console.log(`${ok ? "PASS" : "FAIL"}  ${label}${ok || !detail ? "" : `\n      ${detail}`}`);
};
const section = (title) => console.log(`\n== ${title} ==`);
const run = (script, args) => spawnSync("node", [join(ROOT, "scripts/blog", script), ...args], { encoding: "utf8" });
// Async variant: required while the in-process stub server must keep answering the child's requests.
const runAsync = (script, args) =>
  new Promise((resolve) => {
    const child = spawn("node", [join(ROOT, "scripts/blog", script), ...args]);
    let stdout = "";
    let stderr = "";
    child.stdout.on("data", (chunk) => (stdout += chunk));
    child.stderr.on("data", (chunk) => (stderr += chunk));
    child.on("close", (status) => resolve({ status, stdout, stderr }));
  });
const readJson = (path) => JSON.parse(readFileSync(path, "utf8"));
const work = mkdtempSync(join(tmpdir(), "blog-pipeline-"));

// ------------------------------------------------------------------ 1. importer
section("1. Importer");
const out = join(work, "content");
const imported = run("import-squarespace.mjs", [FIXTURE, "--out", out]);
check("import exits 0", imported.status === 0, imported.stderr + imported.stdout);

const index = readJson(join(out, "index.json"));
const report = readJson(join(out, "import-report.json"));
check("3 published posts imported, draft skipped, page and attachment ignored", index.length === 3 && report.skipped.length === 1 && report.skipped[0].slug === "a-draft");
check("index is newest first", index.map((p) => p.slug).join() === "brand-new-fixture-post,what-it-takes,Actorsaccess", index.map((p) => p.slug).join());
check("index entries carry no body", index.every((p) => !("body" in p) && !("images" in p)));

const post = readJson(join(out, "posts/what-it-takes.json"));
const mixed2excerpt = () => readJson(join(out, "posts/brand-new-fixture-post.json")).excerpt;
check("title, author, original URL preserved", post.title === "Fixture: What It Takes" && post.originalUrl === "https://www.childactor101.com/101-blog/what-it-takes");
check("publication date preserved as UTC and as the site-local calendar day", post.date === "2023-03-02T17:00:00.000Z" && post.dateDisplay === "2023-03-02");
check("author login is replaced by the display name from the export's author table", post.author === "Fixture Author");
check("categories and tags keep names and slugs", post.categories[0].slug === "start-here" && post.categories[0].name === "Start Here" && post.tags[0].slug === "basics");
check("<h1> demoted to <h2>", post.body.includes("<h2>Heading one becomes h2</h2>") && !post.body.includes("<h1"));
check("scripts removed", !/<script|alert\(/i.test(post.body));
check("allow-listed YouTube embed kept, unknown iframe removed", post.body.includes("youtube.com/embed/fixture") && !post.body.includes("evil.example.net") && post.contentIssues.iframesDropped === 1);
check("Embedly-wrapped YouTube embed is unwrapped to the real embed", post.body.includes('src="https://www.youtube.com/embed/embedlyvid?feature=oembed"') && !post.body.includes("embedly.com") && post.embedCount === 4);
check("block boundaries become spaces in derived text (no glued words)", !/\w\.[A-Z]/.test(mixed2excerpt()) , mixed2excerpt());
check("Amazon affiliate widget is kept at its native pixel size; other inline styles are dropped", post.body.includes("ws-na.amazon-adsystem.com") && /style="width:120px;height:240px"/.test(post.body) && post.body.includes("embed-widget") && !post.body.includes("color:red"));
check("video hidden in a data-html attribute (JSON-feed style) becomes a real embed", post.body.includes("youtube.com/embed/wrapped1"));
const lateEvening = index.find((entry) => entry.slug === "brand-new-fixture-post");
check("dates display in Pacific time (00:30 UTC on 1 June is 31 May at the site)", lateEvening.date === "2025-06-01T00:30:00.000Z" && lateEvening.dateDisplay === "2025-05-31", `${lateEvening.date} ${lateEvening.dateDisplay}`);
check("leftover HTML entities in titles are decoded", lateEvening.title === "Fixture: Not & In The Inventory", lateEvening.title);
check("raw word count is recorded and cleaning lost no text", post.sourceWordCount >= post.wordCount && post.wordCount >= post.sourceWordCount * 0.98, `${post.sourceWordCount} vs ${post.wordCount}`);
check("links to the old and legacy hosts become relative primary-domain paths", post.body.includes('href="/101-blog/Actorsaccess"') && post.body.includes('href="/101-blog/not-migrated-post"') && !post.body.includes("legacy.childactor101.com"));
check("external links get rel=noopener", /href="https:\/\/example\.org\/page"[^>]*rel="noopener noreferrer"/.test(post.body));
check("[caption] shortcode becomes figure/figcaption", post.body.includes("<figure>") && post.body.includes("<figcaption>A caption goes here</figcaption>"));
check("images normalised to https, lazy, alt kept, missing alt counted", post.body.includes('src="https://static1.squarespace.com/static/fixture/cover.jpg"') && post.body.includes('src="https://images.squarespace-cdn.com/content/fixture/noalt.png"') && post.contentIssues.imagesWithoutAlt === 1 && post.body.includes('loading="lazy"'));
check("empty paragraphs removed", !post.body.includes("<p></p>"));
check("featured image comes from the _thumbnail_id attachment", post.featuredImage?.source === "thumbnail" && post.featuredImage.url.endsWith("/thumb.jpg"));
check("excerpt comes from the export", post.excerpt === "A fixture excerpt." && post.excerptSource === "export");
const mixed = readJson(join(out, "posts/actorsaccess.json"));
check("mixed-case slug keeps its spelling; file name is lower-case", mixed.slug === "Actorsaccess" && existsSync(join(out, "posts/actorsaccess.json")));
check("derived excerpt is flagged when the export has none", mixed.excerptSource === "derived-from-body");
const manifest = readJson(join(out, "image-manifest.json"));
check("every referenced image is in the manifest as pending", Object.keys(manifest).length === 4 && Object.values(manifest).every((entry) => entry.status === "pending"));

const rerun = run("import-squarespace.mjs", [FIXTURE, "--out", out]);
check("re-import is idempotent", rerun.status === 0 && readJson(join(out, "index.json")).length === 3);
const notXml = join(work, "bad.xml");
writeFileSync(notXml, "<html><body>nope</body></html>");
const bad = run("import-squarespace.mjs", [notXml, "--out", join(work, "bad")]);
check("a non-export file fails clearly", bad.status === 1 && bad.stderr.includes("not a Squarespace/WordPress (WXR) export"), bad.stderr);
const overrideOut = join(work, "override-content");
cpSync(out, overrideOut, { recursive: true });
writeFileSync(join(overrideOut, "recovered-bodies.json"), JSON.stringify({ "what-it-takes": { body: "<p>Recovered paragraph from the JSON feed.</p><h1>Heading</h1>" } }));
writeFileSync(join(overrideOut, "seo-overrides.json"), JSON.stringify({ "what-it-takes": { title: "A Custom SEO Title", description: "A custom meta description." }, Actorsaccess: { title: "Fixture: Mixed Case Slug", description: null } }));
check("override import succeeds", run("import-squarespace.mjs", [FIXTURE, "--out", overrideOut]).status === 0);
const overridden = readJson(join(overrideOut, "posts/what-it-takes.json"));
check("a recovered body replaces the export body and is sanitised the same way", overridden.bodySource === "squarespace-json-feed" && overridden.body.includes("Recovered paragraph") && overridden.body.includes("<h2>Heading</h2>") && !overridden.body.includes("Heading one becomes h2"));
check("posts not recovered keep the export body", readJson(join(overrideOut, "posts/actorsaccess.json")).bodySource === "wordpress-export");
check("live SEO title and description are applied; an SEO title equal to the title is not stored", overridden.seoTitle === "A Custom SEO Title" && overridden.seoDescription === "A custom meta description." && readJson(join(overrideOut, "posts/actorsaccess.json")).seoTitle === null);
check("no arguments prints usage", run("import-squarespace.mjs", []).status === 2);

// ------------------------------------------------------------------ 2. image downloader
section("2. Image downloader (local stub server)");
const png = Buffer.from("iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==", "base64");
const stub = http.createServer((req, res) => {
  if (req.url === "/ok.png") return (res.writeHead(200, { "content-type": "image/png" }), res.end(png));
  if (req.url === "/html.png") return (res.writeHead(200, { "content-type": "text/html" }), res.end("<html>soft 404</html>"));
  res.writeHead(404);
  res.end();
});
await new Promise((done) => stub.listen(4310, done));

const dlContent = join(work, "dl-content");
const dlPublic = join(work, "dl-public");
cpSync(out, dlContent, { recursive: true });
const dlPost = readJson(join(dlContent, "posts/what-it-takes.json"));
const urls = { ok: "http://localhost:4310/ok.png", html: "http://localhost:4310/html.png", gone: "http://localhost:4310/gone.png" };
dlPost.body = `<p><img src="${urls.ok}" alt=""><img src="${urls.html}" alt=""><img src="${urls.gone}" alt=""></p>`;
dlPost.images = Object.values(urls);
dlPost.featuredImage = { url: urls.ok, src: urls.ok, source: "thumbnail" };
writeFileSync(join(dlContent, "posts/what-it-takes.json"), JSON.stringify(dlPost));
const dlIndex = readJson(join(dlContent, "index.json"));
dlIndex.find((entry) => entry.slug === "what-it-takes").featuredImage = { url: urls.ok, src: urls.ok, source: "thumbnail" };
writeFileSync(join(dlContent, "index.json"), JSON.stringify(dlIndex));
writeFileSync(join(dlContent, "image-manifest.json"), JSON.stringify(Object.fromEntries(Object.values(urls).map((url) => [url, { status: "pending", localPath: null }]))));

const dl = await runAsync("download-images.mjs", ["--dir", dlContent, "--public", dlPublic]);
const dlManifest = readJson(join(dlContent, "image-manifest.json"));
check("download exits 0", dl.status === 0, dl.stderr + dl.stdout);
check("image/* 200 is saved and recorded", dlManifest[urls.ok].status === "downloaded" && /^\/blog\/images\/[0-9a-f]{10}-ok\.webp$/.test(dlManifest[urls.ok].localPath) && dlManifest[urls.ok].optimized === true && dlManifest[urls.ok].width === 1 && dlManifest[urls.ok].height === 1 && readdirSync(dlPublic).length === 1);
check("200 HTML (soft 404) is rejected as not an image", dlManifest[urls.html].status === "failed" && dlManifest[urls.html].error.includes("not an image"));
check("HTTP 404 is recorded as failed", dlManifest[urls.gone].status === "failed" && dlManifest[urls.gone].error === "HTTP 404");
const dlAfter = readJson(join(dlContent, "posts/what-it-takes.json"));
check("post body and featured image point at the local copy; failures keep the original URL", dlAfter.body.includes(`src="${dlManifest[urls.ok].localPath}"`) && dlAfter.body.includes(`src="${urls.gone}"`) && dlAfter.featuredImage.src === dlManifest[urls.ok].localPath);
check("local images get width/height so the page does not shift while loading", dlAfter.body.includes(`src="${dlManifest[urls.ok].localPath}" width="1" height="1"`));
check("index summary featured image is re-pointed", readJson(join(dlContent, "index.json")).find((p) => p.slug === "what-it-takes").featuredImage.src === dlManifest[urls.ok].localPath);
const dl2 = await runAsync("download-images.mjs", ["--dir", dlContent, "--public", dlPublic]);
check("second run downloads nothing new", dl2.stdout.includes("0 to download"), dl2.stdout);
const reimport = run("import-squarespace.mjs", [FIXTURE, "--out", dlContent]);
check("re-import keeps already-downloaded image state", reimport.status === 0 && readJson(join(dlContent, "image-manifest.json"))[urls.ok]?.status === "downloaded");
stub.close();

// ------------------------------------------------------------------ 3. audit
section("3. Audit");
const docs = join(work, "docs");
const audit = run("audit.mjs", ["--content", out, "--docs", docs]);
check("audit exits 0", audit.status === 0, audit.stderr);
const md = readFileSync(join(docs, "blog-migration-audit.md"), "utf8");
const csv = readFileSync(join(docs, "blog-migration-audit.csv"), "utf8");
check("counts: 1 clean, 1 needs review (removed embed), 153 missing, 1 extra of 155", audit.stdout.includes("1 migrated, 1 need review, 153 missing, 1 extra (of 155 expected)"), audit.stdout);
check("short body and un-migrated internal link are reported", md.includes("Short or media-only posts") && md.includes("/101-blog/not-migrated-post"));
check("case-differing slug and image states are reported", md.includes("| Still hot-linked from Squarespace (not yet downloaded) | 4 |"));
check("CSV has one row per inventory article plus the extra", csv.trim().split("\n").length === 1 + 155 + 1);
check("original URL maps to new URL for a migrated article", csv.includes("https://www.childactor101.com/101-blog/what-it-takes\",\"https://www.childactor101.com/101-blog/what-it-takes\""));
check("--strict exits 1 when anything is missing", run("audit.mjs", ["--content", out, "--docs", docs, "--strict"]).status === 1);
check("audit without an import report exits 2", run("audit.mjs", ["--content", join(work, "empty"), "--docs", docs]).status === 2);

// ------------------------------------------------------------------ 3b. legacy redirect tooling
section("3b. Legacy redirect generator and read-only checker");
const mappingFile = join(work, "mappings.txt");
const gen = run("generate-legacy-redirects.mjs", ["--content", out, "--out", mappingFile]);
const mappings = readFileSync(mappingFile, "utf8");
check("generator writes one 301 line per article", gen.status === 0 && mappings.includes("/101-blog/what-it-takes -> https://www.childactor101.com/101-blog/what-it-takes 301") && mappings.includes("/101-blog/Actorsaccess -> https://www.childactor101.com/101-blog/Actorsaccess 301"), gen.stderr);
check("blog index maps to the new blog archive, never the homepage", mappings.includes("/101-blog -> https://www.childactor101.com/101-blog 301") && !/-> https:\/\/www\.childactor101\.com\/? 301/.test(mappings));
check("single-article tags go to the blog archive, tags with 2+ articles to their tag page", mappings.includes("/101-blog/tag/Basics -> https://www.childactor101.com/101-blog 301"));
check("category archive maps to the matching new category page", mappings.includes("/101-blog/category/Start%20Here -> https://www.childactor101.com/101-blog/category/start-here 301"));

const legacyStub = http.createServer((req, res) => {
  const slug = decodeURIComponent(req.url.replace("/101-blog/", ""));
  const target = (s) => `https://www.childactor101.com/101-blog/${encodeURIComponent(s)}`;
  if (slug === "what-it-takes") return (res.writeHead(301, { location: target(slug) }), res.end());
  if (slug === "Actorsaccess") return (res.writeHead(302, { location: target(slug) }), res.end());
  if (slug === "brand-new-fixture-post") return (res.writeHead(301, { location: "https://www.childactor101.com/" }), res.end());
  res.writeHead(200);
  res.end("legacy");
});
await new Promise((done) => legacyStub.listen(4320, done));
const checkLegacy = await new Promise((resolve) => {
  const child = spawn("node", [join(ROOT, "scripts/blog/check-legacy-redirects.mjs"), "--legacy", "http://localhost:4320", "--content", out]);
  let stdout = "";
  child.stdout.on("data", (chunk) => (stdout += chunk));
  child.on("close", (status) => resolve({ status, stdout }));
});
check("checker exits 1 when any redirect is wrong", checkLegacy.status === 1);
check("checker classifies each state", checkLegacy.stdout.includes("Checked 3 articles") && checkLegacy.stdout.includes("1 redirected correctly, 0 not yet redirected, 2 wrong") && checkLegacy.stdout.includes("WRONG Actorsaccess: HTTP 302") && checkLegacy.stdout.includes("WRONG brand-new-fixture-post: redirects to https://www.childactor101.com/"), checkLegacy.stdout);
legacyStub.close();

// ------------------------------------------------------------------ 4. native blog on a real build
section("4. Native blog on a production build (synthetic export)");

const backup = join(work, "content-backup");
cpSync(CONTENT, backup, { recursive: true });
const restore = () => {
  rmSync(CONTENT, { recursive: true, force: true });
  cpSync(backup, CONTENT, { recursive: true });
};

function bigExport() {
  const lorem = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ".repeat(4);
  let items = "";
  for (let i = 1; i <= 30; i += 1) {
    const day = `2024-${String(1 + (i % 12)).padStart(2, "0")}-${String(1 + (i % 27)).padStart(2, "0")} 18:00:00`;
    items += `<item><title>Fixture Article ${i}</title><link>https://www.childactor101.com/101-blog/fixture-article-${i}</link><dc:creator>fixture-author</dc:creator><content:encoded><![CDATA[<p>${lorem}</p>]]></content:encoded><wp:post_id>${500 + i}</wp:post_id><wp:post_date>${day}</wp:post_date><wp:post_date_gmt>${day}</wp:post_date_gmt><wp:post_name>fixture-article-${i}</wp:post_name><wp:status>publish</wp:status><wp:post_type>post</wp:post_type><category domain="category" nicename="auditions"><![CDATA[Auditions]]></category><category domain="post_tag" nicename="tag-${i % 4}"><![CDATA[Tag ${i % 4}]]></category></item>`;
  }
  return readFileSync(FIXTURE, "utf8").replace("</channel>", `${items}</channel>`);
}

function build(env) {
  const buildEnv = { ...process.env };
  delete buildEnv.LEGACY_BLOG_ORIGIN;
  return spawnSync("node", [NEXT_BIN, "build"], { cwd: ROOT, env: { ...buildEnv, ...env }, encoding: "utf8" });
}

const get = (path, host) =>
  new Promise((resolve, reject) => {
    const req = http.request(new URL(path, APP), { headers: host ? { host } : {} }, (res) => {
      let body = "";
      res.on("data", (chunk) => (body += chunk));
      res.on("end", () => resolve({ status: res.statusCode, location: res.headers.location ? new URL(res.headers.location, APP).href : "", body }));
    });
    req.on("error", reject);
    req.end();
  });

async function withServer(env, fn) {
  const serverEnv = { ...process.env };
  delete serverEnv.LEGACY_BLOG_ORIGIN;
  const server = spawn("node", [NEXT_BIN, "start", "-p", String(PORT)], { cwd: ROOT, env: { ...serverEnv, ...env }, detached: true, stdio: "ignore" });
  try {
    for (let attempt = 0; ; attempt += 1) {
      try {
        await get("/");
        break;
      } catch {
        if (attempt > 60) throw new Error("server did not start");
        await new Promise((done) => setTimeout(done, 500));
      }
    }
    await fn();
  } finally {
    try {
      process.kill(-server.pid, "SIGTERM");
    } catch {
      /* already gone */
    }
    await new Promise((done) => setTimeout(done, 800));
  }
}

try {
  // The real recovered bodies and SEO overrides must not leak into the synthetic import.
  rmSync(join(CONTENT, "recovered-bodies.json"), { force: true });
  rmSync(join(CONTENT, "seo-overrides.json"), { force: true });
  const bigFile = join(work, "big-export.xml");
  writeFileSync(bigFile, bigExport());
  const seeded = run("import-squarespace.mjs", [bigFile]);
  check("synthetic export imported into src/content/blog", seeded.status === 0 && readJson(join(CONTENT, "index.json")).length === 33, seeded.stderr);

  const plain = build({});
  check("production build succeeds with posts present", plain.status === 0, plain.stdout.slice(-600) + plain.stderr.slice(-400));

  if (plain.status === 0) {
    await withServer({}, async () => {
      const expectStatus = async (path, status, location) => {
        const res = await get(path);
        check(`${path} -> ${status}${location ? ` ${location}` : ""}`, res.status === status && (location === undefined || res.location === `${APP}${location}`), `${res.status} ${res.location}`);
        return res;
      };

      await expectStatus("/101-blog", 200);
      await expectStatus("/101-blog/page/2", 200);
      await expectStatus("/101-blog/page/3", 200);
      await expectStatus("/101-blog/page/1", 308, "/101-blog");
      await expectStatus("/101-blog/page/9", 404);
      await expectStatus("/101-blog/category/auditions", 200);
      await expectStatus("/101-blog/category/nope", 404);
      await expectStatus("/101-blog/tag/tag-1", 200);
      await expectStatus("/101-blog/no-such-article", 404);
      await expectStatus("/101-blog/WHAT-IT-TAKES", 308, "/101-blog/what-it-takes");
      await expectStatus("/101-blog/actorsaccess", 308, "/101-blog/Actorsaccess");
      await expectStatus("/101-blog?format=rss", 308, "/101-blog/feed.xml?format=rss");

      const article = await expectStatus("/101-blog/what-it-takes", 200);
      check("migrated article that had a classroom redirect now serves 200, not a redirect", article.status === 200);
      check("canonical points at the primary domain", article.body.includes('<link rel="canonical" href="https://www.childactor101.com/101-blog/what-it-takes"'));
      check("title and description come from the post", article.body.includes("<title>Fixture: What It Takes | Child Actor 101</title>") && article.body.includes('content="A fixture excerpt."'));
      check("Open Graph article metadata present", article.body.includes('property="article:published_time"') && article.body.includes('property="article:author" content="Fixture Author"'));
      const ld = article.body.match(/<script type="application\/ld\+json">([^<]*)<\/script>/);
      const graph = ld ? JSON.parse(ld[1]) : [];
      const posting = graph.find((node) => node["@type"] === "BlogPosting");
      check("BlogPosting JSON-LD: headline, dates, author, publisher, canonical URL", posting?.headline === "Fixture: What It Takes" && posting.datePublished === "2023-03-02T17:00:00.000Z" && posting.author.name === "Fixture Author" && posting.publisher.name === "Child Actor 101" && posting.mainEntityOfPage["@id"] === "https://www.childactor101.com/101-blog/what-it-takes");
      check("BreadcrumbList JSON-LD present", graph.some((node) => node["@type"] === "BreadcrumbList"));
      check("article body renders (heading, caption, internal link)", article.body.includes("Heading one becomes h2") && article.body.includes("A caption goes here") && article.body.includes('href="/101-blog/Actorsaccess"'));
      check("no unsanitised script in the article", !article.body.includes("alert('x')"));
      check("article links back to the classroom as a separate resource", article.body.includes('href="/from-the-classroom"'));

      const archive = await get("/101-blog");
      check("archive canonical, search box and pagination present", archive.body.includes('rel="canonical" href="https://www.childactor101.com/101-blog"') && archive.body.includes('id="blog-search"') && archive.body.includes('aria-label="Blog pages"'));
      const page2 = await get("/101-blog/page/2");
      check("page 2 has its own canonical", page2.body.includes('href="https://www.childactor101.com/101-blog/page/2"'));

      const search = await get("/101-blog/search-index.json");
      check("search index lists every post", Array.isArray(JSON.parse(search.body)) && JSON.parse(search.body).length === 33);
      const feed = await get("/101-blog/feed.xml");
      check("RSS feed is XML with absolute primary-domain links", feed.body.startsWith("<?xml") && feed.body.includes("<link>https://www.childactor101.com/101-blog/what-it-takes</link>"));

      const sitemap = await get("/sitemap.xml");
      const locs = [...sitemap.body.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
      check("sitemap lists the archive, page 2, categories, tags and every article at its original URL", locs.includes("https://www.childactor101.com/101-blog") && locs.includes("https://www.childactor101.com/101-blog/page/2") && locs.includes("https://www.childactor101.com/101-blog/category/auditions") && locs.includes("https://www.childactor101.com/101-blog/tag/tag-1") && locs.includes("https://www.childactor101.com/101-blog/Actorsaccess") && locs.filter((loc) => /\/101-blog\/(fixture-article|what-it-takes|Actorsaccess|brand-new)/.test(loc)).length === 33);
      check("sitemap still lists the classroom", locs.includes("https://www.childactor101.com/from-the-classroom"));

      const blogUrls = locs.filter((loc) => loc.includes("/101-blog"));
      const notOk = [];
      for (const loc of blogUrls) {
        const res = await get(new URL(loc).pathname);
        if (res.status !== 200) notOk.push(`${loc} ${res.status}`);
      }
      check(`all ${blogUrls.length} blog URLs in the sitemap return 200 directly (no redirects, no loops)`, notOk.length === 0, notOk.slice(0, 5).join("; "));

      const home = await get("/");
      check("primary navigation links to 101 Blog and From the Classroom, described differently", home.body.includes('href="/101-blog"') && home.body.includes('href="/from-the-classroom"') && home.body.includes("Original articles, industry commentary") && home.body.includes("The newer, organized lesson library"));

      await expectStatus("/from-the-classroom", 200);
      await expectStatus("/from-the-classroom/start-here", 200);
      await expectStatus("/start-here", 200);
      await expectStatus("/courses", 200);
      await expectStatus("/self-tape-equipment-for-child-actors", 404);
      // Classroom redirects for articles NOT yet migrated stay in place.
      await expectStatus("/101-blog/self-tape-equipment-for-child-actors", 308, "/from-the-classroom/auditions/self-tape-equipment-for-child-actors");
      await expectStatus("/101-blog/the-critical-conversation", 404);
    });
  }

  const gated = build({ LEGACY_BLOG_ORIGIN: LEGACY });
  check("production build succeeds with LEGACY_BLOG_ORIGIN set", gated.status === 0, gated.stdout.slice(-400) + gated.stderr.slice(-400));
  if (gated.status === 0) {
    await withServer({ LEGACY_BLOG_ORIGIN: LEGACY }, async () => {
      const cases = [
        ["migrated article is never forwarded to the legacy host", "/101-blog/what-it-takes", 200, ""],
        ["migrated mixed-case article is never forwarded", "/101-blog/Actorsaccess", 200, ""],
        ["archive is native", "/101-blog", 200, ""],
        ["unmigrated inventory article falls back to legacy (temporary)", "/101-blog/the-critical-conversation", 307, `${LEGACY}/101-blog/the-critical-conversation`],
        ["inventory slug with spaces falls back with its encoding intact", "/101-blog/Demo%20Reel%20Options", 307, `${LEGACY}/101-blog/Demo%20Reel%20Options`],
        ["unmigrated article with a classroom lesson still goes to the lesson", "/101-blog/self-tape-equipment-for-child-actors", 308, `${APP}/from-the-classroom/auditions/self-tape-equipment-for-child-actors`],
        ["preserved legacy page still forwarded", "/freeguides", 307, `${LEGACY}/freeguides`],
      ];
      for (const [label, path, status, location] of cases) {
        const res = await get(path);
        check(label, res.status === status && res.location === location, `${res.status} ${res.location}`);
      }
      const guarded = await get("/101-blog/the-critical-conversation", "legacy.childactor101.com");
      check("loop guard: legacy host is never forwarded again", guarded.status !== 307 && guarded.status !== 308, `${guarded.status} ${guarded.location}`);
    });
  }
} finally {
  restore();
  const restored = readJson(join(CONTENT, "index.json")).length;
  console.log(`\n(src/content/blog restored: ${restored} posts)`);
  rmSync(work, { recursive: true, force: true });
}

console.log(`\n${passes} passed, ${failures} failed.`);
process.exit(failures ? 1 : 0);
