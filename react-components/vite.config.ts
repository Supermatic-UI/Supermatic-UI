import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dts from 'vite-plugin-dts';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), dts({
    insertTypesEntry: true,
    tsConfigFilePath: './tsconfig.json',
  })],
  build: {
    minify: false,
    // Output compiled files to /dist.
    outDir: './dist',
    lib: {
      // Set the entry point (file that contains our components exported).
      entry: resolve(__dirname, 'src/index.tsx'),
      // Name of the library.
      name: '@supermatic-ui/react-components',
      // We are building for CJS and ESM, use a function to rename automatically files.
      fileName: (format) => `supermatic-ui-react-components.${format}.js`,
    },
    rollupOptions: {
      // React is provided by the parent project, don't compile Vue source-code inside our library.
      external: ['react', 'react-dom', /^@supermatic-ui\/?.*$/],
      output: { globals: { react: 'react' } },
    },
  },
})
