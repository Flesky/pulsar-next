/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: 'var(--primary-500)',
          dark: 'var(--primary-600)',
        },
        success: '#28A745',
        danger: '#DC3545',
      },
    },
  },
  plugins: [],
}
