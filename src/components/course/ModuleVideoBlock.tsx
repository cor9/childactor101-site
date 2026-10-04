import { Clapperboard } from "lucide-react";

import { BunnyPlayer } from "@/components/course/BunnyPlayer";
import { ExternalVideoEmbed } from "@/components/course/ExternalVideoEmbed";
import type { CourseVideoBlock, MissingVideoBlock } from "@/content/courses";

export function youtubeEmbedUrl(videoId: string): string {
  return `https://www.youtube.com/embed/${videoId}`;
}

export function vimeoEmbedUrl(vimeoId: string): string {
  return `https://player.vimeo.com/video/${vimeoId}`;
}

function MissingVideoPlaceholder({ video }: { video: MissingVideoBlock }) {
  const isDevelopment = process.env.NODE_ENV !== "production";

  return (
    <div className="rounded-[24px] border border-dashed border-chalkboard/25 bg-paper-warm px-6 py-6">
      <div className="flex items-center gap-4">
        <span className="flex h-12 w-12 flex-none items-center justify-center rounded-full bg-chalkboard text-chalk">
          <Clapperboard className="h-5 w-5" aria-hidden />
        </span>
        <div>
          <p className="font-display text-xl text-chalkboard">This video is coming back soon.</p>
          <p className="mt-1 text-sm leading-6 text-ink-soft">
            Keep reading - everything else in this section is ready.
          </p>
        </div>
      </div>
      {isDevelopment ? (
        <details className="mt-4 rounded-2xl border border-[#e7dcc7] bg-white px-4 py-3 text-xs leading-6 text-ink-soft">
          <summary className="cursor-pointer font-semibold uppercase tracking-[0.16em] text-purple-deep">
            Dev only: migration info
          </summary>
          {video.legacyVimeoId ? (
            <p className="mt-2">
              Legacy Vimeo ID: <code className="rounded bg-paper px-1.5 py-0.5">{video.legacyVimeoId}</code>
            </p>
          ) : null}
          <p className="mt-1">{video.note}</p>
          {video.candidates?.length ? (
            <ul className="mt-2 list-disc pl-5">
              {video.candidates.map((candidate) => (
                <li key={candidate}>
                  <code className="rounded bg-paper px-1.5 py-0.5">{candidate}</code>
                </li>
              ))}
            </ul>
          ) : null}
        </details>
      ) : null}
    </div>
  );
}

export interface ModuleVideoBlockProps {
  fallbackTitle: string;
  video: CourseVideoBlock;
}

/** Renders any video block in a module: Bunny player, third-party embed, or a restoration placeholder. */
export function ModuleVideoBlock({ fallbackTitle, video }: ModuleVideoBlockProps) {
  switch (video.type) {
    case "bunny-video":
      return (
        <BunnyPlayer
          guid={video.guid}
          title={video.title ?? fallbackTitle}
        />
      );
    case "external-video":
      return (
        <ExternalVideoEmbed
          title={video.title}
          url={
            video.provider === "youtube"
              ? youtubeEmbedUrl(video.videoId)
              : vimeoEmbedUrl(video.videoId)
          }
        />
      );
    case "missing-video":
      return <MissingVideoPlaceholder video={video} />;
  }
}
