/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Warm, comfy color palette for early morning viewing
        cream: {
          50: '#fdfbf7',
          100: '#faf6ee',
          200: '#f5edd5',
          300: '#efe3bc',
          400: '#e5d08a',
          500: '#dbbe58',
          600: '#c5ab4f',
          700: '#a48f42',
          800: '#837235',
          900: '#6b5e2b',
        },
        warm: {
          50: '#fef9f3',
          100: '#fef3e7',
          200: '#fce0c3',
          300: '#facd9f',
          400: '#f7a857',
          500: '#f3820f',
          600: '#db750d',
          700: '#b6610b',
          800: '#924e09',
          900: '#774007',
        },
        sage: {
          50: '#f6f7f6',
          100: '#edefed',
          200: '#d2d7d2',
          300: '#b7bfb7',
          400: '#818e81',
          500: '#4b5e4b',
          600: '#445544',
          700: '#384738',
          800: '#2d392d',
          900: '#252f25',
        },
        sand: {
          50: '#faf8f5',
          100: '#f5f1eb',
          200: '#e6dccc',
          300: '#d7c7ad',
          400: '#b99d70',
          500: '#9b7333',
          600: '#8c682e',
          700: '#755726',
          800: '#5e461f',
          900: '#4d3919',
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
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}