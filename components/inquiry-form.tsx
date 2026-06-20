"use client";

import { useState } from "react";
import { ArrowLeft, ArrowRight, CheckCircle2, Loader2 } from "lucide-react";

const serviceOptions = [
  "Website & Digital Presence Audit",
  "Message & Next Step Audit",
  "Sermon Clarity Review",
  "Systems & Workflow Audit",
  "Snapshot Audit",
  "Focused Audit",
  "Priority Roadmap",
  "Custom Consulting"
];

const steps = ["Basics", "Scope", "Digital", "Sermons", "Systems", "Submit"];
const sermonSlots = Array.from({ length: 10 }, (_, index) => index + 1);

type Status = "idle" | "loading" | "success" | "error";

export function InquiryForm() {
  const [step, setStep] = useState(0);
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [sermonCount, setSermonCount] = useState(3);

  const wantsDigital = selectedServices.some((service) => service.includes("Website") || service.includes("Message") || service.includes("Snapshot") || service.includes("Focused") || service.includes("Priority"));
  const wantsSermons = selectedServices.includes("Sermon Clarity Review");
  const wantsSystems = selectedServices.some((service) => service.includes("Systems") || service.includes("Custom") || service.includes("Priority"));

  function toggleService(service: string) {
    setSelectedServices((current) => (current.includes(service) ? current.filter((item) => item !== service) : [...current, service]));
  }

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setMessage("");

    const formData = new FormData(event.currentTarget);
    const payload = Object.fromEntries(formData.entries());
    payload.services = selectedServices.join(", ");

    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    if (response.ok) {
      setStatus("success");
      setMessage("Thanks. Your inquiry was received. Kingdom IP will follow up with next steps.");
      event.currentTarget.reset();
      setSelectedServices([]);
      setSermonCount(3);
      setStep(0);
      return;
    }

    const data = await response.json().catch(() => null);
    setStatus("error");
    setMessage(data?.error ?? "Something went wrong. Please email hello@kingdomip.org.");
  }

  return (
    <form onSubmit={submit} className="border border-ink/15 bg-bone p-5 md:p-8">
      <div className="mb-8 grid gap-3" aria-label="Form progress">
        <div className="flex gap-2">
          {steps.map((label, index) => <span key={label} className={`h-2 flex-1 ${index <= step ? "bg-cobalt" : "bg-ink/12"}`} />)}
        </div>
        <p className="text-xs font-black uppercase text-cobalt">Step {step + 1} of {steps.length}: {steps[step]}</p>
      </div>

      <fieldset className={step === 0 ? "grid gap-5" : "hidden"}>
        <legend className="font-display text-3xl font-black">Tell us who you are.</legend>
        <div className="grid gap-5 md:grid-cols-2">
          <FormInput name="name" label="Name" required />
          <FormInput name="email" label="Email" type="email" required />
          <FormInput name="role" label="Your role" placeholder="Lead pastor, comms director, ops lead..." />
          <FormInput name="phone" label="Phone" type="tel" />
          <FormInput name="organization" label="Organization" required />
          <FormInput name="website" label="Website" type="url" />
        </div>
        <div className="grid gap-5 md:grid-cols-2">
          <SelectInput name="organizationType" label="Organization type" options={["Church", "Ministry", "Purpose-driven business", "Other"]} required />
          <FormInput name="size" label="Average weekly attendance or company size" />
          <FormInput name="location" label="City and state" />
          <FormInput name="denominationOrNetwork" label="Denomination / network, if relevant" />
        </div>
      </fieldset>

      <fieldset className={step === 1 ? "grid gap-5" : "hidden"}>
        <legend className="font-display text-3xl font-black">Choose the scope.</legend>
        <FormTextarea name="improve" label="What are you trying to improve?" required />
        <div>
          <p className="text-sm font-black uppercase">Which services are you interested in?</p>
          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            {serviceOptions.map((service) => (
              <label key={service} className="flex gap-3 border border-ink/15 bg-paper p-3 font-bold">
                <input
                  type="checkbox"
                  name="services"
                  value={service}
                  checked={selectedServices.includes(service)}
                  onChange={() => toggleService(service)}
                  className="mt-1 h-4 w-4 accent-cobalt"
                />
                <span>{service}</span>
              </label>
            ))}
          </div>
        </div>
        <div className="grid gap-5 md:grid-cols-2">
          <FormInput name="budget" label="Budget range" placeholder="$500-$1,000, $1,000-$2,500, $2,500-$5,000, custom, not sure" />
          <FormInput name="timeline" label="Timeline" placeholder="This month, next quarter, flexible" />
        </div>
        <FormTextarea name="successLooksLike" label="What would make this audit useful to you?" />
        <FormTextarea name="knownConcerns" label="What do you already suspect may be weak or confusing?" />
      </fieldset>

      <fieldset className={step === 2 ? "grid gap-5" : "hidden"}>
        <legend className="font-display text-3xl font-black">Website, message, and next steps.</legend>
        {wantsDigital ? (
          <>
            <div className="grid gap-5 md:grid-cols-2">
              <FormInput name="primaryWebsiteUrl" label="Primary website URL" type="url" />
              <FormInput name="cmsPlatform" label="Website platform / CMS" placeholder="Church Co, WordPress, Squarespace, Wix..." />
              <FormInput name="googleBusinessProfile" label="Google Business Profile link" type="url" />
              <FormInput name="mainSocialChannels" label="Primary social channels" placeholder="Instagram, Facebook, YouTube, TikTok links" />
            </div>
            <FormTextarea name="pagesToReview" label="Specific pages you want reviewed" placeholder="Homepage, Plan Your Visit, About, Kids, Groups, Giving, Events..." />
            <FormTextarea name="targetAudience" label="Who are you trying to reach most clearly?" />
            <FormTextarea name="currentNextSteps" label="What next steps do you currently ask people to take?" placeholder="Visit card, plan a visit, join a group, serve, next steps class..." />
            <FormTextarea name="connectionMaterials" label="Connection cards, forms, or follow-up links" placeholder="Paste form links, Planning Center forms, email sequence docs, or screenshots." />
            <FormTextarea name="sampleCommunications" label="Recent communication samples" placeholder="Announcement copy, email links, event promos, social posts, newsletters." />
            <FormTextarea name="competitorsOrReferences" label="Comparable churches or sites you like" />
            <FormTextarea name="analyticsAccess" label="Available analytics or search data" placeholder="Google Analytics, Search Console, Plausible, website reports, social metrics. Paste links or describe access." />
          </>
        ) : (
          <p className="border border-ink/15 bg-paper p-4 text-sm leading-6 text-ink/70">
            Select Website & Digital Presence, Message & Next Step, Snapshot, Focused Audit, or Priority Roadmap on the previous step to include this section.
          </p>
        )}
      </fieldset>

      <fieldset className={step === 3 ? "grid gap-5" : "hidden"}>
        <legend className="font-display text-3xl font-black">Sermon review materials.</legend>
        {wantsSermons ? (
          <>
            <div className="grid gap-5 md:grid-cols-2">
              <SelectInput name="sermonAuditCount" label="How many sermons should be reviewed?" value={String(sermonCount)} onChange={(event) => setSermonCount(Number(event.target.value))} options={["1", "3", "5", "10"]} />
              <FormInput name="primaryPreacher" label="Primary preacher / speaker" />
            </div>
            <FormTextarea name="sermonGoals" label="What kind of sermon feedback would help most?" placeholder="Structure, clarity, delivery, application, biblical flow, engagement, invitation, length..." />
            <FormTextarea name="sermonContext" label="Anything we should know about the series, audience, or preaching environment?" />
            <div className="grid gap-5">
              {sermonSlots.slice(0, sermonCount).map((slot) => (
                <div key={slot} className="border border-ink/15 bg-paper p-4">
                  <h3 className="font-display text-2xl font-black">Sermon {slot}</h3>
                  <div className="mt-4 grid gap-4 md:grid-cols-2">
                    <FormInput name={`sermon${slot}Title`} label="Title" />
                    <FormInput name={`sermon${slot}Date`} label="Date preached" type="date" />
                    <FormInput name={`sermon${slot}Speaker`} label="Speaker" />
                    <FormInput name={`sermon${slot}Scripture`} label="Primary scripture" />
                    <FormInput name={`sermon${slot}VideoLink`} label="Video link" type="url" />
                    <FormInput name={`sermon${slot}TranscriptLink`} label="Transcript / notes link" type="url" />
                  </div>
                  <FormTextarea name={`sermon${slot}SpecificQuestions`} label="Specific questions for this sermon" />
                </div>
              ))}
            </div>
          </>
        ) : (
          <p className="border border-ink/15 bg-paper p-4 text-sm leading-6 text-ink/70">
            Select Sermon Clarity Review on the scope step to include sermon links, transcripts, speaker details, and review goals.
          </p>
        )}
      </fieldset>

      <fieldset className={step === 4 ? "grid gap-5" : "hidden"}>
        <legend className="font-display text-3xl font-black">Systems, workflows, and custom context.</legend>
        {wantsSystems ? (
          <>
            <FormTextarea name="systemsInUse" label="What systems or tools are currently in use?" placeholder="Planning Center, Church Community Builder, Rock RMS, Google Workspace, Slack, Notion, Mailchimp..." />
            <FormTextarea name="workflowsToReview" label="Which workflows should be reviewed?" placeholder="Guest follow-up, event registration, volunteer onboarding, content planning, sermon prep, reporting..." />
            <FormTextarea name="workflowLinks" label="Workflow docs, forms, automations, or screenshots" />
            <FormTextarea name="bottlenecks" label="Where does work currently get stuck?" />
            <FormTextarea name="teamRoles" label="Who owns the work now?" placeholder="Staff roles, volunteers, approval process, handoffs." />
            <FormTextarea name="implementationCapacity" label="What capacity does your team have to implement recommendations?" />
            <FormTextarea name="customQuestions" label="Custom strategic questions you want answered" />
          </>
        ) : (
          <p className="border border-ink/15 bg-paper p-4 text-sm leading-6 text-ink/70">
            Select Systems & Workflow, Priority Roadmap, or Custom Consulting on the scope step to include workflow and custom strategy questions.
          </p>
        )}
      </fieldset>

      <fieldset className={step === 5 ? "grid gap-5" : "hidden"}>
        <legend className="font-display text-3xl font-black">Final materials and permissions.</legend>
        <FormTextarea name="supportingLinks" label="Supporting files or links" placeholder="Paste Google Drive links, Dropbox links, sermon videos, social channels, reports, screenshots, dashboards, or other materials." />
        <FormTextarea name="accessInstructions" label="Access instructions" placeholder="Anything needed to view private links, videos, reports, or folders. Do not paste passwords here." />
        <FormTextarea name="decisionMakers" label="Who should be involved in the debrief?" />
        <FormTextarea name="anythingElse" label="Anything else we should know?" />
        <label className="flex gap-3 border border-ink/15 bg-paper p-4 font-bold">
          <input type="checkbox" name="permissionToReview" value="yes" className="mt-1 h-4 w-4 accent-cobalt" />
          <span>I confirm Kingdom IP may review the links and materials submitted for the purpose of preparing this audit.</span>
        </label>
        <p className="border border-cobalt/30 bg-paper p-4 text-sm leading-6 text-ink/70">
          For launch reliability, uploads are handled by secure links rather than direct file upload. Google Drive, Dropbox, Vimeo, YouTube, Planning Center, and website links all work.
        </p>
      </fieldset>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <button type="button" onClick={() => setStep((value) => Math.max(0, value - 1))} className="inline-flex min-h-11 items-center justify-center gap-2 border border-ink/15 px-5 py-3 text-sm font-black uppercase disabled:opacity-40" disabled={step === 0}>
          <ArrowLeft className="h-4 w-4" /> Back
        </button>
        {step < steps.length - 1 ? (
          <button type="button" onClick={() => setStep((value) => Math.min(steps.length - 1, value + 1))} className="inline-flex min-h-11 items-center justify-center gap-2 bg-ink px-5 py-3 text-sm font-black uppercase text-paper">
            Continue <ArrowRight className="h-4 w-4" />
          </button>
        ) : (
          <button type="submit" className="inline-flex min-h-11 items-center justify-center gap-2 bg-lime px-5 py-3 text-sm font-black uppercase text-ink" disabled={status === "loading"}>
            {status === "loading" ? <Loader2 className="h-4 w-4 animate-spin" /> : <CheckCircle2 className="h-4 w-4" />} Submit Inquiry
          </button>
        )}
      </div>
      {message ? <p className={`mt-5 border p-4 text-sm font-bold ${status === "success" ? "border-cobalt bg-paper text-ink" : "border-orange bg-paper text-ink"}`}>{message}</p> : null}
    </form>
  );
}

