export type LegalSection = {
  eyebrow: string;
  title: string;
  paragraphs?: readonly string[];
  listType?: "ordered" | "unordered";
  items?: readonly string[];
  closingParagraphs?: readonly string[];
  noticeText?: string;
};

export const informationAdviceParagraphs = [
  "Any views or opinions represented on this site are personal and belong solely to Child Actor 101 unless explicitly stated otherwise.",
  "Any views or opinions are not intended to malign any religion, ethnic group, club, organization, company, or individual.",
  "All content provided on this site is for informational purposes only. Child Actor 101 makes no representations as to the accuracy or completeness of any information on this site or found by following any link on this site.",
  "Child Actor 101 will not be liable for any errors or omissions in this information, nor for the availability of this information. Child Actor 101 will not be liable for any losses, injuries, or damages from the display or use of this information.",
];

export const fairUseIntroParagraphs = [
  "This site may contain copyrighted material, the use of which has not always been specifically authorized by the copyright owner. This site is for educational purposes only.",
  "Copyright Disclaimer under section 107 of the Copyright Act 1976: allowance is made for fair use for purposes such as criticism, comment, news reporting, teaching, scholarship, education, and research.",
  "Fair use is a use permitted by copyright statute that might otherwise be infringing.",
  "Non-profit, educational, or personal use tips the balance in favor of fair use.",
];

export const fairUseDefinitionParagraphs = [
  "Source: wikipedia.org/wiki/Fair_use",
  "Fair use is a doctrine in United States copyright law that allows limited use of copyrighted material without requiring permission from the rights holders, such as for commentary, criticism, news reporting, research, teaching, or scholarship.",
  "It provides for the legal, non-licensed citation or incorporation of copyrighted material in another author's work under a four-factor balancing test.",
  "A similar principle, fair dealing, exists in some other common law jurisdictions. Civil law jurisdictions have other limitations and exceptions to copyright.",
];

export const copyrightOfficeParagraphs = [
  "Source: copyright.gov/fls/fl102.html",
  "One of the rights accorded to the owner of copyright is the right to reproduce or to authorize others to reproduce the work in copies or phonorecords.",
  "That right is subject to certain limitations found in sections 107 through 118 of the copyright law (title 17, U.S. Code). One of the more important limitations is the doctrine of fair use.",
  "The doctrine of fair use has developed through a substantial number of court decisions over the years and has been codified in section 107 of the copyright law.",
  "Section 107 contains a list of the various purposes for which the reproduction of a particular work may be considered fair, such as criticism, comment, news reporting, teaching, scholarship, and research.",
];

export const fairUseFactors = [
  "The purpose and character of the use, including whether the use is of a commercial nature or is for nonprofit educational purposes.",
  "The nature of the copyrighted work.",
  "The amount and substantiality of the portion used in relation to the copyrighted work as a whole.",
  "The effect of the use upon the potential market for, or value of, the copyrighted work.",
];

export const fairUseAdditionalGuidance = [
  "The distinction between fair use and infringement may be unclear and not easily defined. There is no specific number of words, lines, or notes that may safely be taken without permission. Acknowledging the source of copyrighted material does not substitute for obtaining permission.",
  'Examples courts have regarded as fair use include quotation of excerpts in a review or criticism, quotation of short passages in a scholarly or technical work, use in a parody, summary of an address or article with brief quotations in a news report, reproduction by a library to replace part of a damaged copy, reproduction by a teacher or student to illustrate a lesson, reproduction in legislative or judicial proceedings, and incidental reproduction in a newsreel or broadcast.',
  "Copyright protects the particular way an author has expressed an idea. It does not extend to ideas, systems, or factual information conveyed in the work.",
  "The safest course is always to get permission from the copyright owner before using copyrighted material. The Copyright Office cannot give that permission.",
  "When it is impracticable to obtain permission, use of copyrighted material should be avoided unless the doctrine of fair use would clearly apply to the situation. The Copyright Office can neither determine whether a certain use may be considered fair nor advise on possible copyright violations. If there is doubt, consult an attorney.",
];

export const noImpliedContractParagraphs = [
  "Obtaining advice, career consultation, talent evaluation, participating in an acting skills class, or receiving private coaching does not imply a contract or favor in obtaining talent representation by an instructor who is also a talent manager.",
];

