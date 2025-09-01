import { __, sprintf } from '@wordpress/i18n';
import { DropZone } from '@wordpress/components';
import { useDispatch } from '@wordpress/data';
import clsx from 'clsx';
import { createElement, useState } from '@wordpress/element';
import { Icon, trash } from '@wordpress/icons';
import { useWooBlockProps } from '@fincommerce/block-templates';
import { MediaUploader, ImageGallery, ImageGalleryItem, } from '@fincommerce/components';
import { recordEvent } from '@fincommerce/tracks';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore No types for this exist yet.
// eslint-disable-next-line @fincommerce/dependency-group
import { useEntityProp } from '@wordpress/core-data';
import { PlaceHolder } from './place-holder';
import { SectionActions } from '../../../components/block-slot-fill';
import { mapUploadImageToImage } from '../../../utils/map-upload-image-to-image';
export function ImageBlockEdit({ attributes, context, }) {
    const { property, multiple } = attributes;
    const [propertyValue, setPropertyValue] = useEntityProp('postType', context.postType, property);
    const [isRemovingZoneVisible, setIsRemovingZoneVisible] = useState(false);
    const [isRemoving, setIsRemoving] = useState(false);
    const [draggedImageId, setDraggedImageId] = useState(null);
    const blockProps = useWooBlockProps(attributes, {
        className: clsx({
            'has-images': Array.isArray(propertyValue)
                ? propertyValue.length > 0
                : Boolean(propertyValue),
        }),
    });
    const { createErrorNotice } = useDispatch('core/notices');
    function orderImages(newOrder) {
        if (Array.isArray(propertyValue)) {
            const memoIds = propertyValue.reduce((current, item) => ({
                ...current,
                [`${item.id}`]: item,
            }), {});
            const orderedImages = newOrder
                .filter((image) => image?.props?.id in memoIds)
                .map((image) => memoIds[image?.props?.id]);
            recordEvent('product_images_change_image_order_via_image_gallery');
            setPropertyValue(orderedImages);
        }
    }
    function uploadHandler(eventName) {
        return function handleFileUpload(upload) {
            recordEvent(eventName);
            if (Array.isArray(upload)) {
                const images = upload
                    .filter((image) => image.id)
                    .map((image) => ({
                    id: image.id,
                    name: image.title,
                    src: image.url,
                    alt: image.alt,
                }));
                if (upload[0]?.id) {
                    setPropertyValue([
                        ...propertyValue,
                        ...images,
                    ]);
                }
            }
            else if (upload.id) {
                setPropertyValue(mapUploadImageToImage(upload));
            }
        };
    }
    function handleSelect(selection) {
        recordEvent('product_images_add_via_media_library');
        if (Array.isArray(selection)) {
            const images = selection
                .map(mapUploadImageToImage)
                .filter((image) => image !== null);
            setPropertyValue(images);
        }
        else {
            setPropertyValue(mapUploadImageToImage(selection));
        }
    }
    function handleDragStart(event) {
        if (Array.isArray(propertyValue)) {
            const { id: imageId, dataset } = event.target;
            if (imageId) {
                setDraggedImageId(parseInt(imageId, 10));
            }
            else if (dataset?.index) {
                const index = parseInt(dataset.index, 10);
                setDraggedImageId(propertyValue[index]?.id ?? null);
            }
            setIsRemovingZoneVisible((current) => !current);
        }
    }
    function handleDragEnd() {
        if (Array.isArray(propertyValue)) {
            if (isRemoving && draggedImageId) {
                recordEvent('product_images_remove_image_button_click');
                setPropertyValue(propertyValue.filter((img) => img.id !== draggedImageId));
                setIsRemoving(false);
                setDraggedImageId(null);
            }
            setIsRemovingZoneVisible((current) => !current);
        }
    }
    function handleReplace({ replaceIndex, media, }) {
        recordEvent('product_images_replace_image_button_click');
        if (Array.isArray(propertyValue)) {
            // Ignore the media if it is replaced by itseft.
            if (propertyValue.some((img) => media.id === img.id)) {
                return;
            }
            const image = mapUploadImageToImage(media);
            if (image) {
                const newImages = [...propertyValue];
                newImages[replaceIndex] = image;
                setPropertyValue(newImages);
            }
        }
        else {
            setPropertyValue(mapUploadImageToImage(media));
        }
    }
    function handleRemove({ removedItem }) {
        recordEvent('product_images_remove_image_button_click');
        if (Array.isArray(propertyValue)) {
            const remainingImages = propertyValue.filter((image) => String(image.id) !== removedItem.props.id);
            setPropertyValue(remainingImages);
        }
        else {
            setPropertyValue(null);
        }
    }
    const handleMediaUploaderError = function (error) {
        createErrorNotice(sprintf(
        /* translators: %1$s is a line break, %2$s is the detailed error message */
        __('Error uploading image:%1$s%2$s', 'fincommerce'), '\n', error.message));
    };
    const isImageGalleryVisible = propertyValue !== null &&
        (!Array.isArray(propertyValue) || propertyValue.length > 0);
    return (createElement("div", { ...blockProps },
        createElement("div", { className: "fincommerce-product-form__image-drop-zone" }, isRemovingZoneVisible ? (createElement("div", { className: "fincommerce-product-form__remove-image-drop-zone" },
            createElement("span", null,
                createElement(Icon, { icon: trash, size: 20, className: "icon-control" }),
                __('Drop here to remove', 'fincommerce')),
            createElement(DropZone, { onHTMLDrop: () => setIsRemoving(true), onDrop: () => setIsRemoving(true), label: __('Drop here to remove', 'fincommerce') }))) : (createElement(SectionActions, null,
            createElement("div", { className: "fincommerce-product-form__media-uploader" },
                createElement(MediaUploader, { value: Array.isArray(propertyValue)
                        ? propertyValue.map(({ id }) => id)
                        : propertyValue?.id ?? undefined, multipleSelect: multiple ? 'add' : false, maxUploadFileSize: window.productBlockEditorSettings
                        ?.maxUploadFileSize, onError: handleMediaUploaderError, onFileUploadChange: uploadHandler('product_images_add_via_file_upload_area'), onMediaGalleryOpen: () => {
                        recordEvent('product_images_media_gallery_open');
                    }, onSelect: handleSelect, onUpload: uploadHandler('product_images_add_via_drag_and_drop_upload'), label: '', buttonText: __('Choose an image', 'fincommerce') }))))),
        isImageGalleryVisible ? (createElement(ImageGallery, { allowDragging: false, onDragStart: handleDragStart, onDragEnd: handleDragEnd, onOrderChange: orderImages, onReplace: handleReplace, onRemove: handleRemove, onSelectAsCover: () => recordEvent('product_images_select_image_as_cover_button_click') }, (Array.isArray(propertyValue)
            ? propertyValue
            : [propertyValue]).map((image, index) => (createElement(ImageGalleryItem, { key: image.id, alt: image.alt, src: image.src, id: `${image.id}`, isCover: multiple && index === 0 }))))) : (createElement(PlaceHolder, { multiple: multiple }))));
}
