/**
 * External dependencies
 */
import { Reducer } from 'redux';
import { Actions } from './actions';
import type { PartialProduct, Product, SuggestedProductOptionsKey } from './types';
export type ProductState = {
    products: Record<string, {
        data: number[];
    }>;
    productsCount: Record<string, number>;
    errors: Record<string, unknown>;
    data: Record<number, PartialProduct>;
    pending: {
        createProduct?: boolean;
        updateProduct?: Record<number, boolean>;
        duplicateProduct?: Record<number, boolean>;
        deleteProduct?: Record<number, boolean>;
    };
    suggestedProducts: {
        [key in SuggestedProductOptionsKey]: {
            items: Product[];
        };
    };
};
declare const reducer: Reducer<ProductState, Actions>;
export type State = ReturnType<typeof reducer>;
export default reducer;
//# sourceMappingURL=reducer.d.ts.map