"use client";

import { useMemo, useState } from "react";
import { CheckCircle2, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";

const serviceOptions = [
  "Website Audit",
  "Website Strategy",
  "Social Media Audit",
  "Brand / Messaging Audit",
  "Sermon / Preaching Audit",
  "Church or Ministry Strategy",
  "Guest Experience / Assimilation Audit",
  "Communication Strategy",
  "AI Systems or Workflow Consulting",
  "Custom Project / Not Sure Yet"
];

type Status = "idle" | "loading" | "success" | "error";
type FormValue = string | string[];
type FormValues = Record<string, FormValue>;

const servicePages = [
  {
    service: "Website Audit",
    title: "Website Audit",
    intro: "Share what you can. A live website link is the most helpful starting point.",
    fields: [
      { type: "text", name: "websiteAuditUrl", label: "Current website URL", autoFill: "website" },
      { type: "textarea", name: "websiteAuditGoal", label: "What is your website supposed to help people do?", placeholder: "Visit, plan a visit, give, book, buy, contact you, understand your services, join a group..." },
      { type: "textarea", name: "websiteAuditWeakness", label: "What do you think is currently not working?" },
      { type: "textarea", name: "websiteAuditPages", label: "Specific pages you want reviewed" },
      { type: "textarea", name: "websiteAuditOutcome", label: "What would a better website accomplish in the next 6-12 months?" },
      { type: "text", name: "websiteAuditAdmire1", label: "Website you admire 1" },
      { type: "text", name: "websiteAuditAdmire2", label: "Website you admire 2" },
      { type: "text", name: "websiteAuditAdmire3", label: "Website you admire 3" },
      { type: "select", name: "websiteAuditAccess", label: "Do you have access to your website platform?", options: ["Yes", "No", "Not sure"] },
      { type: "select", name: "websiteAuditPlatform", label: "What platform is your site built on?", options: ["WordPress", "Squarespace", "Wix", "Shopify", "The Church Co", "Planning Center Publishing", "Webflow", "Other", "Not sure"] },
      { type: "textarea", name: "websiteAuditNotes", label: "Anything else about your website we should know?" }
    ]
  },
  {
    service: "Website Strategy",
    title: "Website Strategy",
    fields: [
      { type: "text", name: "websiteStrategyUrl", label: "Current website URL", autoFill: "website" },
      { type: "select", name: "websiteStrategyScope", label: "What kind of website help do you need?", options: ["Clarity audit", "Strategic refresh plan", "Page priority plan", "Copy / messaging direction", "Platform recommendation", "Not sure yet"] },
      { type: "textarea", name: "websiteStrategyProblem", label: "What is the main problem with your current site?" },
      { type: "textarea", name: "websiteStrategyActions", label: "Top three actions you want visitors to take" },
      { type: "textarea", name: "websiteStrategyMustHave", label: "Pages or information that must be included" },
      { type: "checkbox", name: "websiteStrategyAssets", label: "Branding assets you already have", options: ["Logo", "Brand colors", "Photos", "Copy / messaging", "None of the above", "Not sure"] },
      { type: "text", name: "websiteStrategyDeadline", label: "Timeline or decision deadline" },
      { type: "textarea", name: "websiteStrategyAdmire", label: "Websites you admire" },
      { type: "textarea", name: "websiteStrategyNotes", label: "Anything else we should know?" }
    ]
  },
  {
    service: "Social Media Audit",
    title: "Social Media Audit",
    fields: [
      { type: "text", name: "socialWebsite", label: "Primary website URL", autoFill: "website" },
      { type: "text", name: "instagram", label: "Instagram URL or handle" },
      { type: "text", name: "facebook", label: "Facebook page URL" },
      { type: "text", name: "youtube", label: "YouTube channel URL" },
      { type: "text", name: "tiktok", label: "TikTok URL or handle" },
      { type: "textarea", name: "otherSocial", label: "Other relevant social media channels" },
      { type: "checkbox", name: "socialPlatforms", label: "Which platforms matter most?", options: ["Instagram", "Facebook", "YouTube", "TikTok", "LinkedIn", "Email", "Other"] },
      { type: "checkbox", name: "socialGoals", label: "What are you trying to accomplish?", options: ["Reach new people", "Increase attendance / visits", "Build trust", "Improve communication", "Grow engagement", "Generate leads or sales", "Develop leaders / volunteers", "Other"] },
      { type: "textarea", name: "socialWeakness", label: "What feels weak, unclear, or inconsistent right now?" },
      { type: "textarea", name: "socialAudience", label: "Who are you trying to reach?" },
      { type: "textarea", name: "socialAdmire", label: "Organizations or creators whose social presence you admire" },
      { type: "textarea", name: "socialNotes", label: "Anything else we should know?" }
    ]
  },
  {
    service: "Brand / Messaging Audit",
    title: "Brand & Messaging Audit",
    fields: [
      { type: "text", name: "brandWebsite", label: "Website URL", autoFill: "website" },
      { type: "text", name: "brandOrganization", label: "Organization name", autoFill: "organization" },
      { type: "text", name: "tagline", label: "Current tagline or mission statement" },
      { type: "textarea", name: "brandOneSentence", label: "In one sentence, what do you want people to understand about you?" },
      { type: "textarea", name: "brandAudience", label: "Who are you trying to reach?" },
      { type: "textarea", name: "brandMisunderstood", label: "What do people often misunderstand about your organization?" },
      { type: "textarea", name: "brandInconsistent", label: "What feels unclear or inconsistent about your branding or messaging?" },
      { type: "textarea", name: "brandFiles", label: "Logo files or brand guide links", placeholder: "Paste Google Drive, Dropbox, Canva, or website links." },
      { type: "textarea", name: "brandAdmire", label: "Organizations whose branding you admire" },
      { type: "textarea", name: "brandNotes", label: "Anything else we should know?" }
    ]
  },
  {
    service: "Sermon / Preaching Audit",
    title: "Sermon / Preaching Audit",
    intro: "A sermon link is necessary for meaningful feedback. Video is best, but audio or a manuscript can work.",
    fields: [
      { type: "text", name: "sermonWebsite", label: "Church / organization website URL", autoFill: "website" },
      { type: "text", name: "primarySermonLink", label: "Primary sermon video link", placeholder: "Most important field on this page." },
      { type: "text", name: "sermonLink2", label: "Additional sermon link 1" },
      { type: "text", name: "sermonLink3", label: "Additional sermon link 2" },
      { type: "text", name: "sermonLink4", label: "Additional sermon link 3" },
      { type: "textarea", name: "sermonNotesLink", label: "Sermon manuscript or notes link" },
      { type: "text", name: "preacherName", label: "Speaker / preacher name" },
      { type: "text", name: "sermonLength", label: "Typical sermon length" },
      { type: "textarea", name: "sermonContext", label: "Primary audience or congregation context" },
      { type: "checkbox", name: "sermonFeedback", label: "What would you most like feedback on?", options: ["Biblical faithfulness / exegesis", "Structure and clarity", "Introduction and conclusion", "Application", "Delivery", "Theology", "Emotional connection", "Engagement", "Next steps / response", "Overall effectiveness"] },
      { type: "textarea", name: "sermonConvictions", label: "Theological convictions or ministry values we should understand" },
      { type: "textarea", name: "sermonStrong", label: "What do you think is currently strong?" },
      { type: "textarea", name: "sermonNotConnecting", label: "What do you suspect is not connecting?" },
      { type: "textarea", name: "sermonNotes", label: "Anything else we should know?" }
    ]
  },
  {
    service: "Church or Ministry Strategy",
    title: "Church / Ministry Strategy",
    fields: [
      { type: "text", name: "ministryWebsite", label: "Church / ministry website URL", autoFill: "website" },
      { type: "text", name: "attendance", label: "Average weekly attendance" },
      { type: "text", name: "volunteers", label: "Average number of volunteers" },
      { type: "select", name: "ministryContext", label: "Primary ministry context", options: ["Church plant", "Established church", "Multisite church", "Rural church", "Urban church", "Student ministry", "Nonprofit ministry", "Other"] },
      { type: "textarea", name: "strategyChallenge", label: "Main strategic challenge right now" },
      { type: "textarea", name: "strategyOutcomes", label: "Top three outcomes you want in the next 12 months" },
      { type: "checkbox", name: "strategyAreas", label: "Areas needing the most attention", options: ["Attendance growth", "Assimilation / next steps", "Small groups", "Volunteer systems", "Leadership development", "Giving / generosity", "Guest experience", "Communication", "Staff structure", "Discipleship", "Children's ministry", "Youth ministry", "Worship / production", "Outreach / evangelism", "Other"] },
      { type: "textarea", name: "alreadyTried", label: "What have you already tried?" },
      { type: "checkbox", name: "constraints", label: "Constraints we should know about", options: ["Budget", "Staff capacity", "Volunteer capacity", "Facility", "Denominational structure", "Leadership alignment", "Other"] },
      { type: "textarea", name: "strategyNotes", label: "Anything else we should know?" }
    ]
  },
  {
    service: "Guest Experience / Assimilation Audit",
    title: "Guest Experience & Assimilation Audit",
    fields: [
      { type: "text", name: "guestWebsite", label: "Website URL", autoFill: "website" },
      { type: "text", name: "serviceTimes", label: "Service times" },
      { type: "text", name: "guestAttendance", label: "Average weekly attendance" },
      { type: "select", name: "clearNextStep", label: "Do you have a clear next step for first-time guests?", options: ["Yes", "No", "Not sure"] },
      { type: "textarea", name: "afterVisit", label: "What currently happens after someone visits for the first time?" },
      { type: "checkbox", name: "guestAreas", label: "Areas needing attention", options: ["Parking", "Signage", "Greeters", "Coffee / hospitality", "Kids check-in", "Worship service flow", "Follow-up", "Connection events", "Membership / next steps", "Volunteer follow-up", "Data / tracking", "Other"] },
      { type: "textarea", name: "guestFollowUp", label: "Current first-time guest follow-up process" },
      { type: "text", name: "guestReturnRate", label: "What percentage of first-time guests do you think return?" },
      { type: "textarea", name: "visitorExperience", label: "What do you think visitors experience when they walk in?" },
      { type: "textarea", name: "guestNotes", label: "Anything else we should know?" }
    ]
  },
  {
    service: "Communication Strategy",
    title: "Communication Strategy",
    fields: [
      { type: "text", name: "communicationWebsite", label: "Website URL", autoFill: "website" },
      { type: "checkbox", name: "communicationChannels", label: "Primary communication channels", options: ["Email", "Text messaging", "Instagram", "Facebook", "Church app", "Sunday announcements", "Printed materials", "Website", "Other"] },
      { type: "textarea", name: "communicationGoal", label: "What are you trying to communicate better?" },
      { type: "textarea", name: "communicationProblem", label: "What communication problem keeps recurring?" },
      { type: "checkbox", name: "communicationAudiences", label: "Primary audiences", options: ["First-time guests", "Regular attenders", "Members", "Volunteers", "Donors", "Parents", "Students", "Leaders", "Community / prospects", "Other"] },
      { type: "textarea", name: "communicationExamples", label: "Links to recent emails, graphics, announcements, or campaigns" },
      { type: "textarea", name: "communicationAction", label: "What do you need people to do more consistently?" },
      { type: "textarea", name: "communicationNotes", label: "Anything else we should know?" }
    ]
  },
  {
    service: "AI Systems or Workflow Consulting",
    title: "AI Systems or Workflow Consulting",
    fields: [
      { type: "text", name: "aiWebsite", label: "Website URL", autoFill: "website" },
      { type: "checkbox", name: "aiHelp", label: "What work do you want AI to help with?", options: ["Content creation", "Sermon research / planning", "Social media", "Email / communication", "Volunteer systems", "Data analysis", "Guest follow-up", "Administration", "Team training", "Website support", "Other"] },
      { type: "checkbox", name: "aiTools", label: "Tools you currently use", options: ["ChatGPT", "Claude", "Google Workspace", "Microsoft 365", "Planning Center", "Mailchimp", "Zapier", "Make", "Canva", "Notion", "Other"] },
      { type: "textarea", name: "repetitiveTasks", label: "Most repetitive tasks in your organization" },
      { type: "textarea", name: "workflowBreakdown", label: "What is breaking down or taking too long?" },
      { type: "textarea", name: "systemUsers", label: "Who would use the system?" },
      { type: "textarea", name: "privacyConcerns", label: "Privacy, security, or data concerns we need to account for" },
      { type: "textarea", name: "aiNotes", label: "Anything else we should know?" }
    ]
  },
  {
    service: "Custom Project / Not Sure Yet",
    title: "Tell Us What You're Trying to Solve",
    fields: [
      { type: "text", name: "customWebsite", label: "Website URL", autoFill: "website" },
      { type: "textarea", name: "customAccomplish", label: "What are you trying to accomplish?" },
      { type: "textarea", name: "customProblem", label: "What problem are you trying to solve?" },
      { type: "textarea", name: "customSuccess", label: "What would a successful outcome look like?" },
      { type: "textarea", name: "customTried", label: "What have you already tried?" },
      { type: "text", name: "customDeadline", label: "Deadline or event connected to this" },
      { type: "textarea", name: "customFiles", label: "Relevant file, screenshot, example, or document links" },
      { type: "textarea", name: "customNotes", label: "Anything else we should know?" }
    ]
  }
];

const finalFields = [
  { type: "textarea", name: "finalImportant", label: "Anything important we did not ask?" },
  { type: "textarea", name: "finalFiles", label: "Helpful file links", placeholder: "Logos, brand guides, sermon manuscripts, strategic plans, screenshots, social examples, previous audits..." },
  { type: "select", name: "preferredContact", label: "Preferred way to be contacted", options: ["Email", "Phone", "Text", "Video call"] },
  { type: "select", name: "followUpTime", label: "Best time to follow up", options: ["Morning", "Afternoon", "Evening", "No preference"] },
  { type: "text", name: "finalDeadline", label: "Deadline or launch date" },
  { type: "textarea", name: "finalNotes", label: "Anything else?" }
];

export function InquiryForm() {
  const [values, setValues] = useState<FormValues>({ services: [] });
  const [step, setStep] = useState(0);
  const [leadSent, setLeadSent] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  const selectedServices = asArray(values.services);
  const selectedPages = useMemo(() => servicePages.filter((page) => selectedServices.includes(page.service)), [selectedServices]);
  const pages = useMemo(() => [{ kind: "quick" as const, title: "Quick Start" }, ...selectedPages.map((page) => ({ kind: "service" as const, ...page })), { kind: "final" as const, title: "Anything Else?" }], [selectedPages]);
  const currentPage = pages[Math.min(step, pages.length - 1)];
  const quickComplete = Boolean(stringValue(values.name).trim() && isEmail(stringValue(values.email)));
  const progress = `Step ${Math.min(step + 1, pages.length)} of ${pages.length}`;

  function updateValue(name: string, value: FormValue) {
    setValues((current) => ({ ...current, [name]: value }));

    if (status === "error") {
      setStatus("idle");
      setMessage("");
    }
  }

  async function continueFromQuick() {
    if (!quickComplete) {
      setStatus("error");
      setMessage("Please add your name and a valid email to keep going.");
      return;
    }

    if (!leadSent) {
      setStatus("loading");
      setMessage("");
      const response = await sendForm("lead_started");

      if (!response?.ok) {
        const data = await response?.json().catch(() => null);
        setStatus("error");
        setMessage(data?.error ?? "Something went wrong. Please email hello@kingdomip.org.");
        return;
      }

      setLeadSent(true);
      setStatus("idle");
    }

    setStep(1);
  }

  async function submitFinal(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setMessage("");

    const response = await sendForm("completed");

    if (response?.ok) {
      setStatus("success");
      setMessage("We've got it. We'll review what you shared and follow up with the clearest next step. You do not need to have everything figured out before reaching out.");
      return;
    }

    const data = await response?.json().catch(() => null);
    setStatus("error");
    setMessage(data?.error ?? "Something went wrong. Please email hello@kingdomip.org.");
  }

  function sendForm(statusValue: "lead_started" | "completed") {
    const payload = {
      ...values,
      name: stringValue(values.name),
      email: stringValue(values.email),
      phone: stringValue(values.phone),
      organization: stringValue(values.organization) || stringValue(values.name),
      website: stringValue(values.website),
      organizationType: stringValue(values.organizationType),
      services: selectedServices.join(", ") || "Not sure yet",
      referralSource: stringValue(values.referralSource),
      formCompletionStatus: statusValue,
      completedOnlyPageOne: statusValue === "lead_started" ? "yes" : "no",
      submittedAt: new Date().toISOString(),
      sourcePath: typeof window !== "undefined" ? window.location.pathname : "/contact",
      queryString: typeof window !== "undefined" ? window.location.search : "",
      userAgent: typeof window !== "undefined" ? window.navigator.userAgent : ""
    };

    return fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    }).catch(() => null);
  }

  function goBack() {
    setStep((value) => Math.max(0, value - 1));
  }

  function goNext() {
    setStep((value) => Math.min(pages.length - 1, value + 1));
  }

  return (
    <form onSubmit={submitFinal} noValidate className="border border-ink/15 bg-bone p-5 md:p-8">
      <input type="text" name="companyWebsite" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
      <div className="mb-7">
        <div className="mb-3 flex gap-2" aria-label="Form progress">
          {pages.map((page, index) => <span key={`${page.kind}-${page.title}-${index}`} className={`h-2 flex-1 ${index <= step ? "bg-cobalt" : "bg-ink/12"}`} />)}
        </div>
        <p className="text-xs font-black uppercase text-cobalt">{progress}</p>
      </div>

      {currentPage.kind === "quick" ? (
        <QuickStart values={values} quickComplete={quickComplete} updateValue={updateValue} />
      ) : null}

      {currentPage.kind === "service" ? (
        <ServiceStep page={currentPage} values={values} updateValue={updateValue} />
      ) : null}

      {currentPage.kind === "final" ? (
        <FinalStep values={values} updateValue={updateValue} />
      ) : null}

      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <button type="button" onClick={goBack} className="inline-flex min-h-11 items-center justify-center gap-2 border border-ink/15 px-5 py-3 text-sm font-black uppercase disabled:opacity-40" disabled={step === 0 || status === "loading"}>
          <ChevronLeft className="h-4 w-4" /> Back
        </button>

        {currentPage.kind === "quick" ? (
          <button type="button" onClick={continueFromQuick} className="inline-flex min-h-11 items-center justify-center gap-2 bg-lime px-5 py-3 text-sm font-black uppercase text-ink" disabled={status === "loading"}>
            {status === "loading" ? <Loader2 className="h-4 w-4 animate-spin" /> : null} Continue <ChevronRight className="h-4 w-4" />
          </button>
        ) : null}

        {currentPage.kind === "service" ? (
          <button type="button" onClick={goNext} className="inline-flex min-h-11 items-center justify-center gap-2 bg-ink px-5 py-3 text-sm font-black uppercase text-paper">
            Skip for now - we can follow up <ChevronRight className="h-4 w-4" />
          </button>
        ) : null}

        {currentPage.kind === "final" ? (
          <button type="submit" className="inline-flex min-h-11 items-center justify-center gap-2 bg-lime px-5 py-3 text-sm font-black uppercase text-ink" disabled={status === "loading"}>
            {status === "loading" ? <Loader2 className="h-4 w-4 animate-spin" /> : <CheckCircle2 className="h-4 w-4" />} Send My Project Request
          </button>
        ) : null}
      </div>

      {currentPage.kind === "service" ? (
        <button type="button" onClick={goNext} className="mt-3 text-sm font-bold text-ink/60 underline-offset-4 hover:text-ink hover:underline">
          I added what I can - continue
        </button>
      ) : null}

      {currentPage.kind === "final" ? (
        <p className="mt-5 text-sm leading-6 text-ink/60">
          We use this information only to evaluate and respond to your request. Do not submit confidential client, counseling, financial, or member data.
        </p>
      ) : null}

      {message ? <p className={`mt-5 border p-4 text-sm font-bold ${status === "success" ? "border-cobalt bg-paper text-ink" : "border-orange bg-paper text-ink"}`}>{message}</p> : null}
    </form>
  );
}

