import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import basicSsl from '@vitejs/plugin-basic-ssl';

export default defineConfig({
  output: 'server',

  adapter: cloudflare({
    imageService: 'cloudflare-binding',
  }),

  vite: {
    plugins: [basicSsl()]
  },

    // Stronger warning suppression
    config: {
      onwarn(warning, warn) {
        if (warning.message?.includes('optimizeDeps.rolldownOptions')) return;
        warn(warning);
      },
    },

    build: {
      rollupOptions: {
        onwarn(warning, warn) {
          if (warning.message?.includes('optimizeDeps.rolldownOptions')) return;
          warn(warning);
        },
      },
    },

    // Important for the moduleType error
    ssr: {
      noExternal: ['@astrojs/cloudflare'],
    },
  },
);