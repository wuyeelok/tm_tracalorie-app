import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  root: resolve(__dirname, "src/"),
  base: "/tm_tracalorie-app/",
  build: {
    outDir: "../dist",
    emptyOutDir: true,
    rollupOptions: {
      input: {
        404: resolve(__dirname, "src/404.html"),
        home: resolve(__dirname, "src/index.html"),
      },
    },
  },
});
