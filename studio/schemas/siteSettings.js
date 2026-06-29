export default {
  name: "siteSettings",
  title: "Site settings",
  type: "document",
  // A single settings document (hero + contact details).
  fields: [
    { name: "heroEyebrow", title: "Hero eyebrow", type: "string" },
    { name: "heroLine1", title: "Hero line 1", type: "string" },
    { name: "heroLine2", title: "Hero line 2 (gold)", type: "string" },
    { name: "heroLine3", title: "Hero line 3 (serif italic)", type: "string" },
    { name: "heroSubcopy", title: "Hero subcopy", type: "text", rows: 2 },
    { name: "heroImage", title: "Hero background image", type: "image", options: { hotspot: true } },
    { name: "phone", title: "Phone / WhatsApp (display)", type: "string" },
    { name: "whatsapp", title: "WhatsApp number (digits only, e.g. 23232888888)", type: "string" },
    { name: "emails", title: "Emails", type: "array", of: [{ type: "string" }] },
    { name: "headOffice", title: "Head office lines", type: "array", of: [{ type: "string" }] },
    { name: "hours", title: "Business hours lines", type: "array", of: [{ type: "string" }] },
  ],
  preview: { prepare: () => ({ title: "Site settings" }) },
};
