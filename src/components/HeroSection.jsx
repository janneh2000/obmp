import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { fetchSiteSettings, urlFor } from "../lib/sanity";

/**
 * HeroSection — "Sovereign Hero".
 * Hero text + background image come from Sanity (siteSettings), with the
 * built-in copy as fallback. Parallax + legibility overlays unchanged.
 */
const FALLBACK = {
  eyebrow: "Integrated Energy · Africa",
  line1: "Powering",
  line2: "Africa's",
  line3: "Energy Future",
  subcopy:
    "An integrated platform for the sustainable exploration, distribution, and supply of premium petroleum products across Africa.",
  image: "/hero.jpg",
};

export default function HeroSection() {
  const ref = useRef(null);
  const [hero, setHero] = useState(FALLBACK);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "-12%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0]);

  useEffect(() => {
    let active = true;
    fetchSiteSettings().then((s) => {
      if (!active || !s) return;
      setHero({
        eyebrow: s.heroEyebrow || FALLBACK.eyebrow,
        line1: s.heroLine1 || FALLBACK.line1,
        line2: s.heroLine2 || FALLBACK.line2,
        line3: s.heroLine3 || FALLBACK.line3,
        subcopy: s.heroSubcopy || FALLBACK.subcopy,
        image: s.heroImage ? urlFor(s.heroImage)?.width(2000).url() || FALLBACK.image : FALLBACK.image,
      });
    });
    return () => {
      active = false;
    };
  }, []);

  return (
    <section ref={ref} className="relative flex min-h-screen items-center overflow-hidden">
      {/* ---------------- parallax background ---------------- */}
      <motion.div
        style={{ y: backgroundY }}
        className="absolute -top-[10%] left-0 h-[120%] w-full will-change-transform"
        aria-hidden="true"
      >
        <div className="absolute inset-0 bg-abyssal" />
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('${hero.image}')` }} />
        <div
          className="absolute inset-0"
          style={{ background: "radial-gradient(65% 60% at 72% 28%, rgba(212,157,53,0.20), transparent 60%)" }}
        />
      </motion.div>

      {/* ---------------- overlays (legibility) ---------------- */}
      <div className="absolute inset-0 bg-gradient-to-r from-abyssal/95 via-abyssal/75 to-abyssal/25" aria-hidden="true" />
      <div className="absolute inset-0 bg-gradient-to-t from-abyssal via-abyssal/25 to-transparent" aria-hidden="true" />

      {/* ---------------- content ---------------- */}
      <motion.div
        style={{ y: contentY, opacity: contentOpacity, textShadow: "0 2px 18px rgba(7,15,31,0.55)" }}
        className="container-kinetic relative z-10 w-full pb-28 pt-36 will-change-transform lg:pb-32 lg:pt-44"
      >
        <p className="mb-6 font-heading text-sm font-semibold uppercase tracking-horizon text-gold duration-700 animate-in fade-in slide-in-from-bottom-3 lg:text-base">
          {hero.eyebrow}
        </p>

        <div className="relative w-fit duration-1000 animate-in fade-in slide-in-from-bottom-4">
          <span
            aria-hidden="true"
            className="pointer-events-none absolute left-0 top-1/2 z-0 h-px w-[150%] max-w-[92vw] -translate-y-1/2 bg-gradient-to-r from-gold via-gold/80 to-transparent"
            style={{ boxShadow: "0 0 12px rgba(212,157,53,0.5)" }}
          />
          <h1 className="relative z-10 flex flex-col uppercase leading-[0.92]">
            <span className="font-barlow text-fluid-3xl font-extrabold tracking-tight text-quartz">{hero.line1}</span>
            <span className="font-barlow text-fluid-3xl font-extrabold tracking-tight text-gold">{hero.line2}</span>
            <span className="font-serif text-fluid-3xl font-medium italic text-quartz">{hero.line3}</span>
          </h1>
        </div>

        <p className="mt-8 max-w-2xl text-fluid-lg font-medium leading-relaxed text-quartz/90">{hero.subcopy}</p>

        <div className="mt-10 flex flex-wrap items-center gap-4">
          <Link
            to="/contact"
            className="inline-flex items-center justify-center rounded-sm bg-gold px-7 py-3.5 font-heading text-sm font-semibold uppercase tracking-kinetic text-abyssal transition-all duration-300 hover:-translate-y-0.5 hover:brightness-110 hover:shadow-[0_0_15px_rgba(212,157,53,0.5)]"
          >
            Get In Touch
          </Link>
          <Link
            to="/services"
            className="inline-flex items-center justify-center rounded-sm border border-gold/80 bg-abyssal/70 px-7 py-3.5 font-heading text-sm font-semibold uppercase tracking-kinetic text-quartz backdrop-blur-sm transition-all duration-300 hover:border-gold hover:bg-gold hover:text-abyssal"
          >
            Our Services
          </Link>
        </div>
      </motion.div>

      {/* ---------------- pulsing scroll indicator ---------------- */}
      <div className="absolute inset-x-0 bottom-8 z-10 flex flex-col items-center gap-2">
        <span className="font-heading text-xs uppercase tracking-[0.3em] text-quartz/50">Scroll</span>
        <span className="h-10 w-px animate-pulse bg-gradient-to-b from-gold to-transparent" />
      </div>
    </section>
  );
}
