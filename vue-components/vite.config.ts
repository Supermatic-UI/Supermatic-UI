import { fileURLToPath, URL } from 'node:url'

import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx()],
  build: {
    minify: false,
    // Output compiled files to /dist.
    outDir: './dist',
    lib: {
      // Set the entry point (file that contains our components exported).
      entry: resolve(__dirname, 'src/index.ts'),
      // Name of the library.
      name: '@supermatic-ui/core',
      // We are building for CJS and ESM, use a function to rename automatically files.
      fileName: (format) => `${'supermatic-ui-vue-components'}.${format}.js`,
    },
    rollupOptions: {
      // Vue is provided by the parent project, don't compile Vue source-code inside our library.
      external: ['vue', /^@supermatic-ui.*$/],
      output: { globals: { vue: 'Vue' } },
    },
  },
})
