"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Internal dependencies
 */
const action_types_1 = __importDefault(require("./action-types"));
const utils_1 = require("./utils");
const reducer = (state = {
    products: {},
    productsCount: {},
    errors: {},
    data: {},
    pending: {},
    suggestedProducts: {},
}, payload) => {
    if (payload && 'type' in payload) {
        switch (payload.type) {
            case action_types_1.default.CREATE_PRODUCT_START:
                return {
                    ...state,
                    pending: {
                        createProduct: true,
                    },
                };
            case action_types_1.default.UPDATE_PRODUCT_START:
                return {
                    ...state,
                    pending: {
                        updateProduct: {
                            ...(state.pending.updateProduct || {}),
                            [payload.id]: true,
                        },
                    },
                };
            case action_types_1.default.DUPLICATE_PRODUCT_START:
                return {
                    ...state,
                    pending: {
                        duplicateProduct: {
                            ...(state.pending.duplicateProduct || {}),
                            [payload.id]: true,
                        },
                    },
                };
            case action_types_1.default.CREATE_PRODUCT_SUCCESS:
            case action_types_1.default.GET_PRODUCT_SUCCESS:
            case action_types_1.default.UPDATE_PRODUCT_SUCCESS:
            case action_types_1.default.DUPLICATE_PRODUCT_SUCCESS:
                const productData = state.data || {};
                return {
                    ...state,
                    data: {
                        ...productData,
                        [payload.id]: {
                            ...(productData[payload.id] || {}),
                            ...payload.product,
                        },
                    },
                    pending: {
                        createProduct: false,
                        duplicateProduct: {
                            ...(state.pending.duplicateProduct || {}),
                            [payload.id]: false,
                        },
                        updateProduct: {
                            ...(state.pending.updateProduct || {}),
                            [payload.id]: false,
                        },
                    },
                };
            case action_types_1.default.GET_PRODUCTS_SUCCESS:
                const ids = [];
                const nextProducts = payload.products.reduce((result, product) => {
                    ids.push(product.id);
                    result[product.id] = {
                        ...(state.data[product.id] || {}),
                        ...product,
                    };
                    return result;
                }, {});
                const resourceName = (0, utils_1.getProductResourceName)(payload.query);
                return {
                    ...state,
                    products: {
                        ...state.products,
                        [resourceName]: { data: ids },
                    },
                    data: {
                        ...state.data,
                        ...nextProducts,
                    },
                };
            case action_types_1.default.GET_PRODUCTS_TOTAL_COUNT_SUCCESS:
                const totalResourceName = (0, utils_1.getTotalProductCountResourceName)(payload.query);
                return {
                    ...state,
                    productsCount: {
                        ...state.productsCount,
                        [totalResourceName]: payload.totalCount,
                    },
                };
            case action_types_1.default.GET_PRODUCT_ERROR:
                return {
                    ...state,
                    errors: {
                        ...state.errors,
                        [payload.productId]: payload.error,
                    },
                };
            case action_types_1.default.GET_PRODUCTS_ERROR:
            case action_types_1.default.GET_PRODUCTS_TOTAL_COUNT_ERROR:
            case action_types_1.default.CREATE_PRODUCT_ERROR:
                return {
                    ...state,
                    errors: {
                        ...state.errors,
                        [(0, utils_1.getProductResourceName)(payload.query)]: payload.error,
                    },
                    pending: {
                        createProduct: false,
                    },
                };
            case action_types_1.default.UPDATE_PRODUCT_ERROR:
                return {
                    ...state,
                    errors: {
                        ...state.errors,
                        [`update/${payload.id}`]: payload.error,
                    },
                };
            case action_types_1.default.DUPLICATE_PRODUCT_ERROR:
                return {
                    ...state,
                    errors: {
                        ...state.errors,
                        [`duplicate/${payload.id}`]: payload.error,
                    },
                };
            case action_types_1.default.DELETE_PRODUCT_START:
                return {
                    ...state,
                    pending: {
                        deleteProduct: {
                            ...(state.pending.deleteProduct || {}),
                            [payload.id]: true,
                        },
                    },
                };
            case action_types_1.default.DELETE_PRODUCT_ERROR:
                return {
                    ...state,
                    errors: {
                        ...state.errors,
                        [`delete/${payload.id}`]: payload.error,
                    },
                    pending: {
                        deleteProduct: {
                            ...(state.pending.deleteProduct || {}),
                            [payload.id]: false,
                        },
                    },
                };
            case action_types_1.default.DELETE_PRODUCT_SUCCESS:
                const prData = state.data || {};
                return {
                    ...state,
                    data: {
                        ...prData,
                        [payload.id]: {
                            ...(prData[payload.id] || {}),
                            ...payload.product,
                            status: payload.force ? 'deleted' : 'trash',
                        },
                    },
                    pending: {
                        deleteProduct: {
                            ...(state.pending.deleteProduct || {}),
                            [payload.id]: false,
                        },
                    },
                };
            case action_types_1.default.SET_SUGGESTED_PRODUCTS: {
                return {
                    ...state,
                    suggestedProducts: {
                        ...state.suggestedProducts,
                        [payload.key]: {
                            items: payload.items || [],
                        },
                    },
                };
            }
            default:
                return state;
        }
    }
    return state;
};
exports.default = reducer;
