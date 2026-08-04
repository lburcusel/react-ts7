import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/react-ts7/",
  build: {
    outDir: "react-ts7",
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("/src/pages/")) {
            const match = id.match(/\/src\/pages\/([^/]+)\.(?:ts|tsx)$/);
            if (match) {
              console.log(`Creating chunk for page: ${match}`);
              return `page-${match[1]}`;
            }
          }
        },
      },
    },
  },
});
