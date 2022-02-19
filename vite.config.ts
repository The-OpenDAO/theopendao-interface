import { defineConfig } from 'vite'
import path from 'path'
import vue from '@vitejs/plugin-vue'
import WindiCSS from 'vite-plugin-windicss'
import inject from '@rollup/plugin-inject'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    // Listening on all local IPs
    host: true,
    // port: 8080,
    https: true,
    // Load proxy configuration from .env
    proxy: {
      // '/newapi': {
      //   target: 'https://xx.com',
      //   changeOrigin: true,
      //   ws: false,
      //   rewrite: (path) => path.replace(/^\/newapi/, '/api')
      // },
    },
  },
  alias: {
    '@': path.resolve(__dirname, 'src'),
  },
  plugins: [vue(), WindiCSS()],
  build: {
    chunkSizeWarningLimit: 6600,
    rollupOptions: {
      plugins: [inject({ Buffer: ['buffer', 'Buffer'] })],
    },
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },
})
