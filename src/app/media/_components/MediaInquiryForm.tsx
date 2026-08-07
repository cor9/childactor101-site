"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";

const opportunityTypes = [
  "Podcast",
  "Interview",
  "Speaking engagement",
  "Panel",
  "Webinar",
  "Guest article",
  "Expert quote",
  "Review / commentary",
  "Educational collaboration",
  "Other",
];

const compensationOptions = ["Paid", "Unpaid", "Negotiable", "Not sure"];

const inputClass =
  "mt-2 w-full rounded-2xl border border-chalkboard/15 bg-white px-4 py-3 text-sm text-ink shadow-soft outline-none transition focus:border-purple focus:ring-2 focus:ring-purple/25";
const labelClass = "text-sm font-semibold text-chalkboard";

// No backend/CRM integration exists yet. Submission opens a pre-filled
// email so this form is genuinely functional without pretending a
// database or automation is wired up. Replace with a real endpoint
// once a press/media inbox integration exists.
const CONTACT_EMAIL = "press@childactor101.com";

export function MediaInquiryForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const lines = [
      `Name: ${formData.get("name") ?? ""}`,
      `Email: ${formData.get("email") ?? ""}`,
      `Company/publication/show: ${formData.get("company") ?? ""}`,
      `Website: ${formData.get("website") ?? ""}`,
      `Opportunity type: ${formData.get("opportunityType") ?? ""}`,
      `Topic: ${formData.get("topic") ?? ""}`,
      `Audience: ${formData.get("audience") ?? ""}`,
      `Format: ${formData.get("format") ?? ""}`,
      `Proposed date: ${formData.get("proposedDate") ?? ""}`,
      `Deadline: ${formData.get("deadline") ?? ""}`,
      `Compensation: ${formData.get("compensation") ?? ""}`,
      "",
      `Details:`,
      `${formData.get("details") ?? ""}`,
    ];

    const subject = encodeURIComponent(
      `Media inquiry: ${formData.get("company") ?? formData.get("name") ?? "New inquiry"}`,
    );
    const body = encodeURIComponent(lines.join("\n"));

    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="rounded-[28px] border border-[#e7dcc7] bg-white px-6 py-8 text-center shadow-soft">
        <h3 className="font-display text-2xl text-chalkboard">Thanks — one more step.</h3>
        <p className="mt-3 text-sm leading-7 text-ink-soft">
          Your email app should now be open with your pitch filled in. Send
          that email and Corey&apos;s team will follow up.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <label className="block">
          <span className={labelClass}>Name</span>
          <input required name="name" type="text" className={inputClass} />
        </label>
        <label className="block">
          <span className={labelClass}>Email</span>
          <input required name="email" type="email" className={inputClass} />
        </label>
        <label className="block">
          <span className={labelClass}>Company / publication / show</span>
          <input required name="company" type="text" className={inputClass} />
        </label>
        <label className="block">
          <span className={labelClass}>Website</span>
          <input name="website" type="url" className={inputClass} placeholder="https://" />
        </label>
      </div>

      <label className="block">
        <span className={labelClass}>Opportunity type</span>
        <select required name="opportunityType" className={inputClass} defaultValue="">
          <option value="" disabled>
            Select an opportunity type
          </option>
          {opportunityTypes.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </label>

      <div className="grid gap-6 sm:grid-cols-2">
        <label className="block">
          <span className={labelClass}>Topic</span>
          <input required name="topic" type="text" className={inputClass} />
        </label>
        <label className="block">
          <span className={labelClass}>Audience</span>
          <input name="audience" type="text" className={inputClass} />
        </label>
        <label className="block">
          <span className={labelClass}>Format</span>
          <input name="format" type="text" className={inputClass} placeholder="e.g. 30-min remote interview" />
        </label>
        <label className="block">
          <span className={labelClass}>Proposed date</span>
          <input name="proposedDate" type="text" className={inputClass} />
        </label>
        <label className="block">
          <span className={labelClass}>Deadline</span>
          <input name="deadline" type="text" className={inputClass} />
        </label>
        <label className="block">
          <span className={labelClass}>Compensation</span>
          <select name="compensation" className={inputClass} defaultValue="">
            <option value="" disabled>
              Select one
            </option>
            {compensationOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>
      </div>

      <label className="block">
        <span className={labelClass}>Details</span>
        <textarea required name="details" rows={4} className={inputClass} />
      </label>

      <button
        type="submit"
        className="inline-flex w-fit items-center justify-center gap-2 rounded-full bg-[linear-gradient(180deg,#b58bf8_0%,#9568ec_100%)] px-7 py-4 text-base font-semibold text-white shadow-[0_18px_32px_rgba(149,104,236,0.34)] transition duration-200 hover:-translate-y-0.5 hover:brightness-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple"
      >
        Send pitch to Child Actor 101
        <ArrowRight className="h-5 w-5" />
      </button>
      <p className="text-xs leading-6 text-ink-soft/80">
        This opens your email app with your pitch filled in — there is no
        automated form processing yet, so sending the email is what completes
        your submission.
      </p>
    </form>
  );
}
