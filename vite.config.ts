import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import eslintPlugin from "vite-plugin-eslint" // 新增這行

export default defineConfig({
  // root: './public/',
  base: './',
  plugins: [
    vue(),
    // eslintPlugin({
    //   cache: false,
    //   fix: true
    // }) // 新增這行
  ],
  publicDir: 'public',
  resolve: {
    alias: [
      { find: '@', replacement: '/src' },
      { find: 'assets', replacement: '/src/assets' },
    ]
  }
})
