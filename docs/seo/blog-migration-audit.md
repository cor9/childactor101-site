# Blog migration audit

Generated 2026-11-19T23:56:22.351Z by `scripts/blog/audit.mjs` from `squarespace-export.xml`.
Source of truth for the expected set: `src/content/blog/legacy-inventory.json` (155 original article URLs).

## Summary

| Measure | Count |
|---|---|
| Original article URLs expected (inventory) | 155 |
| Posts discovered in the export | 171 |
| Published posts imported | 157 |
| **Inventory articles migrated cleanly** | **155** |
| Inventory articles migrated but needing review | 0 |
| **Inventory articles missing from the export** | **0** |
| Imported posts not in the inventory (new since it was made) | 2 |
| Skipped (draft, scheduled, no slug) | 14 |
| Duplicate slugs ignored | 0 |

## Images

| State | Count |
|---|---|
| Unique images referenced | 805 |
| Copied to `public/blog/images` | 805 |
| Still hot-linked from Squarespace (not yet downloaded) | 0 |
| Failed to download | 0 |
| Local files missing on disk | 0 |
| Image tags in article bodies still pointing at a remote URL | 0 (0 posts) |
| Featured images still remote | 0 |
| Stored size (originals were 469 MB) | 85 MB |

Every image is stored locally; no article depends on Squarespace's CDN.

## Missing articles

_None._

## Migrated but needing review

_None._

## Short or media-only posts (not errors)

These contain little or no text in the export. They are complete as exported; eyeball them against the live pages.

- `/101-blog/Auditiontipsvideo` — 51 words, 2 image(s), 1 embed(s) (media-led post; text is genuinely short in the export)
- `/101-blog/self-tape-equipment-for-child-actors` — 42 words, 2 image(s), 0 embed(s) (media-led post; text is genuinely short in the export)
- `/101-blog/101-tips-book` — 54 words, 3 image(s), 0 embed(s) (media-led post; text is genuinely short in the export)

## Skipped or ignored by the importer

- 4n3tpu2wfgucgifkmy8p72mfydf5hl — status is "draft", not published
- 8exipo9uoqdsoqy7tvdkqjnbm661n5 — status is "draft", not published
- 9pr1yfio6r9zn16i7hc7e91bgaxyv2 — status is "draft", not published
- 9v86u9exje931we3ya0fp50r2gc0rx — status is "draft", not published
- actors-should-give-choices-in-their-self-tape-auditions — status is "draft", not published
- fv52ziwwgfw21yuy87zu5sowdc3joy — status is "draft", not published
- how-to-handle-the-inevitable-rejection-that-all-child-actors-must-endure — status is "draft", not published
- kop9mxdkexek4jxo320tkqfaytsafn — status is "draft", not published
- mglcr620myk1u6mm2t9zfxzttsrfgi — status is "draft", not published
- p07pq3zatitquavtmha737vuf0n3fk — status is "draft", not published
- ssxz5om7ia8lxalz4hr49giwlycror — status is "draft", not published
- stop-playing-it-safe — status is "draft", not published
- the-art-of-the-headshot-how-parents-can-guide-their-child-actors-to-success — status is "draft", not published
- w5i1iy3g1r5mucyshrqcomi9y004rp — status is "draft", not published

## SEO issues requiring attention

### no excerpt in export (152)

- actors-say-something-underneath-their-auditions — no excerpt in export: meta description derived from body text
- allison-jones-on-casting-actors-golden-advice-from-a-legend — no excerpt in export: meta description derived from body text
- audition-and-forget-it-why-letting-go-is-a-child-actors-superpower — no excerpt in export: meta description derived from body text
- Auditiontipsvideo — no excerpt in export: meta description derived from body text
- avoid-these-common-audition-fails-expert-solutions-for-young-actors — no excerpt in export: meta description derived from body text
- be-a-part-of-the-future-of-child-acting-join-scenecraftrs-beta-test-and-self-tape-contest — no excerpt in export: meta description derived from body text
- child-actor-callbacks-do-you-really-need-coaching — no excerpt in export: meta description derived from body text
- child-actor-self-tapes-what-should-my-child-do-when-there-are-a-lot-of-lines-for-other-people — no excerpt in export: meta description derived from body text
- child-actor-self-tapes-which-take-should-you-actually-send — no excerpt in export: meta description derived from body text
- dont-just-stand-and-deliver-bring-real-life-to-your-self-tape-auditions — no excerpt in export: meta description derived from body text
- how-to-help-your-child-actor-self-tape-auditions-while-traveling-a-parents-guide-to-taping-in-a-hotel-room — no excerpt in export: meta description derived from body text
- introducing-self-tape-review-your-personalized-audition-feedback-service — no excerpt in export: meta description derived from body text
- keep-it-or-click-delete-the-great-self-tape-debate — no excerpt in export: meta description derived from body text
- misconceptions-actors-have-about-the-casting-process — no excerpt in export: meta description derived from body text
- navigating-the-nerve-wracking-world-of-series-regular-casting-test-deals-a-guide-for-parents-of-child-actors — no excerpt in export: meta description derived from body text
- self-tape-equipment-for-child-actors — no excerpt in export: meta description derived from body text
- should-your-child-do-a-virtual-casting-appointment-or-a-self-tape — no excerpt in export: meta description derived from body text
- the-power-of-the-parent-reader-in-child-actor-self-tape-auditions — no excerpt in export: meta description derived from body text
- the-secret-to-audition-scenes-why-the-first-moment-of-a-scene-matters-more-than-you-think — no excerpt in export: meta description derived from body text
- time-to-re-think-your-self-tape-backdrop-and-get-one-these-for-under-20 — no excerpt in export: meta description derived from body text
- track-your-auditions-and-expenses-for-free — no excerpt in export: meta description derived from body text
- track-your-childs-auditions-expenses-and-more-for-free-2025-update — no excerpt in export: meta description derived from body text
- unlocking-confidence-on-camera-using-uta-hagens-nine-questions-for-child-actor-audition-success — no excerpt in export: meta description derived from body text
- what-casting-directors-look-for-in-the-first-20-seconds-of-an-audition — no excerpt in export: meta description derived from body text
- what-makes-a-child-actors-self-tape-audition-competitive — no excerpt in export: meta description derived from body text
- what-should-my-child-wear-to-an-audition — no excerpt in export: meta description derived from body text
- whats-behind-you-matters-how-self-tape-backgrounds-can-be-part-of-the-story — no excerpt in export: meta description derived from body text
- why-i-always-say-the-audition-is-the-job — no excerpt in export: meta description derived from body text
- why-you-must-master-the-first-15-seconds-of-your-self-tape-audition — no excerpt in export: meta description derived from body text
- why-you-shouldnt-use-monologues-on-casting-profiles — no excerpt in export: meta description derived from body text
- 101-things-every-acting-student-needs-before-leaving-home — no excerpt in export: meta description derived from body text
- 2xccz4x1dpno6ksnhljlshfemuv6v9 — no excerpt in export: meta description derived from body text
- 9steps — no excerpt in export: meta description derived from body text
- abt9mee909dvyseiiazv5ci1uvuj6g — no excerpt in export: meta description derived from body text
- ah2iw5i9q7ctcr4z2yphs8pm5t8x8g — no excerpt in export: meta description derived from body text
- breakdown-services-unlocking-opportunities-in-the-acting-world-for-child-actors — no excerpt in export: meta description derived from body text
- breaking-news-sagaftra-strike-is-over — no excerpt in export: meta description derived from body text
- Characterlab — no excerpt in export: meta description derived from body text
- child-actor-101-gets-an-awesome-upgrade-meet-skool — no excerpt in export: meta description derived from body text
- child-star-on-hulu-a-rollercoaster-ride-through-instant-fame — no excerpt in export: meta description derived from body text
- …and 112 more (see CSV)

