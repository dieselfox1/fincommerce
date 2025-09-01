/**
 * Internal dependencies
 */
import { ACTION_TYPES } from './action-types';
export function getShippingMethodsRequest() {
    return {
        type: ACTION_TYPES.GET_SHIPPING_METHODS_REQUEST,
    };
}
export function getShippingMethodsSuccess(shippingMethods) {
    return {
        type: ACTION_TYPES.GET_SHIPPING_METHODS_SUCCESS,
        shippingMethods,
    };
}
export function getShippingMethodsError(error) {
    return {
        type: ACTION_TYPES.GET_SHIPPING_METHODS_ERROR,
        error,
    };
}
