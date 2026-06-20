import type { Metadata } from "next";
import { siteUrl } from "@/lib/utils";

export function pageMetadata(title: string, description: string, path = ""): Metadata {
  const url = `${siteUrl}${path}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: "Kingdom IP",
      images: [{ url: `${siteUrl}/opengraph-image`, width: 1200, height: 630, alt: "Kingdom IP diagnostic strategy consultancy" }],
      locale: "en_US",
      type: "website"
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${siteUrl}/opengraph-image`]
    }
  };
}