### N image(s) without alt text (8)

- allison-jones-on-casting-actors-golden-advice-from-a-legend — 12 image(s) without alt text
- level-up-the-definitive-roadmap-to-becoming-a-competitive-actor-now-accepting-beta-testers- — 9 image(s) without alt text
- why-i-rebuilt-the-entire-actor-training-program — 9 image(s) without alt text
- create-a-vision-board-with-your-kiddos-to-manifest-success-and-growth-in-2025 — 9 image(s) without alt text
- creating-a-demo-scene-for-your-child-actor — 3 image(s) without alt text
- stage-name-game-how-to-give-your-child-actor-a-hollywood-worthy-alias — 10 image(s) without alt text
- -hoacting-insights-ai-mentor-is-revolutionizing-child-actor-audition-prep — 7 image(s) without alt text
- seeking-representation-vs-casting-resumes-what-parents-must-know — 3 image(s) without alt text

### title is N characters (may truncate in search results) (100)

- audition-and-forget-it-why-letting-go-is-a-child-actors-superpower — title is 70 characters (may truncate in search results)
- avoid-these-common-audition-fails-expert-solutions-for-young-actors — title is 68 characters (may truncate in search results)
- be-a-part-of-the-future-of-child-acting-join-scenecraftrs-beta-test-and-self-tape-contest — title is 78 characters (may truncate in search results)
- child-actor-self-tapes-what-should-my-child-do-when-there-are-a-lot-of-lines-for-other-people — title is 83 characters (may truncate in search results)
- dont-just-stand-and-deliver-bring-real-life-to-your-self-tape-auditions — title is 73 characters (may truncate in search results)
- how-to-help-your-child-actor-self-tape-auditions-while-traveling-a-parents-guide-to-taping-in-a-hotel-room — title is 108 characters (may truncate in search results)
- introducing-self-tape-review-your-personalized-audition-feedback-service — title is 73 characters (may truncate in search results)
- navigating-the-nerve-wracking-world-of-series-regular-casting-test-deals-a-guide-for-parents-of-child-actors — title is 109 characters (may truncate in search results)
- should-your-child-do-a-virtual-casting-appointment-or-a-self-tape — title is 66 characters (may truncate in search results)
- the-power-of-the-parent-reader-in-child-actor-self-tape-auditions — title is 65 characters (may truncate in search results)
- the-secret-to-audition-scenes-why-the-first-moment-of-a-scene-matters-more-than-you-think — title is 91 characters (may truncate in search results)
- time-to-re-think-your-self-tape-backdrop-and-get-one-these-for-under-20 — title is 72 characters (may truncate in search results)
- track-your-childs-auditions-expenses-and-more-for-free-2025-update — title is 71 characters (may truncate in search results)
- unlocking-confidence-on-camera-using-uta-hagens-nine-questions-for-child-actor-audition-success — title is 97 characters (may truncate in search results)
- what-casting-directors-look-for-in-the-first-20-seconds-of-an-audition — title is 70 characters (may truncate in search results)
- whats-behind-you-matters-how-self-tape-backgrounds-can-be-part-of-the-story — title is 77 characters (may truncate in search results)
- why-you-must-master-the-first-15-seconds-of-your-self-tape-audition — title is 67 characters (may truncate in search results)
- 9steps — title is 76 characters (may truncate in search results)
- abt9mee909dvyseiiazv5ci1uvuj6g — title is 69 characters (may truncate in search results)
- breakdown-services-unlocking-opportunities-in-the-acting-world-for-child-actors — title is 80 characters (may truncate in search results)
- Characterlab — title is 85 characters (may truncate in search results)
- child-star-on-hulu-a-rollercoaster-ride-through-instant-fame — title is 63 characters (may truncate in search results)
- coaching-at-child-actor-101-rebranded-refreshed-and-ready-for-your-young-actor — title is 81 characters (may truncate in search results)
- de-roling-the-essential-tool-to-release-a-character-and-regain-yourself — title is 72 characters (may truncate in search results)
- elevate-your-childs-acting-career-discover-the-power-of-talent-evaluations — title is 76 characters (may truncate in search results)
- gbjpfvhefgef347nhas702ihsx3k1q — title is 80 characters (may truncate in search results)
- hollywood-hack-for-teen-actors-meet-the-cpp — title is 75 characters (may truncate in search results)
- how-ai-is-revolutionizing-the-acting-worldand-why-you-and-your-young-actor-should-get-on-board — title is 95 characters (may truncate in search results)
- introducing-ask101-your-personal-acting-industry-resource-now-live — title is 70 characters (may truncate in search results)
- level-up-the-definitive-roadmap-to-becoming-a-competitive-actor-now-accepting-beta-testers- — title is 97 characters (may truncate in search results)
- navigating-the-nuances-of-tv-acting-the-key-to-booking-the-gig — title is 63 characters (may truncate in search results)
- olympic-level-training-for-aspiring-young-actors-why-consistency-is-key — title is 72 characters (may truncate in search results)
- on-set-etiquette-essential-guide-for-child-actors-and-their-parents — title is 68 characters (may truncate in search results)
- parenthetical-playbook-a-kid-friendly-guide-to-actings-whispered-secrets — title is 74 characters (may truncate in search results)
- r8tfgy4u9qfibbprbbol9bx8j0u1qk — title is 80 characters (may truncate in search results)
- the-5-types-of-tv-content-your-child-actor-should-be-watching — title is 61 characters (may truncate in search results)
- the-art-of-being-unforgettable-why-young-actors-should-ditch-the-vanilla-and-go-full-rocky-road — title is 99 characters (may truncate in search results)
- the-child-actor-101-ecosystem-continues-to-grow-and-the-podcast-is-back — title is 73 characters (may truncate in search results)
- the-harsh-truth-if-youre-not-taking-training-seriously-your-kid-isnbspjust-a-hobbyist — title is 85 characters (may truncate in search results)
- the-industry-classroom-how-acting-nurtures-life-skills-in-child-actors — title is 71 characters (may truncate in search results)
- …and 60 more (see CSV)

