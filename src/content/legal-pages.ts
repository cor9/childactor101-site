export type LegalCopySection = {
  title: string;
  paragraphs?: readonly string[];
  bullets?: readonly string[];
};

export type LegalFeature = {
  title: string;
  description: string;
};

export type LegalFaq = {
  question: string;
  answer: string;
};

export type LegalResourceGroup = {
  heading: string;
  items: readonly string[];
};

export const legalFooterMeta = [
  {
    label: "California Child Services Permit",
    value: "#000281809",
  },
  {
    label: "Bonded and insured",
    value: "#57BSBJE4765",
  },
] as const;

export const privacyPolicyLastUpdated = "September 30, 2025";

export const privacyPolicyIntro = [
  "This Privacy Policy describes how Child Actor 101 (\"Company,\" \"we,\" \"us,\" \"our\") collects, uses, and shares information in connection with our websites and services, including childactor101.com and the Child Actor 101 Directory at directory.childactor101.com (collectively, the \"Service\").",
  "By using the Service, you agree to the practices described here.",
];

export const privacyPolicySections: readonly LegalCopySection[] = [
  {
    title: "1) What this covers",
    paragraphs: ["This policy applies to:"],
    bullets: [
      "The main site (childactor101.com), the Directory (directory.childactor101.com), vendor dashboards, and related forms including Suggest a Vendor.",
      "Our newsletters and transactional emails such as account, billing, and review notifications.",
      "This service is intended for adults, including parents, guardians, and professionals. We do not knowingly collect personal information from children under 13.",
    ],
  },
  {
    title: "2) Information we collect",
    paragraphs: ["You provide:"],
    bullets: [
      "Account data: name, email, password or email for magic links, role, and profile details.",
      "Vendor data: listing name, descriptions, categories, logo or images, location, contact information, promos, and claim or upgrade submissions.",
      "Reviews: star ratings and comments you post, which become public once approved.",
      "Support and request data: messages and preferences.",
      "Collected automatically: device and usage information such as IP address, browser, pages viewed, timestamps, referral, and cookies or pixels used for session management, fraud prevention, and analytics.",
      "From third parties: subscription and billing status from Stripe, form submissions via Airtable for vendor suggestions if enabled, and hosting or analytics events from infrastructure providers.",
    ],
  },
  {
    title: "3) How we use information",
    bullets: [
      "Provide and secure the Service, including auth, sessions, Row Level Security access controls, and fraud prevention.",
      "Run directory operations, including vendor listings, approved reviews, search and filtering, and claim or upgrade workflows.",
      "Send communications such as transactional emails and optional newsletters.",
      "Create and manage subscriptions and invoices through Stripe.",
      "Diagnose issues, measure usage, and improve features.",
      "Enforce terms, protect rights, and respond to lawful requests.",
    ],
  },
  {
    title: "4) Processing bases",
    paragraphs: [
      "We process information to perform a contract such as your account or subscription, with your consent for marketing, for legitimate interests such as security and product improvement, and to comply with law.",
    ],
  },
  {
    title: "5) Disclosures (service providers and others)",
    paragraphs: ["We share personal information with:"],
    bullets: [
      "Stripe for subscriptions and invoices.",
      "Hosting, build, CDN, monitoring, email delivery, and error logging providers.",
      "Supabase for auth, profiles, and RLS, and Airtable for vendor suggestions if enabled.",
      "Email marketing providers such as Mailchimp if you opt into newsletters.",
      "The public, when vendor listings and approved reviews are published.",
      "Legal or transactional recipients if required by law, needed to protect rights, or during a merger or sale.",
      "We require processors to handle data under confidentiality and only as instructed.",
    ],
  },
  {
    title: "6) Sell or Share (CCPA/CPRA)",
    paragraphs: [
      "We do not sell or share personal information as defined by the California Consumer Privacy Act as amended by the CPRA. We also do not use cross-context behavioral advertising. If this changes, we will update this policy and provide an opt-out mechanism.",
    ],
  },
  {
    title: "7) Cookies and similar technologies",
    paragraphs: [
      "We use essential cookies for sessions and security and non-essential cookies or pixels for analytics. You can control cookies through your browser. We do not use Flash cookies, and the Service does not respond to Do Not Track signals.",
    ],
  },
  {
    title: "8) Data retention",
    bullets: [
      "Account and profile information is kept for the life of your account and a reasonable period after closure.",
      "Listings and reviews are retained while published or needed for moderation and records.",
      "Billing and related records are typically kept for seven years for tax and accounting needs.",
      "We may anonymize or aggregate data for longer retention.",
    ],
  },
  {
    title: "9) Security",
    paragraphs: [
      "We use reasonable administrative, technical, and organizational safeguards, including encryption in transit, least-privilege access, Supabase Row Level Security, and periodic access reviews. No system is 100 percent secure.",
    ],
  },
  {
    title: "10) International transfers",
    paragraphs: [
      "Our providers may process data in the United States and other countries. We take steps to ensure appropriate protections for those transfers.",
    ],
  },
  {
    title: "11) Your choices and rights",
    bullets: [
      "Email preferences: use unsubscribe links in non-transactional emails.",
      "Access, correction, and deletion: email us to exercise your rights.",
      "California residents may have rights to know, delete, correct, portability, and freedom from discrimination. Because we do not sell or share, opt-out of sale or share does not apply.",
      "We verify your request, and agent authority if applicable, before acting. We aim to respond within 45 days, extendable as permitted.",
    ],
  },
  {
    title: "12) Children's privacy",
    paragraphs: [
      "The Service is not directed to children under 13, and we do not knowingly collect their personal information. If you believe a child provided personal information, contact us so it can be deleted.",
    ],
  },
  {
    title: "13) Third-party links",
    paragraphs: [
      "External sites have their own policies. We are not responsible for their practices.",
    ],
  },
  {
    title: "14) Changes",
    paragraphs: [
      "We may update this policy. We will change the Last updated date and, when appropriate, notify you.",
    ],
  },
  {
    title: "15) Contact",
    bullets: [
      "Privacy requests and questions: privacy@childactor101.com",
      "If you prefer, you can also email Corey@childactor101.com",
    ],
  },
];

