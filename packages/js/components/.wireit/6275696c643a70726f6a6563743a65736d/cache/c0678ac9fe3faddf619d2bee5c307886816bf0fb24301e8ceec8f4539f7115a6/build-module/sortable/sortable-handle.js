/**
 * External dependencies
 */
import { createElement, useContext } from '@wordpress/element';
/**
 * Internal dependencies
 */
import { DraggableIcon } from './draggable-icon';
import { SortableContext } from './index';
export const SortableHandle = ({ children, itemIndex, }) => {
    const { onDragStart, onDragEnd } = useContext(SortableContext);
    return (createElement("div", { className: "fincommerce-sortable__handle", draggable: true, onDragStart: onDragStart, onDragEnd: onDragEnd, "data-index": itemIndex }, children ? children : createElement(DraggableIcon, null)));
};
