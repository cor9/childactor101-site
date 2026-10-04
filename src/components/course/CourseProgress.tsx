"use client";

import { useCallback, useSyncExternalStore } from "react";
import { Check } from "lucide-react";

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

function useCompletedModules(courseSlug: string) {
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
          Module completed
        </>
      ) : (
        "Mark module complete"
      )}
    </button>
  );
}

export interface CompletionDotProps {
  courseSlug: string;
  moduleSlug: string;
}

export function CompletionDot({ courseSlug, moduleSlug }: CompletionDotProps) {
  const { completed } = useCompletedModules(courseSlug);
  const isComplete = completed.has(moduleSlug);

  return (
    <span
      aria-label={isComplete ? "Module completed" : "Module not completed"}
      className={`inline-flex h-6 w-6 flex-none items-center justify-center rounded-full border transition ${
        isComplete ? "border-transparent bg-chalkboard text-chalk" : "border-chalkboard/25 bg-white text-transparent"
      }`}
      role="img"
    >
      <Check className="h-3.5 w-3.5" aria-hidden />
    </span>
  );
}

export interface CourseProgressOverviewProps {
  courseSlug: string;
  modules: { slug: string; title: string }[];
}

export function CourseProgressOverview({ courseSlug, modules }: CourseProgressOverviewProps) {
  const { completed } = useCompletedModules(courseSlug);

  const completedCount = modules.filter((module) => completed.has(module.slug)).length;
  const total = modules.length;
  const percent = total > 0 ? Math.round((completedCount / total) * 100) : 0;
  const resumeModule = modules.find((module) => !completed.has(module.slug)) ?? modules[0];
  const isFinished = completedCount === total && total > 0;

  return (
    <div className="rounded-[28px] border border-[#e7dcc7] bg-white px-6 py-5 shadow-soft">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-purple-deep">
          Your progress
        </p>
        <p className="text-sm font-semibold text-chalkboard">
          {completedCount} of {total} modules · {percent}%
        </p>
      </div>
      <div
        aria-label={`Course completion ${percent}%`}
        aria-valuemax={100}
        aria-valuemin={0}
        aria-valuenow={percent}
        className="mt-4 h-3 overflow-hidden rounded-full bg-paper-warm"
        role="progressbar"
      >
        <div
          className="h-full rounded-full bg-[linear-gradient(90deg,#a678f2_0%,#7046b8_100%)] transition-[width] duration-500"
          style={{ width: `${percent}%` }}
        />
      </div>
      <div className="mt-5">
        {isFinished ? (
          <p className="text-sm font-semibold text-chalkboard">
            You finished this course. Nice work keeping the momentum going.
          </p>
        ) : resumeModule ? (
          <Button href={`/courses/${courseSlug}/${resumeModule.slug}`} size="md" variant="chalk">
            {completedCount > 0 ? `Resume: ${resumeModule.title}` : "Start the first module"}
          </Button>
        ) : null}
      </div>
    </div>
  );
}
