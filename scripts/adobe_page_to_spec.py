#!/usr/bin/env python3
"""Turn a saved public Adobe Express (Spark) page into a JSON page spec, theme CSS and local images.

Usage:
  python3 scripts/adobe_page_to_spec.py <page.html> <page-url> <course> <slug> [--image-size orig|2560]

Writes:
  src/content/adobe/<course>/<slug>.json        ordered page spec (sections -> elements)
  src/content/adobe/<course>/<slug>.theme.css   the page's own inline theme CSS, re-scoped to
                                                .adobe-theme-<course>-<slug> so pages cannot collide
  public/courses/<course>/<slug>/images/*       every image on the page, stored locally

The live page's markup is the source of truth: element order, headings, copy, links, buttons,
images, captions, video positions and section types are recorded exactly as published. Corey-owned
Vimeo embeds are resolved to Bunny GUIDs through VIMEO_MAP in build_courses_from_adobe.py (the
original Vimeo id is always kept); unmapped ones become neutral placeholders. Adobe Fonts kit ids
used by the page are resolved from the page's runtime so the renderer can link the same fonts.
"""
import argparse
import gzip
import html
import importlib.util
import json
import os
import re
import sys
import urllib.parse
import urllib.request
from html.parser import HTMLParser

ap = argparse.ArgumentParser()
ap.add_argument("page_html")
ap.add_argument("page_url")
ap.add_argument("course")
ap.add_argument("slug")
ap.add_argument("--image-size", default="2560", help="'orig' for original files, or a max pixel width")
args = ap.parse_args()

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SCOPE = f"adobe-theme-{args.course}-{args.slug}"
spec_path = os.path.join(ROOT, "src", "content", "adobe", args.course, f"{args.slug}.json")
css_path = os.path.join(ROOT, "src", "content", "adobe", args.course, f"{args.slug}.theme.css")
image_dir = os.path.join(ROOT, "public", "courses", args.course, args.slug, "images")
public_prefix = f"/courses/{args.course}/{args.slug}/images"
os.makedirs(os.path.dirname(spec_path), exist_ok=True)
os.makedirs(image_dir, exist_ok=True)

# --- Vimeo -> Bunny map (existing recovery work) ---------------------------
mod = importlib.util.spec_from_file_location("recovery", os.path.join(ROOT, "scripts", "build_courses_from_adobe.py"))
recovery = importlib.util.module_from_spec(mod)
mod.loader.exec_module(recovery)
VIMEO_MAP = recovery.VIMEO_MAP

UA = {"User-Agent": "Mozilla/5.0"}
page_url = args.page_url if args.page_url.endswith("/") or "/webpage/" in args.page_url else args.page_url + "/"
raw = open(args.page_html, encoding="utf-8").read()


def get(url, binary=True):
    req = urllib.request.Request(url, headers=UA)
    with urllib.request.urlopen(req, timeout=90) as r:
        data = r.read()
        return data, r.headers.get("Content-Type", "")


# --- tiny DOM -----------------------------------------------------------------
class Node:
    def __init__(self, tag, attrs, parent):
        self.tag, self.attrs, self.parent, self.children = tag, dict(attrs), parent, []

    def cls(self):
        return self.attrs.get("class", "").split()


VOID = {"br", "img", "meta", "link", "input", "hr"}


class Builder(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=False)
        self.root = Node("root", {}, None)
        self.cur = self.root

    def handle_starttag(self, tag, attrs):
        n = Node(tag, attrs, self.cur)
        self.cur.children.append(n)
        if tag not in VOID:
            self.cur = n

    def handle_startendtag(self, tag, attrs):
        self.cur.children.append(Node(tag, attrs, self.cur))

    def handle_endtag(self, tag):
        c = self.cur
        while c is not None and c.tag != tag:
            c = c.parent
        if c is not None and c.parent is not None:
            self.cur = c.parent

    def handle_data(self, data):
        self.cur.children.append(data)

    def handle_entityref(self, name):
        self.cur.children.append(f"&{name};")

    def handle_charref(self, name):
        self.cur.children.append(f"&#{name};")


