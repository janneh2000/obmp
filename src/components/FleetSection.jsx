import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchVessels, urlFor } from "../lib/sanity";

/**
 * FleetSection — OBMP's marine tanker fleet.
 * Pulls vessels from Sanity (type "vessel"); until Sanity is configured or has
 * content, it falls back to FALLBACK_FLEET below so the live site never breaks.
 * Photos managed in Sanity, or at /public/fleet/*.jpg for the fallback.
 */
const FALLBACK_FLEET = [
  {
    name: "MT Alma Marine",
    type: "Oil / Chemical Tanker",
    flagLine: "Barbados flag · IMO 9438250",
    image: "/fleet/alma-marine.jpg",
    summary: "Our double-hull product and chemical tanker for regional clean-product and chemical cargoes.",
    specs: [
      { label: "Deadweight", value: "9,016 MT" },
      { label: "Built", value: "2010" },
      { label: "Length (LOA)", value: "117.6 m" },
      { label: "Beam", value: "18.99 m" },
      { label: "Gross tonnage", value: "6,190 GT" },
      { label: "Cargo grades", value: "5" },
      { label: "Hull", value: "Double hull" },
      { label: "Flag", value: "Barbados" },
    ],
  },
  {
    name: "MT Crazy",
    type: "Oil Products Tanker",
    flagLine: "Togo flag · IMO 1063322",
    image: "/fleet/crazy.jpg",
    summary: "A nimble double-hull tanker built for coastal and short-sea distribution across Africa.",
    specs: [
      { label: "Deadweight", value: "3,600 MT" },
      { label: "Built", value: "2007" },
      { label: "Length (LOA)", value: "88.1 m" },
      { label: "Beam", value: "13.5 m" },
      { label: "Gross tonnage", value: "2,282 GT" },
      { label: "Net tonnage", value: "1,278 NT" },
      { label: "Hull", value: "Double hull" },
      { label: "Flag", value: "Togo" },
    ],
  },
  {
    name: "MT Ocean Bay",
    type: "Oil Tanker",
    flagLine: "Double-hull product tanker · 4,141 MT",
    image: "/fleet/obmp-tanker.jpg",
    summary: "A double-hull product tanker for coastal and short-sea distribution across Sub-Sahara Africa.",
    specs: [
      { label: "Deadweight", value: "4,141 MT" },
      { label: "Built", value: "2006" },
      { label: "Length (LOA)", value: "96.0 m" },
      { label: "Beam", value: "13.98 m" },
      { label: "Gross tonnage", value: "2,724 GT" },
      { label: "Net tonnage", value: "1,525 NT" },
      { label: "Cargo tanks", value: "10" },
      { label: "Hull", value: "Double hull" },
    ],
  },
];

export default function FleetSection() {
  const [fleet, setFleet] = useState(FALLBACK_FLEET);

  useEffect(() => {
    let active = true;
    fetchVessels().then((data) => {
      if (!active || !data || !data.length) return;
      setFleet(
        data.map((v) => ({
          name: v.name,
          type: v.type,
          flagLine: v.flagLine,
          summary: v.summary,
          specs: v.specs || [],
          image: v.image ? urlFor(v.image)?.width(1200).height(750).fit("crop").url() || "" : "",
        }))
      );
    });
    return () => {
      active = false;
    };
  }, []);

  return (
    <section id="fleet" className="relative bg-abyssal-deep pb-24 pt-28 lg:pb-32 lg:pt-36">
      <div className="container-kinetic">
        <p className="eyebrow mb-4">Our Fleet</p>
        <h2 className="max-w-3xl font-heading text-fluid-2xl font-bold uppercase leading-[0.95] text-quartz">
          Vessels under our flag
        </h2>
        <p className="mt-5 max-w-2xl text-fluid-base text-quartz/75">
          OBMP&rsquo;s marine division operates a modern, double-hull tanker fleet — moving clean
          petroleum products safely across Sub-Sahara African waters and beyond.
        </p>

        <div className="mt-12 flex flex-wrap justify-center gap-8 lg:mt-16">
          {fleet.map((v) => (
            <article
              key={v.name}
              className="w-full max-w-xl overflow-hidden rounded-sm border border-quartz/10 bg-abyssal-800 lg:w-[calc(50%-1rem)] xl:w-[calc(33.333%-1.34rem)]"
            >
              {/* image */}
              <div className="relative aspect-[16/10] overflow-hidden bg-abyssal-700">
                <div className="absolute inset-0 flex items-center justify-center">
                  <ShipIcon className="h-24 w-24 text-quartz/10" />
                </div>
                {v.image && (
                  <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${v.image})` }} />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-abyssal via-abyssal/20 to-transparent" />
                {v.type && (
                  <span className="absolute left-4 top-4 rounded-sm bg-gold px-3 py-1 font-heading text-xs font-semibold uppercase tracking-kinetic text-abyssal">
                    {v.type}
                  </span>
                )}
                <div className="absolute inset-x-5 bottom-4">
                  <h3 className="font-barlow text-3xl font-bold uppercase leading-none text-quartz">{v.name}</h3>
                  {v.flagLine && <p className="mt-1 text-fluid-sm text-quartz/70">{v.flagLine}</p>}
                </div>
              </div>

              {/* details */}
              <div className="p-6 lg:p-7">
                {v.summary && <p className="text-fluid-sm text-quartz/70">{v.summary}</p>}
                <dl className="mt-6 grid grid-cols-2 gap-x-6 gap-y-4">
                  {v.specs.map((s) => (
                    <div key={s.label}>
                      <dt className="font-heading text-[0.7rem] uppercase tracking-kinetic text-quartz/45">{s.label}</dt>
                      <dd className="mt-0.5 font-medium text-quartz">{s.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-12 text-center lg:mt-14">
          <Link to="/contact" className="btn-gold hover:shadow-[0_0_20px_rgba(212,157,53,0.45)]">
            Charter Our Vessels
          </Link>
        </div>
      </div>
    </section>
  );
}

function ShipIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 16.5h18l-2.2 3.5H5.2L3 16.5Z" />
      <path d="M5.5 16.5V9.5h8l4 4v3" />
      <path d="M9 9.5V6.5h3v3" />
      <path d="M12 3.5v3" />
    </svg>
  );
}
