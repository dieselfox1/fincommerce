"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WooHeaderItem = exports.WC_HEADER_SLOT_NAME = void 0;
/**
 * External dependencies
 */
const components_1 = require("@wordpress/components");
const element_1 = require("@wordpress/element");
const components_2 = require("@fincommerce/components");
exports.WC_HEADER_SLOT_NAME = 'fincommerce_header_item';
/**
 * Get the slot fill name for the generic header slot or a specific header if provided.
 *
 * @param name Name of the specific header.
 * @return string
 */
const getSlotFillName = (name) => {
    if (!name || !name.length) {
        return exports.WC_HEADER_SLOT_NAME;
    }
    return `${exports.WC_HEADER_SLOT_NAME}/${name}`;
};
/**
 * Create a Fill for extensions to add items to the FinCommerce Admin header.
 *
 * @slotFill WooHeaderItem
 * @scope fincommerce-admin
 * @example
 * const MyHeaderItem = () => (
 * <WooHeaderItem>My header item</WooHeaderItem>
 * );
 *
 * registerPlugin( 'my-extension', {
 * render: MyHeaderItem,
 * scope: 'fincommerce-admin',
 * } );
 * @param {Object} param0
 * @param {Array}  param0.name     - Header name.
 * @param {Array}  param0.children - Node children.
 * @param {Array}  param0.order    - Node order.
 */
const WooHeaderItem = ({ children, order = 1, name = '', }) => {
    return ((0, element_1.createElement)(components_1.Fill, { name: getSlotFillName(name) }, (fillProps) => {
        return (0, components_2.createOrderedChildren)(children, order, fillProps);
    }));
};
exports.WooHeaderItem = WooHeaderItem;
exports.WooHeaderItem.Slot = ({ fillProps, name = '', }) => ((0, element_1.createElement)(components_1.Slot, { name: getSlotFillName(name), fillProps: fillProps }, components_2.sortFillsByOrder));
