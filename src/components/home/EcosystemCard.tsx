import { Card } from "@/components/ui/Card";

export interface EcosystemCardProps {
  description: string;
  items: string[];
  title: string;
}

export function EcosystemCard({
  description,
  items,
  title,
}: EcosystemCardProps) {
  return (
    <Card
      tone="chalkboard"
      className="border-white/14 bg-[linear-gradient(180deg,rgba(33,50,42,0.74),rgba(27,43,35,0.92))] px-7 py-8"
    >
      <h3 className="font-display text-[2.4rem] text-[#bcf1df]">{title}</h3>
      <p className="mt-2 text-[1.15rem] leading-8 text-white/72">{description}</p>
      <ul className="mt-8 space-y-0 text-[1.15rem] leading-8 text-white/88">
        {items.map((item) => (
          <li key={item} className="border-t border-white/12 py-4 first:border-t-0 first:pt-0">
            {item}
          </li>
        ))}
      </ul>
    </Card>
  );
}
