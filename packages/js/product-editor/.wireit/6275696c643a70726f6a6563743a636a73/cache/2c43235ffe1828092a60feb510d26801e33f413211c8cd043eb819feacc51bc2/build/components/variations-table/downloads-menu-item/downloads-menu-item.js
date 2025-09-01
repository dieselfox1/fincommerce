"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DownloadsMenuItem = DownloadsMenuItem;
/**
 * External dependencies
 */
const components_1 = require("@wordpress/components");
const element_1 = require("@wordpress/element");
const i18n_1 = require("@wordpress/i18n");
const icons_1 = require("@wordpress/icons");
const media_utils_1 = require("@wordpress/media-utils");
const tracks_1 = require("@fincommerce/tracks");
/**
 * Internal dependencies
 */
const constants_1 = require("../../../constants");
const handle_prompt_1 = require("../../../utils/handle-prompt");
const variation_actions_menus_1 = require("../variation-actions-menus");
const MODAL_CLASS_NAME = 'downloads_menu_item__upload_files_modal';
const MODAL_WRAPPER_CLASS_NAME = 'downloads_menu_item__upload_files_modal_wrapper';
function convertMediaFileToDownloadFile(value) {
    return { id: `${value.id}`, name: value.name, file: value.url };
}
function DownloadsMenuItem({ selection, onChange, onClose, supportsMultipleSelection = false, }) {
    const ids = selection.map(({ id }) => id);
    const downloadsIds = selection?.length > 0
        ? selection[0].downloads.map(({ id }) => Number.parseInt(id, 10))
        : [];
    const [uploadFilesModalOpen, setUploadFilesModalOpen] = (0, element_1.useState)(false);
    function handleMediaUploadSelect(value) {
        const downloads = Array.isArray(value)
            ? value.map(convertMediaFileToDownloadFile)
            : convertMediaFileToDownloadFile(value);
        const partialVariation = {
            downloadable: true,
            downloads,
        };
        onChange(selection.map(({ id }) => ({
            ...partialVariation,
            id,
        })));
        (0, tracks_1.recordEvent)('product_variations_menu_downloads_update', {
            source: constants_1.TRACKS_SOURCE,
            action: 'downloads_set',
            variation_id: ids,
        });
        onClose();
    }
    function uploadFilesClickHandler(openMediaUploadModal) {
        return function handleUploadFilesClick() {
            (0, tracks_1.recordEvent)('product_variations_menu_downloads_select', {
                source: constants_1.TRACKS_SOURCE,
                action: 'downloads_set',
                variation_id: ids,
            });
            openMediaUploadModal();
            setUploadFilesModalOpen(true);
        };
    }
    function menuItemClickHandler(name, message) {
        return function handleMenuItemClick() {
            (0, tracks_1.recordEvent)('product_variations_menu_downloads_select', {
                source: constants_1.TRACKS_SOURCE,
                action: `${name}_set`,
                variation_id: ids,
            });
            (0, handle_prompt_1.handlePrompt)({
                message,
                onOk(value) {
                    onChange(selection.map(({ id }) => ({
                        id,
                        downloadable: true,
                        [name]: value,
                    })));
                    (0, tracks_1.recordEvent)('product_variations_menu_downloads_update', {
                        source: constants_1.TRACKS_SOURCE,
                        action: `${name}_set`,
                        variation_id: ids,
                    });
                },
            });
            setUploadFilesModalOpen(false);
            onClose();
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
    return ((0, element_1.createElement)(components_1.Dropdown, { popoverProps: {
            placement: 'right-start',
        }, renderToggle: ({ isOpen, onToggle }) => ((0, element_1.createElement)(components_1.MenuItem, { onClick: () => {
                (0, tracks_1.recordEvent)('product_variations_menu_downloads_click', {
                    source: constants_1.TRACKS_SOURCE,
                    variation_id: ids,
                });
                onToggle();
            }, "aria-expanded": isOpen, icon: icons_1.chevronRight, iconPosition: "right" }, (0, i18n_1.__)('Downloads', 'fincommerce'))), renderContent: () => ((0, element_1.createElement)("div", { className: "components-dropdown-menu__menu" },
            (0, element_1.createElement)(components_1.MenuGroup, null,
                (0, element_1.createElement)(media_utils_1.MediaUpload, { modalClass: MODAL_CLASS_NAME, multiple: 'add', value: downloadsIds, onSelect: handleMediaUploadSelect, render: ({ open }) => ((0, element_1.createElement)(components_1.MenuItem, { onClick: uploadFilesClickHandler(open) }, (0, i18n_1.__)('Upload files', 'fincommerce'))) }),
                (0, element_1.createElement)(components_1.MenuItem, { onClick: menuItemClickHandler('download_limit', (0, i18n_1.__)('Leave blank for unlimited re-downloads', 'fincommerce')) }, (0, i18n_1.__)('Set download limit', 'fincommerce')),
                (0, element_1.createElement)(components_1.MenuItem, { onClick: menuItemClickHandler('download_expiry', (0, i18n_1.__)('Enter the number of days before a download link expires, or leave blank', 'fincommerce')) }, (0, i18n_1.__)('Set download expiry', 'fincommerce'))),
            (0, element_1.createElement)(variation_actions_menus_1.VariationQuickUpdateMenuItem.Slot, { group: 'downloads', onChange: (value) => onChange(value), onClose: onClose, selection: selection, supportsMultipleSelection: supportsMultipleSelection }))) }));
}
