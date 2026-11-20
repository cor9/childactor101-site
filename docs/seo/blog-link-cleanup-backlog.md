# Blog link cleanup backlog (after deployment)

Links in migrated articles that still point at old Squarespace paths. **Deliberately unchanged for launch** (your decision). Use this as the work list for the separate cleanup. Each can be resolved with one line in `scripts/blog/link-map.json` and a re-import, or by removing the link.

## A. Preserved through the legacy site for now (do not remove the services)

These work at launch because Production has `LEGACY_BLOG_ORIGIN` set. They keep working only while the legacy site exists, so they must be resolved **before the legacy site is retired**.

| Path | Links | What it is | Launch behaviour |
|---|---|---|---|
| `/ask101` | 5 in 1 article(s) | Ask101 chatbot for parents | Kept working through the legacy fallback (temporary) |
| `/self-tape-feedback` | 3 in 2 article(s) | Self Tape Feedback, the $22 paid review service (Stripe payment plus intake form) | Kept working through the legacy fallback (temporary) |
| `/selftapereview` | 3 in 1 article(s) | Same service under its earlier name "Self Tape Review" | Forwards to the legacy `/self-tape-feedback` page (temporary) |

To resolve later: Ask101 needs the chatbot address or an embedded page; the feedback service needs an order page on this site (the current `/ecosystem#self-tape-feedback` anchor and order flow do not exist yet).

## B. Old merchandise and product links (404 on the original site as well)

All of these were already dead in the original articles, so launch does not make anything worse.

| Path | Anchor text | Article |
|---|---|---|
| `/store-1` | Actor Shirts | `/101-blog/actors-say-something-underneath-their-auditions` |
| `/store-1/p/17o7cec3qeug3nhg9o6kwoulrjuend` | (image) | `/101-blog/extra-tips-to-book-from-a-self-tape` |
| `/store-1/p/17o7cec3qeug3nhg9o6kwoulrjuend` | Sale | `/101-blog/extra-tips-to-book-from-a-self-tape` |
| `/store-1/p/17o7cec3qeug3nhg9o6kwoulrjuend` | Youth Actor Evaluation | `/101-blog/extra-tips-to-book-from-a-self-tape` |
| `/store-1/p/uta-hagen-short-sleeve-unisex-t-shirt` | Uta Hagen's | `/101-blog/unlock-your-acting-potential-master-methods-for-young-actors` |
| `/store-1/p/stella-adler-short-sleeve-unisex-t-sh…` | Stella Adler's | `/101-blog/unlock-your-acting-potential-master-methods-for-young-actors` |

Notes for the cleanup: the same article that links the Uta Hagen and Stella Adler shirts already links the Sanford Meisner shirt to TeePublic, so those two may be recoverable if you have the product URLs. The "Youth Actor Evaluation" card needs a confirmed current offer (a May 2024 article links a Stripe promotion that may have expired). I have not guessed any URL.

## C. Already resolved (for reference)

| Old path | Now |
|---|---|
| `/classes` (16 links, 13 articles) | `/training` (approved) |
| `/headshot-guide` | `/from-the-classroom/professional-materials/when-to-update-child-actor-headshots` (approved) |
| `/home/ingenuityactorsstudio` | `/training` (approved) |
| the book product card (3 links) | `https://www.amazon.com/Best-Advice-Child-Actors-Hollywood-ebook/dp/B09HRQ6LPK`, verified: HTTP 200, "The Best Advice For Child Actors: 101 Tips From A Hollywood Talent Manager, Kindle edition by Ralston, Corey" |
| `/home`, `/contact` (newsletter), `/talent-rep-open-call`, a mistyped `/blog/` URL | home page, `/from-the-classroom#newsletter`, `https://pages.childactor101.com/opencall`, `/101-blog/…` |
