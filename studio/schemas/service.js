export default {
  name: "service",
  title: "Service",
  type: "document",
  fields: [
    { name: "number", title: "Number (e.g. 01)", type: "string" },
    { name: "eyebrow", title: "Eyebrow (e.g. Global Commodity Intelligence)", type: "string" },
    { name: "title", title: "Title", type: "string" },
    { name: "shortDetail", title: "Short detail (shown on the pillar card)", type: "string" },
    { name: "description", title: "Full description", type: "text", rows: 4 },
    { name: "capabilities", title: "Key capabilities", type: "array", of: [{ type: "string" }] },
    { name: "image", title: "Image", type: "image", options: { hotspot: true } },
    { name: "order", title: "Display order", type: "number" },
  ],
  orderings: [{ title: "Display order", name: "order", by: [{ field: "order", direction: "asc" }] }],
  preview: { select: { title: "title", subtitle: "eyebrow", media: "image" } },
};
