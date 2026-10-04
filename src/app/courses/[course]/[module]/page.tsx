import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ExternalLink } from "lucide-react";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";

import { Breadcrumbs } from "@/components/Breadcrumbs";
import { MarkCompleteButton, ModuleTracker } from "@/components/course/CourseProgress";
import { ModuleVideoBlock } from "@/components/course/ModuleVideoBlock";
import {
  getCourse,
  getCourseModule,
  getCourseStaticModuleParams,
  getModulePagination,
  getModuleSubsectionBlocks,
  getModuleVideoCount,
  isVideoBlock,
} from "@/content/courses";
import type { CourseBlock, CourseVideoBlock, ResourceBlock } from "@/content/courses";
import { coursePresentation, getSubsectionVariant } from "@/content/courses/presentation";

type ModulePageProps = {
  params: Promise<{
    course: string;
    module: string;
  }>;
};

export function generateStaticParams() {
  return getCourseStaticModuleParams();
}

export async function generateMetadata({ params }: ModulePageProps): Promise<Metadata> {
  const { course: courseSlug, module: moduleSlug } = await params;
  const course = getCourse(courseSlug);
  const courseModule = getCourseModule(courseSlug, moduleSlug);
  const info = coursePresentation[courseSlug]?.modules[moduleSlug];

  if (!course || !courseModule) {
    return { title: "Course | Child Actor 101" };
  }

  return {
    title: `${info?.name ?? courseModule.title} | ${course.title}`,
    description: info?.outcome,
  };
}

const normalize = (text: string) => text.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();

function ResourceList({ resources }: { resources: ResourceBlock[] }) {
  const list = (
    <ul className="grid gap-2 sm:grid-cols-2">
      {resources.map((resource) => (
        <li key={`${resource.href}-${resource.title}`}>
          <a
            className="group flex h-full items-start gap-2 rounded-2xl bg-white px-4 py-3 text-sm font-semibold text-chalkboard transition hover:bg-paper"
            href={resource.href}
            rel="noopener noreferrer"
            target="_blank"
          >
            <ExternalLink className="mt-0.5 h-4 w-4 flex-none text-purple-deep" aria-hidden />
            <span className="min-w-0">
              <span className="break-words group-hover:text-purple-deep">{resource.title}</span>
              {resource.note ? (
                <span className="mt-0.5 block text-xs font-normal text-ink-soft">{resource.note}</span>
              ) : null}
            </span>
          </a>
        </li>
      ))}
    </ul>
  );

  const label = `Links & resources (${resources.length})`;

  return resources.length > 6 ? (
    <details className="group rounded-[24px] bg-paper-warm px-5 py-4">
      <summary className="cursor-pointer text-sm font-semibold text-chalkboard">{label}</summary>
      <div className="mt-4">{list}</div>
    </details>
  ) : (
    <div className="rounded-[24px] bg-paper-warm px-5 py-4">
      <p className="mb-3 text-sm font-semibold text-chalkboard">{label}</p>
      {list}
    </div>
  );
}

function VideoGroup({ fallbackTitle, videos }: { fallbackTitle: string; videos: CourseVideoBlock[] }) {
  const sideBySide = videos.length > 1 && videos.every((video) => video.type === "external-video");

  return (
    <div className={sideBySide ? "grid gap-5 sm:grid-cols-2" : "space-y-6"}>
      {videos.map((video, index) => (
        <ModuleVideoBlock fallbackTitle={fallbackTitle} key={`${video.type}-${index}`} video={video} />
      ))}
    </div>
  );
}

