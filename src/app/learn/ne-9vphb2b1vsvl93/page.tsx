import { redirect } from "next/navigation";

import { NO_EXCUSES_PRIVATE_BASE } from "@/content/adobe/no-excuses/order";

/** The private course address (the Stripe success link) opens the first page. */
export default function NoExcusesStart() {
  redirect(`${NO_EXCUSES_PRIVATE_BASE}/welcome`);
}
