import { heroui } from "@heroui/react";
export default heroui({
  addCommonColors: true,
  themes: {
    light: {
      layout: {
        radius: {
          small: "4px",
          medium: "6px",
          large: "8px",
        },
      },
      colors: {
        content2: "#f4f7fb",
        foreground: "#3A4E79",
        background: {
          foreground: "#3A4E79",
        },
        default: {
          foreground: "#3A4E79",
        },
        primary: {
          50: "#e0fcf0",
          100: "#bdefda",
          200: "#99e4c3",
          300: "#72d8ac",
          400: "#4ccc94",
          500: "#33b37b",
          600: "#248b5f",
          700: "#176343",
          800: "#073d27",
          900: "#00160a",
          DEFAULT: "#3DC88B",
          foreground: "#ffffff",
        },
      },
    },
    dark: {
      layout: {
        radius: {
          small: "4px",
          medium: "6px",
          large: "8px",
        },
      },
      colors: {
        content1: "#323640",
        content2: "#242831",
        background: {
          DEFAULT: "#323640",
        },
        default: {
          DEFAULT: "#4a4b5b",
          100: "#23262d",
          200: "#585864",
          400: "#868698",
        },
        primary: {
          50: "#e0fcf0",
          100: "#bdefda",
          200: "#99e4c3",
          300: "#72d8ac",
          400: "#4ccc94",
          500: "#33b37b",
          600: "#248b5f",
          700: "#176343",
          800: "#073d27",
          900: "#00160a",
          DEFAULT: "#3DC88B",
          foreground: "#ffffff",
        },
      },
    },
  },
});
