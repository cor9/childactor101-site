"""Adobe page id -> local site route, so links between archived pages stay inside the site.

When the extractor meets a link or button pointing at an Adobe Express page listed here (for example
the hub page's buttons to each subject page), it rewrites the target to the local route and marks it
as an internal link. Links to pages not listed here are kept as external Adobe links.

The page id is the segment after /page/ or /webpage/ in the Adobe URL
(https://express.adobe.com/page/<ID>/  or  https://new.express.adobe.com/webpage/<ID>).
Add every page you archive so its siblings link to it.
"""

PAGE_ROUTES = {
    # NO EXCUSES! DIY Actor Demo Reel Clips
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
