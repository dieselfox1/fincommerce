/**
 * Internal dependencies
 */
import { ShippingMethodsState } from './reducer';
import { ShippingMethod } from './types';
import { WPDataSelector, WPDataSelectors } from '../types';
export declare const getShippingMethods: (state: ShippingMethodsState) => ShippingMethod[];
export declare function isShippingMethodsUpdating(state: ShippingMethodsState): boolean;
export type ShippingMethodsSelectors = {
    getShippingMethods: WPDataSelector<typeof getShippingMethods>;
} & WPDataSelectors;
//# sourceMappingURL=selectors.d.ts.map