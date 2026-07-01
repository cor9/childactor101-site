import { Card } from "@/components/ui/Card";
import { Pill } from "@/components/ui/Pill";

export interface TestimonialProps {
  name: string;
  quote: string;
  role?: string;
}

export function Testimonial({ name, quote, role }: TestimonialProps) {
  return (
    <Card className="h-full">
      <blockquote className="text-lg leading-8 text-ink-soft">&ldquo;{quote}&rdquo;</blockquote>
      <div className="mt-6">
        <p className="font-display text-2xl text-chalkboard">{name}</p>
        {role ? (
          <Pill className="mt-3 px-4 py-2 text-xs uppercase tracking-[0.2em]" tone="light">
            {role}
          </Pill>
        ) : null}
      </div>
    </Card>
  );
}
