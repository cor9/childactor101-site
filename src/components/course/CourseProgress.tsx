"use client";

import { useCallback, useSyncExternalStore } from "react";
import { Check } from "lucide-react";

import Link from "next/link";

import { Button } from "@/components/ui/Button";

const STORAGE_KEY = "ca101:course-progress:v2";
const EMPTY: string[] = [];

type ProgressMap = Record<string, string[]>;

const listeners = new Set<() => void>();

let cachedRaw: string | null = null;
let cachedMap: ProgressMap = {};

function getProgressMap(): ProgressMap {
  if (typeof window === "undefined") {
    return cachedMap;
  }

  const raw = window.localStorage.getItem(STORAGE_KEY);

  if (raw !== cachedRaw) {
    cachedRaw = raw;
    try {
      cachedMap = raw ? (JSON.parse(raw) as ProgressMap) : {};
    } catch {
      cachedMap = {};
    }
  }

  return cachedMap;
}

function setCompletedModules(courseSlug: string, moduleSlugs: string[]) {
  const next: ProgressMap = { ...getProgressMap(), [courseSlug]: moduleSlugs };
  cachedMap = next;
  cachedRaw = JSON.stringify(next);

  try {
    window.localStorage.setItem(STORAGE_KEY, cachedRaw);
  } catch {
    // Progress is best-effort; storage failures should not break the page.
  }

  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  window.addEventListener("storage", listener);

  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", listener);
  };
}

export function useCompletedModules(courseSlug: string) {
  const completed = useSyncExternalStore(
    subscribe,
    () => getProgressMap()[courseSlug] ?? EMPTY,
    () => EMPTY,
  );

  const toggleModule = useCallback(
    (moduleSlug: string) => {
      const current = new Set(getProgressMap()[courseSlug] ?? EMPTY);

      if (current.has(moduleSlug)) {
        current.delete(moduleSlug);
      } else {
        current.add(moduleSlug);
      }

      setCompletedModules(courseSlug, Array.from(current));
    },
    [courseSlug],
  );

  return { completed: new Set(completed), toggleModule };
}

export interface MarkCompleteButtonProps {
  courseSlug: string;
  moduleSlug: string;
}

export function MarkCompleteButton({ courseSlug, moduleSlug }: MarkCompleteButtonProps) {
  const { completed, toggleModule } = useCompletedModules(courseSlug);
  const isComplete = completed.has(moduleSlug);

  return (
    <button
      aria-pressed={isComplete}
      className={`inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold transition duration-200 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple sm:text-base ${
        isComplete
          ? "bg-[linear-gradient(180deg,#3d845a_0%,#2f704d_100%)] text-white shadow-[0_18px_34px_rgba(35,79,59,0.28)]"
          : "border border-[#e7dcc7] bg-white text-chalkboard shadow-[0_12px_28px_rgba(23,56,43,0.09)] hover:bg-paper-warm"
      }`}
      onClick={() => toggleModule(moduleSlug)}
      type="button"
    >
      {isComplete ? (
        <>
          <Check className="h-4 w-4" aria-hidden />
          Marked complete
        </>
      ) : (
        "Mark this complete"
      )}
    </button>
  );
}

export interface CompletionMarkProps {
  courseSlug: string;
  /** Shown inside the circle until the module is completed. */
  label: string;
  moduleSlug: string;
  className?: string;
  tone?: "light" | "dark";
}

/** Numbered circle that turns into a check once the module is complete. */
export function CompletionMark({
  className = "",
  courseSlug,
  label,
  moduleSlug,
  tone = "light",
}: CompletionMarkProps) {
  const { completed } = useCompletedModules(courseSlug);
  const isComplete = completed.has(moduleSlug);
  const idle =
    tone === "light"
      ? "border-chalkboard/20 bg-white text-chalkboard"
      : "border-white/30 bg-white/10 text-white";

  return (
    <span
      className={`inline-flex flex-none items-center justify-center rounded-full border font-display transition ${
        isComplete ? "border-transparent bg-[#3d845a] text-white" : idle
      } ${className}`}
    >
      {isComplete ? <Check className="h-[55%] w-[55%]" aria-hidden /> : label}
      <span className="sr-only">{isComplete ? " (completed)" : ""}</span>
    </span>
  );
}

export interface ModuleActionProps {
  courseSlug: string;
  moduleSlug: string;
  /** All module slugs in course order; the first incomplete one is "Continue". */
  order: string[];
  className?: string;
}

