/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        blue: {
          50: '#f0f7ff',
          100: '#e0eefe',
          200: '#bae0fd',
          300: '#7cc7fc',
          400: '#36a9f8',
          500: '#0e8ee7',
          600: '#0070cc',
          700: '#0052a5', // Primary blue
          800: '#003f7d',
          900: '#003461',
          950: '#002043',
        },
        yellow: {
          50: '#fefce8',
          100: '#fef9c3',
          200: '#fef08a',
          300: '#fde047',
          400: '#facc15',
          500: '#eab308',
          600: '#ca8a04',
          700: '#a16207', // Accent gold
          800: '#854d0e',
          900: '#713f12',
          950: '#422006',
        },
      },
      animation: {
        fadeIn: 'fadeIn 0.5s ease-out forwards',
        slideInLeft: 'slideInLeft 0.5s ease-out forwards',
        slideInRight: 'slideInRight 0.5s ease-out forwards',
        float: 'float 3s ease-in-out infinite',
      },
      transitionProperty: {
        'height': 'height',
        'spacing': 'margin, padding',
      },
    },
  },
  plugins: [],
};