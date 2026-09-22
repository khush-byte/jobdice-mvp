type Row = { label: string; weight?: number; score: number; source: string };

export default function RatingBreakdown({ rows, overall }: { rows: Row[]; overall?: number }) {
  return (
    <div>
      {overall !== undefined && (
        <div className="mb-5 flex items-baseline gap-3">
          <span className="font-serif text-4xl font-semibold">{overall}</span>
          <span className="text-sm text-ink-faint">/ 100 — составной индекс из независимо проверяемых компонентов</span>
        </div>
      )}
      <div className="divide-y divide-line rule">
        {rows.map((r) => (
          <div key={r.label} className="grid grid-cols-[1fr_auto] items-center gap-x-4 gap-y-1 py-3">
            <div>
              <p className="text-sm font-medium text-ink">{r.label}</p>
              <p className="text-xs text-ink-faint">
                {r.source}
                {r.weight !== undefined ? ` · вес ${r.weight}%` : ""}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-1.5 w-28 overflow-hidden rounded-full bg-paperdim">
                <div
                  className="h-full bg-ink"
                  style={{ width: `${r.score}%` }}
                  aria-hidden="true"
                />
              </div>
              <span className="w-8 text-right font-mono text-sm text-ink-soft">{r.score}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
