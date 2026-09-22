import type { Metadata } from "next";
import { Source_Serif_4, IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AiAssistantWidget from "@/components/AiAssistantWidget";

const sourceSerif = Source_Serif_4({
  subsets: ["latin", "cyrillic"],
  variable: "--font-source-serif",
  weight: ["400", "600", "700"],
});

const plexSans = IBM_Plex_Sans({
  subsets: ["latin", "cyrillic"],
  variable: "--font-plex-sans",
  weight: ["400", "500", "600"],
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-plex-mono",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "JobDice — платформа поиска работы и найма с проверяемой репутацией",
  description:
    "JobDice выстраивает цифровое досье для каждого участника рынка труда: подтверждённое коллегами, работодателями и документами.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" className={`${sourceSerif.variable} ${plexSans.variable} ${plexMono.variable}`}>
      <body className="font-sans bg-[#F6F7FB] text-ink antialiased">
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <AiAssistantWidget />
      </body>
    </html>
  );
}
