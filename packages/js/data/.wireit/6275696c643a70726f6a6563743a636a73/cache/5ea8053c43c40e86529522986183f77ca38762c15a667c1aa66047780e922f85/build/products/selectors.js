"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRelatedProducts = exports.getPermalinkParts = exports.isPending = exports.getDeleteProductError = exports.getUpdateProductError = exports.getCreateProductError = exports.getProductsError = exports.getProductsTotalCount = exports.getProducts = exports.getProduct = void 0;
exports.getSuggestedProducts = getSuggestedProducts;
/**
 * External dependencies
 */
const rememo_1 = __importDefault(require("rememo"));
/**
 * Internal dependencies
 */
const utils_1 = require("./utils");
const constants_1 = require("./constants");
const getProduct = (state, productId, defaultValue = undefined) => {
    return state.data[productId] || defaultValue;
};
exports.getProduct = getProduct;
exports.getProducts = (0, rememo_1.default)((state, query, defaultValue = undefined) => {
    const resourceName = (0, utils_1.getProductResourceName)(query);
    const ids = state.products[resourceName]
        ? state.products[resourceName].data
        : undefined;
    if (!ids) {
        return defaultValue;
    }
    if (query && typeof query._fields !== 'undefined') {
        const fields = query._fields;
        return ids.map((id) => {
            return fields.reduce((product, field) => {
                return {
                    ...product,
                    [field]: state.data[id][field],
                };
            }, {});
        });
    }
    return ids.map((id) => {
        return state.data[id];
    });
}, (state, query) => {
    const resourceName = (0, utils_1.getProductResourceName)(query);
    const ids = state.products[resourceName]
        ? state.products[resourceName].data
        : undefined;
    return [
        state.products[resourceName],
        ...(ids || []).map((id) => {
            return state.data[id];
        }),
    ];
});
const getProductsTotalCount = (state, query, defaultValue = undefined) => {
    const resourceName = (0, utils_1.getTotalProductCountResourceName)(query);
    const totalCount = state.productsCount.hasOwnProperty(resourceName)
        ? state.productsCount[resourceName]
        : defaultValue;
    return totalCount;
};
exports.getProductsTotalCount = getProductsTotalCount;
const getProductsError = (state, query) => {
    const resourceName = (0, utils_1.getProductResourceName)(query);
    return state.errors[resourceName];
};
exports.getProductsError = getProductsError;
const getCreateProductError = (state, query) => {
    const resourceName = (0, utils_1.getProductResourceName)(query);
    return state.errors[resourceName];
};
exports.getCreateProductError = getCreateProductError;
const getUpdateProductError = (state, id, query) => {
    const resourceName = (0, utils_1.getProductResourceName)(query);
    return state.errors[`update/${id}/${resourceName}`];
};
exports.getUpdateProductError = getUpdateProductError;
const getDeleteProductError = (state, id) => {
    return state.errors[`delete/${id}`];
};
exports.getDeleteProductError = getDeleteProductError;
const isPending = (state, action, productId) => {
    if (productId !== undefined && action !== 'createProduct') {
        return state.pending[action]?.[productId] || false;
    }
    else if (action === 'createProduct') {
        return state.pending[action] || false;
    }
    return false;
};
exports.isPending = isPending;
exports.getPermalinkParts = (0, rememo_1.default)((state, productId) => {
    const product = state.data[productId];
    if (product && product.permalink_template) {
        const postName = product.slug || product.generated_slug;
        const [prefix, suffix] = product.permalink_template.split(constants_1.PERMALINK_PRODUCT_REGEX);
        return {
            prefix,
            postName,
            suffix,
        };
    }
    return null;
}, (state, productId) => {
    return [state.data[productId]];
});
/**
 * Returns an array of related products for a given product ID.
 *
 * @param {ProductState} state     - The current state.
 * @param {number}       productId - The product ID.
 * @return {PartialProduct[]}        The related products.
 */
exports.getRelatedProducts = (0, rememo_1.default)((state, productId) => {
    const product = state.data[productId];
    if (!product?.related_ids) {
        return [];
    }
    const relatedProducts = (0, exports.getProducts)(state, {
        include: product.related_ids,
    });
    return relatedProducts || [];
}, (state, productId) => {
    return [state.data[productId]];
});
/**
 * Return an array of suggested products the
 * given options.
 *
 * @param {ProductState}                state   - The current state.
 * @param {GetSuggestedProductsOptions} options - The options.
 * @return {PartialProduct[]}                     The suggested products.
 */
function getSuggestedProducts(state, options) {
    const key = (0, utils_1.createIdFromOptions)(options);
    if (!state.suggestedProducts[key]) {
        return [];
    }
    return state.suggestedProducts[key].items;
}
