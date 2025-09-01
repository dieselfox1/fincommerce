/**
 * External dependencies
 */
import { createElement, Fragment } from '@wordpress/element';
import { recordEvent } from '@fincommerce/tracks';
/**
 * Internal dependencies
 */
import { WooProductMoreMenuItem } from '../woo-more-menu-item';
import { MoreMenuDropdown } from '../../more-menu-dropdown';
export const MoreMenu = () => {
    return (createElement(Fragment, null,
        createElement(MoreMenuDropdown, { toggleProps: {
                onClick: () => recordEvent('product_dropdown_click'),
            }, popoverProps: {
                className: 'fincommerce-product-header__more-menu',
            } }, (onClose) => (createElement(Fragment, null,
            createElement(WooProductMoreMenuItem.Slot, { fillProps: { onClose } }))))));
};
