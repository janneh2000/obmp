import { Link } from "react-router-dom";
import Horizon from "./Horizon";

const YEAR = new Date().getFullYear();

/**
 * Footer — sits in the bottom row of the Layout grid.
 * Opens with the gold Horizon motif to mirror the header.
 */
export default function Footer() {
  return (
    <footer className="relative bg-abyssal-deep">
      {/* Horizon motif mirrored at the footer's top edge */}
      <Horizon />

      <div className="container-kinetic grid gap-10 py-14 md:grid-cols-[1.6fr_1fr_1fr] lg:py-16">
        {/* brand */}
        <div>
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="OBMP" className="h-12 w-12" />
            <span className="font-barlow text-lg font-bold uppercase tracking-[0.1em]">
              Ocean-Bay <span className="text-gold">Marine &amp; Petroleum</span>
            </span>
          </div>
          <p className="mt-5 max-w-sm text-fluid-sm text-quartz/55">
            An integrated energy platform for the sustainable exploration, distribution, and
            supply of premium petroleum products across Sub-Sahara Africa.
          </p>
        </div>

        {/* navigate */}
        <nav>
          <h4 className="eyebrow mb-4 text-xs">Navigate</h4>
          <ul className="space-y-3 text-quartz/70">
            <li><Link to="/" className="transition-colors hover:text-gold">Home</Link></li>
            <li><Link to="/about" className="transition-colors hover:text-gold">About</Link></li>
            <li><Link to="/services" className="transition-colors hover:text-gold">Services</Link></li>
            <li><Link to="/contact" className="transition-colors hover:text-gold">Contact</Link></li>
          </ul>
        </nav>

        {/* get in touch */}
        <div>
          <h4 className="eyebrow mb-4 text-xs">Get in touch</h4>
          <ul className="space-y-3 text-fluid-sm text-quartz/70">
            <li>Freetown, Sierra Leone</li>
            <li>
              <a href="mailto:oceanbaypetroleum.sl@gmail.com" className="transition-colors hover:text-gold">
                oceanbaypetroleum.sl@gmail.com
              </a>
            </li>
            <li>
              <a href="tel:+23232888888" className="transition-colors hover:text-gold">
                +232-32-888-888
              </a>
            </li>
            <li>
              <Link to="/contact" className="font-heading uppercase tracking-kinetic text-gold transition-colors hover:text-gold-soft">
                Contact us →
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-quartz/10">
        <div className="container-kinetic flex flex-col items-center justify-between gap-3 py-6 sm:flex-row">
          <p className="text-fluid-sm text-quartz/50">
            © {YEAR} Ocean-Bay Marine &amp; Petroleum Company. All rights reserved.
          </p>
          <p className="font-heading text-sm uppercase tracking-[0.25em] text-quartz/40">
            Sierra Leone · Sub-Sahara Africa
          </p>
        </div>
      </div>
    </footer>
  );
}
