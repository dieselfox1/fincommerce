"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WooProductMoreMenuItem = exports.WC_PRODUCT_MORE_MENU_SLOT_NAME = void 0;
/**
 * External dependencies
 */
const components_1 = require("@wordpress/components");
const element_1 = require("@wordpress/element");
const components_2 = require("@fincommerce/components");
exports.WC_PRODUCT_MORE_MENU_SLOT_NAME = 'WooProductMenuMenuItem';
const WooProductMoreMenuItem = ({ children, order = 1, }) => {
    return ((0, element_1.createElement)(components_1.Fill, { name: exports.WC_PRODUCT_MORE_MENU_SLOT_NAME }, (fillProps) => {
        return (0, components_2.createOrderedChildren)(children, order, fillProps);
    }));
};
exports.WooProductMoreMenuItem = WooProductMoreMenuItem;
exports.WooProductMoreMenuItem.Slot = ({ fillProps, }) => ((0, element_1.createElement)(components_1.Slot, { name: exports.WC_PRODUCT_MORE_MENU_SLOT_NAME, fillProps: fillProps }, components_2.sortFillsByOrder));
