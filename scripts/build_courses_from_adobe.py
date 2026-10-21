#!/usr/bin/env python3
"""NOTE: SUPERSEDED. This emits the old lesson-based model (sections + lessons). The
course data files have since been restructured into modules + content blocks and
are now the source of truth; re-running this would overwrite them with the old shape.

Build typed course content files from recovered Adobe Express course pages.

Reads the recovered page extraction JSON (produced from the saved public Adobe
Express webpages) and emits src/content/courses/no-excuses.ts and
src/content/courses/perfect-self-tape.ts.

Course copy is preserved verbatim from the legacy pages. Video mapping follows
docs/../recovery audit: HIGH confidence Vimeo -> Bunny matches are direct,
MEDIUM are included with needsReview, LOW/unmatched keep a placeholder with the
legacy Vimeo ID and candidates.

Usage:
  python3 scripts/build_courses_from_adobe.py <path-to-extraction-dir>
"""
import json
import os
import sys

# --- Vimeo -> Bunny mapping (from recovery audit) ---------------------------

import os
import sys

sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), "adobe-extractor"))
from video_map import VIMEO_MAP, bunny, external_vimeo, missing  # noqa: E402,F401


def expand(ref):
    provider, vid = ref.split(":", 1)
    return ({"v": "vimeo", "y": "youtube"}[provider], vid)


def video_for(provider, vid):
    if provider == "youtube":
        return {"kind": "youtube", "videoId": vid, "thirdParty": True,
                "note": "Third-party tutorial/reference embed preserved from the legacy course pages."}
    mapped = VIMEO_MAP.get(vid)
    if not mapped:
        raise KeyError(f"No mapping for vimeo:{vid}")
    return dict(mapped)


# --- Course specifications ---------------------------------------------------

NE = "https://express.adobe.com/page/srf8IpDO7ZkIU/"
PST = "https://express.adobe.com/page/4N3CH5BgyUPgp/"


def section(slug, title, page_id):
    return {"slug": slug, "title": title, "legacyAdobeUrl": f"https://express.adobe.com/page/{page_id}/"}


def lesson(slug, title, section_slug, page_id, vids, note=None):
    return {"slug": slug, "title": title, "sectionSlug": section_slug, "pageId": page_id,
            "vids": vids, "reviewNote": note}