function QuickStart({ values, quickComplete, updateValue }: { values: FormValues; quickComplete: boolean; updateValue: (name: string, value: FormValue) => void }) {
  return (
    <section className="grid gap-5">
      <div>
        <h2 className="font-display text-3xl font-black">Let's Build Something Better</h2>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-ink/70">
          Tell us a little about what you need. The first step takes less than a minute. The more you share afterward, the faster we can give you a useful recommendation.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <FormInput name="name" label="Your Name" required filled={Boolean(stringValue(values.name).trim())} value={stringValue(values.name)} onFieldValue={(value) => updateValue("name", value)} />
        <FormInput name="email" label="Email Address" type="email" required filled={isEmail(stringValue(values.email))} value={stringValue(values.email)} onFieldValue={(value) => updateValue("email", value)} />
        <FormInput name="phone" label="Phone Number" value={stringValue(values.phone)} onFieldValue={(value) => updateValue("phone", value)} />
        <FormInput name="organization" label="Organization / Church / Business Name" value={stringValue(values.organization)} onFieldValue={(value) => updateValue("organization", value)} />
      </div>

      <SelectInput name="organizationType" label="What best describes you?" value={stringValue(values.organizationType)} options={["Church / Ministry", "Nonprofit", "Small Business", "Consultant / Creator", "Other"]} onFieldValue={(value) => updateValue("organizationType", value)} />
      <CheckboxGroup name="services" label="What would you like help with?" values={asArray(values.services)} options={serviceOptions} onFieldValue={(value) => updateValue("services", value)} />
      <SelectInput name="referralSource" label="How did you hear about Kingdom IP?" value={stringValue(values.referralSource)} options={["Google / Search", "Social Media", "Friend or Referral", "Podcast / Sermon / Event", "Existing Relationship", "Other"]} onFieldValue={(value) => updateValue("referralSource", value)} />
      <FormInput name="website" label="Website URL" value={stringValue(values.website)} onFieldValue={(value) => updateValue("website", value)} />

      <p className="text-sm font-bold text-ink/60">
        <span className="text-red-600">*</span> Required: name and email {quickComplete ? "" : ""}
      </p>
    </section>
  );
}

