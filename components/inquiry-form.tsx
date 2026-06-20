"use client";

import { useState } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";

const serviceOptions = [
  "Website & Digital Presence Audit",
  "Message & Next Step Audit",
  "Sermon Clarity Review",
  "Systems & Workflow Audit",
  "Not sure yet"
];

const initialRequiredValues = {
  name: "",
  email: "",
  organization: "",
  improve: ""
};

type RequiredField = keyof typeof initialRequiredValues;
type Status = "idle" | "loading" | "success" | "error";

export function InquiryForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");
  const [requiredValues, setRequiredValues] = useState(initialRequiredValues);

  const requiredComplete = isComplete(requiredValues);

  function updateRequiredField(name: RequiredField, value: string) {
    const nextValues = { ...requiredValues, [name]: value };
    setRequiredValues(nextValues);

    if (status === "error" && isComplete(nextValues)) {
      setStatus("idle");
      setMessage("");
    }
  }

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!requiredComplete) {
      setStatus("error");
      setMessage("Please complete the marked fields.");
      return;
    }

    setStatus("loading");
    setMessage("");

    const formData = new FormData(event.currentTarget);
    const payload = Object.fromEntries(formData.entries());
    payload.organizationType = "Not specified";

    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    }).catch(() => null);

    if (response?.ok) {
      setStatus("success");
      setMessage("Thanks. Your inquiry was received. Kingdom IP will follow up with next steps.");
      event.currentTarget.reset();
      setRequiredValues(initialRequiredValues);
      return;
    }

    const data = await response?.json().catch(() => null);
    setStatus("error");
    setMessage(data?.error ?? "Something went wrong. Please email hello@kingdomip.org.");
  }

  return (
    <form onSubmit={submit} noValidate className="border border-ink/15 bg-bone p-5 md:p-8">
      <div className="mb-8">
        <h2 className="font-display text-3xl font-black">Start an inquiry.</h2>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <FormInput
          name="name"
          label="Name"
          required
          filled={Boolean(requiredValues.name.trim())}
          onFieldValue={(value) => updateRequiredField("name", value)}
        />
        <FormInput
          name="email"
          label="Email"
          type="email"
          required
          filled={isEmail(requiredValues.email)}
          onFieldValue={(value) => updateRequiredField("email", value)}
        />
        <FormInput
          name="organization"
          label="Organization"
          required
          filled={Boolean(requiredValues.organization.trim())}
          onFieldValue={(value) => updateRequiredField("organization", value)}
        />
        <FormInput name="website" label="Website" type="url" />
      </div>

      <div className="mt-5 grid gap-5">
        <SelectInput name="services" label="What kind of help are you looking for?" options={serviceOptions} />
        <FormTextarea
          name="improve"
          label="What do you want help with?"
          required
          filled={requiredValues.improve.trim().length >= 10}
          placeholder="A few sentences is enough. Tell us what feels unclear, stuck, or worth improving."
          onFieldValue={(value) => updateRequiredField("improve", value)}
        />
        <FormTextarea name="supportingLinks" label="Helpful links or files" placeholder="Website, sermons, Google Drive folders, reports, social channels, or anything we should review." />
        <FormTextarea name="timeline" label="Timeline or notes" placeholder="Optional. Share timing, budget range, decision makers, or anything else useful." />
      </div>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm font-bold text-ink/60">
          <span className="text-red-600">*</span> Required
        </p>
        <button type="submit" className="inline-flex min-h-11 items-center justify-center gap-2 bg-lime px-5 py-3 text-sm font-black uppercase text-ink" disabled={status === "loading"}>
          {status === "loading" ? <Loader2 className="h-4 w-4 animate-spin" /> : <CheckCircle2 className="h-4 w-4" />} Submit Inquiry
        </button>
      </div>

      {message ? <p className={`mt-5 border p-4 text-sm font-bold ${status === "success" ? "border-cobalt bg-paper text-ink" : "border-orange bg-paper text-ink"}`}>{message}</p> : null}
    </form>
  );
}

function isComplete(values: typeof initialRequiredValues) {
  return Boolean(values.name.trim() && isEmail(values.email) && values.organization.trim() && values.improve.trim().length >= 10);
}

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
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
  filled,
  onFieldValue
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
  filled?: boolean;
  onFieldValue?: (value: string) => void;
}) {
  return (
    <div className="grid gap-2">
      <label className="text-sm font-black uppercase" htmlFor={name}>
        {label}
        {required ? <RequiredMark filled={filled} /> : null}
      </label>
      <input id={name} name={name} type={type} placeholder={placeholder} onChange={(event) => onFieldValue?.(event.target.value)} className="min-h-12 border border-ink/20 bg-paper px-3 text-ink placeholder:text-ink/35" />
    </div>
  );
}

function FormTextarea({
  label,
  name,
  required,
  placeholder,
  filled,
  onFieldValue
}: {
  label: string;
  name: string;
  required?: boolean;
  placeholder?: string;
  filled?: boolean;
  onFieldValue?: (value: string) => void;
}) {
  return (
    <div className="grid gap-2">
      <label className="text-sm font-black uppercase" htmlFor={name}>
        {label}
        {required ? <RequiredMark filled={filled} /> : null}
      </label>
      <textarea id={name} name={name} placeholder={placeholder} rows={5} onChange={(event) => onFieldValue?.(event.target.value)} className="border border-ink/20 bg-paper p-3 text-ink placeholder:text-ink/35" />
    </div>
  );
}

function SelectInput({ label, name, options }: { label: string; name: string; options: string[] }) {
  return (
    <div className="grid gap-2">
      <label className="text-sm font-black uppercase" htmlFor={name}>{label}</label>
      <select id={name} name={name} defaultValue="" className="min-h-12 border border-ink/20 bg-paper px-3 text-ink">
        <option value="">Select one, if helpful</option>
        {options.map((option) => <option key={option} value={option}>{option}</option>)}
      </select>
    </div>
  );
}
