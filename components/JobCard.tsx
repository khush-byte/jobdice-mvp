import Link from "next/link";
import { Job, formatSalary } from "@/lib/data";
import MatchScoreBadge from "./MatchScoreBadge";
import VerifiedBadge from "./VerifiedBadge";

export default function JobCard({ job }: { job: Job }) {
  return (
    <Link href={`/jobs/${job.slug}`} className="surface surface-hover focus-ring group block p-5 md:p-6">
      <div className="flex items-start justify-between gap-5">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold text-slate-500">{job.companyName}</span>
            <span className="text-slate-300">•</span>
            <span className="text-xs text-slate-500">{job.location}</span>
            <VerifiedBadge label="Проверенная вакансия" />
          </div>
          <h3 className="mt-2 font-serif text-xl font-bold tracking-tight text-slate-950 group-hover:text-emerald-700">{job.title}</h3>
          <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-slate-600">
            <span className="font-semibold text-slate-900">{formatSalary(job)}</span>
            <span>{job.remote}</span>
            <span>{job.seniority}</span>
          </div>
          <div className="mt-4 flex flex-wrap gap-1.5">
            {job.tags.slice(0, 4).map((t) => (
              <span key={t} className="rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">{t}</span>
            ))}
          </div>
        </div>
        <MatchScoreBadge score={job.matchScore} />
      </div>
      <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4 text-xs text-slate-400">
        <span>Опубликовано {job.postedDaysAgo === 1 ? "вчера" : `${job.postedDaysAgo} дн. назад`}</span>
        <span className="font-semibold text-slate-600 transition group-hover:text-emerald-700">Подробнее →</span>
      </div>
    </Link>
  );
}
