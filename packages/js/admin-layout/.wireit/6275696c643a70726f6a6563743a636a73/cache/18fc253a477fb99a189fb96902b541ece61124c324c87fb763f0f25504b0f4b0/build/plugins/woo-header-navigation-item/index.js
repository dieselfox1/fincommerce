"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WooHeaderNavigationItem = exports.WC_HEADER_NAVIGATION_SLOT_NAME = void 0;
/**
 * External dependencies
 */
const components_1 = require("@wordpress/components");
const element_1 = require("@wordpress/element");
const components_2 = require("@fincommerce/components");
exports.WC_HEADER_NAVIGATION_SLOT_NAME = 'fincommerce_header_navigation_item';
/**
 * Create a Fill for extensions to add items to the FinCommerce Admin
 * navigation area left of the page title.
 *
 * @slotFill WooHeaderNavigationItem
 * @scope fincommerce-admin
 * @example
 * const MyNavigationItem = () => (
 * <WooHeaderNavigationItem>My nav item</WooHeaderNavigationItem>
 * );
 *
 * registerPlugin( 'my-extension', {
 * render: MyNavigationItem,
 * scope: 'fincommerce-admin',
 * } );
 * @param {Object} param0
 * @param {Array}  param0.children - Node children.
 * @param {Array}  param0.order    - Node order.
 */
const WooHeaderNavigationItem = ({ children, order = 1, }) => {
    return ((0, element_1.createElement)(components_1.Fill, { name: exports.WC_HEADER_NAVIGATION_SLOT_NAME }, (fillProps) => {
        return (0, components_2.createOrderedChildren)(children, order, fillProps);
    }));
};
exports.WooHeaderNavigationItem = WooHeaderNavigationItem;
exports.WooHeaderNavigationItem.Slot = ({ fillProps, }) => ((0, element_1.createElement)(components_1.Slot, { name: exports.WC_HEADER_NAVIGATION_SLOT_NAME, fillProps: fillProps }, components_2.sortFillsByOrder));
