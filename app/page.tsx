import Link from "next/link";
import { jobs, companies } from "@/lib/data";
import JobCard from "@/components/JobCard";
import MatchScoreBadge from "@/components/MatchScoreBadge";
import VerifiedBadge from "@/components/VerifiedBadge";

export default function HomePage() {
  const featured = jobs.slice(0, 3);
  const company = companies[2];

  return (
    <div>
      <section className="relative overflow-hidden bg-slate-950 text-white">
        <div className="hero-grid absolute inset-0 opacity-70" />
        <div className="absolute -right-32 -top-40 h-96 w-96 rounded-full bg-emerald-400/15 blur-3xl" />
        <div className="relative mx-auto max-w-7xl px-5 pb-20 pt-14 lg:px-8 lg:pb-24 lg:pt-20">
          <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_.95fr]">
            <div>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold text-emerald-300">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> Цифровое досье вместо резюме на слово
              </div>
              <h1 className="max-w-3xl font-serif text-5xl font-bold leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl">Найм, которому можно доверять.</h1>
              <p className="mt-6 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">JobDice объединяет вакансии, проверяемый опыт, репутацию и AI-матчинг, чтобы обе стороны рынка труда видели больше реальных данных.</p>

              <form className="mt-8 flex max-w-2xl flex-col gap-2 rounded-2xl border border-white/10 bg-white/5 p-2 backdrop-blur sm:flex-row">
                <div className="flex min-w-0 flex-1 items-center gap-3 rounded-xl bg-white px-4 py-3 text-slate-500"><span>⌕</span><input aria-label="Поиск вакансий" type="text" placeholder="Должность, навык или компания" className="min-w-0 flex-1 bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400" /></div>
                <Link href="/jobs" className="focus-ring inline-flex items-center justify-center rounded-xl bg-emerald-400 px-5 py-3 text-sm font-bold text-slate-950 transition hover:bg-emerald-300">Искать вакансии <span className="ml-2">→</span></Link>
              </form>

              <div className="mt-9 grid max-w-xl grid-cols-3 gap-4 border-t border-white/10 pt-6">
                <Stat value="12 400+" label="верифицированных досье" />
                <Stat value="860+" label="проверенных компаний" />
                <Stat value="21 день" label="средний срок найма" />
              </div>
            </div>

            <div className="relative lg:pl-8">
              <div className="soft-glow rounded-3xl border border-white/10 bg-white p-5 text-slate-950 sm:p-6">
                <div className="flex items-center justify-between">
                  <div><p className="eyebrow">Пример цифрового досье</p><p className="mt-1 font-serif text-xl font-bold">{company.name}</p></div>
                  <VerifiedBadge label="Компания проверена" />
                </div>
                <div className="mt-6 flex items-center gap-4 rounded-2xl bg-slate-50 p-4">
                  <MatchScoreBadge score={company.ratingOverall} size="lg" />
                  <div><p className="text-sm font-semibold text-slate-900">Индекс доверия</p><p className="mt-1 text-xs leading-5 text-slate-500">Отзывы, обратная связь, соответствие вакансий и юридическая чистота.</p></div>
                </div>
                <div className="mt-4 grid grid-cols-3 gap-2">
                  <MiniStat label="Нанято за год" value={String(company.hiredLastYear)} />
                  <MiniStat label="Закрытие" value={`${company.avgTimeToHireDays} дн.`} />
                  <MiniStat label="Текучесть" value={company.turnoverRate} />
                </div>
                <Link href={`/companies/${company.slug}`} className="mt-5 flex items-center justify-between rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50">Открыть профиль компании <span>→</span></Link>
              </div>
              <div className="absolute -bottom-5 -left-1 hidden rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-xl sm:block"><p className="text-[10px] font-semibold uppercase tracking-widest text-slate-400">AI Match Score</p><p className="mt-1 text-sm font-bold text-emerald-700">Объяснимый результат</p></div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
        <div className="max-w-2xl"><p className="eyebrow">Почему JobDice</p><h2 className="mt-2 font-serif text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">Не просто джоб-борд — система доверия.</h2><p className="mt-4 text-slate-500">Концепция платформы строится вокруг верифицируемой репутации обеих сторон, прозрачного AI-матчинга и персональных цифровых досье.</p></div>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          <Feature icon="✓" title="Верифицированная репутация" text="Опыт, навыки, рекомендации и документы могут подтверждаться третьими сторонами." />
          <Feature icon="↔" title="Двусторонний Match Score" text="Кандидат оценивает не только соответствие вакансии, но и совместимость с компанией." />
          <Feature icon="✦" title="AI-ассистент на каждом этапе" text="Помощь с резюме, вакансией, подбором, интервью и следующими карьерными шагами." />
        </div>
      </section>

      <section className="border-y border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><div><p className="eyebrow">Подходящие возможности</p><h2 className="mt-2 font-serif text-3xl font-bold tracking-tight text-slate-950">Вакансии с объяснимым совпадением</h2></div><Link href="/jobs" className="text-sm font-semibold text-emerald-700 hover:text-emerald-800">Смотреть все →</Link></div>
          <div className="mt-7 grid gap-4">{featured.map((j) => <JobCard key={j.slug} job={j} />)}</div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
        <div className="grid gap-5 lg:grid-cols-2">
          <RoleCard title="Для соискателя" text="Создайте цифровое досье, соберите мастер-резюме, подтвердите навыки и получайте вакансии с понятным Match Score." href="/dashboard/candidate" cta="Открыть кабинет" />
          <RoleCard title="Для работодателя" text="Публикуйте прозрачные вакансии, управляйте воронкой найма и работайте с кандидатами, чей опыт можно проверить." href="/dashboard/employer" cta="Открыть ATS-кабинет" dark />
        </div>
      </section>
    </div>
  );
}

function Stat({ value, label }: { value: string; label: string }) { return <div><p className="font-serif text-xl font-bold text-white sm:text-2xl">{value}</p><p className="mt-1 text-[11px] leading-4 text-slate-400">{label}</p></div>; }
function MiniStat({ label, value }: { label: string; value: string }) { return <div className="rounded-xl bg-slate-50 p-3"><p className="text-[10px] text-slate-400">{label}</p><p className="mt-1 text-sm font-bold text-slate-900">{value}</p></div>; }
function Feature({ icon, title, text }: { icon: string; title: string; text: string }) { return <div className="surface surface-hover p-6"><div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 font-bold text-emerald-700">{icon}</div><h3 className="mt-5 font-serif text-xl font-bold text-slate-950">{title}</h3><p className="mt-2 text-sm leading-6 text-slate-500">{text}</p></div>; }
function RoleCard({ title, text, href, cta, dark = false }: { title: string; text: string; href: string; cta: string; dark?: boolean }) { return <div className={`rounded-3xl p-7 sm:p-8 ${dark ? "bg-slate-950 text-white" : "bg-emerald-50 text-slate-950"}`}><p className={`eyebrow ${dark ? "text-emerald-300" : "text-emerald-700"}`}>{dark ? "ATS · Employer" : "Profile · Career"}</p><h3 className="mt-3 font-serif text-3xl font-bold">{title}</h3><p className={`mt-3 max-w-xl text-sm leading-6 ${dark ? "text-slate-300" : "text-slate-600"}`}>{text}</p><Link href={href} className={`mt-7 inline-flex rounded-xl px-4 py-2.5 text-sm font-semibold ${dark ? "bg-white text-slate-950 hover:bg-slate-100" : "bg-slate-950 text-white hover:bg-slate-800"}`}>{cta} →</Link></div>; }
