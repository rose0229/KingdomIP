import { LegalPage } from "@/components/legal-page";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("Privacy Policy", "What information Kingdom IP collects, why, and what we do with it.", "/privacy");

export default function PrivacyPage() {
  return (
    <LegalPage
      eyebrow="Privacy policy"
      title="Privacy Policy"
      updated="November 10, 2026"
      intro="We collect only what we need to answer you, fill your order and run this website. We don't sell your information."
      sections={[
        {
          heading: "What we collect",
          body: [
            [
              "Contact and intake forms: your name, email, organization and whatever you choose to tell us about your project.",
              "Purchases: your name, email, billing details and any setup details you enter at checkout, such as your church's website and giving page link. Stripe processes the payment. We never see or store your full card number.",
              "Site statistics: anonymous page-view counts from Vercel Analytics. It doesn't use cookies and doesn't identify you."
            ]
          ]
        },
        {
          heading: "What the Giving Calculator collects",
          body: [
            "Nothing. When a church puts the calculator on its website, the math runs in each visitor's browser. Incomes and amounts typed into it aren't sent to us or to the church."
          ]
        },
        {
          heading: "How we use it",
          body: [
            [
              "To reply to you and do the work you asked for",
              "To deliver your purchase and send receipts and download links",
              "To keep records our taxes and bookkeeping require"
            ],
            "We don't sell, rent or trade your information, and we don't use it for advertising."
          ]
        },
        {
          heading: "Who helps us",
          body: [
            "A few companies process information for us so the site works: Stripe (payments), Resend (sending email), Vercel (hosting and site statistics) and Sanity (managing site content). They handle your information only to provide those services."
          ]
        },
        {
          heading: "How long we keep it",
          body: [
            "We keep project and purchase records as long as we need them to serve you and as long as tax and accounting rules require. Then we delete them."
          ]
        },
        {
          heading: "Your choices",
          body: [
            "Email hello@kingdomip.org to see, correct or delete the information we have about you. Some purchase records have to be kept for tax purposes, and we'll tell you if that applies."
          ]
        },
        {
          heading: "Children",
          body: ["This site is meant for church and ministry leaders. We don't knowingly collect information from children under 13."]
        },
        {
          heading: "Changes",
          body: ["If we change this policy, we'll update the date at the top of this page."]
        }
      ]}
    />
  );
}
