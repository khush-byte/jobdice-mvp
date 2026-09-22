"use client";

import { useState } from "react";

type Exp = { role: string; company: string; period: string; description: string };

const templates = ["IT", "Медицина", "Юриспруденция"] as const;
const tones = ["Формальный", "Дружелюбный", "Продающий"] as const;

export default function ResumeBuilderPage() {
  const [name, setName] = useState("Айша Нурланова");
  const [title, setTitle] = useState("Продуктовый дизайнер");
  const [summary, setSummary] = useState(
    "Проектирую финтех-продукты последние 5 лет. Ищу команду, где дизайн влияет на продуктовые решения."
  );
  const [skills, setSkills] = useState("Figma, Дизайн-системы, Исследования пользователей");
  const [template, setTemplate] = useState<(typeof templates)[number]>("IT");
  const [exp, setExp] = useState<Exp[]>([
    { role: "Senior Product Designer", company: "FinFlow", period: "2022 — н.в.", description: "Развитие мобильного приложения для платежей." },
  ]);

  const [tone, setTone] = useState<(typeof tones)[number]>("Формальный");
  const [letter, setLetter] = useState("");

  function updateExp(i: number, patch: Partial<Exp>) {
    setExp((prev) => prev.map((e, idx) => (idx === i ? { ...e, ...patch } : e)));
  }

  function addExp() {
    setExp((prev) => [...prev, { role: "", company: "", period: "", description: "" }]);
  }

  function generateLetter() {
    const openings: Record<(typeof tones)[number], string> = {
      "Формальный": `Здравствуйте! Меня зовут ${name}, я откликаюсь на позицию «${title}».`,
      "Дружелюбный": `Привет! Я ${name}, увидел(а) вашу вакансию «${title}» и сразу захотел(а) написать.`,
      "Продающий": `${name} — ${title} с опытом, который закрывает именно эту вакансию: «${title}».`,
    };
    setLetter(
      `${openings[tone]}\n\n${summary}\n\nКлючевые навыки: ${skills}.\nБуду рад(а) обсудить, как мой опыт поможет вашей команде.`
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      <h1 className="font-serif text-3xl font-semibold">Конструктор резюме</h1>
      <p className="mt-2 max-w-prose text-sm text-ink-faint">
        Единое мастер-резюме, на основе которого генерируются адаптированные версии под конкретную вакансию.
        Изменения применяются в превью справа.
      </p>

      <div className="mt-8 grid gap-10 lg:grid-cols-2">
        <div className="space-y-6">
          <div className="flex flex-wrap gap-2">
            {templates.map((t) => (
              <button
                key={t}
                onClick={() => setTemplate(t)}
                className={`focus-ring rounded-full border px-3 py-1 text-sm ${
                  template === t ? "border-ink bg-ink text-paper" : "border-line text-ink-soft"
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          <Field label="Имя">
            <input value={name} onChange={(e) => setName(e.target.value)} className="input" />
          </Field>
          <Field label="Должность">
            <input value={title} onChange={(e) => setTitle(e.target.value)} className="input" />
          </Field>
          <Field label="О себе">
            <textarea value={summary} onChange={(e) => setSummary(e.target.value)} rows={3} className="input" />
          </Field>
          <Field label="Навыки (через запятую)">
            <input value={skills} onChange={(e) => setSkills(e.target.value)} className="input" />
          </Field>

          <div>
            <div className="flex items-center justify-between">
              <p className="text-xs font-medium uppercase tracking-wide text-ink-faint">Опыт работы</p>
              <button onClick={addExp} className="focus-ring text-sm underline underline-offset-4">
                + добавить место работы
              </button>
            </div>
            <div className="mt-3 space-y-4">
              {exp.map((e, i) => (
                <div key={i} className="rounded border border-line bg-white p-4">
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      value={e.role}
                      onChange={(ev) => updateExp(i, { role: ev.target.value })}
                      placeholder="Должность"
                      className="input"
                    />
                    <input
                      value={e.company}
                      onChange={(ev) => updateExp(i, { company: ev.target.value })}
                      placeholder="Компания"
                      className="input"
                    />
                  </div>
                  <input
                    value={e.period}
                    onChange={(ev) => updateExp(i, { period: ev.target.value })}
                    placeholder="Период"
                    className="input mt-3"
                  />
                  <textarea
                    value={e.description}
                    onChange={(ev) => updateExp(i, { description: ev.target.value })}
                    placeholder="Что делали"
                    rows={2}
                    className="input mt-3"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="rounded border border-line bg-white p-4">
            <p className="text-xs font-medium uppercase tracking-wide text-ink-faint">
              AI-генератор сопроводительного письма
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {tones.map((t) => (
                <button
                  key={t}
                  onClick={() => setTone(t)}
                  className={`focus-ring rounded-full border px-3 py-1 text-sm ${
                    tone === t ? "border-ink bg-ink text-paper" : "border-line text-ink-soft"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
            <button
              onClick={generateLetter}
              className="focus-ring mt-3 rounded bg-ink px-4 py-2 text-sm font-medium text-paper hover:opacity-90"
            >
              Сгенерировать письмо
            </button>
            {letter && (
              <p className="mt-3 whitespace-pre-line rounded bg-paperdim p-3 text-sm text-ink-soft">{letter}</p>
            )}
          </div>
        </div>

        {/* Live preview */}
        <div className="lg:sticky lg:top-24 lg:self-start">
          <p className="mb-2 text-xs font-medium uppercase tracking-wide text-ink-faint">
            Превью · шаблон «{template}»
          </p>
          <div className="rounded border border-line bg-white p-8 shadow-[0_4px_0_0_#D8D9CE]">
            <h2 className="font-serif text-2xl font-semibold">{name || "Имя Фамилия"}</h2>
            <p className="text-ink-soft">{title || "Должность"}</p>
            <p className="mt-4 text-sm text-ink-soft">{summary}</p>

            <div className="mt-5 border-t border-line pt-4">
              <p className="text-xs font-medium uppercase tracking-wide text-ink-faint">Навыки</p>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {skills
                  .split(",")
                  .map((s) => s.trim())
                  .filter(Boolean)
                  .map((s) => (
                    <span key={s} className="rounded-full border border-line px-2.5 py-0.5 text-xs">
                      {s}
                    </span>
                  ))}
              </div>
            </div>

            <div className="mt-5 border-t border-line pt-4">
              <p className="text-xs font-medium uppercase tracking-wide text-ink-faint">Опыт</p>
              <div className="mt-2 space-y-3">
                {exp.map((e, i) => (
                  <div key={i}>
                    <p className="text-sm font-medium">
                      {e.role || "Должность"} {e.company && `· ${e.company}`}
                    </p>
                    <p className="text-xs text-ink-faint">{e.period}</p>
                    <p className="mt-0.5 text-sm text-ink-soft">{e.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="text-xs font-medium uppercase tracking-wide text-ink-faint">{label}</label>
      <div className="mt-1.5">{children}</div>
    </div>
  );
}
