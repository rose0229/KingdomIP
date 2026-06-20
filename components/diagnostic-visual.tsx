export function DiagnosticVisual() {
  const rows = [
    ["Guest Path", 72],
    ["Website Clarity", 58],
    ["Follow-up", 41],
    ["Leadership Load", 84]
  ];

  return (
    <div className="relative min-h-[390px] overflow-hidden border border-white/15 bg-carbon p-5 shadow-glow" aria-label="Abstract audit scorecard visual">
      <div className="absolute right-0 top-0 h-28 w-28 border-b border-l border-lime/50 bg-lime text-ink">
        <div className="p-4 text-right font-display text-5xl font-black">K</div>
      </div>
      <div className="grid grid-cols-3 gap-3">
        <div className="h-24 border border-white/15 bg-white/5 p-3">
          <p className="text-xs font-black uppercase text-paper/50">Signal</p>
          <p className="mt-5 text-3xl font-black text-lime">84</p>
        </div>
        <div className="h-24 border border-white/15 bg-white/5 p-3">
          <p className="text-xs font-black uppercase text-paper/50">Drag</p>
          <p className="mt-5 text-3xl font-black text-orange">37</p>
        </div>
        <div className="h-24 border border-white/15 bg-white/5 p-3">
          <p className="text-xs font-black uppercase text-paper/50">Priority</p>
          <p className="mt-5 text-3xl font-black text-cobalt">03</p>
        </div>
      </div>
      <div className="mt-7 space-y-4">
        {rows.map(([label, score]) => (
          <div key={label}>
            <div className="mb-2 flex justify-between text-sm font-bold text-paper">
              <span>{label}</span>
              <span>{score}%</span>
            </div>
            <div className="h-3 bg-white/10">
              <div className="h-full bg-lime" style={{ width: `${score}%` }} />
            </div>
          </div>
        ))}
      </div>
      <div className="absolute bottom-5 right-5 max-w-[190px] border border-lime/40 bg-ink p-4">
        <p className="text-xs font-black uppercase text-lime">Priority finding</p>
        <p className="mt-2 text-sm leading-6 text-paper/75">Guests have three unclear next steps before they reach one obvious action.</p>
      </div>
    </div>
  );
}
