import type { Metadata } from "next";

import "@/content/adobe/no-excuses/use-it.theme.css";
import { AdobeCourseNav } from "@/components/adobe/AdobeCourseNav";
import { AdobePage } from "@/components/adobe/AdobePage";
import type { AdobePageSpec } from "@/components/adobe/AdobePage";
import { noExcusesPages } from "@/content/adobe/no-excuses/order";
import spec from "@/content/adobe/no-excuses/use-it.json";

export const metadata: Metadata = {
  title: "Use It | NO EXCUSES! DIY Actor Demo Reel Clips",
};

export default function Page() {
  return (
    <>
      <AdobePage spec={spec as AdobePageSpec} />
      <AdobeCourseNav
        courseSlug="no-excuses"
        courseTitle="NO EXCUSES!"
        current="use-it"
        pages={noExcusesPages}
      />
    </>
  );
}
