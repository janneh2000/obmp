export default {
  name: "teamMember",
  title: "Team member",
  type: "document",
  fields: [
    { name: "name", title: "Name", type: "string" },
    { name: "role", title: "Role", type: "string" },
    { name: "photo", title: "Photo", type: "image", options: { hotspot: true } },
    { name: "order", title: "Display order", type: "number" },
  ],
  orderings: [{ title: "Display order", name: "order", by: [{ field: "order", direction: "asc" }] }],
  preview: { select: { title: "name", subtitle: "role", media: "photo" } },
};
