from __future__ import annotations

import csv
import json
import re
import ssl
import xml.etree.ElementTree as ET
from concurrent.futures import ThreadPoolExecutor, as_completed
from dataclasses import dataclass, asdict
from pathlib import Path
from typing import Iterable
from urllib.request import urlopen


ROOT = Path(__file__).resolve().parents[1]
OUT_DIR = ROOT / "docs" / "inventory"
SITEMAP_URL = "https://www.childactor101.com/sitemap.xml"
BLOG_PREFIX = "https://www.childactor101.com/101-blog/"

SSL_CONTEXT = ssl.create_default_context()


CHAPTER_IMAGE = {
    "Start Here": "/images/chapter-getting-started.jpg",
    "Representation": "/images/chapter-representation.jpg",
    "Auditions": "/images/home-hero.jpg",
    "Technique & Performance": "/images/chapter-technique.jpg",
    "Professional Materials": "/images/chapter-technique.jpg",
    "Parent Operations": "/images/chapter-for-parents.jpg",
    "Networking & Professional Presence": "/images/chapter-for-parents.jpg",
    "Wellness & Resilience": "/images/chapter-for-parents.jpg",
    "Safety & Ethics": "/images/chapter-for-parents.jpg",
    "Career Growth": "/images/chapter-getting-started.jpg",
    "Classroom Admin": "/images/chapter-getting-started.jpg",
}


STOPWORDS = {
    "a",
    "an",
    "and",
    "actors",
    "actor",
    "child",
    "for",
    "from",
    "guide",
    "how",
    "in",
    "is",
    "of",
    "or",
    "the",
    "to",
    "what",
    "why",
    "your",
    "young",
}


PROMO_TERMS = {
    "introducing",
    "is here",
    "podcast is back",
    "rebranded",
    "beta",
    "open call",
    "celebrating",
    "gets an awesome upgrade",
    "continues to grow",
    "book",
    "skool",
}


DIRECT_IMPORT_TERMS = {
    "agent",
    "manager",
    "commission",
    "contract",
    "self tape",
    "audition",
    "callback",
    "headshot",
    "resume",
    "imdbpro",
    "coogan",
    "labor law",
    "social media",
    "rejection",
    "training",
    "background",
    "pilot season",
    "slate",
    "first 20 seconds",
    "representation",
}


@dataclass
class InventoryRow:
    source_id: str
    source_type: str
    source_path_or_url: str
    audit_status: str
    current_title: str
    meta_description: str
    chapter: str
    content_kind: str
    reuse_action: str
    duplicate_group: str
    split_recommendation: str
    recommended_lesson_title: str
    recommended_featured_image: str
    tags: list[str]
    search_keywords: list[str]
    related_lessons: list[str]
    notes: str


def fetch(url: str) -> str:
    with urlopen(url, context=SSL_CONTEXT, timeout=30) as response:
        return response.read().decode("utf-8", "ignore")


def slug_to_title(url: str) -> str:
    slug = url.rstrip("/").split("/")[-1]
    slug = slug.replace("&amp", " and ")
    slug = slug.replace("nbsp", " ")
    slug = slug.replace("-", " ")
    slug = re.sub(r"\s+", " ", slug).strip()
    return " ".join(word.capitalize() for word in slug.split())


def parse_sitemap() -> tuple[dict[str, list[str]], list[str]]:
    xml = fetch(SITEMAP_URL)
    root = ET.fromstring(xml)
    ns = {
        "sm": "http://www.sitemaps.org/schemas/sitemap/0.9",
        "image": "http://www.google.com/schemas/sitemap-image/1.1",
    }
    images_by_url: dict[str, list[str]] = {}
    urls: list[str] = []
    for url_el in root.findall("sm:url", ns):
        loc = url_el.findtext("sm:loc", default="", namespaces=ns)
        if not loc:
            continue
        urls.append(loc)
        images = [
            image_el.findtext("image:loc", default="", namespaces=ns)
            for image_el in url_el.findall("image:image", ns)
        ]
        images_by_url[loc] = [img for img in images if img]
    return images_by_url, urls


