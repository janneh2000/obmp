import { useEffect, useState } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Horizon from "./Horizon";
import Footer from "./Footer";
import WhatsAppButton from "./WhatsAppButton";

const NAV_LINKS = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Services", to: "/services" },
  { label: "Fleet", to: "/fleet" },
  { label: "Contact", to: "/contact" },
];

/**
 * Layout — Kinetic Legacy global shell (Module 02)
 * -------------------------------------------------
 * • CSS Grid structure: rows = [main 1fr | footer auto] so the Footer is
 *   always pinned to the bottom of the grid, even on short pages.
 * • Navbar is a FIXED glassmorphism bar (backdrop-blur 20px) so the hero
 *   reads through it; it animates from transparent to solid bg-abyssal once
 *   the user scrolls past 50px, with a 1px gold border-b.
 * • Horizon motif: a persistent 1px gold line across the very top of the header.
 * • Page content renders through <Outlet /> (react-router-dom).
 *
 * Logo: replace /public/logo.svg with the official OBMP file to swap the mark.
 */
export default function Layout() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // transparent → solid once past 50px
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // lock scroll while the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <div className="grid min-h-screen grid-rows-[1fr_auto] bg-abyssal font-body text-quartz">
      {/* ===================== FIXED GLASS HEADER ===================== */}
      <motion.header
        initial={false}
        animate={{
          backgroundColor: scrolled ? "rgba(10,25,47,0.85)" : "rgba(10,25,47,0)",
          borderBottomColor: scrolled ? "rgba(212,157,53,0.45)" : "rgba(212,157,53,0.14)",
        }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed inset-x-0 top-0 z-50 border-b ${scrolled ? "shadow-nav" : ""}`}
        style={{
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderBottomColor: "rgba(212,157,53,0.14)",
        }}
      >
        {/* Horizon motif — persistent 1px gold line at the top of the header */}
        <Horizon />

        <nav className="container-kinetic flex h-20 items-center justify-between lg:h-24">
          {/* logo + wordmark */}
          <Link
            to="/"
            onClick={() => setMenuOpen(false)}
            className="flex items-center gap-3"
            aria-label="OBMP home"
          >
            <img
              src="/logo.png"
              alt="OBMP — Ocean-Bay Marine & Petroleum Company"
              className="h-12 w-12 shrink-0 lg:h-14 lg:w-14"
            />
            <span className="hidden font-barlow text-lg font-bold uppercase leading-none tracking-[0.1em] text-quartz sm:block xl:hidden">
              OBMP
            </span>
            <span className="hidden font-barlow text-lg font-bold uppercase leading-none tracking-[0.08em] text-quartz xl:block">
              Ocean-Bay <span className="text-gold">Marine &amp; Petroleum</span>
            </span>
          </Link>

          {/* desktop nav */}
          <ul className="hidden items-center gap-7 lg:flex">
            {NAV_LINKS.map((l) => (
              <li key={l.to}>
                <NavLink
                  to={l.to}
                  end={l.to === "/"}
                  className={({ isActive }) =>
                    `nav-link ${isActive ? "text-gold" : ""}`
                  }
                >
                  {l.label}
                </NavLink>
              </li>
            ))}
            <li>
              <Link to="/contact" className="btn-gold">
                Get a Quote
              </Link>
            </li>
          </ul>

          {/* mobile toggle */}
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            className="relative z-50 flex h-11 w-11 items-center justify-center lg:hidden"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            <div className="flex w-6 flex-col gap-[5px]">
              <motion.span
                animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 7 : 0 }}
                className="block h-px w-full bg-quartz"
              />
              <motion.span
                animate={{ opacity: menuOpen ? 0 : 1 }}
                className="block h-px w-full bg-quartz"
              />
              <motion.span
                animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -7 : 0 }}
                className="block h-px w-full bg-quartz"
              />
            </div>
          </button>
        </nav>
      </motion.header>

      {/* ===================== MOBILE MENU ===================== */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-40 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div
              className="absolute inset-0 bg-abyssal-deep/95"
              style={{ backdropFilter: "blur(24px)", WebkitBackdropFilter: "blur(24px)" }}
            />
            <motion.ul
              className="relative flex h-full flex-col items-start justify-center gap-3 px-10"
              initial="closed"
              animate="open"
              exit="closed"
              variants={{
                open: { transition: { staggerChildren: 0.07, delayChildren: 0.12 } },
                closed: {},
              }}
            >
              {NAV_LINKS.map((l) => (
                <motion.li
                  key={l.to}
                  variants={{ open: { opacity: 1, y: 0 }, closed: { opacity: 0, y: 24 } }}
                >
                  <NavLink
                    to={l.to}
                    end={l.to === "/"}
                    onClick={() => setMenuOpen(false)}
                    className={({ isActive }) =>
                      `font-heading text-5xl uppercase leading-tight tracking-tight transition-colors hover:text-gold ${
                        isActive ? "text-gold" : "text-quartz"
                      }`
                    }
                  >
                    {l.label}
                  </NavLink>
                </motion.li>
              ))}
              <motion.li
                className="mt-8"
                variants={{ open: { opacity: 1, y: 0 }, closed: { opacity: 0, y: 24 } }}
              >
                <Link to="/contact" onClick={() => setMenuOpen(false)} className="btn-gold">
                  Get a Quote
                </Link>
              </motion.li>
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ===================== ROUTED CONTENT ===================== */}
      <main>
        <Outlet />
      </main>

      {/* ===================== FOOTER (bottom grid row) ===================== */}
      <Footer />

      {/* persistent WhatsApp contact button (logo only) */}
      <WhatsAppButton />
    </div>
  );
}
