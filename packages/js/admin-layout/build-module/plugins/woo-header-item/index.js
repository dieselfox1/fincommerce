/**
 * External dependencies
 */
import { Slot, Fill } from '@wordpress/components';
import { createElement } from '@wordpress/element';
import { createOrderedChildren, sortFillsByOrder, } from '@fincommerce/components';
export const WC_HEADER_SLOT_NAME = 'fincommerce_header_item';
/**
 * Get the slot fill name for the generic header slot or a specific header if provided.
 *
 * @param name Name of the specific header.
 * @return string
 */
const getSlotFillName = (name) => {
    if (!name || !name.length) {
        return WC_HEADER_SLOT_NAME;
    }
    return `${WC_HEADER_SLOT_NAME}/${name}`;
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
export const WooHeaderItem = ({ children, order = 1, name = '', }) => {
    return (createElement(Fill, { name: getSlotFillName(name) }, (fillProps) => {
        return createOrderedChildren(children, order, fillProps);
    }));
};
WooHeaderItem.Slot = ({ fillProps, name = '', }) => (createElement(Slot, { name: getSlotFillName(name), fillProps: fillProps }, sortFillsByOrder));