def walk(n):
    yield n
    for c in n.children:
        if isinstance(c, Node):
            yield from walk(c)


# Adobe page ids of the recreated courses -> local routes, so links between the original
# pages keep working inside the site.
PAGE_ROUTES = {
    # NO EXCUSES!
    "srf8IpDO7ZkIU": "/courses/no-excuses/welcome",
    "MltFArqt4mOOT": "/courses/no-excuses/write-it",
    "6DKzqO1Wiw758": "/courses/no-excuses/plan-prep-it",
    "f5hjv4sMwNeA3": "/courses/no-excuses/shoot-it",
    "GMt6OK0rvfYVm": "/courses/no-excuses/edit-it",
    "z4dBmikw9rtLK": "/courses/no-excuses/use-it",
    # The Perfect Self Tape
    "4N3CH5BgyUPgp": "/courses/perfect-self-tape",
    "t89Ol45aZnWWO": "/courses/perfect-self-tape/equipment-guide",
    "fKEcYmY4tk1Ru": "/courses/perfect-self-tape/properly-lit",
    "5HkJaHOKEnWA5": "/courses/perfect-self-tape/perfect-frame",
    "HTdXKtkSq3Ksq": "/courses/perfect-self-tape/slates-that-shine",
    "9h9pR9OX1OZq7": "/courses/perfect-self-tape/role-of-the-reader",
    "FrbVFiuNM7Jxy": "/courses/perfect-self-tape/performance-coaching",
    "OQdMObzEI8etD": "/courses/perfect-self-tape/quick-editing",
    "ZYQXknWCAzt3i": "/courses/perfect-self-tape/parent-survival-tips",
    "E3kmokZywrFef": "/courses/perfect-self-tape/sending-tapes",
    "ko5JZe1bqtBnz": "/courses/perfect-self-tape/bending-the-rules",
}


def local_href(href):
    m = re.match(r"https?://(?:express|spark|new\.express)\.adobe\.com/(?:page|webpage)/([A-Za-z0-9]+)/?$", href or "")
    if m and m.group(1) in PAGE_ROUTES:
        return PAGE_ROUTES[m.group(1)], True
    return href, False


INLINE = ("b", "strong", "i", "em", "u", "br", "a", "span", "sup", "sub")


def inner_html(n):
    out = []
    for c in n.children:
        if isinstance(c, str):
            out.append(c)
        elif c.tag in INLINE:
            if c.tag == "br":
                out.append("<br>")
            else:
                attrs = ""
                if c.tag == "a":
                    target, internal = local_href(html.unescape(c.attrs.get("href", "")))
                    attrs = f' href="{html.escape(target, quote=True)}"' + ("" if internal else ' target="_blank" rel="noopener noreferrer"')
                out.append(f"<{c.tag}{attrs}>{inner_html(c)}</{c.tag}>")
        else:
            out.append(inner_html(c))
    return "".join(out)


def text(n):
    return html.unescape(re.sub(r"<[^>]+>", "", inner_html(n))).strip()


# --- images -------------------------------------------------------------------
seen_images = {}


def image_url(href):
    absolute = urllib.parse.urljoin(page_url, html.unescape(href))
    parts = urllib.parse.urlsplit(absolute)
    query = urllib.parse.parse_qs(parts.query)
    keep = {}
    if "/resources/" in parts.path and "asset_id" in query:
        keep["asset_id"] = query["asset_id"][0]
    if args.image_size != "orig" and "/resources/" in parts.path:
        keep["size"] = args.image_size
    elif args.image_size != "orig" and "asset_id" in query:
        keep["asset_id"] = query["asset_id"][0]
        keep["size"] = args.image_size
    return urllib.parse.urlunsplit((parts.scheme, parts.netloc, parts.path, urllib.parse.urlencode(keep), ""))