function FormInput({ label, name, type = "text", required, placeholder }: { label: string; name: string; type?: string; required?: boolean; placeholder?: string }) {
  return (
    <div className="grid gap-2">
      <label className="text-sm font-black uppercase" htmlFor={name}>{label}</label>
      <input id={name} name={name} type={type} required={required} placeholder={placeholder} className="min-h-12 border border-ink/20 bg-paper px-3 text-ink placeholder:text-ink/35" />
    </div>
  );
}

function FormTextarea({ label, name, required, placeholder }: { label: string; name: string; required?: boolean; placeholder?: string }) {
  return (
    <div className="grid gap-2">
      <label className="text-sm font-black uppercase" htmlFor={name}>{label}</label>
      <textarea id={name} name={name} required={required} placeholder={placeholder} rows={5} className="border border-ink/20 bg-paper p-3 text-ink placeholder:text-ink/35" />
    </div>
  );
}

function SelectInput({
  label,
  name,
  options,
  required,
  value,
  onChange
}: {
  label: string;
  name: string;
  options: string[];
  required?: boolean;
  value?: string;
  onChange?: React.ChangeEventHandler<HTMLSelectElement>;
}) {
  return (
    <div className="grid gap-2">
      <label className="text-sm font-black uppercase" htmlFor={name}>{label}</label>
      <select id={name} name={name} required={required} value={value} onChange={onChange} className="min-h-12 border border-ink/20 bg-paper px-3 text-ink">
        <option value="">Select one</option>
        {options.map((option) => <option key={option} value={option}>{option}</option>)}
      </select>
    </div>
  );
}
