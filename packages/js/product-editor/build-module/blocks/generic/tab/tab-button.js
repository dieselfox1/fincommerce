/**
 * External dependencies
 */
import { Button, Fill } from '@wordpress/components';
import clsx from 'clsx';
import { createElement, Fragment } from '@wordpress/element';
/**
 * Internal dependencies
 */
import { TABS_SLOT_NAME } from '../../../components/tabs/constants';
export const DEFAULT_TAB_ORDER = 100;
const OrderedWrapper = ({ children, }) => createElement(Fragment, null, children);
export function TabButton({ children, className, id, order = DEFAULT_TAB_ORDER, selected = false, }) {
    const classes = clsx('wp-block-fincommerce-product-tab__button', className, { 'is-selected': selected });
    return (createElement(Fill, { name: TABS_SLOT_NAME }, (fillProps) => {
        const { onClick } = fillProps;
        return (createElement(OrderedWrapper, { order: order },
            createElement(Button, { key: id, className: classes, onClick: () => onClick(id), id: `fincommerce-product-tab__${id}`, "aria-controls": `fincommerce-product-tab__${id}-content`, "aria-selected": selected, tabIndex: selected ? undefined : -1, role: "tab" }, children)));
    }));
}
