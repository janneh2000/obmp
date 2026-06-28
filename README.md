# OBMP — Kinetic Legacy

Rebuild of the **Ocean-Bay Marine & Petroleum Company (OBMP)** website using the
"Kinetic Legacy" design system. Stack: **React + Vite + Tailwind CSS + Framer Motion**.

## Run it

```bash
npm install
npm run dev      # local preview at http://localhost:5173
npm run build    # production build → dist/
```

## Module 01 (done)

- **Design tokens** — `tailwind.config.js` + `src/index.css`
  - Colors: `abyssal` (#0A192F), `gold` (#D49D35), `quartz` (#F1F4F9)
  - Fonts: Barlow Condensed (headings), Inter (body), Playfair Display (serif, reserved for Hero)
  - Fluid type scale (`text-fluid-*`, body floor 18px)
  - 12-column grid, 120px desktop gutters (`.container-kinetic`, `.grid-12`)
- **Layout** — `src/components/Layout.jsx`: glassmorphism navbar, transparent→abyssal on scroll, mobile menu
- **Horizon** — `src/components/Horizon.jsx`: persistent 1px gold line

## Coming next

Hero (split-text headline + parallax), Services, Contact Nexus.

## Logo

`public/logo.svg` is a **vector stand-in** of the OBMP badge. To use the official
artwork, drop your file in as `public/logo.png` and change the `src="/logo.svg"`
line in `Layout.jsx` to `src="/logo.png"` (or simply overwrite `public/logo.svg`).
