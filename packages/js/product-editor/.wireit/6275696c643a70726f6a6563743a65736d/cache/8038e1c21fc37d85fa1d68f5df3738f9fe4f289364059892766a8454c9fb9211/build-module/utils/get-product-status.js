/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
/**
 * Labels for product statuses.
 */
export var PRODUCT_STATUS_KEYS;
(function (PRODUCT_STATUS_KEYS) {
    PRODUCT_STATUS_KEYS["unsaved"] = "unsaved";
    PRODUCT_STATUS_KEYS["draft"] = "draft";
    PRODUCT_STATUS_KEYS["instock"] = "instock";
    PRODUCT_STATUS_KEYS["outofstock"] = "outofstock";
})(PRODUCT_STATUS_KEYS || (PRODUCT_STATUS_KEYS = {}));
/**
 * Labels for product statuses.
 */
export const PRODUCT_STATUS_LABELS = {
    [PRODUCT_STATUS_KEYS.unsaved]: __('Unsaved', 'fincommerce'),
    [PRODUCT_STATUS_KEYS.draft]: __('Draft', 'fincommerce'),
    [PRODUCT_STATUS_KEYS.instock]: __('In stock', 'fincommerce'),
    [PRODUCT_STATUS_KEYS.outofstock]: __('Out of stock', 'fincommerce'),
};
/**
 * Get the product status for use in the header.
 *
 * @param  product Product instance.
 * @return {PRODUCT_STATUS_KEYS} Product status key.
 */
export const getProductStatus = (product) => {
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
