import { Slot, Fill } from '@wordpress/components';
import { createElement, Fragment } from '@wordpress/element';
/**
 * Internal dependencies
 */
import { createOrderedChildren, sortFillsByOrder } from '../../utils';
const DEFAULT_SECTION_ORDER = 20;
export const WooProductSectionItem = ({ children, tabs, }) => {
    return (createElement(Fragment, null, tabs.map(({ name: tabName, order: sectionOrder }) => (createElement(Fill, { name: `fincommerce_product_section_${tabName}`, key: tabName }, (fillProps) => {
        return createOrderedChildren(children, sectionOrder || DEFAULT_SECTION_ORDER, {
            tabName,
            ...fillProps,
        });
    })))));
};
WooProductSectionItem.Slot = ({ fillProps, tab, }) => (createElement(Slot, { name: `fincommerce_product_section_${tab}`, fillProps: fillProps }, (fills) => {
    if (!sortFillsByOrder) {
        return null;
    }
    // @ts-expect-error The type definitions for Slot are incorrect.
    return sortFillsByOrder(fills);
}));
