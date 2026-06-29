export default {
  name: "vessel",
  title: "Fleet vessel",
  type: "document",
  fields: [
    { name: "name", title: "Name", type: "string" },
    { name: "type", title: "Type (e.g. Oil / Chemical Tanker)", type: "string" },
    { name: "flagLine", title: "Flag line (e.g. Barbados flag · IMO 9438250)", type: "string" },
    { name: "summary", title: "Summary", type: "text", rows: 3 },
    { name: "image", title: "Photo", type: "image", options: { hotspot: true } },
    {
      name: "specs",
      title: "Specs",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "label", title: "Label", type: "string" },
            { name: "value", title: "Value", type: "string" },
          ],
          preview: { select: { title: "label", subtitle: "value" } },
        },
      ],
    },
    { name: "order", title: "Display order", type: "number" },
  ],
  orderings: [{ title: "Display order", name: "order", by: [{ field: "order", direction: "asc" }] }],
  preview: { select: { title: "name", subtitle: "type", media: "image" } },
};
