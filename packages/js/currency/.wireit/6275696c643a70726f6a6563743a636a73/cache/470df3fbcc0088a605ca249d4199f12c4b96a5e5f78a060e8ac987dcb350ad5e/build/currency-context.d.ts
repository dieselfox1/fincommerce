export function getFilteredCurrencyInstance(query: any): {
    getCurrencyConfig: () => {
        code: string;
        symbol: string;
        symbolPosition: string;
        decimalSeparator: string;
        priceFormat: string;
        thousandSeparator: string;
        precision: number;
    };
    getDataForCountry: (countryCode: string, localeInfo?: Record<string, import("./utils").CountryInfo | undefined>, currencySymbols?: Record<string, string | undefined>) => import("./utils").CurrencyConfig | Record<string, never>;
    setCurrency: (setting?: import("./utils").CurrencyConfig) => void;
    formatAmount: (number: number | string, useCode?: boolean) => string;
    formatCurrency: (number: number | string) => string;
    getPriceFormat: (config: import("./utils").CurrencyConfig) => string;
    formatDecimal(number: number | string): number;
    formatDecimalString(number: number | string): string;
    render(number: number | string): string | JSX.Element;
};
export const CurrencyContext: import("react").Context<{
    getCurrencyConfig: () => {
        code: string;
        symbol: string;
        symbolPosition: string;
        decimalSeparator: string;
        priceFormat: string;
        thousandSeparator: string;
        precision: number;
    };
    getDataForCountry: (countryCode: string, localeInfo?: Record<string, import("./utils").CountryInfo | undefined>, currencySymbols?: Record<string, string | undefined>) => import("./utils").CurrencyConfig | Record<string, never>;
    setCurrency: (setting?: import("./utils").CurrencyConfig) => void;
    formatAmount: (number: number | string, useCode?: boolean) => string;
    formatCurrency: (number: number | string) => string;
    getPriceFormat: (config: import("./utils").CurrencyConfig) => string;
    formatDecimal(number: number | string): number;
    formatDecimalString(number: number | string): string;
    render(number: number | string): string | JSX.Element;
}>;
