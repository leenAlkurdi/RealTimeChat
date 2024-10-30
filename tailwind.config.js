/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "selector",
  content: ["./src/**/*.{html,js}", "node_modules/preline/dist/*.js"],
  theme: {
    extend: {
      spacing: {
        128: "58rem",
      },
    },
  },
  plugins: [require("preline/plugin")],
};
