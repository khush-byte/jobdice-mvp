import Link from "next/link";

const links = [
  { href: "/jobs", label: "Вакансии" },
  { href: "/resume-builder", label: "Конструктор резюме" },
  { href: "/dashboard/candidate", label: "Кабинет соискателя" },
  { href: "/dashboard/employer", label: "Кабинет работодателя" },
];

export default function Navbar() {
  return (
    <header className="rule-b sticky top-0 z-40 bg-paper/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2.5 focus-ring rounded">
          <DiceMark />
          <span className="font-serif text-xl font-semibold tracking-tight">JobDice</span>
        </Link>
        <nav className="hidden items-center gap-7 md:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm text-ink-soft transition-colors hover:text-ink focus-ring rounded"
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <Link
          href="/jobs"
          className="rounded bg-ink px-4 py-2 text-sm font-medium text-paper transition-opacity hover:opacity-90 focus-ring"
        >
          Найти вакансию
        </Link>
      </div>
    </header>
  );
}

function DiceMark() {
  return (
    <svg width="26" height="26" viewBox="0 0 26 26" fill="none" aria-hidden="true">
      <rect x="1" y="1" width="24" height="24" rx="5" stroke="#161C2E" strokeWidth="1.6" />
      <circle cx="8" cy="8" r="1.7" fill="#161C2E" />
      <circle cx="18" cy="8" r="1.7" fill="#161C2E" />
      <circle cx="13" cy="13" r="1.7" fill="#C7962C" />
      <circle cx="8" cy="18" r="1.7" fill="#161C2E" />
      <circle cx="18" cy="18" r="1.7" fill="#161C2E" />
    </svg>
  );
}
