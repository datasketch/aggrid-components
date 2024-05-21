import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dts from 'vite-plugin-dts'
import { resolve } from 'path'


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), dts({ rollupTypes: true })],
  build: {
    lib: {
      entry: resolve(__dirname, 'src', 'main.ts'),
      name: 'AggridComponents',
      fileName: (format) => `index.${format}.js`
    },
    emptyOutDir: true,
    sourcemap: true,
    rollupOptions: {
      external: ['react', 'react-dom', '@ag-grid-community/core', '@ag-grid-community/react', '@ag-grid-community/styles'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM'
        }
      }
    }
  }
})
