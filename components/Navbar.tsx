import Link from "next/link";

const links = [
  { href: "/jobs", label: "Вакансии" },
  { href: "/resume-builder", label: "Резюме" },
  { href: "/dashboard/candidate", label: "Соискателю" },
  { href: "/dashboard/employer", label: "Работодателю" },
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-5 px-5 py-3.5 lg:px-8">
        <Link href="/" className="focus-ring flex shrink-0 items-center gap-2.5 rounded-xl">
          <DiceMark />
          <div>
            <span className="block font-serif text-xl font-bold tracking-tight text-slate-950">JobDice</span>
            <span className="hidden text-[9px] font-semibold uppercase tracking-[0.16em] text-slate-400 sm:block">Verified hiring</span>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="focus-ring rounded-lg px-3.5 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-50 hover:text-slate-950">
              {l.label}
            </Link>
          ))}
        </nav>

        <Link href="/jobs" className="focus-ring inline-flex items-center gap-2 rounded-xl bg-slate-950 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800">
          Найти работу
          <span aria-hidden>↗</span>
        </Link>
      </div>
    </header>
  );
}

function DiceMark() {
  return (
    <svg width="34" height="34" viewBox="0 0 34 34" fill="none" aria-hidden="true">
      <rect x="1" y="1" width="32" height="32" rx="10" fill="#0f172a" />
      <circle cx="10" cy="10" r="2" fill="#fff" />
      <circle cx="24" cy="10" r="2" fill="#fff" />
      <circle cx="17" cy="17" r="2" fill="#34d399" />
      <circle cx="10" cy="24" r="2" fill="#fff" />
      <circle cx="24" cy="24" r="2" fill="#fff" />
    </svg>
  );
}