def ext_for(content_type, data):
    if data[:8] == b"\x89PNG\r\n\x1a\n":
        return ".png"
    if data[:3] == b"\xff\xd8\xff":
        return ".jpg"
    if data[:6] in (b"GIF87a", b"GIF89a"):
        return ".gif"
    if data[:4] == b"RIFF" and data[8:12] == b"WEBP":
        return ".webp"
    if b"<svg" in data[:300]:
        return ".svg"
    return ".bin"


def fetch_image(href):
    path_key = urllib.parse.urlsplit(urllib.parse.urljoin(page_url, html.unescape(href))).path
    if path_key in seen_images:
        return seen_images[path_key]
    url = image_url(href)
    base = os.path.basename(path_key)
    existing = [f for f in os.listdir(image_dir) if os.path.splitext(f)[0] == os.path.splitext(base)[0]]
    if existing:
        name = existing[0]
    else:
        data, ctype = get(url)
        name = base if os.path.splitext(base)[1] else base + ext_for(ctype, data)
        with open(os.path.join(image_dir, name), "wb") as f:
            f.write(data)
    seen_images[path_key] = f"{public_prefix}/{name}"
    return seen_images[path_key]


# --- videos -------------------------------------------------------------------
def video_from_iframe(src):
    m = re.search(r"player\.vimeo\.com/video/(\d+)", src)
    if m:
        vid = m.group(1)
        mapped = VIMEO_MAP.get(vid)
        v = {"type": "video", "provider": "vimeo", "id": vid}
        if mapped and mapped.get("kind") == "bunny":
            v["bunny"] = {"guid": mapped["guid"], "title": mapped.get("title"), "needsReview": bool(mapped.get("needsReview"))}
        elif mapped and mapped.get("kind") in ("vimeo", "youtube"):
            v["thirdParty"] = True
        else:
            v["missing"] = {"note": (mapped or {}).get("note", "No mapping recorded."), "candidates": (mapped or {}).get("candidates", [])}
        return v
    m = re.search(r"youtube(?:-nocookie)?\.com/embed/([\w-]+)", src)
    if m:
        return {"type": "video", "provider": "youtube", "id": m.group(1)}
    return {"type": "video", "provider": "other", "src": src}


# --- element extraction ---------------------------------------------------------
def element(c):
    t, cl = c.tag, c.cls()
    align = "center" if "text-center" in cl else None
    if t in ("h3", "h4", "p", "h2", "blockquote"):
        e = {"type": t, "html": inner_html(c).strip()}
    elif t in ("ul", "ol"):
        e = {"type": t, "items": [inner_html(li).strip() for li in c.children if isinstance(li, Node) and li.tag == "li"]}
    elif t == "div" and "link-button-wrapper" in cl:
        iframe = next((x for x in walk(c) if x.tag == "iframe"), None)
        if iframe:
            e = video_from_iframe(iframe.attrs.get("src", ""))
            e["align"] = "center" if "link-center" in cl else "left"
            return e
        a = next((x for x in walk(c) if x.tag == "a"), None)
        target, internal = local_href(html.unescape(a.attrs.get("href", "")))
        btn = {"type": "button", "label": text(a), "href": target, "align": "center" if "link-center" in cl else "left"}
        if internal:
            btn["internal"] = True
        return btn
    elif (t == "div" or t == "figure") and "image" in cl:
        span = next((x for x in walk(c) if "image-placeholder-link" in x.cls()), None)
        cap = next((x for x in walk(c) if "caption" in x.cls()), None)
        href = span.attrs.get("data-href") if span else None
        e = {
            "type": "image",
            "src": fetch_image(href),
            "width": int(span.attrs.get("data-image-width", 0)),
            "height": int(span.attrs.get("data-image-height", 0)),
        }
        # Adobe loads inline images at the placeholder's size=N variant (longest side <= N) and shows
        # them at that natural size, so a 1080x1920 portrait with size=1024 displays 576px wide.
        size = re.search(r"[?&]size=(\d+)", html.unescape(href or ""))
        if NEW_RUNTIME and size and max(e["width"], e["height"]) > int(size.group(1)):
            e["displayWidth"] = round(e["width"] * int(size.group(1)) / max(e["width"], e["height"]))
        if t == "figure":
            e["figure"] = True
            if c.attrs.get("aria-label"):
                e["label"] = html.unescape(c.attrs["aria-label"])
        if cap:
            e["caption"] = inner_html(cap).strip()
        return e
    elif t == "div" and ("author-appreciation-container" in cl or "photo-credits" in cl):
        return None  # handled by dedicated sections
    else:
        # Anything unforeseen is kept verbatim (sanitised) rather than dropped.
        return {"type": "raw", "tag": t, "class": " ".join(cl), "html": inner_html(c).strip()}
    if align:
        e["align"] = align
    return e


