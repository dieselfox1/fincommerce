/**
 * External dependencies
 */
import { Dropdown, MenuGroup } from '@wordpress/components';
import { useDispatch } from '@wordpress/data';
import { createElement, useState } from '@wordpress/element';
import { __, sprintf } from '@wordpress/i18n';
/**
 * Internal dependencies
 */
import { MediaLibraryMenuItem } from '../../menu-items/media-library-menu-item';
import { UploadFilesMenuItem } from '../../menu-items/upload-files-menu-item';
import { mapUploadImageToImage } from '../../../utils/map-upload-image-to-image';
import { VariationQuickUpdateMenuItem } from '../variation-actions-menus';
export function ImageActionsMenu({ selection, onChange, onDelete, ...props }) {
    const [isUploading, setIsUploading] = useState(false);
    const { createErrorNotice } = useDispatch('core/notices');
    function uploadSuccessHandler(onClose) {
        return function handleUploadSuccess(files) {
            const image = (files.length && mapUploadImageToImage(files[0])) ||
                undefined;
            const variation = {
                id: selection[0].id,
                image,
            };
            setIsUploading(false);
            onChange([variation], false);
            onClose();
        };
    }
    const uploadErrorHandler = function (error) {
        createErrorNotice(sprintf(
        /* translators: %1$s is a line break, %2$s is the detailed error message */
        __('Error uploading file:%1$s%2$s', 'fincommerce'), '\n', error.message));
    };
    function mediaLibraryMenuItemSelectHandler(onClose) {
        return function handleMediaLibraryMenuItemSelect(media) {
            const variation = {
                id: selection[0].id,
                image: mapUploadImageToImage(media) || undefined,
            };
            onChange([variation], false);
            onClose();
        };
    }
    return (createElement(Dropdown, { ...props, popoverProps: {
            placement: 'bottom-end',
        }, renderToggle: (toggleProps) => props.renderToggle({ ...toggleProps, isBusy: isUploading }), className: "fincommerce-image-actions-menu", contentClassName: "fincommerce-image-actions-menu__menu-content", renderContent: ({ onClose }) => (createElement("div", { className: "components-dropdown-menu__menu" },
            createElement(MenuGroup, null,
                createElement(UploadFilesMenuItem, { allowedTypes: ['image'], accept: "image/*", multiple: false, info: __('1000 pixels wide or larger', 'fincommerce'), onUploadProgress: () => {
                        setIsUploading(true);
                        onClose();
                    }, onUploadSuccess: uploadSuccessHandler(onClose), onUploadError: (error) => {
                        uploadErrorHandler(error);
                        setIsUploading(false);
                        onClose();
                    } }),
                createElement(MediaLibraryMenuItem, { allowedTypes: ['image'], multiple: false, value: selection[0].id, onSelect: mediaLibraryMenuItemSelectHandler(onClose) })),
            createElement(VariationQuickUpdateMenuItem.Slot, { group: 'image-actions-menu', onChange: (value) => onChange(value), onClose: onClose, selection: selection, supportsMultipleSelection: false }))) }));
}
