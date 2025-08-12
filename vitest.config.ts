import { defineConfig } from 'vitest/config'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export default defineConfig({
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./tests/setupTests.ts'],
    css: false,
    coverage: { reporter: ['text', 'lcov'] },
    exclude: ['**/tests/e2e/**', '**/node_modules/**'],
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'), // aligne l'alias avec tsconfig
    },
  },
})
