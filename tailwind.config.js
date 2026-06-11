/** @type {import('tailwindcss').Config} */

export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
    },
    extend: {
      colors: {
        primary: {
          DEFAULT: '#e94560',
          50: '#fef2f4',
          100: '#fee2e4',
          200: '#fecdd3',
          300: '#fda4af',
          400: '#fb7185',
          500: '#e94560',
          600: '#d63651',
          700: '#b91c43',
          800: '#9f1239',
          900: '#881337',
        },
        secondary: {
          DEFAULT: '#16213e',
          50: '#f0f4f8',
          100: '#d9e2ec',
          200: '#bcccdc',
          300: '#9fb3c8',
          400: '#829ab1',
          500: '#627d98',
          600: '#486581',
          700: '#334e68',
          800: '#16213e',
          900: '#102a43',
        },
        accent: {
          DEFAULT: '#4ecca3',
          50: '#f0fdf9',
          100: '#ccfbf1',
          200: '#99f6e4',
          300: '#5eead4',
          400: '#4ecca3',
          500: '#3db892',
          600: '#2a9d8f',
          700: '#26867c',
          800: '#1f6d69',
          900: '#1a535c',
        },
        dark: {
          DEFAULT: '#0f0f23',
          100: '#1a1a2e',
          200: '#16213e',
        }
      },
      fontFamily: {
        sans: ['Noto Sans SC', 'system-ui', 'sans-serif'],
        serif: ['Noto Serif SC', 'Georgia', 'serif'],
      },
    },
  },
  plugins: [],
};
