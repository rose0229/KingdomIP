import type { Config } from "tailwindcss";
import animate from "tailwindcss-animate";

// Colors come from CSS variables in app/globals.css (designed in OKLCH,
// shipped as sRGB). Light and dark themes swap the variables, so the same
// class works in both: ink is text, paper is the page, bone is a card.
const token = (name: string) => `rgb(var(--${name}) / <alpha-value>)`;

const config: Config = {
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
        ink: token("ink"),
        paper: token("paper"),
        bone: token("bone"),
        accent: token("accent"),
        "on-accent": token("on-accent")
      },
      fontFamily: {
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "Georgia", "serif"]
      },
      transitionTimingFunction: {
        calm: "cubic-bezier(0.2, 0.7, 0.2, 1)"
      }
    }
  },
  plugins: [animate]
};

export default config;
