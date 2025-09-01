"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageBlockEdit = ImageBlockEdit;
const i18n_1 = require("@wordpress/i18n");
const components_1 = require("@wordpress/components");
const data_1 = require("@wordpress/data");
const clsx_1 = __importDefault(require("clsx"));
const element_1 = require("@wordpress/element");
const icons_1 = require("@wordpress/icons");
const block_templates_1 = require("@fincommerce/block-templates");
const components_2 = require("@fincommerce/components");
const tracks_1 = require("@fincommerce/tracks");
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore No types for this exist yet.
// eslint-disable-next-line @fincommerce/dependency-group
const core_data_1 = require("@wordpress/core-data");
const place_holder_1 = require("./place-holder");
const block_slot_fill_1 = require("../../../components/block-slot-fill");
const map_upload_image_to_image_1 = require("../../../utils/map-upload-image-to-image");
function ImageBlockEdit({ attributes, context, }) {
    const { property, multiple } = attributes;
    const [propertyValue, setPropertyValue] = (0, core_data_1.useEntityProp)('postType', context.postType, property);
    const [isRemovingZoneVisible, setIsRemovingZoneVisible] = (0, element_1.useState)(false);
    const [isRemoving, setIsRemoving] = (0, element_1.useState)(false);
    const [draggedImageId, setDraggedImageId] = (0, element_1.useState)(null);
    const blockProps = (0, block_templates_1.useWooBlockProps)(attributes, {
        className: (0, clsx_1.default)({
            'has-images': Array.isArray(propertyValue)
                ? propertyValue.length > 0
                : Boolean(propertyValue),
        }),
    });
    const { createErrorNotice } = (0, data_1.useDispatch)('core/notices');
    function orderImages(newOrder) {
        if (Array.isArray(propertyValue)) {
            const memoIds = propertyValue.reduce((current, item) => ({
                ...current,
                [`${item.id}`]: item,
            }), {});
            const orderedImages = newOrder
                .filter((image) => image?.props?.id in memoIds)
                .map((image) => memoIds[image?.props?.id]);
            (0, tracks_1.recordEvent)('product_images_change_image_order_via_image_gallery');
            setPropertyValue(orderedImages);
        }
    }
    function uploadHandler(eventName) {
        return function handleFileUpload(upload) {
            (0, tracks_1.recordEvent)(eventName);
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
                setPropertyValue((0, map_upload_image_to_image_1.mapUploadImageToImage)(upload));
            }
        };
    }
    function handleSelect(selection) {
        (0, tracks_1.recordEvent)('product_images_add_via_media_library');
        if (Array.isArray(selection)) {
            const images = selection
                .map(map_upload_image_to_image_1.mapUploadImageToImage)
                .filter((image) => image !== null);
            setPropertyValue(images);
        }
        else {
            setPropertyValue((0, map_upload_image_to_image_1.mapUploadImageToImage)(selection));
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
                (0, tracks_1.recordEvent)('product_images_remove_image_button_click');
                setPropertyValue(propertyValue.filter((img) => img.id !== draggedImageId));
                setIsRemoving(false);
                setDraggedImageId(null);
            }
            setIsRemovingZoneVisible((current) => !current);
        }
    }
    function handleReplace({ replaceIndex, media, }) {
        (0, tracks_1.recordEvent)('product_images_replace_image_button_click');
        if (Array.isArray(propertyValue)) {
            // Ignore the media if it is replaced by itseft.
            if (propertyValue.some((img) => media.id === img.id)) {
                return;
            }
            const image = (0, map_upload_image_to_image_1.mapUploadImageToImage)(media);
            if (image) {
                const newImages = [...propertyValue];
                newImages[replaceIndex] = image;
                setPropertyValue(newImages);
            }
        }
        else {
            setPropertyValue((0, map_upload_image_to_image_1.mapUploadImageToImage)(media));
        }
    }
    function handleRemove({ removedItem }) {
        (0, tracks_1.recordEvent)('product_images_remove_image_button_click');
        if (Array.isArray(propertyValue)) {
            const remainingImages = propertyValue.filter((image) => String(image.id) !== removedItem.props.id);
            setPropertyValue(remainingImages);
        }
        else {
            setPropertyValue(null);
        }
    }
    const handleMediaUploaderError = function (error) {
        createErrorNotice((0, i18n_1.sprintf)(
        /* translators: %1$s is a line break, %2$s is the detailed error message */
        (0, i18n_1.__)('Error uploading image:%1$s%2$s', 'fincommerce'), '\n', error.message));
    };
    const isImageGalleryVisible = propertyValue !== null &&
        (!Array.isArray(propertyValue) || propertyValue.length > 0);
    return ((0, element_1.createElement)("div", { ...blockProps },
        (0, element_1.createElement)("div", { className: "fincommerce-product-form__image-drop-zone" }, isRemovingZoneVisible ? ((0, element_1.createElement)("div", { className: "fincommerce-product-form__remove-image-drop-zone" },
            (0, element_1.createElement)("span", null,
                (0, element_1.createElement)(icons_1.Icon, { icon: icons_1.trash, size: 20, className: "icon-control" }),
                (0, i18n_1.__)('Drop here to remove', 'fincommerce')),
            (0, element_1.createElement)(components_1.DropZone, { onHTMLDrop: () => setIsRemoving(true), onDrop: () => setIsRemoving(true), label: (0, i18n_1.__)('Drop here to remove', 'fincommerce') }))) : ((0, element_1.createElement)(block_slot_fill_1.SectionActions, null,
            (0, element_1.createElement)("div", { className: "fincommerce-product-form__media-uploader" },
                (0, element_1.createElement)(components_2.MediaUploader, { value: Array.isArray(propertyValue)
                        ? propertyValue.map(({ id }) => id)
                        : propertyValue?.id ?? undefined, multipleSelect: multiple ? 'add' : false, maxUploadFileSize: window.productBlockEditorSettings
                        ?.maxUploadFileSize, onError: handleMediaUploaderError, onFileUploadChange: uploadHandler('product_images_add_via_file_upload_area'), onMediaGalleryOpen: () => {
                        (0, tracks_1.recordEvent)('product_images_media_gallery_open');
                    }, onSelect: handleSelect, onUpload: uploadHandler('product_images_add_via_drag_and_drop_upload'), label: '', buttonText: (0, i18n_1.__)('Choose an image', 'fincommerce') }))))),
        isImageGalleryVisible ? ((0, element_1.createElement)(components_2.ImageGallery, { allowDragging: false, onDragStart: handleDragStart, onDragEnd: handleDragEnd, onOrderChange: orderImages, onReplace: handleReplace, onRemove: handleRemove, onSelectAsCover: () => (0, tracks_1.recordEvent)('product_images_select_image_as_cover_button_click') }, (Array.isArray(propertyValue)
            ? propertyValue
            : [propertyValue]).map((image, index) => ((0, element_1.createElement)(components_2.ImageGalleryItem, { key: image.id, alt: image.alt, src: image.src, id: `${image.id}`, isCover: multiple && index === 0 }))))) : ((0, element_1.createElement)(place_holder_1.PlaceHolder, { multiple: multiple }))));
}
