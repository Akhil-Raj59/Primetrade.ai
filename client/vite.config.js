import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss()],
    server: {
    host: true,      // 👈 allows access from LAN (your WiFi IP)
    port: 5173,      // 👈 optional: ensures same port each time
  },
})
