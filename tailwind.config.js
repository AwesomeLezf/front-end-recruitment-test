/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./frontend/assets/**/*.{edge,ts,vue}"],
  safelist: [],
  theme: {
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1440px",
      "3xl": "1670px",
    },
    colors: {
      transparent: "transparent",

      error: {
        100: "#FFBABA",
        200: "#D8000C",
      },
      success: {
        100: "#DFF2BF",
        200: "#4F8A10",
      },
      info: {
        100: "#BDE5F8",
        200: "#00529B",
      },
      purchase: {
        100: "#1AAC02",
        200: "#117102",
      },

      black: "#000",
      white: "#fff",

      gray: {
        100: "#F5F5F5",
        200: "#D9D9D9",
      },
    },
    backgroundColor: (theme) => theme("colors"),
    borderColor: (theme) => ({
      ...theme("colors"),
    }),
    fill: (theme) => ({
      ...theme("colors"),
      current: "currentColor",
      none: "none",
    }),
    fontFamily: {
      primary: "'Roboto', sans-serif",
    },
    boxShadow: {
      custom: "4px 4px 8px #00000004",
      custom2: "4px 4px 8px #00000010",
    },
    textColor: (theme) => theme("colors"),
  },
  corePlugins: {},
  plugins: [],
};
