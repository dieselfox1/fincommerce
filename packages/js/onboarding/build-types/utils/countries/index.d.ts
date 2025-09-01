/**
 * Country state option.
 */
export type CountryStateOption = {
    key: string;
    label: string;
};
export type Location = {
    country_short?: string;
    region?: string;
    city?: string;
};
/**
 * Returns a country option for the given location.
 */
export declare const findCountryOption: (countryStateOptions: CountryStateOption[], location: Location | undefined, minimumSimilarity?: number) => CountryStateOption | null;
/**
 * Returns just the country portion of a country:state string that is delimited with a colon.
 *
 * @param countryPossiblyWithState Country string that may or may not have a state. e.g 'US:CA', 'UG:UG312'
 * @return Just the country portion of the string, or undefined if input is undefined. e.g 'US', 'UG'
 */
export declare const getCountry: (countryPossiblyWithState: string) => string;
//# sourceMappingURL=index.d.ts.map