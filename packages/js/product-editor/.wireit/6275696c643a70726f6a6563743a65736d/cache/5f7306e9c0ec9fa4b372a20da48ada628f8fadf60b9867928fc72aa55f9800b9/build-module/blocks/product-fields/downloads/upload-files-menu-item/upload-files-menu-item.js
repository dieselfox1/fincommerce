import { FormFileUpload, MenuItem } from '@wordpress/components';
import { createElement } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { upload } from '@wordpress/icons';
import { uploadMedia } from '@wordpress/media-utils';
export function UploadFilesMenuItem({ allowedTypes, maxUploadFileSize, onUploadSuccess, onUploadError, }) {
    const resolvedMaxUploadFileSize = maxUploadFileSize ||
        window.productBlockEditorSettings?.maxUploadFileSize ||
        10 * 1024 * 1024; // 10 MB by default if not set and not provided by the settings
    function handleFormFileUploadChange(event) {
        const filesList = event.currentTarget.files;
        uploadMedia({
            allowedTypes,
            filesList,
            maxUploadFileSize: resolvedMaxUploadFileSize,
            onFileChange: onUploadSuccess,
            onError: onUploadError,
            additionalData: {
                type: 'downloadable_product',
            },
        });
    }
    return (createElement(FormFileUpload, { multiple: true, onChange: handleFormFileUploadChange, render: ({ openFileDialog }) => (createElement(MenuItem, { icon: upload, iconPosition: "left", onClick: openFileDialog, info: __('Select files from your device', 'fincommerce') }, __('Upload', 'fincommerce'))) }));
}
