import {test as base, expect} from '@playwright/test';
import { SpotTheBugsPage } from '../page-objects/spotTheBugsPage';
import * as testDataJSON from '../test-data/testData.json';
import { TestData } from './types';
const testData: TestData = testDataJSON;
type Pages = {
  spotTheBugsPage : SpotTheBugsPage;
  testData: TestData;
};
const test = base.extend<Pages>({
  spotTheBugsPage: async ({ page }, use) => {
    await use(new SpotTheBugsPage(page));
  },
  testData: async ({}, use: (data: TestData) => Promise<void>) => {
    await use(testData);
  }
});
export { test, expect };
