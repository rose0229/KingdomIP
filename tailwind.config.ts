import type { Config } from "tailwindcss";
import animate from "tailwindcss-animate";

const config: Config = {
  darkMode: ["class"],
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    container: {
      center: true,
      padding: "1rem",
      screens: {
        "2xl": "1180px"
      }
    },
    extend: {
      colors: {
        ink: "#111111",
        carbon: "#1a1a1a",
        line: "#2d2d2a",
        paper: "#f7f3e8",
        bone: "#fffaf0",
        lime: "#d8ff3f",
        cobalt: "#315cff",
        orange: "#ff6a2a"
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Arial", "sans-serif"],
        display: ["var(--font-space)", "Arial", "sans-serif"]
      },
      boxShadow: {
        line: "0 0 0 1px rgba(17,17,17,0.12)",
        glow: "0 0 0 1px rgba(216,255,63,0.35), 0 24px 80px rgba(216,255,63,0.12)"
      }
    }
  },
  plugins: [animate]
};

export default config;