def extract_title_and_description(html: str, fallback_title: str) -> tuple[str, str]:
    title_match = re.search(r"<title>(.*?)</title>", html, re.IGNORECASE | re.DOTALL)
    desc_match = re.search(
        r'<meta name="description" content="(.*?)"\s*/?>',
        html,
        re.IGNORECASE | re.DOTALL,
    )
    title = title_match.group(1) if title_match else fallback_title
    title = re.sub(r"\s+&mdash;\s+Child Actor 101.*$", "", title).strip()
    title = re.sub(r"\s+", " ", title)
    description = desc_match.group(1).strip() if desc_match else ""
    description = re.sub(r"\s+", " ", description)
    return title or fallback_title, description


def classify_chapter(text: str) -> str:
    t = text.lower()
    if any(
        key in t
        for key in [
            "scam",
            "labor law",
            "coogan",
            "protecting your child",
            "sb 764",
            "child fame",
            "dark side",
            "safety",
        ]
    ):
        return "Safety & Ethics"
    if any(
        key in t
        for key in [
            "agent",
            "manager",
            "rep",
            "representation",
            "commission",
            "contract",
            "booking out",
            "submitting",
            "favorite client",
            "meeting",
            "temporary no",
            "momager",
        ]
    ):
        return "Representation"
    if any(
        key in t
        for key in [
            "audition",
            "self tape",
            "callback",
            "casting",
            "slate",
            "reader",
            "backdrop",
            "take should you send",
            "virtual casting",
            "wear to an audition",
            "hotel room",
            "equipment",
            "first 20 seconds",
        ]
    ):
        return "Auditions"
    if any(
        key in t
        for key in [
            "headshot",
            "resume",
            "reel",
            "demo",
            "imdbpro",
            "actors access",
            "stage name",
            "monologue",
            "profile",
            "pages101",
            "casting resumes",
            "multifaceted shots",
        ]
    ):
        return "Professional Materials"
    if any(
        key in t
        for key in [
            "budget",
            "tax",
            "expenses",
            "tracker",
            "track your",
            "financial",
            "business side",
            "vision board",
            "time management",
            "consultation",
            "vendor",
        ]
    ):
        return "Parent Operations"
    if any(
        key in t
        for key in [
            "social media",
            "instagram",
            "tiktok",
            "network",
            "directory",
            "watching tv",
            "air check",
            "open call",
            "youtube",
            "screen time that counts",
        ]
    ):
        return "Networking & Professional Presence"
    if any(
        key in t
        for key in [
            "rejection",
            "self-esteem",
            "puberty",
            "awkward years",
            "bounce back",
            "de-rol",
            "stay true",
            "struggling",
            "critical conversation",
            "who i am",
            "letting go",
        ]
    ):
        return "Wellness & Resilience"
    if any(
        key in t
        for key in [
            "method acting",
            "empathy",
            "performance",
            "charisma",
            "beats",
            "grounded",
            "as-if",
            "nonverbal",
            "mission of the scene",
            "lesson",
            "master methods",
            "scene study",
            "honest performance",
            "acting with heart",
            "first moment",
            "say something underneath",
            "memorization",
        ]
    ):
        return "Technique & Performance"
    if any(
        key in t
        for key in [
            "how to become",
            "what it takes",
            "ready for an agent",
            "start acting",
            "pilot season",
            "tv role hierarchy",
            "background acting",
            "industry in 2026",
            "slowdown",
            "what is pilot season",
        ]
    ):
        return "Start Here"
    return "Career Growth"


def classify_content_kind(title: str, source_type: str) -> str:
    if source_type == "internal_source_doc":
        return "source_doc"
    if source_type == "pdf":
        return "guide_pdf"
    if source_type == "hub_page":
        return "content_hub"
    return "lesson_candidate"


