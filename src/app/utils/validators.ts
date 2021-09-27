/**
 * Use for objects
 * @param value The object to check wether it's null
 * @returns True if "value" is null
 */
 export const isNull = (value: any): boolean => value == undefined || value == null;

 /**
  * Use for arrays
  * @param value The array to check wether it's null or has no elements
  * @returns True if "value" is null or has no elements
  */
 export const isNullOrEmpty = (value: any): boolean => isNull(value) || value.length == 0;
 
 /**
  * Use for numbers
  * @param value The number to check wether it's null or zero
  * @returns True if "value" is null or zero
  */
 export const isNullOrZero = (value: number): boolean => isNull(value) || value == 0;
 
 /**
  * Use for strings
  * @param value The string to check wether it's null or consists of only white spaces
  * @returns True if "value" is null or an empty string
  */
 export const isNullOrWhitespace = (value: any): boolean => isNull(value) || value.trim().length == 0;
 
 /**
  * Use for objects
  * @param value The object to check wether it's not null
  * @returns True if "value" is not null
  */
 export const notNull = (value: any): boolean => !isNull(value);
 
 /**
  * Use for arrays
  * @param value The array to check wether it's not null and has at least one element
  * @returns True if "value" is not null and not empty
  */
 export const notNullNorEmpty = (value: any[]): boolean => notNull(value) && value.length > 0;
 
 /**
  * Use for strings
  * @param value The string to check wether it's not null and has at least one non white space character
  * @returns True if "value" is not null and not an empty string
  */
 export const notNullNorWhitespace = (value: string): boolean => notNull(value) && value.trim().length > 0;
 
 /**
  * Use for numbers
  * @param value The number to check wether it's not null or zero
  * @returns True if "value" is not null and not zero
  */
  export const notNullNorZero = (value: number): boolean => notNull(value) && value != 0;