"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatCurrencyDisplayValue = void 0;
/**
 * Internal dependencies
 */
const constants_1 = require("./constants");
/**
 * Cleans and formats the currency value shown to the user.
 *
 * @param {string} value          Form value.
 * @param {Object} currencyConfig Currency context.
 * @return {string} Display value.
 */
const formatCurrencyDisplayValue = (value, currencyConfig, format) => {
    const { decimalSeparator, thousandSeparator } = currencyConfig;
    const regex = new RegExp(constants_1.NUMBERS_AND_ALLOWED_CHARS.replace('%s1', decimalSeparator).replace('%s2', thousandSeparator), 'g');
    return value === undefined ? value : format(value).replace(regex, '');
};
exports.formatCurrencyDisplayValue = formatCurrencyDisplayValue;
