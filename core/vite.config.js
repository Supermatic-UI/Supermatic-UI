// vite.config.js
import { resolve } from 'node:path';
const { defineConfig } = require('vite');
import dts from 'vite-plugin-dts';

export default defineConfig({
  plugins: [
    dts({
      insertTypesEntry: true
    })
  ],
  build: {
    minify: false,
    outDir: './dist',
    lib: {
      minify: false,
      entry: resolve(__dirname, 'src/index.ts'),
      name: '@supermatic-ui/core',
      fileName: (format) => `supermatic-ui-core.${format}.js`
    }
  }
});
