import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { JsonLd } from "@/components/json-ld";
import { siteUrl } from "@/lib/utils";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Kingdom IP | Church Audits and Strategic Consulting",
    template: "%s | Kingdom IP"
  },
  description: "Kingdom IP gives churches and purpose-driven organizations a clear, honest look at what is working, what is weak, and what to do next.",
  applicationName: "Kingdom IP",
  icons: {
    icon: "/favicon.svg",
    apple: "/brand/social-profile.svg"
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "ProfessionalService",
            name: "Kingdom IP",
            url: siteUrl,
            email: "hello@kingdomip.org",
            description: "Diagnostic audits and practical strategy recommendations for churches, ministries, and purpose-driven organizations.",
            areaServed: "United States",
            serviceType: ["Website audits", "Sermon and preaching audits", "Communication strategy", "AI systems consulting", "Church and ministry strategy"],
            sameAs: []
          }}
        />
        <SiteHeader />
        {children}
        <SiteFooter />
        <Analytics />
      </body>
    </html>
  );
}
