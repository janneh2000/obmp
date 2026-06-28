import { useState } from "react";

/**
 * ContactForm — the "Nexus" form (Module 05)
 * ------------------------------------------
 * Minimalist-industrial fields (transparent, gold focus underline), floating
 * labels, a Service-Interest select that drives a dynamic message hint, and an
 * elegant success state. Pass an `onSubmit(data)` prop to hook real submission;
 * a console-logging mock runs by default (see notes at the bottom of the file).
 */

const SERVICE_OPTIONS = [
  { value: "", label: "Select a service…" },
  { value: "fuel", label: "Fuel Distribution & Supply" },
  { value: "exploration", label: "Exploration & Production" },
  { value: "trading", label: "Trading & Procurement" },
  { value: "general", label: "General Inquiry" },
];

// Interest-driven helper text shown beneath the Message box.
const SERVICE_HINTS = {
  "": "Tell us about your energy needs.",
  fuel: "Tell us about your delivery schedule and volumes.",
  exploration: "Tell us about your offshore or upstream requirements.",
  trading: "Tell us about the commodities and volumes you trade.",
  general: "Tell us how Ocean-Bay can help.",
};

// Default mock submission — replace by passing your own `onSubmit` prop.
async function defaultMockSubmit(data) {
  console.log("[ContactForm] mock submission:", data);
  await new Promise((resolve) => setTimeout(resolve, 1200));
  return { ok: true };
}

export default function ContactForm({ onSubmit = defaultMockSubmit }) {
  const [status, setStatus] = useState("idle"); // idle | submitting | success | error
  const [service, setService] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    setStatus("submitting");
    const data = Object.fromEntries(new FormData(event.currentTarget).entries());
    try {
      await onSubmit(data);
      setStatus("success");
    } catch (error) {
      console.error("[ContactForm] submission failed:", error);
      setStatus("error");
    }
  }

  // ---- success state ----
  if (status === "success") {
    return (
      <div className="flex min-h-[460px] flex-col items-center justify-center p-8 text-center lg:p-12">
        <span className="flex h-16 w-16 items-center justify-center rounded-full border border-gold/40 text-gold">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 6 9 17l-5-5" />
          </svg>
        </span>
        <h3 className="mt-6 font-heading text-fluid-xl font-bold uppercase text-quartz">
          Nexus signal received
        </h3>
        <p className="mt-3 max-w-sm text-quartz/65">
          Our team will reach out within 24 hours.
        </p>
        <button type="button" onClick={() => setStatus("idle")} className="btn-ghost mt-8">
          Send another message
        </button>
      </div>
    );
  }

  // ---- form ----
  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-7 p-8 lg:p-12">
      <FloatingInput name="name" label="Full Name" type="text" required />
      <FloatingInput name="email" label="Email Address" type="email" required />
      <FloatingInput name="phone" label="Phone Number" type="tel" />
      <FloatingInput name="company" label="Company (optional)" type="text" />

      {/* Service Interest */}
      <div className="relative">
        <label
          htmlFor="service"
          className="mb-2 block font-heading text-xs uppercase tracking-kinetic text-gold"
        >
          Service Interest
        </label>
        <select
          id="service"
          name="service"
          value={service}
          onChange={(e) => setService(e.target.value)}
          className="w-full appearance-none border-b border-quartz/25 bg-transparent py-2 pr-8 text-quartz outline-none transition-colors focus:border-gold [&>option]:bg-abyssal [&>option]:text-quartz"
        >
          {SERVICE_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
        <svg
          aria-hidden="true"
          className="pointer-events-none absolute right-1 top-9 text-gold"
          width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </div>

      {/* Message + dynamic hint */}
      <div>
        <FloatingTextarea name="message" label="Your Message" required />
        <p className="mt-2 text-fluid-sm text-quartz/45">{SERVICE_HINTS[service]}</p>
      </div>

      <button
        type="submit"
        disabled={status === "submitting"}
        className="btn-gold mt-2 w-full hover:shadow-[0_0_20px_rgba(212,157,53,0.45)] disabled:cursor-not-allowed disabled:opacity-70"
      >
        {status === "submitting" ? "Transmitting…" : "Send Message"}
      </button>

      {status === "error" && (
        <p className="text-fluid-sm text-red-400">
          Something went wrong. Please try again.
        </p>
      )}
    </form>
  );
}

/* ---------------------------------------------------------------------------
   Floating-label fields (pure CSS via peer + placeholder-shown)
   ------------------------------------------------------------------------- */
const fieldBase =
  "peer w-full border-b border-quartz/25 bg-transparent pb-2 pt-6 text-quartz outline-none transition-colors placeholder:text-transparent focus:border-gold";
const labelBase =
  "pointer-events-none absolute left-0 top-6 text-quartz/50 transition-all duration-200 peer-focus:top-0 peer-focus:text-xs peer-focus:text-gold peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-quartz/60";

function FloatingInput({ name, label, type = "text", required = false }) {
  return (
    <div className="relative">
      <input id={name} name={name} type={type} required={required} placeholder=" " className={fieldBase} />
      <label htmlFor={name} className={labelBase}>
        {label}
      </label>
    </div>
  );
}

function FloatingTextarea({ name, label, required = false }) {
  return (
    <div className="relative">
      <textarea id={name} name={name} required={required} rows={4} placeholder=" " className={`${fieldBase} resize-none`} />
      <label htmlFor={name} className={labelBase}>
        {label}
      </label>
    </div>
  );
}
