import { Page, Locator } from 'playwright';
import { BasePage } from './base';
import { expect } from '@playwright/test';

export class SpotTheBugsPage extends BasePage {
  firstName: Locator;
  lastName: Locator;
  email: Locator;
  registerButton: Locator;
  phoneNumber: Locator;
  country: Locator;
  password: Locator;
  termsAndConditionCheckbox: Locator;
  bannerMessage: Locator;
  firstNameResult: Locator;
  lastNameResult: Locator;
  phoneNumberResult: Locator;
  countryResult: Locator;
  emailResult: Locator;

  constructor(page: Page) {
    super(page);
    this.firstName = page.locator("xpath=//input[@id='firstName']/parent::div");
    this.lastName = page.locator("xpath=//input[@id='lastName']/parent::div");
    this.phoneNumber = page.locator("xpath=//input[@id='phone']/parent::div");
    this.country = page.locator("xpath=//select[@id='countries_dropdown_menu']/parent::div");
    this.email = page.locator("xpath=//input[@id='emailAddress']/parent::div");
    this.password = page.locator("xpath=//input[@id='password']/parent::div");
    this.termsAndConditionCheckbox = page.locator("xpath=//input[@id='exampleCheck1']/parent::div");
    this.registerButton = page.locator("#registerBtn");
    this.bannerMessage = page.locator("#message");
    this.firstNameResult = page.locator("#resultFn");
    this.lastNameResult = page.locator("#resultLn");
    this.phoneNumberResult = page.locator("#resultPhone");
    this.countryResult = page.locator("#country");
    this.emailResult = page.locator("#resultEmail");
  }
  
  async goto(): Promise<void> {
    super.goto('/bugs-form')
  }

  async validateSpotTheBugsFields(fields: {fieldName: string, fieldLabel: string, expectedType: string}[]) {
    for (const field of fields) {
      await this.validateInputFieldIsValid({
        locator: this[field.fieldName],
        fieldLabel: field.fieldLabel,
        expectedType: field.expectedType
      });
    }
    await expect(this.registerButton, `Register button is visible`).toBeVisible();
    await expect(this.registerButton, "Register button text is Submit").toContainText('Register');
  }

  async validateRequiredFields() {
    // validate password
    await this.fillText(this.password.locator('input'), '');
    // verify banner message
    await this.submitForm('The password should contain between [6,20] characters!')
    await this.validateSuccessfulBannerMessage(false);
    await this.fillText(this.password.locator('input'), 'arjonsensal1');

    // validate phone
    await this.fillText(this.phoneNumber.locator('input'), '');
    await this.submitForm('The phone number should contain at least 10 characters!')
    await this.validateSuccessfulBannerMessage(false);
    await this.fillText(this.phoneNumber.locator('input'), '12345678901');

    // validate last name
    await this.fillText(this.lastName.locator('input'), '');
    await this.submitForm('The last name is required!')
    await this.validateSuccessfulBannerMessage(false);
    await this.fillText(this.lastName.locator('input'), 'Sensal');

    // validate email
    await this.fillText(this.email.locator('input'), '');
    await this.submitForm('Email is required!')
    await this.validateSuccessfulBannerMessage(false);
  }

  async submitForm(expectedMessage: string) {
    console.log('Clicking the Submit button');
    await this.registerButton.click();  
    console.log('Verifying banner message');
    await expect.soft(this.bannerMessage, `Banner Message should contain text ${expectedMessage}`).toContainText(expectedMessage);
  }

  async fillUpForm({firstName, lastName, phoneNumber, country, email, password}: 
    {firstName: string, lastName: string, phoneNumber: string, country: string, email: string, password: string}) {
    await this.fillText(this.firstName.locator('input'), firstName);
    await this.fillText(this.lastName.locator('input'), lastName);
    await this.fillText(this.phoneNumber.locator('input'), phoneNumber);
    await this.selectFromDropDown(this.country.locator('select'), country);
    await this.fillText(this.email.locator('input'), email);
    await this.fillText(this.password.locator('input'), password);
  }

  async validateSuccessfulFormSubmission({firstName, lastName, phoneNumber, country, email}: 
    {firstName: string, lastName: string, phoneNumber: string, country: string, email: string}) {
    await this.submitForm('Successfully registered the following information');
    await expect.soft(this.firstNameResult, `First name should contain ${firstName}`).toContainText(firstName);
    await expect.soft(this.lastNameResult, `Last name should contain ${lastName}`).toContainText(lastName);
    await expect.soft(this.phoneNumberResult, `Phone Number should contain ${phoneNumber}`).toContainText(phoneNumber);
    await expect.soft(this.countryResult, `Country should be ${country}`).toContainText(country);
    await expect.soft(this.emailResult, `Email should contain ${email}`).toContainText(email);
    this.validateSuccessfulBannerMessage(true);
  }

  async validateSuccessfulBannerMessage(expected: boolean) {
    // verify banner background color is not '#f8d7da' (red)
    const bgColor = await this.bannerMessage.evaluate((el) => {
       return window.getComputedStyle(el).getPropertyValue('background-color');
    });
    if (expected) {
      expect(bgColor, "Banner bg color should not be RED").not.toBe('rgb(248, 215, 218)');
    } else {
    expect(bgColor, "Banner bg color should be RED").toBe('rgb(248, 215, 218)'); 
    }
  }
}
