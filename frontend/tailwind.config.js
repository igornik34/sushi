/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'purple': '#6b068a',
        'dark-purple': '#47035d',
        'hover-purple': '#2b0239',
        'opacity-purple': '#6b068ae8',

        'pink': '#a715d7',
        'hover-pink': '#6d0d8d',
      }
    },
  },
  plugins: [],
}

