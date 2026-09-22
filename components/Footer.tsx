import Link from "next/link";

export default function Footer() {
  return (
    <footer className="rule mt-24 bg-paper">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <div className="col-span-2 md:col-span-1">
            <p className="font-serif text-lg font-semibold">JobDice</p>
            <p className="mt-2 max-w-[26ch] text-sm text-ink-faint">
              Проверяемая репутация вместо резюме на слово.
            </p>
          </div>
          <FooterCol
            title="Соискателям"
            items={[
              { label: "Поиск вакансий", href: "/jobs" },
              { label: "Конструктор резюме", href: "/resume-builder" },
              { label: "Личный кабинет", href: "/dashboard/candidate" },
            ]}
          />
          <FooterCol
            title="Работодателям"
            items={[
              { label: "Разместить вакансию", href: "/dashboard/employer" },
              { label: "Тарифы", href: "#" },
              { label: "API аналитики рынка", href: "#" },
            ]}
          />
          <FooterCol
            title="Доверие"
            items={[
              { label: "Как считается рейтинг", href: "#" },
              { label: "Модерация и апелляции", href: "#" },
              { label: "Обработка данных", href: "#" },
            ]}
          />
        </div>
        <p className="mt-10 text-xs text-ink-faint">
          © 2026 JobDice. Демонстрационная версия интерфейса на статичных данных.
        </p>
      </div>
    </footer>
  );
}

function FooterCol({ title, items }: { title: string; items: { label: string; href: string }[] }) {
  return (
    <div>
      <p className="text-sm font-medium text-ink">{title}</p>
      <ul className="mt-3 space-y-2">
        {items.map((i) => (
          <li key={i.label}>
            <Link href={i.href} className="text-sm text-ink-faint hover:text-ink focus-ring rounded">
              {i.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
