"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageGalleryItem = void 0;
/**
 * External dependencies
 */
const i18n_1 = require("@wordpress/i18n");
const element_1 = require("@wordpress/element");
/**
 * Internal dependencies
 */
const pill_1 = __importDefault(require("../pill"));
const sortable_1 = require("../sortable");
const conditional_wrapper_1 = require("../conditional-wrapper");
const ImageGalleryItem = ({ id, alt, isCover = false, isDraggable = true, src, className = '', onClick = () => null, onBlur = () => null, children, }) => ((0, element_1.createElement)(conditional_wrapper_1.ConditionalWrapper, { condition: !isDraggable, wrapper: (wrappedChildren) => ((0, element_1.createElement)(sortable_1.NonSortableItem, null, wrappedChildren)) },
    (0, element_1.createElement)("div", { className: `fincommerce-image-gallery__item ${className}`, onKeyPress: () => { }, tabIndex: 0, role: "button", onClick: (event) => onClick(event), onBlur: (event) => onBlur(event) },
        children,
        isDraggable ? ((0, element_1.createElement)(sortable_1.SortableHandle, null,
            (0, element_1.createElement)("img", { alt: alt, src: src, id: id }))) : ((0, element_1.createElement)(element_1.Fragment, null,
            isCover && (0, element_1.createElement)(pill_1.default, null, (0, i18n_1.__)('Cover', 'fincommerce')),
            (0, element_1.createElement)("img", { alt: alt, src: src, id: id }))))));
exports.ImageGalleryItem = ImageGalleryItem;
