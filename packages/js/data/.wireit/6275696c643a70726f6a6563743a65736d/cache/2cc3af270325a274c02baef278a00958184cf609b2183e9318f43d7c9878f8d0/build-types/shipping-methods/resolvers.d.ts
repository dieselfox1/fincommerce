import { ShippingMethod } from './types';
export declare function getShippingMethods(forceDefaultSuggestions?: boolean): Generator<{
    type: string;
    request: import("@wordpress/api-fetch/build-types/types").APIFetchOptions;
} | {
    type: import("./action-types").ACTION_TYPES.GET_SHIPPING_METHODS_REQUEST;
} | {
    type: import("./action-types").ACTION_TYPES.GET_SHIPPING_METHODS_SUCCESS;
    shippingMethods: ShippingMethod[];
} | {
    type: import("./action-types").ACTION_TYPES.GET_SHIPPING_METHODS_ERROR;
    error: unknown;
}, void, ShippingMethod[]>;
//# sourceMappingURL=resolvers.d.ts.map