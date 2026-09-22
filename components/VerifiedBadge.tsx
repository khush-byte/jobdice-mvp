export default function VerifiedBadge({ label = "Подтверждено", verified = true }: { label?: string; verified?: boolean }) {
  if (!verified) {
    return <span className="inline-flex items-center gap-1 rounded-full border border-slate-200 px-2.5 py-1 text-[11px] font-medium text-slate-400">○ Не подтверждено</span>;
  }
  return (
    <span className="stamp">
      <svg width="11" height="11" viewBox="0 0 12 12" aria-hidden="true"><path d="m2.2 6.2 2.2 2.2 5-5" stroke="currentColor" strokeWidth="1.7" fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg>
      {label}
    </span>
  );
}
