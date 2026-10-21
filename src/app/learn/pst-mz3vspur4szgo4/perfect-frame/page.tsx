import type { Metadata } from "next";

import "@/content/adobe/perfect-self-tape/perfect-frame.theme.css";
import { AdobeCourseNav } from "@/components/adobe/AdobeCourseNav";
import { AdobePage } from "@/components/adobe/AdobePage";
import type { AdobePageSpec } from "@/components/adobe/AdobePage";
import { perfectSelfTapePages } from "@/content/adobe/perfect-self-tape/order";
import spec from "@/content/adobe/perfect-self-tape/perfect-frame.json";

export const metadata: Metadata = {
  title: "Perfect Frame | The Perfect Self Tape",
};

export default function Page() {
  return (
    <>
      <AdobePage spec={spec as AdobePageSpec} />
      <AdobeCourseNav
        courseSlug="perfect-self-tape"
        courseTitle="The Perfect Self Tape"
        current="perfect-frame"
        pages={perfectSelfTapePages}
      />
    </>
  );
}
