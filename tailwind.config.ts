import { type Config } from "tailwindcss";
import forms from "@tailwindcss/forms";
import scrollbar from "tailwind-scrollbar";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-montserrat)"],
        body: ["var(--font-montserrat)"],
      },
      colors: {
        primary: "#262626",
        // secondary: "#c80000",
        // header: "#ff6b6b",
        // accent: "#ffcc29",
      },
    },
  },
  plugins: [forms, scrollbar],
} satisfies Config;
