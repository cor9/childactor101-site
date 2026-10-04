import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ExternalLink } from "lucide-react";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";

import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CourseProgressOverview, MarkCompleteButton } from "@/components/course/CourseProgress";
import { ModuleVideoBlock } from "@/components/course/ModuleVideoBlock";
import { Card } from "@/components/ui/Card";
import { Pill } from "@/components/ui/Pill";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import {
  getCourse,
  getCourseModule,
  getCourseStaticModuleParams,
  getModulePagination,
  getModuleSubsections,
  isVideoBlock,
  moduleNeedsReview,
} from "@/content/courses";
import type { CourseBlock, ResourceBlock } from "@/content/courses";

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

  if (!course || !courseModule) {
    return { title: "Module | Child Actor 101" };
  }

  return {
    title: `${courseModule.title} | ${course.title}`,
    description: course.description,
  };
}

function ResourceList({ resources }: { resources: ResourceBlock[] }) {
  return (
    <ul className="space-y-3">
      {resources.map((resource) => (
        <li key={`${resource.href}-${resource.title}`}>
          <a
            className="group flex items-start gap-2 rounded-[18px] border border-[#e7dcc7] bg-white px-4 py-3 text-sm font-semibold text-chalkboard transition hover:border-chalkboard/20"
            href={resource.href}
            rel="noopener noreferrer"
            target="_blank"
          >
            <ExternalLink className="mt-0.5 h-4 w-4 flex-none text-purple-deep" aria-hidden />
            <span>
              <span className="group-hover:text-purple-deep">{resource.title}</span>
              {resource.note ? (
                <span className="mt-0.5 block text-xs font-normal text-ink-soft">
                  {resource.note}
                </span>
              ) : null}
            </span>
          </a>
        </li>
      ))}
    </ul>
  );
}

