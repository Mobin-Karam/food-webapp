/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          red: '#D32F2F',
          'red-dark': '#B71C1C',
          'red-light': '#EF5350',
          yellow: '#FFC107',
          cream: '#FFF8F0',
          'gray-light': '#F5F5F5',
          'gray-mid': '#9E9E9E',
          dark: '#212121',
        },
      },
      fontFamily: {
        sans: ['Vazirmatn', 'Tahoma', 'Arial', 'sans-serif'],
      },
      boxShadow: {
        card: '0 2px 8px rgba(0,0,0,0.10)',
        'card-hover': '0 6px 20px rgba(211,47,47,0.12)',
      },
    },
  },
  plugins: [],
}
