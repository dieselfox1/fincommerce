/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
/**
 * Labels for product stock statuses.
 */
export var PRODUCT_STOCK_STATUS_KEYS;
(function (PRODUCT_STOCK_STATUS_KEYS) {
    PRODUCT_STOCK_STATUS_KEYS["instock"] = "instock";
    PRODUCT_STOCK_STATUS_KEYS["onbackorder"] = "onbackorder";
    PRODUCT_STOCK_STATUS_KEYS["outofstock"] = "outofstock";
})(PRODUCT_STOCK_STATUS_KEYS || (PRODUCT_STOCK_STATUS_KEYS = {}));
/**
 * Product stock status colors.
 */
export var PRODUCT_STOCK_STATUS_CLASSES;
(function (PRODUCT_STOCK_STATUS_CLASSES) {
    PRODUCT_STOCK_STATUS_CLASSES["instock"] = "green";
    PRODUCT_STOCK_STATUS_CLASSES["onbackorder"] = "yellow";
    PRODUCT_STOCK_STATUS_CLASSES["outofstock"] = "red";
})(PRODUCT_STOCK_STATUS_CLASSES || (PRODUCT_STOCK_STATUS_CLASSES = {}));
/**
 * Labels for product stock statuses.
 */
export const PRODUCT_STOCK_STATUS_LABELS = {
    [PRODUCT_STOCK_STATUS_KEYS.instock]: __('In stock', 'fincommerce'),
    [PRODUCT_STOCK_STATUS_KEYS.onbackorder]: __('On backorder', 'fincommerce'),
    [PRODUCT_STOCK_STATUS_KEYS.outofstock]: __('Out of stock', 'fincommerce'),
};
/**
 * Get the product stock quantity or stock status label.
 *
 * @param  product Product instance.
 * @return {PRODUCT_STOCK_STATUS_KEYS|number} Product stock quantity or product status key.
 */
export const getProductStockStatus = (product) => {
    if (product.manage_stock) {
        return product.stock_quantity || 0;
    }
    if (product.stock_status) {
        return PRODUCT_STOCK_STATUS_LABELS[product.stock_status];
    }
    return PRODUCT_STOCK_STATUS_LABELS.instock;
};
/**
 * Get the product stock status class.
 *
 * @param  product Product instance.
 * @return {PRODUCT_STOCK_STATUS_CLASSES} Product stock status class.
 */
export const getProductStockStatusClass = (product) => {
    if (product.manage_stock) {
        const stockQuantity = product.stock_quantity || 0;
        if (stockQuantity >= 10) {
            return PRODUCT_STOCK_STATUS_CLASSES.instock;
        }
        if (stockQuantity < 10 && stockQuantity > 2) {
            return PRODUCT_STOCK_STATUS_CLASSES.onbackorder;
        }
        return PRODUCT_STOCK_STATUS_CLASSES.outofstock;
    }
    return product.stock_status
        ? PRODUCT_STOCK_STATUS_CLASSES[product.stock_status]
        : '';
};
