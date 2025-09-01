"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MoreMenu = void 0;
/**
 * External dependencies
 */
const element_1 = require("@wordpress/element");
const tracks_1 = require("@fincommerce/tracks");
/**
 * Internal dependencies
 */
const woo_more_menu_item_1 = require("../woo-more-menu-item");
const more_menu_dropdown_1 = require("../../more-menu-dropdown");
const MoreMenu = () => {
    return ((0, element_1.createElement)(element_1.Fragment, null,
        (0, element_1.createElement)(more_menu_dropdown_1.MoreMenuDropdown, { toggleProps: {
                onClick: () => (0, tracks_1.recordEvent)('product_dropdown_click'),
            }, popoverProps: {
                className: 'fincommerce-product-header__more-menu',
            } }, (onClose) => ((0, element_1.createElement)(element_1.Fragment, null,
            (0, element_1.createElement)(woo_more_menu_item_1.WooProductMoreMenuItem.Slot, { fillProps: { onClose } }))))));
};
exports.MoreMenu = MoreMenu;