def background(sec):
    bg = next((x for x in walk(sec) if "background-image-placeholder-link" in x.cls()), None)
    if not bg:
        return None
    holder = next((x for x in walk(sec) if "section-background-image" in x.cls()), None)
    pos = re.search(r"background-position:\s*([^;]+)", (holder.attrs.get("style", "") if holder else ""))
    return {
        "image": fetch_image(bg.attrs["href"]),
        "width": int(bg.attrs.get("data-image-width", 0)),
        "height": int(bg.attrs.get("data-image-height", 0)),
        "position": pos.group(1).strip() if pos else "50% 50%",
    }


# Runtime generation: Adobe Express webpages and runtime >= 1.23 size inline images to their loaded
# (size=N capped) variant; the older 1.22 runtime scales them to the column width instead.
_rt = re.search(r"page\.adobespark-assets\.com/runtime/([0-9]+\.[0-9]+)", raw)
NEW_RUNTIME = "/webpage/static/runtime/" in raw or bool(_rt and float(_rt.group(1)) >= 1.23)

# --- parse -------------------------------------------------------------------------
b = Builder()
b.feed(raw)
article = next(n for n in walk(b.root) if "article" in n.cls() and "sections-article-layout" in n.cls())
theme_class = next(c for c in article.cls() if c.endswith("-theme"))

result = {
    "source": args.page_url,
    "theme": SCOPE,
    "fontKits": [],
    "title": None,
    "sections": [],
}