NO_EXCUSES = {
    "slug": "no-excuses",
    "title": "NO EXCUSES! DIY Actor Demo Reel Clips",
    "subtitle": "Write it, prep it, shoot it, edit it, use it.",
    "description": (
        "The recovered Child Actor 101 demo clip course. Across five sections, families learn how to plan, "
        "write, shoot, edit, and actually use professional demo reel clips for their young actor - without "
        "excuses and without a Hollywood budget. Migrated from the original course so every lesson, video "
        "position, and resource is preserved."
    ),
    "legacyAdobeUrl": NE,
    "sections": [
        section("welcome", "Welcome", "srf8IpDO7ZkIU"),
        section("write-it", "Section One - Write It", "MltFArqt4mOOT"),
        section("plan-prep-it", "Section Two - Plan & Prep It", "6DKzqO1Wiw758"),
        section("shoot-it", "Section Three - Shoot It", "f5hjv4sMwNeA3"),
        section("edit-it", "Section Four - Edit It", "GMt6OK0rvfYVm"),
        section("use-it", "Section Five - Use It", "z4dBmikw9rtLK"),
    ],
    "lessons": [
        lesson("welcome-message", "Welcome Message", "welcome", "srf8IpDO7ZkIU", ["v:379943966"]),
        lesson("meet-corey-ralston", "Meet Corey Ralston", "welcome", "srf8IpDO7ZkIU", ["v:377218725"]),
        lesson("why-clips-matter", "Got Tape? Why Clips Matter", "welcome", "srf8IpDO7ZkIU", ["v:387252761"]),
        lesson("welcome-to-write-it", "Welcome to Write It", "write-it", "MltFArqt4mOOT", ["v:377218224"]),
        lesson("genres-and-types", "Deciding What to Write: Genres & Types", "write-it", "MltFArqt4mOOT", ["v:377218442"]),
        lesson("inspiration-station", "Inspiration Station", "write-it", "MltFArqt4mOOT", ["v:377213706"]),
        lesson("example-inspired-scene", "Example of an Inspired Scene (Shameless)", "write-it", "MltFArqt4mOOT", ["y:hkxRu3Osc0U"]),
        lesson("reworked-shameless-scene", "The Re-Worked Scene", "write-it", "MltFArqt4mOOT", ["v:324792551"]),
        lesson("logistics-cast-and-location", "Logistics: Cast & Location", "write-it", "MltFArqt4mOOT", ["v:377218490"]),
        lesson("a-clip-for-two", "A Clip for Two", "write-it", "MltFArqt4mOOT", ["v:371529420"]),
        lesson("your-first-mission", "Your First Mission", "write-it", "MltFArqt4mOOT", ["v:377218287"]),
        lesson("creative-fencing", "Creative Fencing", "write-it", "MltFArqt4mOOT", ["v:377218581"]),
        lesson("writing-for-tone", "Writing for the Tone of a Genre", "write-it", "MltFArqt4mOOT", ["v:377218960"]),
        lesson("monologue-as-a-clip", "Monologue as a Clip", "write-it", "MltFArqt4mOOT", ["v:288832063", "v:377219246"]),
        lesson("dont-be-scared", "Don't Be Scared", "write-it", "MltFArqt4mOOT", ["v:377218336"]),
        lesson("welcome-back", "Welcome Back", "plan-prep-it", "6DKzqO1Wiw758", ["v:387346357"]),
        lesson("plan-prep-part-two", "Plan & Prep, Part Two", "plan-prep-it", "6DKzqO1Wiw758", ["v:387357732"]),
        lesson("plan-prep-part-three", "Plan & Prep, Part Three", "plan-prep-it", "6DKzqO1Wiw758", ["v:387347988"]),
        lesson("plan-prep-part-four", "Plan & Prep, Part Four", "plan-prep-it", "6DKzqO1Wiw758", ["v:387348581"]),
        lesson("lighting-gear-and-setup", "Lighting Gear & Setup", "plan-prep-it", "6DKzqO1Wiw758", ["v:387349854"]),
        lesson("microphones-and-sound", "Microphones: Consistent Quality Sound", "plan-prep-it", "6DKzqO1Wiw758", ["v:387349950"]),
        lesson("whos-who-on-a-movie-crew", "Who's Who on a Movie Crew", "plan-prep-it", "6DKzqO1Wiw758", ["v:71838170"]),
        lesson("microphone-and-sound-tutorials", "Microphone & Sound Tutorials", "plan-prep-it", "6DKzqO1Wiw758",
               ["y:0A33YDw23KQ", "y:4GnHbXXE16Y", "y:NAvn7CNpdB8", "y:X1y5-z9pGFc", "y:UKRiVyJRtnI",
                "y:vPJwVUYl0Nk", "y:srwsr1gM-Mw", "y:VTwzOeyV1bw", "y:b8ppTuW6jkU", "y:9lnk8TtjYDc"]),
        lesson("plan-prep-part-five", "Plan & Prep, Part Five", "plan-prep-it", "6DKzqO1Wiw758", ["v:387350883"]),
        lesson("plan-prep-part-six", "Plan & Prep, Part Six", "plan-prep-it", "6DKzqO1Wiw758", ["v:387350986"]),
        lesson("plan-prep-part-seven", "Plan & Prep, Part Seven", "plan-prep-it", "6DKzqO1Wiw758", ["v:387352092"]),
        lesson("plan-prep-part-eight", "Plan & Prep, Part Eight", "plan-prep-it", "6DKzqO1Wiw758", ["v:387351912"]),
        lesson("plan-prep-part-nine", "Plan & Prep, Part Nine", "plan-prep-it", "6DKzqO1Wiw758", ["v:387352511"]),
        lesson("welcome-to-shoot-it", "Welcome to Shoot It", "shoot-it", "f5hjv4sMwNeA3", ["v:387353415"]),
        lesson("production-design", "Production Design", "shoot-it", "f5hjv4sMwNeA3", ["y:KjtQ9vSnnCw", "y:hPHGpOrNT_A"]),
        lesson("locations-and-props", "Locations & Props", "shoot-it", "f5hjv4sMwNeA3", ["v:143619334", "y:M-E14zQhAyM", "y:Y2wmFKV9vd0"]),
        lesson("cinematic-lighting", "Cinematic Lighting", "shoot-it", "f5hjv4sMwNeA3", ["y:ZJ__r8QQ7Yc"]),
        lesson("smartphone-accessories", "Accessories for Smartphone Filmmakers", "shoot-it", "f5hjv4sMwNeA3",
               ["y:Ycpqv36s0Fg", "y:9AGaECt9j4g", "y:GouHne1nPGk"]),
        lesson("lighting-techniques", "Lighting Techniques", "shoot-it", "f5hjv4sMwNeA3", ["y:zuwnNSgb3p8", "y:IWYHJwO9TSg"]),
        lesson("lighting-on-a-low-budget", "Lighting Tips for Low or No Budget", "shoot-it", "f5hjv4sMwNeA3",
               ["y:RES5bZFx1Cc", "y:2Y6bB86HmdA", "y:IApcdo6OGcs"]),
        lesson("my-lighting-obsession", "My Lighting Obsession", "shoot-it", "f5hjv4sMwNeA3", ["v:387392930"]),
        lesson("more-lighting-examples", "More Lighting Examples", "shoot-it", "f5hjv4sMwNeA3",
               ["y:NqcHoVs3fKY", "y:xZkrgDxTogE", "y:Co21Gw7zqNY", "y:RWJ5HxQVTzk"]),
        lesson("reaction-shots", "Reaction Shots", "shoot-it", "f5hjv4sMwNeA3", ["y:EBykqNDKbKY"]),
        lesson("three-shot-example", "Three Shot Example", "shoot-it", "f5hjv4sMwNeA3", ["v:344516472"]),
        lesson("three-shot-tutorials", "Three Shot Tutorials", "shoot-it", "f5hjv4sMwNeA3",
               ["y:VwbSxxm6skM", "y:IK2IAEO-FUI", "y:4zDMwCZDKSI", "y:T4hfGzDtzXk", "y:wDjr0vaCTx8"]),
        lesson("shot-by-shot-example", "Shot by Shot Example", "shoot-it", "f5hjv4sMwNeA3", ["v:387395199"]),
        lesson("what-is-a-mark", "What Is a Mark?", "shoot-it", "f5hjv4sMwNeA3", ["y:i9uynS5ZrW4"]),
        lesson("microphones", "Microphones", "shoot-it", "f5hjv4sMwNeA3", ["y:ptV0FQQRFPI"]),
        lesson("lavalier-mics", "Lavalier Mics", "shoot-it", "f5hjv4sMwNeA3", ["y:FG78T1l88_w"]),
        lesson("let-me-save-you-the-trouble", "Let Me Save You the Trouble", "shoot-it", "f5hjv4sMwNeA3", ["v:387501390"]),
        lesson("take-a-chill-pill", "Take a Chill Pill", "shoot-it", "f5hjv4sMwNeA3", ["v:387609679", "v:387612134"]),
        lesson("filming-with-flair", "Filming with Flair", "shoot-it", "f5hjv4sMwNeA3", ["y:wNXNEs2eBkg"]),
        lesson("check-the-gate", "Check the Gate", "shoot-it", "f5hjv4sMwNeA3", ["v:387615832"]),
        lesson("welcome-back-editing", "Welcome Back", "edit-it", "GMt6OK0rvfYVm", ["v:391173336"]),
        lesson("editing-concepts-series", "Editing Concepts: Tutorial Series", "edit-it", "GMt6OK0rvfYVm",
               ["y:aJ0_SP5nBMg", "y:lL0CSAj5NRk", "y:3OoQ7H0vZmg", "y:6vHwk2ocHy0", "y:F3oCPLMUdF0",
                "y:_4xFwiUAaMY", "y:WUXNpxXsUZs", "y:AcanZUMYup0", "y:8maIJExywLo", "y:Z-Y375vxfTE",
                "y:FGp0N7nI84w", "y:ISO44m3T93o", "y:gUjvmvdDWjo", "y:WyP-YnAgIWo"]),
        lesson("coreys-enlight-overview", "Corey's Enlight App Overview", "edit-it", "GMt6OK0rvfYVm", ["v:391760430"]),
        lesson("slate-sync-and-sound", "Slate, Sync & Sound", "edit-it", "GMt6OK0rvfYVm",
               ["y:_q9s3n7PGuk", "y:X8cr0_wfKdI", "y:sfmyjPr4k_g"]),
        lesson("corey-walks-you-through-an-edit", "Corey Walks You Through an Edit", "edit-it", "GMt6OK0rvfYVm", ["v:391763750"]),
        lesson("more-editing-videos", "More Awesome Videos to Learn From", "edit-it", "GMt6OK0rvfYVm",
               ["y:FxKkzb5gJEw", "y:oeFlJCgxN-A", "y:d2fyviJHwWQ", "y:6mvjS-sl39E", "y:QChWIFi8fOY"]),
        lesson("essential-cuts", "Essential Cuts", "edit-it", "GMt6OK0rvfYVm", ["y:oie7yQgMzVw"]),
        lesson("interview-kasey-atkins", "Guest Interview: Filmmaker & Editor Kasey Atkins", "edit-it", "GMt6OK0rvfYVm", ["v:390130720"]),
        lesson("trimming-and-pacing", "Trimming & Pacing", "edit-it", "GMt6OK0rvfYVm",
               ["y:59PjgIjImEk", "y:ptXlYulVAsM", "y:O2NqB8HtBhI", "y:EBykqNDKbKY"]),
        lesson("overlays-and-labeling", "Overlays & Labeling", "edit-it", "GMt6OK0rvfYVm", ["v:390282478"]),
        lesson("overlay-and-videosoap-tutorials", "Overlay & VideoSoap Tutorials", "edit-it", "GMt6OK0rvfYVm",
               ["y:D9RHy4c_NuM", "y:F7LK9QUXrD8", "y:GviVrkBypcM"]),
        lesson("corey-sets-the-score", "Corey Sets the Score", "edit-it", "GMt6OK0rvfYVm", ["v:391178618"]),
        lesson("choosing-music", "Choosing Music", "edit-it", "GMt6OK0rvfYVm",
               ["y:CWfQQStRf24", "y:rEfXv-XxPqA", "y:ttjXfVQi0Mg"]),
        lesson("wrapping-up-unit-4", "Wrapping Up Unit 4", "edit-it", "GMt6OK0rvfYVm", ["v:391183772"]),
        lesson("welcome-to-the-final-section", "Welcome to the Final Section", "use-it", "z4dBmikw9rtLK", ["v:396112238"]),
        lesson("uploading-to-actors-access", "Uploading to Actors Access", "use-it", "z4dBmikw9rtLK", ["y:5oNzfh-kYV4"]),
        lesson("casting-networks", "Casting Networks", "use-it", "z4dBmikw9rtLK", ["y:cXjbBZrB5Ow", "y:d_f71yAnYyk"]),
        lesson("casting-frontier", "Casting Frontier", "use-it", "z4dBmikw9rtLK", ["y:Ll4QfdBl48s"]),
        lesson("imdb-and-imdbpro", "IMDb & IMDbPro", "use-it", "z4dBmikw9rtLK", ["y:vjOQSMV_j9A"]),
        lesson("a-very-important-message", "A Very Important Message from Corey", "use-it", "z4dBmikw9rtLK", ["v:396114925"]),
        lesson("child-actor-net-safety", "Child Actor Net Safety", "use-it", "z4dBmikw9rtLK", ["y:kf4noMCdDIc"]),
        lesson("vimeo-for-hosting", "Vimeo for Video Hosting", "use-it", "z4dBmikw9rtLK", ["v:359315033"]),
        lesson("your-actors-website", "Your Actor's Website", "use-it", "z4dBmikw9rtLK", ["y:BAHZo07NGE4", "y:u2TIogm-lP0"]),
        lesson("facebook-for-actors", "Facebook for Actors", "use-it", "z4dBmikw9rtLK", ["y:QeCcFeiR6hI"]),
        lesson("instagram-for-actors", "Instagram for Actors", "use-it", "z4dBmikw9rtLK", ["y:KHWzla2xyqM", "y:fmlrY9g5QEg"]),
        lesson("email-and-networking", "Email & Networking", "use-it", "z4dBmikw9rtLK", ["y:MNyyKkryKlc", "y:J95rAND9mpE"]),
        lesson("a-wrap", "And That Is... A Wrap!", "use-it", "z4dBmikw9rtLK", ["v:396116394"]),
    ],
}