export const ab1319Intro = [
  "Protecting families from predatory talent services is essential in today's entertainment industry. California's AB 1319, commonly called the Krekorian Act, was created to prevent scams targeting actors, especially young performers and their families.",
];

export const ab1319SimpleVersion = [
  "This California law regulates how companies can offer paid services related to the entertainment industry. It specifically targets businesses that charge advance fees for things like auditions, representation, showcases, and photography without proper legal structure or disclosure.",
  "The bill was signed into law in 2009 by Governor Arnold Schwarzenegger to address a surge in fraudulent talent businesses that were taking thousands of dollars from families with empty promises of stardom.",
];

export const ab1319WhyItMatters =
  "Before AB 1319, families could lose $5,000 to $15,000 to companies that promised a child would be discovered but delivered nothing. This law created real consequences for scammers.";

export const ab1319Protections: readonly LegalFeature[] = [
  {
    title: "No advance fees for employment opportunities",
    description:
      "A legitimate service provider cannot legally charge money upfront for access to auditions, casting calls, or job opportunities before they actually happen.",
  },
  {
    title: "Transparency and disclosure required",
    description:
      "Companies offering talent services must provide detailed written contracts, clear refund policies, and honest information about what they are actually offering.",
  },
  {
    title: "$50,000 bond requirement",
    description:
      "Service providers must post a $50,000 surety bond with the California Labor Commissioner so families have a path to recover money if the business commits fraud or fails to deliver services.",
  },
  {
    title: "Private right of action",
    description:
      "Families who get scammed may be able to sue the company and potentially recover money, attorney's fees, and additional damages.",
  },
];

export const ab1319AppliesTo = [
  "Talent managers and agents, though legitimate agents work on commission rather than upfront fees.",
  "Photographers and demo reel creators who market specifically to aspiring performers.",
  "Acting coaches and workshop providers who promise industry connections.",
  "Online casting subscription services.",
  "Talent showcases or open calls that charge participation fees.",
  "Companies offering representation packages that bundle coaching with agency services.",
];

export const ab1319RedFlags = [
  "Guaranteed auditions for an upfront fee.",
  "Showcase companies that promise exposure but will not share who is actually attending.",
  "Agents who want payment before booking work.",
  "Coaching programs tied to representation with no clear separation of services.",
  "High-pressure sales tactics such as this offer expires today.",
  "Companies that discovered your child at a mall, fair, or through unsolicited contact.",
];

export const ab1319LegitVsScam = {
  legit: [
    "Real talent agents earn 10 to 20 percent commission only when work is booked.",
    "Professional photographers charge flat fees for specific services, not fame packages.",
    "Acting coaches focus on skill development, not promising industry connections.",
    "Casting websites charge reasonable monthly fees with clear terms.",
    "Legitimate showcases can identify attendees and show that industry professionals regularly attend.",
  ],
  scam: [
    "Promise specific outcomes they cannot control.",
    "Require large upfront payments.",
    "Bundle multiple services into confusing packages.",
    "Use fake testimonials or staged success stories.",
    "Pressure you to sign immediately.",
    "Cannot provide bond information when asked.",
  ],
};

