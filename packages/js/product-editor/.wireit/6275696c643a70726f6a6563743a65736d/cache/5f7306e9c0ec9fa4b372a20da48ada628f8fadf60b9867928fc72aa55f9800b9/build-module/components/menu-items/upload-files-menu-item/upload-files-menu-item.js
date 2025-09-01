import { FormFileUpload, MenuItem } from '@wordpress/components';
import { createElement } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { upload } from '@wordpress/icons';
import { uploadMedia } from '@wordpress/media-utils';
export function UploadFilesMenuItem({ 
// UploadMediaOptions
allowedTypes, maxUploadFileSize, wpAllowedMimeTypes, additionalData, 
// MenuItem.Props
icon, iconPosition, text, info, 
// Handlers
onUploadProgress, onUploadSuccess, onUploadError, 
// FormFileUpload.Props
...props }) {
    const resolvedMaxUploadFileSize = maxUploadFileSize ||
        window.productBlockEditorSettings?.maxUploadFileSize ||
        10 * 1024 * 1024; // 10 MB by default if not set and not provided by the settings
    function handleFormFileUploadChange(event) {
        const filesList = event.currentTarget.files;
        uploadMedia({
            allowedTypes,
            filesList,
            maxUploadFileSize: resolvedMaxUploadFileSize,
            additionalData,
            wpAllowedMimeTypes,
            onFileChange(files) {
                const isUploading = files.some((file) => !file.id);
                if (isUploading) {
                    onUploadProgress?.(files);
                    return;
                }
                onUploadSuccess(files);
            },
            onError: onUploadError,
        });
    }
    return (createElement(FormFileUpload, { ...props, onChange: handleFormFileUploadChange, render: ({ openFileDialog }) => (createElement(MenuItem, { icon: icon ?? upload, iconPosition: iconPosition ?? 'left', onClick: openFileDialog, info: info ??
                __('Select files from your device', 'fincommerce') }, text ?? __('Upload', 'fincommerce'))) }));
}
