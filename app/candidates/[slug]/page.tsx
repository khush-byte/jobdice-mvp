import { notFound } from "next/navigation";
import { candidates, getCandidate, getReviewsFor } from "@/lib/data";
import VerifiedBadge from "@/components/VerifiedBadge";
import MatchScoreBadge from "@/components/MatchScoreBadge";

export function generateStaticParams() {
  return candidates.map((c) => ({ slug: c.slug }));
}

export default function CandidatePage({ params }: { params: { slug: string } }) {
  const candidate = getCandidate(params.slug);
  if (!candidate) notFound();
  const reviews = getReviewsFor(candidate.slug);

  return (
    <div className="mx-auto max-w-5xl px-6 py-10">
      <div className="rule-b flex flex-wrap items-start justify-between gap-6 pb-8">
        <div>
          <p className="text-sm text-ink-faint">{candidate.title}</p>
          <h1 className="mt-1 font-serif text-3xl font-semibold">{candidate.name}</h1>
          <p className="mt-3 max-w-prose text-sm text-ink-soft">{candidate.summary}</p>
          <p className="mt-3 text-sm text-ink-faint">
            {candidate.location}
            {candidate.openToRelocation ? " · открыт(а) к переезду" : ""}
          </p>
        </div>
        <MatchScoreBadge score={candidate.ratingOverall} size="lg" />
      </div>

      <div className="mt-8 grid gap-10 md:grid-cols-[1fr_300px]">
        <div className="space-y-10">
          <section>
            <h2 className="font-serif text-xl font-semibold">Видео-визитка</h2>
            <div className="mt-3 flex aspect-video max-w-md items-center justify-center rounded border border-dashed border-line bg-white text-sm text-ink-faint">
              30–90 сек · заглушка плеера в демо-версии
            </div>
          </section>

          <section>
            <h2 className="font-serif text-xl font-semibold">Подтверждённый опыт</h2>
            <div className="mt-4 divide-y divide-line">
              {candidate.experience.map((e) => (
                <div key={e.role + e.company} className="py-4 first:pt-0">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <p className="font-medium text-ink">{e.role} · {e.company}</p>
                      <p className="text-xs text-ink-faint">{e.period}</p>
                    </div>
                    <VerifiedBadge verified={e.verified} />
                  </div>
                  <p className="mt-2 text-sm text-ink-soft">{e.description}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="font-serif text-xl font-semibold">Навыки</h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {candidate.skills.map((s) => (
                <span
                  key={s.name}
                  className={`flex items-center gap-1.5 rounded-full border px-3 py-1 text-sm ${
                    s.verified ? "border-seal bg-seal-soft text-seal" : "border-line text-ink-faint"
                  }`}
                >
                  {s.name}
                  {s.verified && (
                    <svg width="9" height="9" viewBox="0 0 10 10" aria-hidden="true">
                      <path d="M1 5.3L3.6 8 9 1.5" stroke="#2F6F52" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </span>
              ))}
            </div>
          </section>

          <section>
            <h2 className="font-serif text-xl font-semibold">Портфолио и сертификаты</h2>
            <ul className="mt-3 space-y-2">
              {candidate.portfolio.map((p) => (
                <li key={p.label} className="text-sm text-ink-soft underline underline-offset-4">
                  {p.label}
                </li>
              ))}
            </ul>
            <div className="mt-3 space-y-2">
              {candidate.certificates.map((c) => (
                <div key={c.name} className="flex items-center gap-2">
                  <VerifiedBadge verified={c.verified} label="Подтверждено эмитентом" />
                  <span className="text-sm text-ink-soft">{c.name} — {c.issuer}</span>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="font-serif text-xl font-semibold">Отзывы работодателей (слепой обмен)</h2>
            <div className="mt-4 divide-y divide-line">
              {reviews.map((r) => (
                <div key={r.id} className="py-4 first:pt-0">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">Отзыв работодателя</p>
                    <span className="font-mono text-sm text-ink-faint">{r.rating}/100</span>
                  </div>
                  <p className="mt-1 text-sm text-ink-soft">{r.text}</p>
                  <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-ink-faint">
                    {r.categories.map((c) => (
                      <span key={c.label}>{c.label}: {c.score}</span>
                    ))}
                  </div>
                </div>
              ))}
              {reviews.length === 0 && <p className="py-4 text-sm text-ink-faint">Пока нет раскрытых отзывов.</p>}
            </div>
          </section>
        </div>

        <aside className="space-y-6">
          <div className="rounded border border-line bg-white p-5">
            <p className="text-xs font-medium uppercase tracking-wide text-ink-faint">Из чего складывается рейтинг</p>
            <div className="mt-3 space-y-3">
              {candidate.ratingComponents.map((r) => (
                <div key={r.label} className="flex items-start gap-2">
                  <VerifiedBadge verified={r.verified} />
                  <div>
                    <p className="text-sm font-medium text-ink">{r.label}</p>
                    <p className="text-xs text-ink-faint">{r.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
