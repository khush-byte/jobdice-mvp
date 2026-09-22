"use client";

import { useState } from "react";

type Msg = { from: "bot" | "user"; text: string };
const script: Msg[] = [
  { from: "bot", text: "Здравствуйте! Я помогу разобрать вакансию, собрать резюме или подготовиться к интервью. С чего начнём?" },
  { from: "user", text: "Разбери вакансию Backend-разработчик в NordWind Tech" },
  { from: "bot", text: "В вакансии важны опыт с Go и платёжными системами. Опыт можно подтвердить предыдущим работодателем. Подготовить вопросы для интервью?" },
];

export default function AiAssistantWidget() {
  const [open, setOpen] = useState(false);
  const [shown, setShown] = useState(1);

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {open && (
        <div className="surface mb-3 w-[min(360px,calc(100vw-32px))] overflow-hidden">
          <div className="flex items-center justify-between border-b border-slate-100 bg-slate-950 px-4 py-3 text-white">
            <div className="flex items-center gap-2"><span className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-400/15 text-emerald-300">✦</span><p className="text-sm font-semibold">AI-ассистент JobDice</p></div>
            <button onClick={() => setOpen(false)} aria-label="Закрыть ассистента" className="rounded-lg px-2 text-slate-300 hover:bg-white/10 hover:text-white focus-ring">✕</button>
          </div>
          <div className="max-h-72 space-y-3 overflow-y-auto bg-slate-50 px-4 py-4">
            {script.slice(0, shown).map((m, i) => (
              <div key={i} className={m.from === "user" ? "text-right" : ""}>
                <span className={`inline-block max-w-[88%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${m.from === "bot" ? "rounded-bl-md bg-white text-slate-700 shadow-sm ring-1 ring-slate-200" : "rounded-br-md bg-slate-950 text-white"}`}>{m.text}</span>
              </div>
            ))}
          </div>
          <div className="border-t border-slate-100 bg-white px-4 py-3">
            {shown < script.length ? <button onClick={() => setShown((s) => s + 1)} className="focus-ring w-full rounded-xl border border-slate-200 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50">Показать продолжение</button> : <p className="text-center text-xs text-slate-400">Демо-диалог на статичных данных.</p>}
          </div>
        </div>
      )}
      <button onClick={() => setOpen((o) => !o)} className="focus-ring flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-950 text-white shadow-[0_14px_35px_rgba(15,23,42,.25)] transition hover:-translate-y-1 hover:bg-slate-800" aria-label="Открыть AI-ассистента">
        <span className="text-xl">✦</span>
      </button>
    </div>
  );
}