def classify_duplicate_group(text: str) -> str:
    t = text.lower()
    groups = [
        ("agent-readiness", ["ready for an agent"]),
        ("manager-explainer", ["manager really does", "talent manager", "agent or a manager"]),
        ("rep-rejection", ["temporary no"]),
        ("rep-contracts-and-commissions", ["commission", "contract"]),
        ("self-tape-first-impression", ["first 20 seconds", "first 15 seconds", "first moment"]),
        ("self-tape-technical-setup", ["equipment", "backdrop", "sound", "hotel room"]),
        ("self-tape-selection", ["which take should you actually send", "keep it or click delete"]),
        ("social-media-necessity-and-safety", ["instagram", "social media", "tiktok"]),
        ("trackers-and-expenses", ["track your auditions", "track your childs auditions", "expenses"]),
        ("momager-question", ["momager"]),
        ("training-importance", ["training", "acting coaching", "hobbyist"]),
        ("open-call-and-representation-events", ["open call"]),
        ("child-labor-and-protection", ["coogan", "labor law", "protecting your child", "sb 764"]),
        ("charisma-and-memorability", ["charisma", "unforgettable", "it factor"]),
    ]
    for group, needles in groups:
        if any(needle in t for needle in needles):
            return group
    return ""


def classify_reuse_action(title: str, description: str, source_type: str) -> str:
    combined = f"{title} {description}".lower()
    if source_type == "internal_source_doc":
        return "divide_into_multiple_standalone_lessons"
    if source_type == "pdf":
        return "import_then_split_by_parent_question"
    if source_type == "hub_page":
        return "update_into_index_or_resource_hub"
    if any(term in combined for term in PROMO_TERMS):
        return "update_or_extract_supporting_lessons"
    if any(term in combined for term in DIRECT_IMPORT_TERMS):
        return "import_as_is_or_lightly_update"
    return "import_with_update"


def recommend_split(title: str, source_type: str, duplicate_group: str) -> str:
    if source_type == "internal_source_doc":
        return "Split by heading and by each single parent question answered in the source."
    if source_type == "pdf":
        return "Split into small practical guides if the PDF covers multiple parent questions."
    if duplicate_group:
        return "Keep one canonical lesson and merge overlapping material from duplicate sources."
    return "Keep as one lesson unless review reveals multiple distinct parent questions."


def build_tags(title: str, chapter: str) -> list[str]:
    words = re.findall(r"[a-z0-9]+", title.lower())
    tags = [chapter.lower()]
    tags.extend(word for word in words if word not in STOPWORDS and len(word) > 2)
    seen: list[str] = []
    for tag in tags:
        if tag not in seen:
            seen.append(tag)
    return seen[:8]


def build_search_keywords(title: str, chapter: str, tags: Iterable[str]) -> list[str]:
    phrases = [title, chapter]
    phrases.extend(tag.replace("&", "and") for tag in tags)
    seen: list[str] = []
    for phrase in phrases:
        phrase = phrase.strip()
        if phrase and phrase not in seen:
            seen.append(phrase)
    return seen[:12]


TITLE_OVERRIDES = {
    "https://www.childactor101.com/101-blog/what-it-takes": "What It Takes To Be a Successful Child Actor",
    "https://www.childactor101.com/101-blog/Temporary-no": "Temporary No: Why Rejection From Talent Reps Isn't the End of the Road",
    "https://www.childactor101.com/101-blog/Actorsaccess": "Actors Access",
    "https://www.childactor101.com/101-blog/Auditiontipsvideo": "Audition Tips Video",
    "https://www.childactor101.com/101-blog/Beats": "Beats",
    "https://www.childactor101.com/101-blog/Characterlab": "Character Lab",
    "https://www.childactor101.com/101-blog/Demo Reel Options": "Demo Reel Options",
    "https://www.childactor101.com/101-blog/2022budget": "2022 Budget",
    "https://www.childactor101.com/101-blog/9steps": "9 Steps",
    "https://www.childactor101.com/101-blog/momager": "Momager",
}


