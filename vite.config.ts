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
          const match = id.match(/[\\/]src[\\/](pages|components)[\\/]([^/?]+)\.(?:ts|tsx)(?:\?.*)?$/);
          return match && `${match[1] === "pages" ? "page" : "component"}-${match[2]}`;
        },
      },
    },
  },
});
