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
    default: "Kingdom IP | Tools and Help for Churches",
    template: "%s | Kingdom IP"
  },
  description: "Tools built at a real church, ready for yours: a Giving Calculator and Sermon Publishing system, plus custom help with websites, sermons, strategy and AI workflows.",
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
            description: "Tools and custom help for churches: giving, sermon publishing, websites, sermon review, ministry strategy and AI workflows.",
            areaServed: "United States",
            serviceType: ["Website and communication", "Sermon review", "Ministry strategy", "AI systems and workflows"],
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
