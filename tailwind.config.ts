import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

const config: Config = {
  content: ["./src/**/*.{ts,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: { DEFAULT: "#0B1E27", soft: "#2E4652" },
        paper: "#F1F6F8",
        page: "#F5F9FB",
        muted: { DEFAULT: "#5B7380", soft: "#8AA2AD" },
        line: "#D5E2E8",
        // Cor de destaque. O nome "amber" é histórico (a marca era âmbar até 10/2026);
        // hoje é o azul da identidade teal. Mantido para não renomear ~290 classes.
        amber: {
          DEFAULT: "#0EA5E9",
          deep: "#0369A1",
          light: "#38BDF8",
          soft: "#E0F2FE",
        },
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        accent: ["var(--font-accent)", "Georgia", "serif"],
      },
      maxWidth: { content: "1180px" },
      transitionTimingFunction: { brand: "cubic-bezier(.2,.7,.2,1)" },
    },
  },
  plugins: [typography],
};

export default config;
