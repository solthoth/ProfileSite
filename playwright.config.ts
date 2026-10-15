import { defineConfig, devices } from '@playwright/test'

// E2E_PORT lets a local run avoid a port another dev server already holds.
const port = process.env['E2E_PORT'] ?? '5173'

export default defineConfig({
  testDir: './e2e',
  timeout: 30_000,
  retries: process.env['CI'] ? 2 : 0,
  reporter: process.env['CI'] ? 'github' : 'list',
  use: {
    baseURL: `http://localhost:${port}`,
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  webServer: {
    command: `pnpm dev --port ${port} --strictPort`,
    url: `http://localhost:${port}`,
    reuseExistingServer: !process.env['CI'],
    timeout: 120_000,
  },
})
