/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { createElement, Fragment } from '@wordpress/element';
/**
 * Internal dependencies
 */
import Pill from '../pill';
import { SortableHandle, NonSortableItem } from '../sortable';
import { ConditionalWrapper } from '../conditional-wrapper';
export const ImageGalleryItem = ({ id, alt, isCover = false, isDraggable = true, src, className = '', onClick = () => null, onBlur = () => null, children, }) => (createElement(ConditionalWrapper, { condition: !isDraggable, wrapper: (wrappedChildren) => (createElement(NonSortableItem, null, wrappedChildren)) },
    createElement("div", { className: `fincommerce-image-gallery__item ${className}`, onKeyPress: () => { }, tabIndex: 0, role: "button", onClick: (event) => onClick(event), onBlur: (event) => onBlur(event) },
        children,
        isDraggable ? (createElement(SortableHandle, null,
            createElement("img", { alt: alt, src: src, id: id }))) : (createElement(Fragment, null,
            isCover && createElement(Pill, null, __('Cover', 'fincommerce')),
            createElement("img", { alt: alt, src: src, id: id }))))));
