"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProductStatus = exports.PRODUCT_STATUS_LABELS = exports.PRODUCT_STATUS_KEYS = void 0;
/**
 * External dependencies
 */
const i18n_1 = require("@wordpress/i18n");
/**
 * Labels for product statuses.
 */
var PRODUCT_STATUS_KEYS;
(function (PRODUCT_STATUS_KEYS) {
    PRODUCT_STATUS_KEYS["unsaved"] = "unsaved";
    PRODUCT_STATUS_KEYS["draft"] = "draft";
    PRODUCT_STATUS_KEYS["instock"] = "instock";
    PRODUCT_STATUS_KEYS["outofstock"] = "outofstock";
})(PRODUCT_STATUS_KEYS || (exports.PRODUCT_STATUS_KEYS = PRODUCT_STATUS_KEYS = {}));
/**
 * Labels for product statuses.
 */
exports.PRODUCT_STATUS_LABELS = {
    [PRODUCT_STATUS_KEYS.unsaved]: (0, i18n_1.__)('Unsaved', 'fincommerce'),
    [PRODUCT_STATUS_KEYS.draft]: (0, i18n_1.__)('Draft', 'fincommerce'),
    [PRODUCT_STATUS_KEYS.instock]: (0, i18n_1.__)('In stock', 'fincommerce'),
    [PRODUCT_STATUS_KEYS.outofstock]: (0, i18n_1.__)('Out of stock', 'fincommerce'),
};
/**
 * Get the product status for use in the header.
 *
 * @param  product Product instance.
 * @return {PRODUCT_STATUS_KEYS} Product status key.
 */
const getProductStatus = (product) => {
    if (!product) {
        return PRODUCT_STATUS_KEYS.unsaved;
    }
    if (product.status === 'draft') {
        return PRODUCT_STATUS_KEYS.draft;
    }
    if (product.stock_status === 'instock') {
        return PRODUCT_STATUS_KEYS.instock;
    }
    return PRODUCT_STATUS_KEYS.outofstock;
};
exports.getProductStatus = getProductStatus;
