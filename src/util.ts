import * as yup from "yup";

export const formatter = new Intl.NumberFormat('en-UK', {
    style: 'currency',
    currency: 'GBP',
    maximumFractionDigits: 0, // (causes 2500.99 to be printed as £2,501)
  });

export const oneOfEnum = <T>(enumObject: { [s: string]: T } | ArrayLike<T>) =>
  yup.mixed<T>().oneOf(Object.values(enumObject));

  type EnumKeys<Enum> = Exclude<keyof Enum, number>

export const enumObject = <Enum extends Record<string, number | string>>(e: Enum) => {
      const copy = {...e} as { [K in EnumKeys<Enum>]: Enum[K] };
      Object.values(e).forEach(value => typeof value === 'number' && delete copy[value]);
      return copy;
  };

export const enumKeys = <Enum extends Record<string, number | string>>(e: Enum) => {
    return Object.keys(enumObject(e)) as EnumKeys<Enum>[];
};
  
export const enumValues = <Enum extends Record<string, number | string>>(e: Enum) => {
  return [...new Set(Object.values(enumObject(e)))] as Enum[EnumKeys<Enum>][];
};
 