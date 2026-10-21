/**
 * Permanent redirects from the legacy Squarespace blog (/101-blog/...) to the
 * classroom lessons that were built from those exact articles.
 *
 * Only verified, same-topic destinations belong here. The full audit of all
 * 155 legacy URLs, including the ones intentionally left unredirected, lives in
 * docs/seo/legacy-blog-migration-map.md.
 */
export interface LegacyBlogRedirect {
  /** Legacy slug as published under /101-blog/ (case preserved). */
  legacySlug: string;
  destination: string;
}

export const LEGACY_BLOG_INDEX_DESTINATION = "/from-the-classroom";

export const legacyBlogRedirects: LegacyBlogRedirect[] = [
  {
    legacySlug: "what-it-takes",
    destination: "/from-the-classroom/start-here/what-it-takes-to-be-a-successful-child-actor",
  },
  {
    legacySlug: "background-acting-the-pros-and-cons-for-young-performers",
    destination: "/from-the-classroom/start-here/background-acting-pros-and-cons-for-young-performers",
  },
  {
    legacySlug: "when-should-my-child-start-acting-training-a-parents-guide-to-the-right-age",
    destination: "/from-the-classroom/start-here/when-should-my-child-start-acting-training",
  },
  {
    legacySlug: "navigating-hollywood-do-you-need-a-talent-agent-or-a-manager",
    destination: "/from-the-classroom/representation/agents-vs-managers-for-child-actors",
  },
  {
    legacySlug: "is-my-child-ready-for-an-agent-a-parents-guide-to-knowing-the-right-time",
    destination: "/from-the-classroom/representation/is-my-child-ready-for-an-agent",
  },
  {
    // Duplicate article answering the same agent-readiness question.
    legacySlug: "is-your-child-ready-for-an-agent-a-guide-for-parents-of-aspiring-young-actors",
    destination: "/from-the-classroom/representation/is-my-child-ready-for-an-agent",
  },
  {
    legacySlug: "understanding-talent-rep-commissions-in-the-entertainment-industry",
    destination: "/from-the-classroom/representation/understanding-talent-rep-commissions",
  },
  {
    legacySlug: "booking-out-a-critical-practice-for-child-actors-in-the-entertainment-industry",
    destination: "/from-the-classroom/representation/booking-out-for-child-actors",
  },
  {
    legacySlug: "self-tape-equipment-for-child-actors",
    destination: "/from-the-classroom/auditions/self-tape-equipment-for-child-actors",
  },
  {
    legacySlug: "what-makes-a-child-actors-self-tape-audition-competitive",
    destination: "/from-the-classroom/auditions/what-makes-a-child-actors-self-tape-competitive",
  },
  {
    legacySlug:
      "headshot-hacks-mastering-the-no-makeup-look-for-your-child-actor-essential-makeup-tips-for-perfect-photos",
    destination: "/from-the-classroom/professional-materials/headshot-prep-no-makeup-look-for-child-actor-photos",
  },
  {
    legacySlug: "Actorsaccess",
    destination: "/from-the-classroom/professional-materials/actors-access-for-parents-of-child-actors",
  },
  {
    legacySlug: "2022budget",
    destination: "/from-the-classroom/parent-operations/child-acting-budget-what-families-really-spend",
  },
  {
    legacySlug: "tax-guide-for-parents-of-child-actors-navigating-taxes-without-losing-your-marbles",
    destination: "/from-the-classroom/parent-operations/tax-guide-for-parents-of-child-actors",
  },
  {
    legacySlug: "when-rejection-stings-helping-your-child-actor-bounce-back",
    destination: "/from-the-classroom/wellness-resilience/when-rejection-stings-helping-your-child-actor-bounce-back",
  },
  {
    legacySlug: "the-new-hollywood-casting-scam-every-parent-needs-to-know-about",
    destination: "/from-the-classroom/safety-ethics/the-new-hollywood-casting-scam-every-parent-needs-to-know-about",
  },
  {
    legacySlug: "what-is-a-coogan-account-and-do-i-need-one-for-my-child-actor",
    destination: "/from-the-classroom/safety-ethics/what-is-a-coogan-account",
  },
  {
    legacySlug: "a-rundown-on-child-labor-laws-in",
    destination: "/from-the-classroom/safety-ethics/child-labor-laws-for-child-actors",
  },
  {
    legacySlug: "tiktok-and-your-child-actor-a-guide-to-creativity-connection-and-safety",
    destination: "/from-the-classroom/safety-ethics/tiktok-and-your-child-actor-safety",
  },
  {
    legacySlug: "olympic-level-training-for-aspiring-young-actors-why-consistency-is-key",
    destination: "/from-the-classroom/career-growth/why-consistent-training-matters-for-young-actors",
  },
];