PERFECT_SELF_TAPE = {
    "slug": "perfect-self-tape",
    "title": "The Perfect Self Tape",
    "subtitle": "A Parent Course",
    "description": (
        "The recovered Child Actor 101 self tape course for parents. Ten sections covering equipment, lighting, "
        "framing, slates, readers, performance coaching, editing, parent survival, sending tapes, and when to "
        "bend the rules - migrated from the original course with every lesson, video position, and resource "
        "preserved."
    ),
    "legacyAdobeUrl": PST,
    "sections": [
        section("equipment", "Essential Equipment", "t89Ol45aZnWWO"),
        section("properly-lit", "Properly Lit: Self Tape Lighting Explained", "fKEcYmY4tk1Ru"),
        section("perfect-frame", "The Perfect Frame", "5HkJaHOKEnWA5"),
        section("slates", "Slates That Pop", "HTdXKtkSq3Ksq"),
        section("role-of-the-reader", "The Role of the Reader", "9h9pR9OX1OZq7"),
        section("coaching", "Performance Coaching", "FrbVFiuNM7Jxy"),
        section("quick-editing", "Quick Editing", "OQdMObzEI8etD"),
        section("parent-survival", "Parent Survival Tips", "ZYQXknWCAzt3i"),
        section("sending-tapes", "Sending Your Tapes", "E3kmokZywrFef"),
        section("bending-the-rules", "Bending the Rules", "ko5JZe1bqtBnz"),
    ],
    "lessons": [
        lesson("essential-lighting-softboxes", "Lighting Gear: Softboxes & the 3-Point Setup", "equipment", "t89Ol45aZnWWO", ["y:Oum3SuOsAN4"]),
        lesson("ring-lights", "Ring Lights", "equipment", "t89Ol45aZnWWO", ["y:K4wsrW0VpLE"]),
        lesson("led-lights", "LED Lights", "equipment", "t89Ol45aZnWWO", ["y:TiAsjx5j7GA", "y:B00GMcqSWjk"]),
        lesson("tripods-and-audio", "Tripods, Mounts & Lavalier Mics", "equipment", "t89Ol45aZnWWO", ["y:hoj_uDLJpm4"]),
        lesson("backdrops-and-shopping-list", "Backdrops & the Shopping Guide", "equipment", "t89Ol45aZnWWO", []),
        lesson("understanding-lighting", "Understanding Lighting", "properly-lit", "fKEcYmY4tk1Ru", ["y:nqMQZG68Wkc"]),
        lesson("lighting-gear", "Make Sure You Have the Gear", "properly-lit", "fKEcYmY4tk1Ru", ["y:gj3R0OM2mKc", "y:qSTGnl7HHao"]),
        lesson("learning-to-light", "Learning to Light", "properly-lit", "fKEcYmY4tk1Ru",
               ["y:rq0q3Ea5fkQ", "y:j_Sov3xmgwg", "y:xJAI7ddS-b0"]),
        lesson("a-real-home-setup", "A Real Home Self Tape Setup", "properly-lit", "fKEcYmY4tk1Ru",
               ["y:uCAnQ8gipcg", "y:9NWAcK-wM80"]),
        lesson("skin-tones-and-mood", "Skin Tones & Mood", "properly-lit", "fKEcYmY4tk1Ru", ["y:QhVOLaRHv94"]),
        lesson("the-perfect-frame", "The Perfect Frame", "perfect-frame", "5HkJaHOKEnWA5", [],
               note="The legacy page was visual-only (good vs. bad frame comparison images hosted by Adobe; not migrated). "
                    "No video embed existed on the page. Candidate Bunny video 694fccfe-955e-4cff-90da-91d7e479f423 "
                    "('Self Tape Framing - Entrances.mp4', main library) may belong here - unconfirmed."),
        lesson("slates-that-pop", "Bonus Slate Shot Ideas", "slates", "HTdXKtkSq3Ksq", ["v:334221482"]),
        lesson("the-reader-parent-course", "The Reader (Live Parent Course)", "role-of-the-reader", "9h9pR9OX1OZq7", ["v:392546804"]),
        lesson("coaching-the-opportunity", "Coaching the Opportunity", "coaching", "FrbVFiuNM7Jxy", ["v:393058496"]),
        lesson("trimming-videos", "Trimming Videos Quickly", "quick-editing", "OQdMObzEI8etD", ["y:ci0ivwWQ6vQ"]),
        lesson("merging-and-sound", "Merging & Sound on iPad", "quick-editing", "OQdMObzEI8etD", ["y:VJOnSgoTcT8"]),
        lesson("coreys-editing-walkthrough", "Corey's App Overview & Edit Walkthrough", "quick-editing", "OQdMObzEI8etD",
               ["v:391760430", "v:391763750"]),
        lesson("all-in-one-apps", "All-in-One Apps", "quick-editing", "OQdMObzEI8etD", ["y:cSmb2_zBFs4", "y:YxIpZR1Vy1Q"]),
        lesson("stress-free-taping", "Survival Tips: Stress-Free Taping", "parent-survival", "ZYQXknWCAzt3i", ["y:7htgIHQikMI"]),
        lesson("file-formats-and-compression", "File Formats & Compression", "sending-tapes", "E3kmokZywrFef", ["y:z_VtxrKolZU"]),
        lesson("handbrake", "Compressing with Handbrake", "sending-tapes", "E3kmokZywrFef", ["y:j4xs37QFDE8"]),
        lesson("uploading-to-ecocast", "Uploading to EcoCast (Actors Access)", "sending-tapes", "E3kmokZywrFef",
               ["y:2c5bGtJJt4o", "y:TMGcgzR4le8"]),
        lesson("security-and-final-tips", "Security, Two Takes & the Clock", "sending-tapes", "E3kmokZywrFef", []),
        lesson("setting-the-mood-with-music", "Setting the Mood: Music & Underscore", "bending-the-rules", "ko5JZe1bqtBnz", ["y:cJ1zhq3yNBM"]),
        lesson("example-dacre-stranger-things", "Example: Dacre's Stranger Things Tape", "bending-the-rules", "ko5JZe1bqtBnz", ["v:336444157"]),
        lesson("example-nicholas-bw-tape", "Example: Nicholas' Black & White Tape", "bending-the-rules", "ko5JZe1bqtBnz", ["v:395384847"]),
    ],
}

