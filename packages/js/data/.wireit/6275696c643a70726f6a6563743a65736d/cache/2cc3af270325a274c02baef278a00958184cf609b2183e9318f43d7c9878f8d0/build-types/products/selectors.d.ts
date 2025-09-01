import { WPDataSelector, WPDataSelectors } from '../types';
import { ProductState } from './reducer';
import { GetSuggestedProductsOptions, PartialProduct, ProductQuery } from './types';
import { ActionDispatchers } from './actions';
export declare const getProduct: (state: ProductState, productId: number, defaultValue?: undefined) => PartialProduct;
export declare const getProducts: ((state: ProductState, query: ProductQuery, defaultValue?: any) => any) & import("rememo").EnhancedSelector;
export declare const getProductsTotalCount: (state: ProductState, query: ProductQuery, defaultValue?: undefined) => number | undefined;
export declare const getProductsError: (state: ProductState, query: ProductQuery) => unknown;
export declare const getCreateProductError: (state: ProductState, query: ProductQuery) => unknown;
export declare const getUpdateProductError: (state: ProductState, id: number, query: ProductQuery) => unknown;
export declare const getDeleteProductError: (state: ProductState, id: number) => unknown;
export declare const isPending: (state: ProductState, action: keyof ActionDispatchers, productId?: number) => boolean;
export declare const getPermalinkParts: ((state: ProductState, productId: number) => {
    prefix: string;
    postName: string | undefined;
    suffix: string;
} | null) & import("rememo").EnhancedSelector;
/**
 * Returns an array of related products for a given product ID.
 *
 * @param {ProductState} state     - The current state.
 * @param {number}       productId - The product ID.
 * @return {PartialProduct[]}        The related products.
 */
export declare const getRelatedProducts: ((state: ProductState, productId: number) => PartialProduct[]) & import("rememo").EnhancedSelector;
/**
 * Return an array of suggested products the
 * given options.
 *
 * @param {ProductState}                state   - The current state.
 * @param {GetSuggestedProductsOptions} options - The options.
 * @return {PartialProduct[]}                     The suggested products.
 */
export declare function getSuggestedProducts(state: ProductState, options: GetSuggestedProductsOptions): PartialProduct[] | undefined;
export type ProductsSelectors = {
    getCreateProductError: WPDataSelector<typeof getCreateProductError>;
    getProduct: WPDataSelector<typeof getProduct>;
    getProducts: WPDataSelector<typeof getProducts>;
    getProductsTotalCount: WPDataSelector<typeof getProductsTotalCount>;
    getProductsError: WPDataSelector<typeof getProductsError>;
    isPending: WPDataSelector<typeof isPending>;
    getPermalinkParts: WPDataSelector<typeof getPermalinkParts>;
    getRelatedProducts: WPDataSelector<typeof getRelatedProducts>;
    getSuggestedProducts: WPDataSelector<typeof getSuggestedProducts>;
} & WPDataSelectors;
//# sourceMappingURL=selectors.d.ts.map