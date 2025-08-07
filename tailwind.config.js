/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        "main-blue": "#003c79",
        "main-yellow": "#ffb750",
        "secondary-blue": "#67b2e8",
        "secondary-yellow": "#ea7100",
        "custom-gray": "#b6b8ba",
      },
    },
  },
  plugins: [],
};
