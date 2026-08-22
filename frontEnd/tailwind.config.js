/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./public/index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#24342d",
        mutedInk: "#68756d",
        cream: "#f5f1e8",
        paper: "#fbfaf6",
        sage: "#dce5d8",
        sageDark: "#879c89",
        clay: "#c76d50",
        line: "#d8d7cc",
      },

      fontFamily: {
        serif: ["Georgia", "Times New Roman", "serif"],
        sans: ["Arial", "Helvetica Neue", "sans-serif"],
      },
    },
  },
  plugins: [],
};