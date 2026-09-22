import Link from "next/link";
import { Job, formatSalary } from "@/lib/data";
import MatchScoreBadge from "./MatchScoreBadge";

export default function JobCard({ job }: { job: Job }) {
  return (
    <Link
      href={`/jobs/${job.slug}`}
      className="focus-ring block rule-b py-6 transition-colors hover:bg-paperdim/40 first:pt-0"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="text-xs text-ink-faint">
            {job.companyName} · {job.location} · {job.remote}
          </p>
          <h3 className="mt-1 font-serif text-lg font-semibold text-ink">{job.title}</h3>
          <p className="mt-2 text-sm text-ink-soft">{formatSalary(job)}</p>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {job.tags.slice(0, 4).map((t) => (
              <span key={t} className="rounded-full border border-line px-2.5 py-0.5 text-xs text-ink-soft">
                {t}
              </span>
            ))}
          </div>
        </div>
        <MatchScoreBadge score={job.matchScore} />
      </div>
      <p className="mt-3 text-xs text-ink-faint">
        Опубликовано {job.postedDaysAgo === 1 ? "1 день" : `${job.postedDaysAgo} дн.`} назад · {job.seniority}
      </p>
    </Link>
  );
}
