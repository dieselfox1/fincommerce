/**
 * Internal dependencies
 */
import { ACTION_TYPES } from './action-types';
import { ShippingMethod } from './types';
export declare function getShippingMethodsRequest(): {
    type: ACTION_TYPES.GET_SHIPPING_METHODS_REQUEST;
};
export declare function getShippingMethodsSuccess(shippingMethods: ShippingMethod[]): {
    type: ACTION_TYPES.GET_SHIPPING_METHODS_SUCCESS;
    shippingMethods: ShippingMethod[];
};
export declare function getShippingMethodsError(error: unknown): {
    type: ACTION_TYPES.GET_SHIPPING_METHODS_ERROR;
    error: unknown;
};
export type Actions = ReturnType<typeof getShippingMethodsRequest> | ReturnType<typeof getShippingMethodsSuccess> | ReturnType<typeof getShippingMethodsError>;
//# sourceMappingURL=actions.d.ts.map