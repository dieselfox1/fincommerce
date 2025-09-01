"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageGalleryToolbarDropdown = ImageGalleryToolbarDropdown;
/**
 * External dependencies
 */
const components_1 = require("@wordpress/components");
const icons_1 = require("@wordpress/icons");
const element_1 = require("@wordpress/element");
const i18n_1 = require("@wordpress/i18n");
const media_utils_1 = require("@wordpress/media-utils");
const POPOVER_PROPS = {
    className: 'fincommerce-image-gallery__toolbar-dropdown-popover',
    placement: 'bottom-start',
};
function ImageGalleryToolbarDropdown({ children, onReplace, onRemove, canRemove, removeBlockLabel, MediaUploadComponent = media_utils_1.MediaUpload, ...props }) {
    return ((0, element_1.createElement)(components_1.DropdownMenu, { icon: icons_1.moreVertical, label: (0, i18n_1.__)('Options', 'fincommerce'), className: "fincommerce-image-gallery__toolbar-dropdown", popoverProps: POPOVER_PROPS, ...props }, ({ onClose }) => ((0, element_1.createElement)(element_1.Fragment, null,
        (0, element_1.createElement)(components_1.MenuGroup, null,
            (0, element_1.createElement)(MediaUploadComponent, { onSelect: (media) => {
                    onReplace(media);
                    onClose();
                }, allowedTypes: ['image'], render: ({ open }) => ((0, element_1.createElement)(components_1.MenuItem, { onClick: () => {
                        open();
                    } }, (0, i18n_1.__)('Replace', 'fincommerce'))) })),
        typeof children === 'function'
            ? children({ onClose })
            : element_1.Children.map(children, (child) => (0, element_1.isValidElement)(child) &&
                (0, element_1.cloneElement)(child, { onClose })),
        canRemove && ((0, element_1.createElement)(components_1.MenuGroup, null,
            (0, element_1.createElement)(components_1.MenuItem, { onClick: () => {
                    onClose();
                    onRemove();
                } }, removeBlockLabel ||
                (0, i18n_1.__)('Remove', 'fincommerce'))))))));
}
