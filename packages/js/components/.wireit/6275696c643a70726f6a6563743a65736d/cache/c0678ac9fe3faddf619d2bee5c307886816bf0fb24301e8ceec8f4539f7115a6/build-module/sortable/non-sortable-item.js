/**
 * External dependencies
 */
import { cloneElement } from '@wordpress/element';
export const NonSortableItem = ({ children }) => {
    if (children === null) {
        return children;
    }
    return cloneElement(children, {
        className: `${children.props?.className || ''} non-sortable-item`,
    });
};
