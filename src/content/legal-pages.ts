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

export type TermsSection = {
  id: string;
  title: string;
  paragraphs?: readonly string[];
  bullets?: readonly string[];
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
export const termsLastUpdated = "September 30, 2025";

export const termsContents = [
  "Definitions",
  "User Rights and Responsibility",
  "Acceptable use",
  "Prohibited Use",
  "Our Content",
  "Trademarks/ No Endorsement",
  "User Content",
  "Right To Takedown Content",
  "Advertising Rights",
  "Your Account",
  "Ecommerce",
  "Billing",
  "Payments",
  "Refunds",
  "Website Information",
  "Security",
  "Links to this Website",
  "Third Party Links",
  "Intellectual Property Rights",
  "Copyright Notice",
  "Disclaimers",
  "Limitation of Liability",
  "Indemnity",
  "Release",
  "Communication",
  "Dispute Resolution and Arbitration",
  "Termination",
  "Consequences of Termination or Expiration",
  "Revisions",
  "Force Majeure",
  "Minimum Age Requirements",
  "General",
  "User Feedback",
  "Notice for California Users",
  "Contact Us",
] as const;

export const termsIntroParagraphs = [
  "Welcome to www.childactor101.com and related platforms, including the Child Actor 101 Directory (collectively, the \"Website\").",
  "These Terms and Conditions (\"Agreement\") are a legal agreement that explain the terms and conditions that all visitors, users, clients, and customers (\"You\" or \"Your\") must comply with when using the Website. By using the Website, You agree to abide by all of the terms and conditions in this Agreement.",
  "This Agreement incorporates Our Privacy Policy and Disclaimer.",
  "These Terms and Conditions outline the rules and regulations for the use of www.childactor101.com. Please read this Agreement carefully because it affects Your rights and liabilities under the law. By using or accessing the Website, You confirm that You have read and agreed to be bound by this Agreement. If You do not agree with this Agreement, You cannot use or access the Website.",
  "These Terms and Conditions are governed by the law of California, USA.",
];

export const termsSections: readonly TermsSection[] = [
  {
    id: "definitions",
    title: "1. Definitions",
    bullets: [
      "\"Company,\" \"Us,\" \"We,\" and \"Our\" refers to Ralston Entertainment.",
      "\"Content\" is the information displayed at the Website including without limitation text, data, code, images, photographs, graphics, software, designs, and any other materials that are available at the Website.",
      "\"Goods\" means all goods that We supply and make available to You as detailed in the Invoice.",
      "\"Party\" refers to either You, or Us, or any other party to this Agreement. \"Parties\" refer to both You and Us.",
      "\"Services\" include classes, coaching, consultations, products, resources, and directory listings. \"Supply\" means to provide the Goods or Services as per the Invoice.",
      "\"You\" and \"Your\" refer to the visitor, user, client, customer, or person accessing the Website and thus accepting this Agreement.",
      "\"User Content\" refers to the content which has been created by Our users.",
      "\"Website\" includes www.childactor101.com, the Child Actor 101 Directory, and any subdomains or connected services operated by Ralston Entertainment.",
      "\"Users\" include parents, professionals, and vendors accessing any part of the Website.",
    ],
  },
  {
    id: "user-rights",
    title: "2. User Rights and Responsibility",
    paragraphs: ["2.1 Acceptable use"],
    bullets: [
      "Ralston Entertainment will not be held liable should the Website be unavailable for any amount of time.",
      "You are responsible for the safety and confidentiality of your passwords and usernames. Ralston Entertainment has the right to terminate or suspend your username and password should We suspect non-compliance by You.",
      "You are not a minor in the jurisdiction in which you reside.",
      "You will not use any meta tags or any other hidden text utilizing Our name or trademarks without Our express written consent.",
      "The Website and any portion of the Website may not be reproduced, sold, resold, visited, or otherwise exploited for any commercial purpose without Our express written consent.",
      "Your use and access of the Website does not include any right of resale or commercial use of the Website or its Contents; any collection and use of any product listings, descriptions, or prices; any derivative use of the Website or its Contents; any downloading or copying of account information for the benefit of another merchant; or any use of data mining, robots, or similar data gathering and extraction tools.",
      "You must use Our Website for lawful purposes only.",
    ],
  },
  {
    id: "prohibited-use",
    title: "2.2 Prohibited Use",
    paragraphs: ["While using Our service, the following terms must be adhered to:"],
    bullets: [
      "Do not transmit or send unsolicited or unauthorized advertising or promotional material in any form.",
      "Do not disrupt or attempt to disrupt Our servers in any way that could cause harm to the Website.",
      "Do not distribute software viruses or any other code, files, or programs intended to disrupt, damage, limit, or obtain unauthorized access to systems or data.",
      "Do not harass, abuse, threaten, or incite violence towards any individual or group.",
      "Do not use the Website in any way that breaks applicable local, national, or international laws or regulations.",
      "Do not use the Website in any way that is fraudulent or unlawful.",
      "Do not hold Yourself out as sponsored by, endorsed by, or affiliated with Us or the Website.",
      "Do not interfere with another person's use of the Website or the proper functioning of the Website.",
      "Do not misrepresent Your identity or impersonate any person.",
      "Do not modify, translate, adapt, edit, decompile, disassemble, or reverse engineer any software programs used by Us.",
      "Do not provide information that is false, misleading, or inaccurate.",
      "Do not use any portion of the Website for unlawful purposes or fail to comply with applicable laws, statutes, ordinances, and regulations.",
      "Do not upload, post, email, transmit, or otherwise make available User Content that infringes intellectual property or proprietary rights.",
      "Do not upload, post, email, transmit, or otherwise make available User Content that is harmful to minors, harassing, threatening, abusive, vulgar, obscene, defamatory, hateful, or otherwise objectionable.",
      "Do not upload junk mail, commercial advertisements, or other forms of commercial solicitation.",
      "Do not violate the privacy of any third party, including posting personal information without consent.",
    ],
  },
  {
    id: "our-content",
    title: "3. Our Content",
    paragraphs: [
      "Except for User Content as defined below, all of the content featured or displayed on the Website, including without limitation text, graphics, photographs, images, moving images, sound, and illustrations (\"Our Content\"), are owned by Us, Our licensors, vendors, agents, and content providers. All elements of the Website, including without limitation the general design and Our Content, are protected by trade dress, copyright, moral rights, trademark, and other laws relating to intellectual property rights.",
      "The Website, Our Content, and all related rights shall remain Our exclusive property or the property of Our licensors unless otherwise expressly agreed.",
      "You will not remove any copyright, trademark, or other proprietary notices from material found on the Website.",
      "Except as may otherwise be indicated within the Website or as permitted by copyright law, You are authorized to view, play, print, and download copyrighted documents, audio, and video found on Our Website for personal, informational, and noncommercial purposes only.",
      "Except as permitted by copyright law, You may not modify, copy, distribute, transmit, display, perform, reproduce, publish, license, create derivative works from, transfer, or sell any information or work contained on the Website.",
    ],
  },
  {
    id: "trademarks",
    title: "4. Trademarks / No Endorsement",
    paragraphs: [
      "All of Our trademarks, service marks, and trade names used herein, including the Ralston Entertainment name, logos, Website name, and Website design, are Our trademarks or registered trademarks or those of Our affiliates, partners, vendors, or licensors.",
      "You may not use, copy, reproduce, republish, upload, post, transmit, distribute, or modify Our trademarks in any way, including in advertising or publicity pertaining to distribution of materials on the Website, without Our prior written consent.",
      "The use of Our trademarks on any other site or network computer environment is not allowed. We prohibit the use of Our trademarks as a hot link on or to any other site unless We have approved it in advance.",
      "You shall not use Our name or any language, pictures, or symbols which could, in Our judgment, imply Our endorsement in written or oral advertising, presentations, brochures, newsletters, books, or other written material without prior written consent.",
    ],
  },
  {
    id: "user-content",
    title: "5. User Content",
    paragraphs: [
      "You may be able, as dictated by the functionality of the Website, to submit or otherwise make available messages, emails, photographs, videos, and other content for display on the Website (\"User Content\").",
      "You shall be solely responsible for Your own User Content and the consequences of posting or publishing it. The Website merely acts as a passive conduit for Your online distribution and publication of User Content.",
      "Without limiting any of Our rights in law and equity, We reserve the right to remove any User Content for any reason in Our sole discretion, including content that We believe may violate this Agreement or any copyright or third-party rights.",
      "By submitting User Content to the Website, You grant Us a nonexclusive, royalty-free, worldwide, perpetual, irrevocable, sub-licensable license to use, modify, copy, distribute, transmit, publicly display, publicly perform, publish, adapt, create derivative works from, transfer, or sell such content for any purpose, including commercial purposes and in connection with advertising for the sole benefit of the Website.",
      "You also waive and give up any claim that such use violates privacy rights, publicity rights, moral rights, or any right to approve the way the Website uses such content.",
      "You grant Us and the Website the right to use any material, information, ideas, concepts, know-how, or techniques contained in any communication You provide to the Website for any purpose whatsoever, including commercial purposes.",
      "By submitting User Content, You warrant and represent that You are the owner of all intellectual property rights in the User Content or otherwise have sufficient rights to grant the license above.",
      "If you submit a directory listing, profile, review, or other materials to the Child Actor 101 Directory, such content is considered User Content under these Terms.",
      "You further warrant and represent that the User Content infringes no third-party right of privacy, publicity, or other proprietary interest.",
      "User Content does not represent Our views, and We do not control it. We do not vouch for the accuracy or credibility of User Content and assume no liability for actions taken as a result of reading it.",
    ],
  },
  {
    id: "takedown",
    title: "6. Right To Takedown Content",
    paragraphs: [
      "You remain solely responsible for Your User Content, and We have no obligation to prescreen it. However, We have the right in Our sole discretion to edit, refuse to post, or remove material submitted to or posted on the Website at any time without notice.",
      "We may remove material that We find to be in violation of this Agreement or otherwise objectionable and deny access to any User who fails to conform to any provision of this Agreement.",
      "If You wish to remove Your User Content from the Website, email corey@childactor101.com. We will remove the User Content within 10 business days of receiving the request, though We may retain non-public backup copies.",
    ],
  },
  {
    id: "advertising-rights",
    title: "7. Advertising Rights",
    paragraphs: [
      "We reserve the right to sell, license, or display advertising, attribution, links, promotional, and distribution rights in connection with User Content. We and Our licensors or affiliates will be entitled to retain any revenue generated from those rights.",
      "Nothing in this Agreement obligates Us to sell, license, or offer such advertising, promotion, or distribution rights.",
      "By creating a listing in the Child Actor 101 Directory, You acknowledge that Ralston Entertainment may display advertising, promotional placements, or featured listing opportunities alongside Your User Content.",
    ],
  },
  {
    id: "your-account",
    title: "8. Your Account",
    bullets: [
      "Provide true, accurate, current, and complete information about Yourself as prompted by the Website's registration page (\"Account Data\").",
      "Maintain and promptly update the Account Data to keep it true, accurate, current, and complete.",
      "You are entirely responsible for the security and confidentiality of Your password and Account and for any activities that occur under Your Account.",
      "You will not share Account Data or permit third parties to log in using Your Account.",
      "You agree to immediately notify Us of any unauthorized use of Your Account or other breach of security.",
      "The Website may include a tool that allows sign in or registration using third-party services such as Facebook, Twitter, Google, Yahoo, or LinkedIn. Those services are not related to the Website and remain subject to their own terms.",
      "For more information on how We collect, store, use, and share Account Data, please check Our Privacy Policy.",
    ],
  },
  {
    id: "ecommerce",
    title: "9. Ecommerce",
    paragraphs: ["9.1 Billing"],
    bullets: [
      "We use Stripe as a Payment Processor to collect and manage payments.",
      "You acknowledge that the Payment Processor may perform credit and background verification of potential customers, access updated payment reports, administer credit, assist in credit recovery, assess customer dependability, and receive or facilitate credit due to Us.",
      "The Payment Processor is responsible for processing payments, and We are not liable for matters connected with that processing.",
      "You agree to notify Us or the Payment Processor about billing problems or discrepancies within 60 days after they first appear on Your statement. If You do not do so, You waive the right to dispute them.",
      "We may partner with other third-party payment providers and will notify You by email at least 30 days before such a change takes effect.",
    ],
  },
  {
    id: "payments",
    title: "9.2 Payments",
    bullets: [
      "You agree to provide updated information regarding Your credit card or payment method whenever needed.",
      "You give Us and the Payment Processor pre-authorization to verify that the payment method is valid and has necessary funds or credit available.",
      "You authorize the payment method to pay any amount described herein.",
      "You confirm that Your card has sufficient funds, credit facilities, and valid expiry date to cover the payment.",
      "You will receive an electronic invoice, which serves as Your official receipt.",
      "In case of payment delay, You will not be able to use chargeable features until payment due has been fully paid.",
      "Upon delay, We may assess reasonable interest charges on unpaid amounts.",
      "You are solely responsible for any fees charged by Your card issuer, bank, or financial institution.",
      "All orders are subject to Our credit approval, and We may withhold shipment or require additional assurances of payment performance.",
      "All payments must be paid in USD. Currency conversion or transfer costs charged by financial providers are Your responsibility.",
      "All prices include VAT at the current legal rate in the United States unless stated otherwise. You are responsible for all other applicable taxes, and We shall charge taxes when required to do so.",
      "Other payment methods are accepted only if provided on Our Website.",
    ],
  },
  {
    id: "refunds",
    title: "9.3 Refunds & Credits",
    paragraphs: [
      "All sales are final. We do not issue cash refunds for classes, coaching, consultations, or other services.",
      "If You are unable to attend a scheduled class or coaching session, You may receive a credit that can be applied toward a similar or alternative class, coaching session, or consultation. Credits must be used within 12 months of the original purchase date and are subject to availability.",
      "By completing a purchase on Our Website, You acknowledge and agree to this Refunds & Credits Policy.",
    ],
  },
  {
    id: "website-information",
    title: "10. Website Information",
    paragraphs: [
      "We attempt to ensure that information on the Website is complete, accurate, and current. Despite Our efforts, the information on the Website may occasionally be inaccurate, incomplete, or out of date. We make no representation as to the completeness, accuracy, or currency of any information on the Website.",
      "Through Your use of the Website, You may be exposed to content that You may find offensive, objectionable, harmful, inaccurate, or deceptive. By using Our Website, You assume all associated risks.",
    ],
  },
  {
    id: "security",
    title: "11. Security",
    paragraphs: [
      "Information provided by You through www.childactor101.com is stored on a secured private server. While We have taken reasonable precautions to protect personal information, no security system is impenetrable and We cannot guarantee the security of information provided via the Internet, through the Website, through online ordering, or in databases stored on Our servers.",
      "Our online ordering functionality employs Secure Sockets Layer (SSL) software, the industry standard and among the best software available today for secure commerce transactions. It encrypts personal information. Please see Our Privacy Policy for full details on security.",
    ],
  },
  {
    id: "links-to-this-website",
    title: "12. Links to this Website",
    paragraphs: [
      "Running or displaying the Website or any information or material displayed on the Website in frames or through similar means on another site without Our prior written permission is prohibited.",
      "We grant You a nonexclusive right to display at Your site any link that would permit a user to go from Your site to Our Website. You obtain no rights other than the right to link to Our Website.",
      "We do not guarantee, approve, or endorse the information or products available on Your site.",
      "You agree not to use or display the links in a manner that is misleading, defamatory, infringing, libelous, disparaging, obscene, or otherwise objectionable to Us.",
      "You warrant that Your site does not include material, or contain links to sites displaying material, that is harmful, pornographic, abusive, hateful, obscene, threatening, defamatory, or that encourages illegal activity. Upon notice from Us, You shall promptly remove the links.",
      "If You wish to obtain written consent from Us, please contact Us using Our contact page.",
    ],
  },
  {
    id: "third-party-links",
    title: "13. Third Party Links",
    paragraphs: [
      "From time to time, the Website may contain links to sites that We and Our affiliates do not own, operate, or control. Those links are provided solely for convenience. If You use them, You will leave the Website.",
      "Neither We nor any of Our affiliates are responsible for any content, material, or other information located on or accessible from any other site, nor do We endorse, guarantee, or make representations or warranties regarding those sites or their results.",
      "We do not control, endorse, sponsor, or approve of third parties or their content, nor do We take responsibility for any aspect of those websites or their content.",
      "If You decide to access any linked site, You do so entirely at Your own risk. You agree to be aware when You leave the Website and to read the privacy statements of those sites before disclosing personal information.",
      "We do not accept responsibility for any loss or damage resulting from disclosure of personal information to third-party sites.",
    ],
  },
  {
    id: "intellectual-property",
    title: "14. Intellectual Property Rights",
    paragraphs: [
      "We claim copyright and all other intellectual property rights to all material on the Website, including words, information, graphics, designs, logos, trademarks, photographs, icons, drawings, and text.",
      "Our intellectual property is protected under copyright, trademark, and other intellectual property laws.",
      "As part of this Agreement, You agree not to reproduce, distribute, sell, publish, or broadcast any material found on this Website without Our prior written consent.",
    ],
  },
  {
    id: "copyright-notice",
    title: "15. Copyright Notice",
    paragraphs: [
      "All Website design, graphics, text selections, arrangements, and all software are Copyright © 2021, Ralston Entertainment or its licensors. All rights reserved.",
    ],
  },
  {
    id: "disclaimers",
    title: "16. Disclaimers",
    paragraphs: [
      "Your use of the Website is at Your own risk. The information, materials, and services provided on or through the Website are provided as is without any warranties of any kind including warranties of merchantability, fitness for a particular purpose, security, or non-infringement of intellectual property.",
      "Neither We nor any of Our affiliates warrant the accuracy or completeness of the information, materials, or services provided on or through the Website. The information, materials, and services may be out of date, and neither We nor any of Our affiliates make any commitment or assume any duty to update them.",
      "The foregoing exclusions of implied warranties do not apply to the extent prohibited by law. Please refer to Your local laws for any such prohibitions.",
      "No advice or information, whether oral or written, obtained from the Website or through Our Services will create any warranty not expressly made herein.",
    ],
  },
  {
    id: "limitation-of-liability",
    title: "17. Limitation of Liability",
    paragraphs: [
      "We do not assume responsibility, or liability, for damages to or viruses that may infect Your computer, telecommunications equipment, or other property caused by or arising from access to, use of, or browsing of the Website, or from downloading information or materials from it.",
      "In no event will We, or any of Our officers, directors, employees, shareholders, affiliates, agents, successors, assigns, or parties involved in creation, production, or transmission of the Website, be liable to You or anyone else for any indirect, special, punitive, incidental, or consequential damages, including lost profits, lost data, or business interruption, arising out of the use, inability to use, or the results of use of the Website or linked websites, whether based on warranty, contract, tort, or any other legal theory and whether or not advised of the possibility of such damages.",
      "You specifically acknowledge that We shall not be liable for user submissions or the defamatory, offensive, or illegal conduct of any third party, and that the risk of harm or damage from the foregoing rests entirely with You.",
      "The foregoing limitations do not apply to the extent prohibited by law. Please refer to Your local laws for any such prohibitions.",
      "In the event of any problem with the Website or any content, Your sole remedy is to cease using the Website.",
      "In the event of any problem with products or services purchased on or through the Website, Your sole remedy, if any, is from the manufacturer or supplier in accordance with their warranty, or to seek a return and refund in accordance with posted returns and refunds policies.",
      "In no event shall Our total liability to You for all damages, losses, and causes of action exceed the greater of one hundred dollars ($100) or the value of Your subscription or purchase made on the Website.",
    ],
  },
  {
    id: "indemnity",
    title: "18. Indemnity",
    paragraphs: [
      "You agree to defend, indemnify, and hold Us and any of Our affiliated company or individual harmless from any and all liabilities, costs, and expenses, including reasonable attorneys' fees, related to or in connection with Your use of the Website, Your violation of this Agreement, Your violation of third-party rights, Your violation of any law or regulation, claims arising from User Content You provide, or any other party's access and use of the Website with Your username, password, or security code.",
    ],
  },
  {
    id: "release",
    title: "19. Release",
    paragraphs: [
      "In the event that You have a dispute with one or more other visitors, users, customers, or clients of the Website, You release Us and Our officers, directors, agents, subsidiaries, joint ventures, and employees from claims, demands, and damages of every kind and nature arising out of or connected with such disputes.",
    ],
  },
  {
    id: "communication",
    title: "20. Communication",
    paragraphs: [
      "We reserve the right to send You electronic mail for the purpose of informing You of changes or additions to the Website or this Agreement.",
      "Except as disclosed in Our Privacy Policy, We will not monitor, edit, or disclose the contents of Your email unless required in the course of normal maintenance of the Website and its systems or unless required by law or in the good-faith belief that such action is necessary to comply with law, protect rights or property, or act in an emergency to protect personal safety.",
    ],
  },
  {
    id: "arbitration",
    title: "21. Dispute Resolution and Arbitration",
    paragraphs: [
      "You and We agree to the following dispute resolution process for any legal controversy or legal claim arising out of or relating to this Agreement, the Website, any subscription to the Website, or any other aspect of Our relationship (\"Subject Legal Claim\").",
      "To help resolve issues promptly and directly, You and We agree to begin any arbitration within 15 days after a Subject Legal Claim arises; otherwise, the Subject Legal Claim is waived.",
      "You and We agree to first discuss any issue informally for at least 15 days. To do so, send Your full name and contact information, concern, and proposed solution by email to corey@childactor101.com. If We need to discuss an issue with You, We will contact You using the email or mailing address on Your Account.",
      "If no agreed solution is reached after discussions for at least 15 days, any Subject Legal Claim must be resolved through binding individual arbitration in California, USA in accordance with the American Arbitration Association.",
      "Two limited exceptions apply: either Party may pursue in small claims court any action within that jurisdiction as long as the case proceeds on an individual basis only, and either Party may seek to enforce patents, trademarks, copyrights, or trade secrets in an appropriate state or federal court.",
      "You and We agree to arbitrate only in individual capacities, not as representatives or members of a class, and each of Us waives any right to file a class action or seek relief on a class basis.",
      "If You initiate arbitration, Your arbitration fees will be limited to the filing fee set forth in the AAA Consumer Rules. The arbitrator's decision will be binding and may be entered as a judgment in any court of competent jurisdiction. In any action to enforce this Agreement, the prevailing party will be entitled to costs and attorneys' fees.",
    ],
  },
  {
    id: "termination",
    title: "22. Termination",
    bullets: [
      "We may terminate this Agreement for any or no reason during any free use of the Website or Services.",
      "We may terminate if You breach any of the terms of this Agreement and that breach is not remediable.",
      "We may terminate if You breach these terms and the breach is not remedied within the notice period stated in the source Agreement.",
      "We may terminate if You have failed to pay any due charges by the stated date.",
      "We may also block access if You breach this Agreement, if We are unable to verify or authenticate information You provide, or if We believe Your actions may cause financial loss or legal liability for You, Our users, or Us.",
      "You may terminate Your use of the Website or Services by contacting Us through Our contact details. The termination request will be subject to verification of Your ownership of the Account.",
      "Upon termination, You remain liable to pay all fees and charges accrued up to the time termination takes place. You are personally liable for any orders placed or charges incurred through Your Account prior to termination.",
      "Either Party may terminate upon written notice of a material breach if that breach remains uncured at the expiration of the notice period, or if the other party becomes the subject of a petition in bankruptcy or other insolvency proceeding.",
    ],
  },
  {
    id: "consequences",
    title: "23. Consequences of Termination or Expiration",
    bullets: [
      "All rights, subscriptions, and licenses granted to You shall terminate immediately.",
      "You will immediately cease use of and access to the Account, Website, and Services.",
      "We will suspend or terminate Your access to the Website and Services.",
      "We will suspend or terminate access to any or all data to the extent permitted by law.",
      "Termination or expiry of this Agreement does not affect any accrued rights and liabilities up until the date of termination.",
    ],
  },
  {
    id: "revisions",
    title: "24. Revisions",
    paragraphs: [
      "This Agreement is subject to revision and change from time to time. Your continued use of the Website after revision means that You agree, without qualification, to the revised Agreement.",
      "If You are not a registered subscriber of the Website, You can review revisions by regularly checking this page.",
      "Material revisions will be indicated by an updated effective date at the top left corner of this page and by a notice posted on the homepage of the Website.",
      "It is Your responsibility to remain apprised of revisions and to remain in compliance.",
      "If You object to revisions or become dissatisfied with the Website, Your only recourse is to immediately terminate membership or discontinue use of the Website. Otherwise, continued use after the effective date means You agree to be bound by all revisions.",
    ],
  },
  {
    id: "force-majeure",
    title: "25. Force Majeure",
    paragraphs: [
      "We shall not be responsible for damages or for delays or failures in performance resulting from acts or occurrences beyond Our reasonable control, including fire, lightning, explosion, power failure, water, acts of God, war, revolution, civil commotion, acts of civil or military authorities or public enemies, epidemics, pandemics, government orders, labor unrest, inability to secure raw materials, transportation facilities, fuel or energy shortages, or acts or omissions of common carriers.",
    ],
  },
  {
    id: "minimum-age",
    title: "26. Minimum Age Requirements",
    paragraphs: [
      "Our Website is not directed to children. Access to and use of Our Website is only for those who are at least 13 years old in the USA or 16 years old in the European Union or otherwise capable of entering into and performing legal agreements.",
      "Any person who registers as a user or provides personal information to the Website represents that they meet the applicable age or capacity requirement.",
      "By agreeing to this Agreement, You represent and warrant that You satisfy those age or legal-capacity requirements.",
    ],
  },
  {
    id: "general",
    title: "27. General",
    bullets: [
      "Jurisdiction and Choice of Law: any claim relating to use of this Website and its materials is governed by the laws of California, USA. You consent to the exclusive jurisdiction of the state and federal courts located in Visalia, California, USA.",
      "Entire Agreement: this Agreement and incorporated agreements are the entire agreement between You and Us and supersede prior understandings or agreements, written or oral.",
      "A printed version of this Agreement will be admissible in judicial and administrative proceedings to the same extent as other business documents and records originally generated and maintained in printed form.",
      "Severability: if any provision is held invalid or unenforceable, that provision shall be struck and the remaining provisions enforced.",
      "Assignment: We may automatically assign this Agreement in Our sole discretion. You cannot assign this Agreement without Our written consent.",
      "Headings are for reference purposes only and do not define, limit, construe, or describe the scope of any section.",
      "No Waiver: Our failure to act with respect to breaches does not waive Our right to act with respect to subsequent or similar breaches.",
      "Survival: clauses relating to trademarks, advertising rights, intellectual property, disclaimers, limitation of liability, indemnity, release, communications, and dispute resolution survive termination or expiration of this Agreement.",
    ],
  },
  {
    id: "feedback",
    title: "28. User Feedback",
    paragraphs: [
      "We welcome and encourage feedback, comments, and suggestions for improvements of the Website (\"Feedback\"). You may submit Feedback by emailing corey@childactor101.com.",
      "If You submit Feedback, You grant Us a non-exclusive, worldwide, perpetual, irrevocable, fully-paid, royalty-free, sub-licensable, and transferable license under any intellectual property rights that You own or control in relation to the Feedback to use, reproduce, communicate, print, copy, edit, translate, perform, display, distribute, modify, adapt, make, sell, offer to sell, transmit, license, transfer, stream, broadcast, create derivative works from, and otherwise exploit the Feedback for any purpose.",
    ],
  },
  {
    id: "california-notice",
    title: "29. Notice for California Users",
    paragraphs: [
      "Under California Civil Code Section 1789.3, California users are entitled to the following consumer rights notice: You may contact Us at Our contact page. The Complaint Assistance Unit of the Division of Consumer Services of the California Department of Consumer Affairs may be contacted in writing at 1625 N. Market Blvd., Suite S-202, Sacramento, California 95834, or by telephone at (800) 952-5210.",
    ],
  },
  {
    id: "contact-us",
    title: "30. Contact Us",
    paragraphs: [
      "If You do not understand any of the foregoing terms and conditions or if You have any questions or comments, please contact Ralston Entertainment at corey@childactor101.com.",
      "You acknowledge that You have read these Terms, understand them, and will be bound by them. You further acknowledge that these Terms together with the Privacy Policy represent the complete and exclusive statement of the agreement between Us and supersede any proposal, prior oral or written agreement, or other communications relating to the subject matter of this Agreement.",
    ],
  },
];

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
