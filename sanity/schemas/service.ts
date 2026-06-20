import { defineField, defineType } from "sanity";

export const service = defineType({
  name: "service",
  title: "Service",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "slug", type: "slug", options: { source: "title" }, validation: (Rule) => Rule.required() }),
    defineField({ name: "category", type: "string", options: { list: ["Focused Audits", "Custom Consulting"] } }),
    defineField({ name: "shortDescription", type: "text" }),
    defineField({ name: "whoItIsFor", type: "text" }),
    defineField({ name: "whatIsEvaluated", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "clientReceives", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "timeline", type: "string" }),
    defineField({ name: "startingPrice", type: "string" }),
    defineField({ name: "ctaLabel", type: "string" }),
    defineField({ name: "featured", type: "boolean", initialValue: false })
  ]
});
