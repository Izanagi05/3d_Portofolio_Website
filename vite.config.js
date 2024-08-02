// vite.config.js
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    rollupOptions: {
      input: './MainManagement/main.js',  
  },
  optimizeDeps: {
    include: ['gsap', 'three', 'dat.gui'],
  },
}
})
