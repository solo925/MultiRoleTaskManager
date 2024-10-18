/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        back: '#111111',
        blue: '#5CB8E4',
        error: '#FF1E00',
        success: '#41B06E',
        slateGray: '#EEEEEE',
      },
    },
  },
  plugins: [],
};
