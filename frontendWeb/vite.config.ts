import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const port = Number(env.VITE_PORT) || 5173
  const targetBackend = env.VITE_BACKEND_ORIGIN || 'http://localhost:3000'

  return {
    plugins: [react()],
    server: {
      port,
      host: true,
      strictPort: false,
      proxy: {
        '/api': {
          target: targetBackend,
          changeOrigin: true,
          secure: false,
        },
        '/socket.io': {
          target: targetBackend,
          ws: true,
          changeOrigin: true,
        },
      },
    },
    preview: {
      port: 4173,
      host: true,
    },
  }
})
