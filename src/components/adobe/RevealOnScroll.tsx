"use client";

import { useEffect } from "react";

/**
 * Adobe pages fade/slide images, captions and quotes in as they scroll into view
 * (the `hidden` state is defined in adobe-theme.css). Content is fully visible
 * without JavaScript; this only adds the entrance effect for items below the fold.
 */
export function RevealOnScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const items = Array.from(
      document.querySelectorAll<HTMLElement>(".adobe-page div.image, .adobe-page .caption, .adobe-page blockquote"),
    ).filter((item) => item.getBoundingClientRect().top > window.innerHeight);

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.remove("hidden");
            observer.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -10% 0px" },
    );

    for (const item of items) {
      item.classList.add("hidden");
      observer.observe(item);
    }

    return () => observer.disconnect();
  }, []);

  return null;
}
