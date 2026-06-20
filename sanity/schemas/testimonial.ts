import { defineField, defineType } from "sanity";

export const testimonial = defineType({
  name: "testimonial",
  title: "Testimonial",
  type: "document",
  fields: [
    defineField({ name: "quote", type: "text", validation: (Rule) => Rule.required() }),
    defineField({ name: "name", type: "string" }),
    defineField({ name: "role", type: "string" }),
    defineField({ name: "organization", type: "string" }),
    defineField({ name: "placeholder", type: "boolean", initialValue: true }),
    defineField({ name: "image", type: "image" })
  ]
});
