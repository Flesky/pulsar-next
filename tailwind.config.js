/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      colors: {
        primary: {
          lighter: 'var(--primary-300)',
          light: 'var(--primary-400)',
          DEFAULT: 'var(--primary-500)',
          dark: 'var(--primary-600)',
          darker: 'var(--primary-700)',
        },
        success: '#28A745',
        danger: '#DC3545',
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
}
