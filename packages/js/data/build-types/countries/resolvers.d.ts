import { DispatchFromMap } from '@automattic/data-stores';
/**
 * Internal dependencies
 */
import * as actions from './actions';
import { Locales, Country } from './types';
export declare function getLocale(): Generator<Object, void, unknown>;
export declare function getLocales(): Generator<{
    type: string;
    request: import("@wordpress/api-fetch/build-types/types").APIFetchOptions;
}, {
    type: import("./action-types").TYPES.GET_LOCALES_SUCCESS;
    locales: Locales;
} | {
    type: import("./action-types").TYPES.GET_LOCALES_ERROR;
    error: unknown;
}, Locales>;
export declare function getCountry(): Generator<Object, void, unknown>;
export declare function getCountries(): Generator<{
    type: string;
    request: import("@wordpress/api-fetch/build-types/types").APIFetchOptions;
}, {
    type: import("./action-types").TYPES.GET_COUNTRIES_SUCCESS;
    countries: Country[];
} | {
    type: import("./action-types").TYPES.GET_COUNTRIES_ERROR;
    error: unknown;
}, Country[]>;
export declare const geolocate: () => ({ dispatch }: {
    dispatch: DispatchFromMap<typeof actions>;
}) => Promise<void>;
//# sourceMappingURL=resolvers.d.ts.map