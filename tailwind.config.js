/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#FF6B35',
        dark: '#1a1a1a',
        darkCard: '#2a2a2a',
      },
    },
  },
  plugins: [],
}
