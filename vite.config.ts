import fs from 'node:fs'
import path from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { buildSitemapXml } from './src/seo/buildSitemapXml'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'generate-sitemap',
      writeBundle(options) {
        const dir = options.dir ?? path.resolve('dist')
        fs.writeFileSync(path.join(dir, 'sitemap.xml'), buildSitemapXml(), 'utf8')
      },
    },
  ],
  server: {
    host: true,
    port: 5173
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules/three")) return "three";
          if (id.includes("node_modules/react-dom")) return "react-dom";
          if (id.includes("node_modules/react-router")) return "router";
        },
      },
    },
  },
})
