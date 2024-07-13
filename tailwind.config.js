/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/index.html",
    "./src/js/*.js"
  ],
  theme: {
    extend: {
      transitionDuration: {
        '1500': '1500ms',
        '2000': '2000ms',
      }
    },
  },
  plugins: [],
}

