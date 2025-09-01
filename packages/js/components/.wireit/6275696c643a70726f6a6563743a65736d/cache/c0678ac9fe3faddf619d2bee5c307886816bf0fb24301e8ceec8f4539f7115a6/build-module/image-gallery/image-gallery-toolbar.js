/**
 * External dependencies
 */
import { createElement } from '@wordpress/element';
import { chevronRight, chevronLeft, trash } from '@wordpress/icons';
import { MediaUpload } from '@wordpress/media-utils';
import { __ } from '@wordpress/i18n';
import { Toolbar, ToolbarButton, ToolbarGroup, ToolbarItem, } from '@wordpress/components';
/**
 * Internal dependencies
 */
import { SortableHandle } from '../sortable';
import { ImageGalleryToolbarDropdown } from './image-gallery-toolbar-dropdown';
export const ImageGalleryToolbar = ({ childIndex, allowDragging = true, moveItem, removeItem, replaceItem, setToolBarItem, lastChild, value, MediaUploadComponent = MediaUpload, }) => {
    const moveNext = () => {
        moveItem(childIndex, childIndex + 1);
    };
    const movePrevious = () => {
        moveItem(childIndex, childIndex - 1);
    };
    const setAsCoverImage = (coverIndex) => {
        moveItem(coverIndex, 0);
        setToolBarItem(null);
    };
    const isCoverItem = childIndex === 0;
    return (createElement("div", { className: "fincommerce-image-gallery__toolbar" },
        createElement(Toolbar, { onClick: (e) => e.stopPropagation(), label: __('Options', 'fincommerce'), id: "options-toolbar" },
            !isCoverItem && (createElement(ToolbarGroup, null,
                allowDragging && (createElement(ToolbarButton, { icon: () => (createElement(SortableHandle, { itemIndex: childIndex })), label: __('Drag to reorder', 'fincommerce') })),
                createElement(ToolbarButton, { disabled: childIndex < 2, onClick: () => movePrevious(), icon: chevronLeft, label: __('Move previous', 'fincommerce') }),
                createElement(ToolbarButton, { onClick: () => moveNext(), icon: chevronRight, label: __('Move next', 'fincommerce'), disabled: lastChild }))),
            !isCoverItem && (createElement(ToolbarGroup, null,
                createElement(ToolbarButton, { onClick: () => setAsCoverImage(childIndex), label: __('Set as cover', 'fincommerce') }, __('Set as cover', 'fincommerce')))),
            isCoverItem && (createElement(ToolbarGroup, { className: "fincommerce-image-gallery__toolbar-media" },
                createElement(MediaUploadComponent, { value: value, onSelect: (media) => replaceItem(childIndex, media), allowedTypes: ['image'], render: ({ open }) => (createElement(ToolbarButton, { onClick: open }, __('Replace', 'fincommerce'))) }))),
            isCoverItem && (createElement(ToolbarGroup, null,
                createElement(ToolbarButton, { onClick: () => removeItem(childIndex), icon: trash, label: __('Remove', 'fincommerce') }))),
            !isCoverItem && (createElement(ToolbarGroup, null,
                createElement(ToolbarItem, null, (toggleProps) => (createElement(ImageGalleryToolbarDropdown, { canRemove: true, onRemove: () => removeItem(childIndex), onReplace: (media) => replaceItem(childIndex, media), MediaUploadComponent: MediaUploadComponent, ...toggleProps }))))))));
};
