import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import tailwindcss from '@tailwindcss/vite'
import { fileURLToPath } from "url";

// Convert import.meta.url to __dirname (ESM-safe)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  plugins: [
    react(),
    tailwindcss()
    // Tailwind CSS is used via PostCSS, no need for tailwindcss() here
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"), // same as TS alias
    },
  },
});
