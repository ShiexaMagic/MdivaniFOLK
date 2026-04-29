import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // NTS-inspired warm cream + near-black
        paper: {
          DEFAULT: "#f4f1ea",
          50: "#faf8f3",
          100: "#f4f1ea",
          200: "#ebe7dd",
          300: "#dcd6c8",
        },
        ink: {
          DEFAULT: "#0a0a0a",
          900: "#0a0a0a",
          800: "#1a1a1a",
          700: "#2a2a2a",
          500: "#666666",
          400: "#888888",
          300: "#b8b3a8",
        },
        accent: {
          DEFAULT: "#ff3b00",
          soft: "#ffe9e0",
        },
      },
      fontFamily: {
        sans: ["var(--font-body)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "Georgia", "serif"],
      },
      letterSpacing: {
        tightest: "-0.04em",
        wide2: "0.18em",
        wide3: "0.28em",
      },
      borderColor: {
        DEFAULT: "rgba(10,10,10,0.12)",
      },
    },
  },
  plugins: [],
};

export default config;
