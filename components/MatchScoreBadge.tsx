function tone(score: number) {
  if (score >= 80) return { text: "text-emerald-700", ring: "ring-emerald-100", bg: "bg-emerald-50", label: "Сильное" };
  if (score >= 60) return { text: "text-amber-700", ring: "ring-amber-100", bg: "bg-amber-50", label: "Хорошее" };
  return { text: "text-rose-700", ring: "ring-rose-100", bg: "bg-rose-50", label: "Ниже" };
}

export default function MatchScoreBadge({ score, size = "md" }: { score: number; size?: "sm" | "md" | "lg" }) {
  const t = tone(score);
  const dims = size === "lg" ? "h-24 w-24 text-2xl" : size === "sm" ? "h-12 w-12 text-sm" : "h-16 w-16 text-lg";
  return (
    <div className={`flex ${dims} flex-none flex-col items-center justify-center rounded-2xl ${t.bg} ${t.text} ring-1 ${t.ring}`} title={`Match Score: ${score}%`}>
      <span className="font-serif font-bold leading-none">{score}%</span>
      {size !== "sm" && <span className="mt-1 text-[9px] font-semibold uppercase tracking-wider opacity-70">match</span>}
    </div>
  );
}
