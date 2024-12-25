/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        dark: {
          bg: '#0f1014',
          card: '#16171d',
          input: '#262933',
        },
        brand: {
          yellow: '#ffe500',
          purple: '#cf68fb',
          green: '#4fffbc',
        },
      },
    },
  },
  plugins: [],
};