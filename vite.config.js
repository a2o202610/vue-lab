import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
  ],
  // GitHub Pages 部署：访问路径带仓库名前缀，base 必须与仓库名一致
  // ⚠️ 部署前请确认：https://github.com/a2olite/personal-homepage
  base: '/personal-homepage/',
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
