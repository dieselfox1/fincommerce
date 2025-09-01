import { DispatchFromMap } from '@automattic/data-stores';
/**
 * Internal dependencies
 */
import TYPES from './action-types';
import { ReadOnlyProperties, PartialProduct, Product, ProductQuery } from './types';
export declare function getProductSuccess(id: number, product: PartialProduct): {
    type: TYPES.GET_PRODUCT_SUCCESS;
    id: number;
    product: PartialProduct;
};
export declare function getProductError(productId: number, error: unknown): {
    type: TYPES.GET_PRODUCT_ERROR;
    productId: number;
    error: unknown;
};
declare function createProductStart(): {
    type: TYPES.CREATE_PRODUCT_START;
};
declare function createProductSuccess(id: number, product: Partial<Product>): {
    type: TYPES.CREATE_PRODUCT_SUCCESS;
    id: number;
    product: Partial<Product>;
};
export declare function createProductError(query: Partial<Product>, error: unknown): {
    type: TYPES.CREATE_PRODUCT_ERROR;
    query: Partial<Product>;
    error: unknown;
};
declare function duplicateProductStart(id: number): {
    type: TYPES.DUPLICATE_PRODUCT_START;
    id: number;
};
declare function duplicateProductSuccess(id: number, product: Partial<Product>): {
    type: TYPES.DUPLICATE_PRODUCT_SUCCESS;
    id: number;
    product: Partial<Product>;
};
export declare function duplicateProductError(id: number, error: unknown): {
    type: TYPES.DUPLICATE_PRODUCT_ERROR;
    id: number;
    error: unknown;
};
declare function updateProductStart(id: number): {
    type: TYPES.UPDATE_PRODUCT_START;
    id: number;
};
declare function updateProductSuccess(id: number, product: Partial<Product>): {
    type: TYPES.UPDATE_PRODUCT_SUCCESS;
    id: number;
    product: Partial<Product>;
};
export declare function updateProductError(id: number, error: unknown): {
    type: TYPES.UPDATE_PRODUCT_ERROR;
    id: number;
    error: unknown;
};
export declare function getProductsSuccess(query: Partial<ProductQuery>, products: PartialProduct[], totalCount: number): {
    type: TYPES.GET_PRODUCTS_SUCCESS;
    products: PartialProduct[];
    query: Partial<ProductQuery>;
    totalCount: number;
};
export declare function getProductsError(query: Partial<ProductQuery>, error: unknown): {
    type: TYPES.GET_PRODUCTS_ERROR;
    query: Partial<ProductQuery>;
    error: unknown;
};
export declare function getProductsTotalCountSuccess(query: Partial<ProductQuery>, totalCount: number): {
    type: TYPES.GET_PRODUCTS_TOTAL_COUNT_SUCCESS;
    query: Partial<ProductQuery>;
    totalCount: number;
};
export declare function getProductsTotalCountError(query: Partial<ProductQuery>, error: unknown): {
    type: TYPES.GET_PRODUCTS_TOTAL_COUNT_ERROR;
    query: Partial<ProductQuery>;
    error: unknown;
};
export declare function createProduct(data: Partial<Omit<Product, ReadOnlyProperties>>): Generator<unknown, Product, Product>;
export declare function updateProduct(id: number, data: Partial<Omit<Product, ReadOnlyProperties>>): Generator<unknown, Product, Product>;
export declare function duplicateProduct(id: number, data: Partial<Omit<Product, ReadOnlyProperties>>): Generator<unknown, Product, Product>;
export declare function deleteProductStart(id: number): {
    type: TYPES.DELETE_PRODUCT_START;
    id: number;
};
export declare function deleteProductSuccess(id: number, product: PartialProduct, force: boolean): {
    type: TYPES.DELETE_PRODUCT_SUCCESS;
    id: number;
    product: PartialProduct;
    force: boolean;
};
export declare function deleteProductError(id: number, error: unknown): {
    type: TYPES.DELETE_PRODUCT_ERROR;
    id: number;
    error: unknown;
};
export declare function deleteProduct(id: number, force?: boolean): Generator<unknown, Product, Product>;
export declare function setSuggestedProductAction(key: string, items: Product[]): {
    type: TYPES.SET_SUGGESTED_PRODUCTS;
    key: string;
    items: Product[];
};
export type Actions = ReturnType<typeof createProductStart | typeof createProductError | typeof createProductSuccess | typeof getProductSuccess | typeof getProductError | typeof getProductsSuccess | typeof getProductsError | typeof getProductsTotalCountSuccess | typeof getProductsTotalCountError | typeof updateProductStart | typeof updateProductError | typeof updateProductSuccess | typeof deleteProductStart | typeof deleteProductSuccess | typeof deleteProductError | typeof duplicateProductStart | typeof duplicateProductError | typeof duplicateProductSuccess | typeof setSuggestedProductAction>;
export type ActionDispatchers = DispatchFromMap<{
    createProduct: typeof createProduct;
    updateProduct: typeof updateProduct;
    deleteProduct: typeof deleteProduct;
    duplicateProduct: typeof duplicateProduct;
}>;
export {};
//# sourceMappingURL=actions.d.ts.map