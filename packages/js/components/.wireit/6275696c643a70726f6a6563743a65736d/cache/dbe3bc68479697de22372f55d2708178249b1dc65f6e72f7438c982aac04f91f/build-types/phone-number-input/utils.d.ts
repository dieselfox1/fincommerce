/**
 * Internal dependencies
 */
import type { DataType } from './types';
/**
 * Removes any non-digit character.
 */
export declare const sanitizeNumber: (number: string) => string;
/**
 * Removes any non-digit character, except space and hyphen.
 */
export declare const sanitizeInput: (number: string) => string;
/**
 * Converts a valid phone number to E.164 format.
 */
export declare const numberToE164: (number: string) => string;
/**
 * Guesses the country code from a phone number.
 * If no match is found, it will fallback to US.
 *
 * @param number       Phone number including country code.
 * @param countryCodes List of country codes.
 * @return Country code in ISO 3166-1 alpha-2 format. e.g. US
 */
export declare const guessCountryKey: (number: string, countryCodes: Record<string, string[]>) => string;
/**
 * Replaces HTML entities from a predefined table.
 */
export declare const decodeHtmlEntities: (str: string) => string;
/**
 * Converts a country code to a flag twemoji URL from `s.w.org`.
 *
 * @param alpha2 Country code in ISO 3166-1 alpha-2 format. e.g. US
 * @return Country flag emoji URL.
 */
export declare const countryToFlag: (alpha2: string) => string;
/**
 * Parses the data from `data.ts` into a more usable format.
 */
export declare const parseData: (data: DataType) => {
    countries: Record<string, {
        name: string;
        flag: string;
        alpha2: string;
        code: string;
        priority: number;
        start?: string[];
        lengths?: number[];
    }>;
    countryCodes: Record<string, string[]>;
};
export type Country = ReturnType<typeof parseData>['countries'][0];
//# sourceMappingURL=utils.d.ts.map