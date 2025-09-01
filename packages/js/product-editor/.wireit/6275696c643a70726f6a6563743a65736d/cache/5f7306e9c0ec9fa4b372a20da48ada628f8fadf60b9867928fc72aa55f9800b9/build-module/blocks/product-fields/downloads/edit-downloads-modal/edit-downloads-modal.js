/**
 * External dependencies
 */
import { __, sprintf } from '@wordpress/i18n';
import { createElement, useState } from '@wordpress/element';
import { trash } from '@wordpress/icons';
import { useDispatch } from '@wordpress/data';
import { recordEvent } from '@fincommerce/tracks';
import { ImageGallery, ImageGalleryItem } from '@fincommerce/components';
import { Button, Modal, BaseControl, __experimentalInputControl as InputControl, } from '@wordpress/components';
import { UnionIcon } from './images/union-icon';
import { DownloadsCustomImage } from './images/downloads-custom-image';
export const EditDownloadsModal = ({ downloadableItem, onCancel, onChange, onRemove, onSave, }) => {
    const { createNotice } = useDispatch('core/notices');
    const [isCopingToClipboard, setIsCopingToClipboard] = useState(false);
    const { id = 0, file = '', name = '' } = downloadableItem;
    const onCopySuccess = () => {
        createNotice('success', __('URL copied successfully.', 'fincommerce'));
    };
    const isImage = (filename = '') => {
        if (!filename)
            return;
        const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'webp'];
        const fileExtension = (filename.split('.').pop() || '').toLowerCase();
        return imageExtensions.includes(fileExtension);
    };
    async function copyTextToClipboard(text) {
        if ('clipboard' in navigator) {
            await navigator.clipboard.writeText(text);
        }
        else {
            const textArea = document.createElement('textarea');
            textArea.value = text;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
        }
        await onCopySuccess();
    }
    async function handleCopyToClipboard() {
        recordEvent('product_downloads_modal_copy_url_to_clipboard');
        setIsCopingToClipboard(true);
        await copyTextToClipboard(file);
        setIsCopingToClipboard(false);
    }
    return (createElement(Modal, { title: sprintf(
        /* translators: %s is the attribute name */
        __('Edit %s', 'fincommerce'), name), onRequestClose: (event) => {
            if (event &&
                !event.isPropagationStopped() &&
                !isCopingToClipboard) {
                recordEvent('product_downloads_modal_cancel');
                onCancel();
            }
        }, className: "fincommerce-edit-downloads-modal" },
        createElement("div", { className: "fincommerce-edit-downloads-modal__preview" },
            createElement(ImageGallery, { allowDragging: false, columns: 1 }, isImage(file) ? (createElement(ImageGalleryItem, { key: id, alt: name, src: file, id: `${id}`, isCover: false })) : (createElement(DownloadsCustomImage, null))),
            createElement("div", { className: "components-form-file-upload" },
                createElement("p", null, name))),
        createElement(BaseControl, { id: 'file-name-help', className: "fincommerce-edit-downloads-modal__file-name", help: __('Your customers will see this on the thank-you page and in their order confirmation email.', 'fincommerce') },
            createElement(InputControl, { id: 'file-name', label: __('FILE NAME', 'fincommerce'), name: 'file-name', value: name || '', onChange: (value) => {
                    onChange(value ?? '');
                } })),
        createElement("div", { className: "fincommerce-edit-downloads-modal__file-url" },
            createElement(InputControl, { disabled: true, id: 'file-url', label: __('FILE URL', 'fincommerce'), name: 'file-url', value: file || '', suffix: createElement(Button, { icon: createElement(UnionIcon, null), onClick: handleCopyToClipboard }) })),
        createElement("div", { className: "fincommerce-edit-downloads-modal__buttons" },
            createElement("div", { className: "fincommerce-edit-downloads-modal__buttons-left" },
                createElement(Button, { icon: trash, isDestructive: true, variant: "tertiary", label: __('Delete', 'fincommerce'), onClick: () => {
                        recordEvent('product_downloads_modal_delete');
                        onRemove();
                    } }, __('Delete file', 'fincommerce'))),
            createElement("div", { className: "fincommerce-edit-downloads-modal__buttons-right" },
                createElement(Button, { label: __('Cancel', 'fincommerce'), onClick: () => {
                        recordEvent('product_downloads_modal_cancel');
                        onCancel();
                    }, variant: "tertiary" }, __('Cancel', 'fincommerce')),
                createElement(Button, { label: __('Update', 'fincommerce'), onClick: () => {
                        recordEvent('product_downloads_modal_update');
                        onSave();
                    }, variant: "primary" }, __('Update', 'fincommerce'))))));
};
