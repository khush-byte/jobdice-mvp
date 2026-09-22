"use client";

import { useState } from "react";

type Msg = { from: "bot" | "user"; text: string };

const script: Msg[] = [
  { from: "bot", text: "Здравствуйте! Я помогу разобрать вакансию, собрать резюме или подготовиться к интервью. С чего начнём?" },
  { from: "user", text: "Разбери вакансию Backend-разработчик в NordWind Tech" },
  {
    from: "bot",
    text:
      "В вакансии просят опыт от 4 лет на Go и понимание отказоустойчивых платёжных систем. Требование опыта верифицируется предыдущим работодателем — это признак серьёзного найма, а не завышенных ожиданий. Подготовить вопросы для интервью?",
  },
];

export default function AiAssistantWidget() {
  const [open, setOpen] = useState(false);
  const [shown, setShown] = useState(1);

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {open && (
        <div className="mb-3 w-80 rounded border border-line bg-paper shadow-[0_4px_0_0_#161C2E]">
          <div className="rule-b flex items-center justify-between px-4 py-3">
            <p className="text-sm font-medium">AI-ассистент JobDice</p>
            <button
              onClick={() => setOpen(false)}
              aria-label="Закрыть ассистента"
              className="text-ink-faint hover:text-ink focus-ring rounded"
            >
              ✕
            </button>
          </div>
          <div className="max-h-72 space-y-3 overflow-y-auto px-4 py-3">
            {script.slice(0, shown).map((m, i) => (
              <div key={i} className={m.from === "user" ? "text-right" : ""}>
                <span
                  className={
                    "inline-block rounded px-3 py-2 text-sm " +
                    (m.from === "bot" ? "bg-paperdim text-ink" : "bg-ink text-paper")
                  }
                >
                  {m.text}
                </span>
              </div>
            ))}
          </div>
          <div className="border-t border-line px-4 py-3">
            {shown < script.length ? (
              <button
                onClick={() => setShown((s) => s + 1)}
                className="focus-ring w-full rounded border border-ink py-1.5 text-sm hover:bg-paperdim"
              >
                Показать продолжение диалога
              </button>
            ) : (
              <p className="text-xs text-ink-faint">Демо-диалог на статичных данных.</p>
            )}
          </div>
        </div>
      )}
      <button
        onClick={() => setOpen((o) => !o)}
        className="focus-ring flex h-14 w-14 items-center justify-center rounded-full bg-ink text-paper shadow-[0_3px_0_0_#78809A] transition-transform hover:scale-105"
        aria-label="Открыть AI-ассистента"
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M12 3c-4.4 0-8 3.1-8 7 0 2.2 1.1 4.1 2.9 5.4L6 21l4.3-2.1c.6.1 1.1.1 1.7.1 4.4 0 8-3.1 8-7s-3.6-7-8-7z"
            stroke="#F4F5F0"
            strokeWidth="1.5"
          />
        </svg>
      </button>
    </div>
  );
}
