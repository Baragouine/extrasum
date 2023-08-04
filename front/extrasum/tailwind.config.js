/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'screensize400px': '400px',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}

