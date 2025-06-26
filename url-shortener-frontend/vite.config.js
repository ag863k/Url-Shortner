import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
          ui: ['@mui/material']
        }
      }
    },
    chunkSizeWarningLimit: 1000,
    minify: 'esbuild', // Use esbuild instead of terser for speed
    target: 'es2015'
  },
  server: {
    host: true,
    port: 5173
  },
  esbuild: {
    drop: ['console', 'debugger'] // Remove console.log in production
  }
})
