/**
 * External dependencies
 */
import { apiFetch } from '@wordpress/data-controls';
/**
 * Internal dependencies
 */
import TYPES from './action-types';
import { WC_PRODUCT_NAMESPACE } from './constants';
export function getProductSuccess(id, product) {
    return {
        type: TYPES.GET_PRODUCT_SUCCESS,
        id,
        product,
    };
}
export function getProductError(productId, error) {
    return {
        type: TYPES.GET_PRODUCT_ERROR,
        productId,
        error,
    };
}
function createProductStart() {
    return {
        type: TYPES.CREATE_PRODUCT_START,
    };
}
function createProductSuccess(id, product) {
    return {
        type: TYPES.CREATE_PRODUCT_SUCCESS,
        id,
        product,
    };
}
export function createProductError(query, error) {
    return {
        type: TYPES.CREATE_PRODUCT_ERROR,
        query,
        error,
    };
}
function duplicateProductStart(id) {
    return {
        type: TYPES.DUPLICATE_PRODUCT_START,
        id,
    };
}
function duplicateProductSuccess(id, product) {
    return {
        type: TYPES.DUPLICATE_PRODUCT_SUCCESS,
        id,
        product,
    };
}
export function duplicateProductError(id, error) {
    return {
        type: TYPES.DUPLICATE_PRODUCT_ERROR,
        id,
        error,
    };
}
function updateProductStart(id) {
    return {
        type: TYPES.UPDATE_PRODUCT_START,
        id,
    };
}
function updateProductSuccess(id, product) {
    return {
        type: TYPES.UPDATE_PRODUCT_SUCCESS,
        id,
        product,
    };
}
export function updateProductError(id, error) {
    return {
        type: TYPES.UPDATE_PRODUCT_ERROR,
        id,
        error,
    };
}
export function getProductsSuccess(query, products, totalCount) {
    return {
        type: TYPES.GET_PRODUCTS_SUCCESS,
        products,
        query,
        totalCount,
    };
}
export function getProductsError(query, error) {
    return {
        type: TYPES.GET_PRODUCTS_ERROR,
        query,
        error,
    };
}
export function getProductsTotalCountSuccess(query, totalCount) {
    return {
        type: TYPES.GET_PRODUCTS_TOTAL_COUNT_SUCCESS,
        query,
        totalCount,
    };
}
export function getProductsTotalCountError(query, error) {
    return {
        type: TYPES.GET_PRODUCTS_TOTAL_COUNT_ERROR,
        query,
        error,
    };
}
export function* createProduct(data) {
    yield createProductStart();
    try {
        const product = yield apiFetch({
            path: WC_PRODUCT_NAMESPACE,
            method: 'POST',
            data,
        });
        yield createProductSuccess(product.id, product);
        return product;
    }
    catch (error) {
        yield createProductError(data, error);
        throw error;
    }
}
export function* updateProduct(id, data) {
    yield updateProductStart(id);
    try {
        const product = yield apiFetch({
            path: `${WC_PRODUCT_NAMESPACE}/${id}`,
            method: 'PUT',
            data,
        });
        yield updateProductSuccess(product.id, product);
        return product;
    }
    catch (error) {
        yield updateProductError(id, error);
        throw error;
    }
}
export function* duplicateProduct(id, data) {
    yield duplicateProductStart(id);
    try {
        const product = yield apiFetch({
            path: `${WC_PRODUCT_NAMESPACE}/${id}/duplicate`,
            method: 'POST',
            data,
        });
        yield duplicateProductSuccess(product.id, product);
        return product;
    }
    catch (error) {
        yield duplicateProductError(id, error);
        throw error;
    }
}
export function deleteProductStart(id) {
    return {
        type: TYPES.DELETE_PRODUCT_START,
        id,
    };
}
export function deleteProductSuccess(id, product, force) {
    return {
        type: TYPES.DELETE_PRODUCT_SUCCESS,
        id,
        product,
        force,
    };
}
export function deleteProductError(id, error) {
    return {
        type: TYPES.DELETE_PRODUCT_ERROR,
        id,
        error,
    };
}
export function* deleteProduct(id, force = false) {
    yield deleteProductStart(id);
    try {
        const url = force
            ? `${WC_PRODUCT_NAMESPACE}/${id}?force=true`
            : `${WC_PRODUCT_NAMESPACE}/${id}`;
        const product = yield apiFetch({
            path: url,
            method: 'DELETE',
        });
        yield deleteProductSuccess(product.id, product, force);
        return product;
    }
    catch (error) {
        yield deleteProductError(id, error);
        throw error;
    }
}
export function setSuggestedProductAction(key, items) {
    return {
        type: TYPES.SET_SUGGESTED_PRODUCTS,
        key,
        items,
    };
}
