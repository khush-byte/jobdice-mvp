// Статические демо-данные JobDice.
// В боевой версии эти структуры приходят из соответствующих
// микросервисов (profiles, jobs, ratings) через API/GraphQL.

export type MatchFactor = {
  label: string;
  weight: number; // %
  score: number; // 0-100
  source: string;
};

export type Job = {
  slug: string;
  title: string;
  companySlug: string;
  companyName: string;
  location: string;
  remote: "На месте" | "Гибрид" | "Удалённо";
  salaryFrom: number;
  salaryTo: number;
  currency: string;
  postedDaysAgo: number;
  seniority: "Junior" | "Middle" | "Senior" | "Lead";
  tags: string[];
  matchScore: number;
  matchNote: string;
  matchFactors: MatchFactor[];
  description: string;
  responsibilities: string[];
  requirements: string[];
  verifiedRequirements: string[];
  funnel: { stage: string; count: number }[];
};

export type RatingComponent = {
  label: string;
  weight: number;
  score: number; // 0-100
  source: string;
};

export type TimelineEntry = {
  year: string;
  title: string;
  detail: string;
};

export type Company = {
  slug: string;
  name: string;
  industry: string;
  size: string;
  founded: string;
  hq: string;
  ratingOverall: number;
  ratingComponents: RatingComponent[];
  timeline: TimelineEntry[];
  openJobs: string[]; // job slugs
  hiredLastYear: number;
  avgTimeToHireDays: number;
  turnoverRate: string;
  about: string;
};

export type CandidateRatingComponent = {
  label: string;
  detail: string;
  verified: boolean;
};

export type Experience = {
  period: string;
  role: string;
  company: string;
  verified: boolean;
  description: string;
};

export type Candidate = {
  slug: string;
  name: string;
  title: string;
  location: string;
  openToRelocation: boolean;
  ratingOverall: number;
  ratingComponents: CandidateRatingComponent[];
  skills: { name: string; verified: boolean }[];
  experience: Experience[];
  portfolio: { label: string; url: string }[];
  certificates: { name: string; issuer: string; verified: boolean }[];
  summary: string;
};

export type Review = {
  id: string;
  author: "candidate" | "company";
  targetSlug: string;
  rating: number;
  categories: { label: string; score: number }[];
  text: string;
  daysAgo: number;
  blindRevealed: boolean;
};

