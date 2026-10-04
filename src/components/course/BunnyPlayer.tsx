import { bunnyEmbedUrl } from "@/lib/bunny";

export interface BunnyPlayerProps {
  guid: string;
  needsReview?: boolean;
  title: string;
}

export function BunnyPlayer({ guid, needsReview = false, title }: BunnyPlayerProps) {
  return (
    <div className="overflow-hidden rounded-[28px] border border-chalkboard/10 bg-chalkboard-deep shadow-board">
      <div className="aspect-video">
        <iframe
          allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
          allowFullScreen
          className="block h-full w-full border-0"
          loading="lazy"
          src={bunnyEmbedUrl(guid)}
          title={title}
        />
      </div>
      {needsReview ? (
        <p className="bg-chalkboard-deep px-5 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-[#bcefdc]">
          Video match is being verified from the original course
        </p>
      ) : null}
    </div>
  );
}
