# Playwright Framework using Typescript

### This repository provides a comprehensive and flexible framework for testing a website [QA Practice/Spot the bugs](https://qa-practice.netlify.app/bugs-form) using Playwright and Typescript. This solution, built upon Playwright's integrated test runner and reporter, features cross-browser support, and a robust data-driven approach.

## 📌 Project Description
The tests included in this repository are identified by manually testing the website [QA Practice/Spot the bugs](https://qa-practice.netlify.app/bugs-form) and understanding what and how it will be automated.
### Lists of bugs found:
* no error validation for last name as required field
* last name output is not same as the entered value
* phone number accepts characters(should be digits only)
* phone number error message shows 'at least 10 characters!' when the validation should be '10 digits'
* no error validation for email as required field
* password input field is not hidden
* terms and condition checkbox is disabled
* 'Select a country' option is selectable
* no validation for correct email
* 'Phone nunber' label should be 'Phone number'
* Was able to submit with errors on fields
* the password was not displayed in the output below
* the successful banner is showing red instead of green bg color
* phone number result is not same with the entered value

### Test cases identified due to bugs which can be automated
* validate field labels
* validate field input types
* validate fields accepts inputs
* Validate submit with valid inputs
* validate submit with invalid inputs 
  * will check for required fields  

### Automated Tests in the file (spot-the-bugs-test.spec.ts)
* Validate all fields are present and can be interacted with - Will validate all fields by verifying visibility, filling up fields - verify if interactable, veriying type is correct for a field, and verifying the label text
* Validate required fields show error messages when left empty - Will validate the required fields functionality for certain required fields(fields with *)
* Validate successful form submission with valid data - Will validate the banner message/color and result fields when successfully submitted the form


## 🛠️ Framework and Dependencies

*   playwright
*   typescript

## 📦 Clone and Install packages
```
git clone https://github.com/arjonsensal/datacom-coding-assessment.git
```

```
cd datacom-coding-assessment
```

```
npm install
```
Install Playwright
```
npx playwright install
```

## ⚙️Running
For default environment - google chrome browser
```
npm run test
```
For different browsers
```
npm run test-firefox
```
```
npm run test-webkit
```
```
npm run test-all-browsers
```

### After running, the built-in HTML reporter should appear with the test results.

## 🙋‍♂️ Author

[Jose Arjon Sensal](https://www.linkedin.com/in/arjon-sensal-3b9507168)
