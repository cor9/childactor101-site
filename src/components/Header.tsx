import Link from "next/link";
import { ChevronRight, Menu } from "lucide-react";

import { Button } from "@/components/Button";

const navItems = [
  { href: "/#journey", label: "Start Here" },
  { href: "/#chapters", label: "From the Classroom" },
  { href: "/#chapters", label: "Tools" },
  { href: "/#ecosystem", label: "Training" },
  { href: "/corey-ralston", label: "About Corey" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-chalkboard/10 bg-paper/90 backdrop-blur">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-chalkboard text-lg font-display text-chalk shadow-soft">
            101
          </div>
          <div>
            <p className="font-display text-lg leading-none text-chalkboard">
              Child Actor 101
            </p>
            <p className="mt-1 text-xs uppercase tracking-[0.2em] text-ink-soft">
              Trusted education for TV and film families
            </p>
          </div>
        </Link>

        <nav className="hidden items-center gap-6 lg:flex" aria-label="Primary">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="text-sm font-medium text-ink transition hover:text-chalkboard"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:block">
          <Button href="/#journey" size="sm">
            Start here
            <ChevronRight className="h-4 w-4" />
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
                  key={item.label}
                  href={item.href}
                  className="rounded-2xl px-4 py-3 text-sm font-medium text-ink transition hover:bg-paper-warm hover:text-chalkboard"
                >
                  {item.label}
                </Link>
              ))}
              <Button href="/#journey" className="mt-3 w-full">
                Start here
                <ChevronRight className="h-4 w-4" />
              </Button>
            </nav>
          </div>
        </details>
      </div>
    </header>
  );
}
