// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // fuerza a Vite a resolver eventemitter3 al bundle ESM correcto
      'eventemitter3': path.resolve(__dirname, 'node_modules/eventemitter3/index.mjs')
    }
  },
  optimizeDeps: {
    include: [
      'tronweb',
      'eventemitter3'
    ]
  }
})
