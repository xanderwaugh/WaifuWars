import { type Config } from "tailwindcss";
import scrollbar from "tailwind-scrollbar";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-montserrat)"],
        body: ["var(--font-montserrat)"],
      },
      colors: { primary: "#262626", theme: "#f3f3f3" },
    },
  },
  plugins: [scrollbar],
} satisfies Config;
