import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // Forward API calls and uploaded media to Django so the app runs same-origin in development.
    proxy: {
      '/api': {
        target: process.env.VITE_PROXY_TARGET || 'http://127.0.0.1:8000',
        // Keep the browser's Host header so absolute media URLs point back through the proxy
        changeOrigin: false,
      },
    },
  },
})
