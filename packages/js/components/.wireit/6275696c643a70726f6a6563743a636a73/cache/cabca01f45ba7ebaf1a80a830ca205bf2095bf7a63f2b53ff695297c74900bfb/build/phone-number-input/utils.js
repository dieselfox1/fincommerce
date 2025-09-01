"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseData = exports.countryToFlag = exports.decodeHtmlEntities = exports.guessCountryKey = exports.numberToE164 = exports.sanitizeInput = exports.sanitizeNumber = void 0;
const mapValues = (object, iteratee) => {
    const result = {};
    for (const key in object) {
        result[key] = iteratee(object[key]);
    }
    return result;
};
/**
 * Removes any non-digit character.
 */
const sanitizeNumber = (number) => number.replace(/\D/g, '');
exports.sanitizeNumber = sanitizeNumber;
/**
 * Removes any non-digit character, except space and hyphen.
 */
const sanitizeInput = (number) => number.replace(/[^\d -]/g, '');
exports.sanitizeInput = sanitizeInput;
/**
 * Converts a valid phone number to E.164 format.
 */
const numberToE164 = (number) => `+${(0, exports.sanitizeNumber)(number)}`;
exports.numberToE164 = numberToE164;
/**
 * Guesses the country code from a phone number.
 * If no match is found, it will fallback to US.
 *
 * @param number       Phone number including country code.
 * @param countryCodes List of country codes.
 * @return Country code in ISO 3166-1 alpha-2 format. e.g. US
 */
const guessCountryKey = (number, countryCodes) => {
    number = (0, exports.sanitizeNumber)(number);
    // Match each digit against countryCodes until a match is found
    for (let i = number.length; i > 0; i--) {
        const match = countryCodes[number.substring(0, i)];
        if (match)
            return match[0];
    }
    return 'US';
};
exports.guessCountryKey = guessCountryKey;
const entityTable = {
    atilde: 'ã',
    ccedil: 'ç',
    eacute: 'é',
    iacute: 'í',
};
/**
 * Replaces HTML entities from a predefined table.
 */
const decodeHtmlEntities = (str) => str.replace(/&(\S+?);/g, (match, p1) => entityTable[p1] || match);
exports.decodeHtmlEntities = decodeHtmlEntities;
const countryNames = mapValues({
    AC: 'Ascension Island',
    XK: 'Kosovo',
    ...(window.wcSettings?.countries || []),
}, (name) => (0, exports.decodeHtmlEntities)(name));
/**
 * Converts a country code to a flag twemoji URL from `s.w.org`.
 *
 * @param alpha2 Country code in ISO 3166-1 alpha-2 format. e.g. US
 * @return Country flag emoji URL.
 */
const countryToFlag = (alpha2) => {
    const name = alpha2
        .split('')
        .map((char) => (0x1f1e5 + (char.charCodeAt(0) % 32)).toString(16))
        .join('-');
    return `https://s.w.org/images/core/emoji/14.0.0/72x72/${name}.png`;
};
exports.countryToFlag = countryToFlag;
const pushOrAdd = (acc, key, value) => {
    if (acc[key]) {
        if (!acc[key].includes(value))
            acc[key].push(value);
    }
    else {
        acc[key] = [value];
    }
};
/**
 * Parses the data from `data.ts` into a more usable format.
 */
const parseData = (data) => ({
    countries: mapValues(data, (country) => ({
        ...country,
        name: countryNames[country.alpha2] ?? country.alpha2,
        flag: (0, exports.countryToFlag)(country.alpha2),
    })),
    countryCodes: Object.values(data)
        .sort((a, b) => (a.priority > b.priority ? 1 : -1))
        .reduce((acc, { code, alpha2, start }) => {
        pushOrAdd(acc, code, alpha2);
        if (start) {
            for (const str of start) {
                for (let i = 1; i <= str.length; i++) {
                    pushOrAdd(acc, code + str.substring(0, i), alpha2);
                }
            }
        }
        return acc;
    }, {}),
});
exports.parseData = parseData;
