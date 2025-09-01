"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getShippingMethodsRequest = getShippingMethodsRequest;
exports.getShippingMethodsSuccess = getShippingMethodsSuccess;
exports.getShippingMethodsError = getShippingMethodsError;
/**
 * Internal dependencies
 */
const action_types_1 = require("./action-types");
function getShippingMethodsRequest() {
    return {
        type: action_types_1.ACTION_TYPES.GET_SHIPPING_METHODS_REQUEST,
    };
}
function getShippingMethodsSuccess(shippingMethods) {
    return {
        type: action_types_1.ACTION_TYPES.GET_SHIPPING_METHODS_SUCCESS,
        shippingMethods,
    };
}
function getShippingMethodsError(error) {
    return {
        type: action_types_1.ACTION_TYPES.GET_SHIPPING_METHODS_ERROR,
        error,
    };
}
