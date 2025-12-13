import { heroui } from "@heroui/react";

export default heroui({
  addCommonColors: true,
  themes: {
    light: {
      layout: {
        radius: {
          small: "6px",
          medium: "8px",
          large: "10px",
        },
      },
      colors: {
        content2: "#E1E9EF",
        content3: "#fff",
        foreground: "#536777",
        background: {
          foreground: "#536777",
        },
        divider: "#d5dde7",
        default: {
          foreground: "#536777",
          DEFAULT: "#D2D4DA",
          "50": "#FAFAFA",
          "100": "#F4F4F6",
          "200": "#E3E4E9",
          "300": "#D2D4DA",
          "400": "#9DA1AF",
          "500": "#6D717F",
          "600": "#4E5260",
          "700": "#3C3F4A",
          "800": "#26272C",
          "900": "#17181D",
        },
        success: {
          DEFAULT: "#79D251",
          foreground: "#ffffff",
        },
        danger: {
          DEFAULT: "#D25153",
          foreground: "#ffffff",
        },
        primary: {
          DEFAULT: "#39CE8E",
          foreground: "#ffffff",
        },
      },
    },
    dark: {
      layout: {
        radius: {
          small: "6px",
          medium: "8px",
          large: "10px",
        },
      },
      colors: {
        content1: "#21323A",
        content2: "#1D282D",
        content3: "#1A2131",
        foreground: "#D8E6F0",
        background: {
          DEFAULT: "#21323A",
        },
        divider: "#425863",
        default: {
          DEFAULT: "#415B64",
          "50": "#171B1D",
          "100": "#262A2C",
          "200": "#3C464A",
          "300": "#4E5B60",
          "400": "#6D7A7F",
          "500": "#9DAAAF",
          "600": "#D2D8DA",
          "700": "#E3E7E9",
          "800": "#F4F5F6",
          "900": "#FAFAFA",
        },
        success: {
          DEFAULT: "#79D251",
          foreground: "#ffffff",
        },
        danger: {
          DEFAULT: "#D25153",
          foreground: "#ffffff",
        },
        primary: {
          DEFAULT: "#39CE8E",
          foreground: "#ffffff",
        },
      },
    },
  },
});
