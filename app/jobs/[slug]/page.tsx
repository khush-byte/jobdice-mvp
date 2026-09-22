import Link from "next/link";
import { notFound } from "next/navigation";
import { jobs, getJob, getCompany, formatSalary } from "@/lib/data";
import MatchScoreBadge from "@/components/MatchScoreBadge";
import VerifiedBadge from "@/components/VerifiedBadge";

export function generateStaticParams() {
  return jobs.map((j) => ({ slug: j.slug }));
}

export default function JobDetailPage({ params }: { params: { slug: string } }) {
  const job = getJob(params.slug);
  if (!job) notFound();
  const company = getCompany(job.companySlug);

  return (
    <div className="mx-auto max-w-5xl px-6 py-10">
      <Link href="/jobs" className="focus-ring text-sm text-ink-faint hover:text-ink">
        ← Все вакансии
      </Link>

      <div className="mt-4 flex items-start justify-between gap-6 rule-b pb-8">
        <div>
          <p className="text-sm text-ink-faint">
            <Link href={`/companies/${job.companySlug}`} className="focus-ring underline underline-offset-4 hover:text-ink">
              {job.companyName}
            </Link>{" "}
            · {job.location} · {job.remote}
          </p>
          <h1 className="mt-2 font-serif text-3xl font-semibold">{job.title}</h1>
          <p className="mt-3 text-lg text-ink-soft">{formatSalary(job)}</p>
          <p className="mt-1 text-xs text-ink-faint">
            Опубликовано {job.postedDaysAgo} дн. назад · Уровень: {job.seniority}
          </p>
        </div>
        <div className="flex flex-none flex-col items-center gap-2">
          <MatchScoreBadge score={job.matchScore} size="lg" />
          <button className="focus-ring rounded bg-ink px-5 py-2.5 text-sm font-medium text-paper hover:opacity-90">
            Откликнуться
          </button>
        </div>
      </div>

      <div className="mt-8 grid gap-10 md:grid-cols-[1fr_320px]">
        <div className="space-y-8">
          <section>
            <h2 className="font-serif text-xl font-semibold">О вакансии</h2>
            <p className="mt-3 text-sm leading-relaxed text-ink-soft">{job.description}</p>
          </section>

          <section>
            <h2 className="font-serif text-xl font-semibold">Обязанности</h2>
            <ul className="mt-3 space-y-2">
              {job.responsibilities.map((r) => (
                <li key={r} className="flex gap-2 text-sm text-ink-soft">
                  <span className="text-ink-faint">—</span> {r}
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="font-serif text-xl font-semibold">Требования</h2>
            <ul className="mt-3 space-y-2">
              {job.requirements.map((r) => (
                <li key={r} className="flex gap-2 text-sm text-ink-soft">
                  <span className="text-ink-faint">—</span> {r}
                </li>
              ))}
            </ul>
            {job.verifiedRequirements.length > 0 && (
              <div className="mt-4 space-y-2">
                {job.verifiedRequirements.map((v) => (
                  <div key={v} className="flex items-center gap-2">
                    <VerifiedBadge label="Обязательная верификация" />
                    <span className="text-sm text-ink-faint">{v}</span>
                  </div>
                ))}
              </div>
            )}
          </section>

          <section>
            <h2 className="font-serif text-xl font-semibold">Воронка найма</h2>
            <p className="mt-1 text-xs text-ink-faint">Аналитика видна только работодателю в кабинете — здесь для примера.</p>
            <div className="mt-4 flex items-end gap-6">
              {job.funnel.map((f, i) => {
                const max = job.funnel[0].count;
                const h = Math.max(12, Math.round((f.count / max) * 100));
                return (
                  <div key={f.stage} className="flex flex-col items-center gap-2">
                    <div className="flex h-24 w-10 items-end">
                      <div
                        className={i === job.funnel.length - 1 ? "w-full rounded-t bg-brass" : "w-full rounded-t bg-ink"}
                        style={{ height: `${h}%` }}
                      />
                    </div>
                    <p className="font-mono text-sm">{f.count}</p>
                    <p className="text-xs text-ink-faint">{f.stage}</p>
                  </div>
                );
              })}
            </div>
          </section>
        </div>

        <aside className="space-y-6">
          <div className="rounded border border-line bg-white p-5">
            <p className="text-xs font-medium uppercase tracking-wide text-ink-faint">Расшифровка Match Score</p>
            <p className="mt-2 text-sm text-ink-soft">{job.matchNote}</p>
            <div className="mt-4 space-y-3">
              {job.matchFactors.map((f) => (
                <div key={f.label}>
                  <div className="flex justify-between text-xs">
                    <span className="text-ink-soft">{f.label}</span>
                    <span className="font-mono text-ink-faint">{f.score}</span>
                  </div>
                  <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-paperdim">
                    <div className="h-full bg-ink" style={{ width: `${f.score}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {company && (
            <div className="rounded border border-line bg-white p-5">
              <p className="text-xs font-medium uppercase tracking-wide text-ink-faint">О компании</p>
              <p className="mt-2 font-serif text-lg font-semibold">{company.name}</p>
              <p className="text-sm text-ink-faint">{company.industry} · {company.size}</p>
              <p className="mt-3 text-sm text-ink-soft">Рейтинг компании: {company.ratingOverall}/100</p>
              <Link
                href={`/companies/${company.slug}`}
                className="focus-ring mt-3 inline-block text-sm font-medium underline underline-offset-4"
              >
                Открыть профиль компании
              </Link>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}
