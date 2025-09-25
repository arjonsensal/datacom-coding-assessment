// Interface for the form data
export interface FormData {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  country: string;
  email: string;
  password: string;
}

// Interface for each expected field object in the array
export interface ExpectedField {
  fieldName: string;
  fieldLabel: string;
  expectedType: string;
}

// Interface for the top-level test data structure
export interface TestData {
  expectedFields: ExpectedField[];
  formData: FormData;
}