function ServiceStep({ page, values, updateValue }: { page: (typeof servicePages)[number]; values: FormValues; updateValue: (name: string, value: FormValue) => void }) {
  return (
    <section className="grid gap-5">
      <div>
        <h2 className="font-display text-3xl font-black">{page.title}</h2>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-ink/70">
          {page.intro ?? "Optional, but it helps us move faster and give you a better result."}
        </p>
      </div>

      <div className="grid gap-5">
        {page.fields.map((field) => <FieldRenderer key={field.name} field={field} values={values} updateValue={updateValue} />)}
      </div>
    </section>
  );
}

function FinalStep({ values, updateValue }: { values: FormValues; updateValue: (name: string, value: FormValue) => void }) {
  return (
    <section className="grid gap-5">
      <div>
        <h2 className="font-display text-3xl font-black">Anything Else We Should Know?</h2>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-ink/70">
          Last pass. Add anything useful, or send it as-is.
        </p>
      </div>

      <div className="grid gap-5">
        {finalFields.map((field) => <FieldRenderer key={field.name} field={field} values={values} updateValue={updateValue} />)}
      </div>
    </section>
  );
}

function FieldRenderer({ field, values, updateValue }: { field: any; values: FormValues; updateValue: (name: string, value: FormValue) => void }) {
  const value = stringValue(values[field.name] ?? (field.autoFill ? values[field.autoFill] : ""));

  if (field.type === "textarea") {
    return <FormTextarea name={field.name} label={field.label} placeholder={field.placeholder} value={value} onFieldValue={(nextValue) => updateValue(field.name, nextValue)} />;
  }

  if (field.type === "select") {
    return <SelectInput name={field.name} label={field.label} options={field.options} value={value} onFieldValue={(nextValue) => updateValue(field.name, nextValue)} />;
  }

  if (field.type === "checkbox") {
    return <CheckboxGroup name={field.name} label={field.label} options={field.options} values={asArray(values[field.name])} onFieldValue={(nextValue) => updateValue(field.name, nextValue)} />;
  }

  return <FormInput name={field.name} label={field.label} placeholder={field.placeholder} value={value} onFieldValue={(nextValue) => updateValue(field.name, nextValue)} />;
}

