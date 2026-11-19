# 101 Blog migration runbook (Squarespace to native Next.js)

**Status: infrastructure built and tested on synthetic data. No real articles are imported yet, and nothing has been deployed.** The Squarespace site, its indexing settings, DNS and content are never touched by anything here; the importer only reads a file.

Why a native blog and not a proxy: the old articles must live at their original `https://www.childactor101.com/101-blog/<slug>` URLs with a canonical tag on the primary domain. Proxying Squarespace would return its own canonical tags and links and create a second, competing copy of the blog.

## 1. The export file we need

**Format: the official Squarespace export, a WordPress-format XML file (WXR 1.2), `.xml`.** It is the only official export that carries full post bodies with titles, authors, dates, slugs, categories and tags.

How to get it (Squarespace 7.1; menu names can differ slightly by version, so confirm in the Squarespace help if a label is missing):

1. Squarespace: **Settings → Developer Tools → Import/Export → Export** (older UI: Settings → Advanced → Import/Export).
2. Choose the **WordPress** option and download the file. Exporting only reads the site.
3. If Squarespace gives several files (large sites are sometimes split), keep them all.
4. Put the file(s) in `scripts/blog/exports/` (git-ignored: a raw export can include drafts and unpublished pages). Do not commit them.

What the export contains and what it does not:

| In the export | Not in the export |
|---|---|
| Title, URL slug, body HTML, author, publish date, categories, tags, excerpt, status | **SEO title and SEO description overrides** (meta descriptions here come from the excerpt, or the first ~160 characters of the body) |
| Image URLs used in bodies, uploaded attachment URLs, featured/thumbnail images that were uploaded as attachments | The image files themselves (they are downloaded in step 3) |
| Embedded video as `<iframe>` where Squarespace exports it | Comments, analytics, URL redirects set inside Squarespace, scheduled/unpublished posts are skipped |

If the 155 article count is not reached, the audit lists exactly which inventory slugs are missing so they can be chased individually (usually a second blog collection, or a post type the export omitted).

## 2. Import

```bash
npm run blog:import -- scripts/blog/exports/<file>.xml     # or a folder of .xml files
```

This writes `src/content/blog/` (`index.json`, `posts/<slug>.json`, `image-manifest.json`, `import-report.json`). It is safe to re-run. Add `--dry-run` to see counts first.

- Bodies are sanitised once, at import time, with an allow-list (no scripts, no unknown iframes; YouTube, Vimeo, Spotify and SoundCloud embeds are kept). Headings are `<h2>` or lower because the page title is the `<h1>`.
- Links to `childactor101.com` / `legacy.childactor101.com` become relative primary-domain paths.
- Author names are exactly what the export contains (often a Squarespace username). To show a display name instead, add `{"username": "Display Name"}` to `scripts/blog/author-map.json` and re-import.
- Dates keep the site-local calendar day, so a late-evening post is not shifted by UTC.

## 3. Copy the images locally

```bash
npm run blog:images
```

Downloads each image listed in the export into `public/blog/images/` and re-points the posts at the local copies. Images that fail keep their original Squarespace URL (still visible, but only while Squarespace hosts them) and are listed. Re-run with `-- --retry-failed`. This needs outbound access to `images.squarespace-cdn.com` and `static1.squarespace.com`, which is blocked in the Claude cloud session, so run it on your machine or in an environment that allows those hosts, then commit the images (expect a few hundred MB at most; check size before committing).

## 4. Audit

```bash
npm run blog:audit            # add -- --strict to fail on anything missing
```

Writes `docs/seo/blog-migration-audit.md` and `.csv`: totals, missing and incomplete articles, image status, original URL versus new URL for every article, and SEO issues.

## 5. What changes automatically once posts exist

All of this is driven by `src/content/blog/index.json`; there is no flag to flip.

- `/101-blog` is the native archive (12 per page, `/101-blog/page/N`, search, category chips). The `/101-blog` → `/from-the-classroom` redirect disappears.
- Every migrated article serves HTTP 200 at its original URL, including the 20 that used to redirect to classroom lessons. Their redirects are removed **per article**: an article missing from the export keeps its lesson redirect until it is migrated.
- Category and tag pages (`/101-blog/category/<slug>`, `/101-blog/tag/<slug>`), the RSS feed (`/101-blog/feed.xml`, and Squarespace's `?format=rss` forwards to it), and sitemap entries for all of the above.
- Slug case variants (`/101-blog/actorsaccess` vs `/101-blog/Actorsaccess`) 308 to the exported spelling, because Squarespace matched slugs case-insensitively and Next.js does not.
- The "101 Blog" nav and footer links appear, with descriptions that distinguish it from "From the Classroom".
- The blanket `/101-blog/:path+` legacy fallback is replaced by exact per-slug fallbacks for inventory articles that are still missing (only if `LEGACY_BLOG_ORIGIN` is set), so a native URL can never be forwarded to Squarespace.
- Classroom lessons and `/from-the-classroom` are untouched.

## 6. Verification

```bash
npm run test:blog        # importer, downloader, audit, and a full build with synthetic posts (restores src/content/blog afterwards)
npm run test:redirects   # pre-migration redirect suite (skips its pre-migration build sections once posts are imported)
npm run lint
```

## 7. Before production

Nothing below is done and each needs explicit approval:

1. Review the audit and spot-check ~10 articles against the live legacy pages (body, images, dates, authors).
2. Compare a sample of `<title>` / meta descriptions with Squarespace's (SEO overrides are not exported).
3. After deploy, submit the sitemap in Search Console and watch Pages/Coverage for 404 spikes.
4. Only then consider hiding the legacy copies from search (`noindex` or canonical on the Squarespace side, which is a change to the legacy site and needs its own approval) and, much later, retiring `legacy.childactor101.com`. Do not retire it until every image shows as downloaded in the audit.
