import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/api": "note-master-r8ex.vercel.app",
    },
  },
  plugins: [react()],
  build: {
    outDir: 'dist'
  }
});
