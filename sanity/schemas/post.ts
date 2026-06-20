import { defineField, defineType } from "sanity";

export const post = defineType({
  name: "post",
  title: "Blog Post",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "slug", type: "slug", options: { source: "title" }, validation: (Rule) => Rule.required() }),
    defineField({ name: "category", type: "string", options: { list: ["Leadership", "Communication", "Worship", "Digital Ministry", "Sermons & Preaching", "Systems", "Guest Pathways", "Operations"] } }),
    defineField({ name: "excerpt", type: "text" }),
    defineField({ name: "coverImage", type: "image" }),
    defineField({ name: "publishedAt", type: "datetime" }),
    defineField({ name: "body", type: "array", of: [{ type: "block" }, { type: "image" }] }),
    defineField({ name: "seoTitle", type: "string" }),
    defineField({ name: "seoDescription", type: "text" })
  ]
});
