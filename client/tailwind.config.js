/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        signature: ["Lobster Two"],
        bodyFont: ["DM Sans", "sans-serif"],
        titleFont: ["Poppins", "sans-serif"],
      },
      colors: {
        primeColor: "#262626",
        lightText: "#6D6D6D",
        "light-gray": "#1f1f1f",
        "light-dark": "#151415",
        "medium-dark": "#0E0E0E",
        "main-theme": "#35ac76",
        "light-purple": "rgba(8, 26, 81, 0.17)",
        "light-white": "rgba(255,255,255,0.17)",
        "light-red": "rgba(255, 102, 102, 0.17)",
        "dark-white": "rgba(192, 192, 192, 0.1)",
        "medium-white": "rgba(192, 192, 192, 0.1)",
        "light-green": "rgba(102 , 255, 102, 0.17)",
      },
      maxWidth: {
        container: "1440px",
      },
      screens: {
        xs: "320px",
        sm: "375px",
        sml: "500px",
        md: "667px",
        mdl: "768px",
        lg: "960px",
        lgl: "1024px",
        xl: "1280px",
      },
      boxShadow: {
        testShadow: "0px 0px 54px -13px rgba(0,0,0,0.7)",
      },
    },
  },
  plugins: [],
};
