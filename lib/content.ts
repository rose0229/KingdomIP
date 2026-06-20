export const navItems = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/contact", label: "Contact" }
];

export const serviceCategories = [
  {
    title: "Focused Audits",
    description: "Remote-friendly diagnostics Kingdom IP can deliver well from links, documents, videos, and workflow access.",
    services: [
      ["Website & Digital Presence Audit", "For churches whose online first impression is unclear, outdated, or not moving guests toward a next step.", "Homepage clarity, mobile experience, calls to action, basic SEO, Google profile signals, social first impression, speed, trust cues, and content gaps.", "A prioritized scorecard, page-level findings, copy notes, quick wins, and a practical action list.", "7-10 business days", "$750-$1,500"],
      ["Message & Next Step Audit", "For churches that have good ministry but confusing language, scattered CTAs, or a weak connection pathway.", "Homepage language, guest pathway, connection card, follow-up wording, ministry names, announcement clarity, and next-step hierarchy.", "Messaging diagnosis, next-step friction map, recommended language, and a 30-day priority list.", "7-10 business days", "$950-$1,750"],
      ["Sermon Clarity Review", "For pastors who want constructive feedback on clarity, structure, delivery, and application.", "One sermon video or transcript, sermon structure, biblical flow, transitions, application, attention, delivery, and call to response.", "Sermon scorecard, annotated observations, strengths, priority improvements, and optional debrief.", "5-7 business days", "$350 single / $950 bundle"],
      ["Systems & Workflow Audit", "For teams with too much manual work, unclear handoffs, or tools that are not carrying enough weight.", "Forms, follow-up workflows, Planning Center or CRM usage, recurring admin tasks, communication handoffs, content process, and reporting gaps.", "Workflow map, friction diagnosis, practical tool recommendations, and implementation-ready next steps.", "10-14 business days", "$1,250-$2,500"]
    ]
  },
  {
    title: "Custom Consulting",
    description: "For questions that require interviews, deeper context, onsite observation, or broader leadership judgment.",
    services: [
      ["Custom Strategic Engagement", "For leaders with a specific question that does not fit a productized audit.", "Scoped around the decision, available data, stakeholder input, ministry context, and the kind of judgment required.", "A defined scope, custom research, diagnostic findings, strategic recommendations, and implementation support options.", "Scoped after intake", "By inquiry"]
    ]
  }
].map((category) => ({
  ...category,
  services: category.services.map(([title, who, evaluated, receives, timeline, price]) => ({
    title,
    slug: title.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""),
    description: receives,
    who,
    evaluated,
    receives,
    timeline,
    price
  }))
}));

export const coreServices = serviceCategories[0].services;

export const packages = [
  {
    name: "Snapshot Audit",
    eyebrow: "Low-friction start",
    price: "$495-$750",
    description: "A tight teardown of one page, one sermon, one workflow, or one channel.",
    includes: ["One focused review area", "Short findings memo", "Simple scorecard", "Top five fixes", "30-minute debrief option"],
    bestFor: "Leaders who want a fast read before committing to a fuller audit."
  },
  {
    name: "Focused Audit",
    eyebrow: "Most common",
    price: "$1,250-$1,750",
    description: "One complete audit area with enough depth to give your team a useful diagnosis.",
    includes: ["One full audit area", "Detailed scorecard", "Findings and examples", "Priority recommendations", "60-minute debrief"],
    bestFor: "Churches that know the general problem area and need to know what to fix first.",
    featured: true
  },
  {
    name: "Priority Roadmap",
    eyebrow: "Connected issues",
    price: "$2,500-$3,500",
    description: "A broader diagnostic across two or three related areas with a practical 90-day plan.",
    includes: ["Two to three audit areas", "Cross-area friction map", "Priority roadmap", "Leadership debrief", "90-day action plan"],
    bestFor: "Teams with overlapping digital, messaging, next-step, or workflow problems."
  },
  {
    name: "Custom Consulting",
    eyebrow: "Scoped after intake",
    price: "By inquiry",
    description: "For work that needs interviews, onsite observation, leadership facilitation, or deeper strategic judgment.",
    includes: ["Custom scope", "Research or interviews as needed", "Strategic recommendations", "Leadership presentation", "Implementation support options"],
    bestFor: "Churches facing complex questions that should not be reduced to a quick audit."
  }
];

export const faqs = [
  ["Is Kingdom IP only for churches?", "Churches are the primary audience, but Kingdom IP also works with ministries and select purpose-driven businesses that need clear diagnostic strategy."],
  ["Are reports automatically generated?", "No. Modern tools can support research and organization, but the value is expert judgment, practical ministry experience, and clear recommendations."],
  ["Why are there fewer public services?", "A smaller menu keeps the work honest. Some questions require interviews, onsite observation, or deeper consulting, so those are scoped after intake instead of packaged too casually."],
  ["Can we start small?", "Yes. The Snapshot Audit is designed as a low-friction first step when you need a fast, useful read on one specific issue."],
  ["Do you guarantee growth?", "No. Kingdom IP does not promise attendance growth. The work is designed to clarify reality, identify friction, and help leaders choose better priorities."],
  ["Can pricing change?", "Yes. Package pricing is set up as editable content in the CMS so it can be updated without code changes."]
];
