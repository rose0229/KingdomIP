import { LegalPage } from "@/components/legal-page";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("Terms of Service", "Terms for using kingdomip.org and buying Kingdom IP resources and services.", "/terms");

export default function TermsPage() {
  return (
    <LegalPage
      eyebrow="Terms of service"
      title="Terms of Service"
      updated="November 10, 2026"
      intro={'These terms apply when you use kingdomip.org or buy a resource or service from Kingdom IP ("we" or "us"). By buying or using something from us, you agree to them.'}
      sections={[
        {
          heading: "What we sell",
          body: [
            "Kingdom IP sells digital resources for churches and ministries, like the Giving Calculator, and services like setup, audits and consulting. Each product page says what's included and what it costs. Prices are in US dollars."
          ]
        },
        {
          heading: "Payment",
          body: [
            "Payments are processed by Stripe. We never see or store your full card number. Sales tax is added at checkout where it applies."
          ]
        },
        {
          heading: "Your license for digital resources",
          body: [
            "When you buy a digital resource, you can use it on one church or organization's website and change it however you like for that site.",
            "You can't resell it, give it away or publish it for others to download. Each additional church or organization needs its own purchase.",
            "We keep ownership of the resource itself."
          ]
        },
        {
          heading: "Setup services",
          body: [
            "For setup services, you'll give us what we need to do the work, such as access to your website builder or a contact for your web person. We'll do the work described on the product page.",
            "We're not responsible for changes your team or your website platform makes after setup is complete."
          ]
        },
        {
          heading: "Refunds",
          body: ["Our Refund Policy at kingdomip.org/refunds explains when and how you can get your money back."]
        },
        {
          heading: "No guarantees about results",
          body: [
            "Our resources and advice are meant to help. We can't promise any particular outcome, such as an increase in giving, attendance or engagement. Resources are provided as they are, without warranties beyond what the law requires."
          ]
        },
        {
          heading: "Limit on our liability",
          body: [
            "To the extent the law allows, our total liability for any claim about a purchase is limited to the amount you paid for it. We're not liable for indirect or consequential losses."
          ]
        },
        {
          heading: "Changes",
          body: ["We may update these terms. The date at the top shows the latest version. Changes don't affect purchases you've already made."]
        },
        {
          heading: "Governing law",
          body: ["These terms are governed by the laws of the State of Arizona."]
        }
      ]}
    />
  );
}
