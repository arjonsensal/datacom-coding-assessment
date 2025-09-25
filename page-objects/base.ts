import { expect, Locator, Page } from "@playwright/test";

export class BasePage {
  constructor(public page: Page) {}

  async goto(path = '/') {
    await this.page.goto(path);
  }

  async validateInputFieldIsValid({locator, fieldLabel, expectedType}: {locator: Locator, fieldLabel: string, expectedType: string}) {
    await expect(locator, `${locator} should be visible`).toBeVisible();
    let labelLocator = locator.locator('label');
    await expect.soft(labelLocator, `${labelLocator} should contain ${fieldLabel} text`).toContainText(fieldLabel);
    let type = 'select'; 
    if (await locator.locator('input').isVisible()) {
      type = await locator.locator('input')?.getAttribute('type') || 'type'
    }
    await expect.soft(type, `Type for ${fieldLabel} should be ${expectedType}, Actual value: ${type}`).toBe(expectedType)
    switch (type) {
      case 'text':
      case 'tel':
        let input = await locator.locator('input')
        await this.fillText(input, 'Test');
        break;
      case 'select':
        let select = await locator.locator('select');
        let options = await select.locator('option');
        await expect.soft(await options.count(), `Options should be greater than 1`).toBeGreaterThan(1);
        let selectedOption = await options.nth(2).textContent() || 'Philippines';
        this.selectFromDropDown(select, selectedOption.trim())
        break;
      case 'checkbox':
        let checkbox = await locator.locator('input');
        console.log(`Checking the ${fieldLabel} checkbox`);
        await expect.soft(checkbox, "Checkbox should be enabled").toBeEnabled()
        console.log(`Verifying that ${fieldLabel} checkbox is checked`);
        await expect.soft(checkbox, "Checkbox should be unchecked").not.toBeChecked();
        break;  
      default:
        throw new Error(`Unsupported field type: ${type}`);
    }
  }

  async fillText(locator: Locator, text: string) {
    console.log(`Filled '${text}' into the ${locator} field`);
    await locator.fill(text);
    console.log(`Verifying that the field contains '${text}'`);
    await expect.soft(locator, `Expected value: ${text}`).toHaveValue(text);
  }

  async selectFromDropDown(locator: Locator, text: string) {
    await locator.selectOption(text);
    console.log(`Selected '${text?.trim()}' from ${locator} dropdown`);
    let selectedValue = await locator.inputValue();
    console.log(`Verifying that ${locator} dropdown contains '${text?.trim()}'`);
    await expect.soft(selectedValue?.trim(), `Selected value should be ${text}, Actual value: ${selectedValue.trim()}`).toBe(text);
  }
}
