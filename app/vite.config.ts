import { VitePWA } from "vite-plugin-pwa";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { tanstackRouter } from "@tanstack/router-plugin/vite";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    allowedHosts: true,
  },
  plugins: [
    tanstackRouter({
      target: "react",
      autoCodeSplitting: true,
    }),
    react(),
    tailwindcss(),
    VitePWA({
      registerType: "autoUpdate",
      injectRegister: false,

      pwaAssets: {
        disabled: false,
        config: true,
      },

      manifest: {
        name: "IOT-WOL",
        short_name: "IOT-WOL",
        description:
          "An app that lets you turn on computers remotely with Wake-On-Lan using IOT and MQTT",
        theme_color: "#39CE8E",
      },

      workbox: {
        globPatterns: ["**/*.{js,css,html,svg,png,ico}"],
        cleanupOutdatedCaches: true,
        clientsClaim: true,
      },

      devOptions: {
        enabled: false,
        navigateFallback: "index.html",
        suppressWarnings: true,
        type: "module",
      },
    }),
  ],
  base: "/iot-wol/",
  build: {
    outDir: "../docs",
    emptyOutDir: true,
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes("@heroui")) {
            return "heroui";
          } else if (id.includes("mqtt")) {
            return "mqtt";
          } else if (id.includes("@fortawesome/free-solid-svg-icons")) {
            return "fortawesome-free-solid-svg-icons";
          } else if (id.includes("@fortawesome/free-brands-svg-icons")) {
            return "fortawesome-free-brands-svg-icons";
          }
        },
      },
    },
  },
});
