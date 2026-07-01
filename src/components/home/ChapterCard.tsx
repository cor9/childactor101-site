import Image from "next/image";
import Link from "next/link";

import { Card } from "@/components/ui/Card";

export interface ChapterCardProps {
  alt: string;
  href: string;
  image: string;
  title: string;
}

export function ChapterCard({ alt, href, image, title }: ChapterCardProps) {
  return (
    <Link href={href} className="group block">
      <Card className="overflow-hidden p-0 transition duration-200 group-hover:-translate-y-1">
        <Image
          src={image}
          alt={alt}
          width={460}
          height={460}
          className="aspect-square w-full object-cover"
        />
        <div className="flex items-center justify-between px-7 py-6">
          <h3 className="font-display text-[2rem] leading-tight text-chalkboard">{title}</h3>
          <span className="text-4xl leading-none text-purple-deep transition group-hover:translate-x-1">
            →
          </span>
        </div>
      </Card>
    </Link>
  );
}
