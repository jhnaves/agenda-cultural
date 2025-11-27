import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@tailwindcss/vite';

import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://agenda-cultural.vercel.app', // TODO: Replace with your actual domain
  integrations: [react(), sitemap()],
  server: {
    host: true,
    port: 4321
  },
  vite: {
    plugins: [tailwind()]
  }
});