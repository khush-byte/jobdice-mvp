export default function Timeline({ entries }: { entries: { year: string; title: string; detail: string }[] }) {
  return (
    <ol className="divide-y divide-line">
      {entries.map((e, i) => (
        <li key={i} className="grid grid-cols-[4.5rem_1fr] gap-4 py-4 first:pt-0">
          <span className="font-mono text-sm text-ink-faint">{e.year}</span>
          <div>
            <p className="text-sm font-medium text-ink">{e.title}</p>
            <p className="mt-0.5 text-sm text-ink-faint">{e.detail}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