### Always check (cannot be detected from the export)

- Squarespace "SEO title" and "SEO description" overrides are **not included** in the WordPress export. Meta descriptions here come from the post excerpt, or from the first ~160 characters of the body. Compare a sample against the live pages (view-source on the legacy site) and add overrides if they differ.
- Squarespace "thumbnail" images are only exported when they were uploaded as post attachments. Posts marked "no featured image" above may have a thumbnail on the live site.
- Confirm the Squarespace blog collection kept every article's URL slug unchanged; the audit matches on slug only.
- Old category and tag URLs (`/101-blog/category/...`, `/101-blog/tag/...`) are rebuilt from the export's categories and tags. Spot-check a few against the live site.

## Original URL versus new URL

Every migrated article keeps its original path, so no redirect is needed. The full per-article table (status, original URL, new URL, author, date, words, image counts, issues) is in `blog-migration-audit.csv`.

| Original URL | New URL | Status |
|---|---|---|
| https://www.childactor101.com/101-blog/actors-say-something-underneath-their-auditions | https://www.childactor101.com/101-blog/actors-say-something-underneath-their-auditions | Migrated |
| https://www.childactor101.com/101-blog/allison-jones-on-casting-actors-golden-advice-from-a-legend | https://www.childactor101.com/101-blog/allison-jones-on-casting-actors-golden-advice-from-a-legend | Migrated |
| https://www.childactor101.com/101-blog/audition-and-forget-it-why-letting-go-is-a-child-actors-superpower | https://www.childactor101.com/101-blog/audition-and-forget-it-why-letting-go-is-a-child-actors-superpower | Migrated |
| https://www.childactor101.com/101-blog/Auditiontipsvideo | https://www.childactor101.com/101-blog/Auditiontipsvideo | Migrated |
| https://www.childactor101.com/101-blog/avoid-these-common-audition-fails-expert-solutions-for-young-actors | https://www.childactor101.com/101-blog/avoid-these-common-audition-fails-expert-solutions-for-young-actors | Migrated |
| https://www.childactor101.com/101-blog/be-a-part-of-the-future-of-child-acting-join-scenecraftrs-beta-test-and-self-tape-contest | https://www.childactor101.com/101-blog/be-a-part-of-the-future-of-child-acting-join-scenecraftrs-beta-test-and-self-tape-contest | Migrated |
| https://www.childactor101.com/101-blog/child-actor-callbacks-do-you-really-need-coaching | https://www.childactor101.com/101-blog/child-actor-callbacks-do-you-really-need-coaching | Migrated |
| https://www.childactor101.com/101-blog/child-actor-self-tapes-what-should-my-child-do-when-there-are-a-lot-of-lines-for-other-people | https://www.childactor101.com/101-blog/child-actor-self-tapes-what-should-my-child-do-when-there-are-a-lot-of-lines-for-other-people | Migrated |
| https://www.childactor101.com/101-blog/child-actor-self-tapes-which-take-should-you-actually-send | https://www.childactor101.com/101-blog/child-actor-self-tapes-which-take-should-you-actually-send | Migrated |
| https://www.childactor101.com/101-blog/dont-just-stand-and-deliver-bring-real-life-to-your-self-tape-auditions | https://www.childactor101.com/101-blog/dont-just-stand-and-deliver-bring-real-life-to-your-self-tape-auditions | Migrated |
| https://www.childactor101.com/101-blog/extra-tips-to-book-from-a-self-tape | https://www.childactor101.com/101-blog/extra-tips-to-book-from-a-self-tape | Migrated |
| https://www.childactor101.com/101-blog/how-to-help-your-child-actor-self-tape-auditions-while-traveling-a-parents-guide-to-taping-in-a-hotel-room | https://www.childactor101.com/101-blog/how-to-help-your-child-actor-self-tape-auditions-while-traveling-a-parents-guide-to-taping-in-a-hotel-room | Migrated |
| https://www.childactor101.com/101-blog/introducing-self-tape-review-your-personalized-audition-feedback-service | https://www.childactor101.com/101-blog/introducing-self-tape-review-your-personalized-audition-feedback-service | Migrated |
| https://www.childactor101.com/101-blog/keep-it-or-click-delete-the-great-self-tape-debate | https://www.childactor101.com/101-blog/keep-it-or-click-delete-the-great-self-tape-debate | Migrated |
| https://www.childactor101.com/101-blog/misconceptions-actors-have-about-the-casting-process | https://www.childactor101.com/101-blog/misconceptions-actors-have-about-the-casting-process | Migrated |
| https://www.childactor101.com/101-blog/navigating-the-nerve-wracking-world-of-series-regular-casting-test-deals-a-guide-for-parents-of-child-actors | https://www.childactor101.com/101-blog/navigating-the-nerve-wracking-world-of-series-regular-casting-test-deals-a-guide-for-parents-of-child-actors | Migrated |
| https://www.childactor101.com/101-blog/self-tape-equipment-for-child-actors | https://www.childactor101.com/101-blog/self-tape-equipment-for-child-actors | Migrated |
| https://www.childactor101.com/101-blog/should-your-child-do-a-virtual-casting-appointment-or-a-self-tape | https://www.childactor101.com/101-blog/should-your-child-do-a-virtual-casting-appointment-or-a-self-tape | Migrated |
| https://www.childactor101.com/101-blog/the-power-of-the-parent-reader-in-child-actor-self-tape-auditions | https://www.childactor101.com/101-blog/the-power-of-the-parent-reader-in-child-actor-self-tape-auditions | Migrated |
| https://www.childactor101.com/101-blog/the-secret-to-audition-scenes-why-the-first-moment-of-a-scene-matters-more-than-you-think | https://www.childactor101.com/101-blog/the-secret-to-audition-scenes-why-the-first-moment-of-a-scene-matters-more-than-you-think | Migrated |
| https://www.childactor101.com/101-blog/time-to-re-think-your-self-tape-backdrop-and-get-one-these-for-under-20 | https://www.childactor101.com/101-blog/time-to-re-think-your-self-tape-backdrop-and-get-one-these-for-under-20 | Migrated |
| https://www.childactor101.com/101-blog/track-your-auditions-and-expenses-for-free | https://www.childactor101.com/101-blog/track-your-auditions-and-expenses-for-free | Migrated |
| https://www.childactor101.com/101-blog/track-your-childs-auditions-expenses-and-more-for-free-2025-update | https://www.childactor101.com/101-blog/track-your-childs-auditions-expenses-and-more-for-free-2025-update | Migrated |
| https://www.childactor101.com/101-blog/unlocking-confidence-on-camera-using-uta-hagens-nine-questions-for-child-actor-audition-success | https://www.childactor101.com/101-blog/unlocking-confidence-on-camera-using-uta-hagens-nine-questions-for-child-actor-audition-success | Migrated |
| https://www.childactor101.com/101-blog/what-casting-directors-look-for-in-the-first-20-seconds-of-an-audition | https://www.childactor101.com/101-blog/what-casting-directors-look-for-in-the-first-20-seconds-of-an-audition | Migrated |
| https://www.childactor101.com/101-blog/what-makes-a-child-actors-self-tape-audition-competitive | https://www.childactor101.com/101-blog/what-makes-a-child-actors-self-tape-audition-competitive | Migrated |
| https://www.childactor101.com/101-blog/what-should-my-child-wear-to-an-audition | https://www.childactor101.com/101-blog/what-should-my-child-wear-to-an-audition | Migrated |
| https://www.childactor101.com/101-blog/whats-behind-you-matters-how-self-tape-backgrounds-can-be-part-of-the-story | https://www.childactor101.com/101-blog/whats-behind-you-matters-how-self-tape-backgrounds-can-be-part-of-the-story | Migrated |
| https://www.childactor101.com/101-blog/why-i-always-say-the-audition-is-the-job | https://www.childactor101.com/101-blog/why-i-always-say-the-audition-is-the-job | Migrated |
| https://www.childactor101.com/101-blog/why-you-must-master-the-first-15-seconds-of-your-self-tape-audition | https://www.childactor101.com/101-blog/why-you-must-master-the-first-15-seconds-of-your-self-tape-audition | Migrated |
| https://www.childactor101.com/101-blog/why-you-shouldnt-use-monologues-on-casting-profiles | https://www.childactor101.com/101-blog/why-you-shouldnt-use-monologues-on-casting-profiles | Migrated |
| https://www.childactor101.com/101-blog/101-things-every-acting-student-needs-before-leaving-home | https://www.childactor101.com/101-blog/101-things-every-acting-student-needs-before-leaving-home | Migrated |
| https://www.childactor101.com/101-blog/101-tips-book | https://www.childactor101.com/101-blog/101-tips-book | Migrated |
| https://www.childactor101.com/101-blog/2xccz4x1dpno6ksnhljlshfemuv6v9 | https://www.childactor101.com/101-blog/2xccz4x1dpno6ksnhljlshfemuv6v9 | Migrated |
| https://www.childactor101.com/101-blog/9steps | https://www.childactor101.com/101-blog/9steps | Migrated |
| https://www.childactor101.com/101-blog/abt9mee909dvyseiiazv5ci1uvuj6g | https://www.childactor101.com/101-blog/abt9mee909dvyseiiazv5ci1uvuj6g | Migrated |
| https://www.childactor101.com/101-blog/ah2iw5i9q7ctcr4z2yphs8pm5t8x8g | https://www.childactor101.com/101-blog/ah2iw5i9q7ctcr4z2yphs8pm5t8x8g | Migrated |
| https://www.childactor101.com/101-blog/breakdown-services-unlocking-opportunities-in-the-acting-world-for-child-actors | https://www.childactor101.com/101-blog/breakdown-services-unlocking-opportunities-in-the-acting-world-for-child-actors | Migrated |
| https://www.childactor101.com/101-blog/breaking-news-sagaftra-strike-is-over | https://www.childactor101.com/101-blog/breaking-news-sagaftra-strike-is-over | Migrated |
| https://www.childactor101.com/101-blog/Characterlab | https://www.childactor101.com/101-blog/Characterlab | Migrated |
| https://www.childactor101.com/101-blog/child-actor-101-gets-an-awesome-upgrade-meet-skool | https://www.childactor101.com/101-blog/child-actor-101-gets-an-awesome-upgrade-meet-skool | Migrated |
| https://www.childactor101.com/101-blog/child-star-on-hulu-a-rollercoaster-ride-through-instant-fame | https://www.childactor101.com/101-blog/child-star-on-hulu-a-rollercoaster-ride-through-instant-fame | Migrated |
| https://www.childactor101.com/101-blog/coaching-at-child-actor-101-rebranded-refreshed-and-ready-for-your-young-actor | https://www.childactor101.com/101-blog/coaching-at-child-actor-101-rebranded-refreshed-and-ready-for-your-young-actor | Migrated |
| https://www.childactor101.com/101-blog/csq5t8um34lt2s7wljla2045jnq6zt | https://www.childactor101.com/101-blog/csq5t8um34lt2s7wljla2045jnq6zt | Migrated |
| https://www.childactor101.com/101-blog/de-roling-the-essential-tool-to-release-a-character-and-regain-yourself | https://www.childactor101.com/101-blog/de-roling-the-essential-tool-to-release-a-character-and-regain-yourself | Migrated |
| https://www.childactor101.com/101-blog/elevate-your-childs-acting-career-discover-the-power-of-talent-evaluations | https://www.childactor101.com/101-blog/elevate-your-childs-acting-career-discover-the-power-of-talent-evaluations | Migrated |
| https://www.childactor101.com/101-blog/elevating-talent-my-approach-to-consistent-acting-coaching | https://www.childactor101.com/101-blog/elevating-talent-my-approach-to-consistent-acting-coaching | Migrated |
| https://www.childactor101.com/101-blog/gbjpfvhefgef347nhas702ihsx3k1q | https://www.childactor101.com/101-blog/gbjpfvhefgef347nhas702ihsx3k1q | Migrated |
| https://www.childactor101.com/101-blog/go-look-this-up | https://www.childactor101.com/101-blog/go-look-this-up | Migrated |
| https://www.childactor101.com/101-blog/hollywood-hack-for-teen-actors-meet-the-cpp | https://www.childactor101.com/101-blog/hollywood-hack-for-teen-actors-meet-the-cpp | Migrated |
| https://www.childactor101.com/101-blog/how-ai-is-revolutionizing-the-acting-worldand-why-you-and-your-young-actor-should-get-on-board | https://www.childactor101.com/101-blog/how-ai-is-revolutionizing-the-acting-worldand-why-you-and-your-young-actor-should-get-on-board | Migrated |
| https://www.childactor101.com/101-blog/i-am-a-cruel-jerkface | https://www.childactor101.com/101-blog/i-am-a-cruel-jerkface | Migrated |
| https://www.childactor101.com/101-blog/introducing-ask101-your-personal-acting-industry-resource-now-live | https://www.childactor101.com/101-blog/introducing-ask101-your-personal-acting-industry-resource-now-live | Migrated |
| https://www.childactor101.com/101-blog/let-the-music-move-you | https://www.childactor101.com/101-blog/let-the-music-move-you | Migrated |
| https://www.childactor101.com/101-blog/level-up-the-definitive-roadmap-to-becoming-a-competitive-actor-now-accepting-beta-testers- | https://www.childactor101.com/101-blog/level-up-the-definitive-roadmap-to-becoming-a-competitive-actor-now-accepting-beta-testers- | Migrated |
| https://www.childactor101.com/101-blog/mother-agencies-should-your-rising-star-sign-up | https://www.childactor101.com/101-blog/mother-agencies-should-your-rising-star-sign-up | Migrated |
| https://www.childactor101.com/101-blog/navigating-the-nuances-of-tv-acting-the-key-to-booking-the-gig | https://www.childactor101.com/101-blog/navigating-the-nuances-of-tv-acting-the-key-to-booking-the-gig | Migrated |
| https://www.childactor101.com/101-blog/olympic-level-training-for-aspiring-young-actors-why-consistency-is-key | https://www.childactor101.com/101-blog/olympic-level-training-for-aspiring-young-actors-why-consistency-is-key | Migrated |
| https://www.childactor101.com/101-blog/on-set-etiquette-essential-guide-for-child-actors-and-their-parents | https://www.childactor101.com/101-blog/on-set-etiquette-essential-guide-for-child-actors-and-their-parents | Migrated |
| https://www.childactor101.com/101-blog/parenthetical-playbook-a-kid-friendly-guide-to-actings-whispered-secrets | https://www.childactor101.com/101-blog/parenthetical-playbook-a-kid-friendly-guide-to-actings-whispered-secrets | Migrated |
| https://www.childactor101.com/101-blog/pvr68iuo938gsyb250tdh0m4wifk9o | https://www.childactor101.com/101-blog/pvr68iuo938gsyb250tdh0m4wifk9o | Migrated |
| https://www.childactor101.com/101-blog/qds6k4b59iq3vbwthkwehupmmdj8z7 | https://www.childactor101.com/101-blog/qds6k4b59iq3vbwthkwehupmmdj8z7 | Migrated |
| https://www.childactor101.com/101-blog/r8tfgy4u9qfibbprbbol9bx8j0u1qk | https://www.childactor101.com/101-blog/r8tfgy4u9qfibbprbbol9bx8j0u1qk | Migrated |
| https://www.childactor101.com/101-blog/seeking-motivated-young-actors | https://www.childactor101.com/101-blog/seeking-motivated-young-actors | Migrated |
| https://www.childactor101.com/101-blog/selftapesound | https://www.childactor101.com/101-blog/selftapesound | Migrated |
| https://www.childactor101.com/101-blog/stage-parent-super-hero | https://www.childactor101.com/101-blog/stage-parent-super-hero | Migrated |
| https://www.childactor101.com/101-blog/the-5-types-of-tv-content-your-child-actor-should-be-watching | https://www.childactor101.com/101-blog/the-5-types-of-tv-content-your-child-actor-should-be-watching | Migrated |
| https://www.childactor101.com/101-blog/the-art-of-being-unforgettable-why-young-actors-should-ditch-the-vanilla-and-go-full-rocky-road | https://www.childactor101.com/101-blog/the-art-of-being-unforgettable-why-young-actors-should-ditch-the-vanilla-and-go-full-rocky-road | Migrated |
| https://www.childactor101.com/101-blog/the-child-actor-101-ecosystem-continues-to-grow-and-the-podcast-is-back | https://www.childactor101.com/101-blog/the-child-actor-101-ecosystem-continues-to-grow-and-the-podcast-is-back | Migrated |
| https://www.childactor101.com/101-blog/the-harsh-truth-if-youre-not-taking-training-seriously-your-kid-isnbspjust-a-hobbyist | https://www.childactor101.com/101-blog/the-harsh-truth-if-youre-not-taking-training-seriously-your-kid-isnbspjust-a-hobbyist | Migrated |
| https://www.childactor101.com/101-blog/the-importance-of-video-examples-for-aspiring-child-actors | https://www.childactor101.com/101-blog/the-importance-of-video-examples-for-aspiring-child-actors | Migrated |
| https://www.childactor101.com/101-blog/the-industry-classroom-how-acting-nurtures-life-skills-in-child-actors | https://www.childactor101.com/101-blog/the-industry-classroom-how-acting-nurtures-life-skills-in-child-actors | Migrated |
| https://www.childactor101.com/101-blog/the-little-giants-of-the-silver-screen-how-child-actors-shine-in-the-oscars-spotlight | https://www.childactor101.com/101-blog/the-little-giants-of-the-silver-screen-how-child-actors-shine-in-the-oscars-spotlight | Migrated |
| https://www.childactor101.com/101-blog/the-truth-about-youth-acting-awards | https://www.childactor101.com/101-blog/the-truth-about-youth-acting-awards | Migrated |
| https://www.childactor101.com/101-blog/understanding-the-role-of-a-studio-teacher-in-your-child-actors-journey | https://www.childactor101.com/101-blog/understanding-the-role-of-a-studio-teacher-in-your-child-actors-journey | Migrated |
| https://www.childactor101.com/101-blog/unlock-your-childs-acting-potential-with-practical-aesthetics-the-as-if-technique-explained | https://www.childactor101.com/101-blog/unlock-your-childs-acting-potential-with-practical-aesthetics-the-as-if-technique-explained | Migrated |
| https://www.childactor101.com/101-blog/we-joined-sag-too-earlynow-we-feel-stuck-what-parents-need-to-know-and-what-you-can-still-do | https://www.childactor101.com/101-blog/we-joined-sag-too-earlynow-we-feel-stuck-what-parents-need-to-know-and-what-you-can-still-do | Migrated |
| https://www.childactor101.com/101-blog/when-i-was-a-child-actor | https://www.childactor101.com/101-blog/when-i-was-a-child-actor | Migrated |
| https://www.childactor101.com/101-blog/why-i-rebuilt-the-entire-actor-training-program | https://www.childactor101.com/101-blog/why-i-rebuilt-the-entire-actor-training-program | Migrated |
| https://www.childactor101.com/101-blog/xdfdo4dm30dhgvqsiqcedjfswgizaf | https://www.childactor101.com/101-blog/xdfdo4dm30dhgvqsiqcedjfswgizaf | Migrated |
| https://www.childactor101.com/101-blog/yrm65th5yg2jk5xozf6ah1q8d0ko2c | https://www.childactor101.com/101-blog/yrm65th5yg2jk5xozf6ah1q8d0ko2c | Migrated |
| https://www.childactor101.com/101-blog/capture-your-screen-time-best-air-check-services | https://www.childactor101.com/101-blog/capture-your-screen-time-best-air-check-services | Migrated |
| https://www.childactor101.com/101-blog/disney-open-call-alert-a-big-swing-worth-taking-yeseven-if-its-a-long-shot | https://www.childactor101.com/101-blog/disney-open-call-alert-a-big-swing-worth-taking-yeseven-if-its-a-long-shot | Migrated |
| https://www.childactor101.com/101-blog/redefining-influence-how-child-actors-can-shine-authentically-on-social-media | https://www.childactor101.com/101-blog/redefining-influence-how-child-actors-can-shine-authentically-on-social-media | Migrated |
| https://www.childactor101.com/101-blog/the-instagram-dilemma-why-child-actors-dont-need-social-media-accounts-to-succeed | https://www.childactor101.com/101-blog/the-instagram-dilemma-why-child-actors-dont-need-social-media-accounts-to-succeed | Migrated |
| https://www.childactor101.com/101-blog/the-screen-time-that-counts-8-reasons-why-child-actors-need-to-be-watching-tv-shows | https://www.childactor101.com/101-blog/the-screen-time-that-counts-8-reasons-why-child-actors-need-to-be-watching-tv-shows | Migrated |
| https://www.childactor101.com/101-blog/we-just-hit-11000-members-and-were-celebrating-with-the-open-call-that-could-change-your-kids-career | https://www.childactor101.com/101-blog/we-just-hit-11000-members-and-were-celebrating-with-the-open-call-that-could-change-your-kids-career | Migrated |
| https://www.childactor101.com/101-blog/2022budget | https://www.childactor101.com/101-blog/2022budget | Migrated |
| https://www.childactor101.com/101-blog/create-a-vision-board-with-your-kiddos-to-manifest-success-and-growth-in-2025 | https://www.childactor101.com/101-blog/create-a-vision-board-with-your-kiddos-to-manifest-success-and-growth-in-2025 | Migrated |
| https://www.childactor101.com/101-blog/introducing-the-child-actor-101-vendor-amp-industry-professional-directory | https://www.childactor101.com/101-blog/introducing-the-child-actor-101-vendor-amp-industry-professional-directory | Migrated |
| https://www.childactor101.com/101-blog/tax-guide-for-parents-of-child-actors-navigating-taxes-without-losing-your-marbles | https://www.childactor101.com/101-blog/tax-guide-for-parents-of-child-actors-navigating-taxes-without-losing-your-marbles | Migrated |
| https://www.childactor101.com/101-blog/the-business-side-to-acting | https://www.childactor101.com/101-blog/the-business-side-to-acting | Migrated |
| https://www.childactor101.com/101-blog/vision-board | https://www.childactor101.com/101-blog/vision-board | Migrated |
| https://www.childactor101.com/101-blog/Actorsaccess | https://www.childactor101.com/101-blog/Actorsaccess | Migrated |
| https://www.childactor101.com/101-blog/creating-a-demo-scene-for-your-child-actor | https://www.childactor101.com/101-blog/creating-a-demo-scene-for-your-child-actor | Migrated |
| https://www.childactor101.com/101-blog/Demo Reel Options | https://www.childactor101.com/101-blog/Demo Reel Options | Migrated |
| https://www.childactor101.com/101-blog/getting-multifaceted-shots-from-a-3-look-headshot-session | https://www.childactor101.com/101-blog/getting-multifaceted-shots-from-a-3-look-headshot-session | Migrated |
| https://www.childactor101.com/101-blog/headshot-hacks-mastering-the-no-makeup-look-for-your-child-actor-essential-makeup-tips-for-perfect-photos | https://www.childactor101.com/101-blog/headshot-hacks-mastering-the-no-makeup-look-for-your-child-actor-essential-makeup-tips-for-perfect-photos | Migrated |
| https://www.childactor101.com/101-blog/pages101-is-here-one-home-base-for-your-young-actors-career | https://www.childactor101.com/101-blog/pages101-is-here-one-home-base-for-your-young-actors-career | Migrated |
| https://www.childactor101.com/101-blog/stage-name-game-how-to-give-your-child-actor-a-hollywood-worthy-alias | https://www.childactor101.com/101-blog/stage-name-game-how-to-give-your-child-actor-a-hollywood-worthy-alias | Migrated |
| https://www.childactor101.com/101-blog/the-ultimate-guide-to-imdbpro-what-parents-of-child-actors-need-to-know | https://www.childactor101.com/101-blog/the-ultimate-guide-to-imdbpro-what-parents-of-child-actors-need-to-know | Migrated |
| https://www.childactor101.com/101-blog/why-theater-performance-clips-have-no-place-in-your-childs-acting-reel | https://www.childactor101.com/101-blog/why-theater-performance-clips-have-no-place-in-your-childs-acting-reel | Migrated |
| https://www.childactor101.com/101-blog/booking-out-a-critical-practice-for-child-actors-in-the-entertainment-industry | https://www.childactor101.com/101-blog/booking-out-a-critical-practice-for-child-actors-in-the-entertainment-industry | Migrated |
| https://www.childactor101.com/101-blog/breaking-up-is-hard-to-do-navigating-the-departure-from-your-childs-agent-or-manager | https://www.childactor101.com/101-blog/breaking-up-is-hard-to-do-navigating-the-departure-from-your-childs-agent-or-manager | Migrated |
| https://www.childactor101.com/101-blog/child-actor-101s-online-representation-open-call-your-childs-chance-to-shine | https://www.childactor101.com/101-blog/child-actor-101s-online-representation-open-call-your-childs-chance-to-shine | Migrated |
| https://www.childactor101.com/101-blog/-hoacting-insights-ai-mentor-is-revolutionizing-child-actor-audition-prep | https://www.childactor101.com/101-blog/-hoacting-insights-ai-mentor-is-revolutionizing-child-actor-audition-prep | Migrated |
| https://www.childactor101.com/101-blog/hot-topic-should-you-be-your-childs-momager | https://www.childactor101.com/101-blog/hot-topic-should-you-be-your-childs-momager | Migrated |
| https://www.childactor101.com/101-blog/how-to-become-your-agents-favorite-client | https://www.childactor101.com/101-blog/how-to-become-your-agents-favorite-client | Migrated |
| https://www.childactor101.com/101-blog/is-my-child-ready-for-an-agent-a-parents-guide-to-knowing-the-right-time | https://www.childactor101.com/101-blog/is-my-child-ready-for-an-agent-a-parents-guide-to-knowing-the-right-time | Migrated |
| https://www.childactor101.com/101-blog/is-your-child-ready-for-an-agent-a-guide-for-parents-of-aspiring-young-actors | https://www.childactor101.com/101-blog/is-your-child-ready-for-an-agent-a-guide-for-parents-of-aspiring-young-actors | Migrated |
| https://www.childactor101.com/101-blog/momager | https://www.childactor101.com/101-blog/momager | Migrated |
| https://www.childactor101.com/101-blog/navigating-hollywood-do-you-need-a-talent-agent-or-a-manager | https://www.childactor101.com/101-blog/navigating-hollywood-do-you-need-a-talent-agent-or-a-manager | Migrated |
| https://www.childactor101.com/101-blog/ready-to-wow-agents-and-managers-inside-tips-to-ace-your-meeting | https://www.childactor101.com/101-blog/ready-to-wow-agents-and-managers-inside-tips-to-ace-your-meeting | Migrated |
| https://www.childactor101.com/101-blog/seeking-representation-vs-casting-resumes-what-parents-must-know | https://www.childactor101.com/101-blog/seeking-representation-vs-casting-resumes-what-parents-must-know | Migrated |
| https://www.childactor101.com/101-blog/stop-read-this-before-changing-your-childs-representation | https://www.childactor101.com/101-blog/stop-read-this-before-changing-your-childs-representation | Migrated |
| https://www.childactor101.com/101-blog/submitting-a-child-actor-to-an-agent-or-manager-for-representationnbsp | https://www.childactor101.com/101-blog/submitting-a-child-actor-to-an-agent-or-manager-for-representationnbsp | Migrated |
| https://www.childactor101.com/101-blog/talent-rep-contracts-the-not-so-glamorous-side-of-showbiz | https://www.childactor101.com/101-blog/talent-rep-contracts-the-not-so-glamorous-side-of-showbiz | Migrated |
| https://www.childactor101.com/101-blog/temporary-no-why-rejection-from-talent-reps-isnt-the-end-of-the-road | https://www.childactor101.com/101-blog/temporary-no-why-rejection-from-talent-reps-isnt-the-end-of-the-road | Migrated |
| https://www.childactor101.com/101-blog/Temporary-no | https://www.childactor101.com/101-blog/Temporary-no | Migrated |
| https://www.childactor101.com/101-blog/the-multifaceted-world-of-a-talent-manager-juggling-dreams-and-deadlines | https://www.childactor101.com/101-blog/the-multifaceted-world-of-a-talent-manager-juggling-dreams-and-deadlines | Migrated |
| https://www.childactor101.com/101-blog/understanding-talent-rep-commissions-in-the-entertainment-industry | https://www.childactor101.com/101-blog/understanding-talent-rep-commissions-in-the-entertainment-industry | Migrated |
| https://www.childactor101.com/101-blog/what-a-manager-really-does-and-doesnt-do-for-a-child-actor | https://www.childactor101.com/101-blog/what-a-manager-really-does-and-doesnt-do-for-a-child-actor | Migrated |
| https://www.childactor101.com/101-blog/a-rundown-on-child-labor-laws-in | https://www.childactor101.com/101-blog/a-rundown-on-child-labor-laws-in | Migrated |
| https://www.childactor101.com/101-blog/bad-influence-big-questions-what-the-netflix-doc-and-new-laws-reveal-about-child-fame-in-2025 | https://www.childactor101.com/101-blog/bad-influence-big-questions-what-the-netflix-doc-and-new-laws-reveal-about-child-fame-in-2025 | Migrated |
| https://www.childactor101.com/101-blog/behind-the-scenes-at-nickelodeon-a-tragic-look-at-the-dark-side-of-kids-tv | https://www.childactor101.com/101-blog/behind-the-scenes-at-nickelodeon-a-tragic-look-at-the-dark-side-of-kids-tv | Migrated |
| https://www.childactor101.com/101-blog/the-new-hollywood-casting-scam-every-parent-needs-to-know-about | https://www.childactor101.com/101-blog/the-new-hollywood-casting-scam-every-parent-needs-to-know-about | Migrated |
| https://www.childactor101.com/101-blog/the-scoop-on-sb-764-californias-child-content-creator-rights-act | https://www.childactor101.com/101-blog/the-scoop-on-sb-764-californias-child-content-creator-rights-act | Migrated |
| https://www.childactor101.com/101-blog/tiktok-and-your-child-actor-a-guide-to-creativity-connection-and-safety | https://www.childactor101.com/101-blog/tiktok-and-your-child-actor-a-guide-to-creativity-connection-and-safety | Migrated |
| https://www.childactor101.com/101-blog/what-is-a-coogan-account-and-do-i-need-one-for-my-child-actor | https://www.childactor101.com/101-blog/what-is-a-coogan-account-and-do-i-need-one-for-my-child-actor | Migrated |
| https://www.childactor101.com/101-blog/your-ultimate-guide-to-protecting-your-child-actor-in-california | https://www.childactor101.com/101-blog/your-ultimate-guide-to-protecting-your-child-actor-in-california | Migrated |
| https://www.childactor101.com/101-blog/background-acting-the-pros-and-cons-for-young-performers | https://www.childactor101.com/101-blog/background-acting-the-pros-and-cons-for-young-performers | Migrated |
| https://www.childactor101.com/101-blog/the-2025-hollywood-slowdown-what-child-actors-need-to-know-and-how-to-stay-ready | https://www.childactor101.com/101-blog/the-2025-hollywood-slowdown-what-child-actors-need-to-know-and-how-to-stay-ready | Migrated |
| https://www.childactor101.com/101-blog/the-acting-industry-in-2026-whats-changed-amp-what-hasnt | https://www.childactor101.com/101-blog/the-acting-industry-in-2026-whats-changed-amp-what-hasnt | Migrated |
| https://www.childactor101.com/101-blog/the-tv-role-hierarchy-from-background-to-series-regular | https://www.childactor101.com/101-blog/the-tv-role-hierarchy-from-background-to-series-regular | Migrated |
| https://www.childactor101.com/101-blog/what-is-pilot-season-how-streaming-services-have-changed-the-game-and-what-it-means-for-your-child-actor | https://www.childactor101.com/101-blog/what-is-pilot-season-how-streaming-services-have-changed-the-game-and-what-it-means-for-your-child-actor | Migrated |
| https://www.childactor101.com/101-blog/what-it-takes | https://www.childactor101.com/101-blog/what-it-takes | Migrated |
| https://www.childactor101.com/101-blog/when-should-my-child-start-acting-training-a-parents-guide-to-the-right-age | https://www.childactor101.com/101-blog/when-should-my-child-start-acting-training-a-parents-guide-to-the-right-age | Migrated |
| https://www.childactor101.com/101-blog/acting-with-heart-how-empathy-builds-unforgettable-performances | https://www.childactor101.com/101-blog/acting-with-heart-how-empathy-builds-unforgettable-performances | Migrated |
| https://www.childactor101.com/101-blog/Beats | https://www.childactor101.com/101-blog/Beats | Migrated |
| https://www.childactor101.com/101-blog/charisma | https://www.childactor101.com/101-blog/charisma | Migrated |
| https://www.childactor101.com/101-blog/kid-actors-learn-the-mission-of-the-scene | https://www.childactor101.com/101-blog/kid-actors-learn-the-mission-of-the-scene | Migrated |
| https://www.childactor101.com/101-blog/learning-to-own-yourself-how-charisma-counts-helps-actors-shine | https://www.childactor101.com/101-blog/learning-to-own-yourself-how-charisma-counts-helps-actors-shine | Migrated |
| https://www.childactor101.com/101-blog/lessons-for-child-actors-how-to-deliver-an-honest-performance | https://www.childactor101.com/101-blog/lessons-for-child-actors-how-to-deliver-an-honest-performance | Migrated |
| https://www.childactor101.com/101-blog/level-up-your-teen-acting-game-slay-your-scene-study | https://www.childactor101.com/101-blog/level-up-your-teen-acting-game-slay-your-scene-study | Migrated |
| https://www.childactor101.com/101-blog/memorization-killed-the-rising-child-star | https://www.childactor101.com/101-blog/memorization-killed-the-rising-child-star | Migrated |
| https://www.childactor101.com/101-blog/method-acting-for-young-performers-balancing-immersion-and-well-being | https://www.childactor101.com/101-blog/method-acting-for-young-performers-balancing-immersion-and-well-being | Migrated |
| https://www.childactor101.com/101-blog/nonverbal-communication-is-often-overlooked-and-underdeveloped-in-young-actors | https://www.childactor101.com/101-blog/nonverbal-communication-is-often-overlooked-and-underdeveloped-in-young-actors | Migrated |
| https://www.childactor101.com/101-blog/the-secret-to-a-grounded-performance | https://www.childactor101.com/101-blog/the-secret-to-a-grounded-performance | Migrated |
| https://www.childactor101.com/101-blog/unlock-your-acting-potential-master-methods-for-young-actors | https://www.childactor101.com/101-blog/unlock-your-acting-potential-master-methods-for-young-actors | Migrated |
| https://www.childactor101.com/101-blog/advice-to-a-struggling-young-actress | https://www.childactor101.com/101-blog/advice-to-a-struggling-young-actress | Migrated |
| https://www.childactor101.com/101-blog/finding-yourself-in-the-spotlight-lessons-from-who-i-am-for-aspiring-child-actors | https://www.childactor101.com/101-blog/finding-yourself-in-the-spotlight-lessons-from-who-i-am-for-aspiring-child-actors | Migrated |
| https://www.childactor101.com/101-blog/navigating-the-awkward-years-how-parents-can-support-child-actors-through-puberty | https://www.childactor101.com/101-blog/navigating-the-awkward-years-how-parents-can-support-child-actors-through-puberty | Migrated |
| https://www.childactor101.com/101-blog/the-critical-conversation | https://www.childactor101.com/101-blog/the-critical-conversation | Migrated |
| https://www.childactor101.com/101-blog/the-right-role-will-find-you-stay-true-to-yourself-in-the-acting-journey | https://www.childactor101.com/101-blog/the-right-role-will-find-you-stay-true-to-yourself-in-the-acting-journey | Migrated |
| https://www.childactor101.com/101-blog/when-rejection-stings-helping-your-child-actor-bounce-back | https://www.childactor101.com/101-blog/when-rejection-stings-helping-your-child-actor-bounce-back | Migrated |
| — | https://www.childactor101.com/101-blog/mldf95lqakcsomlznk87fhgl0ls1um | Extra (not in inventory) |
| — | https://www.childactor101.com/101-blog/the-free-nationwide-talent-representation-open-call-details | Extra (not in inventory) |
