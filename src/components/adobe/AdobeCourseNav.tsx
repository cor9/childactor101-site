import Link from "next/link";

export interface AdobeCourseNavPage {
  slug: string;
  title: string;
  /** Overrides /courses/<course>/<slug> (used for a course's hub page). */
  href?: string;
}

export interface AdobeCourseNavProps {
  courseSlug: string;
  courseTitle: string;
  current: string;
  pages: readonly AdobeCourseNavPage[];
}

/** Plain previous/next links between a course's recreated pages, in original order. */
export function AdobeCourseNav({ courseSlug, courseTitle, current, pages }: AdobeCourseNavProps) {
  const index = pages.findIndex((page) => page.slug === current);
  const previous = index > 0 ? pages[index - 1] : undefined;
  const next = index >= 0 && index < pages.length - 1 ? pages[index + 1] : undefined;
  const href = (page: AdobeCourseNavPage) => page.href ?? `/courses/${courseSlug}/${page.slug}`;

  return (
    <nav aria-label={`${courseTitle} pages`} className="border-t border-black/10 bg-white px-4 py-10 text-ink">
      <div className="mx-auto flex max-w-3xl flex-col gap-6">
        <div className="flex items-center justify-between gap-4 text-lg">
          {previous ? (
            <Link className="font-semibold underline-offset-4 hover:underline" href={href(previous)} rel="prev">
              ← {previous.title}
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link className="text-right font-semibold underline-offset-4 hover:underline" href={href(next)} rel="next">
              {next.title} →
            </Link>
          ) : (
            <span />
          )}
        </div>
        <ol className="flex flex-wrap justify-center gap-x-5 gap-y-2 text-sm">
          {pages.map((page) => (
            <li key={page.slug}>
              {page.slug === current ? (
                <span aria-current="page" className="font-semibold">
                  {page.title}
                </span>
              ) : (
                <Link className="underline-offset-4 hover:underline" href={href(page)}>
                  {page.title}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </div>
    </nav>
  );
}
