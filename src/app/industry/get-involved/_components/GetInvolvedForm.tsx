"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";

const interestOptions = [
  "Open Call participation",
  "Podcast guest",
  "Panel / webinar / Live Friday",
  "Guest article / expert contribution",
  "Directory participation",
  "Educational collaboration",
  "Media / interview",
  "Other",
];

const categoryOptions = [
  "Talent agent",
  "Talent manager",
  "Casting professional",
  "Producer / director",
  "Acting coach",
  "Photographer",
  "Entertainment attorney",
  "Youth-industry service provider",
  "Journalist / media",
  "Conference / event organizer",
  "Educator",
  "Professional organization",
  "Other",
];

const inputClass =
  "mt-2 w-full rounded-2xl border border-chalkboard/15 bg-white px-4 py-3 text-sm text-ink shadow-soft outline-none transition focus:border-purple focus:ring-2 focus:ring-purple/25";
const labelClass = "text-sm font-semibold text-chalkboard";

// No backend/CRM integration exists yet. Submission opens a pre-filled
// email to the team so this form is genuinely functional without
// pretending a database or automation is wired up. Replace with a real
// endpoint once one exists.
const CONTACT_EMAIL = "industry@childactor101.com";

export function GetInvolvedForm() {
  const [interests, setInterests] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);

  function toggleInterest(option: string) {
    setInterests((current) =>
      current.includes(option)
        ? current.filter((item) => item !== option)
        : [...current, option],
    );
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const lines = [
      `Name: ${formData.get("name") ?? ""}`,
      `Professional title: ${formData.get("title") ?? ""}`,
      `Company/organization: ${formData.get("company") ?? ""}`,
      `Email: ${formData.get("email") ?? ""}`,
      `Website: ${formData.get("website") ?? ""}`,
      `Location: ${formData.get("location") ?? ""}`,
      `Professional category: ${formData.get("category") ?? ""}`,
      `Interested in: ${interests.join(", ") || "Not specified"}`,
      "",
      `Short bio:`,
      `${formData.get("bio") ?? ""}`,
      "",
      `What they have in mind:`,
      `${formData.get("details") ?? ""}`,
      "",
      `Social/professional link: ${formData.get("social") ?? ""}`,
    ];

    const subject = encodeURIComponent(
      `Get Involved: ${formData.get("name") ?? "New inquiry"}`,
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
          Your email app should now be open with your responses filled in.
          Send that email and the Child Actor 101 team will follow up.
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
          <span className={labelClass}>Professional title</span>
          <input required name="title" type="text" className={inputClass} />
        </label>
        <label className="block">
          <span className={labelClass}>Company / organization</span>
          <input name="company" type="text" className={inputClass} />
        </label>
        <label className="block">
          <span className={labelClass}>Email</span>
          <input required name="email" type="email" className={inputClass} />
        </label>
        <label className="block">
          <span className={labelClass}>Website</span>
          <input name="website" type="url" className={inputClass} placeholder="https://" />
        </label>
        <label className="block">
          <span className={labelClass}>Location</span>
          <input name="location" type="text" className={inputClass} />
        </label>
      </div>

      <label className="block">
        <span className={labelClass}>Professional category</span>
        <select required name="category" className={inputClass} defaultValue="">
          <option value="" disabled>
            Select the option that fits best
          </option>
          {categoryOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </label>

      <fieldset>
        <legend className={labelClass}>What are you interested in?</legend>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          {interestOptions.map((option) => (
            <label
              key={option}
              className="flex items-start gap-3 rounded-2xl border border-chalkboard/10 bg-white px-4 py-3 text-sm text-ink-soft shadow-soft"
            >
              <input
                type="checkbox"
                checked={interests.includes(option)}
                onChange={() => toggleInterest(option)}
                className="mt-0.5 h-4 w-4 shrink-0 rounded border-chalkboard/30 text-purple focus:ring-purple/30"
              />
              <span>{option}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <label className="block">
        <span className={labelClass}>Short bio</span>
        <textarea name="bio" rows={3} className={inputClass} />
      </label>

      <label className="block">
        <span className={labelClass}>Tell us what you have in mind</span>
        <textarea required name="details" rows={4} className={inputClass} />
      </label>

      <label className="block">
        <span className={labelClass}>Social / professional link (optional)</span>
        <input name="social" type="url" className={inputClass} placeholder="https://" />
      </label>

      <button
        type="submit"
        className="inline-flex w-fit items-center justify-center gap-2 rounded-full bg-[linear-gradient(180deg,#b58bf8_0%,#9568ec_100%)] px-7 py-4 text-base font-semibold text-white shadow-[0_18px_32px_rgba(149,104,236,0.34)] transition duration-200 hover:-translate-y-0.5 hover:brightness-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple"
      >
        Send to Child Actor 101
        <ArrowRight className="h-5 w-5" />
      </button>
      <p className="text-xs leading-6 text-ink-soft/80">
        This opens your email app with your responses filled in — there is no
        automated form processing yet, so sending the email is what completes
        your submission.
      </p>
    </form>
  );
}
