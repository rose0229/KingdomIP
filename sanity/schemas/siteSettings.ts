import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "domain", type: "url" }),
    defineField({ name: "email", type: "string" }),
    defineField({ name: "heroHeadline", type: "string" }),
    defineField({ name: "heroCopy", type: "text" }),
    defineField({ name: "primaryCta", type: "string" }),
    defineField({ name: "secondaryCta", type: "string" }),
    defineField({ name: "seoTitle", type: "string" }),
    defineField({ name: "seoDescription", type: "text" }),
    defineField({ name: "socialImage", type: "image" })
  ]
});
