/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],

  theme: {
    fontFamily: {
      sans: ['Segoe UI', 'Tahoma', 'Geneva', 'Verdana', 'sans-serif']
    },
    extend: {
      colors: {
        // Gray
        'c-gray-50': '#F9FaFB',
        'c-gray-100': '#F3F4F6',
        'c-gray-300': '#D1D5DB',
        'c-gray-500': '#6B7280',
        'c-gray-800': '#1F2937',

        // Blue
        'c-blue-500': '#3B82F6',
        'c-blue-600': '#2563EB',
        'c-blue-700': '#4338CA',

        // Red
        'c-red-600': '#DC2626'
      }
    }
  },
  plugins: [require('@tailwindcss/forms')]
};
