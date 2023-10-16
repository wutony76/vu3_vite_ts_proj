import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import eslintPlugin from "vite-plugin-eslint" // 新增這行
console.log('ttt', eslintPlugin)

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    eslintPlugin({ cache: false }) // 新增這行
  ],
})
