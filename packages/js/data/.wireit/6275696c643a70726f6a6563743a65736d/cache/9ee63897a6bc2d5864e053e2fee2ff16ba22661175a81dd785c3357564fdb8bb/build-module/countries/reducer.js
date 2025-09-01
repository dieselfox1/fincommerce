/**
 * External dependencies
 */
/**
 * Internal dependencies
 */
import TYPES from './action-types';
const reducer = (state = {
    errors: {},
    locales: {},
    countries: [],
    geolocation: undefined,
}, action) => {
    switch (action.type) {
        case TYPES.GET_LOCALES_SUCCESS:
            state = {
                ...state,
                locales: action.locales,
            };
            break;
        case TYPES.GET_LOCALES_ERROR:
            state = {
                ...state,
                errors: {
                    ...state.errors,
                    locales: action.error,
                },
            };
            break;
        case TYPES.GET_COUNTRIES_SUCCESS:
            state = {
                ...state,
                countries: action.countries,
            };
            break;
        case TYPES.GET_COUNTRIES_ERROR:
            state = {
                ...state,
                errors: {
                    ...state.errors,
                    countries: action.error,
                },
            };
            break;
        case TYPES.GEOLOCATION_SUCCESS:
            state = {
                ...state,
                geolocation: action.geolocation,
            };
            break;
        case TYPES.GEOLOCATION_ERROR:
            state = {
                ...state,
                errors: {
                    ...state.errors,
                    geolocation: action.error,
                },
            };
            break;
    }
    return state;
};
export default reducer;
