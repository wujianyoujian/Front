import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve'
import path from 'path';

/**
 * @type { import('rollup').RollupOptions }
 */
const buildOptions = {
  input: ["src/index.js", "src/util.js"],
  output: [{
    // 产物输出目录
    dir: 'dist/es',
    // 产物格式
    format: "esm",
    entryFileNames: `[name].js`,
    chunkFileNames: `[name]-[hash].js`,
    assetFileNames: `assets/[name]-[hash]-[extname]`,
    sourcemap: true,
  }, {
    // 产物输出目录
    dir: "dist/cjs",
    // 产物格式
    format: "cjs",
  }],
  external: ['react', 'react-dom'],
  plugins: [resolve(), commonjs()]
};

export default buildOptions;