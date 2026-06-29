export default {
  name: "value",
  title: "Core value",
  type: "document",
  fields: [
    { name: "title", title: "Title", type: "string" },
    { name: "text", title: "Text", type: "text", rows: 2 },
    { name: "order", title: "Display order", type: "number" },
  ],
  orderings: [{ title: "Display order", name: "order", by: [{ field: "order", direction: "asc" }] }],
  preview: { select: { title: "title", subtitle: "text" } },
};