export const companies: Company[] = [
  {
    slug: "nordwind-tech",
    name: "NordWind Tech",
    industry: "Финтех / платежи",
    size: "180–250 сотрудников",
    founded: "2016",
    hq: "Алматы, Казахстан",
    ratingOverall: 84,
    ratingComponents: [
      { label: "Отзывы сотрудников", weight: 30, score: 82, source: "Верифицированные отзывы (blind review)" },
      { label: "Скорость обратной связи", weight: 20, score: 91, source: "Внутренняя аналитика откликов" },
      { label: "Соответствие вакансии реальности", weight: 20, score: 76, source: "Пост-найм опросы" },
      { label: "Своевременность выплат", weight: 15, score: 96, source: "Добровольные опросы сотрудников" },
      { label: "Юридическая чистота", weight: 15, score: 80, source: "Индекс здоровья компании" },
    ],
    timeline: [
      { year: "2016", title: "Основание компании", detail: "Запуск платёжного шлюза для малого бизнеса" },
      { year: "2019", title: "Раунд A", detail: "Привлечено $6М на региональную экспансию" },
      { year: "2022", title: "Ребрендинг", detail: "Смена названия с PayNord на NordWind Tech" },
      { year: "2024", title: "Выход на новый рынок", detail: "Открытие офиса в Ташкенте" },
    ],
    openJobs: ["product-designer-nordwind", "backend-go-nordwind"],
    hiredLastYear: 47,
    avgTimeToHireDays: 21,
    turnoverRate: "11% в год",
    about:
      "NordWind Tech разрабатывает платёжную инфраструктуру для малого и среднего бизнеса в Центральной Азии. Компания добровольно раскрывает текучесть кадров и срок закрытия вакансий как часть программы прозрачности.",
  },
  {
    slug: "greenfield-logistics",
    name: "Greenfield Logistics",
    industry: "Логистика",
    size: "600–800 сотрудников",
    founded: "2009",
    hq: "Ташкент, Узбекистан",
    ratingOverall: 68,
    ratingComponents: [
      { label: "Отзывы сотрудников", weight: 30, score: 61, source: "Верифицированные отзывы (blind review)" },
      { label: "Скорость обратной связи", weight: 20, score: 58, source: "Внутренняя аналитика откликов" },
      { label: "Соответствие вакансии реальности", weight: 20, score: 65, source: "Пост-найм опросы" },
      { label: "Своевременность выплат", weight: 15, score: 89, source: "Добровольные опросы сотрудников" },
      { label: "Юридическая чистота", weight: 15, score: 74, source: "Индекс здоровья компании" },
    ],
    timeline: [
      { year: "2009", title: "Основание компании", detail: "Старт с грузоперевозок между Ташкентом и Алматы" },
      { year: "2015", title: "Слияние", detail: "Объединение с региональным перевозчиком AsiaCargo" },
      { year: "2021", title: "Судебный спор", detail: "Трудовой спор урегулирован, данные из открытых реестров" },
    ],
    openJobs: ["warehouse-lead-greenfield"],
    hiredLastYear: 112,
    avgTimeToHireDays: 34,
    turnoverRate: "24% в год",
    about:
      "Greenfield Logistics — региональный логистический оператор. Часть компонентов рейтинга ниже среднего по рынку из-за медленной обратной связи кандидатам и одного открытого трудового спора.",
  },
  {
    slug: "atlas-health",
    name: "Atlas Health",
    industry: "Медтех",
    size: "40–80 сотрудников",
    founded: "2021",
    hq: "Бишкек, Кыргызстан",
    ratingOverall: 91,
    ratingComponents: [
      { label: "Отзывы сотрудников", weight: 30, score: 93, source: "Верифицированные отзывы (blind review)" },
      { label: "Скорость обратной связи", weight: 20, score: 95, source: "Внутренняя аналитика откликов" },
      { label: "Соответствие вакансии реальности", weight: 20, score: 88, source: "Пост-найм опросы" },
      { label: "Своевременность выплат", weight: 15, score: 92, source: "Добровольные опросы сотрудников" },
      { label: "Юридическая чистота", weight: 15, score: 90, source: "Индекс здоровья компании" },
    ],
    timeline: [
      { year: "2021", title: "Основание компании", detail: "Запуск сервиса телемедицины" },
      { year: "2023", title: "Сертификация", detail: "Получен сертификат соответствия ISO 27001" },
    ],
    openJobs: ["frontend-react-atlas"],
    hiredLastYear: 18,
    avgTimeToHireDays: 14,
    turnoverRate: "6% в год",
    about:
      "Atlas Health строит платформу телемедицины для региональных клиник. Небольшая команда с одним из самых высоких рейтингов на платформе.",
  },
];

