/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'decathlon-blue': '#0082C3',
        'decathlon-dark': '#000000',
      },
    },
  },
  plugins: [],
}

