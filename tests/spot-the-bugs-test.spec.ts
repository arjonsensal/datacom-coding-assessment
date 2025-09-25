import { test, expect } from '../fixtures/custom-test';

test.describe('Spot The Bugs Form Tests', () => {
  test.beforeEach(async ({ spotTheBugsPage }) => {
    await spotTheBugsPage.goto();
  });

  test('Validate all fields are present and can be interacted with', async ({ spotTheBugsPage, testData }) => {
    await spotTheBugsPage.validateSpotTheBugsFields(testData.expectedFields);
  });

  test('Validate required fields show error messages when left empty', async ({ spotTheBugsPage }) => {
    await spotTheBugsPage.validateRequiredFields();
  });

  test('Validate successful form submission with valid data', async ({ spotTheBugsPage, testData }) => {
    let {formData} = testData;
    await spotTheBugsPage.fillUpForm(formData);
    await spotTheBugsPage.validateSuccessfulFormSubmission(formData)
  });
});