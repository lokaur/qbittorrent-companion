import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rolldownOptions: {
      input: {
        index: 'index.html',
        addTorrent: 'add-torrent.html',
        background: 'src/background/background.ts'
      },
      output: {
        entryFileNames: '[name].js'
      }
    }
  },
  server: {
    proxy: {
      '/qbt': {
        target: 'http://xpenology:9865',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/qbt/, ''),
        cookieDomainRewrite: 'localhost'
      }
    }
  }
})
