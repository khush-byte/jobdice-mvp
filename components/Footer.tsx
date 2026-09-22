import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-20 bg-slate-950 text-white">
      <div className="mx-auto max-w-7xl px-5 py-12 lg:px-8">
        <div className="grid gap-10 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-2.5"><span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-slate-950 font-bold">J</span><span className="font-serif text-xl font-bold">JobDice</span></div>
            <p className="mt-4 max-w-sm text-sm leading-6 text-slate-400">Профессиональная платформа поиска работы и найма с проверяемой репутацией, двусторонним Match Score и AI-помощником.</p>
          </div>
          <FooterCol title="Соискателям" items={[{ label: "Поиск вакансий", href: "/jobs" }, { label: "Конструктор резюме", href: "/resume-builder" }, { label: "Личный кабинет", href: "/dashboard/candidate" }]} />
          <FooterCol title="Работодателям" items={[{ label: "Разместить вакансию", href: "/dashboard/employer" }, { label: "Кабинет работодателя", href: "/dashboard/employer" }, { label: "Профили компаний", href: "/companies/nordwind-tech" }]} />
          <FooterCol title="Доверие" items={[{ label: "Как считается рейтинг", href: "/companies/nordwind-tech" }, { label: "Верификация", href: "/jobs" }, { label: "AI Match Score", href: "/jobs" }]} />
        </div>
        <div className="mt-12 flex flex-col justify-between gap-3 border-t border-white/10 pt-5 text-xs text-slate-500 sm:flex-row"><span>© 2026 JobDice</span><span>Демонстрационная версия MVP · статичные данные</span></div>
      </div>
    </footer>
  );
}

function FooterCol({ title, items }: { title: string; items: { label: string; href: string }[] }) {
  return <div><p className="text-sm font-semibold">{title}</p><ul className="mt-4 space-y-2.5">{items.map((i) => <li key={i.label}><Link href={i.href} className="text-sm text-slate-400 transition hover:text-white">{i.label}</Link></li>)}</ul></div>;
}
