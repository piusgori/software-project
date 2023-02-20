/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}", "./navigation/**/*.{js,jsx,ts,tsx}", "./screens/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
    colors: {
      "purple": "#a059f1",
      "green": "#377d07",
      "red": "#e2270d"
    }
  },
  plugins: [],
}