export const ab1319VerifySteps = [
  "Ask to see the bond certificate or get the bond number.",
  "Verify registration with the California Department of Industrial Relations.",
  "Search for complaints through the Better Business Bureau and other review sources.",
  "Ask for recent client references, not only testimonials on the company's website.",
  "Get refund policies and deliverables in writing.",
];

export const ab1319VerifyTip =
  "If a company hesitates to show its bond certificate or registration information, treat that as a major red flag.";

export const ab1319IfScammed = [
  "Document everything, including contracts, emails, receipts, and messages.",
  "File a complaint with the California Labor Commissioner.",
  "Report the issue to the California Attorney General consumer protection channels.",
  "Consider legal action, since AB 1319 allows claims for damages and attorney's fees.",
  "If a bond exists, file a claim against it for recovery.",
];

export const ab1319Faqs: readonly LegalFaq[] = [
  {
    question: "Does this law apply to online services or only California-based companies?",
    answer:
      "AB 1319 applies to companies offering talent services to California residents, even if the company is based elsewhere. Enforcement can be more difficult with out-of-state businesses.",
  },
  {
    question: "Are acting classes and workshops covered by this law?",
    answer:
      "Pure education generally is not. But when a workshop promises industry connections, auditions, or representation opportunities for additional fees, it likely falls under AB 1319.",
  },
  {
    question: "What is the difference between a talent agent and a talent manager under this law?",
    answer:
      "Licensed talent agents are regulated separately and generally charge commission after work is booked. Managers charging upfront fees while offering specific opportunity-based services must comply with AB 1319.",
  },
  {
    question: "My child was scouted at a mall. Is that automatically a scam?",
    answer:
      "Not automatically, but it is highly suspicious. If the contact turns into pressure to pay for photos, classes, or representation, families should slow down and verify everything before proceeding.",
  },
  {
    question: "Can companies charge for headshots and still be legitimate?",
    answer:
      "Yes, context matters. A photographer charging a normal fee for headshots is different from a discovery package promising exposure or representation.",
  },
  {
    question: "What if the company is based outside California?",
    answer:
      "If it offers services to California residents, AB 1319 still matters, but practical enforcement may be weaker. That makes due diligence even more important.",
  },
];

export const ab1319SuccessPath = [
  "Quality training and skill development.",
  "A professional portfolio including headshots and demo materials.",
  "Submitting to legitimate casting calls and agencies.",
  "Networking inside the industry.",
  "Starting small and building over time.",
];

export const ab1319Resources: readonly LegalResourceGroup[] = [
  {
    heading: "Official government resources",
    items: [
      "Full Text of AB 1319 - California Legislative Information",
      "California Division of Labor Standards Enforcement (DLSE)",
      "AB 1319 Implementation Details - DLSE",
      "California Attorney General talent agency scam information",
      "California Department of Industrial Relations",
    ],
  },
  {
    heading: "Report scams and violations",
    items: [
      "Better Business Bureau Scam Tracker",
      "Better Business Bureau search tools",
      "FBI Internet Crime Complaint Center (IC3)",
      "Federal Trade Commission fraud reporting",
    ],
  },
  {
    heading: "Industry and research references",
    items: [
      "SAG-AFTRA franchised talent agents directory",
      "SAG-AFTRA anti-scam information",
      "Backstage industry advice and background articles",
      "BizParentz Foundation AB 1319 information",
      "Bonnie Gillespie AB 1319 compliance guide",
      "BBB study on job scams",
      "FBI IC3 annual internet crime report",
    ],
  },
];

export const ab1660Intro = [
  "When your child steps onto a set, safety and supervision are non-negotiable. AB 1660 ensures that professionals working with minors in the entertainment industry are vetted through background checks and held to legal standards.",
];

export const ab1660Overview = [
  "Passed in 2012, California's Child Performer Protection Act requires background checks and permits for adults who work with child performers in a paid capacity. That includes photographers, acting coaches, managers, and service providers offering career support to a minor actor.",
];

export const ab1660WhyItExists =
  "Prior to this law, convicted sex offenders were able to re-enter the entertainment industry as managers, publicists, and teachers. High-profile abuse cases helped drive the law forward.";

export const ab1660Requirements = [
  "Apply for a Child Performer Services Permit.",
  "Submit to a LiveScan background check with FBI-level fingerprinting.",
  "Be cleared through the California Department of Justice.",
  "Pay a $198 application fee plus fingerprinting costs.",
  "Renew every two years for $166.",
];

