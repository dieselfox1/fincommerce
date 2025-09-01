/**
 * External dependencies
 */
import { Slot, Fill } from '@wordpress/components';
import { createElement } from '@wordpress/element';
import { createOrderedChildren, sortFillsByOrder, } from '@fincommerce/components';
export const WC_PRODUCT_MORE_MENU_SLOT_NAME = 'WooProductMenuMenuItem';
export const WooProductMoreMenuItem = ({ children, order = 1, }) => {
    return (createElement(Fill, { name: WC_PRODUCT_MORE_MENU_SLOT_NAME }, (fillProps) => {
        return createOrderedChildren(children, order, fillProps);
    }));
};
WooProductMoreMenuItem.Slot = ({ fillProps, }) => (createElement(Slot, { name: WC_PRODUCT_MORE_MENU_SLOT_NAME, fillProps: fillProps }, sortFillsByOrder));
