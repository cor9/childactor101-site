/**
 * Squarespace export (WordPress WXR XML) -> Child Actor 101 blog post records.
 *
 * Squarespace's official export is Settings > Developer Tools > Import / Export > Export,
 * which produces a WordPress-format ".xml" file (WXR 1.2). Each blog post is an <item> with:
 *   <title>, <link>, <pubDate>, <dc:creator>, <content:encoded>, <excerpt:encoded>,
 *   <wp:post_id>, <wp:post_date>, <wp:post_date_gmt>, <wp:post_name> (the slug), <wp:status>,
 *   <wp:post_type>post, <category domain="category|post_tag" nicename="...">, <wp:postmeta>
 * Uploaded images are separate <item>s with <wp:post_type>attachment and <wp:attachment_url>.
 *
 * Nothing in this file invents content: every field comes from the export, or is left null and
 * reported by the audit.
 */
import { XMLParser } from "fast-xml-parser";
import sanitizeHtml from "sanitize-html";

export const SITE_HOSTS = ["childactor101.com", "www.childactor101.com", "legacy.childactor101.com"];
export const BLOG_PREFIX = "/101-blog";

/** Path segments under /101-blog that are archive routes, not articles. */
export const RESERVED_SLUGS = ["page", "category", "tag", "feed.xml", "rss.xml", "search-index.json"];

const SLUG_PATTERN = /^[A-Za-z0-9][A-Za-z0-9._~%-]*$/;

const IFRAME_HOSTS = [
  "www.youtube.com",
  "www.youtube-nocookie.com",
  "youtube.com",
  "player.vimeo.com",
  "open.spotify.com",
  "w.soundcloud.com",
  // Amazon Associates product widgets (affiliate units the author placed in some posts).
  "ws-na.amazon-adsystem.com",
];

const parser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: "@_",
  parseTagValue: false,
  parseAttributeValue: false,
  trimValues: true,
  processEntities: true,
  isArray: (name) => ["item", "category", "wp:postmeta", "wp:author"].includes(name),
});

const text = (value) => {
  if (value === undefined || value === null) return "";
  if (typeof value === "object") return String(value["#text"] ?? "").trim();
  return String(value).trim();
};

export function stripTags(html) {
  // Put a space at every block boundary so "…join?</p><p>Short answer" does not become "join?Short answer".
  const spaced = html.replace(/<\/(p|div|h[1-6]|li|ul|ol|blockquote|figure|figcaption|tr|td|th|table)>|<br\s*\/?>/gi, " $&");
  return sanitizeHtml(spaced, { allowedTags: [], allowedAttributes: {} })
    .replace(/&nbsp;|&#160;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&#x27;/g, "'")
    .replace(/\s+/g, " ")
    .trim();
}

/** Decodes leftover HTML entities (the export double-escapes some titles, e.g. "&amp;" or "&#x1f31f;"). */
export function decodeEntities(value) {
  if (value === null || value === undefined) return value;
  return String(value)
    .replace(/&#x([0-9a-f]+);/gi, (_m, hex) => String.fromCodePoint(parseInt(hex, 16)))
    .replace(/&#(\d+);/g, (_m, dec) => String.fromCodePoint(Number(dec)))
    .replace(/&nbsp;/g, " ").replace(/&rsquo;/g, "’").replace(/&lsquo;/g, "‘").replace(/&rdquo;/g, "”").replace(/&ldquo;/g, "“")
    .replace(/&mdash;/g, "—").replace(/&ndash;/g, "–").replace(/&hellip;/g, "…")
    .replace(/&quot;/g, '"').replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&");
}

/** The site displays dates in Pacific time; the export stores UTC. */
export const SITE_TIME_ZONE = "America/Los_Angeles";

export function countWords(html) {
  const plain = stripTags(html);
  return plain ? plain.split(" ").length : 0;
}

/** Normalises an image URL so the same asset always maps to one manifest key. */
export function normalizeImageUrl(raw) {
  let value = raw.trim();
  if (value.startsWith("//")) value = `https:${value}`;
  if (value.startsWith("http://")) value = `https://${value.slice(7)}`;
  return value;
}

function toIso(gmt, local) {
  const pick = [gmt, local].find((value) => value && !value.startsWith("0000"));
  if (!pick) return null;
  const iso = pick.includes("T") ? pick : pick.replace(" ", "T");
  const date = new Date(/[zZ]|[+-]\d\d:?\d\d$/.test(iso) ? iso : `${iso}Z`);
  return Number.isNaN(date.getTime()) ? null : date.toISOString();
}

/** WordPress [caption] shortcodes -> <figure>. Squarespace uses them for captioned images. */
function convertCaptions(html) {
  return html.replace(/\[caption[^\]]*\]([\s\S]*?)\[\/caption\]/gi, (_all, inner) => {
    const match = inner.match(/^([\s\S]*?<img[^>]*>(?:\s*<\/a>)?)([\s\S]*)$/i);
    if (!match) return inner;
    const caption = match[2].trim();
    return `<figure>${match[1]}${caption ? `<figcaption>${caption}</figcaption>` : ""}</figure>`;
  });
}

/** Rewrites links that point at the old or legacy host so they stay on the primary domain. */
export function rewriteHref(href) {
  let url;
  try {
    url = new URL(href, "https://www.childactor101.com");
  } catch {
    return { href, internal: false };
  }
  const isRelative = !/^[a-z][a-z0-9+.-]*:/i.test(href) && !href.startsWith("//");
  if (isRelative || SITE_HOSTS.includes(url.hostname.toLowerCase())) {
    const path = `${url.pathname}${url.search}${url.hash}`;
    return { href: path === "" ? "/" : path, internal: true, pathname: url.pathname };
  }
  return { href, internal: false };
}

/** Squarespace's JSON feed keeps embedded video inside a data-html attribute; surface it as a real iframe. */
function unwrapVideoBlocks(html) {
  return html.replace(/<div[^>]*sqs-video-wrapper[^>]*data-html="([^"]*)"[^>]*>/g, (tag, encoded) => {
    const iframe = decodeEntities(encoded);
    return /<iframe/i.test(iframe) ? `${tag}${iframe}` : tag;
  });
}

