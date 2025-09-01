/**
 * External dependencies
 */
import createSelector from 'rememo';
/**
 * Internal dependencies
 */
import { createIdFromOptions, getProductResourceName, getTotalProductCountResourceName, } from './utils';
import { PERMALINK_PRODUCT_REGEX } from './constants';
export const getProduct = (state, productId, defaultValue = undefined) => {
    return state.data[productId] || defaultValue;
};
export const getProducts = createSelector((state, query, defaultValue = undefined) => {
    const resourceName = getProductResourceName(query);
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
    const resourceName = getProductResourceName(query);
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
export const getProductsTotalCount = (state, query, defaultValue = undefined) => {
    const resourceName = getTotalProductCountResourceName(query);
    const totalCount = state.productsCount.hasOwnProperty(resourceName)
        ? state.productsCount[resourceName]
        : defaultValue;
    return totalCount;
};
export const getProductsError = (state, query) => {
    const resourceName = getProductResourceName(query);
    return state.errors[resourceName];
};
export const getCreateProductError = (state, query) => {
    const resourceName = getProductResourceName(query);
    return state.errors[resourceName];
};
export const getUpdateProductError = (state, id, query) => {
    const resourceName = getProductResourceName(query);
    return state.errors[`update/${id}/${resourceName}`];
};
export const getDeleteProductError = (state, id) => {
    return state.errors[`delete/${id}`];
};
export const isPending = (state, action, productId) => {
    if (productId !== undefined && action !== 'createProduct') {
        return state.pending[action]?.[productId] || false;
    }
    else if (action === 'createProduct') {
        return state.pending[action] || false;
    }
    return false;
};
export const getPermalinkParts = createSelector((state, productId) => {
    const product = state.data[productId];
    if (product && product.permalink_template) {
        const postName = product.slug || product.generated_slug;
        const [prefix, suffix] = product.permalink_template.split(PERMALINK_PRODUCT_REGEX);
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
export const getRelatedProducts = createSelector((state, productId) => {
    const product = state.data[productId];
    if (!product?.related_ids) {
        return [];
    }
    const relatedProducts = getProducts(state, {
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
export function getSuggestedProducts(state, options) {
    const key = createIdFromOptions(options);
    if (!state.suggestedProducts[key]) {
        return [];
    }
    return state.suggestedProducts[key].items;
}
