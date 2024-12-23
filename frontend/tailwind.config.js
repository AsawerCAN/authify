import daisyui from "daisyui";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        dark: "#000000",
        purpleDeep: "#3E065F",
        purple: "#700B97",
        purpleLight: "#8E05C2",
      },
    },
  },
  darkMode: "class",
  plugins: [daisyui],
  daisyui: {
    themes: ["light", "dark"],
  },
};
