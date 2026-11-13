import { CheckoutButton } from "@/components/checkout-button";
import { SectionHeading } from "@/components/section";
import { sermonPublishing } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata(
  "Sermon Publishing",
  "Publish a sermon on YouTube and the rest happens on its own: website page, transcript, summary, discussion guide, podcast episode and Facebook post. No monthly fee to us. Kit $49, setup $750.",
  "/resources/sermon-publishing"
);

const sunday = [
  "Publish the sermon on YouTube.",
  "Name the preacher in the description.",
  "Add the video to your Sermons playlist.",
  "Drop the audio in a folder."
];

const automatic = [
  "The sermon goes up on your website with its series, Scripture, speaker and video.",
  "A word-for-word transcript, taken from your captions.",
  "A short summary and search keywords.",
  "A printable small group discussion guide.",
  "A podcast episode.",
  "One post on your Facebook Page.",
  "An email to the right person if anything breaks."
];

const different = [
  {
    title: "No subscription to us.",
    copy: "Sermon content tools charge every month, forever. This runs on your own accounts. You pay the services it uses directly, and you never pay us again."
  },
  {
    title: "It finishes the job.",
    copy: "Most tools hand you a summary and a guide, and then someone still has to post everything. This puts it on your website, your podcast feed and your Facebook Page on its own."
  },
  {
    title: "It runs every Sunday at a real church.",
    copy: "Every rule in the kit came from something that broke at Orbit. It checks the live page after each run and emails someone when anything fails."
  }
];

const faqs = [
  {
    q: "What does it cost to run?",
    a: "You pay the services directly, on your own accounts: an AI provider for the summary and guide, plus a podcast host if you use one. Before you sign up for anything, the kit has the AI tell you what each one costs per month."
  },
  {
    q: "Do we need a programmer?",
    a: "No. You need a coding agent (Claude Code or Codex) and someone who can say yes when it asks to run commands. A regular chat window like ChatGPT can't build it. If that sounds like too much, book setup."
  },
  {
    q: "Will it work with our website?",
    a: "The kit covers WordPress, Squarespace, Wix, Webflow, church platforms like Subsplash and Church Center and custom sites in a Git repo. Not sure about yours? Book setup. If we can't get it working, you get a full refund."
  }
];

export default function SermonPublishingPage() {
  return (
    <main className="bg-paper">
      <section className="border-b border-ink/10 py-20 md:py-28">
        <div className="container grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <SectionHeading as="h1"
            eyebrow="Resource"
            title="Sermon Publishing"
            copy="One volunteer does four things on Sunday. Within about half an hour, the sermon is on your website with a transcript, a summary, a discussion guide, a podcast episode and a Facebook post. No monthly fee to us."
          />
          <div className="rounded-lg border border-ink/10 bg-bone p-5 text-ink/70">
            <p className="font-bold text-ink">See it on a live church site</p>
            <p className="mt-2 leading-7">Orbit Church in Buckeye, Arizona publishes its sermons this way every Sunday. Open any recent sermon to see the transcript, summary and discussion guide.</p>
            <a className="mt-4 inline-block text-sm font-semibold uppercase text-accent hover:opacity-80" href={sermonPublishing.liveExampleUrl} target="_blank" rel="noopener">
              Open the live example ↗
            </a>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container grid gap-10 lg:grid-cols-2">
          <div>
            <SectionHeading eyebrow="Sunday" title="Four steps from a person." />
            <ol className="mt-8 space-y-4">
              {sunday.map((step, i) => (
                <li key={step} className="flex gap-4 border-t border-ink/10 pt-4 text-lg leading-8 text-ink/80">
                  <span className="font-display text-2xl font-semibold text-accent">0{i + 1}</span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
            <p className="mt-8 leading-7 text-ink/70">On Monday night, someone spends about ten minutes checking it.</p>
          </div>
          <div>
            <SectionHeading eyebrow="Then, on its own" title="Everything else." />
            <ul className="mt-8 space-y-4">
              {automatic.map((item) => (
                <li key={item} className="border-l-2 border-accent pl-4 text-lg leading-8 text-ink/80">{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-bone py-16">
        <div className="container">
          <SectionHeading eyebrow="Why it's different" title="Built once. Yours for good." />
          <div className="mt-8 grid gap-5 lg:grid-cols-3">
            {different.map((item) => (
              <div key={item.title} className="rounded-lg border border-ink/10 bg-paper p-6">
                <h3 className="font-display text-2xl font-semibold text-accent">{item.title}</h3>
                <p className="mt-3 leading-7 text-ink/70">{item.copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-bone py-16">
        <div className="container grid gap-5 md:grid-cols-2">
          <article className="reveal flex flex-col rounded-lg border border-ink/10 bg-paper p-6">
            <p className="text-xs font-semibold uppercase text-accent">Do it yourself</p>
            <h2 className="mt-4 font-display text-3xl font-semibold">Get the kit</h2>
            <p className="mt-2 font-display text-5xl font-semibold">{sermonPublishing.kitPrice}</p>
            <ul className="mt-6 flex-1 space-y-3">
              {[
                "The full build prompt for Claude Code or Codex",
                "A form that fills in the prompt with your church's answers",
                "A printable card for your Sunday volunteer",
                "Built on your accounts and keys, never ours",
                "Pay once. No subscription"
              ].map((item) => (
                <li className="border-t border-ink/10 pt-3 text-sm font-bold" key={item}>{item}</li>
              ))}
            </ul>
            <div className="mt-7">
              <CheckoutButton item="sermon-kit" variant="ghost">Buy the kit</CheckoutButton>
              <p className="mt-3 text-xs font-bold text-ink/70">Instant download. All sales final. <a className="underline" href="/refunds">Refund policy</a></p>
            </div>
          </article>

          <article className="flex flex-col rounded-lg border-2 border-accent bg-paper p-6 text-ink">
            <p className="text-xs font-semibold uppercase text-accent">Done with you</p>
            <h2 className="mt-4 font-display text-3xl font-semibold">Have us build it with you</h2>
            <p className="mt-2 font-display text-5xl font-semibold">{sermonPublishing.setupPrice}</p>
            <ul className="mt-6 flex-1 space-y-3">
              {[
                "Live video sessions with you and whoever holds your accounts",
                "Built on your accounts and keys, never ours",
                "Tested on an old sermon before anything goes public",
                "Your Sunday volunteer walked through the four steps",
                "Fixes for the first 30 days after launch"
              ].map((item) => (
                <li className="border-t border-ink/20 pt-3 text-sm font-bold" key={item}>{item}</li>
              ))}
            </ul>
            <div className="mt-7">
              <CheckoutButton item="sermon-setup" variant="dark">Book setup</CheckoutButton>
              <p className="mt-3 text-xs font-bold text-ink/70">Full refund if we can't get it working. <a className="underline" href="/refunds">Refund policy</a></p>
            </div>
          </article>
        </div>
      </section>

      <section className="py-16">
        <div className="container">
          <SectionHeading eyebrow="Questions" title="Before you buy." />
          <dl className="mt-8 grid gap-5 lg:grid-cols-3">
            {faqs.map((item) => (
              <div key={item.q} className="rounded-lg border border-ink/10 bg-bone p-6">
                <dt className="font-display text-2xl font-semibold">{item.q}</dt>
                <dd className="mt-3 leading-7 text-ink/70">{item.a}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
    </main>
  );
}
