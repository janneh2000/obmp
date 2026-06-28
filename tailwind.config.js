/** @type {import('tailwindcss').Config} */
// ============================================================================
//  OBMP · "KINETIC LEGACY" DESIGN TOKENS
//  Ocean-Bay Marine & Petroleum Company
//  Module 01 — colors, typography, fluid scale, 12-col grid (120px gutters)
//  Module 02 — tailwindcss-animate plugin
// ============================================================================
import tailwindcssAnimate from "tailwindcss-animate";

export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    // -- 12-column container with extended desktop gutters (120px) -----------
    container: {
      center: true,
      padding: {
        DEFAULT: "1.5rem", // mobile gutter
        md: "2.5rem",
        lg: "120px", // extended desktop gutter
      },
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
      },
    },
    extend: {
      // -- Color tokens ------------------------------------------------------
      colors: {
        // bg-abyssal / text-abyssal  (deep ocean navy)
        abyssal: {
          DEFAULT: "#0A192F",
          deep: "#060F1F",
          800: "#0F2540",
          700: "#16314F",
        },
        // text-gold / bg-gold  (refined petroleum gold)
        gold: {
          DEFAULT: "#D49D35",
          soft: "#E4B95C",
          deep: "#B7822A",
        },
        // bg-quartz / text-quartz  (cool off-white)
        quartz: {
          DEFAULT: "#F1F4F9",
          dim: "#D7DEE8",
        },
      },

      // -- Typography --------------------------------------------------------
      fontFamily: {
        heading: ['"Barlow Condensed"', "system-ui", "sans-serif"],
        barlow: ['"Barlow Condensed"', "system-ui", "sans-serif"],
        body: ['"Inter"', "system-ui", "sans-serif"],
        // italic-serif line of the Hero's split headline
        serif: ['"Playfair Display"', "Georgia", "serif"],
      },

      // -- Fluid font sizes (body min 18px) ----------------------------------
      fontSize: {
        "fluid-sm": ["clamp(0.95rem, 0.9rem + 0.25vw, 1.05rem)", { lineHeight: "1.6" }],
        "fluid-base": ["clamp(1.125rem, 1.05rem + 0.4vw, 1.25rem)", { lineHeight: "1.7" }], // 18px floor
        "fluid-lg": ["clamp(1.25rem, 1.1rem + 0.7vw, 1.6rem)", { lineHeight: "1.5" }],
        "fluid-xl": ["clamp(1.6rem, 1.25rem + 1.6vw, 2.5rem)", { lineHeight: "1.2", letterSpacing: "-0.01em" }],
        "fluid-2xl": ["clamp(2.2rem, 1.6rem + 3vw, 3.75rem)", { lineHeight: "1.05", letterSpacing: "-0.02em" }],
        "fluid-3xl": ["clamp(2.8rem, 1.9rem + 4.5vw, 5.25rem)", { lineHeight: "1.0", letterSpacing: "-0.02em" }],
        "fluid-display": ["clamp(3.25rem, 1.8rem + 7.2vw, 8rem)", { lineHeight: "0.92", letterSpacing: "-0.03em" }],
      },

      letterSpacing: {
        kinetic: "0.18em",
        horizon: "0.3em",
      },

      maxWidth: {
        content: "1536px",
      },

      boxShadow: {
        nav: "0 10px 40px -20px rgba(0,0,0,0.65)",
        gold: "0 16px 40px -16px rgba(212,157,53,0.55)",
      },

      backgroundImage: {
        "horizon-line": "linear-gradient(90deg, transparent, rgba(212,157,53,0.55), transparent)",
        "abyssal-fade": "linear-gradient(180deg, #060F1F 0%, #0A192F 60%, #0A192F 100%)",
      },

      transitionTimingFunction: {
        kinetic: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
    },
  },
  plugins: [tailwindcssAnimate],
};
