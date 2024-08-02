import { defineConfig } from 'vite';
import vercel from 'vite-plugin-vercel';
 
export default defineConfig({
  build: {
    rollupOptions: {
      input: './MainManagement/main.js',  
  },
  optimizeDeps: {
    include: ['gsap', 'three', 'dat.gui'],
  },
},
  server: {
    port: 5173,
  },
  plugins: [vercel()],
});