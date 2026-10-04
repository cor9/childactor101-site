import { bunnyEmbedUrl } from "@/lib/bunny";

export interface BunnyPlayerProps {
  guid: string;
  title: string;
}

export function BunnyPlayer({ guid, title }: BunnyPlayerProps) {
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
    </div>
  );
}