function RequiredMark({ filled }: { filled?: boolean }) {
  return (
    <span aria-hidden="true" className={filled ? "ml-1 text-ink/60" : "ml-1 text-red-600"}>
      *
    </span>
  );
}

function FormInput({
  label,
  name,
  type = "text",
  required,
  placeholder,
  value,
  filled,
  onFieldValue
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
  value: string;
  filled?: boolean;
  onFieldValue: (value: string) => void;
}) {
  return (
    <div className="grid gap-2">
      <label className="text-sm font-black uppercase" htmlFor={name}>
        {label}
        {required ? <RequiredMark filled={filled} /> : null}
      </label>
      <input id={name} name={name} type={type} value={value} placeholder={placeholder ?? "Optional, but helpful"} onChange={(event) => onFieldValue(event.target.value)} className="min-h-12 border border-ink/20 bg-paper px-3 text-ink placeholder:text-ink/35" />
    </div>
  );
}

function FormTextarea({ label, name, placeholder, value, onFieldValue }: { label: string; name: string; placeholder?: string; value: string; onFieldValue: (value: string) => void }) {
  return (
    <div className="grid gap-2">
      <label className="text-sm font-black uppercase" htmlFor={name}>{label}</label>
      <textarea id={name} name={name} value={value} placeholder={placeholder ?? "Optional, but it helps us move faster and give you a better result."} rows={4} onChange={(event) => onFieldValue(event.target.value)} className="border border-ink/20 bg-paper p-3 text-ink placeholder:text-ink/35" />
    </div>
  );
}

