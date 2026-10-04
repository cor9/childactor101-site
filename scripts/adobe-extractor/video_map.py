"""Vimeo -> Bunny Stream video map for the archived Child Actor 101 Adobe Express pages.

Every Corey-owned Vimeo embed on a legacy Adobe page was migrated to Bunny Stream. This file records,
per legacy Vimeo id, what the extractor should do with that embed:

  bunny(...)           mapped to a Bunny video (player URL built from the Bunny library id + guid).
                       review=True marks a medium-confidence match that should be double-checked.
  external_vimeo(...)  a third-party Vimeo video that is still live; the original embed is kept.
  missing(...)         no confident match yet; the page keeps a neutral "Video coming soon" placeholder
                       in the exact original position. `candidates` are hints for whoever identifies it.

Ids that are not listed here are treated as missing. To fill a placeholder, replace its `missing(...)`
entry with `bunny(guid, title)` and re-run the extractor for the pages that contain it.
(Originally produced by the Vimeo -> Bunny recovery audit; HIGH / MEDIUM / LOW sections below.)
"""

# --- Vimeo -> Bunny mapping (from recovery audit) ---------------------------

S2_POOL = (
    "Unverified collection candidates: Calendar (b59870ff-3eb4-4e3b-9563-1efeef1062ff), "
    "Casting Snafus (7f569a6b-8f87-4ccc-a250-2f09a93aedbf), "
    "Equipment Review (7bcd3991-6e37-4a61-86cb-25e0abc220cb), "
    "Plan B (73f63b46-d716-42ee-8b70-df2348e8408b), "
    "Producer Hat (0caf5463-c3d9-4d4b-a332-1c29d4a5ded7), "
    "The Test (1705e2e7-907c-468d-8241-5b63b9b3cc08), "
    "Mr Rogers (ed3ea1af-ac78-4c13-b063-c876cf0a5348), "
    "The 80-20 Rule (bf11ebe6-d5ac-4cde-a0cb-fa1675aa3cfa), "
    "Untitled (5) (f5b0854e-6c52-44f3-ae0d-ab13c364d774), "
    "Untitled (6) (a855464e-d499-4221-98fa-dd884df2146d), "
    "Welcome to Mini Film School (2b5436fd-2083-4b52-84ff-34c52d8307a3), "
    "Da Crew (e75d57f3-78d6-4185-b2e8-7b7b7c9fff78)."
)


def bunny(guid, title, review=False):
    video = {"kind": "bunny", "guid": guid, "title": title}
    if review:
        video["needsReview"] = True
        video["note"] = "Mapped from legacy Vimeo embed with medium confidence. Verify this is the intended lesson video."
    return video


def missing(vimeo_id, note, candidates=None):
    video = {"kind": "missing", "legacyVimeoId": vimeo_id, "note": note}
    if candidates:
        video["candidates"] = candidates
    return video


def external_vimeo(vimeo_id, title):
    return {"kind": "vimeo", "vimeoId": vimeo_id, "title": title, "thirdParty": True,
            "note": "Third-party reference video preserved from the legacy course. Still live on Vimeo."}


