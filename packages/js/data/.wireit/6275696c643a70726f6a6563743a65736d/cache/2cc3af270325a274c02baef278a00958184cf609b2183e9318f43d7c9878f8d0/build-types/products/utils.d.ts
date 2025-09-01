import type { GetSuggestedProductsOptions, ProductQuery } from './types';
/**
 * Generate a resource name for products.
 *
 * @param {Object} query Query for products.
 * @return {string} Resource name for products.
 */
export declare function getProductResourceName(query: Partial<ProductQuery>): string;
/**
 * Generate a resource name for product totals count.
 *
 * It omits query parameters from the identifier that don't affect
 * totals values like pagination and response field filtering.
 *
 * @param {Object} query Query for product totals count.
 * @return {string} Resource name for product totals.
 */
export declare function getTotalProductCountResourceName(query: Partial<ProductQuery>): string;
/**
 * Create a unique string ID based the options object.
 *
 * @param {GetSuggestedProductsOptions} options - Options to create the ID from.
 * @return {string} Unique ID.
 */
export declare function createIdFromOptions(options?: GetSuggestedProductsOptions): string;
//# sourceMappingURL=utils.d.ts.map