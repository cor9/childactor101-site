#!/usr/bin/env node
/**
 * Guard for the course route tree.
 *
 * Course routes moved from /courses/[course]/[lesson] to /courses/[course]/[module]
 * (plus static pages such as /courses/no-excuses/write-it). If an old checkout leaves
 * a differently-named dynamic folder next to the current one, Next.js cannot build the
 * route tree ("You cannot use different slug names for the same dynamic path") and every
 * request returns a plain "Internal Server Error".
 *
 * Runs before `npm run dev` / `npm run build`: deletes leftover dynamic folders under
 * src/app/courses that are not part of the current tree, and says what it removed.
 */
import { existsSync, readdirSync, rmSync, statSync } from "node:fs";
import { join } from "node:path";

const coursesDir = join(process.cwd(), "src", "app", "courses");
// Allowed dynamic folders, by parent directory (relative to src/app/courses).
const allowed = new Map([
  ["", new Set(["[course]"])],
  ["[course]", new Set(["[module]"])],
]);

function check(relativeDir) {
  const dir = join(coursesDir, relativeDir);
  const permitted = allowed.get(relativeDir) ?? new Set();

  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    if (!statSync(full).isDirectory()) continue;

    if (/^\[.*\]$/.test(name) && !permitted.has(name)) {
      rmSync(full, { recursive: true, force: true });
      console.log(`[route guard] Removed stale route folder src/app/courses/${join(relativeDir, name)}`);
      continue;
    }

    check(join(relativeDir, name));
  }
}

if (existsSync(coursesDir)) {
  check("");
}
