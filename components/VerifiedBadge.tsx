export default function VerifiedBadge({
  label = "Подтверждено",
  verified = true,
}: {
  label?: string;
  verified?: boolean;
}) {
  if (!verified) {
    return (
      <span className="inline-flex items-center gap-1 rounded-full border border-line px-2.5 py-0.5 text-xs text-ink-faint">
        <span aria-hidden="true">○</span> Не подтверждено
      </span>
    );
  }
  return (
    <span className="stamp">
      <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden="true">
        <path d="M1 5.3L3.6 8 9 1.5" stroke="#2F6F52" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      {label}
    </span>
  );
}
