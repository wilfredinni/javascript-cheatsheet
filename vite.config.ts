import path from 'path'
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig(async ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd(), '') }
  const { default: tailwindcss } = await import('@tailwindcss/vite')
  return {
    resolve: {
      alias: {
        '~/': `${path.resolve(__dirname, 'src')}/`,
      },
    },

    server: {
      proxy: {
        '/newsletter': {
          target: process.env.VITE_GRUDGET_ENDPOINT,
          changeOrigin: true,
          secure: false,
          rewrite: (path) => path.replace(/^\/newsletter/, ''),
        },
      },
    },

    plugins: [
      react(),
      tailwindcss(),
      VitePWA({
        registerType: 'autoUpdate',
        includeAssets: ['favicon.svg', 'safari-pinned-tab.svg'],
        manifest: {
          name: 'JavaScript Cheatsheet',
          short_name: 'JavaScript Cheatsheet',
          theme_color: '#ffffff',
          icons: [
            {
              src: '/android-chrome-192x192.png',
              sizes: '192x192',
              type: 'image/png',
            },
            {
              src: '/android-chrome-512x512.png',
              sizes: '512x512',
              type: 'image/png',
            },
            {
              src: '/android-chrome-512x512.png',
              sizes: '512x512',
              type: 'image/png',
              purpose: 'any maskable',
            },
          ],
        },
      }),
    ],

    // https://github.com/vitest-dev/vitest
    test: {
      environment: 'jsdom',
    },
  }
})