VIMEO_MAP = {
    # --- HIGH confidence ---
    "379943966": bunny("f642726e-8dc1-412e-9d97-f0ba82548121", "NO EXCUSES! Demo Clip Course for Actor's"),
    "377213706": bunny("3d6315f4-a7f5-482e-9937-b9a79a543b83", "Paying Homage"),
    "377218287": bunny("99cad305-1d4a-41eb-b9e2-40203a2b8b47", "Mission For You"),
    "377218581": bunny("2e57a4c2-a5ed-4e8b-ae0e-89c8e5e004bb", "Fences"),
    "377218336": bunny("ef3f1d7e-1cf5-44ec-9a17-d6e549c4d005", "Don't be scared"),
    "288832063": {"kind": "bunny", "guid": "893a07b7-0282-4740-baa0-16e7966fb3f4", "title": "Beautiful Scar",
                  "note": "Verified via live Vimeo oEmbed (title 'Beautiful Scar'). Lives in the main Bunny library, outside the No Excuses! collection."},
    "387346357": bunny("2db093b6-05c7-419a-b65c-57b097abb8af", "Intro Two"),
    "387349950": bunny("5199be9f-8ade-4fd7-99da-c04766a72770", "Sound is HUGE"),
    "387392930": bunny("14128357-4e1f-49a8-b8b9-7059a429badb", "My lighting obsession"),
    "387395199": bunny("08d45d8d-b3da-4e5e-addb-81aa05a010eb", "Shot by shot"),
    "387609679": bunny("2ecc9825-90cb-496f-8760-2357d94b2188", "Chill Pill"),
    "387615832": bunny("c0b67795-97c0-411b-83a3-0b25997d1b1f", "Check the gate"),
    "391173336": bunny("452637f1-69f2-4f2f-85f8-4c2d23f28919", "Editing intro"),
    "391763750": bunny("e2c4531b-5651-423e-bdc4-4a5866104e10", "Walk through an Edit"),
    "390130720": bunny("3205b169-cf47-42b7-9ee6-807175b8fadc", "Q&A with Film Editor - Kasey Atkins"),
    "391178618": bunny("c715830e-8708-468e-b404-73a2b5cb7fcb", "Score"),
    "391183772": bunny("f4b38625-9437-4095-bc70-153ae32ec756", "Edit wrap"),
    "396112238": bunny("715876c7-ae22-4e13-8293-7613804c0130", "Welcome, Welcome"),
    "392546804": {"kind": "bunny", "guid": "ca3cb3c4-aea2-455c-8b26-490b28013684",
                  "title": "The role of the reader - Parent Self Tape course for Child Actor 101",
                  "note": "Bunny copy is the full 69-minute parent-course session; the legacy page described 'excerpts'."},
    # --- MEDIUM confidence (include, flagged needsReview) ---
    "377218224": bunny("95d84379-5f4a-4719-b58f-4c81068bcea8", "Research", review=True),
    "377218490": bunny("3ae82d41-3502-4076-b81d-a136e539bd62", "Location, Location, Location", review=True),
    "387349854": bunny("591fc3a7-f974-4ab1-8ca0-09a4d7e59629", "Let There Be Light", review=True),
    "387501390": bunny("d0a15047-7b7c-4995-8f9a-984170135d60", "Learn from my Mistakes", review=True),
    "387353415": bunny("f4c48c85-90e1-4bf4-ba79-3d28b067a23c", "Clip Day", review=True),
    "393058496": bunny("435006c3-5890-4e01-8b65-81ad43b099d6", "Parent Coaching Tips", review=True),
    "334221482": bunny("d75ef465-5688-4d80-8ea2-59c595e44df3", "What is a Slate Shot-", review=True),
    # --- External third-party Vimeo, still live ---
    "71838170": external_vimeo("71838170", "Who's Who on a Movie Crew (Vimeo Video School, 2013)"),
    "143619334": external_vimeo("143619334", "Why Props Matter (Rishi Kaneria, 2015)"),
    # --- LOW / UNMATCHED: preserved positions, no guessing ---
    "377218725": missing("377218725", "Corey bio video on the welcome page. No collection match.",
                         ["4ecd0502-fcd3-49be-b552-8c64b3adf5e0 - Corey Ralston Reel.mp4",
                          "5783a098-acad-48c4-b094-63a129d7cd0b - Corey Ralston Reel (1).mp4"]),
    "387252761": missing("387252761", "'Why are Clips soo Important?' teaching video.",
                         ["bd6bf1c8-d47b-4ed4-bbc1-1c2d0d10f3e0 - Make a Clip.mp4"]),
    "377218442": missing("377218442", "Genres & Types teaching video. " + S2_POOL),
    "324792551": missing("324792551", "Re-worked Shameless scene example clip (student sample). Vimeo is dead; no candidate identified."),
    "371529420": missing("371529420", "Two-actor clip example (student sample). Vimeo is dead; no candidate identified."),
    "344516472": missing("344516472", "Three shot example sample clip. Vimeo is dead; no candidate identified."),
    "377218960": missing("377218960", "Tone / writing-for-genre teaching video.",
                         ["bf11ebe6-d5ac-4cde-a0cb-fa1675aa3cfa - The 80-20 Rule.mp4"]),
    "377219246": missing("377219246", "Second monologue-clip video.",
                         ["bd6bf1c8-d47b-4ed4-bbc1-1c2d0d10f3e0 - Make a Clip.mp4"]),
    "387357732": missing("387357732", "Plan & Prep intro block video 2 of 4. " + S2_POOL),
    "387347988": missing("387347988", "Plan & Prep intro block video 3 of 4. " + S2_POOL),
    "387348581": missing("387348581", "Plan & Prep intro block video 4 of 4. " + S2_POOL),
    "387350883": missing("387350883", "Plan & Prep closing block video 1 of 5. " + S2_POOL),
    "387350986": missing("387350986", "Plan & Prep closing block video 2 of 5. " + S2_POOL),
    "387352092": missing("387352092", "Plan & Prep closing block video 3 of 5. " + S2_POOL),
    "387351912": missing("387351912", "Plan & Prep closing block video 4 of 5. " + S2_POOL),
    "387352511": missing("387352511", "Plan & Prep closing block video 5 of 5. " + S2_POOL),
    "387612134": missing("387612134", "Second 'Take a Chill Pill' video.",
                         ["ed3ea1af-ac78-4c13-b063-c876cf0a5348 - Mr Rogers.mp4"]),
    "390282478": missing("390282478", "Overlays / finishing teaching video.",
                         ["88c59b5d-ae82-443c-bc8e-98a74f358c68 - Color Correction.mp4"]),
    "391760430": missing("391760430", "Corey's Enlight (Videoleap) app overview. Also embedded on Perfect Self Tape 'Quick Editing'.",
                         ["f5b0854e-6c52-44f3-ae0d-ab13c364d774 - Untitled (5).mp4",
                          "a855464e-d499-4221-98fa-dd884df2146d - Untitled (6).mp4",
                          "1067ad2b-49aa-48e6-a4ed-cc533e61ec07 - Videoleap-459739BD export.mp4 (main library)"]),
    "396114925": missing("396114925", "'A very important message from Corey', next to child internet-safety links.",
                         ["fe7bb938-4235-4a64-b399-73d3dd8f8fe2 - coaching_priority (720p).mp4",
                          "b2d1c50a-4c38-498a-832c-b0fa0b227898 - Net Safety.mp4 (main library)"]),
    "359315033": missing("359315033", "Video about Vimeo hosting. Possibly a Vimeo-produced promo (external). No candidate identified."),
    "396116394": missing("396116394", "Course wrap-up video ('And That is... A Wrap!').",
                         ["13ec489d-8eb4-4fc9-9494-2645061082ea - 5-1.mp4",
                          "7f0d7d40-7914-4b7c-beb2-72e809a9ffa7 - The e n d.mp4 (main library)"]),
    "336444157": missing("336444157", "Dacre Montgomery Stranger Things audition tape (third-party example). Vimeo is dead; decide on replacement or removal."),
    "395384847": missing("395384847", "Nicholas' black-and-white self tape example (client example).",
                         ["46fa375d-1ba0-4692-a857-bf128af53bfa - Nicholas Young - Scared.mp4 (main library)"]),
}