/** Renders a subsection's blocks in order, grouping adjacent videos and resources. */
function renderBlocks(blocks: CourseBlock[], sectionTitle: string) {
  const nodes: ReactNode[] = [];

  for (let index = 0; index < blocks.length; index += 1) {
    const block = blocks[index];
    const key = `${block.type}-${index}`;

    if (isVideoBlock(block)) {
      const videos: CourseVideoBlock[] = [block];
      while (index + 1 < blocks.length && isVideoBlock(blocks[index + 1])) {
        index += 1;
        videos.push(blocks[index] as CourseVideoBlock);
      }
      nodes.push(<VideoGroup fallbackTitle={sectionTitle} key={key} videos={videos} />);
    } else if (block.type === "resource") {
      const resources: ResourceBlock[] = [block];
      while (index + 1 < blocks.length && blocks[index + 1].type === "resource") {
        index += 1;
        resources.push(blocks[index] as ResourceBlock);
      }
      nodes.push(<ResourceList key={key} resources={resources} />);
    } else if (block.type === "heading") {
      // Level-3 headings that only repeat the subsection title are extraction echoes.
      if (normalize(block.text) === normalize(sectionTitle)) {
        continue;
      }
      // Very long "headings" are really sentences of teaching copy - keep them as lead-in text.
      nodes.push(
        block.text.length > 90 ? (
          <p className="max-w-[42rem] text-xl font-semibold leading-8 text-chalkboard" key={key}>
            {block.text}
          </p>
        ) : (
          <h3 className="max-w-[42rem] pt-2 font-display text-2xl text-chalkboard sm:text-3xl" key={key}>
            {block.text}
          </h3>
        ),
      );
    } else if (block.type === "richText") {
      nodes.push(
        <div className="max-w-[42rem]" key={key}>
          <div className="space-y-5 text-[1.1rem] leading-[1.85] text-ink">
            {block.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 48)}>{paragraph}</p>
            ))}
          </div>
          {block.bullets?.length ? (
            <ul className="mt-5 space-y-2 text-[1.05rem] leading-8 text-ink">
              {block.bullets.map((bullet) => (
                <li className="flex gap-3" key={bullet.slice(0, 48)}>
                  <span className="mt-3 h-2 w-2 flex-none rounded-full bg-purple" />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          ) : null}
        </div>,
      );
    } else if (block.type === "callout") {
      // Restoration notes are development-only migration metadata.
      if (block.tone === "restoration") {
        continue;
      }
      nodes.push(
        <div className="max-w-[42rem] rounded-[24px] bg-paper-warm px-6 py-5 leading-7 text-ink" key={key}>
          {block.title ? <p className="font-display text-xl text-chalkboard">{block.title}</p> : null}
          <p className={block.title ? "mt-2" : ""}>{block.text}</p>
        </div>,
      );
    } else if (block.type === "image") {
      nodes.push(
        <figure key={key}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img alt={block.alt} className="w-full rounded-[24px]" src={block.src} />
          {block.caption ? <figcaption className="mt-2 text-sm text-ink-soft">{block.caption}</figcaption> : null}
        </figure>,
      );
    }
  }

  return nodes;
}

