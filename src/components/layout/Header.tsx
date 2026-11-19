import Image from "next/image";
import Link from "next/link";
import { Menu } from "lucide-react";

import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { hasBlogPosts } from "@/lib/blog";

export interface HeaderNavItem {
  href: string;
  label: string;
  /** Short explainer shown under the label in the mobile menu and as the desktop tooltip. */
  description?: string;
}

export interface HeaderProps {
  ctaHref?: string;
  ctaLabel?: string;
  navItems?: HeaderNavItem[];
}

// The two content libraries sit side by side and are described differently on purpose:
// the 101 Blog is the original article archive, From the Classroom is the organized lesson library.
// The blog link appears once its articles have been imported (see src/lib/blog.ts).
const defaultNavItems: HeaderNavItem[] = [
  { href: "/start-here", label: "Start here" },
  {
    href: "/from-the-classroom",
    label: "From the Classroom",
    description: "The newer, organized lesson library",
  },
  ...(hasBlogPosts()
    ? [
        {
          href: "/101-blog",
          label: "101 Blog",
          description: "Original articles, industry commentary, announcements, and archived resources",
        },
      ]
    : []),
  { href: "/ecosystem", label: "Tools" },
  { href: "/ecosystem", label: "Training" },
  { href: "/corey-ralston", label: "About Corey" },
  { href: "/industry", label: "For Industry" },
];

export function Header({
  ctaHref = "/start-here",
  ctaLabel = "Start Here",
  navItems = defaultNavItems,
}: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 border-b border-[#eadfc8] bg-paper/95 backdrop-blur">
      <Container className="flex items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3 text-chalkboard">
          <Image
            src="/101logo.png"
            alt="Child Actor 101 logo"
            width={56}
            height={56}
            className="h-12 w-12 object-contain sm:h-14 sm:w-14"
            priority
          />
          <p className="font-display text-[1.9rem] leading-none text-chalkboard sm:text-[2.1rem]">
            Child Actor 101
          </p>
        </Link>

        <nav className="hidden items-center gap-5 lg:flex xl:gap-9" aria-label="Primary">
          {navItems.map((item) => (
            <Link
              key={`${item.label}-${item.href}`}
              href={item.href}
              title={item.description}
              className="whitespace-nowrap text-[0.95rem] font-medium text-chalkboard/78 transition hover:text-chalkboard xl:text-[1.05rem]"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden shrink-0 xl:block">
          <Button href={ctaHref} size="lg" className="whitespace-nowrap">
            {ctaLabel}
          </Button>
        </div>

        <details className="relative lg:hidden">
          <summary className="flex cursor-pointer list-none items-center gap-2 rounded-full border border-chalkboard/15 bg-white px-4 py-2 text-sm font-semibold text-chalkboard shadow-soft marker:hidden">
            <Menu className="h-4 w-4" />
            Menu
          </summary>
          <div className="absolute right-0 mt-3 w-72 rounded-[28px] border border-chalkboard/10 bg-white p-4 shadow-soft">
            <nav className="flex flex-col gap-1" aria-label="Mobile">
              {navItems.map((item) => (
                <Link
                  key={`${item.label}-${item.href}`}
                  href={item.href}
                  className="rounded-2xl px-4 py-3 text-sm font-medium text-ink transition hover:bg-paper-warm hover:text-chalkboard"
                >
                  {item.label}
                  {item.description ? (
                    <span className="mt-0.5 block text-xs font-normal leading-5 text-ink-soft">{item.description}</span>
                  ) : null}
                </Link>
              ))}
              <Button href={ctaHref} className="mt-3 w-full">
                {ctaLabel}
              </Button>
            </nav>
          </div>
        </details>
      </Container>
    </header>
  );
}
