import { getSearchEntries } from "@/lib/blog";

export const dynamic = "force-static";

export function GET() {
  return Response.json(getSearchEntries());
}
