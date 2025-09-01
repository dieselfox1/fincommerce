/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { Button, DropZone, FormFileUpload } from '@wordpress/components';
import { Fragment, createElement } from 'react';
import { MediaUpload, uploadMedia as wpUploadMedia, } from '@wordpress/media-utils';
const DEFAULT_ALLOWED_MEDIA_TYPES = ['image'];
export const MediaUploader = ({ allowedMediaTypes = DEFAULT_ALLOWED_MEDIA_TYPES, buttonText = __('Choose images', 'fincommerce'), buttonProps, hasDropZone = true, label = __('Drag images here or click to upload', 'fincommerce'), maxUploadFileSize = 10000000, MediaUploadComponent = MediaUpload, multipleSelect = false, value, onError = () => null, onFileUploadChange = () => null, onMediaGalleryOpen = () => null, onUpload = () => null, onSelect = () => null, uploadMedia = wpUploadMedia, additionalData, }) => {
    const multiple = Boolean(multipleSelect);
    return (createElement(FormFileUpload, { accept: allowedMediaTypes.toString(), multiple: multiple, onChange: ({ currentTarget }) => {
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
        }, render: ({ openFileDialog }) => (createElement("div", { className: "fincommerce-form-file-upload", onKeyPress: () => { }, tabIndex: 0, role: "button", onClick: (event) => {
                const { target } = event;
                // is the click on the button from MediaUploadComponent or on the div?
                if (!target.closest('button')) {
                    openFileDialog();
                }
            }, onBlur: () => { } },
            createElement("div", { className: "fincommerce-media-uploader" },
                createElement("div", { className: "fincommerce-media-uploader__label" }, label),
                createElement(MediaUploadComponent, { value: value, onSelect: onSelect, allowedTypes: allowedMediaTypes, 
                    // @ts-expect-error - TODO multiple also accepts string.
                    multiple: multipleSelect, render: ({ open }) => buttonText || buttonProps ? (createElement(Button, { variant: "secondary", onClick: () => {
                            onMediaGalleryOpen();
                            open();
                        }, ...buttonProps }, buttonText)) : (createElement(Fragment, null)) }),
                hasDropZone && (createElement(DropZone, { onFilesDrop: (droppedFiles) => uploadMedia({
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