export function cleanBody(rawHtml, linkMap = {}) {
  const images = new Set();
  const internalLinks = new Set();
  const externalLinks = new Set();
  const issues = { imagesWithoutAlt: 0, iframesDropped: 0 };
  const linkFixes = [];

  const html = sanitizeHtml(convertCaptions(unwrapVideoBlocks(rawHtml)), {
    allowedTags: [
      "p", "br", "hr", "h2", "h3", "h4", "h5", "h6", "ul", "ol", "li", "a", "strong", "b", "em", "i", "u", "s",
      "blockquote", "img", "figure", "figcaption", "iframe", "table", "thead", "tbody", "tr", "th", "td",
      "div", "span", "pre", "code", "sup", "sub",
    ],
    allowedAttributes: {
      a: ["href", "title", "target", "rel"],
      img: ["src", "alt", "width", "height", "title", "loading", "decoding"],
      iframe: ["src", "width", "height", "title", "allowfullscreen", "frameborder", "allow", "loading", "style", "class", "scrolling"],
      th: ["colspan", "rowspan"],
      td: ["colspan", "rowspan"],
    },
    // Only pixel sizes survive from inline styles (Amazon widgets are a fixed 120x240).
    allowedStyles: { iframe: { width: [/^\d+px$/], height: [/^\d+px$/] } },
    allowedSchemes: ["http", "https", "mailto", "tel"],
    allowedSchemesByTag: { img: ["http", "https"], iframe: ["https"] },
    allowProtocolRelative: true,
    allowedIframeHostnames: IFRAME_HOSTS,
    exclusiveFilter: (frame) => {
      if (frame.tag === "iframe" && !frame.attribs.src) {
        issues.iframesDropped += 1;
        return true;
      }
      // Drop empty paragraphs that Squarespace leaves behind.
      return frame.tag === "p" && !frame.text.trim() && frame.mediaChildren.length === 0;
    },
    transformTags: {
      h1: "h2",
      // Squarespace wraps video embeds in Embedly: //cdn.embedly.com/widgets/media.html?src=<real embed URL>.
      // Unwrap to the real embed so the video survives; the host allow-list still applies afterwards.
      iframe: (tagName, attribs) => {
        const next = { ...attribs, loading: "lazy" };
        delete next.class;
        if (next.src) {
          try {
            const url = new URL(next.src.startsWith("//") ? `https:${next.src}` : next.src);
            const inner = url.hostname === "cdn.embedly.com" ? url.searchParams.get("src") : null;
            next.src = inner ?? url.href;
            // Fixed-size widgets (not 16:9 video) get a marker class so they keep their native size.
            if (url.hostname.endsWith("amazon-adsystem.com")) next.class = "embed-widget";
          } catch {
            // left as-is; the allow-list will drop it
          }
        }
        return { tagName, attribs: next };
      },
      a: (tagName, attribs) => {
        const next = { ...attribs };
        if (next.href) {
          let result = rewriteHref(next.href);
          // Repair links to old Squarespace pages that no longer exist (scripts/blog/link-map.json).
          const mapped = result.internal ? linkMap[result.pathname.toLowerCase()] : undefined;
          if (mapped) {
            linkFixes.push({ from: result.pathname, to: mapped });
            result = rewriteHref(mapped);
          }
          next.href = result.href;
          if (result.internal) {
            if (result.pathname?.toLowerCase().startsWith(BLOG_PREFIX)) internalLinks.add(result.pathname);
            delete next.target;
          } else if (/^https?:/i.test(result.href)) {
            externalLinks.add(result.href);
            next.rel = "noopener noreferrer";
            if (next.target) next.target = "_blank";
          }
        }
        return { tagName, attribs: next };
      },
      img: (tagName, attribs) => {
        const next = { ...attribs };
        const source = next.src || next["data-src"] || next["data-image"];
        if (source) {
          next.src = normalizeImageUrl(source);
          images.add(next.src);
        }
        if (next.alt === undefined) issues.imagesWithoutAlt += 1;
        next.alt = next.alt ?? "";
        next.loading = "lazy";
        next.decoding = "async";
        return { tagName, attribs: next };
      },
    },
  });

  return { linkFixes, html: html.trim(), images: [...images], internalLinks: [...internalLinks], externalLinks: [...externalLinks], issues };
}

