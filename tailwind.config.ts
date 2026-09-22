import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        paper: "#F4F5F0",
        paperdim: "#E9EAE2",
        ink: {
          DEFAULT: "#161C2E",
          soft: "#3A4257",
          faint: "#78809A",
        },
        seal: {
          DEFAULT: "#2F6F52",
          soft: "#E4EEE7",
        },
        brass: {
          DEFAULT: "#C7962C",
          soft: "#F4E9CD",
        },
        clay: {
          DEFAULT: "#AE4E37",
          soft: "#F3E1DA",
        },
        line: "#D8D9CE",
      },
      fontFamily: {
        serif: ["var(--font-source-serif)", "Georgia", "serif"],
        sans: ["var(--font-plex-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-plex-mono)", "monospace"],
      },
      borderRadius: {
        sm: "3px",
        DEFAULT: "4px",
        md: "6px",
        lg: "8px",
      },
      boxShadow: {
        none: "none",
      },
      maxWidth: {
        prose: "72ch",
      },
    },
  },
  plugins: [],
};
export default config;