/** Start / Continue / Review button for one module, based on saved progress. */
export function ModuleAction({ className = "", courseSlug, moduleSlug, order }: ModuleActionProps) {
  const { completed } = useCompletedModules(courseSlug);
  const isComplete = completed.has(moduleSlug);
  const resumeSlug = order.find((slug) => !completed.has(slug));
  const isCurrent = resumeSlug === moduleSlug;
  const anyDone = completed.size > 0;
  const label = isComplete ? "Review" : isCurrent ? (anyDone ? "Continue" : "Start") : "Open";
  const classes = isCurrent
    ? "bg-[linear-gradient(180deg,#3d845a_0%,#2f704d_100%)] text-white shadow-[0_14px_28px_rgba(35,79,59,0.25)]"
    : "border border-[#e7dcc7] bg-white text-chalkboard hover:bg-paper-warm";

  return (
    <Link
      className={`inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-semibold transition hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple ${classes} ${className}`}
      href={`/courses/${courseSlug}/${moduleSlug}`}
    >
      {label}
    </Link>
  );
}

export interface ResumePanelProps {
  courseSlug: string;
  modules: { slug: string; name: string }[];
  /** "stage" / "part" - used in the progress sentence. */
  unit: string;
}

/** Hero progress + "resume course" action; sends the learner to the right module. */
export function ResumePanel({ courseSlug, modules, unit }: ResumePanelProps) {
  const { completed } = useCompletedModules(courseSlug);
  const done = modules.filter((module) => completed.has(module.slug)).length;
  const total = modules.length;
  const percent = total > 0 ? Math.round((done / total) * 100) : 0;
  const resume = modules.find((module) => !completed.has(module.slug));
  const target = resume ?? modules[0];

  return (
    <div className="mt-8 max-w-md">
      <div className="flex items-center justify-between text-sm text-[#cfe8dc]">
        <span>
          {done === 0
            ? `${total} ${unit}s to work through`
            : resume
              ? `${done} of ${total} ${unit}s complete`
              : `All ${total} ${unit}s complete`}
        </span>
        <span aria-hidden>{percent}%</span>
      </div>
      <div
        aria-label={`Course completion ${percent}%`}
        aria-valuemax={100}
        aria-valuemin={0}
        aria-valuenow={percent}
        className="mt-2 h-2 overflow-hidden rounded-full bg-white/15"
        role="progressbar"
      >
        <div
          className="h-full rounded-full bg-gold transition-[width] duration-500"
          style={{ width: `${percent}%` }}
        />
      </div>
      {target ? (
        <div className="mt-6">
          <Button href={`/courses/${courseSlug}/${target.slug}`} size="lg" variant="primary">
            {done === 0 ? "Start the course" : resume ? `Resume: ${target.name}` : "Review the course"}
          </Button>
        </div>
      ) : null}
    </div>
  );
}

export interface ModuleTrackerProps {
  courseSlug: string;
  currentSlug: string;
  steps: { slug: string; name: string; label: string }[];
}

/** Compact progress path shown at the top of a module page. */
export function ModuleTracker({ courseSlug, currentSlug, steps }: ModuleTrackerProps) {
  const showAllNames = steps.length <= 6;

  return (
    <nav aria-label="Course progress" className="mt-8">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-3">
        {steps.map((step, index) => {
          const isCurrent = step.slug === currentSlug;

          return (
            <li className="flex items-center gap-2" key={step.slug}>
              {index > 0 ? <span aria-hidden className="h-px w-3 bg-white/25 sm:w-5" /> : null}
              <Link
                aria-current={isCurrent ? "step" : undefined}
                className={`group flex items-center gap-2 rounded-full py-1 pr-3 transition ${
                  isCurrent ? "bg-white/15 pl-1" : "pl-1 hover:bg-white/10"
                }`}
                href={`/courses/${courseSlug}/${step.slug}`}
              >
                <CompletionMark
                  className={`h-7 w-7 text-xs ${isCurrent ? "ring-2 ring-gold" : ""}`}
                  courseSlug={courseSlug}
                  label={step.label}
                  moduleSlug={step.slug}
                  tone="dark"
                />
                <span
                  className={`text-sm font-medium text-white ${
                    isCurrent || showAllNames ? (isCurrent ? "" : "hidden lg:inline") : "sr-only"
                  }`}
                >
                  {step.name}
                </span>
              </Link>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