/** Parses one export file into raw post items plus attachment lookups. */
export function parseExport(xml, fileLabel = "export.xml") {
  let root;
  try {
    root = parser.parse(xml);
  } catch (error) {
    throw new Error(`${fileLabel}: not valid XML (${error.message})`);
  }
  const channel = root?.rss?.channel;
  if (!channel) {
    throw new Error(`${fileLabel}: not a Squarespace/WordPress (WXR) export: no <rss><channel> element found.`);
  }

  // Login -> display name. Posts reference authors by login, which can be an email address.
  const authors = {};
  for (const author of channel["wp:author"] ?? []) {
    const login = text(author["wp:author_login"]);
    const display = text(author["wp:author_display_name"]);
    if (login && display) authors[login] = display;
  }

  const items = channel.item ?? [];
  const attachments = new Map();
  const posts = [];
  const other = [];

  for (const item of items) {
    const type = text(item["wp:post_type"]) || "post";
    if (type === "attachment") {
      attachments.set(text(item["wp:post_id"]), {
        url: text(item["wp:attachment_url"]) || text(item["guid"]),
        parent: text(item["wp:post_parent"]),
        title: text(item.title),
      });
    } else if (type === "post") {
      posts.push(item);
    } else {
      other.push({ type, title: text(item.title), link: text(item.link) });
    }
  }

  return { posts, attachments, other, authors, site: { title: text(channel.title), link: text(channel.link) } };
}

