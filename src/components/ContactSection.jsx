import { useEffect, useState } from "react";
import ContactForm from "./ContactForm";
import { fetchSiteSettings } from "../lib/sanity";

/**
 * ContactSection — split-screen "Partnership Nexus".
 * Contact details come from Sanity (siteSettings); falls back to the values
 * below. Left: stylized Sub-Sahara Africa graphic + details (gold icons).
 */

const PinIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 21s7-6.5 7-11a7 7 0 1 0-14 0c0 4.5 7 11 7 11Z" />
    <circle cx="12" cy="10" r="2.5" />
  </svg>
);
const PhoneIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92Z" />
  </svg>
);
const MailIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m3 7 9 6 9-6" />
  </svg>
);
const ClockIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 2" />
  </svg>
);

const FALLBACK = {
  headOffice: ["Freetown, Sierra Leone 🇸🇱", "Sub-Sahara Africa"],
  phone: ["+23232888888"],
  emails: ["oceanbaypetroleum.sl@gmail.com"],
  hours: ["Monday – Friday: 8AM – 6PM", "Saturday: 9AM – 2PM"],
};

function renderLine(line) {
  if (line.includes("@")) {
    return (
      <a href={`mailto:${line}`} className="transition-colors hover:text-gold">
        {line}
      </a>
    );
  }
  if (/^\+?[\d\s()-]{6,}$/.test(line)) {
    return (
      <a href={`tel:${line.replace(/[\s()-]/g, "")}`} className="transition-colors hover:text-gold">
        {line}
      </a>
    );
  }
  return line;
}

export default function ContactSection() {
  const [s, setS] = useState(null);

  useEffect(() => {
    let active = true;
    fetchSiteSettings().then((data) => {
      if (active && data) setS(data);
    });
    return () => {
      active = false;
    };
  }, []);

  const details = [
    { icon: <PinIcon />, label: "Head Office", lines: s?.headOffice?.length ? s.headOffice : FALLBACK.headOffice },
    { icon: <PhoneIcon />, label: "Phone / WhatsApp", lines: s?.phone ? [s.phone] : FALLBACK.phone },
    { icon: <MailIcon />, label: "Email", lines: s?.emails?.length ? s.emails : FALLBACK.emails },
    { icon: <ClockIcon />, label: "Business Hours", lines: s?.hours?.length ? s.hours : FALLBACK.hours },
  ];

  return (
    <section id="contact" className="relative bg-abyssal-deep pb-24 pt-28 lg:pb-32 lg:pt-36">
      <div className="container-kinetic">
        <p className="eyebrow mb-4">Get In Touch</p>
        <h2 className="max-w-3xl font-heading text-fluid-2xl font-bold uppercase leading-[0.95] text-quartz">
          Let&rsquo;s move energy together.
        </h2>
        <p className="mt-5 max-w-xl text-fluid-base text-quartz/75">
          Our team of energy experts is ready to discuss your needs and deliver tailored solutions —
          we respond within 24 hours.
        </p>

        <div className="mt-12 grid overflow-hidden rounded-sm border border-quartz/10 lg:mt-16 lg:grid-cols-2">
          {/* ---------------- LEFT: context ---------------- */}
          <div className="relative flex min-h-[460px] flex-col justify-between overflow-hidden bg-abyssal p-8 lg:p-10">
            <div className="absolute inset-0 bg-cover bg-center opacity-40" style={{ backgroundImage: "url(/contact/map.jpg)" }} aria-hidden="true" />
            <div
              className="absolute inset-0 opacity-60"
              style={{ backgroundImage: "radial-gradient(rgba(241,244,249,0.10) 1px, transparent 1px)", backgroundSize: "22px 22px" }}
              aria-hidden="true"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-abyssal via-abyssal/40 to-transparent" aria-hidden="true" />

            <div className="relative flex items-start justify-between gap-6">
              <div>
                <p className="font-heading text-xs uppercase tracking-horizon text-quartz/45">Operating across</p>
                <p className="font-barlow text-fluid-xl font-bold uppercase leading-none text-quartz">Sub-Sahara Africa</p>
              </div>
              <div className="relative h-28 w-28 shrink-0 lg:h-36 lg:w-36" aria-hidden="true">
                <span className="absolute inset-0 rounded-full border border-gold/15" />
                <span className="absolute inset-[18%] rounded-full border border-gold/20" />
                <span className="absolute inset-[36%] rounded-full border border-gold/25" />
                <span className="absolute left-1/2 top-1/2 flex h-3 w-3 -translate-x-1/2 -translate-y-1/2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold/60" />
                  <span className="relative inline-flex h-3 w-3 rounded-full bg-gold" />
                </span>
              </div>
            </div>

            <ul className="relative mt-10 space-y-5">
              {details.map((d) => (
                <li key={d.label} className="flex items-start gap-4">
                  <span className="mt-0.5 text-gold">{d.icon}</span>
                  <span>
                    <span className="block font-heading text-xs uppercase tracking-kinetic text-quartz/45">{d.label}</span>
                    {d.lines.map((line) => (
                      <span key={line} className="block text-quartz/85">
                        {renderLine(line)}
                      </span>
                    ))}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* ---------------- RIGHT: the Nexus form ---------------- */}
          <div className="border-t border-quartz/10 bg-abyssal-800 lg:border-l lg:border-t-0">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
