import type { Metadata } from "next";

import "@/content/adobe/perfect-self-tape/bending-the-rules.theme.css";
import { AdobeCourseNav } from "@/components/adobe/AdobeCourseNav";
import { AdobePage } from "@/components/adobe/AdobePage";
import type { AdobePageSpec } from "@/components/adobe/AdobePage";
import { perfectSelfTapePages } from "@/content/adobe/perfect-self-tape/order";
import spec from "@/content/adobe/perfect-self-tape/bending-the-rules.json";

export const metadata: Metadata = {
  title: "Bending the Rules | The Perfect Self Tape",
};

export default function Page() {
  return (
    <>
      <AdobePage spec={spec as AdobePageSpec} />
      <AdobeCourseNav
        courseSlug="perfect-self-tape"
        courseTitle="The Perfect Self Tape"
        current="bending-the-rules"
        pages={perfectSelfTapePages}
      />
    </>
  );
}
