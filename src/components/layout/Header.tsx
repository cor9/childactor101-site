import Image from "next/image";
import Link from "next/link";
import { Menu } from "lucide-react";

import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";

export interface HeaderNavItem {
  href: string;
  label: string;
}

export interface HeaderProps {
  ctaHref?: string;
  ctaLabel?: string;
  navItems?: HeaderNavItem[];
}

const defaultNavItems: HeaderNavItem[] = [
  { href: "/start-here", label: "Start here" },
  { href: "/#chapters", label: "From the Classroom" },
  { href: "/ecosystem", label: "Tools" },
  { href: "/ecosystem", label: "Training" },
  { href: "/corey-ralston", label: "About Corey" },
];

export function Header({
  ctaHref = "/corey-ralston",
  ctaLabel = "Book coaching",
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

        <nav className="hidden items-center gap-10 lg:flex" aria-label="Primary">
          {navItems.map((item) => (
            <Link
              key={`${item.label}-${item.href}`}
              href={item.href}
              className="text-[1.05rem] font-medium text-chalkboard/78 transition hover:text-chalkboard"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:block">
          <Button href={ctaHref} size="lg">
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
