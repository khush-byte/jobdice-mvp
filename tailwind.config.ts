import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        paper: "#F6F7FB",
        paperdim: "#EEF2F7",
        ink: { DEFAULT: "#142033", soft: "#475569", faint: "#94A3B8" },
        seal: { DEFAULT: "#059669", soft: "#ECFDF5" },
        brass: { DEFAULT: "#D97706", soft: "#FFFBEB" },
        clay: { DEFAULT: "#E11D48", soft: "#FFF1F2" },
        line: "#E2E8F0",
      },
      fontFamily: {
        serif: ["var(--font-source-serif)", "Georgia", "serif"],
        sans: ["var(--font-plex-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-plex-mono)", "monospace"],
      },
      borderRadius: { sm: "6px", DEFAULT: "10px", md: "14px", lg: "18px" },
      boxShadow: { none: "none" },
      maxWidth: { prose: "72ch" },
    },
  },
  plugins: [],
};
export default config;
