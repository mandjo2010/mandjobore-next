import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  expect: { timeout: 5_000 },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
  ],
  testDir: 'tests/e2e',
  timeout: 30_000,
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
  },
  webServer: {
    command: 'npm run start',
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
    url: 'http://localhost:3000',
  },
})
