"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSuggestedProducts = void 0;
exports.getProducts = getProducts;
exports.getProduct = getProduct;
exports.getRelatedProducts = getRelatedProducts;
exports.getProductsTotalCount = getProductsTotalCount;
exports.getPermalinkParts = getPermalinkParts;
/**
 * External dependencies
 */
const url_1 = require("@wordpress/url");
const api_fetch_1 = __importDefault(require("@wordpress/api-fetch"));
const data_controls_1 = require("@wordpress/data-controls");
const data_1 = require("@wordpress/data");
/**
 * Internal dependencies
 */
const constants_1 = require("./constants");
const actions_1 = require("./actions");
const utils_1 = require("../utils");
const utils_2 = require("./utils");
const dispatch = data_1.controls && data_1.controls.dispatch ? data_1.controls.dispatch : data_controls_1.dispatch;
const resolveSelect = data_1.controls && data_1.controls.resolveSelect ? data_1.controls.resolveSelect : data_controls_1.select;
function* getProducts(query) {
    // id is always required.
    const productsQuery = {
        ...query,
    };
    if (productsQuery &&
        productsQuery._fields &&
        !productsQuery._fields.includes('id')) {
        productsQuery._fields = ['id', ...productsQuery._fields];
    }
    try {
        const { items, totalCount } = yield (0, utils_1.request)(constants_1.WC_PRODUCT_NAMESPACE, productsQuery);
        yield (0, actions_1.getProductsTotalCountSuccess)(query, totalCount);
        yield (0, actions_1.getProductsSuccess)(query, items, totalCount);
        return items;
    }
    catch (error) {
        yield (0, actions_1.getProductsError)(query, error);
        throw error;
    }
}
function* getProduct(productId) {
    try {
        const product = yield (0, data_controls_1.apiFetch)({
            path: (0, url_1.addQueryArgs)(`${constants_1.WC_PRODUCT_NAMESPACE}/${productId}`, {
                context: 'edit',
            }),
            method: 'GET',
        });
        yield (0, actions_1.getProductSuccess)(productId, product);
        yield dispatch(constants_1.STORE_NAME, 'finishResolution', 'getPermalinkParts', [
            productId,
        ]);
        return product;
    }
    catch (error) {
        yield (0, actions_1.getProductError)(productId, error);
        throw error;
    }
}
function* getRelatedProducts(productId) {
    try {
        // Get the product.
        const product = yield resolveSelect(constants_1.STORE_NAME, 'getProduct', productId);
        // Pick the related products IDs.
        const relatedProductsIds = product.related_ids;
        if (!relatedProductsIds?.length) {
            return [];
        }
        // Get the related products.
        const relatedProducts = yield resolveSelect(constants_1.STORE_NAME, 'getProducts', {
            include: relatedProductsIds,
        });
        return relatedProducts;
    }
    catch (error) {
        throw error;
    }
}
function* getProductsTotalCount(query) {
    try {
        const totalsQuery = {
            ...query,
            page: 1,
            per_page: 1,
        };
        const { totalCount } = yield (0, utils_1.request)(constants_1.WC_PRODUCT_NAMESPACE, totalsQuery);
        yield (0, actions_1.getProductsTotalCountSuccess)(query, totalCount);
        return totalCount;
    }
    catch (error) {
        yield (0, actions_1.getProductsTotalCountError)(query, error);
        throw error;
    }
}
function* getPermalinkParts(productId) {
    yield resolveSelect(constants_1.STORE_NAME, 'getProduct', [productId]);
}
const getSuggestedProducts = (options) => 
// @ts-expect-error There are no types for this.
async ({ dispatch: contextualDispatch }) => {
    const key = (0, utils_2.createIdFromOptions)(options);
    const data = await (0, api_fetch_1.default)({
        path: (0, url_1.addQueryArgs)(constants_1.WC_V3_ENDPOINT_SUGGESTED_PRODUCTS, options),
    });
    contextualDispatch.setSuggestedProductAction(key, data);
};
exports.getSuggestedProducts = getSuggestedProducts;
