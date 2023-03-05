const defaultTheme = require("tailwindcss/defaultTheme");
const colors = require("tailwindcss/colors");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx,json}"],
  theme: {
    extend: {
      colors: {
        primary: colors.cyan,
      },
      fontFamily: {
        sans: ["Poppins", ...defaultTheme.fontFamily.sans],
      },
      aspectRatio: {
        card: "3 / 2",
      },
      zIndex: {
        60: 60,
        70: 70,
        80: 80,
      },
    },
  },
  plugins: [],
};
