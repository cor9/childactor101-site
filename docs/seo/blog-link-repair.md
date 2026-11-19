# Blog internal-link repair

The articles link to pages of the old Squarespace site. Some of those pages have no counterpart on the new site. Every internal link in every article is requested against a production build by `node scripts/blog/check-links.mjs` (results in `blog-link-check.csv`).

**Current state: 29 unique internal paths, 18 resolve, 11 do not. 24 article/link pairs in 19 articles are still broken.** None are redirected to the homepage and none have an invented destination.

## Fixed (clear matches)

Applied through `scripts/blog/link-map.json`, so re-importing never undoes them.

| Old link | Now points to | Why it is a clear match |
|---|---|---|
| `/home` (1 link) | `/` | Squarespace's home page; anchor text is "Child Actor 101". |
| `/blog/time-to-re-think-your-self-tape-backdrop-and-get-one-these-for-under-20` (1) | `/101-blog/time-to-re-think-…` | Old URL form of an article that exists at that slug. |
| `/contact` (1, "sign up for our newsletter") | `/from-the-classroom#newsletter` | The anchor text is a newsletter signup, and that section exists (also used by the Ecosystem page as "The Callback"). |
| `/talent-rep-open-call` (4: "Submit your child's materials here", "Submit here", "Submit to the Talent Rep Open Call Now", "talent agents") | `https://pages.childactor101.com/opencall` | The links are family submission calls to action. The site already defines this as `OPEN_CALL_URL`, used by the Open Call and Industry pages ("Families submit for free"). `/industry/open-call` is the representatives' page, so it is the wrong target. |

## Needs your decision

Each shows the recommended option first. Once you choose, it is a one-line change in `scripts/blog/link-map.json` plus a re-import.

### 1. `/classes` — 16 links in 13 articles (the biggest one)
Anchor text: "Check out our online classes", "HERE", the bare URL. The Squarespace promo box "Online Acting Classes" also uses it (see item 6).
1. **`/training`** (recommended): "Online Acting Training for Young Actors", the current page that describes class training and links onward to enrollment.
2. `https://101training.childactor101.com`: straight to class enrollment (the site's own `trainingOptionsHref`). Better if the old page was a class sign-up page.
3. Interim only: leave it forwarding to the legacy site (needs approval; it is a temporary forward, not a fix).

### 2. `/ask101` — 1 article ("Introducing Ask101… Now Live"), 4 links
No Ask101 page or app URL exists in this repository.
1. **Send me the live Ask101 URL** (recommended): the article is the launch announcement, so the buttons should open the tool.
2. Remove the links and keep the text.
3. Interim only: forward to the legacy site.

### 3. `/self-tape-feedback` (2 articles) and `/selftapereview` (1 article)
Anchor text: "Self-Tape Feedback", "Self Tape Review", "Check it out!". These promote a paid review service.
1. **Send me the order page or payment link** (recommended).
2. `/ecosystem#self-tape-feedback`: this is what the rest of the new site uses for Self Tape Feedback (five places). But on that page it is only a decorative label with no anchor and no order flow, so it would be a dead end for a "buy this" link. Only choose it if that section gets built.
3. Interim only: forward to the legacy site (`/self-tape-feedback` is already on the preserved-pages list).

### 4. `/headshot-guide` — 1 link ("headshots", in the 11,000-members article)
1. **The Headshot Guide URL**, if it is a standalone free guide like the other guide subdomains (`selftapetips.`, `memorize.`, `zoomcb.`, `collegechecklist.`). I did not find one.
2. `/from-the-classroom/professional-materials/when-to-update-child-actor-headshots`: an existing lesson on exactly this topic (verified, 200). Good fallback because the link is a passing mention.

### 5. Store pages — 6 links in 4 articles
| Link | Anchor | Option |
|---|---|---|
| `/store-1` | "Actor Shirts" | The same blog already links the Sanford Meisner shirt and the Super Stage Parent series to TeePublic (`teepublic.com/user/wearablepsa`). If the shirts moved there, send me the URLs. |
| `/store-1/p/uta-hagen-…`, `/store-1/p/stella-adler-…` | "Uta Hagen's", "Stella Adler's" | Same as above (the sibling "Sanford Meisner's" link already goes to TeePublic). |
| `/store-1/p/17o7cec3…` | "Youth Actor Evaluation" | The new product or booking URL, if the service is still offered. |
| `/store-1/p/6l3f9vgt…` | "The Best Advice for Child Actors Book" | The Amazon link (the "101 Tips" article says the book is on Amazon). |
Recommended: send the real URLs. If a product is discontinued, remove the link and keep the text. Not redirecting any of these anywhere else.

### 6. `/home/ingenuityactorsstudio` — 1 image link
It wraps an image above an "Online Acting Classes" text block, so it is the same promo as item 1. Use the same destination as `/classes`, or remove the link.

## Not a destination problem
- `notion://www.notion.so/www.childrescuecoalition.org` (TikTok article) is a malformed link in the original. The link text is kept; the dead link is dropped.
- External links (408 across 85 hosts) were counted but not requested. Affiliate and payment links (Stripe, Amazon) were left exactly as published.

## If you decide to keep a link working before deploy
Any of these paths can be forwarded to the legacy site temporarily (the repo's existing, off-by-default `LEGACY_BLOG_ORIGIN` mechanism). That only keeps the link alive. It leaves the old site in the click path, so I suggest it only as a stopgap and only with your approval.
