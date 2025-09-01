/**
 *	Mobile phone number validation based on `data.ts` rules.
 *  If no country is provided, it will try to guess it from the number or fallback to US.
 *
 * @param number        Phone number to validate in E.164 format. e.g. +12345678901
 * @param countryAlpha2 Country code in ISO 3166-1 alpha-2 format. e.g. US
 * @return boolean
 */
export declare const validatePhoneNumber: (number: string, countryAlpha2?: string) => boolean;
//# sourceMappingURL=validation.d.ts.map