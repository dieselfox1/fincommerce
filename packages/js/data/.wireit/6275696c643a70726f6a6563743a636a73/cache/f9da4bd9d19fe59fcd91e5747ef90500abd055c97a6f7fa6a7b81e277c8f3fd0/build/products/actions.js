"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProductSuccess = getProductSuccess;
exports.getProductError = getProductError;
exports.createProductError = createProductError;
exports.duplicateProductError = duplicateProductError;
exports.updateProductError = updateProductError;
exports.getProductsSuccess = getProductsSuccess;
exports.getProductsError = getProductsError;
exports.getProductsTotalCountSuccess = getProductsTotalCountSuccess;
exports.getProductsTotalCountError = getProductsTotalCountError;
exports.createProduct = createProduct;
exports.updateProduct = updateProduct;
exports.duplicateProduct = duplicateProduct;
exports.deleteProductStart = deleteProductStart;
exports.deleteProductSuccess = deleteProductSuccess;
exports.deleteProductError = deleteProductError;
exports.deleteProduct = deleteProduct;
exports.setSuggestedProductAction = setSuggestedProductAction;
/**
 * External dependencies
 */
const data_controls_1 = require("@wordpress/data-controls");
/**
 * Internal dependencies
 */
const action_types_1 = __importDefault(require("./action-types"));
const constants_1 = require("./constants");
function getProductSuccess(id, product) {
    return {
        type: action_types_1.default.GET_PRODUCT_SUCCESS,
        id,
        product,
    };
}
function getProductError(productId, error) {
    return {
        type: action_types_1.default.GET_PRODUCT_ERROR,
        productId,
        error,
    };
}
function createProductStart() {
    return {
        type: action_types_1.default.CREATE_PRODUCT_START,
    };
}
function createProductSuccess(id, product) {
    return {
        type: action_types_1.default.CREATE_PRODUCT_SUCCESS,
        id,
        product,
    };
}
function createProductError(query, error) {
    return {
        type: action_types_1.default.CREATE_PRODUCT_ERROR,
        query,
        error,
    };
}
function duplicateProductStart(id) {
    return {
        type: action_types_1.default.DUPLICATE_PRODUCT_START,
        id,
    };
}
function duplicateProductSuccess(id, product) {
    return {
        type: action_types_1.default.DUPLICATE_PRODUCT_SUCCESS,
        id,
        product,
    };
}
function duplicateProductError(id, error) {
    return {
        type: action_types_1.default.DUPLICATE_PRODUCT_ERROR,
        id,
        error,
    };
}
function updateProductStart(id) {
    return {
        type: action_types_1.default.UPDATE_PRODUCT_START,
        id,
    };
}
function updateProductSuccess(id, product) {
    return {
        type: action_types_1.default.UPDATE_PRODUCT_SUCCESS,
        id,
        product,
    };
}
function updateProductError(id, error) {
    return {
        type: action_types_1.default.UPDATE_PRODUCT_ERROR,
        id,
        error,
    };
}
function getProductsSuccess(query, products, totalCount) {
    return {
        type: action_types_1.default.GET_PRODUCTS_SUCCESS,
        products,
        query,
        totalCount,
    };
}
function getProductsError(query, error) {
    return {
        type: action_types_1.default.GET_PRODUCTS_ERROR,
        query,
        error,
    };
}
function getProductsTotalCountSuccess(query, totalCount) {
    return {
        type: action_types_1.default.GET_PRODUCTS_TOTAL_COUNT_SUCCESS,
        query,
        totalCount,
    };
}
function getProductsTotalCountError(query, error) {
    return {
        type: action_types_1.default.GET_PRODUCTS_TOTAL_COUNT_ERROR,
        query,
        error,
    };
}
function* createProduct(data) {
    yield createProductStart();
    try {
        const product = yield (0, data_controls_1.apiFetch)({
            path: constants_1.WC_PRODUCT_NAMESPACE,
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
function* updateProduct(id, data) {
    yield updateProductStart(id);
    try {
        const product = yield (0, data_controls_1.apiFetch)({
            path: `${constants_1.WC_PRODUCT_NAMESPACE}/${id}`,
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
function* duplicateProduct(id, data) {
    yield duplicateProductStart(id);
    try {
        const product = yield (0, data_controls_1.apiFetch)({
            path: `${constants_1.WC_PRODUCT_NAMESPACE}/${id}/duplicate`,
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
function deleteProductStart(id) {
    return {
        type: action_types_1.default.DELETE_PRODUCT_START,
        id,
    };
}
function deleteProductSuccess(id, product, force) {
    return {
        type: action_types_1.default.DELETE_PRODUCT_SUCCESS,
        id,
        product,
        force,
    };
}
function deleteProductError(id, error) {
    return {
        type: action_types_1.default.DELETE_PRODUCT_ERROR,
        id,
        error,
    };
}
function* deleteProduct(id, force = false) {
    yield deleteProductStart(id);
    try {
        const url = force
            ? `${constants_1.WC_PRODUCT_NAMESPACE}/${id}?force=true`
            : `${constants_1.WC_PRODUCT_NAMESPACE}/${id}`;
        const product = yield (0, data_controls_1.apiFetch)({
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
function setSuggestedProductAction(key, items) {
    return {
        type: action_types_1.default.SET_SUGGESTED_PRODUCTS,
        key,
        items,
    };
}
