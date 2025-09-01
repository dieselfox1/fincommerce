"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageGalleryWrapper = void 0;
/**
 * External dependencies
 */
const element_1 = require("@wordpress/element");
/**
 * Internal dependencies
 */
const sortable_1 = require("../sortable");
const ImageGalleryWrapper = ({ children, allowDragging = true, onDragStart = () => null, onDragEnd = () => null, onDragOver = () => null, updateOrderedChildren = () => null, }) => {
    if (allowDragging) {
        return ((0, element_1.createElement)(sortable_1.Sortable, { isHorizontal: true, onOrderChange: (items) => {
                updateOrderedChildren(items);
            }, onDragStart: (event) => {
                onDragStart(event);
            }, onDragEnd: (event) => {
                onDragEnd(event);
            }, onDragOver: onDragOver }, children));
    }
    return ((0, element_1.createElement)("div", { className: "fincommerce-image-gallery__wrapper" }, children));
};
exports.ImageGalleryWrapper = ImageGalleryWrapper;
