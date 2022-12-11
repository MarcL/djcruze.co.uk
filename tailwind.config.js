/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './_site/**/*.{html,js,liquid}'
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/typography')
  ],
};
