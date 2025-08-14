import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

import { defineConfig } from 'vitest/config'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export default defineConfig({
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'), // aligne l'alias avec tsconfig
    },
  },
  test: {
    coverage: { reporter: ['text', 'lcov'] },
    css: false,
    exclude: ['**/tests/e2e/**', '**/node_modules/**'],
    globals: true,
    projects: [
      {
        test: {
          environment: 'node',
          globals: true,
          include: ['**/tests/unit/env.test.ts'],
        }
      },
      {
        resolve: {
          alias: {
            '@': resolve(__dirname, './src'),
          },
        },
        test: {
          environment: 'jsdom',
          exclude: ['**/tests/unit/env.test.ts', '**/tests/e2e/**', '**/node_modules/**'],
          globals: true,
          include: ['**/src/**/*.test.{ts,tsx}', '**/tests/unit/**/*.test.{ts,tsx}'],
          setupFiles: ['./tests/setupTests.ts'],
        }
      }
    ]
  },
})