function SelectInput({ label, name, options, value, onFieldValue }: { label: string; name: string; options: string[]; value: string; onFieldValue: (value: string) => void }) {
  return (
    <div className="grid gap-2">
      <label className="text-sm font-black uppercase" htmlFor={name}>{label}</label>
      <select id={name} name={name} value={value} onChange={(event) => onFieldValue(event.target.value)} className="min-h-12 border border-ink/20 bg-paper px-3 text-ink">
        <option value="">Not sure / skip for now</option>
        {options.map((option) => <option key={option} value={option}>{option}</option>)}
      </select>
    </div>
  );
}

function CheckboxGroup({ label, name, options, values, onFieldValue }: { label: string; name: string; options: string[]; values: string[]; onFieldValue: (value: string[]) => void }) {
  return (
    <fieldset className="grid gap-2">
      <legend className="text-sm font-black uppercase">{label}</legend>
      <div className="grid gap-2 sm:grid-cols-2">
        {options.map((option) => (
          <label key={option} className="flex min-h-12 gap-3 border border-ink/15 bg-paper p-3 text-sm font-bold">
            <input
              type="checkbox"
              name={name}
              value={option}
              checked={values.includes(option)}
              onChange={() => onFieldValue(values.includes(option) ? values.filter((item) => item !== option) : [...values, option])}
              className="mt-1 h-4 w-4 accent-cobalt"
            />
            <span>{option}</span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}

function stringValue(value: FormValue | undefined) {
  return Array.isArray(value) ? value.join(", ") : value ?? "";
}

function asArray(value: FormValue | undefined) {
  if (Array.isArray(value)) return value;
  if (typeof value === "string" && value) return value.split(", ").filter(Boolean);
  return [];
}

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}
