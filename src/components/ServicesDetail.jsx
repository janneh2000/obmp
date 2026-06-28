import { Link } from "react-router-dom";

/**
 * ServicesDetail — detailed, alternating capability rows.
 * Images: drop /public/services/{distribution,exploration,trading}.jpg.
 */
const SERVICES = [
  {
    n: "01",
    eyebrow: "End-to-End Logistics",
    title: "Fuel Distribution & Supply",
    description:
      "OBMP's downstream division delivers refined petroleum products safely and reliably across the region — from coastal terminals to inland depots and the forecourt. We combine modern storage, a managed fleet, and disciplined scheduling to keep economies moving.",
    capabilities: [
      "Bulk fuel supply and wholesale distribution",
      "Storage terminal and depot operations",
      "Road and marine fuel logistics",
      "Aviation and marine bunkering",
      "Retail network and forecourt supply",
      "HSE-compliant handling and quality assurance",
    ],
    image: "/services/distribution.jpg",
  },
  {
    n: "02",
    eyebrow: "Upstream Operations Excellence",
    title: "Exploration & Production",
    description:
      "Our E&P division leverages advanced seismic data analysis, modern drilling technologies, and seasoned geological expertise to identify and develop hydrocarbon resources across Sub-Sahara African basins. We operate with world-class HSE standards and strong government partnerships.",
    capabilities: [
      "Geophysical surveying and seismic interpretation",
      "Exploration drilling and well management",
      "Field development planning and execution",
      "Production optimization and reservoir management",
      "Joint venture structuring with national oil companies",
      "Environmental impact assessment and monitoring",
    ],
    image: "/services/exploration.jpg",
  },
  {
    n: "03",
    eyebrow: "Global Commodity Intelligence",
    title: "Trading & Procurement",
    description:
      "OBMP's trading division executes sophisticated petroleum commodity transactions connecting Sub-Sahara African buyers and sellers to international markets. Our experienced trading desk provides price risk management, supply optimization, and procurement strategies that maximize value.",
    capabilities: [
      "Crude oil and refined products trading",
      "International supply chain procurement",
      "Price risk management and hedging strategies",
      "Letters of credit and trade finance facilitation",
      "Cargo scheduling and demurrage management",
      "Market intelligence and commodity advisory",
    ],
    image: "/services/trading.jpg",
  },
];

export default function ServicesDetail() {
  return (
    <section className="relative bg-abyssal-deep py-24 lg:py-32">
      <div className="container-kinetic">
        <div className="text-center">
          <p className="eyebrow mb-4">Capabilities</p>
          <h2 className="font-heading text-fluid-2xl font-bold uppercase text-quartz">What we deliver</h2>
        </div>

        <div className="mt-16 space-y-20 lg:space-y-28">
          {SERVICES.map((s, i) => {
            const reverse = i % 2 === 1;
            return (
              <div key={s.n} className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
                {/* image */}
                <div className={reverse ? "lg:order-2" : ""}>
                  <div className="relative aspect-[4/3] overflow-hidden rounded-sm bg-abyssal-800 ring-1 ring-quartz/10">
                    <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${s.image})` }} />
                    <div className="absolute inset-0 bg-gradient-to-t from-abyssal/70 to-transparent" />
                    <span className="absolute left-5 top-3 font-barlow text-6xl font-extrabold text-gold/25">{s.n}</span>
                  </div>
                </div>

                {/* content */}
                <div className={reverse ? "lg:order-1" : ""}>
                  <p className="eyebrow mb-3">{s.eyebrow}</p>
                  <h3 className="font-heading text-fluid-xl font-bold uppercase leading-tight text-quartz">{s.title}</h3>
                  <p className="mt-4 text-fluid-base text-quartz/75">{s.description}</p>

                  <p className="eyebrow mb-4 mt-7 text-xs">Key Capabilities</p>
                  <ul className="grid gap-3 sm:grid-cols-2">
                    {s.capabilities.map((c) => (
                      <li key={c} className="flex items-start gap-3 text-fluid-sm text-quartz/80">
                        <CheckIcon />
                        <span>{c}</span>
                      </li>
                    ))}
                  </ul>

                  <Link to="/contact" className="btn-gold mt-8 hover:shadow-[0_0_20px_rgba(212,157,53,0.45)]">
                    Request a Quote →
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function CheckIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="mt-0.5 shrink-0 text-gold" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" opacity="0.35" />
      <path d="m8.5 12 2.5 2.5 4.5-5" />
    </svg>
  );
}
