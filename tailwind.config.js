/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#6B3C1C",
        bgWhite: "#FAFAFA",
        mainColor: "#D06F0E",
        textDark: "#282829",
        textDarkBlue: "#27304B",
        textSecondary: "#4E4F50",
        bgSecondary: "#3C3C3D",
        bgred: "#DA2B2F",
        success: "#15B756"
      },
      fontFamily: {
        roboto: ['Roboto', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
}