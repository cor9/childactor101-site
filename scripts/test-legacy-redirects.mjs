#!/usr/bin/env node
/**
 * End-to-end tests for the legacy redirects. Run with: npm run test:redirects
 *
 * 1. Static checks on the preserved page list.
 * 2. The readiness script (scripts/check-legacy-blog-origin.mjs) against local stub servers.
 * 3. A production build with LEGACY_BLOG_ORIGIN unset: the gate must keep everything off.
 * 4. A production build with it set: precedence, query strings, nested paths, loop guard,
 *    and a hop-by-hop walk of all 155 legacy blog URLs plus the 14 preserved URLs.
 * 5. Invalid LEGACY_BLOG_ORIGIN values must fail the build.
 *
 * Local only: it builds into .next, starts servers on localhost, and touches nothing else.
 */
import { spawn, spawnSync } from "node:child_process";
import { readdirSync, readFileSync } from "node:fs";
import http from "node:http";
import { fileURLToPath } from "node:url";

const ROOT = fileURLToPath(new URL("..", import.meta.url));
const LEGACY = "https://legacy.childactor101.com";
const APP_PORT = 3127;
const APP = `http://localhost:${APP_PORT}`;
const NEXT_BIN = `${ROOT}node_modules/next/dist/bin/next`;

const pages = JSON.parse(readFileSync(`${ROOT}src/content/legacy-preserved-pages.json`, "utf8"));
const csvRows = readFileSync(`${ROOT}docs/seo/legacy-blog-migration-map.csv`, "utf8")
  .split("\n")
  .slice(1)
  .filter((line) => line.startsWith("https://"))
  .map((line) => ({
    path: new URL(line.split(",")[0]).pathname,
    redirectedToLesson: line.includes(",A. Redirected"),
  }));

let failures = 0;
let passes = 0;

function check(label, ok, detail = "") {
  if (ok) {
    passes += 1;
  } else {
    failures += 1;
  }

  console.log(`${ok ? "PASS" : "FAIL"}  ${label}${ok || !detail ? "" : `\n      ${detail}`}`);
}

function section(title) {
  console.log(`\n== ${title} ==`);
}

function request(base, path, { host } = {}) {
  return new Promise((resolve, reject) => {
    const url = new URL(encodeURI(decodeURI(path)), base);
    const req = http.request(url, { method: "GET", headers: host ? { host } : {} }, (res) => {
      res.resume();
      res.on("end", () => resolve({ status: res.statusCode, location: res.headers.location ? new URL(res.headers.location, url).href : "" }));
    });
    req.on("error", reject);
    req.end();
  });
}

function build(env) {
  const buildEnv = { ...process.env };
  delete buildEnv.LEGACY_BLOG_ORIGIN;
  Object.assign(buildEnv, env);
  return spawnSync("node", [NEXT_BIN, "build"], { cwd: ROOT, env: buildEnv, encoding: "utf8" });
}

async function withServer(env, run) {
  const serverEnv = { ...process.env };
  delete serverEnv.LEGACY_BLOG_ORIGIN;
  Object.assign(serverEnv, env);

  const server = spawn("node", [NEXT_BIN, "start", "-p", String(APP_PORT)], {
    cwd: ROOT,
    env: serverEnv,
    detached: true,
    stdio: "ignore",
  });

  try {
    for (let attempt = 0; attempt < 60; attempt += 1) {
      try {
        await request(APP, "/");
        break;
      } catch {
        await new Promise((done) => setTimeout(done, 500));
      }

      if (attempt === 59) {
        throw new Error("next start did not become ready");
      }
    }

    await run();
  } finally {
    try {
      process.kill(-server.pid, "SIGTERM");
    } catch {
      // already gone
    }
    await new Promise((done) => setTimeout(done, 500));
  }
}

// ---------------------------------------------------------------- 1. static data
section("1. Preserved page list");

const appRoutes = new Set(readdirSync(`${ROOT}src/app`, { withFileTypes: true }).filter((e) => e.isDirectory()).map((e) => e.name));
const paths = pages.map((page) => page.path);

