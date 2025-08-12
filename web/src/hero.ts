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
        success: {
          foreground: "#ffffff",
        },
        primary: {
          DEFAULT: "#20C9AD",
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
        success: {
          foreground: "#ffffff",
        },
        primary: {
          DEFAULT: "#20C9AD",
          foreground: "#ffffff",
        },
      },
    },
  },
});