def build_generated_description(title: str, chapter: str) -> str:
    return (
        f"Existing Child Actor 101 source content that fits the {chapter} chapter and should be reviewed "
        f"for classroom reuse around the topic: {title}."
    )


def build_blog_row(url: str, images_by_url: dict[str, list[str]]) -> InventoryRow:
    title = TITLE_OVERRIDES.get(url, slug_to_title(url))
    description = build_generated_description(title, classify_chapter(title))
    chapter = classify_chapter(f"{title} {description}")
    duplicate_group = classify_duplicate_group(f"{title} {description}")
    tags = build_tags(title, chapter)
    image = images_by_url.get(url, [])
    related = []
    notes = "Imported from the live Squarespace blog."
    return InventoryRow(
        source_id=re.sub(r"[^a-z0-9]+", "-", url.lower()).strip("-"),
        source_type="blog_article",
        source_path_or_url=url,
        audit_status="audited_from_live_site",
        current_title=title,
        meta_description=description,
        chapter=chapter,
        content_kind=classify_content_kind(title, "blog_article"),
        reuse_action=classify_reuse_action(title, description, "blog_article"),
        duplicate_group=duplicate_group,
        split_recommendation=recommend_split(title, "blog_article", duplicate_group),
        recommended_lesson_title=title,
        recommended_featured_image=(image[0] if image else CHAPTER_IMAGE[chapter]),
        tags=tags,
        search_keywords=build_search_keywords(title, chapter, tags),
        related_lessons=related,
        notes=notes,
    )