check("14 entries: 12 pages and 2 PDFs", pages.length === 14 && pages.filter((p) => p.kind === "page").length === 12 && pages.filter((p) => p.kind === "pdf").length === 2);
check("paths are unique (case-insensitive)", new Set(paths.map((p) => p.toLowerCase())).size === paths.length);
check("paths start with / and none is under /101-blog", paths.every((p) => p.startsWith("/") && !p.startsWith("/101-blog")));
check("PDF entries end in .pdf and pages do not", pages.every((p) => (p.kind === "pdf") === p.path.toLowerCase().endsWith(".pdf")));
check(
  "no path collides with a route in src/app",
  paths.every((p) => !appRoutes.has(p.split("/")[1])),
  paths.filter((p) => appRoutes.has(p.split("/")[1])).join(", "),
);
check(
  "eventualDestination is null, a site path, or an https URL",
  pages.every((p) => p.eventualDestination === null || p.eventualDestination.startsWith("/") || p.eventualDestination.startsWith("https://")),
);
check("every entry has a review note", pages.every((p) => typeof p.reviewNote === "string" && p.reviewNote.length > 20));
check("migration map covers 155 blog URLs", csvRows.length === 155, `got ${csvRows.length}`);

// ---------------------------------------------------------------- 2. readiness script
section("2. Readiness script against stub servers");

const pdfBody = `%PDF-1.4\n${"x".repeat(400)}`;
const isPdfPath = (url) => url.toLowerCase().endsWith(".pdf");
const stubs = [];

function stub(port, handler) {
  const server = http.createServer(handler);
  stubs.push(server);
  return new Promise((done) => server.listen(port, done));
}

const sendPdf = (res) => {
  res.writeHead(200, { "content-type": "application/pdf" });
  res.end(pdfBody);
};
const sendPage = (res) => {
  res.writeHead(200, { "content-type": "text/html" });
  res.end("<html>ok</html>");
};
const redirect = (res, to, status = 302) => {
  res.writeHead(status, { location: to });
  res.end();
};

await stub(4201, (req, res) => (isPdfPath(req.url) ? sendPdf(res) : sendPage(res)));
await stub(4202, (req, res) => redirect(res, `https://www.childactor101.com${req.url}`, 301));
await stub(4203, (req, res) => (isPdfPath(req.url) ? redirect(res, "http://localhost:4204/static/file.pdf") : sendPage(res)));
await stub(4204, (req, res) => sendPdf(res));
await stub(4205, (req, res) => (isPdfPath(req.url) ? (res.writeHead(200, { "content-type": "text/html" }), res.end("<html>Not found</html>")) : sendPage(res)));
await stub(4206, (req, res) => {
  if (req.url === "/freeguides") return redirect(res, "/freeguides-x");
  if (req.url === "/freeguides-x") return redirect(res, "/freeguides");
  return isPdfPath(req.url) ? sendPdf(res) : sendPage(res);
});
await stub(4207, (req, res) => {
  if (req.url === "/s/7tips.pdf") {
    res.writeHead(404);
    return res.end();
  }
  return isPdfPath(req.url) ? sendPdf(res) : sendPage(res);
});
await stub(4208, (req, res) => (isPdfPath(req.url) ? redirect(res, `https://childactor101.com${req.url}`) : sendPage(res)));
await stub(4209, (req, res) => {
  if (req.url === "/101-blog/charisma") return redirect(res, "/101-blog/Charisma", 301);
  if (req.url === "/101-blog/Charisma") return sendPage(res);
  return isPdfPath(req.url) ? sendPdf(res) : sendPage(res);
});

function runReadiness(args) {
  return new Promise((resolve) => {
    const child = spawn("node", [`${ROOT}scripts/check-legacy-blog-origin.mjs`, ...args], { encoding: "utf8" });
    let output = "";
    child.stdout.on("data", (chunk) => (output += chunk));
    child.stderr.on("data", (chunk) => (output += chunk));
    child.on("close", (code) => resolve({ code, output }));
  });
}

// Mirrors the readiness script's default sample: the index, 12 evenly spaced unmigrated blog URLs, and all 14 preserved URLs.
const unmigratedCount = csvRows.filter((row) => !row.redirectedToLesson).length;
const sampleCount = Math.ceil(unmigratedCount / Math.ceil(unmigratedCount / 12));
const defaultTotal = 1 + sampleCount + pages.length;

const healthy = await runReadiness(["http://localhost:4201"]);
check("healthy origin passes and checks all 14 preserved URLs", healthy.code === 0 && healthy.output.includes("14 preserved pages and PDFs") && (healthy.output.match(/^ok +(page|pdf)\b/gm) ?? []).length === 14, healthy.output.slice(-300));

const allBlog = await runReadiness(["http://localhost:4201", "--all"]);
check("--all checks every unmigrated blog URL", allBlog.code === 0 && allBlog.output.includes(`${csvRows.filter((r) => !r.redirectedToLesson).length + 1} blog`), allBlog.output.slice(-300));

