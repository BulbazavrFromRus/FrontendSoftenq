import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server : {
    port : 8000,
    proxy: {
      '/api' : {
        target : 'http://localhost:3000/',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      },
      '/socket-io': {
        target: 'ws://localhost:8001',
        ws: true
      }
    },
  },
  plugins: [react()],
});