for sec in article.children:
    if not isinstance(sec, Node) or "section" not in sec.cls():
        continue
    cl = sec.cls()
    extra = [c for c in cl if c not in ("section",) and not c.endswith("-section")]
    if "title-section" in cl:
        bg = background(sec)
        result["title"] = {
            "position": next((c for c in cl if c.startswith("title-") and c != "title-section"), "title-center"),
            "title": text(next(x for x in walk(sec) if "title" in x.cls() and x.tag == "span")),
            "subtitle": text(next((x for x in walk(sec) if "subtitle" in x.cls()), Node("span", {}, None))),
            "image": bg["image"],
            "imageWidth": bg["width"],
            "imageHeight": bg["height"],
            "backgroundPosition": bg["position"],
        }
    elif "spacer-section" in cl:
        result["sections"].append({"kind": "spacer", "classes": cl[1:], "elements": []})
    elif "fullscreen-photo-section" in cl:
        result["sections"].append({"kind": "fullscreen", "classes": cl[1:], "background": background(sec), "elements": []})
    elif "photo-grid-section" in cl:
        grid = []
        for group in (x for x in walk(sec) if "photo-group" in x.cls() and x.tag == "div"):
            tiles = []
            for a in (x for x in walk(group) if "photo-image" in x.cls()):
                href = a.attrs.get("data-src") or a.attrs.get("href")
                tiles.append({
                    "src": fetch_image(href),
                    "width": int(a.attrs.get("data-image-width", 0)),
                    "height": int(a.attrs.get("data-image-height", 0)),
                })
            layout = next((c for c in group.cls() if re.match(r"t\d-layout-", c)), "")
            grid.append({"layout": layout, "tiles": tiles})
        result["sections"].append({
            "kind": "photo-grid",
            "classes": cl[1:],
            "spacing": {
                "top": "large" if "large-content-spacing-top" in cl else "normal",
                "bottom": "large" if "large-content-spacing-bottom" in cl else "normal",
            },
            "grid": grid,
            "elements": [],
        })
    elif "card-flipbook-section" in cl:
        backs = []
        for holder in (x for x in walk(sec) if "section-background-image" in x.cls()):
            link = next((x for x in walk(holder) if "background-image-placeholder-link" in x.cls()), None)
            if link:
                pos = re.search(r"background-position:\s*([^;]+)", holder.attrs.get("style", ""))
                backs.append({
                    "image": fetch_image(link.attrs["href"]),
                    "width": int(link.attrs.get("data-image-width", 0)),
                    "height": int(link.attrs.get("data-image-height", 0)),
                    "position": pos.group(1).strip() if pos else "50% 50%",
                })
        cards = []
        for view in (x for x in walk(sec) if "section-content-view" in x.cls()):
            container = next((x for x in walk(view) if "content-container" in x.cls()), None)
            if container:
                cards.append({
                    "classes": [c for c in view.cls() if c != "section-content-view"],
                    "elements": [e for e in (element(c) for c in container.children if isinstance(c, Node)) if e],
                })
        result["sections"].append({"kind": "flipbook", "classes": cl[1:], "backgrounds": backs, "cards": cards, "elements": []})
    elif "window-section" in cl:
        bg = background(sec)
        result["sections"].append({"kind": "window", "classes": cl[1:], "background": bg, "elements": []})
    elif "single-column-section" in cl or "full-width-section" in cl:
        container = next(x for x in walk(sec) if "content-container" in x.cls())
        kind = "full-width" if "full-width-section" in cl else ("split" if "split-layout" in cl else "single-column")
        els = [e for e in (element(c) for c in container.children if isinstance(c, Node)) if e]
        entry = {
            "kind": kind,
            "classes": cl[1:],
            "spacing": {
                "top": "large" if "large-content-spacing-top" in cl else "normal",
                "bottom": "large" if "large-content-spacing-bottom" in cl else "normal",
            },
            "elements": els,
        }
        if kind == "split":
            entry["background"] = background(sec)
        result["sections"].append(entry)
    elif "author-section" in cl:
        name = next((x for x in walk(sec) if "name" in x.cls()), None)
        if name:
            result["author"] = text(name)
    elif "credits-section" in cl:
        result["credits"] = [text(p) for p in walk(sec) if p.tag == "p" and "credits-label" not in p.cls()]
    # bumper/footer is Adobe chrome and is intentionally dropped

# --- theme css (re-scoped so pages never collide) ---------------------------------------
# Adobe's built-in themes (luca, crisp, ...) ship as external stylesheets; custom themes are
# inlined in the page. The external sheet loads first, the inline <style> overrides it.
if "/webpage/static/runtime/" in raw:
    runtime = "https://new.express.adobe.com/webpage/static/runtime"
else:
    m = re.search(r"page\.adobespark-assets\.com/runtime/([0-9.]+)/", raw)
    runtime = f"https://page.adobespark-assets.com/runtime/{m.group(1) if m else '1.22'}"


def fetch_text(url):
    data, _ = get(url)
    return (gzip.decompress(data) if data[:2] == b"\x1f\x8b" else data).decode("utf-8", "replace")


theme_asset_dir = os.path.join(ROOT, "public", "courses", args.course, args.slug, "theme")


def localize_css_assets(css, base_url):
    """Store relative url(...) assets (e.g. a theme's quote mark) locally so nothing depends on Adobe."""

    def swap(match):
        ref = match.group(2).strip()
        if ref.startswith(("data:", "http:", "https:", "/", "#")):
            return match.group(0)
        absolute = urllib.parse.urljoin(base_url, ref)
        os.makedirs(theme_asset_dir, exist_ok=True)
        name = os.path.basename(urllib.parse.urlsplit(absolute).path)
        dest = os.path.join(theme_asset_dir, name)
        if not os.path.exists(dest):
            data, _ = get(absolute)
            with open(dest, "wb") as fh:
                fh.write(data)
        return f"url({match.group(1)}/courses/{args.course}/{args.slug}/theme/{name}{match.group(1)})"

    return re.sub(r"""url\(\s*(['"]?)([^'")]+)\1\s*\)""", swap, css)


