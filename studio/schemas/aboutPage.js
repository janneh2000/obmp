export default {
  name: "aboutPage",
  title: "About page",
  type: "document",
  // A single document for the About story, mission & vision.
  fields: [
    { name: "storyTitle", title: "Story title", type: "string" },
    {
      name: "storyParagraphs",
      title: "Story paragraphs",
      type: "array",
      of: [{ type: "text", rows: 4 }],
    },
    {
      name: "storyImages",
      title: "Story images (up to 4)",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
    },
    { name: "mission", title: "Our mission", type: "text", rows: 4 },
    { name: "vision", title: "Our vision", type: "text", rows: 4 },
  ],
  preview: { prepare: () => ({ title: "About page" }) },
};
