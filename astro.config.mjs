// @ts-check
import { defineConfig } from 'astro/config';

// Integraciones
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import partytown from '@astrojs/partytown';

// Tailwind v4 (Vite Plugin)
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  // ⚠️ CAMBIAR antes de deploy: afecta sitemap, canonical URLs y og:url
  site: process.env.PUBLIC_SITE_URL || 'https://tudominio.com',

  integrations: [
    react(),
    sitemap(),
    partytown({
      config: { forward: ['dataLayer.push'] },
    }),
  ],

  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
});
