function tone(score: number) {
  if (score >= 80) return { text: "text-seal", border: "border-seal", bg: "bg-seal-soft" };
  if (score >= 60) return { text: "text-brass", border: "border-brass", bg: "bg-brass-soft" };
  return { text: "text-clay", border: "border-clay", bg: "bg-clay-soft" };
}

export default function MatchScoreBadge({ score, size = "md" }: { score: number; size?: "sm" | "md" | "lg" }) {
  const t = tone(score);
  const dims =
    size === "lg" ? "h-20 w-20 text-2xl" : size === "sm" ? "h-11 w-11 text-sm" : "h-14 w-14 text-lg";
  return (
    <div
      className={`flex ${dims} flex-none flex-col items-center justify-center rounded border ${t.border} ${t.bg}`}
      title={`Match Score: ${score}%`}
    >
      <span className={`font-serif font-semibold leading-none ${t.text}`}>{score}</span>
      {size !== "sm" && <span className="mt-0.5 text-[10px] leading-none text-ink-faint">match</span>}
    </div>
  );
}
