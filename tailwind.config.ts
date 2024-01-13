import type { Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

// import forms from "@tailwindcss/forms";
import scrollbar from "tailwind-scrollbar";
// import animate from "tailwindcss-animate";
// require("@tailwindcss/typography"),

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      container: { center: true },
      fontFamily: {
        montserrat: ["var(--font-montserrat)", ...fontFamily.sans],
        scp: ["var(--font-scp)", ...fontFamily.mono],
      },
      colors: {
        primary: "#262626",
        theme: "#f3f3f3",
        "nav-active": "rgb(200,116,139)",
      },
    },
  },
  plugins: [scrollbar],
} satisfies Config;
