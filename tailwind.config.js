/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        primary: "#FF6363",
        daySky: {
          top: "#246FD9",
          bottom: "#B7C9E3",
        },
        nightSky: {
          top: "#362A84",
          bottom: "#5936B4",
        },
      },
    },
  },
  plugins: [],
}