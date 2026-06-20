import { defineField, defineType } from "sanity";

export const navigation = defineType({
  name: "navigation",
  title: "Navigation",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "items", type: "array", of: [{ type: "object", fields: [{ name: "label", type: "string" }, { name: "href", type: "string" }] }] })
  ]
});
