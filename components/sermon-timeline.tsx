"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ArrowDown, Check } from "lucide-react";

const steps = [
  { time: "11:30 AM", label: "The volunteer posts", title: "Four steps start the whole thing.", copy: "Publish on YouTube. Name the preacher in the description. Add it to the Sermons playlist. Drop the audio in a folder.", kind: "upload" },
  { time: "11:42 AM", label: "The sermon page", title: "The website page appears.", copy: "The series, Scripture, speaker and video land on the church site, ready to watch.", kind: "page" },
  { time: "11:48 AM", label: "The transcript", title: "Captions become a transcript.", copy: "A word-for-word transcript follows the sermon video, making the message easier to read and search.", kind: "transcript" },
  { time: "11:52 AM", label: "The discussion guide", title: "A group guide is prepared.", copy: "A printable guide gives a group a clear place to begin its conversation.", kind: "guide" },
  { time: "12:00 PM", label: "Podcast + Facebook", title: "The message travels further.", copy: "A short summary and search keywords are ready. The audio becomes a podcast episode, and a post points people to the message on Facebook.", kind: "share" },
  { time: "Monday night", label: "A ten-minute check", title: "A person checks the work.", copy: "Someone reviews the run for about ten minutes. If a step breaks, the right person gets an email.", kind: "check" }
];

const example = {
  title: "Part of Sacrifice",
  date: "November 8, 2026",
  sermonUrl: "https://www.orbitchurch.org/watch/a-generous-life-part-of-sacrifice-romans-12-1-3-malachi-3-10-12/",
  videoUrl: "https://www.youtube.com/watch?v=XLxJzwf3dE4",
  videoId: "XLxJzwf3dE4",
  guideUrl: "https://www.orbitchurch.org/sermons-data/guides/XLxJzwf3dE4.pdf",
  spotifyUrl: "https://open.spotify.com/episode/19neoy784bOhzRMXNp2H8u",
  spotifyEmbed: "https://open.spotify.com/embed/episode/19neoy784bOhzRMXNp2H8u"
};

function StepPreview({ kind }: { kind: string }) {
  if (kind === "upload") return <figure className="orbit-media">
    <figcaption>Actual Orbit sermon · YouTube</figcaption>
    <div className="orbit-video-frame"><iframe src={`https://www.youtube-nocookie.com/embed/${example.videoId}?rel=0`} title="Part of Sacrifice, preached at Orbit Church on November 8, 2026" loading="lazy" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen /></div>
    <a href={example.videoUrl} target="_blank" rel="noopener noreferrer">Watch on YouTube ↗</a>
  </figure>;
  if (kind === "page") return <figure className="orbit-media orbit-sermon-card">
    <a href={example.sermonUrl} target="_blank" rel="noopener noreferrer" className="orbit-sermon-link">
      <Image src={`https://i.ytimg.com/vi/${example.videoId}/maxresdefault.jpg`} alt="Video thumbnail for Orbit Church’s Part of Sacrifice sermon" width={1280} height={720} sizes="(max-width: 760px) 100vw, 48vw" />
      <div className="orbit-sermon-info"><span>A GENEROUS LIFE · ORBIT CHURCH</span><strong>{example.title}</strong><small>{example.date} · Pastor Matt Rose</small><small>Romans 12:1–3 · Malachi 3:10–12</small><b>Open the live sermon page ↗</b></div>
    </a>
  </figure>;
  if (kind === "transcript") return <figure className="orbit-media orbit-transcript">
    <figcaption>From the actual sermon transcript</figcaption>
    <div className="orbit-transcript-page"><span>READ THE MESSAGE</span><h4>{example.title}</h4><blockquote>“When you offer your whole body as a living sacrifice, you grow in faith and others are blessed.”</blockquote><p>Pastor Matt Rose · Romans 12:1–3 and Malachi 3:10–12</p></div>
    <a href={`${example.sermonUrl}#transcript-title`} target="_blank" rel="noopener noreferrer">Read the full transcript ↗</a>
  </figure>;
  if (kind === "guide") return <figure className="orbit-media orbit-guide">
    <figcaption>The real discussion guide</figcaption>
    <div className="orbit-guide-cover"><span>ORBIT CHURCH · SMALL GROUPS</span><b>{example.title}</b><p>A conversation framework for a group, not a study to work through alone.</p><strong>17 questions · Romans 12 · Malachi 3</strong></div>
    <a href={example.guideUrl} target="_blank" rel="noopener noreferrer">Open the actual discussion guide PDF ↗</a>
  </figure>;
  if (kind === "share") return <figure className="orbit-media orbit-podcast">
    <figcaption>Actual Orbit podcast episode</figcaption>
    <iframe src={example.spotifyEmbed} title="Part of Sacrifice, Orbit Church podcast episode" width="100%" height="152" loading="lazy" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" />
    <a href={example.spotifyUrl} target="_blank" rel="noopener noreferrer">Open in Spotify ↗</a>
    <p>The same episode is also linked from the live sermon page alongside the video, transcript and guide.</p>
  </figure>;
  return <div className="orbit-media orbit-deliverables" aria-label="Published Orbit sermon materials">
    <p className="orbit-eyebrow">One real Sunday · {example.date}</p>
    <h4>{example.title}</h4>
    <ul>
      <li><Check aria-hidden /><a href={example.sermonUrl} target="_blank" rel="noopener noreferrer">Sermon page and transcript</a></li>
      <li><Check aria-hidden /><a href={example.guideUrl} target="_blank" rel="noopener noreferrer">Printable discussion guide</a></li>
      <li><Check aria-hidden /><a href={example.spotifyUrl} target="_blank" rel="noopener noreferrer">Podcast episode</a></li>
      <li><Check aria-hidden /><span>Facebook post published by the workflow</span></li>
    </ul>
    <a className="orbit-open-page" href={example.sermonUrl} target="_blank" rel="noopener noreferrer">See the live example ↗</a>
  </div>;
}

