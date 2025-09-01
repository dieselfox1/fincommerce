import { NumberConfig } from '@fincommerce/number';
/**
 * @typedef {import('@fincommerce/number').NumberConfig} NumberConfig
 */
/**
 * @typedef {Object} CurrencyProps
 * @property {string} code           Currency ISO code.
 * @property {string} symbol         Symbol, can be multi-character. Should be in plain text, w/o HTML markup. HTML entities will be decoded.
 * @property {string} symbolPosition Where the symbol should be relative to the amount. One of `'left' | 'right' | 'left_space | 'right_space'`.
 * @typedef {NumberConfig & CurrencyProps} CurrencyConfig
 */
export type SymbolPosition = 'left' | 'right' | 'left_space' | 'right_space';
export type CurrencyProps = {
    code: string;
    symbol: string;
    symbolPosition: SymbolPosition;
    priceFormat?: string;
};
export type CurrencyConfig = Partial<NumberConfig & CurrencyProps>;
export type Currency = {
    code: string;
    symbol: string;
    symbolPosition: string;
    decimalSeparator: string;
    priceFormat: string;
    thousandSeparator: string;
    precision: number;
};
export type CountryInfo = {
    currency_code: string;
    currency_pos: SymbolPosition;
    thousand_sep: string;
    decimal_sep: string;
    num_decimals: number;
    weight_unit: string;
    dimension_unit: string;
    direction: string;
    default_locale: string;
    name: string;
    singular: string;
    plural: string;
    short_symbol: string;
    locales: string[];
};
export declare const CurrencyFactory: (currencySetting?: CurrencyConfig) => {
    getCurrencyConfig: () => {
        code: string;
        symbol: string;
        symbolPosition: string;
        decimalSeparator: string;
        priceFormat: string;
        thousandSeparator: string;
        precision: number;
    };
    getDataForCountry: (countryCode: string, localeInfo?: Record<string, CountryInfo | undefined>, currencySymbols?: Record<string, string | undefined>) => CurrencyConfig | Record<string, never>;
    setCurrency: (setting?: CurrencyConfig) => void;
    formatAmount: (number: number | string, useCode?: boolean) => string;
    formatCurrency: (number: number | string) => string;
    getPriceFormat: (config: CurrencyConfig) => string;
    /**
     * Get the rounded decimal value of a number at the precision used for the current currency.
     * This is a work-around for fraction-cents, meant to be used like `wc_format_decimal`
     *
     * @param {number|string} number A floating point number (or integer), or string that converts to a number
     * @return {number} The original number rounded to a decimal point
     */
    formatDecimal(number: number | string): number;
    /**
     * Get the string representation of a floating point number to the precision used by the current currency.
     * This is different from `formatAmount` by not returning the currency symbol.
     *
     * @param {number|string} number A floating point number (or integer), or string that converts to a number
     * @return {string}               The original number rounded to a decimal point
     */
    formatDecimalString(number: number | string): string;
    /**
     * Render a currency for display in a component.
     *
     * @param {number|string} number A floating point number (or integer), or string that converts to a number
     * @return {Node|string} The number formatted as currency and rendered for display.
     */
    render(number: number | string): string | JSX.Element;
};
/**
 * Returns currency data by country/region. Contains code, symbol, position, thousands separator, decimal separator, and precision.
 *
 * Dev Note: When adding new currencies below, the exchange rate array should also be updated in FinCommerce Admin's `business-details.js`.
 *
 * @deprecated
 * @return {Object} Currency data.
 */
export declare function getCurrencyData(): {
    US: {
        code: string;
        symbol: string;
        symbolPosition: string;
        thousandSeparator: string;
        decimalSeparator: string;
        precision: number;
    };
    EU: {
        code: string;
        symbol: string;
        symbolPosition: string;
        thousandSeparator: string;
        decimalSeparator: string;
        precision: number;
    };
    IN: {
        code: string;
        symbol: string;
        symbolPosition: string;
        thousandSeparator: string;
        decimalSeparator: string;
        precision: number;
    };
    GB: {
        code: string;
        symbol: string;
        symbolPosition: string;
        thousandSeparator: string;
        decimalSeparator: string;
        precision: number;
    };
    BR: {
        code: string;
        symbol: string;
        symbolPosition: string;
        thousandSeparator: string;
        decimalSeparator: string;
        precision: number;
    };
    VN: {
        code: string;
        symbol: string;
        symbolPosition: string;
        thousandSeparator: string;
        decimalSeparator: string;
        precision: number;
    };
    ID: {
        code: string;
        symbol: string;
        symbolPosition: string;
        thousandSeparator: string;
        decimalSeparator: string;
        precision: number;
    };
    BD: {
        code: string;
        symbol: string;
        symbolPosition: string;
        thousandSeparator: string;
        decimalSeparator: string;
        precision: number;
    };
    PK: {
        code: string;
        symbol: string;
        symbolPosition: string;
        thousandSeparator: string;
        decimalSeparator: string;
        precision: number;
    };
    RU: {
        code: string;
        symbol: string;
        symbolPosition: string;
        thousandSeparator: string;
        decimalSeparator: string;
        precision: number;
    };
    TR: {
        code: string;
        symbol: string;
        symbolPosition: string;
        thousandSeparator: string;
        decimalSeparator: string;
        precision: number;
    };
    MX: {
        code: string;
        symbol: string;
        symbolPosition: string;
        thousandSeparator: string;
        decimalSeparator: string;
        precision: number;
    };
    CA: {
        code: string;
        symbol: string;
        symbolPosition: string;
        thousandSeparator: string;
        decimalSeparator: string;
        precision: number;
    };
};
/**
 * Localises a number or numeric string for display, adding the appropriate thousands and decimal separators.
 * For compatibility reasons, it returns the input if it's not a number or a string of numbers.
 */
export declare const localiseMonetaryValue: (config: NumberConfig, number: number | string | unknown) => unknown;
export declare const unformatLocalisedMonetaryValue: (config: NumberConfig, inputNumber: number | string | unknown) => {};
