import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchServices, urlFor } from "../lib/sanity";

/**
 * ServicesSection — three industrial pillars.
 * Pulls from Sanity (type "service"); falls back to FALLBACK_PILLARS until
 * content is added. Desktop: equal thirds; hovering one expands to 50%.
 */
const TINTS = [
  "radial-gradient(80% 70% at 22% 18%, rgba(212,157,53,0.20), transparent 55%)",
  "radial-gradient(80% 70% at 72% 32%, rgba(212,157,53,0.18), transparent 55%)",
  "radial-gradient(85% 80% at 60% 82%, rgba(212,157,53,0.18), transparent 55%)",
];

const FALLBACK_PILLARS = [
  { n: "01", title: "Fuel Distribution", detail: "End-to-end logistics across the region.", image: "/services/distribution.jpg" },
  { n: "02", title: "Exploration & Production", detail: "Upstream expertise, well to wellhead.", image: "/services/exploration.jpg" },
  { n: "03", title: "Trading & Procurement", detail: "Global commodity intelligence.", image: "/services/trading.jpg" },
];

export default function ServicesSection() {
  const [pillars, setPillars] = useState(FALLBACK_PILLARS);

  useEffect(() => {
    let active = true;
    fetchServices().then((data) => {
      if (!active || !data || !data.length) return;
      setPillars(
        data.map((s, i) => ({
          n: s.number || String(i + 1).padStart(2, "0"),
          title: s.title,
          detail: s.shortDetail || "",
          image: s.image ? urlFor(s.image)?.width(900).height(1200).fit("crop").url() || "" : "",
        }))
      );
    });
    return () => {
      active = false;
    };
  }, []);

  return (
    <section id="services" className="relative bg-abyssal pb-24 pt-28 lg:pb-32 lg:pt-36">
      <div className="container-kinetic">
        {/* section header */}
        <p className="eyebrow mb-4">Services</p>
        <h2 className="max-w-3xl font-heading text-fluid-2xl font-bold uppercase leading-[0.95] text-quartz">
          Three pillars. One integrated platform.
        </h2>
        <p className="mt-5 max-w-xl text-quartz/65">
          From the wellhead to the forecourt — Ocean-Bay moves energy across Sub-Sahara Africa with
          precision, scale, and intelligence.
        </p>

        {/* pillars */}
        <div className="mt-12 flex flex-col gap-3 lg:mt-16 lg:h-[78vh] lg:min-h-[560px] lg:flex-row">
          {pillars.map((p, i) => (
            <article
              key={p.n || i}
              className="service-pillar group relative h-[56vh] w-full overflow-hidden rounded-sm lg:h-full"
            >
              {/* background (zooms on hover) */}
              <div className="absolute inset-0 transition-transform duration-700 ease-in-out group-hover:scale-105">
                <div className="absolute inset-0 bg-abyssal-800" />
                {p.image && (
                  <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${p.image})` }} />
                )}
                <div className="absolute inset-0" style={{ background: TINTS[i % TINTS.length] }} />
              </div>

              {/* readability overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A192F] to-transparent" />

              {/* ghost numeral */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute left-4 top-0 select-none font-barlow text-[6.5rem] font-extrabold leading-none text-gold/15 lg:text-[8.5rem]"
              >
                {p.n}
              </span>

              {/* content */}
              <div className="relative z-10 flex h-full flex-col justify-end p-6 lg:p-7">
                <h3 className="font-barlow text-3xl font-bold uppercase leading-[0.95] text-quartz lg:text-[2.4rem]">
                  {p.title}
                </h3>
                {p.detail && <p className="mt-3 max-w-[24ch] text-fluid-sm text-quartz/70">{p.detail}</p>}

                <Link
                  to="/contact"
                  className="mt-5 inline-flex w-fit items-center gap-2 font-heading text-sm font-semibold uppercase tracking-kinetic text-gold transition-all duration-500 hover:text-gold-soft lg:translate-y-3 lg:opacity-0 lg:group-hover:translate-y-0 lg:group-hover:opacity-100"
                >
                  Request Quote <span aria-hidden="true">→</span>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
