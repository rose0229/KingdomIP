import { defineField, defineType } from "sanity";

export const contactConfig = defineType({
  name: "contactConfig",
  title: "Contact Form Configuration",
  type: "document",
  fields: [
    defineField({ name: "recipientEmail", type: "string" }),
    defineField({ name: "introText", type: "text" }),
    defineField({ name: "budgetOptions", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "timelineOptions", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "successMessage", type: "text" })
  ]
});
