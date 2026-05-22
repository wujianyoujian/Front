import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { normalizePath } from "vite";
import autoprefixer from "autoprefixer";
import pxtorem from "postcss-pxtorem";
import eslintPlugin from "@nabla/vite-plugin-eslint";
import viteStylelint from "vite-plugin-stylelint";
import viteImagemin from "vite-plugin-imagemin";
import testHookPlugin from "./test-hook-plugin";
import virtualFibModuleId from "./plugins/virual-module";

const variablePath = normalizePath(path.resolve("./src/variable.scss"));

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    eslintPlugin(),
    viteStylelint({
      exclude: "node_modules",
    }),
    viteImagemin({
      optipng: {
        optimizationLevel: 7,
      },
      pngquant: {
        quality: [0.8, 0.9],
      },
      // svg 优化
      svgo: {
        plugins: [
          {
            name: "removeViewBox",
          },
          {
            name: "removeEmptyAttrs",
            active: false,
          },
        ],
      },
    }),
    testHookPlugin(),
    virtualFibModuleId(),
  ],
  optimizeDeps: {
    // entries: '',
    force: false,
  },
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
        pxtorem({
          rootValue: 16,
          unitPrecision: 5,
          propList: ["*"],
          selectorBlackList: [],
          replace: true,
          mediaQuery: false,
          minPixelValue: 0,
        }),
      ],
    },
  },
  resolve: {
    alias: {
      "@assets": path.join(__dirname, "src/assets"),
      "@src": path.join(__dirname, "src/"),
    },
  },
  build: {
    cssCodeSplit: true,
    cssMinify: "lightningcss",
    chunkSizeWarningLimit: 1000,
    sourcemap: false,
    rolldownOptions: {
      output: {
        minify: { mangle: true, compress: true },
        codeSplitting: {
          groups: [
            {
              name: "react-vendor",
              test: /node_modules[\\/]react/,
              priority: 20,
            },
            {
              name: "arco-vendor",
              test: /node_modules[\\/]@arco-design[\\/]/,
              priority: 20,
            },
            {
              name: "antd-vendor",
              test: /node_modules[\\/]antd/,
              priority: 15,
            },
            {
              name: "vendor",
              test: /node_modules/,
              priority: 10,
            },
            {
              name: "common",
              minShareCount: 2,
              minSize: 10000,
              priority: 5,
            },
          ],
        },
      },
    },
  },
});
