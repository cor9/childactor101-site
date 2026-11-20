# Blog internal-link repair

> **Status update (after review).** Approved and applied: `/classes`, `/headshot-guide`, `/home/ingenuityactorsstudio`, and the book card (verified Amazon product page). `/ask101`, `/self-tape-feedback` and `/selftapereview` are preserved through the legacy site for now (`/selftapereview` forwards to the legacy `/self-tape-feedback` page). The merchandise links stay unresolved and are tracked in `blog-link-cleanup-backlog.md` for a separate cleanup after deployment. The decision table below is the original analysis.

Every internal link in every article is requested against a production build by `node scripts/blog/check-links.mjs` (results in `blog-link-check.csv`). The original pages were also read on the live legacy site (read-only) to establish what each one was for.

## Applied

| Link | Now points to | Basis |
|---|---|---|
| `/classes` (**16 links, 13 articles; your approval**) | `/training` | Verified before applying. On the live site `/classes` was a 301 redirect straight to `https://101training.childactor101.com`, the class site. `/training` has a "Structured class training / Explore Classes" card that links to that same site, so it represents the original destination accurately, as a gateway with one extra click. If you prefer the one-click behaviour, replace the value in `scripts/blog/link-map.json` with `https://101training.childactor101.com` and re-import. One link displayed the old URL as visible text; that text is updated too. |
| `/home` | `/` | Squarespace's home page. |
| `/blog/time-to-re-think-…` | `/101-blog/time-to-re-think-…` | Old form of an article that exists at that slug. |
| `/contact` (newsletter link) | `/from-the-classroom#newsletter` | Anchor text is a newsletter signup; the section exists. |
| `/talent-rep-open-call` (4 links) | `https://pages.childactor101.com/opencall` | Family submission calls to action; the site defines this as `OPEN_CALL_URL`. |

## Decision table: the remaining 10 paths (22 links in 9 articles)

**Nothing below has been changed.** Proposals are staged in `scripts/blog/link-map.pending.json`, which the importer ignores. To approve one, say so and I move it into `link-map.json` and re-import.

"Live today" is the HTTP status of the path on the legacy site. **Seven of the ten were already dead (404) in the original articles**, so they are not regressions from the migration. The two that work today are marked.

| # | Original URL (links / articles) | Live today | Original purpose | Recommended destination | Destination exists? | Confidence |
|---|---|---|---|---|---|---|
| 1 | `/ask101` (5 / 1) | **200, works** | Free AI chatbot for parents: Q&A on agents vs managers, self-tape feedback, resumes, classes and set etiquette. The chat widget was embedded on the page, and its address is not in the page source. | None can be recommended. The new site has no Ask101 page or app. I need the chatbot's URL or embed code (then either link to it or build `/ask101`). The `chat.openai.com` links elsewhere in the blog are different tools (Acting Insight, Scenetist). | No | n/a: not enough to recommend |
| 2 | `/self-tape-feedback` (3 / 2) | **200, works** | A **$22 paid service**: Stripe payment plus an intake form; written notes on a self-tape (the page says 8- and 12-hour turnarounds). | Needs a page with the order flow. The new site promotes "Get Self Tape Feedback" in five places, all pointing at `/ecosystem#self-tape-feedback`, but that anchor does not exist and there is no order flow. The old page had two Stripe links (`…3sh0tQ2wU3A`, `…G7IxdgC2wU3k`); I cannot tell which is current. Please choose the order link or approve building the section. | `/ecosystem` exists; the anchor and the order flow do not | Medium that it is still offered; low on which link |
| 3 | `/selftapereview` (3 / 1) | 404 | Announcement for "Self Tape Review", a personalized audition-feedback service. It is the same service as #2 under an earlier name. | Same destination as #2. | As #2 | High that it is the same service |
| 4 | `/headshot-guide` (1 / 1) | 404 | A passing mention ("headshots") in the 11,000-members post. | `/from-the-classroom/professional-materials/when-to-update-child-actor-headshots`. This is where the new site's own "Headshot Guide" free guide (Start Here) already points. | **Yes** (200) | **High** |
| 5 | `/store-1` (1 / 1) | 404 | Squarespace merchandise store index ("Actor Shirts"). | No equivalent on the site. The only merchandise shop the blog links to is TeePublic (`teepublic.com/user/wearablepsa`), a stage-parent series, so it may not be the same shirts. Recommend removing the link and keeping the text. | n/a | Low |
| 6 | `/store-1/p/uta-hagen-…` (1 / 1) | 404 | Product page for an acting-theory T-shirt. The sibling link in the same sentence ("Sanford Meisner's") already goes to a TeePublic product. | The TeePublic product URL, if it exists. I will not guess product IDs. Otherwise remove the link. | Unknown | Low |
| 7 | `/store-1/p/stella-adler-…` (1 / 1) | 404 | Same as #6. | Same as #6. | Unknown | Low |
| 8 | `/store-1/p/17o7cec3…` (3 / 1) "Youth Actor Evaluation" | 404 | Product page for a private talent evaluation (shown as a "Sale" card). | No confirmed current offer. A May 2024 article links "private Talent Evaluation" to a Stripe link (`pay.childactor101.com/b/00gaGlbyb3QB4a4g0c`), which looks like a dated promotion. I would not reuse it without your confirmation. Otherwise remove the card links. | Unknown | Low |
| 9 | `/store-1/p/6l3f9vgt…` (3 / 1) "The Best Advice for Child Actors Book" | 404 | Product page for Corey's book. | The Amazon author page already used in the "101 Tips" article that announces this same book: `https://www.amazon.com/Corey-Ralston/e/B094XZGD1S`. | URL is in existing content; cannot be checked from here | Medium-high |
| 10 | `/home/ingenuityactorsstudio` (1 / 1) | 404 | Image link on a promo block labelled "Online Acting Classes". | `/training` (same as `/classes`). | **Yes** (200) | Medium-high |

### What I can recommend applying now
Four are ready on your OK: **#4** (high), **#10** and **#9** (medium-high), and **#3** once #2 is decided. The rest need information only you have: Ask101's address (#1), the order link or page for the feedback service (#2), the current shirt, evaluation and book URLs (#5 to #8).

### Not verifiable from here
Outbound access to the site's other hosts (`101training.`, `coaching.`, `pages.childactor101.com`, Amazon, Stripe) is blocked in this environment. "Exists" for those means the address is in the site's own configuration or live content, not that I fetched it. Please click the three or four external destinations once before deploying.

## If a path stays unresolved
None of these are redirected to the homepage. **At launch, nothing that worked before breaks:** eight of the ten were already 404 in the original articles, and the two that worked (`/ask101`, `/self-tape-feedback`) are on the preserved-pages list. Production has `LEGACY_BLOG_ORIGIN` set (checked in Vercel; value hidden), so those two forward to the legacy site and keep working for as long as the legacy site exists. My local checks show them as 404 only because they run without that variable. That forwarding is a stopgap, not a fix, and it ends when the legacy site is retired.

## Other
- `notion://www.notion.so/www.childrescuecoalition.org` (TikTok article) was malformed in the original; the text is kept and the dead link dropped.
- External links (408 across 85 hosts) are counted, not requested; affiliate and payment links are left as published.
