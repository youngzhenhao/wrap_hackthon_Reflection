import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      'events': 'events'
    }
  },
  plugins: [vue()],
  base: './',
  esbuild: {
    target: "ESNext",
  }
})