/** Renders blocks in order; consecutive resource blocks collapse into one list. */
function renderBlocks(blocks: CourseBlock[], fallbackTitle: string) {
  const nodes: ReactNode[] = [];
  let currentTitle = fallbackTitle;

  for (let index = 0; index < blocks.length; index += 1) {
    const block = blocks[index];
    const key = `${block.type}-${index}`;

    if (block.type === "heading") {
      if (block.level === 2) {
        currentTitle = block.text;
      }
      nodes.push(
        block.level === 2 ? (
          <h2
            className="scroll-mt-8 border-t border-[#e7dcc7] pt-10 font-display text-3xl text-chalkboard sm:text-4xl"
            id={block.anchor}
            key={key}
          >
            {block.text}
          </h2>
        ) : (
          <h3 className="font-display text-2xl text-chalkboard sm:text-3xl" key={key}>
            {block.text}
          </h3>
        ),
      );
    } else if (block.type === "richText") {
      nodes.push(
        <div key={key}>
          <div className="space-y-5 text-[1.05rem] leading-8 text-ink-soft">
            {block.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 48)}>{paragraph}</p>
            ))}
          </div>
          {block.bullets?.length ? (
            <ul className="mt-6 space-y-3 rounded-[24px] bg-paper-warm px-6 py-5 text-sm leading-7 text-chalkboard">
              {block.bullets.map((bullet) => (
                <li key={bullet.slice(0, 48)} className="flex gap-3">
                  <span className="mt-2 h-2 w-2 flex-none rounded-full bg-purple" />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          ) : null}
        </div>,
      );
    } else if (isVideoBlock(block)) {
      nodes.push(<ModuleVideoBlock fallbackTitle={currentTitle} key={key} video={block} />);
    } else if (block.type === "resource") {
      const resources: ResourceBlock[] = [block];
      while (blocks[index + 1]?.type === "resource") {
        index += 1;
        resources.push(blocks[index] as ResourceBlock);
      }
      nodes.push(<ResourceList key={key} resources={resources} />);
    } else if (block.type === "callout") {
      nodes.push(
        <div
          className="rounded-[24px] border border-[#e7dcc7] bg-paper-warm px-6 py-5 text-sm leading-7 text-ink-soft"
          key={key}
        >
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-purple-deep">
            {block.title ?? (block.tone === "restoration" ? "Restored course note" : "Note")}
          </p>
          <p className="mt-2">{block.text}</p>
        </div>,
      );
    } else if (block.type === "image") {
      nodes.push(
        <figure key={key}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img alt={block.alt} className="w-full rounded-[24px]" src={block.src} />
          {block.caption ? (
            <figcaption className="mt-2 text-sm text-ink-soft">{block.caption}</figcaption>
          ) : null}
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

  if (!course || !courseModule) {
    notFound();
  }

  const { previous, next, index, total } = getModulePagination(course.slug, courseModule.slug);
  const subsections = getModuleSubsections(courseModule);

  return (
    <main className="overflow-hidden">
      <Section className="px-4 pt-10 sm:px-6 lg:px-8">
        <Container>
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Courses", href: "/courses" },
              { label: course.title, href: `/courses/${course.slug}` },
              { label: courseModule.title },
            ]}
          />
        </Container>
      </Section>

      <Section className="relative px-4 pb-12 pt-10 sm:px-6 lg:px-8">
        <div className="absolute inset-x-0 top-0 h-[30rem] bg-[radial-gradient(circle_at_top_left,_rgba(244,201,93,0.22),_transparent_42%),radial-gradient(circle_at_top_right,_rgba(166,120,242,0.18),_transparent_30%)]" />
        <Container className="relative max-w-5xl">
          <div className="flex flex-wrap items-center gap-3">
            <Pill className="px-4 py-2 text-xs uppercase tracking-[0.22em]" tone="light">
              Module {index + 1} of {total}
            </Pill>
            {moduleNeedsReview(courseModule) ? (
              <Pill className="bg-accent-100 px-4 py-2 text-xs uppercase tracking-[0.22em] text-accent-700" tone="light">
                Being restored
              </Pill>
            ) : null}
          </div>
          <h1 className="mt-6 max-w-4xl font-display text-4xl leading-[1.02] text-chalkboard sm:text-6xl">
            {courseModule.title}
          </h1>
        </Container>
      </Section>

      <Section className="bg-paper px-4 py-12 sm:px-6 lg:px-8">
        <Container className="grid max-w-6xl gap-10 lg:grid-cols-[minmax(0,1fr)_18rem] lg:items-start">
          <article className="min-w-0 space-y-8">
            {renderBlocks(courseModule.blocks, courseModule.title)}
          </article>

          {subsections.length > 0 ? (
            <aside className="lg:sticky lg:top-8">
              <Card>
                <Pill className="px-4 py-2 text-xs uppercase tracking-[0.22em]" tone="light">
                  In this module
                </Pill>
                <ul className="mt-5 max-h-96 space-y-1 overflow-y-auto pr-1">
                  {subsections.map((subsection) => (
                    <li key={subsection.anchor}>
                      <a
                        className="block rounded-2xl px-4 py-2 text-sm font-medium text-ink transition hover:bg-paper-warm hover:text-chalkboard"
                        href={`#${subsection.anchor}`}
                      >
                        {subsection.text}
                      </a>
                    </li>
                  ))}
                </ul>
                <Link
                  className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-purple-deep transition hover:text-chalkboard"
                  href={`/courses/${course.slug}`}
                >
                  Full course outline
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Card>
            </aside>
          ) : null}
        </Container>
      </Section>

      <Section className="bg-paper px-4 pb-6 sm:px-6 lg:px-8">
        <Container className="max-w-6xl">
          <MarkCompleteButton courseSlug={course.slug} moduleSlug={courseModule.slug} />
        </Container>
      </Section>

      <Section className="bg-paper px-4 pb-20 sm:px-6 lg:px-8">
        <Container className="max-w-6xl">
          <div className="grid gap-6 md:grid-cols-2">
            {previous ? (
              <Link
                className="group rounded-[32px] border border-[#e7dcc7] bg-white px-7 py-6 shadow-soft transition hover:-translate-y-1"
                href={`/courses/${course.slug}/${previous.slug}`}
              >
                <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-purple-deep">
                  <ArrowLeft className="h-4 w-4" />
                  Previous module
                </div>
                <h3 className="mt-4 font-display text-2xl leading-tight text-chalkboard group-hover:text-purple-deep sm:text-3xl">
                  {previous.title}
                </h3>
              </Link>
            ) : (
              <Card className="border-dashed">
                <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-chalkboard/55">
                  <ArrowLeft className="h-4 w-4" />
                  Previous module
                </div>
                <h3 className="mt-4 font-display text-2xl leading-tight text-chalkboard sm:text-3xl">
                  This is the first module in the course.
                </h3>
              </Card>
            )}

            {next ? (
              <Link
                className="group rounded-[32px] border border-[#e7dcc7] bg-white px-7 py-6 shadow-soft transition hover:-translate-y-1"
                href={`/courses/${course.slug}/${next.slug}`}
              >
                <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-purple-deep">
                  Next module
                  <ArrowRight className="h-4 w-4" />
                </div>
                <h3 className="mt-4 font-display text-2xl leading-tight text-chalkboard group-hover:text-purple-deep sm:text-3xl">
                  {next.title}
                </h3>
              </Link>
            ) : (
              <Card className="border-dashed">
                <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-chalkboard/55">
                  Next module
                  <ArrowRight className="h-4 w-4" />
                </div>
                <h3 className="mt-4 font-display text-2xl leading-tight text-chalkboard sm:text-3xl">
                  You&apos;ve completed the course.
                </h3>
                <p className="mt-3 text-sm leading-7 text-ink-soft">
                  Head back to the course outline to review any module, or explore the classroom
                  for what to learn next.
                </p>
              </Card>
            )}
          </div>
          <div className="mt-10 max-w-2xl">
            <CourseProgressOverview
              courseSlug={course.slug}
              modules={course.modules.map((entry) => ({ slug: entry.slug, title: entry.title }))}
            />
          </div>
        </Container>
      </Section>
    </main>
  );
}