const bounce = await runReadiness(["http://localhost:4202"]);
check("origin that redirects to www fails every URL with 'main domain'", bounce.code === 1 && !/^ok /m.test(bounce.output) && bounce.output.includes("redirects to main domain") && bounce.output.includes(`${defaultTotal} failed`), bounce.output.slice(-300));

const cdn = await runReadiness(["http://localhost:4203"]);
check("PDF that redirects to a CDN host and serves real bytes passes", cdn.code === 0 && cdn.output.includes("200 PDF") && cdn.output.includes("via 1 redirect to localhost"), cdn.output.slice(-400));

const soft = await runReadiness(["http://localhost:4205"]);
check("PDF path that returns 200 HTML fails as 'not a PDF'", soft.code === 1 && soft.output.includes("200 but not a PDF") && soft.output.includes("2 failed"), soft.output.slice(-300));

const loop = await runReadiness(["http://localhost:4206"]);
check("redirect loop on a page fails", loop.code === 1 && loop.output.includes("redirect loop"), loop.output.slice(-300));

const missing = await runReadiness(["http://localhost:4207"]);
check("PDF returning 404 fails", missing.code === 1 && missing.output.includes("HTTP 404 at http://localhost:4207/s/7tips.pdf"), missing.output.slice(-300));

const pdfBounce = await runReadiness(["http://localhost:4208"]);
check("PDF that redirects back to the main domain fails", pdfBounce.code === 1 && pdfBounce.output.includes("redirects to main domain") && pdfBounce.output.includes("2 failed"), pdfBounce.output.slice(-300));

const withinHost = await runReadiness(["http://localhost:4209", "--all"]);
check("blog URL that redirects within the legacy host passes", withinHost.code === 0 && withinHost.output.includes("/101-blog/charisma  200 after 1 redirect"), withinHost.output.slice(-300));

const refuse = await runReadiness(["https://www.childactor101.com"]);
check("refuses to check the main domain", refuse.code === 2 && refuse.output.includes("must differ from the main site"), refuse.output);

await Promise.all(stubs.map((server) => new Promise((done) => server.close(done))));

// ---------------------------------------------------------------- 3. gate off
section("3. Production build, LEGACY_BLOG_ORIGIN unset");

const offBuild = build({});
check("build succeeds", offBuild.status === 0, offBuild.stderr.slice(-400));

if (offBuild.status === 0) {
  await withServer({}, async () => {
    for (const { path } of pages) {
      const { status } = await request(APP, path);
      check(`gate off: ${path} is not redirected (404)`, status === 404, `got ${status}`);
    }

    const exact = await request(APP, "/101-blog/Actorsaccess");
    check("gate off: exact blog redirect still works", exact.status === 308 && exact.location === `${APP}/from-the-classroom/professional-materials/actors-access-for-parents-of-child-actors`, `${exact.status} ${exact.location}`);

    const unmigrated = await request(APP, "/101-blog/the-critical-conversation");
    check("gate off: unmigrated blog URL stays 404", unmigrated.status === 404, `got ${unmigrated.status}`);

    const index = await request(APP, "/101-blog?offset=1");
    check("gate off: /101-blog index redirect keeps its query", index.status === 308 && index.location === `${APP}/from-the-classroom?offset=1`, `${index.status} ${index.location}`);
  });
}

// ---------------------------------------------------------------- 4. gate on
section("4. Production build, LEGACY_BLOG_ORIGIN set");

const onBuild = build({ LEGACY_BLOG_ORIGIN: LEGACY });
check("build succeeds", onBuild.status === 0, onBuild.stderr.slice(-400));