HUB_COPY = {
    "PST_INTRO": "This page will have all the Master Links to the ten sections within this course. I hope you enjoy the process and see the bigger picture. And I am here to help. Ask away if you are confused!",
}


def build_body(window):
    """Convert raw blocks into body sections (heading / paragraphs / bullets)."""
    sections = []
    current = None
    images = 0
    for block in window:
        btype = block["type"]
        if btype in ("h3", "h4"):
            heading = block["text"]
            if current and current.get("heading") and not current["paragraphs"] and not current.get("bullets"):
                current["heading"] = current["heading"] + " / " + heading
            else:
                current = {"heading": heading, "paragraphs": []}
                sections.append(current)
        elif btype in ("p", "quote"):
            text = block["text"]
            if not text:
                continue
            if current is None:
                current = {"paragraphs": []}
                sections.append(current)
            current["paragraphs"].append(text)
        elif btype == "list":
            if current is None:
                current = {"paragraphs": []}
                sections.append(current)
            current.setdefault("bullets", []).extend(block["items"])
        elif btype == "img":
            images += 1
    for section_entry in sections:
        if "bullets" in section_entry and not section_entry["bullets"]:
            del section_entry["bullets"]
    return sections, images


def build_resources(window):
    resources = []
    seen = set()
    for block in window:
        if block["type"] == "btn":
            href = block["href"]
            if "express.adobe.com" in href or "spark.adobe.com" in href:
                continue
            key = (block["text"], href)
            if key in seen:
                continue
            seen.add(key)
            resources.append({"title": block["text"] or href, "href": href})
        elif block["type"] == "p":
            for link in block.get("links", []):
                key = (link["text"], link["href"])
                if key in seen:
                    continue
                seen.add(key)
                resources.append({"title": link["text"], "href": link["href"], "note": "Linked from the lesson text"})
    return resources


