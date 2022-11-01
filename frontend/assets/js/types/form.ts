export interface PurchaseData {
  firstName: StringValidation;
  lastName: StringValidation;
  email: StringValidation;
  country: StringValidation;
  postalCode: StringValidation;
  phone: StringValidation;
  creditCard: StringValidation;
  CVV: StringValidation;
  expDate: StringValidation;
}

export interface StringValidation {
  value: string;
  isValid: boolean;
}

export interface SinglePurchaseData {
  firstName: string;
  lastName: string;
  email: string;
  country: string;
  postalCode: string;
  phone: string;
  creditCard: string;
  CVV: string;
  expDate: string;
}

export interface CountiresInterface {
  name: string;
  idd: string;
}
