/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#10313c',
        ocean: '#0b5966',
        teal: '#0fa8a4',
        mint: '#dff5f1',
        fog: '#f4f8f7',
        line: '#e4edeb',
      },
      boxShadow: {
        card: '0 12px 32px rgba(16, 49, 60, 0.07)',
        lift: '0 22px 44px rgba(16, 49, 60, 0.14)',
        soft: '0 18px 50px rgba(5, 66, 77, 0.18)',
      },
      fontFamily: {
        display: ['"DM Serif Display"', 'Georgia', 'serif'],
        sans: ['Outfit', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