def build_source_rows() -> list[InventoryRow]:
    rows: list[InventoryRow] = []
    module_seeds = {
        "docs/level-up/module-01.md": [
            ("What It Takes To Be A Successful Child Actor", "Start Here"),
            ("Understanding Unions vs Non-Union Work", "Safety & Ethics"),
            ("When To Join SAG-AFTRA", "Safety & Ethics"),
            ("Agents vs Managers", "Representation"),
            ("Regional Representation Strategy", "Representation"),
            ("Voice Over Representation", "Representation"),
            ("Finding Representation Without Scams", "Representation"),
        ],
        "docs/level-up/module-05.md": [
            ("Networking in Showbiz", "Networking & Professional Presence"),
            ("Quarterly Outreach for Young Actors", "Networking & Professional Presence"),
            ("How To Ask for Referrals", "Networking & Professional Presence"),
            ("How To Give Referrals", "Networking & Professional Presence"),
            ("Industry Event Networking Etiquette", "Networking & Professional Presence"),
            ("Social Media as Professional Presence", "Networking & Professional Presence"),
        ],
        "docs/level-up/module-06.md": [
            ("What an Agent Actually Does", "Representation"),
            ("What a Manager Actually Does", "Representation"),
            ("Negotiation Basics for Parents", "Representation"),
            ("How Reps Choose Audition Opportunities", "Representation"),
            ("Maintaining Professional Materials", "Professional Materials"),
            ("How Managers Support Long-Term Growth", "Career Growth"),
        ],
        "docs/level-up/module-07.md": [
            ("Maintaining Self-Esteem as a Child Actor", "Wellness & Resilience"),
            ("Balancing Acting With Childhood", "Wellness & Resilience"),
            ("Helping a Child Actor Handle Rejection", "Wellness & Resilience"),
            ("Healthy Boundaries in the Industry", "Safety & Ethics"),
            ("Protecting Family Time and Self-Care", "Wellness & Resilience"),
            ("How Parents Support Without Pressuring", "Wellness & Resilience"),
        ],
        "docs/level-up/module-08.md": [
            ("Time-Management Hacks for Acting Families", "Parent Operations"),
            ("How To Use a Slate Shot Well", "Auditions"),
            ("How To Build a Better Audition Slate", "Auditions"),
            ("Financial Planning for Young Actors", "Parent Operations"),
            ("How To Track Auditions and Expenses", "Parent Operations"),
        ],
    }

    for source_path, seeds in module_seeds.items():
        for title, chapter in seeds:
            tags = build_tags(title, chapter)
            duplicate_group = classify_duplicate_group(title)
            rows.append(
                InventoryRow(
                    source_id=re.sub(r"[^a-z0-9]+", "-", f"{source_path}-{title}".lower()).strip("-"),
                    source_type="internal_source_doc",
                    source_path_or_url=source_path,
                    audit_status="audited_from_repo_source",
                    current_title=title,
                    meta_description="Internal curriculum source material saved from LEVEL UP for future lesson extraction.",
                    chapter=chapter,
                    content_kind=classify_content_kind(title, "internal_source_doc"),
                    reuse_action=classify_reuse_action(title, "", "internal_source_doc"),
                    duplicate_group=duplicate_group,
                    split_recommendation=recommend_split(title, "internal_source_doc", duplicate_group),
                    recommended_lesson_title=title,
                    recommended_featured_image=CHAPTER_IMAGE[chapter],
                    tags=tags,
                    search_keywords=build_search_keywords(title, chapter, tags),
                    related_lessons=[],
                    notes="Break into the smallest practical standalone lessons possible from source sections.",
                )
            )

    pdf_rows = [
        ("https://www.childactor101.com/freeguides", "/s/Content-Memorization.pdf", "Content Memorization Guide", "Technique & Performance"),
        ("https://www.childactor101.com/freeguides", "/s/7tips.pdf", "7 Tips Guide", "Start Here"),
    ]
    for page_url, pdf_path, title, chapter in pdf_rows:
        tags = build_tags(title, chapter)
        rows.append(
            InventoryRow(
                source_id=re.sub(r"[^a-z0-9]+", "-", f"pdf-{title}".lower()).strip("-"),
                source_type="pdf",
                source_path_or_url=f"https://www.childactor101.com{pdf_path}",
                audit_status="audited_from_live_link_title_pending_full_doc_review",
                current_title=title,
                meta_description=f"Linked PDF source discovered on {page_url}.",
                chapter=chapter,
                content_kind=classify_content_kind(title, "pdf"),
                reuse_action=classify_reuse_action(title, "", "pdf"),
                duplicate_group="",
                split_recommendation=recommend_split(title, "pdf", ""),
                recommended_lesson_title=title,
                recommended_featured_image=CHAPTER_IMAGE[chapter],
                tags=tags,
                search_keywords=build_search_keywords(title, chapter, tags),
                related_lessons=[],
                notes="Needs full PDF read to finalize exact lesson splits and metadata.",
            )
        )

    hub_rows = [
        ("https://www.childactor101.com/freeguides", "Free Guides", "Classroom Admin"),
        ("https://www.childactor101.com/p101", "Pages101", "Professional Materials"),
        ("https://www.childactor101.com/resume-101", "Resume101", "Professional Materials"),
        ("https://www.childactor101.com/self-tape-feedback", "Self Tape Feedback", "Auditions"),
        ("https://www.childactor101.com/ask101", "Ask101", "Parent Operations"),
        ("https://www.childactor101.com/private-coaching", "Private Coaching", "Career Growth"),
        ("https://www.childactor101.com/talent-rep-open-call", "Talent Rep Open Call", "Representation"),
        ("https://www.childactor101.com/youth-actor-workshops", "Youth Actor Workshops", "Technique & Performance"),
        ("https://www.childactor101.com/thecraft", "The Craft", "Technique & Performance"),
        ("https://www.childactor101.com/books-more", "Books and More", "Classroom Admin"),
        ("https://www.childactor101.com/on-youtube", "On YouTube", "Networking & Professional Presence"),
        ("https://www.childactor101.com/parent-courses", "Parent Courses", "Classroom Admin"),
    ]
    for url, title, chapter in hub_rows:
        tags = build_tags(title, chapter)
        rows.append(
            InventoryRow(
                source_id=re.sub(r"[^a-z0-9]+", "-", f"hub-{title}".lower()).strip("-"),
                source_type="hub_page",
                source_path_or_url=url,
                audit_status="audited_from_sitemap_and_page_title",
                current_title=title,
                meta_description="Existing public content hub or product page that can feed the classroom ecosystem.",
                chapter=chapter,
                content_kind=classify_content_kind(title, "hub_page"),
                reuse_action=classify_reuse_action(title, "", "hub_page"),
                duplicate_group="",
                split_recommendation="Use as a supporting resource hub, not as a classroom lesson unless the page contains standalone educational sections.",
                recommended_lesson_title=title,
                recommended_featured_image=CHAPTER_IMAGE[chapter],
                tags=tags,
                search_keywords=build_search_keywords(title, chapter, tags),
                related_lessons=[],
                notes="Review page sections for importable educational subsections.",
            )
        )

    rows.append(
        InventoryRow(
            source_id="newsletter-archive-pending",
            source_type="newsletter_archive",
            source_path_or_url="not-yet-provided",
            audit_status="pending_source_access",
            current_title="Newsletter Archive",
            meta_description="Newsletter source material has not been provided in the current accessible corpus.",
            chapter="Classroom Admin",
            content_kind="source_doc",
            reuse_action="pending_audit",
            duplicate_group="",
            split_recommendation="Audit each newsletter issue by parent question once the archive is provided.",
            recommended_lesson_title="Newsletter Archive",
            recommended_featured_image=CHAPTER_IMAGE["Classroom Admin"],
            tags=["newsletter", "archive", "pending"],
            search_keywords=["newsletter archive", "the callback", "pending source"],
            related_lessons=[],
            notes="Newsletter issues should be split into the smallest parent-question lessons once source files are available.",
        )
    )

    return rows


