/**
 * External dependencies
 */
import { Reducer } from 'redux';
import { ShippingMethod } from './types';
import { Actions } from './actions';
export type ShippingMethodsState = {
    shippingMethods: ShippingMethod[];
    isUpdating: boolean;
    errors: Record<string, unknown>;
};
declare const reducer: Reducer<ShippingMethodsState, Actions>;
export default reducer;
//# sourceMappingURL=reducer.d.ts.map