export const jobs: Job[] = [
  {
    slug: "product-designer-nordwind",
    title: "Продуктовый дизайнер (Fintech)",
    companySlug: "nordwind-tech",
    companyName: "NordWind Tech",
    location: "Алматы",
    remote: "Гибрид",
    salaryFrom: 700000,
    salaryTo: 950000,
    currency: "₸",
    postedDaysAgo: 3,
    seniority: "Middle",
    tags: ["Figma", "Design System", "Fintech", "Мобильные приложения"],
    matchScore: 87,
    matchNote: "Сильное совпадение по опыту, риск по soft skills — рекомендуется поведенческое интервью",
    matchFactors: [
      { label: "Совпадение hard skills", weight: 35, score: 92, source: "Профиль навыков + тесты" },
      { label: "Релевантность опыта", weight: 25, score: 88, source: "Верифицированный опыт работы" },
      { label: "Сертификаты и образование", weight: 15, score: 70, source: "Верифицированные сертификаты" },
      { label: "Рекомендации коллег", weight: 15, score: 85, source: "Верифицированные рекомендации" },
      { label: "Поведенческие сигналы", weight: 10, score: 64, source: "История активности на площадке" },
    ],
    description:
      "Ищем продуктового дизайнера, который возьмёт на себя мобильное приложение для малого бизнеса — от онбординга до платёжного флоу.",
    responsibilities: [
      "Проектирование пользовательских сценариев для мобильного и веб-приложения",
      "Развитие единой дизайн-системы компании",
      "Проведение исследований с реальными пользователями малого бизнеса",
    ],
    requirements: [
      "От 3 лет опыта в продуктовом дизайне",
      "Портфолио с кейсами мобильных финансовых продуктов",
      "Уверенное владение Figma и основами дизайн-систем",
    ],
    verifiedRequirements: ["Опыт от 3 лет с верификацией предыдущим работодателем"],
    funnel: [
      { stage: "Просмотры", count: 412 },
      { stage: "Отклики", count: 38 },
      { stage: "Интервью", count: 9 },
      { stage: "Офферы", count: 2 },
    ],
  },
  {
    slug: "backend-go-nordwind",
    title: "Backend-разработчик (Go)",
    companySlug: "nordwind-tech",
    companyName: "NordWind Tech",
    location: "Алматы",
    remote: "Удалённо",
    salaryFrom: 900000,
    salaryTo: 1300000,
    currency: "₸",
    postedDaysAgo: 6,
    seniority: "Senior",
    tags: ["Go", "PostgreSQL", "Микросервисы", "Kubernetes"],
    matchScore: 74,
    matchNote: "Хорошее совпадение по стеку, ниже среднего по масштабу задач — уточните опыт с высоконагруженными системами",
    matchFactors: [
      { label: "Совпадение hard skills", weight: 35, score: 81, source: "Профиль навыков + тесты" },
      { label: "Релевантность опыта", weight: 25, score: 63, source: "Верифицированный опыт работы" },
      { label: "Сертификаты и образование", weight: 15, score: 55, source: "Верифицированные сертификаты" },
      { label: "Рекомендации коллег", weight: 15, score: 90, source: "Верифицированные рекомендации" },
      { label: "Поведенческие сигналы", weight: 10, score: 88, source: "История активности на площадке" },
    ],
    description: "Развиваем платёжное ядро: очереди транзакций, антифрод, интеграции с банками-партнёрами.",
    responsibilities: [
      "Разработка и поддержка сервисов обработки платежей",
      "Проектирование отказоустойчивой архитектуры очередей",
      "Код-ревью и менторство младших разработчиков",
    ],
    requirements: [
      "От 4 лет коммерческого опыта на Go",
      "Опыт проектирования микросервисной архитектуры",
      "Понимание требований к отказоустойчивости платёжных систем",
    ],
    verifiedRequirements: ["Опыт от 4 лет с верификацией предыдущим работодателем", "Сертификат Kubernetes (CKA)"],
    funnel: [
      { stage: "Просмотры", count: 289 },
      { stage: "Отклики", count: 21 },
      { stage: "Интервью", count: 6 },
      { stage: "Офферы", count: 1 },
    ],
  },
  {
    slug: "warehouse-lead-greenfield",
    title: "Руководитель складского комплекса",
    companySlug: "greenfield-logistics",
    companyName: "Greenfield Logistics",
    location: "Ташкент",
    remote: "На месте",
    salaryFrom: 12000000,
    salaryTo: 16000000,
    currency: "сум",
    postedDaysAgo: 12,
    seniority: "Lead",
    tags: ["Логистика", "WMS", "Управление командой"],
    matchScore: 58,
    matchNote: "Совпадение по опыту среднее, риск — компания ниже среднего по скорости обратной связи",
    matchFactors: [
      { label: "Совпадение hard skills", weight: 35, score: 70, source: "Профиль навыков + тесты" },
      { label: "Релевантность опыта", weight: 25, score: 60, source: "Верифицированный опыт работы" },
      { label: "Сертификаты и образование", weight: 15, score: 40, source: "Верифицированные сертификаты" },
      { label: "Рекомендации коллег", weight: 15, score: 55, source: "Верифицированные рекомендации" },
      { label: "Поведенческие сигналы", weight: 10, score: 52, source: "История активности на площадке" },
    ],
    description: "Управление складским комплексом 14 000 м², командой из 60 человек в две смены.",
    responsibilities: [
      "Планирование загрузки склада и смен",
      "Внедрение WMS-системы",
      "Контроль KPI по скорости отгрузки",
    ],
    requirements: ["От 5 лет опыта в управлении складом", "Опыт внедрения WMS"],
    verifiedRequirements: ["Опыт от 5 лет с верификацией предыдущим работодателем"],
    funnel: [
      { stage: "Просмотры", count: 156 },
      { stage: "Отклики", count: 14 },
      { stage: "Интервью", count: 3 },
      { stage: "Офферы", count: 0 },
    ],
  },
  {
    slug: "frontend-react-atlas",
    title: "Frontend-разработчик (React)",
    companySlug: "atlas-health",
    companyName: "Atlas Health",
    location: "Бишкек",
    remote: "Удалённо",
    salaryFrom: 500000,
    salaryTo: 750000,
    currency: "сом",
    postedDaysAgo: 1,
    seniority: "Middle",
    tags: ["React", "TypeScript", "Telemedicine"],
    matchScore: 93,
    matchNote: "Очень сильное совпадение по стеку и опыту — рекомендуется быстрый оффер",
    matchFactors: [
      { label: "Совпадение hard skills", weight: 35, score: 96, source: "Профиль навыков + тесты" },
      { label: "Релевантность опыта", weight: 25, score: 91, source: "Верифицированный опыт работы" },
      { label: "Сертификаты и образование", weight: 15, score: 85, source: "Верифицированные сертификаты" },
      { label: "Рекомендации коллег", weight: 15, score: 94, source: "Верифицированные рекомендации" },
      { label: "Поведенческие сигналы", weight: 10, score: 90, source: "История активности на площадке" },
    ],
    description: "Развиваем веб-кабинет пациента и врача для сервиса телемедицины.",
    responsibilities: [
      "Разработка интерфейсов кабинета пациента и врача",
      "Поддержка библиотеки компонентов",
      "Оптимизация производительности на мобильных сетях",
    ],
    requirements: ["От 2 лет опыта с React", "Опыт работы с TypeScript"],
    verifiedRequirements: ["Опыт от 2 лет с верификацией предыдущим работодателем"],
    funnel: [
      { stage: "Просмотры", count: 201 },
      { stage: "Отклики", count: 27 },
      { stage: "Интервью", count: 8 },
      { stage: "Офферы", count: 3 },
    ],
  },
];

