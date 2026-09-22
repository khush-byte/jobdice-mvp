"use client";

import { useState } from "react";
import Link from "next/link";
import { jobs } from "@/lib/data";
import MatchScoreBadge from "@/components/MatchScoreBadge";

type Stage = "Отклик" | "Интервью" | "Оффер" | "Отказ";
const stages: Stage[] = ["Отклик", "Интервью", "Оффер", "Отказ"];

type Card = { id: string; name: string; role: string; matchScore: number; stage: Stage; note: string };

const initialCards: Card[] = [
  { id: "c1", name: "Айша Нурланова", role: "Продуктовый дизайнер", matchScore: 87, stage: "Интервью", note: "Второе интервью в четверг" },
  { id: "c2", name: "Марат Тлеубаев", role: "Продуктовый дизайнер", matchScore: 71, stage: "Отклик", note: "Портфолио на рассмотрении" },
  { id: "c3", name: "Дамир Сеитов", role: "Backend-разработчик", matchScore: 74, stage: "Оффер", note: "Ожидаем ответ до пятницы" },
  { id: "c4", name: "Гульнара Ахметова", role: "Backend-разработчик", matchScore: 52, stage: "Отклик", note: "" },
  { id: "c5", name: "Тимур Бекенов", role: "Продуктовый дизайнер", matchScore: 44, stage: "Отказ", note: "Не хватает опыта в fintech" },
];

export default function EmployerDashboard() {
  const [cards, setCards] = useState(initialCards);

  function move(id: string, dir: 1 | -1) {
    setCards((prev) =>
      prev.map((c) => {
        if (c.id !== id) return c;
        const idx = stages.indexOf(c.stage);
        const next = Math.min(Math.max(idx + dir, 0), stages.length - 1);
        return { ...c, stage: stages[next] };
      })
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      <div className="rule-b flex flex-wrap items-end justify-between gap-4 pb-6">
        <div>
          <p className="text-sm text-ink-faint">NordWind Tech</p>
          <h1 className="mt-1 font-serif text-3xl font-semibold">Кабинет работодателя</h1>
        </div>
        <button className="focus-ring rounded bg-ink px-4 py-2.5 text-sm font-medium text-paper hover:opacity-90">
          + Разместить вакансию
        </button>
      </div>

      <section className="mt-8">
        <h2 className="font-serif text-xl font-semibold">Активные вакансии</h2>
        <div className="mt-4 overflow-x-auto rounded border border-line bg-white">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="rule-b text-xs uppercase tracking-wide text-ink-faint">
                <th className="px-4 py-3 font-medium">Вакансия</th>
                <th className="px-4 py-3 font-medium">Просмотры</th>
                <th className="px-4 py-3 font-medium">Отклики</th>
                <th className="px-4 py-3 font-medium">Интервью</th>
                <th className="px-4 py-3 font-medium">Офферы</th>
                <th className="px-4 py-3 font-medium">Статус</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {jobs
                .filter((j) => j.companySlug === "nordwind-tech")
                .map((j) => (
                  <tr key={j.slug}>
                    <td className="px-4 py-3">
                      <Link href={`/jobs/${j.slug}`} className="focus-ring font-medium hover:underline">
                        {j.title}
                      </Link>
                    </td>
                    <td className="px-4 py-3">{j.funnel[0].count}</td>
                    <td className="px-4 py-3">{j.funnel[1].count}</td>
                    <td className="px-4 py-3">{j.funnel[2].count}</td>
                    <td className="px-4 py-3">{j.funnel[3].count}</td>
                    <td className="px-4 py-3">
                      <span className="stamp">Активна</span>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-12">
        <h2 className="font-serif text-xl font-semibold">Воронка кандидатов</h2>
        <p className="mt-1 text-sm text-ink-faint">Стрелки переносят карточку между этапами — демо-версия без drag-and-drop.</p>
        <div className="mt-4 grid gap-4 md:grid-cols-4">
          {stages.map((stage) => (
            <div key={stage} className="rounded border border-line bg-white">
              <div className="rule-b px-3 py-2.5 text-sm font-medium">
                {stage}
                <span className="ml-1.5 text-ink-faint">({cards.filter((c) => c.stage === stage).length})</span>
              </div>
              <div className="space-y-3 p-3">
                {cards
                  .filter((c) => c.stage === stage)
                  .map((c) => (
                    <div key={c.id} className="rounded border border-line p-3">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <p className="text-sm font-medium">{c.name}</p>
                          <p className="text-xs text-ink-faint">{c.role}</p>
                        </div>
                        <MatchScoreBadge score={c.matchScore} size="sm" />
                      </div>
                      {c.note && <p className="mt-2 text-xs text-ink-faint">{c.note}</p>}
                      <div className="mt-2 flex justify-between">
                        <button
                          onClick={() => move(c.id, -1)}
                          disabled={stage === stages[0]}
                          className="focus-ring text-xs text-ink-faint hover:text-ink disabled:opacity-30"
                        >
                          ← назад
                        </button>
                        <button
                          onClick={() => move(c.id, 1)}
                          disabled={stage === stages[stages.length - 1]}
                          className="focus-ring text-xs text-ink-faint hover:text-ink disabled:opacity-30"
                        >
                          вперёд →
                        </button>
                      </div>
                    </div>
                  ))}
                {cards.filter((c) => c.stage === stage).length === 0 && (
                  <p className="px-1 py-2 text-xs text-ink-faint">Пусто</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
