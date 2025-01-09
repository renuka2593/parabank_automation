import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [
    ["html", { open: "never", outputFolder: "test-report/ui-report" }],
    ["list", { printSteps: true }],
  ],
  use: {
    launchOptions: { slowMo: 100 },
    trace: "on-first-retry",
    headless: true,
    baseURL: "https://parabank.parasoft.com",
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
});