if (onBuild.status === 0) {
  await withServer({ LEGACY_BLOG_ORIGIN: LEGACY }, async () => {
    for (const { path } of pages) {
      const { status, location } = await request(APP, path);
      check(`${path} -> legacy, temporary (307)`, status === 307 && location === `${LEGACY}${path}`, `${status} ${location}`);
    }

    const cases = [
      ["PDF keeps a query string", "/s/7tips.pdf?download=1", 307, `${LEGACY}/s/7tips.pdf?download=1`],
      ["page path is case-insensitive", "/FreeGuides", 307, `${LEGACY}/freeguides`],
      ["page keeps query strings", "/parent-courses?utm_source=email&x=1", 307, `${LEGACY}/parent-courses?utm_source=email&x=1`],
      ["exact blog redirect beats the fallback", "/101-blog/Actorsaccess", 308, `${APP}/from-the-classroom/professional-materials/actors-access-for-parents-of-child-actors`],
      ["exact blog redirect keeps its query", "/101-blog/what-it-takes?utm_source=news&x=1", 308, `${APP}/from-the-classroom/start-here/what-it-takes-to-be-a-successful-child-actor?utm_source=news&x=1`],
      ["blog index still goes to the classroom", "/101-blog", 308, `${APP}/from-the-classroom`],
      ["unmigrated blog URL -> legacy", "/101-blog/the-critical-conversation", 307, `${LEGACY}/101-blog/the-critical-conversation`],
      ["held headshot article -> legacy", "/101-blog/getting-multifaceted-shots-from-a-3-look-headshot-session", 307, `${LEGACY}/101-blog/getting-multifaceted-shots-from-a-3-look-headshot-session`],
      ["nested blog path -> legacy", "/101-blog/category/Auditions", 307, `${LEGACY}/101-blog/category/Auditions`],
      ["deep nested blog path with query -> legacy", "/101-blog/tag/self-tape/page/2?format=rss", 307, `${LEGACY}/101-blog/tag/self-tape/page/2?format=rss`],
      ["encoded space survives", "/101-blog/Demo%20Reel%20Options", 307, `${LEGACY}/101-blog/Demo%20Reel%20Options`],
      ["blog trailing slash is normalised before forwarding", "/101-blog/the-critical-conversation/", 308, `${APP}/101-blog/the-critical-conversation`],
      ["new site pages are untouched", "/from-the-classroom", 200, ""],
      ["new site /courses is untouched", "/courses", 200, ""],
    ];

    for (const [label, path, status, location] of cases) {
      const got = await request(APP, path);
      check(label, got.status === status && got.location === location, `${got.status} ${got.location}`);
    }

    // Loop guard: the same request arriving on the legacy host must never be forwarded again.
    for (const path of ["/parent-courses", "/s/7tips.pdf", "/101-blog/the-critical-conversation"]) {
      const guarded = await request(APP, path, { host: "legacy.childactor101.com" });
      check(`loop guard: ${path} on the legacy host is not forwarded`, guarded.status !== 307 && guarded.status !== 308, `${guarded.status} ${guarded.location}`);
    }

    // Follow every legacy blog URL and every preserved URL hop by hop.
    const walkTargets = [
      ...csvRows.map((row) => ({ path: row.path, expect: row.redirectedToLesson ? "app" : "legacy-same-path" })),
      ...pages.map((page) => ({ path: page.path, expect: "legacy-same-path" })),
    ];
    const problems = [];

    for (const { path, expect } of walkTargets) {
      let next = path;
      const seen = new Set();
      let outcome = "too many hops";

      for (let hop = 0; hop < 4; hop += 1) {
        const target = next.startsWith("http") ? next : `${APP}${next}`;

        if (seen.has(target)) {
          outcome = "LOOP";
          break;
        }
        seen.add(target);

        const { status, location } = await request(APP, target.replace(APP, ""));

        if (status === 200) {
          outcome = "app";
          break;
        }

        if (status !== 307 && status !== 308) {
          outcome = `HTTP ${status}`;
          break;
        }

        if (!location.startsWith(APP)) {
          outcome = location === `${LEGACY}${path}` ? "legacy-same-path" : `unexpected ${location}`;
          break;
        }

        next = location;
      }

      if (outcome !== expect) {
        problems.push(`${path}: ${outcome} (wanted ${expect})`);
      }
    }

    check(`walked ${walkTargets.length} URLs hop by hop: no loops, 404s, or wrong targets`, problems.length === 0, problems.slice(0, 5).join("\n      "));
  });
}

// ---------------------------------------------------------------- 5. bad values
section("5. Invalid LEGACY_BLOG_ORIGIN values fail the build");

for (const value of ["https://www.childactor101.com", "https://childactor101.com", "http://legacy.childactor101.com", "legacy.childactor101.com", "https://legacy.childactor101.com/101-blog"]) {
  const result = build({ LEGACY_BLOG_ORIGIN: value });
  check(`rejected: ${value}`, result.status !== 0 && /LEGACY_BLOG_ORIGIN/.test(result.stdout + result.stderr), `exit ${result.status}`);
}

console.log(`\n${passes} passed, ${failures} failed.`);
process.exit(failures === 0 ? 0 : 1);
