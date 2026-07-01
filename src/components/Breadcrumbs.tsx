import Link from "next/link";
import { ChevronRight } from "lucide-react";

export interface BreadcrumbItem {
  href?: string;
  label: string;
}

export interface BreadcrumbsProps {
  className?: string;
  items: BreadcrumbItem[];
  tone?: "light" | "chalk";
}

export function Breadcrumbs({
  className = "",
  items,
  tone = "light",
}: BreadcrumbsProps) {
  const itemClassName =
    tone === "chalk"
      ? "text-[#bcefdc] hover:text-white"
      : "text-chalkboard/70 hover:text-chalkboard";
  const currentClassName = tone === "chalk" ? "text-white" : "text-chalkboard";
  const separatorClassName = tone === "chalk" ? "text-white/40" : "text-chalkboard/30";

  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em]">
        {items.map((item, index) => (
          <li key={`${item.label}-${index}`} className="flex items-center gap-2">
            {item.href ? (
              <Link href={item.href} className={`transition ${itemClassName}`}>
                {item.label}
              </Link>
            ) : (
              <span className={currentClassName}>{item.label}</span>
            )}
            {index < items.length - 1 ? (
              <ChevronRight className={`h-4 w-4 ${separatorClassName}`} />
            ) : null}
          </li>
        ))}
      </ol>
    </nav>
  );
}
