/**
 * External dependencies
 */
import { __, sprintf } from '@wordpress/i18n';
import { Button, Spinner } from '@wordpress/components';
import { useDispatch, useSelect } from '@wordpress/data';
import { createElement, Fragment, createInterpolateElement, useState, } from '@wordpress/element';
import { closeSmall } from '@wordpress/icons';
import { useWooBlockProps } from '@fincommerce/block-templates';
import { ListItem, MediaUploader, Sortable, } from '@fincommerce/components';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore No types for this exist yet.
// eslint-disable-next-line @fincommerce/dependency-group
import { useEntityProp } from '@wordpress/core-data';
import { DownloadsMenu } from './downloads-menu';
import { ManageDownloadLimitsModal, } from '../../../components/manage-download-limits-modal';
import { EditDownloadsModal } from './edit-downloads-modal';
import { UploadImage } from './upload-image';
import { SectionActions } from '../../../components/block-slot-fill';
function getFileName(url) {
    const [name] = url?.split('/').reverse() ?? [];
    return name;
}
function stringifyId(id) {
    return id ? String(id) : '';
}
function stringifyEntityId(entity) {
    return { ...entity, id: stringifyId(entity.id) };
}
export function DownloadBlockEdit({ attributes, context: { postType }, }) {
    const blockProps = useWooBlockProps(attributes);
    const [downloads, setDownloads] = useEntityProp('postType', postType, 'downloads');
    const [downloadLimit, setDownloadLimit] = useEntityProp('postType', postType, 'download_limit');
    const [downloadExpiry, setDownloadExpiry] = useEntityProp('postType', postType, 'download_expiry');
    const [selectedDownload, setSelectedDownload] = useState();
    const { allowedMimeTypes } = useSelect((select) => {
        const { getEditorSettings } = select('core/editor');
        return getEditorSettings();
    }, []);
    const allowedTypes = allowedMimeTypes
        ? Object.values(allowedMimeTypes)
        : [];
    const { createErrorNotice } = useDispatch('core/notices');
    const [showManageDownloadLimitsModal, setShowManageDownloadLimitsModal] = useState(false);
    function handleManageLimitsClick() {
        setShowManageDownloadLimitsModal(true);
    }
    function handleManageDownloadLimitsModalClose() {
        setShowManageDownloadLimitsModal(false);
    }
    function handleManageDownloadLimitsModalSubmit(value) {
        setDownloadLimit(value.downloadLimit);
        setDownloadExpiry(value.downloadExpiry);
        setShowManageDownloadLimitsModal(false);
    }
    function handleFileUpload(files) {
        if (!Array.isArray(files))
            return;
        const newFiles = files.filter((file) => !downloads.some((download) => download.file === file.url));
        if (newFiles.length !== files.length) {
            createErrorNotice(files.length === 1
                ? __('This file has already been added', 'fincommerce')
                : __('Some of these files have already been added', 'fincommerce'));
        }
        if (newFiles.length) {
            const uploadedFiles = newFiles.map((file) => ({
                id: stringifyId(file.id),
                file: file.url,
                name: file.title ||
                    file.alt ||
                    file.caption ||
                    getFileName(file.url),
            }));
            const stringifyIds = downloads.map(stringifyEntityId);
            stringifyIds.push(...uploadedFiles);
            setDownloads(stringifyIds);
        }
    }
    function removeDownload(download) {
        const otherDownloads = downloads.reduce(function removeDownloadElement(others, current) {
            if (current.file === download.file) {
                return others;
            }
            return [...others, stringifyEntityId(current)];
        }, []);
        setDownloads(otherDownloads);
    }
    function removeHandler(download) {
        return function handleRemoveClick() {
            removeDownload(download);
        };
    }
    function editHandler(download) {
        return function handleEditClick() {
            setSelectedDownload(stringifyEntityId(download));
        };
    }
    const handleUploadError = function (error) {
        createErrorNotice(sprintf(
        /* translators: %1$s is a line break, %2$s is the detailed error message */
        __('Error uploading file:%1$s%2$s', 'fincommerce'), '\n', error.message));
    };
    const handleLinkError = function (error) {
        createErrorNotice(sprintf(
        /* translators: %1$s is a line break, %2$s is the detailed error message */
        __('Error linking file:%1$s%2$s', 'fincommerce'), '\n', error));
    };
    function editDownloadsModalSaveHandler(value) {
        return function handleEditDownloadsModalSave() {
            const newDownloads = downloads
                .map(stringifyEntityId)
                .map((obj) => obj.id === value.id ? value : obj);
            setDownloads(newDownloads);
            setSelectedDownload(null);
        };
    }
    return (createElement("div", { ...blockProps },
        createElement(SectionActions, null,
            Boolean(downloads.length) && (createElement(Button, { variant: "tertiary", onClick: handleManageLimitsClick }, __('Manage limits', 'fincommerce'))),
            createElement(DownloadsMenu, { allowedTypes: allowedTypes, onUploadSuccess: handleFileUpload, onUploadError: handleUploadError, onLinkError: handleLinkError })),
        createElement("div", { className: "wp-block-fincommerce-product-downloads-field__body" },
            createElement(MediaUploader, { label: !Boolean(downloads.length) ? (createElement("div", { className: "wp-block-fincommerce-product-downloads-field__drop-zone-content" },
                    createElement(UploadImage, null),
                    createElement("p", { className: "wp-block-fincommerce-product-downloads-field__drop-zone-label" }, createInterpolateElement(__('Supported file types: <Types /> and more. <link>View all</link>', 'fincommerce'), {
                        Types: (createElement(Fragment, null, "PNG, JPG, PDF, PPT, DOC, MP3, MP4")),
                        link: (
                        // eslint-disable-next-line jsx-a11y/anchor-has-content
                        createElement("a", { href: "https://codex.wordpress.org/Uploading_Files", target: "_blank", rel: "noreferrer", onClick: (event) => event.stopPropagation() })),
                    })))) : (''), buttonText: "", allowedMediaTypes: allowedTypes, multipleSelect: 'add', maxUploadFileSize: window.productBlockEditorSettings?.maxUploadFileSize, onUpload: handleFileUpload, onFileUploadChange: handleFileUpload, onError: handleUploadError, additionalData: {
                    type: 'downloadable_product',
                } }),
            Boolean(downloads.length) && (createElement(Sortable, { className: "wp-block-fincommerce-product-downloads-field__table" }, downloads.map((download) => {
                const nameFromUrl = getFileName(download.file);
                const isUploading = download.file.startsWith('blob');
                return (createElement(ListItem, { key: download.file, className: "wp-block-fincommerce-product-downloads-field__table-row" },
                    createElement("div", { className: "wp-block-fincommerce-product-downloads-field__table-filename" },
                        createElement("span", null, download.name),
                        download.name !== nameFromUrl && (createElement("span", { className: "wp-block-fincommerce-product-downloads-field__table-filename-description" }, nameFromUrl))),
                    createElement("div", { className: "wp-block-fincommerce-product-downloads-field__table-actions" },
                        isUploading && (createElement(Spinner, { "aria-label": __('Uploading file', 'fincommerce') })),
                        !isUploading && (createElement(Button, { onClick: editHandler(download), variant: "tertiary" }, __('Edit', 'fincommerce'))),
                        createElement(Button, { icon: closeSmall, label: __('Remove file', 'fincommerce'), disabled: isUploading, onClick: removeHandler(download) }))));
            })))),
        showManageDownloadLimitsModal && (createElement(ManageDownloadLimitsModal, { initialValue: { downloadLimit, downloadExpiry }, onSubmit: handleManageDownloadLimitsModalSubmit, onClose: handleManageDownloadLimitsModalClose })),
        selectedDownload && (createElement(EditDownloadsModal, { downloadableItem: { ...selectedDownload }, onCancel: () => setSelectedDownload(null), onRemove: () => {
                removeDownload(selectedDownload);
                setSelectedDownload(null);
            }, onChange: (text) => {
                setSelectedDownload({
                    ...selectedDownload,
                    name: text,
                });
            }, onSave: editDownloadsModalSaveHandler(selectedDownload) }))));
}