def generate(course, pages, export_name, const_name):
    lessons_out = []
    stats = {"bunny": 0, "bunnyReview": 0, "youtube": 0, "extVimeo": 0, "missing": 0, "resources": 0, "images": 0}
    for spec in course["lessons"]:
        page = pages[spec["pageId"]]
        # functions below track pointer state per page via attribute
        blocks = page["blocks"]
        ptr = page.get("_ptr", 0)
        # find this lesson's first video and slice the window before it
        vids = spec["vids"]
        if vids:
            provider, vid_id = expand(vids[0])
            first_idx = None
            for i in range(ptr, len(blocks)):
                if blocks[i]["type"] == "video" and blocks[i]["provider"] == provider and blocks[i]["id"] == vid_id:
                    first_idx = i
                    break
            if first_idx is None:
                raise AssertionError(f"{spec['pageId']}: video {vids[0]} for lesson {spec['slug']} not found after block {ptr}")
            window = blocks[ptr:first_idx]
            consumed = 1
            end = first_idx + 1
            # consume mid-blocks until every expected video is consumed in order
            for extra in vids[1:]:
                p2, id2 = expand(extra)
                nxt = None
                for i in range(end, len(blocks)):
                    if blocks[i]["type"] == "video" and blocks[i]["provider"] == p2 and blocks[i]["id"] == id2:
                        nxt = i
                        break
                if nxt is None:
                    raise AssertionError(f"{spec['pageId']}: video {extra} for lesson {spec['slug']} not found")
                window += blocks[end:nxt]
                end = nxt + 1
                consumed += 1
            page["_ptr"] = end
            videos = [video_for(*expand(v)) for v in vids]
        else:
            # lesson without video consumes the rest of the page
            window = blocks[ptr:]
            page["_ptr"] = len(blocks)
            videos = []

        body, n_images = build_body(window)
        resources = build_resources(window)
        stats["images"] += n_images

        summary = None
        for s in body:
            if s["paragraphs"]:
                first = s["paragraphs"][0]
                summary = first if len(first) <= 160 else first[:157].rstrip() + "..."
                break

        lesson_out = {
            "slug": spec["slug"],
            "title": spec["title"],
            "sectionSlug": spec["sectionSlug"],
            "body": body,
            "resources": resources,
            "legacyAdobeUrl": f"https://express.adobe.com/page/{spec['pageId']}/",
        }
        if summary:
            lesson_out["summary"] = summary
        if len(videos) == 1:
            lesson_out["video"] = videos[0]
        elif videos:
            lesson_out["videos"] = videos
        all_videos = videos
        needs_review = False
        for v in all_videos:
            if v["kind"] == "bunny":
                stats["bunny"] += 1
                if v.get("needsReview"):
                    stats["bunnyReview"] += 1
                    needs_review = True
            elif v["kind"] == "youtube":
                stats["youtube"] += 1
            elif v["kind"] == "vimeo":
                stats["extVimeo"] += 1
            elif v["kind"] == "missing":
                stats["missing"] += 1
                needs_review = True
        if needs_review:
            lesson_out["needsReview"] = True
            lesson_out["reviewNote"] = spec.get("reviewNote") or "One or more videos in this lesson are unverified or awaiting a replacement."
        elif spec.get("reviewNote"):
            lesson_out["needsReview"] = True
            lesson_out["reviewNote"] = spec["reviewNote"]
        stats["resources"] += len(resources)
        lessons_out.append(lesson_out)

    # verify every video on every page of this course was consumed
    used_pages = {spec["pageId"] for spec in course["lessons"]}
    for pid in used_pages:
        page = pages[pid]
        total = sum(1 for b in page["blocks"] if b["type"] == "video")
        consumed = 0
        ptr = 0
        # recount by re-walking: simpler - count videos consumed from specs
        consumed = sum(
            len(spec["vids"]) for spec in course["lessons"] if spec["pageId"] == pid
        )
        if pid == "4N3CH5BgyUPgp":
            continue
        if consumed != total:
            raise AssertionError(f"{pid}: consumed {consumed} of {total} videos")

    course_out = {
        "slug": course["slug"],
        "title": course["title"],
        "subtitle": course["subtitle"],
        "description": course["description"],
        "legacyAdobeUrl": course["legacyAdobeUrl"],
        "sections": course["sections"],
        "lessons": lessons_out,
    }
    print(f"{const_name}: {len(lessons_out)} lessons | bunny={stats['bunny']} (needsReview={stats['bunnyReview']}) "
          f"youtube={stats['youtube']} extVimeo={stats['extVimeo']} missing={stats['missing']} "
          f"resources={stats['resources']} legacyImages={stats['images']}")
    return course_out, export_name, const_name


