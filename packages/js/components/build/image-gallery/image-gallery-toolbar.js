"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageGalleryToolbar = void 0;
/**
 * External dependencies
 */
const element_1 = require("@wordpress/element");
const icons_1 = require("@wordpress/icons");
const media_utils_1 = require("@wordpress/media-utils");
const i18n_1 = require("@wordpress/i18n");
const components_1 = require("@wordpress/components");
/**
 * Internal dependencies
 */
const sortable_1 = require("../sortable");
const image_gallery_toolbar_dropdown_1 = require("./image-gallery-toolbar-dropdown");
const ImageGalleryToolbar = ({ childIndex, allowDragging = true, moveItem, removeItem, replaceItem, setToolBarItem, lastChild, value, MediaUploadComponent = media_utils_1.MediaUpload, }) => {
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
    return ((0, element_1.createElement)("div", { className: "fincommerce-image-gallery__toolbar" },
        (0, element_1.createElement)(components_1.Toolbar, { onClick: (e) => e.stopPropagation(), label: (0, i18n_1.__)('Options', 'fincommerce'), id: "options-toolbar" },
            !isCoverItem && ((0, element_1.createElement)(components_1.ToolbarGroup, null,
                allowDragging && ((0, element_1.createElement)(components_1.ToolbarButton, { icon: () => ((0, element_1.createElement)(sortable_1.SortableHandle, { itemIndex: childIndex })), label: (0, i18n_1.__)('Drag to reorder', 'fincommerce') })),
                (0, element_1.createElement)(components_1.ToolbarButton, { disabled: childIndex < 2, onClick: () => movePrevious(), icon: icons_1.chevronLeft, label: (0, i18n_1.__)('Move previous', 'fincommerce') }),
                (0, element_1.createElement)(components_1.ToolbarButton, { onClick: () => moveNext(), icon: icons_1.chevronRight, label: (0, i18n_1.__)('Move next', 'fincommerce'), disabled: lastChild }))),
            !isCoverItem && ((0, element_1.createElement)(components_1.ToolbarGroup, null,
                (0, element_1.createElement)(components_1.ToolbarButton, { onClick: () => setAsCoverImage(childIndex), label: (0, i18n_1.__)('Set as cover', 'fincommerce') }, (0, i18n_1.__)('Set as cover', 'fincommerce')))),
            isCoverItem && ((0, element_1.createElement)(components_1.ToolbarGroup, { className: "fincommerce-image-gallery__toolbar-media" },
                (0, element_1.createElement)(MediaUploadComponent, { value: value, onSelect: (media) => replaceItem(childIndex, media), allowedTypes: ['image'], render: ({ open }) => ((0, element_1.createElement)(components_1.ToolbarButton, { onClick: open }, (0, i18n_1.__)('Replace', 'fincommerce'))) }))),
            isCoverItem && ((0, element_1.createElement)(components_1.ToolbarGroup, null,
                (0, element_1.createElement)(components_1.ToolbarButton, { onClick: () => removeItem(childIndex), icon: icons_1.trash, label: (0, i18n_1.__)('Remove', 'fincommerce') }))),
            !isCoverItem && ((0, element_1.createElement)(components_1.ToolbarGroup, null,
                (0, element_1.createElement)(components_1.ToolbarItem, null, (toggleProps) => ((0, element_1.createElement)(image_gallery_toolbar_dropdown_1.ImageGalleryToolbarDropdown, { canRemove: true, onRemove: () => removeItem(childIndex), onReplace: (media) => replaceItem(childIndex, media), MediaUploadComponent: MediaUploadComponent, ...toggleProps }))))))));
};
exports.ImageGalleryToolbar = ImageGalleryToolbar;
