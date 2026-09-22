import Link from "next/link";
import { notFound } from "next/navigation";
import { jobs, getJob, getCompany, formatSalary } from "@/lib/data";
import MatchScoreBadge from "@/components/MatchScoreBadge";
import VerifiedBadge from "@/components/VerifiedBadge";

export function generateStaticParams() { return jobs.map((j) => ({ slug: j.slug })); }

export default function JobDetailPage({ params }: { params: { slug: string } }) {
  const job = getJob(params.slug);
  if (!job) notFound();
  const company = getCompany(job.companySlug);

  return (
    <div className="mx-auto max-w-7xl px-5 py-8 lg:px-8 lg:py-10">
      <Link href="/jobs" className="text-sm font-semibold text-slate-500 hover:text-slate-950">← Все вакансии</Link>
      <div className="mt-5 rounded-3xl bg-slate-950 p-6 text-white sm:p-8 lg:p-10">
        <div className="flex flex-col justify-between gap-8 lg:flex-row">
          <div className="max-w-3xl">
            <div className="flex flex-wrap items-center gap-2 text-xs text-slate-300"><Link href={`/companies/${job.companySlug}`} className="font-semibold text-white hover:text-emerald-300">{job.companyName}</Link><span>•</span><span>{job.location}</span><span>•</span><span>{job.remote}</span><VerifiedBadge label="Вакансия проверена" /></div>
            <h1 className="mt-4 font-serif text-4xl font-bold tracking-tight sm:text-5xl">{job.title}</h1>
            <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm text-slate-300"><span className="font-semibold text-white">{formatSalary(job)}</span><span>{job.seniority}</span><span>Опубликовано {job.postedDaysAgo} дн. назад</span></div>
            <div className="mt-6 flex flex-wrap gap-2">{job.tags.map((t) => <span key={t} className="rounded-lg bg-white/10 px-2.5 py-1 text-xs font-medium text-slate-200">{t}</span>)}</div>
          </div>
          <div className="flex shrink-0 flex-row items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-4 lg:w-56 lg:flex-col lg:items-center lg:justify-center"><MatchScoreBadge score={job.matchScore} size="lg" /><div className="lg:text-center"><p className="text-sm font-semibold">Ваш Match Score</p><p className="mt-1 text-xs leading-5 text-slate-400">Результат объясняется факторами ниже.</p></div><button className="focus-ring rounded-xl bg-emerald-400 px-5 py-2.5 text-sm font-bold text-slate-950 hover:bg-emerald-300 lg:w-full">Откликнуться</button></div>
        </div>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_340px]">
        <main className="space-y-6">
          <Section title="О вакансии"><p>{job.description}</p></Section>
          <Section title="Обязанности"><List items={job.responsibilities} /></Section>
          <Section title="Требования"><List items={job.requirements} />{job.verifiedRequirements.length > 0 && <div className="mt-5 space-y-2">{job.verifiedRequirements.map((v) => <div key={v} className="flex flex-wrap items-center gap-2"><VerifiedBadge label="Обязательная верификация" /><span className="text-sm text-slate-500">{v}</span></div>)}</div>}</Section>
          <Section title="Воронка найма"><p className="text-xs text-slate-400">Демо-аналитика вакансии. В реальном продукте подробная воронка доступна работодателю.</p><div className="mt-6 grid grid-cols-4 gap-3">{job.funnel.map((f, i) => { const max = job.funnel[0].count; const h = Math.max(12, Math.round((f.count / max) * 100)); return <div key={f.stage} className="text-center"><div className="flex h-28 items-end justify-center rounded-xl bg-slate-50 p-2"><div className={`w-full max-w-12 rounded-lg ${i === job.funnel.length - 1 ? "bg-emerald-500" : "bg-slate-900"}`} style={{ height: `${h}%` }} /></div><p className="mt-2 font-mono text-sm font-semibold">{f.count}</p><p className="mt-1 text-[11px] text-slate-400">{f.stage}</p></div>; })}</div></Section>
        </main>

        <aside className="space-y-5">
          <div className="surface p-5"><p className="eyebrow">Объяснение Match Score</p><p className="mt-3 text-sm leading-6 text-slate-600">{job.matchNote}</p><div className="mt-5 space-y-4">{job.matchFactors.map((f) => <div key={f.label}><div className="flex justify-between gap-3 text-xs"><span className="text-slate-600">{f.label}</span><span className="font-mono font-semibold text-slate-900">{f.score}</span></div><div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-100"><div className="h-full rounded-full bg-emerald-500" style={{ width: `${f.score}%` }} /></div></div>)}</div></div>
          {company && <div className="surface p-5"><p className="eyebrow">О компании</p><Link href={`/companies/${company.slug}`} className="mt-2 block font-serif text-xl font-bold text-slate-950 hover:text-emerald-700">{company.name}</Link><p className="mt-1 text-sm text-slate-500">{company.industry} · {company.hq}</p><div className="mt-4 flex items-center gap-3"><MatchScoreBadge score={company.ratingOverall} size="sm" /><span className="text-xs leading-5 text-slate-500">Индекс компании на основе проверяемых компонентов.</span></div></div>}
        </aside>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) { return <section className="surface p-6 sm:p-7"><h2 className="font-serif text-2xl font-bold text-slate-950">{title}</h2><div className="mt-4 text-sm leading-7 text-slate-600">{children}</div></section>; }
function List({ items }: { items: string[] }) { return <ul className="space-y-3">{items.map((item) => <li key={item} className="flex gap-3"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" /><span>{item}</span></li>)}</ul>; }
