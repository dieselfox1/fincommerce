/**
 * Internal dependencies
 */
import TYPES from './action-types';
import { Locales, Country, GeolocationResponse } from './types';
export declare function getLocalesSuccess(locales: Locales): {
    type: TYPES.GET_LOCALES_SUCCESS;
    locales: Locales;
};
export declare function getLocalesError(error: unknown): {
    type: TYPES.GET_LOCALES_ERROR;
    error: unknown;
};
export declare function getCountriesSuccess(countries: Country[]): {
    type: TYPES.GET_COUNTRIES_SUCCESS;
    countries: Country[];
};
export declare function getCountriesError(error: unknown): {
    type: TYPES.GET_COUNTRIES_ERROR;
    error: unknown;
};
export declare function geolocationSuccess(geolocation: GeolocationResponse): {
    type: TYPES.GEOLOCATION_SUCCESS;
    geolocation: GeolocationResponse;
};
export declare function geolocationError(error: unknown): {
    type: TYPES.GEOLOCATION_ERROR;
    error: unknown;
};
export type Action = ReturnType<typeof getLocalesSuccess | typeof getLocalesError | typeof getCountriesSuccess | typeof getCountriesError | typeof geolocationSuccess | typeof geolocationError>;
//# sourceMappingURL=actions.d.ts.map