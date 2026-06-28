import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";

/**
 * HeroSection — "Sovereign Hero" (Module 03, content pass)
 * Content is top-anchored with padding that clears the fixed navbar, so the
 * eyebrow never tucks under the header. Description is enlarged for legibility.
 *
 * Background image: drop a file at /public/hero.jpg for real imagery —
 * a cinematic abyssal + gold gradient renders as the fallback.
 */
export default function HeroSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "-12%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0]);

  return (
    <section ref={ref} className="relative flex min-h-screen items-center overflow-hidden">
      {/* ---------------- parallax background ---------------- */}
      <motion.div
        style={{ y: backgroundY }}
        className="absolute -top-[10%] left-0 h-[120%] w-full will-change-transform"
        aria-hidden="true"
      >
        <div className="absolute inset-0 bg-abyssal" />
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/hero.jpg')" }} />
        <div
          className="absolute inset-0"
          style={{ background: "radial-gradient(65% 60% at 72% 28%, rgba(212,157,53,0.20), transparent 60%)" }}
        />
      </motion.div>

      {/* ---------------- overlays (legibility) ---------------- */}
      <div className="absolute inset-0 bg-gradient-to-r from-abyssal/95 via-abyssal/75 to-abyssal/25" aria-hidden="true" />
      <div className="absolute inset-0 bg-gradient-to-t from-abyssal via-abyssal/25 to-transparent" aria-hidden="true" />

      {/* ---------------- content (top-anchored to clear navbar) ---------------- */}
      <motion.div
        style={{ y: contentY, opacity: contentOpacity, textShadow: "0 2px 18px rgba(7,15,31,0.55)" }}
        className="container-kinetic relative z-10 w-full pb-28 pt-36 will-change-transform lg:pb-32 lg:pt-44"
      >
        <p className="mb-6 font-heading text-sm font-semibold uppercase tracking-horizon text-gold duration-700 animate-in fade-in slide-in-from-bottom-3 lg:text-base">
          Integrated Energy · West Africa
        </p>

        {/* Signature Split headline */}
        <div className="relative w-fit duration-1000 animate-in fade-in slide-in-from-bottom-4">
          <span
            aria-hidden="true"
            className="pointer-events-none absolute left-0 top-1/2 z-0 h-px w-[150%] max-w-[92vw] -translate-y-1/2 bg-gradient-to-r from-gold via-gold/80 to-transparent"
            style={{ boxShadow: "0 0 12px rgba(212,157,53,0.5)" }}
          />
          <h1 className="relative z-10 flex flex-col uppercase leading-[0.92]">
            <span className="font-barlow text-fluid-3xl font-extrabold tracking-tight text-quartz">Powering</span>
            <span className="font-barlow text-fluid-3xl font-extrabold tracking-tight text-gold"><Sub-Sahara></Sub-Sahara> Africa&rsquo;s</span>
            <span className="font-serif text-fluid-3xl font-medium italic text-quartz">Energy Future</span>
          </h1>
        </div>

        {/* supporting copy — larger + higher contrast for readability */}
        <p className="mt-8 max-w-2xl text-fluid-lg font-medium leading-relaxed text-quartz/90">
          An integrated platform for the sustainable exploration, distribution, and supply of
          premium petroleum products across West Africa.
        </p>

        {/* CTAs */}
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
