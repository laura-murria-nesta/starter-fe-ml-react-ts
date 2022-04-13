import * as yup from "yup";

export const formatter = new Intl.NumberFormat('en-UK', {
    style: 'currency',
    currency: 'GBP',
    maximumFractionDigits: 0, // (causes 2500.99 to be printed as £2,501)
  });

export const oneOfEnum = <T>(enumObject: { [s: string]: T } | ArrayLike<T>) =>
  yup.mixed<T>().oneOf(Object.values(enumObject));
  
 