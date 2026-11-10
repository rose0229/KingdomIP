import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/utils";

const routes = ["", "/services", "/resources", "/resources/giving-calculator", "/contact"];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.8
  }));
}
