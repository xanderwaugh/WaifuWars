import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";
import scrollbar from "tailwind-scrollbar";
import animate from "tailwindcss-animate";
import { fontFamily } from "tailwindcss/defaultTheme";

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
        // primary: "#262626",
        theme: "#f3f3f3",
        "nav-active": "rgb(200,116,139)",
        // * ShadCN
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderColor: {
        DEFAULT: "hsl(var(--border))",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        // You can add custom 9anime-specific animations here if needed
        // e.g., a subtle pulse for the primary color or a specific hover effect
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        "slide-in-from-bottom": {
          from: { transform: "translateY(20px)", opacity: "0" },
          to: { transform: "translateY(0)", opacity: "1" },
        },
      },
      animation: {
        // Shadcn UI default animations
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        // Custom animations
        "fade-in": "fade-in 0.5s ease-out",
        "slide-in-from-bottom": "slide-in-from-bottom 0.5s ease-out forwards",
      },
    },
  },
  plugins: [scrollbar, animate, typography],
} satisfies Config;
