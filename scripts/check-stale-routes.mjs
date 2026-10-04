#!/usr/bin/env node
/**
 * Course routes moved from /courses/[course]/[lesson] to /courses/[course]/[module].
 * If an old checkout leaves the previous [lesson] route on disk, Next.js refuses to
 * start the route tree ("different slug names for the same dynamic path") and every
 * page returns "Internal Server Error". Remove that stale route automatically.
 */
import { existsSync, readFileSync, rmSync } from "node:fs";
import { join } from "node:path";

const staleDir = join(process.cwd(), "src", "app", "courses", "[course]", "[lesson]");
const stalePage = join(staleDir, "page.tsx");

if (existsSync(stalePage) && readFileSync(stalePage, "utf8").includes("CourseLessonPage")) {
  rmSync(staleDir, { recursive: true, force: true });
  console.log("Removed stale route src/app/courses/[course]/[lesson] (replaced by [module]).");
}