def main():
    src_dir = sys.argv[1] if len(sys.argv) > 1 else "/var/folders/c5/_cb88thx5nz625xbyxxrjz7c0000gn/T/opencode/adobe-extracted"
    out_dir = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "src", "content", "courses")
    os.makedirs(out_dir, exist_ok=True)

    page_ids = {spec["pageId"] for c in (NO_EXCUSES, PERFECT_SELF_TAPE) for spec in c["lessons"]} | {"4N3CH5BgyUPgp"}
    pages = {}
    for pid in page_ids:
        with open(os.path.join(src_dir, pid + ".json"), encoding="utf-8") as f:
            pages[pid] = json.load(f)

    written = []
    for course, filename, const_name in (
        (NO_EXCUSES, "no-excuses.ts", "noExcusesCourse"),
        (PERFECT_SELF_TAPE, "perfect-self-tape.ts", "perfectSelfTapeCourse"),
    ):
        course_out, _, _ = generate(course, pages, filename, const_name)
        payload = json.dumps(course_out, ensure_ascii=False, indent=2)
        ts = (
            'import type { Course } from "./types";\n\n'
            "/**\n"
            " * Recovered from the legacy Adobe Express course pages. Generated by\n"
            " * scripts/build_courses_from_adobe.py - course copy preserved verbatim.\n"
            " */\n"
            f"export const {const_name}: Course = {payload};\n"
        )
        # restore real quote marks in the static metadata fields
        with open(os.path.join(out_dir, filename), "w", encoding="utf-8") as f:
            f.write(ts)
        written.append(filename)
    print("wrote:", ", ".join(written))


if __name__ == "__main__":
    main()
