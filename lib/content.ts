export const navItems = [
  { href: "/resources", label: "Resources" },
  { href: "/services", label: "Services" },
  { href: "/contact", label: "Contact" }
];

// Custom work. Kept to a few lanes on purpose: each one is something Matt
// has done for Orbit and can do well for another church.
export const services = [
  {
    slug: "website",
    title: "Website and Communication",
    copy: "A clear read on your website, social and announcements: what confuses people, what moves them and what to fix first."
  },
  {
    slug: "sermon",
    title: "Sermon Review",
    copy: "Honest feedback on a sermon or a series: faithfulness to the text, clarity, structure, delivery and application."
  },
  {
    slug: "strategy",
    title: "Ministry Strategy",
    copy: "Help naming the next right move for your guest path, volunteers, discipleship or staff, with a plan your team can carry."
  },
  {
    slug: "ai",
    title: "AI Systems and Workflows",
    copy: "Take repetitive work off your staff with systems like the ones on our Resources page, built on your accounts and your rules."
  }
];

// Giving Calculator resource. Checkout runs through Stripe (see lib/stripe.ts
// and the STRIPE_* environment variables).
export const givingCalculator = {
  codePrice: "$19",
  setupPrice: "$99",
  liveExampleUrl: "https://www.orbitchurch.org/give/"
};

export const sermonPublishing = {
  kitPrice: "$49",
  setupPrice: "$750",
  liveExampleUrl: "https://www.orbitchurch.org/watch/"
};
