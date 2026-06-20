import { defineField, defineType } from "sanity";

export const footer = defineType({
  name: "footer",
  title: "Footer",
  type: "document",
  fields: [
    defineField({ name: "tagline", type: "text" }),
    defineField({ name: "email", type: "string" }),
    defineField({ name: "legalAddress", type: "text" }),
    defineField({ name: "links", type: "array", of: [{ type: "object", fields: [{ name: "label", type: "string" }, { name: "href", type: "string" }] }] })
  ]
});
