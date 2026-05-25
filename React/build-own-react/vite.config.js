import { defineConfig } from "vite"

export default defineConfig({
  esbuild: {
    jsx: "transform",
    jsxFactory: "MReact.createElement",
    jsxFragment: "MReact.Fragment",
  },
})
