import Link from "next/link";
import { jobs, getCandidate } from "@/lib/data";
import MatchScoreBadge from "@/components/MatchScoreBadge";
import { formatSalary } from "@/lib/data";

const applications = [
  { jobSlug: "product-designer-nordwind", stage: "Интервью", updated: "2 дня назад" },
  { jobSlug: "frontend-react-atlas", stage: "Отклик отправлен", updated: "5 дней назад" },
];

const savedJobs = ["backend-go-nordwind"];

export default function CandidateDashboard() {
  const candidate = getCandidate("aisha-nurlanova")!;

  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      <div className="rule-b flex flex-wrap items-start justify-between gap-6 pb-6">
        <div>
          <p className="text-sm text-ink-faint">Личный кабинет</p>
          <h1 className="mt-1 font-serif text-3xl font-semibold">Здравствуйте, {candidate.name.split(" ")[0]}</h1>
        </div>
        <div className="flex items-center gap-3">
          <MatchScoreBadge score={candidate.ratingOverall} />
          <Link
            href={`/candidates/${candidate.slug}`}
            className="focus-ring rounded border border-ink px-4 py-2 text-sm font-medium hover:bg-paperdim"
          >
            Открыть моё досье
          </Link>
        </div>
      </div>

      <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_320px]">
        <div className="space-y-10">
          <section>
            <h2 className="font-serif text-xl font-semibold">Мои отклики</h2>
            <div className="mt-4 divide-y divide-line rounded border border-line bg-white">
              {applications.map((a) => {
                const job = jobs.find((j) => j.slug === a.jobSlug)!;
                return (
                  <div key={a.jobSlug} className="flex items-center justify-between gap-4 p-4">
                    <div>
                      <Link href={`/jobs/${job.slug}`} className="focus-ring font-medium hover:underline">
                        {job.title}
                      </Link>
                      <p className="text-xs text-ink-faint">{job.companyName} · {a.updated}</p>
                    </div>
                    <span className="stamp">{a.stage}</span>
                  </div>
                );
              })}
            </div>
          </section>

          <section>
            <h2 className="font-serif text-xl font-semibold">Сохранённые вакансии</h2>
            <div className="mt-4 divide-y divide-line rounded border border-line bg-white">
              {savedJobs.map((slug) => {
                const job = jobs.find((j) => j.slug === slug)!;
                return (
                  <div key={slug} className="flex items-center justify-between gap-4 p-4">
                    <div>
                      <Link href={`/jobs/${job.slug}`} className="focus-ring font-medium hover:underline">
                        {job.title}
                      </Link>
                      <p className="text-xs text-ink-faint">{job.companyName} · {formatSalary(job)}</p>
                    </div>
                    <MatchScoreBadge score={job.matchScore} size="sm" />
                  </div>
                );
              })}
            </div>
          </section>

          <section>
            <h2 className="font-serif text-xl font-semibold">Карьерный трек</h2>
            <div className="mt-4 rounded border border-line bg-white p-5">
              <p className="text-sm text-ink-soft">
                Ваш профиль ближе всего к позиции <strong>Lead Product Designer</strong>. Недостающие компетенции:
              </p>
              <ul className="mt-3 space-y-1.5 text-sm text-ink-soft">
                <li>— Управление командой дизайнеров (нет подтверждённого опыта)</li>
                <li>— Стратегическое планирование продукта</li>
              </ul>
              <p className="mt-3 text-xs text-ink-faint">Прогноз: около 10–14 месяцев при текущей динамике роста навыков.</p>
            </div>
          </section>
        </div>

        <aside className="space-y-6">
          <div className="rounded border border-line bg-white p-5">
            <p className="text-xs font-medium uppercase tracking-wide text-ink-faint">Профиль заполнен на</p>
            <p className="mt-2 font-serif text-3xl font-semibold">82%</p>
            <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-paperdim">
              <div className="h-full bg-ink" style={{ width: "82%" }} />
            </div>
            <ul className="mt-4 space-y-1.5 text-sm text-ink-soft">
              <li>✓ Мастер-резюме</li>
              <li>✓ Подтверждённый опыт</li>
              <li>— Видео-визитка не загружена</li>
            </ul>
          </div>
          <div className="rounded border border-line bg-white p-5">
            <p className="text-xs font-medium uppercase tracking-wide text-ink-faint">Релокационный модуль</p>
            <p className="mt-2 text-sm text-ink-soft">
              Открыты к переезду в Ташкент? Стоимость жизни примерно на 18% ниже, чем в Алматы.
            </p>
            <button className="focus-ring mt-3 text-sm font-medium underline underline-offset-4">
              Посмотреть подробный расчёт
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
}
