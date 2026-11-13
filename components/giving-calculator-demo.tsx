"use client";

import { useState } from "react";

const rhythms = [
  { key: "weekly", label: "Weekly income" },
  { key: "biweekly", label: "Biweekly income" },
  { key: "monthly", label: "Monthly income" },
  { key: "annual", label: "Annual income" }
] as const;

type Rhythm = (typeof rhythms)[number]["key"];

const giftsPerYear: Record<Rhythm, number> = { weekly: 52, biweekly: 26, monthly: 12, annual: 1 };
const rhythmLabel: Record<Rhythm, string> = { weekly: "weekly", biweekly: "biweekly", monthly: "monthly", annual: "monthly" };

export function GivingCalculatorDemo() {
  const [rhythm, setRhythm] = useState<Rhythm>("weekly");
  const [income, setIncome] = useState("");
  const [percent, setPercent] = useState(10);
  const [message, setMessage] = useState("");
  const [showNextStep, setShowNextStep] = useState(false);

  const gross = Number(income.replace(/[^0-9.]/g, "")) || 0;
  const amount = (gross * percent) / 100 / (rhythm === "annual" ? 12 : 1);
  const annualGiving = ((gross * percent) / 100) * giftsPerYear[rhythm];
  const tithe = (gross * 0.1) / (rhythm === "annual" ? 12 : 1);
  const offering = Math.max(0, amount - tithe);
  const money = (value: number) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(value);
  const period = rhythmLabel[rhythm];
  const help = percent < 10
    ? `Starting somewhere is worth celebrating. ${percent}% is not yet a full tithe, but it is a faithful place to begin.`
    : percent === 10
      ? "10% is the biblical tithe, the Old Testament standard of trusting God with a tenth of your first fruits."
      : `${percent}% includes a full tithe and an offering above and beyond it.`;
  const resultDetail = !gross
    ? "Choose your income rhythm, enter gross income, then adjust the percentage."
    : percent < 10
      ? "Every generous step matters. Start here with joy and let God lead your growth toward the biblical tithe of 10%."
      : percent === 10
        ? "A biblical tithe is the Old Testament standard of trusting God with a tenth of your first fruits."
        : "This is a full tithe plus generosity above and beyond the tenth.";
  const breakdown = !gross
    ? ""
    : percent < 10
      ? `${money(amount)} is your current planned giving amount.`
      : percent === 10
        ? `${money(tithe)} is the full tithe.`
        : `${money(tithe)} is the tithe. ${money(offering)} is an offering above and beyond the tithe.`;

  async function copyAmount() {
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(money(amount));
        return true;
      }
    } catch {
      // Clipboard access may not be available in every browser context.
    }
    return false;
  }

  async function saveAmount() {
    if (!amount) {
      setMessage("Enter an income amount first so there is an amount to save.");
      return;
    }
    const copied = await copyAmount();
    try {
      localStorage.setItem("giving-calculator-amount", money(amount));
    } catch {
      // The calculated amount remains visible even if local storage is unavailable.
    }
    setMessage(copied ? `${money(amount)} copied and ready to store.` : `${money(amount)} is your amount to pray about.`);
  }

  async function openSampleGivingStep() {
    if (amount) {
      const copied = await copyAmount();
      setMessage(copied ? `${money(amount)} copied. In the full tool, it carries to the giving page.` : `${money(amount)} is your sample giving amount.`);
    } else {
      setMessage("You can also choose any amount on your church’s giving page.");
    }
    setShowNextStep(true);
  }

  return (
    <div className="gc-demo">
      <section className="gc-theology" aria-labelledby="gc-theology-title">
        <p className="gc-eyebrow">A theology of generosity</p>
        <h2 id="gc-theology-title">When you give, you’re trusting God with your finances.</h2>
        <p>The world has a lot to say about how we should spend our wealth. We believe we are managers of God’s money, called to earn, spend and give in ways that honor him.</p>
        <p>In the Old Testament, the tithe was a pattern of consistent giving: the best of the first 10% brought to the local storehouse. It was a practice of trusting God to provide rather than living by self-reliance.</p>
        <blockquote>“Bring the whole tithe into the storehouse, that there may be food in my house.” <cite>Malachi 3:10</cite></blockquote>
        <p>The New Testament calls us toward radical, sacrificial generosity. Start somewhere, move toward the tithe and keep growing as God leads.</p>
        <div className="gc-three-p"><strong>The 3 P’s of biblical generosity</strong><span>Make it a Priority. Make it a Percentage. Make it a Progression.</span></div>
      </section>

      <section className="gc-calculator" aria-labelledby="gc-calculator-title">
        <div className="gc-intro">
          <p className="gc-eyebrow">Tithing calculator</p>
          <h2 id="gc-calculator-title">Build a faithful giving rhythm.</h2>
          <p>Estimate giving from your gross income before taxes. Choose your income rhythm, then adjust the percentage as you consider your next faithful step.</p>
        </div>

        {!showNextStep ? <>
          <div className="gc-rhythms" role="group" aria-label="Income rhythm">
            {rhythms.map((item) => <button key={item.key} type="button" aria-pressed={rhythm === item.key} onClick={() => { setRhythm(item.key); setMessage(""); }}>{item.label}</button>)}
          </div>

          <div className="gc-income-field">
            <label htmlFor="gc-income">Gross {rhythm} income</label>
            <input id="gc-income" inputMode="decimal" type="text" placeholder="$0.00" value={income} onChange={(event) => { setIncome(event.target.value); setMessage(""); }} aria-describedby="gc-privacy-note" autoComplete="off" />
            <small id="gc-privacy-note">Private by design: your income and calculated amount stay on this device and are never sent to Kingdom IP.</small>
          </div>

          <div className="gc-control">
            <div className="gc-dial" style={{ "--percent": percent } as React.CSSProperties} aria-hidden="true"><strong>{percent}%</strong></div>
            <div className="gc-range-wrap">
              <label className="gc-control-label" htmlFor="gc-percent">{percent === 10 ? "Biblical tithe" : "Giving percentage"}</label>
              <input id="gc-percent" type="range" min="0" max="100" step="1" value={percent} aria-valuetext={`${percent}% giving`} onChange={(event) => setPercent(Number(event.target.value))} />
              <div className="gc-range-labels" aria-hidden="true"><span>0%</span><span>20%</span><span>50%</span><span>100%</span></div>
              <p className="gc-help" aria-live="polite">{help}</p>
            </div>
          </div>

          <div className="gc-result" aria-live="polite">
            <p className="gc-result-label">{percent === 10 ? `Your calculated ${period} tithe` : `Your total ${period} tithe and offering`}</p>
            <strong className="gc-amount">{money(amount)}</strong>
            <p>That is about {money(annualGiving / 365)} a day.</p>
            {breakdown ? <p>{breakdown}</p> : null}
            <p>{resultDetail}</p>
          </div>

          <div className="gc-actions">
            <button type="button" onClick={saveAmount}>Copy and store amount to pray about</button>
            <button type="button" className="gc-primary" onClick={openSampleGivingStep}>Copy amount and set up a recurring gift</button>
          </div>
          <p className="gc-message" aria-live="polite">{message}</p>
          <p className="gc-next-step">You can begin where you are and grow as God leads.</p>
        </> : <div className="gc-next-card">
          <p className="gc-eyebrow">The next step</p>
          <h4>Your amount goes with you.</h4>
          <p>On your church’s giving page, Planning Center fills in the amount automatically. On other platforms, you can paste the copied amount. You choose whether and how often to give.</p>
          <p className="gc-next-amount">Sample amount: <strong>{money(amount)}</strong> per {period}.</p>
          <button type="button" onClick={() => setShowNextStep(false)}>Back to calculator</button>
          <p className="gc-next-step">This is a demo. In the full calculator, this step opens your church’s giving page.</p>
        </div>}
      </section>
    </div>
  );
}
