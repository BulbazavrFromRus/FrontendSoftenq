import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server : {
    port : 8000,
    host:true,
    proxy: {
      '/api' : {
        target : 'http://localhost:3000/',
        changeOrigin: true,
        // rewrite: (path) => path.replace(/^\/api/, '')
      },
      '/ws': {
        target: 'http://localhost:8001/',
        rewrite: (path) => path.replace(/^\/socket.io/, ''),
        ws: true
      }
    },
  },
  plugins: [react()],
});
