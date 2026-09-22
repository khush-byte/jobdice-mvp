import Link from "next/link";
import { jobs, companies } from "@/lib/data";
import JobCard from "@/components/JobCard";
import MatchScoreBadge from "@/components/MatchScoreBadge";

export default function HomePage() {
  const featured = jobs.slice(0, 3);

  return (
    <div>
      {/* Hero */}
      <section className="mx-auto max-w-6xl px-6 pb-14 pt-16 md:pt-24">
        <div className="grid gap-12 md:grid-cols-[1.2fr_1fr] md:items-center">
          <div>
            <p className="stamp mb-5">
              <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden="true">
                <path d="M1 5.3L3.6 8 9 1.5" stroke="#2F6F52" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Цифровое досье вместо резюме на слово
            </p>
            <h1 className="font-serif text-4xl font-semibold leading-[1.1] tracking-tight text-ink md:text-5xl">
              Наём, где каждое утверждение можно проверить
            </h1>
            <p className="mt-5 max-w-prose text-lg text-ink-soft">
              JobDice подтверждает опыт, навыки и условия труда через коллег, работодателей и документы —
              с обеих сторон рынка труда одновременно.
            </p>
            <form className="mt-8 flex max-w-lg flex-col gap-2 sm:flex-row">
              <input
                type="text"
                placeholder="Должность, навык или компания"
                className="focus-ring w-full rounded border border-line bg-white px-4 py-3 text-sm text-ink placeholder:text-ink-faint"
              />
              <Link
                href="/jobs"
                className="focus-ring flex items-center justify-center rounded bg-ink px-5 py-3 text-sm font-medium text-paper hover:opacity-90"
              >
                Искать вакансии
              </Link>
            </form>
            <div className="mt-10 grid grid-cols-3 gap-6 border-t border-line pt-6 sm:max-w-md">
              <Stat value="12 400+" label="верифицированных досье" />
              <Stat value="860+" label="проверенных компаний" />
              <Stat value="21 день" label="средний срок найма" />
            </div>
          </div>
          <div className="rounded border border-line bg-white p-6">
            <p className="text-xs uppercase tracking-wide text-ink-faint">Пример досье компании</p>
            <div className="mt-4 flex items-center gap-4">
              <MatchScoreBadge score={companies[2].ratingOverall} size="lg" />
              <div>
                <p className="font-serif text-lg font-semibold">{companies[2].name}</p>
                <p className="text-sm text-ink-faint">{companies[2].industry} · {companies[2].hq}</p>
              </div>
            </div>
            <dl className="mt-5 space-y-2 border-t border-line pt-4 text-sm">
              <Row label="Нанято за год" value={String(companies[2].hiredLastYear)} />
              <Row label="Срок закрытия вакансии" value={`${companies[2].avgTimeToHireDays} дн.`} />
              <Row label="Текучесть кадров" value={companies[2].turnoverRate} />
            </dl>
            <Link
              href={`/companies/${companies[2].slug}`}
              className="focus-ring mt-5 inline-block text-sm font-medium text-ink underline underline-offset-4"
            >
              Открыть профиль компании
            </Link>
          </div>
        </div>
      </section>

      {/* Differentiators */}
      <section className="rule-b rule bg-white py-16">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="font-serif text-2xl font-semibold">Чем это отличается от обычного джоб-борда</h2>
          <div className="mt-8 grid gap-8 md:grid-cols-3">
            <Feature
              title="Двусторонний AI-скоринг"
              text="Платформа считает не только насколько кандидат подходит вакансии, но и насколько компания подходит кандидату — включая культуру и формат работы."
            />
            <Feature
              title="Слепой обмен отзывами"
              text="Отзывы работодателя и кандидата раскрываются только после того, как обе стороны их оставили — это снижает предвзятость и месть за честную оценку."
            />
            <Feature
              title="Скрытый поиск"
              text="До отклика работодатель видит обезличенный профиль — без имени, фото, пола и возраста, — что снижает неосознанную дискриминацию."
            />
          </div>
        </div>
      </section>

      {/* Featured jobs */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="flex items-end justify-between">
          <h2 className="font-serif text-2xl font-semibold">Свежие вакансии с высоким совпадением</h2>
          <Link href="/jobs" className="focus-ring text-sm font-medium text-ink underline underline-offset-4">
            Все вакансии
          </Link>
        </div>
        <div className="mt-6">
          {featured.map((j) => (
            <JobCard key={j.slug} job={j} />
          ))}
        </div>
      </section>

      {/* For employers */}
      <section className="rule bg-ink py-16 text-paper">
        <div className="mx-auto grid max-w-6xl gap-8 px-6 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <h2 className="font-serif text-2xl font-semibold">Нанимаете команду?</h2>
            <p className="mt-3 max-w-prose text-paper/75">
              Публикуйте вакансии с верифицированными требованиями, отслеживайте воронку от просмотра до оффера
              и получайте кандидатов, чей опыт уже подтверждён.
            </p>
          </div>
          <Link
            href="/dashboard/employer"
            className="focus-ring inline-flex items-center justify-center rounded bg-paper px-5 py-3 text-sm font-medium text-ink hover:opacity-90"
          >
            Открыть кабинет работодателя
          </Link>
        </div>
      </section>
    </div>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <p className="font-serif text-xl font-semibold">{value}</p>
      <p className="text-xs text-ink-faint">{label}</p>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between">
      <dt className="text-ink-faint">{label}</dt>
      <dd className="font-medium text-ink">{value}</dd>
    </div>
  );
}

function Feature({ title, text }: { title: string; text: string }) {
  return (
    <div className="border-t border-line pt-4">
      <h3 className="font-medium text-ink">{title}</h3>
      <p className="mt-2 text-sm text-ink-faint">{text}</p>
    </div>
  );
}
