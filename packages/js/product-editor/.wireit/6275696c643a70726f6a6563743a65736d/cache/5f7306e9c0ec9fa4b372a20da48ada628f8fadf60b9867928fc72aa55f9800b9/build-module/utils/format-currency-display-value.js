/**
 * Internal dependencies
 */
import { NUMBERS_AND_ALLOWED_CHARS } from './constants';
/**
 * Cleans and formats the currency value shown to the user.
 *
 * @param {string} value          Form value.
 * @param {Object} currencyConfig Currency context.
 * @return {string} Display value.
 */
export const formatCurrencyDisplayValue = (value, currencyConfig, format) => {
    const { decimalSeparator, thousandSeparator } = currencyConfig;
    const regex = new RegExp(NUMBERS_AND_ALLOWED_CHARS.replace('%s1', decimalSeparator).replace('%s2', thousandSeparator), 'g');
    return value === undefined ? value : format(value).replace(regex, '');
};