export const ab1660CoveredServices = [
  "Still photography, digital photography, video, and film services used for a performer's career.",
  "Acting, modeling, voice, singing, or dance coaching.",
  "Talent management or career counseling.",
  "Seminars, workshops, or instruction related to getting hired as a performer.",
  "Camp counselors, coaches, and instructors at performance-related camps.",
  "Publicists managing a child performer's reputation and media presence.",
];

export const ab1660Exemptions = [
  "Parents or guardians when not working for pay.",
  "School or church events that are not commercially motivated.",
  "Studio teachers already certified by the Labor Commissioner.",
  "Licensed talent agents regulated under separate laws.",
  "People with only incidental contact with minors, such as equipment rental companies.",
  "Locations where parents must be present and within sight or sound at all times.",
];

export const ab1660SafetyAlert =
  "No person required to register as a sex offender may represent or provide covered services to any minor artist. This is a complete ban.";

export const ab1660VerificationSteps = [
  'Ask the provider directly: "Do you hold a current California Child Performer Services Permit?"',
  "If they cannot show proof, do not hire them.",
  "Search the official California Child Performer Services Permit database.",
  "Confirm the permit is posted conspicuously at their place of business.",
];

export const ab1660ComplianceReality =
  "Investigative reporting has shown that entertainment professionals do not always comply automatically. Parents should verify the permit every time rather than assuming someone has already handled it.";

export const ab1660Penalties = [
  "Operating without a permit is a misdemeanor in California.",
  "Fines can reach up to $10,000 per violation.",
  "Willful violations can carry up to one year in county jail.",
  "Injured parties may bring civil lawsuits for damages and injunctive relief.",
  "Punitive damages may be awarded when violations are willful.",
];

export const ab1660Faqs: readonly LegalFaq[] = [
  {
    question: "My child takes online acting classes with a coach from another state. Do they need a permit?",
    answer:
      "If they are offering paid services to a California-based child, the permit requirement still matters. The provider's location does not erase the safety expectation for California minors.",
  },
  {
    question: "What about photographers who only take headshots?",
    answer:
      "If the photography is specifically tied to the child's entertainment career, the permit requirement can apply. A general family portrait session is a different context.",
  },
  {
    question: "Does the permit guarantee the person is safe to work with my child?",
    answer:
      "No permit can guarantee character. It does mean the provider passed the background-check threshold required by law, but parents still need supervision, boundaries, and open communication.",
  },
  {
    question: "What if someone says they are about to get their permit?",
    answer:
      "Do not proceed until the permit is active and verifiable. The application process can take weeks, and the safe answer is no permit, no work.",
  },
  {
    question: "Are there different rules for different types of entertainment work?",
    answer:
      "The rule is broad: if someone is being paid to help a minor succeed in entertainment, families should assume permit verification matters unless a clear exemption applies.",
  },
  {
    question: "What should I do if I discover someone working with my child does not have a permit?",
    answer:
      "Stop the relationship immediately and report it to California CPS licensing. Depending on the situation, you may also have grounds for legal action.",
  },
];

export const ab1660ApplicationSteps = [
  "Complete the application online or by mail.",
  "Pay the $198 fee plus fingerprinting costs.",
  "Get LiveScan fingerprinting at an approved location.",
  "Wait for the FBI background check, which may take around 45 days.",
  "Receive the permit if cleared and post it visibly in the workplace.",
  "Renew every two years for $166.",
];

export const ab1660SafetyPractices = [
  "Verify permits before signing contracts.",
  "Stay involved in your child's professional interactions.",
  "Maintain open communication about every experience.",
  "Trust your instincts and investigate anything that feels off.",
  "Build a network of other entertainment parents for perspective.",
  "Keep copies of permits, contracts, and communications.",
];

export const ab1660Resources: readonly LegalResourceGroup[] = [
  {
    heading: "Official government resources",
    items: [
      "California DIR Child Performer Services Permit page",
      "Official FAQ for Child Performer Services Permits",
      "Search Child Performer Services Permit Database",
      "Full Bill Text - AB 1660",
      "AB 1660 regulations detail",
    ],
  },
  {
    heading: "Contact and reporting",
    items: [
      "CPS licensing questions: cpslicensing@dir.ca.gov",
      "CPS licensing phone: 510-285-2123",
      "LiveScan and fingerprint background check information",
      "Better Business Bureau scam reporting",
    ],
  },
  {
    heading: "Industry and education references",
    items: [
      "BizParentz Foundation AB 1660 information",
      "SAG-AFTRA resources on protecting young performers",
      "Industry panel materials on AB 1660",
      "Deadline investigation on enforcement issues",
      "Backstage guides on child entertainment work permits",
      "California child labor law guides",
    ],
  },
];