export const candidates: Candidate[] = [
  {
    slug: "aisha-nurlanova",
    name: "Айша Нурланова",
    title: "Продуктовый дизайнер",
    location: "Алматы, готова к переезду",
    openToRelocation: true,
    ratingOverall: 88,
    ratingComponents: [
      { label: "Подтверждённый опыт", detail: "5 лет, подтверждено 2 работодателями", verified: true },
      { label: "Рекомендации от коллег", detail: "6 рекомендаций, средний вес 0.81", verified: true },
      { label: "Сертификаты и курсы", detail: "Certified UX Professional — NN/g", verified: true },
      { label: "Поведение на площадке", detail: "Не срывала интервью, отвечает в течение 1 дня", verified: true },
    ],
    skills: [
      { name: "Figma", verified: true },
      { name: "Дизайн-системы", verified: true },
      { name: "Исследования пользователей", verified: true },
      { name: "Motion-дизайн", verified: false },
    ],
    experience: [
      {
        period: "2022 — н.в.",
        role: "Senior Product Designer",
        company: "FinFlow",
        verified: true,
        description: "Развитие мобильного приложения для платежей, вывела NPS с 34 до 52.",
      },
      {
        period: "2019 — 2022",
        role: "Product Designer",
        company: "Beeline Digital",
        verified: true,
        description: "Дизайн личного кабинета абонента, редизайн онбординга.",
      },
    ],
    portfolio: [
      { label: "Кейс: редизайн платёжного флоу", url: "#" },
      { label: "Behance", url: "#" },
    ],
    certificates: [{ name: "Certified UX Professional", issuer: "Nielsen Norman Group", verified: true }],
    summary:
      "Проектирую финтех-продукты последние 5 лет. Ищу команду, где дизайн влияет на продуктовые решения, а не оформляет готовые.",
  },
  {
    slug: "damir-seitov",
    name: "Дамир Сеитов",
    title: "Backend-разработчик",
    location: "Астана",
    openToRelocation: false,
    ratingOverall: 79,
    ratingComponents: [
      { label: "Подтверждённый опыт", detail: "6 лет, подтверждено 1 работодателем", verified: true },
      { label: "Рекомендации от коллег", detail: "3 рекомендации, средний вес 0.64", verified: true },
      { label: "Сертификаты и курсы", detail: "CKA — в процессе верификации", verified: false },
      { label: "Поведение на площадке", detail: "Одно пропущенное интервью за 2 года", verified: true },
    ],
    skills: [
      { name: "Go", verified: true },
      { name: "PostgreSQL", verified: true },
      { name: "Kubernetes", verified: false },
      { name: "gRPC", verified: true },
    ],
    experience: [
      {
        period: "2020 — н.в.",
        role: "Senior Backend Engineer",
        company: "Kaspi Marketplace",
        verified: true,
        description: "Проектирование сервисов обработки заказов, 4000+ RPS в пике.",
      },
    ],
    portfolio: [{ label: "GitHub", url: "#" }],
    certificates: [{ name: "Certified Kubernetes Administrator", issuer: "CNCF", verified: false }],
    summary: "Занимаюсь высоконагруженными системами. Интересны платёжные и логистические домены.",
  },
];

