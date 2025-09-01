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
 * Get input props for currency related values and symbol positions.
 *
 * @param {Object} currencyConfig - Currency context
 * @return {Object} Props.
 */
export declare const getCurrencySymbolProps: (currencyConfig: CurrencyConfig) => {
    [x: string]: string;
};
export {};
//# sourceMappingURL=get-currency-symbol-props.d.ts.map