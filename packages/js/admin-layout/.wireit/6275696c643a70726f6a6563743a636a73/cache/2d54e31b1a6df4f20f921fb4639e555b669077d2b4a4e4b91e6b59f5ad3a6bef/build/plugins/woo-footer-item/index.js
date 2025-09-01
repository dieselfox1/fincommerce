"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WooFooterItem = exports.WC_FOOTER_SLOT_NAME = void 0;
/**
 * External dependencies
 */
const components_1 = require("@wordpress/components");
const element_1 = require("@wordpress/element");
const components_2 = require("@fincommerce/components");
exports.WC_FOOTER_SLOT_NAME = 'fincommerce_footer_item';
/**
 * Create a Fill for extensions to add items to the FinCommerce Admin footer.
 *
 * @slotFill WooFooterItem
 * @scope fincommerce-admin
 * @example
 * const MyFooterItem = () => (
 * <WooFooterItem>My header item</WooFooterItem>
 * );
 *
 * registerPlugin( 'my-extension', {
 * render: MyFooterItem,
 * scope: 'fincommerce-admin',
 * } );
 * @param {Object} param0
 * @param {Array}  param0.children - Node children.
 * @param {Array}  param0.order    - Node order.
 */
const WooFooterItem = ({ children, order = 1, }) => {
    return ((0, element_1.createElement)(components_1.Fill, { name: exports.WC_FOOTER_SLOT_NAME }, (fillProps) => {
        return (0, components_2.createOrderedChildren)(children, order, fillProps);
    }));
};
exports.WooFooterItem = WooFooterItem;
exports.WooFooterItem.Slot = ({ fillProps, }) => ((0, element_1.createElement)(components_1.Slot, { name: exports.WC_FOOTER_SLOT_NAME, fillProps: fillProps }, components_2.sortFillsByOrder));
