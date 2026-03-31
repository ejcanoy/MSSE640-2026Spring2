/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        accent: {
          500: "#0f766e",
          600: "#0d5f59"
        }
      }
    }
  },
  plugins: []
};
