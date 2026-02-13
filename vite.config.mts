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

    plugins: [react(), tailwindcss()],

    build: {
      sourcemap: true,
      chunkSizeWarningLimit: 650,
      rollupOptions: {
        output: {
          manualChunks(id: string) {
            if (!id.includes('node_modules')) {
              return undefined
            }

            if (id.includes('monaco-editor') || id.includes('@monaco-editor')) {
              return 'vendor-monaco'
            }

            if (id.includes('@tanstack/react-router')) {
              return 'vendor-router'
            }

            if (id.includes('react') || id.includes('react-dom') || id.includes('scheduler')) {
              return 'vendor-react'
            }

            if (id.includes('lucide-react')) {
              return 'vendor-icons'
            }

            if (id.includes('algolia') || id.includes('@docsearch')) {
              return 'vendor-search'
            }

            if (id.includes('prismjs') || id.includes('markdown-it')) {
              return 'vendor-markdown'
            }

            if (id.includes('@headlessui')) {
              return 'vendor-ui'
            }

            return undefined
          },
        },
      },
    },

    // https://github.com/vitest-dev/vitest
    test: {
      environment: 'jsdom',
    },
  }
})
