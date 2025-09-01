"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Internal dependencies
 */
const action_types_1 = require("./action-types");
const reducer = (state = {
    providers: [],
    offlinePaymentGateways: [],
    suggestions: [],
    suggestionCategories: [],
    isFetching: false,
    isWooPayEligible: false,
    errors: {},
}, payload) => {
    if (payload && 'type' in payload) {
        switch (payload.type) {
            case action_types_1.ACTION_TYPES.GET_PAYMENT_PROVIDERS_REQUEST:
                return {
                    ...state,
                    isFetching: true,
                };
            case action_types_1.ACTION_TYPES.GET_PAYMENT_PROVIDERS_SUCCESS:
                return {
                    ...state,
                    isFetching: false,
                    providers: payload.providers,
                    offlinePaymentGateways: payload.offlinePaymentGateways,
                    suggestions: payload.suggestions,
                    suggestionCategories: payload.suggestionCategories,
                };
            case action_types_1.ACTION_TYPES.GET_PAYMENT_PROVIDERS_ERROR:
                return {
                    ...state,
                    isFetching: false,
                    errors: {
                        ...state.errors,
                        getPaymentGatewaySuggestions: payload.error,
                    },
                };
            case action_types_1.ACTION_TYPES.UPDATE_PROVIDER_ORDERING:
                return {
                    ...state,
                };
            case action_types_1.ACTION_TYPES.SET_IS_ELIGIBLE:
                return {
                    ...state,
                    isWooPayEligible: payload.isEligible,
                };
        }
    }
    return state;
};
exports.default = reducer;
