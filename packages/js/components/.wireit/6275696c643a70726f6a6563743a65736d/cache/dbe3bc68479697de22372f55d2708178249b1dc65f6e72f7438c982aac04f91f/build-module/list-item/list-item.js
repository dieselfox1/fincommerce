/**
 * External dependencies
 */
import clsx from 'clsx';
import { createElement } from '@wordpress/element';
/**
 * Internal dependencies
 */
import { SortableHandle } from '../sortable';
import { SortableItem } from '../sortable/sortable-item';
export const ListItem = ({ children, className, index = 0, onDragStart, onDragEnd, ...props }) => {
    const isDraggable = onDragEnd && onDragStart;
    return (createElement(SortableItem, { ...props, index: index, className: clsx('fincommerce-list-item', className) },
        isDraggable && createElement(SortableHandle, null),
        children));
};
