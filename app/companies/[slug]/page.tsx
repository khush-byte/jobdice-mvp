import Link from "next/link";
import { notFound } from "next/navigation";
import { companies, getCompany, getJob, getReviewsFor } from "@/lib/data";
import RatingBreakdown from "@/components/RatingBreakdown";
import Timeline from "@/components/Timeline";
import MatchScoreBadge from "@/components/MatchScoreBadge";

export function generateStaticParams() {
  return companies.map((c) => ({ slug: c.slug }));
}

export default function CompanyPage({ params }: { params: { slug: string } }) {
  const company = getCompany(params.slug);
  if (!company) notFound();
  const openJobs = company.openJobs.map((s) => getJob(s)).filter(Boolean);
  const reviews = getReviewsFor(company.slug);

  return (
    <div className="mx-auto max-w-5xl px-6 py-10">
      <div className="rule-b flex flex-wrap items-start justify-between gap-6 pb-8">
        <div>
          <p className="text-sm text-ink-faint">{company.industry} · {company.hq}</p>
          <h1 className="mt-1 font-serif text-3xl font-semibold">{company.name}</h1>
          <p className="mt-3 max-w-prose text-sm text-ink-soft">{company.about}</p>
          <div className="mt-4 flex flex-wrap gap-x-6 gap-y-1 text-sm text-ink-faint">
            <span>Основана: {company.founded}</span>
            <span>Штат: {company.size}</span>
          </div>
        </div>
        <MatchScoreBadge score={company.ratingOverall} size="lg" />
      </div>

      <div className="mt-8 grid gap-10 md:grid-cols-[1fr_300px]">
        <div className="space-y-10">
          <section>
            <h2 className="font-serif text-xl font-semibold">Рейтинг компании</h2>
            <p className="mt-1 text-sm text-ink-faint">Составной индекс из независимо проверяемых компонентов.</p>
            <div className="mt-4">
              <RatingBreakdown rows={company.ratingComponents} />
            </div>
          </section>

          <section>
            <h2 className="font-serif text-xl font-semibold">История компании</h2>
            <div className="mt-4">
              <Timeline entries={company.timeline} />
            </div>
          </section>

          <section>
            <h2 className="font-serif text-xl font-semibold">Отзывы (слепой обмен)</h2>
            <p className="mt-1 text-sm text-ink-faint">
              Раскрываются только после того, как обе стороны оставили свою оценку.
            </p>
            <div className="mt-4 divide-y divide-line">
              {reviews.length === 0 && <p className="py-4 text-sm text-ink-faint">Пока нет раскрытых отзывов.</p>}
              {reviews.map((r) => (
                <div key={r.id} className="py-4">
                  {r.blindRevealed ? (
                    <>
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium">Отзыв кандидата</p>
                        <span className="font-mono text-sm text-ink-faint">{r.rating}/100</span>
                      </div>
                      <p className="mt-1 text-sm text-ink-soft">{r.text}</p>
                      <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-ink-faint">
                        {r.categories.map((c) => (
                          <span key={c.label}>{c.label}: {c.score}</span>
                        ))}
                      </div>
                      <p className="mt-2 text-xs text-ink-faint">{r.daysAgo} дн. назад</p>
                    </>
                  ) : (
                    <p className="text-sm text-ink-faint">
                      Отзыв ожидает раскрытия — ответная сторона ещё не оставила оценку.
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        </div>

        <aside className="space-y-6">
          <div className="rounded border border-line bg-white p-5">
            <p className="text-xs font-medium uppercase tracking-wide text-ink-faint">Прозрачные метрики найма</p>
            <dl className="mt-3 space-y-2 text-sm">
              <div className="flex justify-between">
                <dt className="text-ink-faint">Нанято за год</dt>
                <dd className="font-medium">{company.hiredLastYear}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-ink-faint">Срок закрытия вакансии</dt>
                <dd className="font-medium">{company.avgTimeToHireDays} дн.</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-ink-faint">Текучесть кадров</dt>
                <dd className="font-medium">{company.turnoverRate}</dd>
              </div>
            </dl>
            <p className="mt-3 text-xs text-ink-faint">Раскрыто компанией добровольно — повышает доверие.</p>
          </div>

          <div className="rounded border border-line bg-white p-5">
            <p className="text-xs font-medium uppercase tracking-wide text-ink-faint">Открытые вакансии</p>
            <ul className="mt-3 space-y-3">
              {openJobs.map(
                (j) =>
                  j && (
                    <li key={j.slug}>
                      <Link href={`/jobs/${j.slug}`} className="focus-ring block text-sm hover:text-ink">
                        <span className="font-medium">{j.title}</span>
                        <span className="block text-xs text-ink-faint">{j.location} · {j.remote}</span>
                      </Link>
                    </li>
                  )
              )}
              {openJobs.length === 0 && <li className="text-sm text-ink-faint">Сейчас нет открытых вакансий.</li>}
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
}
