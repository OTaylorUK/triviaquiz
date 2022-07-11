/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./slices/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        'custom-primary': 'var(--custom-primary)',
        'custom-secondary': 'var(--custom-secondary)',
        'custom-white': 'var(--custom-white)',
        'custom-accent-primary': 'var(--custom-accent-primary)',
        'custom-accent-secondary': 'var(--custom-accent-secondary)',
        'custom-faded-light': 'var(--custom-faded-light)',

      },
      fontFamily: {
        'sans': ['"Hind Siliguri"', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
}
