import { defineField, defineType } from "sanity";

export const teamMember = defineType({
  name: "teamMember",
  title: "Team Member",
  type: "document",
  fields: [
    defineField({ name: "name", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "role", type: "string" }),
    defineField({ name: "bio", type: "array", of: [{ type: "block" }] }),
    defineField({ name: "image", type: "image" }),
    defineField({ name: "featured", type: "boolean", initialValue: false })
  ]
});