export default async function CourseModulePage({ params }: ModulePageProps) {
  const { course: courseSlug, module: moduleSlug } = await params;
  const course = getCourse(courseSlug);
  const courseModule = getCourseModule(courseSlug, moduleSlug);
  const presentation = coursePresentation[courseSlug];

  if (!course || !courseModule || !presentation) {
    notFound();
  }

  const info = presentation.modules[courseModule.slug];
  const name = info?.name ?? courseModule.title;
  const { previous, next, index, total } = getModulePagination(course.slug, courseModule.slug);
  const sections = getModuleSubsectionBlocks(courseModule);
  const videoCount = getModuleVideoCount(courseModule);
  const nameOf = (slug: string, fallback: string) => presentation.modules[slug]?.name ?? fallback;
  const steps = course.modules.map((entry, entryIndex) => ({
    slug: entry.slug,
    name: nameOf(entry.slug, entry.title),
    label: String(
      presentation.layout === "journey" && presentation.introModule
        ? entryIndex // Start Here is 0 so the stages read 1-5.
        : entryIndex + 1,
    ),
  }));
  if (presentation.layout === "journey" && presentation.introModule) {
    steps[0].label = "★";
  }

  const outline = (
    <ol className="space-y-1">
      {sections.map(({ heading }, sectionIndex) => (
        <li key={heading.anchor}>
          <a
            className="flex gap-3 rounded-xl px-3 py-1.5 text-sm text-ink-soft transition hover:bg-paper-warm hover:text-chalkboard"
            href={`#${heading.anchor}`}
          >
            <span className="w-5 flex-none text-right font-display text-purple-deep">{sectionIndex + 1}</span>
            <span>{heading.text}</span>
          </a>
        </li>
      ))}
    </ol>
  );

  return (
    <main>
      <section className="bg-chalkboard-deep text-chalk">
        <div className="mx-auto w-full max-w-6xl px-4 pb-12 pt-8 sm:px-6 lg:px-8 lg:pb-16">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Courses", href: "/courses" },
              { label: course.title, href: `/courses/${course.slug}` },
              { label: name },
            ]}
            tone="chalk"
          />
          <div className="mt-10 grid items-center gap-8 md:grid-cols-[minmax(0,1fr)_14rem]">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-gold">
                {info?.eyebrow ?? `Module ${index + 1} of ${total}`}
              </p>
              <h1 className="mt-3 font-display text-5xl leading-[0.98] text-white sm:text-6xl">{name}</h1>
              {info?.outcome ? (
                <p className="mt-5 max-w-2xl text-lg leading-8 text-[#d8ede2]">{info.outcome}</p>
              ) : null}
              <p className="mt-4 text-sm font-semibold uppercase tracking-[0.16em] text-[#9fd3bb]">
                {sections.length} topic{sections.length === 1 ? "" : "s"} · {videoCount} video
                {videoCount === 1 ? "" : "s"}
              </p>
            </div>
            {info?.image ? (
              <Image
                alt=""
                className="hidden w-56 justify-self-end rounded-[24px] shadow-board md:block"
                placeholder="blur"
                priority
                sizes="224px"
                src={info.image}
              />
            ) : null}
          </div>
          <ModuleTracker courseSlug={course.slug} currentSlug={courseModule.slug} steps={steps} />
        </div>
      </section>

      <section className="px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="mx-auto grid w-full max-w-6xl gap-12 lg:grid-cols-[minmax(0,1fr)_15rem]">
          <div className="min-w-0">
            {sections.length > 1 ? (
              <details className="mb-10 rounded-[24px] border border-[#e7dcc7] bg-white px-5 py-4 lg:hidden">
                <summary className="cursor-pointer font-display text-xl text-chalkboard">In this chapter</summary>
                <div className="mt-3">{outline}</div>
              </details>
            ) : null}

            <div className="space-y-16">
              {sections.map(({ heading, blocks }, sectionIndex) => {
                const variant = getSubsectionVariant(heading.text, heading.anchor ?? "");
                const content = (
                  <div className="space-y-7">{renderBlocks(blocks, heading.text)}</div>
                );

                return (
                  <section className="scroll-mt-28" id={heading.anchor} key={heading.anchor}>
                    <header className="mb-7">
                      <p className="font-display text-sm uppercase tracking-[0.2em] text-purple-deep">
                        {variant === "assignment"
                          ? "Your assignment"
                          : variant === "example"
                            ? "Example"
                            : sections.length > 1
                              ? `Topic ${sectionIndex + 1}`
                              : ""}
                      </p>
                      <h2 className="mt-1 font-display text-4xl leading-tight text-chalkboard sm:text-5xl">
                        {heading.text}
                      </h2>
                    </header>
                    {variant === "assignment" ? (
                      <div className="rounded-[32px] border-2 border-gold/70 bg-[#fff8e1] p-6 sm:p-8">
                        {content}
                      </div>
                    ) : variant === "example" ? (
                      <div className="border-l-4 border-purple/60 pl-5 sm:pl-8">{content}</div>
                    ) : (
                      content
                    )}
                  </section>
                );
              })}
            </div>
          </div>

          {sections.length > 1 ? (
            <aside className="hidden lg:block">
              <div className="sticky top-8 max-h-[calc(100vh-4rem)] overflow-y-auto rounded-[24px] border border-[#e7dcc7] bg-white px-3 py-4">
                <p className="px-3 pb-2 font-display text-lg text-chalkboard">In this chapter</p>
                {outline}
              </div>
            </aside>
          ) : null}
        </div>
      </section>

      <section className="border-t border-[#e7dcc7] bg-paper-warm px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-6xl">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="font-display text-3xl text-chalkboard">
              {next ? `Finished ${name}?` : `That's the whole course.`}
            </p>
            <MarkCompleteButton courseSlug={course.slug} moduleSlug={courseModule.slug} />
          </div>
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {previous ? (
              <Link
                className="group rounded-[28px] border border-[#e7dcc7] bg-white px-7 py-6 transition hover:-translate-y-1"
                href={`/courses/${course.slug}/${previous.slug}`}
              >
                <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-purple-deep">
                  <ArrowLeft className="h-4 w-4" aria-hidden />
                  Previous
                </span>
                <span className="mt-3 block font-display text-2xl text-chalkboard group-hover:text-purple-deep">
                  {nameOf(previous.slug, previous.title)}
                </span>
              </Link>
            ) : (
              <Link
                className="group rounded-[28px] border border-[#e7dcc7] bg-white px-7 py-6 transition hover:-translate-y-1"
                href={`/courses/${course.slug}`}
              >
                <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-purple-deep">
                  <ArrowLeft className="h-4 w-4" aria-hidden />
                  Course home
                </span>
                <span className="mt-3 block font-display text-2xl text-chalkboard group-hover:text-purple-deep">
                  {course.title}
                </span>
              </Link>
            )}
            {next ? (
              <Link
                className="group rounded-[28px] bg-chalkboard-deep px-7 py-6 text-chalk shadow-board transition hover:-translate-y-1"
                href={`/courses/${course.slug}/${next.slug}`}
              >
                <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-gold">
                  Next
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </span>
                <span className="mt-3 block font-display text-2xl text-white">{nameOf(next.slug, next.title)}</span>
              </Link>
            ) : (
              <Link
                className="group rounded-[28px] bg-chalkboard-deep px-7 py-6 text-chalk shadow-board transition hover:-translate-y-1"
                href={`/courses/${course.slug}`}
              >
                <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-gold">
                  Back to the course
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </span>
                <span className="mt-3 block font-display text-2xl text-white">Review any stage</span>
              </Link>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
