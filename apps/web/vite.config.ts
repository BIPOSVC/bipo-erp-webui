import path from 'node:path'
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, './src'),
    },
    // 确保 monorepo 下 React 单实例
    dedupe: ['react', 'react-dom'],
  },
  // @workspace/ui 是源码型 workspace 包,交给 Vite 直接编译而非预打包
  optimizeDeps: {
    exclude: ['@workspace/ui'],
  },
  server: {
    port: 5173,
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/test/setup.ts'],
    css: true,
    // 只跑 src 下的单元/组件测试;e2e/ 下的 *.spec.ts 交给 Playwright
    include: ['src/**/*.test.{ts,tsx}'],
    exclude: ['node_modules', 'dist', 'e2e'],
  },
})
