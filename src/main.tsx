import { createRoot } from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import { RouterProvider } from '@tanstack/react-router'
import { router } from './router'
import { ReaderProvider } from './context/reader'
import { ThemeProvider } from './context/theme'
import './styles/index.css'

const rootElement = document.getElementById('root')

if (!rootElement) {
  throw new Error('Root element not found')
}

createRoot(rootElement).render(
  <HelmetProvider>
    <ThemeProvider>
      <ReaderProvider>
        <RouterProvider router={router} />
      </ReaderProvider>
    </ThemeProvider>
  </HelmetProvider>,
)
