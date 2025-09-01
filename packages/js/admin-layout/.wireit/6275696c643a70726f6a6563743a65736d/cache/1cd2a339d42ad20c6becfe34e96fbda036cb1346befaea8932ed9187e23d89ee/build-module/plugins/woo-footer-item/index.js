/**
 * External dependencies
 */
import { Slot, Fill } from '@wordpress/components';
import { createElement } from '@wordpress/element';
import { createOrderedChildren, sortFillsByOrder, } from '@fincommerce/components';
export const WC_FOOTER_SLOT_NAME = 'fincommerce_footer_item';
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
export const WooFooterItem = ({ children, order = 1, }) => {
    return (createElement(Fill, { name: WC_FOOTER_SLOT_NAME }, (fillProps) => {
        return createOrderedChildren(children, order, fillProps);
    }));
};
WooFooterItem.Slot = ({ fillProps, }) => (createElement(Slot, { name: WC_FOOTER_SLOT_NAME, fillProps: fillProps }, sortFillsByOrder));
