import path from 'path'
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

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
    ],

    // https://github.com/vitest-dev/vitest
    test: {
      environment: 'jsdom',
    },
  }
})
