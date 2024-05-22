/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#CCDBDC",
        secondary: "#9AD1D4",
        textColor: "#003249",
        designColor1: "#80CED7",
        designColor2: "#007EA7",
      },
      animation: {
        slideUpAndFadeOut: "slideUpAndFadeOutFrame 1s ease-out",
      },
      keyframes: {
        slideUpAndFadeOutFrame: {
          "0%": {
            opacity: "0%",
            bottom: "0%",
          },
          "100%": {
            opacity: "100%",
            bottom: "40%",
          },
        },
      },
    },
  },
  plugins: [],
};