export const permitDetails = [
  {
    label: "California Child Services Permit",
    value: "#000281809",
  },
  {
    label: "Bond",
    value: "$50,000 - Bond #72170719",
  },
  {
    label: "Business Insurance",
    value: "Provided by NEXT Insurance",
  },
];

export const californiaDisclosureParagraphs = [
  "Some services provided by Child Actor 101, Ingenuity Actor's Studio, and Rescue Reader by Ralston Entertainment, LLC fall under the category of talent counseling services under Chapter 4.5 of the California Labor Code.",
  "For covered services, clients may be asked to acknowledge contract terms and provide an electronic signature before services begin.",
  "The legal notice below is presented here in the redesigned format for clarity and recordkeeping.",
];

export const californiaAcknowledgementNotice = [
  "By signing below, I acknowledge that the fee I pay to Ralston Entertainment, LLC is for career counseling, vocational guidance, aptitude testing, career evaluation as an artist, personal coaching, group seminars, workshops, or similar training only.",
  'If you have completed your transaction to pay for services with Ralston Entertainment, LLC, you are required to acknowledge contract terms and create an "electronic signature" before services can begin.',
  "Read through and acknowledge the following from the State of California regarding advanced-fee services given to youth talent.",
];

export const californiaLegalSections: readonly LegalSection[] = [
  {
    eyebrow: "Section 1",
    title: "Legislative findings and purpose",
    paragraphs: [
      "The Legislature finds that, in connection with a substantial number of contracts for talent services, sales practices and business and financing methods have worked fraud, deceit, imposition, and financial hardship upon the people of California, particularly upon children and other minors.",
      "The stated purpose of the act is to safeguard the public against fraud, deceit, imposition, and financial hardship, and to foster fair dealing and competition in talent services by prohibiting false or misleading advertising and other dishonest or deceptive business practices.",
      "Nothing in the act is intended to prohibit talent training services, talent counseling services, or talent listing services from conducting business so long as they comply with the provisions and prohibitions set forth in the act.",
    ],
  },
  {
    eyebrow: "Sections 2-3",
    title: "Chapter repeal and replacement",
    paragraphs: [
      "Chapter 4.5 (commencing with Section 1701) of Part 6 of Division 2 of the Labor Code is repealed and replaced with Chapter 4.5, Fee-Related Talent Services.",
    ],
  },
  {
    eyebrow: "Article 1",
    title: "Definitions",
    listType: "ordered",
    items: [
      '"Artist" means a person who is or seeks to become an actor, actress, model, extra, radio artist, musical artist, musical organization, director, musical director, writer, cinematographer, composer, lyricist, arranger, or another person rendering professional services in motion picture, theatrical, radio, television, Internet, print media, or other entertainment enterprises or technologies.',
      '"Audition" means any activity for the purpose of obtaining employment, compensated or not, as an artist whereby an artist meets with, interviews, performs before, or displays talent before any producer, director, casting director, or related representative. An audition may be in person or through electronic means, live or recorded.',
      '"Employment opportunity" means the opportunity to obtain work as an artist, whether compensated or not.',
      '"Fee" means any money or other valuable consideration paid or promised to be paid by or on behalf of an artist for services rendered or to be rendered by any person conducting business under this chapter, subject to statutory exclusions.',
      '"Talent counseling service" means a person who does not manage or direct the development of an artist\'s career and who, for a fee, provides or offers career counseling, vocational guidance, aptitude testing, or career evaluation as an artist.',
      '"Talent listing service" means a person who, for a fee, provides or offers an artist audition listings, employment opportunity listings, lists of talent agents or managers, searchable databases of those opportunities, or storage and disclosure of promotional materials or availability information for the artist.',
      '"Talent scout" means an individual employed, appointed, or authorized by a talent service to solicit or attempt to solicit an artist for the purpose of becoming a client of the service.',
      '"Talent service" means a talent counseling service, a talent listing service, or a talent training service.',
      '"Talent training service" means a person who, for a fee, provides or offers lessons, coaching, seminars, workshops, or similar training as an artist.',
    ],
  },
  {
    eyebrow: "Article 2",
    title: "Advance-fee talent representation service",
    paragraphs: [
      "No person shall own, operate, act in the capacity of, advertise, solicit for, or knowingly refer a person to an advance-fee talent representation service.",
      "An advance-fee talent representation service includes a person who charges or receives a fee for photographs, Internet websites, promotional materials, lessons, coaching, seminars, workshops, or similar training while also providing or offering to provide one or more of the following services:",
    ],
    listType: "ordered",
    items: [
      "Procuring or attempting to procure an employment opportunity or engagement as an artist.",
      "Procuring or attempting to procure an audition for an artist.",
      "Managing or directing the development of an artist's career.",
      "Procuring or attempting to procure a talent agent or talent manager, including an associate, representative, or designee thereof.",
    ],
    closingParagraphs: [
      "A person who violates Section 1702 is subject to the provisions of Article 4 (commencing with Section 1704).",
      "This article does not apply to qualifying public educational institutions, certain nonprofit organizations, labor organizations, newspapers or publications of general circulation, and other public institutions as described by statute.",
    ],
  },
  {
    eyebrow: "Article 3",
    title: "Written contract requirements",
    paragraphs: [
      "Every contract and agreement between an artist and a talent service shall be in writing, in at least 10-point type, and contain all of the following:",
    ],
    listType: "ordered",
    items: [
      "The name, address, telephone number, fax number (if any), email address (if any), and website address (if any) of the talent service, the artist receiving services, and the representative executing the contract on behalf of the talent service.",
      "A description of the services to be performed, a statement of when those services are to be provided, and the duration of the contract.",
      "Evidence of compliance with applicable bonding requirements, including the name of the bonding company and the bond number, if any, together with a statement that a bond in the amount of $50,000 must be posted with the Labor Commissioner.",
      "The amount of any fees to be charged to or collected from, or on behalf of, the artist receiving the services, and the date or dates when those fees are required to be paid.",
      "Specified boldface statements, in close proximity to the artist's signature, describing the nature of the service, the prohibition on procuring auditions or employment, and the artist's cancellation rights.",
      "A statement conspicuously disclosing whether the artist may or may not obtain a refund after the 10-business-day cancellation period has expired.",
    ],
    noticeText: `"NAME OF TALENT SERVICE" IS A TALENT COUNSELING SERVICE, TALENT LISTING SERVICE, OR TALENT TRAINING SERVICE (WHICHEVER IS APPLICABLE). THIS IS NOT A TALENT AGENCY CONTRACT. ONLY A TALENT AGENT LICENSED PURSUANT TO SECTION 1700.5 OF THE LABOR CODE MAY ENGAGE IN THE OCCUPATION OF PROCURING, OFFERING, PROMISING, OR ATTEMPTING TO PROCURE EMPLOYMENT OR ENGAGEMENTS FOR AN ARTIST.

"NAME OF TALENT SERVICE" IS PROHIBITED BY LAW FROM OFFERING OR ATTEMPTING TO OBTAIN AUDITIONS OR EMPLOYMENT FOR YOU. IT MAY ONLY PROVIDE YOU WITH TRAINING, COUNSELING, OR LISTING INFORMATION (WHICHEVER IS APPLICABLE).

FOR MORE INFORMATION, CONSULT CHAPTER 4.5 (COMMENCING WITH SECTION 1701) OF PART 6 OF DIVISION 2 OF THE LABOR CODE.

A DISPUTE ARISING OUT OF THE PERFORMANCE OF THE CONTRACT BY THE TALENT SERVICE THAT IS NOT RESOLVED TO THE SATISFACTION OF THE ARTIST SHOULD BE REFERRED TO A LOCAL CONSUMER AFFAIRS DEPARTMENT OR LOCAL LAW ENFORCEMENT, AS APPROPRIATE.

YOUR RIGHT TO CANCEL
(enter date of transaction)
You may cancel this contract and obtain a full refund, without any penalty or obligation, if notice of cancellation is given, in writing, within 10 business days from the above date or the date on which you commence utilizing the services under the contract, whichever is longer. For purposes of this section, business days are Monday through Friday.

To cancel this contract, mail, deliver, or send by facsimile transmission a signed and dated copy of the cancellation notice or any other written notice of cancellation to the talent service no later than midnight of the cancellation deadline.

If the contract was executed in part or in whole through the Internet, you may cancel the contract by sending the notification to the designated email address.

CANCELLATION NOTICE
I hereby cancel this contract.
Dated:
Artist Signature:

If you cancel, all fees you have paid must be refunded to you within 10 business days after delivery of the cancellation notice to the talent service.`,
  },
];
