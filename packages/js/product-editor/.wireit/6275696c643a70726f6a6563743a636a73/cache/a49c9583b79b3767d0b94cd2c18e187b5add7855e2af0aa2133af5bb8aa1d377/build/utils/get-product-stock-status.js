"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProductStockStatusClass = exports.getProductStockStatus = exports.PRODUCT_STOCK_STATUS_LABELS = exports.PRODUCT_STOCK_STATUS_CLASSES = exports.PRODUCT_STOCK_STATUS_KEYS = void 0;
/**
 * External dependencies
 */
const i18n_1 = require("@wordpress/i18n");
/**
 * Labels for product stock statuses.
 */
var PRODUCT_STOCK_STATUS_KEYS;
(function (PRODUCT_STOCK_STATUS_KEYS) {
    PRODUCT_STOCK_STATUS_KEYS["instock"] = "instock";
    PRODUCT_STOCK_STATUS_KEYS["onbackorder"] = "onbackorder";
    PRODUCT_STOCK_STATUS_KEYS["outofstock"] = "outofstock";
})(PRODUCT_STOCK_STATUS_KEYS || (exports.PRODUCT_STOCK_STATUS_KEYS = PRODUCT_STOCK_STATUS_KEYS = {}));
/**
 * Product stock status colors.
 */
var PRODUCT_STOCK_STATUS_CLASSES;
(function (PRODUCT_STOCK_STATUS_CLASSES) {
    PRODUCT_STOCK_STATUS_CLASSES["instock"] = "green";
    PRODUCT_STOCK_STATUS_CLASSES["onbackorder"] = "yellow";
    PRODUCT_STOCK_STATUS_CLASSES["outofstock"] = "red";
})(PRODUCT_STOCK_STATUS_CLASSES || (exports.PRODUCT_STOCK_STATUS_CLASSES = PRODUCT_STOCK_STATUS_CLASSES = {}));
/**
 * Labels for product stock statuses.
 */
exports.PRODUCT_STOCK_STATUS_LABELS = {
    [PRODUCT_STOCK_STATUS_KEYS.instock]: (0, i18n_1.__)('In stock', 'fincommerce'),
    [PRODUCT_STOCK_STATUS_KEYS.onbackorder]: (0, i18n_1.__)('On backorder', 'fincommerce'),
    [PRODUCT_STOCK_STATUS_KEYS.outofstock]: (0, i18n_1.__)('Out of stock', 'fincommerce'),
};
/**
 * Get the product stock quantity or stock status label.
 *
 * @param  product Product instance.
 * @return {PRODUCT_STOCK_STATUS_KEYS|number} Product stock quantity or product status key.
 */
const getProductStockStatus = (product) => {
    if (product.manage_stock) {
        return product.stock_quantity || 0;
    }
    if (product.stock_status) {
        return exports.PRODUCT_STOCK_STATUS_LABELS[product.stock_status];
    }
    return exports.PRODUCT_STOCK_STATUS_LABELS.instock;
};
exports.getProductStockStatus = getProductStockStatus;
/**
 * Get the product stock status class.
 *
 * @param  product Product instance.
 * @return {PRODUCT_STOCK_STATUS_CLASSES} Product stock status class.
 */
const getProductStockStatusClass = (product) => {
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
exports.getProductStockStatusClass = getProductStockStatusClass;
