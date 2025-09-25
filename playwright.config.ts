import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  globalSetup: './global-setup',
  testDir: './tests',
  fullyParallel: true,
  retries: 0,
  workers: 3,
  reporter: 'html',
  use: {
    baseURL: 'https://qa-practice.netlify.app',
    trace: 'on-first-retry',
  },

  projects: [
    {
      name: 'setup',
      use: { storageState: 'state.json' },
    },
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
});
