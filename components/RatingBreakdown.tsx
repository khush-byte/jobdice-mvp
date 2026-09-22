type Row = { label: string; weight?: number; score: number; source: string };

export default function RatingBreakdown({ rows, overall }: { rows: Row[]; overall?: number }) {
  return (
    <div>
      {overall !== undefined && (
        <div className="mb-6 flex items-end gap-3">
          <span className="font-serif text-5xl font-bold tracking-tight text-slate-950">{overall}</span>
          <span className="pb-1 text-xs text-slate-500">/ 100<br />составной индекс</span>
        </div>
      )}
      <div className="divide-y divide-slate-100 rounded-2xl border border-slate-200 bg-white">
        {rows.map((r) => (
          <div key={r.label} className="grid grid-cols-[1fr_auto] items-center gap-4 px-4 py-4 first:rounded-t-2xl last:rounded-b-2xl">
            <div>
              <p className="text-sm font-semibold text-slate-900">{r.label}</p>
              <p className="mt-0.5 text-xs text-slate-400">{r.source}{r.weight !== undefined ? ` · вес ${r.weight}%` : ""}</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="hidden h-2 w-28 overflow-hidden rounded-full bg-slate-100 sm:block"><div className="h-full rounded-full bg-emerald-500" style={{ width: `${r.score}%` }} /></div>
              <span className="w-8 text-right font-mono text-sm font-semibold text-slate-700">{r.score}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
