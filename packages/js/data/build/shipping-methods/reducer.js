"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Internal dependencies
 */
const action_types_1 = require("./action-types");
const reducer = (state = {
    shippingMethods: [],
    isUpdating: false,
    errors: {},
}, payload) => {
    if (payload && 'type' in payload) {
        switch (payload.type) {
            case action_types_1.ACTION_TYPES.GET_SHIPPING_METHODS_REQUEST:
                return {
                    ...state,
                    isUpdating: true,
                };
            case action_types_1.ACTION_TYPES.GET_SHIPPING_METHODS_SUCCESS:
                return {
                    ...state,
                    shippingMethods: payload.shippingMethods,
                    isUpdating: false,
                };
            case action_types_1.ACTION_TYPES.GET_SHIPPING_METHODS_ERROR:
                return {
                    ...state,
                    isUpdating: false,
                    errors: {
                        ...state.errors,
                        getShippingMethods: payload.error,
                    },
                };
        }
    }
    return state;
};
exports.default = reducer;
