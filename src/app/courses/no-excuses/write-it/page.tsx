import type { Metadata } from "next";

import "@/content/adobe/no-excuses/write-it.theme.css";
import { AdobePage } from "@/components/adobe/AdobePage";
import type { AdobePageSpec } from "@/components/adobe/AdobePage";
import spec from "@/content/adobe/no-excuses/write-it.json";

export const metadata: Metadata = {
  title: "Write It | NO EXCUSES! DIY Actor Demo Reel Clips",
};

export default function Page() {
  return <AdobePage spec={spec as AdobePageSpec} />;
}
