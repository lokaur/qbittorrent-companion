import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path';
import { viteStaticCopy } from 'vite-plugin-static-copy';

// https://vite.dev/config/
export default defineConfig(() => {
  const browser = process.env.TARGET_BROWSER || 'chrome';

  return {
    plugins: [
      react(),
      viteStaticCopy({
        targets: [
          {
            src: `src/manifests/${browser}/manifest.json`,
            dest: '.',
            rename: {
              stripBase: 3
            }
          }
        ]
      })
    ],
    build: {
      outDir: resolve(import.meta.dirname, `dist/${browser}`),
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
  };
})
