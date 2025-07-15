// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,ts,jsx,tsx,html}"],
  theme: {
    extend: {
      colors: {
        primary: "#5f6fff",
         myRed: "#ff0000",
      },
      gridTemplateColumn:{
        'auto':'repeat(auto-fill, minmax(200px, 1fr))'//topDoctors line number 9 //doctor.jsx 38
      },
    },
  },
  plugins: [],
};