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
      colors: { primary: "#262626" },
    },
  },
  plugins: [scrollbar],
} satisfies Config;
