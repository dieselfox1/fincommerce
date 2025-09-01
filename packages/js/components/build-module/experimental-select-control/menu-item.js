/**
 * External dependencies
 */
import { createElement } from 'react';
import clsx from 'clsx';
import { Tooltip } from '@wordpress/components';
export const MenuItem = ({ children, getItemProps, index, isActive, activeStyle = { backgroundColor: '#bde4ff' }, item, tooltipText, className, }) => {
    function renderListItem() {
        const itemProps = getItemProps({ item, index });
        return (createElement("li", { ...itemProps, style: isActive ? activeStyle : itemProps.style, className: clsx('fincommerce-experimental-select-control__menu-item', itemProps.className, className) }, children));
    }
    if (tooltipText) {
        return (createElement(Tooltip, { text: tooltipText, position: "top center" }, renderListItem()));
    }
    return renderListItem();
};
