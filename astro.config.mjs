// @ts-check
import { defineConfig } from "astro/config";
import { fileURLToPath } from "url";

// Integraciones
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import partytown from "@astrojs/partytown";
import node from "@astrojs/node";

// Tailwind v4 (Vite Plugin)
import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  output: "server",

  // Adapter: swap for @astrojs/vercel, @astrojs/netlify, @astrojs/cloudflare, etc.
  adapter: node({ mode: "standalone" }),

  // CAMBIAR: Importante para sitemap y Open Graph
  site: "https://placeholder.com",

  integrations: [
    react(),
    sitemap(),
    partytown({
      config: { forward: ["dataLayer.push"] },
    }),
  ],

  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
  },
});
