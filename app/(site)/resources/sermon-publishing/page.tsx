import { CheckoutButton } from "@/components/checkout-button";
import { SectionHeading } from "@/components/section";
import { sermonPublishing } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata(
  "Sermon Publishing",
  "Publish a sermon on YouTube and the rest happens on its own: website page, transcript, summary, discussion guide, podcast episode and Facebook post. Kit $15, setup $250.",
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
      <section className="bg-ink py-20 text-paper dark-grid">
        <div className="container grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <SectionHeading
            light
            eyebrow="Resource"
            title="Sermon Publishing"
            copy="One volunteer does four things on Sunday. Within about half an hour, the sermon is on your website with a transcript, a summary, a discussion guide, a podcast episode and a Facebook post."
          />
          <div className="border border-white/15 bg-white/5 p-5 text-paper/70">
            <p className="font-bold text-paper">See it on a live church site</p>
            <p className="mt-2 leading-7">Orbit Church in Buckeye, Arizona publishes its sermons this way every Sunday. Open any recent sermon to see the transcript, summary and discussion guide.</p>
            <a className="mt-4 inline-block text-sm font-black uppercase text-lime hover:text-bone" href={sermonPublishing.liveExampleUrl} target="_blank" rel="noopener">
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
                <li key={step} className="flex gap-4 border-t border-ink/15 pt-4 text-lg leading-8 text-ink/80">
                  <span className="font-display text-2xl font-black text-cobalt">0{i + 1}</span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
            <p className="mt-8 leading-7 text-ink/65">On Monday night, someone spends about ten minutes checking it.</p>
          </div>
          <div>
            <SectionHeading eyebrow="Then, on its own" title="Everything else." />
            <ul className="mt-8 space-y-4">
              {automatic.map((item) => (
                <li key={item} className="border-l-4 border-cobalt pl-4 text-lg leading-8 text-ink/80">{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-bone py-16">
        <div className="container grid gap-5 md:grid-cols-2">
          <article className="flex flex-col border border-ink/15 bg-paper p-6">
            <p className="text-xs font-black uppercase text-cobalt">Do it yourself</p>
            <h2 className="mt-4 font-display text-3xl font-black">Get the kit</h2>
            <p className="mt-2 font-display text-5xl font-black">{sermonPublishing.kitPrice}</p>
            <ul className="mt-6 flex-1 space-y-3">
              {[
                "The full build prompt for Claude Code or Codex",
                "A form that fills in the prompt with your church's answers",
                "A printable card for your Sunday volunteer",
                "Built on your accounts and keys, never ours"
              ].map((item) => (
                <li className="border-t border-ink/15 pt-3 text-sm font-bold" key={item}>{item}</li>
              ))}
            </ul>
            <div className="mt-7">
              <CheckoutButton item="sermon-kit" variant="ghost">Buy the kit</CheckoutButton>
              <p className="mt-3 text-xs font-bold text-ink/55">Instant download. All sales final. <a className="underline" href="/refunds">Refund policy</a></p>
            </div>
          </article>

          <article className="flex flex-col border border-ink bg-lime p-6 text-ink shadow-line">
            <p className="text-xs font-black uppercase text-cobalt">Done with you</p>
            <h2 className="mt-4 font-display text-3xl font-black">Have us build it with you</h2>
            <p className="mt-2 font-display text-5xl font-black">{sermonPublishing.setupPrice}</p>
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
              <div key={item.q} className="border border-ink/15 bg-bone p-6">
                <dt className="font-display text-2xl font-black">{item.q}</dt>
                <dd className="mt-3 leading-7 text-ink/70">{item.a}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
    </main>
  );
}
