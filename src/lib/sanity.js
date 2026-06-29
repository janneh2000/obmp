import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

/**
 * Sanity content client.
 * Set these in a local .env and in Vercel → Settings → Environment Variables:
 *   VITE_SANITY_PROJECT_ID=your_project_id
 *   VITE_SANITY_DATASET=production   (optional; defaults to "production")
 *
 * Until VITE_SANITY_PROJECT_ID is set, every fetch helper returns null and the
 * components fall back to their built-in content — so the live site never breaks.
 */
const projectId = import.meta.env.VITE_SANITY_PROJECT_ID;
const dataset = import.meta.env.VITE_SANITY_DATASET || "production";

export const sanityEnabled = Boolean(projectId);

export const sanity = sanityEnabled
  ? createClient({ projectId, dataset, apiVersion: "2024-01-01", useCdn: true })
  : null;

const builder = sanity ? imageUrlBuilder(sanity) : null;

/** Build an image URL from a Sanity image ref (returns null if unavailable). */
export function urlFor(source) {
  return builder && source ? builder.image(source) : null;
}

/** Generic helper: run a GROQ query, return null on any failure. */
async function safeFetch(query, params) {
  if (!sanity) return null;
  try {
    return await sanity.fetch(query, params || {});
  } catch (err) {
    console.error("[sanity] fetch failed:", err);
    return null;
  }
}

export function fetchVessels() {
  return safeFetch(
    `*[_type == "vessel"] | order(order asc, _createdAt asc){
      name, type, flagLine, summary,
      "specs": specs[]{label, value},
      image
    }`
  );
}

export function fetchTeam() {
  return safeFetch(`*[_type == "teamMember"] | order(order asc, _createdAt asc){ name, role, photo }`);
}

export function fetchServices() {
  return safeFetch(
    `*[_type == "service"] | order(order asc, _createdAt asc){
      number, eyebrow, title, shortDetail, description, capabilities, image
    }`
  );
}

export function fetchValues() {
  return safeFetch(`*[_type == "value"] | order(order asc, _createdAt asc){ title, text }`);
}

export function fetchSiteSettings() {
  return safeFetch(`*[_type == "siteSettings"][0]`);
}
