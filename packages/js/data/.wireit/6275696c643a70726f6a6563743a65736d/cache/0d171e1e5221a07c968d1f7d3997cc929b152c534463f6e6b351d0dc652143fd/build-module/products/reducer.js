/**
 * Internal dependencies
 */
import TYPES from './action-types';
import { getProductResourceName, getTotalProductCountResourceName, } from './utils';
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
            case TYPES.CREATE_PRODUCT_START:
                return {
                    ...state,
                    pending: {
                        createProduct: true,
                    },
                };
            case TYPES.UPDATE_PRODUCT_START:
                return {
                    ...state,
                    pending: {
                        updateProduct: {
                            ...(state.pending.updateProduct || {}),
                            [payload.id]: true,
                        },
                    },
                };
            case TYPES.DUPLICATE_PRODUCT_START:
                return {
                    ...state,
                    pending: {
                        duplicateProduct: {
                            ...(state.pending.duplicateProduct || {}),
                            [payload.id]: true,
                        },
                    },
                };
            case TYPES.CREATE_PRODUCT_SUCCESS:
            case TYPES.GET_PRODUCT_SUCCESS:
            case TYPES.UPDATE_PRODUCT_SUCCESS:
            case TYPES.DUPLICATE_PRODUCT_SUCCESS:
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
            case TYPES.GET_PRODUCTS_SUCCESS:
                const ids = [];
                const nextProducts = payload.products.reduce((result, product) => {
                    ids.push(product.id);
                    result[product.id] = {
                        ...(state.data[product.id] || {}),
                        ...product,
                    };
                    return result;
                }, {});
                const resourceName = getProductResourceName(payload.query);
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
            case TYPES.GET_PRODUCTS_TOTAL_COUNT_SUCCESS:
                const totalResourceName = getTotalProductCountResourceName(payload.query);
                return {
                    ...state,
                    productsCount: {
                        ...state.productsCount,
                        [totalResourceName]: payload.totalCount,
                    },
                };
            case TYPES.GET_PRODUCT_ERROR:
                return {
                    ...state,
                    errors: {
                        ...state.errors,
                        [payload.productId]: payload.error,
                    },
                };
            case TYPES.GET_PRODUCTS_ERROR:
            case TYPES.GET_PRODUCTS_TOTAL_COUNT_ERROR:
            case TYPES.CREATE_PRODUCT_ERROR:
                return {
                    ...state,
                    errors: {
                        ...state.errors,
                        [getProductResourceName(payload.query)]: payload.error,
                    },
                    pending: {
                        createProduct: false,
                    },
                };
            case TYPES.UPDATE_PRODUCT_ERROR:
                return {
                    ...state,
                    errors: {
                        ...state.errors,
                        [`update/${payload.id}`]: payload.error,
                    },
                };
            case TYPES.DUPLICATE_PRODUCT_ERROR:
                return {
                    ...state,
                    errors: {
                        ...state.errors,
                        [`duplicate/${payload.id}`]: payload.error,
                    },
                };
            case TYPES.DELETE_PRODUCT_START:
                return {
                    ...state,
                    pending: {
                        deleteProduct: {
                            ...(state.pending.deleteProduct || {}),
                            [payload.id]: true,
                        },
                    },
                };
            case TYPES.DELETE_PRODUCT_ERROR:
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
            case TYPES.DELETE_PRODUCT_SUCCESS:
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
            case TYPES.SET_SUGGESTED_PRODUCTS: {
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
export default reducer;
