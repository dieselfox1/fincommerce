"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageActionsMenu = ImageActionsMenu;
/**
 * External dependencies
 */
const components_1 = require("@wordpress/components");
const data_1 = require("@wordpress/data");
const element_1 = require("@wordpress/element");
const i18n_1 = require("@wordpress/i18n");
/**
 * Internal dependencies
 */
const media_library_menu_item_1 = require("../../menu-items/media-library-menu-item");
const upload_files_menu_item_1 = require("../../menu-items/upload-files-menu-item");
const map_upload_image_to_image_1 = require("../../../utils/map-upload-image-to-image");
const variation_actions_menus_1 = require("../variation-actions-menus");
function ImageActionsMenu({ selection, onChange, onDelete, ...props }) {
    const [isUploading, setIsUploading] = (0, element_1.useState)(false);
    const { createErrorNotice } = (0, data_1.useDispatch)('core/notices');
    function uploadSuccessHandler(onClose) {
        return function handleUploadSuccess(files) {
            const image = (files.length && (0, map_upload_image_to_image_1.mapUploadImageToImage)(files[0])) ||
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
        createErrorNotice((0, i18n_1.sprintf)(
        /* translators: %1$s is a line break, %2$s is the detailed error message */
        (0, i18n_1.__)('Error uploading file:%1$s%2$s', 'fincommerce'), '\n', error.message));
    };
    function mediaLibraryMenuItemSelectHandler(onClose) {
        return function handleMediaLibraryMenuItemSelect(media) {
            const variation = {
                id: selection[0].id,
                image: (0, map_upload_image_to_image_1.mapUploadImageToImage)(media) || undefined,
            };
            onChange([variation], false);
            onClose();
        };
    }
    return ((0, element_1.createElement)(components_1.Dropdown, { ...props, popoverProps: {
            placement: 'bottom-end',
        }, renderToggle: (toggleProps) => props.renderToggle({ ...toggleProps, isBusy: isUploading }), className: "fincommerce-image-actions-menu", contentClassName: "fincommerce-image-actions-menu__menu-content", renderContent: ({ onClose }) => ((0, element_1.createElement)("div", { className: "components-dropdown-menu__menu" },
            (0, element_1.createElement)(components_1.MenuGroup, null,
                (0, element_1.createElement)(upload_files_menu_item_1.UploadFilesMenuItem, { allowedTypes: ['image'], accept: "image/*", multiple: false, info: (0, i18n_1.__)('1000 pixels wide or larger', 'fincommerce'), onUploadProgress: () => {
                        setIsUploading(true);
                        onClose();
                    }, onUploadSuccess: uploadSuccessHandler(onClose), onUploadError: (error) => {
                        uploadErrorHandler(error);
                        setIsUploading(false);
                        onClose();
                    } }),
                (0, element_1.createElement)(media_library_menu_item_1.MediaLibraryMenuItem, { allowedTypes: ['image'], multiple: false, value: selection[0].id, onSelect: mediaLibraryMenuItemSelectHandler(onClose) })),
            (0, element_1.createElement)(variation_actions_menus_1.VariationQuickUpdateMenuItem.Slot, { group: 'image-actions-menu', onChange: (value) => onChange(value), onClose: onClose, selection: selection, supportsMultipleSelection: false }))) }));
}
