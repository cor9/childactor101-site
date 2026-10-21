/* eslint-disable @next/next/no-img-element -- promo art is shown at its natural proportions */
import type { Metadata } from "next";

import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Button } from "@/components/Button";
import { coursePresentation } from "@/content/courses/presentation";

const STRIPE_CHECKOUT_URL = "https://buy.stripe.com/8x28wPbOnaPRfaZfoK2wV0s";

const promo = "/courses/no-excuses/promo";
const presentation = coursePresentation["no-excuses"];

export const metadata: Metadata = {
  title: "NO EXCUSES! DIY Actor Demo Reel Clips | Video Course",
  description:
    "A thorough and in-depth course on creating quality and effective demo clips for young actors, from Child Actor 101.",
  openGraph: { images: [`${promo}/noexcusesHERO.jpg`] },
};

const steps = ["welcome", "write-it", "plan-prep-it", "shoot-it", "edit-it", "use-it"] as const;

function BuyButton() {
  return (
    <Button href={STRIPE_CHECKOUT_URL} rel="noopener" size="lg">
      Purchase the course
    </Button>
  );
}

export default function NoExcusesSalesPage() {
  return (
    <main>
      <section className="bg-chalkboard-deep text-chalk">
        <div className="mx-auto w-full max-w-6xl px-4 pb-14 pt-8 sm:px-6 lg:px-8 lg:pb-16">
          <Breadcrumbs
            items={[{ label: "Home", href: "/" }, { label: "Courses", href: "/courses" }, { label: "NO EXCUSES!" }]}
            tone="chalk"
          />
          <div className="mt-10 grid items-center gap-10 lg:grid-cols-2">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#b8ead8]">{presentation.tagline}</p>
              <h1 className="mt-4 font-display text-5xl leading-[0.98] text-white sm:text-6xl">
                NO EXCUSES! DIY Actor Demo Reel Clips
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-8 text-[#d8ede2]">{presentation.intro}</p>
              <p className="mt-4 max-w-xl text-lg leading-8 text-[#d8ede2]">
                Write it, plan it, shoot it, edit it and use it, with the phone you already own.
              </p>
              <div className="mt-8">
                <BuyButton />
              </div>
              <p className="mt-3 text-sm text-[#b8ead8]">Secure checkout with Stripe. You get instant access to the course.</p>
            </div>
            <img
              alt="NO EXCUSES! DIY Actor Demo Reel Clips"
              className="w-full rounded-[28px] shadow-[0_30px_60px_rgba(0,0,0,0.35)]"
              src={`${promo}/noexcusesHERO.jpg`}
            />
          </div>
        </div>
      </section>

      <section className="px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
        <div className="mx-auto w-full max-w-5xl">
          <h2 className="font-display text-4xl text-chalkboard sm:text-5xl">What you will do</h2>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-ink-soft">{presentation.promise}</p>
          <ol className="mt-10 grid gap-5 sm:grid-cols-2">
            {steps.map((slug, index) => {
              const info = presentation.modules[slug];
              return (
                <li className="rounded-[28px] border border-[#e7dcc7] bg-white p-6 shadow-soft" key={slug}>
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-purple-deep">
                    {info.eyebrow ?? `Step ${index + 1}`}
                  </p>
                  <h3 className="mt-2 font-display text-2xl text-chalkboard">{info.name}</h3>
                  <p className="mt-3 leading-7 text-ink-soft">{info.outcome}</p>
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      <section>
        <img alt="" className="block w-full" src={`${promo}/noexcusesBANNER.jpg`} />
      </section>

      <section className="px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
        <div className="mx-auto grid w-full max-w-5xl gap-6 sm:grid-cols-2">
          <img alt="Inside the NO EXCUSES! course" className="w-full rounded-[24px] shadow-soft" src={`${promo}/noexcusesSHOT1.jpg`} />
          <img alt="Inside the NO EXCUSES! course" className="w-full rounded-[24px] shadow-soft" src={`${promo}/noexcusesSHOT2.jpg`} />
        </div>
      </section>

      <section className="bg-chalkboard-deep px-4 py-14 text-center text-chalk sm:px-6 lg:px-8 lg:py-16">
        <div className="mx-auto max-w-2xl">
          <h2 className="font-display text-4xl text-white sm:text-5xl">No excuses. Make your clip.</h2>
          <p className="mt-4 text-lg leading-8 text-[#d8ede2]">
            After checkout you are taken straight to the course, and it is yours to work through at your own pace.
          </p>
          <div className="mt-8">
            <BuyButton />
          </div>
        </div>
      </section>
    </main>
  );
}
