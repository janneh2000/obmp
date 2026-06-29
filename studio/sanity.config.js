import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./schemas";

// To switch projects, change projectId here AND in sanity.cli.js.
export default defineConfig({
  name: "default",
  title: "Ocean-Bay Marine & Petroleum",
  projectId: "8wm53mc6",
  dataset: "production",
  plugins: [structureTool(), visionTool()],
  schema: { types: schemaTypes },
});
