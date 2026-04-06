import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { normalizePath } from "vite";
import autoprefixer from "autoprefixer";
import eslintPlugin from "@nabla/vite-plugin-eslint";
import viteStylelint from "vite-plugin-stylelint";

const variablePath = normalizePath(path.resolve("./src/variable.scss"));

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    eslintPlugin(),
    viteStylelint({
      exclude: "node_modules",
    }),
  ],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "${variablePath}" as *;`,
      },
    },
    modules: {
      generateScopedName: "[local]_[hash:base64:5]",
    },
    postcss: {
      plugins: [
        autoprefixer({
          overrideBrowserslist: ["chrome > 40", "ff > 31", "ie 11"],
        }),
      ],
    },
  },
});
