/**
 * External dependencies
 */
import { Dropdown, MenuItem, MenuGroup } from '@wordpress/components';
import { createElement, useEffect, useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { chevronRight } from '@wordpress/icons';
import { MediaUpload } from '@wordpress/media-utils';
import { recordEvent } from '@fincommerce/tracks';
/**
 * Internal dependencies
 */
import { TRACKS_SOURCE } from '../../../constants';
import { handlePrompt } from '../../../utils/handle-prompt';
import { VariationQuickUpdateMenuItem } from '../variation-actions-menus';
const MODAL_CLASS_NAME = 'downloads_menu_item__upload_files_modal';
const MODAL_WRAPPER_CLASS_NAME = 'downloads_menu_item__upload_files_modal_wrapper';
function convertMediaFileToDownloadFile(value) {
    return { id: `${value.id}`, name: value.name, file: value.url };
}
export function DownloadsMenuItem({ selection, onChange, onClose, supportsMultipleSelection = false, }) {
    const ids = selection.map(({ id }) => id);
    const downloadsIds = selection?.length > 0
        ? selection[0].downloads.map(({ id }) => Number.parseInt(id, 10))
        : [];
    const [uploadFilesModalOpen, setUploadFilesModalOpen] = useState(false);
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
        recordEvent('product_variations_menu_downloads_update', {
            source: TRACKS_SOURCE,
            action: 'downloads_set',
            variation_id: ids,
        });
        onClose();
    }
    function uploadFilesClickHandler(openMediaUploadModal) {
        return function handleUploadFilesClick() {
            recordEvent('product_variations_menu_downloads_select', {
                source: TRACKS_SOURCE,
                action: 'downloads_set',
                variation_id: ids,
            });
            openMediaUploadModal();
            setUploadFilesModalOpen(true);
        };
    }
    function menuItemClickHandler(name, message) {
        return function handleMenuItemClick() {
            recordEvent('product_variations_menu_downloads_select', {
                source: TRACKS_SOURCE,
                action: `${name}_set`,
                variation_id: ids,
            });
            handlePrompt({
                message,
                onOk(value) {
                    onChange(selection.map(({ id }) => ({
                        id,
                        downloadable: true,
                        [name]: value,
                    })));
                    recordEvent('product_variations_menu_downloads_update', {
                        source: TRACKS_SOURCE,
                        action: `${name}_set`,
                        variation_id: ids,
                    });
                },
            });
            setUploadFilesModalOpen(false);
            onClose();
        };
    }
    useEffect(function addUploadModalClass() {
        const modal = document.querySelector(`.${MODAL_CLASS_NAME}`);
        const dialog = modal?.closest('[role="dialog"]');
        const wrapper = dialog?.parentElement;
        wrapper?.classList.add(MODAL_WRAPPER_CLASS_NAME);
        return () => {
            wrapper?.classList.remove(MODAL_WRAPPER_CLASS_NAME);
        };
    }, [uploadFilesModalOpen]);
    return (createElement(Dropdown, { popoverProps: {
            placement: 'right-start',
        }, renderToggle: ({ isOpen, onToggle }) => (createElement(MenuItem, { onClick: () => {
                recordEvent('product_variations_menu_downloads_click', {
                    source: TRACKS_SOURCE,
                    variation_id: ids,
                });
                onToggle();
            }, "aria-expanded": isOpen, icon: chevronRight, iconPosition: "right" }, __('Downloads', 'fincommerce'))), renderContent: () => (createElement("div", { className: "components-dropdown-menu__menu" },
            createElement(MenuGroup, null,
                createElement(MediaUpload, { modalClass: MODAL_CLASS_NAME, multiple: 'add', value: downloadsIds, onSelect: handleMediaUploadSelect, render: ({ open }) => (createElement(MenuItem, { onClick: uploadFilesClickHandler(open) }, __('Upload files', 'fincommerce'))) }),
                createElement(MenuItem, { onClick: menuItemClickHandler('download_limit', __('Leave blank for unlimited re-downloads', 'fincommerce')) }, __('Set download limit', 'fincommerce')),
                createElement(MenuItem, { onClick: menuItemClickHandler('download_expiry', __('Enter the number of days before a download link expires, or leave blank', 'fincommerce')) }, __('Set download expiry', 'fincommerce'))),
            createElement(VariationQuickUpdateMenuItem.Slot, { group: 'downloads', onChange: (value) => onChange(value), onClose: onClose, selection: selection, supportsMultipleSelection: supportsMultipleSelection }))) }));
}
