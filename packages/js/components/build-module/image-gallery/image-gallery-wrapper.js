/**
 * External dependencies
 */
import { createElement } from '@wordpress/element';
/**
 * Internal dependencies
 */
import { Sortable } from '../sortable';
export const ImageGalleryWrapper = ({ children, allowDragging = true, onDragStart = () => null, onDragEnd = () => null, onDragOver = () => null, updateOrderedChildren = () => null, }) => {
    if (allowDragging) {
        return (createElement(Sortable, { isHorizontal: true, onOrderChange: (items) => {
                updateOrderedChildren(items);
            }, onDragStart: (event) => {
                onDragStart(event);
            }, onDragEnd: (event) => {
                onDragEnd(event);
            }, onDragOver: onDragOver }, children));
    }
    return (createElement("div", { className: "fincommerce-image-gallery__wrapper" }, children));
};
