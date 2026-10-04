#!/usr/bin/env python3
"""Turn a saved Adobe Express (Spark) page into a JSON page spec + local images.

Usage:
  python3 scripts/adobe_page_to_spec.py <page.html> <page-base-url> <out-json> <image-dir> <public-image-prefix>

Reads the page's server-rendered section markup (title section, single-column
and full-width-photo sections) and records every element in order: headings,
paragraphs (inline b/i/a kept), lists, quotes, buttons, images (+captions) and
video embeds. Corey-owned Vimeo embeds are resolved to Bunny GUIDs through
VIMEO_MAP in build_courses_from_adobe.py; the original Vimeo id is always kept.
Images are downloaded at original resolution into <image-dir>.
"""
import html
import importlib.util
import json
import os
import re
import sys
import urllib.request
from html.parser import HTMLParser

page_html, base_url, out_json, image_dir, public_prefix = sys.argv[1:6]

# --- Vimeo -> Bunny map (existing recovery work) ---------------------------
spec = importlib.util.spec_from_file_location(
    "recovery", os.path.join(os.path.dirname(__file__), "build_courses_from_adobe.py"))
recovery = importlib.util.module_from_spec(spec)
spec.loader.exec_module(recovery)
VIMEO_MAP = recovery.VIMEO_MAP


class Node:
    def __init__(self, tag, attrs, parent):
        self.tag, self.attrs, self.parent, self.children = tag, dict(attrs), parent, []
        self.raw = ""  # concatenated source for inline html

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


def inner_html(n):
    out = []
    for c in n.children:
        if isinstance(c, str):
            out.append(c)
        elif c.tag in ("b", "strong", "i", "em", "u", "br", "a", "span", "sup", "sub"):
            attrs = ""
            if c.tag == "a":
                attrs = f' href="{html.escape(c.attrs.get("href", ""), quote=True)}" target="_blank" rel="noopener noreferrer"'
            if c.tag == "br":
                out.append("<br>")
            else:
                out.append(f"<{c.tag}{attrs}>{inner_html(c)}</{c.tag}>")
        else:
            out.append(inner_html(c))
    return "".join(out)


def text(n):
    return html.unescape(re.sub(r"<[^>]+>", "", inner_html(n))).strip()


os.makedirs(image_dir, exist_ok=True)
seen_images = {}


def fetch_image(rel):
    path = rel.split("?")[0]
    if path in seen_images:
        return seen_images[path]
    name = os.path.basename(path)
    dest = os.path.join(image_dir, name)
    if not os.path.exists(dest):
        req = urllib.request.Request(base_url.rstrip("/") + "/" + path, headers={"User-Agent": "Mozilla/5.0"})
        with urllib.request.urlopen(req, timeout=60) as r, open(dest, "wb") as f:
            f.write(r.read())
    seen_images[path] = f"{public_prefix.rstrip('/')}/{name}"
    return seen_images[path]


def video_from_iframe(src, href):
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
    m = re.search(r"youtube\.com/embed/([\w-]+)", src)
    if m:
        return {"type": "video", "provider": "youtube", "id": m.group(1)}
    return {"type": "video", "provider": "other", "src": src}


def element(c):
    t = c.tag
    cl = c.cls()
    align = "center" if "text-center" in cl else None
    if t in ("h3", "h4", "p"):
        e = {"type": t, "html": inner_html(c).strip()}
    elif t in ("ul", "ol"):
        e = {"type": t, "items": [inner_html(li).strip() for li in c.children if isinstance(li, Node) and li.tag == "li"]}
    elif t == "blockquote":
        e = {"type": "blockquote", "html": inner_html(c).strip()}
    elif t == "div" and "link-button-wrapper" in cl:
        iframe = next((x for x in walk(c) if x.tag == "iframe"), None)
        if iframe:
            e = video_from_iframe(iframe.attrs.get("src", ""), iframe.attrs.get("data-href", ""))
            e["align"] = "center" if "link-center" in cl else "left"
            return e
        a = next((x for x in walk(c) if x.tag == "a"), None)
        return {"type": "button", "label": text(a), "href": a.attrs.get("href", ""), "align": "center" if "link-center" in cl else "left"}
    elif t == "div" and "image" in cl:
        span = next((x for x in walk(c) if "image-placeholder-link" in x.cls()), None)
        cap = next((x for x in walk(c) if "caption" in x.cls()), None)
        href = span.attrs.get("data-href") if span else None
        e = {
            "type": "image",
            "src": fetch_image(href),
            "width": int(span.attrs.get("data-image-width", 0)),
            "height": int(span.attrs.get("data-image-height", 0)),
        }
        if cap:
            e["caption"] = inner_html(cap).strip()
        return e
    else:
        return None
    if align:
        e["align"] = align
    return e


b = Builder()
b.feed(open(page_html, encoding="utf-8").read())
article = next(n for n in walk(b.root) if "article" in n.cls() and "trek-theme" in n.cls())

result = {"title": None, "sections": []}
for sec in article.children:
    if not isinstance(sec, Node) or "section" not in sec.cls():
        continue
    cl = sec.cls()
    if "title-section" in cl:
        bg = next(x for x in walk(sec) if "background-image-placeholder-link" in x.cls())
        bgstyle = next(x for x in walk(sec) if "section-background-image" in x.cls()).attrs.get("style", "")
        pos = re.search(r"background-position:\s*([^;]+)", bgstyle)
        result["title"] = {
            "position": next((c for c in cl if c.startswith("title-") and c != "title-section"), "title-center"),
            "title": text(next(x for x in walk(sec) if "title" in x.cls() and x.tag == "span")),
            "subtitle": text(next(x for x in walk(sec) if "subtitle" in x.cls())),
            "image": fetch_image(bg.attrs["href"]),
            "imageWidth": int(bg.attrs.get("data-image-width", 0)),
            "imageHeight": int(bg.attrs.get("data-image-height", 0)),
            "backgroundPosition": pos.group(1).strip() if pos else "50% 50%",
        }
    elif "single-column-section" in cl or "full-width-section" in cl:
        container = next(x for x in walk(sec) if "content-container" in x.cls())
        kind = "full-width" if "full-width-section" in cl else "single-column"
        els = [e for e in (element(c) for c in container.children if isinstance(c, Node)) if e]
        result["sections"].append({
            "kind": kind,
            "spacing": {"top": "large" if "large-content-spacing-top" in cl else "normal", "bottom": "large" if "large-content-spacing-bottom" in cl else "normal"},
            "elements": els,
        })
    elif "author-section" in cl:
        result["author"] = text(next(x for x in walk(sec) if "name" in x.cls()))
    elif "credits-section" in cl:
        result["credits"] = [text(p) for p in walk(sec) if p.tag == "p" and "credits-label" not in p.cls()]
    # bumper/footer is Adobe chrome and is intentionally dropped

with open(out_json, "w", encoding="utf-8") as f:
    json.dump(result, f, indent=2, ensure_ascii=False)
    f.write("\n")
n = sum(len(s["elements"]) for s in result["sections"])
print(f"{len(result['sections'])} sections, {n} elements, {len(seen_images)} images")
