type CurrencyConfig = {
    code: string;
    symbol: string;
    symbolPosition: string;
    decimalSeparator: string;
    priceFormat: string;
    thousandSeparator: string;
    precision: number;
};
/**
 * Cleans and formats the currency value shown to the user.
 *
 * @param {string} value          Form value.
 * @param {Object} currencyConfig Currency context.
 * @return {string} Display value.
 */
export declare const formatCurrencyDisplayValue: (value: string, currencyConfig: CurrencyConfig, format: (number: number | string) => string) => string;
export {};
//# sourceMappingURL=format-currency-display-value.d.ts.map