def attach_related(rows: list[InventoryRow]) -> None:
    by_chapter: dict[str, list[InventoryRow]] = {}
    by_duplicate: dict[str, list[InventoryRow]] = {}
    for row in rows:
        by_chapter.setdefault(row.chapter, []).append(row)
        if row.duplicate_group:
            by_duplicate.setdefault(row.duplicate_group, []).append(row)

    for row in rows:
        related: list[str] = []
        if row.duplicate_group and len(by_duplicate.get(row.duplicate_group, [])) > 1:
            related.extend(
                other.current_title
                for other in by_duplicate[row.duplicate_group]
                if other.current_title != row.current_title
            )
        if len(related) < 3:
            related.extend(
                other.current_title
                for other in by_chapter.get(row.chapter, [])
                if other.current_title != row.current_title and other.current_title not in related
            )
        row.related_lessons = related[:3]


def write_outputs(rows: list[InventoryRow]) -> None:
    OUT_DIR.mkdir(parents=True, exist_ok=True)

    json_path = OUT_DIR / "classroom-content-inventory.json"
    csv_path = OUT_DIR / "classroom-content-inventory.csv"
    md_path = OUT_DIR / "classroom-content-inventory.md"

    json_path.write_text(json.dumps([asdict(row) for row in rows], indent=2), encoding="utf-8")

    with csv_path.open("w", newline="", encoding="utf-8") as handle:
        writer = csv.writer(handle)
        writer.writerow(
            [
                "source_id",
                "source_type",
                "source_path_or_url",
                "audit_status",
                "current_title",
                "meta_description",
                "chapter",
                "content_kind",
                "reuse_action",
                "duplicate_group",
                "split_recommendation",
                "recommended_lesson_title",
                "recommended_featured_image",
                "tags",
                "search_keywords",
                "related_lessons",
                "notes",
            ]
        )
        for row in rows:
            writer.writerow(
                [
                    row.source_id,
                    row.source_type,
                    row.source_path_or_url,
                    row.audit_status,
                    row.current_title,
                    row.meta_description,
                    row.chapter,
                    row.content_kind,
                    row.reuse_action,
                    row.duplicate_group,
                    row.split_recommendation,
                    row.recommended_lesson_title,
                    row.recommended_featured_image,
                    ", ".join(row.tags),
                    ", ".join(row.search_keywords),
                    ", ".join(row.related_lessons),
                    row.notes,
                ]
            )

    total = len(rows)
    blog_count = sum(1 for row in rows if row.source_type == "blog_article")
    module_seed_count = sum(1 for row in rows if row.source_type == "internal_source_doc")
    chapter_counts: dict[str, int] = {}
    for row in rows:
        chapter_counts[row.chapter] = chapter_counts.get(row.chapter, 0) + 1
    duplicate_rows = [row for row in rows if row.duplicate_group]

    lines = [
        "# Classroom Content Inventory",
        "",
        "Generated from the live sitemap, current blog corpus, accessible guide links, and saved internal source docs.",
        "",
        "## Totals",
        "",
        f"- Total audited rows: {total}",
        f"- Blog article rows: {blog_count}",
        f"- Internal source-doc lesson seeds: {module_seed_count}",
        "",
        "## Chapter Distribution",
        "",
    ]
    for chapter, count in sorted(chapter_counts.items()):
        lines.append(f"- {chapter}: {count}")

    lines.extend(
        [
            "",
            "## Reuse Rules Applied",
            "",
            "- `import_as_is_or_lightly_update`: keep the existing article as the classroom lesson whenever quality is already high.",
            "- `import_with_update`: keep the core article, but refresh framing, metadata, and internal links for the classroom.",
            "- `divide_into_multiple_standalone_lessons`: source material answers several distinct parent questions and should be broken apart.",
            "- `update_or_extract_supporting_lessons`: product or announcement content should not become a classroom lesson unchanged, but may contain reusable educational sections.",
            "",
            "## Duplicate Topic Clusters",
            "",
        ]
    )
    for group in sorted({row.duplicate_group for row in duplicate_rows if row.duplicate_group}):
        titles = [row.current_title for row in rows if row.duplicate_group == group]
        lines.append(f"- `{group}`: " + "; ".join(titles))

    lines.extend(
        [
            "",
            "## Pending Source Gaps",
            "",
            "- Newsletter archive was not directly accessible in the current source corpus and is marked pending.",
            "- PDF assets discovered on `/freeguides` need a full document read to finalize exact lesson splits.",
            "- Product and hub pages should be reviewed section-by-section for embedded educational copy before generating new lessons.",
            "",
            "## Output Files",
            "",
            "- `docs/inventory/classroom-content-inventory.json`",
            "- `docs/inventory/classroom-content-inventory.csv`",
        ]
    )
    md_path.write_text("\n".join(lines) + "\n", encoding="utf-8")


def main() -> None:
    images_by_url, urls = parse_sitemap()
    blog_urls = [
        url
        for url in urls
        if url.startswith(BLOG_PREFIX)
        and url != "https://www.childactor101.com/101-blog"
        and "/category/" not in url
        and "/tag/" not in url
    ]
    blog_rows: list[InventoryRow] = []
    with ThreadPoolExecutor(max_workers=10) as executor:
        future_map = {executor.submit(build_blog_row, url, images_by_url): url for url in blog_urls}
        for future in as_completed(future_map):
            blog_rows.append(future.result())

    rows = sorted(blog_rows, key=lambda row: row.current_title.lower())
    rows.extend(build_source_rows())
    attach_related(rows)
    rows.sort(key=lambda row: (row.chapter, row.current_title.lower()))
    write_outputs(rows)


if __name__ == "__main__":
    main()
