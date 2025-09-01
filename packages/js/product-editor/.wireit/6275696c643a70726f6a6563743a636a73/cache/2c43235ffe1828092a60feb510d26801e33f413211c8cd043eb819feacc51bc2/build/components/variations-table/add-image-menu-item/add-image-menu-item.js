"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddImageMenuItem = AddImageMenuItem;
/**
 * External dependencies
 */
const components_1 = require("@wordpress/components");
const element_1 = require("@wordpress/element");
const i18n_1 = require("@wordpress/i18n");
const media_utils_1 = require("@wordpress/media-utils");
const tracks_1 = require("@fincommerce/tracks");
const constants_1 = require("../../../constants");
const map_upload_image_to_image_1 = require("../../../utils/map-upload-image-to-image");
const DEFAULT_ALLOWED_MEDIA_TYPES = ['image'];
const MODAL_CLASS_NAME = 'fincommerce-add-image-menu-item__upload_image_modal';
const MODAL_WRAPPER_CLASS_NAME = 'fincommerce-add-image-menu-item__upload_image_modal_wrapper';
function AddImageMenuItem({ selection, onChange, onClose, }) {
    const [uploadFilesModalOpen, setUploadFilesModalOpen] = (0, element_1.useState)(false);
    const ids = selection.map(({ id }) => id);
    function handleMediaUploadSelect(uploadedImage) {
        const image = (0, map_upload_image_to_image_1.mapUploadImageToImage)(uploadedImage);
        (0, tracks_1.recordEvent)('product_variations_menu_add_image_update', {
            source: constants_1.TRACKS_SOURCE,
            action: 'add_image_to_variation',
            variation_id: ids,
        });
        onChange(selection.map(({ id }) => ({
            id,
            image,
        })));
        onClose();
    }
    function uploadFilesClickHandler(openMediaUploadModal) {
        return function handleUploadFilesClick() {
            (0, tracks_1.recordEvent)('product_variations_menu_add_image_select', {
                source: constants_1.TRACKS_SOURCE,
                action: 'add_image_to_variation',
                variation_id: ids,
            });
            openMediaUploadModal();
            setUploadFilesModalOpen(true);
        };
    }
    (0, element_1.useEffect)(function addUploadModalClass() {
        const modal = document.querySelector(`.${MODAL_CLASS_NAME}`);
        const dialog = modal?.closest('[role="dialog"]');
        const wrapper = dialog?.parentElement;
        wrapper?.classList.add(MODAL_WRAPPER_CLASS_NAME);
        return () => {
            wrapper?.classList.remove(MODAL_WRAPPER_CLASS_NAME);
        };
    }, [uploadFilesModalOpen]);
    return ((0, element_1.createElement)(media_utils_1.MediaUpload, { onSelect: handleMediaUploadSelect, modalClass: MODAL_CLASS_NAME, allowedTypes: DEFAULT_ALLOWED_MEDIA_TYPES, 
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore disabled prop exists
        mode: 'upload', multiple: false, render: ({ open }) => ((0, element_1.createElement)(components_1.MenuItem, { onClick: uploadFilesClickHandler(open) }, (0, i18n_1.__)('Add image', 'fincommerce'))) }));
}
