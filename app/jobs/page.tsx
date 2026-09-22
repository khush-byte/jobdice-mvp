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

  const filtered = useMemo(() => [...jobs.filter((j) => {
    const q = query.trim().toLowerCase();
    return (!q || j.title.toLowerCase().includes(q) || j.companyName.toLowerCase().includes(q) || j.tags.some((t) => t.toLowerCase().includes(q))) &&
      (remote === "Все форматы" || j.remote === remote) && (seniority === "Все уровни" || j.seniority === seniority);
  })].sort((a, b) => sort === "match" ? b.matchScore - a.matchScore : a.postedDaysAgo - b.postedDaysAgo), [query, remote, seniority, sort]);

  return (
    <div className="mx-auto max-w-7xl px-5 py-10 lg:px-8 lg:py-12">
      <div className="max-w-3xl"><p className="eyebrow">Job marketplace</p><h1 className="mt-2 font-serif text-4xl font-bold tracking-tight text-slate-950">Найдите работу, которая подходит вам.</h1><p className="mt-3 text-sm leading-6 text-slate-500">Фильтруйте по формату и уровню, а Match Score показывает степень соответствия демонстрационному профилю.</p></div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[250px_1fr]">
        <aside className="surface h-fit p-5 lg:sticky lg:top-24">
          <p className="text-sm font-bold text-slate-900">Фильтры</p>
          <div className="mt-5"><label className="eyebrow">Поиск</label><div className="relative mt-2"><span className="absolute left-3 top-3 text-slate-400">⌕</span><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Должность, навык, компания" className="input pl-9" /></div></div>
          <FilterGroup title="Формат работы" options={remoteOptions} value={remote} onChange={(v) => setRemote(v as typeof remote)} />
          <FilterGroup title="Уровень" options={seniorityOptions} value={seniority} onChange={(v) => setSeniority(v as typeof seniority)} />
        </aside>

        <div>
          <div className="mb-4 flex flex-col justify-between gap-3 sm:flex-row sm:items-center"><p className="text-sm text-slate-500">Найдено <span className="font-semibold text-slate-900">{filtered.length}</span> вакансий</p><div className="flex items-center gap-1 rounded-xl bg-slate-100 p-1 text-xs font-semibold"><button onClick={() => setSort("match")} className={`rounded-lg px-3 py-2 ${sort === "match" ? "bg-white text-slate-950 shadow-sm" : "text-slate-500"}`}>По совпадению</button><button onClick={() => setSort("date")} className={`rounded-lg px-3 py-2 ${sort === "date" ? "bg-white text-slate-950 shadow-sm" : "text-slate-500"}`}>По дате</button></div></div>
          <div className="grid gap-4">{filtered.length ? filtered.map((j) => <JobCard key={j.slug} job={j} />) : <div className="surface p-10 text-center"><p className="font-serif text-xl font-bold text-slate-900">Ничего не найдено</p><p className="mt-2 text-sm text-slate-500">Измените фильтры или поисковый запрос.</p></div>}</div>
        </div>
      </div>
    </div>
  );
}

function FilterGroup<T extends string>({ title, options, value, onChange }: { title: string; options: readonly T[]; value: T; onChange: (v: T) => void }) {
  return <div className="mt-6"><p className="eyebrow">{title}</p><div className="mt-2 space-y-1">{options.map((opt) => <label key={opt} className={`flex cursor-pointer items-center gap-2 rounded-lg px-2 py-2 text-sm ${value === opt ? "bg-emerald-50 font-semibold text-emerald-800" : "text-slate-600 hover:bg-slate-50"}`}><input type="radio" checked={value === opt} onChange={() => onChange(opt)} className="h-3.5 w-3.5 accent-emerald-600" />{opt}</label>)}</div></div>;
}
