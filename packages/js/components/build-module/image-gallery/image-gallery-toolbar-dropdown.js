/**
 * External dependencies
 */
import { DropdownMenu, MenuGroup, MenuItem } from '@wordpress/components';
import { moreVertical } from '@wordpress/icons';
import { Children, cloneElement, createElement, Fragment, isValidElement, } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { MediaUpload } from '@wordpress/media-utils';
const POPOVER_PROPS = {
    className: 'fincommerce-image-gallery__toolbar-dropdown-popover',
    placement: 'bottom-start',
};
export function ImageGalleryToolbarDropdown({ children, onReplace, onRemove, canRemove, removeBlockLabel, MediaUploadComponent = MediaUpload, ...props }) {
    return (createElement(DropdownMenu, { icon: moreVertical, label: __('Options', 'fincommerce'), className: "fincommerce-image-gallery__toolbar-dropdown", popoverProps: POPOVER_PROPS, ...props }, ({ onClose }) => (createElement(Fragment, null,
        createElement(MenuGroup, null,
            createElement(MediaUploadComponent, { onSelect: (media) => {
                    onReplace(media);
                    onClose();
                }, allowedTypes: ['image'], render: ({ open }) => (createElement(MenuItem, { onClick: () => {
                        open();
                    } }, __('Replace', 'fincommerce'))) })),
        typeof children === 'function'
            ? children({ onClose })
            : Children.map(children, (child) => isValidElement(child) &&
                cloneElement(child, { onClose })),
        canRemove && (createElement(MenuGroup, null,
            createElement(MenuItem, { onClick: () => {
                    onClose();
                    onRemove();
                } }, removeBlockLabel ||
                __('Remove', 'fincommerce'))))))));
}
