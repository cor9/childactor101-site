import type { Metadata } from "next";

import { AdobePage } from "@/components/adobe/AdobePage";
import type { AdobePageSpec } from "@/components/adobe/AdobePage";
import spec from "@/content/adobe/no-excuses/write-it.json";

export const metadata: Metadata = {
  title: "Write It | NO EXCUSES! DIY Actor Demo Reel Clips",
};

export default function WriteItPage() {
  return <AdobePage spec={spec as AdobePageSpec} />;
}
