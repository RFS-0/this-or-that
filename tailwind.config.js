const defaultTheme = require('tailwindcss/defaultTheme')
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
     './index.html',
      "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
  theme: {
    screens: {
      'xs': '280px',
      ...defaultTheme.screens,
    },
    extend: {
      gridTemplateRows: {
              '12': 'repeat(12, minmax(0, 1fr))',
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