export function SermonTimeline() {
  const [active, setActive] = useState(0);
  useEffect(() => {
    const nodes = steps.map((_, index) => document.getElementById(`timeline-${index}`)).filter(Boolean) as HTMLElement[];
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) setActive(Number(visible.target.id.replace("timeline-", "")));
    }, { rootMargin: "-30% 0px -45% 0px", threshold: [0, 0.25, 0.6] });
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  return <div className="container timeline-layout">
    <aside className="timeline-rail" aria-label="Publishing timeline steps">
      <p className="mb-4 text-sm font-bold text-paper/60">The run of show</p>
      <ol>{steps.map((step, index) => <li key={step.time}><a href={`#timeline-${index}`} aria-label={`${step.time}: ${step.label}`} aria-current={active === index ? "step" : undefined} className={`timeline-link ${active === index ? "is-active" : ""}`}><span className="timeline-node">{active > index ? <Check aria-hidden className="h-3 w-3" /> : `0${index + 1}`}</span><span><strong>{step.time}</strong><small>{step.label}</small></span></a></li>)}</ol>
    </aside>
    <div className="timeline-steps">
      {steps.map((step, index) => <article id={`timeline-${index}`} key={step.time} className="timeline-step" tabIndex={-1}>
        <div className="timeline-step-copy"><p className="text-sm font-bold text-lime">{step.time}</p><h3 className="mt-3 font-display text-3xl font-black leading-tight tracking-[-0.035em] md:text-4xl">{step.title}</h3><p className="mt-4 max-w-md leading-7 text-paper/65">{step.copy}</p><a className="mt-6 inline-flex min-h-11 items-center gap-2 text-sm font-bold text-lime" href={index < steps.length - 1 ? `#timeline-${index + 1}` : "/resources/sermon-publishing#offers"}>{index < steps.length - 1 ? <>Next step <ArrowDown aria-hidden className="h-4 w-4" /></> : "See the kit and setup"}</a></div>
        <StepPreview kind={step.kind} />
      </article>)}
    </div>
  </div>;
}
