import { LegalPage } from "@/components/legal-page";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("Refund Policy", "Kingdom IP refund policy for resources and setup services.", "/refunds");

export default function RefundsPage() {
  return (
    <LegalPage
      eyebrow="Refund policy"
      title="If it doesn't work for you, we'll make it right."
      updated="November 10, 2026"
      intro="Here's how refunds work for the resources and setup services sold on kingdomip.org."
      sections={[
        {
          heading: "Digital resources",
          body: [
            "This covers downloads like the Giving Calculator code. If it isn't right for you, email us within 30 days of your purchase and we'll refund you in full. You don't need to give a reason.",
            "If something in the download doesn't work, tell us first if you're willing. Most problems are a quick fix."
          ]
        },
        {
          heading: "Setup services",
          body: [
            "This covers done-for-you setup like the Giving Calculator setup.",
            [
              "Before we start work: full refund, any time.",
              "After we start: if we can't get it working on your website, full refund.",
              "Once it's working on your site and you've had your round of tweaks, the service is complete and isn't refundable."
            ]
          ]
        },
        {
          heading: "Consulting and audits",
          body: ["Audits, strategy and other consulting projects are scoped and priced one at a time. Refund terms for those are set in the proposal you approve before work begins."]
        },
        {
          heading: "How to ask for a refund",
          body: [
            "Email hello@kingdomip.org with the email you used at checkout. We reply within two business days.",
            "Refunds go back to the original payment method. Your bank may take 5 to 10 business days to show it."
          ]
        }
      ]}
    />
  );
}
