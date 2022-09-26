/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx,json}", "./index.html"],
  theme: {
    extend: {},
  },
  plugins: [require("@tailwindcss/typography")],
};
