/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          50: '#fdfaf7',
          100: '#f8f2ea',
          200: '#f0e5d5',
          300: '#e7d8c0',
          400: '#decaab',
          500: '#d5bd96',
          600: '#c9a97a',
          700: '#b3905e',
          800: '#8c6e47',
          900: '#6b5235',
        },
        warm: {
          50: '#fef8f3',
          100: '#fceee3',
          200: '#f8ddc7',
          300: '#f4cbab',
          400: '#f0b98f',
          500: '#eca773',
          600: '#e88d4f',
          700: '#d9752e',
          800: '#b35e22',
          900: '#8c491a',
        },
        sage: {
          50: '#f7f8f6',
          100: '#e8ebe6',
          200: '#d1d7cd',
          300: '#b9c3b4',
          400: '#a2af9b',
          500: '#8b9b82',
          600: '#72826a',
          700: '#5c6856',
          800: '#485142',
          900: '#363d32',
        },
        sand: {
          50: '#faf9f7',
          100: '#f2f0ec',
          200: '#e5e1d9',
          300: '#d8d2c6',
          400: '#cbc3b3',
          500: '#beb4a0',
          600: '#a8997e',
          700: '#8d7c61',
          800: '#6e5f49',
          900: '#544836',
        },
      },
      fontFamily: {
        sans: ['Inter var', 'system-ui', 'sans-serif'],
        serif: ['Merriweather', 'Georgia', 'serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.4s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
