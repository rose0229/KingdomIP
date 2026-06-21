export const navItems = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/contact", label: "Contact" }
];

export const serviceCategories = [
  {
    title: "Digital, Message, and Ministry Audits",
    description: "Remote-friendly diagnostics Kingdom IP can deliver well from links, documents, videos, systems access, and a clear intake.",
    services: [
      ["Website Audit", "For churches and organizations whose online first impression is unclear, outdated, or not moving people toward a next step.", "Homepage clarity, mobile experience, calls to action, basic SEO, trust cues, content gaps, and key page flow.", "A prioritized website diagnosis, page-level findings, copy notes, quick wins, and practical next steps.", "7-10 business days"],
      ["Website Strategy or Redesign", "For teams deciding whether they need small improvements, a strategic refresh, a full redesign, or a new site.", "Audience, visitor actions, required pages, brand assets, platform fit, launch timing, and examples you admire.", "A clear website direction, scope recommendation, priority page plan, and next-step options.", "Scoped after intake"],
      ["Social Media Audit", "For organizations whose social presence feels inconsistent, unclear, or disconnected from real ministry or business goals.", "Primary platforms, audience, content patterns, engagement goals, trust signals, and channel priorities.", "A social presence diagnosis, practical content recommendations, priority fixes, and clearer channel focus.", "7-10 business days"],
      ["Brand / Messaging Audit", "For organizations with scattered language, unclear positioning, confusing next steps, or inconsistent brand signals.", "Website language, tagline or mission, audience clarity, misunderstandings, brand assets, and comparable organizations.", "Messaging diagnosis, clarity recommendations, stronger positioning language, and practical brand next steps.", "7-10 business days"],
      ["Sermon / Preaching Audit", "For pastors who want constructive feedback on biblical faithfulness, clarity, structure, delivery, and application.", "Sermon video or audio, structure, exegesis, application, delivery, engagement, emotional connection, and response moments.", "Sermon observations, strengths, priority improvements, and optional debrief.", "5-7 business days"],
      ["Church or Ministry Strategy", "For ministry leaders trying to clarify the next right move across growth, systems, volunteers, discipleship, or communication.", "Context, attendance, volunteers, strategic challenge, desired outcomes, constraints, and what has already been tried.", "A practical strategy diagnosis, priority outcomes, and recommended next steps.", "Scoped after intake"],
      ["Guest Experience / Assimilation Audit", "For churches that need a clearer guest pathway from first visit to meaningful next step.", "Service times, arrival experience, signage, hospitality, kids check-in, follow-up, connection events, and tracking.", "Guest pathway diagnosis, friction points, follow-up recommendations, and improvement priorities.", "Scoped after intake"],
      ["Communication Strategy", "For teams whose announcements, email, social, website, or internal communication are not producing clear action.", "Primary channels, recurring communication problems, audiences, campaign examples, and desired actions.", "Communication diagnosis, audience/channel recommendations, and clearer action priorities.", "Scoped after intake"],
      ["AI Systems or Workflow Consulting", "For teams that want AI to reduce repetitive work without creating confusion, privacy risk, or unrealistic expectations.", "Current tools, repetitive tasks, workflow bottlenecks, team users, data concerns, and practical use cases.", "A realistic AI/workflow plan, tool recommendations, and implementation next steps.", "Scoped after intake"]
    ]
  },
  {
    title: "Custom Projects",
    description: "For questions that do not fit neatly into one audit lane.",
    services: [
      ["Custom Project / Not Sure Yet", "For leaders who know something needs attention but are not sure which service fits.", "The problem, desired outcome, prior attempts, deadlines, examples, and any relevant files or screenshots.", "A recommended scope, next step, or custom project path.", "Scoped after intake"]
    ]
  }
].map((category) => ({
  ...category,
  services: category.services.map(([title, who, evaluated, receives, timeline]) => ({
    title,
    slug: title.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""),
    description: receives,
    who,
    evaluated,
    receives,
    timeline
  }))
}));

export const coreServices = serviceCategories[0].services;

export const packages = [
  {
    name: "Snapshot Audit",
    eyebrow: "Low-friction start",
    description: "A tight teardown of one page, one sermon, one workflow, or one channel.",
    includes: ["One focused review area", "Short findings memo", "Simple scorecard", "Top five fixes", "30-minute debrief option"],
    bestFor: "Leaders who want a fast read before committing to a fuller audit."
  },
  {
    name: "Focused Audit",
    eyebrow: "Most common",
    description: "One complete audit area with enough depth to give your team a useful diagnosis.",
    includes: ["One full audit area", "Detailed scorecard", "Findings and examples", "Priority recommendations", "60-minute debrief"],
    bestFor: "Churches that know the general problem area and need to know what to fix first.",
    featured: true
  },
  {
    name: "Priority Roadmap",
    eyebrow: "Connected issues",
    description: "A broader diagnostic across two or three related areas with a practical 90-day plan.",
    includes: ["Two to three audit areas", "Cross-area friction map", "Priority roadmap", "Leadership debrief", "90-day action plan"],
    bestFor: "Teams with overlapping digital, messaging, next-step, or workflow problems."
  },
  {
    name: "Custom Consulting",
    eyebrow: "Scoped after intake",
    description: "For work that needs interviews, onsite observation, leadership facilitation, or deeper strategic judgment.",
    includes: ["Custom scope", "Research or interviews as needed", "Strategic recommendations", "Leadership presentation", "Implementation support options"],
    bestFor: "Churches facing complex questions that should not be reduced to a quick audit."
  }
];

export const faqs = [
  ["Is Kingdom IP only for churches?", "Churches are the primary audience, but Kingdom IP also works with ministries and select purpose-driven businesses that need clear diagnostic strategy."],
  ["Are reports automatically generated?", "No. Modern tools can support research and organization, but the value is expert judgment, practical ministry experience, and clear recommendations."],
  ["Why does the intake ask follow-up questions?", "The first page is intentionally quick. The later pages are optional and only appear for the services selected so Kingdom IP can respond faster and with better judgment."],
  ["Can we start small?", "Yes. The Snapshot Audit is designed as a low-friction first step when you need a fast, useful read on one specific issue."],
  ["Do you guarantee growth?", "No. Kingdom IP does not promise attendance growth. The work is designed to clarify reality, identify friction, and help leaders choose better priorities."],
  ["Can scope change?", "Yes. Scope can be adjusted after intake when the project needs more context, materials, or implementation support."]
];