export const reviews: Review[] = [
  {
    id: "r1",
    author: "candidate",
    targetSlug: "nordwind-tech",
    rating: 82,
    categories: [
      { label: "Условия труда", score: 85 },
      { label: "Честность вакансии", score: 74 },
      { label: "Атмосфера", score: 88 },
      { label: "Оплата", score: 90 },
    ],
    text:
      "Собеседование прошло в 2 этапа, обратная связь пришла на следующий день. Задачи в целом совпали с описанием вакансии.",
    daysAgo: 14,
    blindRevealed: true,
  },
  {
    id: "r2",
    author: "company",
    targetSlug: "aisha-nurlanova",
    rating: 91,
    categories: [
      { label: "Пунктуальность", score: 95 },
      { label: "Компетентность", score: 92 },
      { label: "Коммуникация", score: 88 },
    ],
    text: "Чётко презентовала кейсы, задавала уточняющие вопросы по бизнес-метрикам, а не только по интерфейсу.",
    daysAgo: 30,
    blindRevealed: true,
  },
  {
    id: "r3",
    author: "candidate",
    targetSlug: "greenfield-logistics",
    rating: 61,
    categories: [
      { label: "Условия труда", score: 58 },
      { label: "Честность вакансии", score: 52 },
      { label: "Атмосфера", score: 64 },
      { label: "Оплата", score: 79 },
    ],
    text: "Оффер задержали на 2 недели без объяснений. Зарплата выплачивается вовремя, это плюс.",
    daysAgo: 5,
    blindRevealed: false,
  },
];

export function getJob(slug: string) {
  return jobs.find((j) => j.slug === slug);
}
export function getCompany(slug: string) {
  return companies.find((c) => c.slug === slug);
}
export function getCandidate(slug: string) {
  return candidates.find((c) => c.slug === slug);
}
export function getReviewsFor(slug: string) {
  return reviews.filter((r) => r.targetSlug === slug);
}
export function formatSalary(job: Job) {
  const fmt = (n: number) => n.toLocaleString("ru-RU");
  return `${fmt(job.salaryFrom)}–${fmt(job.salaryTo)} ${job.currency}`;
}
