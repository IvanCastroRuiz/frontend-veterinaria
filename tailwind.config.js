/** @type {import('tailwindcss').Config} */
export default {
  content: ["index.html", "./src/**/*.tsx"],
  theme: {
    extend: {
      backgroundColor: {
        'app-blue': '#76B7E3',
      }
    },
  },
  plugins: [],
}

