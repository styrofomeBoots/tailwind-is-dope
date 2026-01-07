import tailwindcss from "@tailwindcss/vite";
import type { PluginOption } from "vite";

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  css: ["~/assets/css/main.css"],
  devtools: { enabled: true },
  ssr: false,
  vite: {
    plugins: [tailwindcss() as any satisfies PluginOption],
  },
});
