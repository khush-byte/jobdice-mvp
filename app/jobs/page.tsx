"use client";

import { useMemo, useState } from "react";
import { jobs } from "@/lib/data";
import JobCard from "@/components/JobCard";

const remoteOptions = ["Все форматы", "На месте", "Гибрид", "Удалённо"] as const;
const seniorityOptions = ["Все уровни", "Junior", "Middle", "Senior", "Lead"] as const;

export default function JobsPage() {
  const [query, setQuery] = useState("");
  const [remote, setRemote] = useState<(typeof remoteOptions)[number]>("Все форматы");
  const [seniority, setSeniority] = useState<(typeof seniorityOptions)[number]>("Все уровни");
  const [sort, setSort] = useState<"match" | "date">("match");

  const filtered = useMemo(() => {
    let list = jobs.filter((j) => {
      const q = query.trim().toLowerCase();
      const matchesQuery =
        !q ||
        j.title.toLowerCase().includes(q) ||
        j.companyName.toLowerCase().includes(q) ||
        j.tags.some((t) => t.toLowerCase().includes(q));
      const matchesRemote = remote === "Все форматы" || j.remote === remote;
      const matchesSeniority = seniority === "Все уровни" || j.seniority === seniority;
      return matchesQuery && matchesRemote && matchesSeniority;
    });
    list = [...list].sort((a, b) =>
      sort === "match" ? b.matchScore - a.matchScore : a.postedDaysAgo - b.postedDaysAgo
    );
    return list;
  }, [query, remote, seniority, sort]);

  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      <h1 className="font-serif text-3xl font-semibold">Вакансии</h1>
      <p className="mt-2 text-sm text-ink-faint">
        Match Score рассчитан для демонстрационного профиля «Айша Нурланова» — продуктовый дизайнер, финтех.
      </p>

      <div className="mt-8 grid gap-10 md:grid-cols-[240px_1fr]">
        <aside className="space-y-6">
          <div>
            <label className="text-xs font-medium uppercase tracking-wide text-ink-faint">Поиск</label>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Должность, навык, компания"
              className="focus-ring mt-2 w-full rounded border border-line bg-white px-3 py-2 text-sm placeholder:text-ink-faint"
            />
          </div>
          <FilterGroup
            title="Формат работы"
            options={remoteOptions}
            value={remote}
            onChange={(v) => setRemote(v as typeof remote)}
          />
          <FilterGroup
            title="Уровень"
            options={seniorityOptions}
            value={seniority}
            onChange={(v) => setSeniority(v as typeof seniority)}
          />
        </aside>

        <div>
          <div className="rule-b flex items-center justify-between pb-4">
            <p className="text-sm text-ink-faint">Найдено вакансий: {filtered.length}</p>
            <div className="flex items-center gap-2 text-sm">
              <span className="text-ink-faint">Сортировка:</span>
              <button
                onClick={() => setSort("match")}
                className={`focus-ring rounded px-2 py-1 ${sort === "match" ? "bg-ink text-paper" : "text-ink-soft hover:bg-paperdim"}`}
              >
                По совпадению
              </button>
              <button
                onClick={() => setSort("date")}
                className={`focus-ring rounded px-2 py-1 ${sort === "date" ? "bg-ink text-paper" : "text-ink-soft hover:bg-paperdim"}`}
              >
                По дате
              </button>
            </div>
          </div>
          {filtered.length === 0 ? (
            <p className="py-10 text-sm text-ink-faint">
              По заданным фильтрам ничего не найдено. Попробуйте изменить формат работы или уровень.
            </p>
          ) : (
            filtered.map((j) => <JobCard key={j.slug} job={j} />)
          )}
        </div>
      </div>
    </div>
  );
}

function FilterGroup<T extends string>({
  title,
  options,
  value,
  onChange,
}: {
  title: string;
  options: readonly T[];
  value: T;
  onChange: (v: T) => void;
}) {
  return (
    <div>
      <p className="text-xs font-medium uppercase tracking-wide text-ink-faint">{title}</p>
      <div className="mt-2 space-y-1">
        {options.map((opt) => (
          <label key={opt} className="flex cursor-pointer items-center gap-2 text-sm text-ink-soft">
            <input
              type="radio"
              checked={value === opt}
              onChange={() => onChange(opt)}
              className="h-3.5 w-3.5 accent-ink"
            />
            {opt}
          </label>
        ))}
      </div>
    </div>
  );
}
