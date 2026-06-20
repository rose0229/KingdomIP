import { defineField, defineType } from "sanity";

export const packageType = defineType({
  name: "package",
  title: "Package",
  type: "document",
  fields: [
    defineField({ name: "name", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "slug", type: "slug", options: { source: "name" }, validation: (Rule) => Rule.required() }),
    defineField({ name: "eyebrow", type: "string" }),
    defineField({ name: "price", type: "string" }),
    defineField({ name: "description", type: "text" }),
    defineField({ name: "bestFor", type: "text" }),
    defineField({ name: "includes", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "featured", type: "boolean", initialValue: false })
  ]
});
