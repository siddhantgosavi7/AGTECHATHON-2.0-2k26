/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      colors: {
        leaf: {
          50: '#f2fbf3',
          100: '#def7e2',
          200: '#bfeec7',
          300: '#8dde9e',
          400: '#54c66e',
          500: '#2fa84f',
          600: '#218640',
          700: '#1d6936',
          800: '#1a542e',
          900: '#164628',
        },
        earth: {
          50: '#fbf8f1',
          100: '#f2ead8',
          200: '#e4d2ad',
          300: '#d2b379',
          400: '#bd914d',
          500: '#a87732',
          600: '#895b27',
          700: '#6d4522',
          800: '#5b3a22',
          900: '#4f3321',
        },
      },
      boxShadow: {
        soft: '0 18px 60px rgba(21, 78, 44, 0.14)',
      },
      backgroundImage: {
        farm:
          "linear-gradient(90deg, rgba(11,45,29,.78), rgba(11,45,29,.36)), url('https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1800&q=80')",
      },
    },
  },
  plugins: [],
};
