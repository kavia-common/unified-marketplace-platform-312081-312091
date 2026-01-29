import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// PUBLIC_INTERFACE
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 3000,
    strictPort: true,
    proxy: {
      // API proxy for local/dev parity; client can call /api/*.
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
      },
    },
  },
});