export function buildPost(item, attachments, options = {}) {
  const warnings = [];
  const link = text(item.link);
  let pathname = "";
  try {
    pathname = new URL(link, "https://www.childactor101.com").pathname;
  } catch {
    // reported below
  }

  const slug = text(item["wp:post_name"]) || decodeURIComponent(pathname.split("/").filter(Boolean).pop() ?? "");
  const title = decodeEntities(text(item.title));
  const exportBody = text(item["content:encoded"]);
  // Posts whose export body is incomplete use the full body recovered from Squarespace's JSON feed
  // (src/content/blog/recovered-bodies.json, written by scripts/blog/recover-from-live.mjs).
  const recovered = options.recovered?.[slug.toLowerCase()];
  const rawBody = recovered?.body ?? exportBody;
  const seo = options.seo?.[slug] ?? options.seo?.[slug.toLowerCase()] ?? null;
  const status = text(item["wp:status"]) || "publish";
  const date = toIso(text(item["wp:post_date_gmt"]), text(item["wp:post_date"]));
  // Calendar day as the live site shows it. Squarespace renders in Pacific time, the export stores UTC, so an
  // evening post would otherwise display one day late (verified against all 157 live pages).
  const dateDisplay = date ? new Date(date).toLocaleDateString("en-CA", { timeZone: SITE_TIME_ZONE }) : null;
  const creator = text(item["dc:creator"]);
  let author = options.authorMap?.[creator] ?? (creator || null);
  // Never publish an email address as a byline (Squarespace logins are often emails).
  if (author && author.includes("@")) {
    warnings.push("author was an email address and was withheld; add it to scripts/blog/author-map.json");
    author = null;
  }

  if (!slug) warnings.push("no slug");
  if (slug && !SLUG_PATTERN.test(slug)) warnings.push(`unusual slug characters: ${slug}`);
  if (RESERVED_SLUGS.includes(slug.toLowerCase())) warnings.push(`slug collides with a reserved blog route: ${slug}`);
  if (!title) warnings.push("no title");
  if (!date) warnings.push("no publication date");
  if (!author) warnings.push("no author");
  if (!rawBody) warnings.push("empty body");
  if (pathname && !pathname.toLowerCase().startsWith(`${BLOG_PREFIX}/`)) warnings.push(`original path is not under ${BLOG_PREFIX}: ${pathname}`);

  const cleaned = cleanBody(rawBody, options.linkMap);
  const bodyText = stripTags(cleaned.html);

  const categories = [];
  const tags = [];
  for (const entry of item.category ?? []) {
    const name = decodeEntities(text(entry));
    const slugValue = entry["@_nicename"] || name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
    if (!name) continue;
    const target = entry["@_domain"] === "post_tag" ? tags : categories;
    if (!target.some((existing) => existing.slug === slugValue)) target.push({ name, slug: slugValue });
  }

  // Featured image: _thumbnail_id postmeta, then attachments whose parent is this post, then first body image.
  const meta = Object.fromEntries((item["wp:postmeta"] ?? []).map((entry) => [text(entry["wp:meta_key"]), text(entry["wp:meta_value"])]));
  const postId = text(item["wp:post_id"]);
  let featuredImage = null;
  const thumb = attachments.get(meta._thumbnail_id);
  if (thumb?.url) featuredImage = { url: normalizeImageUrl(thumb.url), source: "thumbnail" };
  if (!featuredImage) {
    const child = [...attachments.values()].find((attachment) => attachment.parent && attachment.parent === postId && attachment.url);
    if (child) featuredImage = { url: normalizeImageUrl(child.url), source: "attachment" };
  }
  if (!featuredImage && cleaned.images[0]) featuredImage = { url: cleaned.images[0], source: "first-body-image" };

  const imageUrls = new Set(cleaned.images);
  if (featuredImage) imageUrls.add(featuredImage.url);

  const excerptText = stripTags(text(item["excerpt:encoded"]));
  const excerpt = excerptText || (bodyText.length > 200 ? `${bodyText.slice(0, 197).replace(/\s+\S*$/, "")}…` : bodyText);

  return {
    status,
    warnings,
    post: {
      slug,
      title,
      author,
      date,
      dateDisplay,
      updated: null,
      excerpt,
      excerptSource: excerptText ? "export" : "derived-from-body",
      categories,
      tags,
      featuredImage,
      originalUrl: link || null,
      originalPath: pathname || null,
      sourceId: postId || null,
      bodySource: recovered ? "squarespace-json-feed" : "wordpress-export",
      seoTitle: seo?.title && seo.title !== title ? decodeEntities(seo.title) : null,
      seoDescription: seo?.description ? decodeEntities(seo.description) : null,
      wordCount: countWords(cleaned.html),
      // Words in the export before cleaning, so the audit can prove no text was lost.
      sourceWordCount: countWords(rawBody.replace(/<(script|style)[\s\S]*?<\/\1>/gi, "").replace(/\[\/?caption[^\]]*\]/gi, "")),
      embedCount: (cleaned.html.match(/<iframe/g) ?? []).length,
      readingMinutes: Math.max(1, Math.round(countWords(cleaned.html) / 220)),
      images: [...imageUrls],
      internalLinks: cleaned.internalLinks,
      linkFixes: cleaned.linkFixes,
      externalLinkCount: cleaned.externalLinks.length,
      contentIssues: cleaned.issues,
      body: cleaned.html,
    },
  };
}
