import { defineField, defineType } from "sanity";

export const caseStudy = defineType({
  name: "caseStudy",
  title: "Case Study",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "clientType", type: "string" }),
    defineField({ name: "challenge", type: "text" }),
    defineField({ name: "auditConducted", type: "string" }),
    defineField({ name: "keyFindings", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "actionsTaken", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "results", type: "text" }),
    defineField({ name: "testimonial", type: "reference", to: [{ type: "testimonial" }] }),
    defineField({ name: "images", type: "array", of: [{ type: "image" }] })
  ]
});
