"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadFilesMenuItem = UploadFilesMenuItem;
const components_1 = require("@wordpress/components");
const element_1 = require("@wordpress/element");
const i18n_1 = require("@wordpress/i18n");
const icons_1 = require("@wordpress/icons");
const media_utils_1 = require("@wordpress/media-utils");
function UploadFilesMenuItem({ 
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
        (0, media_utils_1.uploadMedia)({
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
    return ((0, element_1.createElement)(components_1.FormFileUpload, { ...props, onChange: handleFormFileUploadChange, render: ({ openFileDialog }) => ((0, element_1.createElement)(components_1.MenuItem, { icon: icon ?? icons_1.upload, iconPosition: iconPosition ?? 'left', onClick: openFileDialog, info: info ??
                (0, i18n_1.__)('Select files from your device', 'fincommerce') }, text ?? (0, i18n_1.__)('Upload', 'fincommerce'))) }));
}