external = []
for href in re.findall(r'<link[^>]+href="([^"]*/themes/[^"]+\.css)"', raw):
    href = urllib.parse.urljoin(args.page_url, href.replace("&amp;", "&"))
    external.append(localize_css_assets(fetch_text(href), href))
inline = "\n".join(re.findall(r"<style[^>]*>(.*?)</style>", raw, flags=re.S))
style = "\n".join(external + [inline])
style = re.sub(r"\.%s\b" % re.escape(theme_class), "." + SCOPE, style)
with open(css_path, "w", encoding="utf-8") as f:
    f.write(f"/* Theme CSS from {args.page_url} (theme class {theme_class}, re-scoped to .{SCOPE}). */\n{style.strip()}\n")

# --- adobe fonts used by the page -------------------------------------------------------
# The page loads its Adobe Fonts kits through small scripts (base-fonts, themes/<theme>-fonts,
# font-subgroup-kits/<family>); each one names the kit ids it pulls in. Font names found in the
# theme CSS are also tried as subgroup kits for families the scripts do not cover.
kits = []
resolved = []
font_scripts = re.findall(r'src="([^"]*(?:-fonts|font-subgroup-kits/[a-z0-9-]+)\.gz\.js)"', raw)
# Built-in themes (luca, ...) are linked as themes/<name>.gz.css; the runtime loads themes/<name>-fonts.gz.js for them.
font_scripts += [re.sub(r"\.gz\.css$", "-fonts.gz.js", h) for h in re.findall(r'<link[^>]+href="([^"]*/themes/[^"]+\.gz\.css)"', raw)]
for src in dict.fromkeys(font_scripts):
    try:
        found = re.findall(r"typekit\.net/([a-z0-9]{7})", fetch_text(urllib.parse.urljoin(args.page_url, src)))
        if found:
            kits += found
            resolved.append(os.path.basename(src).replace(".gz.js", ""))
    except Exception:  # noqa: BLE001
        pass
names = set()
for group in re.findall(r"font-family:\s*([^;}]+)", style):
    for fam in group.split(","):
        fam = fam.strip().strip("\"'").lower()
        if re.fullmatch(r"[a-z0-9-]+", fam) and fam not in ("sans-serif", "serif", "inherit", "initial", "monospace", "helvetica", "arial"):
            names.add(fam)
for fam in sorted(names):
    try:
        found = re.findall(r"typekit\.net/([a-z0-9]{7})", fetch_text(f"{runtime}/font-subgroup-kits/{fam}.gz.js"))
        if found:
            kits += found
            resolved.append(fam)
    except Exception:  # noqa: BLE001 - not every family has a subgroup kit (system fonts etc.)
        pass
kits = ["onz5gap"] + kits  # adobe-clean + proxima-nova base kit used by credits/author chrome
families = resolved
result["fontKits"] = [f"https://use.typekit.net/{k}.css" for k in dict.fromkeys(kits)]
result["runtime"] = "new" if NEW_RUNTIME else "classic"

with open(spec_path, "w", encoding="utf-8") as f:
    json.dump(result, f, indent=2, ensure_ascii=False)
    f.write("\n")

n_el = sum(len(s["elements"]) for s in result["sections"])
vids = [e for s in result["sections"] for e in s["elements"] if e["type"] == "video"]
print(
    f"{args.slug}: {len(result['sections'])} sections, {n_el} elements, {len(seen_images)} images, "
    f"{len(vids)} videos (bunny {sum(1 for v in vids if 'bunny' in v)}, "
    f"missing {sum(1 for v in vids if 'missing' in v)}), fonts {families}"
)
