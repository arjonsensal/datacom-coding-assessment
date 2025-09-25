import { chromium, type FullConfig } from '@playwright/test';

async function globalSetup(config: FullConfig) {
  const { baseURL, storageState } = config.projects[0].use;

  const browser = await chromium.launch();
  const page = await browser.newPage();

  if (!baseURL) {
    throw new Error('baseURL is not defined');
  }
  await page.goto(baseURL);
  console.log(`Navigated to ${baseURL}`);

  if (typeof storageState === 'string') {
    await page.context().storageState({ path: storageState });
  } else {
    throw new Error('storageState undefined');
  }

  await browser.close();
}

export default globalSetup;
