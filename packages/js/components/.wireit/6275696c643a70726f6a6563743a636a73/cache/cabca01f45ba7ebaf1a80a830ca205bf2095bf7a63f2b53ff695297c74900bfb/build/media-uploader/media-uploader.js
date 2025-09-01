"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MediaUploader = void 0;
/**
 * External dependencies
 */
const i18n_1 = require("@wordpress/i18n");
const components_1 = require("@wordpress/components");
const react_1 = require("react");
const media_utils_1 = require("@wordpress/media-utils");
const DEFAULT_ALLOWED_MEDIA_TYPES = ['image'];
const MediaUploader = ({ allowedMediaTypes = DEFAULT_ALLOWED_MEDIA_TYPES, buttonText = (0, i18n_1.__)('Choose images', 'fincommerce'), buttonProps, hasDropZone = true, label = (0, i18n_1.__)('Drag images here or click to upload', 'fincommerce'), maxUploadFileSize = 10000000, MediaUploadComponent = media_utils_1.MediaUpload, multipleSelect = false, value, onError = () => null, onFileUploadChange = () => null, onMediaGalleryOpen = () => null, onUpload = () => null, onSelect = () => null, uploadMedia = media_utils_1.uploadMedia, additionalData, }) => {
    const multiple = Boolean(multipleSelect);
    return ((0, react_1.createElement)(components_1.FormFileUpload, { accept: allowedMediaTypes.toString(), multiple: multiple, onChange: ({ currentTarget }) => {
            uploadMedia({
                allowedTypes: allowedMediaTypes,
                filesList: currentTarget.files,
                maxUploadFileSize,
                onError,
                onFileChange(files) {
                    onFileUploadChange(multiple ? files : files[0]);
                },
                additionalData,
            });
        }, render: ({ openFileDialog }) => ((0, react_1.createElement)("div", { className: "fincommerce-form-file-upload", onKeyPress: () => { }, tabIndex: 0, role: "button", onClick: (event) => {
                const { target } = event;
                // is the click on the button from MediaUploadComponent or on the div?
                if (!target.closest('button')) {
                    openFileDialog();
                }
            }, onBlur: () => { } },
            (0, react_1.createElement)("div", { className: "fincommerce-media-uploader" },
                (0, react_1.createElement)("div", { className: "fincommerce-media-uploader__label" }, label),
                (0, react_1.createElement)(MediaUploadComponent, { value: value, onSelect: onSelect, allowedTypes: allowedMediaTypes, 
                    // @ts-expect-error - TODO multiple also accepts string.
                    multiple: multipleSelect, render: ({ open }) => buttonText || buttonProps ? ((0, react_1.createElement)(components_1.Button, { variant: "secondary", onClick: () => {
                            onMediaGalleryOpen();
                            open();
                        }, ...buttonProps }, buttonText)) : ((0, react_1.createElement)(react_1.Fragment, null)) }),
                hasDropZone && ((0, react_1.createElement)(components_1.DropZone, { onFilesDrop: (droppedFiles) => uploadMedia({
                        allowedTypes: allowedMediaTypes,
                        filesList: droppedFiles,
                        maxUploadFileSize,
                        onError,
                        onFileChange(files) {
                            onUpload(multiple ? files : files[0]);
                        },
                        additionalData,
                    }) }))))) }));
};
exports.MediaUploader = MediaUploader;
