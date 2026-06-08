import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: { DEFAULT: "#17140F", soft: "#3D372E" },
        paper: "#F4EFE6",
        page: "#FBF8F2",
        muted: { DEFAULT: "#7C7365", soft: "#9A9183" },
        line: "#E4DBCB",
        amber: {
          DEFAULT: "#B5762A",
          deep: "#8F5C1E",
          light: "#E0A45C",
          soft: "#F1E5CF",
        },
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      maxWidth: { content: "1180px" },
      transitionTimingFunction: { brand: "cubic-bezier(.2,.7,.2,1)" },
    },
  },
  plugins: [],
};

export default config;
